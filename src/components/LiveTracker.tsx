import React, { useState } from 'react';
import { 
  Truck, 
  ChefHat, 
  ThermometerSun, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  BellRing, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';

export const LiveTracker: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2); // 0 = Prep, 1 = Thermal Pack, 2 = En Route, 3 = Delivered
  const [selectedChild, setSelectedChild] = useState('Oliver Jenkins (Class 3B)');

  const steps = [
    {
      title: 'Fresh Morning Cook',
      time: '05:30 AM - 07:30 AM',
      desc: 'Cooked fresh by paediatric nutrition chefs in sterile allergen-segregated kitchen.',
      icon: ChefHat,
      status: 'Completed'
    },
    {
      title: 'Vacuum Thermal Sealing',
      time: '08:15 AM',
      desc: 'Sealed at 72°C inside 304 food-grade double-wall stainless steel hot tiffin containers.',
      icon: ThermometerSun,
      status: 'Completed (72°C Verified)'
    },
    {
      title: 'Eco-Van Dispatch & Route',
      time: '10:45 AM',
      desc: 'Transit via temperature-controlled electric van #04 directly to school drop-point.',
      icon: Truck,
      status: 'In Transit • On Schedule'
    },
    {
      title: 'Delivered to Child’s Desk',
      time: '11:35 AM',
      desc: 'Handed to school meal coordinator and placed hot & fresh on the student desk before lunch bell.',
      icon: CheckCircle2,
      status: 'Target ETA: 11:35 AM'
    }
  ];

  return (
    <section id="tracker" className="py-20 bg-[#1C1712] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/80 text-orange-300 border border-orange-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span>
            <span>Real-Time Logistics Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Live School Lunch & Temperature Tracker
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Track your child's meal from our morning kitchen ovens to their classroom desk with real-time temperature verification.
          </p>
        </div>

        {/* Tracker Panel Card */}
        <div className="glass-dark rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          
          {/* Top Status Banner */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-950/80 border border-orange-500/40 text-orange-400 flex items-center justify-center flex-shrink-0">
                <Truck className="w-7 h-7 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">Order #JK-8942 • In Transit</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-950 text-orange-400 text-[11px] font-bold border border-orange-500/30">
                    Live Telemetry
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Destination: <span className="text-slate-200 font-semibold">{selectedChild} at St. Mary Academy</span>
                </p>
              </div>
            </div>

            {/* Live Sensor Metrics */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-2.5">
                <ThermometerSun className="w-4 h-4 text-orange-400" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Core Tiffin Temp</span>
                  <span className="text-sm font-extrabold text-orange-400">68.2°C (Optimal Warm)</span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Arrival</span>
                  <span className="text-sm font-extrabold text-amber-300">11:35 AM (20m to bell)</span>
                </div>
              </div>

              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
                className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Simulate step advance"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Simulate Step</span>
              </button>
            </div>
          </div>

          {/* Interactive Steps Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-10 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isPast = idx < activeStep;
              const isCurrent = idx === activeStep;
              const isFuture = idx > activeStep;

              return (
                <div
                  key={idx}
                  className={`relative p-5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-orange-950/40 border-orange-500/70 shadow-xl shadow-orange-950/30 ring-1 ring-orange-500/40'
                      : isPast
                      ? 'bg-slate-900/60 border-slate-800 opacity-90'
                      : 'bg-slate-950/40 border-slate-900 opacity-40'
                  }`}
                >
                  {/* Step number and icon */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isCurrent
                        ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/30'
                        : isPast
                        ? 'bg-orange-950/60 text-orange-400 border border-orange-500/30'
                        : 'bg-slate-900 text-slate-600 border border-slate-800'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      isCurrent ? 'bg-orange-950 text-orange-300 border border-orange-500/40' :
                      isPast ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {step.time}
                    </span>
                  </div>

                  <h4 className={`font-bold text-sm mb-1 ${isCurrent ? 'text-orange-300' : 'text-slate-200'}`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px]">
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />}
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span>}
                    <span className={`font-semibold ${isCurrent ? 'text-orange-400' : isPast ? 'text-slate-300' : 'text-slate-600'}`}>
                      {step.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Security Note */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Direct delivery into authorized school student lunch lockers & monitoring by designated school prefects.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <BellRing className="w-4 h-4 text-amber-400" />
              <span>SMS notification triggered upon classroom receipt</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
