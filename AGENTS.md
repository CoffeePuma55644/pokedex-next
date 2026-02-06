# Agent Guidelines for Pokedex-Next

This repository is a Next.js application (App Router) using TypeScript, Tailwind CSS (v4), and DaisyUI. It serves as a modern Pokedex with infinite scrolling and interactive elements.

## 1. Build, Lint, and Test Commands

The project uses `pnpm` as its package manager.

- **Development:** `pnpm dev` - Starts the development server on `http://localhost:3000`.
- **Build:** `pnpm build` - Compiles the application for production.
- **Lint:** `pnpm lint` - Runs ESLint to check for code quality and style issues.
- **Production Start:** `pnpm start` - Runs the built application.

### Testing (Proposed/Future)
Currently, no testing framework is installed. If tests are added (e.g., using Vitest or Jest), the following conventions should be followed:
- **Run all tests:** `pnpm test`
- **Run a single test file:** `pnpm test path/to/file.test.ts`
- **Run tests in watch mode:** `pnpm test --watch`

## 2. Project Architecture and Folder Structure

- `src/app`: Contains the main application routing and layout logic.
    - `components/`: Global or shared UI components.
    - `pokedex/`: The main Pokedex grid and interaction page.
    - `globals.css`: Global styles, Tailwind v4 configuration, and DaisyUI theme definitions.
- `src/hooks`: Custom React hooks for shared logic (e.g., infinite scroll, search).
- `src/services`: API abstraction layers. Use these for all data fetching.
- `src/types`: Centralized TypeScript definitions for domain models and API responses.
- `public/`: Static assets. Pokémon placeholders are located in `public/images/`.

## 3. Code Style and Conventions

### Naming Conventions
- **Files:** Use `kebab-case.tsx` for components and `kebab-case.ts` for logic files.
- **Components:** Functional components using `PascalCase`.
- **Variables/Functions:** Standard `camelCase`.
- **Types/Interfaces:** Use `PascalCase`. Interfaces are preferred for public APIs/Props.
- **Constants:** Use `UPPER_SNAKE_CASE` for global constants (e.g., `POKE_API_BASE`).

### TypeScript Usage
- **Strict Mode:** Always adhere to TypeScript strict mode.
- **Type Safety:** Avoid `any`. Use `unknown` or properly defined types.
- **Import Aliases:** Use the `@/` alias for all internal imports (e.g., `import { ... } from "@/types/pokemon"`).
- **Props:** Define component props using interfaces named `{ComponentName}Props`.

### React and Next.js
- **Component Pattern:** Prefer `export default function ComponentName`.
- **Client Components:** Add `"use client"` only when necessary (hooks, events).
- **Hooks:** Prefix custom hooks with `use` (e.g., `useInfiniteScroll`).
- **Images:** Always use `next/image` with proper `alt` tags and optimization.
- **Optimization:** Use `priority` for above-the-fold images and `loading="lazy"` (default) for others.

### Styling (Tailwind CSS v4 & DaisyUI)
- **Tailwind v4:** Note the use of `@import "tailwindcss"` and `@plugin` syntax in `globals.css`.
- **DaisyUI:** Use semantic classes like `badge`, `card`, `btn`, `loading-spinner`.
- **Theming:** The project uses a custom "catppuccin" theme. Avoid hardcoding colors; use DaisyUI utility classes or Tailwind color variables.
- **Layout:** Favor Flexbox and CSS Grid for layout. Use Tailwind spacing utilities (`p-4`, `m-2`, etc.).
- **Responsiveness:** Use mobile-first design with Tailwind prefixes (`sm:`, `md:`, `lg:`).

### Data Fetching and Error Handling
- **API Services:** All fetch logic should reside in `src/services`.
- **Resilience:** Use the `fetchWithRetry` pattern for external API calls to handle transient failures.
- **Caching:** Leverage Next.js `fetch` options like `{ next: { revalidate: 3600 } }`.
- **Loading States:** Implement clear loading indicators using DaisyUI's `loading` classes.
- **Error States:** Gracefully handle API failures with `try/catch` and user-friendly error messages.

### Component-Specific Patterns
- **Infinite Scroll:** Implemented via `useInfiniteScroll` hook and Intersection Observer API.
- **Search Logic:** Centralized in `usePokemonSearch` hook to manage filtering and debouncing.
- **Modals:** Use DaisyUI modal structure with `pokemon-detail-modal.tsx` for consistency.
- **Grid Layout:** Responsive grid using `grid-cols-2 md:grid-cols-3 lg:grid-cols-5`.

### Assets and Images
- **Pokemon Images:** Use official artwork where available (`official-artwork` property in API).
- **Placeholders:** Use `/images/bulbizard.webp`, `/images/carapuce.webp`, or `/images/draco.webp` for missing images.
- **Optimization:** Use `width` and `height` properties on `next/image` to prevent layout shifts.

### State Management
- **Local State:** Favor React `useState` and `useReducer` for component-level state.
- **Global State:** If needed, use React Context. Avoid heavy state management libraries unless the project complexity increases significantly.
- **URL State:** Use Next.js `useSearchParams` and `usePathname` for managing UI state (like search queries) in the URL.

### Imports Ordering
1.  **React/Next.js:** `react`, `next/link`, `next/image`, etc.
2.  **External Libraries:** `lucide-react`, `daisyui`, etc.
3.  **Internal Aliased:** `@/components`, `@/services`, `@/types`, `@/hooks`.
4.  **Styles:** `globals.css` or component-specific CSS.

## 4. Comments and Documentation
- **Self-Documenting:** Code should be readable without excessive comments.
- **JSDoc:** Required for exported service functions to describe parameters and return types.
- **Logic:** Add comments explaining the "why" for complex logic (e.g., the 3D hover effect in `pokemon-card.tsx`).

## 5. Cursor and Copilot Rules
(No project-specific `.cursorrules` or `.github/copilot-instructions.md` detected. Follow the general guidelines above.)

---

*This file is intended for agentic consumption. Adhere strictly to these patterns when contributing.*
