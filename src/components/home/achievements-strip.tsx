import { achievements } from "@/lib/content/achievements";

const featured = achievements.filter((a) => a.highlight);
const loop = [...featured, ...featured];

export function AchievementsStrip() {
  return (
    <div className="border-y border-ink-700 bg-ink-900/60 py-5">
      <div className="relative flex overflow-hidden">
        <div className="flex w-max shrink-0 animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
          {[...loop, ...loop].map((a, i) => (
            <div key={i} className="flex shrink-0 items-center gap-3 whitespace-nowrap">
              <span className="font-mono text-[12px] text-signal-400">{a.rank}</span>
              <span className="text-[13px] text-fog-500">{a.event}</span>
              <span className="text-fog-700">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
