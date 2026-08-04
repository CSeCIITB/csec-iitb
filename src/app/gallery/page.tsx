import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionEyebrow } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from CSeC workshops, CTFs, and events.",
};

/**
 * Real event photography isn't available to this build pass. Tiles below
 * are procedurally generated placeholders (gradient + grain, on-brand
 * colors, no stock imagery) captioned with real event names, structured
 * as `{ src, caption }` so swapping in a Google Cloud Storage bucket of
 * real photos later is a one-line data change, not a redesign.
 */
const items = [
  { caption: "TyroCTF · Lecture Hall Complex", tall: true },
  { caption: "Basics of Hacking · Workshop", tall: false },
  { caption: "Hacking via CTFs · Workshop", tall: false },
  { caption: "Hardware Hacking · Lab session", tall: true },
  { caption: "IITBreachers · Onsite finals", tall: false },
  { caption: "Advanced CTF · Late-night solve", tall: false },
  { caption: "BreachCTF · Challenge design", tall: true },
  { caption: "Core Team · Tenure handoff", tall: false },
];

const angles = [125, 200, 40, 160, 260, 90, 300, 15];

export default function GalleryPage() {
  return (
    <>
      <section className="pb-16 pt-20">
        <Container>
          <SectionEyebrow>gallery</SectionEyebrow>
          <h1 className="max-w-2xl text-balance font-display text-display-xl font-medium text-fog-50">
            What a tenure looks like.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-fog-500">
            Photos from this year&apos;s events are being migrated in. Here&apos;s
            the layout they&apos;ll land in.
          </p>
        </Container>
      </section>

      <section className="border-t border-ink-700 py-16">
        <Container>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {items.map((item, i) => (
              <Reveal key={item.caption} delay={i * 0.04} className="mb-5 break-inside-avoid">
                <div
                  className={`group relative overflow-hidden rounded-xl2 border border-ink-600 ${
                    item.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                  style={{
                    backgroundImage: `linear-gradient(${angles[i]}deg, #10141F, #1A2236 45%, #123F99 130%)`,
                  }}
                >
                  <div className="absolute inset-0 bg-grid bg-radial-fade opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Camera className="h-8 w-8 text-fog-100" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent p-4">
                    <p className="font-mono text-[12px] text-fog-300">{item.caption}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
