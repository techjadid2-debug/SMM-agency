import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Rocket, Award, Users, PhoneCall, HelpCircle, Layers, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { useAppContext } from './AppContext';
import { Language } from '../translations';

interface HeaderProps {
  onScrollTo: (elementId: string) => void;
  activeSection: string;
}

export default function Header({ onScrollTo, activeSection }: HeaderProps) {
  const { language, setLanguage, theme, toggleTheme, t } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'hero', label: t('navHome'), icon: Rocket },
    { id: 'about', label: t('navAbout'), icon: HelpCircle },
    { id: 'services', label: t('navServices'), icon: Layers },
    { id: 'results', label: t('navResults'), icon: Award },
    { id: 'testimonials', label: t('navTestimonials'), icon: Users },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  const activeLanguageObj = languages.find(l => l.code === language) || languages[0];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        isScrolled
          ? theme === 'dark'
            ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-900 shadow-2xl py-3'
            : 'bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            id="logo-button"
            onClick={() => onScrollTo('hero')}
            className="flex items-center space-x-2 text-left font-extrabold text-2xl tracking-tight hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-2 rounded-2xl text-white shadow-lg shadow-indigo-500/10">
              <Rocket className="h-5 w-5 animate-pulse" />
            </span>
            <span className={`font-display font-extrabold transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              SMM<span className="text-indigo-500 font-medium">PRO</span>
            </span>
          </button>

          {/* Desktop Navigation Link-items */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => onScrollTo(item.id)}
                  className={`flex items-center space-x-1.5 text-xs lg:text-sm font-medium transition-all relative px-3 py-1.5 rounded-lg cursor-pointer ${
                    isActive
                      ? 'text-indigo-500 font-bold bg-indigo-50/10 dark:bg-indigo-950/40'
                      : theme === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-900/40'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Practical Toolbar (Theme switch, Language switch, Call To Action) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="lang-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{activeLanguageObj.flag}</span>
                <span>{activeLanguageObj.code.toUpperCase()}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>

              {langDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-36 rounded-xl shadow-2xl border py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                  theme === 'dark'
                    ? 'bg-slate-950 border-slate-800 text-slate-300'
                    : 'bg-white border-slate-100 text-slate-700'
                }`}>
                  {languages.map((lang) => (
                    <button
                      id={`lang-option-${lang.code}`}
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`flex items-center space-x-2 w-full px-3 py-2 text-left text-xs font-medium cursor-pointer transition-colors ${
                        language === lang.code
                          ? 'bg-indigo-500 text-white'
                          : theme === 'dark'
                            ? 'hover:bg-slate-900'
                            : 'hover:bg-slate-50'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Glowing Call to Action Button */}
            <button
              id="header-cta"
              onClick={() => onScrollTo('contact')}
              className="relative flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider hover:from-indigo-500 hover:to-purple-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/30 cursor-pointer overflow-hidden animate-pulse-glow"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>{t('navContact')}</span>
            </button>
          </div>

          {/* Mobile Right Bar controls */}
          <div className="md:hidden flex items-center space-x-2">
            
            {/* Mobile Theme Switcher */}
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 border border-slate-800 text-amber-400'
                  : 'bg-slate-100 border border-slate-200 text-slate-700'
              }`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile Language Toggle */}
            <button
              id="lang-toggle-mobile"
              onClick={() => {
                const nextLang = language === 'uz' ? 'ru' : language === 'ru' ? 'en' : 'uz';
                setLanguage(nextLang);
              }}
              className={`p-2 rounded-lg text-xs font-extrabold flex items-center space-x-1 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 text-slate-300'
                  : 'bg-slate-100 text-slate-700'
              }`}
              title="Switch language"
            >
              <Globe className="h-4 w-4 stroke-[2.5px]" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Mobile drawer Menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isOpen && (
        <div 
          id="mobile-dropdown" 
          className={`md:hidden border-b animate-in fade-in slide-in-from-top duration-250 ${
            theme === 'dark'
              ? 'bg-slate-950 border-slate-900'
              : 'bg-white border-slate-100 shadow-xl'
          }`}
        >
          <div className="px-3 pt-3 pb-8 space-y-1.5 text-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`nav-item-mobile-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    onScrollTo(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-500 text-white'
                      : theme === 'dark'
                        ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            <div className="pt-4 px-2">
              <button
                id="header-cta-mobile"
                onClick={() => {
                  onScrollTo('contact');
                  setIsOpen(false);
                }}
                className="flex items-center justify-center space-x-2 w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-sm shadow-xl active:scale-95 transition-transform"
              >
                <PhoneCall className="h-4.5 w-4.5" />
                <span>{t('ctaFreeConsultation')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
