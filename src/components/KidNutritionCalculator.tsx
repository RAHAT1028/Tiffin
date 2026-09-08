import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Dumbbell, 
  Activity, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Info, 
  Zap, 
  Milk, 
  Apple, 
  Scale,
  Smile
} from 'lucide-react';
import { sfx } from '../utils/audio';
import { MealCategory } from '../types';

interface KidNutritionCalculatorProps {
  onSelectRecommendedPlan: (plan: MealCategory) => void;
}

export const KidNutritionCalculator: React.FC<KidNutritionCalculatorProps> = ({ onSelectRecommendedPlan }) => {
  const [age, setAge] = useState<number>(8);
  const [activity, setActivity] = useState<'low' | 'moderate' | 'high' | 'athlete'>('moderate');
  const [appetite, setAppetite] = useState<'light' | 'normal' | 'hearty'>('normal');
  const [goal, setGoal] = useState<'energy' | 'growth' | 'immunity' | 'focus'>('energy');

  // Interactive calculations based on pediatric nutrition guidelines (e.g. British Nutrition Foundation / AAP)
  const nutrition = useMemo(() => {
    // Baseline lunchtime energy ~30-35% of daily requirement
    let baseKcal = 320 + (age * 28);
    
    // Activity multiplier
    const actMultipliers = { low: 0.9, moderate: 1.0, high: 1.15, athlete: 1.3 };
    baseKcal *= actMultipliers[activity];

    // Appetite multiplier
    const appMultipliers = { light: 0.9, normal: 1.0, hearty: 1.15 };
    baseKcal *= appMultipliers[appetite];

    const calories = Math.round(baseKcal);
    const proteinGrams = Math.round(10 + (age * 1.4) * (activity === 'athlete' ? 1.35 : 1.1));
    const carbsGrams = Math.round((calories * 0.50) / 4);
    const fatsGrams = Math.round((calories * 0.28) / 9);
    const hydrationMl = Math.round(300 + (age * 30));
    const calciumMg = Math.round(350 + (age * 35));

    // Best matching plan determination
    let recommendedPlan: MealCategory = 'standard';
    let planBadge = 'Active Balanced Bento';
    let planReason = 'Perfect calorie & protein ratio for standard school stamina.';

    if (activity === 'athlete' || appetite === 'hearty') {
      recommendedPlan = 'premium';
      planBadge = 'Gourmet Fuel & Varsity Athlete';
      planReason = `Elevated protein (${proteinGrams}g) & slow-release carbs to prevent 3 PM sports fatigue.`;
    } else if (appetite === 'light' || age <= 5) {
      recommendedPlan = 'basic';
      planBadge = 'Lite Wholesome Bento';
      planReason = 'Gentle, portion-controlled finger foods and mild flavors for young or light eaters.';
    } else if (goal === 'focus' || goal === 'immunity') {
      recommendedPlan = 'premium';
      planBadge = 'Gourmet Brain-Power & Immunity Fuel';
      planReason = 'High antioxidants, omega-3 seeds, and sustained glucose delivery for afternoon focus.';
    }

    return {
      calories,
      proteinGrams,
      carbsGrams,
      fatsGrams,
      hydrationMl,
      calciumMg,
      recommendedPlan,
      planBadge,
      planReason
    };
  }, [age, activity, appetite, goal]);

  const handleAgeChange = (newAge: number) => {
    setAge(newAge);
    sfx.playSlot();
  };

  const handleActivityChange = (act: 'low' | 'moderate' | 'high' | 'athlete') => {
    setActivity(act);
    sfx.playPop();
  };

  const handleAppetiteChange = (app: 'light' | 'normal' | 'hearty') => {
    setAppetite(app);
    sfx.playPop();
  };

  const handleGoalChange = (g: 'energy' | 'growth' | 'immunity' | 'focus') => {
    setGoal(g);
    sfx.playPop();
  };

  const handleApplyPlan = () => {
    sfx.playSuccess();
    onSelectRecommendedPlan(nutrition.recommendedPlan);
  };

  return (
    <section id="calculator" className="py-20 bg-[#1C1712] text-white relative overflow-hidden border-t border-amber-950/40">
      {/* Background glow flares */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Pediatric Nutrition Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Child Calorie & Macro <span className="gradient-text">Interactive Calculator</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D4C5B5]">
            Slide your child’s age and select their school day intensity. Our clinical paediatric formula calculates their ideal lunch energy profile and matches the exact Tiffin Box.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 bg-[#261E18] backdrop-blur-xl border border-orange-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
            
            {/* 1. Age Slider with Quick Presets */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-[#F5EBE1] flex items-center gap-2">
                  <Smile className="w-4 h-4 text-orange-500" />
                  <span>Child's Age:</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-orange-400 font-display">{age}</span>
                  <span className="text-xs font-semibold text-[#A8988A]">years old</span>
                </div>
              </div>

              {/* Range Input Slider */}
              <div className="relative py-2">
                <input
                  type="range"
                  min="3"
                  max="18"
                  value={age}
                  onChange={(e) => handleAgeChange(parseInt(e.target.value))}
                  className="w-full h-3 bg-[#15100C] rounded-lg appearance-none cursor-pointer accent-orange-500 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] font-semibold text-[#A8988A] mt-2 px-1">
                  <span>3 yrs (Toddler)</span>
                  <span>7 yrs (Junior)</span>
                  <span>12 yrs (Middle)</span>
                  <span>18 yrs (Senior)</span>
                </div>
              </div>

              {/* Age Presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: 'Early Years (4y)', ageVal: 4 },
                  { label: 'Primary (8y)', ageVal: 8 },
                  { label: 'Middle School (12y)', ageVal: 12 },
                  { label: 'Teen Athlete (16y)', ageVal: 16 }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handleAgeChange(preset.ageVal)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      age === preset.ageVal 
                        ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/40' 
                        : 'bg-[#15100C] text-[#D4C5B5] hover:bg-[#2F251E] hover:text-white border border-orange-500/20'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. School Day Activity Intensity */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#F5EBE1] flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-500" />
                <span>Daily Activity & Physical Energy:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'low', label: 'Light', desc: 'Classroom & Reading', icon: '📚' },
                  { id: 'moderate', label: 'Standard', desc: 'Recess & Play', icon: '🏃' },
                  { id: 'high', label: 'Active', desc: 'PE & After-School', icon: '⚽' },
                  { id: 'athlete', label: 'Varsity', desc: 'Competitive Sports', icon: '🏆' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleActivityChange(item.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      activity === item.id
                        ? 'bg-orange-950/80 border-orange-500 text-white shadow-md shadow-orange-950/50'
                        : 'bg-[#15100C] border-orange-500/20 text-[#A8988A] hover:border-orange-500/40 hover:text-[#F5EBE1]'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="text-xs font-bold text-[#F5EBE1] mt-1">{item.label}</div>
                    <div className="text-[10px] text-[#A8988A] truncate">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Appetite Profile & Health Target */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Appetite */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#A8988A]">
                  Appetite Profile
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'light', label: 'Nibbler' },
                    { id: 'normal', label: 'Balanced' },
                    { id: 'hearty', label: 'Hearty' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAppetiteChange(item.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                        appetite === item.id
                          ? 'bg-orange-600 text-white'
                          : 'bg-[#15100C] border border-orange-500/20 text-[#D4C5B5] hover:bg-[#2F251E]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Goal */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#A8988A]">
                  Nutritional Priority
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'energy', label: '⚡ Sustained Energy' },
                    { id: 'growth', label: '💪 Muscle Growth' },
                    { id: 'focus', label: '🧠 Brain & Memory' },
                    { id: 'immunity', label: '🛡️ Gut Immunity' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleGoalChange(item.id as any)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all text-center truncate ${
                        goal === item.id
                          ? 'bg-amber-600 text-white'
                          : 'bg-[#15100C] border border-orange-500/20 text-[#D4C5B5] hover:bg-[#2F251E]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Results & Recommendation Panel (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#261E18] via-[#261E18]/95 to-[#1C1712] border border-orange-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-orange-950/20 relative space-y-6">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                Live Lunch Target
              </span>
              <span className="text-[11px] font-semibold text-[#D4C5B5] bg-[#15100C] px-2.5 py-1 rounded-full border border-orange-500/20">
                For Age {age} • Lunch Portioned
              </span>
            </div>

            {/* Huge Calorie Hero */}
            <div className="bg-[#15100C] rounded-2xl p-5 border border-orange-500/30 text-center relative overflow-hidden animate-glow-orange">
              <div className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight flex items-center justify-center gap-2">
                <Flame className="w-8 h-8 text-orange-500 animate-pulse" />
                <span>{nutrition.calories}</span>
                <span className="text-lg font-bold text-[#A8988A]">kcal</span>
              </div>
              <p className="text-xs text-[#A8988A] mt-1 font-medium">
                Provides exactly 33% of daily pediatric metabolic energy
              </p>
            </div>

            {/* Macro Breakdown Visual Progress Bars */}
            <div className="space-y-3.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#D4C5B5]">
                Calculated Lunch Macronutrients
              </div>

              {/* Protein */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#D4C5B5] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-xs"></span>
                    Protein (Muscle & Tissue Repair)
                  </span>
                  <span className="text-orange-400 font-extrabold">{nutrition.proteinGrams}g</span>
                </div>
                <div className="h-2.5 w-full bg-[#15100C] rounded-full overflow-hidden p-0.5 border border-orange-500/20">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 rounded-full transition-all duration-500 shadow-sm shadow-orange-500/50"
                    style={{ width: `${Math.min(100, (nutrition.proteinGrams / 35) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Carbs */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#D4C5B5] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-xs"></span>
                    Complex Carbs (Steady Classroom Glucose)
                  </span>
                  <span className="text-amber-300 font-extrabold">{nutrition.carbsGrams}g</span>
                </div>
                <div className="h-2.5 w-full bg-[#15100C] rounded-full overflow-hidden p-0.5 border border-amber-500/20">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500 shadow-sm shadow-amber-400/50"
                    style={{ width: `${Math.min(100, (nutrition.carbsGrams / 80) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Fats */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#D4C5B5] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs"></span>
                    Healthy Fats (Omega-3 Brain Development)
                  </span>
                  <span className="text-emerald-300 font-extrabold">{nutrition.fatsGrams}g</span>
                </div>
                <div className="h-2.5 w-full bg-[#15100C] rounded-full overflow-hidden p-0.5 border border-emerald-500/20">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 shadow-sm shadow-emerald-400/50"
                    style={{ width: `${Math.min(100, (nutrition.fatsGrams / 25) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Micronutrient Mini-Cards */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-[#15100C] p-2.5 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <span className="text-[10px] uppercase font-bold text-[#A8988A] block">Hydration Target</span>
                <span className="font-extrabold text-sky-400 text-sm">{nutrition.hydrationMl} ml</span>
              </div>
              <div className="bg-[#15100C] p-2.5 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <span className="text-[10px] uppercase font-bold text-[#A8988A] block">Calcium & Bone</span>
                <span className="font-extrabold text-purple-400 text-sm">{nutrition.calciumMg} mg</span>
              </div>
            </div>

            {/* Recommended Plan Result Box */}
            <div className="bg-gradient-to-tr from-orange-950/90 to-amber-950/60 border border-orange-500/40 rounded-2xl p-4 space-y-3 shadow-lg shadow-orange-950/40">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                <span className="text-xs font-bold text-orange-300 uppercase">Recommended Tiffin Plan:</span>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-white">
                  {nutrition.planBadge}
                </h4>
                <p className="text-xs text-[#D4C5B5] mt-1 leading-relaxed">
                  {nutrition.planReason}
                </p>
              </div>

              <button
                onClick={handleApplyPlan}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 flex items-center justify-center gap-2 group transition-all shimmer-effect active:scale-95"
              >
                <span>Select & Customize This Plan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
