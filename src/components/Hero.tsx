import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Send, Users, TrendingUp, Presentation } from 'lucide-react';
import { useAppContext } from './AppContext';

interface HeroProps {
  onScrollTo: (elementId: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  const { theme, t } = useAppContext();

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden transition-theme ${
        theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Visual background enhancements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {theme === 'dark' ? (
          <>
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[150px]" />
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/8 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-purple-400/8 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-45" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top Badge */}
            <motion.div
              id="hero-badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center space-x-2 border rounded-full px-4 py-1.5 font-semibold text-xs sm:text-sm shadow-inner transition-theme ${
                theme === 'dark'
                  ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300'
                  : 'bg-indigo-50/70 border-indigo-200 text-indigo-700'
              }`}
            >
              <Sparkles className="h-4 w-4 text-indigo-500 animate-spin" />
              <span>{t('agencySlogan')}</span>
            </motion.div>

            {/* Slogan Headings */}
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.08] transition-theme ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              {t('heroTitlePart1')} <br />
              <span className="bg-gradient-to-r from-indigo-505 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t('heroTitleGradient')}
              </span> <br />
              {t('heroTitlePart2')}
            </motion.h1>

            <motion.p
              id="hero-p"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`text-base sm:text-lg max-w-xl leading-relaxed transition-theme ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {t('heroDescription')}
            </motion.p>

            {/* CTA and Secondary Actions */}
            <motion.div
              id="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              {/* Premium glowing CTA Button */}
              <button
                id="hero-cta-button"
                onClick={() => onScrollTo('contact')}
                className="group relative flex items-center justify-center space-x-2.5 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse-glow"
              >
                <span>{t('ctaFreeConsultation')}</span>
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                id="hero-secondary-button"
                onClick={() => onScrollTo('services')}
                className={`flex items-center justify-center space-x-2 px-8 py-4.5 rounded-2xl font-bold transition-all cursor-pointer border ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100 shadow-sm'
                }`}
              >
                <span>{t('ctaOurTariffs')}</span>
              </button>
            </motion.div>

            {/* Quick Microstats block */}
            <motion.div
              id="hero-microstats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`grid grid-cols-3 gap-6 pt-8 border-t transition-theme ${
                theme === 'dark' ? 'border-slate-900' : 'border-slate-200'
              }`}
            >
              <div>
                <p className={`text-3xl font-display font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>40+</p>
                <p className={`text-xs mt-1 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t('statsBrands')}</p>
              </div>
              <div>
                <p className={`text-3xl font-display font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>5M+</p>
                <p className={`text-xs mt-1 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t('statsViews')}</p>
              </div>
              <div>
                <p className={`text-3xl font-display font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>24/7</p>
                <p className={`text-xs mt-1 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t('statsLeads')}</p>
              </div>
            </motion.div>
          </div>

          {/* Interactive Graphic Showcase Element */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              id="hero-visual"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`relative mx-auto max-w-[420px] aspect-square rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden border transition-theme ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800 shadow-black' : 'bg-white border-slate-200 shadow-slate-200'
              }`}
            >
              {/* Dynamic decorative backdrop colors */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />

              {/* Header inside mockup */}
              <div className={`flex items-center justify-between border-b pb-4 transition-theme ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-widest ${
                  theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                }`}>{t('visualRealtime')}</span>
              </div>

              {/* Graphical Status Loops */}
              <div className="my-auto space-y-5 relative py-3">
                
                {/* Visual Row 1 */}
                <div className={`p-4 rounded-2xl border transition-theme ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`flex items-center space-x-1.5 font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      <Users className="h-4 w-4 text-indigo-500" /> 
                      <span>{t('visualReach')}</span>
                    </span>
                    <span className="text-emerald-500 font-extrabold">+245.5%</span>
                  </div>
                  <div className={`h-2.5 w-full rounded-full overflow-hidden transition-theme ${
                    theme === 'dark' ? 'bg-slate-900' : 'bg-slate-200'
                  }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-indigo-505 to-purple-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Visual Row 2 */}
                <div className={`p-4 rounded-2xl border transition-theme ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`flex items-center space-x-1.5 font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      <TrendingUp className="h-4 w-4 text-pink-500" /> 
                      <span>{t('visualWeeklyLeads')}</span>
                    </span>
                    <span className="text-indigo-500 font-extrabold">{t('visualWeekCount', { count: '148' })}</span>
                  </div>
                  <div className={`h-2.5 w-full rounded-full overflow-hidden transition-theme ${
                    theme === 'dark' ? 'bg-slate-900' : 'bg-slate-200'
                  }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '70%' }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Visual Row 3 */}
                <div className={`p-4 rounded-2xl border transition-theme ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`flex items-center space-x-1.5 font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      <Presentation className="h-4 w-4 text-emerald-500" /> 
                      <span>{t('visualRoas')}</span>
                    </span>
                    <span className="text-emerald-500 font-extrabold">x5.8</span>
                  </div>
                  <div className={`h-2.5 w-full rounded-full overflow-hidden transition-theme ${
                    theme === 'dark' ? 'bg-slate-900' : 'bg-slate-200'
                  }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                      className="h-full bg-gradient-to-r from-emerald-505 to-teal-500 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Connected details bar */}
              <div className={`border rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold gap-2 transition-theme ${
                theme === 'dark'
                  ? 'bg-indigo-950/20 border-indigo-500/10 text-slate-300'
                  : 'bg-indigo-50 border-indigo-100 text-indigo-900'
              }`}>
                <span>{t('visualTelegramConnected')}</span>
                <button
                  onClick={() => onScrollTo('contact')}
                  className="flex items-center space-x-1 text-indigo-500 hover:text-indigo-600 font-extrabold cursor-pointer hover:underline transition-all"
                >
                  <span>{t('visualSendLead')}</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
