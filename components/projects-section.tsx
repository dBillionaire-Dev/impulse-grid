'use client'

import Link from 'next/link'
import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { ProjectModal } from './project-modal'
import { cn } from '@/lib/utils'

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const projects = [
    {
      title: 'AI Content Automation',
      category: 'AUTOMATION',
      description: 'Automated content curation & publishing system that saves 7 hours weekly',
      fullDescription: 'Built a comprehensive AI-powered content automation system that streamlines content creation, curation, and distribution. This system integrates with multiple APIs to automatically process and publish content across various platforms.',
      challenge: 'The client was spending 7+ hours per week manually curating and publishing content across multiple platforms, which was inefficient and prone to errors.',
      solution: 'Developed a n8n workflow that connects OpenAI for content generation, integrates with WordPress for publishing, and automates the entire pipeline from ideation to distribution.',
      results: ['Saves 7 hours per week', '300% increase in content output', '50% reduction in manual errors', 'Better engagement metrics'],
      tags: ['n8n', 'OpenAI', 'WordPress', 'Automation'],
      highlight: true,
    },
    {
      title: 'Client Onboarding System',
      category: 'AUTOMATION',
      description: 'Streamlined client onboarding workflow eliminating manual data entry',
      fullDescription: 'Created an end-to-end automated onboarding system that guides new clients through a structured process, collecting all necessary information and automatically syncing it across CRM and project management tools.',
      challenge: 'Manual onboarding process took 3-4 hours per client and was inconsistent, leading to missing information and delayed project starts.',
      solution: 'Implemented a Make automation that combines Airtable forms with Notion for documentation, automating data collection and synchronization.',
      results: ['90% reduction in onboarding time', '100% data consistency', 'Improved client satisfaction', 'Zero data loss'],
      tags: ['Make', 'Airtable', 'Notion', 'Client Management'],
    },
    {
      title: 'Brand Identity Design',
      category: 'DESIGN',
      description: 'Modern brand identity design for a tech startup with consistent visual language',
      fullDescription: 'Designed a complete brand identity system for a growing tech startup, including logo design, color palette, typography system, and comprehensive brand guidelines.',
      challenge: 'The startup lacked a cohesive visual identity, making it difficult to establish brand recognition and professional presence across platforms.',
      solution: 'Created a modern, versatile brand system that works across digital and print, with a flexible approach to accommodate future growth.',
      results: ['Increased brand recognition', 'Professional brand presence', 'Consistent visual identity', 'Ready for scaling'],
      tags: ['Figma', 'Typography', 'Color Theory', 'Brand Design'],
      highlight: true,
    },
    {
      title: 'Social Media Campaign',
      category: 'CAMPAIGN',
      description: 'Creative social media designs that drive engagement and brand awareness',
      fullDescription: 'Executed a comprehensive social media design campaign with custom graphics, motion designs, and copywriting that aligned with the brand identity and marketing goals.',
      challenge: 'Needed to create engaging social content at scale while maintaining brand consistency and improving engagement rates.',
      solution: 'Developed a design system for social content with templates and custom designs, combined with strategic copywriting.',
      results: ['3x engagement increase', '40% follower growth', 'Strong brand consistency', 'High conversion rates'],
      tags: ['Design', 'Copywriting', 'Analytics', 'Social Media'],
    },
  ]

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
            key={i}
            onClick={() => setSelectedProject(project)}
            className={`group relative border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
              project.highlight
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
              <div className="flex gap-2 flex-wrap pt-3 md:pt-4 border-t border-border/50">
                {project.tags.map((tag, j) => (
                  <span key={j} className="px-2 md:px-3 py-0.5 md:py-1 text-xs bg-card/50 border border-border/50 rounded-full text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/portfolio" passHref>
        </Link>
        <Link href="portfolio" passHref
            className={cn(
            buttonVariants(),
            'border-border bg-background px-6 py-2 text-sm hover:bg-card text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
          )}>
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
