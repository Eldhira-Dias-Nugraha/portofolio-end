'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    company: "Personal Project / Freelance",
    role: "Fullstack React Developer",
    period: "2025 - Present",
    desc: "Developing high-fidelity web applications using Next.js, Framer Motion, and modern UI/UX principles."
  },
  {
    company: "Creative Studio",
    role: "UI/UX & Graphic Designer",
    period: "2024 - 2026",
    desc: "Crafting visual identities and interactive prototypes for digital products and brand experiences."
  },
  {
    company: "Tech Hub Academy",
    role: "Junior Web Developer",
    period: "2024 - 2025",
    desc: "Building responsive landing pages and mastering frontend fundamentals like JavaScript and CSS architecture."
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="experience" className="py-24 container mx-auto px-6 overflow-hidden">
      <div className="text-center mb-24">
        <h2 className="text-6xl md:text-9xl font-nagasaki uppercase">
          My <span className="text-gradient-animate">Journey</span>
        </h2>
      </div>

      <div ref={containerRef} className="relative max-w-6xl mx-auto">
        {/* Roadmap Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2">
          <motion.div 
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute inset-0 bg-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.6)]" 
          />
        </div>

        <div className="space-y-16 md:space-y-32">
          {experiences.map((exp, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center justify-between w-full pl-12 md:pl-0 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Content Card - Directly Visible without slide-in animation */}
              <div className="w-full md:w-[45%] z-10 opacity-100">
                <div className="neo-box p-6 md:p-12 bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-2xl md:rounded-[2rem] text-white relative group hover:border-purple-500 transition-all duration-500 shadow-2xl">
                  {/* Connection Node */}
                  <div className={`absolute top-8 md:top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black border-4 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20
                    -left-[3.5rem] md:left-auto
                    ${i % 2 === 0 ? 'md:-right-[3.3rem]' : 'md:-left-[3.3rem]'}
                  `} />
                  
                  <div className="flex flex-col gap-2 md:gap-3 mb-6 md:mb-8">
                    <span className="text-[10px] md:text-xs font-mono text-white/40 font-bold tracking-[0.3em] uppercase">{exp.period}</span>
                    <h3 className="text-2xl md:text-5xl font-nagasaki text-purple-400 uppercase italic leading-tight">{exp.role}</h3>
                  </div>
                  
                  <h4 className="text-base md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-pulse" />
                    {exp.company}
                  </h4>
                  
                  <p className="text-xs md:text-lg text-slate-400 font-mono leading-relaxed border-l-2 border-white/5 pl-4 md:pl-6">
                    {exp.desc}
                  </p>
                </div>
              </div>

              {/* Spacer for MD screens */}
              <div className="hidden md:block w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
