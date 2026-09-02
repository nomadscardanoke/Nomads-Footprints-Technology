import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, ServiceCategory } from '../types';
import {
  Printer,
  Cpu,
  Globe,
  Smartphone,
  Palette,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Layers,
  Users,
  ShieldCheck,
  Zap,
  TrendingUp,
  Tag,
} from 'lucide-react';
import { CORE_SERVICES, COMPANY_DETAILS } from '../data/siteData';

interface ServicesPageProps {
  onNavigate: (page: PageId, extraParam?: string) => void;
  onOpenQuoteModal: (service?: string) => void;
  initialCategory?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  initialCategory,
}) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>(() => {
    if (initialCategory) {
      const match = CORE_SERVICES.find(
        (s) =>
          s.id === initialCategory ||
          s.title.toLowerCase().includes(initialCategory.toLowerCase())
      );
      if (match) return match.id;
    }
    return 'printing-branding';
  });

  const currentService = CORE_SERVICES.find((s) => s.id === activeTab) || CORE_SERVICES[0];

  const getTabIcon = (id: ServiceCategory) => {
    switch (id) {
      case 'printing-branding':
        return <Printer className="w-4 h-4" />;
      case 'it-consultancy':
        return <Cpu className="w-4 h-4" />;
      case 'web-development':
        return <Globe className="w-4 h-4" />;
      case 'app-development':
        return <Smartphone className="w-4 h-4" />;
      case 'graphic-design':
        return <Palette className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Section with Motion Fade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-neutral-900 border border-white/10 text-red-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            COMPREHENSIVE CAPABILITIES
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            OUR CORE SERVICES
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Discover our full spectrum of creative design, commercial printing, digital systems, and IT consultancy services built for tangible business growth across Kenya.
          </p>
        </motion.div>

        {/* Scroll-Triggered Overview Service Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400">
              <Layers className="w-4 h-4 text-red-500" />
              <span>All Service Disciplines</span>
            </div>
            <span className="text-xs text-neutral-500 font-mono">
              5 Core Divisions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_SERVICES.map((srv, index) => {
              const isSelected = activeTab === srv.id;
              return (
                <motion.div
                  key={srv.id}
                  id={`service-card-${srv.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`bg-black border transition-all flex flex-col justify-between group shadow-xl ${
                    isSelected
                      ? 'border-red-600 ring-1 ring-red-600/40'
                      : 'border-white/10 hover:border-red-600/60'
                  }`}
                >
                  <div>
                    {/* Card Media Header */}
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-neutral-900">
                      <img
                        src={srv.heroImage}
                        alt={srv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 shadow-md flex items-center gap-1.5">
                          {getTabIcon(srv.id)}
                          <span>{srv.title.split('&')[0].trim()}</span>
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] bg-neutral-950/90 backdrop-blur-sm border border-white/10 text-neutral-200 px-3 py-1.5">
                        <span className="text-neutral-400 font-medium">Starts from</span>
                        <span className="text-red-400 font-bold font-mono">{srv.startingPrice}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <h3 className="font-heading font-black text-lg sm:text-xl text-white group-hover:text-red-500 transition-colors uppercase leading-snug">
                        {srv.title}
                      </h3>

                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {srv.shortDescription}
                      </p>

                      {/* Deliverables snippet */}
                      <div className="space-y-1.5 pt-2 border-t border-white/10">
                        {srv.subServices.slice(0, 3).map((sub, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span className="truncate">{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 sm:p-6 pt-0 mt-auto flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveTab(srv.id);
                        const el = document.getElementById('service-detail-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`flex-1 py-2.5 px-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border transition-all ${
                        isSelected
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'bg-neutral-900 hover:bg-neutral-800 border-white/10 text-neutral-200 hover:text-white'
                      }`}
                    >
                      <span>Explore Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenQuoteModal(srv.title)}
                      className="py-2.5 px-3 bg-neutral-950 hover:bg-red-600 border border-white/10 hover:border-red-600 text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      title="Request quote for this service"
                    >
                      Quote
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detailed Service Division View */}
        <div id="service-detail-section" className="space-y-8 pt-8">
          {/* Section Divider & Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              DEEP-DIVE SERVICE SPECIFICATIONS
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              INTERACTIVE SERVICE EXPLORER
            </h2>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
            {CORE_SERVICES.map((srv) => (
              <button
                key={srv.id}
                id={`tab-btn-${srv.id}`}
                onClick={() => setActiveTab(srv.id)}
                className={`px-4 py-3 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 border ${
                  activeTab === srv.id
                    ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-950/50'
                    : 'bg-black border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                }`}
              >
                {getTabIcon(srv.id)}
                <span>{srv.title}</span>
              </button>
            ))}
          </div>

          {/* Animated Active Service Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-black border border-white/10 p-6 sm:p-10 lg:p-12 space-y-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Hero Banner for Tab */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/10 pb-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-7 space-y-4"
                >
                  <span className="text-xs font-extrabold text-red-500 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Selected Division: {currentService.title}
                  </span>
                  <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase">
                    {currentService.title}
                  </h2>
                  <p className="font-heading text-base sm:text-lg text-red-400 font-semibold italic">
                    &ldquo;{currentService.tagline}&rdquo;
                  </p>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {currentService.shortDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    {activeTab === 'printing-branding' && (
                      <button
                        onClick={() => onNavigate('shop')}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 shadow-lg flex items-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>ORDER PRINTING &rarr;</span>
                      </button>
                    )}

                    {activeTab === 'it-consultancy' && (
                      <button
                        onClick={() => onOpenQuoteModal('IT Consultancy')}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 shadow-lg flex items-center gap-2"
                      >
                        <span>REQUEST IT CONSULTATION &rarr;</span>
                      </button>
                    )}

                    {activeTab === 'web-development' && (
                      <button
                        onClick={() => onOpenQuoteModal('Website Development')}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 shadow-lg flex items-center gap-2"
                      >
                        <span>START YOUR WEBSITE &rarr;</span>
                      </button>
                    )}

                    {activeTab === 'app-development' && (
                      <button
                        onClick={() => onOpenQuoteModal('Mobile App Development')}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 shadow-lg flex items-center gap-2"
                      >
                        <span>DISCUSS YOUR APP IDEA &rarr;</span>
                      </button>
                    )}

                    {activeTab === 'graphic-design' && (
                      <button
                        onClick={() => onOpenQuoteModal('Graphic Design')}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 shadow-lg flex items-center gap-2"
                      >
                        <span>REQUEST A DESIGN &rarr;</span>
                      </button>
                    )}

                    <button
                      onClick={() => onNavigate('pricing')}
                      className="bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-xs uppercase tracking-widest px-5 py-3.5 border border-white/10"
                    >
                      View Packages
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-5"
                >
                  <div className="relative border border-white/10 shadow-2xl h-64 sm:h-72 overflow-hidden bg-neutral-900">
                    <img
                      src={currentService.heroImage}
                      alt={currentService.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs bg-black/90 backdrop-blur-md p-3 border border-white/10">
                      <span className="text-neutral-400 font-medium uppercase tracking-wider text-[10px]">Starting Investment</span>
                      <span className="text-red-400 font-bold font-mono text-sm">
                        {currentService.startingPrice}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Tab Specific Content Breakdowns with Scroll Animations */}

              {/* 1. PRINTING & BRANDING */}
              {activeTab === 'printing-branding' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Printing Services Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="bg-neutral-950 border border-white/10 p-6 sm:p-8 space-y-4"
                    >
                      <h3 className="font-heading font-extrabold text-lg text-white uppercase flex items-center gap-2 border-b border-white/10 pb-3">
                        <Printer className="w-5 h-5 text-red-500" />
                        <span>Commercial Printing Capabilities</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {currentService.subServices.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Branding Services Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="bg-neutral-950 border border-white/10 p-6 sm:p-8 space-y-4"
                    >
                      <h3 className="font-heading font-extrabold text-lg text-white uppercase flex items-center gap-2 border-b border-white/10 pb-3">
                        <Palette className="w-5 h-5 text-red-500" />
                        <span>Corporate Branding Solutions</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {currentService.brandingServices?.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* 2. IT CONSULTANCY */}
              {activeTab === 'it-consultancy' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Consultancy Services Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="bg-neutral-950 border border-white/10 p-6 sm:p-8 space-y-4"
                    >
                      <h3 className="font-heading font-extrabold text-lg text-white uppercase flex items-center gap-2 border-b border-white/10 pb-3">
                        <Cpu className="w-5 h-5 text-red-500" />
                        <span>IT Consultancy &amp; Infrastructure</span>
                      </h3>
                      <div className="space-y-2.5 pt-2">
                        {currentService.subServices.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Who We Serve Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="bg-neutral-950 border border-white/10 p-6 sm:p-8 space-y-4"
                    >
                      <h3 className="font-heading font-extrabold text-lg text-white uppercase flex items-center gap-2 border-b border-white/10 pb-3">
                        <Users className="w-5 h-5 text-red-500" />
                        <span>Target Sectors &amp; Clients</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {currentService.whoWeServe?.map((client, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.06 }}
                            className="p-3 bg-neutral-900 border border-white/10 text-xs sm:text-sm text-neutral-200 flex items-center gap-2"
                          >
                            <Zap className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{client}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* 3. WEBSITE DEVELOPMENT */}
              {activeTab === 'web-development' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Website Solutions Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="bg-neutral-950 border border-white/10 p-6 sm:p-8 space-y-4"
                    >
                      <h3 className="font-heading font-extrabold text-lg text-white uppercase flex items-center gap-2 border-b border-white/10 pb-3">
                        <Globe className="w-5 h-5 text-red-500" />
                        <span>Website Solutions &amp; Platforms</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {currentService.subServices.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Website Features Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="bg-neutral-950 border border-white/10 p-6 sm:p-8 space-y-4"
                    >
                      <h3 className="font-heading font-extrabold text-lg text-white uppercase flex items-center gap-2 border-b border-white/10 pb-3">
                        <Sparkles className="w-5 h-5 text-red-500" />
                        <span>Standard Technical Features</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {currentService.features?.map((feat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{feat}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* 4. MOBILE APP DEVELOPMENT */}
              {activeTab === 'app-development' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* App Services Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="bg-neutral-950 border border-white/10 p-6 sm:p-8 space-y-4"
                    >
                      <h3 className="font-heading font-extrabold text-lg text-white uppercase flex items-center gap-2 border-b border-white/10 pb-3">
                        <Smartphone className="w-5 h-5 text-red-500" />
                        <span>Native &amp; Cross-Platform Apps</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {currentService.subServices.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* App Development Process Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="bg-neutral-950 border border-white/10 p-6 sm:p-8 space-y-4"
                    >
                      <h3 className="font-heading font-extrabold text-lg text-white uppercase flex items-center gap-2 border-b border-white/10 pb-3">
                        <Layers className="w-5 h-5 text-red-500" />
                        <span>App Delivery Stages</span>
                      </h3>
                      <div className="space-y-3 pt-2">
                        {currentService.process?.map((step, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.08 }}
                            className="p-3 bg-neutral-900 border border-white/10 text-xs sm:text-sm font-semibold text-neutral-200 flex items-center gap-3"
                          >
                            <span className="w-6 h-6 bg-red-600 text-white text-xs flex items-center justify-center font-bold shrink-0">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* 5. GRAPHIC DESIGN */}
              {activeTab === 'graphic-design' && (
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="bg-neutral-950 border border-white/10 p-6 sm:p-8 space-y-4"
                  >
                    <h3 className="font-heading font-extrabold text-lg text-white uppercase flex items-center gap-2 border-b border-white/10 pb-3">
                      <Palette className="w-5 h-5 text-red-500" />
                      <span>Graphic Design Deliverables Matrix</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
                      {currentService.subServices.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.25, delay: idx * 0.04 }}
                          className="p-3 bg-neutral-900 border border-white/10 text-xs sm:text-sm text-neutral-200 flex items-center gap-2 hover:border-red-600 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Bottom Consultation CTA Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-neutral-950 border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-heading font-extrabold text-base sm:text-lg text-white uppercase">
                    Need a Custom Combination or Specialized Project?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    We engineer multidisciplinary solutions customized to your organization&apos;s budget and strict delivery timelines.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenQuoteModal(currentService.title)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 shadow-lg"
                  >
                    Get Custom Quote
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

