import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WeeklyMenu } from './components/WeeklyMenu';
import { InteractiveTiffinVisualizer } from './components/InteractiveTiffinVisualizer';
import { KidNutritionCalculator } from './components/KidNutritionCalculator';
import { MealPlanSelector } from './components/MealPlanSelector';
import { TiffinCustomizer } from './components/TiffinCustomizer';
import { LiveTracker } from './components/LiveTracker';
import { HygieneSection } from './components/HygieneSection';
import { InteractiveFAQ } from './components/InteractiveFAQ';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { NutribotChat } from './components/NutribotChat';
import { CartDrawer } from './components/CartDrawer';
import { TasteQuizModal } from './components/TasteQuizModal';
import { MealItem, MealCategory, ChildProfile, SubscriptionConfig } from './types';
import { Sparkles, MessageSquareHeart, Award, Flame } from 'lucide-react';
import { sfx } from './utils/audio';

export const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<MealItem[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<{
    profile: ChildProfile;
    config: SubscriptionConfig;
    weeklyTotal: number;
  } | null>(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [nutribotOpen, setNutribotOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [customizerPlan, setCustomizerPlan] = useState<MealCategory>('standard');
  const [customizerProfile, setCustomizerProfile] = useState<Partial<ChildProfile>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (meal: MealItem) => {
    sfx.playSuccess();
    setCartItems((prev) => [...prev, meal]);
    showToast(`Added ${meal.name} to your tiffin lunchbox!`);
  };

  const handleAddCustomTrayToCart = (traySummary: string, price: number) => {
    const customMeal: MealItem = {
      id: `custom-bento-${Date.now()}`,
      name: `Custom Bento: ${traySummary}`,
      tagline: 'Chef-assembled custom 4-compartment hot insulated lunch tray',
      description: 'Handcrafted personalized bento lunchbox, sealed hot at 72°C in a double-wall thermal stainless container.',
      category: 'standard',
      pricePerDay: price,
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      dayOfWeek: 'Monday',
      allergens: [],
      tags: ['Custom Bento', 'Nut-Free', 'Insulated 65°C'],
      isVegetarian: false,
      isHalal: true,
      isNutFree: true,
      nutrition: {
        calories: 520,
        proteinGrams: 26,
        carbsGrams: 58,
        fatGrams: 14,
        fiberGrams: 7,
      },
      chefNote: 'Custom partitioned and sealed with child-friendly easy-open thermal latch.',
      includedItems: [traySummary]
    };
    sfx.playSuccess();
    setCartItems((prev) => [...prev, customMeal]);
    showToast(`Added your Custom Bento Tray to the lunchbox!`);
    setCartOpen(true);
  };

  const handleRemoveCartItem = (index: number) => {
    sfx.playPop();
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePlanSelect = (planId: MealCategory) => {
    sfx.playPop();
    setCustomizerPlan(planId);
    const customizerEl = document.getElementById('customizer');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Selected ${planId.toUpperCase()} plan! Fill child details below.`);
  };

  const handleSelectRecommendedPlan = (plan: MealCategory) => {
    sfx.playSuccess();
    setCustomizerPlan(plan);
    const customizerEl = document.getElementById('customizer');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Applied pediatric plan: ${plan.toUpperCase()}!`);
  };

  const handleApplyQuizResults = (plan: MealCategory, partialProfile: Partial<ChildProfile>) => {
    sfx.playSuccess();
    setCustomizerPlan(plan);
    setCustomizerProfile(partialProfile);
    const customizerEl = document.getElementById('customizer');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Quiz profile for ${partialProfile.name || 'your child'} applied to Customizer!`);
  };

  const handleStartSubscription = (
    profile: ChildProfile,
    config: SubscriptionConfig,
    weeklyTotal: number
  ) => {
    sfx.playSuccess();
    setActiveSubscription({
      profile,
      config,
      weeklyTotal
    });
    setCartOpen(true);
    showToast(`Created subscription for ${profile.name}!`);
  };

  const handleClearSubscription = () => {
    sfx.playPop();
    setActiveSubscription(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1C1712] text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Navigation */}
      <Navbar
        onOpenCart={() => {
          sfx.playPop();
          setCartOpen(true);
        }}
        cartCount={cartItems.length + (activeSubscription ? 1 : 0)}
        onOpenNutribot={() => {
          sfx.playPop();
          setNutribotOpen(true);
        }}
        onOpenQuiz={() => {
          sfx.playPop();
          setQuizOpen(true);
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => {
            sfx.playPop();
            document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCustomizer={() => {
            sfx.playPop();
            document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenNutribot={() => {
            sfx.playPop();
            setNutribotOpen(true);
          }}
          onOpenQuiz={() => {
            sfx.playPop();
            setQuizOpen(true);
          }}
        />

        {/* Weekly Menu Showcase */}
        <WeeklyMenu onAddToCart={handleAddToCart} />

        {/* Interactive Bento Tray Visualizer */}
        <InteractiveTiffinVisualizer onAddCustomTrayToCart={handleAddCustomTrayToCart} />

        {/* Interactive Pediatric Nutrition Calculator */}
        <KidNutritionCalculator onSelectRecommendedPlan={handleSelectRecommendedPlan} />

        {/* Meal Plans & Pricing Cards */}
        <MealPlanSelector onSelectPlan={handlePlanSelect} />

        {/* Personalised Tiffin Customizer */}
        <TiffinCustomizer
          selectedPlanInitial={customizerPlan}
          initialProfile={customizerProfile}
          onStartSubscription={handleStartSubscription}
        />

        {/* Live Lunch & Temperature Tracker */}
        <LiveTracker />

        {/* Hygiene, Allergen Quarantine & Safety */}
        <HygieneSection />

        {/* Interactive Searchable FAQ */}
        <InteractiveFAQ onOpenNutribot={() => setNutribotOpen(true)} />

        {/* Testimonials & Partner Schools */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Buttons (Bottom Right / Left) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-3">
        {/* Floating Taste Quiz Pill */}
        <button
          onClick={() => {
            sfx.playPop();
            setQuizOpen(true);
          }}
          className="bg-slate-900/90 hover:bg-slate-800 text-amber-300 px-4 py-3 rounded-full shadow-2xl border border-amber-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group backdrop-blur-md"
          aria-label="Take 30s Taste Quiz"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
          <span className="font-extrabold text-xs">30s Taste Quiz</span>
          <span className="px-1.5 py-0.2 text-[9px] bg-amber-500 text-black font-black rounded-full">15% OFF</span>
        </button>

        {/* Floating AI Nutribot Bubble */}
        <button
          onClick={() => {
            sfx.playPop();
            setNutribotOpen(true);
          }}
          className="bg-gradient-to-tr from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white p-4 rounded-full shadow-2xl shadow-orange-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group border-2 border-orange-400/40"
          aria-label="Ask AI Nutritionist"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-45 transition-transform text-white" />
          <span className="hidden sm:inline font-extrabold text-xs pr-1">Ask AI Nutribot</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 border border-orange-500/40 text-white px-5 py-3.5 rounded-2xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in slide-in-from-left duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 30-Second Taste Quiz Modal */}
      <TasteQuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        onApplyPlanAndProfile={handleApplyQuizResults}
      />

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
