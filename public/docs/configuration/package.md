# Package Configuration

## Overview
The project uses PNPM as the package manager with the following core dependencies:

### Core Dependencies
```json
{
  "dependencies": {
    "next": "15.0.3",
    "react": "19.0.0-rc-66855b96-20241106",
    "drizzle-orm": "^0.37.0",
    "next-auth": "5.0.0-beta.25"
  }
}
```

### Scripts
```bash
# Development
pnpm dev          # Start development server with turbopack
pnpm build        # Build production bundle
pnpm start        # Start production server
pnpm lint         # Run linting

# Database
pnpm db:push      # Push schema changes
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Run migrations
pnpm db:studio    # Open Drizzle Studio
pnpm db:check     # Check schema
pnpm db:reset     # Reset database
```

### Key Features
- TypeScript support
- Next.js 15 with App Router
- Drizzle ORM for database
- NextAuth for authentication
- Tailwind CSS for styling
- Motion for animations 