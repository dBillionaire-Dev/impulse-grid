import { Header } from "@/components/header";
import { Hero } from "@/components/1hero";
import { ServicesGrid } from "@/components/services-grid";
import { ToolsSection } from "@/components/tools-section";
import { ProjectsSection } from "@/components/projects-section";
import { ProcessSection } from "@/components/process-section";
import { StatsSection } from "@/components/stats-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import {
  getPublicPortfolioContent,
  getPublicServices,
  getPublicTools,
  getPublicProjects,
  getPublicProcessSteps,
  getPublicStats,
} from "@/app/actions/public";

// Revalidate every 60s so admin edits show up without needing a full redeploy,
// while still getting the performance benefit of a cached static page.
export const revalidate = 60;

export default async function Home() {
  const [content, services, tools, projects, processSteps, stats] =
    await Promise.all([
      getPublicPortfolioContent(),
      getPublicServices(),
      getPublicTools(),
      getPublicProjects(),
      getPublicProcessSteps(),
      getPublicStats(),
    ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero
        heroTitle={content.heroTitle}
        heroDescription={content.heroDescription}
        heroImageUrl={content.heroImageUrl}
      />
      <ServicesGrid services={services} />
      <ToolsSection tools={tools} />
      <ProjectsSection projects={projects as any} />
      <ProcessSection steps={processSteps} />
      <StatsSection stats={stats} />
      <CTASection ctaText={content.ctaText} />
      <Footer />
    </div>
  );
}
