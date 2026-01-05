
import React, { useState } from 'react';
import { Suggestion, Appliance } from '../types';
import { getEnergyInsights } from '../services/gemini';

interface AISuggestionsProps {
  suggestions: Suggestion[];
  appliances: Appliance[];
  darkMode?: boolean;
}

const Icons = {
  Sparkles: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path></svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
  ),
  Brain: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04"></path></svg>
  )
};

const AISuggestions: React.FC<AISuggestionsProps> = ({ suggestions: initialSuggestions, appliances, darkMode }) => {
  const [tips, setTips] = useState<Suggestion[]>(initialSuggestions);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    const newTips = await getEnergyInsights(appliances, 12.5);
    if (newTips && newTips.length > 0) {
      setTips(newTips.map((t: any, idx: number) => ({ ...t, id: `ai-${Date.now()}-${idx}` })));
    }
    setLoading(false);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center border transition-all ${darkMode ? 'bg-blue-600/10 text-blue-400 border-blue-500/10' : 'bg-purple-600/10 text-purple-400 border-purple-500/10'}`}>
            <Icons.Brain />
          </div>
          <div>
            <h2 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>AI Recommendations</h2>
            <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Powered by Gemini for your specific lifestyle.</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3.5 rounded-[24px] font-bold transition-all shadow-xl shadow-blue-900/20 flex items-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Icons.Sparkles />
          )}
          Regenerate Insights
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tips.map((tip) => (
          <div key={tip.id} className={`p-10 rounded-[40px] relative overflow-hidden group transition-all duration-500 border ${darkMode ? 'bg-white/5 border-white/10 hover:border-blue-500/40' : 'glass-card hover:border-blue-500/20'}`}>
            <div className={`absolute top-0 right-0 px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-[20px] ${
              tip.impact === 'High' ? 'bg-orange-500/20 text-orange-400' : 
              tip.impact === 'Medium' ? 'bg-blue-500/20 text-blue-400' : (darkMode ? 'bg-white/10 text-gray-400' : 'bg-gray-800 text-gray-400')
            }`}>
              {tip.impact} Saving
            </div>
            
            <div className="mb-6">
              <span className={`inline-block px-4 py-1.5 text-[10px] font-black tracking-widest rounded-xl mb-4 border uppercase ${darkMode ? 'bg-white/5 text-gray-400 border-white/5' : 'bg-white/5 text-gray-400 border-white/5'}`}>
                {tip.category}
              </span>
              <h3 className={`text-2xl font-extrabold leading-tight transition-colors ${darkMode ? 'text-white' : 'text-black'}`}>{tip.title}</h3>
            </div>
            
            <p className={`leading-relaxed mb-8 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {tip.description}
            </p>

            <button className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-400 hover:text-blue-300'} font-bold text-sm flex items-center gap-2 group/btn`}>
              Execute recommendation 
              <span className="transition-transform group-hover/btn:translate-x-1">
                <Icons.ArrowRight />
              </span>
            </button>
          </div>
        ))}
      </div>

      <div className={`p-12 rounded-[48px] border-none overflow-hidden relative shadow-2xl transition-all ${darkMode ? 'bg-gradient-to-br from-blue-900 to-black' : 'bg-gradient-to-br from-blue-600 to-purple-900'}`}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[120px] -z-10 rounded-full" />
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1">
            <h3 className="text-4xl font-black mb-4 text-white">Savings Projection</h3>
            <p className="text-blue-100/80 text-lg leading-relaxed max-w-lg">
              Optimizing your consumption patterns today could lead to a reduction of <span className="text-white font-bold">$42.50</span> on your upcoming monthly cycle.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[32px] border border-white/10 text-center min-w-[220px] shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-200 opacity-60 mb-2">Estimated Yield</p>
            <p className="text-6xl font-black text-white">22%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;
