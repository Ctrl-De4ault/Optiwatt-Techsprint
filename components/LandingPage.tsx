
import React, { useState } from 'react';

interface LandingPageProps {
  onStart: (credentials: { email: string; name: string }) => void;
}

const Icons = {
  Sparkle: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>
  ),
  Email: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )
};

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [view, setView] = useState<'landing' | 'login' | 'signup'>('landing');
  const [formData, setFormData] = useState({ email: '', password: '', name: 'Alex Rivera' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onStart({ email: formData.email, name: formData.name });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]"></div>

      <div className="app-container max-w-6xl w-full h-[85vh] flex overflow-hidden relative z-10 transition-all duration-700 bg-white">
        {/* Branding Side */}
        <div className={`w-1/2 p-20 flex flex-col justify-center transition-all duration-700 ${view !== 'landing' ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
          <div className="flex items-center gap-3 mb-12">
            <Icons.Sparkle />
            <span className="text-2xl font-black tracking-tighter">OptiWatt</span>
          </div>
          <h1 className="text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
            Manage your energy <span className="text-gray-200">beautifully.</span>
          </h1>
          <p className="text-lg text-gray-500 mb-12 max-w-md leading-relaxed">
            A minimalist workspace for your smart home. Monitor, analyze and optimize with zero friction.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => setView('login')}
              className="bg-black text-white px-10 py-5 rounded-[24px] font-bold text-lg hover:scale-[1.02] transition-all shadow-2xl shadow-black/20"
            >
              Get Started
            </button>
            <button className="border border-gray-200 text-black px-10 py-5 rounded-[24px] font-bold text-lg hover:bg-gray-50 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
        
        {/* Visual/Form Side */}
        <div className={`w-1/2 bg-[#fafbfc] border-l border-gray-100 p-20 flex items-center justify-center relative transition-all duration-700 ${view !== 'landing' ? '-translate-x-full border-r border-l-0' : 'translate-x-0'}`}>
          {view === 'landing' ? (
            <div className="content-card w-full aspect-square p-12 shadow-2xl relative z-10 animate-soft-float bg-white">
              <div className="space-y-10">
                <div className="h-4 w-1/2 bg-gray-100 rounded-full"></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-32 bg-gray-50 rounded-3xl border border-gray-100"></div>
                  <div className="h-32 bg-gray-50 rounded-3xl border border-gray-100"></div>
                </div>
                <div className="h-40 bg-black rounded-[32px] flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full border border-white/30 relative">
                     <div className="absolute inset-2 border-2 border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full max-w-sm">
              <div className="mb-10">
                <h2 className="text-4xl font-black tracking-tight mb-2">
                  {view === 'login' ? 'Welcome Back' : 'Join OptiWatt'}
                </h2>
                <p className="text-gray-500 font-medium">
                  {view === 'login' ? 'Enter your credentials to continue.' : 'Start managing your energy beautifully today.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {view === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
                        <Icons.User />
                      </div>
                      <input 
                        required
                        type="text" 
                        placeholder="Alex Rivera"
                        className="w-full pl-14 pr-6 py-5 rounded-[24px] border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
                      <Icons.Email />
                    </div>
                    <input 
                      required
                      type="email" 
                      placeholder="name@company.com"
                      className="w-full pl-14 pr-6 py-5 rounded-[24px] border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
                      <Icons.Lock />
                    </div>
                    <input 
                      required
                      type="password" 
                      placeholder="••••••••"
                      className="w-full pl-14 pr-6 py-5 rounded-[24px] border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-black/5 outline-none transition-all font-bold"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>
                </div>

                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full py-5 bg-black text-white rounded-[24px] font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-black/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (view === 'login' ? 'Sign In' : 'Create Account')}
                </button>

                <p className="text-center text-sm font-bold text-gray-500 mt-8">
                  {view === 'login' ? "Don't have an account?" : "Already have an account?"}
                  <button 
                    type="button"
                    onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                    className="text-black ml-2 hover:underline"
                  >
                    {view === 'login' ? 'Sign Up' : 'Log In'}
                  </button>
                </p>
              </form>
            </div>
          )}

          {view !== 'landing' && (
            <button 
              onClick={() => setView('landing')}
              className="absolute top-10 left-10 p-4 rounded-full bg-white border border-gray-100 shadow-sm hover:scale-110 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
