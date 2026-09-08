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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md backdrop-blur-md transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
          
          {/* Day & Category badge */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs">
              {meal.dayOfWeek}
            </span>
            <span className={`px-3 py-1 rounded-xl text-white font-bold text-xs uppercase tracking-wider ${
              meal.category === 'basic' ? 'bg-emerald-600' :
              meal.category === 'standard' ? 'bg-blue-600' : 'bg-amber-600'
            }`}>
              {meal.category} Plan
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {meal.name}
            </h3>
            <p className="text-sm text-slate-200 mt-1 font-medium">
              {meal.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Description & Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase text-slate-400">Meal Overview</span>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{meal.description}</p>
            </div>
            <div className="text-left sm:text-right flex-shrink-0 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-400 block font-semibold">Individual Day Rate</span>
              <span className="text-2xl font-extrabold text-slate-900">${meal.pricePerDay.toFixed(2)}</span>
            </div>
          </div>

          {/* Included Items in Tiffin Compartments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>What's inside the 4-compartment hot tiffin:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {meal.includedItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Facts Breakdown Grid */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
              <span>Macronutrient Breakdown (Per Serving)</span>
              <span className="text-emerald-700 font-semibold text-[11px]">Paediatric Nutrition Certified</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                <span className="text-[11px] text-slate-400 font-bold block">Energy</span>
                <span className="text-base font-extrabold text-slate-900">{meal.nutrition.calories} kcal</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                <span className="text-[11px] text-slate-400 font-bold block">Protein</span>
                <span className="text-base font-extrabold text-emerald-600">{meal.nutrition.proteinGrams}g</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                <span className="text-[11px] text-slate-400 font-bold block">Carbohydrates</span>
                <span className="text-base font-extrabold text-blue-600">{meal.nutrition.carbsGrams}g</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                <span className="text-[11px] text-slate-400 font-bold block">Dietary Fiber</span>
                <span className="text-base font-extrabold text-amber-600">{meal.nutrition.fiberGrams}g</span>
              </div>
            </div>
          </div>

          {/* Chef Notes & Temperature Guarantee */}
          {meal.chefNote && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Chef's Quality & Thermal Note:</span>
                <span>{meal.chefNote}</span>
              </div>
            </div>
          )}

          {/* Allergen & Dietary Status */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-bold text-slate-500 mr-2">Allergen Safety:</span>
            {meal.isNutFree && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Nut Free
              </span>
            )}
            {meal.allergens.length === 0 ? (
              <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 font-bold text-[11px]">
                Top-9 Allergen Free
              </span>
            ) : (
              meal.allergens.map((alg) => (
                <span key={alg} className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-semibold text-[11px] flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-500" />
                  Contains {alg}
                </span>
              ))
            )}
          </div>

          {/* Action footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAddToCart(meal);
                onClose();
              }}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 hover:shadow-lg flex items-center gap-2 transition-all"
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
