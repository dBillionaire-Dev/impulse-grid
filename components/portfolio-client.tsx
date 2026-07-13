'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectModal } from '@/components/project-modal'

interface Project {
  id: string
  title: string
  description: string
  imageUrl?: string | null
  tags: string[]
  category: string
  order: number
}

const CARD_COLORS = ['from-purple-500', 'from-blue-500', 'from-orange-500', 'from-green-500', 'from-pink-500', 'from-cyan-500']

export function PortfolioClient({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeCategory, setActiveCategory] = useState('ALL')

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)))
    return ['ALL', ...unique]
  }, [projects])

  const filtered = useMemo(() => {
    if (activeCategory === 'ALL') return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [projects, activeCategory])

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Image
              src="/logo.png"
              alt="IMPULSE GRID DIGITALS"
              width={40}
              height={40}
              className="h-20 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border border-pink-500/30 px-6 py-2 rounded-lg"
          >
            Back Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-white">Projects That </span>
            <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text">
              Make an Impact
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of work showcasing AI automation, system design, and brand strategy that delivers real results.
          </p>
        </div>

        {/* Filter Buttons */}
        {categories.length > 1 && (
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'border-purple-500 bg-purple-500/10 text-foreground'
                    : 'border-border/50 hover:border-purple-500/50 text-muted-foreground hover:text-foreground hover:bg-card/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No projects to show yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className="group cursor-pointer relative"
                onClick={() => setSelectedProject(project)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${CARD_COLORS[i % CARD_COLORS.length]} opacity-0 group-hover:opacity-10 rounded-2xl blur transition-opacity duration-300`}
                />
                <div className="relative border border-border/50 group-hover:border-purple-500/50 rounded-2xl p-8 bg-card/30 backdrop-blur-sm group-hover:bg-card/60 transition-all duration-300 h-full flex flex-col group-hover:translate-y-[-4px]">
                  <div className="inline-block mb-4 w-fit">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-border/20">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-end pt-4 border-t border-border/20">
                    <span className="text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center space-y-6 py-16 border-t border-border/30">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to start your next project?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Let&apos;s discuss how I can help automate, design, and elevate your business.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link
              href="/#contact"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border border-pink-500/30 px-8 py-2 text-base rounded-lg"
            >
              Get in Touch
            </Link>
            <Link
              href="/"
              className="border border-border bg-card/50 hover:bg-card px-8 py-3 text-base rounded-lg"
            >
              Back Home
            </Link>
          </div>
        </div>

        {selectedProject && (
          <ProjectModal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            project={selectedProject}
          />
        )}
      </div>
    </main>
  )
}
