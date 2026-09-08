import React, { useState } from 'react';
import { WEEKLY_MEALS } from '../data/mockData';
import { MealItem, MealCategory } from '../types';
import { 
  Calendar, 
  Filter, 
  Flame, 
  Plus, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Utensils 
} from 'lucide-react';
import { MealModal } from './MealModal';

interface WeeklyMenuProps {
  onAddToCart: (meal: MealItem) => void;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export const WeeklyMenu: React.FC<WeeklyMenuProps> = ({ onAddToCart }) => {
  const [selectedDay, setSelectedDay] = useState<typeof DAYS_OF_WEEK[number]>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<'all' | MealCategory>('all');
  const [onlyVeg, setOnlyVeg] = useState(false);
  const [onlyNutFree, setOnlyNutFree] = useState(false);
  const [activeMealModal, setActiveMealModal] = useState<MealItem | null>(null);

  // Filter logic
  const filteredMeals = WEEKLY_MEALS.filter((meal) => {
    if (meal.dayOfWeek !== selectedDay) return false;
    if (selectedCategory !== 'all' && meal.category !== selectedCategory) return false;
    if (onlyVeg && !meal.isVegetarian) return false;
    if (onlyNutFree && !meal.isNutFree) return false;
    return true;
  });

  return (
    <section id="menu" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Rotated Weekly by Paediatric Chefs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Interactive Weekly Lunch Menu
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
              Fresh seasonal rotation with balanced carbs, lean proteins, vegetables, and zero trans fats.
            </p>
          </div>

          {/* Dietary toggle chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setOnlyVeg(!onlyVeg)}
              className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                onlyVeg
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>🥦 100% Vegetarian</span>
              {onlyVeg && <Check className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setOnlyNutFree(!onlyNutFree)}
              className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                onlyNutFree
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nut-Free Only</span>
              {onlyNutFree && <Check className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Day of Week Selector Bar */}
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar mb-8">
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-1 min-w-[140px] p-3.5 rounded-2xl text-left font-bold transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Day</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
                </div>
                <span className="text-lg font-extrabold block mt-0.5">{day}</span>
              </button>
            );
          })}
        </div>

        {/* Plan Category Filter */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Plan:
          </span>
          {(['all', 'basic', 'standard', 'premium'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Plans' : `${cat} Plan`}
            </button>
          ))}
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Image & Badges */}
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  
                  {/* Category Chip */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-lg text-white font-extrabold text-[11px] uppercase tracking-wider shadow-sm ${
                      meal.category === 'basic' ? 'bg-emerald-600' :
                      meal.category === 'standard' ? 'bg-blue-600' : 'bg-amber-600'
                    }`}>
                      {meal.category}
                    </span>
                  </div>

                  {/* Price Chip */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-extrabold text-slate-900 shadow-md">
                    ${meal.pricePerDay.toFixed(2)}/day
                  </div>

                  {/* Bottom tags */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {meal.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                    {meal.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 font-medium line-clamp-2">
                    {meal.tagline}
                  </p>

                  {/* Included Items preview */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Tiffin Items Included:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {meal.includedItems.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                      {meal.includedItems.length > 3 && (
                        <li className="text-[11px] font-bold text-emerald-600 pl-3.5">
                          + {meal.includedItems.length - 3} more items & fruit
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Nutrition Highlights Bar */}
                  <div className="mt-4 p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-1 font-bold">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>{meal.nutrition.calories} kcal</span>
                    </div>
                    <div className="font-semibold text-emerald-700">
                      {meal.nutrition.proteinGrams}g Protein
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      {meal.nutrition.fiberGrams}g Fiber
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setActiveMealModal(meal)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Nutrition & Chef Notes</span>
                </button>
                <button
                  onClick={() => onAddToCart(meal)}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                  title="Add this meal"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMeals.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <Utensils className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-base">No meals match your active dietary filters.</h3>
            <p className="text-xs text-slate-500 mt-1">Try toggling off some allergy filters or select another plan.</p>
          </div>
        )}

      </div>

      {/* Detailed Meal Modal */}
      <MealModal
        meal={activeMealModal}
        onClose={() => setActiveMealModal(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
