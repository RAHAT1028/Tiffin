import React, { useState, useEffect } from 'react';
import { MealCategory, Allergen, ChildProfile, SubscriptionConfig } from '../types';
import { MEAL_PLANS, PARTNER_SCHOOLS } from '../data/mockData';
import { sfx } from '../utils/audio';
import { 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Plus, 
  User, 
  School, 
  Calendar, 
  ArrowRight, 
  Utensils 
} from 'lucide-react';

interface TiffinCustomizerProps {
  onStartSubscription: (profile: ChildProfile, config: SubscriptionConfig, totalWeekly: number) => void;
  selectedPlanInitial?: MealCategory;
  initialProfile?: Partial<ChildProfile>;
}

const ALLERGEN_OPTIONS: { id: Allergen; label: string }[] = [
  { id: 'nuts', label: 'Peanuts & Tree Nuts' },
  { id: 'dairy', label: 'Cow Dairy / Lactose' },
  { id: 'gluten', label: 'Gluten / Wheat' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'soy', label: 'Soy / Soya' },
  { id: 'seafood', label: 'Seafood & Shellfish' },
  { id: 'sesame', label: 'Sesame Seeds' }
];

export const TiffinCustomizer: React.FC<TiffinCustomizerProps> = ({ 
  onStartSubscription, 
  selectedPlanInitial = 'standard',
  initialProfile
}) => {
  const [name, setName] = useState(initialProfile?.name || 'Oliver');
  const [ageGroup, setAgeGroup] = useState<'nursery' | 'primary' | 'secondary'>(
    initialProfile?.ageGroup || 'primary'
  );
  const [school, setSchool] = useState(initialProfile?.schoolName || PARTNER_SCHOOLS[0]);
  const [gradeClass, setGradeClass] = useState(initialProfile?.gradeClass || 'Class 3B');
  const [allergies, setAllergies] = useState<Allergen[]>(initialProfile?.allergies || ['nuts']);
  const [specialNotes, setSpecialNotes] = useState(initialProfile?.notes || 'Please pack mild spices only.');

  const [plan, setPlan] = useState<MealCategory>(selectedPlanInitial);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [portionSize, setPortionSize] = useState<'regular' | 'large'>('regular');
  
  // Add-ons
  const [fruitBowl, setFruitBowl] = useState(true);
  const [coldPressedJuice, setColdPressedJuice] = useState(false);
  const [organicYoghurt, setOrganicYoghurt] = useState(true);
  const [proteinCookie, setProteinCookie] = useState(false);

  useEffect(() => {
    if (selectedPlanInitial) {
      setPlan(selectedPlanInitial);
    }
  }, [selectedPlanInitial]);

  useEffect(() => {
    if (initialProfile) {
      if (initialProfile.name) setName(initialProfile.name);
      if (initialProfile.allergies) setAllergies(initialProfile.allergies);
      if (initialProfile.schoolName) setSchool(initialProfile.schoolName);
    }
  }, [initialProfile]);

  // Toggle allergen
  const toggleAllergen = (alg: Allergen) => {
    sfx.playPop();
    if (allergies.includes(alg)) {
      setAllergies(allergies.filter((a) => a !== alg));
    } else {
      setAllergies([...allergies, alg]);
    }
  };

  // Base plan price
  const activePlanObj = MEAL_PLANS.find((p) => p.id === plan) || MEAL_PLANS[1];
  const baseDaily = activePlanObj.price;
  
  // Add-ons daily cost
  let addOnsDaily = 0;
  if (fruitBowl) addOnsDaily += 1.20;
  if (coldPressedJuice) addOnsDaily += 1.80;
  if (organicYoghurt) addOnsDaily += 1.00;
  if (proteinCookie) addOnsDaily += 0.90;

  // Portion multiplier
  const portionMultiplier = portionSize === 'large' ? 1.2 : 1.0;

  const totalDaily = (baseDaily * portionMultiplier) + addOnsDaily;
  const totalWeekly = totalDaily * daysPerWeek;
  const estimatedMonthly = totalWeekly * 4;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: ChildProfile = {
      name,
      ageGroup,
      schoolName: school,
      gradeClass,
      allergies,
      dietaryPreferences: [],
      notes: specialNotes
    };
    const config: SubscriptionConfig = {
      plan,
      daysPerWeek,
      selectedDays: daysPerWeek === 5 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] : ['Mon', 'Wed', 'Fri'],
      durationWeeks: 4,
      portionSize,
      addOns: {
        fruitBowl,
        coldPressedJuice,
        organicYoghurt,
        proteinCookie
      }
    };
    onStartSubscription(profile, config, totalWeekly);
  };

  return (
    <section id="customizer" className="py-20 bg-[#1C1712] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-950/80 border border-orange-500/30 px-3 py-1 rounded-full">
            Personalised Meal Builder
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Build your child's custom school tiffin plan.
          </h2>
          <p className="text-[#D4C5B5] text-sm sm:text-base mt-2">
            Configure allergy safety, select portion size, add healthy booster snacks, and see live pricing instantly.
          </p>
        </div>

        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Profile & Customisation Options */}
          <div className="lg:col-span-8 bg-[#261E18] rounded-3xl p-6 sm:p-8 border border-orange-500/20 shadow-2xl space-y-8">
            
            {/* Step 1: Child Information */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-amber-950/60">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                <h3 className="font-extrabold text-white text-base">Child & School Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#D4C5B5] mb-1">Child's Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Oliver"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#15100C] border border-orange-500/20 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-[#9E8C7D]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4C5B5] mb-1">Age Group</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'nursery', label: 'Nursery (3-5)' },
                      { id: 'primary', label: 'Primary (6-11)' },
                      { id: 'secondary', label: 'Secondary (12-18)' }
                    ].map((g) => (
                      <button
                        type="button"
                        key={g.id}
                        onClick={() => {
                          sfx.playPop();
                          setAgeGroup(g.id as any);
                        }}
                        className={`py-2 px-1 rounded-xl text-center text-xs font-bold border transition-all ${
                          ageGroup === g.id
                            ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/20'
                            : 'bg-[#15100C] text-[#D4C5B5] border-amber-950/80 hover:bg-[#2F251E]'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4C5B5] mb-1">School Campus</label>
                  <select
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#15100C] border border-orange-500/20 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {PARTNER_SCHOOLS.map((s) => (
                      <option key={s} value={s} className="bg-[#1C1712] text-white">{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4C5B5] mb-1">Class / Grade & Section</label>
                  <input
                    type="text"
                    value={gradeClass}
                    onChange={(e) => setGradeClass(e.target.value)}
                    placeholder="e.g. Class 3B (Room 104)"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#15100C] border border-orange-500/20 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-[#9E8C7D]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Plan & Delivery Days */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-amber-950/60">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                <h3 className="font-extrabold text-white text-base">Select Meal Plan & Schedule</h3>
              </div>

              {/* Plan Choice */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {MEAL_PLANS.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => {
                      sfx.playSlot();
                      setPlan(p.id as MealCategory);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      plan === p.id
                        ? 'border-orange-500 bg-orange-950/40 ring-2 ring-orange-500/30 shadow-lg shadow-orange-950/40'
                        : 'border-orange-500/15 bg-[#15100C] hover:border-orange-500/40 hover:bg-[#231B15]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm text-white">{p.name}</span>
                      <span className="text-xs font-extrabold text-orange-400">${p.price.toFixed(2)}</span>
                    </div>
                    <span className="text-[11px] text-[#9E8C7D] block leading-tight">{p.description}</span>
                  </button>
                ))}
              </div>

              {/* Delivery Days per week */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#D4C5B5] mb-1">Delivery Frequency</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        sfx.playPop();
                        setDaysPerWeek(5);
                      }}
                      className={`p-3 rounded-xl text-center text-xs font-bold border transition-all ${
                        daysPerWeek === 5
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/30'
                          : 'bg-[#15100C] text-[#D4C5B5] border-amber-950/80 hover:bg-[#2F251E]'
                      }`}
                    >
                      <span>5 Days / Week</span>
                      <span className="block text-[10px] font-normal text-orange-100">Monday to Friday</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sfx.playPop();
                        setDaysPerWeek(3);
                      }}
                      className={`p-3 rounded-xl text-center text-xs font-bold border transition-all ${
                        daysPerWeek === 3
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/30'
                          : 'bg-[#15100C] text-[#D4C5B5] border-amber-950/80 hover:bg-[#2F251E]'
                      }`}
                    >
                      <span>3 Days / Week</span>
                      <span className="block text-[10px] font-normal text-[#9E8C7D]">Mon, Wed, Fri</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#D4C5B5] mb-1">Portion Size</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        sfx.playPop();
                        setPortionSize('regular');
                      }}
                      className={`p-3 rounded-xl text-center text-xs font-bold border transition-all ${
                        portionSize === 'regular'
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/30'
                          : 'bg-[#15100C] text-[#D4C5B5] border-amber-950/80 hover:bg-[#2F251E]'
                      }`}
                    >
                      <span>Standard Portion</span>
                      <span className="block text-[10px] font-normal text-[#9E8C7D]">Ages 3-11 standard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sfx.playPop();
                        setPortionSize('large');
                      }}
                      className={`p-3 rounded-xl text-center text-xs font-bold border transition-all ${
                        portionSize === 'large'
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/30'
                          : 'bg-[#15100C] text-[#D4C5B5] border-amber-950/80 hover:bg-[#2F251E]'
                      }`}
                    >
                      <span>Hearty Teen (+20%)</span>
                      <span className="block text-[10px] font-normal text-orange-100">Ages 12-18 / Athletes</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Step 3: Allergies & Dietary Restrictions */}
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-950/60">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center justify-center text-xs font-bold">3</span>
                <h3 className="font-extrabold text-white text-base">Allergy Safety Filters</h3>
              </div>
              <p className="text-xs text-[#D4C5B5] mb-3">
                Select ingredients your child is allergic to. We will automatically substitute or prepare these in segregated allergy-safe zones.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {ALLERGEN_OPTIONS.map((alg) => {
                  const isChecked = allergies.includes(alg.id);
                  return (
                    <button
                      type="button"
                      key={alg.id}
                      onClick={() => toggleAllergen(alg.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-rose-950/80 border-rose-600 text-rose-300'
                          : 'bg-[#15100C] border-orange-500/15 text-[#D4C5B5] hover:bg-[#261E18]'
                      }`}
                    >
                      <span>{alg.label}</span>
                      {isChecked ? (
                        <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold">✕</span>
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-amber-950/80"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Special instructions (e.g. cut fruit in small bite sizes, no spicy pepper)"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#15100C] border border-orange-500/20 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-[#9E8C7D]"
                />
              </div>
            </div>

            {/* Step 4: Healthy Snack Add-Ons */}
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-950/60">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center justify-center text-xs font-bold">4</span>
                <h3 className="font-extrabold text-white text-base">Healthy Afternoon Boosters (Optional)</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  fruitBowl ? 'bg-orange-950/40 border-orange-500/50' : 'bg-[#15100C] border-orange-500/15'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={fruitBowl}
                      onChange={(e) => {
                        sfx.playPop();
                        setFruitBowl(e.target.checked);
                      }}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 bg-[#1C1712] border-amber-950"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Seasonal Organic Fruit Medley</span>
                      <span className="text-[11px] text-[#9E8C7D]">Berries, grapes, apple slices</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-orange-400">+$1.20/day</span>
                </label>

                <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  coldPressedJuice ? 'bg-orange-950/40 border-orange-500/50' : 'bg-[#15100C] border-orange-500/15'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={coldPressedJuice}
                      onChange={(e) => {
                        sfx.playPop();
                        setColdPressedJuice(e.target.checked);
                      }}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 bg-[#1C1712] border-amber-950"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">100% Cold-Pressed Juice</span>
                      <span className="text-[11px] text-[#9E8C7D]">Zero added sugar / preservatives</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-orange-400">+$1.80/day</span>
                </label>

                <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  organicYoghurt ? 'bg-orange-950/40 border-orange-500/50' : 'bg-[#15100C] border-orange-500/15'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={organicYoghurt}
                      onChange={(e) => {
                        sfx.playPop();
                        setOrganicYoghurt(e.target.checked);
                      }}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 bg-[#1C1712] border-amber-950"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Probiotic Greek Yoghurt Cup</span>
                      <span className="text-[11px] text-[#9E8C7D]">Gut health & calcium boost</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-orange-400">+$1.00/day</span>
                </label>

                <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  proteinCookie ? 'bg-orange-950/40 border-orange-500/50' : 'bg-[#15100C] border-orange-500/15'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={proteinCookie}
                      onChange={(e) => {
                        sfx.playPop();
                        setProteinCookie(e.target.checked);
                      }}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500 bg-[#1C1712] border-amber-950"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Chia & Oat Superfood Cookie</span>
                      <span className="text-[11px] text-[#9E8C7D]">Nut-free, high fiber energy</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-orange-400">+$0.90/day</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Summary Card: Live Cost & Checkout */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-[#261E18] rounded-3xl p-6 sm:p-7 border border-orange-500/25 shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-amber-950/60">
                <div>
                  <h4 className="text-lg font-extrabold text-white">Subscription Summary</h4>
                  <p className="text-xs text-[#9E8C7D]">For {name || 'Your Child'} ({school.split('(')[0]})</p>
                </div>
                <span className="w-9 h-9 rounded-2xl bg-orange-950/80 border border-orange-500/30 text-orange-400 flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </span>
              </div>

              {/* Price Line items */}
              <div className="py-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-[#D4C5B5]">
                  <span>{activePlanObj.name} Base Rate ({daysPerWeek} days)</span>
                  <span className="font-bold text-white">${(baseDaily * daysPerWeek).toFixed(2)}</span>
                </div>

                {portionSize === 'large' && (
                  <div className="flex justify-between text-[#D4C5B5]">
                    <span>Hearty Portion Upgrade (+20%)</span>
                    <span className="font-bold text-white">${((baseDaily * 0.2) * daysPerWeek).toFixed(2)}</span>
                  </div>
                )}

                {addOnsDaily > 0 && (
                  <div className="flex justify-between text-[#D4C5B5]">
                    <span>Healthy Booster Snacks ({daysPerWeek} days)</span>
                    <span className="font-bold text-white">${(addOnsDaily * daysPerWeek).toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#D4C5B5]">
                  <span>Insulated Thermal Tiffin Delivery</span>
                  <span className="font-bold text-orange-400 uppercase">FREE</span>
                </div>

                <div className="flex justify-between text-[#D4C5B5]">
                  <span>Segregated Allergy Packaging</span>
                  <span className="font-bold text-orange-400 uppercase">INCLUDED</span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-4 rounded-2xl bg-[#15100C] border border-orange-500/30 text-white mb-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium text-[#9E8C7D]">Weekly Total</span>
                  <span className="text-3xl font-extrabold text-orange-400">${totalWeekly.toFixed(2)}</span>
                </div>
                <div className="flex items-baseline justify-between mt-1 text-[11px] text-[#9E8C7D]">
                  <span>Daily breakdown</span>
                  <span>${totalDaily.toFixed(2)} / school day</span>
                </div>
                <div className="mt-3 pt-3 border-t border-amber-950/60 flex justify-between text-[11px] text-[#D4C5B5]">
                  <span>Est. Monthly (4 weeks)</span>
                  <span className="font-bold text-white">${estimatedMonthly.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="button"
                onClick={handleSubscribe}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 hover:shadow-xl hover:shadow-orange-600/40 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Activate Tiffin Plan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-4 text-center space-y-1">
                <p className="text-[11px] text-[#9E8C7D]">
                  ⚡ Pause or change days anytime via the dashboard
                </p>
                <p className="text-[11px] text-[#9E8C7D]">
                  🛡️ 100% money-back guarantee for untasted meals
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
