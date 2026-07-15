import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    title: "Dashboard",
    body: "The landing page after you sign in. Gives you quick links to every content area, a system status snapshot, and this Help & Support panel.",
  },
  {
    title: "Services",
    body: 'The offerings shown in the "What I Do" grid on your homepage. Each service has a title, description, an emoji icon, and an accent color used for its card border and icon background. Add, edit, and delete freely. Changes reflect on the homepage the next time it re-renders (up to 60 seconds later, or immediately on a hard refresh).',
  },
  {
    title: "Packages",
    body: "Pricing tiers / service bundles. Each has a title, description, and a list of features (one per line in the form) rendered as a bullet list.",
  },
  {
    title: "Projects",
    body: "Your portfolio case studies. Title, description, category, an optional image URL, and comma-separated tags. Clicking a project on the public site opens a modal with this content.",
  },
  {
    title: "Statistics",
    body: 'The numbers shown in the "Results That Matter" section; label, value, and an optional suffix (e.g. "+" or "%").',
  },
  {
    title: "Testimonials",
    body: "Client quotes. Author name, company/role, the testimonial text, and an optional headshot image URL.",
  },
  {
    title: "Process Steps",
    body: 'The numbered steps in your "Simple Process" section. Step number controls both the displayed number and the ordering. This isn\'t rendered to the homepage except configured by the developer',
  },
  {
    title: "Tools",
    body: "The tech stack grid. Paste a direct link to an SVG/PNG logo in the icon field for a real logo, or drop in a single emoji if you don't have one handy. Tools are grouped by the category you assign them.",
  },
  {
    title: "Contact Submissions",
    body: "Messages sent through your site's contact form, if configured. Read-only inbox view.",
  },
  {
    title: "Settings",
    body: "Hero title, hero description, about text, and call-to-action button text, the core homepage copy. Hero title accepts multiple lines; each line renders in its own color on the homepage.",
  },
];

export default function DocumentationPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Documentation</h1>
          <p className="text-muted-foreground mt-2">
            A quick reference for what each section of this admin panel
            controls.
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

      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className="border border-border/50 rounded-lg p-6 bg-card/30 backdrop-blur-sm"
          >
            <h2 className="text-lg font-semibold text-white mb-2">
              {section.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      <div className="border border-purple-500/30 rounded-lg p-6 bg-purple-500/5">
        <h2 className="text-lg font-semibold text-white mb-2">
          A note on publishing
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every record has a <code className="text-purple-300">published</code>{" "}
          flag. Only published items appear on the live homepage, this lets you
          draft or update content without it going live immediately, once a
          toggle for it is added to each form. Currently all created items are
          published by default.
        </p>{" "}
        <br />
        <h2 className="text-lg font-semibold text-white mb-2">
          Authentication
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <Link href="https://impulse-grid.vercel.app/create-super">
            Visit https://impulse-grid.vercel.app
            <code className="text-purple-300">/create-super</code> to set up
            your admin account if not already set up.
          </Link>
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <Link href="https://impulse-grid.vercel.app/portal">
            Visit https://impulse-grid.vercel.app
            <code className="text-purple-300">/portal</code> to log in.
          </Link>
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <Link href="https://impulse-grid.vercel.app/console">
            Visit https://impulse-grid.vercel.app
            <code className="text-purple-300">/console</code> to visit the admin
            panel.
          </Link>
        </p>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        N.B: This admin pages url route were chosen to be different from the
        popular /admin to prevent attakers and cyber-bullies from easily finding
        the routes.
      </p>
    </div>
  );
}
