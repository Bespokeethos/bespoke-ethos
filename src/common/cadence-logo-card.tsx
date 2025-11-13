import Image from "next/image";

export function CadenceLogoCard({ size = 96 }: { size?: number }) {
  return (
    <div
      className="be-glass-card relative overflow-hidden rounded-lg border border-white/20 bg-white/10 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5"
      style={{ width: size, height: size }}
      aria-label="Cadence logo"
    >
      <Image
        src="/assets/generated/cadence-logo.png"
        alt="Cadence logo"
        fill
        priority={false}
        className="object-contain opacity-85"
        sizes={`${size}px`}
      />
    </div>
  );
}

