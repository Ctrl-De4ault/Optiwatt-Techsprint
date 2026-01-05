
import React, { useState } from 'react';
import { Appliance } from '../types';
import { generateFullReport } from '../services/gemini';

interface ReportsManagerProps {
  appliances: Appliance[];
  darkMode?: boolean;
}

const Icons = {
  Brain: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04"></path></svg>
  ),
  UserCheck: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  FileText: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
  ),
  Sparkles: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/></svg>
  )
};

const ReportsManager: React.FC<ReportsManagerProps> = ({ appliances, darkMode }) => {
  const [reportType, setReportType] = useState<'ai' | 'expert' | null>(null);
  const [reportContent, setReportContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    setReportType('ai');
    const content = await generateFullReport(appliances);
    setReportContent(content || null);
    setIsGenerating(false);
  };

  const handleRequestExpert = () => {
    setIsGenerating(true);
    setReportType('expert');
    // Simulate API delay
    setTimeout(() => {
      setReportContent("Expert analysis has been requested. Our certified energy engineers will review your block usage and provide a manual audit within 24 hours. You will receive an encrypted link via email.");
      setIsGenerating(false);
    }, 2000);
  };

  const handleEmail = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      alert('Report has been securely sent to your registered email address.');
    }, 1500);
  };

  const handlePDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('PDF generation complete. Your download will start shortly.');
    }, 1500);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>Performance Reports</h2>
          <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Generate comprehensive audits and distribution-ready summaries.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AI Choice */}
        <button 
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className={`p-10 rounded-[40px] text-left border transition-all group relative overflow-hidden ${
            reportType === 'ai' ? 'ring-4 ring-blue-500/20 border-blue-500' : (darkMode ? 'bg-white/5 border-white/10 hover:border-white/30' : 'bg-white border-gray-100 shadow-xl shadow-black/5 hover:border-blue-200')
          }`}
        >
          <div className="flex items-center gap-6 mb-8">
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all ${darkMode ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
              <Icons.Brain />
            </div>
            <div>
              <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>AI Generation</h3>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Instant Insights • Powered by Gemini</p>
            </div>
          </div>
          <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Analyze consumption patterns instantly using neural optimization models. Ideal for weekly baseline comparisons.
          </p>
          <div className="flex items-center gap-2 text-blue-500 text-xs font-black uppercase tracking-widest">
            <Icons.Sparkles /> <span>Start Generation</span>
          </div>
        </button>

        {/* Expert Choice */}
        <button 
          onClick={handleRequestExpert}
          disabled={isGenerating}
          className={`p-10 rounded-[40px] text-left border transition-all group relative overflow-hidden ${
            reportType === 'expert' ? 'ring-4 ring-purple-500/20 border-purple-500' : (darkMode ? 'bg-white/5 border-white/10 hover:border-white/30' : 'bg-white border-gray-100 shadow-xl shadow-black/5 hover:border-purple-200')
          }`}
        >
          <div className="flex items-center gap-6 mb-8">
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all ${darkMode ? 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'}`}>
              <Icons.UserCheck />
            </div>
            <div>
              <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>Expert Generation</h3>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">24h Turnaround • Certified Audit</p>
            </div>
          </div>
          <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Professional review by certified energy engineers. Includes thermal imaging analysis and regulatory compliance check.
          </p>
          <div className="flex items-center gap-2 text-purple-500 text-xs font-black uppercase tracking-widest">
            <span>Request Consultation</span>
          </div>
        </button>
      </div>

      {isGenerating && (
        <div className={`p-12 rounded-[40px] border flex flex-col items-center justify-center gap-6 animate-pulse ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="text-center">
            <h4 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>Compiling Data Assets</h4>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Aggregating block usage and performing predictive modeling...</p>
          </div>
        </div>
      )}

      {reportContent && !isGenerating && (
        <div className={`p-12 rounded-[48px] border relative overflow-hidden animate-in zoom-in-95 duration-500 ${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-gray-100 shadow-2xl'}`}>
          <div className="absolute top-0 right-0 p-8 flex gap-4">
             <button 
              onClick={handleEmail}
              disabled={isSending}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${darkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-50 hover:bg-gray-100 text-black'}`}
             >
               {isSending ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : <Icons.Mail />}
               Send to Mail
             </button>
             <button 
              onClick={handlePDF}
              disabled={isExporting}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${darkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-black hover:bg-gray-800 text-white'}`}
             >
               {isExporting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Icons.FileText />}
               Download PDF
             </button>
          </div>

          <div className="max-w-3xl">
            <div className={`mb-10 pb-10 border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
              <h3 className={`text-4xl font-black mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                {reportType === 'ai' ? 'Automated Performance Audit' : 'Expert Consultation Request'}
              </h3>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">Generated for Alex Rivera • {new Date().toLocaleDateString()}</p>
            </div>

            <div className={`prose prose-sm max-w-none leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="whitespace-pre-wrap font-medium">
                {reportContent}
              </div>
            </div>
            
            {reportType === 'ai' && (
              <div className={`mt-12 p-8 rounded-3xl border border-dashed ${darkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-500"><Icons.Sparkles /></div>
                    <p className="text-sm font-black text-blue-600">AI Interpretation Note</p>
                 </div>
                 <p className="text-xs text-blue-700/70 font-medium leading-relaxed">
                   This report was generated using historical usage data from your OptiWatt sensors. For 100% accuracy in commercial billing disputes, we recommend an Expert Consultation.
                 </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsManager;
