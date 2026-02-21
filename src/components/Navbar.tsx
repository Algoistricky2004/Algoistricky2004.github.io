import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, BookOpen } from 'lucide-react'

const TwitterX = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
  </svg>
)

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Papers', href: '#publications' },
  { label: 'Domains', href: '#domains' },
  { label: 'Must-Read', href: '#must-read' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  activeSection: string
  dashMode: boolean
}

export default function Navbar({ activeSection, dashMode }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-lg shadow-black/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="font-display font-800 text-xl tracking-tight">
            <span className="text-gradient-cyan">CC</span>
            <span className="text-cyber-muted text-sm ml-2 font-mono hidden sm:inline">
              {dashMode ? '🚗 DASHBOARD' : '// chirag.chawla'}
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <a key={link.href}
                href={link.href}
                className={`font-mono text-sm transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-cyber-cyan'
                    : 'text-cyber-muted hover:text-cyber-text'
                }`}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com/Algoistricky2004" target="_blank" rel="noopener noreferrer"
              className="text-cyber-muted hover:text-cyber-cyan transition-colors p-1">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/chirag-chawla-888025254" target="_blank" rel="noopener noreferrer"
              className="text-cyber-muted hover:text-cyber-cyan transition-colors p-1">
              <Linkedin size={18} />
            </a>
            <a href="https://scholar.google.com/citations?user=TtyaWYAAAAAJ&hl=en" target="_blank" rel="noopener noreferrer"
              className="text-cyber-muted hover:text-cyber-cyan transition-colors p-1">
              <BookOpen size={18} />
            </a>
            <a href="https://x.com/CHIRAG_Chawla1" target="_blank" rel="noopener noreferrer"
              className="text-cyber-muted hover:text-cyber-cyan transition-colors p-1">
              <TwitterX />
            </a>
            <a href="https://drive.google.com/file/d/1NMBM8m3ATPryBZrrJrXNO64zRhO9AKFy/view?usp=sharing" target="_blank" rel="noopener noreferrer"
              className="ml-2 px-3 py-1.5 font-mono text-xs border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-bg transition-all duration-200 rounded">
              CV.pdf
            </a>
          </div>

          {/* Mobile menu btn */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-cyber-muted hover:text-cyber-text">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass md:hidden border-t border-cyber-border">
          <div className="px-4 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="font-mono text-sm text-cyber-muted hover:text-cyber-cyan transition-colors">
                {link.label}
              </a>
            ))}
            <a href="https://drive.google.com/file/d/1NMBM8m3ATPryBZrrJrXNO64zRhO9AKFy/view?usp=sharing" target="_blank" rel="noopener noreferrer"
              className="w-fit px-3 py-1.5 font-mono text-xs border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-cyber-bg transition-all duration-200 rounded">
              Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
