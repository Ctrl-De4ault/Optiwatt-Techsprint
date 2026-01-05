
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  darkMode?: boolean;
}

const Icons = {
  Sparkle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
  ),
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
  ),
  Energy: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  ),
  Structure: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Insights: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
  ),
  Reports: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
  ),
  Logout: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
  )
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, darkMode }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Icons.Dashboard /> },
    { id: 'monitoring', label: 'Block Usage', icon: <Icons.Energy /> },
    { id: 'blocks', label: 'Blocks', icon: <Icons.Structure /> },
    { id: 'insights', label: 'Insights', icon: <Icons.Insights />, badge: '2' },
    { id: 'reports', label: 'Reports', icon: <Icons.Reports /> },
  ];

  return (
    <aside className={`w-72 flex flex-col py-10 px-8 shrink-0 relative z-20 transition-all duration-500 border-r ${darkMode ? 'bg-black/40 border-white/5' : 'liquid-glass border-transparent'}`}>
      <div className="flex items-center gap-3 mb-14 px-2 relative z-10">
        <div className={`${darkMode ? 'text-blue-400' : 'text-black'} drop-shadow-sm`}>
          <Icons.Sparkle />
        </div>
        <h1 className={`text-xl font-extrabold tracking-tight drop-shadow-sm transition-colors ${darkMode ? 'text-white' : 'text-black'}`}>OptiWatt</h1>
      </div>

      <nav className="flex-1 space-y-3 relative z-10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-500 relative group overflow-hidden ${
              activeTab === item.id
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xl shadow-black/30 scale-[1.02]'
                : `transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-black hover:bg-white/50 backdrop-blur-md'}`
            }`}
          >
            <div className="flex items-center gap-4 relative z-10">
              <span className={`transition-colors duration-300 ${
                activeTab === item.id 
                  ? (darkMode ? 'text-black' : 'text-white') 
                  : (darkMode ? 'text-gray-500 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-black')
              }`}>
                {item.icon}
              </span>
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
            </div>
            {item.badge && (
              <span className={`w-5 h-5 flex items-center justify-center text-[10px] rounded-full font-black transition-colors duration-300 relative z-10 ${
                activeTab === item.id 
                  ? (darkMode ? 'bg-black text-white' : 'bg-white text-black') 
                  : (darkMode ? 'bg-white/10 text-white' : 'bg-black text-white')
              }`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-12 space-y-1 relative z-10">
        <p className={`text-[10px] font-black uppercase tracking-[0.25em] px-4 mb-5 opacity-70 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Management</p>
        
        <button className={`w-full flex items-center gap-4 px-4 py-3 transition-all rounded-2xl group ${darkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-black hover:bg-white/50'}`}>
           <div className={`w-6 h-6 rounded-lg border shadow-sm flex items-center justify-center group-hover:scale-110 transition-all ${darkMode ? 'bg-white/10 border-white/10 group-hover:bg-white/20' : 'bg-white/40 border-white/60'}`}>
             <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-black'}`}></div>
           </div>
           <span className="text-sm font-bold">Settings</span>
        </button>

        <button 
          onClick={onLogout}
          className={`w-full flex items-center gap-4 px-4 py-3 transition-all rounded-2xl ${darkMode ? 'text-gray-500 hover:text-red-400 hover:bg-red-900/10' : 'text-gray-500 hover:text-red-600 hover:bg-red-50/40'}`}
        >
          <Icons.Logout />
          <span className="text-sm font-bold">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
