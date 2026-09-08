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
  Zap
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface CompartmentOption {
  id: string;
  name: string;
  category: 'main' | 'side' | 'veggie' | 'fruit';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image: string;
  badge?: string;
}

const MAINS: CompartmentOption[] = [
  { id: 'm1', name: 'Grilled Herb Chicken Strips', category: 'main', calories: 240, protein: 26, carbs: 4, fats: 8, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=400&q=80', badge: 'High-Protein' },
  { id: 'm2', name: 'Mild Golden Paneer Cubes', category: 'main', calories: 220, protein: 14, carbs: 6, fats: 14, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80', badge: 'Vegetarian' },
  { id: 'm3', name: 'Teriyaki Wild Salmon Fillet', category: 'main', calories: 280, protein: 28, carbs: 8, fats: 12, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80', badge: 'Omega-3' },
  { id: 'm4', name: 'Lean Turkey Herb Meatballs', category: 'main', calories: 210, protein: 24, carbs: 5, fats: 7, image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=400&q=80', badge: 'Halal' }
];

const SIDES: CompartmentOption[] = [
  { id: 's1', name: 'Steamed Calrose Furikake Rice', category: 'side', calories: 160, protein: 4, carbs: 34, fats: 1, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80' },
  { id: 's2', name: 'Tri-Color Fluffy Quinoa', category: 'side', calories: 140, protein: 6, carbs: 26, fats: 2, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', badge: 'Gluten-Free' },
  { id: 's3', name: 'Oven-Baked Sweet Potato Wedges', category: 'side', calories: 130, protein: 2, carbs: 29, fats: 1, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' }
];

const VEGGIES: CompartmentOption[] = [
  { id: 'v1', name: 'Steamed Sea-Salt Edamame Pods', category: 'veggie', calories: 70, protein: 6, carbs: 5, fats: 3, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80' },
  { id: 'v2', name: 'Crisp Cucumber & Carrot Dippers', category: 'veggie', calories: 45, protein: 2, carbs: 8, fats: 1, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80' },
  { id: 'v3', name: 'Tenderstem Broccoli & Sweet Corn', category: 'veggie', calories: 55, protein: 3, carbs: 9, fats: 1, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80' }
];

const FRUITS: CompartmentOption[] = [
  { id: 'f1', name: 'Fresh Organic Berry Medley', category: 'fruit', calories: 60, protein: 1, carbs: 14, fats: 0, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80', badge: 'Antioxidants' },
  { id: 'f2', name: 'Sweet Watermelon & Melon Cubes', category: 'fruit', calories: 50, protein: 1, carbs: 12, fats: 0, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80' },
  { id: 'f3', name: 'Vanilla Bean Chia Seed Pot', category: 'fruit', calories: 90, protein: 3, carbs: 11, fats: 4, image: 'https://images.unsplash.com/photo-1633337474565-12c5b36487a0?auto=format&fit=crop&w=400&q=80', badge: 'Superfood' }
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

  const totalCalories = selectedMain.calories + selectedSide.calories + selectedVeggie.calories + selectedFruit.calories;
  const totalProtein = selectedMain.protein + selectedSide.protein + selectedVeggie.protein + selectedFruit.protein;
  const totalCarbs = selectedMain.carbs + selectedSide.carbs + selectedVeggie.carbs + selectedFruit.carbs;
  const totalFats = selectedMain.fats + selectedSide.fats + selectedVeggie.fats + selectedFruit.fats;

  const handleSelect = (item: CompartmentOption) => {
    sfx.playSlot();
    if (item.category === 'main') setSelectedMain(item);
    if (item.category === 'side') setSelectedSide(item);
    if (item.category === 'veggie') setSelectedVeggie(item);
    if (item.category === 'fruit') setSelectedFruit(item);
  };

  const handleRandomize = () => {
    sfx.playPop();
    setSelectedMain(MAINS[Math.floor(Math.random() * MAINS.length)]);
    setSelectedSide(SIDES[Math.floor(Math.random() * SIDES.length)]);
    setSelectedVeggie(VEGGIES[Math.floor(Math.random() * VEGGIES.length)]);
    setSelectedFruit(FRUITS[Math.floor(Math.random() * FRUITS.length)]);
  };

  const handleAddToCart = () => {
    sfx.playSuccess();
    const summary = `${selectedMain.name} with ${selectedSide.name}, ${selectedVeggie.name} & ${selectedFruit.name}`;
    onAddCustomTrayToCart(summary, 6.80);
  };

  return (
    <section id="visualizer" className="py-20 bg-[#030712] text-white relative overflow-hidden border-t border-slate-900">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3 shadow-md shadow-orange-950">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Bento Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Design your child's 4-compartment lunchbox in real time.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Click any dish to instantly slot it into the stainless steel thermal tiffin. Watch the live paediatric macro breakdown update dynamically!
          </p>
        </div>

        {/* Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive 4-Compartment Visual Tray */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
            
            {/* Tray Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-950 border border-orange-500/40 text-orange-400 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Stainless Insulated Bento Tray</h3>
                  <span className="text-[11px] text-orange-400 flex items-center gap-1 font-semibold">
                    <ThermometerSun className="w-3 h-3" /> 68°C Hot Vacuum Sealed
                  </span>
                </div>
              </div>

              <button
                onClick={handleRandomize}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                title="Randomize combo"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Shuffle Meal</span>
              </button>
            </div>

            {/* Visual 4-Grid Tray Container */}
            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border-2 border-slate-800 shadow-inner">
              
              {/* Slot 1: Main Course (Large) */}
              <div 
                onClick={() => { sfx.playPop(); setActiveTab('main'); }}
                className={`col-span-2 relative rounded-2xl overflow-hidden aspect-[16/7] border-2 cursor-pointer group transition-all ${
                  activeTab === 'main' ? 'border-orange-500 shadow-lg shadow-orange-600/30' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <img src={selectedMain.image} alt={selectedMain.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute top-2.5 left-2.5 bg-orange-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                  1. Main Course
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <h4 className="font-extrabold text-sm text-white line-clamp-1">{selectedMain.name}</h4>
                    <span className="text-[11px] text-orange-300 font-semibold">{selectedMain.protein}g Protein • {selectedMain.calories} kcal</span>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-900/80 px-2 py-1 rounded-md border border-slate-700">Click to change</span>
                </div>
              </div>

              {/* Slot 2: Healthy Carb / Side */}
              <div 
                onClick={() => { sfx.playPop(); setActiveTab('side'); }}
                className={`relative rounded-2xl overflow-hidden aspect-square border-2 cursor-pointer group transition-all ${
                  activeTab === 'side' ? 'border-orange-500 shadow-lg shadow-orange-600/30' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <img src={selectedSide.image} alt={selectedSide.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute top-2 left-2 bg-amber-600 text-white font-extrabold text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md">
                  2. Warm Grain
                </div>
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="font-bold text-xs line-clamp-1">{selectedSide.name}</h4>
                  <span className="text-[10px] text-amber-300 block">{selectedSide.calories} kcal</span>
                </div>
              </div>

              {/* Slot 3: Veggie Crunch */}
              <div 
                onClick={() => { sfx.playPop(); setActiveTab('veggie'); }}
                className={`relative rounded-2xl overflow-hidden aspect-square border-2 cursor-pointer group transition-all ${
                  activeTab === 'veggie' ? 'border-orange-500 shadow-lg shadow-orange-600/30' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <img src={selectedVeggie.image} alt={selectedVeggie.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute top-2 left-2 bg-orange-700 text-white font-extrabold text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md">
                  3. Veggie Dipper
                </div>
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="font-bold text-xs line-clamp-1">{selectedVeggie.name}</h4>
                  <span className="text-[10px] text-orange-300 block">{selectedVeggie.calories} kcal</span>
                </div>
              </div>

              {/* Slot 4: Fruit / Superfood Booster */}
              <div 
                onClick={() => { sfx.playPop(); setActiveTab('fruit'); }}
                className={`col-span-2 relative rounded-2xl overflow-hidden aspect-[16/6] border-2 cursor-pointer group transition-all ${
                  activeTab === 'fruit' ? 'border-orange-500 shadow-lg shadow-orange-600/30' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <img src={selectedFruit.image} alt={selectedFruit.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute top-2.5 left-2.5 bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                  4. Fruit & Vitamin Booster
                </div>
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <h4 className="font-extrabold text-xs text-white line-clamp-1">{selectedFruit.name}</h4>
                    <span className="text-[10px] text-amber-300">{selectedFruit.calories} kcal • 100% Natural</span>
                  </div>
                  <span className="text-[10px] font-bold text-orange-400">Nut-Free Certified</span>
                </div>
              </div>

            </div>

            {/* Live Macro Gauge Bars */}
            <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Energy</span>
                <span className="font-black text-white text-sm">{totalCalories} kcal</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Protein</span>
                <span className="font-black text-orange-400 text-sm">{totalProtein}g</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Carbs</span>
                <span className="font-black text-amber-400 text-sm">{totalCarbs}g</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Healthy Fats</span>
                <span className="font-black text-slate-200 text-sm">{totalFats}g</span>
              </div>
            </div>

          </div>

          {/* Right: Ingredient Selector Drawer */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Tab Selector for Compartments */}
            <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 gap-1">
              {[
                { id: 'main', label: '1. Mains' },
                { id: 'side', label: '2. Grains' },
                { id: 'veggie', label: '3. Veggies' },
                { id: 'fruit', label: '4. Fruits' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { sfx.playPop(); setActiveTab(tab.id as any); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Options List for Active Compartment */}
            <div className="space-y-3">
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
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between gap-4 transition-all ${
                      isSelected
                        ? 'bg-orange-950/40 border-orange-500 shadow-md shadow-orange-950/40 scale-[1.01]'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-white text-sm">{item.name}</h4>
                          {item.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-950 border border-orange-500/40 text-orange-400">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {item.protein}g Protein • {item.carbs}g Carbs • {item.calories} kcal
                        </p>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected ? 'bg-orange-600 text-white shadow-sm' : 'border border-slate-700 text-slate-500'
                    }`}>
                      {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Custom Tray Button */}
            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Utensils className="w-4 h-4" />
                <span>Add This Custom 4-Compartment Tiffin ($6.80/day)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
