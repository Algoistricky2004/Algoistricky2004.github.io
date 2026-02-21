import { useState } from 'react'
import { Github, ExternalLink, Sparkles, Tag } from 'lucide-react'
import resumeData from '../../data/resume.json'

const FILTER_TAGS = ['All', 'LLM', 'NLP', 'Computer Vision', 'Scientific ML', 'RAG']

const TAG_COLORS: Record<string, string> = {
  'LLM': 'bg-cyber-cyan/10 text-cyber-cyan',
  'RLHF': 'bg-cyber-purple/10 text-cyber-purple',
  'NLP': 'bg-green-400/10 text-green-400',
  'RAG': 'bg-cyber-gold/10 text-cyber-gold',
  'GAN': 'bg-cyber-coral/10 text-cyber-coral',
  'Scientific ML': 'bg-blue-400/10 text-blue-400',
  'default': 'bg-cyber-border/30 text-cyber-muted',
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const projects = resumeData.projects

  const filtered = filter === 'All' ? projects : projects.filter(p => 
    p.tags.some(t => t.includes(filter) || filter.includes(t))
  )

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 fade-section">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <p className="font-mono text-cyber-cyan text-sm mb-2">03. projects</p>
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-cyber-text">
            What I've Built
          </h2>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTER_TAGS.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-3 py-1.5 font-mono text-xs rounded transition-all duration-200 ${
                filter === t
                  ? 'bg-cyber-cyan text-cyber-bg'
                  : 'glass border border-cyber-border text-cyber-muted hover:border-cyber-cyan/40 hover:text-cyber-text'
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(project => (
            <div key={project.id}
              className={`glass glass-hover rounded-xl p-5 flex flex-col border-cyber-border ${
                project.highlight ? 'ring-1 ring-cyber-cyan/20' : ''
              }`}>
              
              {project.highlight && (
                <div className="flex items-center gap-1.5 mb-3">
                  <Sparkles size={12} className="text-cyber-gold" />
                  <span className="font-mono text-xs text-cyber-gold">Featured</span>
                </div>
              )}

              <h3 className="font-display font-600 text-base text-cyber-text mb-2 leading-snug">
                {project.title}
              </h3>

              <p className="text-sm text-cyber-muted/80 leading-relaxed mb-3 flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 4).map(tag => (
                  <span key={tag}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono rounded ${
                      TAG_COLORS[tag] || TAG_COLORS.default
                    }`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-2 mt-auto">
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-cyber-muted hover:text-cyber-text transition-colors">
                  <Github size={13} /> Code
                </a>
                {('arxiv' in project && project.arxiv) && (
                  <a href={project.arxiv as string} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-cyber-muted hover:text-cyber-cyan transition-colors">
                    <ExternalLink size={13} /> Paper
                  </a>
                )}
                <span className="ml-auto font-mono text-xs text-cyber-muted/50">{project.year}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="https://github.com/Algoistricky2004" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-cyber-muted hover:text-cyber-cyan transition-colors">
            <Github size={16} /> View all repos on GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}
