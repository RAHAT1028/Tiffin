import React, { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Calendar, 
  CreditCard, 
  ThermometerSun,
  School
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface FAQItem {
  id: string;
  category: 'delivery' | 'hygiene' | 'plans' | 'school';
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'f1',
    category: 'delivery',
    question: 'How do you keep the food warm (65°C+) until 12:30 PM lunch break?',
    answer: 'We use double-walled SUS304 food-grade stainless steel thermal bento boxes packed inside individual aerospace-grade foil insulated sleeves. Food cooked between 6:30 AM – 8:00 AM enters our thermal boxes at 82°C and stays safely above 65°C for over 5 hours.'
  },
  {
    id: 'f2',
    category: 'plans',
    question: 'What if my child is sick or school is closed? Can I pause for that day?',
    answer: 'Yes! You can pause or cancel any individual day’s lunch directly from your parent portal until 7:00 AM on the delivery morning with zero penalty. The credit automatically rolls over to your next week’s billing cycle.'
  },
  {
    id: 'f3',
    category: 'hygiene',
    question: 'Are you 100% nut-free and how do you handle severe allergies?',
    answer: 'Our central prep kitchen is certified 100% tree-nut and peanut-free. For children with severe dairy, egg, or gluten allergies, meals are cooked in an isolated negative-pressure clean zone with dedicated sterilized utensils and rapid protein swab testing.'
  },
  {
    id: 'f4',
    category: 'school',
    question: 'How does the lunch box actually reach my child in their classroom?',
    answer: 'Our security-vetted delivery fleet brings labeled, barcoded tiffin crates directly to the school cafeteria/reception desk by 11:15 AM. Lunch coordinators or homeroom monitors distribute the personalized boxes directly to each student desk.'
  },
  {
    id: 'f5',
    category: 'plans',
    question: 'Can I choose different dishes for each day of the week?',
    answer: 'Absolutely! Our weekly menu changes every Sunday. Parents can review the upcoming week’s 5 daily meals and easily swap any dish for alternate chef specials or picky-eater finger foods in just 2 clicks.'
  },
  {
    id: 'f6',
    category: 'hygiene',
    question: 'Do we need to return the empty tiffin containers?',
    answer: 'Yes, we are 100% zero-waste! Students simply return their empty thermal tiffins to the designated SmartTiffin return bins near the cafeteria before 2:00 PM. Our afternoon fleet collects them for high-temp 90°C industrial sanitization.'
  }
];

interface InteractiveFAQProps {
  onOpenNutribot: () => void;
}

export const InteractiveFAQ: React.FC<InteractiveFAQProps> = ({ onOpenNutribot }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<string[]>(['f1']);

  const toggleFAQ = (id: string) => {
    sfx.playPop();
    setOpenIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesQuery = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="faq" className="py-20 bg-[#030712] text-white relative overflow-hidden border-t border-slate-900">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Everything parents need to know about thermal insulation, same-day cancellations, and school desk delivery.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search questions (e.g. thermal temperature, pause subscription, nut allergies)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'delivery', label: '🚚 Thermal & Delivery' },
            { id: 'hygiene', label: '🛡️ Safety & Allergens' },
            { id: 'plans', label: '💳 Plans & Cancellations' },
            { id: 'school', label: '🏫 Classroom Drop-off' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sfx.playPop();
                setActiveCategory(cat.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-700"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-orange-400 bg-orange-950/80 border border-orange-500/30' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <p className="text-slate-400 text-sm">No matching questions found for "{searchQuery}".</p>
            </div>
          )}
        </div>

        {/* AI Nutribot Prompt Card */}
        <div className="mt-12 bg-gradient-to-r from-orange-950/60 via-slate-900 to-amber-950/40 border border-orange-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Have a specific pediatric or dietary question?</h4>
              <p className="text-xs text-slate-400">Our Gemini-powered AI Nutribot has clinical pediatric meal intelligence.</p>
            </div>
          </div>

          <button
            onClick={onOpenNutribot}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all hover:scale-105 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI Nutribot Now</span>
          </button>
        </div>

      </div>
    </section>
  );
};
