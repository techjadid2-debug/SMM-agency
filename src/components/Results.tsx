import React, { useState } from 'react';
import { CASES_DATA } from '../data';
import { Award, ArrowUpRight, Star, Calendar } from 'lucide-react';
import { useAppContext } from './AppContext';

export default function Results() {
  const { theme, t } = useAppContext();
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('resultsAll') },
    { id: 'Restoran / Umumiy ovqatlanish', label: 'E-commerce & Restoran' },
    { id: 'Ta\'lim va Kurslar', label: 'Ta\'lim' },
    { id: 'Ko\'chmas Mulk / Qurilish', label: 'Ko\'chmas Mulk' }
  ];

  const filteredCases = activeTab === 'all' 
    ? CASES_DATA 
    : CASES_DATA.filter(item => item.category === activeTab);

  return (
    <section 
      id="results" 
      className={`py-24 border-t transition-theme ${
        theme === 'dark' ? 'bg-slate-900 border-slate-950 text-white' : 'bg-white border-slate-100 text-slate-900'
      }`}
    >
      {/* Background ambient spots */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-indigo-505/5 rounded-full blur-[125px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-pink-505/5 rounded-full blur-[125px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 animate-fade-in">
          <div className={`inline-flex items-center space-x-2 border rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-theme ${
            theme === 'dark'
              ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-400'
              : 'bg-indigo-50 border-indigo-100 text-indigo-700'
          }`}>
            <Award className="h-3.5 w-3.5 text-indigo-500" />
            <span>{t('resultsBadge')}</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight transition-theme ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {t('resultsTitle', { keys: '' })}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500 bg-clip-text text-transparent">
              {t('resultsTitleSpan')}
            </span>
          </h2>
          
          <p className={`text-sm sm:text-base leading-relaxed transition-theme ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t('resultsDesc')}
          </p>
        </div>

        {/* Tab Filters with interactive styling */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              id={`tab-${cat.id}`}
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 scale-105'
                  : theme === 'dark'
                    ? 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-200 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Case Studies dynamic grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredCases.map((cs) => {
            return (
              <div
                id={`case-card-${cs.id}`}
                key={cs.id}
                className={`border rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 group ${
                  theme === 'dark'
                    ? 'bg-slate-950 border-slate-800 hover:border-slate-700 shadow-black/40'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xl shadow-slate-100'
                }`}
              >
                {/* Upper Thumbnail Area with Hover FX */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={cs.imageUrl}
                    alt={cs.companyName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100 transition-all duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                  
                  {/* Floating Tags */}
                  <span className="absolute bottom-4 left-4 inline-flex items-center space-x-1.5 bg-slate-950 border border-slate-800 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
                    <Star className="h-3 w-3 text-amber-500 animate-spin" />
                    <span>{cs.category}</span>
                  </span>
                  
                  <span className="absolute top-4 right-4 inline-flex items-center space-x-1 bg-slate-950/80 border border-slate-800 text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-full">
                    <Calendar className="h-3 w-3" />
                    <span>{cs.duration}</span>
                  </span>
                </div>

                {/* Info and statistics comparison block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6 text-left">
                  
                  <div className="space-y-3">
                    <h3 className={`text-xl font-display font-extrabold group-hover:text-indigo-500 transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {cs.companyName}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed transition-theme ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {cs.description}
                    </p>
                  </div>

                  {/* Growth stats compare panel */}
                  <div className={`grid grid-cols-2 gap-4 border p-4.5 rounded-2xl shrink-0 transition-theme ${
                    theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">
                        {t('resultsBefore')}
                      </span>
                      <p className="text-rose-500 font-extrabold text-sm sm:text-base mt-1 line-through">
                        {cs.beforeStats}
                      </p>
                    </div>
                    
                    <div className={`border-l pl-4 transition-theme ${
                      theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
                    }`}>
                      <span className="text-[10px] uppercase font-mono text-slate-505 tracking-wider">
                        {t('resultsAfter')}
                      </span>
                      <p className="text-emerald-500 font-black text-sm sm:text-base mt-1 flex items-center space-x-1">
                        <span>{cs.afterStats}</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 stroke-[2.5]" />
                      </p>
                    </div>
                  </div>

                  {/* High metric details */}
                  <div className={`grid grid-cols-3 gap-2 shrink-0 border-t pt-4 transition-theme ${
                    theme === 'dark' ? 'border-slate-900' : 'border-slate-100'
                  }`}>
                    {cs.results.map((r, rIdx) => (
                      <div 
                        id={`case-stat-${cs.id}-${rIdx}`} 
                        key={rIdx} 
                        className={`text-center p-2 rounded-xl border transition-theme ${
                          theme === 'dark' 
                            ? 'bg-slate-900/40 border-slate-800' 
                            : 'bg-slate-100/50 border-slate-200'
                        }`}
                      >
                        <p className={`text-base sm:text-lg font-black transition-theme ${
                          theme === 'dark' ? 'text-white' : 'text-slate-950'
                        }`}>
                          {r.value}
                        </p>
                        <p className="text-[9px] text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap mt-0.5" title={r.label}>
                          {r.label}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
