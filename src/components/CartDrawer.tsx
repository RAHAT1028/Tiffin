import React, { useState } from 'react';
import { MealItem, ChildProfile, SubscriptionConfig, CartItemWithMember, FamilyMember } from '../types';
import { 
  X, 
  Trash2, 
  CheckCircle2, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Clock, 
  User, 
  Users, 
  Building2, 
  School, 
  Home,
  MapPin, 
  HeartHandshake, 
  Tag,
  Phone,
  Edit3,
  Check
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemWithMember[];
  subscription: { profile: ChildProfile; config: SubscriptionConfig; weeklyTotal: number } | null;
  onRemoveItem: (index: number) => void;
  onClearSubscription: () => void;
  familyMembers?: FamilyMember[];
}

import { PARTNER_SCHOOLS } from '../data/mockData';

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  subscription,
  onRemoveItem,
  onClearSubscription,
  familyMembers = []
}) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Delivery Address State (Dhaka, Bangladesh)
  const [deliveryType, setDeliveryType] = useState<'school' | 'home' | 'office'>('school');
  const [schoolName, setSchoolName] = useState(PARTNER_SCHOOLS[0]);
  const [classroomLocker, setClassroomLocker] = useState('Class 3B (Yellow Locker #14)');
  const [homeStreetAddress, setHomeStreetAddress] = useState('House 24, Road 11, Block D, Banani');
  const [homeCity, setHomeCity] = useState('Dhaka (Gulshan / Banani Zone)');
  const [homePostcode, setHomePostcode] = useState('1213');
  const [officeBuilding, setOfficeBuilding] = useState('Gulshan Centre Point • Level 9, Road 90, Gulshan-2, Dhaka');
  const [deliveryPhone, setDeliveryPhone] = useState('+880 1712-345678');
  const [deliveryNotes, setDeliveryNotes] = useState('Please leave in designated warm yellow lockers at school gate before 11:30 AM.');

  if (!isOpen) return null;

  const individualMealsTotal = cartItems.reduce((sum, item) => sum + item.meal.pricePerDay, 0);
  const subscriptionTotal = subscription ? subscription.weeklyTotal : 0;
  
  // Calculate distinct family members receiving food
  const distinctMemberIds = Array.from(new Set(cartItems.map((i) => i.familyMemberId || 'general')));
  const isFamilyMultiOrder = distinctMemberIds.length >= 2;
  const familyDiscount = isFamilyMultiOrder ? Number((individualMealsTotal * 0.10).toFixed(2)) : 0;
  const grandTotal = Math.max(0, individualMealsTotal - familyDiscount + subscriptionTotal);

  // Formatted destination string
  const activeDeliveryDestination = 
    deliveryType === 'school' 
      ? `${schoolName} • ${classroomLocker}`
      : deliveryType === 'home'
        ? `${homeStreetAddress}, ${homeCity} (${homePostcode})`
        : officeBuilding;

  const handleCheckout = () => {
    sfx.playSuccess();
    setOrderConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-[#1C1712] border-l border-orange-500/20 shadow-2xl flex flex-col justify-between text-white">
          
          {/* Header */}
          <div className="p-6 border-b border-orange-500/20 flex items-center justify-between bg-[#261E18]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-950/80 border border-orange-500/30 text-orange-400 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">Family Tiffin Box Cart</h3>
                <p className="text-xs text-[#D4C5B5]">
                  {cartItems.length} items • {distinctMemberIds.length} recipient{distinctMemberIds.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sfx.playPop();
                onClose();
              }}
              className="p-2 rounded-xl text-[#D4C5B5] hover:text-white hover:bg-[#15100C] transition-colors border border-orange-500/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {orderConfirmed ? (
              /* Success Confirmation Screen */
              <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-3xl bg-orange-950/80 border border-orange-500/40 text-orange-400 flex items-center justify-center mx-auto shadow-lg shadow-orange-950/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-extrabold text-white">Family Lunch Delivery Confirmed!</h4>
                <p className="text-xs sm:text-sm text-[#D4C5B5] max-w-xs mx-auto leading-relaxed">
                  Hot insulated tiffin boxes have been dispatched and will arrive sealed at 72°C by 11:35 AM.
                </p>
                
                {/* Order & Address Card */}
                <div className="p-4 rounded-2xl bg-[#15100C] border border-orange-500/20 text-left text-xs space-y-2.5 max-w-sm mx-auto">
                  <div className="flex justify-between border-b border-orange-500/10 pb-2">
                    <span className="text-[#A8988A]">Order Reference:</span>
                    <span className="font-bold text-white">#TIFFIN-FAM-{Date.now().toString().slice(-4)}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#A8988A] block font-bold">📍 Delivery Destination:</span>
                    <span className="text-orange-300 font-semibold block">{activeDeliveryDestination}</span>
                    {deliveryNotes && (
                      <span className="text-[11px] text-[#A8988A] italic block">Note: "{deliveryNotes}"</span>
                    )}
                  </div>
                  <div className="flex justify-between border-t border-orange-500/10 pt-2">
                    <span className="text-[#A8988A]">Driver Contact:</span>
                    <span className="font-semibold text-[#D4C5B5]">{deliveryPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A8988A]">Total Charged:</span>
                    <span className="font-bold text-orange-400 text-sm">${grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A8988A]">Thermal Sensor:</span>
                    <span className="font-bold text-emerald-400">Locked at 72°C in Van #04</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sfx.playPop();
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
                {/* Multi-Family Member Bundle Banner */}
                {isFamilyMultiOrder && (
                  <div className="p-3 bg-gradient-to-r from-amber-950/70 to-orange-950/70 border border-amber-500/40 rounded-2xl flex items-center justify-between text-xs animate-pulse">
                    <div className="flex items-center gap-2 text-amber-300 font-extrabold">
                      <Tag className="w-4 h-4 text-amber-400" />
                      <span>Family Multi-Order 10% Discount Applied!</span>
                    </div>
                    <span className="font-black text-amber-300">-${familyDiscount.toFixed(2)}</span>
                  </div>
                )}

                {/* DELIVERY ADDRESS / DROP-OFF POINT SECTION */}
                <div className="p-4 rounded-2xl bg-[#261E18] border border-orange-500/30 shadow-md space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#F5EBE1] flex items-center gap-1.5 uppercase tracking-wider">
                      <MapPin className="w-4 h-4 text-orange-400" />
                      <span>Delivery Address & Location</span>
                    </span>
                    <span className="text-[10px] text-orange-400 font-bold bg-orange-950/80 px-2 py-0.5 rounded-full border border-orange-500/30">
                      Required
                    </span>
                  </div>

                  {/* Destination Type Toggle Tabs */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#15100C] rounded-xl border border-orange-500/20 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        sfx.playPop();
                        setDeliveryType('school');
                      }}
                      className={`py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                        deliveryType === 'school'
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'text-[#A8988A] hover:text-white'
                      }`}
                    >
                      <School className="w-3.5 h-3.5" />
                      <span>School</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sfx.playPop();
                        setDeliveryType('home');
                      }}
                      className={`py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                        deliveryType === 'home'
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'text-[#A8988A] hover:text-white'
                      }`}
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>Home</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sfx.playPop();
                        setDeliveryType('office');
                      }}
                      className={`py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                        deliveryType === 'office'
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'text-[#A8988A] hover:text-white'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Office</span>
                    </button>
                  </div>

                  {/* 1. School Address Fields */}
                  {deliveryType === 'school' && (
                    <div className="space-y-2.5 pt-1">
                      <div>
                        <label className="text-[10px] font-bold text-[#A8988A] block mb-1">Partner School Campus</label>
                        <select
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3 py-2 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                        >
                          {PARTNER_SCHOOLS.map((s) => (
                            <option key={s} value={s} className="bg-[#1C1712] text-white">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-[#A8988A] block mb-1">Classroom / Delivery Drop Locker</label>
                        <input
                          type="text"
                          value={classroomLocker}
                          onChange={(e) => setClassroomLocker(e.target.value)}
                          placeholder="e.g. Class 3B (Yellow Locker #14, Senior Campus)"
                          className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3 py-2 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* 2. Home Address Fields */}
                  {deliveryType === 'home' && (
                    <div className="space-y-2.5 pt-1">
                      <div>
                        <label className="text-[10px] font-bold text-[#A8988A] block mb-1">Street Address & House / Flat #</label>
                        <input
                          type="text"
                          value={homeStreetAddress}
                          onChange={(e) => setHomeStreetAddress(e.target.value)}
                          placeholder="e.g. House 42, Road 7, Block F, Banani / Dhanmondi"
                          className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3 py-2 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-[#A8988A] block mb-1">City / Area</label>
                          <input
                            type="text"
                            value={homeCity}
                            onChange={(e) => setHomeCity(e.target.value)}
                            placeholder="e.g. Dhaka (Gulshan / Banani Zone)"
                            className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3 py-2 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-[#A8988A] block mb-1">Postal Code</label>
                          <input
                            type="text"
                            value={homePostcode}
                            onChange={(e) => setHomePostcode(e.target.value)}
                            placeholder="e.g. 1213 / 1205"
                            className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3 py-2 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Office Address Fields */}
                  {deliveryType === 'office' && (
                    <div className="space-y-2.5 pt-1">
                      <div>
                        <label className="text-[10px] font-bold text-[#A8988A] block mb-1">Office Building, Floor & Desk Location</label>
                        <input
                          type="text"
                          value={officeBuilding}
                          onChange={(e) => setOfficeBuilding(e.target.value)}
                          placeholder="e.g. Gulshan Centre Point • Level 9, Road 90, Gulshan-2, Dhaka"
                          className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3 py-2 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Contact Phone & Delivery Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-orange-500/15">
                    <div>
                      <label className="text-[10px] font-bold text-[#A8988A] block mb-1">Driver Contact Phone</label>
                      <input
                        type="tel"
                        value={deliveryPhone}
                        onChange={(e) => setDeliveryPhone(e.target.value)}
                        placeholder="+880 1712-345678"
                        className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3 py-1.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#A8988A] block mb-1">Gate / Drop-off Note</label>
                      <input
                        type="text"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder="e.g. Gate code #1024, leave at desk"
                        className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3 py-1.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Active Weekly Subscription Card */}
                {subscription && (
                  <div className="p-4 rounded-2xl bg-orange-950/40 border border-orange-500/40 relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider">
                            Weekly Subscription
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-orange-950/80 border border-orange-500/30 text-orange-400 text-[10px] font-bold uppercase">
                            ⚡ {subscription.config.deliveryWindow || '1hr'} Window
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm mt-1.5 capitalize">
                          {subscription.config.plan} Nourish Plan ({subscription.config.daysPerWeek || 7} Days/Week)
                        </h4>
                        <p className="text-xs text-[#D4C5B5] mt-0.5">
                          Recipient: <span className="font-semibold text-orange-300">{subscription.profile.name}</span> ({subscription.profile.gradeClass})
                        </p>
                        <p className="text-[11px] text-[#A8988A]">
                          {subscription.profile.schoolName}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          sfx.playPop();
                          onClearSubscription();
                        }}
                        className="p-1.5 rounded-lg text-[#D4C5B5] hover:text-rose-400 hover:bg-rose-950/60 transition-colors"
                        title="Remove subscription"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-orange-500/20 flex items-center justify-between text-xs">
                      <span className="text-[#A8988A] font-medium">Weekly Billing:</span>
                      <span className="font-extrabold text-orange-400 text-sm">
                        ${subscription.weeklyTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Individual Daily Meals List (Grouped with Member tags) */}
                {cartItems.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4C5B5] flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-orange-400" />
                        <span>Individual Lunchboxes ({cartItems.length})</span>
                      </h4>
                      <span className="text-[11px] text-[#A8988A]">
                        {distinctMemberIds.length} Family Member{distinctMemberIds.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    {cartItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl border border-orange-500/20 bg-[#261E18] flex flex-col gap-2.5 shadow-md hover:border-orange-500/40 transition-all"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <img
                            src={item.meal.imageUrl}
                            alt={item.meal.name}
                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-white text-xs truncate">{item.meal.name}</h5>
                            <span className="text-[11px] text-[#A8988A] font-medium block">
                              {item.meal.dayOfWeek} • {item.meal.category} plan
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-orange-400">
                              ${item.meal.pricePerDay.toFixed(2)}
                            </span>
                            <button
                              onClick={() => {
                                sfx.playPop();
                                onRemoveItem(idx);
                              }}
                              className="p-1 text-[#D4C5B5] hover:text-rose-400 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Recipient tag badge */}
                        <div className="pt-2 border-t border-orange-500/15 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1.5 text-orange-300 font-semibold truncate">
                            {item.memberAvatar ? (
                              <img src={item.memberAvatar} alt={item.familyMemberName} className="w-4 h-4 rounded-full object-cover" />
                            ) : (
                              <User className="w-3 h-3 text-orange-400" />
                            )}
                            <span className="truncate">For: {item.familyMemberName}</span>
                          </div>
                          {item.deliveryLocation && (
                            <span className="text-[10px] text-[#A8988A] truncate max-w-[160px]">
                              📍 {item.deliveryLocation}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!subscription && cartItems.length === 0 && (
                  <div className="py-16 text-center text-[#8C7B6D] space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto text-[#8C7B6D]" />
                    <p className="font-bold text-[#D4C5B5] text-sm">Your family tiffin cart is empty</p>
                    <p className="text-xs text-[#8C7B6D] max-w-xs mx-auto">
                      Select meals from our weekly menu or order specialty dishes from Top Partner Restaurants for any family member.
                    </p>
                  </div>
                )}

                {/* Guarantee Note */}
                <div className="p-3.5 rounded-2xl bg-[#15100C] border border-orange-500/20 text-xs text-[#D4C5B5] flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span>Each family member's lunch is packaged in their own personalized color-coded thermal container.</span>
                </div>
              </>
            )}

          </div>

          {/* Footer Checkout Summary */}
          {!orderConfirmed && (
            <div className="p-6 border-t border-orange-500/20 bg-[#261E18] space-y-3">
              <div className="space-y-1.5 text-xs text-[#D4C5B5]">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span>${individualMealsTotal.toFixed(2)}</span>
                </div>
                {subscriptionTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Weekly Subscription:</span>
                    <span>${subscriptionTotal.toFixed(2)}</span>
                  </div>
                )}
                {familyDiscount > 0 && (
                  <div className="flex justify-between text-amber-300 font-bold">
                    <span>Multi-Member Discount (10%):</span>
                    <span>-${familyDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#A8988A] text-[11px] pt-1">
                  <span>Destination:</span>
                  <span className="text-orange-300 font-semibold truncate max-w-[220px]">
                    {activeDeliveryDestination}
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-2 border-t border-orange-500/20">
                  <span className="text-sm font-bold text-white">Grand Total:</span>
                  <span className="text-3xl font-extrabold text-orange-400">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!subscription && cartItems.length === 0}
                className="w-full py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 shimmer-effect"
              >
                <span>Confirm & Dispatch Family Lunchboxes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
