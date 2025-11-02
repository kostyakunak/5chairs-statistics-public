# 5 Chairs Statistics Dashboard

A modern statistics dashboard application showcasing analytics visualization for a service booking platform. Built with React, TypeScript, and Chart.js.

![5Chairs Dashboard](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)

## 🚀 Live Demo

[View on Netlify](https://your-app-name.netlify.app)

## ✨ Features

- **Interactive Dashboard** - Real-time statistics visualization with key performance indicators
- **Funnel Analytics** - Visual representation of user journey from bot start to first payment
- **Traffic Source Analysis** - Breakdown of user acquisition channels
- **Payment Analytics** - Tracking of new vs repeat payments with AOV and LTV metrics
- **Message Log System** - Detailed log viewer for sent messages with filtering capabilities
- **Responsive Design** - Modern, mobile-friendly UI built with Tailwind CSS
- **Mock Data** - Fully functional with mock data, no backend required

## 🛠️ Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **Lucide React** - Icon library
- **Day.js** - Date manipulation

## 📊 Dashboard Sections

### Statistics Tab
- **KPIs**: New users, total users, conversion rates, repeat client share
- **Charts**: 
  - New users by day (line chart)
  - Traffic sources distribution (bar chart)
  - Funnel visualization (path to first payment)
  - Payment breakdown (new vs repeat payments)
- **Filters**: Period selection (today, 3d, 7d, 30d, all time) and traffic source filtering

### Messages Log Tab
- **Message List**: View all sent messages with status, type, and metadata
- **Advanced Filtering**: Filter by user ID, source, message type, status, and search
- **Message Details**: Detailed view with request/response bodies, versions, and events

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── logs/        # Message log components
│   └── ...
├── pages/           # Page components
│   ├── Dashboard.tsx
│   └── MessagesLog.tsx
├── dataApi.ts       # Mock data API for statistics
├── logsApi.ts       # Mock data API for messages
└── types.ts         # TypeScript type definitions
```

## 🌐 Deployment

This project is configured for deployment on Netlify:

1. Push code to GitHub
2. Connect repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

The `netlify.toml` file is included with proper SPA routing configuration.

## 📝 Notes

- All data is **mock data** - no backend or database required
- Perfect for portfolio demonstration
- Fully responsive design
- Production-ready build configuration

## 📄 License

MIT License - feel free to use this project for your portfolio!

## 👨‍💻 Author

Built as a portfolio project showcasing modern React/TypeScript development skills.


