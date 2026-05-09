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
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 hidden md:block">
          <motion.div 
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute inset-0 bg-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.6)]" 
          />
        </div>

        <div className="space-y-24 md:space-y-32">
          {experiences.map((exp, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full md:w-[45%] z-10"
              >
                <div className="neo-box p-8 md:p-12 bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-[2rem] text-white relative group hover:border-purple-500 transition-all duration-500 shadow-2xl">
                  {/* Connection Node */}
                  <div className={`absolute top-1/2 -translate-y-1/2 hidden md:block w-6 h-6 rounded-full bg-black border-4 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20
                    ${i % 2 === 0 ? '-right-[3.3rem]' : '-left-[3.3rem]'}
                  `} />
                  
                  <div className="flex flex-col gap-3 mb-8">
                    <span className="text-xs font-mono text-purple-400 font-bold tracking-[0.3em] uppercase">{exp.period}</span>
                    <h3 className="text-3xl md:text-5xl font-nagasaki text-white group-hover:text-purple-400 transition-colors uppercase italic">{exp.role}</h3>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-white/80">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                    {exp.company}
                  </h4>
                  
                  <p className="text-slate-400 text-lg leading-relaxed font-mono border-l-2 border-white/5 pl-6">
                    {exp.desc}
                  </p>
                </div>
              </motion.div>

              {/* Spacer for MD screens */}
              <div className="hidden md:block w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
