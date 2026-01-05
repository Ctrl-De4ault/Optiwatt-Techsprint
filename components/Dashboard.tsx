
import React, { useState, useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { EnergyReading, Appliance } from '../types';
import { AppIcon } from './IconMapper';

interface DashboardProps {
  data: EnergyReading[];
  appliances: Appliance[];
  darkMode?: boolean;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
const DARK_COLORS = ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#f472b6'];
const ELECTRICITY_RATE = 0.15;

const Dashboard: React.FC<DashboardProps> = ({ data, appliances, darkMode }) => {
  const [selectedBlockIds, setSelectedBlockIds] = useState<string[]>(appliances.map(a => a.id));
  const [viewMode, setViewMode] = useState<'graphical' | 'pie'>('graphical');

  const activeColors = darkMode ? DARK_COLORS : COLORS;

  const selectedAppliances = useMemo(() => 
    appliances.filter(app => selectedBlockIds.includes(app.id)), 
    [appliances, selectedBlockIds]
  );

  const totalPossibleLoad = useMemo(() => 
    appliances.reduce((acc, app) => acc + app.usageKwH, 0), 
    [appliances]
  );

  const currentSelectionLoad = useMemo(() => 
    selectedAppliances.reduce((acc, app) => acc + app.usageKwH, 0), 
    [selectedAppliances]
  );

  const usageRatio = totalPossibleLoad > 0 ? currentSelectionLoad / totalPossibleLoad : 0;

  const chartData = useMemo(() => {
    return data.map(point => ({
      ...point,
      usage: parseFloat((point.usage * usageRatio).toFixed(1))
    }));
  }, [data, usageRatio]);

  const totalUsage = chartData.reduce((acc, curr) => acc + curr.usage, 0).toFixed(1);
  const totalCost = (Number(totalUsage) * ELECTRICITY_RATE).toFixed(2);

  const toggleBlock = (id: string) => {
    setSelectedBlockIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const pieData = useMemo(() => {
    return selectedAppliances.map(app => ({
      name: app.name,
      value: app.usageKwH
    }));
  }, [selectedAppliances]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const usage = payload[0].value;
      const cost = (usage * ELECTRICITY_RATE).toFixed(2);
      return (
        <div className={`backdrop-blur-xl border p-4 rounded-2xl shadow-2xl ring-1 ring-black/5 ${darkMode ? 'bg-gray-900/90 border-white/10' : 'bg-white/95 border-white/20'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 border-b pb-1 ${darkMode ? 'text-gray-500 border-white/5' : 'text-gray-400 border-gray-100'}`}>{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-6">
              <span className={`text-xs font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Usage:</span>
              <span className={`text-sm font-black ${darkMode ? 'text-white' : 'text-black'}`}>{usage} kWh</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className={`text-xs font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Est. Cost:</span>
              <span className={`text-sm font-black ${darkMode ? 'text-green-400' : 'text-green-600'}`}>${cost}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-12 gap-8 pb-10">
      <div className="col-span-12">
        <div className={`content-card p-6 flex flex-wrap items-center justify-between gap-6 transition-all ${darkMode ? 'bg-white/5 border-white/10' : ''}`}>
          <div className="flex flex-wrap items-center gap-3">
            <p className={`text-[10px] font-black uppercase tracking-widest mr-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Active Units:</p>
            {appliances.map((app) => (
              <button
                key={app.id}
                onClick={() => toggleBlock(app.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                  selectedBlockIds.includes(app.id)
                    ? (darkMode ? 'bg-white text-black border-white shadow-lg shadow-white/10' : 'bg-black text-white border-black shadow-lg shadow-black/10') + ' scale-105'
                    : (darkMode ? 'bg-transparent text-gray-400 border-white/10 hover:border-white/30' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300')
                }`}
              >
                <AppIcon name={app.icon} size={14} />
                {app.name}
              </button>
            ))}
          </div>
          
          <div className={`flex p-1.5 rounded-2xl border transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100/50 border-gray-100'}`}>
            <button 
              onClick={() => setViewMode('graphical')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'graphical' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
            >
              Graphical
            </button>
            <button 
              onClick={() => setViewMode('pie')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'pie' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
            >
              Pie Chart
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 space-y-8">
        <div className={`content-card p-8 min-h-[500px] flex flex-col transition-all ${darkMode ? 'bg-white/5 border-white/10' : ''}`}>
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-black'}`}>System-wide Analytics</h4>
              <p className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Visualizing consolidated data for {selectedBlockIds.length} monitored units</p>
            </div>
          </div>

          <div className="w-full h-[380px] relative" style={{ minHeight: '380px' }}>
            {viewMode === 'graphical' ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#334155" : "#f5f5f5"} />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: 700, fill: darkMode ? '#64748b' : '#9ca3af'}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fontWeight: 700, fill: darkMode ? '#64748b' : '#9ca3af'}} 
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="usage" 
                    stroke={darkMode ? "#60a5fa" : "#3b82f6"} 
                    strokeWidth={4} 
                    fill={darkMode ? "rgba(96, 165, 250, 0.1)" : "rgba(59, 130, 246, 0.1)"}
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="45%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={8}
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={activeColors[index % activeColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    align="center"
                    iconType="circle"
                    formatter={(value) => <span className={`text-xs font-bold ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-8">
        <div className={`content-card p-8 relative overflow-hidden transition-all ${darkMode ? 'bg-white/10 border-white/10 text-white' : 'bg-black text-white'}`}>
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl ${darkMode ? 'bg-blue-500/10' : 'bg-white/5'}`}></div>
          
          <h4 className="font-bold mb-4 relative z-10">Consolidated Stats</h4>
          <div className="space-y-6 relative z-10">
            <div className={`p-4 rounded-2xl border transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white/10 border-white/5'}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Total Daily Load</p>
              <p className="text-2xl font-bold">{totalUsage} kWh</p>
            </div>
            <div className={`p-4 rounded-2xl border transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white/10 border-white/5'}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Daily Expenditure</p>
              <p className="text-2xl font-bold">${totalCost}</p>
            </div>
          </div>
        </div>

        <div className={`content-card p-8 transition-all ${darkMode ? 'bg-white/5 border-white/10' : ''}`}>
          <h4 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>Block Efficiency Ranking</h4>
          <div className="space-y-6">
            {appliances.slice(0, 4).map((app, i) => {
              const efficiencyMap = { 'A': 95, 'B': 75, 'C': 55, 'D': 35 };
              const val = efficiencyMap[app.efficiency];
              const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
              
              return (
                <div key={app.id} className={selectedBlockIds.includes(app.id) ? 'opacity-100' : 'opacity-30 transition-opacity'}>
                  <div className={`flex justify-between text-xs font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
                    <span className="flex items-center gap-2">
                      <AppIcon name={app.icon} size={16} />
                      {app.name}
                    </span>
                    <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>{val}%</span>
                  </div>
                  <div className={`h-2 w-full rounded-full overflow-hidden border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <div className={`h-full transition-all duration-1000 ${colors[i % colors.length]}`} style={{ width: `${val}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
