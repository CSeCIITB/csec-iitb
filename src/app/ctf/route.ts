import { redirect } from "next/navigation";
import { DEFAULT_CTFD_URL } from "@/lib/constants";

// Resolved per request so the public CTFd URL can change without a rebuild.
export const dynamic = "force-dynamic";

export function GET() {
  redirect(process.env.CTFD_PUBLIC_URL || process.env.CTFD_BASE_URL || DEFAULT_CTFD_URL);
}
