import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface Author {
  id: string
  name: string
  affiliation: string
  papers: string[]
  profileUrl?: string
  isChirag?: boolean
}

interface Link {
  source: string
  target: string
  paper: string
}

const AUTHORS: Author[] = [
  { id: 'chirag', name: 'Chirag Chawla', affiliation: 'IIT (BHU) Varanasi', papers: ['aligntune', 'percs'], isChirag: true },
  { id: 'lyngkhoi', name: 'R.E.Z.M. Lyngkhoi', affiliation: 'Lexsi Labs', papers: ['aligntune'] },
  { id: 'seth', name: 'Pratinav Seth', affiliation: 'Lexsi Labs', papers: ['aligntune'] },
  { id: 'avaiya', name: 'Utsav Avaiya', affiliation: 'Lexsi Labs', papers: ['aligntune'] },
  { id: 'bhattacharjee', name: 'Soham Bhattacharjee', affiliation: 'Lexsi Labs', papers: ['aligntune'] },
  { id: 'khandoga', name: 'Mykola Khandoga', affiliation: 'Lexsi Labs', papers: ['aligntune'] },
  { id: 'yuan', name: 'Rui Yuan', affiliation: 'Lexsi Labs', papers: ['aligntune'] },
  { id: 'sankarapu', name: 'Vinay Kumar Sankarapu', affiliation: 'Lexsi Labs', papers: ['aligntune'] },
  { id: 'salvi', name: 'Rohan Charudatt Salvi', affiliation: 'UIC', papers: ['percs'] },
  { id: 'jain', name: 'Dhruv Jain', affiliation: 'UIC', papers: ['percs'] },
  { id: 'panigrahi', name: 'Swapnil Panigrahi', affiliation: 'UIC', papers: ['percs'] },
  { id: 'akhtar', name: 'Md Shad Akhtar', affiliation: 'UIC', papers: ['percs'] },
  { id: 'yadav', name: 'Dr. Shweta Yadav', affiliation: 'University of Illinois Chicago', papers: ['percs'], profileUrl: 'https://scholar.google.com/citations?user=shwetayadav' },
]

const LINKS: Link[] = [
  { source: 'chirag', target: 'lyngkhoi', paper: 'aligntune' },
  { source: 'chirag', target: 'seth', paper: 'aligntune' },
  { source: 'chirag', target: 'avaiya', paper: 'aligntune' },
  { source: 'chirag', target: 'bhattacharjee', paper: 'aligntune' },
  { source: 'chirag', target: 'khandoga', paper: 'aligntune' },
  { source: 'chirag', target: 'yuan', paper: 'aligntune' },
  { source: 'chirag', target: 'sankarapu', paper: 'aligntune' },
  { source: 'chirag', target: 'salvi', paper: 'percs' },
  { source: 'chirag', target: 'jain', paper: 'percs' },
  { source: 'chirag', target: 'panigrahi', paper: 'percs' },
  { source: 'chirag', target: 'akhtar', paper: 'percs' },
  { source: 'chirag', target: 'yadav', paper: 'percs' },
]

const PAPER_COLORS: Record<string, string> = {
  aligntune: '#00f5d4',
  percs: '#ff6b6b',
}

export default function CoauthorGraph() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [tooltip, setTooltip] = useState<{ author: Author; x: number; y: number } | null>(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const container = svgRef.current!.parentElement!
    const W = container.clientWidth
    const H = Math.max(400, Math.min(520, container.clientWidth * 0.6))
    
    svg.attr('width', W).attr('height', H)

    const simulation = d3.forceSimulation(AUTHORS as any)
      .force('link', d3.forceLink(LINKS as any).id((d: any) => d.id).distance(100).strength(0.5))
      .force('charge', d3.forceManyBody().strength(-250))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collision', d3.forceCollide(40))

    // Links
    const link = svg.append('g').selectAll('line')
      .data(LINKS)
      .enter().append('line')
      .attr('stroke', d => PAPER_COLORS[d.paper])
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5)

    // Node groups
    const node = svg.append('g').selectAll('g')
      .data(AUTHORS)
      .enter().append('g')
      .style('cursor', 'pointer')
      .call(d3.drag<any, any>()
        .on('start', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x; d.fy = d.y
        })
        .on('drag', (event, d: any) => { d.fx = event.x; d.fy = event.y })
        .on('end', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null; d.fy = null
        })
      )

    // Circles
    node.append('circle')
      .attr('r', (d: any) => d.isChirag ? 24 : 16)
      .attr('fill', (d: any) => {
        if (d.isChirag) return '#00f5d4'
        if (d.papers.includes('aligntune') && d.papers.includes('percs')) return '#9d4edd'
        if (d.papers.includes('aligntune')) return 'rgba(0,245,212,0.15)'
        return 'rgba(255,107,107,0.15)'
      })
      .attr('stroke', (d: any) => {
        if (d.isChirag) return '#00f5d4'
        if (d.papers.includes('aligntune') && d.papers.includes('percs')) return '#9d4edd'
        if (d.papers.includes('aligntune')) return '#00f5d4'
        return '#ff6b6b'
      })
      .attr('stroke-width', 1.5)

    // Name labels
    node.append('text')
      .attr('dy', (d: any) => d.isChirag ? 40 : 30)
      .attr('text-anchor', 'middle')
      .attr('fill', '#718096')
      .attr('font-size', '10px')
      .attr('font-family', 'DM Mono, monospace')
      .text((d: any) => d.name.split(' ').pop() || d.name)

    // Chirag label special
    node.filter((d: any) => d.isChirag).append('text')
      .attr('dy', 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#080c10')
      .attr('font-size', '9px')
      .attr('font-family', 'DM Mono, monospace')
      .attr('font-weight', 'bold')
      .text('CC')

    // Hover
    node.on('mouseover', function(event: MouseEvent, d: Author) {
        const rect = svgRef.current!.getBoundingClientRect()
        setTooltip({ author: d, x: event.clientX - rect.left, y: event.clientY - rect.top })
      })
      .on('mousemove', function(event: MouseEvent) {
        const rect = svgRef.current!.getBoundingClientRect()
        setTooltip(prev => prev ? { ...prev, x: event.clientX - rect.left, y: event.clientY - rect.top } : null)
      })
      .on('mouseout', () => setTooltip(null))

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })

    return () => simulation.stop()
  }, [])

  return (
    <section id="coauthor-graph" className="py-24 px-4 sm:px-6 fade-section">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <p className="font-mono text-cyber-cyan text-sm mb-2">02b. co-authors</p>
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-cyber-text">
            Collaboration Network
          </h2>
          <p className="text-cyber-muted font-mono text-sm mt-2">
            Interactive force graph — drag nodes, hover for details.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-5">
          {[
            { color: '#00f5d4', label: 'AlignTune (2026)' },
            { color: '#ff6b6b', label: 'PERCS (2025)' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="font-mono text-xs text-cyber-muted">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Graph */}
        <div className="relative glass rounded-xl overflow-hidden border-cyber-border">
          <svg ref={svgRef} className="w-full" />
          
          {/* Tooltip */}
          {tooltip && (
            <div className="absolute pointer-events-none glass border border-cyber-cyan/30 rounded-lg p-3 text-xs font-mono z-20 shadow-xl"
              style={{ left: tooltip.x + 10, top: tooltip.y + 10, maxWidth: 200 }}>
              <p className="text-cyber-cyan font-600 mb-1">{tooltip.author.name}</p>
              <p className="text-cyber-muted">{tooltip.author.affiliation}</p>
              <p className="text-cyber-text/70 mt-1">
                Papers: {tooltip.author.papers.join(', ')}
              </p>
              {tooltip.author.profileUrl && (
                <p className="text-cyber-cyan/70 mt-1 underline">View profile →</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
