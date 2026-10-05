#!/usr/bin/env bash
# Run the whole CSeC stack on this machine and expose it publicly:
#
#   csec-web     the Next.js site            (localhost:3000)
#   csec-ctfd    CTFd, SQLite in a volume    (localhost:8000)
#   *-tunnel     Cloudflare quick tunnels -> public https://*.trycloudflare.com links
#
# Usage: deploy/local-server.sh [up|down|status|urls]
# Works with podman or docker. Quick-tunnel URLs change every time the
# tunnel containers restart; the site's /ctf link follows automatically.
set -euo pipefail

cd "$(dirname "$0")/.."
ENGINE=${ENGINE:-$(command -v docker || command -v podman)}
NET=csec
STATE_DIR=deploy/.state
mkdir -p "$STATE_DIR"

tunnel_url() {
  local name=$1
  for _ in $(seq 1 60); do
    url=$("$ENGINE" logs "$name" 2>&1 | grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' | tail -1 || true)
    [[ -n "$url" ]] && { echo "$url"; return; }
    sleep 1
  done
  echo "Timed out waiting for $name URL" >&2
  return 1
}

start_tunnel() {
  local name=$1 target=$2
  "$ENGINE" rm -f "$name" >/dev/null 2>&1 || true
  "$ENGINE" run -d --name "$name" --network "$NET" --restart unless-stopped \
    docker.io/cloudflare/cloudflared:latest tunnel --no-autoupdate --protocol http2 --url "$target" >/dev/null
}

up() {
  "$ENGINE" network inspect "$NET" >/dev/null 2>&1 || "$ENGINE" network create "$NET" >/dev/null

  # Persist CTFd's SECRET_KEY so logins survive container restarts.
  [[ -s "$STATE_DIR/ctfd_secret" ]] || head -c 48 /dev/urandom | base64 | tr -d '\n' > "$STATE_DIR/ctfd_secret"

  if ! "$ENGINE" inspect csec-ctfd >/dev/null 2>&1; then
    "$ENGINE" run -d --name csec-ctfd --network "$NET" --restart unless-stopped \
      -p 8000:8000 \
      -v csec-ctfd-data:/var/uploads \
      -e DATABASE_URL=sqlite:////var/uploads/ctfd.db \
      -e SECRET_KEY="$(cat "$STATE_DIR/ctfd_secret")" \
      -e REVERSE_PROXY=true \
      docker.io/ctfd/ctfd:latest >/dev/null
  else
    "$ENGINE" start csec-ctfd >/dev/null
  fi

  start_tunnel csec-ctfd-tunnel http://csec-ctfd:8000
  CTFD_PUBLIC_URL=$(tunnel_url csec-ctfd-tunnel)

  "$ENGINE" build -q --format docker -t csec-iitb:latest . >/dev/null 2>&1 \
    || "$ENGINE" build -q -t csec-iitb:latest . >/dev/null
  "$ENGINE" rm -f csec-web >/dev/null 2>&1 || true
  env_args=()
  [[ -f .env ]] && env_args=(--env-file .env)
  "$ENGINE" run -d --name csec-web --network "$NET" --restart unless-stopped \
    -p 3000:3000 "${env_args[@]}" \
    -e CTFD_BASE_URL=http://csec-ctfd:8000 \
    -e CTFD_PUBLIC_URL="$CTFD_PUBLIC_URL" \
    csec-iitb:latest >/dev/null

  start_tunnel csec-web-tunnel http://csec-web:3000
  WEB_PUBLIC_URL=$(tunnel_url csec-web-tunnel)

  printf 'WEB_PUBLIC_URL=%s\nCTFD_PUBLIC_URL=%s\n' "$WEB_PUBLIC_URL" "$CTFD_PUBLIC_URL" > "$STATE_DIR/urls"
  urls
}

down() {
  "$ENGINE" rm -f csec-web-tunnel csec-web csec-ctfd-tunnel csec-ctfd >/dev/null 2>&1 || true
  echo "Stopped. CTFd data is kept in the csec-ctfd-data volume."
}

urls() {
  # shellcheck disable=SC1091
  source "$STATE_DIR/urls"
  echo "Website : $WEB_PUBLIC_URL   (local: http://localhost:3000)"
  echo "CTFd    : $CTFD_PUBLIC_URL   (local: http://localhost:8000)"
}

case "${1:-up}" in
  up) up ;;
  down) down ;;
  urls) urls ;;
  status) "$ENGINE" ps -a --filter name=csec- --format '{{.Names}}\t{{.Status}}' ;;
  *) echo "usage: $0 [up|down|status|urls]" >&2; exit 1 ;;
esac
