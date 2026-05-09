'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Github, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Journey', href: '#experience' },
    { name: 'Works', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  // Smart Hide/Show Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // Hide when scrolling down
    } else {
      setHidden(false); // Show when scrolling up
    }
    setScrolled(latest > 50);
  });

  // Active Section Tracking
  useEffect(() => {
    const sections = ['home', 'experience', 'projects', 'certificates', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Center-based detection
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-500 px-6 py-4 md:px-12 ${
        scrolled ? 'bg-black/40 backdrop-blur-2xl border-b border-white/5 py-3' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-black text-xl transition-transform group-hover:rotate-12">
            E
          </div>
          <span className="text-2xl font-nagasaki tracking-tighter text-white uppercase hidden sm:block">
            Eldhira <span className="text-white/30">Dias</span>
          </span>
        </Link>
        
        {/* Desktop Links - Smart Pill */}
        <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1 backdrop-blur-md">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-4">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/Eldhira-Dias-Nugraha" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-colors"
          >
            <Github size={16} /> Github
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-black/95 border-b border-white/10 p-8 flex flex-col gap-6 lg:hidden backdrop-blur-2xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-3xl font-nagasaki text-white uppercase italic tracking-wider hover:text-cyan-400"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
