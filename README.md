# BakeBook

A recipe management app built for bakers. Browse, create, and organise baking recipes — with ingredient scaling for different pan sizes, a shopping list generator, and dark mode.

## Features

- **Recipe library** — browse all recipes with fuzzy search by title or ingredient
- **Create & edit recipes** — add ingredients, step-by-step instructions, and photos for both the recipe and individual steps
- **Baking form recalculator** — rescale ingredient amounts automatically when switching between pan shapes and sizes (round / rectangular)
- **Shopping list** — add multiple recipes to a combined shopping list with ingredients merged and scaled quantities applied
- **Favourites** — bookmark recipes; synced to your account when logged in, stored locally when browsing as a guest
- **Discord login** — sign in with Discord to persist favourites across devices and to create or delete recipes
- **Dark mode** — toggle between light and dark theme, preference saved locally

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 13 (Pages Router) |
| Styling | Styled Components |
| Database | MongoDB via Mongoose |
| Authentication | NextAuth.js (Discord OAuth) |
| Image hosting | Cloudinary |
| Data fetching | SWR |
| Search | Fuse.js (fuzzy search) |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root with the following:

```
MONGODB_URI=

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET=
```

- **MongoDB** — create a free cluster at [mongodb.com](https://www.mongodb.com). Ingredients and units are seeded automatically on first connection.
- **Discord OAuth** — create an application at [discord.com/developers](https://discord.com/developers/applications) and add `http://localhost:3000/api/auth/callback/discord` as a redirect URI.
- **Cloudinary** — create a free account at [cloudinary.com](https://cloudinary.com) for recipe image hosting.
- **NEXTAUTH_SECRET** — generate one with `openssl rand -base64 32`.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run test      # Run tests (watch mode)
```
