import React from 'react';
import { PARENT_REVIEWS, PARTNER_SCHOOLS } from '../data/mockData';
import { Star, Quote, Heart, School, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#f7f5f0] to-[#f0ece1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Loved by Parents & Kids
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Trusted by over 1,200+ families every school day.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            See how Smart School Tiffin is simplifying mornings, reducing picky eater tantrums, and ensuring proper childhood nutrition.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PARENT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* Rating stars */}
                <div className="flex text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs">{rev.author}</h4>
                  <p className="text-[11px] text-slate-500">{rev.childInfo}</p>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                    Plan: {rev.planUsed}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Schools Network */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">
            <School className="w-4 h-4 text-emerald-600" />
            <span>Active Delivery Route Schools</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PARTNER_SCHOOLS.map((school, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-semibold hover:border-emerald-300 transition-colors"
              >
                🏫 {school}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Don't see your school? <a href="#customizer" className="text-emerald-600 font-bold underline">Request a new school route in 60 seconds</a>.
          </p>
        </div>

      </div>
    </section>
  );
};
