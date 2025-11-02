import { BarChart3, MessageSquare } from 'lucide-react';

interface NavigationProps {
  activeTab: 'dashboard' | 'messages';
  onTabChange: (tab: 'dashboard' | 'messages') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h1 className="nav-logo">5Chairs Admin</h1>
        </div>
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabChange('dashboard')}
          >
            <BarChart3 size={20} />
            <span>Statistics</span>
          </button>
          <button
            className={`nav-tab ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => onTabChange('messages')}
          >
            <MessageSquare size={20} />
            <span>Sent Messages</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
