import React from 'react';
import { MEAL_PLANS } from '../data/mockData';
import { Check, Sparkles, Star, Zap } from 'lucide-react';
import { MealCategory } from '../types';

interface MealPlanSelectorProps {
  onSelectPlan: (planId: MealCategory) => void;
  onOpenAccount?: () => void;
}

export const MealPlanSelector: React.FC<MealPlanSelectorProps> = ({ onSelectPlan, onOpenAccount }) => {
  return (
    <section id="plans" className="py-20 bg-[#1C1712] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-950/80 border border-orange-500/30 px-3 py-1 rounded-full">
              Transparent Pricing
            </span>
            {onOpenAccount && (
              <button
                onClick={onOpenAccount}
                className="text-xs font-bold text-amber-300 hover:text-white bg-[#261E18] hover:bg-[#2F251E] border border-orange-500/30 px-3 py-1 rounded-full transition-all flex items-center gap-1"
              >
                <span>Parent Account Portal →</span>
              </button>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Flexible meal plans tailored to your child's appetite.
          </h2>
          <p className="text-[#D4C5B5] text-base sm:text-lg mt-3">
            Choose between budget-friendly wholesome classics, high-protein vitality meals, or chef-curated gourmet bento boxes. Pause or cancel anytime.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEAL_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative hover-glow-card ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-[#2F251E] to-[#261E18] shadow-2xl shadow-orange-950/60 border-2 border-orange-500 md:-translate-y-2 animate-glow-orange'
                  : 'bg-[#261E18] shadow-xl border border-orange-500/20 hover:border-orange-500/50 hover:shadow-2xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg shadow-orange-600/40 flex items-center gap-1 animate-pulse">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-200" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-extrabold text-white">{plan.name}</h3>
                  {!plan.isPopular && (
                    <span className="text-xs font-bold text-[#D4C5B5] bg-[#15100C] border border-amber-950/80 px-2.5 py-1 rounded-lg">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#D4C5B5] mb-6 min-h-[36px]">{plan.description}</p>

                {/* Pricing Display */}
                <div className="mb-6 p-4 rounded-2xl bg-[#15100C] border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">৳{plan.price}</span>
                    <span className="text-sm font-semibold text-[#9E8C7D]">/ day</span>
                  </div>
                  <p className="text-xs text-orange-400 font-semibold mt-1">
                    ৳{plan.weeklyPrice5Day} / week (5 full school days)
                  </p>
                  <p className="text-[11px] text-[#9E8C7D] mt-0.5">Free hot insulated delivery included</p>
                </div>

                {/* Best For */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase text-[#9E8C7D] tracking-wider block mb-1">
                    Target Audience:
                  </span>
                  <p className="text-xs font-semibold text-orange-300 bg-orange-950/60 border border-orange-500/30 px-3 py-1.5 rounded-xl">
                    {plan.bestFor}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-bold uppercase text-[#9E8C7D] tracking-wider block">
                    What's included:
                  </span>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D4C5B5]">
                      <div className="w-4 h-4 rounded-full bg-orange-950 text-orange-400 border border-orange-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(plan.id as MealCategory)}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-600/40 hover:shadow-2xl hover:shadow-orange-600/50 hover:scale-[1.02] active:scale-95 shimmer-effect'
                    : 'bg-[#15100C] hover:bg-[#2F251E] text-white border border-orange-500/25 hover:border-orange-500/50 hover:scale-[1.02] active:scale-95'
                }`}
              >
                <span>Select {plan.name}</span>
                <Sparkles className="w-4 h-4 text-orange-300" />
              </button>

            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-[#261E18] rounded-3xl p-6 sm:p-8 border border-orange-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-950/80 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Zero Commitment & 100% Satisfaction Guarantee</h4>
              <p className="text-xs sm:text-sm text-[#D4C5B5]">
                Child not loving a dish? We will credit your account instantly. Pause anytime when going on holiday or if your child is sick.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {onOpenAccount && (
              <button
                onClick={onOpenAccount}
                className="whitespace-nowrap px-5 py-3 rounded-xl bg-[#15100C] hover:bg-[#2F251E] text-[#D4C5B5] hover:text-white border border-orange-500/30 font-bold text-xs sm:text-sm transition-colors"
              >
                Manage Active Plan
              </button>
            )}
            <a
              href="#customizer"
              className="whitespace-nowrap px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm transition-colors shadow-md shadow-orange-600/20"
            >
              Calculate Weekly Cost
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
