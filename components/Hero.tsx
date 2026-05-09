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
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setStep(1);
    setIsTyping(true);
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
    return () => clearInterval(timer);
  }, [roleIndex]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
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
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const letter = {
    hidden: { opacity: 0, display: 'none' },
    visible: { opacity: 1, display: 'inline-block' },
  };

  return (
    <section id="home" className="container mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 order-2 lg:order-1"
        >
          <div className="inline-block px-4 py-1.5 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest border-2 border-black">
            Open To Work
          </div>

          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl leading-none text-white whitespace-nowrap font-nagasaki">
              Eldhira Dias
            </h1>
            
            <div className="relative space-y-4">
              <div className="h-20 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.h2 
                    key={roleIndex}
                    variants={sentence}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl md:text-5xl font-black uppercase italic text-gradient-animate"
                  >
                    <span className="text-slate-700 not-italic mr-4">{'<'}</span>
                    {roles[roleIndex].split(" ").map((word, wordIndex) => (
                      <span key={wordIndex} className="inline-block whitespace-nowrap mr-3 last:mr-0">
                        {word.split("").map((char, charIndex) => (
                          <motion.span key={charIndex} variants={letter}>
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                    <span className="text-slate-700 not-italic ml-4">{'/>'}</span>
                  </motion.h2>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-4 font-mono">
                <div className="text-xs text-slate-500 uppercase tracking-[0.2em]">Rendering Module</div>
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

          <div className="space-y-2 text-slate-400 font-mono text-sm max-w-lg">
             <p className="flex gap-2">
               <span className="text-white">{'>'}</span> 
               Focused on building high-performance web solutions with modern architecture and immersive animations.
             </p>
          </div>

          <div className="flex flex-col gap-6 pt-4">
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/eldhiradias/" target="_blank" className="neo-button bg-white text-black px-10 py-5 font-black text-lg flex items-center gap-2">
                Chat Me
              </a>
              <a href="https://github.com/Eldhira-Dias-Nugraha" target="_blank" className="bg-transparent border-2 border-white/20 text-white px-10 py-5 font-black text-lg hover:bg-white/10 transition-all flex items-center gap-2">
                <GithubIcon size={18} /> Github
              </a>
            </div>
            <div className="flex gap-6 items-center pl-2">
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex justify-center lg:justify-end perspective-1000 order-1 lg:order-2 group"
        >
          {/* Main 3D Box */}
          <div className="relative w-[320px] md:w-[550px] h-[400px] md:h-[650px]" style={{ transformStyle: "preserve-3d" }}>
            
            {/* Front Face */}
            <div className="absolute inset-0 bg-slate-900 border-2 border-white/20 rounded-[3rem] overflow-hidden z-10 shadow-2xl" style={{ transform: "translateZ(40px)" }}>
              <Image src="/assets/logo/L.png" alt="Eldhira Dias" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" priority />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[85%] bg-black/70 border border-white/10 py-6 px-8 rounded-[2rem] text-center shadow-2xl backdrop-blur-2xl">
                <h3 className="text-3xl md:text-5xl font-nagasaki tracking-wider text-white uppercase italic">Eldhira Dias</h3>
              </div>
            </div>

            {/* Back Face */}
            <div className="absolute inset-0 bg-slate-800 border-2 border-white/5 rounded-[3rem]" style={{ transform: "translateZ(-40px) rotateY(180deg)" }} />

            {/* Top Side */}
            <div className="absolute top-0 left-[3rem] right-[3rem] h-[80px] bg-white/5 border-x border-white/10" style={{ transform: "rotateX(90deg) translateY(-40px)" }} />
            
            {/* Bottom Side */}
            <div className="absolute bottom-0 left-[3rem] right-[3rem] h-[80px] bg-black/80 border-x border-white/10" style={{ transform: "rotateX(-90deg) translateY(40px)" }} />

            {/* Right Side */}
            <div className="absolute right-0 top-[3rem] bottom-[3rem] w-[80px] bg-white/5 border-y border-white/10" style={{ transform: "rotateY(90deg) translateX(40px)" }} />

            {/* Left Side */}
            <div className="absolute left-0 top-[3rem] bottom-[3rem] w-[80px] bg-black/80 border-y border-white/10" style={{ transform: "rotateY(-90deg) translateX(-40px)" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
