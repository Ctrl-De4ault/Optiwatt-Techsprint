
import React, { useState, useMemo } from 'react';
import { Appliance } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { AppIcon } from './IconMapper';

interface ApplianceMonitorProps {
  appliances: Appliance[];
  onToggle: (id: string) => void;
  darkMode?: boolean;
}

const ApplianceMonitor: React.FC<ApplianceMonitorProps> = ({ appliances, onToggle, darkMode }) => {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const selectedBlock = appliances.find(a => a.id === selectedBlockId);

  const comparisonData = useMemo(() => {
    if (!selectedBlock) return [];
    const base = selectedBlock.usageKwH;
    return [
      { name: 'Week 1', current: parseFloat((base * 0.9).toFixed(1)), last: parseFloat((base * 1.1).toFixed(1)), bench: parseFloat((base * 0.8).toFixed(1)) },
      { name: 'Week 2', current: parseFloat((base * 1.05).toFixed(1)), last: parseFloat((base * 1.2).toFixed(1)), bench: parseFloat((base * 0.75).toFixed(1)) },
      { name: 'Week 3', current: parseFloat((base * 0.85).toFixed(1)), last: parseFloat((base * 1.15).toFixed(1)), bench: parseFloat((base * 0.82).toFixed(1)) },
      { name: 'Week 4', current: parseFloat((base * 0.4).toFixed(1)), last: parseFloat((base * 1.3).toFixed(1)), bench: parseFloat((base * 0.7).toFixed(1)) },
    ];
  }, [selectedBlock]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`backdrop-blur-xl border p-4 rounded-2xl shadow-2xl ring-1 ring-black/5 ${darkMode ? 'bg-gray-900/95 border-white/10' : 'bg-white/95 border-white/20'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 border-b pb-1 ${darkMode ? 'text-gray-500 border-white/5' : 'text-gray-400 border-gray-100'}`}>{label}</p>
          <div className="space-y-2">
            {payload.map((p: any, i: number) => (
              <div key={i} className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill }}></div>
                  <span className={`text-xs font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{p.name}:</span>
                </div>
                <span className="text-sm font-black" style={{ color: p.fill }}>{p.value} kWh</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  if (selectedBlockId && selectedBlock) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedBlockId(null)}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl border transition-all ${darkMode ? 'bg-white/10 border-white/10 text-gray-400 hover:text-white' : 'bg-white border-gray-100 text-gray-400 hover:text-black'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h2 className={`text-3xl font-black tracking-tight flex items-center gap-3 ${darkMode ? 'text-white' : 'text-black'}`}>
              <AppIcon name={selectedBlock.icon} size={28} />
              {selectedBlock.name} Analysis
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <div className={`content-card p-8 transition-all ${darkMode ? 'bg-white/5 border-white/10' : ''}`}>
              <div className="flex justify-between items-center mb-10">
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-black'}`}>Performance Contrast</h3>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-[8px] font-black uppercase text-gray-500">Current</span></div>
                   <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-white' : 'bg-black'}`}></div><span className="text-[8px] font-black uppercase text-gray-500">Last</span></div>
                   <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-[8px] font-black uppercase text-gray-500">Bench</span></div>
                </div>
              </div>
              
              <div className="w-full h-[350px] min-h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#334155" : "#f0f0f0"} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: darkMode ? '#64748b' : '#9ca3af'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: darkMode ? '#64748b' : '#9ca3af'}} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: darkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc' }} />
                    <Bar name="Current" dataKey="current" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                    <Bar name="Last Month" dataKey="last" fill={darkMode ? "#ffffff" : "#000000"} radius={[4, 4, 0, 0]} barSize={24} />
                    <Bar name="Benchmark" dataKey="bench" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="content-card p-8 bg-gradient-to-br from-blue-600 to-emerald-600 text-white shadow-xl">
              <h4 className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Efficiency Score</h4>
              <p className="text-4xl font-black mb-4">88%</p>
              <p className="text-sm font-medium opacity-80 leading-relaxed">Performing <span className="font-bold">12% better</span> than last week average.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h2 className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>Block Usage</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {appliances.map((app) => (
          <div key={app.id} className={`content-card p-8 group transition-all duration-500 ${darkMode ? 'bg-white/5 border-white/10' : ''}`}>
            <div className="flex justify-between items-start mb-8">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border ${darkMode ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-gray-50 border-gray-100 text-black'}`}>
                <AppIcon name={app.icon} size={32} />
              </div>
              <button
                onClick={() => onToggle(app.id)}
                className={`w-12 h-6 rounded-full transition-all relative ${app.status === 'on' ? (darkMode ? 'bg-blue-500' : 'bg-black') : (darkMode ? 'bg-white/10' : 'bg-gray-100')}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${app.status === 'on' ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <h3 className={`text-xl font-black mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>{app.name}</h3>
            <p className="text-xs text-gray-400 font-black uppercase mb-6">Efficiency Class {app.efficiency}</p>
            
            <button 
              onClick={() => setSelectedBlockId(app.id)}
              className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-50 hover:bg-black hover:text-white'}`}
            >
              Analyze Block
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplianceMonitor;
