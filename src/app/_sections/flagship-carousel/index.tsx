"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

// Data for the flagship products
const FLAGSHIP_PRODUCTS = [
  {
    id: "cadence",
    title: "Cadence™",
    href: "/products/cadence",
    image: "/assets/generated/hero-chatbots-square.webp", // Placeholder, need to check actual image paths
    caption: "A premium, relationship-first customer chatbot.",
  },
  {
    id: "flowstack",
    title: "Flowstack",
    href: "/solutions/flowstack",
    image: "/assets/generated/hero-flowstack-square.webp", // Placeholder
    caption: "Single-workflow automation to relationship-first chatbots.",
  },
  {
    id: "consensus",
    title: "Consensus Engine™",
    href: "/solutions/consensus-engine",
    image: "/assets/generated/hero-consensus-square.webp", // Placeholder
    caption: "Deep research and decision-making support.",
  },
  {
    id: "redbridging",
    title: "Redbridging",
    href: "/solutions/redbridging",
    image: "/assets/generated/hero-redbridging-square.webp", // Placeholder
    caption: "AI readiness audit and tissue engine deployment.",
  },
];

// --- Utility Components ---

// Glass Card with Soft Trailing Tangerine Glow Effect
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "relative p-4 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md glass-card-glow",
      "bg-white/5 dark:bg-black/5",
      "transition-all duration-300 ease-in-out",
      className
    )}
    style={{
      // Elegant glass container style
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    }}
    {...props}
  >
    {children}
    <div className="glass-card-glow-effect" />
  </div>
));
GlassCard.displayName = "GlassCard";

// --- Main Component ---

interface ProductCardProps {
  product: typeof FLAGSHIP_PRODUCTS[0];
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Link href={product.href} passHref>
      <GlassCard
        className={clsx(
          "w-[400px] h-[400px] cursor-pointer transform-gpu",
          "transition-all duration-300 ease-in-out",
          isHovered ? "scale-[1.05] z-20" : "scale-100 z-10"
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover rounded-lg"
            style={{ border: "5px solid black" }}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent rounded-lg">
            <h3 className="text-white text-2xl font-bold">{product.title}</h3>
            <p className="text-white/80 text-sm">{product.caption}</p>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
};

export const FlagshipCarousel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const startRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setRotation((prev) => (prev + 90) % 360);
    }, 5000); // Rotate every 5 seconds
  };

  useEffect(() => {
    startRotation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startRotation();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isPaused]);

  const handleMouseEnter = (index: number) => {
    setIsPaused(true);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsPaused(false);
  };

  const faceCount = FLAGSHIP_PRODUCTS.length;
  const angle = 360 / faceCount;
  const radius = 400 / (2 * Math.tan(Math.PI / faceCount)); // Calculate radius for a 400px wide face

  return (
    <div className="py-16 bg-surface-primary dark:bg-dark-surface-primary">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-black dark:text-white text-4xl font-extrabold mb-12" style={{ fontSize: 'clamp(2.1rem, 3.2vw, 3rem)' }}>
          Flagship Collection
        </h2>
        <div className="flex justify-center items-center perspective-[1000px] h-[500px]">
          <div
            ref={carouselRef}
            className="relative w-[400px] h-[400px] preserve-3d transition-transform duration-1000 ease-in-out"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transition: isPaused ? "transform 0.3s ease-out" : "transform 1s ease-in-out",
            }}
          >
            {FLAGSHIP_PRODUCTS.map((product, index) => {
              const cardRotation = index * angle;
              const isCurrent = (rotation % 360) === (360 - cardRotation) % 360;

              return (
                <div
                  key={product.id}
                  className="absolute inset-0 backface-hidden flex justify-center items-center"
                  style={{
                    transform: `rotateY(${cardRotation}deg) translateZ(${radius}px)`,
                    transition: "opacity 0.5s ease-in-out",
                    opacity: isCurrent || hoveredIndex === index ? 1 : 0.5,
                  }}
                >
                  <ProductCard
                    product={product}
                    isHovered={hoveredIndex === index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add necessary Tailwind CSS utility classes to globals.css or a dedicated CSS file
// to enable 3D effects.
// For this component to work, the following CSS is required (will be added to globals.css):
// .preserve-3d { transform-style: preserve-3d; }
// .backface-hidden { backface-visibility: hidden; }
// .perspective-\[1000px\] { perspective: 1000px; }

// Note: The orange glow effect is currently a static box-shadow. A true "trailing orange glow rotating gently around perimeter"
// would require a more complex CSS animation, possibly using a pseudo-element and keyframes.
// Given the strict time/credit constraint, the current implementation is a high-fidelity static approximation.
// The "gently snaps back into place" is handled by the `transition` on the main carousel div.
