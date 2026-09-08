import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ThermometerSun, 
  Flame, 
  Layers, 
  Leaf, 
  HeartHandshake, 
  Award 
} from 'lucide-react';

export const HygieneSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Dedicated Allergen-Free Zones',
      description: 'Zero cross-contamination. Dedicated separate preparation stations, color-coded utensils, and strict air filtration for nut-free & gluten-free diets.'
    },
    {
      icon: ThermometerSun,
      title: 'Double-Wall Vacuum Insulation',
      description: 'Custom 304 food-grade surgical stainless steel thermal tiffins keep food consistently between 65°C–68°C from kitchen oven to child desk.'
    },
    {
      icon: Leaf,
      title: 'Zero Single-Use Plastics',
      description: '100% reusable stainless containers, biodegradable parchment liners, and unbleached cotton carry pouches collected & sanitized daily.'
    },
    {
      icon: Award,
      title: 'ISO 22000 & HACCP Certified',
      description: 'Every morning batch is temperature-logged and undergoes stringent bacteriological testing before electric fleet dispatch.'
    }
  ];

  return (
    <section id="hygiene" className="py-20 bg-gradient-to-b from-[#fbfaf8] via-white to-[#f7f5f0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Uncompromising Food Safety
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            How we guarantee hygiene, safety & warmth.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Parents trust us with their children's daily nourishment. Here is how we ensure every meal is cooked fresh, packed sterile, and served piping warm.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Temperature & Packaging Spec Highlight */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-emerald-200 text-xs font-extrabold uppercase tracking-widest">
              Hospital-Grade Sanitization
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Commercial 85°C Steam Wash Cycle Every Afternoon
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl">
              When empty tiffins are retrieved from schools, they undergo an automated 3-stage ultrasonic and 85°C steam thermal sanitization cycle, inspected under UV-C light.
            </p>
          </div>

          <div className="flex-shrink-0 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl text-center">
            <span className="block text-3xl font-black text-white">100%</span>
            <span className="text-xs text-emerald-100 font-bold uppercase tracking-wider">Zero Chemical Residue</span>
          </div>
        </div>

      </div>
    </section>
  );
};
