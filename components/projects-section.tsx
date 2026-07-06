'use client'

import Link from 'next/link'
import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { ProjectModal } from './project-modal'
import { cn } from '@/lib/utils'

interface Project {
  id: string
  title: string
  description: string
  imageUrl?: string | null
  tags: string[]
  category: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  if (projects.length === 0) return null

  return (
    <section id="work" className="relative py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-12 md:mb-16 space-y-2 md:space-y-4">
        <p className="text-xs md:text-sm text-purple-400 uppercase tracking-widest">FEATURED WORK</p>
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white">
          Projects That Make an Impact
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
        {projects.map((project, i) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`group relative border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
              i % 3 === 0
                ? 'md:col-span-1 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10'
                : 'border-border/50 bg-card/30'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-4 md:p-8 h-full flex flex-col space-y-3 md:space-y-4 backdrop-blur-sm hover:bg-card/50 transition-all duration-300 group-hover:translate-y-[-4px]">
              <div className="flex items-start justify-between">
                <div className="space-y-1 md:space-y-2">
                  <p className="text-xs font-semibold text-purple-300 uppercase tracking-widest">{project.category}</p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition">{project.title}</h3>
                </div>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-grow">{project.description}</p>
              {project.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap pt-3 md:pt-4 border-t border-border/50">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="px-2 md:px-3 py-0.5 md:py-1 text-xs bg-card/50 border border-border/50 rounded-full text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/portfolio"
          className={cn(
            buttonVariants(),
            'border-border bg-background px-6 py-2 text-sm hover:bg-card text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
          )}
        >
          View All Projects →
        </Link>
      </div>

      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </section>
  )
}
