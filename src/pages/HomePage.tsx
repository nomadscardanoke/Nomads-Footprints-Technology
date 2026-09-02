import React, { useState } from 'react';
import { PageId } from '../types';
import {
  ArrowRight,
  Printer,
  Cpu,
  Globe,
  Palette,
  CheckCircle2,
  Phone,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  Layers,
  Award,
  Users,
  ShieldCheck,
  BadgePercent,
  Star,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Send,
  Zap,
} from 'lucide-react';
import {
  COMPANY_DETAILS,
  CORE_SERVICES,
  PROCESS_STEPS,
  WHY_CHOOSE_US,
  TESTIMONIALS,
} from '../data/siteData';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';

interface HomePageProps {
  onNavigate: (page: PageId, extraParam?: string) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // Quick estimator state
  const [estService, setEstService] = useState<'printing' | 'branding' | 'website' | 'app'>('website');
  const [estScale, setEstScale] = useState<'starter' | 'business' | 'enterprise'>('business');

  const getEstimatedCost = () => {
    if (estService === 'printing') {
      if (estScale === 'starter') return { price: 'KSh 1,500 – 4,500', time: '24-48 Hours', tag: 'Cards, Flyers & Posters' };
      if (estScale === 'business') return { price: 'KSh 7,500 – 18,000', time: '2-3 Days', tag: 'Banners, T-Shirts & Mugs' };
      return { price: 'KSh 25,000+', time: '3-5 Days', tag: 'Vehicle Wraps & 3D Signage' };
    }
    if (estService === 'branding') {
      if (estScale === 'starter') return { price: 'KSh 2,500 – 5,000', time: '2-3 Days', tag: 'Logo & Basic Colors' };
      if (estScale === 'business') return { price: 'KSh 7,500 – 15,000', time: '3-5 Days', tag: 'Full Identity & Stationery' };
      return { price: 'KSh 15,000 – 40,000', time: '5-7 Days', tag: 'Complete Corporate Manual' };
    }
    if (estService === 'website') {
      if (estScale === 'starter') return { price: 'KSh 25,000', time: '5-7 Days', tag: '5 Pages + WhatsApp + SEO' };
      if (estScale === 'business') return { price: 'KSh 45,000', time: '10-14 Days', tag: '10 Pages + CMS + Analytics' };
      return { price: 'KSh 75,000+', time: '2-3 Weeks', tag: 'E-Commerce Store & M-Pesa' };
    }
    // app
    if (estScale === 'starter') return { price: 'KSh 60,000', time: '2-3 Weeks', tag: 'Basic Android / iOS App' };
    if (estScale === 'business') return { price: 'KSh 120,000', time: '4-6 Weeks', tag: 'Database Sync & M-Pesa' };
    return { price: 'Custom Quote', time: 'Milestone Based', tag: 'On-demand & Custom APIs' };
  };

  const currentEst = getEstimatedCost();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Printer':
        return <Printer className="w-7 h-7 text-red-500" />;
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-red-500" />;
      case 'Globe':
        return <Globe className="w-7 h-7 text-red-500" />;
      case 'Palette':
        return <Palette className="w-7 h-7 text-red-500" />;
      default:
        return <Sparkles className="w-7 h-7 text-red-500" />;
    }
  };

  return (
    <div className="w-full bg-black text-neutral-100 overflow-hidden">
      {/* ===================== HERO SECTION (GEOMETRIC BALANCE) ===================== */}
      <section className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[85vh]">
          {/* Left Hero Content */}
          <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="border-l-4 border-red-600 pl-6 sm:pl-8">
              <h2 className="text-red-600 font-bold uppercase tracking-widest text-xs sm:text-sm mb-4">
                Digital Solutions &bull; Creative Design &bull; Business Growth
              </h2>
              
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] uppercase mb-6 tracking-tighter text-white">
                Build.<br />
                <span className="text-red-600">Brand.</span><br />
                Digitize.<br />
                <span className="text-red-600">Grow.</span>
              </h1>

              <p className="text-neutral-400 text-base sm:text-lg max-w-lg leading-relaxed mb-8">
                Professional technology, creative and business solutions designed to help your brand stand out and your business grow. We combine modern technology, physical branding, and digital platforms across Kenya.
              </p>

              <div className="flex items-center gap-2 text-red-500 font-handwriting text-xl sm:text-2xl italic mb-8">
                &ldquo;{COMPANY_DETAILS.slogan}&rdquo;
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  id="hero-explore-services-btn"
                  onClick={() => onNavigate('services')}
                  className="bg-white text-black px-8 py-4 font-bold uppercase text-xs sm:text-sm hover:bg-neutral-200 tracking-widest transition-colors rounded-none"
                >
                  Explore Services
                </button>
                
                <button
                  id="hero-get-quote-btn"
                  onClick={() => onOpenQuoteModal()}
                  className="bg-red-600 text-white px-8 py-4 font-bold uppercase text-xs sm:text-sm hover:bg-red-700 tracking-widest transition-colors rounded-none"
                >
                  Get a Quote
                </button>

                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(COMPANY_DETAILS.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 text-white px-8 py-4 font-bold uppercase text-xs sm:text-sm hover:bg-white/10 tracking-widest transition-colors rounded-none flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-red-600" />
                  <span>Talk to Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive 2x2 Grid */}
          <div className="w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 bg-neutral-950">
            {/* Cell 1: Printing & Branding */}
            <div
              onClick={() => onNavigate('services', 'printing-branding')}
              className="border-b sm:border-r border-white/10 p-8 flex flex-col justify-between hover:bg-red-600 group transition-all cursor-pointer min-h-[220px]"
            >
              <div>
                <div className="text-red-600 group-hover:text-white mb-4 transition-colors">
                  <Printer className="w-9 h-9" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-2">
                  Printing &amp; Branding
                </h3>
                <p className="text-xs text-neutral-400 group-hover:text-white/90 uppercase tracking-tight leading-relaxed">
                  Bring your brand to life with corporate stationery, apparel, banners, and 3D signage.
                </p>
              </div>
              <div className="mt-4 font-bold text-red-600 group-hover:text-white text-xs uppercase tracking-widest flex items-center gap-1">
                <span>Learn More</span>
                <span>&rarr;</span>
              </div>
            </div>

            {/* Cell 2: IT Consultancy */}
            <div
              onClick={() => onNavigate('services', 'it-consultancy')}
              className="border-b border-white/10 p-8 flex flex-col justify-between hover:bg-red-600 group transition-all cursor-pointer min-h-[220px]"
            >
              <div>
                <div className="text-red-600 group-hover:text-white mb-4 transition-colors">
                  <Cpu className="w-9 h-9" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-2">
                  IT Consultancy
                </h3>
                <p className="text-xs text-neutral-400 group-hover:text-white/90 uppercase tracking-tight leading-relaxed">
                  Reliable tech advice, security audits, and systems architecture designed for scale.
                </p>
              </div>
              <div className="mt-4 font-bold text-red-600 group-hover:text-white text-xs uppercase tracking-widest flex items-center gap-1">
                <span>Learn More</span>
                <span>&rarr;</span>
              </div>
            </div>

            {/* Cell 3: Websites & Apps */}
            <div
              onClick={() => onNavigate('services', 'web-development')}
              className="border-b sm:border-b-0 sm:border-r border-white/10 p-8 flex flex-col justify-between hover:bg-red-600 group transition-all cursor-pointer min-h-[220px]"
            >
              <div>
                <div className="text-red-600 group-hover:text-white mb-4 transition-colors">
                  <Globe className="w-9 h-9" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-2">
                  Websites &amp; Apps
                </h3>
                <p className="text-xs text-neutral-400 group-hover:text-white/90 uppercase tracking-tight leading-relaxed">
                  Modern responsive web platforms &amp; mobile apps with seamless M-Pesa integration.
                </p>
              </div>
              <div className="mt-4 font-bold text-red-600 group-hover:text-white text-xs uppercase tracking-widest flex items-center gap-1">
                <span>Learn More</span>
                <span>&rarr;</span>
              </div>
            </div>

            {/* Cell 4: Graphic Design */}
            <div
              onClick={() => onNavigate('services', 'graphic-design')}
              className="p-8 flex flex-col justify-between hover:bg-red-600 group transition-all cursor-pointer min-h-[220px]"
            >
              <div>
                <div className="text-red-600 group-hover:text-white mb-4 transition-colors">
                  <Palette className="w-9 h-9" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white mb-2">
                  Graphic Design
                </h3>
                <p className="text-xs text-neutral-400 group-hover:text-white/90 uppercase tracking-tight leading-relaxed">
                  Creative visual solutions, logo marks, corporate identity manuals, and digital ads.
                </p>
              </div>
              <div className="mt-4 font-bold text-red-600 group-hover:text-white text-xs uppercase tracking-widest flex items-center gap-1">
                <span>Learn More</span>
                <span>&rarr;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Trust Metrics Geometric Matrix */}
        <div className="border-t border-white/10 bg-neutral-950">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
            {[
              { num: '500+', label: 'Projects Delivered', sub: 'Across Kenya & East Africa' },
              { num: '24-48h', label: 'Fast Turnaround', sub: 'Express Printing & Delivery' },
              { num: '99.8%', label: 'Client Satisfaction', sub: 'High Quality Assurance' },
              { num: '47 Counties', label: 'Nationwide Reach', sub: 'Doorstep Courier Dispatch' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 border-r last:border-r-0 border-white/10 text-center flex flex-col justify-center"
              >
                <div className="font-heading font-black text-3xl sm:text-4xl text-red-600">
                  {stat.num}
                </div>
                <div className="font-bold text-xs text-white uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== OUR CORE SERVICES ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold tracking-widest text-red-600 uppercase flex items-center justify-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            END-TO-END CAPABILITIES
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
            OUR CORE SERVICES
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Explore our tailored solutions spanning tactile branding, smart IT infrastructure, modern web engineering, and visual communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CORE_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-neutral-950 border border-white/10 hover:border-red-600 p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 group rounded-none"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:border-red-600 transition-colors">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-xs font-bold text-red-500 bg-red-950/40 border border-red-900/50 px-3 py-1 uppercase tracking-wider">
                    {service.startingPrice}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-white group-hover:text-red-500 transition-colors uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Sub-services tags */}
                <div className="pt-2">
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
                    Popular Solutions:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.subServices.slice(0, 6).map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-neutral-900 text-neutral-300 px-2.5 py-1 border border-white/5 font-medium uppercase text-[10px] tracking-wider"
                      >
                        {sub}
                      </span>
                    ))}
                    {service.subServices.length > 6 && (
                      <span className="text-xs text-red-500 font-bold px-2 py-1 uppercase text-[10px] tracking-wider">
                        +{service.subServices.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('services', service.id)}
                  className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-500 flex items-center gap-1.5 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenQuoteModal(service.title)}
                  className="text-xs font-bold uppercase tracking-widest bg-white hover:bg-red-600 text-black hover:text-white px-4 py-2 transition-colors rounded-none"
                >
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== INTERACTIVE COST & TIMELINE ESTIMATOR ===================== */}
      <section className="py-16 bg-neutral-950 border-y border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5 text-red-600" />
              INSTANT BUDGET ESTIMATOR
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              ESTIMATE YOUR PROJECT IN SECONDS
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Select your required domain and scope level to preview estimated investments and turnaround times.
            </p>
          </div>

          <div className="bg-black border border-white/10 p-6 sm:p-8 space-y-6 rounded-none">
            {/* Step 1: Select Service */}
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                1. Select Service Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'printing', label: 'Printing & Materials', icon: Printer },
                  { id: 'branding', label: 'Graphic & Branding', icon: Palette },
                  { id: 'website', label: 'Website Development', icon: Globe },
                  { id: 'app', label: 'Mobile Application', icon: Cpu },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setEstService(s.id as any)}
                    className={`p-3 border text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1.5 transition-all rounded-none ${
                      estService === s.id
                        ? 'bg-red-600 border-red-600 text-white shadow-lg'
                        : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <s.icon className={`w-5 h-5 ${estService === s.id ? 'text-white' : 'text-red-600'}`} />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Scope */}
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
                2. Select Project Scale:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'starter', label: 'Starter / Solo', desc: 'Essential baseline features' },
                  { id: 'business', label: 'Business / SME', desc: 'Full commercial setup' },
                  { id: 'enterprise', label: 'Enterprise / Custom', desc: 'Advanced custom scope' },
                ].map((scale) => (
                  <button
                    key={scale.id}
                    onClick={() => setEstScale(scale.id as any)}
                    className={`p-3 border text-left transition-all rounded-none ${
                      estScale === scale.id
                        ? 'bg-neutral-900 border-red-600 text-white'
                        : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm uppercase tracking-wider">{scale.label}</div>
                    <div className="text-[10px] uppercase text-neutral-400 hidden sm:block mt-0.5">{scale.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Output Display */}
            <div className="p-6 bg-neutral-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 rounded-none">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
                  Estimated Investment &amp; Speed:
                </span>
                <div className="font-heading font-black text-2xl sm:text-3xl text-white">
                  {currentEst.price}
                </div>
                <div className="text-xs text-neutral-300 flex items-center gap-2 justify-center md:justify-start">
                  <span>Turnaround: <strong className="text-white">{currentEst.time}</strong></span>
                  <span>&bull;</span>
                  <span className="text-neutral-400 uppercase text-[10px] tracking-wider">{currentEst.tag}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenQuoteModal(estService.toUpperCase())}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-none flex items-center gap-1.5 transition-colors"
                >
                  <span>Lock In Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE NOMADS FOOTPRINTS TECHNOLOGY? ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold tracking-widest text-red-600 uppercase flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            OUR COMPETITIVE ADVANTAGE
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
            WHY CHOOSE NOMADS FOOTPRINTS TECHNOLOGY?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            We are dedicated to moving your business forward through disciplined craft, technological reliability, and genuine customer care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-950 border border-white/10 hover:border-red-600 p-6 text-center space-y-3 transition-all rounded-none group"
            >
              <div className="w-10 h-10 bg-neutral-900 border border-white/10 text-red-600 flex items-center justify-center mx-auto group-hover:border-red-600 transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-sm text-white group-hover:text-red-500 transition-colors uppercase tracking-wider">
                {item.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== OUR 6-STEP PROCESS ===================== */}
      <section className="py-20 bg-neutral-950 border-y border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-bold tracking-widest text-red-600 uppercase flex items-center justify-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              PROVEN WORKFLOW
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
              OUR PROCESS
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
              From the initial consultation to final delivery and long-term support, here is how we ensure project excellence every step of the way.
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROCESS_STEPS.map((p, idx) => (
              <div
                key={p.step}
                onClick={() => setActiveProcessStep(idx)}
                className={`p-6 border transition-all cursor-pointer rounded-none relative ${
                  activeProcessStep === idx
                    ? 'bg-neutral-900 border-red-600 shadow-xl'
                    : 'bg-black border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading font-black text-3xl text-red-600">
                    {p.step}
                  </span>
                  <div className="w-8 h-8 bg-neutral-900 border border-white/10 flex items-center justify-center text-red-600">
                    <FileCheck className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-heading font-black text-base text-white mb-2 uppercase tracking-wider">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FEATURED SERVICES SHOWCASE ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold tracking-widest text-red-600 uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            WHAT WE DO BEST
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
            FEATURED SERVICES
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Comprehensive creative, physical printing, and digital engineering capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'BUSINESS BRANDING',
              desc: 'Create a professional and consistent identity for your business with logos, stationery, guidelines, and signage.',
              action: 'Get Brand Identity',
              serviceParam: 'Branding',
            },
            {
              title: 'WEBSITE DEVELOPMENT',
              desc: 'Take your business online with a modern, lightning-fast and responsive website equipped with M-Pesa payments.',
              action: 'Build Your Website',
              serviceParam: 'Website Development',
            },
            {
              title: 'MOBILE APP DEVELOPMENT',
              desc: 'Turn your ideas into practical, scalable mobile applications for Android & iOS with cloud synchronization.',
              action: 'Develop Mobile App',
              serviceParam: 'Mobile App Development',
            },
            {
              title: 'CORPORATE PRINTING',
              desc: 'Professional printing solutions for businesses: cards, brochures, banners, stickers, uniforms, and profiles.',
              action: 'Order Corporate Print',
              serviceParam: 'Printing & Branding',
            },
            {
              title: 'IT CONSULTANCY',
              desc: 'Make better technology decisions with professional IT infrastructure guidance, networking, and security audits.',
              action: 'Book IT Consultation',
              serviceParam: 'IT Consultancy',
            },
            {
              title: 'GRAPHIC DESIGN',
              desc: 'Transform complex ideas into compelling visual communication: flyers, posters, pitch decks, and digital ads.',
              action: 'Request Graphic Design',
              serviceParam: 'Graphic Design',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-950 border border-white/10 hover:border-red-600 p-6 flex flex-col justify-between group transition-all rounded-none"
            >
              <div className="space-y-3">
                <div className="w-7 h-7 bg-neutral-900 border border-white/10 text-red-600 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="font-heading font-black text-base text-white group-hover:text-red-500 transition-colors uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/10">
                <button
                  onClick={() => onOpenQuoteModal(item.serviceParam)}
                  className="w-full bg-neutral-900 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest py-2.5 rounded-none border border-white/10 hover:border-red-600 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{item.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== TESTIMONIALS CAROUSEL & SOCIAL PROOF ===================== */}
      <TestimonialsCarousel
        onOpenQuoteModal={onOpenQuoteModal}
        onNavigate={onNavigate}
      />

      {/* ===================== CALL TO ACTION ===================== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-black text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="text-xs font-extrabold tracking-widest text-red-600 uppercase bg-neutral-950 border border-red-600/40 px-4 py-1.5 inline-block rounded-none">
            READY TO BUILD YOUR BRAND?
          </span>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase leading-tight tracking-tight">
            YOUR IDEA. OUR EXPERTISE. LET&apos;S BUILD IT.
          </h2>

          <p className="font-heading font-black text-base sm:text-lg text-red-600 tracking-widest uppercase">
            PRINT. BRAND. DESIGN. DEVELOP. GROW.
          </p>

          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            From a simple business card to a complete digital platform, Nomads Footprints Technology provides the creative and technological expertise you need to move forward.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onOpenQuoteModal()}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-none shadow-lg transition-colors flex items-center gap-2"
            >
              <span>GET A FREE QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-none transition-colors flex items-center gap-2"
            >
              <span>CONTACT US</span>
              <Phone className="w-4 h-4 text-red-600" />
            </button>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(COMPANY_DETAILS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-7 py-4 rounded-none transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
