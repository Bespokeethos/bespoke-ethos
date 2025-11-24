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
    image: "/assets/generated/hero-cadence-square.webp",
    caption: "A premium, relationship-first customer chatbot.",
  },
  {
    id: "redbridging",
    title: "Redbridging",
    href: "/solutions/redbridging",
    image: "/assets/generated/hero-redbridging-square.webp",
    caption: "AI readiness audit and tissue engine deployment.",
  },
  {
    id: "flowstack",
    title: "Flowstack",
    href: "/solutions/flowstack",
    image: "/assets/generated/hero-flowstack-square.webp",
    caption: "Single-workflow automation to relationship-first chatbots.",
  },
  {
    id: "consensus",
    title: "Consensus Engine™",
    href: "/solutions/consensus-engine",
    image: "/assets/generated/hero-consensus-square.webp",
    caption: "Deep research and decision-making support.",
  },
];

// --- Main Component ---

interface CubeFaceProps {
  product: typeof FLAGSHIP_PRODUCTS[0];
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CubeFace: React.FC<CubeFaceProps> = ({
  product,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Link href={product.href} className="block w-full h-full">
      <div
        className={clsx(
          "w-full h-full cursor-pointer transform-gpu transition-all duration-300 ease-in-out relative",
          isHovered && "cube-face-hovered"
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          transform: isHovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="object-cover w-full h-full"
          style={{ border: "5px solid black" }}
        />
      </div>
    </Link>
  );
};

export const FlagshipCarousel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  const startRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setRotation((prev) => (prev + 90) % 360);
    }, 4000); // Rotate every 4 seconds
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

  // Calculate translateZ for cube faces
  // For a 400px face, translateZ should be half of face width = 200px
  const translateZ = 200;

  return (
    <div className="py-16 sm:py-20 bg-surface-primary dark:bg-dark-surface-primary">
      <style>{`
        @keyframes trailingGlow {
          0% {
            box-shadow: 
              0 0 0 0 rgba(255, 140, 0, 0),
              15px 0 20px -5px rgba(255, 140, 0, 0.8),
              0 15px 20px -5px rgba(255, 140, 0, 0.4),
              -15px 0 20px -5px rgba(255, 140, 0, 0.2),
              0 -15px 20px -5px rgba(255, 140, 0, 0.3);
          }
          25% {
            box-shadow: 
              0 0 0 0 rgba(255, 140, 0, 0),
              0 15px 20px -5px rgba(255, 140, 0, 0.8),
              -15px 0 20px -5px rgba(255, 140, 0, 0.4),
              0 -15px 20px -5px rgba(255, 140, 0, 0.2),
              15px 0 20px -5px rgba(255, 140, 0, 0.3);
          }
          50% {
            box-shadow: 
              0 0 0 0 rgba(255, 140, 0, 0),
              -15px 0 20px -5px rgba(255, 140, 0, 0.8),
              0 -15px 20px -5px rgba(255, 140, 0, 0.4),
              15px 0 20px -5px rgba(255, 140, 0, 0.2),
              0 15px 20px -5px rgba(255, 140, 0, 0.3);
          }
          75% {
            box-shadow: 
              0 0 0 0 rgba(255, 140, 0, 0),
              0 -15px 20px -5px rgba(255, 140, 0, 0.8),
              15px 0 20px -5px rgba(255, 140, 0, 0.4),
              0 15px 20px -5px rgba(255, 140, 0, 0.2),
              -15px 0 20px -5px rgba(255, 140, 0, 0.3);
          }
          100% {
            box-shadow: 
              0 0 0 0 rgba(255, 140, 0, 0),
              15px 0 20px -5px rgba(255, 140, 0, 0.8),
              0 15px 20px -5px rgba(255, 140, 0, 0.4),
              -15px 0 20px -5px rgba(255, 140, 0, 0.2),
              0 -15px 20px -5px rgba(255, 140, 0, 0.3);
          }
        }
        
        .cube-face-hovered {
          animation: trailingGlow 2s ease-in-out infinite;
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 
          className="text-black dark:text-white mb-12 sm:mb-16 font-accent" 
          style={{ fontSize: 'clamp(1.47rem, 2.24vw, 2.1rem)' }}
        >
          Flagship Collection
        </h2>
        <div className="flex justify-center items-center min-h-[550px] sm:min-h-[600px]">
          {/* Frosted glass container */}
          <div 
            className="relative p-8 sm:p-12 rounded-3xl"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 20px 60px rgba(255, 140, 0, 0.4)",
            }}
          >
            {/* 3D Perspective container */}
            <div 
              className="relative"
              style={{ 
                perspective: "1200px",
              }}
            >
              {/* 3D Cube */}
              <div
                ref={cubeRef}
                className="relative w-[400px] h-[400px] mx-auto"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotation}deg)`,
                  transition: isPaused ? "transform 0.5s ease-out" : "transform 2s ease-in-out",
                }}
              >
                {/* Front Face - Cadence */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(0deg) translateZ(${translateZ}px)`,
                  }}
                >
                  <CubeFace
                    product={FLAGSHIP_PRODUCTS[0]!}
                    isHovered={hoveredIndex === 0}
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
                {/* Right Face - Redbridging */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(90deg) translateZ(${translateZ}px)`,
                  }}
                >
                  <CubeFace
                    product={FLAGSHIP_PRODUCTS[1]!}
                    isHovered={hoveredIndex === 1}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
                {/* Back Face - Flowstack */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(180deg) translateZ(${translateZ}px)`,
                  }}
                >
                  <CubeFace
                    product={FLAGSHIP_PRODUCTS[2]!}
                    isHovered={hoveredIndex === 2}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
                {/* Left Face - Consensus Engine */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(270deg) translateZ(${translateZ}px)`,
                  }}
                >
                  <CubeFace
                    product={FLAGSHIP_PRODUCTS[3]!}
                    isHovered={hoveredIndex === 3}
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
