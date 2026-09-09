import React, { useState } from 'react';
import { WEEKLY_MEALS } from '../data/mockData';
import { MealItem, MealCategory, FamilyMember } from '../types';
import { sfx } from '../utils/audio';
import { 
  Calendar, 
  Filter, 
  Flame, 
  Plus, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Utensils,
  User,
  Users
} from 'lucide-react';
import { MealModal } from './MealModal';

interface WeeklyMenuProps {
  onAddToCart: (meal: MealItem) => void;
  onAddToCartForMember?: (meal: MealItem, member: FamilyMember) => void;
  familyMembers?: FamilyMember[];
  activeMember?: FamilyMember | null;
  onSelectActiveMember?: (member: FamilyMember) => void;
  onOpenFamilyHub?: () => void;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export const WeeklyMenu: React.FC<WeeklyMenuProps> = ({ 
  onAddToCart,
  onAddToCartForMember,
  familyMembers = [],
  activeMember,
  onSelectActiveMember,
  onOpenFamilyHub
}) => {
  const [selectedDay, setSelectedDay] = useState<typeof DAYS_OF_WEEK[number]>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<'all' | MealCategory>('all');
  const [onlyVeg, setOnlyVeg] = useState(false);
  const [onlyNutFree, setOnlyNutFree] = useState(false);
  const [onlyHalal, setOnlyHalal] = useState(false);
  const [onlyHighProtein, setOnlyHighProtein] = useState(false);
  const [activeMealModal, setActiveMealModal] = useState<MealItem | null>(null);

  const handleAddMeal = (meal: MealItem) => {
    if (onAddToCartForMember && activeMember) {
      onAddToCartForMember(meal, activeMember);
    } else {
      onAddToCart(meal);
    }
  };

  const handleDaySelect = (day: typeof DAYS_OF_WEEK[number]) => {
    sfx.playSlot();
    setSelectedDay(day);
  };

  const handleCategorySelect = (cat: 'all' | MealCategory) => {
    sfx.playPop();
    setSelectedCategory(cat);
  };

  const handleToggleVeg = () => {
    sfx.playPop();
    setOnlyVeg(!onlyVeg);
  };

  const handleToggleNutFree = () => {
    sfx.playPop();
    setOnlyNutFree(!onlyNutFree);
  };

  const handleToggleHalal = () => {
    sfx.playPop();
    setOnlyHalal(!onlyHalal);
  };

  const handleToggleHighProtein = () => {
    sfx.playPop();
    setOnlyHighProtein(!onlyHighProtein);
  };

  // Filter logic
  const filteredMeals = WEEKLY_MEALS.filter((meal) => {
    if (meal.dayOfWeek !== selectedDay) return false;
    if (selectedCategory !== 'all' && meal.category !== selectedCategory) return false;
    if (onlyVeg && !meal.isVegetarian) return false;
    if (onlyNutFree && !meal.isNutFree) return false;
    if (onlyHalal && !meal.isHalal) return false;
    if (onlyHighProtein && meal.nutrition.proteinGrams < 25) return false;
    return true;
  });

  return (
    <section id="menu" className="py-20 bg-[#1C1712] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>70+ Chef Meals Rotated Weekly by Paediatric Nutritionists</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive Weekly Lunch Menu
            </h2>
            <p className="text-[#D4C5B5] text-sm sm:text-base mt-2 max-w-xl">
              Fresh seasonal rotation with balanced carbs, lean proteins, vegetables, and zero trans fats. Sealed hot at 72°C in insulated containers.
            </p>
          </div>

          {/* Active Family Member Selector Card or Add Child prompt */}
          {familyMembers.length > 0 && activeMember ? (
            <div className="bg-[#261E18] p-3 rounded-2xl border border-orange-500/25 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#A8988A]">
                <User className="w-4 h-4 text-orange-400" />
                <span>Assigning lunch to:</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
                {familyMembers.map((member) => {
                  const isSelected = activeMember.id === member.id;
                  return (
                    <button
                      key={member.id}
                      onClick={() => {
                        sfx.playPop();
                        if (onSelectActiveMember) onSelectActiveMember(member);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        isSelected
                          ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 ring-1 ring-orange-400'
                          : 'bg-[#15100C] text-[#D4C5B5] hover:text-white hover:bg-[#2F251E] border border-orange-500/20'
                      }`}
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span>{member.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                sfx.playPop();
                if (onOpenFamilyHub) onOpenFamilyHub();
              }}
              className="bg-[#261E18] hover:bg-[#2E241E] p-3 rounded-2xl border border-orange-500/25 shadow-xl flex items-center gap-2.5 text-xs font-bold text-[#D4C5B5] hover:text-white transition-all active:scale-95"
            >
              <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center shadow-sm">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span>+ Add Child to Assign Lunchbox</span>
            </button>
          )}
        </div>

        {/* Dietary toggle chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar mb-6">
          <button
            onClick={handleToggleVeg}
            className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold flex-shrink-0 active:scale-95 ${
              onlyVeg
                ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20'
                : 'bg-[#261E18] text-[#D4C5B5] border-amber-950/80 hover:bg-[#2E241E] hover:border-orange-500/40'
            }`}
          >
            <span>🥦 100% Vegetarian</span>
            {onlyVeg && <Check className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleToggleHalal}
            className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold flex-shrink-0 active:scale-95 ${
              onlyHalal
                ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20'
                : 'bg-[#261E18] text-[#D4C5B5] border-amber-950/80 hover:bg-[#2E241E] hover:border-orange-500/40'
            }`}
          >
            <span>✨ 100% Halal</span>
            {onlyHalal && <Check className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleToggleHighProtein}
            className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold flex-shrink-0 active:scale-95 ${
              onlyHighProtein
                ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20'
                : 'bg-[#261E18] text-[#D4C5B5] border-amber-950/80 hover:bg-[#2E241E] hover:border-orange-500/40'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>High-Protein (25g+)</span>
            {onlyHighProtein && <Check className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleToggleNutFree}
            className={`px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold flex-shrink-0 active:scale-95 ${
              onlyNutFree
                ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20'
                : 'bg-[#261E18] text-[#D4C5B5] border-amber-950/80 hover:bg-[#2E241E] hover:border-orange-500/40'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
            <span>Nut-Free Only</span>
            {onlyNutFree && <Check className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Day of Week Selector Bar */}
        <div className="flex overflow-x-auto pb-3 gap-2.5 sm:gap-3 no-scrollbar mb-6 snap-x">
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => handleDaySelect(day)}
                className={`flex-1 min-w-[115px] sm:min-w-[140px] p-3 sm:p-3.5 rounded-2xl text-left font-bold transition-all border snap-start active:scale-95 flex-shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 text-white border-orange-500 shadow-lg shadow-orange-600/25 scale-[1.02]'
                    : 'bg-[#261E18] hover:bg-[#2E241E] text-[#9E8C7D] hover:text-[#D4C5B5] border-amber-950/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] sm:text-xs uppercase tracking-wider font-bold ${isSelected ? 'text-orange-100' : 'text-orange-500/80'}`}>Day</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
                </div>
                <span className="text-base sm:text-lg font-extrabold block mt-0.5 text-white">{day}</span>
              </button>
            );
          })}
        </div>

        {/* Plan Category Filter & Dish Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <span className="text-xs font-bold text-[#9E8C7D] uppercase mr-1 flex items-center gap-1 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 text-orange-400" /> Filter:
            </span>
            {(['all', 'basic', 'standard', 'premium'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap flex-shrink-0 active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'bg-[#261E18] text-[#D4C5B5] border border-amber-950/80 hover:bg-[#2E241E] hover:border-orange-500/40'
                }`}
              >
                {cat === 'all' ? 'All Plans' : `${cat} Plan`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-orange-400 bg-[#261E18] px-3.5 py-1.5 rounded-xl border border-orange-500/20 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{filteredMeals.length} Fresh Tiffins on {selectedDay}</span>
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-[#261E18] rounded-3xl border border-orange-500/20 shadow-xl hover:shadow-2xl hover:shadow-orange-950/50 hover:border-orange-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover-glow-card"
            >
              {/* Image & Badges */}
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-[#15100C]">
                  <img
                    src={meal.imageUrl}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15100C] via-[#15100C]/30 to-transparent"></div>
                  
                  {/* Category & Cuisine Chips */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-lg text-white font-extrabold text-[11px] uppercase tracking-wider shadow-sm ${
                      meal.category === 'basic' ? 'bg-orange-600' :
                      meal.category === 'standard' ? 'bg-amber-600' : 'bg-orange-700'
                    }`}>
                      {meal.category}
                    </span>
                    {meal.originCuisine && (
                      <span className="px-2 py-1 rounded-lg bg-[#15100C]/85 backdrop-blur-md border border-orange-500/30 text-amber-300 font-bold text-[10px] shadow-sm">
                        {meal.originCuisine}
                      </span>
                    )}
                  </div>

                  {/* Price Chip with Glow */}
                  <div className="absolute top-3 right-3 bg-[#15100C]/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-extrabold text-orange-400 border border-orange-500/30 shadow-md group-hover:border-orange-400 group-hover:text-amber-300 transition-colors">
                    ${meal.pricePerDay.toFixed(2)}/day
                  </div>

                  {/* Bottom tags */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {meal.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-[#15100C]/80 border border-orange-500/20 backdrop-blur-sm text-[#D4C5B5] text-[10px] font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors leading-snug">
                    {meal.name}
                  </h3>
                  <p className="text-xs text-[#D4C5B5] mt-1.5 font-medium line-clamp-2">
                    {meal.tagline}
                  </p>

                  {/* Included Items preview */}
                  <div className="mt-4 pt-3 border-t border-amber-950/60 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E8C7D] block">
                      Tiffin Items Included:
                    </span>
                    <ul className="text-xs text-[#D4C5B5] space-y-1">
                      {meal.includedItems.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-xs"></span>
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                      {meal.includedItems.length > 3 && (
                        <li className="text-[11px] font-bold text-orange-400 pl-3.5">
                          + {meal.includedItems.length - 3} more items & fruit
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Nutrition Highlights Bar */}
                  <div className="mt-4 p-2.5 rounded-xl bg-[#17120E] border border-orange-500/15 flex items-center justify-between text-xs text-[#D4C5B5] group-hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-1 font-bold text-white">
                      <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                      <span>{meal.nutrition.calories} kcal</span>
                    </div>
                    <div className="font-semibold text-orange-400">
                      {meal.nutrition.proteinGrams}g Protein
                    </div>
                    <div className="text-[#9E8C7D] text-[11px]">
                      {meal.nutrition.fiberGrams}g Fiber
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setActiveMealModal(meal)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-orange-500/20 text-[#D4C5B5] hover:text-white hover:bg-[#2E241E] hover:border-orange-500/50 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5 text-orange-400" />
                  <span>Nutrition & Chef Notes</span>
                </button>
                <button
                  onClick={() => handleAddMeal(meal)}
                  className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-all shadow-md shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-105 active:scale-95 shimmer-effect flex items-center gap-1"
                  title={activeMember ? `Add meal for ${activeMember.name}` : 'Add this meal'}
                >
                  <Plus className="w-4 h-4" />
                  {activeMember && <span className="text-[10px] hidden sm:inline">{activeMember.name.split(' ')[0]}</span>}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMeals.length === 0 && (
          <div className="text-center py-16 bg-[#261E18] rounded-3xl border border-dashed border-amber-950/80">
            <Utensils className="w-10 h-10 text-[#9E8C7D] mx-auto mb-3" />
            <h3 className="font-bold text-[#D4C5B5] text-base">No meals match your active dietary filters.</h3>
            <p className="text-xs text-[#9E8C7D] mt-1">Try toggling off some allergy filters or select another plan.</p>
          </div>
        )}

      </div>

      {/* Detailed Meal Modal */}
      <MealModal
        meal={activeMealModal}
        onClose={() => setActiveMealModal(null)}
        onAddToCart={handleAddMeal}
      />
    </section>
  );
};
