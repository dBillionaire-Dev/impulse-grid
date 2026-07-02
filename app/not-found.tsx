'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.8,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden px-6 pt-20 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `float 8s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content - Horizontal Layout */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 404 Display - Horizontal */}
        <div className="flex items-center justify-start gap-8 mb-16">
          <div className="flex gap-6 items-baseline">
            <div className="text-[120px] md:text-[180px] font-black bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-none animate-bounce" style={{ animationDelay: '0s' }}>
              4
            </div>
            <div className="text-[120px] md:text-[180px] font-black bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-none animate-bounce" style={{ animationDelay: '0.15s' }}>
              0
            </div>
            <div className="text-[120px] md:text-[180px] font-black bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-none animate-bounce" style={{ animationDelay: '0.3s' }}>
              4
            </div>
          </div>

          {/* Divider line */}
          <div className="h-32 w-1 bg-gradient-to-b from-purple-500/30 to-pink-500/30" />

          {/* Message Section */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Project Not Found
            </h1>
            <p className="text-base text-muted-foreground max-w-md">
              This page doesn&apos;t exist yet, but that&apos;s okay! Let&apos;s get you back to exploring amazing projects and automation solutions.
            </p>
          </div>
        </div>

        {/* Simulated Project Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: 'AI Content Automation',
              category: 'AUTOMATION',
              color: 'from-purple-500',
            },
            {
              title: 'Client Onboarding System',
              category: 'AUTOMATION',
              color: 'from-pink-500',
            },
            {
              title: 'Brand Identity Design',
              category: 'DESIGN',
              color: 'from-orange-500',
            },
          ].map((project, i) => (
            <div
              key={i}
              className="group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 rounded-xl blur transition-opacity duration-300`} />
              <div className="relative border border-border/50 group-hover:border-purple-500/50 rounded-xl p-8 bg-card/30 backdrop-blur-sm group-hover:bg-card/60 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <p className="text-xs text-purple-400 uppercase tracking-widest mb-3">{project.category}</p>
                  <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                    {project.title}
                  </h3>
                </div>
                <div className="mt-6 pt-6 border-t border-border/20 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">View Project</span>
                  <span className="text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-start pb-20">
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border border-pink-500/30 px-8 py-6 text-base rounded-lg"
            asChild
          >
            <Link href="/">← Back to Home</Link>
          </Button>
          <Button
            variant="outline"
            className="border-border hover:bg-card px-8 py-6 text-base rounded-lg"
            asChild
          >
            <Link href="/portfolio">View All Projects →</Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </div>
  )
}
