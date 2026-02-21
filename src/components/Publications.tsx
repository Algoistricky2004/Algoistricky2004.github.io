import { useState } from 'react'
import { ExternalLink, Tag, RefreshCw, Users } from 'lucide-react'
import publications from '../../data/publications.json'

const TAG_COLORS: Record<string, string> = {
  'LLM Alignment': 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/20',
  'RLHF': 'bg-cyber-purple/10 text-cyber-purple border-cyber-purple/20',
  'Post-Training': 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/20',
  'Biomedical NLP': 'bg-green-400/10 text-green-400 border-green-400/20',
  'Dataset': 'bg-cyber-gold/10 text-cyber-gold border-cyber-gold/20',
  'Summarization': 'bg-cyber-coral/10 text-cyber-coral border-cyber-coral/20',
}

export default function Publications() {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'done'>('idle')

  const handleSync = async () => {
    setSyncStatus('syncing')
    // TODO: Replace with actual sync — call /.netlify/functions/sync_scholar
    // or trigger GitHub Action via workflow_dispatch
    // For now, simulate a fetch
    await new Promise(r => setTimeout(r, 1800))
    setSyncStatus('done')
    setTimeout(() => setSyncStatus('idle'), 3000)
  }

  return (
    <section id="publications" className="py-24 px-4 sm:px-6 fade-section">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-start justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="font-mono text-cyber-cyan text-sm mb-2">02. publications</p>
            <h2 className="font-display font-800 text-3xl sm:text-4xl text-cyber-text">
              Research Papers
            </h2>
          </div>
          <button onClick={handleSync}
            className={`flex items-center gap-2 px-4 py-2 glass border rounded text-sm font-mono transition-all duration-200 ${
              syncStatus === 'syncing'
                ? 'border-cyber-cyan/50 text-cyber-cyan animate-pulse'
                : syncStatus === 'done'
                ? 'border-green-400/50 text-green-400'
                : 'border-cyber-border text-cyber-muted hover:border-cyber-cyan/40 hover:text-cyber-cyan'
            }`}>
            <RefreshCw size={14} className={syncStatus === 'syncing' ? 'animate-spin' : ''} />
            {syncStatus === 'idle' ? 'Sync Scholar' : syncStatus === 'syncing' ? 'Syncing...' : '✓ Updated'}
          </button>
        </div>

        <div className="space-y-5">
          {publications.map((pub, idx) => (
            <div key={pub.id} className="glass glass-hover rounded-xl p-6 border-cyber-border">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-0">
                  {/* Paper number + note */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-cyber-muted">[{String(idx + 1).padStart(2, '0')}]</span>
                    {pub.note && (
                      <span className="px-2 py-0.5 text-xs font-mono bg-cyber-coral/10 text-cyber-coral border border-cyber-coral/20 rounded">
                        {pub.note}
                      </span>
                    )}
                    <span className="font-mono text-xs text-cyber-muted">{pub.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-600 text-base sm:text-lg text-cyber-text mb-2 leading-snug">
                    {pub.title}
                  </h3>

                  {/* Authors */}
                  <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                    <Users size={13} className="text-cyber-muted flex-shrink-0" />
                    <p className="font-mono text-xs text-cyber-muted leading-relaxed">
                      {pub.authors.map((a, i) => (
                        <span key={a}>
                          <span className={a.toLowerCase().includes('chirag') ? 'text-cyber-cyan font-500' : ''}>
                            {a}
                          </span>
                          {i < pub.authors.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                  </div>

                  {/* Abstract */}
                  <p className="text-sm text-cyber-muted/80 leading-relaxed mb-3 line-clamp-2">
                    {pub.abstract}
                  </p>

                  {/* Venue */}
                  <p className="font-mono text-xs text-cyber-muted italic mb-3">{pub.venue}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {pub.tags.map(tag => (
                      <span key={tag}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono border rounded ${
                          TAG_COLORS[tag] || 'bg-cyber-border/20 text-cyber-muted border-cyber-border/30'
                        }`}>
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <a href={pub.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 glass border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono rounded hover:bg-cyber-cyan/10 transition-all">
                    <ExternalLink size={13} /> arXiv
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
