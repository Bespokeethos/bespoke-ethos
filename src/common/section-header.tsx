import React from "react";
import { Heading } from "@/common/heading";

export function SectionHeader({ title, subtitle, align = "left" as const }: { title: string; subtitle?: string; align?: "left" | "center" | "right" }) {
  return (
    <Heading align={align} subtitle={subtitle}>
      <h2>{title}</h2>
    </Heading>
  );
}

