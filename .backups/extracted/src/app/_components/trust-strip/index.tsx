"use client";
import React from "react";
import { IconAward } from "@tabler/icons-react";

type TrustStripProps = {
  size?: "thin" | "default";
};

function SquareBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-7 w-7 shrink-0 overflow-hidden rounded-md border border-white/20 bg-white/5 p-0.5 shadow-sm backdrop-blur-md dark:border-white/10">
      <div className="relative flex h-full w-full items-center justify-center">{children}</div>
    </div>
  );
}

export function TrustStrip({ size = "default" }: TrustStripProps) {
  const rowPadding = size === "thin" ? "py-1.5" : "py-3";
  const gapX = size === "thin" ? "gap-x-4" : "gap-x-6";
  const textSize = size === "thin" ? "text-[11px]" : "text-sm";
  const iconSize = size === "thin" ? "h-5 w-5" : "h-7 w-7";
  const imgH = size === "thin" ? "h-5" : "h-7";

  return (
    <div className="border-b border-white/10 bg-black/2 backdrop-blur-sm dark:bg-white/4">
      <div className={`container mx-auto flex flex-wrap items-center justify-center ${gapX} gap-y-2 px-6 ${rowPadding}`}>
        {/* NGLCC (square badge wrapper) */}
        <SquareBadge>
          {/* light theme */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/nglcc-badge-dark.svg"
            alt="NGLCC Certified LGBTQ+ Owned Business"
            className={`block ${imgH} w-auto object-contain dark:hidden`}
            loading="lazy"
            decoding="async"
          />
          {/* dark theme */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/nglcc-badge-light.svg"
            alt="NGLCC Certified LGBTQ+ Owned Business"
            className={`hidden ${imgH} w-auto object-contain dark:block`}
            loading="lazy"
            decoding="async"
          />
        </SquareBadge>

        {/* Catalant */}
        <SquareBadge>
          {/* light theme */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/catalant-badge-dark.svg"
            alt="Catalant Vetted Consultants"
            className={`block ${imgH} w-auto object-contain dark:hidden`}
            loading="lazy"
            decoding="async"
          />
          {/* dark theme */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/catalant-badge-light.svg"
            alt="Catalant Vetted Consultants"
            className={`hidden ${imgH} w-auto object-contain dark:block`}
            loading="lazy"
            decoding="async"
          />
        </SquareBadge>

        {/* Experience */}
        <div className={`flex items-center gap-2.5 text-gray-700 dark:text-gray-300 ${textSize}`}>
          <IconAward className={`${iconSize} text-yellow-400/90`} strokeWidth={2} aria-hidden />
          <span>5 Years of Hands-On AI Deployments</span>
        </div>
      </div>
    </div>
  );
}
