'use client';

import { motion, useSpring, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingBackground() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const starY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#020617] perspective-[1000px]">
      
      {/* Optimized Starfield (Less stars on mobile for iOS performance) */}
      <motion.div 
        style={{ y: starY }}
        className="absolute inset-0 opacity-40 will-change-transform"
      >
        {[...Array(isMobile ? 30 : 80)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: (isMobile ? 1 : Math.random() * 2) + 'px',
              height: (isMobile ? 1 : Math.random() * 2) + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 200 + '%',
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Interactive Nebula Glows - LIGHTER for iOS */}
      {!isMobile && (
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[80px] will-change-transform"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
      
      {/* Static Glows - Reduced blur for mobile */}
      <div className={`absolute top-1/4 -right-20 ${isMobile ? 'w-40 h-40 blur-[40px]' : 'w-[600px] h-[600px] blur-[100px]'} bg-blue-600/5 rounded-full animate-pulse`} />
      <div className={`absolute bottom-1/4 -left-20 ${isMobile ? 'w-40 h-40 blur-[40px]' : 'w-[600px] h-[600px] blur-[100px]'} bg-purple-600/5 rounded-full animate-pulse`} style={{ animationDelay: '2s' }} />

      {/* Parallax Elements - Disabled on mobile to save CPU/Memory on iOS */}
      {!isMobile && [...Array(8)].map((_, i) => (
        <div
          key={`obj-${i}`}
          className="absolute text-white/5 font-serif-italic select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: Math.random() * 40 + 20 + 'px',
          }}
        >
          {['✧', '✦', '☼', '☽', '◈', '◇', '★'][i % 7]}
        </div>
      ))}

      {/* Moving Grid Floor - Optimized transform */}
      <div className="absolute bottom-0 w-full h-1/2 overflow-hidden">
        <motion.div 
          style={{ 
            rotateX: 70,
            y: gridY,
            transformOrigin: "bottom center",
          }}
          className="w-[200%] h-[200%] mx-auto bg-[linear-gradient(rgba(139,92,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:100px_100px] opacity-10 will-change-transform"
        />
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
