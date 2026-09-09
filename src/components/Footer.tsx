import React from 'react';
import { UtensilsCrossed, Heart, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#140F0C] text-[#D4C5B5] py-16 border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-orange-500/20">
          
          {/* Col 1 & 2: Branding */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-[#F5EBE1] font-display">
                Smart<span className="text-orange-500">Tiffin</span> <span className="text-xs text-orange-400 font-bold px-1.5 py-0.5 rounded bg-orange-950 border border-orange-500/30">TIFFIN</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#D4C5B5] max-w-sm leading-relaxed">
              Empowering busy parents with warm, home-cooked, allergen-safe lunches delivered every morning in eco-friendly insulated tiffins.
            </p>
            <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified ISO 22000 & BSTI / Dhaka Safe Food Authority Verified</span>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5EBE1]">Platform</h4>
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5EBE1]">Support & Parents</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-orange-400 transition-colors">7:00 AM Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Allergen Quarantine Protocols</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Dhaka School Route Portal</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">FAQ & Parent Help Desk</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy & Child Protection</a></li>
            </ul>
          </div>

          {/* Col 5: Contact & Kitchen Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5EBE1]">Dhaka Kitchen Hub</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Central Paediatric Kitchen 4, Road 11, Banani, Dhaka 1213</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>+880 9612-843346 / 01712-345678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>support@smarttiffin.com.bd</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7B6D] gap-4">
          <p>© {new Date().getFullYear()} TIFFIN – Smart School Tiffin Platform. All rights reserved.</p>
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
