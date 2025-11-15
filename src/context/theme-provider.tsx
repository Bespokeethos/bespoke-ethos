import { oklch, rgb } from "culori";
import colors from "tailwindcss/colors";

const FALLBACK_ACCENT: Record<string, string> = {
  50: "#F3F6F4",
  100: "#E7EFEA",
  200: "#D7E5DD",
  300: "#C1D4C9",
  400: "#A9C2B1",
  500: "#8BAA91",
  600: "#77987D",
  700: "#647E69",
  800: "#4D6252",
  900: "#3D4D42",
  950: "#283329",
};

const FALLBACK_GRAYSCALE: Record<string, string> = {
  50: "#FAFAF9",
  100: "#F5F5F4",
  200: "#E7E5E4",
  300: "#D6D3D1",
  400: "#A8A29E",
  500: "#78716C",
  600: "#57534E",
  700: "#44403C",
  800: "#292524",
  900: "#1C1917",
  950: "#0C0A09",
};

function anyColorToRgb(color: string) {
  const parsed = oklch(color);
  const converted = rgb(parsed);
  if (!converted) {
    throw new Error(`Invalid color format: ${color}`);
  }
  return {
    r: Math.round(converted.r * 255),
    g: Math.round(converted.g * 255),
    b: Math.round(converted.b * 255),
  };
}

function buildCssVariables(accent: Record<string, string>, grayScale: Record<string, string>) {
  const css: string[] = [];

  Object.entries(accent).forEach(([key, value]) => {
    const rgbColor = anyColorToRgb(value);
    css.push(`--accent-${key}: ${value}; --accent-rgb-${key}: ${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b};`);
  });

  Object.entries(grayScale).forEach(([key, value]) => {
    const rgbColor = anyColorToRgb(value);
    css.push(
      `--grayscale-${key}: ${value}; --grayscale-rgb-${key}: ${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b};`,
    );
  });

  return css;
}

export function ThemeAccentProvider() {
  // Use the same muted palette that the old BaseHub theme provider defaulted to
  const accent = colors.emerald ?? FALLBACK_ACCENT;
  const grayScale = FALLBACK_GRAYSCALE;

  const cssVars = buildCssVariables(accent, grayScale);
  cssVars.push(`--text-on-accent: ${FALLBACK_GRAYSCALE[50]};`);

  return (
    <style>{`
      :root {
        ${cssVars.join("\n")}
      }
    `}</style>
  );
}

