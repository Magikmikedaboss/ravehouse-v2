"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Signup failed");
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Signup failed");
    }
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
          disabled={status === "loading"}
          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:brightness-110"
        >
          {status === "loading" ? "..." : "Join"}
        </button>
      </div>
      {status === "error" && errorMessage && (
        <p className="text-[11px] text-red-400">{errorMessage}</p>
      )}
      {status === "success" && (
        <p className="text-[11px] text-green-400">Thanks! Check your inbox.</p>
      )}
      <p className="text-[11px] text-white/50">
        No spam. Just events, recaps and the occasional mix.
      </p>
    </form>  );
}