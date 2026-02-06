# Sports Dashboard

A modern, responsive sports dashboard built with React, TypeScript, and Refine.dev that displays live scores, game details, and team information for NBA and NFL using ESPN's public API.

## 🚀 Features

- **Real-time Scoreboard**: Live game scores with automatic updates every minute
- **Game Details**: Comprehensive game summaries with box scores, team stats, and player statistics
- **Teams Browser**: Browse and search all teams in the selected league
- **Team Details**: View detailed team information including colors, logos, and more
- **League Selector**: Switch between NBA and NFL leagues with Redux-managed state
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile
- **Loading & Error States**: Graceful handling of loading, error, and empty states
- **Custom Styled Components**: Beautiful UI with custom Emotion-styled components

## 🛠️ Tech Stack

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Refine.dev** 5.0.9 - App structure, layout, and routing
- **Material-UI (MUI)** 7.3.7 - UI components
- **Emotion** 11.14.0 - CSS-in-JS styling
- **React Query** (@tanstack/react-query 5.90.20) - Server state management
- **Redux Toolkit** 2.11.2 - Global UI state management
- **React Router** 7.13.0 - Client-side routing
- **Vite** 7.2.4 - Build tool and dev server

## 📋 Prerequisites

- Node.js 20.11.0 or higher
- npm 10.2.4 or higher

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sports-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   Note: The `--legacy-peer-deps` flag is needed due to peer dependency conflicts between Refine packages.

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production bundle (see Known Issues below)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## ⚠️ Important Notes

### Node.js Version
This project requires Node.js **20.19+** or **22.12+**. If you're using an older version:
```bash
# Using nvm (recommended)
nvm install 22
nvm use 22
```

## 🏗️ Project Structure

```
sports-dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── common/         # Reusable components (Loading, Error, Empty states)
│   │   ├── styled/         # Custom Emotion-styled components
│   │   ├── GameCard.tsx
│   │   ├── GameDetailsDrawer.tsx
│   │   ├── LeagueSelector.tsx
│   │   ├── TeamCard.tsx
│   │   └── TeamDetailsModal.tsx
│   ├── hooks/              # Custom React Query hooks
│   │   ├── useScoreboard.ts
│   │   ├── useGameSummary.ts
│   │   ├── useTeams.ts
│   │   └── useTeamDetail.ts
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Scoreboard.tsx
│   │   └── Teams.tsx
│   ├── store/              # Redux store and slices
│   │   ├── store.ts
│   │   ├── leagueSlice.ts
│   │   └── hooks.ts
│   ├── types/              # TypeScript type definitions
│   │   └── espn.ts
│   ├── App.tsx             # Main app component with Refine setup
│   └── main.tsx            # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Architecture & Design Decisions

### State Management

The application uses a **hybrid state management approach**:

- **Redux Toolkit**: Used exclusively for global UI state (league selection)
  - Provides predictable state updates
  - Easy to extend with additional UI state if needed
  
- **React Query**: Used for all server state management
  - Automatic caching and background refetching
  - Built-in loading and error states
  - Optimistic updates and cache invalidation

### Custom Hooks

All API interactions are wrapped in custom hooks:

- `useScoreboard(league)` - Fetches games for the selected league
- `useGameSummary(league, gameId)` - Fetches detailed game information
- `useTeams(league)` - Fetches all teams in a league
- `useTeamDetail(league, teamId)` - Fetches detailed team information

These hooks provide:
- Type-safe API responses
- Consistent error handling
- Automatic refetching strategies
- Centralized API logic

### Component Architecture

- **Pages**: Top-level route components
- **Components**: Reusable UI components
- **Styled Components**: Custom Emotion-styled components for unique designs
- **Common Components**: Shared components like LoadingState, ErrorState, EmptyState

### TypeScript

Strong typing throughout the application:
- Comprehensive ESPN API type definitions
- No use of `any` type
- Full IntelliSense support
- Type-safe props and state

### Responsive Design

- Mobile-first approach
- MUI's Grid system for layouts
- Responsive breakpoints (xs, sm, md, lg)
- Touch-friendly UI elements

## 🔌 ESPN API Integration

The application uses ESPN's public API (no authentication required):

### Endpoints Used

1. **Scoreboard**: `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/scoreboard`
   - Returns recent and live games
   - Refetches every 60 seconds for live updates

2. **Game Summary**: `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/summary?event={gameId}`
   - Returns detailed game information
   - Includes box scores, team stats, and player stats

3. **Teams**: `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/teams?limit=100`
   - Returns all teams in a league
   - Cached for 24 hours

4. **Team Details**: `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/teams/{teamId}`
   - Returns detailed team information
   - Cached for 1 hour

### API Usage Notes

- **No API key required** - ESPN's public API is freely available
- **Rate limiting** - Use responsibly; the app implements caching to minimize requests
- **Sport mapping**: 
  - NBA → `basketball/nba`
  - NFL → `football/nfl`

## 🧪 Testing Considerations

While tests are not implemented in this version, here are the areas that should be tested:

### Unit Tests
- Redux reducers and actions
- Custom hooks (with React Query testing utilities)
- Utility functions and data transformations
- Type guards and validators

### Component Tests
- Component rendering with different props
- User interactions (clicks, form inputs)
- Conditional rendering based on states
- Error boundaries

### Integration Tests
- API hook responses and error handling
- Navigation between pages
- State persistence across route changes
- League selector affecting data fetching

### E2E Tests
- Complete user flows (view scoreboard → click game → view details)
- League switching
- Team search functionality
- Responsive behavior

### Recommended Testing Libraries
- Jest - Unit testing
- React Testing Library - Component testing
- MSW (Mock Service Worker) - API mocking
- Cypress/Playwright - E2E testing

## 🎨 Custom Emotion Components

The application includes several custom-styled components demonstrating Emotion's capabilities:

- **StyledGameCard**: Game card with status-based gradient borders and hover effects
- **StyledTeamCard**: Team card with gradient backgrounds and smooth transitions
- **GradientBackground**: Reusable gradient container with team colors
- **LiveIndicator**: Animated live game indicator with pulsing effect
- **ScoreDisplay**: Gradient text for scores
- **TeamLogo**: Styled team logos with hover effects
- **StatusBadge**: Dynamic badges based on game state

## 🚀 Performance Optimizations

- React Query caching reduces API calls
- Lazy loading potential for code splitting
- Memoization opportunities for expensive calculations
- Image optimization for team logos
- Debounced search in team list

## 🐛 Known Issues & Limitations

- **Build Issues**: There are currently version compatibility issues between Refine v5 and some dependencies during production builds. The development server works perfectly. To use the app:
  ```bash
  npm run dev
  ```
  This is a known issue with Refine's v5 ecosystem maturity and will be resolved as packages stabilize.

- ESPN API occasionally returns different response structures
- Some historical data may not be available for all games
- API rate limiting is not explicitly handled (rely on caching)
- Team colors from API may not always be valid hex codes
- MUI v5.14 is used instead of latest v7 due to Refine compatibility

## 🔮 Future Enhancements

- [ ] Add player profiles and stats
- [ ] Implement favorites/bookmarks functionality
- [ ] Add dark mode support
- [ ] Include standings and playoff brackets
- [ ] Add more sports (MLB, NHL, etc.)
- [ ] Implement push notifications for live games
- [ ] Add data visualization (charts, graphs)
- [ ] Social sharing features
- [ ] User authentication and personalization

## 📝 License

This project is for educational and demonstration purposes.

## 🙏 Acknowledgments

- ESPN for providing the public API
- Refine.dev team for the excellent framework
- Material-UI team for the component library
- React Query team for the data fetching library

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

---

Built with ❤️ using React, TypeScript, and Refine.dev
