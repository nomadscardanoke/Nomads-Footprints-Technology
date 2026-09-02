import React from 'react';
import { PageId } from '../types';
import Logo from './Logo';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/siteData';

interface FooterProps {
  onNavigate: (page: PageId, extraParam?: string) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { label: 'WhatsApp', href: `https://wa.me/${COMPANY_DETAILS.whatsappNumber}` },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'TikTok', href: 'https://tiktok.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-white/10 relative overflow-hidden">
      {/* Top process bar matching geometric balance */}
      <div className="bg-black border-b border-white/5 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest">Our Proven Workflow</span>
              <span className="text-xs uppercase font-bold text-white mt-0.5 tracking-wider">
                01 Discover &bull; 02 Plan &bull; 03 Create &bull; 04 Review &bull; 05 Deliver &bull; 06 Support
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest">Customer Success</span>
              <span className="text-xs uppercase font-bold text-white mt-0.5 tracking-wider">
                99.8% Satisfaction &bull; 500+ Projects &bull; 47 Counties
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest">Direct Desk:</span>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">+254 752 634 016</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div onClick={() => handleNav('home')} className="inline-block cursor-pointer">
              <Logo variant="full" size="md" />
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Nomads Footprints Technology is a technology and creative solutions company providing professional printing and branding, IT consultancy, website and mobile application development, and graphic design.
            </p>

            <div className="p-4 bg-neutral-900 border border-white/5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phone}`} className="hover:text-red-500 font-bold">
                  {COMPANY_DETAILS.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-red-500">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{COMPANY_DETAILS.location}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{COMPANY_DETAILS.hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs tracking-widest uppercase border-l-2 border-red-600 pl-2.5">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Our Services' },
                { id: 'portfolio', label: 'Portfolio & Work' },
                { id: 'shop', label: 'Online Shop' },
                { id: 'pricing', label: 'Packages & Pricing' },
                { id: 'blog', label: 'Blog & Insights' },
                { id: 'contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id as PageId)}
                    className="text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1.5 uppercase text-[11px] font-medium tracking-wider"
                  >
                    <ArrowRight className="w-3 h-3 text-red-600 opacity-60" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs tracking-widest uppercase border-l-2 border-red-600 pl-2.5">
              OUR SERVICES
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                'Printing & Branding',
                'IT Consultancy',
                'Website Development',
                'Mobile App Development',
                'Graphic Design',
                'Corporate Stationery',
                'Vehicle Branding & Signage',
              ].map((srv, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      onNavigate('services', srv);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1.5 uppercase text-[11px] font-medium tracking-wider"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-red-600 opacity-70" />
                    <span>{srv}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support & Call-to-action */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs tracking-widest uppercase border-l-2 border-red-600 pl-2.5">
              CUSTOMER SUPPORT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="text-red-600 font-bold uppercase text-[11px] tracking-wider hover:underline flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3" />
                  <span>Get a Free Quote</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="text-neutral-400 hover:text-red-500 transition-colors uppercase text-[11px] tracking-wider"
                >
                  Order Printing Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faqs')}
                  className="text-neutral-400 hover:text-red-500 transition-colors uppercase text-[11px] tracking-wider"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-neutral-400 hover:text-red-500 transition-colors uppercase text-[11px] tracking-wider"
                >
                  Help Desk & Contact
                </button>
              </li>
            </ul>

            {/* Quick Action Button */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(COMPANY_DETAILS.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-none border border-emerald-500 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: +254 752 634 016</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social media badges with Geometric Square Boxes */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-neutral-400">
            <span className="text-white uppercase tracking-widest text-[10px] font-bold">CONNECT:</span>
            <div className="flex space-x-2 text-white/60">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 border border-white/20 flex items-center justify-center text-[10px] font-bold hover:border-red-600 hover:text-red-600 transition-colors"
              >
                FB
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 border border-white/20 flex items-center justify-center text-[10px] font-bold hover:border-red-600 hover:text-red-600 transition-colors"
              >
                IG
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 border border-white/20 flex items-center justify-center text-[10px] font-bold hover:border-red-600 hover:text-red-600 transition-colors"
              >
                TW
              </a>
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 border border-white/20 flex items-center justify-center text-[10px] font-bold hover:border-red-600 hover:text-red-600 transition-colors"
              >
                WA
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 border border-white/20 flex items-center justify-center text-[10px] font-bold hover:border-red-600 hover:text-red-600 transition-colors"
              >
                IN
              </a>
            </div>
          </div>

          <div className="text-[11px] text-neutral-500 text-center md:text-right uppercase tracking-wider">
            &copy; 2026 Nomads Footprints Technology. All Rights Reserved.
          </div>
        </div>

        {/* Legal links */}
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-center sm:justify-between text-[11px] text-neutral-500 gap-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-neutral-300 transition-colors uppercase tracking-wider text-[10px]"
            >
              Terms &amp; Conditions
            </button>
            <span>&bull;</span>
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-neutral-300 transition-colors uppercase tracking-wider text-[10px]"
            >
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button
              onClick={() => handleNav('refund')}
              className="hover:text-neutral-300 transition-colors uppercase tracking-wider text-[10px]"
            >
              Refund Policy
            </button>
          </div>

          <div className="text-red-600 font-handwriting italic font-semibold text-sm">
            &ldquo;Your brand is in good hands.&rdquo;
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
