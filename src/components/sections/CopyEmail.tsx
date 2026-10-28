"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

// Copies the address for people who use a mail app the mailto link doesn't open.
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
    <button type="button" className="btn btn-quiet" onClick={copy} aria-live="polite" aria-label={copied ? "Email address copied" : "Copy email address"}>
      <Icon name={copied ? "check" : "copy"} />{copied ? done : label}
    </button>
  );
}
