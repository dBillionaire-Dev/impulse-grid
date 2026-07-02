import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ServicesGrid } from '@/components/services-grid'
import { ToolsSection } from '@/components/tools-section'
import { ProjectsSection } from '@/components/projects-section'
import { ProcessSection } from '@/components/process-section'
import { StatsSection } from '@/components/stats-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <ServicesGrid />
      <ToolsSection />
      <ProjectsSection />
      <ProcessSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
