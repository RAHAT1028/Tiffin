import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Flame, 
  ShieldCheck, 
  Heart, 
  Smile, 
  Utensils, 
  Copy, 
  Gift, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { sfx } from '../utils/audio';
import { MealCategory, ChildProfile } from '../types';

interface TasteQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPlanAndProfile: (plan: MealCategory, partialProfile: Partial<ChildProfile>) => void;
}

export const TasteQuizModal: React.FC<TasteQuizModalProps> = ({
  isOpen,
  onClose,
  onApplyPlanAndProfile
}) => {
  const [step, setStep] = useState<number>(1);
  
  // Quiz Answers
  const [childName, setChildName] = useState('');
  const [ageGroup, setAgeGroup] = useState<'early' | 'primary' | 'middle' | 'teen'>('primary');
  const [eaterType, setEaterType] = useState<'picky' | 'adventurous' | 'comfort' | 'athlete'>('picky');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(['nuts']);
  const [spiceLevel, setSpiceLevel] = useState<'mild' | 'medium' | 'none'>('none');
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  if (!isOpen) return null;

  const toggleAllergen = (id: string) => {
    sfx.playPop();
    setSelectedAllergens((prev) => 
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    sfx.playSlot();
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      // Finished Quiz -> Step 4 (Results)
      sfx.playSuccess();
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    sfx.playPop();
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleCopyCoupon = () => {
    sfx.playPop();
    navigator.clipboard.writeText('KIDVIBE15');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  // Compute recommendation
  const getRecommendation = () => {
    let plan: MealCategory = 'standard';
    let planTitle = 'Balanced Bento Plus';
    let planDesc = 'Wholesome, colorful, bite-sized portions designed to appeal to picky eaters with zero intimidation.';
    let icon = '🍱';

    if (eaterType === 'athlete') {
      plan = 'premium';
      planTitle = 'Gourmet Fuel & Athlete Box';
      planDesc = 'High protein (28g+) with slow-burning complex grains for rigorous school sports and training.';
      icon = '⚡';
    } else if (eaterType === 'picky' || ageGroup === 'early') {
      plan = 'basic';
      planTitle = 'Lite Comfort Bento (Picky-Eater Approved)';
      planDesc = 'Deconstructed finger foods, mild seasoning, and hidden veggie sauces that kids consistently finish 100%.';
      icon = '🌟';
    } else {
      plan = 'standard';
      planTitle = 'Active Balanced Bento Plus';
      planDesc = 'Packed with colorful organic vegetables, balanced proteins, crunchy seeds, and high-antioxidant fruit pots.';
      icon = '🌱';
    }

    return { plan, planTitle, planDesc, icon };
  };

  const recommendation = getRecommendation();

  const handleApply = () => {
    sfx.playSuccess();
    onApplyPlanAndProfile(recommendation.plan, {
      name: childName.trim() || 'My Child',
      age: ageGroup === 'early' ? 4 : ageGroup === 'primary' ? 8 : ageGroup === 'middle' ? 12 : 16,
      allergies: selectedAllergens
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-orange-500/40 rounded-3xl shadow-2xl shadow-orange-950/40 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-600/30 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">
                30-Second Kid Taste & Allergen Quiz
              </h3>
              <p className="text-[11px] text-slate-400">
                {step < 4 ? `Step ${step} of 3 • Quick Personality Match` : 'Your Perfect Tiffin Match'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="h-1.5 w-full bg-slate-900">
            <div 
              className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-slate-100 space-y-6">
          
          {/* STEP 1: Child Name & Age Group */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-200">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Step 1</span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-1">Who is this tasty tiffin for?</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Tell us your child’s name and school stage so we can calculate exact portion dimensions.
                </p>
              </div>

              {/* Child Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Child's First Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Liam, Arya, Zayd"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm"
                />
              </div>

              {/* Age Group Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  School Stage / Age Bracket
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'early', label: 'Early Years', age: 'Age 3-5', icon: '🧸' },
                    { id: 'primary', label: 'Primary School', age: 'Age 6-10', icon: '🎒' },
                    { id: 'middle', label: 'Middle School', age: 'Age 11-14', icon: '📚' },
                    { id: 'teen', label: 'High / Senior', age: 'Age 15-18', icon: '🎓' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        sfx.playPop();
                        setAgeGroup(item.id as any);
                      }}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        ageGroup === item.id
                          ? 'bg-orange-950/80 border-orange-500 text-white shadow-lg shadow-orange-950/50'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-xs font-bold text-white">{item.label}</div>
                      <div className="text-[11px] text-slate-400">{item.age}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Eating Habit & Taste Profile */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-200">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Step 2</span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-1">How would you describe their eating style?</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  We customize meal textures, sauces, and separation based on pickiness.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    id: 'picky',
                    title: 'Selective / Picky Eater',
                    desc: 'Prefers simple textures, hates foods touching, likes mild crispy finger bites.',
                    icon: '👀'
                  },
                  {
                    id: 'adventurous',
                    title: 'Adventurous Foodie',
                    desc: 'Loves global noodles, teriyaki, curries, wraps, and trying new colorful dishes.',
                    icon: '🌍'
                  },
                  {
                    id: 'comfort',
                    title: 'Comfort Classic Lover',
                    desc: 'Enjoys pasta bakes, cheesy toasts, mild veggie pulao, and fruit pots.',
                    icon: '🧀'
                  },
                  {
                    id: 'athlete',
                    title: 'High Energy Athlete',
                    desc: 'Needs heavy protein, hearty portions, and long-lasting energy for sports practice.',
                    icon: '⚡'
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sfx.playPop();
                      setEaterType(item.id as any);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      eaterType === item.id
                        ? 'bg-orange-950/80 border-orange-500 text-white shadow-md shadow-orange-950/50'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-bold text-white">{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>

              {/* Spice Tolerance */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Spice Tolerance
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'none', label: 'Zero Spice (100% Mild)' },
                    { id: 'mild', label: 'A Little Aromatic Herb' },
                    { id: 'medium', label: 'Likes Flavorful Kick' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        sfx.playPop();
                        setSpiceLevel(item.id as any);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                        spiceLevel === item.id
                          ? 'bg-amber-600 text-white border-amber-500'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Allergens & Dietary Restrictions */}
          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-200">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Step 3</span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-1">Any allergies or dietary needs?</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Our kitchen maintains strict 100% nut-free quarantine and certified batch testing.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'nuts', label: '🥜 100% Nut-Free (Default)', disabled: true },
                  { id: 'dairy', label: '🥛 Dairy / Lactose Free' },
                  { id: 'gluten', label: '🌾 Gluten-Free (Celiac Safe)' },
                  { id: 'halal', label: '🥩 100% Certified Halal' },
                  { id: 'egg', label: '🥚 Egg-Free' },
                  { id: 'veg', label: '🥬 100% Strict Vegetarian' }
                ].map((item) => {
                  const isChecked = selectedAllergens.includes(item.id) || item.disabled;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => !item.disabled && toggleAllergen(item.id)}
                      className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-orange-950/80 border-orange-500 text-orange-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isChecked && <Check className="w-4 h-4 text-orange-400 flex-shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>

              <div className="bg-orange-950/40 border border-orange-500/30 rounded-2xl p-3.5 text-xs text-orange-300 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p>
                  Every individual meal box is sealed with a tamper-evident barcode label stating all kitchen allergen test clearance codes.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Quiz Result & Plan Recommendation */}
          {step === 4 && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/90 border border-orange-500/40 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>AI Recommendation Ready</span>
              </div>

              <div>
                <span className="text-4xl">{recommendation.icon}</span>
                <h4 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  {recommendation.planTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed">
                  {recommendation.planDesc}
                </p>
              </div>

              {/* Matched Profile Summary Pill */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-left grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Child</span>
                  <span className="font-extrabold text-white text-sm">
                    {childName.trim() || 'Your Kid'} ({ageGroup})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Eating Profile</span>
                  <span className="font-extrabold text-orange-400 text-sm capitalize">
                    {eaterType} Eater
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Allergen Flags</span>
                  <span className="font-extrabold text-slate-300 text-sm">
                    {selectedAllergens.length} active filters
                  </span>
                </div>
              </div>

              {/* Coupon Box */}
              <div className="bg-gradient-to-r from-orange-950/80 via-amber-950/60 to-orange-950/80 border border-orange-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Quiz Bonus: 15% OFF First Week</div>
                    <div className="text-[11px] text-orange-300">Use code: <strong className="text-white font-mono">KIDVIBE15</strong></div>
                  </div>
                </div>

                <button
                  onClick={handleCopyCoupon}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-orange-500/40 text-orange-300 hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedCoupon ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCoupon ? 'Code Copied!' : 'Copy Code'}</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={handlePrevStep}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              onClick={handleNextStep}
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all hover:scale-105"
            >
              <span>{step === 3 ? 'Generate My Kid’s Match' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleApply}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-orange-600/40 transition-all hover:scale-[1.02]"
            >
              <span>Apply & Customise Tiffin Subscription</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
