import React from 'react';
import { UtensilsCrossed, Heart, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030712] text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 & 2: Branding */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white font-display">
                Smart<span className="text-orange-500">Tiffin</span> <span className="text-xs text-orange-400 font-bold px-1.5 py-0.5 rounded bg-orange-950 border border-orange-500/30">JK</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering busy parents with warm, home-cooked, allergen-safe lunches delivered every morning in eco-friendly insulated tiffins.
            </p>
            <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified ISO 22000 Food Safety & Pediatric Hygiene Standard</span>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#menu" className="hover:text-orange-400 transition-colors">Weekly Lunch Menu</a></li>
              <li><a href="#plans" className="hover:text-orange-400 transition-colors">Meal Plans & Pricing</a></li>
              <li><a href="#customizer" className="hover:text-orange-400 transition-colors">Personalised Meal Builder</a></li>
              <li><a href="#tracker" className="hover:text-orange-400 transition-colors">Live Delivery Telemetry</a></li>
              <li><a href="#hygiene" className="hover:text-orange-400 transition-colors">Hygiene & Allergen Control</a></li>
            </ul>
          </div>

          {/* Col 4: Support & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Support & Parents</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-orange-400 transition-colors">7:00 AM Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Allergen Quarantine Protocols</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">School Administrator Portal</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">FAQ & Parent Help Desk</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy & Child Protection</a></li>
            </ul>
          </div>

          {/* Col 5: Contact & Kitchen Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Kitchen Operations</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Central Paediatric Kitchen 4, Enterprise Food Park</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>+44 (0) 800 584 8433</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>hello@smartschooltiffin.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Project JK – Smart School Tiffin Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 fill-current" />
            <span>for healthy, thriving school children</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
