import React from 'react';
import { 
  Utensils, 
  Layers, 
  ChefHat, 
  Sparkles, 
  ShoppingBag,
  User,
  Calendar
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface MobileBottomNavProps {
  onOpenCart: () => void;
  cartCount: number;
  onOpenNutribot: () => void;
  onOpenAccount: () => void;
  onOpenFamilyHub: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenCart,
  cartCount,
  onOpenNutribot,
  onOpenAccount,
  onOpenFamilyHub
}) => {
  const scrollTo = (id: string) => {
    sfx.playPop();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto pointer-events-auto">
      <nav 
        aria-label="Mobile Navigation Bar"
        className="bg-[#1C1712]/95 backdrop-blur-2xl border border-orange-500/35 rounded-2xl p-1.5 shadow-2xl shadow-black/90 flex items-center justify-between text-white ring-1 ring-orange-500/20"
      >
        {/* Menu */}
        <button
          onClick={() => scrollTo('#menu')}
          className="flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl text-[#D4C5B5] hover:text-orange-400 hover:bg-[#261E18] transition-all group active:scale-95"
          title="Weekly Menu"
        >
          <Calendar className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Menu</span>
        </button>

        {/* Bento Builder */}
        <button
          onClick={() => scrollTo('#visualizer')}
          className="flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl text-[#D4C5B5] hover:text-orange-400 hover:bg-[#261E18] transition-all group active:scale-95"
          title="Bento Builder"
        >
          <Layers className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Bento</span>
        </button>

        {/* Top Kitchens */}
        <button
          onClick={() => scrollTo('#restaurants')}
          className="flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl text-[#D4C5B5] hover:text-orange-400 hover:bg-[#261E18] transition-all group active:scale-95"
          title="Dhaka Kitchens"
        >
          <ChefHat className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Kitchens</span>
        </button>

        {/* AI Nutribot */}
        <button
          onClick={() => {
            sfx.playPop();
            onOpenNutribot();
          }}
          className="flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl text-amber-300 hover:text-amber-200 hover:bg-amber-950/40 transition-all group active:scale-95"
          title="AI Nutritionist"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Nutribot</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => {
            sfx.playPop();
            onOpenCart();
          }}
          className="flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl bg-gradient-to-tr from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30 transition-all relative group active:scale-95"
          title="Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1 py-0.2 min-w-[14px] text-[9px] font-black bg-white text-orange-600 rounded-full text-center shadow-xs animate-bounce">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black mt-0.5 tracking-tight">Cart</span>
        </button>
      </nav>
    </div>
  );
};
