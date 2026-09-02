import React, { useState, useMemo, useRef, useEffect } from 'react';
import { PageId, PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS, COMPANY_DETAILS } from '../data/siteData';
import {
  Sparkles,
  ArrowRight,
  Search,
  X,
  CheckCircle2,
  TrendingUp,
  Building,
  Layers,
  Filter,
  Printer,
  Globe,
  Smartphone,
  Palette,
  Briefcase,
  Server,
  SlidersHorizontal,
  RotateCcw,
  MessageCircle,
  Tag,
  Share2,
  Command,
} from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: (service?: string) => void;
}

type ServiceFilterType =
  | 'All'
  | 'Printing'
  | 'Websites'
  | 'Branding'
  | 'Graphic Design'
  | 'Mobile Apps'
  | 'IT Solutions';

const POPULAR_SEARCH_KEYWORDS = [
  'M-Pesa',
  'Safari',
  'Fleet Wrap',
  'Signage',
  'Packaging',
  'Mobile App',
  'Gold Foil',
  'Healthcare',
  'IT Network',
  'Stationery',
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceFilterType>('All');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'title' | 'client'>('featured');
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Pressing '/' focuses the search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Service categories configuration with icons and descriptions
  const serviceCategories: {
    id: ServiceFilterType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'All', label: 'All Projects', icon: Layers },
    { id: 'Printing', label: 'Printing', icon: Printer },
    { id: 'Websites', label: 'Web Dev', icon: Globe },
    { id: 'Branding', label: 'Branding', icon: Briefcase },
    { id: 'Graphic Design', label: 'Graphic Design', icon: Palette },
    { id: 'Mobile Apps', label: 'Mobile Apps', icon: Smartphone },
    { id: 'IT Solutions', label: 'IT Solutions', icon: Server },
  ];

  // Derive unique industries list from portfolio dataset
  const industries = useMemo(() => {
    const set = new Set<string>();
    PORTFOLIO_ITEMS.forEach((item) => set.add(item.industry));
    return ['All', ...Array.from(set)];
  }, []);

  // Compute item counts per service category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PORTFOLIO_ITEMS.length };
    PORTFOLIO_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return PORTFOLIO_ITEMS.filter((item) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      // Industry match
      const matchesIndustry =
        selectedIndustry === 'All' || item.industry === selectedIndustry;

      // Search query match (title, client, industry, shortDescription, deliverables, servicesProvided)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.client.toLowerCase().includes(q) ||
        item.industry.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        item.servicesProvided.some((s) => s.toLowerCase().includes(q)) ||
        item.deliverables.some((d) => d.toLowerCase().includes(q));

      return matchesCategory && matchesIndustry && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'client') {
        return a.client.localeCompare(b.client);
      }
      // default: featured order in array
      return 0;
    });
  }, [selectedCategory, selectedIndustry, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedIndustry !== 'All' ||
    searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedIndustry('All');
    setSearchQuery('');
    setSortBy('featured');
    searchInputRef.current?.focus();
  };

  const handleQuickKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    searchInputRef.current?.focus();
  };

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-neutral-900 border border-white/10 text-red-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            PROVEN TRACK RECORD
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            CASE STUDIES &amp; PORTFOLIO
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Search and filter our completed projects across East Africa—from enterprise web and mobile platforms to commercial printing, fleet vehicle branding, and high-security IT infrastructure.
          </p>
        </div>

        {/* Filter & Search Control Panel */}
        <div className="bg-black border border-white/10 p-4 sm:p-6 mb-8 space-y-5 shadow-2xl">
          {/* Top Search Bar with Direct Search & Live Counter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="portfolio-search-input"
                className="text-xs font-black uppercase tracking-widest text-neutral-300 flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-red-500" />
                <span>Search Case Studies &amp; Clients</span>
              </label>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-400 font-mono text-[11px] hidden sm:inline">
                  {filteredItems.length} matching {filteredItems.length === 1 ? 'project' : 'projects'}
                </span>
                <span className="hidden md:inline-flex items-center gap-1 bg-neutral-900 text-neutral-500 border border-white/10 px-2 py-0.5 text-[10px] font-mono">
                  Press <kbd className="text-neutral-300 font-bold">/</kbd> to search
                </span>
              </div>
            </div>

            {/* Main Interactive Search Input */}
            <div className="relative flex items-center">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                <Search className="w-4 h-4 text-red-500" />
              </div>
              <input
                ref={searchInputRef}
                id="portfolio-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client (e.g. Horizon, Savannah), tech (e.g. M-Pesa, Flutter, AWS), or deliverable (e.g. Vehicle wrap, Signage, Packaging)..."
                className="w-full bg-neutral-950 border border-white/20 pl-10 pr-24 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-medium"
              />

              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-white/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                  aria-label="Clear search text"
                >
                  <X className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Quick Keyword Suggestion Chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mr-1 flex items-center gap-1">
                <Tag className="w-3 h-3 text-neutral-500" />
                Popular Searches:
              </span>
              {POPULAR_SEARCH_KEYWORDS.map((keyword) => {
                const isActive = searchQuery.toLowerCase() === keyword.toLowerCase();
                return (
                  <button
                    key={keyword}
                    onClick={() => handleQuickKeywordClick(keyword)}
                    className={`px-2.5 py-1 text-[11px] font-medium transition-colors border ${
                      isActive
                        ? 'bg-red-600 border-red-600 text-white font-bold'
                        : 'bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {keyword}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Category Filter Buttons */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-red-500" />
                Filter by Service Domain
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {serviceCategories.map((cat) => {
                const IconComponent = cat.icon;
                const count = categoryCounts[cat.id] || 0;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    id={`filter-cat-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-red-600 border-red-600 text-white shadow-lg'
                        : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-red-500'}`} />
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 font-mono font-bold ${
                        isSelected
                          ? 'bg-black/30 text-white'
                          : 'bg-black text-neutral-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Industry Filter & Sort Bar */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Industry Filter Dropdown */}
            <div className="sm:col-span-6 flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 shrink-0">
                Industry Sector:
              </span>
              <select
                id="portfolio-industry-filter"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-neutral-950 border border-white/10 px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-red-600"
              >
                <option value="All">All Client Industries</option>
                {industries
                  .filter((ind) => ind !== 'All')
                  .map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
              </select>
            </div>

            {/* Sort Dropdown & Reset */}
            <div className="sm:col-span-6 flex items-center gap-2 justify-end">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 shrink-0 hidden sm:inline">
                Sort:
              </span>
              <select
                id="portfolio-sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto bg-neutral-950 border border-white/10 px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-red-600"
              >
                <option value="featured">Featured Projects</option>
                <option value="title">Project Name (A-Z)</option>
                <option value="client">Client Organization (A-Z)</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  title="Reset all search queries and filters"
                  className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white shrink-0 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  aria-label="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-red-500" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-neutral-400 border-t border-white/5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Active Filters:
              </span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-900 border border-red-600/70 text-red-400 px-2.5 py-1 text-[11px] font-bold">
                  <Search className="w-3 h-3 text-red-500" />
                  Keyword: &quot;{searchQuery}&quot;
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-white ml-0.5"
                    aria-label="Remove search filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-900 border border-white/20 text-neutral-200 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                  Service: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="hover:text-white ml-0.5"
                    aria-label="Remove service filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedIndustry !== 'All' && (
                <span className="inline-flex items-center gap-1.5 bg-neutral-900 border border-white/20 text-neutral-200 px-2.5 py-1 text-[11px]">
                  Industry: {selectedIndustry}
                  <button
                    onClick={() => setSelectedIndustry('All')}
                    className="hover:text-white ml-0.5"
                    aria-label="Remove industry filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-[11px] text-red-500 hover:underline uppercase tracking-wider font-bold ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Project Grid / Results */}
        {filteredItems.length === 0 ? (
          <div className="bg-black border border-white/10 p-12 text-center space-y-4 my-12">
            <div className="w-16 h-16 bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto text-neutral-500">
              <Search className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-wider">
                No matching case studies found
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                No projects matched your criteria for service &ldquo;{selectedCategory}&rdquo; with your active search or industry filters.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-black border border-white/10 hover:border-red-600 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Project Image */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Category Tag */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                      <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 shadow-md">
                        {item.category}
                      </span>
                    </div>

                    {/* Impact Metric Bar */}
                    {item.impactMetric && (
                      <div className="absolute bottom-3 left-3 right-3 text-[11px] bg-neutral-950/95 border border-white/10 text-neutral-200 px-3 py-1.5 flex items-center gap-2 shadow-lg">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate font-semibold">{item.impactMetric}</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-medium">
                      <div className="flex items-center gap-1.5 uppercase tracking-wider text-red-500 font-bold">
                        <Building className="w-3.5 h-3.5" />
                        <span>{item.client}</span>
                      </div>
                      <span className="text-neutral-500">{item.industry}</span>
                    </div>

                    <h3 className="font-heading font-black text-base sm:text-lg text-white group-hover:text-red-500 transition-colors uppercase leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      {item.shortDescription}
                    </p>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.servicesProvided.map((srv, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-neutral-900 text-neutral-300 px-2 py-0.5 border border-white/10 uppercase tracking-wider"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-5 sm:p-6 pt-0 mt-auto">
                  <button
                    id={`view-project-${item.id}`}
                    onClick={() => setActiveProject(item)}
                    className="w-full bg-neutral-900 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest py-3 border border-white/10 hover:border-red-600 transition-all flex items-center justify-center gap-2 group-hover:bg-red-600"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Banner at bottom */}
        <div className="mt-16 bg-black border border-white/10 p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-red-500 font-bold text-xs uppercase tracking-widest">
              Have a Project in Mind?
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              Let&apos;s Build Your Next Success Story
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Whether you require high-speed custom software, mobile apps, complete brand identity, or large-scale corporate printing, our multidisciplinary team is ready.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => onOpenQuoteModal('Custom Project')}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 shadow-lg"
            >
              <span>Request a Project Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent('Hello Nomads Footprints Tech, I reviewed your portfolio and would like to discuss a project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>

        {/* Project Detail Modal */}
        {activeProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <div className="relative w-full max-w-3xl bg-neutral-950 border border-white/10 shadow-2xl overflow-hidden text-neutral-100 my-8">
              {/* Modal Image Header */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-900">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 text-white bg-black/80 hover:bg-red-600 p-2 border border-white/10 transition-colors"
                  aria-label="Close project modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1">
                      {activeProject.category}
                    </span>
                    <span className="bg-black text-neutral-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 border border-white/10">
                      {activeProject.industry}
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Meta stats bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-black border border-white/10 text-xs">
                  <div>
                    <span className="text-neutral-500 uppercase tracking-wider text-[10px] font-bold block">
                      Client Organization
                    </span>
                    <strong className="text-white text-sm">{activeProject.client}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 uppercase tracking-wider text-[10px] font-bold block">
                      Industry Sector
                    </span>
                    <strong className="text-white text-sm">{activeProject.industry}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 uppercase tracking-wider text-[10px] font-bold block">
                      Verified Result
                    </span>
                    <strong className="text-emerald-400 text-sm flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                      {activeProject.impactMetric || 'Successfully Deployed'}
                    </strong>
                  </div>
                </div>

                {/* Scope & Overview */}
                <div className="space-y-2">
                  <h4 className="font-heading font-black text-xs text-white uppercase tracking-widest flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-red-500" />
                    Case Study Background
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {activeProject.fullDescription}
                  </p>
                </div>

                {/* Services Provided */}
                <div className="space-y-2">
                  <h4 className="font-heading font-black text-xs text-white uppercase tracking-widest">
                    Services Provided
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.servicesProvided.map((srv, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-black text-neutral-200 px-3 py-1 border border-white/10 font-bold uppercase tracking-wider"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables List */}
                <div className="space-y-3">
                  <h4 className="font-heading font-black text-xs text-white uppercase tracking-widest">
                    Key Deliverables &amp; Output
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeProject.deliverables.map((del, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-black border border-white/10 text-xs text-neutral-200 flex items-center gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const projTitle = activeProject.title;
                        setActiveProject(null);
                        onOpenQuoteModal(`Project inspired by ${projTitle}`);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-5 py-3 shadow-lg flex items-center gap-2"
                    >
                      <span>Request Similar Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(`Hello Nomads Footprints Tech, I am interested in a project similar to "${activeProject.title}" for ${activeProject.client}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest px-4 py-3 flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setActiveProject(null)}
                    className="text-xs text-neutral-400 hover:text-white uppercase tracking-wider font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
