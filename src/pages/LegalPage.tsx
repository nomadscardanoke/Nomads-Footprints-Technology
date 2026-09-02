import React, { useState } from 'react';
import { PageId } from '../types';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/siteData';

interface LegalPageProps {
  pageType: 'terms' | 'privacy' | 'refund';
  onNavigate: (page: PageId) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ pageType, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'refund'>(pageType);

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Tab switch */}
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
          {[
            { id: 'terms', label: 'Terms & Conditions' },
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'refund', label: 'Refund Policy' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                activeTab === t.id
                  ? 'bg-red-600 text-white'
                  : 'text-neutral-400 hover:text-white bg-neutral-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-6 text-sm sm:text-base text-neutral-300 leading-relaxed">
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase">
                Terms &amp; Conditions
              </h1>
              <p className="text-xs text-neutral-400">Effective Date: January 1, 2026</p>
              
              <h3 className="font-heading font-bold text-lg text-white mt-4">1. Quotations and Orders</h3>
              <p>
                All quotations issued by Nomads Footprints Technology are valid for 30 days unless otherwise specified. Production commences upon confirmation of artwork and receipt of the agreed deposit or milestone payment.
              </p>

              <h3 className="font-heading font-bold text-lg text-white mt-4">2. Artwork Approval &amp; Proofing</h3>
              <p>
                Clients are responsible for proofreading and confirming all text, spelling, colors, and layout before giving final print approval. Nomads Footprints Technology is not liable for errors present in client-approved proofs.
              </p>

              <h3 className="font-heading font-bold text-lg text-white mt-4">3. Delivery &amp; Transit</h3>
              <p>
                While we partner with reputable courier services across all 47 counties in Kenya, transit timelines provided are estimates. We ensure secure packaging and immediate tracking dispatch.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase">
                Privacy Policy
              </h1>
              <p className="text-xs text-neutral-400">Effective Date: January 1, 2026</p>
              
              <h3 className="font-heading font-bold text-lg text-white mt-4">1. Information Collection</h3>
              <p>
                We collect essential contact and project information (such as name, phone number, email, and brand assets) exclusively to provide quotation, production, billing, and technical development services.
              </p>

              <h3 className="font-heading font-bold text-lg text-white mt-4">2. Data Security &amp; Confidentiality</h3>
              <p>
                All client proprietary artwork, database structures, business concepts, and credentials shared with Nomads Footprints Technology are protected with strict confidentiality and never sold to third parties.
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-4">
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase">
                Refund &amp; Quality Guarantee Policy
              </h1>
              <p className="text-xs text-neutral-400">Effective Date: January 1, 2026</p>
              
              <h3 className="font-heading font-bold text-lg text-white mt-4">1. Quality Assurance Guarantee</h3>
              <p>
                If a printed batch deviates substantially from the agreed and approved digital proof due to a manufacturing defect on our part, we will promptly reprint the affected items at zero additional cost to the client.
              </p>

              <h3 className="font-heading font-bold text-lg text-white mt-4">2. Software &amp; Digital Services</h3>
              <p>
                Digital software and website development projects are executed in milestones with structured client review phases. Deposit payments cover committed engineering hours and initial server provisioning.
              </p>
            </div>
          )}

          <div className="pt-6 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
            <span>Contact: {COMPANY_DETAILS.email}</span>
            <span>Tel: {COMPANY_DETAILS.displayPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
