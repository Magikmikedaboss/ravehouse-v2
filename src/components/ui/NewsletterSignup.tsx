"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up /api/newsletter or external service
    console.log("Newsletter signup:", email);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 text-xs text-white">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs text-white placeholder:text-white/40"
          placeholder="you@nightshift.com"
        />
        <button
          type="submit"
          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:brightness-110"
        >
          Join
        </button>
      </div>
      <p className="text-[11px] text-white/50">
        No spam. Just events, recaps and the occasional mix.
      </p>
    </form>
  );
}