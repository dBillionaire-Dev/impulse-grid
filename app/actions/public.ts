"use server";

// Public, read-only data for the homepage. Unlike app/actions/portfolio.ts,
// nothing here requires a session, visitors to the public site aren't
// logged in. Since this is a single-owner portfolio, we don't filter by
// userId; we only filter by `published` so the owner can hide draft items
// from the live site while still editing them in /admin.

import { db } from "@/lib/db";
import {
  services,
  projects,
  testimonials,
  stats,
  tools,
  processSteps,
  portfolioContent,
  packages,
} from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getPublicPortfolioContent() {
  const rows = await db.select().from(portfolioContent).limit(1);
  return (
    rows[0] ?? {
      heroTitle: "I Automate. I Design. I Elevate Brands.",
      heroDescription:
        "AI automation with n8n. Stunning designs that communicate. Systems that scale your business.",
      aboutText: "",
      ctaText: "Let's Work Together",
      socialLinks: {} as Record<string, string>,
    }
  );
}

export async function getPublicServices() {
  return db
    .select()
    .from(services)
    .where(eq(services.published, true))
    .orderBy(services.order);
}

export async function getPublicProjects() {
  return db
    .select()
    .from(projects)
    .where(eq(projects.published, true))
    .orderBy(desc(projects.createdAt));
}

export async function getPublicTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.published, true))
    .orderBy(testimonials.order);
}

export async function getPublicStats() {
  return db
    .select()
    .from(stats)
    .where(eq(stats.published, true))
    .orderBy(stats.order);
}

export async function getPublicProcessSteps() {
  return db
    .select()
    .from(processSteps)
    .where(eq(processSteps.published, true))
    .orderBy(processSteps.stepNumber);
}

export async function getPublicTools() {
  return db
    .select()
    .from(tools)
    .where(eq(tools.published, true))
    .orderBy(tools.category, tools.name);
}

export async function getPublicPackages() {
  return db
    .select()
    .from(packages)
    .where(eq(packages.published, true))
    .orderBy(packages.order);
}
