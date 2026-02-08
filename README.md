# Sports Dashboard

A modern sports dashboard displaying live NBA and NFL scores, game details, and team information using ESPN's public API.

## 🚀 Quick Start

### Prerequisites
- Node.js 20.11.0+ (use `nvm use` to switch automatically)

### Installation

```bash
# Clone and install
git clone https://github.com/smasenov/sports-dashboard.git
cd sports-dashboard
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

## 🛠️ Tech Stack

- **React 18.3** + **TypeScript 5.9** - UI framework
- **Refine.dev 4.58** - App structure and routing
- **Material-UI 5.14** - Component library
- **React Query 5.90** - Data fetching and caching
- **Redux Toolkit 2.11** - Global state (league selection)
- **Emotion 11.14** - CSS-in-JS styling
- **Vite 5.4** - Build tool and dev server

## 📋 Features

- ⚡ Real-time scoreboard with live updates
- 🏀 NBA and NFL league support
- 📊 Detailed game statistics and box scores
- 👥 Team information and rosters
- 📱 Fully responsive design
- 🎨 Custom styled components

## 🎯 Key Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Check code quality
npm run preview  # Preview production build
```

## 📁 Project Structure

```
src/
├── components/     # UI components
│   ├── common/    # LoadingState, ErrorState, EmptyState
│   └── styled/    # Custom Emotion components
├── hooks/         # React Query hooks (useScoreboard, useTeams, etc.)
├── pages/         # Dashboard, Scoreboard, Teams
├── store/         # Redux store (league selection)
├── types/         # TypeScript definitions
└── providers/     # Data provider for Refine
```

## 🔌 API

Uses ESPN's public API (no auth required):
- **Scoreboard**: Live and recent games
- **Game Details**: Box scores, stats, leaders
- **Teams**: Team info, logos, colors
- **Auto-refresh**: Every 60 seconds for live games

## 💡 Architecture

- **React Query** for all API/server state (caching, refetching)
- **Redux Toolkit** for UI state (selected league only)
- **Custom hooks** wrap all API calls with proper TypeScript types
- **Responsive design** using MUI Grid system

## ⚠️ Important Notes

- Use `--legacy-peer-deps` flag when installing due to Refine v4 peer dependencies
- Project uses `.nvmrc` - run `nvm use` to switch to correct Node version

## 📝 License

Educational/demonstration purposes.

---

Built with React, TypeScript, and Refine.dev
