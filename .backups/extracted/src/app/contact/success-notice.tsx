"use client";
import * as React from "react";

export function SuccessNotice({ redirectAfterMs = 5000 }: { redirectAfterMs?: number }) {
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const url = new URL(window.location.href);
    const sent = url.searchParams.get("sent");
    if (sent !== "1") return;
    const to = setTimeout(() => {
      window.location.assign("/");
    }, reduce ? redirectAfterMs * 2 : redirectAfterMs);
    return () => clearTimeout(to);
  }, [redirectAfterMs]);
  return null;
}

