import React from 'react';
import { MEAL_PLANS } from '../data/mockData';
import { Check, Sparkles, Star, Zap } from 'lucide-react';
import { MealCategory } from '../types';

interface MealPlanSelectorProps {
  onSelectPlan: (planId: MealCategory) => void;
}

export const MealPlanSelector: React.FC<MealPlanSelectorProps> = ({ onSelectPlan }) => {
  return (
    <section id="plans" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100/70 px-3 py-1 rounded-full">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Flexible meal plans tailored to your child's appetite.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Choose between budget-friendly wholesome classics, high-protein vitality meals, or chef-curated gourmet bento boxes. Pause or cancel anytime.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEAL_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.isPopular
                  ? 'bg-white shadow-xl shadow-blue-900/10 border-2 border-blue-500 md:-translate-y-2'
                  : 'bg-white shadow-md border border-slate-200/80 hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-extrabold text-slate-900">{plan.name}</h3>
                  {!plan.isPopular && (
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 mb-6 min-h-[36px]">{plan.description}</p>

                {/* Pricing Display */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">${plan.price.toFixed(2)}</span>
                    <span className="text-sm font-semibold text-slate-500">/ day</span>
                  </div>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">
                    ${plan.weeklyPrice5Day.toFixed(2)} / week (5 full school days)
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Free hot insulated delivery included</p>
                </div>

                {/* Best For */}
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                    Target Audience:
                  </span>
                  <p className="text-xs font-semibold text-slate-700 bg-emerald-50/70 text-emerald-900 px-3 py-1.5 rounded-xl border border-emerald-200/60">
                    {plan.bestFor}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                    What's included:
                  </span>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(plan.id as MealCategory)}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                  plan.isPopular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 hover:shadow-md'
                    : plan.id === 'premium'
                    ? 'bg-slate-900 hover:bg-slate-800 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <span>Select {plan.name}</span>
                <Sparkles className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Zero Commitment & 100% Satisfaction Guarantee</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Child not loving a dish? We will credit your account instantly. Pause anytime when going on holiday or if your child is sick.
              </p>
            </div>
          </div>
          <a
            href="#customizer"
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors"
          >
            Calculate Weekly Cost
          </a>
        </div>

      </div>
    </section>
  );
};
