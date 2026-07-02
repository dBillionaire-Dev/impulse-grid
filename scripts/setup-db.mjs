import { Pool } from 'pg'

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

const pool = new Pool({ connectionString: DATABASE_URL })

const createTablesSql = `
-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#8B5CF6',
  "order" INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  "order" INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  imageUrl TEXT,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  category TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create stats table
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId TEXT NOT NULL,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  suffix TEXT NOT NULL DEFAULT '',
  "order" INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId TEXT NOT NULL,
  author TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create process_steps table
CREATE TABLE IF NOT EXISTS process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId TEXT NOT NULL,
  stepNumber INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId TEXT NOT NULL,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create portfolio_content table
CREATE TABLE IF NOT EXISTS portfolio_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId TEXT NOT NULL,
  heroTitle TEXT NOT NULL DEFAULT 'Automate. Design. Elevate Brands.',
  heroDescription TEXT NOT NULL,
  aboutText TEXT NOT NULL,
  ctaText TEXT NOT NULL DEFAULT 'Let''s Work Together',
  socialLinks JSONB NOT NULL DEFAULT '{}'::jsonb,
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_services_userId ON services(userId);
CREATE INDEX IF NOT EXISTS idx_packages_userId ON packages(userId);
CREATE INDEX IF NOT EXISTS idx_projects_userId ON projects(userId);
CREATE INDEX IF NOT EXISTS idx_stats_userId ON stats(userId);
CREATE INDEX IF NOT EXISTS idx_testimonials_userId ON testimonials(userId);
CREATE INDEX IF NOT EXISTS idx_process_steps_userId ON process_steps(userId);
CREATE INDEX IF NOT EXISTS idx_tools_userId ON tools(userId);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_userId ON contact_submissions(userId);
CREATE INDEX IF NOT EXISTS idx_portfolio_content_userId ON portfolio_content(userId);
`

async function setupDatabase() {
  try {
    console.log('Setting up database tables...')
    
    // Split and execute each statement separately
    const statements = createTablesSql.split(';').filter(s => s.trim())
    
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement + ';')
        console.log('✓ Executed:', statement.substring(0, 50) + '...')
      }
    }
    
    console.log('\n✓ Database setup complete!')
    await pool.end()
  } catch (error) {
    console.error('Error setting up database:', error)
    await pool.end()
    process.exit(1)
  }
}

setupDatabase()
