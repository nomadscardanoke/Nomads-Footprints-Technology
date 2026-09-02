import React, { useState } from 'react';
import {
  X,
  Send,
  Upload,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileCheck,
  Calendar,
  Building,
  Sparkles,
} from 'lucide-react';
import { QuoteFormData } from '../types';
import { COMPANY_DETAILS } from '../data/siteData';
import confetti from 'canvas-confetti';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Website Development',
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    serviceRequired: initialService,
    projectDescription: '',
    quantity: '1',
    preferredDeliveryDate: '',
    budgetRange: 'KSh 25,000 – KSh 50,000',
    fileName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const servicesList = [
    'Printing & Branding',
    'Graphic Design',
    'Website Development',
    'Mobile App Development',
    'IT Consultancy',
    'Corporate Stationery',
    'Vehicle Branding & Signage',
    'Other Custom Solution',
  ];

  const budgetOptions = [
    'Under KSh 10,000',
    'KSh 10,000 – KSh 25,000',
    'KSh 25,000 – KSh 50,000',
    'KSh 50,000 – KSh 100,000',
    'KSh 100,000 – KSh 250,000',
    'KSh 250,000+',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        fileName: e.target.files![0].name,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E50914', '#ffffff', '#000000', '#10B981'],
      });
    }, 1000);
  };

  const generateWhatsAppQuoteText = () => {
    const text = [
      `*NEW QUOTATION REQUEST - NOMADS FOOTPRINTS TECHNOLOGY*`,
      `Client: ${formData.fullName}`,
      `Company: ${formData.company || 'Individual'}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email || 'N/A'}`,
      `Service: ${formData.serviceRequired}`,
      `Budget Range: ${formData.budgetRange}`,
      `Quantity/Scale: ${formData.quantity || 'Standard'}`,
      `Delivery Date: ${formData.preferredDeliveryDate || 'As agreed'}`,
      `Details: ${formData.projectDescription}`,
      formData.fileName ? `Uploaded File: ${formData.fileName}` : '',
      `\nPlease send back a customized quotation. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');

    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-neutral-950 border border-white/10 shadow-2xl overflow-hidden text-neutral-100 my-8 rounded-none">
        {/* Header */}
        <div className="bg-black p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-red-600 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              Fast &bull; Transparent &bull; Tailored
            </span>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white mt-1 uppercase tracking-tight">
              REQUEST A FREE QUOTE
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Tell us what you need and our team will prepare a formal proposal.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-2 bg-neutral-900 hover:bg-neutral-800 border border-white/10 rounded-none transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto bg-neutral-950">
          {!isSubmitted ? (
            <form id="quotation-request-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Kennedy Ochieng"
                    className="w-full bg-black border border-white/10 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600 transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-red-600" />
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Ventures Ltd"
                    className="w-full bg-black border border-white/10 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600 transition-colors rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-red-600" />
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 712 345 678"
                    className="w-full bg-black border border-white/10 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600 transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.co.ke"
                    className="w-full bg-black border border-white/10 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600 transition-colors rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Service Required *
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full bg-black border border-white/10 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600 transition-colors rounded-none"
                  >
                    {servicesList.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Estimated Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-black border border-white/10 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600 transition-colors rounded-none"
                  >
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Estimated Quantity / Scope
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 500 pcs / 5-page website / 1 app"
                    className="w-full bg-black border border-white/10 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600 transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-red-600" />
                    Preferred Delivery Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDeliveryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredDeliveryDate: e.target.value })
                    }
                    className="w-full bg-black border border-white/10 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600 transition-colors rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Project Description &amp; Specifications *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.projectDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, projectDescription: e.target.value })
                  }
                  placeholder="Describe your design, printing specifications, tech stack, pages needed, or business goals in detail..."
                  className="w-full bg-black border border-white/10 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600 transition-colors rounded-none"
                />
              </div>

              {/* File upload dropzone */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Upload Artwork / Reference Document (Optional)
                </label>
                <label className="border border-dashed border-white/20 hover:border-red-600 p-4 flex flex-col items-center justify-center cursor-pointer bg-black transition-colors rounded-none">
                  <Upload className="w-5 h-5 text-neutral-400 mb-1" />
                  <span className="text-xs text-neutral-300 font-medium uppercase tracking-wider text-[11px]">
                    {formData.fileName ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <FileCheck className="w-4 h-4" /> {formData.fileName}
                      </span>
                    ) : (
                      'Click or Drag & Drop (PDF, AI, PNG, PSD, DOCX - Up to 50MB)'
                    )}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.ai,.psd,.png,.jpg,.jpeg,.zip,.docx"
                  />
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-none uppercase text-xs tracking-widest shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'SUBMIT REQUEST'}</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${generateWhatsAppQuoteText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-5 rounded-none uppercase text-xs tracking-widest shadow-md transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant via WhatsApp</span>
                </a>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-neutral-900 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-xl rounded-none">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
                  Thank You for Contacting Nomads Footprints Technology!
                </h4>
                <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  We have received your quotation request for{' '}
                  <strong className="text-red-500">{formData.serviceRequired}</strong>. Our team is
                  reviewing your project specifications and will get back to you promptly with an
                  itemized quote and next steps.
                </p>
              </div>

              {/* Direct WhatsApp acceleration */}
              <div className="bg-black p-5 border border-white/10 max-w-lg mx-auto text-left space-y-3 rounded-none">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <MessageCircle className="w-4 h-4" />
                  <span>Need an Immediate Response?</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Forward your quote request directly to our Senior Project Engineer on WhatsApp (+254 752 634 016) for fast-track processing:
                </p>
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${generateWhatsAppQuoteText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-none uppercase text-xs tracking-widest shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Forward Details to WhatsApp Now</span>
                </a>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-none"
                >
                  Done &amp; Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
