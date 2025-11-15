import next from "eslint-config-next";

const config = [
  // Next.js + React + TS rules (Flat config)
  ...next,
  // Project-specific ignores to keep lint fast and focused
  {
    ignores: [
      "public/**",
      ".vscode/**",
      "tsconfig.json",
      "dist/**",
      "coverage/**",
      ".vercel/**",
      "pnpm-lock.yaml",
    ],
  },
];

export default config;
