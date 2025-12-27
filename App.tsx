
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Terminal, 
  Cloud, 
  ShieldCheck, 
  GitBranch, 
  Terminal as LogIcon, 
  Settings, 
  Activity, 
  PlusCircle,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  Code
} from 'lucide-react';
import { Page, User } from './types';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import ApiManagement from './pages/ApiManagement';
import LinuxTools from './pages/LinuxTools';
import Deployment from './pages/Deployment';
import Logs from './pages/Logs';
import Security from './pages/Security';
import GitIntegration from './pages/GitIntegration';
import ApiTesting from './pages/ApiTesting';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Simple pseudo-routing
  const renderPage = () => {
    if (currentPage === 'landing' && !user) return <Landing onStart={() => setCurrentPage('auth')} />;
    if (currentPage === 'auth') return <Auth onLogin={(u) => { setUser(u); setCurrentPage('dashboard'); }} />;
    
    // Protected routes
    if (!user) {
      setCurrentPage('auth');
      return <Auth onLogin={(u) => { setUser(u); setCurrentPage('dashboard'); }} />;
    }

    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'api-management': return <ApiManagement />;
      case 'linux-tools': return <LinuxTools />;
      case 'deployment': return <Deployment />;
      case 'logs': return <Logs />;
      case 'security': return <Security />;
      case 'git': return <GitIntegration />;
      case 'testing': return <ApiTesting />;
      default: return <Dashboard />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'api-management', label: 'API Services', icon: <PlusCircle size={20} /> },
    { id: 'testing', label: 'Testing & Monitor', icon: <Activity size={20} /> },
    { id: 'linux-tools', label: 'System Tools', icon: <Terminal size={20} /> },
    { id: 'deployment', label: 'Deployment', icon: <Cloud size={20} /> },
    { id: 'logs', label: 'Log Explorer', icon: <LogIcon size={20} /> },
    { id: 'security', label: 'Access Control', icon: <ShieldCheck size={20} /> },
    { id: 'git', label: 'Git Collab', icon: <GitBranch size={20} /> },
  ];

  if (currentPage === 'landing' && !user) {
    return <Landing onStart={() => setCurrentPage('auth')} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 flex flex-col hidden md:flex`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Code size={24} className="text-white" />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">OpenSysHub</span>}
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as Page)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentPage === item.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => { setUser(null); setCurrentPage('landing'); }}
            className="flex items-center gap-3 text-slate-400 hover:text-white px-3 py-2 w-full"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search services, logs..." 
                className="pl-10 pr-4 py-1.5 bg-slate-100 border-none rounded-md text-sm w-64 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role}</p>
              </div>
              <img 
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff`} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-indigo-500 transition-all" 
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
