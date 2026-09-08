import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  Menu, 
  X, 
  Truck, 
  PhoneCall, 
  Flame 
} from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
  onOpenNutribot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart, cartCount, onOpenNutribot }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-display">Smart<span className="text-emerald-600">Tiffin</span></span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">JK</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Warm & Fresh School Lunches</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#menu" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
              Weekly Menu
            </a>
            <a href="#plans" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
              Meal Plans
            </a>
            <a href="#customizer" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
              Customise Tiffin
            </a>
            <a href="#tracker" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Tracker
            </a>
            <a href="#hygiene" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">
              Safety & Hygiene
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* AI Nutritionist button */}
            <button
              onClick={onOpenNutribot}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80 border border-emerald-200 transition-all hover:shadow-sm group"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform" />
              <span>Ask AI Nutribot</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2 text-sm font-semibold px-4"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Tiffin Box</span>
              {cartCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-emerald-500 text-white rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-slate-900 text-white"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold bg-emerald-500 text-white rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-6 py-5 shadow-xl transition-all">
          <div className="flex flex-col gap-4">
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-emerald-600"
            >
              Weekly Menu
            </a>
            <a 
              href="#plans" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-emerald-600"
            >
              Meal Plans & Pricing
            </a>
            <a 
              href="#customizer" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-emerald-600"
            >
              Customise Your Tiffin
            </a>
            <a 
              href="#tracker" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-emerald-600 flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-emerald-600" />
              Live Lunch Tracker
            </a>
            <a 
              href="#hygiene" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 hover:text-emerald-600 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Safety & Allergen Standards
            </a>
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNutribot();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Ask JK Nutribot (AI Meal Planner)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
