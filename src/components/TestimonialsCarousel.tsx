import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TestimonialItem } from '../types';
import { TESTIMONIALS, COMPANY_DETAILS } from '../data/siteData';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
  CheckCircle2,
  TrendingUp,
  Building,
  MapPin,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Award,
  ShieldCheck,
} from 'lucide-react';

interface TestimonialsCarouselProps {
  onOpenQuoteModal: (service?: string) => void;
  onNavigate?: (page: any, extraParam?: string) => void;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  onOpenQuoteModal,
  onNavigate,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>('All');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Available filter categories
  const categories = ['All', 'Branding', 'Websites', 'Graphic Design', 'IT Solutions', 'Printing'];

  // Filter items based on selected category
  const filteredTestimonials = React.useMemo(() => {
    if (selectedServiceFilter === 'All') return TESTIMONIALS;
    return TESTIMONIALS.filter((t) => t.serviceCategory === selectedServiceFilter);
  }, [selectedServiceFilter]);

  // Adjust currentIndex if out of bounds on filter change
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedServiceFilter]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  }, [filteredTestimonials.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  }, [filteredTestimonials.length]);

  // Autoplay effect
  useEffect(() => {
    if (isAutoPlaying && filteredTestimonials.length > 1) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, handleNext, filteredTestimonials.length]);

  const currentItem = filteredTestimonials[currentIndex] || TESTIMONIALS[0];

  return (
    <section className="py-20 bg-neutral-950 border-y border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-neutral-900 border border-white/10 text-red-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 fill-red-600 text-red-600" />
            <span>VERIFIED CLIENT SUCCESS STORIES</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            WHAT OUR CLIENTS SAY
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Real feedback from enterprise managers, founders, schools, and business leaders across Kenya who trust Nomads Footprints Technology.
          </p>
        </div>

        {/* Social Proof Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black border border-white/10 p-4 sm:p-5 text-center">
          <div className="space-y-1 border-r border-white/10 last:border-r-0">
            <div className="font-heading font-black text-xl sm:text-2xl text-white">4.9 / 5.0</div>
            <div className="flex justify-center text-red-600 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-red-600" />
              ))}
            </div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Average Rating</p>
          </div>

          <div className="space-y-1 border-r border-white/10 last:border-r-0">
            <div className="font-heading font-black text-xl sm:text-2xl text-red-500">150+</div>
            <p className="text-xs text-white font-bold uppercase tracking-wider">Corporate Clients</p>
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Across East Africa</p>
          </div>

          <div className="space-y-1 border-r border-white/10 last:border-r-0">
            <div className="font-heading font-black text-xl sm:text-2xl text-white">99.4%</div>
            <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">On-Time Delivery</p>
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Strict SLA Standards</p>
          </div>

          <div className="space-y-1">
            <div className="font-heading font-black text-xl sm:text-2xl text-white">100%</div>
            <p className="text-xs text-white font-bold uppercase tracking-wider">Quality Guarantee</p>
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Physical &amp; Digital</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mr-2 hidden sm:inline">
              Filter By Service:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedServiceFilter(cat)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border rounded-none ${
                  selectedServiceFilter === cat
                    ? 'bg-red-600 border-red-600 text-white shadow-md'
                    : 'bg-black border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Autoplay & Nav buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              title={isAutoPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
              className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-400 hover:text-white text-xs flex items-center gap-1.5 uppercase tracking-wider"
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-red-500" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="text-[10px] hidden sm:inline">{isAutoPlaying ? 'Pause' : 'Auto'}</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                id="testimonial-prev-btn"
                onClick={handlePrev}
                className="p-2 bg-neutral-900 hover:bg-red-600 border border-white/10 text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="testimonial-next-btn"
                onClick={handleNext}
                className="p-2 bg-neutral-900 hover:bg-red-600 border border-white/10 text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Hero Stage */}
        {currentItem && (
          <div className="bg-black border border-white/10 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
            {/* Background Decorative Graphic */}
            <div className="absolute top-4 right-6 text-white/5 select-none pointer-events-none">
              <Quote className="w-36 h-36" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Client Details & Verified Stamp */}
              <div className="lg:col-span-4 space-y-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                {/* Client Avatar & Details */}
                <div className="flex items-center gap-4">
                  {currentItem.avatarUrl ? (
                    <img
                      src={currentItem.avatarUrl}
                      alt={currentItem.author}
                      className="w-16 h-16 object-cover border-2 border-red-600 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-neutral-900 border-2 border-red-600 flex items-center justify-center font-heading font-black text-lg text-white shrink-0">
                      {currentItem.author.split(' ').map((n) => n[0]).join('')}
                    </div>
                  )}

                  <div className="space-y-0.5">
                    <h3 className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-tight">
                      {currentItem.author}
                    </h3>
                    <p className="text-xs text-red-500 font-semibold uppercase tracking-wider">
                      {currentItem.position}
                    </p>
                    {currentItem.company && (
                      <p className="text-xs text-neutral-300 flex items-center gap-1 font-medium">
                        <Building className="w-3 h-3 text-neutral-500" />
                        <span>{currentItem.company}</span>
                      </p>
                    )}
                    <p className="text-[11px] text-neutral-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      <span>{currentItem.location}</span>
                    </p>
                  </div>
                </div>

                {/* Star Rating & Verified Client Badge */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-1 text-red-600">
                    {[...Array(currentItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-red-600 text-red-600" />
                    ))}
                    <span className="text-xs text-neutral-400 font-bold ml-1.5">5.0 Star Experience</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[10px] bg-neutral-900 text-neutral-300 border border-white/10 px-2.5 py-1 uppercase tracking-wider font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Project Client</span>
                  </div>
                </div>

                {/* Service Tag */}
                <div className="pt-2">
                  <span className="text-[11px] uppercase font-bold bg-neutral-900 border border-red-600/40 text-red-400 px-3 py-1 inline-block">
                    Service: {currentItem.service}
                  </span>
                </div>
              </div>

              {/* Right Column: Quote Text, Project Metric, and Quick Action */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-3">
                  <div className="text-red-600">
                    <Quote className="w-8 h-8" />
                  </div>
                  <blockquote className="font-heading font-medium text-base sm:text-xl text-neutral-100 leading-relaxed italic">
                    &ldquo;{currentItem.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Project Result / Metric Callout */}
                {(currentItem.projectResult || currentItem.highlight) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentItem.highlight && (
                      <div className="bg-neutral-950 border border-white/10 p-3 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">Scope Highlight</span>
                          <span className="text-xs text-neutral-200 font-semibold">{currentItem.highlight}</span>
                        </div>
                      </div>
                    )}

                    {currentItem.projectResult && (
                      <div className="bg-neutral-950 border border-white/10 p-3 flex items-start gap-2.5">
                        <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">Measured Impact</span>
                          <span className="text-xs text-emerald-400 font-bold">{currentItem.projectResult}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenQuoteModal(currentItem.service)}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 shadow-md transition-colors"
                  >
                    <span>Request Similar Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(`Hello Nomads Footprints Tech, I saw ${currentItem.author}'s review for ${currentItem.service} and would like to discuss a similar project.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-3"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('portfolio')}
                      className="text-xs text-neutral-400 hover:text-white uppercase tracking-wider font-bold ml-auto py-2"
                    >
                      View All Case Studies &rarr;
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Carousel Pagination Thumbnails / Dots Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {filteredTestimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all p-2 text-left border flex items-center gap-2.5 ${
                  currentIndex === idx
                    ? 'bg-neutral-900 border-red-600 text-white'
                    : 'bg-black border-white/10 text-neutral-500 hover:text-neutral-300 hover:border-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${t.author}`}
              >
                <div
                  className={`w-2 h-2 ${
                    currentIndex === idx ? 'bg-red-600' : 'bg-neutral-700'
                  }`}
                />
                <span className="text-[11px] font-bold uppercase tracking-wider truncate max-w-[120px] sm:max-w-[160px]">
                  {t.author}
                </span>
                <span className="text-[10px] text-neutral-500 hidden md:inline">
                  &bull; {t.serviceCategory}
                </span>
              </button>
            ))}
          </div>

          <div className="text-center text-[11px] text-neutral-500 uppercase tracking-widest font-mono">
            Showing Story {currentIndex + 1} of {filteredTestimonials.length}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
