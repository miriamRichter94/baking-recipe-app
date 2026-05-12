# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start development server
npm run build      # production build
npm run lint       # ESLint
npm run test       # Jest in watch mode
npx jest <file>    # run a single test file
```

Required `.env.local` variables:
```
MONGODB_URI=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET=
```

## Architecture

**Next.js 13 Pages Router** — not App Router. The `@/` path alias maps to the project root.

### Global state (`pages/_app.js`)

All shared state lives in `AppContent` and is prop-drilled to every page:

| State | Storage | Purpose |
|---|---|---|
| `favoriteRecipes` | localStorage / DB | Bookmarked recipe IDs |
| `recipesToShop` | localStorage | Recipe IDs added to shopping list |
| `recalculatedRecipes` | localStorage | `{ [recipeId]: { shape, diameter, width, length, scalingFactor } }` |
| `isDarkMode` | localStorage | Toggles `.dark-mode` class on `<html>` |

**Favorites dual-mode:** Guests store favorites in localStorage. Authenticated users store them in MongoDB via `/api/favorites`. On login, any localStorage favorites are POSTed to the DB and then cleared — see the `mergeFavorites` effect in `_app.js`.

### Authentication

Discord OAuth via NextAuth (`pages/api/auth/[...nextauth].js`). The JWT token `sub` field is the Discord user ID. It is stored as `recipe.createdBy` (a plain string) and as `user.discordId`. Auth is checked server-side with `getServerSession` + `getToken` in API routes. Reading recipes is public; creating, editing, and deleting requires a session.

### Data layer

- **SWR** handles all client-side fetching. The global fetcher is configured in `_app.js`.
- **`services/`** wraps fetch calls, calls `mutate()` to invalidate SWR cache, and fires toast notifications. Use these functions from components instead of calling `fetch` directly.
- **`lib/helper.js`** contains pure utility functions: building the recipe data object for POST/PUT, transforming ingredient data for the form, uploading step images, calculating the shopping list, and computing the baking form scaling factor.

### Database (MongoDB / Mongoose)

Models live in `db/models/`. `db/dbConnect.js` maintains a cached connection and **auto-seeds `Ingredient` and `Unit` collections on first connect** — see `scripts/seedIngredients.js` and `scripts/seedUnits.js`.

Recipe ingredients store ObjectId refs to `Ingredient` and `Unit` and are always populated on read. `recipe.createdBy` is a Discord token sub string, not a `User` ObjectId.

### Image uploads

Images are uploaded from the client to `/api/images` (formidable parses the multipart form, then Cloudinary receives the file). Images are stored in MongoDB as `{ url, publicId }`. On recipe edit, replaced images are deleted from Cloudinary by comparing `publicId` values. On recipe delete, all images (main + step images) are deleted via `lib/cloudinary.js`.

### Baking recalculation

`calculateScalingFactor` in `lib/helper.js` computes ingredient scaling as the ratio of new pan area to original pan area (circle: π·r²; rectangle: w·l). The result is stored in `recalculatedRecipes` (localStorage) and applied when building the shopping list and displaying scaled ingredient amounts.

### Styling

Styled Components with SSR enabled (`compiler.styledComponents` in `next.config.js`). Design tokens are CSS custom properties defined in `styles/global-styles.js` under `:root`, with a full dark-mode override under `:root.dark-mode`. Always use these variables (e.g. `var(--color-brand)`) rather than hardcoded colours.
