import React from 'react';
import { UtensilsCrossed, Heart, ShieldCheck, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { sfx } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#140F0C] text-[#D4C5B5] pt-14 pb-32 sm:pb-24 lg:pb-16 border-t border-orange-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-orange-500/20">
          
          {/* Col 1 & 2: Branding */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20 flex-shrink-0">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-[#F5EBE1] font-display">
                Smart<span className="text-orange-500">Tiffin</span> <span className="text-xs text-orange-400 font-bold px-1.5 py-0.5 rounded bg-orange-950 border border-orange-500/30">TIFFIN</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#D4C5B5] max-w-sm leading-relaxed">
              Empowering busy Dhaka parents with warm, home-cooked, allergen-safe lunches delivered every morning in eco-friendly vacuum insulated tiffins.
            </p>
            <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold bg-orange-950/40 p-2.5 rounded-xl border border-orange-500/25 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>BSTI & Bangladesh Safe Food Authority Verified</span>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5EBE1] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span>Platform</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="#menu" 
                  onClick={() => sfx.playPop()} 
                  className="py-1 inline-flex items-center gap-1 hover:text-orange-400 transition-colors"
                >
                  <span>Weekly Lunch Menu</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="#restaurants" 
                  onClick={() => sfx.playPop()} 
                  className="py-1 inline-flex items-center gap-1 hover:text-orange-400 transition-colors"
                >
                  <span>Top Dhaka Partner Kitchens</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="#visualizer" 
                  onClick={() => sfx.playPop()} 
                  className="py-1 inline-flex items-center gap-1 hover:text-orange-400 transition-colors"
                >
                  <span>Personalised Bento Builder</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="#plans" 
                  onClick={() => sfx.playPop()} 
                  className="py-1 inline-flex items-center gap-1 hover:text-orange-400 transition-colors"
                >
                  <span>Meal Plans & Pricing</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="#tracker" 
                  onClick={() => sfx.playPop()} 
                  className="py-1 inline-flex items-center gap-1 hover:text-orange-400 transition-colors"
                >
                  <span>Live Delivery Telemetry</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="/presentation.html" 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sfx.playPop()} 
                  className="py-1 inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition-colors"
                >
                  <span>📊 Project Presentation (13 Slides)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-80" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5EBE1] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span>Support & Parents</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" onClick={() => sfx.playPop()} className="py-1 inline-block hover:text-orange-400 transition-colors">7:00 AM Cancellation Policy</a></li>
              <li><a href="#hygiene" onClick={() => sfx.playPop()} className="py-1 inline-block hover:text-orange-400 transition-colors">Allergen Quarantine Protocols</a></li>
              <li><a href="#customizer" onClick={() => sfx.playPop()} className="py-1 inline-block hover:text-orange-400 transition-colors">Dhaka School Route Network</a></li>
              <li><a href="#faq" onClick={() => sfx.playPop()} className="py-1 inline-block hover:text-orange-400 transition-colors">FAQ & Parent Help Desk</a></li>
              <li><a href="#plans" onClick={() => sfx.playPop()} className="py-1 inline-block hover:text-orange-400 transition-colors">Child Privacy & Safety Standards</a></li>
            </ul>
          </div>

          {/* Col 5: Contact & Kitchen Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5EBE1] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              <span>Dhaka Kitchen Hub</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-[#D4C5B5]">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Central Paediatric Kitchen 4, Road 11, Banani, Dhaka 1213</span>
              </div>
              <a 
                href="tel:+8809612843346" 
                className="flex items-center gap-2 text-orange-300 hover:text-orange-200 transition-colors font-semibold"
              >
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>+880 9612-843346 / 01712-345678</span>
              </a>
              <a 
                href="mailto:support@smarttiffin.com.bd" 
                className="flex items-center gap-2 text-orange-300 hover:text-orange-200 transition-colors font-semibold truncate"
              >
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span className="truncate">support@smarttiffin.com.bd</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7B6D] gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} TIFFIN – Smart School Tiffin Platform. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 fill-current" />
            <span>for healthy Dhaka school children</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
