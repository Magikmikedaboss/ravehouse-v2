"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Signup failed");
      }
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Signup failed");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-2 text-xs text-[rgb(var(--rh-text-primary))]">
      <div className="flex gap-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@nightshift.com"
          error={status === "error" ? errorMessage : undefined}
          className="flex-1"
        />
        <Button
          type="submit"
          loading={status === "loading"}
          disabled={status === "loading"}
          className="text-xs"
        >
          Join
        </Button>      </div>
      {status === "success" && (
        <div aria-live="polite" aria-atomic="true">
          <p className="text-xxs text-rh-green">Thanks! Check your inbox.</p>
        </div>
      )}
      <p className="text-xxs text-[rgb(var(--rh-text-secondary))]">
        No spam. Just events, recaps and the occasional mix.
      </p>
    </form>  );
}