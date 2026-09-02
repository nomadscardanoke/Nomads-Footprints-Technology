import React from 'react';
import { PageId } from '../types';
import Logo from '../components/Logo';
import {
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  Shield,
  Zap,
  Users,
  Award,
  ArrowRight,
  MapPin,
  MessageCircle,
  Building,
  Headphones,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/siteData';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const values = [
    {
      title: 'Innovation',
      desc: 'We embrace new ideas, cutting-edge technologies, and inventive creative approaches to keep your business ahead of the competition.',
      icon: Zap,
    },
    {
      title: 'Quality',
      desc: 'We strive for uncompromising professional standards, optical precision, and robust engineering in everything we deliver.',
      icon: Award,
    },
    {
      title: 'Integrity',
      desc: 'We build enduring commercial relationships based on honesty, transparent pricing, data privacy, and mutual trust.',
      icon: Shield,
    },
    {
      title: 'Customer Satisfaction',
      desc: 'Our clients’ operational goals and business objectives remain steadfast at the very centre of our daily work.',
      icon: Users,
    },
    {
      title: 'Reliability',
      desc: 'We aim to deliver what we promise, exactly when we promise it—without excuses or hidden cost overruns.',
      icon: CheckCircle2,
    },
    {
      title: 'Continuous Improvement',
      desc: 'We continually refine our technical skills, modern production machinery, and design methodologies to bring superior value.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 py-12 sm:py-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-800/40 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            ABOUT NOMADS FOOTPRINTS TECHNOLOGY
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            Technology, Creativity &amp; Solutions That Move Your Business Forward
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            We help individuals, businesses, organizations and institutions turn ideas into professional, practical and impactful solutions.
          </p>
        </div>

        {/* Big Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
              <p>
                <strong className="text-white font-semibold">Nomads Footprints Technology</strong> is a technology and creative solutions company providing professional printing and branding, IT consultancy, website and mobile application development, and graphic design services.
              </p>
              <p>
                Our approach brings together technology, creativity and practical business understanding to deliver solutions that help our clients communicate better, operate more effectively and build stronger brands.
              </p>
              <p>
                From a single box of executive business cards to enterprise cloud networks and bespoke mobile applications, we treat every single project with the utmost precision.
              </p>
            </div>

            {/* Slogan badge */}
            <div className="p-5 rounded-2xl bg-neutral-900 border border-red-900/40 space-y-2">
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest">
                Our Brand Promise
              </span>
              <p className="font-handwriting text-2xl sm:text-3xl text-red-500 font-bold italic">
                &ldquo;Your brand is in good hands.&rdquo;
              </p>
              <p className="text-xs text-neutral-400">
                A personal commitment to excellence, transparency, and dependable delivery from our entire leadership team.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-center p-6 bg-neutral-950 rounded-2xl border border-neutral-800">
                <Logo variant="full" size="lg" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-red-500 font-bold block mb-1 uppercase tracking-wider">
                    Primary Tagline
                  </span>
                  <span className="text-white font-heading font-semibold text-xs leading-snug">
                    DIGITAL SOLUTIONS. CREATIVE DESIGN. BUSINESS GROWTH.
                  </span>
                </div>

                <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-red-500 font-bold block mb-1 uppercase tracking-wider">
                    Short Mantra
                  </span>
                  <span className="text-white font-heading font-semibold text-xs leading-snug">
                    BUILD. BRAND. DIGITIZE. GROW.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-red-600/50 transition-all space-y-4 relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center border border-red-500/30 group-hover:scale-105 transition-transform">
              <Target className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
              OUR PURPOSE
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase">
              OUR MISSION
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              To provide innovative, reliable and affordable technology and creative solutions that help businesses and organizations achieve their goals.
            </p>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-red-600/50 transition-all space-y-4 relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center border border-red-500/30 group-hover:scale-105 transition-transform">
              <Compass className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
              OUR ASPIRATION
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase">
              OUR VISION
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              To become a trusted technology and creative solutions partner for businesses and organizations in Kenya and beyond.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="space-y-8 mb-20">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
              GUIDING PRINCIPLES
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white uppercase">
              OUR VALUES
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
              These fundamental tenets govern every design concept, print run, and software deployment we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-800 hover:border-red-600/60 rounded-2xl p-6 space-y-3 transition-all hover:bg-neutral-900/90 group"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 text-red-500 flex items-center justify-center group-hover:border-red-500/50 transition-colors">
                  <val.icon className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white group-hover:text-red-400 transition-colors">
                  {val.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Kenya & Regional Coverage Highlight */}
        <div className="bg-gradient-to-r from-neutral-900 via-red-950/30 to-neutral-900 border border-red-900/40 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Nairobi &bull; Coast &bull; Rift Valley &bull; Western &bull; Region Wide</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Proudly Serving Businesses Across Kenya &amp; Beyond
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              We bridge geographical distances through high-speed parcel delivery across all 47 counties and secure remote digital development frameworks.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-950 flex items-center gap-2"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(COMPANY_DETAILS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-neutral-700 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
