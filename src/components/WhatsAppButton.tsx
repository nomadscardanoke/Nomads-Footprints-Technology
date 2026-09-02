import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/siteData';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickOptions = [
    'Hello, I need a quotation for Printing & Branding.',
    'Hi Nomads, I want to build a Website / Mobile App.',
    'Hello, I need IT Consultancy & Support for our office.',
    'Hi, I would like to order Custom Graphic Design.',
  ];

  const handleSend = (textToSend?: string) => {
    const message = textToSend || customMsg || COMPANY_DETAILS.whatsappMessage;
    const url = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-neutral-950 border border-white/10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200 text-white rounded-none">
          {/* Header */}
          <div className="bg-black p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-neutral-900 border border-white/10 flex items-center justify-center font-black text-red-600 text-sm rounded-none">
                  NF
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-none" />
              </div>
              <div>
                <h4 className="font-heading font-black text-xs uppercase tracking-wider text-white">Nomads Footprints Tech</h4>
                <p className="text-[10px] text-neutral-400 flex items-center gap-1 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  Typically replies in &lt; 5 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 bg-neutral-900 border border-white/10 rounded-none"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-neutral-950 text-xs space-y-3 max-h-80 overflow-y-auto">
            <div className="bg-black border border-white/10 p-3 shadow-sm text-neutral-300 leading-relaxed rounded-none">
              <p className="font-bold text-red-500 mb-1 uppercase tracking-wider text-[11px]">Karibu! How can we assist your business today?</p>
              <p className="text-xs">
                Whether you need corporate printing, graphic design, a responsive website, mobile application, or IT consultancy, our team is ready.
              </p>
            </div>

            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Quick Inquiry Options:</p>
              {quickOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(opt)}
                  className="w-full text-left text-xs bg-black hover:bg-neutral-900 border border-white/10 hover:border-red-600 text-neutral-300 p-2.5 transition-all flex items-start gap-2 group rounded-none"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                  <span className="group-hover:text-white">{opt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-black border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message here..."
              className="flex-1 bg-neutral-950 border border-white/10 text-neutral-100 text-xs px-3 py-2 focus:outline-none focus:border-red-600 placeholder-neutral-500 rounded-none"
            />
            <button
              onClick={() => handleSend()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 transition-all shadow-md rounded-none"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="whatsapp-floating-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3.5 rounded-none shadow-2xl transition-all duration-200 active:scale-95 border border-emerald-400/40"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 animate-pulse" />
        <span className="hidden sm:inline font-bold text-xs uppercase tracking-widest">Chat on WhatsApp</span>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-none border border-black" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
