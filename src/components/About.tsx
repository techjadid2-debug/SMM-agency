import React from 'react';
import { Target, Users, Award, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAppContext } from './AppContext';

export default function About() {
  const { theme, t } = useAppContext();

  const values = [
    {
      icon: Target,
      title: t('aboutVal1Title'),
      description: t('aboutVal1Desc'),
      color: 'text-indigo-500',
      bgColor: theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/10' : 'bg-indigo-50/50 border-indigo-100'
    },
    {
      icon: Users,
      title: t('aboutVal2Title'),
      description: t('aboutVal2Desc'),
      color: 'text-purple-500',
      bgColor: theme === 'dark' ? 'bg-purple-950/20 border-purple-500/10' : 'bg-purple-50/50 border-purple-100'
    },
    {
      icon: TrendingUp,
      title: t('aboutVal3Title'),
      description: t('aboutVal3Desc'),
      color: 'text-emerald-500',
      bgColor: theme === 'dark' ? 'bg-emerald-950/20 border-emerald-500/10' : 'bg-emerald-50/50 border-emerald-100'
    }
  ];

  const highlights = [
    'Sifatli kadr va profesyonallar jamoasi',
    'A/B testlar orqali minimal reklama xarajatlari',
    'Brendingizning ijobiy obro\'sini (repustatsiyasini) shakllantirish',
    'Har bir dollarga to\'g\'ri tahlil va hisobotlar',
    'Ijtimoiy tarmoqlar algoritmlari bilan doimiy ishlash'
  ];

  return (
    <section 
      id="about" 
      className={`py-24 overflow-hidden relative border-t transition-theme ${
        theme === 'dark' ? 'bg-slate-900 border-slate-950 text-white' : 'bg-white border-slate-100 text-slate-900'
      }`}
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
        
        {/* Top Header info */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 animate-fade-in">
          <div className={`inline-flex items-center space-x-2 border rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-theme ${
            theme === 'dark'
              ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-400'
              : 'bg-indigo-50 border-indigo-100 text-indigo-700'
          }`}>
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>{t('aboutBadge')}</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight transition-theme ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {t('aboutTitle', { brand: 'SMM PRO' })}
          </h2>
          
          <p className={`text-sm sm:text-base leading-relaxed transition-theme ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t('aboutDescription')}
          </p>
        </div>

        {/* Core Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                id={`about-val-${idx}`}
                key={idx}
                className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl max-w-sm mx-auto md:max-w-none ${
                  theme === 'dark' ? 'hover:shadow-black/40' : 'hover:shadow-slate-200'
                } ${val.bgColor}`}
              >
                <div className={`p-4.5 rounded-2xl w-fit mb-6 border transition-theme ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}>
                  <Icon className={`h-6 w-6 ${val.color}`} />
                </div>
                <h3 className={`text-xl font-display font-bold mb-3 transition-theme ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>{val.title}</h3>
                <p className={`text-sm leading-relaxed transition-theme ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>{val.description}</p>
              </div>
            );
          })}
        </div>

        {/* Explaining Columns with Modern Image / Graphic layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-16 border-t transition-theme ${
          theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
        }`}>
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className={`text-2xl sm:text-3xl font-display font-extrabold leading-tight transition-theme ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              {t('aboutWhyChooseUs')}
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed transition-theme ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t('aboutWhyChooseUsDesc')}
            </p>

            <ul className="space-y-4 pt-2">
              {highlights.map((text, idx) => (
                <li id={`about-highlight-${idx}`} key={idx} className="flex items-start space-x-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Steps Visual layout */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-505 to-purple-500 rounded-3xl blur-2xl opacity-10 animate-pulse" />
            <div className={`relative border p-8 rounded-3xl transition-theme ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200/60 shadow-inner'
            }`}>
              <div className="space-y-6">
                
                {/* Step 1 */}
                <div className="flex items-center space-x-4 text-left">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-extrabold text-base transition-theme ${
                    theme === 'dark'
                      ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
                      : 'bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm'
                  }`}>
                    1
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm sm:text-base transition-theme ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>{t('step1Title')}</h4>
                    <p className={`text-xs mt-0.5 transition-theme ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}>{t('step1Desc')}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center space-x-4 text-left">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-extrabold text-base transition-theme ${
                    theme === 'dark'
                      ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400'
                      : 'bg-purple-50 border border-purple-100 text-purple-600 shadow-sm'
                  }`}>
                    2
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm sm:text-base transition-theme ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>{t('step2Title')}</h4>
                    <p className={`text-xs mt-0.5 transition-theme ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}>{t('step2Desc')}</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center space-x-4 text-left">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-extrabold text-base transition-theme ${
                    theme === 'dark'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-emerald-50 border border-emerald-100 text-emerald-600 shadow-sm'
                  }`}>
                    3
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm sm:text-base transition-theme ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>{t('step3Title')}</h4>
                    <p className={`text-xs mt-0.5 transition-theme ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}>{t('step3Desc')}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
