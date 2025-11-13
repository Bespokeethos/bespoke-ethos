"use client";

import React, { createContext, useContext, useMemo } from "react";

import {
  DEFAULT_FEATURE_FLAGS,
  FeatureFlagKey,
  FeatureFlags,
  getClientFeatureFlagOverrides,
} from "@/config/feature-flags";

const FeatureFlagContext = createContext<FeatureFlags>(DEFAULT_FEATURE_FLAGS);

type FeatureFlagProviderProps = {
  children: React.ReactNode;
  initialFlags?: FeatureFlags;
};

export function FeatureFlagProvider({
  children,
  initialFlags = DEFAULT_FEATURE_FLAGS,
}: FeatureFlagProviderProps) {
  const clientOverrides = useMemo(() => getClientFeatureFlagOverrides(), []);
  const value = useMemo(
    () => ({
      ...initialFlags,
      ...clientOverrides,
    }),
    [clientOverrides, initialFlags],
  );

  return <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>;
}

export function useFeatureFlag(key: FeatureFlagKey): boolean {
  const flags = useContext(FeatureFlagContext);
  return flags[key];
}

export function useFeatureFlags(): FeatureFlags {
  return useContext(FeatureFlagContext);
}
