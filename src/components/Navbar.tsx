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
  Layers,
  Flame,
  User
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
  onOpenNutribot: () => void;
  onOpenQuiz: () => void;
  onOpenAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCart, 
  cartCount, 
  onOpenNutribot,
  onOpenQuiz,
  onOpenAccount
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
      isScrolled ? 'bg-[#1C1712]/95 backdrop-blur-md shadow-lg shadow-black/80 border-b border-amber-950/40 py-2.5' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => scrollToSection(e, '#')}
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform flex-shrink-0">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-white font-display whitespace-nowrap">
                  Smart<span className="text-orange-500">Tiffin</span>
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-orange-950/80 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                  JK
                </span>
              </div>
              <p className="text-[10px] text-[#A8988A] font-medium whitespace-nowrap hidden sm:block leading-none mt-0.5">
                Warm & Fresh School Lunches
              </p>
            </div>
          </a>

          {/* Desktop Navigation Pill Capsule (Clean, single-line, whitespace-nowrap) */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#15100C]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/20 shadow-inner">
            <a 
              href="#menu" 
              onClick={(e) => scrollToSection(e, '#menu')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4C5B5] hover:text-white hover:bg-[#261E18] transition-all whitespace-nowrap"
            >
              Weekly Menu
            </a>
            <a 
              href="#visualizer" 
              onClick={(e) => scrollToSection(e, '#visualizer')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4C5B5] hover:text-white hover:bg-[#261E18] transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Layers className="w-3.5 h-3.5 text-orange-400" />
              <span>Bento Builder</span>
            </a>
            <a 
              href="#calculator" 
              onClick={(e) => scrollToSection(e, '#calculator')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4C5B5] hover:text-white hover:bg-[#261E18] transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Scale className="w-3.5 h-3.5 text-orange-400" />
              <span>Nutrition Calc</span>
            </a>
            <a 
              href="#plans" 
              onClick={(e) => scrollToSection(e, '#plans')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4C5B5] hover:text-white hover:bg-[#261E18] transition-all whitespace-nowrap"
            >
              Plans
            </a>
            <a 
              href="#customizer" 
              onClick={(e) => scrollToSection(e, '#customizer')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4C5B5] hover:text-white hover:bg-[#261E18] transition-all whitespace-nowrap"
            >
              Customise
            </a>
            <a 
              href="#tracker" 
              onClick={(e) => scrollToSection(e, '#tracker')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4C5B5] hover:text-white hover:bg-[#261E18] transition-all flex items-center gap-1.5 whitespace-nowrap"
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
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4C5B5] hover:text-white hover:bg-[#261E18] transition-all whitespace-nowrap"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full border text-xs transition-colors flex-shrink-0 ${
                soundEnabled 
                  ? 'bg-[#261E18] border-orange-500/30 text-orange-400 hover:text-orange-300' 
                  : 'bg-[#261E18] border-orange-500/20 text-[#8C7B6D] hover:text-[#D4C5B5]'
              }`}
              title={soundEnabled ? 'Sound Enabled (Click to Mute)' : 'Sound Muted (Click to Unmute)'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* 30s Taste Quiz button */}
            <button
              onClick={() => {
                sfx.playPop();
                onOpenQuiz();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/40 transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0"
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-orange-950/80 text-orange-300 hover:bg-orange-900/80 border border-orange-500/40 transition-all hover:shadow-sm hover:shadow-orange-500/20 group whitespace-nowrap flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400 group-hover:rotate-12 transition-transform" />
              <span>Ask Nutribot</span>
            </button>

            {/* Parent Account Plan button */}
            <button
              onClick={() => {
                sfx.playPop();
                onOpenAccount();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-[#261E18] text-[#F5EBE1] hover:bg-[#2F251E] hover:text-white border border-orange-500/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0 group shadow-sm"
              title="Parent Account & Subscription Plan"
            >
              <div className="w-5 h-5 rounded-full bg-orange-600/30 border border-orange-500/40 flex items-center justify-center text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <User className="w-3 h-3" />
              </div>
              <span>Account Plan</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                sfx.playPop();
                onOpenCart();
              }}
              className="relative py-2 px-4 rounded-full bg-orange-600 text-white hover:bg-orange-500 transition-all shadow-md shadow-orange-600/30 flex items-center gap-2 text-xs font-bold active:scale-95 whitespace-nowrap flex-shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-black bg-white text-orange-600 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile & Tablet Top Bar (< xl screens) */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => {
                sfx.playPop();
                onOpenAccount();
              }}
              className="p-2 rounded-xl bg-[#261E18] text-orange-400 border border-orange-500/30"
              title="Parent Account"
              aria-label="Parent Account"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-[#261E18] text-[#D4C5B5] border border-orange-500/25"
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
                <span className="px-1.5 py-0.2 text-[10px] font-black bg-white text-orange-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                sfx.playPop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-[#261E18] text-[#D4C5B5] border border-orange-500/25 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-orange-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile / Tablet Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1C1712]/98 backdrop-blur-2xl border-b border-amber-950/40 px-6 py-6 shadow-2xl transition-all animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2 text-sm font-semibold">
            <a 
              href="#menu" 
              onClick={(e) => scrollToSection(e, '#menu')}
              className="text-[#F5EBE1] hover:text-orange-400 py-2.5 border-b border-orange-500/10 flex items-center justify-between"
            >
              <span>Weekly Lunch Menu</span>
              <span className="text-xs text-orange-500">View dishes →</span>
            </a>
            <a 
              href="#visualizer" 
              onClick={(e) => scrollToSection(e, '#visualizer')}
              className="text-[#F5EBE1] hover:text-orange-400 py-2.5 border-b border-orange-500/10 flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-orange-500" />
              <span>Interactive Bento Builder</span>
            </a>
            <a 
              href="#calculator" 
              onClick={(e) => scrollToSection(e, '#calculator')}
              className="text-[#F5EBE1] hover:text-orange-400 py-2.5 border-b border-orange-500/10 flex items-center gap-2"
            >
              <Scale className="w-4 h-4 text-orange-500" />
              <span>Kid Nutrition & Macro Calculator</span>
            </a>
            <a 
              href="#plans" 
              onClick={(e) => scrollToSection(e, '#plans')}
              className="text-[#F5EBE1] hover:text-orange-400 py-2.5 border-b border-orange-500/10"
            >
              Meal Plans & Pricing
            </a>
            <a 
              href="#customizer" 
              onClick={(e) => scrollToSection(e, '#customizer')}
              className="text-[#F5EBE1] hover:text-orange-400 py-2.5 border-b border-orange-500/10"
            >
              Customise Your Child's Tiffin
            </a>
            <a 
              href="#tracker" 
              onClick={(e) => scrollToSection(e, '#tracker')}
              className="text-[#F5EBE1] hover:text-orange-400 py-2.5 border-b border-orange-500/10 flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-orange-500" />
              <span>Live Thermal & Van Tracker</span>
            </a>
            <a 
              href="#faq" 
              onClick={(e) => scrollToSection(e, '#faq')}
              className="text-[#F5EBE1] hover:text-orange-400 py-2.5 flex items-center gap-2"
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
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Take 30-Second Taste Quiz (Get 15% OFF)
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  sfx.playPop();
                  onOpenAccount();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-bold bg-[#261E18] text-[#F5EBE1] border border-orange-500/40 hover:bg-[#2F251E]"
              >
                <User className="w-4 h-4 text-orange-400" />
                <span>Parent Account & Plan Management</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  sfx.playPop();
                  onOpenNutribot();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-semibold bg-orange-950/80 text-orange-300 border border-orange-500/40"
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
