"use client";

import { useState } from "react";

export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
      <span className="addr">{email}</span>
      <button type="button" className="btn btn-ghost btn-sm" onClick={copy} aria-live="polite">
        {copied ? done : label}
      </button>
    </span>
  );
}
