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
    image: "/assets/cube-images/cadence.webp",
    caption: "A premium, relationship-first customer chatbot.",
  },
  {
    id: "flowstack",
    title: "Flowstack",
    href: "/solutions/flowstack",
    image: "/assets/cube-images/flowstack.webp",
    caption: "Single-workflow automation to relationship-first chatbots.",
  },
  {
    id: "consensus",
    title: "Consensus Engine™",
    href: "/solutions/consensus-engine",
    image: "/assets/cube-images/consensus-engine.webp",
    caption: "Deep research and decision-making support.",
  },
  {
    id: "redbridging",
    title: "Redbridging",
    href: "/solutions/redbridging",
    image: "/assets/cube-images/redbridging.webp",
    caption: "AI readiness audit and tissue engine deployment.",
  },
];

// --- Utility Components ---

// Glass Card with Frosted Glass Effect and Rotating Orange Glow
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "relative p-0 rounded-xl border border-white/20 shadow-2xl backdrop-blur-xl",
      "bg-white/8 dark:bg-black/8",
      "transition-all duration-300 ease-in-out",
      "glass-card-container",
      className
    )}
    style={{
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(10px)",
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
          isHovered ? "scale-[1.08] z-20" : "scale-100 z-10"
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            style={{ border: "5px solid black" }}
          />
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
    <div className="py-12 sm:py-16 bg-surface-primary dark:bg-dark-surface-primary">
      <style>{`
        @keyframes rotatingGlow {
          0% {
            box-shadow: 
              5px 0 15px rgba(255, 140, 0, 0.6),
              0 5px 15px rgba(255, 140, 0, 0.4),
              -5px 0 15px rgba(255, 140, 0, 0.2),
              0 -5px 15px rgba(255, 140, 0, 0.3);
          }
          25% {
            box-shadow: 
              0 5px 15px rgba(255, 140, 0, 0.6),
              -5px 0 15px rgba(255, 140, 0, 0.4),
              0 -5px 15px rgba(255, 140, 0, 0.2),
              5px 0 15px rgba(255, 140, 0, 0.3);
          }
          50% {
            box-shadow: 
              -5px 0 15px rgba(255, 140, 0, 0.6),
              0 -5px 15px rgba(255, 140, 0, 0.4),
              5px 0 15px rgba(255, 140, 0, 0.2),
              0 5px 15px rgba(255, 140, 0, 0.3);
          }
          75% {
            box-shadow: 
              0 -5px 15px rgba(255, 140, 0, 0.6),
              5px 0 15px rgba(255, 140, 0, 0.4),
              0 5px 15px rgba(255, 140, 0, 0.2),
              -5px 0 15px rgba(255, 140, 0, 0.3);
          }
          100% {
            box-shadow: 
              5px 0 15px rgba(255, 140, 0, 0.6),
              0 5px 15px rgba(255, 140, 0, 0.4),
              -5px 0 15px rgba(255, 140, 0, 0.2),
              0 -5px 15px rgba(255, 140, 0, 0.3);
          }
        }
        
        .carousel-cube-container {
          animation: rotatingGlow 6s ease-in-out infinite;
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-black dark:text-white mb-8 sm:mb-12 font-accent" style={{ fontSize: 'clamp(1.47rem, 2.24vw, 2.1rem)' }}>
          Flagship Collection
        </h2>
        <div className="flex justify-center items-center perspective-[1000px] h-[450px] sm:h-[500px]">
          <div
            ref={carouselRef}
            className="relative w-[400px] h-[400px] preserve-3d transition-transform duration-1000 ease-in-out carousel-cube-container"
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
