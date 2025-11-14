"use client";

import dynamic from "next/dynamic";

export const ChangelogListWrapper = dynamic(
  () => import("./changelog-list").then((mod) => ({ default: mod.ChangelogList })),
  { ssr: false }
);
