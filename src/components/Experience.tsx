import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import resumeData from '../../data/resume.json'

const COMPANY_COLORS: Record<string, string> = {
  'Lexsi Labs': 'text-cyber-cyan border-cyber-cyan/30',
  'University of Illinois Chicago': 'text-cyber-purple border-cyber-purple/30',
  '21Spheres': 'text-cyber-gold border-cyber-gold/30',
  'default': 'text-cyber-muted border-cyber-border',
}

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0)
  const exp = resumeData.experience

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 fade-section">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12">
          <p className="font-mono text-cyber-cyan text-sm mb-2">04. experience</p>
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-cyber-text">
            Career Timeline
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan via-cyber-purple to-transparent" />

          <div className="space-y-4">
            {exp.map((job, idx) => {
              const colorClass = COMPANY_COLORS[job.company] || COMPANY_COLORS.default
              const isOpen = expanded === idx

              return (
                <div key={idx} className="relative pl-12">
                  {/* Dot */}
                  <div className={`absolute left-2.5 top-5 w-3 h-3 rounded-full border-2 -translate-x-1/2 ${
                    idx === 0 ? 'bg-cyber-cyan border-cyber-cyan shadow-[0_0_8px_rgba(0,245,212,0.6)]' : 'bg-cyber-bg border-cyber-border'
                  }`} />

                  <div className="glass glass-hover rounded-xl overflow-hidden border-cyber-border">
                    {/* Header */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          {idx === 0 && (
                            <span className="px-2 py-0.5 text-xs font-mono bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 rounded">
                              Current
                            </span>
                          )}
                          <h3 className="font-display font-600 text-base text-cyber-text">
                            {job.role}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                          <span className={`flex items-center gap-1 ${colorClass.split(' ')[0]}`}>
                            <Briefcase size={11} /> {job.company}
                          </span>
                          <span className="flex items-center gap-1 text-cyber-muted">
                            <Calendar size={11} /> {job.period}
                          </span>
                          <span className="flex items-center gap-1 text-cyber-muted">
                            <MapPin size={11} /> {job.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-cyber-muted mt-1">
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>

                    {/* Expanded content */}
                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-cyber-border/50">
                        <ul className="mt-4 space-y-2">
                          {job.highlights.map((h, hi) => (
                            <li key={hi} className="flex items-start gap-2 text-sm text-cyber-muted/80">
                              <span className="text-cyber-cyan mt-0.5 flex-shrink-0">▸</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Education */}
        <div className="mt-16">
          <h3 className="font-mono text-cyber-cyan text-sm mb-6 uppercase tracking-wider">Education</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {resumeData.education.map((edu, i) => (
              <div key={i} className="glass rounded-xl p-4 border-cyber-border">
                <p className="font-display font-600 text-sm text-cyber-text mb-1">{edu.degree}</p>
                {edu.field && <p className="font-mono text-xs text-cyber-cyan mb-2">{edu.field}</p>}
                <p className="font-mono text-xs text-cyber-muted">{edu.institute}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-mono text-xs text-cyber-muted">{edu.year}</span>
                  <span className="font-mono text-xs text-cyber-gold">{edu.cgpa}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
