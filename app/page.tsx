import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import Experience from '@/components/Experience';
import Box3D from '@/components/Box3D';
import Certificates from '@/components/Certificates';

export default function Home() {
  return (
    <div className="perspective-container">
      <Hero />
      
      <Box3D centered={true}>
        <Experience />
      </Box3D>

      <Box3D side="right">
        <section id="projects" className="py-24 container mx-auto px-6">
          <div className="text-center space-y-8">
            <h2 className="text-6xl md:text-9xl font-nagasaki uppercase">
              Selected <span className="text-gradient-animate">Works</span>
            </h2>
            <div className="py-20 border-2 border-dashed border-white/10 rounded-[3rem] bg-white/[0.02] backdrop-blur-sm">
              <p className="text-2xl md:text-4xl font-serif-italic text-slate-500 italic">
                Project details <span className="text-white">coming soon...</span>
              </p>
              <p className="mt-4 text-sm font-mono text-slate-600 uppercase tracking-[0.3em]">
                Currently refining the portfolio experience
              </p>
            </div>
          </div>
        </section>
      </Box3D>

      <Box3D centered={true}>
        <Certificates />
      </Box3D>

      <Box3D side="right">
        <section id="contact" className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-6xl md:text-8xl font-nagasaki">GET IN TOUCH</h2>
            <p className="text-slate-400 text-lg font-mono">
              Ready to build something amazing? <br />
              Feel free to reach out anytime!
            </p>
            <a 
              href="mailto:eldhiradias@gmail.com"
              className="neo-button px-12 py-6 text-xl font-bold inline-block"
            >
              SAY HELLO
            </a>
          </div>
        </section>
      </Box3D>

      <footer className="py-10 border-t border-purple-900/20 text-center text-gray-500 text-sm">
        <p>© 2025 Creative Portfolio. Built with Next.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
