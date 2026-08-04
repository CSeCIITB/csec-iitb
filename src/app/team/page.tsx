import type { Metadata } from "next";
import { TeamClient } from "@/components/team/team-client";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind CSeC — Manager, Conveners, Core Team, and IITBreachers.",
};

export default function TeamPage() {
  return (
    <>
      <TeamClient />
    </>
  );
}
