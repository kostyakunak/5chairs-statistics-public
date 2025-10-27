import { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import MessagesLog from './pages/MessagesLog';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'messages'>('dashboard');

  return (
    <div className="app">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="app-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'messages' && <MessagesLog />}
      </div>
    </div>
  );
}
