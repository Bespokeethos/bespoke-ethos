"use client";
import Image from "next/image";
import React from "react";

type TrustStripProps = {
  className?: string;
  size?: "thin" | "default";
};

function SquareBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="trust-square-badge h-7 w-7 shrink-0 p-0.5">
      <div className="relative flex h-full w-full items-center justify-center">{children}</div>
    </div>
  );
}

function ThinRow({ imgH, gapX, rowPadding }: { imgH: string; gapX: string; rowPadding: string }) {
  return (
    <div className={`container mx-auto flex flex-wrap items-center justify-center ${gapX} gap-y-2 px-6 ${rowPadding}`}>
      {/* NGLCC thin badge (centered pill) */}
      <span className="trust-thin-pill">
        <Image
          src="/assets/nglcc-badge-thin-dark.svg"
          alt="NGLCC Certified LGBTQ+ Owned Business"
          className={`block ${imgH} w-auto object-contain dark:hidden`}
          width={150}
          height={48}
          loading="lazy"
          decoding="async"
        />
        <Image
          src="/assets/nglcc-badge-thin-light.svg"
          alt="NGLCC Certified LGBTQ+ Owned Business"
          className={`hidden ${imgH} w-auto object-contain dark:block`}
          width={150}
          height={48}
          loading="lazy"
          decoding="async"
        />
      </span>

      {/* 5 Years thin badge (centered pill) */}
      <span className="trust-thin-pill">
        <Image
          src="/assets/experience-5yrs-thin-dark.svg"
          alt="5 Years in AI"
          className={`block ${imgH} w-auto object-contain dark:hidden`}
          width={150}
          height={48}
          loading="lazy"
          decoding="async"
        />
        <Image
          src="/assets/experience-5yrs-thin-light.svg"
          alt="5 Years in AI"
          className={`hidden ${imgH} w-auto object-contain dark:block`}
          width={150}
          height={48}
          loading="lazy"
          decoding="async"
        />
      </span>

      {/* Catalant thin badge (centered pill) */}
      <span className="trust-thin-pill">
        <Image
          src="/assets/catalant-badge-thin-dark.svg"
          alt="Catalant Vetted Consultants"
          className={`block ${imgH} w-auto object-contain dark:hidden`}
          width={150}
          height={48}
          loading="lazy"
          decoding="async"
        />
        <Image
          src="/assets/catalant-badge-thin-light.svg"
          alt="Catalant Vetted Consultants"
          className={`hidden ${imgH} w-auto object-contain dark:block`}
          width={150}
          height={48}
          loading="lazy"
          decoding="async"
        />
      </span>
    </div>
  );
}

function DefaultRow({ imgH, gapX, rowPadding }: { imgH: string; gapX: string; rowPadding: string }) {
  return (
    <div className={`container mx-auto flex flex-wrap items-center justify-center ${gapX} gap-y-2 px-6 ${rowPadding}`}>
      {/* NGLCC square */}
      <SquareBadge>
        {/* light theme */}
        <Image
          src="/assets/nglcc-badge-square-dark.svg"
          alt="NGLCC Certified LGBTQ+ Owned Business"
          className={`block ${imgH} w-auto object-contain dark:hidden`}
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
        />
        {/* dark theme */}
        <Image
          src="/assets/nglcc-badge-square-light.svg"
          alt="NGLCC Certified LGBTQ+ Owned Business"
          className={`hidden ${imgH} w-auto object-contain dark:block`}
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
        />
      </SquareBadge>

      {/* Catalant square */}
      <SquareBadge>
        {/* light theme */}
        <Image
          src="/assets/catalant-badge-square-dark.svg"
          alt="Catalant Vetted Consultants"
          className={`block ${imgH} w-auto object-contain dark:hidden`}
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
        />
        {/* dark theme */}
        <Image
          src="/assets/catalant-badge-square-light.svg"
          alt="Catalant Vetted Consultants"
          className={`hidden ${imgH} w-auto object-contain dark:block`}
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
        />
      </SquareBadge>

      {/* Experience square */}
      <SquareBadge>
        {/* light theme */}
        <Image
          src="/assets/experience-5yrs-square-dark.svg"
          alt="5 Years in AI"
          className={`block ${imgH} w-auto object-contain dark:hidden`}
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
        />
        {/* dark theme */}
        <Image
          src="/assets/experience-5yrs-square-light.svg"
          alt="5 Years in AI"
          className={`hidden ${imgH} w-auto object-contain dark:block`}
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
        />
      </SquareBadge>
    </div>
  );
}

export function TrustStrip({ size = "default", className }: TrustStripProps) {
  const rowPadding = size === "thin" ? "py-1.5" : "py-3";
  const gapX = size === "thin" ? "gap-x-4" : "gap-x-6";
  const textSize = size === "thin" ? "text-[11px]" : "text-sm";
  const iconSize = size === "thin" ? "h-5 w-5" : "h-7 w-7";
  const imgH = size === "thin" ? "h-5" : "h-7";

  return (
    <div className={`border-b border-border bg-surface-secondary/80 backdrop-blur-sm dark:border-dark-border dark:bg-dark-surface-secondary/80 ${className}`}>
      {size === "thin" ? (
        <ThinRow imgH={imgH} gapX={gapX} rowPadding={rowPadding} />
      ) : (
        <DefaultRow imgH={imgH} gapX={gapX} rowPadding={rowPadding} />
      )}
    </div>
  );
}
