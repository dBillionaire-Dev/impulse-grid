'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    category: string
    description: string
    tags: string[]
    fullDescription?: string
    results?: string[]
    challenge?: string
    solution?: string
  }
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex-1">
            <DialogTitle className="text-3xl font-bold text-white">{project.title}</DialogTitle>
            <p className="text-sm text-purple-400 uppercase tracking-widest mt-2">{project.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <X size={24} />
          </button>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Challenge */}
          {project.challenge && (
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">Solution</h3>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">Results</h3>
              <ul className="space-y-2">
                {project.results.map((result, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span className="text-muted-foreground">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-card/50 border border-border/50 rounded-full text-muted-foreground hover:text-foreground transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              asChild
            >
              <a href="https://tally.so/r/q4YP12" target="_blank" rel="noopener noreferrer">
                Discuss This Project
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
