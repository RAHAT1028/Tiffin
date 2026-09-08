import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  Menu, 
  X, 
  Truck 
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
      isScrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-lg shadow-black/40 border-b border-slate-800/80 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-display">Smart<span className="text-orange-500">Tiffin</span></span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-950/80 text-orange-400 border border-orange-500/30 uppercase tracking-wider">JK</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Warm & Fresh School Lunches</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#menu" className="text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors">
              Weekly Menu
            </a>
            <a href="#plans" className="text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors">
              Meal Plans
            </a>
            <a href="#customizer" className="text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors">
              Customise Tiffin
            </a>
            <a href="#tracker" className="text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Live Tracker
            </a>
            <a href="#hygiene" className="text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors">
              Safety & Hygiene
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* AI Nutritionist button */}
            <button
              onClick={onOpenNutribot}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-orange-950/60 text-orange-300 hover:bg-orange-900/60 border border-orange-500/40 transition-all hover:shadow-sm hover:shadow-orange-500/20 group"
            >
              <Sparkles className="w-4 h-4 text-orange-400 group-hover:rotate-12 transition-transform" />
              <span>Ask AI Nutribot</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-orange-600 text-white hover:bg-orange-500 transition-all shadow-md shadow-orange-600/30 flex items-center gap-2 text-sm font-semibold px-4 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Tiffin Box</span>
              {cartCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-white text-orange-600 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl bg-orange-600 text-white shadow-sm"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold bg-white text-orange-600 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-6 py-5 shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-orange-400"
            >
              Weekly Menu
            </a>
            <a 
              href="#plans" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-orange-400"
            >
              Meal Plans & Pricing
            </a>
            <a 
              href="#customizer" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-orange-400"
            >
              Customise Your Tiffin
            </a>
            <a 
              href="#tracker" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-orange-400 flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-orange-500" />
              Live Lunch Tracker
            </a>
            <a 
              href="#hygiene" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-orange-400 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              Safety & Allergen Standards
            </a>
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNutribot();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-orange-950/80 text-orange-300 border border-orange-500/40"
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                Ask JK Nutribot (AI Meal Planner)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
