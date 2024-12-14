# Database Documentation

## Overview
Staz uses PostgreSQL with Drizzle ORM for database management. The schema is organized into modular components for better maintainability and scalability.

## Structure
- `schema/`: Contains all database schema definitions
- `migrations/`: Database migration files
- `queries/`: Common query examples and patterns

## Key Features
- Type-safe database operations with Drizzle ORM
- Automatic migration generation
- Schema-first approach
- Modular table organization

## Schema Organization
1. **Auth & Users** (`users.ts`)
   - User authentication
   - Profile management
   - Role-based access control

2. **Core Tables** (`links.ts`)
   - Domains management
   - Global link registry
   - User-specific links

3. **Collections** (`collections.ts`)
   - User stashes
   - Collections
   - Access control
   - Sharing functionality

4. **Tags** (`tags.ts`)
   - Tag management
   - Link tagging system

5. **Activity** (`activity.ts`)
   - User activity logging
   - System events tracking 