import React, { useState } from 'react';
import { MealItem, ChildProfile, SubscriptionConfig } from '../types';
import { 
  X, 
  Trash2, 
  CheckCircle2, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Clock 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: MealItem[];
  subscription: { profile: ChildProfile; config: SubscriptionConfig; weeklyTotal: number } | null;
  onRemoveItem: (index: number) => void;
  onClearSubscription: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  subscription,
  onRemoveItem,
  onClearSubscription
}) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const individualMealsTotal = cartItems.reduce((sum, item) => sum + item.pricePerDay, 0);
  const subscriptionTotal = subscription ? subscription.weeklyTotal : 0;
  const grandTotal = individualMealsTotal + subscriptionTotal;

  const handleCheckout = () => {
    setOrderConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between text-white">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-950/80 border border-orange-500/30 text-orange-400 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">Your Tiffin Box Order</h3>
                <p className="text-xs text-slate-400">
                  {cartItems.length} individual items • {subscription ? '1 active subscription' : 'No active subscription'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {orderConfirmed ? (
              /* Success Confirmation Screen */
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-orange-950/80 border border-orange-500/40 text-orange-400 flex items-center justify-center mx-auto shadow-lg shadow-orange-950/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-extrabold text-white">Order & Subscription Activated!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto leading-relaxed">
                  Thank you! Your order has been scheduled. First hot tiffin delivery will arrive at your child's classroom by 11:35 AM on the next scheduled school day.
                </p>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 max-w-xs mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Order Reference:</span>
                    <span className="font-bold text-white">#JK-2026-8942</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Charged:</span>
                    <span className="font-bold text-orange-400">${grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-bold text-orange-400">Active & Dispatched to Kitchen</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOrderConfirmed(false);
                    onClose();
                  }}
                  className="mt-4 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <>
                {/* Active Weekly Subscription Card */}
                {subscription && (
                  <div className="p-4 rounded-2xl bg-orange-950/40 border border-orange-500/40 relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded-md bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider">
                          Weekly Subscription
                        </span>
                        <h4 className="font-bold text-white text-sm mt-1.5 capitalize">
                          {subscription.config.plan} Nourish Plan ({subscription.config.daysPerWeek} Days/Week)
                        </h4>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Child: <span className="font-semibold text-orange-300">{subscription.profile.name}</span> ({subscription.profile.gradeClass})
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {subscription.profile.schoolName}
                        </p>
                      </div>
                      <button
                        onClick={onClearSubscription}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/60 transition-colors"
                        title="Remove subscription"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-orange-500/20 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Weekly Billing:</span>
                      <span className="font-extrabold text-orange-400 text-sm">
                        ${subscription.weeklyTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Individual Daily Meals List */}
                {cartItems.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Individual Day Tiffins
                    </h4>
                    {cartItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl border border-slate-800 bg-slate-950 flex items-center justify-between gap-3 shadow-md"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-white text-xs truncate">{item.name}</h5>
                          <span className="text-[11px] text-slate-400 font-medium">{item.dayOfWeek} • {item.category} plan</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-orange-400">${item.pricePerDay.toFixed(2)}</span>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!subscription && cartItems.length === 0 && (
                  <div className="py-16 text-center text-slate-500 space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto text-slate-600" />
                    <p className="font-bold text-slate-300 text-sm">Your tiffin box is currently empty</p>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Select meals from the weekly menu or use our Customise Tiffin builder to start a healthy lunch subscription.
                    </p>
                  </div>
                )}

                {/* Guarantee Note */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span>Free stainless steel insulated box included with every active subscription. No packaging deposit required.</span>
                </div>
              </>
            )}

          </div>

          {/* Footer Checkout Summary */}
          {!orderConfirmed && (
            <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-400">Estimated Total:</span>
                <span className="text-3xl font-extrabold text-orange-400">${grandTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!subscription && cartItems.length === 0}
                className="w-full py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Confirm & Start Lunch Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
