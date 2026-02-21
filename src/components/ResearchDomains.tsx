import { useState } from 'react'
import { Cpu, Shield, Brain, Eye, Waves, Bot, Network, Database, FlaskConical, Layers } from 'lucide-react'

const DOMAINS = [
  {
    id: 'rl',
    icon: Brain,
    label: 'Reinforcement Learning',
    color: 'cyber-cyan',
    colorHex: '#00f5d4',
    desc: 'GRPO, PPO, RLHF-style training; reward modeling; multi-objective RL for language generation.',
    papers: ['DeepSeekMath (GRPO)', 'InstructGPT (PPO)', 'MORL for language'],
  },
  {
    id: 'safety',
    icon: Shield,
    label: 'Safe & Ethical AI',
    color: 'orange-400',
    colorHex: '#fb923c',
    desc: 'Inference-time safety, critic-based decoding, adversarial robustness, AI alignment frameworks.',
    papers: ['Constitutional AI', 'Critic-based decoding', 'Red-teaming LLMs'],
  },
  {
    id: 'reasoning',
    icon: Layers,
    label: 'Reasoning',
    color: 'cyber-purple',
    colorHex: '#b57bee',
    desc: 'Chain-of-thought, lookahead decoding, process reward models, test-time compute scaling.',
    papers: ['Chain-of-Thought', 'Tree of Thoughts', 'Process Reward Models'],
  },
  {
    id: 'interp',
    icon: Eye,
    label: 'Interpretability',
    color: 'green-400',
    colorHex: '#4ade80',
    desc: 'Mechanistic interpretability, attention analysis, gradient flow inspection, probing classifiers.',
    papers: ['Induction Heads', 'Sparse Autoencoders', 'Probing LLMs'],
  },
  {
    id: 'cv',
    icon: Cpu,
    label: 'Computer Vision',
    color: 'cyber-gold',
    colorHex: '#fbbf24',
    desc: 'Vision-language models, CLIP, multimodal RAG, medical imaging (VAE-CycleGAN for MRI→CT).',
    papers: ['CLIP', 'LLaVA', 'Stable Diffusion'],
  },
  {
    id: 'diffusion',
    icon: Waves,
    label: 'Diffusion Models',
    color: 'cyber-coral',
    colorHex: '#f97316',
    desc: 'DDPM, score-based generation, latent diffusion, conditional generation for medical imaging.',
    papers: ['DDPM', 'Latent Diffusion', 'ControlNet'],
  },
  {
    id: 'alignment',
    icon: FlaskConical,
    label: 'LLM Alignment',
    color: 'cyber-cyan',
    colorHex: '#00f5d4',
    desc: 'SFT, DPO, IFT, composable reward functions; AlignTune modular post-training toolkit.',
    papers: ['DPO', 'RLAIF', 'AlignTune (mine)'],
  },
  {
    id: 'multiagent',
    icon: Network,
    label: 'Multi-Agent Systems',
    color: 'cyber-purple',
    colorHex: '#b57bee',
    desc: 'Agent-aware decoding, inter-agent communication, lookahead planning, multi-turn coherence.',
    papers: ['AutoGen', 'ReAct', 'Agent-aware decoding'],
  },
  {
    id: 'rag',
    icon: Database,
    label: 'RAG & Retrieval',
    color: 'green-400',
    colorHex: '#4ade80',
    desc: 'Multimodal RAG with CLIP+FAISS, agentic RAG, hybrid retrieval pipelines.',
    papers: ['RAG (Lewis et al.)', 'FAISS', 'Multimodal RAG'],
  },
  {
    id: 'bionlp',
    icon: Bot,
    label: 'Biomedical NLP',
    color: 'cyber-gold',
    colorHex: '#fbbf24',
    desc: 'Persona-guided summarization (PERCS), controllable generation, biomedical abstract processing.',
    papers: ['PERCS (mine)', 'BioGPT', 'PubMedBERT'],
  },
]

type Domain = typeof DOMAINS[0]

export default function ResearchDomains() {
  const [active, setActive] = useState<Domain | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const iconSize = 20

  return (
    <section id="domains" className="py-24 px-4 sm:px-6 fade-section">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <p className="font-mono text-cyber-cyan text-sm mb-2">02b. domains</p>
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-cyber-text">
            Research Domains
          </h2>
          <p className="text-cyber-muted mt-2 text-sm max-w-lg">
            Click any domain to explore what I work on, key techniques, and landmark papers in that space.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* Domain grid — 5 cols on left */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {DOMAINS.map(d => {
              const Icon = d.icon
              const isActive = active?.id === d.id
              const isHov = hovered === d.id

              return (
                <button
                  key={d.id}
                  onClick={() => setActive(isActive ? null : d)}
                  onMouseEnter={() => setHovered(d.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group relative glass rounded-xl p-4 text-left transition-all duration-200 border ${
                    isActive
                      ? 'border-cyber-cyan/60 shadow-[0_0_20px_rgba(0,245,212,0.15)]'
                      : 'border-cyber-border hover:border-cyber-cyan/30'
                  }`}
                  style={isActive || isHov ? { borderColor: `${d.colorHex}50` } : {}}>

                  {/* Glowing dot on active */}
                  {isActive && (
                    <span
                      className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: d.colorHex }} />
                  )}

                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-all duration-200"
                    style={{ backgroundColor: `${d.colorHex}15` }}>
                    <Icon size={iconSize} style={{ color: d.colorHex }} />
                  </div>

                  <p
                    className="font-mono text-xs leading-snug transition-colors duration-200"
                    style={{ color: isActive ? d.colorHex : undefined }}
                    data-active={isActive}>
                    <span className={isActive ? '' : 'text-cyber-text/80 group-hover:text-cyber-text'}>
                      {d.label}
                    </span>
                  </p>
                </button>
              )
            })}
          </div>

          {/* Detail panel — 2 cols on right */}
          <div className="lg:col-span-2">
            {active ? (
              <div
                className="glass rounded-xl p-6 border h-full transition-all duration-300"
                style={{ borderColor: `${active.colorHex}40` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${active.colorHex}20` }}>
                    <active.icon size={22} style={{ color: active.colorHex }} />
                  </div>
                  <h3
                    className="font-display font-700 text-lg"
                    style={{ color: active.colorHex }}>
                    {active.label}
                  </h3>
                </div>

                <p className="text-sm text-cyber-text/80 leading-relaxed mb-5">
                  {active.desc}
                </p>

                <div>
                  <p className="font-mono text-xs text-cyber-muted mb-2 uppercase tracking-wider">Key Papers / Work</p>
                  <ul className="space-y-1.5">
                    {active.papers.map(p => (
                      <li key={p} className="flex items-center gap-2 text-xs font-mono text-cyber-muted">
                        <span style={{ color: active.colorHex }}>▸</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setActive(null)}
                  className="mt-6 font-mono text-xs text-cyber-muted hover:text-cyber-text transition-colors">
                  ← close
                </button>
              </div>
            ) : (
              <div className="glass rounded-xl p-6 border border-cyber-border/30 h-full flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-cyber-cyan/5 border border-cyber-cyan/10 flex items-center justify-center mb-4">
                  <Brain size={26} className="text-cyber-cyan/40" />
                </div>
                <p className="font-mono text-sm text-cyber-muted">
                  Click a domain to explore
                </p>
                <p className="font-mono text-xs text-cyber-muted/50 mt-1">
                  {DOMAINS.length} active research areas
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
