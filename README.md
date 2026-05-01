# ⛅ Weather Pulse

A modern, animated weather application built with cutting-edge web technologies. Search any city worldwide and get instant weather forecasts with engaging animations and real-time data visualization.

**🔗 Live Demo:** [Weather Pulse on GitHub Pages](#) *(Deploy instructions below)*

---

## 🎯 Features

✨ **Auto-Location Detection** — Detects user's location on first load and displays local weather instantly  
🌍 **Nearby Cities Weather** — Shows weather for nearby cities with clickable cards for quick exploration  
🎨 **Dynamic Gradient Themes** — Background changes based on weather conditions (clear, cloudy, rain, snow, storm)  
✨ **Smooth Animations** — Floating orbs, fade-in transitions, and floating metric cards  
📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop  
🚀 **Fast & Lightweight** — Built with Vite for instant page loads  
📍 **No API Keys Required** — Uses free Open-Meteo and GeoNames APIs  

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Latest React for component-based UI and hooks |
| **Vite 6** | Lightning-fast build tool and dev server |
| **Tailwind CSS 3** | Utility-first CSS for rapid, responsive design |
| **JavaScript (ES6+)** | Modern async/await, destructuring, arrow functions |
| **PostCSS & Autoprefixer** | Cross-browser CSS compatibility |
| **Custom Animations** | Keyframes for drift, float, and rise-in effects |

---

## 🌐 APIs Used

1. **Open-Meteo Geocoding API** — Reverse geocoding for location lookup
   - No authentication required
   - Free tier: Unlimited requests
   - Endpoint: `https://geocoding-api.open-meteo.com/v1/search`

2. **Open-Meteo Forecast API** — Real-time weather data
   - No authentication required
   - Includes current conditions, 5-day forecast, wind speed, precipitation
   - Endpoint: `https://api.open-meteo.com/v1/forecast`

3. **GeoNames Nearby Cities API** — Find cities near user location
   - Free demo username for showcase apps
   - Endpoint: `https://secure.geonames.org/findNearbyPlaceNameJSON`

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** 16+ (download from [nodejs.org](https://nodejs.org))
- **npm** 8+ (comes with Node.js)
- **Git** for version control

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/WeatherApp.git
cd WeatherApp

# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🚀 Deployment to GitHub Pages

### Option 1: Automatic Deployment with GitHub Actions (Recommended)

1. **Enable GitHub Pages in your repository:**
   - Go to repository **Settings** → **Pages**
   - Select **Source:** "GitHub Actions"
   - Click **Save**

2. **The workflow file is ready:**
   - File: `.github/workflows/deploy.yml`
   - This automatically builds and deploys on every push to `master` branch

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin master
   ```

4. **Wait for deployment:**
   - Check the **Actions** tab in your GitHub repository
   - Once the workflow completes, your site is live at:
   - `https://YOUR-USERNAME.github.io/WeatherApp/`

### Option 2: Manual Deployment

```bash
# Build the app
npm run build

# Deploy using gh-pages package (if installed)
npm run deploy
```

---

## 🎨 Key Components

### `src/App.jsx` — Main Application Component
- Handles geolocation detection and auto-weather loading
- Manages search, city options, and nearby cities
- Dynamically updates theme based on weather conditions
- Fetches and displays 5-day forecast

### `src/weatherCodes.js` — Weather Code Mapping
- Maps WMO weather codes to human-readable labels
- Associates weather conditions with UI themes
- 30+ weather codes supported (clear, rain, snow, storms, etc.)

### `src/index.css` — Styles & Animations
- Tailwind CSS imports and global styles
- Custom animations: `drift`, `float`, `riseIn`, `pulseSlow`
- Gradient backgrounds that match weather themes
- Responsive typography with custom fonts

---

## 💡 How It Works

### 1. **App Initialization**
- On page load, the app checks for browser geolocation support
- Requests user's permission to access location

### 2. **Location Detection**
- If allowed: Reverses geocodes coordinates to find user's city
- If denied: Falls back to default city (Hyderabad)

### 3. **Weather Fetching**
- Fetches current weather and 5-day forecast using Open-Meteo API
- Simultaneously fetches nearby cities from GeoNames

### 4. **Nearby City Weather**
- Retrieves up to 6 nearby cities within 250km radius
- Fetches live weather for each nearby city
- Displays in interactive card grid

### 5. **Dynamic UI**
- Background gradient changes based on weather code
- Animated cards fade in with staggered delays
- Smooth hover effects on city selection

---

## 📊 Code Quality & Best Practices

✅ **Modern React Patterns**
- Functional components with hooks (`useState`, `useEffect`, `useMemo`)
- Proper dependency arrays for performance optimization
- Clean component separation

✅ **Responsive Design**
- Mobile-first approach with Tailwind breakpoints
- Tested on various screen sizes
- Touch-friendly UI with proper button sizes

✅ **Error Handling**
- Graceful fallbacks for failed API calls
- User-friendly error messages
- Geolocation permission denial handled

✅ **Performance**
- Production build: 64.26 KB gzipped (under 65KB)
- Fast page loads with Vite's optimized build
- Efficient API calls with proper caching

---

## 🎯 Skills Showcased

- **Frontend Development** — React, component architecture, state management
- **CSS/Styling** — Tailwind CSS, custom animations, responsive design
- **JavaScript** — ES6+, async/await, destructuring, arrow functions
- **API Integration** — Fetch API, geolocation API, third-party REST APIs
- **Build Tools** — Vite, PostCSS, npm scripts
- **Git & GitHub** — Version control, GitHub Pages deployment
- **UI/UX Design** — Smooth animations, intuitive interface, accessibility

---

## 🌟 Future Enhancements

- 🗺️ Interactive map showing nearby cities
- 📊 Historical weather data and trends
- ⚙️ Customizable temperature units (C/F)
- 🌙 Dark mode theme toggle
- 📍 Save favorite cities for quick access
- 🔔 Weather alerts and notifications

---

## 📄 License

This project is open source and available under the **ISC License**.

---

## 👨‍💻 Author

**Pavan Kusunuri**

- GitHub: [github.com/pavan-17](https://github.com/pavan-17) *(update with your actual GitHub)*
- Portfolio: [your-portfolio.com](https://your-portfolio.com) *(add your portfolio link)*
- LinkedIn: [linkedin.com/in/pavan-kusunuri](https://linkedin.com/in/your-profile) *(update with your actual LinkedIn)*

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📝 Notes for Recruiters & Developers

This project demonstrates proficiency in:
- **Modern React development** with hooks and best practices
- **Responsive web design** using Tailwind CSS
- **API integration** with multiple free services
- **Build tooling** and optimization
- **Geolocation & browser APIs**
- **Clean code** and maintainability
- **Deployment automation** with GitHub Pages

Feel free to explore the code, deploy it yourself, or use it as a reference for your own projects!

---

**Made with ❤️ by Pavan Kusunuri**
