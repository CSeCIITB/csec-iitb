import { Hero } from "@/components/home/hero";
import { AchievementsStrip } from "@/components/home/achievements-strip";
import { CtfdPanel } from "@/components/home/ctfd-panel";
import { FocusAreas } from "@/components/home/focus-areas";
import { EventsPreview } from "@/components/home/events-preview";
import { WriteupsPreview } from "@/components/home/writeups-preview";
import { CommunityCta } from "@/components/home/community-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AchievementsStrip />
      <CtfdPanel />
      <FocusAreas />
      <EventsPreview />
      <WriteupsPreview />
      <CommunityCta />
    </>
  );
}
