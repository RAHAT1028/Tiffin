import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  RefreshCw, 
  Plus, 
  Check, 
  ThermometerSun, 
  Utensils, 
  Layers, 
  Heart,
  Zap,
  Award,
  Clock,
  Info,
  ChevronRight,
  Smile,
  Leaf,
  Brain
} from 'lucide-react';
import { sfx } from '../utils/audio';

export interface CompartmentOption {
  id: string;
  name: string;
  category: 'main' | 'side' | 'veggie' | 'fruit';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  image: string;
  badge?: string;
  benefit: string;
}

const MAINS: CompartmentOption[] = [
  { 
    id: 'm1', 
    name: 'Grilled Herb Chicken Strips', 
    category: 'main', 
    calories: 240, 
    protein: 28, 
    carbs: 3, 
    fats: 6, 
    fiber: 1,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80', 
    badge: 'High-Protein',
    benefit: 'Lean muscle growth & stamina'
  },
  { 
    id: 'm2', 
    name: 'Mild Golden Paneer Tikka', 
    category: 'main', 
    calories: 220, 
    protein: 16, 
    carbs: 6, 
    fats: 14, 
    fiber: 2,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80', 
    badge: 'Vegetarian',
    benefit: 'Calcium & bone density'
  },
  { 
    id: 'm3', 
    name: 'Teriyaki Wild Salmon Fillet', 
    category: 'main', 
    calories: 270, 
    protein: 26, 
    carbs: 7, 
    fats: 13, 
    fiber: 1,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80', 
    badge: 'Omega-3 DHA',
    benefit: 'Brain focus & visual acuity'
  },
  { 
    id: 'm4', 
    name: 'Lean Turkey Herb Meatballs', 
    category: 'main', 
    calories: 215, 
    protein: 24, 
    carbs: 5, 
    fats: 7, 
    fiber: 1,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80', 
    badge: 'Halal Lean',
    benefit: 'Iron-rich energy boost'
  },
  { 
    id: 'm5', 
    name: 'Honey-Glazed Chicken Tender Bites', 
    category: 'main', 
    calories: 235, 
    protein: 25, 
    carbs: 8, 
    fats: 6, 
    fiber: 1,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', 
    badge: 'Kids Favorite',
    benefit: 'Gentle on sensitive tummies'
  },
  { 
    id: 'm6', 
    name: 'Crisp Herb-Baked Falafel Nuggets', 
    category: 'main', 
    calories: 195, 
    protein: 13, 
    carbs: 19, 
    fats: 7, 
    fiber: 6,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80', 
    badge: 'Plant-Protein',
    benefit: 'High prebiotic fiber'
  }
];

const SIDES: CompartmentOption[] = [
  { 
    id: 's1', 
    name: 'Steamed Calrose Furikake Rice', 
    category: 'side', 
    calories: 160, 
    protein: 4, 
    carbs: 34, 
    fats: 1, 
    fiber: 2,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', 
    badge: 'Japanese Bento',
    benefit: 'Clean, easily digestible fuel'
  },
  { 
    id: 's2', 
    name: 'Tri-Color Organic Quinoa', 
    category: 'side', 
    calories: 140, 
    protein: 6, 
    carbs: 26, 
    fats: 2, 
    fiber: 4,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', 
    badge: 'Supergrain',
    benefit: 'Complete amino acid profile'
  },
  { 
    id: 's3', 
    name: 'Oven-Baked Sweet Potato Wedges', 
    category: 'side', 
    calories: 135, 
    protein: 2, 
    carbs: 29, 
    fats: 1, 
    fiber: 4,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80', 
    badge: 'Low-GI Energy',
    benefit: 'No afternoon sugar crash'
  },
  { 
    id: 's4', 
    name: 'Saffron Fragrant Basmati Rice', 
    category: 'side', 
    calories: 155, 
    protein: 3, 
    carbs: 33, 
    fats: 1, 
    fiber: 1,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', 
    badge: 'Golden Basmati',
    benefit: 'Aromatic & light on digestion'
  },
  { 
    id: 's5', 
    name: 'Whole-Wheat Mini Macaroni', 
    category: 'side', 
    calories: 145, 
    protein: 5, 
    carbs: 28, 
    fats: 1, 
    fiber: 3,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=600&q=80', 
    badge: 'Whole-Grain',
    benefit: 'Sustained cognitive focus'
  },
  {
    id: 's6',
    name: 'Buttered Sweetcorn & Veg Pulao',
    category: 'side',
    calories: 150,
    protein: 4,
    carbs: 30,
    fats: 2,
    fiber: 3,
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=600&q=80',
    badge: 'Warm Pulao',
    benefit: 'Rich in lutein & vitamins'
  }
];

const VEGGIES: CompartmentOption[] = [
  { 
    id: 'v1', 
    name: 'Steamed Sea-Salt Edamame Pods', 
    category: 'veggie', 
    calories: 75, 
    protein: 7, 
    carbs: 6, 
    fats: 3, 
    fiber: 4,
    image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=600&q=80', 
    badge: 'Nutrient-Dense',
    benefit: 'Zinc & immunity support'
  },
  { 
    id: 'v2', 
    name: 'Crisp Rainbow Veggie Crunchers', 
    category: 'veggie', 
    calories: 45, 
    protein: 2, 
    carbs: 8, 
    fats: 1, 
    fiber: 3,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', 
    badge: 'Crunch & Hydrate',
    benefit: 'Vitamin A & cellular hydration'
  },
  { 
    id: 'v3', 
    name: 'Tenderstem Broccoli Florets', 
    category: 'veggie', 
    calories: 50, 
    protein: 4, 
    carbs: 7, 
    fats: 1, 
    fiber: 4,
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=600&q=80', 
    badge: 'Vitamin C Shield',
    benefit: 'Potent antioxidant defense'
  },
  { 
    id: 'v4', 
    name: 'Honey-Glazed Baby Carrots', 
    category: 'veggie', 
    calories: 55, 
    protein: 1, 
    carbs: 11, 
    fats: 1, 
    fiber: 3,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=600&q=80', 
    badge: 'Sweet & Tender',
    benefit: 'Beta-carotene for sharp eyes'
  },
  { 
    id: 'v5', 
    name: 'Sweet Corn & Roasted Bell Peppers', 
    category: 'veggie', 
    calories: 60, 
    protein: 2, 
    carbs: 13, 
    fats: 1, 
    fiber: 2,
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=600&q=80', 
    badge: 'Golden Glow',
    benefit: 'Digestive enzyme support'
  }
];

const FRUITS: CompartmentOption[] = [
  { 
    id: 'f1', 
    name: 'Organic Strawberry & Blueberry Medley', 
    category: 'fruit', 
    calories: 65, 
    protein: 1, 
    carbs: 15, 
    fats: 0, 
    fiber: 4,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80', 
    badge: 'Super Berries',
    benefit: 'Memory & brain cell vitality'
  },
  { 
    id: 'f2', 
    name: 'Watermelon & Honeydew Cubes', 
    category: 'fruit', 
    calories: 50, 
    protein: 1, 
    carbs: 12, 
    fats: 0, 
    fiber: 1,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80', 
    badge: 'Electrolyte Splash',
    benefit: 'Natural hydration & freshness'
  },
  { 
    id: 'f3', 
    name: 'Vanilla Chia Seed & Mango Pot', 
    category: 'fruit', 
    calories: 95, 
    protein: 3, 
    carbs: 14, 
    fats: 3, 
    fiber: 5,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80', 
    badge: 'Superfood',
    benefit: 'Omega-3 ALA & gut health'
  },
  { 
    id: 'f4', 
    name: 'Golden Kiwi & Seedless Grapes', 
    category: 'fruit', 
    calories: 60, 
    protein: 1, 
    carbs: 14, 
    fats: 0, 
    fiber: 2,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80', 
    badge: 'Vitamin C Burst',
    benefit: 'Immune resilience'
  },
  { 
    id: 'f5', 
    name: 'Banana Oat Chocolate Chip Mini-Muffin', 
    category: 'fruit', 
    calories: 105, 
    protein: 3, 
    carbs: 17, 
    fats: 3, 
    fiber: 2,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=600&q=80', 
    badge: 'Nut-Free Bakery',
    benefit: 'Wholesome oat comfort treat'
  }
];

// Curated Pediatrician Presets
const BENTO_PRESETS = [
  {
    id: 'athlete',
    name: '🏆 Junior Athlete Power',
    tag: 'High Protein (39g)',
    mainId: 'm1',
    sideId: 's1',
    veggieId: 'v1',
    fruitId: 'f1'
  },
  {
    id: 'brain',
    name: '🧠 Brain Focus Omega-3',
    tag: 'DHA & Fiber Boost',
    mainId: 'm3',
    sideId: 's2',
    veggieId: 'v3',
    fruitId: 'f3'
  },
  {
    id: 'veggie',
    name: '🌱 Golden Veggie Hero',
    tag: '100% Vegetarian',
    mainId: 'm2',
    sideId: 's4',
    veggieId: 'v2',
    fruitId: 'f2'
  },
  {
    id: 'picky',
    name: '⭐ Picky Eater Favorite',
    tag: 'Tender & Sweet',
    mainId: 'm4',
    sideId: 's3',
    veggieId: 'v4',
    fruitId: 'f5'
  }
];

interface InteractiveTiffinVisualizerProps {
  onAddCustomTrayToCart: (traySummary: string, price: number) => void;
}

export const InteractiveTiffinVisualizer: React.FC<InteractiveTiffinVisualizerProps> = ({ onAddCustomTrayToCart }) => {
  const [selectedMain, setSelectedMain] = useState<CompartmentOption>(MAINS[0]);
  const [selectedSide, setSelectedSide] = useState<CompartmentOption>(SIDES[0]);
  const [selectedVeggie, setSelectedVeggie] = useState<CompartmentOption>(VEGGIES[0]);
  const [selectedFruit, setSelectedFruit] = useState<CompartmentOption>(FRUITS[0]);
  const [activeTab, setActiveTab] = useState<'main' | 'side' | 'veggie' | 'fruit'>('main');
  const [lastSlotted, setLastSlotted] = useState<string | null>(null);

  const totalCalories = selectedMain.calories + selectedSide.calories + selectedVeggie.calories + selectedFruit.calories;
  const totalProtein = selectedMain.protein + selectedSide.protein + selectedVeggie.protein + selectedFruit.protein;
  const totalCarbs = selectedMain.carbs + selectedSide.carbs + selectedVeggie.carbs + selectedFruit.carbs;
  const totalFats = selectedMain.fats + selectedSide.fats + selectedVeggie.fats + selectedFruit.fats;
  const totalFiber = selectedMain.fiber + selectedSide.fiber + selectedVeggie.fiber + selectedFruit.fiber;

  // Pediatric Recommended Daily Lunch Intake Targets (WHO / ICMR Benchmarks)
  const targetCalories = 540;
  const targetProtein = 30;
  const targetCarbs = 60;
  const targetFats = 14;

  const calPct = Math.min(Math.round((totalCalories / targetCalories) * 100), 120);
  const proteinPct = Math.min(Math.round((totalProtein / targetProtein) * 100), 120);
  const carbsPct = Math.min(Math.round((totalCarbs / targetCarbs) * 100), 120);
  const fatsPct = Math.min(Math.round((totalFats / targetFats) * 100), 120);

  // Dynamic Paediatric Score (out of 100)
  const paediatricScore = Math.min(
    99, 
    Math.round(88 + (totalProtein >= 25 ? 4 : 0) + (totalFiber >= 6 ? 4 : 2) + (totalCalories >= 450 && totalCalories <= 620 ? 3 : 0))
  );

  const handleSelect = (item: CompartmentOption) => {
    sfx.playSlot();
    setLastSlotted(item.category);
    setTimeout(() => setLastSlotted(null), 800);

    if (item.category === 'main') setSelectedMain(item);
    if (item.category === 'side') setSelectedSide(item);
    if (item.category === 'veggie') setSelectedVeggie(item);
    if (item.category === 'fruit') setSelectedFruit(item);
  };

  const handleApplyPreset = (preset: typeof BENTO_PRESETS[0]) => {
    sfx.playSuccess();
    const m = MAINS.find(i => i.id === preset.mainId) || MAINS[0];
    const s = SIDES.find(i => i.id === preset.sideId) || SIDES[0];
    const v = VEGGIES.find(i => i.id === preset.veggieId) || VEGGIES[0];
    const f = FRUITS.find(i => i.id === preset.fruitId) || FRUITS[0];

    setSelectedMain(m);
    setSelectedSide(s);
    setSelectedVeggie(v);
    setSelectedFruit(f);
    setLastSlotted('all');
    setTimeout(() => setLastSlotted(null), 900);
  };

  const handleRandomize = () => {
    sfx.playPop();
    setSelectedMain(MAINS[Math.floor(Math.random() * MAINS.length)]);
    setSelectedSide(SIDES[Math.floor(Math.random() * SIDES.length)]);
    setSelectedVeggie(VEGGIES[Math.floor(Math.random() * VEGGIES.length)]);
    setSelectedFruit(FRUITS[Math.floor(Math.random() * FRUITS.length)]);
    setLastSlotted('all');
    setTimeout(() => setLastSlotted(null), 800);
  };

  const handleAddToCart = () => {
    sfx.playSuccess();
    const summary = `${selectedMain.name} + ${selectedSide.name} + ${selectedVeggie.name} + ${selectedFruit.name}`;
    onAddCustomTrayToCart(summary, 350);
  };

  return (
    <section id="visualizer" className="py-20 bg-[#17120D] text-white relative overflow-hidden border-t border-amber-950/40">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-400 text-xs font-black uppercase tracking-wider mb-3 shadow-lg shadow-orange-950">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
            <span>Interactive 3D Bento Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Design your child's 4-compartment lunchbox in real time.
          </h2>
          <p className="text-[#D4C5B5] text-sm sm:text-base mt-3 leading-relaxed">
            Click any dish to instantly slot it into the stainless steel thermal tiffin. Watch the live paediatric macro breakdown update dynamically!
          </p>
        </div>

        {/* Quick Bento Presets Bar */}
        <div className="mb-10 bg-[#211913] p-3 sm:p-4 rounded-2xl border border-orange-500/20 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-black uppercase tracking-wider text-orange-300">
                1-Click Pediatrician Approved Combos:
              </span>
            </div>
            <span className="text-[11px] text-[#A8988A]">Click a combo to load instant full-tray balance</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {BENTO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className="text-left p-3 rounded-xl bg-[#17120D] hover:bg-[#2C211A] border border-orange-500/20 hover:border-orange-500/50 transition-all hover:scale-[1.02] active:scale-95 group shadow-md"
              >
                <div className="font-extrabold text-xs text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                  {preset.name}
                </div>
                <div className="text-[10px] text-amber-300/90 font-semibold mt-1">
                  {preset.tag}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 3D Insulated Bento Tray Simulation (7 Cols on LG) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-[#211913] rounded-3xl p-5 sm:p-7 border-2 border-orange-500/30 shadow-2xl relative overflow-hidden backdrop-blur-sm">
              
              {/* Stainless Bento Bezel Rim */}
              <div className="flex items-center justify-between pb-4 border-b border-orange-500/20 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 text-white flex items-center justify-center font-black shadow-lg shadow-orange-600/30">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-white flex items-center gap-2">
                      <span>Thermal Steel Bento Tray</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold">
                        Food-Grade 304SS
                      </span>
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-orange-400 font-semibold mt-0.5">
                      <span className="flex items-center gap-1">
                        <ThermometerSun className="w-3.5 h-3.5 text-amber-400" /> 68°C Hot Vacuum Sealed
                      </span>
                      <span className="text-[#8E7E70]">•</span>
                      <span className="text-[#D4C5B5]">Double-Wall Insulated</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRandomize}
                  className="px-3.5 py-2 rounded-xl bg-[#17120D] hover:bg-[#2C211A] border border-orange-500/30 text-orange-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                  title="Randomize dishes"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Shuffle</span>
                </button>
              </div>

              {/* 3D Insulated 4-Compartment Bento Box Tray */}
              <div className="bg-gradient-to-b from-[#130E0A] to-[#1C1510] p-4 sm:p-5 rounded-2xl border-4 border-[#3D3025] shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)] relative">
                
                {/* Visual Stainless Dividers Grid */}
                <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                  
                  {/* Slot 1: Main Course (Large Top-Span) */}
                  <div 
                    onClick={() => { sfx.playPop(); setActiveTab('main'); }}
                    className={`col-span-2 relative rounded-2xl overflow-hidden aspect-[16/7.5] border-2 cursor-pointer group transition-all duration-300 ${
                      activeTab === 'main' 
                        ? 'border-orange-500 ring-4 ring-orange-500/30 shadow-2xl shadow-orange-600/40 scale-[1.01]' 
                        : 'border-[#3D3025] hover:border-orange-500/60'
                    } ${lastSlotted === 'main' || lastSlotted === 'all' ? 'animate-bounce-subtle' : ''}`}
                  >
                    <img 
                      src={selectedMain.image} 
                      alt={selectedMain.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15100C] via-[#15100C]/35 to-transparent"></div>
                    
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="bg-orange-600 text-white font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                        1. Main Protein
                      </span>
                      {selectedMain.badge && (
                        <span className="bg-orange-950/90 border border-orange-500/40 text-orange-300 font-bold text-[9px] px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                          {selectedMain.badge}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                      <div className="max-w-[70%]">
                        <h4 className="font-extrabold text-sm sm:text-base text-white drop-shadow-md line-clamp-1">
                          {selectedMain.name}
                        </h4>
                        <p className="text-[11px] text-orange-300 font-semibold drop-shadow">
                          {selectedMain.protein}g Protein • {selectedMain.calories} kcal • {selectedMain.benefit}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold bg-[#17120D]/90 text-orange-300 px-2 py-1 rounded-lg border border-orange-500/40 shadow-sm">
                        {activeTab === 'main' ? 'Editing...' : 'Click to Swap'}
                      </span>
                    </div>
                  </div>

                  {/* Slot 2: Warm Grain / Healthy Carbs */}
                  <div 
                    onClick={() => { sfx.playPop(); setActiveTab('side'); }}
                    className={`relative rounded-2xl overflow-hidden aspect-[4/3] border-2 cursor-pointer group transition-all duration-300 ${
                      activeTab === 'side' 
                        ? 'border-amber-500 ring-4 ring-amber-500/30 shadow-2xl shadow-amber-600/40 scale-[1.01]' 
                        : 'border-[#3D3025] hover:border-amber-500/60'
                    } ${lastSlotted === 'side' || lastSlotted === 'all' ? 'animate-bounce-subtle' : ''}`}
                  >
                    <img 
                      src={selectedSide.image} 
                      alt={selectedSide.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15100C] via-[#15100C]/35 to-transparent"></div>
                    
                    <div className="absolute top-2 left-2 bg-amber-600 text-white font-black text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md shadow-md">
                      2. Warm Grain
                    </div>

                    <div className="absolute bottom-2 left-2.5 right-2.5">
                      <h4 className="font-extrabold text-xs sm:text-sm text-white drop-shadow line-clamp-1">
                        {selectedSide.name}
                      </h4>
                      <span className="text-[10px] text-amber-300 font-semibold block">
                        {selectedSide.carbs}g Carbs • {selectedSide.calories} kcal
                      </span>
                    </div>
                  </div>

                  {/* Slot 3: Veggie Crunchers */}
                  <div 
                    onClick={() => { sfx.playPop(); setActiveTab('veggie'); }}
                    className={`relative rounded-2xl overflow-hidden aspect-[4/3] border-2 cursor-pointer group transition-all duration-300 ${
                      activeTab === 'veggie' 
                        ? 'border-emerald-500 ring-4 ring-emerald-500/30 shadow-2xl shadow-emerald-600/40 scale-[1.01]' 
                        : 'border-[#3D3025] hover:border-emerald-500/60'
                    } ${lastSlotted === 'veggie' || lastSlotted === 'all' ? 'animate-bounce-subtle' : ''}`}
                  >
                    <img 
                      src={selectedVeggie.image} 
                      alt={selectedVeggie.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15100C] via-[#15100C]/35 to-transparent"></div>
                    
                    <div className="absolute top-2 left-2 bg-emerald-600 text-white font-black text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md shadow-md">
                      3. Veggie Crunch
                    </div>

                    <div className="absolute bottom-2 left-2.5 right-2.5">
                      <h4 className="font-extrabold text-xs sm:text-sm text-white drop-shadow line-clamp-1">
                        {selectedVeggie.name}
                      </h4>
                      <span className="text-[10px] text-emerald-300 font-semibold block">
                        {selectedVeggie.fiber}g Fiber • {selectedVeggie.calories} kcal
                      </span>
                    </div>
                  </div>

                  {/* Slot 4: Fruit & Superfood Booster (Full Bottom Width) */}
                  <div 
                    onClick={() => { sfx.playPop(); setActiveTab('fruit'); }}
                    className={`col-span-2 relative rounded-2xl overflow-hidden aspect-[16/6] border-2 cursor-pointer group transition-all duration-300 ${
                      activeTab === 'fruit' 
                        ? 'border-rose-500 ring-4 ring-rose-500/30 shadow-2xl shadow-rose-600/40 scale-[1.01]' 
                        : 'border-[#3D3025] hover:border-rose-500/60'
                    } ${lastSlotted === 'fruit' || lastSlotted === 'all' ? 'animate-bounce-subtle' : ''}`}
                  >
                    <img 
                      src={selectedFruit.image} 
                      alt={selectedFruit.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15100C] via-[#15100C]/35 to-transparent"></div>
                    
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="bg-rose-600 text-white font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                        4. Vitamin & Fruit Booster
                      </span>
                      <span className="bg-orange-950/90 border border-orange-500/40 text-orange-300 font-bold text-[9px] px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                        {selectedFruit.badge || '100% Natural'}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                      <div className="max-w-[70%]">
                        <h4 className="font-extrabold text-xs sm:text-sm text-white drop-shadow line-clamp-1">
                          {selectedFruit.name}
                        </h4>
                        <span className="text-[10px] text-rose-300 font-semibold">
                          {selectedFruit.calories} kcal • {selectedFruit.benefit}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-300 bg-[#17120D]/90 px-2 py-1 rounded-md border border-amber-500/30">
                        100% Nut-Free
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Dynamic Paediatric Health Metric Bar */}
              <div className="mt-5 pt-4 border-t border-orange-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-sm">
                    {paediatricScore}
                  </div>
                  <div>
                    <span className="text-xs font-black text-white flex items-center gap-1.5">
                      Paediatric Nutrition Score
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold block">
                      Optimal school afternoon brain & growth ratio
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-orange-400 block">Total Energy</span>
                  <span className="text-base font-black text-white">{totalCalories} kcal</span>
                </div>
              </div>

            </div>

            {/* Live Macro Gauge Progress Bars */}
            <div className="bg-[#211913] p-5 rounded-2xl border border-orange-500/20 shadow-xl space-y-3.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#D4C5B5]">
                <span className="flex items-center gap-1.5 text-white">
                  <Brain className="w-4 h-4 text-orange-400" /> Live Pediatric Macro Breakdown vs Recommended School Lunch
                </span>
                <span className="text-orange-400 font-black">WHO / ICMR Standards</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                
                {/* Calories Bar */}
                <div className="bg-[#17120D] p-3 rounded-xl border border-orange-500/15">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#A8988A] font-bold">⚡ Energy ({totalCalories}/{targetCalories} kcal)</span>
                    <span className="text-orange-400 font-black">{calPct}%</span>
                  </div>
                  <div className="w-full bg-[#2C211A] h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(calPct, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Protein Bar */}
                <div className="bg-[#17120D] p-3 rounded-xl border border-orange-500/15">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#A8988A] font-bold">🍗 Protein ({totalProtein}/{targetProtein}g)</span>
                    <span className="text-emerald-400 font-black">{proteinPct}%</span>
                  </div>
                  <div className="w-full bg-[#2C211A] h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(proteinPct, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Carbs Bar */}
                <div className="bg-[#17120D] p-3 rounded-xl border border-orange-500/15">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#A8988A] font-bold">🌾 Complex Carbs ({totalCarbs}/{targetCarbs}g)</span>
                    <span className="text-amber-400 font-black">{carbsPct}%</span>
                  </div>
                  <div className="w-full bg-[#2C211A] h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(carbsPct, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Healthy Fats Bar */}
                <div className="bg-[#17120D] p-3 rounded-xl border border-orange-500/15">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#A8988A] font-bold">🥑 Healthy Fats ({totalFats}/{targetFats}g)</span>
                    <span className="text-rose-400 font-black">{fatsPct}%</span>
                  </div>
                  <div className="w-full bg-[#2C211A] h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-500 to-orange-400 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(fatsPct, 100)}%` }}
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Right: Ingredient Selector Drawer & Cart Actions (5 Cols on LG) */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Tab Selector for Compartments */}
            <div className="bg-[#211913] p-1.5 rounded-2xl border border-orange-500/25 grid grid-cols-4 gap-1 shadow-lg">
              {[
                { id: 'main', label: '1. Mains', count: MAINS.length, color: 'text-orange-400' },
                { id: 'side', label: '2. Grains', count: SIDES.length, color: 'text-amber-400' },
                { id: 'veggie', label: '3. Veggies', count: VEGGIES.length, color: 'text-emerald-400' },
                { id: 'fruit', label: '4. Fruits', count: FRUITS.length, color: 'text-rose-400' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { sfx.playPop(); setActiveTab(tab.id as any); }}
                  className={`py-3 px-1 rounded-xl text-xs font-black transition-all flex flex-col items-center gap-0.5 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/40 scale-[1.02]'
                      : 'text-[#D4C5B5] hover:text-white hover:bg-[#2C211A]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-semibold opacity-80`}>
                    {tab.count} items
                  </span>
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-orange-950/40 border border-orange-500/20 text-xs">
              <span className="text-[#D4C5B5]">
                Tap any dish below to <span className="text-orange-400 font-bold">instantly slot it</span> into Compartment #{
                  activeTab === 'main' ? '1 (Main Protein)' :
                  activeTab === 'side' ? '2 (Warm Grain)' :
                  activeTab === 'veggie' ? '3 (Veggie Crunch)' : '4 (Fruit Booster)'
                }
              </span>
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 ml-2" />
            </div>

            {/* Options List for Active Compartment */}
            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1 custom-scrollbar">
              {(activeTab === 'main' ? MAINS :
                activeTab === 'side' ? SIDES :
                activeTab === 'veggie' ? VEGGIES : FRUITS).map((item) => {
                
                const isSelected = 
                  (activeTab === 'main' && selectedMain.id === item.id) ||
                  (activeTab === 'side' && selectedSide.id === item.id) ||
                  (activeTab === 'veggie' && selectedVeggie.id === item.id) ||
                  (activeTab === 'fruit' && selectedFruit.id === item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between gap-3.5 transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-950/70 to-[#2A1D15] border-orange-500 shadow-xl shadow-orange-950/50 scale-[1.01]'
                        : 'bg-[#211913] border-orange-500/20 hover:border-orange-500/50 hover:bg-[#2C211A]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-orange-500/20 shadow-inner">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-orange-600/30 flex items-center justify-center">
                            <Check className="w-6 h-6 text-white drop-shadow" />
                          </div>
                        )}
                      </div>
                      
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-white text-sm truncate">{item.name}</h4>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-950 border border-orange-500/40 text-orange-400">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-[11px] text-amber-200/80 font-semibold mt-0.5 line-clamp-1">
                          ✨ {item.benefit}
                        </p>
                        
                        <p className="text-[11px] text-[#A8988A] mt-1 flex items-center gap-2">
                          <span className="text-white font-bold">{item.protein}g Protein</span>
                          <span>•</span>
                          <span>{item.carbs}g Carbs</span>
                          <span>•</span>
                          <span className="text-orange-400 font-bold">{item.calories} kcal</span>
                        </p>
                      </div>
                    </div>

                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected 
                        ? 'bg-orange-600 text-white shadow-md shadow-orange-600/50 scale-105' 
                        : 'border border-orange-500/30 text-[#A8988A] hover:text-white hover:border-orange-500'
                    }`}>
                      {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Tray Summary Box & Add to Cart */}
            <div className="bg-[#211913] p-5 rounded-2xl border-2 border-orange-500/30 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
                <div>
                  <span className="text-xs text-[#A8988A] font-bold block uppercase">Configured Custom Bento</span>
                  <span className="text-sm font-black text-white">
                    4-Compartment Hot Lunchbox
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-orange-400">৳350</span>
                  <span className="text-[11px] text-[#A8988A] block">per day</span>
                </div>
              </div>

              {/* Dish List Snapshot */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-[#17120D] p-2 rounded-lg border border-orange-500/15">
                  <span className="text-[#8E7E70] font-bold block">1. Main</span>
                  <span className="font-extrabold text-white truncate block">{selectedMain.name}</span>
                </div>
                <div className="bg-[#17120D] p-2 rounded-lg border border-orange-500/15">
                  <span className="text-[#8E7E70] font-bold block">2. Grain</span>
                  <span className="font-extrabold text-white truncate block">{selectedSide.name}</span>
                </div>
                <div className="bg-[#17120D] p-2 rounded-lg border border-orange-500/15">
                  <span className="text-[#8E7E70] font-bold block">3. Veggie</span>
                  <span className="font-extrabold text-white truncate block">{selectedVeggie.name}</span>
                </div>
                <div className="bg-[#17120D] p-2 rounded-lg border border-orange-500/15">
                  <span className="text-[#8E7E70] font-bold block">4. Fruit</span>
                  <span className="font-extrabold text-white truncate block">{selectedFruit.name}</span>
                </div>
              </div>

              {/* Add Custom Tray Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm sm:text-base shadow-xl shadow-orange-600/30 hover:shadow-2xl hover:shadow-orange-600/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2.5 active:scale-95 shimmer-effect animate-glow-orange cursor-pointer"
              >
                <Utensils className="w-5 h-5" />
                <span>Add This Custom Bento to Cart (৳350/day)</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#A8988A] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Nut-Free
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Cancel or Pause Anytime
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

