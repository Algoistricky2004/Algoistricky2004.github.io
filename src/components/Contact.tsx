import { useState } from 'react'
import { Mail, Github, Linkedin, BookOpen, Send, Copy, Check } from 'lucide-react'

const TwitterX = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
  </svg>
)

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('chiragchawla2021@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Opens mailto — replace with actual form backend (Formspree, EmailJS, etc.)
    const subject = encodeURIComponent(`Message from ${formData.name}`)
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name} <${formData.email}>`)
    window.open(`mailto:chiragchawla2021@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 fade-section">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12">
          <p className="font-mono text-cyber-cyan text-sm mb-2">05. contact</p>
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-cyber-text">
            Let's Build Together
          </h2>
          <p className="text-cyber-muted mt-2 max-w-md">
            Open to research collaborations, internships, consulting, and interesting conversations about AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="glass rounded-xl p-6 border-cyber-border space-y-4">
            <div>
              <label className="font-mono text-xs text-cyber-muted mb-1 block">Name</label>
              <input
                type="text" required
                value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-cyber-surface border border-cyber-border rounded px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan/60 transition-colors placeholder:text-cyber-dim"
                placeholder="Your name" />
            </div>
            <div>
              <label className="font-mono text-xs text-cyber-muted mb-1 block">Email</label>
              <input
                type="email" required
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                className="w-full bg-cyber-surface border border-cyber-border rounded px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan/60 transition-colors placeholder:text-cyber-dim"
                placeholder="you@example.com" />
            </div>
            <div>
              <label className="font-mono text-xs text-cyber-muted mb-1 block">Message</label>
              <textarea
                required rows={4}
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                className="w-full bg-cyber-surface border border-cyber-border rounded px-3 py-2 text-sm text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan/60 transition-colors resize-none placeholder:text-cyber-dim"
                placeholder="What are you thinking?" />
            </div>
            <button type="submit"
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded font-display font-600 text-sm transition-all duration-200 ${
                sent
                  ? 'bg-green-500 text-white'
                  : 'bg-cyber-cyan text-cyber-bg hover:shadow-[0_0_20px_rgba(0,245,212,0.4)]'
              }`}>
              <Send size={14} />
              {sent ? '✓ Opening mail client...' : 'Send Message'}
            </button>

          </form>

          {/* Links */}
          <div className="space-y-4">
            {/* Email copy */}
            <div className="glass rounded-xl p-5 border-cyber-border">
              <p className="font-mono text-xs text-cyber-muted mb-3 uppercase tracking-wider">Email</p>
              <div className="flex items-center justify-between gap-2 bg-cyber-surface rounded px-3 py-2 border border-cyber-border">
                <span className="font-mono text-sm text-cyber-cyan truncate">chiragchawla2021@gmail.com</span>
                <button onClick={copyEmail} className="text-cyber-muted hover:text-cyber-cyan transition-colors flex-shrink-0">
                  {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
                </button>
              </div>
            </div>

            {/* Social links */}
            <div className="glass rounded-xl p-5 border-cyber-border">
              <p className="font-mono text-xs text-cyber-muted mb-3 uppercase tracking-wider">Find Me</p>
              <div className="space-y-3">
                {[
                  { icon: <Github size={16} />, label: 'GitHub', sub: '@Algoistricky2004', href: 'https://github.com/Algoistricky2004', color: 'hover:text-cyber-text' },
                  { icon: <Linkedin size={16} />, label: 'LinkedIn', sub: 'chirag-chawla-888025254', href: 'https://linkedin.com/in/chirag-chawla-888025254', color: 'hover:text-blue-400' },
                  { icon: <BookOpen size={16} />, label: 'Google Scholar', sub: 'TtyaWYAAAAAJ', href: 'https://scholar.google.com/citations?user=TtyaWYAAAAAJ&hl=en', color: 'hover:text-cyber-gold' },
                  { icon: <Mail size={16} />, label: 'Email', sub: 'chiragchawla2021@gmail.com', href: 'mailto:chiragchawla2021@gmail.com', color: 'hover:text-cyber-coral' },
                  { icon: <TwitterX />, label: 'Twitter / X', sub: '@CHIRAG_Chawla1', href: 'https://x.com/CHIRAG_Chawla1', color: 'hover:text-cyber-text' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-3 text-cyber-muted ${s.color} transition-colors group`}>
                    <span className="flex-shrink-0 group-hover:scale-110 transition-transform">{s.icon}</span>
                    <div>
                      <span className="block text-sm font-500">{s.label}</span>
                      <span className="block font-mono text-xs opacity-60">{s.sub}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability status */}
            <div className="glass rounded-xl p-4 border border-green-400/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-green-400">Available for research collaborations</span>
              </div>
              <p className="font-mono text-xs text-cyber-muted mt-2">
                Also open to: AI consulting · internships · advisory roles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
