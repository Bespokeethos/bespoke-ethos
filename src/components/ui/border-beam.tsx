import type { CSSProperties } from "react";
import clsx from "clsx";

type BorderBeamProps = {
  lightColor?: string;
  lightWidth?: number;
  duration?: number;
  borderWidth?: number;
  className?: string;
};

export function BorderBeam({
  lightColor = "linear-gradient(90deg, #E40303 0%, #FF8C00 17%, #FFED00 33%, #008026 50%, #24408E 67%, #732982 83%, #E40303 100%)",
  lightWidth = 350,
  duration = 8,
  borderWidth = 1,
  className,
}: BorderBeamProps) {
  const styleVars: CSSProperties = {
    ["--light-color" as string]: lightColor,
    ["--light-width" as string]: `${lightWidth}px`,
    ["--duration" as string]: `${duration}`,
    ["--border-width" as string]: `${borderWidth}px`,
  };

  return (
    <div
      className={clsx("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      style={styleVars}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-[inherit] border-[length:var(--border-width)] border-transparent [background:linear-gradient(var(--light-color),var(--light-color))_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] animate-border-beam" />
    </div>
  );
}

