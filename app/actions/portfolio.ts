"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  services,
  projects,
  testimonials,
  stats,
  tools,
  processSteps,
  portfolioContent,
} from "@/lib/db/schema";
import { and, eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
  return session.user.id;
}

// Services
export async function getServices() {
  const userId = await getUserId();
  return db
    .select()
    .from(services)
    .where(eq(services.userId, userId))
    .orderBy(services.order);
}

export async function createService(data: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) {
  const userId = await getUserId();
  await db.insert(services).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/services");
}

export async function updateService(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(services)
    .set(data)
    .where(and(eq(services.id, id), eq(services.userId, userId)));
  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  const userId = await getUserId();
  await db
    .delete(services)
    .where(and(eq(services.id, id), eq(services.userId, userId)));
  revalidatePath("/admin/services");
}

// Projects
export async function getProjects() {
  const userId = await getUserId();
  return db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.createdAt));
}

export async function createProject(data: {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  category: string;
}) {
  const userId = await getUserId();
  await db.insert(projects).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(projects)
    .set(data)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)));
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const userId = await getUserId();
  await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)));
  revalidatePath("/admin/projects");
}

// Testimonials
export async function getTestimonials() {
  const userId = await getUserId();
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.userId, userId))
    .orderBy(testimonials.order);
}

export async function createTestimonial(data: {
  author: string;
  company: string;
  content: string;
  image?: string;
}) {
  const userId = await getUserId();
  await db.insert(testimonials).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/testimonials");
}

export async function updateTestimonial(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(testimonials)
    .set(data)
    .where(and(eq(testimonials.id, id), eq(testimonials.userId, userId)));
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const userId = await getUserId();
  await db
    .delete(testimonials)
    .where(and(eq(testimonials.id, id), eq(testimonials.userId, userId)));
  revalidatePath("/admin/testimonials");
}

// Stats
export async function getStats() {
  const userId = await getUserId();
  return db
    .select()
    .from(stats)
    .where(eq(stats.userId, userId))
    .orderBy(stats.order);
}

export async function createStat(data: {
  label: string;
  value: string;
  suffix: string;
}) {
  const userId = await getUserId();
  await db.insert(stats).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/stats");
}

export async function updateStat(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(stats)
    .set(data)
    .where(and(eq(stats.id, id), eq(stats.userId, userId)));
  revalidatePath("/admin/stats");
}

export async function deleteStat(id: string) {
  const userId = await getUserId();
  await db.delete(stats).where(and(eq(stats.id, id), eq(stats.userId, userId)));
  revalidatePath("/admin/stats");
}

// Process Steps
export async function getProcessSteps() {
  const userId = await getUserId();
  return db
    .select()
    .from(processSteps)
    .where(eq(processSteps.userId, userId))
    .orderBy(processSteps.stepNumber);
}

export async function createProcessStep(data: {
  stepNumber: number;
  title: string;
  description: string;
}) {
  const userId = await getUserId();
  await db.insert(processSteps).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/process");
}

export async function updateProcessStep(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(processSteps)
    .set(data)
    .where(and(eq(processSteps.id, id), eq(processSteps.userId, userId)));
  revalidatePath("/admin/process");
}

export async function deleteProcessStep(id: string) {
  const userId = await getUserId();
  await db
    .delete(processSteps)
    .where(and(eq(processSteps.id, id), eq(processSteps.userId, userId)));
  revalidatePath("/admin/process");
}

// Tools
export async function getTools() {
  const userId = await getUserId();
  return db
    .select()
    .from(tools)
    .where(eq(tools.userId, userId))
    .orderBy(tools.category, tools.name);
}

export async function createTool(data: {
  name: string;
  icon: string;
  category: string;
}) {
  const userId = await getUserId();
  await db.insert(tools).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/tools");
}

export async function updateTool(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(tools)
    .set(data)
    .where(and(eq(tools.id, id), eq(tools.userId, userId)));
  revalidatePath("/admin/tools");
}

export async function deleteTool(id: string) {
  const userId = await getUserId();
  await db.delete(tools).where(and(eq(tools.id, id), eq(tools.userId, userId)));
  revalidatePath("/admin/tools");
}

// Portfolio Content (Hero / About / CTA / Social links)
export async function getPortfolioContent() {
  const userId = await getUserId();
  const rows = await db
    .select()
    .from(portfolioContent)
    .where(eq(portfolioContent.userId, userId))
    .limit(1);

  // Row may not exist yet for a brand-new user — return sensible defaults
  // instead of null so the settings form always has something to render.
  return (
    rows[0] ?? {
      id: null,
      userId,
      heroTitle: "Automate. Design. Elevate Brands.",
      heroDescription: "",
      aboutText: "",
      ctaText: "Let's Work Together",
      socialLinks: {},
    }
  );
}

export async function updatePortfolioContent(data: {
  heroTitle: string;
  heroDescription: string;
  aboutText: string;
  ctaText: string;
  socialLinks?: Record<string, string>;
}) {
  const userId = await getUserId();

  const existing = await db
    .select({ id: portfolioContent.id })
    .from(portfolioContent)
    .where(eq(portfolioContent.userId, userId))
    .limit(1);

  if (existing[0]) {
    await db
      .update(portfolioContent)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(portfolioContent.userId, userId));
  } else {
    await db.insert(portfolioContent).values({ userId, ...data });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
("use server");

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  services,
  projects,
  testimonials,
  stats,
  tools,
  processSteps,
  portfolioContent,
} from "@/lib/db/schema";
import { and, eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
  return session.user.id;
}

// Services
export async function getServices() {
  const userId = await getUserId();
  return db
    .select()
    .from(services)
    .where(eq(services.userId, userId))
    .orderBy(services.order);
}

export async function createService(data: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) {
  const userId = await getUserId();
  await db.insert(services).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/services");
}

export async function updateService(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(services)
    .set(data)
    .where(and(eq(services.id, id), eq(services.userId, userId)));
  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  const userId = await getUserId();
  await db
    .delete(services)
    .where(and(eq(services.id, id), eq(services.userId, userId)));
  revalidatePath("/admin/services");
}

// Projects
export async function getProjects() {
  const userId = await getUserId();
  return db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.createdAt));
}

export async function createProject(data: {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  category: string;
}) {
  const userId = await getUserId();
  await db.insert(projects).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(projects)
    .set(data)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)));
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const userId = await getUserId();
  await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)));
  revalidatePath("/admin/projects");
}

// Testimonials
export async function getTestimonials() {
  const userId = await getUserId();
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.userId, userId))
    .orderBy(testimonials.order);
}

export async function createTestimonial(data: {
  author: string;
  company: string;
  content: string;
  image?: string;
}) {
  const userId = await getUserId();
  await db.insert(testimonials).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/testimonials");
}

export async function updateTestimonial(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(testimonials)
    .set(data)
    .where(and(eq(testimonials.id, id), eq(testimonials.userId, userId)));
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const userId = await getUserId();
  await db
    .delete(testimonials)
    .where(and(eq(testimonials.id, id), eq(testimonials.userId, userId)));
  revalidatePath("/admin/testimonials");
}

// Stats
export async function getStats() {
  const userId = await getUserId();
  return db
    .select()
    .from(stats)
    .where(eq(stats.userId, userId))
    .orderBy(stats.order);
}

export async function createStat(data: {
  label: string;
  value: string;
  suffix: string;
}) {
  const userId = await getUserId();
  await db.insert(stats).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/stats");
}

export async function updateStat(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(stats)
    .set(data)
    .where(and(eq(stats.id, id), eq(stats.userId, userId)));
  revalidatePath("/admin/stats");
}

export async function deleteStat(id: string) {
  const userId = await getUserId();
  await db.delete(stats).where(and(eq(stats.id, id), eq(stats.userId, userId)));
  revalidatePath("/admin/stats");
}

// Process Steps
export async function getProcessSteps() {
  const userId = await getUserId();
  return db
    .select()
    .from(processSteps)
    .where(eq(processSteps.userId, userId))
    .orderBy(processSteps.stepNumber);
}

export async function createProcessStep(data: {
  stepNumber: number;
  title: string;
  description: string;
}) {
  const userId = await getUserId();
  await db.insert(processSteps).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/process");
}

export async function updateProcessStep(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(processSteps)
    .set(data)
    .where(and(eq(processSteps.id, id), eq(processSteps.userId, userId)));
  revalidatePath("/admin/process");
}

export async function deleteProcessStep(id: string) {
  const userId = await getUserId();
  await db
    .delete(processSteps)
    .where(and(eq(processSteps.id, id), eq(processSteps.userId, userId)));
  revalidatePath("/admin/process");
}

// Tools
export async function getTools() {
  const userId = await getUserId();
  return db
    .select()
    .from(tools)
    .where(eq(tools.userId, userId))
    .orderBy(tools.category, tools.name);
}

export async function createTool(data: {
  name: string;
  icon: string;
  category: string;
}) {
  const userId = await getUserId();
  await db.insert(tools).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/tools");
}

export async function updateTool(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(tools)
    .set(data)
    .where(and(eq(tools.id, id), eq(tools.userId, userId)));
  revalidatePath("/admin/tools");
}

export async function deleteTool(id: string) {
  const userId = await getUserId();
  await db.delete(tools).where(and(eq(tools.id, id), eq(tools.userId, userId)));
  revalidatePath("/admin/tools");
}

// Portfolio Content (Hero / About / CTA / Social links)
export async function getPortfolioContent() {
  const userId = await getUserId();
  const rows = await db
    .select()
    .from(portfolioContent)
    .where(eq(portfolioContent.userId, userId))
    .limit(1);

  // Row may not exist yet for a brand-new user — return sensible defaults
  // instead of null so the settings form always has something to render.
  return (
    rows[0] ?? {
      id: null,
      userId,
      heroTitle: "Automate. Design. Elevate Brands.",
      heroDescription: "",
      aboutText: "",
      ctaText: "Let's Work Together",
      socialLinks: {},
    }
  );
}

export async function updatePortfolioContent(data: {
  heroTitle: string;
  heroDescription: string;
  aboutText: string;
  ctaText: string;
  socialLinks?: Record<string, string>;
}) {
  const userId = await getUserId();

  const existing = await db
    .select({ id: portfolioContent.id })
    .from(portfolioContent)
    .where(eq(portfolioContent.userId, userId))
    .limit(1);

  if (existing[0]) {
    await db
      .update(portfolioContent)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(portfolioContent.userId, userId));
  } else {
    await db.insert(portfolioContent).values({ userId, ...data });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
("use server");

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  services,
  projects,
  testimonials,
  stats,
  tools,
  processSteps,
  portfolioContent,
} from "@/lib/db/schema";
import { and, eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
  return session.user.id;
}

// Services
export async function getServices() {
  const userId = await getUserId();
  return db
    .select()
    .from(services)
    .where(eq(services.userId, userId))
    .orderBy(services.order);
}

export async function createService(data: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) {
  const userId = await getUserId();
  await db.insert(services).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/services");
}

export async function updateService(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(services)
    .set(data)
    .where(and(eq(services.id, id), eq(services.userId, userId)));
  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  const userId = await getUserId();
  await db
    .delete(services)
    .where(and(eq(services.id, id), eq(services.userId, userId)));
  revalidatePath("/admin/services");
}

// Projects
export async function getProjects() {
  const userId = await getUserId();
  return db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.createdAt));
}

export async function createProject(data: {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  category: string;
}) {
  const userId = await getUserId();
  await db.insert(projects).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(projects)
    .set(data)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)));
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const userId = await getUserId();
  await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)));
  revalidatePath("/admin/projects");
}

// Testimonials
export async function getTestimonials() {
  const userId = await getUserId();
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.userId, userId))
    .orderBy(testimonials.order);
}

export async function createTestimonial(data: {
  author: string;
  company: string;
  content: string;
  image?: string;
}) {
  const userId = await getUserId();
  await db.insert(testimonials).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/testimonials");
}

export async function updateTestimonial(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(testimonials)
    .set(data)
    .where(and(eq(testimonials.id, id), eq(testimonials.userId, userId)));
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const userId = await getUserId();
  await db
    .delete(testimonials)
    .where(and(eq(testimonials.id, id), eq(testimonials.userId, userId)));
  revalidatePath("/admin/testimonials");
}

// Stats
export async function getStats() {
  const userId = await getUserId();
  return db
    .select()
    .from(stats)
    .where(eq(stats.userId, userId))
    .orderBy(stats.order);
}

export async function createStat(data: {
  label: string;
  value: string;
  suffix: string;
}) {
  const userId = await getUserId();
  await db.insert(stats).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/stats");
}

export async function updateStat(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(stats)
    .set(data)
    .where(and(eq(stats.id, id), eq(stats.userId, userId)));
  revalidatePath("/admin/stats");
}

export async function deleteStat(id: string) {
  const userId = await getUserId();
  await db.delete(stats).where(and(eq(stats.id, id), eq(stats.userId, userId)));
  revalidatePath("/admin/stats");
}

// Process Steps
export async function getProcessSteps() {
  const userId = await getUserId();
  return db
    .select()
    .from(processSteps)
    .where(eq(processSteps.userId, userId))
    .orderBy(processSteps.stepNumber);
}

export async function createProcessStep(data: {
  stepNumber: number;
  title: string;
  description: string;
}) {
  const userId = await getUserId();
  await db.insert(processSteps).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/process");
}

export async function updateProcessStep(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(processSteps)
    .set(data)
    .where(and(eq(processSteps.id, id), eq(processSteps.userId, userId)));
  revalidatePath("/admin/process");
}

export async function deleteProcessStep(id: string) {
  const userId = await getUserId();
  await db
    .delete(processSteps)
    .where(and(eq(processSteps.id, id), eq(processSteps.userId, userId)));
  revalidatePath("/admin/process");
}

// Tools
export async function getTools() {
  const userId = await getUserId();
  return db
    .select()
    .from(tools)
    .where(eq(tools.userId, userId))
    .orderBy(tools.category, tools.name);
}

export async function createTool(data: {
  name: string;
  icon: string;
  category: string;
}) {
  const userId = await getUserId();
  await db.insert(tools).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/tools");
}

export async function updateTool(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(tools)
    .set(data)
    .where(and(eq(tools.id, id), eq(tools.userId, userId)));
  revalidatePath("/admin/tools");
}

export async function deleteTool(id: string) {
  const userId = await getUserId();
  await db.delete(tools).where(and(eq(tools.id, id), eq(tools.userId, userId)));
  revalidatePath("/admin/tools");
}

// Portfolio Content (Hero / About / CTA / Social links)
export async function getPortfolioContent() {
  const userId = await getUserId();
  const rows = await db
    .select()
    .from(portfolioContent)
    .where(eq(portfolioContent.userId, userId))
    .limit(1);

  // Row may not exist yet for a brand-new user — return sensible defaults
  // instead of null so the settings form always has something to render.
  return (
    rows[0] ?? {
      id: null,
      userId,
      heroTitle: "Automate. Design. Elevate Brands.",
      heroDescription: "",
      aboutText: "",
      ctaText: "Let's Work Together",
      socialLinks: {},
    }
  );
}

export async function updatePortfolioContent(data: {
  heroTitle: string;
  heroDescription: string;
  aboutText: string;
  ctaText: string;
  socialLinks?: Record<string, string>;
}) {
  const userId = await getUserId();

  const existing = await db
    .select({ id: portfolioContent.id })
    .from(portfolioContent)
    .where(eq(portfolioContent.userId, userId))
    .limit(1);

  if (existing[0]) {
    await db
      .update(portfolioContent)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(portfolioContent.userId, userId));
  } else {
    await db.insert(portfolioContent).values({ userId, ...data });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
("use server");

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  services,
  projects,
  testimonials,
  stats,
  tools,
  processSteps,
  portfolioContent,
} from "@/lib/db/schema";
import { and, eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");
  return session.user.id;
}

// Services
export async function getServices() {
  const userId = await getUserId();
  return db
    .select()
    .from(services)
    .where(eq(services.userId, userId))
    .orderBy(services.order);
}

export async function createService(data: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) {
  const userId = await getUserId();
  await db.insert(services).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/services");
}

export async function updateService(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(services)
    .set(data)
    .where(and(eq(services.id, id), eq(services.userId, userId)));
  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  const userId = await getUserId();
  await db
    .delete(services)
    .where(and(eq(services.id, id), eq(services.userId, userId)));
  revalidatePath("/admin/services");
}

// Projects
export async function getProjects() {
  const userId = await getUserId();
  return db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.createdAt));
}

export async function createProject(data: {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  category: string;
}) {
  const userId = await getUserId();
  await db.insert(projects).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(projects)
    .set(data)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)));
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const userId = await getUserId();
  await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)));
  revalidatePath("/admin/projects");
}

// Testimonials
export async function getTestimonials() {
  const userId = await getUserId();
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.userId, userId))
    .orderBy(testimonials.order);
}

export async function createTestimonial(data: {
  author: string;
  company: string;
  content: string;
  image?: string;
}) {
  const userId = await getUserId();
  await db.insert(testimonials).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/testimonials");
}

export async function updateTestimonial(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(testimonials)
    .set(data)
    .where(and(eq(testimonials.id, id), eq(testimonials.userId, userId)));
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const userId = await getUserId();
  await db
    .delete(testimonials)
    .where(and(eq(testimonials.id, id), eq(testimonials.userId, userId)));
  revalidatePath("/admin/testimonials");
}

// Stats
export async function getStats() {
  const userId = await getUserId();
  return db
    .select()
    .from(stats)
    .where(eq(stats.userId, userId))
    .orderBy(stats.order);
}

export async function createStat(data: {
  label: string;
  value: string;
  suffix: string;
}) {
  const userId = await getUserId();
  await db.insert(stats).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/stats");
}

export async function updateStat(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(stats)
    .set(data)
    .where(and(eq(stats.id, id), eq(stats.userId, userId)));
  revalidatePath("/admin/stats");
}

export async function deleteStat(id: string) {
  const userId = await getUserId();
  await db.delete(stats).where(and(eq(stats.id, id), eq(stats.userId, userId)));
  revalidatePath("/admin/stats");
}

// Process Steps
export async function getProcessSteps() {
  const userId = await getUserId();
  return db
    .select()
    .from(processSteps)
    .where(eq(processSteps.userId, userId))
    .orderBy(processSteps.stepNumber);
}

export async function createProcessStep(data: {
  stepNumber: number;
  title: string;
  description: string;
}) {
  const userId = await getUserId();
  await db.insert(processSteps).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/process");
}

export async function updateProcessStep(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(processSteps)
    .set(data)
    .where(and(eq(processSteps.id, id), eq(processSteps.userId, userId)));
  revalidatePath("/admin/process");
}

export async function deleteProcessStep(id: string) {
  const userId = await getUserId();
  await db
    .delete(processSteps)
    .where(and(eq(processSteps.id, id), eq(processSteps.userId, userId)));
  revalidatePath("/admin/process");
}

// Tools
export async function getTools() {
  const userId = await getUserId();
  return db
    .select()
    .from(tools)
    .where(eq(tools.userId, userId))
    .orderBy(tools.category, tools.name);
}

export async function createTool(data: {
  name: string;
  icon: string;
  category: string;
}) {
  const userId = await getUserId();
  await db.insert(tools).values({
    userId,
    ...data,
  });
  revalidatePath("/admin/tools");
}

export async function updateTool(id: string, data: any) {
  const userId = await getUserId();
  await db
    .update(tools)
    .set(data)
    .where(and(eq(tools.id, id), eq(tools.userId, userId)));
  revalidatePath("/admin/tools");
}

export async function deleteTool(id: string) {
  const userId = await getUserId();
  await db.delete(tools).where(and(eq(tools.id, id), eq(tools.userId, userId)));
  revalidatePath("/admin/tools");
}

// Portfolio Content (Hero / About / CTA / Social links)
export async function getPortfolioContent() {
  const userId = await getUserId();
  const rows = await db
    .select()
    .from(portfolioContent)
    .where(eq(portfolioContent.userId, userId))
    .limit(1);

  // Row may not exist yet for a brand-new user — return sensible defaults
  // instead of null so the settings form always has something to render.
  return (
    rows[0] ?? {
      id: null,
      userId,
      heroTitle: "Automate. Design. Elevate Brands.",
      heroDescription: "",
      aboutText: "",
      ctaText: "Let's Work Together",
      socialLinks: {},
    }
  );
}

export async function updatePortfolioContent(data: {
  heroTitle: string;
  heroDescription: string;
  aboutText: string;
  ctaText: string;
  socialLinks?: Record<string, string>;
}) {
  const userId = await getUserId();

  const existing = await db
    .select({ id: portfolioContent.id })
    .from(portfolioContent)
    .where(eq(portfolioContent.userId, userId))
    .limit(1);

  if (existing[0]) {
    await db
      .update(portfolioContent)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(portfolioContent.userId, userId));
  } else {
    await db.insert(portfolioContent).values({ userId, ...data });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
