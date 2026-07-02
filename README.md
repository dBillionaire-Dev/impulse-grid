# Impulse Grid - AI Automation & Design Portfolio

A beautiful, fully-featured portfolio website for an AI automation expert, designer, and strategist. Built with Next.js 16, TypeScript, Express, PostgreSQL and Drizzle ORM, featuring an admin CMS, dark theme, and technical brand styling.

## Snapshot

![Snapshot](public/snapshot.png)

## Features

- **Modern Portfolio Homepage**: Showcase services, projects, process, and statistics
- **Dark Theme Design**: Purple, pink, and orange gradients with Tailwind CSS
- **Admin CMS Panel**: Full content management system for services, projects, testimonials, and more
- **Authentication**: Built-in user authentication with Better Auth
- **Database**: PostgreSQL with Neon and Drizzle ORM
- **Responsive Design**: Mobile-first responsive layouts
- **Animated 404 Page**: Beautiful error page with animations
- **Contact Form**: Public contact form with database storage

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Better Auth
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- PostgreSQL database (Neon account)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd impulse-grid
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Copy .env.example to .env.local and fill in your values
DATABASE_URL=postgresql://user:password@host/database
BETTER_AUTH_SECRET=your-secret-key
```

4. Set up the database:
```bash
# Create tables
DATABASE_URL="your-db-url" node scripts/setup-db.mjs

# Seed sample data (optional)
DATABASE_URL="your-db-url" node scripts/seed-data.mjs
```

5. Start the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) to see the portfolio

## Project Structure

```
├── app/
│   ├── admin/              # Admin panel (CMS)
│   ├── api/                # API routes
│   ├── actions/            # Server actions
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles & theme
│   └── not-found.tsx       # 404 page
├── components/
│   ├── header.tsx          # Navigation header
│   ├── hero.tsx            # Hero section
│   ├── services-grid.tsx   # Services showcase
│   ├── tools-section.tsx   # Tools grid
│   ├── projects-section.tsx # Projects showcase
│   ├── process-section.tsx # Process flow
│   ├── stats-section.tsx   # Statistics
│   ├── cta-section.tsx     # Call-to-action
│   └── footer.tsx          # Footer
├── lib/
│   ├── auth.ts             # Better Auth config
│   ├── auth-client.ts      # Auth client
│   ├── db/
│   │   ├── index.ts        # Drizzle DB instance
│   │   └── schema.ts       # Database schema
│   └── utils.ts            # Utilities
├── public/                 # Static assets
└── scripts/
    ├── setup-db.mjs        # Database setup
    └── seed-data.mjs       # Sample data
```

## Admin Panel

Access the admin panel at `/admin` (requires authentication).

### Features

- **Services**: Add, edit, and manage service offerings
- **Projects**: Manage portfolio projects with images and tags
- **Testimonials**: Add client testimonials and reviews
- **Statistics**: Update portfolio statistics and metrics
- **Process Steps**: Define your workflow process
- **Tools**: Manage tools and technologies used
- **Contact Submissions**: View and manage contact form submissions

### Default Credentials

Create a user account on the `/sign-up` page to access the admin panel.

## Database Schema

### Tables

- `services` - Service offerings with metadata
- `packages` - Service packages and pricing
- `projects` - Portfolio projects
- `stats` - Statistics and metrics
- `testimonials` - Client testimonials
- `process_steps` - Workflow process steps
- `tools` - Tools and technologies
- `contact_submissions` - Contact form submissions
- `portfolio_content` - Hero and general content

## Customization

### Colors

Edit the theme colors in `app/globals.css`:

```css
--primary: #a855f7;      /* Purple */
--secondary: #ec4899;    /* Pink */
--accent: #f59e0b;       /* Orange */
```

### Content

Update content via the admin panel or edit components directly:

- Hero section: `components/hero.tsx`
- Services: `components/services-grid.tsx`
- Footer links: `components/footer.tsx`

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel settings
4. Deploy!

```bash
vercel
```

## API Endpoints

### Contact Form
- `POST /api/contact` - Submit a contact form message

## Performance

- Optimized images with Next.js Image
- CSS-in-JS for dynamic styles
- Server-side rendering for SEO
- Edge caching for static content

## Security

- Row-level security patterns with Better Auth
- Server actions for protected mutations
- CSRF protection built-in
- Input validation and sanitization

## Future Enhancements

- Email notifications for contact submissions
- Image optimization and CDN integration
- Analytics dashboard
- Email templates for auto-replies
- Case study detail pages
- Blog section
- Testimonial ratings/stars

## Support

For issues and questions, please open an issue on GitHub.

## License

MIT License - feel free to use this for your portfolio!

---

Built with ❤️ by NexDev - AI Automation & Design
