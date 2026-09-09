import React, { useState } from 'react';
import { TOP_PARTNER_RESTAURANTS } from '../data/mockData';
import { PartnerRestaurant, MealItem, FamilyMember } from '../types';
import { sfx } from '../utils/audio';
import { 
  UtensilsCrossed, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Flame, 
  Clock, 
  Award, 
  Plus, 
  ChevronRight, 
  X, 
  Eye, 
  Check, 
  User, 
  ChefHat,
  ThermometerSun,
  Layers,
  Heart
} from 'lucide-react';

interface TopRestaurantsProps {
  onAddToCartForMember: (meal: MealItem, member?: FamilyMember | null) => void;
  familyMembers?: FamilyMember[];
  activeMember?: FamilyMember | null;
  onSelectActiveMember?: (member: FamilyMember) => void;
}

export const TopRestaurants: React.FC<TopRestaurantsProps> = ({
  onAddToCartForMember,
  familyMembers = [],
  activeMember = null,
  onSelectActiveMember
}) => {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedRestaurantModal, setSelectedRestaurantModal] = useState<PartnerRestaurant | null>(null);
  const [targetMemberForAdd, setTargetMemberForAdd] = useState<FamilyMember | null>(activeMember);

  // Sync target member when activeMember changes
  React.useEffect(() => {
    setTargetMemberForAdd(activeMember);
  }, [activeMember]);

  const cuisines = ['all', 'Kacchi & Biryani', 'Kebab & Grill', 'Burgers & Bistro', 'Pan-Asian & Bento', 'Italian & Pasta', 'Middle Eastern', 'Healthy & Continental'];

  const filteredRestaurants = TOP_PARTNER_RESTAURANTS.filter((rest) => {
    if (selectedCuisine === 'all') return true;
    return rest.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase()) ||
           rest.name.toLowerCase().includes(selectedCuisine.toLowerCase());
  });

  const handleOrderDish = (dish: MealItem, member?: FamilyMember | null) => {
    sfx.playSuccess();
    onAddToCartForMember(dish, member);
  };

  return (
    <section id="restaurants" className="py-20 bg-[#15100C] text-white relative border-t border-amber-950/40">
      
      {/* Background glow flares */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-5 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ChefHat className="w-4 h-4 text-orange-400" />
              <span>Dhaka Cloud Kitchens & Partner Restaurants</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Order From Top Dhaka Partner Restaurants
            </h2>
            <p className="text-[#D4C5B5] text-sm sm:text-base mt-2 max-w-2xl">
              Authentic chef specialties from premier vetted Dhaka kitchens (Dhanmondi, Gulshan, Banani, Uttara & Bashundhara). Sealed in certified vacuum insulation and delivered fresh to school lockers or family office desks.
            </p>
          </div>

          {/* Quick Family Member Order Selector */}
          {familyMembers.length > 0 && activeMember ? (
            <div className="bg-[#261E18] p-3 rounded-2xl border border-orange-500/25 shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#A8988A]">
                <User className="w-4 h-4 text-orange-400" />
                <span>Ordering for:</span>
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
                        setTargetMemberForAdd(member);
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
                      <span className="text-[10px] opacity-80">({member.relation})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#261E18] border border-orange-500/25 text-xs text-[#D4C5B5] font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct Insulated Delivery to Dhaka Lockers & Desks</span>
            </div>
          )}
        </div>

        {/* Cuisine Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar mb-8">
          {cuisines.map((c) => (
            <button
              key={c}
              onClick={() => {
                sfx.playPop();
                setSelectedCuisine(c);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap flex-shrink-0 active:scale-95 ${
                selectedCuisine === c
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/25'
                  : 'bg-[#261E18] text-[#D4C5B5] border border-amber-950/80 hover:bg-[#2F251E] hover:border-orange-500/40'
              }`}
            >
              {c === 'all' ? 'All Top Kitchens' : `${c} Kitchens`}
            </button>
          ))}
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-[#261E18] rounded-3xl border border-orange-500/20 shadow-2xl hover:border-orange-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group hover-glow-card"
            >
              <div>
                {/* Banner & Rating */}
                <div className="relative h-48 w-full overflow-hidden bg-[#15100C]">
                  <img
                    src={restaurant.bannerImage}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#261E18] via-[#261E18]/40 to-transparent"></div>

                  {/* Logo Emoji Badge */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-[#15100C]/90 backdrop-blur-md border border-orange-500/30 flex items-center justify-center text-xl shadow-lg">
                    {restaurant.logo}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-[#15100C]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/30 flex items-center gap-1.5 text-xs font-extrabold text-amber-300 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{restaurant.rating.toFixed(2)}</span>
                    <span className="text-[10px] text-[#A8988A]">({restaurant.reviewCount})</span>
                  </div>

                  {/* Cuisine & Temp Guarantee */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-bold">
                    <span className="px-2.5 py-1 rounded-lg bg-orange-950/85 border border-orange-500/30 text-orange-300 backdrop-blur-md">
                      {restaurant.cuisine}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-950/85 border border-emerald-500/30 text-emerald-300 backdrop-blur-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      5★ Hygiene
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors">
                      {restaurant.name}
                    </h3>
                    <p className="text-xs text-[#D4C5B5] mt-1 font-medium line-clamp-2">
                      {restaurant.tagline}
                    </p>
                  </div>

                  {/* Chef & Certification Tag */}
                  <div className="p-3 bg-[#15100C] rounded-2xl border border-orange-500/20 text-xs space-y-1">
                    <div className="flex items-center gap-2 text-orange-300 font-bold">
                      <ChefHat className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                      <span className="line-clamp-1">{restaurant.headChef}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#A8988A] text-[11px]">
                      <ThermometerSun className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span className="line-clamp-1">{restaurant.deliveryGuarantee}</span>
                    </div>
                  </div>

                  {/* Popular Dishes Showcase */}
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#A8988A] block mb-2">
                      Chef Signature Tiffin Dishes:
                    </span>
                    <div className="space-y-2">
                      {restaurant.popularDishes.slice(0, 2).map((dish) => (
                        <div
                          key={dish.id}
                          className="p-2.5 bg-[#15100C]/80 hover:bg-[#15100C] rounded-xl border border-orange-500/15 flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={dish.imageUrl}
                              alt={dish.name}
                              className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-white block truncate">
                                {dish.name}
                              </span>
                              <span className="text-[10px] text-orange-400 font-black">
                                ৳{dish.pricePerDay} • {dish.nutrition.proteinGrams}g Protein
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleOrderDish(dish, activeMember)}
                            className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-[11px] flex items-center gap-1 transition-all flex-shrink-0 shadow-xs active:scale-95"
                            title={activeMember ? `Add ${dish.name} for ${activeMember.name}` : `Add ${dish.name} to cart`}
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => {
                    sfx.playPop();
                    setSelectedRestaurantModal(restaurant);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#15100C] hover:bg-[#2F251E] border border-orange-500/30 text-xs font-bold text-[#D4C5B5] hover:text-white flex items-center justify-center gap-1.5 transition-all group-hover:border-orange-500/60"
                >
                  <Eye className="w-3.5 h-3.5 text-orange-400" />
                  <span>View All {restaurant.popularDishes.length} Kitchen Dishes</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8C7B6D] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* FULL RESTAURANT MENU MODAL */}
      {selectedRestaurantModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedRestaurantModal(null)}
        >
          <div 
            className="bg-[#1C1712] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-orange-500/30 text-[#F5EBE1] relative animate-in zoom-in-95 duration-200 p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-orange-500/20 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-[#15100C] border border-orange-500/30 flex items-center justify-center text-3xl shadow-md">
                  {selectedRestaurantModal.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-white">
                      {selectedRestaurantModal.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {selectedRestaurantModal.rating}
                    </span>
                  </div>
                  <p className="text-xs text-[#D4C5B5] mt-1">
                    {selectedRestaurantModal.tagline}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedRestaurantModal(null)}
                className="p-2.5 rounded-full bg-[#15100C] hover:bg-[#261E18] text-[#D4C5B5] hover:text-white border border-orange-500/30 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chef Certification Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#15100C] rounded-2xl border border-orange-500/20 text-xs">
                <span className="text-[10px] text-[#A8988A] uppercase font-bold block">Executive Master Chef</span>
                <span className="font-extrabold text-orange-300">{selectedRestaurantModal.headChef}</span>
              </div>
              <div className="p-3 bg-[#15100C] rounded-2xl border border-orange-500/20 text-xs">
                <span className="text-[10px] text-[#A8988A] uppercase font-bold block">Safety Certification</span>
                <span className="font-extrabold text-emerald-300">{selectedRestaurantModal.hygieneCertificate}</span>
              </div>
              <div className="p-3 bg-[#15100C] rounded-2xl border border-orange-500/20 text-xs">
                <span className="text-[10px] text-[#A8988A] uppercase font-bold block">Thermal Packing</span>
                <span className="font-extrabold text-amber-300">{selectedRestaurantModal.deliveryGuarantee}</span>
              </div>
            </div>

            {/* Target Family Member Selector inside modal (if family exists) */}
            {familyMembers.length > 0 && (
              <div className="p-4 bg-[#261E18] rounded-2xl border border-orange-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-[#F5EBE1] flex items-center gap-1.5">
                  <User className="w-4 h-4 text-orange-400" />
                  <span>Select Family Member to Receive Dish:</span>
                </span>
                <div className="flex items-center gap-2 overflow-x-auto max-w-full">
                  {familyMembers.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setTargetMemberForAdd(m)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        targetMemberForAdd?.id === m.id
                          ? 'bg-orange-600 text-white shadow-md'
                          : 'bg-[#15100C] text-[#D4C5B5] hover:text-white border border-orange-500/20'
                      }`}
                    >
                      <img src={m.avatar} alt={m.name} className="w-4 h-4 rounded-full object-cover" />
                      <span>{m.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Full Dish List */}
            <div className="space-y-4">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#A8988A]">
                Available Kitchen Menu ({selectedRestaurantModal.popularDishes.length} Items):
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedRestaurantModal.popularDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="p-4 rounded-2xl bg-[#15100C] border border-orange-500/20 flex flex-col justify-between space-y-3 hover:border-orange-500/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-extrabold text-sm text-white leading-snug">
                          {dish.name}
                        </h5>
                        <p className="text-[11px] text-[#A8988A] mt-1 line-clamp-2">
                          {dish.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-orange-500/15 text-xs">
                      <div>
                        <span className="font-black text-sm text-orange-400">
                          ৳{dish.pricePerDay}
                        </span>
                        <span className="text-[10px] text-[#A8988A] ml-2">
                          {dish.nutrition.calories} kcal • {dish.nutrition.proteinGrams}g P
                        </span>
                      </div>

                      <button
                        onClick={() => handleOrderDish(dish, targetMemberForAdd || activeMember)}
                        className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-orange-600/30 active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{targetMemberForAdd ? `Add for ${targetMemberForAdd.name.split(' ')[0]}` : 'Add to Lunchbox'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-orange-500/20 flex items-center justify-between text-xs text-[#A8988A]">
              <span>🛡️ 100% Sealed & Sanitized by Certified Head Chefs</span>
              <button
                onClick={() => setSelectedRestaurantModal(null)}
                className="px-5 py-2 rounded-xl bg-[#15100C] hover:bg-[#2F251E] text-white font-bold text-xs border border-orange-500/25"
              >
                Close Menu
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
