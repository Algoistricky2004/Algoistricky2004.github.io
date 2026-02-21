export default function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-cyber-border/30">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-cyber-muted font-mono text-xs">
        <p>
          Built by <span className="text-cyber-cyan">Chirag Chawla</span> · Vite + React + Tailwind
        </p>
        <p className="opacity-50">
          © 2025 · IIT (BHU) Varanasi
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/Algoistricky2004" target="_blank" rel="noopener noreferrer"
            className="hover:text-cyber-cyan transition-colors">GitHub</a>
          <a href="https://scholar.google.com/citations?user=TtyaWYAAAAAJ&hl=en" target="_blank" rel="noopener noreferrer"
            className="hover:text-cyber-cyan transition-colors">Scholar</a>
          <a href="https://linkedin.com/in/chirag-chawla-888025254" target="_blank" rel="noopener noreferrer"
            className="hover:text-cyber-cyan transition-colors">LinkedIn</a>
          <a href="https://x.com/CHIRAG_Chawla1" target="_blank" rel="noopener noreferrer"
            className="hover:text-cyber-cyan transition-colors">Twitter/X</a>
        </div>
      </div>
    </footer>
  )
}
