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
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-500, 0, 500]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], centered ? [0, 0, 0] : (side === 'left' ? [-15, 0, 15] : [15, 0, -15]));
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const springZ = useSpring(z, { stiffness: 50, damping: 20 });
  const springRotateX = useSpring(rotateX, { stiffness: 50, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 50, damping: 20 });

  return (
    <div ref={ref} className="py-40 flex justify-center w-full perspective-[1500px]">
      <motion.div
        style={{
          z: springZ,
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className={`w-full max-w-7xl flex ${centered ? 'justify-center' : (side === 'left' ? 'justify-start' : 'justify-end')} px-6 md:px-10`}
      >
        <div className={`w-full ${centered ? 'md:w-full' : 'md:w-[60%]'}`}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
