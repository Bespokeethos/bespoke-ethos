type FlagName =
  | "heroSlideshow"
  | "solutionsOverview"
  | "caseStudiesCarousel"
  | "blogHighlights"
  | "contactForm"
  | "calendlyEmbed"
  | "trustBadges"
  | "footerBadgeBar";

export const DEFAULT_FEATURE_FLAGS: Record<FlagName, boolean> = {
  heroSlideshow: true,
  solutionsOverview: true,
  caseStudiesCarousel: true,
  blogHighlights: true,
  contactForm: true,
  calendlyEmbed: true,
  trustBadges: true,
  footerBadgeBar: true,
};

export type FeatureFlags = typeof DEFAULT_FEATURE_FLAGS;
export type FeatureFlagKey = keyof FeatureFlags;

function parseFlagOverrides(rawValue: string | undefined): Partial<FeatureFlags> {
  if (!rawValue) return {};

  try {
    const parsed = JSON.parse(rawValue) as Record<string, unknown>;
    return Object.entries(parsed).reduce<Partial<FeatureFlags>>((acc, [key, value]) => {
      if (key in DEFAULT_FEATURE_FLAGS && typeof value === "boolean") {
        acc[key as FeatureFlagKey] = value;
      }
      return acc;
    }, {});
  } catch {
    return {};
  }
}

export function getServerFeatureFlags(): FeatureFlags {
  const serverOverrides = parseFlagOverrides(process.env.FEATURE_FLAGS);

  return {
    ...DEFAULT_FEATURE_FLAGS,
    ...serverOverrides,
  };
}

export function getClientFeatureFlagOverrides(): Partial<FeatureFlags> {
  return parseFlagOverrides(process.env.NEXT_PUBLIC_FEATURE_FLAGS);
}

export function isFeatureEnabled(
  flags: FeatureFlags,
  key: FeatureFlagKey,
  fallback: boolean = DEFAULT_FEATURE_FLAGS[key],
): boolean {
  return key in flags ? flags[key] : fallback;
}
