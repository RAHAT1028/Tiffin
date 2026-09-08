import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  Menu, 
  X, 
  Truck, 
  Volume2, 
  VolumeX, 
  HelpCircle,
  Scale,
  Layers
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
  onOpenNutribot: () => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCart, 
  cartCount, 
  onOpenNutribot,
  onOpenQuiz
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    sfx.enabled = nextState;
    setSoundEnabled(nextState);
    if (nextState) sfx.playPop();
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    sfx.playPop();
    setMobileMenuOpen(false);
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/60 border-b border-slate-800/80 py-3' : 'bg-transparent py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => scrollToSection(e, '#')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-display">Smart<span className="text-orange-500">Tiffin</span></span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-950/80 text-orange-400 border border-orange-500/30 uppercase tracking-wider">JK</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Warm & Wholesome School Lunches</p>
            </div>
          </a>

          {/* Desktop Navigation (Visible on lg / xl screens) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-semibold text-slate-300">
            <a 
              href="#menu" 
              onClick={(e) => scrollToSection(e, '#menu')}
              className="hover:text-orange-400 transition-colors py-1"
            >
              Menu
            </a>
            <a 
              href="#visualizer" 
              onClick={(e) => scrollToSection(e, '#visualizer')}
              className="hover:text-orange-400 transition-colors flex items-center gap-1 py-1"
            >
              <Layers className="w-3.5 h-3.5 text-orange-400" />
              <span>Bento Builder</span>
            </a>
            <a 
              href="#calculator" 
              onClick={(e) => scrollToSection(e, '#calculator')}
              className="hover:text-orange-400 transition-colors flex items-center gap-1 py-1"
            >
              <Scale className="w-3.5 h-3.5 text-orange-400" />
              <span>Nutrition Calc</span>
            </a>
            <a 
              href="#plans" 
              onClick={(e) => scrollToSection(e, '#plans')}
              className="hover:text-orange-400 transition-colors py-1"
            >
              Plans
            </a>
            <a 
              href="#customizer" 
              onClick={(e) => scrollToSection(e, '#customizer')}
              className="hover:text-orange-400 transition-colors py-1"
            >
              Customise
            </a>
            <a 
              href="#tracker" 
              onClick={(e) => scrollToSection(e, '#tracker')}
              className="hover:text-orange-400 transition-colors flex items-center gap-1.5 py-1"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span>Live Tracker</span>
            </a>
            <a 
              href="#faq" 
              onClick={(e) => scrollToSection(e, '#faq')}
              className="hover:text-orange-400 transition-colors py-1"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                soundEnabled 
                  ? 'bg-slate-900 border-slate-800 text-orange-400 hover:text-orange-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
              }`}
              title={soundEnabled ? 'Sound Effects Enabled (Click to Mute)' : 'Sound Effects Muted (Click to Unmute)'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* 30s Taste Quiz button */}
            <button
              onClick={() => {
                sfx.playPop();
                onOpenQuiz();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Taste Quiz</span>
            </button>

            {/* AI Nutribot button */}
            <button
              onClick={() => {
                sfx.playPop();
                onOpenNutribot();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-orange-950/60 text-orange-300 hover:bg-orange-900/60 border border-orange-500/40 transition-all hover:shadow-sm hover:shadow-orange-500/20 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400 group-hover:rotate-12 transition-transform" />
              <span>Ask Nutribot</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                sfx.playPop();
                onOpenCart();
              }}
              className="relative p-2 rounded-xl bg-orange-600 text-white hover:bg-orange-500 transition-all shadow-md shadow-orange-600/30 flex items-center gap-2 text-xs font-bold px-3.5 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[11px] font-extrabold bg-white text-orange-600 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile & Tablet hamburger + cart bar (Visible on < lg screens) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 border border-slate-800"
              title="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                sfx.playPop();
                onOpenCart();
              }}
              className="relative p-2 rounded-xl bg-orange-600 text-white shadow-sm flex items-center gap-1.5 px-3"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold sm:inline hidden">Cart</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold bg-white text-orange-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                sfx.playPop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-orange-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile / Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 shadow-2xl transition-all animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 text-sm font-semibold">
            <a 
              href="#menu" 
              onClick={(e) => scrollToSection(e, '#menu')}
              className="text-slate-200 hover:text-orange-400 py-2 border-b border-slate-900 flex items-center justify-between"
            >
              <span>Weekly Lunch Menu</span>
              <span className="text-xs text-orange-500">View dishes →</span>
            </a>
            <a 
              href="#visualizer" 
              onClick={(e) => scrollToSection(e, '#visualizer')}
              className="text-slate-200 hover:text-orange-400 py-2 border-b border-slate-900 flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-orange-500" />
              <span>Interactive Bento Builder</span>
            </a>
            <a 
              href="#calculator" 
              onClick={(e) => scrollToSection(e, '#calculator')}
              className="text-slate-200 hover:text-orange-400 py-2 border-b border-slate-900 flex items-center gap-2"
            >
              <Scale className="w-4 h-4 text-orange-500" />
              <span>Kid Nutrition & Macro Calculator</span>
            </a>
            <a 
              href="#plans" 
              onClick={(e) => scrollToSection(e, '#plans')}
              className="text-slate-200 hover:text-orange-400 py-2 border-b border-slate-900"
            >
              Meal Plans & Pricing
            </a>
            <a 
              href="#customizer" 
              onClick={(e) => scrollToSection(e, '#customizer')}
              className="text-slate-200 hover:text-orange-400 py-2 border-b border-slate-900"
            >
              Customise Your Child's Tiffin
            </a>
            <a 
              href="#tracker" 
              onClick={(e) => scrollToSection(e, '#tracker')}
              className="text-slate-200 hover:text-orange-400 py-2 border-b border-slate-900 flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-orange-500" />
              <span>Live Thermal & Van Tracker</span>
            </a>
            <a 
              href="#faq" 
              onClick={(e) => scrollToSection(e, '#faq')}
              className="text-slate-200 hover:text-orange-400 py-2 flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-orange-500" />
              <span>Frequently Asked Questions</span>
            </a>
            
            {/* Quick Action CTA buttons in mobile drawer */}
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  sfx.playPop();
                  onOpenQuiz();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Take 30-Second Taste Quiz (Get 15% OFF)
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  sfx.playPop();
                  onOpenNutribot();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold bg-orange-950/80 text-orange-300 border border-orange-500/40"
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                Ask JK Nutribot (AI Meal Advisor)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
