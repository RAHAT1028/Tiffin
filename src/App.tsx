import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WeeklyMenu } from './components/WeeklyMenu';
import { MealPlanSelector } from './components/MealPlanSelector';
import { TiffinCustomizer } from './components/TiffinCustomizer';
import { LiveTracker } from './components/LiveTracker';
import { HygieneSection } from './components/HygieneSection';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { NutribotChat } from './components/NutribotChat';
import { CartDrawer } from './components/CartDrawer';
import { MealItem, MealCategory, ChildProfile, SubscriptionConfig } from './types';
import { Sparkles, MessageSquareHeart } from 'lucide-react';

export const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<MealItem[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<{
    profile: ChildProfile;
    config: SubscriptionConfig;
    weeklyTotal: number;
  } | null>(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [nutribotOpen, setNutribotOpen] = useState(false);
  const [customizerPlan, setCustomizerPlan] = useState<MealCategory>('standard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (meal: MealItem) => {
    setCartItems((prev) => [...prev, meal]);
    showToast(`Added ${meal.name} to your tiffin lunchbox!`);
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePlanSelect = (planId: MealCategory) => {
    setCustomizerPlan(planId);
    const customizerEl = document.getElementById('customizer');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Selected ${planId.toUpperCase()} plan! Fill child details below.`);
  };

  const handleStartSubscription = (
    profile: ChildProfile,
    config: SubscriptionConfig,
    weeklyTotal: number
  ) => {
    setActiveSubscription({
      profile,
      config,
      weeklyTotal
    });
    setCartOpen(true);
    showToast(`Created subscription for ${profile.name}!`);
  };

  const handleClearSubscription = () => {
    setActiveSubscription(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf8] text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Navigation */}
      <Navbar
        onOpenCart={() => setCartOpen(true)}
        cartCount={cartItems.length + (activeSubscription ? 1 : 0)}
        onOpenNutribot={() => setNutribotOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => {
            document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCustomizer={() => {
            document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenNutribot={() => setNutribotOpen(true)}
        />

        {/* Weekly Menu Showcase */}
        <WeeklyMenu onAddToCart={handleAddToCart} />

        {/* Meal Plans & Pricing */}
        <MealPlanSelector onSelectPlan={handlePlanSelect} />

        {/* Personalised Tiffin Customizer */}
        <TiffinCustomizer
          selectedPlanInitial={customizerPlan}
          onStartSubscription={handleStartSubscription}
        />

        {/* Live Lunch & Temperature Tracker */}
        <LiveTracker />

        {/* Hygiene, Allergen Quarantine & Safety */}
        <HygieneSection />

        {/* Testimonials & Partner Schools */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Nutribot Bubble (bottom right) */}
      <button
        onClick={() => setNutribotOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white p-4 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group border-2 border-white"
        aria-label="Ask AI Nutritionist"
      >
        <Sparkles className="w-6 h-6 animate-spin-slow group-hover:rotate-45 transition-transform" />
        <span className="hidden sm:inline font-extrabold text-xs pr-1">Ask AI Nutribot</span>
      </button>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in slide-in-from-left duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Nutribot Chat Modal */}
      <NutribotChat
        isOpen={nutribotOpen}
        onClose={() => setNutribotOpen(false)}
      />

      {/* Cart & Subscription Review Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        subscription={activeSubscription}
        onRemoveItem={handleRemoveCartItem}
        onClearSubscription={handleClearSubscription}
      />

    </div>
  );
};

export default App;
