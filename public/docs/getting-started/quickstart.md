# Quick Start Guide

## Prerequisites

- Node.js 16.0.0 or later
- PostgreSQL database
- Google OAuth credentials

## Installation

```bash
git clone https://github.com/yourusername/staz.git
cd staz
pnpm install
```

## Environment Setup

Create a `.env` file in your project root:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Authentication
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
AUTH_SECRET="your-auth-secret"
```

## Database Setup

```bash
# Generate database schema
pnpm db:generate

# Push schema to database
pnpm db:push
```

## Start Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see your application. 