import React, { useState, useEffect } from 'react';
import { Send, Phone, User, Settings, Check, RefreshCw, Eye, MessageSquareCode } from 'lucide-react';
import { useAppContext } from './AppContext';

interface ContactProps {
  selectedService: string;
}

export default function Contact({ selectedService }: ContactProps) {
  const { language, theme, t } = useAppContext();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Status feedback messages
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean | null;
    message: string;
    telegramSent?: boolean;
    telegramError?: string | null;
  }>({
    success: null,
    message: ''
  });

  // Recent leads list for demonstration/checking in real-time
  const [localLeads, setLocalLeads] = useState<any[]>([]);
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
    } else {
      setService('Konsultatsiya');
    }
  }, [selectedService]);

  // Fetch local leads list to show the real-time persistent data
  const fetchLocalLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLocalLeads(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLocalLeads();
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Simple helper to auto add standard +998 uzb prefix if they start typing numbers
    if (value && !value.startsWith('+')) {
      if (value.startsWith('998')) {
        value = '+' + value;
      } else if (/^\d/.test(value)) {
        value = '+998' + value;
      }
    }
    setPhone(value);
  };

  const handleClearLeads = async () => {
    if (window.confirm(t('confirmClear'))) {
      try {
        const res = await fetch('/api/leads/clear', { method: 'POST' });
        if (res.ok) {
          setLocalLeads([]);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setSubmitStatus({ success: false, message: t('errorNameRequired') });
      return;
    }
    if (!phone.trim()) {
      setSubmitStatus({ success: false, message: t('errorPhoneRequired') });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          phone,
          service
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          success: true,
          message: t('contactSuccess'),
          telegramSent: data.telegramSent,
          telegramError: data.telegramError
        });
        // Clear main inputs on success
        setName('');
        setPhone('');
        fetchLocalLeads();
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || 'Arizani yuborishda xatolik yuz berdi.'
        });
      }
    } catch (err: any) {
      setSubmitStatus({
        success: false,
        message: t('errorServerLink')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className={`py-24 border-t px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-theme ${
        theme === 'dark' ? 'bg-slate-900 border-slate-950 text-white' : 'bg-white border-slate-100 text-slate-900'
      }`}
    >
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel instructions */}
          <div className="lg:col-span-5 space-y-8 text-left lg:sticky lg:top-28">
            <div className="space-y-4">
              <span className={`inline-flex items-center space-x-2 border rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-theme ${
                theme === 'dark'
                  ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-400'
                  : 'bg-indigo-55 border-indigo-100 text-indigo-700'
              }`}>
                <Send className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
                <span>{t('contactBadge')}</span>
              </span>
              
              <h2 className={`text-3xl sm:text-4xl font-display font-extrabold tracking-tight transition-theme ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {t('contactTitle', { discuss: '' })}
                <span className="bg-gradient-to-r from-indigo-505 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {t('contactTitleSpan')}
                </span>
                {language === 'uz' && " qilamiz!"}
                {language === 'ru' && " старт!"}
                {language === 'en' && "!"}
              </h2>
              
              <p className={`text-sm sm:text-base leading-relaxed transition-theme ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-655'
              }`}>
                {t('contactDesc')}
              </p>
            </div>

            {/* Checklist items */}
            <div className={`space-y-4.5 pt-6 border-t transition-theme ${
              theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <div className="flex items-start space-x-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 border transition-theme ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                }`}>
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className={`font-display font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {t('contactCheck1Title')}
                  </h4>
                  <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t('contactCheck1Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 border transition-theme ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'
                }`}>
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className={`font-display font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {t('contactCheck2Title')}
                  </h4>
                  <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t('contactCheck2Desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Developer technical notice */}
            <div className={`p-5 rounded-2xl border text-xs space-y-2 transition-theme ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100/70 border-slate-200 text-slate-600'
            }`}>
              <div className="flex items-center space-x-2 text-indigo-550 font-bold uppercase tracking-wider text-[10px]">
                <Settings className="h-3.5 w-3.5 animate-spin" />
                <span>{t('contactConsoleTitle')}</span>
              </div>
              <p className="leading-relaxed">{t('contactConsoleDesc')}</p>
              
              <button 
                id="toggle-integrations-console"
                onClick={() => {
                  fetchLocalLeads();
                  setShowConsole(!showConsole);
                }}
                className={`flex items-center space-x-1.5 font-mono text-[10px] mt-1 hover:text-indigo-500 cursor-pointer transition-colors ${
                  theme === 'dark' ? 'text-slate-350' : 'text-slate-700 font-bold'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{showConsole ? t('contactConsoleBtnOff') : t('contactConsoleBtnOn')}</span>
              </button>
            </div>
          </div>

          {/* Form container - adapts dynamically */}
          <div className={`lg:col-span-7 border p-8 sm:p-10 rounded-3xl space-y-6 transition-theme ${
            theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-205 shadow-xl shadow-slate-200'
          }`}>
            <h3 className={`text-xl sm:text-2xl font-display font-extrabold text-left ${
              theme === 'dark' ? 'text-white' : 'text-slate-950'
            }`}>
              {t('contactFormTitle')}
            </h3>
            
            <form id="lead-form" onSubmit={handleSubmit} className="space-y-6 text-left">
              
              {/* Name Block */}
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider block ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {t('contactInputName')}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="input-name"
                    type="text"
                    required
                    placeholder={t('contactPlaceholderName')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full border rounded-xl py-4.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-slate-50'
                    }`}
                  />
                </div>
              </div>

              {/* Phone Block */}
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider block ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {t('contactInputPhone')}
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="input-phone"
                    type="tel"
                    required
                    placeholder="+998 (90) 123-45-67"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`w-full border rounded-xl py-4.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-slate-50'
                    }`}
                  />
                </div>
                <span className="text-[10px] text-slate-500 tracking-wide block">{t('contactInputPhoneHelp')}</span>
              </div>

              {/* Choice of SMM pack select */}
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider block ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {t('contactInputService')}
                </label>
                <select
                  id="select-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`w-full border rounded-xl py-4.5 px-4 text-sm focus:outline-none focus:border-indigo-500 transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <option value="Konsultatsiya">{t('contactServiceDefault')}</option>
                  <option value="SMM Start">{t('contactServiceStart')}</option>
                  <option value="SMM Biznes">{t('contactServiceBusiness')}</option>
                  <option value="SMM Premium">{t('contactServicePremium')}</option>
                  <option value="Individual tarif">{t('contactServiceIndividual')}</option>
                </select>
              </div>

              {/* High impact Submit CTA button */}
              <button
                id="submit-lead"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2.5 py-4.5 bg-gradient-to-r from-indigo-650 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-505 text-white font-extrabold uppercase tracking-widest text-xs rounded-xl shadow-2xl transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer animate-pulse-glow"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                    <span>{t('contactBtnSubmitting')}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>{t('contactBtnSubmit')}</span>
                  </>
                )}
              </button>

            </form>

            {/* Response callback boxes */}
            {submitStatus.success !== null && (
              <div
                id="submit-feedback-box"
                className={`p-5 rounded-2xl border text-sm text-left space-y-2.5 animate-in fade-in duration-300 ${
                  submitStatus.success
                    ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-500/20 text-rose-300'
                }`}
              >
                <p className="font-bold">{submitStatus.message}</p>
                {submitStatus.success && (
                  <div className="text-[11px] space-y-1 block border-t border-slate-850 pt-3 opacity-90 text-slate-300">
                    <p className="flex items-center space-x-1.5 font-mono">
                      <span>• {t('contactServerStatus')}:</span> 
                      <span className="text-emerald-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded shadow-inner">{t('contactStatusSaved')}</span>
                    </p>
                    <p className="flex items-center space-x-1.5 font-mono">
                      <span>• {t('contactTelegramBotStatus')}:</span> 
                      {submitStatus.telegramSent ? (
                        <span className="text-emerald-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded shadow-inner">{t('contactStatusSent')}</span>
                      ) : (
                        <span className="text-amber-500 font-bold bg-slate-900 px-1.5 py-0.5 rounded shadow-inner">
                          {t('contactStatusNotConfigured')} ({submitStatus.telegramError || "not found"})
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Developer Live Database Log Viewer */}
            {showConsole && (
              <div id="leads-console" className={`border rounded-2xl p-4 text-left font-mono space-y-4 text-xs animate-in slide-in-from-top duration-300 ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <div className={`flex items-center justify-between border-b pb-2 ${
                  theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <div className="flex items-center space-x-2 text-indigo-500">
                    <MessageSquareCode className="h-4.5 w-4.5 animate-pulse" />
                    <span className="font-bold uppercase text-[10px]">{t('contactSavedLeads')} ({localLeads.length})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button id="refresh-leads" onClick={fetchLocalLeads} className="p-1 hover:text-indigo-400 text-slate-500 cursor-pointer">
                      <RefreshCw className="h-3 w-3" />
                    </button>
                    {localLeads.length > 0 && (
                      <button id="clear-leads" onClick={handleClearLeads} className="text-rose-500 hover:underline text-[9px] font-bold cursor-pointer">
                        {t('contactClear')}
                      </button>
                    )}
                  </div>
                </div>

                {localLeads.length === 0 ? (
                  <p className="text-slate-500 text-center italic py-4">{t('contactNoLeads')}</p>
                ) : (
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {localLeads.map((item, idx) => (
                      <div 
                        id={`lead-item-${idx}`} 
                        key={idx} 
                        className={`p-3 rounded-xl border text-[10px] space-y-1 ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-150 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}>{item.name}</span>
                          <span className="text-indigo-500 font-extrabold text-[9px]">{item.service}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Phone: {item.phone}</span>
                          <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
