# 📊 5Chairs Statistics Dashboard

> **Analytics dashboard for 5chairs dating service with interactive data visualization**

A comprehensive business intelligence dashboard built to transform raw data into actionable insights. This project showcases modern React development with real-time analytics, interactive charts, and advanced filtering capabilities.



## 🌐 Live Demo

**https://5chairsstatisticsdemo.netlify.app**

Experience the interactive analytics dashboard with real-time statistics, conversion funnels, and message logs. Built with React, TypeScript, and Chart.js, hosted on Netlify.

> **Portfolio Note:** This is a copy of a real client project for 5chairs dating service, showcased here as a portfolio demonstration of modern analytics dashboard development.

---

## 🌟 Project Highlights

### Interactive Analytics Dashboard
Transform raw data into actionable business insights with **real-time KPI tracking**. The dashboard displays key performance indicators including new users, total users, first purchase conversion rates, and repeat client share. Each KPI card features informative tooltips that explain what metrics measure - because clarity matters when making data-driven decisions.

### Conversion Funnel Visualization
The most valuable feature of this dashboard is the **interactive funnel visualization** that shows the complete user journey from bot start to first payment. With conversion percentages at each stage, you can identify exactly where users drop off and where they convert - insights that are gold for optimizing growth.

### Advanced Filtering & Time Analysis
- **Time period selection**: Today, 3 days, week, month, or all time
- **Traffic source filtering**: Analyze performance by acquisition channel
- **Persistent filters**: Settings saved in localStorage for seamless experience
- **Dynamic updates**: All charts and metrics update instantly when filters change

### Message Log System
Deep dive into user interactions with the comprehensive message log system. Filter by user ID, source, message type, status, and search through messages. Essential for debugging, understanding user behavior, and troubleshooting issues.

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| **KPI Dashboard** | Real-time key performance indicators with tooltips |
| **Line Charts** | Time-series visualization of new users by day |
| **Bar Charts** | Traffic source distribution analysis |
| **Funnel Visualization** | Complete user journey from start to first payment |
| **Payment Analytics** | New vs repeat payments with AOV and LTV metrics |
| **Message Log System** | Advanced filtering and detailed message viewer |
| **Responsive Design** | Works perfectly on mobile, tablet, and desktop |
| **Mock Data** | Fully functional demo with realistic mock data |

---

## 🛠️ Technical Stack

### Frontend
- **React 18.3** - Latest features including concurrent rendering
- **TypeScript 5.5** - Full type safety across the entire codebase
- **Vite 5.4** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first styling framework

### Data Visualization
- **Chart.js 4.5** - Professional, smooth, and interactive charts
- **React Window** - Efficient virtualization for large lists

### UI/UX Libraries
- **Lucide React** - Beautiful, consistent icon system
- **Day.js** - Lightweight date manipulation library

---

## 📂 Project Structure

```
5chairs-statistics/
├── src/
│   ├── components/
│   │   ├── logs/              # Message log components
│   │   │   ├── MessageDetails.tsx
│   │   │   ├── MessageFilters.tsx
│   │   │   └── MessageList.tsx
│   │   ├── BarChart.tsx       # Traffic sources bar chart
│   │   ├── ErrorBanner.tsx    # Error handling UI
│   │   ├── Filters.tsx        # Period and source filters
│   │   ├── FunnelChart.tsx    # Conversion funnel visualization
│   │   ├── KPICard.tsx        # KPI card with tooltip
│   │   ├── LineChart.tsx      # New users time-series chart
│   │   ├── Navigation.tsx     # Tab navigation
│   │   ├── RepeatClientsBlock.tsx  # Repeat clients analytics
│   │   └── EmptyState.tsx     # Empty state component
│   ├── pages/
│   │   ├── Dashboard.tsx      # Main statistics dashboard
│   │   └── MessagesLog.tsx    # Message log page
│   ├── dataApi.ts             # Mock data API for statistics
│   ├── logsApi.ts             # Mock data API for messages
│   ├── types.ts               # TypeScript type definitions
│   ├── logsTypes.ts           # Message log types
│   ├── App.tsx                # Main application component
│   └── main.tsx               # Application entry point
├── article-materials/         # Project screenshots and videos
├── netlify.toml              # Netlify deployment config
└── package.json
```

---

## 📊 Dashboard Sections

### Statistics Tab

#### Key Performance Indicators (KPIs)
- **New Users** - Count of new users in selected period
- **Total Users** - Cumulative user count
- **First Purchase CR** - Conversion rate to first purchase
- **Repeat Share** - Percentage of repeat customers
- **AOV** - Average order value (when available)
- **LTV Average** - Lifetime value average (when available)

#### Charts & Visualizations
- **New Users by Day** - Line chart showing user acquisition trends
- **Traffic Sources** - Bar chart breaking down acquisition channels
  - Instagram
  - Facebook
  - Organic
  - Partners
  - Other sources
- **Conversion Funnel** - Visual path from bot start to first payment
  - Bot start
  - Profile creation
  - First message
  - First payment
  - Conversion percentages at each stage
- **Payment Breakdown** - New vs repeat payments visualization

#### Filters
- **Period Selection**: Today, 3 days, 7 days, 30 days, All time
- **Traffic Source**: Filter by specific acquisition channel
- **Persistent State**: Filters saved in localStorage

### Messages Log Tab

#### Message List
- View all sent messages with status, type, and metadata
- Efficient rendering with React Window for large datasets
- Sortable columns for better organization

#### Advanced Filtering
- **User ID** - Filter messages by specific user
- **Source** - Filter by traffic source
- **Message Type** - Filter by message category
- **Status** - Filter by delivery status
- **Search** - Full-text search across messages

#### Message Details
- Detailed view with request/response bodies
- Version tracking
- Event history
- Timestamps and metadata

---

## 🎨 Design Philosophy

### Visual Experience
The dashboard uses a **clean, professional theme** with excellent contrast and readability. Colors are used purposefully to highlight important metrics and data points, while maintaining a business-appropriate aesthetic.

### User Experience Principles
- **Clear Information Hierarchy** - Most important metrics are prominently displayed
- **Progressive Disclosure** - Detailed information available on demand
- **Instant Feedback** - Filters update results immediately
- **Persistent State** - User preferences saved between sessions
- **Accessibility** - Tooltips and clear labeling for all metrics

### Chart Design
All charts follow these principles:
- **Clear Labels** - Every axis and data point is clearly labeled
- **Color Coding** - Consistent color scheme across all visualizations
- **Interactive** - Hover states provide additional context
- **Responsive** - Charts adapt to container size and screen resolution

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/kostyakunak/5chairs-statistics-dashboard.git

# Navigate to project directory
cd 5chairs-statistics

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```


### Build

```bash
npm run build
```


---

## 💾 Data Structure

### Statistics API

The dashboard uses a mock data API that simulates real backend responses:

```typescript
type StatsPayload = {
  kpi: {
    new_users: number;
    total_users: number;
    first_purchase_cr: number;
    repeat_share: number;
    aov?: number;
    ltv_avg?: number;
  };
  timeseries: TimeseriesPoint[];
  sources: SourceStats[];
  funnel: FunnelStep[];
  payments: PaymentStats;
};

type Filters = {
  period: 'today' | '3d' | '7d' | '30d' | 'all';
  source?: string;
  admin_key?: string;
};
```

### Message Log API

The message log system uses a separate API for message data:

```typescript
type Message = {
  id: string;
  user_id: string;
  source: string;
  type: string;
  status: string;
  created_at: string;
  // ... additional metadata
};
```

---

## 📱 Responsive Design

The dashboard adapts seamlessly across devices:

- **Mobile (< 768px)**: Single column layout, stacked KPI cards, full-width charts
- **Tablet (768px - 1024px)**: 2-column KPI grid, optimized chart sizes
- **Desktop (1024px - 1280px)**: 4-column KPI grid, full dashboard layout
- **Large Desktop (> 1280px)**: Maximum layout width, optimal spacing

All interactions work perfectly on touch devices with tap-based navigation and swipe gestures where appropriate.

---

## ⚡ Performance Optimizations

### Data Loading
- **Efficient State Management** - Only necessary data fetched and stored
- **Optimistic Updates** - UI updates immediately on filter changes
- **Error Handling** - Graceful degradation on API failures

### Rendering Performance
- **React Window** - Virtual scrolling for large message lists
- **Chart.js Optimization** - Efficient rendering of time-series data
- **Memoization** - React.memo and useMemo for expensive computations

### Build Optimization
- **Code Splitting** - Route-based code splitting ready
- **Tree Shaking** - Unused code removed in production
- **Minification** - Optimized bundle sizes
- **Asset Optimization** - Compressed images and static assets

---

## 🌐 Deployment

### Netlify (Current Hosting)

The project is configured for automatic deployment on Netlify:

1. **Connect Repository** - Link GitHub repository to Netlify
2. **Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`
3. **Environment Variables** - Configure if needed for production
4. **Deploy** - Automatic deploys on every push to main branch

The `netlify.toml` file includes proper SPA routing configuration for client-side routing.

### Alternative Hosting Options

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```


---

## 🔧 Available Scripts

```bash
npm run dev       # Start development server with HMR
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint code linting
npm run typecheck # Run TypeScript type checking
```

---

## 📝 Technical Implementation Details

### State Management
- **Local State** - React hooks (useState, useEffect) for component state
- **Filter Persistence** - localStorage for user preferences
- **Data Fetching** - Custom hooks pattern with async/await

### Chart Implementation
- **Chart.js Integration** - React wrapper for Chart.js
- **Responsive Charts** - Automatic resizing based on container
- **Interactive Tooltips** - Custom tooltip configurations
- **Color Themes** - Consistent color palette across all charts

### Type Safety
- **TypeScript** - Full type coverage for all data structures
- **Strict Mode** - Strict TypeScript configuration enabled
- **Type Definitions** - Comprehensive type definitions in types.ts

---

## 🚀 Future Enhancements

Potential features for expansion:

- [ ] **Real-time Updates** - WebSocket integration for live data
- [ ] **Export Functionality** - PDF/Excel export of reports
- [ ] **Custom Date Ranges** - Date picker for flexible period selection
- [ ] **Comparison Mode** - Compare metrics across different periods
- [ ] **Alert System** - Notifications for threshold breaches
- [ ] **User Permissions** - Role-based access control
- [ ] **Dark Mode** - Theme switching capability
- [ ] **Mobile App** - React Native version for mobile access
- [ ] **Advanced Analytics** - Machine learning insights
- [ ] **API Integration** - Connect to real backend API

---

## 🎓 Key Learnings & Challenges

### Challenges Solved

1. **Complex Data Visualization** - Implemented multiple chart types with consistent styling and interactivity
2. **Performance with Large Datasets** - Used React Window for efficient list rendering
3. **Filter State Management** - Implemented persistent filters with localStorage
4. **Type Safety** - Comprehensive TypeScript types for all data structures
5. **Responsive Design** - Ensured all visualizations work across all screen sizes

### Technologies Mastered

- React hooks and state management patterns
- Chart.js for data visualization
- TypeScript for type-safe development
- Tailwind CSS for utility-first styling
- React Window for performance optimization

---

## 📊 Demo Data

**Note:** The demo version uses mock data for demonstration purposes. In production, this dashboard connects to a live backend API providing real-time metrics and analytics.

The mock data generator creates realistic datasets that simulate:
- User acquisition trends over time
- Traffic source distributions
- Conversion funnel metrics
- Payment statistics
- Message logs with various statuses and types

---

#
## 📄 License

This project is licensed under the MIT License - feel free to use this project for your portfolio or learning purposes.

---

## 👨‍💻 Author

**Konstantin Kunak**

- 🌐 **Live Demo**: [5chairsstatisticsdemo.netlify.app](https://5chairsstatisticsdemo.netlify.app)
- 💻 **GitHub**: [@kostyakunak](https://github.com/kostyakunak)
- 📧 **Email**: kostyakunak@gmail.com

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Amazing UI library
- [Chart.js](https://www.chartjs.org/) - Powerful charting library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful icon library
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [Day.js](https://day.js.org/) - Minimalist date library

---

⭐ **If you find this project useful or interesting, please consider giving it a star!** ⭐

---


**Built with ❤️ to demonstrate modern analytics dashboard development**

*Transforming raw data into actionable business insights*
