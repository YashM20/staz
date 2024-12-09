<img src="https://github.com/YashM20/staz/blob/main/public/assets/images/Staz_logo.png" alt="Staz Logo" width="100" height="100" />  

# 🚀 Staz: Your All-in-One Bookmark Manager  

💡 **Tag it. Stash it. Staz it.**  
Reimagine how you save, organize, and retrieve your favorite links with Staz.  

Staz is a modern, intuitive bookmark manager that helps you save web pages, songs, articles, or anything else while browsing. Designed for creatives and built for coders, Staz keeps your digital stash organized and accessible across devices.  

## 🔗 Features

- **Collections**: Group bookmarks into context-specific collections.  
- **Tags & Filters**: Classify items with tags and filter them efficiently by type, tags, or domain.  
- **Duplicates and Broken Links**: Detect duplicates and inaccessible links to keep your library clean.  
- **Permanent Copies**: Automatically archive web pages so you'll always have access.  
- **Instant Previews**: Read articles, view videos, and browse content without leaving the app.  
- **Multiple Views**: Choose between Grid, List, Headlines, or Masonry view modes.  
- **Import & Export**: Easily move your bookmarks in and out of Staz.  

## 🛠️ Built With

| Technology | Description |
|------------|-------------|
| ![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white) | Next.js for robust and scalable web applications |
| ![Drizzle ORM](https://img.shields.io/badge/drizzle-ORM-blue?style=for-the-badge) | Drizzle ORM for type-safe database operations |
| ![Shadcn](https://img.shields.io/badge/shadcn-Design%20System-orange?style=for-the-badge) | Shadcn for reusable UI components |
| ![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) | Tailwind CSS for modern and responsive designs |
| ![motion.dev](https://img.shields.io/badge/motion.dev-Animations-purple?style=for-the-badge) | Motion.dev for smooth animations |
| ![Supabase](https://img.shields.io/badge/supabase-Database-green?style=for-the-badge) | Supabase for powerful backend services |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PNPM package manager
- PostgreSQL database

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/staz.git
   cd staz
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your database credentials and other required variables.

4. Set up the database:
   ```bash
   # Generate migration files
   pnpm drizzle-kit generate

   # Push schema changes to database
   pnpm drizzle-kit push:pg

   # Apply migrations
   pnpm drizzle-kit migrate
   ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

### Database Management

Drizzle ORM commands available through pnpm scripts:

```bash
# Generate migration files from schema changes
pnpm db:generate

# Push schema changes directly to database
pnpm db:push

# Apply pending migrations
pnpm db:migrate

```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:  

1. Fork the repository  
2. Create a new branch for your feature (`git checkout -b feature/NewFeature`)  
3. Commit your changes (`git commit -m 'Add a new feature'`)  
4. Push your branch (`git push origin feature/NewFeature`)  
5. Open a pull request for review  

Please ensure your PR adheres to our coding standards and includes appropriate tests.

## 📝 License

Distributed under the MIT License. See `LICENSE` for details.  

## ⭐ Support the Project

If Staz makes your digital life easier, please give it a ⭐ on GitHub to show your support!  

---

