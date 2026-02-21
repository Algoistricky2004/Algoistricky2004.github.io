import { useState } from 'react'
import { ExternalLink, BookMarked, Filter } from 'lucide-react'
import papers from '../../data/must-read-papers.json'

const CATEGORY_COLORS: Record<string, string> = {
  'Alignment':       'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/20',
  'Reasoning':       'bg-cyber-purple/10 text-cyber-purple border-cyber-purple/20',
  'Foundations':     'bg-cyber-gold/10 text-cyber-gold border-cyber-gold/20',
  'Interpretability':'bg-green-400/10 text-green-400 border-green-400/20',
  'Diffusion Models':'bg-cyber-coral/10 text-cyber-coral border-cyber-coral/20',
  'Safe & Ethical AI':'bg-orange-400/10 text-orange-400 border-orange-400/20',
}

const ALL_CATS = ['All', ...Array.from(new Set(papers.map(p => p.category)))]

export default function MustReadPapers() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All' ? papers : papers.filter(p => p.category === activeFilter)

  return (
    <section id="must-read" className="py-24 px-4 sm:px-6 fade-section">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <p className="font-mono text-cyber-cyan text-sm mb-2">03. must-read</p>
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-cyber-text">
            Papers That Shaped My Thinking
          </h2>
          <p className="text-cyber-muted mt-2 max-w-xl text-sm">
            A curated reading list across my research domains. Updated as I find gems worth sharing.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Filter size={14} className="text-cyber-muted mt-1.5 flex-shrink-0" />
          {ALL_CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 text-xs font-mono rounded border transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-cyber-cyan text-cyber-bg border-cyber-cyan'
                  : 'glass border-cyber-border text-cyber-muted hover:border-cyber-cyan/40 hover:text-cyber-cyan'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Papers grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {filtered.map((paper) => (
            <a
              key={paper.id}
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover rounded-xl p-5 border-cyber-border group block transition-all duration-200 hover:border-cyber-cyan/30">

              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <BookMarked size={14} className="text-cyber-cyan flex-shrink-0 mt-0.5" />
                  <span className={`px-2 py-0.5 text-xs font-mono border rounded ${
                    CATEGORY_COLORS[paper.category] || 'bg-cyber-border/20 text-cyber-muted border-cyber-border/30'
                  }`}>
                    {paper.category}
                  </span>
                  <span className="font-mono text-xs text-cyber-muted">{paper.year}</span>
                </div>
                <ExternalLink size={13} className="text-cyber-muted group-hover:text-cyber-cyan transition-colors flex-shrink-0" />
              </div>

              <h3 className="font-display font-600 text-sm text-cyber-text leading-snug mb-1 group-hover:text-cyber-cyan transition-colors">
                {paper.title}
              </h3>

              <p className="font-mono text-xs text-cyber-muted mb-3 italic">
                {paper.authors}
              </p>

              <div className="border-t border-cyber-border/40 pt-3">
                <p className="text-xs text-cyber-muted/80 leading-relaxed">
                  <span className="text-cyber-cyan font-mono">→</span> {paper.why}
                </p>
              </div>
            </a>
          ))}
        </div>

        

      </div>
    </section>
  )
}
