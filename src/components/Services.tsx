import React from 'react';
import { SERVICES_DATA } from '../data';
import { Check, Sparkles, TrendingUp, Zap, HelpCircle } from 'lucide-react';
import { useAppContext } from './AppContext';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const { theme, t } = useAppContext();

  // Helper inside loop to map specific preset icons nicely
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="h-6 w-6 text-indigo-500" />;
      case 'TrendingUp':
        return <TrendingUp className="h-6 w-6 text-violet-500" />;
      case 'Zap':
        return <Zap className="h-6 w-6 text-emerald-500" />;
      default:
        return <HelpCircle className="h-6 w-6 text-slate-500" />;
    }
  };

  return (
    <section 
      id="services" 
      className={`py-24 relative border-t transition-theme ${
        theme === 'dark' ? 'bg-slate-950 border-slate-900 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      {/* Soft gradient spotlights */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 animate-fade-in">
          <div className={`inline-flex items-center space-x-2 border rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-theme ${
            theme === 'dark'
              ? 'bg-purple-950/60 border-purple-500/30 text-purple-300'
              : 'bg-purple-50 border-purple-100 text-purple-700'
          }`}>
            <Zap className="h-3.5 w-3.5 text-purple-500 animate-bounce" />
            <span>{t('servicesBadge')}</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight transition-theme ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {t('servicesTitle', { packages: '' })}
            <span className="bg-gradient-to-r from-purple-500 via-pink-400 to-rose-500 bg-clip-text text-transparent">
              {t('servicesTitleSpan')}
            </span>
          </h2>
          
          <p className={`text-sm sm:text-base leading-relaxed transition-theme ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t('servicesDesc')}
          </p>
        </div>

        {/* Pricing columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-center">
          {SERVICES_DATA.map((service, idx) => {
            const isMostPopular = service.id === 'smm-business';
            return (
              <div
                id={`service-card-${service.id}`}
                key={service.id}
                className={`flex flex-col rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 relative ${
                  isMostPopular
                    ? theme === 'dark'
                      ? 'bg-slate-900 border-indigo-505 shadow-2xl shadow-indigo-950/50'
                      : 'bg-white border-indigo-500 shadow-2xl shadow-slate-200'
                    : theme === 'dark'
                      ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {isMostPopular && (
                  <span className="absolute -top-4.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-[10px] uppercase px-5 py-2 rounded-full tracking-widest shadow-lg shadow-indigo-500/20 whitespace-nowrap">
                    {t('servicesPopular')}
                  </span>
                )}

                {/* Upper stats info */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl border transition-theme ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
                  }`}>
                    {getIcon(service.iconName)}
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Plan {idx + 1}</span>
                </div>

                <h3 className={`text-2xl font-display font-extrabold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                  {service.title}
                </h3>
                
                <p className={`text-sm min-h-[48px] leading-relaxed mb-6 transition-theme ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {service.description}
                </p>

                {/* Price */}
                <div className={`mb-8 border-b pb-6 transition-theme ${
                  theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <span className={`text-3.5xl sm:text-4xl font-display font-black bg-gradient-to-r ${
                    theme === 'dark' ? 'from-white to-slate-400' : 'from-slate-950 to-slate-650'
                  } bg-clip-text text-transparent`}>
                    {service.price}
                  </span>
                </div>

                {/* Features checklist */}
                <ul className="space-y-4 flex-1 mb-8 text-left">
                  {service.features.map((feature, featureIdx) => (
                    <li id={`feat-${service.id}-${featureIdx}`} key={featureIdx} className="flex items-start space-x-3 text-sm">
                      <div className={`p-0.5 rounded-full shrink-0 mt-0.5 transition-theme ${
                        theme === 'dark'
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                          : 'bg-emerald-50 border border-emerald-100 text-emerald-600'
                      }`}>
                        <Check className="h-3.5 w-3.5 stroke-[3px]" />
                      </div>
                      <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing Buy/Order CTA Button */}
                <button
                  id={`btn-select-${service.id}`}
                  onClick={() => onSelectService(service.title)}
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md active:scale-95 cursor-pointer ${
                    isMostPopular
                      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-500 hover:to-pink-500 animate-pulse-glow'
                      : theme === 'dark'
                        ? 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                        : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-200 shadow-inner'
                  }`}
                >
                  {t('servicesCta')}
                </button>
              </div>
            );
          })}
        </div>

        {/* Individual plan custom helper banner */}
        <div className={`mt-16 border rounded-3xl p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-left gap-6 transition-theme ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-slate-900/60 border-indigo-505/20'
            : 'bg-indigo-50/50 border-indigo-100 text-indigo-950 shadow-md'
        }`}>
          <div>
            <h4 className={`font-display font-extrabold text-lg mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t('servicesIndividualTitle')}
            </h4>
            <p className={theme === 'dark' ? 'text-slate-400 text-sm' : 'text-slate-600 text-sm'}>
              {t('servicesIndividualDesc')}
            </p>
          </div>
          <button
            id="consultation-banner-cta"
            onClick={() => onSelectService('Individual tarif')}
            className="flex-shrink-0 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold uppercase tracking-wider text-xs py-3.5 px-7 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            {t('servicesIndividualCta')}
          </button>
        </div>

      </div>
    </section>
  );
}
