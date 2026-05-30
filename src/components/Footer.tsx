import React from 'react';
import { Rocket, Mail, Phone, MapPin, Instagram, Facebook, Send, Award, Heart } from 'lucide-react';
import { useAppContext } from './AppContext';

interface FooterProps {
  onScrollTo: (elementId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const { theme, t } = useAppContext();

  const links = [
    { id: 'hero', name: t('navHome') },
    { id: 'about', name: t('navAbout') },
    { id: 'services', name: t('navServices') },
    { id: 'results', name: t('navResults') },
    { id: 'testimonials', name: t('navTestimonials') },
  ];

  return (
    <footer 
      id="main-footer" 
      className={`border-t transition-theme ${
        theme === 'dark' ? 'bg-slate-950 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Brand block columns */}
          <div className="md:col-span-5 space-y-6 text-left">
            <button
              id="footer-logo"
              onClick={() => onScrollTo('hero')}
              className="flex items-center space-x-2 text-left font-extrabold text-2xl tracking-tight cursor-pointer"
            >
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl text-white">
                <Rocket className="h-5 w-5" />
              </span>
              <span className={`font-display font-black transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                SMM<span className="text-indigo-505 font-medium">PRO</span>
              </span>
            </button>
            
            <p className={`text-sm leading-relaxed max-w-sm transition-theme ${
              theme === 'dark' ? 'text-slate-450' : 'text-slate-600'
            }`}>
              {t('heroDescription')}
            </p>

            <div className="flex items-center space-x-3">
              <a
                id="social-tg"
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-xl border hover:scale-110 active:scale-95 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 hover:text-indigo-400 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-200 text-slate-705 hover:text-indigo-600 hover:bg-slate-200 shadow-sm'
                }`}
              >
                <Send className="h-4.5 w-4.5 fill-current" />
              </a>
              <a
                id="social-ig"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-xl border hover:scale-110 active:scale-95 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 hover:text-pink-400 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-200 text-slate-705 hover:text-pink-600 hover:bg-slate-200 shadow-sm'
                }`}
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                id="social-fb"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-xl border hover:scale-110 active:scale-95 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 hover:text-indigo-400 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-200 text-slate-705 hover:text-indigo-600 hover:bg-slate-200 shadow-sm'
                }`}
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Nav Links block */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className={`text-xs uppercase font-extrabold tracking-widest ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-3.5 text-sm font-medium">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    id={`footer-link-${link.id}`}
                    onClick={() => onScrollTo(link.id)}
                    className={`hover:text-indigo-500 hover:translate-x-1.5 transition-all text-left cursor-pointer ${
                      theme === 'dark' ? 'text-slate-350 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Real Contacts info Block */}
          <div className="md:col-span-4 text-left space-y-4">
            <h4 className={`text-xs uppercase font-extrabold tracking-widest ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-505'
            }`}>
              {t('navContact')}
            </h4>
            <ul className={`space-y-3.5 text-sm transition-theme ${
              theme === 'dark' ? 'text-slate-350' : 'text-slate-600'
            }`}>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-indigo-500" />
                <a href="tel:+998901234567" className="hover:text-indigo-500 transition-colors">+998 (90) 123-45-67</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-purple-500" />
                <a href="mailto:info@smmpro.uz" className="hover:text-indigo-500 transition-colors">info@smmpro.uz</a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-pink-500 font-bold" />
                <span>{t('footerAddress')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4 transition-theme ${
          theme === 'dark' ? 'border-slate-900 text-slate-500' : 'border-slate-100 text-slate-500'
        }`}>
          <p>© {new Date().getFullYear()} SMM PRO. Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center space-x-1">
            <span>Prepared with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-current animate-pulse" />
            <span>in Uzbekistan</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
