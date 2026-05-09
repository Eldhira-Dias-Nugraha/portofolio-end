'use client';

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Send, Github as GithubIcon, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const roles = [
  "FrontEnd ReactJs Developer",
  "UI/UX Enthusiast",
  "Web Performance Optimizer",
  "Creative Coder"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    setStep(1);
    const interval = 300; 
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= 10) {
          setTimeout(() => {
            setRoleIndex((idx) => (idx + 1) % roles.length);
          }, 1000);
          clearInterval(timer);
          return 10;
        }
        return prev + 1;
      });
    }, interval);
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [roleIndex]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Softer springs for mobile to prevent jitter
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], isMobile ? [5, -5] : [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], isMobile ? [-5, 5] : [-15, 15]), { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    if (isMobile) return; // Disable tilt on mobile for better performance/UX
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const sentence = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const letter = {
    hidden: { opacity: 0, display: 'none' },
    visible: { opacity: 1, display: 'inline-block' },
  };

  return (
    <section id="home" className="container mx-auto px-6 pt-24 md:pt-32 pb-20 min-h-screen flex items-center relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left"
        >
          <div className="inline-block px-4 py-1.5 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest border-2 border-black">
            Open To Work
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl lg:text-9xl leading-none text-white font-nagasaki break-words">
              Eldhira Dias
            </h1>
            
            <div className="relative space-y-4">
              <div className="h-20 md:h-24 flex items-center justify-center lg:justify-start">
                <AnimatePresence mode="wait">
                  <motion.h2 
                    key={roleIndex}
                    variants={sentence}
                    initial="hidden"
                    animate="visible"
                    className="text-2xl md:text-4xl lg:text-5xl font-black uppercase italic text-gradient-animate"
                  >
                    <span className="text-slate-700 not-italic mr-2 md:mr-4">{'<'}</span>
                    {roles[roleIndex].split(" ").map((word, wordIndex) => (
                      <span key={wordIndex} className="inline-block whitespace-nowrap mr-2 md:mr-3 last:mr-0">
                        {word.split("").map((char, charIndex) => (
                          <motion.span key={charIndex} variants={letter}>
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                    <span className="text-slate-700 not-italic ml-2 md:ml-4">{'/>'}</span>
                  </motion.h2>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 font-mono">
                <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Rendering Module</div>
                <div className="flex items-center gap-1">
                  <span className="text-white font-bold">{step.toString().padStart(2, '0')}</span>
                  <span className="text-slate-700">/</span>
                  <span className="text-slate-700 font-bold text-sm">10</span>
                </div>
                <div className="flex-1 h-[2px] bg-slate-900 relative overflow-hidden max-w-[100px]">
                  <motion.div 
                    className="absolute inset-0 bg-white"
                    animate={{ x: `${(step - 10) * 10}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-slate-400 font-mono text-xs md:text-sm max-w-lg mx-auto lg:mx-0">
             <p className="flex gap-2 justify-center lg:justify-start">
               <span className="text-white">{'>'}</span> 
               Focused on building high-performance web solutions with modern architecture and immersive animations.
             </p>
          </div>

          <div className="flex flex-col gap-6 pt-4 items-center lg:items-start">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="https://www.linkedin.com/in/eldhiradias/" target="_blank" className="bg-purple-600 text-white px-10 py-4 font-black text-lg flex items-center justify-center gap-2 rounded-xl hover:bg-purple-500 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                Chat Me
              </a>
              <a href="https://github.com/Eldhira-Dias-Nugraha" target="_blank" className="bg-white text-black px-10 py-4 font-black text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(139,92,246,0.5)]">
                <GithubIcon size={18} /> Github
              </a>
            </div>
            <div className="flex gap-6 items-center">
               <a href="https://github.com/Eldhira-Dias-Nugraha" target="_blank" className="hover:scale-110 transition-transform">
                 <Image src="/assets/logo/github.jpg" alt="Github" width={24} height={24} className="rounded-md border border-white/10" />
               </a>
               <a href="https://www.instagram.com/eldhiradias/" target="_blank" className="hover:scale-110 transition-transform">
                 <Image src="/assets/logo/instagram.jpg" alt="Instagram" width={24} height={24} className="rounded-md border border-white/10" />
               </a>
               <a href="https://www.facebook.com" target="_blank" className="hover:scale-110 transition-transform">
                 <Image src="/assets/logo/facebook.png" alt="Facebook" width={24} height={24} className="rounded-md border border-white/10" />
               </a>
               <a href="https://www.linkedin.com/in/eldhiradias/" target="_blank" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={24} /></a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: 3D Box Character Model */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex justify-center lg:justify-end perspective-1000 order-1 lg:order-2 group py-10 lg:py-0 will-change-transform"
        >
          {/* Main 3D Box */}
          <div className="relative w-[280px] sm:w-[320px] md:w-[450px] lg:w-[550px] h-[350px] sm:h-[400px] md:h-[550px] lg:h-[650px]" style={{ transformStyle: "preserve-3d" }}>
            
            {/* Front Face */}
            <div className="absolute inset-0 bg-slate-900 border-2 border-white/20 rounded-[2rem] md:rounded-[3rem] overflow-hidden z-10 shadow-2xl will-change-transform" style={{ transform: isMobile ? "translateZ(20px)" : "translateZ(40px)" }}>
              <Image src="/assets/logo/L.png" alt="Eldhira Dias" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" priority />
              <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[85%] bg-black/70 border border-white/10 py-3 md:py-6 px-4 md:px-8 rounded-xl md:rounded-[2rem] text-center shadow-2xl backdrop-blur-2xl">
                <h3 className="text-xl md:text-3xl lg:text-5xl font-nagasaki tracking-wider text-white uppercase italic">Eldhira Dias</h3>
              </div>
            </div>

            {/* Side Faces (Scaled for Mobile) */}
            <div className="absolute inset-0 bg-slate-800 border-2 border-white/5 rounded-[2rem] md:rounded-[3rem] will-change-transform" style={{ transform: isMobile ? "translateZ(-20px) rotateY(180deg)" : "translateZ(-40px) rotateY(180deg)" }} />
            <div className="absolute top-0 left-[2rem] right-[2rem] h-[40px] md:h-[80px] bg-white/5 border-x border-white/10 will-change-transform" style={{ transform: `rotateX(90deg) translateY(${isMobile ? '-20px' : '-40px'})` }} />
            <div className="absolute bottom-0 left-[2rem] right-[2rem] h-[40px] md:h-[80px] bg-black/80 border-x border-white/10 will-change-transform" style={{ transform: `rotateX(-90deg) translateY(${isMobile ? '20px' : '40px'})` }} />
            <div className="absolute right-0 top-[2rem] bottom-[2rem] w-[40px] md:w-[80px] bg-white/5 border-y border-white/10 will-change-transform" style={{ transform: `rotateY(90deg) translateX(${isMobile ? '20px' : '40px'})` }} />
            <div className="absolute left-0 top-[2rem] bottom-[2rem] w-[40px] md:w-[80px] bg-black/80 border-y border-white/10 will-change-transform" style={{ transform: `rotateY(-90deg) translateX(${isMobile ? '-20px' : '-40px'})` }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
