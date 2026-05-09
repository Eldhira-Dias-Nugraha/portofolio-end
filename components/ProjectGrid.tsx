'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';
import { Reveal } from './Reveal';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Software', 'Graphic Design'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase">Galleria</h2>
            </Reveal>
            <p className="text-gray-400">Handpicked projects that showcase my skills.</p>
          </div>
          
          <div className="flex bg-black p-1 border-2 border-black">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-sm font-bold transition-all ${filter === cat ? 'bg-purple-500 text-white' : 'text-white hover:text-purple-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white group"
            >
              <div className="relative border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all overflow-hidden">
                <div className="h-56 bg-slate-200 border-b-2 border-black flex items-center justify-center font-black text-4xl text-slate-400">
                  {project.category === 'Software' ? '</>' : 'ART'}
                </div>
                
                <div className="p-6 text-black">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">{project.category}</span>
                    <div className="flex gap-2">
                       <Github size={16} className="cursor-pointer hover:text-purple-500" />
                       <ExternalLink size={16} className="cursor-pointer hover:text-purple-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-black mb-3 uppercase">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-100 border border-black text-[10px] font-bold uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
