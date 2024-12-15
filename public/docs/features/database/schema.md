# Database Schema

## Overview

Staz uses a PostgreSQL database with Drizzle ORM for type-safe database operations. The schema is organized into several core modules:

## Core Tables

### Bookmarks Table

```typescript
export const bookmarks = pgTable("bookmark", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar('title', { length: 50 }).unique(),
  url: text('url').unique(),
  description: text('description'),
  // ... other fields
});
```

### Authentication Tables

```typescript
export const accounts = pgTable("account", {
  userId: uuid("userId").references(() => bookmarks.id),
  type: text("type"),
  provider: text("provider"),
  providerAccountId: text("providerAccountId"),
  // ... OAuth fields
});

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId").references(() => bookmarks.id),
  expires: timestamp("expires"),
});
```

### Links & Collections

```typescript
export const links = pgTable("links", {
  id: uuid("id").primaryKey(),
  url: text("url").unique(),
  title: text("title"),
  description: text("description"),
  // ... metadata fields
});

export const collections = pgTable("collections", {
  id: uuid("id").primaryKey(),
  name: varchar("name"),
  userId: uuid("userId").references(() => bookmarks.id),
  // ... collection fields
});
```

## Schema Organization

The schema is modularly organized in the `src/db/schema` directory:

- `bookmarks.ts`: Bookmark data
- `auths.ts`: Authentication tables
- `links.ts`: Bookmark data
- `collections.ts`: Collection management
- `tags.ts`: Tagging system
- `activity.ts`: Activity logging

## Type Safety

All tables include TypeScript types via Drizzle:

```typescript
export type Bookmark = typeof bookmarks.$inferSelect;
export type NewBookmark = typeof bookmarks.$inferInsert;
```

## Migrations

Database migrations are handled via Drizzle Kit:

```bash
# Generate migrations
pnpm db:generate

# Push changes
pnpm db:push

# Reset database (development only)
pnpm db:reset
``` 