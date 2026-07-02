'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ProjectModal } from '@/components/project-modal'

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const projects = [
    {
      id: 1,
      title: 'AI Content Automation',
      description: 'Automated content generation and publishing system for a marketing agency, reducing manual work by 80%.',
      fullDescription: 'Built a comprehensive AI-powered content automation system that streamlines content creation, curation, and distribution. This system integrates with multiple APIs to automatically process and publish content across various platforms.',
      challenge: 'The client was spending 7+ hours per week manually curating and publishing content across multiple platforms, which was inefficient and prone to errors.',
      solution: 'Developed a n8n workflow that connects OpenAI for content generation, integrates with WordPress for publishing, and automates the entire pipeline from ideation to distribution.',
      results: ['Saves 7 hours per week', '300% increase in content output', '50% reduction in manual errors', 'Better engagement metrics'],
      category: 'AUTOMATION',
      tags: ['n8n', 'OpenAI', 'Zapier', 'Automation'],
      color: 'from-purple-500',
      year: '2024',
    },
    {
      id: 2,
      title: 'Client Onboarding System',
      description: 'Complete automated onboarding workflow with document collection, payment processing, and notifications.',
      fullDescription: 'Created an end-to-end automated onboarding system that guides new clients through a structured process, collecting all necessary information and automatically syncing it across CRM and project management tools.',
      challenge: 'Manual onboarding process took 3-4 hours per client and was inconsistent, leading to missing information and delayed project starts.',
      solution: 'Implemented a Make automation that combines Airtable forms with Notion for documentation, automating data collection and synchronization.',
      results: ['90% reduction in onboarding time', '100% data consistency', 'Improved client satisfaction', 'Zero data loss'],
      category: 'AUTOMATION',
      tags: ['Make', 'Slack', 'Airtable', 'Client Management'],
      color: 'from-blue-500',
      year: '2024',
    },
    {
      id: 3,
      title: 'Brand Identity Design',
      description: 'Full brand identity system including logo, color palette, typography, and design guidelines.',
      fullDescription: 'Designed a complete brand identity system for a growing tech startup, including logo design, color palette, typography system, and comprehensive brand guidelines.',
      challenge: 'The startup lacked a cohesive visual identity, making it difficult to establish brand recognition and professional presence across platforms.',
      solution: 'Created a modern, versatile brand system that works across digital and print, with a flexible approach to accommodate future growth.',
      results: ['Increased brand recognition', 'Professional brand presence', 'Consistent visual identity', 'Ready for scaling'],
      category: 'DESIGN',
      tags: ['Figma', 'Design', 'Strategy', 'Brand Design'],
      color: 'from-orange-500',
      year: '2023',
    },
    {
      id: 4,
      title: 'Dashboard & Analytics',
      description: 'Interactive data visualization dashboard with real-time analytics and custom reporting features.',
      category: 'AUTOMATION',
      tags: ['Google Sheets', 'Zapier', 'Data'],
      color: 'from-green-500',
      year: '2023',
    },
    {
      id: 5,
      title: 'Email Marketing Funnel',
      description: 'Sophisticated email automation workflow with segmentation, personalization, and A/B testing.',
      category: 'AUTOMATION',
      tags: ['Make', 'Zapier', 'Marketing'],
      color: 'from-pink-500',
      year: '2023',
    },
    {
      id: 6,
      title: 'Web Design & Development',
      description: 'Modern, responsive website design and development with conversion optimization focus.',
      category: 'DESIGN',
      tags: ['Web Design', 'UX/UI', 'Development'],
      color: 'from-cyan-500',
      year: '2023',
    },
  ]

  const categories = ['ALL', 'AUTOMATION', 'DESIGN']

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Image 
              src="/logo.png" 
              alt="IMPULSE GRID DIGITALS" 
              width={40} 
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-sm font-bold text-foreground hidden sm:inline">IMPULSE</span>
          </Link>
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border border-pink-500/30 px-6 py-2 rounded-lg"
            asChild
          >
            <Link href="/">Back Home</Link>
          </Button>
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
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-6 py-2 rounded-lg border border-border/50 hover:border-purple-500/50 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-card/50"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 rounded-2xl blur transition-opacity duration-300`} />
              <div className="relative border border-border/50 group-hover:border-purple-500/50 rounded-2xl p-8 bg-card/30 backdrop-blur-sm group-hover:bg-card/60 transition-all duration-300 h-full flex flex-col group-hover:translate-y-[-4px]">
                {/* Category Badge */}
                <div className="inline-block mb-4 w-fit">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
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

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/20">
                  <span className="text-xs text-muted-foreground">{project.year}</span>
                  <span className="text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 py-16 border-t border-border/30">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to start your next project?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Let&apos;s discuss how I can help automate, design, and elevate your business.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border border-pink-500/30 px-8 py-6 text-base rounded-lg"
              asChild
            >
              <Link href="/#contact">Get in Touch</Link>
            </Button>
            <Button
              variant="outline"
              className="border-border hover:bg-card px-8 py-6 text-base rounded-lg"
              asChild
            >
              <Link href="/">Back Home</Link>
            </Button>
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
