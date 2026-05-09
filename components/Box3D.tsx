'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface Box3DProps {
  children: React.ReactNode;
  side?: 'left' | 'right';
  centered?: boolean;
}

export default function Box3D({ children, side = 'left', centered = false }: Box3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Cinematic 3D Voyage: Content "floats" in from the depth (Z)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const z = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [-200, 0, 200] : [-500, 0, 500]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [10, 0, -10] : [20, 0, -20]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], centered ? [0, 0, 0] : (side === 'left' ? (isMobile ? [-8, 0, 8] : [-15, 0, 15]) : (isMobile ? [8, 0, -8] : [15, 0, -15])));
  
  // Keep opacity at 1 once it fades in, don't fade out at the bottom
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <div 
      ref={ref} 
      className={`relative w-full overflow-hidden md:overflow-visible py-10 md:py-20 ${centered ? 'flex justify-center' : ''} will-change-transform`}
    >
      <motion.div
        style={{
          z,
          rotateX,
          rotateY,
          opacity,
          scale,
          transformStyle: "preserve-3d",
        }}
        className={`w-full ${centered ? 'max-w-7xl' : 'max-w-6xl'} ${side === 'right' ? 'ml-auto' : ''} will-change-transform`}
      >
        {children}
      </motion.div>
    </div>
  );
}
