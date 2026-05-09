'use client';

import { motion, useSpring, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  // Smooth mouse movement for the spotlight
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Floating object depth transform
  const objectZ = useTransform(scrollYProgress, [0, 1], [0, 2000]);
  const starY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  
  // Grid Floor Transform (Moved to top level to avoid hook error)
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#020617] perspective-[1000px]">
      
      {/* Moving Starfield (Deep Background) */}
      <motion.div 
        style={{ y: starY }}
        className="absolute inset-0 opacity-40"
      >
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 200 + '%',
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Interactive Nebula Glows (Color accents) */}
      <motion.div 
        className="absolute w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Floating 3D Voyage Objects (Parallax) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`obj-${i}`}
          className="absolute text-white/10 font-serif-italic select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            z: Math.random() * -1500,
            translateZ: objectZ,
            fontSize: Math.random() * 60 + 40 + 'px',
          }}
          initial={{ rotate: Math.random() * 360, opacity: 0 }}
          animate={{ rotate: Math.random() * 360, opacity: 1 }}
          transition={{ rotate: { duration: 50 + Math.random() * 50, repeat: Infinity, ease: "linear" }, opacity: { duration: 1 } }}
        >
          {['✧', '✦', '☼', '☽', '◈', '◇', '★'][i % 7]}
        </motion.div>
      ))}

      {/* Moving Grid Floor (Subtle) */}
      <div className="absolute bottom-0 w-full h-1/2 overflow-hidden">
        <motion.div 
          style={{ 
            rotateX: 70,
            y: gridY,
            transformOrigin: "bottom center",
          }}
          className="w-[200%] h-[200%] mx-auto bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20"
        />
      </div>

      {/* Grainy Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
