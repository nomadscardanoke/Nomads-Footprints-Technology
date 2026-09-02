import React, { useState } from 'react';
import { PageId } from '../types';
import { FAQS, COMPANY_DETAILS } from '../data/siteData';
import {
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  ArrowRight,
  Phone,
} from 'lucide-react';

interface FaqPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-800/40 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-red-500" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            ANSWERS &amp; ASSISTANCE
          </h1>
          <p className="text-sm sm:text-base text-neutral-300">
            Find prompt answers regarding our printing timelines, development processes, payment structures, and nationwide delivery.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g., delivery, M-Pesa, website timelines)..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 text-sm"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-white hover:text-red-400 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-red-950 text-red-500 text-xs flex items-center justify-center font-black shrink-0">
                      Q{idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-red-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-neutral-300 text-sm leading-relaxed border-t border-neutral-800/80 bg-neutral-950/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="p-10 text-center text-neutral-400 bg-neutral-900 rounded-2xl">
              No matching questions found for &ldquo;{searchTerm}&rdquo;. Please contact our support team directly.
            </div>
          )}
        </div>

        {/* Have more questions banner */}
        <div className="mt-14 p-8 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-heading font-extrabold text-xl text-white uppercase">
              Still Have Questions?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Our team is ready to provide personalized guidance for your business needs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl shadow-lg flex items-center gap-1.5"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(COMPANY_DETAILS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-1.5 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
