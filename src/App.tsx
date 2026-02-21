import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Publications from './components/Publications'
import ResearchDomains from './components/ResearchDomains'
import MustReadPapers from './components/MustReadPapers'
import Projects from './components/Projects'
import Experience from './components/Experience'
import CarDashboard from './components/CarDashboard'
import Contact from './components/Contact'
import Footer from './components/Footer'
import DashboardToggle from './components/DashboardToggle'

export default function App() {
  const [dashMode, setDashMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // Intersection observer for section highlighting
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: 0.3 })
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Fade in sections on scroll
    const fades = document.querySelectorAll('.fade-section')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })
    fades.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`min-h-screen bg-cyber-bg ${dashMode ? 'dashboard-mode' : ''}`}>
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,212,1) 2px, rgba(0,245,212,1) 4px)' }} />
      
      {/* Cyber grid background */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0" />

      <Navbar activeSection={activeSection} dashMode={dashMode} />
      
      {dashMode ? (
        <CarDashboard onClose={() => setDashMode(false)} />
      ) : (
        <>
          <Hero />
          <About />
          <Publications />
          <ResearchDomains />
          <MustReadPapers />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </>
      )}

      <DashboardToggle dashMode={dashMode} onToggle={() => setDashMode(!dashMode)} />
    </div>
  )
}
