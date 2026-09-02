import React, { useState } from 'react';
import { PageId } from '../types';
import { PRICING_PLANS, COMPANY_DETAILS } from '../data/siteData';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'design' | 'website' | 'app'>('all');

  const filteredPlans =
    activeCategory === 'all'
      ? PRICING_PLANS
      : PRICING_PLANS.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-800/40 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            TRANSPARENT &amp; COMPETITIVE
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            SIMPLE, FLEXIBLE PACKAGES
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Our prices depend on project requirements, quantity, complexity and specifications. We provide customized quotations for larger or specialized projects.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Packages' },
            { id: 'design', label: 'Graphic Design' },
            { id: 'website', label: 'Websites' },
            { id: 'app', label: 'Mobile Apps' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all border ${
                activeCategory === tab.id
                  ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-950/60'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-neutral-900 border rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative group ${
                plan.popular
                  ? 'border-red-600 shadow-2xl shadow-red-950/60 scale-[1.02]'
                  : 'border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span
                  className={`absolute -top-3.5 right-6 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md ${
                    plan.popular
                      ? 'bg-red-600 text-white'
                      : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-400 block mb-1">
                    {plan.category === 'design'
                      ? 'GRAPHIC DESIGN'
                      : plan.category === 'website'
                      ? 'WEBSITE PACKAGE'
                      : 'MOBILE APPLICATION'}
                  </span>
                  <h3 className="font-heading font-black text-2xl text-white uppercase">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    {plan.suitableFor}
                  </p>
                </div>

                {/* Price block */}
                <div className="p-4 bg-neutral-950 rounded-2xl border border-neutral-800">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                    Starting Investment:
                  </span>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-red-500">
                    {plan.price}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-1">
                    <Clock className="w-3.5 h-3.5 text-red-400" />
                    <span>Est. Turnaround: <strong className="text-neutral-200">{plan.turnaround}</strong></span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2.5">
                  <p className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    Included Features:
                  </p>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-8 mt-6 border-t border-neutral-800 space-y-2">
                <button
                  onClick={() => onOpenQuoteModal(`${plan.name} (${plan.price})`)}
                  className={`w-full font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-950'
                      : 'bg-neutral-950 hover:bg-red-600 text-white border border-neutral-800 hover:border-red-600'
                  }`}
                >
                  <span>GET A QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-neutral-500 text-center">
                  Prices are starting prices and may vary according to project requirements.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Need a Custom System Banner */}
        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="font-heading font-extrabold text-2xl text-white uppercase">
              Looking for a Bespoke Enterprise Solution?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We design custom portals, high-security databases, school management systems, multi-branch network cabling, and nationwide corporate vehicle wraps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal('Custom Enterprise Scope')}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg"
            >
              Request Custom Proposal
            </button>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent('Hello Nomads, I would like to discuss a custom package for our organization.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
