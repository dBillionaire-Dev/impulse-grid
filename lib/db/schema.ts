import { pgTable, text, timestamp, boolean, integer, jsonb, uuid } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Add your app tables below. Always include a plain `userId` column so queries
// can be scoped per user — the security model depends on this column existing,
// not on a foreign key. Do NOT add a foreign key constraint
// (`.references(() => user.id, ...)`) unless the user explicitly asks for
// foreign keys or referential integrity; FK constraints make iterating on the
// schema harder.
//
// Example:
//
// import { serial } from "drizzle-orm/pg-core"
//
// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   userId: text("userId").notNull(),
//   title: text("title").notNull(),
//   completed: boolean("completed").notNull().default(false),
//   createdAt: timestamp("createdAt").notNull().defaultNow(),
// })
//
// If the user asks for foreign keys, add the reference back in:
//   userId: text("userId")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),

// Portfolio Services
export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull().default('#8B5CF6'),
  order: integer('order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Portfolio Packages
export const packages = pgTable('packages', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  features: jsonb('features').notNull().default([]),
  order: integer('order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Featured Projects
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('imageUrl'),
  tags: jsonb('tags').notNull().default([]),
  category: text('category').notNull(),
  order: integer('order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Portfolio Statistics
export const stats = pgTable('stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  label: text('label').notNull(),
  value: text('value').notNull(),
  suffix: text('suffix').notNull().default(''),
  order: integer('order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Portfolio Testimonials
export const testimonials = pgTable('testimonials', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  author: text('author').notNull(),
  company: text('company').notNull(),
  content: text('content').notNull(),
  image: text('image'),
  order: integer('order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Process Steps
export const processSteps = pgTable('process_steps', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  stepNumber: integer('stepNumber').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  order: integer('order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Tools & Technologies
export const tools = pgTable('tools', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  name: text('name').notNull(),
  icon: text('icon').notNull(),
  category: text('category').notNull(),
  order: integer('order').notNull().default(0),
  published: boolean('published').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Contact Form Submissions
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  read: boolean('read').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Portfolio Content
export const portfolioContent = pgTable('portfolio_content', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  heroTitle: text('heroTitle').notNull().default('Automate. Design. Elevate Brands.'),
  heroDescription: text('heroDescription').notNull(),
  aboutText: text('aboutText').notNull(),
  ctaText: text('ctaText').notNull().default("Let's Work Together"),
  socialLinks: jsonb('socialLinks').notNull().default({}),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
