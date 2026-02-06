# Quick Start Guide

## Prerequisites
- Node.js 22+ (use `nvm install 22` if needed)
- npm 10+

## Installation

```bash
# Navigate to project directory
cd sports-dashboard

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

## Accessing the App

Once the dev server starts, open your browser to:
```
http://localhost:5173
```

## Features to Try

1. **League Selector** - Switch between NBA and NFL in the header
2. **Dashboard** - View stats overview with live games count
3. **Scoreboard** - See recent and live games
   - Click any game card to see detailed stats
4. **Teams** - Browse all teams
   - Search teams by name
   - Click any team to see details

## Troubleshooting

### Node Version Error
If you see "Vite requires Node.js version 20.19+ or 22.12+":
```bash
nvm install 22
nvm use 22
```

### Port Already in Use
If port 5173 is busy:
```bash
# Vite will automatically try the next available port
# Or specify a different port:
npm run dev -- --port 3000
```

### API Issues
- ESPN API is free and requires no authentication
- Rate limiting is handled via React Query caching
- If data doesn't load, check your internet connection

## Project Structure

```
src/
├── components/         # Reusable React components
│   ├── common/        # Loading, Error, Empty states
│   ├── styled/        # Custom Emotion components
│   ├── GameCard.tsx
│   ├── GameDetailsDrawer.tsx
│   ├── TeamCard.tsx
│   └── TeamDetailsModal.tsx
├── hooks/             # Custom React Query hooks
│   ├── useScoreboard.ts
│   ├── useGameSummary.ts
│   ├── useTeams.ts
│   └── useTeamDetail.ts
├── pages/             # Route pages
│   ├── Dashboard.tsx
│   ├── Scoreboard.tsx
│   └── Teams.tsx
├── store/             # Redux store
│   ├── store.ts
│   ├── leagueSlice.ts
│   └── hooks.ts
├── types/             # TypeScript definitions
│   └── espn.ts
└── App.tsx            # Main app with Refine setup
```

## Tech Stack Highlights

- ⚛️ React 19 with TypeScript
- 🎨 Material-UI v5.14 for components
- 💅 Emotion for custom styling
- 🔄 React Query for server state
- 🗃️ Redux Toolkit for UI state
- 🚀 Refine.dev for app structure
- ⚡ Vite for development

## Next Steps

- Explore the codebase in `src/`
- Check `README.md` for detailed documentation
- Customize components in `src/components/`
- Add more ESPN API endpoints in `src/hooks/`

Enjoy building with the Sports Dashboard! 🏀🏈
