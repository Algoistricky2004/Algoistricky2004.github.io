interface DashboardToggleProps {
  dashMode: boolean
  onToggle: () => void
}

export default function DashboardToggle({ dashMode, onToggle }: DashboardToggleProps) {
  return (
    <button
      onClick={onToggle}
      title={dashMode ? 'Exit Dashboard Mode' : '🚗 Enter Car Dashboard Mode (Easter Egg!)'}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-xl
        transition-all duration-300 shadow-lg ${
          dashMode
            ? 'bg-[#ff6b35] shadow-[0_0_20px_rgba(255,107,53,0.5)] scale-110'
            : 'glass border border-cyber-border hover:border-cyber-cyan/40 hover:shadow-[0_0_15px_rgba(0,245,212,0.2)]'
        }`}>
      {dashMode ? '✕' : '🚗'}
    </button>
  )
}
