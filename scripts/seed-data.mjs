import { Pool } from 'pg'

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

const pool = new Pool({ connectionString: DATABASE_URL })

const seedSQL = `
-- Clear existing data
DELETE FROM services;
DELETE FROM packages;
DELETE FROM projects;
DELETE FROM stats;
DELETE FROM testimonials;
DELETE FROM process_steps;
DELETE FROM tools;

-- Get first user ID (admin)
INSERT INTO services (id, userId, title, description, icon, color, "order", published)
VALUES
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'AI & Automation', 'Intelligent workflows that handle repetitive tasks, data processing, and decision logic without human intervention using n8n.', '🤖', '#8B5CF6', 0, true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'No-Code Solutions', 'Build smart systems, dashboards, and tools without writing a single line of code using best-in-class SaaS platforms.', '🔧', '#7C3AED', 1, true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Graphic Design', 'Visually stunning designs that communicate your brand message and drive engagement across all channels.', '📊', '#EC4899', 2, true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Brand Design', 'Build a strong, consistent brand identity that sets you apart and builds trust with your audience.', '💼', '#F59E0B', 3, true);

INSERT INTO stats (id, userId, label, value, suffix, "order", published)
VALUES
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Projects Completed', '100', '+', 0, true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Hours Saved for Clients', '500', '+', 1, true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Client Satisfaction', '98', '%', 2, true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Years of Experience', '5', '+', 3, true);

INSERT INTO process_steps (id, userId, stepNumber, title, description, "order", published)
VALUES
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 1, 'Discover', 'I learn about your business, goals, and challenges to understand the full picture.', 0, true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 2, 'Plan', 'Design the automation solution that fits your specific needs & budget.', 1, true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 3, 'Build', 'Create, automate, and design with precision and attention to every detail.', 2, true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 4, 'Test', 'Ensure everything runs smoothly, testing every aspect of the workflow.', 3, true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 5, 'Deliver', 'Launch the solution and ensure you''re equipped to run it independently.', 4, true);

INSERT INTO tools (id, userId, name, icon, category, published)
VALUES
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'n8n', '⚙️', 'Automation', true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Make', '🔗', 'Automation', true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Zapier', '⚡', 'Integration', true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Notion', '📝', 'Productivity', true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Google Sheets', '📊', 'Data', true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Slack', '💬', 'Communication', true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Discord', '🎮', 'Communication', true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Airtable', '🗂️', 'Database', true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'Figma', '🎨', 'Design', true),
  (gen_random_uuid(), (SELECT id FROM "neon_auth"."user" LIMIT 1), 'OpenAI', '🧠', 'AI', true);
`

async function seed() {
  try {
    console.log('Seeding database with portfolio data...')
    
    // Check if user exists
    const userCheck = await pool.query('SELECT id FROM "neon_auth"."user" LIMIT 1')
    if (userCheck.rows.length === 0) {
      console.warn('No users found in database. Please create a user first.')
      await pool.end()
      return
    }

    // Execute seed SQL
    const statements = seedSQL.split(';').filter(s => s.trim())
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement + ';')
      }
    }

    console.log('✓ Database seeded successfully!')
    await pool.end()
  } catch (error) {
    console.error('Error seeding database:', error)
    await pool.end()
    process.exit(1)
  }
}

seed()
