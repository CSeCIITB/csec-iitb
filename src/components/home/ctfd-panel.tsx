import Link from "next/link";
import { ArrowUpRight, Trophy, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatusDot } from "@/components/shared/status-dot";
import { Reveal } from "@/components/shared/reveal";
import { ctfdClient } from "@/lib/ctfd/client";
import { ctfdUrl } from "@/lib/constants";

export async function CtfdPanel() {
  const [featured, scoreboard, challenges] = await Promise.all([
    ctfdClient.getFeaturedCompetition(),
    ctfdClient.getScoreboard(5),
    ctfdClient.getRecentChallenges(6),
  ]);

  return (
    <section className="relative border-t border-ink-700 py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="ctfd"
            title="Live where the club actually competes"
            description="The website is the front door. Challenges, scoreboards, and submissions all live on our CTFd instance — wired for a direct handoff."
          />
          <Button variant="outline" size="sm" asChild>
            <Link href={ctfdUrl}>
              Join Weekly Challenges <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          {/* Featured competition */}
          <Reveal>
            <Card className="flex h-full flex-col justify-between p-7">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant={featured?.status === "live" ? "live" : "signal"}>
                    <StatusDot tone={featured?.status === "live" ? "live" : "signal"} pulse={featured?.status === "live"} />
                    {featured?.status ?? "upcoming"}
                  </Badge>
                  <span className="font-mono text-[11px] text-fog-700">{featured?.format}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium text-fog-50">
                  {featured?.name}
                </h3>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-fog-500">
                  {featured?.description}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-ink-700 pt-5">
                <span className="font-mono text-[12px] text-fog-700">
                  {featured && new Date(featured.startsAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                <Link
                  href={ctfdUrl}
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-signal-400 hover:text-signal-300"
                >
                  Register on CTFd <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Card>
          </Reveal>

          {/* Scoreboard preview */}
          <Reveal delay={0.1}>
            <Card className="h-full p-7">
              <div className="flex items-center gap-2 text-fog-300">
                <Trophy className="h-4 w-4 text-pulse-400" />
                <span className="font-mono text-[12px] uppercase tracking-wider">Scoreboard preview</span>
              </div>
              <ul className="mt-5 space-y-1">
                {scoreboard.map((entry) => (
                  <li
                    key={entry.rank}
                    className="flex items-center justify-between rounded-lg px-2.5 py-2.5 text-[14px] transition-colors hover:bg-ink-700/60"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 font-mono text-[12px] text-fog-700">
                        {String(entry.rank).padStart(2, "0")}
                      </span>
                      <span className="text-fog-100">{entry.teamName}</span>
                    </div>
                    <span className="font-mono text-[13px] text-signal-300">{entry.score}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-ink-700 pt-4 text-[12px] text-fog-700">
                Sample data — replaced by the live CTFd scoreboard API.
              </p>
            </Card>
          </Reveal>
        </div>

        {/* Recent challenges */}
        <Reveal delay={0.15} className="mt-5">
          <Card className="p-7">
            <div className="flex items-center gap-2 text-fog-300">
              <Terminal className="h-4 w-4 text-signal-400" />
              <span className="font-mono text-[12px] uppercase tracking-wider">Recent challenges</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {challenges.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2.5 rounded-lg border border-ink-600 bg-ink-900/60 px-3.5 py-2.5"
                >
                  <span className="font-mono text-[12px] text-fog-300">{c.name}</span>
                  <span className="text-fog-700">·</span>
                  <span className="text-[11px] uppercase text-fog-700">{c.category}</span>
                  <span className="font-mono text-[12px] text-signal-400">{c.value}pt</span>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
