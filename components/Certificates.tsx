'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

const certificates = [
  {
    id: 1,
    title: "Frontend Developer React",
    issuer: "Pro Course",
    date: "2024",
    image: "/assets/SERTF/FREACT.png",
    description: "Professional certification focused on building interactive and modern user interfaces using the React.js ecosystem."
  },
  {
    id: 2,
    title: "Cyber Security - Kabupaten Level",
    issuer: "Local Government",
    date: "2024",
    image: "/assets/SERTF/CYBER-KAB.jpeg",
    description: "Validation of expertise in digital security and threat prevention at the regional (Kabupaten) competition level."
  },
  {
    id: 3,
    title: "React.js Basic",
    issuer: "Tech Academy",
    date: "2023",
    image: "/assets/SERTF/ReactB.png",
    description: "Foundational mastery of React concepts including components, props, and state management for web applications."
  },
  {
    id: 4,
    title: "JavaScript Basic",
    issuer: "Skill Academy",
    date: "2023",
    image: "/assets/SERTF/javascript.png",
    description: "Core programming logic certification covering JavaScript variables, functions, and DOM manipulation basics."
  },
  {
    id: 5,
    title: "SQL Basic",
    issuer: "Data Institute",
    date: "2023",
    image: "/assets/SERTF/SQLB.png",
    description: "Foundational knowledge in relational database management, data querying, and basic SQL syntax."
  },
  {
    id: 6,
    title: "CSS Basic",
    issuer: "Web Design Pro",
    date: "2023",
    image: "/assets/SERTF/CSSB.png",
    description: "Certification in styling basics, responsive layouts, and modern CSS techniques for professional web design."
  }
];

export default function Certificates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="certificates" className="py-24 relative overflow-hidden md:overflow-visible" ref={containerRef}>
      <div className="text-center mb-24 md:mb-32 px-6">
        <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-nagasaki uppercase leading-none">
          Achievement <span className="text-gradient-animate">Roadmap</span>
        </h2>
        <p className="mt-4 md:mt-6 text-slate-500 font-mono text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.5em]">
          Certification & Professional Journey
        </p>
      </div>

      {/* Central Roadmap Line - Hidden on mobile, shown on desktop */}
      {!isMobile && (
        <div className="absolute left-1/2 top-[400px] bottom-0 w-1 bg-white/10 -translate-x-1/2 hidden lg:block">
          <motion.div 
            style={{ scaleY }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500 via-cyan-400 to-white origin-top shadow-[0_0_15px_rgba(139,92,246,0.5)]"
          />
        </div>
      )}

      <div className="space-y-24 md:space-y-48 max-w-7xl mx-auto px-6">
        {certificates.map((cert, i) => (
          <div key={cert.id} className="relative">
            {/* Roadmap Node - Desktop only */}
            {!isMobile && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 z-30 hidden lg:block">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="w-full h-full bg-black border-4 border-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                />
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : (i % 2 === 0 ? -100 : 100), y: isMobile ? 50 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 md:gap-12 lg:gap-24`}
            >
              {/* Image Container */}
              <div className="w-full lg:w-3/5 group">
                <motion.div 
                  whileHover={{ scale: isMobile ? 1 : 1.02 }}
                  className="relative aspect-[16/10] bg-slate-900 border-2 border-white/20 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                  <Image 
                    src={cert.image} 
                    alt={cert.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 lg:group-hover:scale-105"
                  />
                  {/* Glass Overlay */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                    <div className="bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2">
                      <ShieldCheck size={12} className="text-cyan-400" />
                      <span className="text-[8px] md:text-[10px] font-mono text-white/80 uppercase tracking-widest">{cert.issuer}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-2/5 space-y-4 md:space-y-6 text-center lg:text-left px-2">
                <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                  <Award size={14} className="text-purple-500" />
                  <span>{cert.date}</span>
                </div>
                
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-nagasaki text-white uppercase italic leading-none">
                  {cert.title}
                </h3>
                
                <p className="text-sm md:text-lg text-slate-400 font-mono leading-relaxed max-w-md mx-auto lg:mx-0">
                  {cert.description}
                </p>

                <div className="pt-2 md:pt-4 flex justify-center lg:justify-start">
                  <motion.button 
                    whileHover={{ scale: 1.05, x: isMobile ? 0 : 10 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-4 px-6 py-3 md:px-8 md:py-4 bg-white text-black font-black uppercase text-[10px] md:text-xs tracking-widest rounded-xl md:rounded-2xl hover:bg-cyan-400 transition-colors"
                  >
                    View Credential <ExternalLink size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
