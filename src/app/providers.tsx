import { ThemeProvider } from "next-themes";

import { ThemeAccentProvider } from "@/context/theme-provider";
import { TooltipProvider } from "@/common/tooltip";
import { FeatureFlagProvider } from "@/context/feature-flag-provider";
import { getServerFeatureFlags } from "@/config/feature-flags";

export function Providers({ children }: { children: React.ReactNode }) {
  const initialFeatureFlags = getServerFeatureFlags();

  return (
    <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light" forcedTheme="light">
      <ThemeAccentProvider />
      <FeatureFlagProvider initialFlags={initialFeatureFlags}>
        <TooltipProvider>{children}</TooltipProvider>
      </FeatureFlagProvider>
    </ThemeProvider>
  );
}
