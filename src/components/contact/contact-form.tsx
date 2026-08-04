"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Submission currently resolves locally with no network call.
 * Wire this up to `POST /api/contact` (a Next.js Route Handler) once the
 * backend lands — that handler is the natural place to forward messages
 * into email / a Google Cloud Firestore "inquiries" collection / Discord
 * webhook, without this component needing to change.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("sent"), 600);
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl2 border border-solved/25 bg-solved/5 px-6 py-14 text-center">
        <CheckCircle2 className="h-6 w-6 text-solved" />
        <p className="font-display text-[16px] font-medium text-fog-50">Message received</p>
        <p className="max-w-xs text-[13.5px] text-fog-500">
          We&apos;ll get back to you over email, or find us faster on Discord.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-[12px] text-fog-500">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-ink-500 bg-ink-900 px-3.5 py-2.5 text-[14px] text-fog-100 outline-none placeholder:text-fog-700 focus:border-signal-500/60"
            placeholder="Ada Lovelace"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-[12px] text-fog-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-ink-500 bg-ink-900 px-3.5 py-2.5 text-[14px] text-fog-100 outline-none placeholder:text-fog-700 focus:border-signal-500/60"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="mb-2 block font-mono text-[12px] text-fog-500">
          I&apos;m reaching out about
        </label>
        <select
          id="topic"
          name="topic"
          className="w-full rounded-lg border border-ink-500 bg-ink-900 px-3.5 py-2.5 text-[14px] text-fog-100 outline-none focus:border-signal-500/60"
        >
          <option>Joining CSeC</option>
          <option>A workshop or collaboration</option>
          <option>Sponsorship</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-[12px] text-fog-500">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-lg border border-ink-500 bg-ink-900 px-3.5 py-2.5 text-[14px] text-fog-100 outline-none placeholder:text-fog-700 focus:border-signal-500/60"
          placeholder="Tell us a bit about what you're looking for."
        />
      </div>

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
