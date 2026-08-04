/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cseciitb.github.io" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  // NOTE: When the Google Cloud backend / CTFd proxy is introduced,
  // add rewrites() here to proxy `/api/ctfd/*` to the CTFd instance
  // so the browser only ever talks to a same-origin API surface.
};

export default nextConfig;
