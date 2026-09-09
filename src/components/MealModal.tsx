import React from 'react';
import { MealItem } from '../types';
import { 
  X, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  Plus, 
  ThermometerSun, 
  Heart 
} from 'lucide-react';

interface MealModalProps {
  meal: MealItem | null;
  onClose: () => void;
  onAddToCart: (meal: MealItem) => void;
}

export const MealModal: React.FC<MealModalProps> = ({ meal, onClose, onAddToCart }) => {
  if (!meal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#1C1712] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-orange-500/25 text-[#F5EBE1] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#15100C]/90 hover:bg-[#261E18] text-[#D4C5B5] shadow-md backdrop-blur-md border border-orange-500/30 transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#15100C]">
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1712] via-[#1C1712]/40 to-transparent"></div>
          
          {/* Day & Category & Cuisine badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-xl bg-[#15100C]/90 backdrop-blur-md text-[#F5EBE1] font-bold text-xs border border-orange-500/30">
              {meal.dayOfWeek}
            </span>
            <span className={`px-3 py-1 rounded-xl text-white font-bold text-xs uppercase tracking-wider ${
              meal.category === 'basic' ? 'bg-orange-600' :
              meal.category === 'standard' ? 'bg-amber-600' : 'bg-orange-700'
            }`}>
              {meal.category} Plan
            </span>
            {meal.originCuisine && (
              <span className="px-3 py-1 rounded-xl bg-[#15100C]/90 backdrop-blur-md text-amber-300 font-bold text-xs border border-orange-500/30">
                {meal.originCuisine}
              </span>
            )}
            {meal.rating && (
              <span className="px-3 py-1 rounded-xl bg-[#15100C]/90 backdrop-blur-md text-amber-400 font-bold text-xs border border-orange-500/30 flex items-center gap-1">
                ★ {meal.rating.toFixed(1)}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5EBE1] leading-tight">
              {meal.name}
            </h3>
            <p className="text-sm text-[#D4C5B5] mt-1 font-medium">
              {meal.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Description & Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-orange-500/20">
            <div>
              <span className="text-xs font-bold uppercase text-orange-400">Meal Overview</span>
              <p className="text-sm text-[#D4C5B5] mt-1 leading-relaxed">{meal.description}</p>
            </div>
            <div className="text-left sm:text-right flex-shrink-0 bg-[#15100C] p-3 rounded-2xl border border-orange-500/20">
              <span className="text-xs text-[#A8988A] block font-semibold">Individual Day Rate</span>
              <span className="text-2xl font-extrabold text-orange-400">${meal.pricePerDay.toFixed(2)}</span>
            </div>
          </div>

          {/* Included Items in Tiffin Compartments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A8988A] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>What's inside the 4-compartment hot tiffin:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {meal.includedItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#261E18] border border-orange-500/20 text-xs font-semibold text-[#F5EBE1]">
                  <div className="w-5 h-5 rounded-full bg-orange-950/80 text-orange-400 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Facts Breakdown Grid */}
          <div className="bg-[#15100C] rounded-2xl p-4 border border-orange-500/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4C5B5] mb-3 flex items-center justify-between">
              <span>Macronutrient Breakdown (Per Serving)</span>
              <span className="text-orange-400 font-semibold text-[11px]">Paediatric Nutrition Certified</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-[#261E18] p-3 rounded-xl border border-orange-500/20">
                <span className="text-[11px] text-[#A8988A] font-bold block">Energy</span>
                <span className="text-base font-extrabold text-[#F5EBE1]">{meal.nutrition.calories} kcal</span>
              </div>
              <div className="bg-[#261E18] p-3 rounded-xl border border-orange-500/20">
                <span className="text-[11px] text-[#A8988A] font-bold block">Protein</span>
                <span className="text-base font-extrabold text-orange-400">{meal.nutrition.proteinGrams}g</span>
              </div>
              <div className="bg-[#261E18] p-3 rounded-xl border border-orange-500/20">
                <span className="text-[11px] text-[#A8988A] font-bold block">Carbohydrates</span>
                <span className="text-base font-extrabold text-amber-400">{meal.nutrition.carbsGrams}g</span>
              </div>
              <div className="bg-[#261E18] p-3 rounded-xl border border-orange-500/20">
                <span className="text-[11px] text-[#A8988A] font-bold block">Dietary Fiber</span>
                <span className="text-base font-extrabold text-orange-300">{meal.nutrition.fiberGrams}g</span>
              </div>
            </div>
          </div>

          {/* Chef Notes & Temperature Guarantee */}
          {meal.chefNote && (
            <div className="p-4 rounded-2xl bg-orange-950/40 border border-orange-500/40 text-xs text-orange-200 flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5 text-orange-300">Chef's Quality & Thermal Note:</span>
                <span className="text-[#D4C5B5]">{meal.chefNote}</span>
              </div>
            </div>
          )}

          {/* Allergen & Dietary Status */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-bold text-[#A8988A] mr-2">Allergen Safety:</span>
            {meal.isNutFree && (
              <span className="px-2.5 py-1 rounded-lg bg-orange-950/80 border border-orange-500/40 text-orange-300 font-bold text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                100% Nut Free
              </span>
            )}
            {meal.allergens.length === 0 ? (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 font-bold text-[11px]">
                Top-9 Allergen Free
              </span>
            ) : (
              meal.allergens.map((alg) => (
                <span key={alg} className="px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-600/50 text-rose-300 font-semibold text-[11px] flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  Contains {alg}
                </span>
              ))
            )}
          </div>

          {/* Action footer */}
          <div className="pt-4 border-t border-orange-500/20 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-orange-500/30 text-[#D4C5B5] font-bold text-xs hover:bg-[#261E18] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAddToCart(meal);
                onClose();
              }}
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Meal Subscription (${meal.pricePerDay.toFixed(2)})</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
