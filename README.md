# LilURL UI

🔗 A modern, animated URL shortener web application built with React, Vite, and TailwindCSS.

![React](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.12-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Real-time Validation**: Instant URL validation with visual feedback
- **Animated Statistics**: Live-updating stats dashboard
- **Recent URLs**: Track your recently shortened URLs
- **Confetti Celebrations**: Fun animations on successful URL shortening
- **Toast Notifications**: Beautiful feedback messages
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on http://localhost:3000 (see [lilurl](https://github.com/pansachin/lilurl))

### Installation

```bash
# Clone the repository
git clone git@github.com:pansachin/lilurl-ui.git
cd lilurl-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

## 🛠️ Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🏗️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: TailwindCSS 4.1.12
- **Animations**: Framer Motion 12.23.12
- **HTTP Client**: Axios 1.11.0
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── App.jsx              # Main app component with stats dashboard
├── main.jsx            # React entry point
├── index.css           # Global styles and Tailwind imports
├── components/
│   ├── Header.jsx      # App header
│   ├── Footer.jsx      # App footer  
│   ├── UrlShortener.jsx # URL input form with validation
│   └── UrlResult.jsx   # Shortened URL display
└── services/
    └── api.js          # API service layer
```

## 🔧 Configuration

### API Proxy

The development server proxies API requests to avoid CORS issues. Configure in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    }
  }
}
```

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## 🎨 Customization

### Theme Colors

Modify the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    // ... other shades
    900: '#1e3a8a',
  }
}
```

### Animations

Custom animations are defined in the Tailwind config:
- `fade-in`: Smooth opacity transition
- `slide-up`: Slide up with fade
- `bounce-in`: Scale bounce effect

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Related Projects

- [lilurl](https://github.com/pansachin/lilurl) - Backend API for URL shortening

## 👤 Author

**Sachin Prasad**

- GitHub: [@pansachin](https://github.com/pansachin)

---

Made with ❤️ and React
