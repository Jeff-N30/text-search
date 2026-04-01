# Text Search — Editorial Dark Luxury

A premium frontend-only article text search experience built with React and Vite. Search through a curated library of 15 frontend development articles with live filtering, smart highlighting, and an elegant editorial design.

## Features

✦ **Live Search** — Instantly filter articles as you type with debounced queries (150ms)
✦ **Smart Highlighting** — Matched text is highlighted with warm amber accents in titles, excerpts, and tags
✦ **Deep Search** — Search through titles, excerpts, authors, tags, and categories
✦ **Refined UI** — Magazine-editorial aesthetic with dark luxury theme, amber accents, and premium typography
✦ **Result Count** — Dynamic counter showing how many articles match your query
✦ **Clear Button** — Fade-in/out clear button (×) for quick search reset
✦ **Empty State** — Beautiful, bouncy empty state when no results match
✦ **Animations** — Staggered header animations, result card slide-ups, shimmer highlights
✦ **Responsive** — Fully responsive design from mobile to desktop
✦ **Frontend-Only** — No backend or API calls — data is hardcoded for instant results

## Tech Stack

- **React 19** with Hooks (useState, useEffect)
- **Vite** for lightning-fast development and builds
- **Plain CSS** (no frameworks) for full design control
- **Google Fonts** — Playfair Display (headings) + DM Sans (body)
- **Zero Dependencies** Beyond React and Vite

## Color Palette

- **Background**: `#0d0d0f` (dark, editorial)
- **Text**: `#f0ede8` (off-white, warm)
- **Accent**: `#e8b84b` (warm amber/gold)
- **Borders**: `rgba(248, 245, 240, 0.08)` (subtle, translucent)

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm installed

### Installation & Development

```bash
# Install dependencies
npm install

# Start dev server (hot reload enabled)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

The app will open at `http://localhost:5173`.

## How It Works

1. **Search Input** — Type keywords in the large, centered search box
2. **Live Filtering** — Results update every 150ms as you type (debounced for performance)
3. **Highlighting** — Matching text shows with amber background across titles, excerpts, tags, and author names
4. **Result Count** — See how many articles matched your search
5. **Clear** — Click the × button to reset the search instantly

## Article Data

The app includes 15 hand-curated articles on modern frontend topics:

- CSS Grid, Flexbox, Container Queries, Subgrid, CSS Custom Properties, Animations
- React Hooks, Next.js Server Components, Redux Toolkit, State Management
- TypeScript Generics, async/await, Web APIs
- Web Performance & Core Web Vitals, Image Optimization
- Accessibility, Semantic HTML, ARIA

Each article has: ID, title, excerpt, author, date, category, read time, and searchable tags.

## Design Philosophy

**"Editorial Dark Luxury"** — inspired by premium design publications like *Kinfolk* and *Wallpaper*.

- **Generous spacing** — Breathing room between elements
- **Typography-first** — Hierarchy through font choice and weight
- **Warm, minimal color** — Dark background with amber accents
- **Motion with purpose** — Animations enhance, not distract
- **Magazine feel** — Clean dividers, no borders, metadata-rich

## Project Structure

```
src/
├── App.jsx              # Main component with search logic & debouncing
├── App.css              # All styling, animations, responsive design
├── components/
│   ├── SearchInput.jsx  # Search input with clear button
│   ├── ArticleCard.jsx  # Article result card
│   ├── Highlight.jsx    # Text highlight component
│   └── EmptyState.jsx   # No results state
├── data/
│   └── articles.js      # 15 hardcoded article objects
└── main.jsx             # React entry point
```

## Key Components

### `SearchInput`
Controlled input with focus on mount, clear button, and smooth animations.

### `Highlight`
Custom component that wraps matched substrings in `<mark>` tags with accent styling. Handles regex escaping for special characters.

### `ArticleCard`
Displays article with staggered animation (60ms per index), metadata row, highlighted excerpt, and tag pills.

### `EmptyState`
Bouncy entrance animation, spinning decorative symbol, and helpful hint text when no results found.

## Animations

- **Header Load**: Staggered fade-up (0-300ms delay)
- **Search Results**: Slide-up + fade for each card (staggered 60ms per item)
- **Input Focus**: Subtle scale (1.01) + amber glow
- **Highlight Marks**: Shimmer pulse on first render (0.6s)
- **Clear Button**: Fade in/out smoothly
- **Empty State**: Bouncy scale entrance (0.6s)

## Performance Optimizations

- **Debounced Search** — 150ms debounce prevents excessive re-filtering
- **Regex Escape** — Handles special characters in search safely
- **No External Calls** — All data is local, instant results
- **CSS Animations** — GPU-accelerated for smooth performance

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements (Optional)

- Add more articles dynamically
- Export/save search results
- Filter by category or date range
- Infinite scroll for larger datasets
- Dark/light theme toggle
- Article detail view

## License

MIT — Use freely for portfolios, competitions, or personal projects.

---

**Built with ♦ for premium frontend experiences.**
