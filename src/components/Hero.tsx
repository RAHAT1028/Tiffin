import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Star, 
  HeartHandshake, 
  ThermometerSun, 
  Award 
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCustomizer: () => void;
  onOpenNutribot: () => void;
  onOpenQuiz?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenCustomizer, onOpenNutribot, onOpenQuiz }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden subtle-mesh">
      {/* Decorative ambient glowing flares */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-orange-600/20 via-amber-500/15 to-orange-500/10 blur-3xl -z-10 rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs sm:text-sm font-semibold shadow-md shadow-orange-950/50">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span>TIFFIN • 100% Nut-Free & Temperature Controlled</span>
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Warm, wholesome <br className="hidden sm:inline" />
              <span className="gradient-text">school lunches</span> <br />
              delivered directly to your child's desk.
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-[#D4C5B5] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              No more early morning lunchbox stress. We prepare balanced, chef-crafted, allergen-safe meals every morning and deliver them hot in eco-insulated stainless tiffin boxes by lunchtime.
            </p>

            {/* Key Value Proposition Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1 text-[#D4C5B5] text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Insulated at 65°C+</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Strict Allergen Filters</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>Cancel Same-Day (7 AM)</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-4">
              <button
                onClick={() => {
                  sfx.playPop();
                  onOpenCustomizer();
                }}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-600/30 hover:shadow-2xl hover:shadow-orange-600/50 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 group shimmer-effect animate-glow-orange"
              >
                <span>Customise Tiffin Subscription</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {onOpenQuiz && (
                <button
                  onClick={() => {
                    sfx.playPop();
                    onOpenQuiz();
                  }}
                  className="w-full sm:w-auto px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-[#261E18] hover:bg-[#30261F] text-amber-300 border border-amber-500/40 hover:border-amber-400 font-bold text-xs sm:text-sm shadow-md hover:shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span>30s Taste Quiz</span>
                </button>
              )}

              <a
                href="#visualizer"
                onClick={() => sfx.playPop()}
                className="w-full sm:w-auto px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-[#241D17] hover:bg-[#2C231C] text-[#D4C5B5] border border-orange-500/20 hover:text-white hover:border-orange-500/50 font-bold text-xs sm:text-sm shadow-sm hover:shadow-lg hover:shadow-orange-950/40 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>🍱 Interactive Bento</span>
              </a>
            </div>

            {/* Trust & Rating Bar */}
            <div className="pt-6 border-t border-amber-950/60 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#9E8C7D]">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#1C1712]" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Parent" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#1C1712]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Parent" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#1C1712]" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Parent" />
                </div>
                <div className="text-left pl-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#FFFDF8]">4.9/5 from 1,200+ Dhaka Parents</span>
                </div>
              </div>

              <div className="h-6 w-px bg-amber-950/80 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-500 animate-pulse" />
                <span className="font-medium text-[#D4C5B5]">BSTI & School Board Approved</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            
            {/* Ambient Background Aura */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-orange-600/20 via-amber-500/20 to-transparent blur-2xl rounded-3xl -z-10 pointer-events-none animate-pulse-glow-orange"></div>

            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Top-Right Floating Certified Badge */}
              <div className="hidden sm:flex absolute -top-4 -right-3 z-20 bg-[#17120E]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-amber-500/40 shadow-xl items-center gap-2.5 animate-float">
                <span className="text-lg">🥦</span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wide">100% Certified</span>
                  <span className="text-xs font-black text-white">Nut-Free Kitchen</span>
                </div>
              </div>

              {/* Main Card: Today's Featured Hot Tiffin */}
              <div className="bg-[#261E18]/95 backdrop-blur-xl rounded-3xl p-5 shadow-2xl shadow-black/80 border border-orange-500/30 relative hover-glow-card">
                
                {/* Food Image Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                    alt="School Tiffin Meal"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15100C]/95 via-[#15100C]/30 to-transparent"></div>
                  
                  {/* Floating Thermal Badge inside image */}
                  <div className="absolute top-3 right-3 z-10 bg-[#15100C]/85 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg border border-orange-500/40">
                    <ThermometerSun className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                    <span className="text-orange-300 font-bold">Serving Temp: 68°C</span>
                  </div>

                  {/* Meal Info inside image bottom */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-600 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      Today's Special
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black mt-1 text-white tracking-tight">
                      Paneer Veggie Pulao & Berry Cup
                    </h3>
                    <p className="text-xs text-[#D4C5B5] font-medium line-clamp-1 mt-0.5">
                      Freshly prepared at 6:30 AM • Delivered warm to Oakridge Academy
                    </p>
                  </div>
                </div>

                {/* Meal highlights / nutrition bar */}
                <div className="mt-4 pt-3 border-t border-amber-950/60 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-[#17120E] border border-orange-500/15 p-2.5 rounded-xl hover:border-orange-500/30 transition-colors">
                    <span className="text-[#9E8C7D] block text-[10px] uppercase font-bold">Calories</span>
                    <span className="font-extrabold text-white text-sm">420 kcal</span>
                  </div>
                  <div className="bg-[#17120E] border border-orange-500/15 p-2.5 rounded-xl hover:border-orange-500/30 transition-colors">
                    <span className="text-[#9E8C7D] block text-[10px] uppercase font-bold">Protein</span>
                    <span className="font-extrabold text-orange-400 text-sm">16g</span>
                  </div>
                  <div className="bg-[#17120E] border border-orange-500/15 p-2.5 rounded-xl hover:border-orange-500/30 transition-colors">
                    <span className="text-[#9E8C7D] block text-[10px] uppercase font-bold">Allergens</span>
                    <span className="font-extrabold text-[#D4C5B5] text-xs">Nut-Free</span>
                  </div>
                </div>

                {/* Live Delivery Status Simulator pill */}
                <div className="mt-4 bg-gradient-to-r from-orange-950/50 via-[#1C1712] to-[#15100C] border border-orange-500/30 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-600/40">
                      <Clock className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate">Van #4 Dispatched</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
                      </div>
                      <p className="text-[11px] text-[#9E8C7D] truncate">ETA to Class 3B: 11:35 AM (On Schedule)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-orange-400 bg-orange-950/80 border border-orange-500/40 px-2.5 py-1 rounded-lg flex-shrink-0">
                    Live
                  </span>
                </div>

                {/* Integrated Parent Review Snippet */}
                <div className="mt-3.5 pt-3 border-t border-amber-950/60 flex items-center justify-between gap-3 bg-[#17120E]/90 rounded-2xl p-3 border border-orange-500/20">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-orange-950/80 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs font-bold text-white truncate mt-0.5">"100% empty lunchbox!"</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#A8988A] whitespace-nowrap font-medium">
                    Nusrat J. (Scholastica Dhaka)
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
