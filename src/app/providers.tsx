import { ThemeProvider } from "next-themes";
import { Toolbar } from "basehub/next-toolbar";

import { BaseHubThemeProvider } from "@/context/basehub-theme-provider";
import { TooltipProvider } from "@/common/tooltip";
import { FeatureFlagProvider } from "@/context/feature-flag-provider";
import { getServerFeatureFlags } from "@/config/feature-flags";

const SKIP_REMOTE_DATA = process.env.SKIP_REMOTE_DATA === "1";

export function Providers({ children }: { children: React.ReactNode }) {
  const initialFeatureFlags = getServerFeatureFlags();

  return (
    <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light" forcedTheme="light">
      {!SKIP_REMOTE_DATA && <Toolbar />}
      <BaseHubThemeProvider />
      <FeatureFlagProvider initialFlags={initialFeatureFlags}>
        <TooltipProvider>{children}</TooltipProvider>
      </FeatureFlagProvider>
    </ThemeProvider>
  );
}
