import React from 'react';
import { PARENT_REVIEWS, PARTNER_SCHOOLS } from '../data/mockData';
import { Star, Quote, Heart, School, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-950/80 border border-orange-500/30 px-3 py-1 rounded-full">
            Loved by Parents & Kids
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Trusted by over 1,200+ families every school day.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            See how Smart School Tiffin is simplifying mornings, reducing picky eater tantrums, and ensuring proper childhood nutrition.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PARENT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-950 rounded-3xl p-7 border border-slate-800 shadow-xl flex flex-col justify-between hover:border-orange-500/40 hover:shadow-orange-950/20 transition-all"
            >
              <div>
                {/* Rating stars */}
                <div className="flex text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-orange-500/30"
                />
                <div>
                  <h4 className="font-extrabold text-white text-xs">{rev.author}</h4>
                  <p className="text-[11px] text-slate-400">{rev.childInfo}</p>
                  <span className="text-[10px] font-bold text-orange-400 bg-orange-950/80 border border-orange-500/30 px-2 py-0.5 rounded-md inline-block mt-0.5">
                    Plan: {rev.planUsed}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Schools Network */}
        <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 shadow-xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-orange-400 mb-4">
            <School className="w-4 h-4 text-orange-500" />
            <span>Active Delivery Route Schools</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PARTNER_SCHOOLS.map((school, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:border-orange-500/50 hover:text-white transition-colors"
              >
                🏫 {school}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">
            Don't see your school? <a href="#customizer" className="text-orange-400 font-bold underline hover:text-orange-300">Request a new school route in 60 seconds</a>.
          </p>
        </div>

      </div>
    </section>
  );
};
