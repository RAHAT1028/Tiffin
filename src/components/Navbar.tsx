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
  User,
  Users,
  ChefHat,
  LogIn,
  LogOut
} from 'lucide-react';
import { sfx } from '../utils/audio';
import { AuthUser, FamilyMember } from '../types';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
  onOpenNutribot: () => void;
  onOpenQuiz: () => void;
  onOpenAccount: () => void;
  currentUser?: AuthUser | null;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onOpenFamilyHub?: () => void;
  familyMembersCount?: number;
  activeMember?: FamilyMember | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  cartCount,
  onOpenNutribot,
  onOpenQuiz,
  onOpenAccount,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenFamilyHub,
  familyMembersCount = 0,
  activeMember
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1C1712]/95 backdrop-blur-md shadow-lg shadow-black/80 border-b border-amber-950/40 py-2.5' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
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
                  TIFFIN
                </span>
              </div>
              <p className="text-[10px] text-[#A8988A] font-medium whitespace-nowrap hidden sm:block leading-none mt-0.5">
                Warm & Fresh School Lunches
              </p>
            </div>
          </a>

          {/* Desktop Navigation Pill Capsule (Concise, balanced, never crowded) */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-[#15100C]/90 backdrop-blur-md px-2 py-1 rounded-full border border-orange-500/20 shadow-inner">
            <a
              href="#menu"
              onClick={(e) => scrollToSection(e, '#menu')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4C5B5] hover:text-white hover:bg-[#261E18] transition-all whitespace-nowrap"
            >
              Menu
            </a>
            <a
              href="#restaurants"
              onClick={(e) => scrollToSection(e, '#restaurants')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-orange-300 hover:text-white hover:bg-orange-600/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <ChefHat className="w-3.5 h-3.5 text-orange-400" />
              <span>Top Kitchens</span>
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
              href="#plans"
              onClick={(e) => scrollToSection(e, '#plans')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4C5B5] hover:text-white hover:bg-[#261E18] transition-all whitespace-nowrap"
            >
              Plans
            </a>
            <a
              href="#tracker"
              onClick={(e) => scrollToSection(e, '#tracker')}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4C5B5] hover:text-white hover:bg-[#261E18] transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Tracker</span>
            </a>
          </nav>

          {/* Right Action buttons (Desktop - lg and above) */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full border text-xs transition-colors flex-shrink-0 ${soundEnabled
                  ? 'bg-[#261E18] border-orange-500/30 text-orange-400 hover:text-orange-300'
                  : 'bg-[#261E18] border-orange-500/20 text-[#8C7B6D] hover:text-[#D4C5B5]'
                }`}
              title={soundEnabled ? 'Sound Enabled (Click to Mute)' : 'Sound Muted (Click to Unmute)'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Family Hub & Members Button */}
            <button
              onClick={() => {
                sfx.playPop();
                if (onOpenFamilyHub) onOpenFamilyHub();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#261E18] text-[#D4C5B5] hover:text-white hover:bg-[#2E241E] border border-orange-500/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0 group shadow-sm"
              title="Manage Family Members & Allergen Passports"
            >
              {activeMember ? (
                <img
                  src={activeMember.avatar}
                  alt={activeMember.name}
                  className="w-4 h-4 rounded-full object-cover ring-1 ring-orange-400"
                />
              ) : (
                <Users className="w-3.5 h-3.5 text-orange-400" />
              )}
              <span className="font-extrabold text-white">
                {activeMember ? activeMember.name.split(' ')[0] : 'Family Hub'}
              </span>
              {familyMembersCount > 0 ? (
                <span className="px-1.5 py-0.2 rounded-full bg-orange-950 text-orange-400 text-[10px] font-black border border-orange-500/30">
                  {familyMembersCount}
                </span>
              ) : (
                <span className="px-1.5 py-0.2 rounded-full bg-orange-600 text-white text-[10px] font-black">
                  + Add
                </span>
              )}
            </button>

            {/* AI Nutribot Icon Button (Compact) */}
            <button
              onClick={() => {
                sfx.playPop();
                onOpenNutribot();
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-orange-950/80 text-orange-300 hover:bg-orange-900/80 border border-orange-500/40 transition-all hover:shadow-sm hover:shadow-orange-500/20 group whitespace-nowrap flex-shrink-0"
              title="Ask TIFFIN AI Nutritionist"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden xl:inline">Nutribot</span>
            </button>

            {/* Parent Account or Sign In button (Desktop) */}
            {currentUser ? (
              <div className="flex items-center gap-1 bg-[#261E18] p-1 pr-2 rounded-full border border-orange-500/30 hover:border-orange-500/60 transition-all shadow-sm group">
                <button
                  onClick={() => {
                    sfx.playPop();
                    onOpenAccount();
                  }}
                  className="flex items-center gap-1.5 text-left"
                  title="Open Parent Account & Subscription Portal"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-orange-400"
                  />
                  <span className="text-[11px] font-extrabold text-[#F5EBE1] group-hover:text-white whitespace-nowrap">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      sfx.playPop();
                      onLogout();
                    }}
                    className="ml-0.5 p-1 rounded-full text-[#8C7B6D] hover:text-rose-400 hover:bg-[#15100C] transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  sfx.playPop();
                  onOpenAuth();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#261E18] text-orange-300 hover:text-white hover:bg-orange-600/30 border border-orange-500/40 transition-all hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 text-orange-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => {
                sfx.playPop();
                onOpenCart();
              }}
              className="relative py-2 px-4 rounded-full bg-orange-600 text-white hover:bg-orange-500 transition-all shadow-md shadow-orange-600/30 hover:shadow-orange-600/50 flex items-center gap-2 text-xs font-extrabold active:scale-95 whitespace-nowrap flex-shrink-0 shimmer-effect"
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

          {/* Mobile & Tablet Top Bar (< lg screens) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-[#261E18] text-[#D4C5B5] border border-orange-500/25 active:scale-95 transition-all"
              title="Toggle sound"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4 text-[#8C7B6D]" />}
            </button>

            {/* Family / Profile Avatar trigger */}
            {currentUser ? (
              <button
                onClick={() => {
                  sfx.playPop();
                  onOpenAccount();
                }}
                className="p-1 rounded-xl bg-[#261E18] border border-orange-500/40 flex items-center justify-center active:scale-95 transition-all"
                title="Parent Account Portal"
                aria-label="Parent Account"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-orange-500"
                />
              </button>
            ) : (
              <button
                onClick={() => {
                  sfx.playPop();
                  onOpenAuth?.();
                }}
                className="p-2 rounded-xl bg-[#261E18] text-orange-400 border border-orange-500/40 hover:text-white active:scale-95 transition-all"
                title="Parent Sign In"
                aria-label="Parent Sign In"
              >
                <LogIn className="w-4 h-4" />
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={() => {
                sfx.playPop();
                onOpenCart();
              }}
              className="relative p-2 rounded-xl bg-orange-600 text-white shadow-md shadow-orange-600/30 flex items-center gap-1 px-2.5 sm:px-3 active:scale-95 transition-all"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-black bg-white text-orange-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => {
                sfx.playPop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 rounded-xl bg-[#261E18] text-[#D4C5B5] border border-orange-500/25 hover:text-white active:scale-95 transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-orange-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile / Tablet Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1C1712]/98 backdrop-blur-2xl border-b border-amber-950/60 px-4 sm:px-6 py-5 shadow-2xl transition-all animate-in slide-in-from-top-2 duration-200 max-h-[82vh] overflow-y-auto overscroll-contain">
          
          {/* User Account / Sign In Status Card */}
          <div className="mb-4">
            {currentUser ? (
              <div className="p-3.5 bg-[#15100C] rounded-2xl border border-orange-500/30 flex items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-orange-500 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-[#F5EBE1] block truncate">{currentUser.name}</span>
                    <span className="text-[11px] text-orange-400 font-semibold block truncate">
                      {currentUser.membershipTier} • ৳{currentUser.walletBalance.toFixed(0)} Balance
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      sfx.playPop();
                      onOpenAccount();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-sm"
                  >
                    Portal
                  </button>
                  {onLogout && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        sfx.playPop();
                        onLogout();
                      }}
                      className="p-1.5 rounded-xl bg-[#261E18] text-[#8C7B6D] hover:text-rose-400 border border-orange-500/20"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  sfx.playPop();
                  onOpenAuth?.();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/30 active:scale-98 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Parent Sign In / Register (+৳500 Welcome Credit)</span>
              </button>
            )}
          </div>

          {/* Navigation Links Grid/List */}
          <div className="flex flex-col gap-1 text-sm font-semibold">
            
            <a
              href="#menu"
              onClick={(e) => scrollToSection(e, '#menu')}
              className="text-[#F5EBE1] hover:text-orange-400 py-3 px-3 rounded-xl hover:bg-[#261E18] border-b border-orange-500/10 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <UtensilsCrossed className="w-4 h-4 text-orange-400" />
                <span>Weekly Lunch Menu</span>
              </div>
              <span className="text-[11px] text-orange-400 font-bold">View 70+ Dishes →</span>
            </a>

            <a
              href="#restaurants"
              onClick={(e) => scrollToSection(e, '#restaurants')}
              className="text-[#F5EBE1] hover:text-orange-400 py-3 px-3 rounded-xl hover:bg-[#261E18] border-b border-orange-500/10 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ChefHat className="w-4 h-4 text-orange-400" />
                <span>Top Dhaka Partner Kitchens</span>
              </div>
              <span className="text-[10px] text-amber-300 font-bold bg-orange-950/80 px-2 py-0.5 rounded-full border border-orange-500/30">Dhaka</span>
            </a>

            <a
              href="#visualizer"
              onClick={(e) => scrollToSection(e, '#visualizer')}
              className="text-[#F5EBE1] hover:text-orange-400 py-3 px-3 rounded-xl hover:bg-[#261E18] border-b border-orange-500/10 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-orange-400" />
                <span>Interactive Bento Builder</span>
              </div>
              <span className="text-[10px] text-orange-400 font-bold">4-Tray Bento</span>
            </a>

            <a
              href="#calculator"
              onClick={(e) => scrollToSection(e, '#calculator')}
              className="text-[#F5EBE1] hover:text-orange-400 py-3 px-3 rounded-xl hover:bg-[#261E18] border-b border-orange-500/10 flex items-center gap-2.5 transition-colors"
            >
              <Scale className="w-4 h-4 text-orange-400" />
              <span>Kid Nutrition & Macro Calculator</span>
            </a>

            <a
              href="#plans"
              onClick={(e) => scrollToSection(e, '#plans')}
              className="text-[#F5EBE1] hover:text-orange-400 py-3 px-3 rounded-xl hover:bg-[#261E18] border-b border-orange-500/10 flex items-center gap-2.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Meal Plans & Pricing</span>
            </a>

            <a
              href="#customizer"
              onClick={(e) => scrollToSection(e, '#customizer')}
              className="text-[#F5EBE1] hover:text-orange-400 py-3 px-3 rounded-xl hover:bg-[#261E18] border-b border-orange-500/10 flex items-center gap-2.5 transition-colors"
            >
              <UtensilsCrossed className="w-4 h-4 text-orange-400" />
              <span>Customise Tiffin Subscription</span>
            </a>

            <a
              href="#tracker"
              onClick={(e) => scrollToSection(e, '#tracker')}
              className="text-[#F5EBE1] hover:text-orange-400 py-3 px-3 rounded-xl hover:bg-[#261E18] border-b border-orange-500/10 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-orange-400" />
                <span>Live Thermal & Van Tracker</span>
              </div>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Live
              </span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                sfx.playPop();
                if (onOpenFamilyHub) onOpenFamilyHub();
              }}
              className="w-full text-left text-[#F5EBE1] hover:text-orange-400 py-3 px-3 rounded-xl hover:bg-[#261E18] border-b border-orange-500/10 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-orange-400" />
                <span>Family Members & Allergies</span>
              </div>
              {familyMembersCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-orange-950 text-orange-400 text-xs font-bold border border-orange-500/30">
                  {familyMembersCount} Members
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-orange-600 text-white text-xs font-bold shadow-sm">
                  + Add Child
                </span>
              )}
            </button>

            <a
              href="#faq"
              onClick={(e) => scrollToSection(e, '#faq')}
              className="text-[#F5EBE1] hover:text-orange-400 py-3 px-3 rounded-xl hover:bg-[#261E18] flex items-center gap-2.5 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-orange-400" />
              <span>Frequently Asked Questions</span>
            </a>

          </div>

          {/* Quick Action Interactive Buttons in Drawer */}
          <div className="pt-4 mt-2 border-t border-amber-950/60 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                sfx.playPop();
                onOpenQuiz();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 active:scale-98 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Take 30-Second Taste Quiz (15% OFF)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                sfx.playPop();
                onOpenNutribot();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold bg-orange-950/80 text-orange-300 border border-orange-500/40 hover:bg-orange-900/80 active:scale-98 transition-all"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Ask TIFFIN Nutribot (AI Meal Advisor)</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
