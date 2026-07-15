import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACTION_GROUPS = [
  {
    title: "Services",
    actions: [
      "getServices() — list your services",
      "createService({ title, description, icon, color }) — add a new one",
      "updateService(id, data) — edit an existing one",
      "deleteService(id) — remove one",
    ],
  },
  {
    title: "Packages",
    actions: [
      "getPackages()",
      "createPackage({ title, description, features })",
      "updatePackage(id, data)",
      "deletePackage(id)",
    ],
  },
  {
    title: "Projects",
    actions: [
      "getProjects()",
      "createProject({ title, description, imageUrl?, category, tags })",
      "updateProject(id, data)",
      "deleteProject(id)",
    ],
  },
  {
    title: "Statistics",
    actions: [
      "getStats()",
      "createStat({ label, value, suffix })",
      "updateStat(id, data)",
      "deleteStat(id)",
    ],
  },
  {
    title: "Testimonials",
    actions: [
      "getTestimonials()",
      "createTestimonial({ author, company, content, image? })",
      "updateTestimonial(id, data)",
      "deleteTestimonial(id)",
    ],
  },
  {
    title: "Process Steps",
    actions: [
      "getProcessSteps()",
      "createProcessStep({ stepNumber, title, description })",
      "updateProcessStep(id, data)",
      "deleteProcessStep(id)",
    ],
  },
  {
    title: "Tools",
    actions: [
      "getTools()",
      "createTool({ name, icon, category })",
      "updateTool(id, data)",
      "deleteTool(id)",
    ],
  },
  {
    title: "Portfolio Content (Hero / About / CTA)",
    actions: [
      "getPortfolioContent() — reads the current admin's hero/about/CTA copy",
      "updatePortfolioContent({ heroTitle, heroDescription, aboutText, ctaText, socialLinks? }) — upserts it",
    ],
  },
  {
    title: "Public reads (no auth — used by the homepage)",
    actions: [
      "getPublicPortfolioContent()",
      "getPublicServices() / getPublicProjects() / getPublicTools()",
      "getPublicProcessSteps() / getPublicStats() / getPublicPackages()",
      "All of these only return rows where published = true.",
    ],
  },
];

export default function ApiReferencePage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            API Reference - Developers Only
          </h1>
          <p className="text-muted-foreground mt-2">
            Server actions available in{" "}
            <code className="text-purple-300">app/actions/portfolio.ts</code>{" "}
            and <code className="text-purple-300">app/actions/public.ts</code>.
          </p>
        </div>
        <Link
          href="/console"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-border",
          )}
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="border border-purple-500/30 rounded-lg p-6 bg-purple-500/5">
        <p className="text-sm text-muted-foreground leading-relaxed">
          These are Next.js Server Actions, not HTTP endpoints you call from
          outside the app. They run only when imported and invoked directly from
          a React component inside this codebase (as the admin pages already
          do). The authenticated ones (everything in{" "}
          <code className="text-purple-300">portfolio.ts</code>) automatically
          scope every query to your logged-in user's account.
        </p>
      </div>

      <div className="space-y-6">
        {ACTION_GROUPS.map((group) => (
          <div
            key={group.title}
            className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm"
          >
            <h2 className="text-lg font-semibold text-white mb-3">
              {group.title}
            </h2>
            <ul className="space-y-1.5">
              {group.actions.map((action) => (
                <li
                  key={action}
                  className="text-sm text-muted-foreground font-mono leading-relaxed"
                >
                  {action}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
