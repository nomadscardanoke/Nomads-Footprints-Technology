import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import Logo from './Logo';
import {
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/siteData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, extraParam?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenQuoteModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('nomads_theme');
      return savedTheme === 'light';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
      try {
        localStorage.setItem('nomads_theme', 'light');
      } catch (e) {
        console.error('Failed to save theme setting', e);
      }
    } else {
      document.documentElement.classList.remove('light');
      try {
        localStorage.setItem('nomads_theme', 'dark');
      } catch (e) {
        console.error('Failed to save theme setting', e);
      }
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'shop', label: 'Shop' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'blog', label: 'Blog' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top utility bar */}
      <div className="bg-black border-b border-white/10 text-neutral-400 text-xs py-2 px-4 sm:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6 text-[11px] font-medium uppercase tracking-wider">
            <a
              href={`tel:${COMPANY_DETAILS.phone}`}
              className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
            >
              <Phone className="w-3 h-3 text-red-600" />
              <span>{COMPANY_DETAILS.displayPhone}</span>
            </a>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
            >
              <Mail className="w-3 h-3 text-red-600" />
              <span>{COMPANY_DETAILS.email}</span>
            </a>
            <div className="flex items-center gap-1.5 text-neutral-400">
              <MapPin className="w-3 h-3 text-red-600" />
              <span>Nairobi, Kenya (Nationwide Delivery)</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-red-600 font-bold uppercase tracking-widest text-[10px] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-red-600" />
              Digital Solutions &bull; Creative Design &bull; Business Growth
            </span>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(COMPANY_DETAILS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold uppercase text-[10px] tracking-wider ml-2"
            >
              <MessageCircle className="w-3 h-3" />
              <span>Quick WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-white/10 py-3'
            : 'bg-black border-b border-white/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => handleLinkClick('home')} className="focus:outline-none" role="button" tabIndex={0}>
            <Logo variant="compact" size="md" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center space-x-6 text-xs font-semibold uppercase tracking-widest">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`py-1.5 transition-colors relative ${
                    isActive
                      ? 'text-red-600 border-b-2 border-red-600 font-bold'
                      : 'text-neutral-300 hover:text-red-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white transition-colors border border-white/10 flex items-center justify-center rounded-none group"
              aria-label={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              title={isLightMode ? 'Switch to Dark Theme' : 'Switch to High-Contrast Light Mode'}
            >
              {isLightMode ? (
                <Moon className="w-4 h-4 text-amber-500 group-hover:text-amber-400" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300" />
              )}
            </button>

            {/* Cart Button */}
            <button
              id="cart-drawer-toggle"
              onClick={onOpenCart}
              className="relative p-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white transition-colors border border-white/10 flex items-center gap-2 rounded-none"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-none flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Get a Quote Button */}
            <button
              id="nav-quote-btn"
              onClick={onOpenQuoteModal}
              className="hidden sm:inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-none shadow-md transition-all duration-200 active:scale-95 border border-red-500"
            >
              <span>GET A QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 bg-neutral-900 text-neutral-200 hover:text-white hover:bg-neutral-800 focus:outline-none border border-white/10 rounded-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-red-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-black border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Theme Mode:</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 bg-neutral-900 border border-white/10 px-3 py-1.5 text-xs text-neutral-200 hover:text-white font-bold uppercase tracking-wider"
              >
                {isLightMode ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-amber-500" />
                    <span>Dark Theme</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors rounded-none ${
                    currentPage === item.id
                      ? 'bg-red-600 text-white'
                      : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-none uppercase text-xs tracking-widest shadow-md"
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(COMPANY_DETAILS.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider py-2.5 px-4 rounded-none text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+254 752 634 016)</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
