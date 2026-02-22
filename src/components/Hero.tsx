import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Sparkles, BookOpen, Briefcase } from 'lucide-react'

const ROTATING_CARDS = [
  { icon: '📄', label: 'Latest Paper', value: 'AlignTune (arXiv 2026)', sub: 'Post-training alignment toolkit', color: 'text-cyber-cyan' },
  { icon: '⚡', label: 'Coolest Project', value: 'Multimodal RAG', sub: 'CLIP + GPT-4o + FAISS', color: 'text-cyber-gold' },
  { icon: '🎯', label: 'Current Focus', value: 'AI Safety & Alignment', sub: 'Critic-based decoding', color: 'text-cyber-purple' },
]

const TYPEWRITER_PHRASES = [
  'AI Researcher.',
  'LLM Alignment Nerd.',
  'Math Puzzle Addict.',
  'Car Enthusiast.',
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cardIndex, setCardIndex] = useState(0)
  const [typeText, setTypeText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [typing, setTyping] = useState(true)

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; opacity: number }[] = []
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 245, 212, ${p.opacity})`
        ctx.fill()
      })
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 245, 212, ${0.1 * (1 - dist/100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  // Rotating cards
  useEffect(() => {
    const t = setInterval(() => setCardIndex(i => (i + 1) % ROTATING_CARDS.length), 3500)
    return () => clearInterval(t)
  }, [])

  // Typewriter
  useEffect(() => {
    const phrase = TYPEWRITER_PHRASES[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (typing) {
      if (typeText.length < phrase.length) {
        timeout = setTimeout(() => setTypeText(phrase.slice(0, typeText.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (typeText.length > 0) {
        timeout = setTimeout(() => setTypeText(typeText.slice(0, -1)), 40)
      } else {
        setPhraseIndex((phraseIndex + 1) % TYPEWRITER_PHRASES.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [typeText, typing, phraseIndex])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />
      
      {/* Radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,245,212,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left — text */}
          <div>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-cyber-cyan/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
              <span className="font-mono text-xs text-cyber-cyan">open to research collaborations</span>
            </div>
            
            <h1 className="font-display font-extrabold leading-tight mb-4">
              <span className="text-4xl sm:text-5xl lg:text-6xl text-cyber-text block">Hi — I'm</span>
              <span className="text-4xl sm:text-5xl lg:text-6xl text-gradient-cyan block">Chirag Chawla</span>
            </h1>
            
            <div className="font-display text-xl sm:text-2xl text-cyber-muted mb-2 h-8">
              <span className="text-cyber-coral">{typeText}</span>
              <span className="terminal-cursor text-cyber-coral" />
            </div>
            
            <p className="font-mono text-sm text-cyber-muted mb-2 italic">
              "I break models for breakfast, tune them over lunch, and debug for dessert."
            </p>
            
            <p className="text-cyber-text/80 leading-relaxed mb-8 max-w-lg">
              AI researcher at <strong className="text-cyber-cyan">IIT (BHU) Varanasi</strong> obsessed with making AI safer, smarter, and more honest. I work across post-training alignment, reasoning, interpretability, learning on graphs, and active learning — with active papers on LLM fatigue, multi-agent systems, and biomedical NLP. I don't just study AI, I ship it — 7+ industry roles, and consult early-stage founders on building with AI. Hardcore researcher at heart: if there's an unsolved problem, I'm already thinking about it.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <a href="#publications"
                className="flex items-center gap-2 px-5 py-2.5 bg-cyber-cyan text-cyber-bg font-display font-600 text-sm rounded hover:shadow-[0_0_20px_rgba(0,245,212,0.4)] transition-all duration-200">
                <BookOpen size={16} /> View Papers
              </a>
              <a href="#projects"
                className="flex items-center gap-2 px-5 py-2.5 glass border border-cyber-cyan/30 text-cyber-text font-display font-600 text-sm rounded hover:border-cyber-cyan/60 transition-all duration-200">
                <Sparkles size={16} /> Projects
              </a>
              <a href="#contact"
                className="flex items-center gap-2 px-5 py-2.5 glass border border-cyber-coral/30 text-cyber-coral font-display font-600 text-sm rounded hover:border-cyber-coral/60 transition-all duration-200">
                <Briefcase size={16} /> Let's Collaborate
              </a>
            </div>
          </div>
          
          {/* Right — photo + rotating card */}
          <div className="flex flex-col items-center gap-6">
            {/* Portrait placeholder */}
            <div className="relative">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-cyber-cyan/30 glow-cyan">
                <img src="/photos/Chirag_dp_linkedin.png" alt="Chirag Chawla"
                  className="w-full h-full object-cover"
                  onError={e => {
                    const t = e.target as HTMLImageElement
                    t.style.display = 'none'
                    t.parentElement!.innerHTML = `<div class="w-full h-full bg-cyber-card flex items-center justify-center">
                      <span class="font-display text-6xl font-bold text-gradient-cyan">CC</span>
                    </div>`
                  }} />
              </div>
              {/* Floating affiliation badge */}
              <div className="absolute -bottom-3 -right-3 px-3 py-1 glass border border-cyber-gold/30 rounded text-xs font-mono text-cyber-gold whitespace-nowrap">
                🏛 IIT (BHU)
              </div>
            </div>
            
            {/* Rotating highlight card */}
            <div className="w-full max-w-sm glass rounded-xl p-4 border-cyber-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{ROTATING_CARDS[cardIndex].icon}</span>
                <span className="font-mono text-xs text-cyber-muted">{ROTATING_CARDS[cardIndex].label}</span>
              </div>
              <p className={`font-display font-600 text-base ${ROTATING_CARDS[cardIndex].color}`}>
                {ROTATING_CARDS[cardIndex].value}
              </p>
              <p className="font-mono text-xs text-cyber-muted mt-1">
                {ROTATING_CARDS[cardIndex].sub}
              </p>
              {/* Dots */}
              <div className="flex gap-1.5 mt-3">
                {ROTATING_CARDS.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-300 ${
                    i === cardIndex ? 'w-6 bg-cyber-cyan' : 'w-2 bg-cyber-border'
                  }`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyber-muted">
        <span className="font-mono text-xs">scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  )
}
