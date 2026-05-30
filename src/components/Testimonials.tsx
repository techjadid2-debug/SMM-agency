import React from 'react';
import { REVIEWS_DATA } from '../data';
import { Users, Star, Quote } from 'lucide-react';
import { useAppContext } from './AppContext';

export default function Testimonials() {
  const { theme, t } = useAppContext();

  return (
    <section 
      id="testimonials" 
      className={`py-24 border-t relative overflow-hidden transition-theme ${
        theme === 'dark' ? 'bg-slate-950 border-slate-900 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title information */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 animate-fade-in">
          <div className={`inline-flex items-center space-x-2 border rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-theme ${
            theme === 'dark'
              ? 'bg-purple-950/60 border-purple-500/30 text-purple-300'
              : 'bg-purple-50 border-purple-100 text-purple-700'
          }`}>
            <Users className="h-3.5 w-3.5 text-purple-500" />
            <span>{t('testimonialsBadge')}</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight transition-theme ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {t('testimonialsTitle', { entrepreneurs: '' })}
            <span className="bg-gradient-to-r from-indigo-505 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              {t('testimonialsTitleSpan')}
            </span>
          </h2>
          
          <p className={`text-sm sm:text-base leading-relaxed transition-theme ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t('testimonialsDesc')}
          </p>
        </div>

        {/* Reviews dynamic layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((review) => {
            return (
              <div
                id={`review-card-${review.id}`}
                key={review.id}
                className={`border rounded-3xl p-8 relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-black/40'
                    : 'bg-white border-slate-200 hover:border-slate-350 shadow-lg shadow-slate-100'
                }`}
              >
                {/* Decorative overlay giant quote icon */}
                <Quote className={`absolute top-6 right-8 h-12 w-12 pointer-events-none opacity-10 transition-theme ${
                  theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                }`} />

                {/* Star rating and comment content */}
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className={`text-sm italic leading-relaxed transition-theme ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    " {review.text} "
                  </blockquote>
                </div>

                {/* User identification info */}
                <div className={`flex items-center space-x-4 pt-6 mt-6 border-t transition-theme ${
                  theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <img
                    src={review.avatarUrl}
                    alt={review.name}
                    referrerPolicy="no-referrer"
                    className="h-11 w-11 rounded-full object-cover border border-indigo-500/30 shrink-0 shadow-sm"
                  />
                  <div className="text-left">
                    <h4 className={`font-display font-bold text-sm sm:text-base ${
                      theme === 'dark' ? 'text-white' : 'text-slate-950'
                    }`}>
                      {review.name}
                    </h4>
                    <p className={`text-xs mt-0.5 transition-theme ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-505'
                    }`}>
                      {review.position}, <span className="text-indigo-500 font-bold">{review.companyName}</span>
                    </p>
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
