# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

lilurl-ui is a React-based frontend application for a URL shortening service. Built with Vite, it provides a modern, animated interface for shortening URLs with real-time statistics display.

## Common Development Commands

### Development
```bash
# Start development server (runs on default port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Run lint with auto-fix (if needed)
npx eslint . --fix
```

### Installation
```bash
# Install dependencies
npm install
```

## Architecture

### Tech Stack
- **React 19** with Vite as the build tool
- **TailwindCSS v4** for styling with custom animations
- **Framer Motion** for complex animations
- **Axios** for API communication
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Project Structure
```
src/
├── App.jsx              # Main application component with stats and recent URLs
├── main.jsx            # Application entry point
├── index.css           # Global styles and Tailwind imports
├── components/         # React components
│   ├── Header.jsx      # Application header
│   ├── Footer.jsx      # Application footer
│   ├── UrlShortener.jsx # Main URL shortening form with validation
│   └── UrlResult.jsx   # Display component for shortened URLs
└── services/           # API integration
    └── api.js          # Axios configuration and URL service methods
```

### API Integration

The application communicates with a backend API running on `http://localhost:3000`. The Vite dev server is configured to proxy API requests to avoid CORS issues:

- Base API path: `/api/v1`
- Main endpoint: `POST /api/v1/lilurl` (creates shortened URLs)
- Proxy configuration in `vite.config.js`

### Key Components

**UrlShortener Component**
- Handles URL input with real-time validation
- Provides visual feedback for URL validity
- Includes animated submit button with loading states
- Shows success with confetti animation

**App Component**
- Manages application state for recent URLs
- Displays animated statistics that update every 5 seconds
- Uses AnimatePresence for smooth transitions
- Implements responsive grid layout for stats cards

### Styling System

The application uses a custom Tailwind configuration with:
- Extended color palette focusing on primary blues
- Custom animations: `fade-in`, `slide-up`, `bounce-in`
- Gradient effects and hover states
- Responsive design breakpoints

### State Management

Currently using React's built-in state management:
- Local component state for form handling
- Parent-child props for URL creation callbacks
- No external state management library

## Backend Requirements

The frontend expects a backend API with the following structure:
- `POST /api/v1/lilurl` - accepts `{ long_url: string }`, returns `{ result: { short: string, long_url: string, ...} }`
- Short URLs are formatted as `http://localhost:3000/{shortCode}`

## Development Tips

1. The application uses ESLint with React-specific rules. Check `eslint.config.js` for configuration.
2. Animations are a key part of the UX - test with different motion preferences.
3. The stats on the homepage are currently mocked - they increment randomly for demo purposes.
4. Toast notifications are configured with custom styling in `App.jsx`.
