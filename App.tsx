
import React, { useState, useEffect, useRef } from 'react';
import { User, Appliance, EnergyReading, Suggestion, Block, Notification } from './types';
import { INITIAL_APPLIANCES, HISTORICAL_DATA, INITIAL_SUGGESTIONS, INITIAL_BLOCKS, INITIAL_NOTIFICATIONS } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ApplianceMonitor from './components/ApplianceMonitor';
import AISuggestions from './components/AISuggestions';
import LandingPage from './components/LandingPage';
import BlockManager from './components/BlockManager';
import ReportsManager from './components/ReportsManager';

const Icons = {
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  ),
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  )
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [appliances, setAppliances] = useState<Appliance[]>(INITIAL_APPLIANCES);
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
  const [history] = useState<EnergyReading[]>(HISTORICAL_DATA);
  const [suggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  const efficiencyImprovement = 12;

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('optiwatt_theme') === 'dark';
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('optiwatt_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('optiwatt_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('optiwatt_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = (credentials: { email: string; name: string }) => {
    const mockUser = { 
      id: `u-${Date.now()}`, 
      name: credentials.name, 
      email: credentials.email, 
      isAuthenticated: true 
    };
    setUser(mockUser);
    localStorage.setItem('optiwatt_user', JSON.stringify(mockUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('optiwatt_user');
  };

  const toggleAppliance = (id: string) => {
    setAppliances(prev => prev.map(app => 
      app.id === id ? { ...app, status: app.status === 'on' ? 'off' : 'on' } : app
    ));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user || !user.isAuthenticated) {
    return <LandingPage onStart={handleLogin} />;
  }

  return (
    <div className={`flex h-screen p-6 relative overflow-hidden transition-colors duration-500 ${darkMode ? 'bg-[#0f172a]' : 'bg-[#f4f5f7]'}`}>
      <div className={`absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse transition-colors ${darkMode ? 'bg-blue-600/10' : 'bg-blue-500/20'}`}></div>
      <div className={`absolute bottom-[-10%] left-[5%] w-[30%] h-[30%] rounded-full blur-[100px] transition-colors ${darkMode ? 'bg-purple-900/10' : 'bg-pink-500/20'}`}></div>
      <div className="absolute top-[20%] left-[-10%] w-48 h-48 bg-orange-400/10 rounded-full blur-[80px]"></div>

      <div className={`app-container flex w-full h-full overflow-hidden relative z-10 border shadow-2xl transition-all duration-500 ${darkMode ? 'bg-[#1e293b]/90 border-white/10' : 'bg-white border-white/50'}`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={handleLogout} 
          darkMode={darkMode}
        />

        <main className={`flex-1 overflow-y-auto px-12 py-10 backdrop-blur-md transition-colors duration-500 ${darkMode ? 'bg-black/10' : 'bg-white/40'}`}>
          <header className="flex justify-between items-start mb-12 relative z-[100]">
            <div className="pt-2">
              <h2 className={`text-[32px] font-[800] tracking-[-0.03em] leading-tight transition-colors ${darkMode ? 'text-white' : 'text-[#1a1f2e]'}`}>
                Welcome back, {user.name.split(' ')[0]}
              </h2>
              <p className={`text-[15px] mt-1 font-[500] tracking-[-0.01em] transition-colors ${darkMode ? 'text-gray-500' : 'text-[#8c94a8]'}`}>
                Your home efficiency is <span className={darkMode ? 'text-blue-400' : 'text-[#1a1f2e] font-bold'}>{efficiencyImprovement}% higher</span> than last week.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 p-2 rounded-2xl border backdrop-blur-xl shadow-inner transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100/30 border-white/80'}`}>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2.5 rounded-xl transition-all shadow-sm hover:shadow-black/5 active:scale-90 ${darkMode ? 'hover:bg-white/10 text-yellow-400' : 'hover:bg-white text-gray-400 hover:text-black'}`}
                  title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {darkMode ? <Icons.Sun /> : <Icons.Moon />}
                </button>
                <button className={`p-2.5 rounded-xl transition-all shadow-sm hover:shadow-black/5 active:scale-90 ${darkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-white text-gray-400 hover:text-black'}`}>
                  <Icons.Search />
                </button>
                
                <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`p-2.5 rounded-xl relative shadow-sm hover:shadow-black/5 active:scale-90 transition-all ${showNotifications ? (darkMode ? 'bg-white/10 text-white' : 'bg-white text-black') : (darkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-white text-gray-400 hover:text-black')}`}
                  >
                    <Icons.Bell />
                    {unreadCount > 0 && (
                      <span className={`absolute top-2 right-2 w-2 h-2 rounded-full border-2 shadow-sm ${darkMode ? 'bg-pink-400 border-[#1e293b]' : 'bg-pink-500 border-white'}`} />
                    )}
                  </button>

                  {showNotifications && (
                    <div className={`absolute right-0 mt-4 w-96 rounded-[32px] border shadow-2xl z-[110] animate-in fade-in zoom-in-95 duration-200 ${darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-100'}`}>
                      <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <div>
                          <h4 className={`font-black text-sm uppercase tracking-widest ${darkMode ? 'text-white' : 'text-black'}`}>Notifications</h4>
                          <p className="text-[10px] text-gray-500 font-bold">{unreadCount} unread messages</p>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={markAllRead} className="text-[10px] font-black uppercase text-blue-500 hover:underline">Mark all read</button>
                           <button onClick={clearNotifications} className="text-[10px] font-black uppercase text-gray-500 hover:text-red-500">Clear</button>
                        </div>
                      </div>
                      
                      <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-2">
                        {notifications.length === 0 ? (
                          <div className="py-12 text-center">
                            <p className="text-xs font-bold text-gray-500">All caught up!</p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {notifications.map((n) => (
                              <div 
                                key={n.id} 
                                onClick={() => markNotificationRead(n.id)}
                                className={`p-4 rounded-2xl transition-all cursor-pointer flex gap-4 ${!n.read ? (darkMode ? 'bg-white/5' : 'bg-blue-50/50') : 'opacity-60 hover:opacity-100'} ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-50'}`}
                              >
                                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                  n.type === 'warning' ? 'bg-orange-500' : 
                                  n.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                                } ${!n.read ? 'animate-pulse' : ''}`} />
                                <div className="flex-1">
                                  <div className="flex justify-between items-start mb-1">
                                    <h5 className={`text-sm font-black ${darkMode ? 'text-white' : 'text-black'}`}>{n.title}</h5>
                                    <span className="text-[10px] font-bold text-gray-500">{n.time}</span>
                                  </div>
                                  <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{n.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 border-t border-white/5">
                        <button className={`w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${darkMode ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-50 text-gray-500 hover:text-black hover:bg-gray-100'}`}>
                          View All Activity
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={`w-11 h-11 rounded-2xl overflow-hidden border-2 shadow-xl ring-1 ring-black/5 transform hover:scale-105 transition-transform cursor-pointer ${darkMode ? 'border-white/20' : 'border-white'}`}>
                <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt="user" className="w-full h-full object-cover" />
              </div>
            </div>
          </header>

          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 cubic-bezier(0.16, 1, 0.3, 1) relative z-10">
            {activeTab === 'dashboard' && (
              <Dashboard data={history} appliances={appliances} darkMode={darkMode} />
            )}
            
            {activeTab === 'monitoring' && (
              <ApplianceMonitor appliances={appliances} onToggle={toggleAppliance} darkMode={darkMode} />
            )}

            {activeTab === 'blocks' && (
              <BlockManager blocks={blocks} setBlocks={setBlocks} darkMode={darkMode} />
            )}

            {activeTab === 'insights' && (
              <AISuggestions suggestions={suggestions} appliances={appliances} darkMode={darkMode} />
            )}
            
            {activeTab === 'reports' && (
              <ReportsManager appliances={appliances} darkMode={darkMode} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
