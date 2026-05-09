'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    company: "Freelance",
    role: "Fullstack Developer",
    period: "2023 - Present",
    desc: "Developing various web applications for clients using Next.js and Tailwind CSS."
  },
  {
    company: "Creative Studio",
    role: "Graphic Designer",
    period: "2021 - 2023",
    desc: "Created visual identities and marketing materials for tech startups."
  },
  {
    company: "Tech Hub",
    role: "Junior Developer",
    period: "2020 - 2021",
    desc: "Assisted in building responsive landing pages and optimizing UI components."
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
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-800 -translate-x-1/2 hidden md:block">
          <motion.div 
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute inset-0 bg-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
          />
        </div>

        <div className="space-y-24">
          {experiences.map((exp, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: false, margin: "-100px" }}
                className="w-full md:w-[45%] z-10"
              >
                <div className="neo-box p-8 bg-slate-900 border-2 border-black text-white relative group hover:border-purple-500 transition-colors">
                  {/* Connection Node */}
                  <div className={`absolute top-1/2 -translate-y-1/2 hidden md:block w-4 h-4 rounded-full bg-purple-500 border-2 border-black shadow-[0_0_10px_rgba(139,92,246,0.5)] z-20
                    ${i % 2 === 0 ? '-right-[2.6rem]' : '-left-[2.6rem]'}
                  `} />
                  
                  <div className="flex flex-col gap-2 mb-6">
                    <span className="text-xs font-mono text-purple-500 font-bold tracking-widest uppercase">{exp.period}</span>
                    <h3 className="text-2xl md:text-3xl font-nagasaki text-white group-hover:text-purple-400 transition-colors">{exp.role}</h3>
                  </div>
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    {exp.company}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-mono">
                    {exp.desc}
                  </p>
                </div>
              </motion.div>

              {/* Spacer for the other side */}
              <div className="hidden md:block w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
