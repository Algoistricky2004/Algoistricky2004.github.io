import { Mail, Github, Linkedin, BookOpen, Download, MapPin, GraduationCap } from 'lucide-react'

const TwitterX = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
  </svg>
)
import resumeData from '../../data/resume.json'

export default function About() {
  const fun = resumeData.funFacts

  return (
    <section id="about" className="py-24 px-4 sm:px-6 fade-section">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12">
          <p className="font-mono text-cyber-cyan text-sm mb-2">01. about</p>
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-cyber-text">
            The Human Behind the Models
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          
          {/* Bio - 3 cols */}
          <div className="lg:col-span-3 space-y-5">
            <p className="text-cyber-text/80 leading-relaxed text-base">
              {resumeData.bio}
            </p>
            
            {/* Affiliation badges */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <GraduationCap size={14}/>, label: 'IIT (BHU) Varanasi', color: 'border-cyber-cyan/30 text-cyber-cyan' },
                { icon: <MapPin size={14}/>, label: 'Varanasi, India', color: 'border-cyber-muted/30 text-cyber-muted' },
                { icon: <Mail size={14}/>, label: resumeData.email, color: 'border-cyber-muted/30 text-cyber-muted' },
              ].map(b => (
                <div key={b.label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 glass rounded text-xs font-mono border ${b.color}`}>
                  {b.icon} {b.label}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Github size={16}/>, label: 'GitHub', href: 'https://github.com/Algoistricky2004' },
                { icon: <Linkedin size={16}/>, label: 'LinkedIn', href: 'https://linkedin.com/in/chirag-chawla-888025254' },
                { icon: <BookOpen size={16}/>, label: 'Scholar', href: 'https://scholar.google.com/citations?user=TtyaWYAAAAAJ&hl=en' },
                { icon: <TwitterX />, label: 'Twitter / X', href: 'https://x.com/CHIRAG_Chawla1' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="glass glass-hover flex items-center gap-2 px-4 py-2 rounded text-sm text-cyber-text border-cyber-border">
                  {s.icon} {s.label}
                </a>
              ))}
              <a href="https://drive.google.com/file/d/1NMBM8m3ATPryBZrrJrXNO64zRhO9AKFy/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-cyber-cyan text-cyber-bg rounded text-sm font-600 hover:shadow-[0_0_15px_rgba(0,245,212,0.4)] transition-all">
                <Download size={16} /> Download CV
              </a>
            </div>
          </div>

          {/* Fun facts + skills - 2 cols */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass rounded-xl p-5">
              <h3 className="font-mono text-xs text-cyber-cyan mb-3 uppercase tracking-wider">Fun Facts</h3>
              <ul className="space-y-2">
                {fun.map((fact, i) => (
                  <li key={i} className="text-sm text-cyber-text/80 leading-snug">{fact}</li>
                ))}
              </ul>
            </div>

            {/* Skill domains */}
            <div className="glass rounded-xl p-5">
              <h3 className="font-mono text-xs text-cyber-cyan mb-3 uppercase tracking-wider">Research Domains</h3>
              <div className="flex flex-wrap gap-1.5">
                {resumeData.skills.domains.map(d => (
                  <span key={d} className="px-2 py-1 text-xs font-mono bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 rounded">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
