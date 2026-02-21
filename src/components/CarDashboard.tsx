import { useState, useEffect, useRef } from 'react'
import { X, Gauge, Zap, BookOpen, FolderOpen, User, Mail, Github } from 'lucide-react'

const SECTIONS = [
  { id: 'about', label: 'ABOUT', icon: User, rpm: 1200, color: '#00f5d4' },
  { id: 'publications', label: 'PAPERS', icon: BookOpen, rpm: 3500, color: '#9d4edd' },
  { id: 'projects', label: 'PROJECTS', icon: FolderOpen, rpm: 5000, color: '#ffd93d' },
  { id: 'experience', label: 'EXPERIENCE', icon: Zap, rpm: 4200, color: '#ff6b6b' },
  { id: 'contact', label: 'CONTACT', icon: Mail, rpm: 2800, color: '#00f5d4' },
]

const STATS = [
  { label: 'Papers', value: '2', unit: 'published' },
  { label: 'Roles', value: '8+', unit: 'industry & academia' },
  { label: 'Stack', value: '20+', unit: 'tools & frameworks' },
  { label: 'Citations', value: '—', unit: 'growing...' },
]

// Speedometer SVG component
function Speedometer({ rpm, max = 7000, color }: { rpm: number; max?: number; color: string }) {
  const pct = Math.min(rpm / max, 1)
  const angle = pct * 240 - 120 // -120 to 120 degrees
  const radius = 80
  const strokeDasharray = 2 * Math.PI * radius * (240 / 360)
  const strokeDashoffset = strokeDasharray * (1 - pct)

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[200px]">
      {/* Background arc */}
      <circle cx="100" cy="100" r={radius}
        fill="none" stroke="rgba(255,255,255,0.05)"
        strokeWidth="12"
        strokeDasharray={`${strokeDasharray} 10000`}
        strokeDashoffset={strokeDasharray * (120/360)}
        transform="rotate(150 100 100)"
        strokeLinecap="round" />
      {/* Value arc */}
      <circle cx="100" cy="100" r={radius}
        fill="none" stroke={color}
        strokeWidth="12"
        strokeDasharray={`${strokeDasharray * pct} 10000`}
        strokeDashoffset={strokeDasharray * (120/360)}
        transform="rotate(150 100 100)"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 8px ${color})` }} />
      {/* Needle */}
      <line
        x1="100" y1="100"
        x2={100 + 60 * Math.cos((angle - 90) * Math.PI / 180)}
        y2={100 + 60 * Math.sin((angle - 90) * Math.PI / 180)}
        stroke="white" strokeWidth="2" strokeLinecap="round"
        style={{ transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      {/* Center dot */}
      <circle cx="100" cy="100" r="6" fill={color} />
      {/* Value text */}
      <text x="100" y="140" textAnchor="middle" fill="white" fontSize="14" fontFamily="DM Mono, monospace" fontWeight="bold">
        {rpm.toLocaleString()}
      </text>
      <text x="100" y="155" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="DM Mono, monospace">
        RPM
      </text>
    </svg>
  )
}

interface CarDashboardProps {
  onClose: () => void
}

export default function CarDashboard({ onClose }: CarDashboardProps) {
  const [activeGear, setActiveGear] = useState(0)
  const [engineOn, setEngineOn] = useState(false)
  const [currentRpm, setCurrentRpm] = useState(800)
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const targetSection = SECTIONS[activeGear] || SECTIONS[0]

  useEffect(() => {
    const timer = setTimeout(() => setEngineOn(true), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const target = engineOn ? targetSection.rpm : 800
    const step = () => {
      setCurrentRpm(prev => {
        const diff = target - prev
        if (Math.abs(diff) < 50) return target
        return prev + diff * 0.08
      })
    }
    const id = setInterval(step, 50)
    return () => clearInterval(id)
  }, [activeGear, engineOn, targetSection.rpm])

  const navigate = (idx: number) => {
    setActiveGear(idx)
    const sectionId = SECTIONS[idx].id
    setTimeout(() => {
      onClose()
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 600)
  }

  const rpm = Math.round(currentRpm)
  const speedKmh = Math.round((rpm / 7000) * 220)

  return (
    <div className="min-h-screen bg-[#050810] flex flex-col items-center justify-center relative overflow-hidden pt-16">
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,100,50,1) 3px, rgba(255,100,50,1) 4px)' }} />
      
      {/* Close button */}
      <button onClick={onClose}
        className="fixed top-20 right-6 z-50 glass border border-cyber-border rounded-lg p-2 text-cyber-muted hover:text-cyber-text transition-colors">
        <X size={20} />
      </button>

      <div className="w-full max-w-5xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-mono text-xs text-[#ff6b35] tracking-[0.3em] uppercase mb-1">
            🏎 Chirag Chawla OS — Dashboard Mode
          </p>
          <h1 className="font-display font-800 text-2xl sm:text-3xl" style={{ color: '#ff6b35' }}>
            CONTROL PANEL
          </h1>
        </div>

        {/* Main dashboard */}
        <div className="glass rounded-2xl p-6 sm:p-8 border-[rgba(255,107,53,0.2)]" 
          style={{ boxShadow: '0 0 60px rgba(255,107,53,0.1), inset 0 1px 0 rgba(255,107,53,0.1)' }}>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Left — speedometer */}
            <div className="flex flex-col items-center">
              <Speedometer rpm={rpm} color={targetSection.color} />
              <p className="font-mono text-xs text-[rgba(255,255,255,0.4)] mt-1">ENGINE LOAD</p>
              <div className="mt-3 text-center">
                <span className="font-display font-800 text-4xl text-white">{speedKmh}</span>
                <span className="font-mono text-sm text-[rgba(255,255,255,0.4)] ml-1">km/h</span>
              </div>
              <p className="font-mono text-xs text-[rgba(255,255,255,0.3)] mt-1">SITE VELOCITY</p>
            </div>

            {/* Center — gear selector / nav */}
            <div className="flex flex-col items-center gap-4">
              <p className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.4)] uppercase">
                Select Navigation
              </p>
              
              <div className="grid grid-cols-1 gap-2 w-full max-w-[200px]">
                {SECTIONS.map((section, idx) => {
                  const Icon = section.icon
                  return (
                    <button key={section.id}
                      onClick={() => navigate(idx)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-mono text-sm transition-all duration-200 ${
                        activeGear === idx
                          ? 'text-[#050810] font-600'
                          : 'glass text-[rgba(255,255,255,0.5)] hover:text-white border border-[rgba(255,107,53,0.2)]'
                      }`}
                      style={activeGear === idx ? {
                        backgroundColor: section.color,
                        boxShadow: `0 0 20px ${section.color}80`
                      } : {}}>
                      <Icon size={14} />
                      {section.label}
                      <span className="ml-auto text-xs opacity-60">G{idx + 1}</span>
                    </button>
                  )
                })}
              </div>

              {/* Engine toggle */}
              <button onClick={() => setEngineOn(!engineOn)}
                className={`mt-2 w-full max-w-[200px] py-2 rounded-lg font-mono text-xs font-600 transition-all duration-300 ${
                  engineOn
                    ? 'bg-[#ff6b35] text-[#050810] shadow-[0_0_20px_rgba(255,107,53,0.4)]'
                    : 'glass text-[rgba(255,255,255,0.4)] border border-[rgba(255,107,53,0.2)]'
                }`}>
                {engineOn ? '🔥 ENGINE ON' : '▶ START ENGINE'}
              </button>
            </div>

            {/* Right — stats */}
            <div className="space-y-3">
              <p className="font-mono text-xs tracking-wider text-[rgba(255,255,255,0.4)] uppercase mb-4">
                System Stats
              </p>
              {STATS.map(stat => (
                <div key={stat.label}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: 'rgba(255,107,53,0.05)', border: '1px solid rgba(255,107,53,0.15)' }}>
                  <span className="font-mono text-xs text-[rgba(255,255,255,0.4)]">{stat.label}</span>
                  <div className="text-right">
                    <span className="font-display font-700 text-base text-white">{stat.value}</span>
                    <span className="font-mono text-xs text-[rgba(255,255,255,0.3)] ml-1">{stat.unit}</span>
                  </div>
                </div>
              ))}
              
              {/* GitHub link */}
              <a href="https://github.com/Algoistricky2004" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-lg font-mono text-xs text-[rgba(255,255,255,0.4)] hover:text-white transition-colors"
                style={{ background: 'rgba(255,107,53,0.05)', border: '1px solid rgba(255,107,53,0.15)' }}>
                <Github size={13} /> GitHub Garage →
              </a>
            </div>
          </div>
        </div>

        <p className="text-center font-mono text-xs text-[rgba(255,255,255,0.2)] mt-6">
          🚗 Easter egg unlocked! Click any gear to navigate & close dashboard.
        </p>
      </div>
    </div>
  )
}
