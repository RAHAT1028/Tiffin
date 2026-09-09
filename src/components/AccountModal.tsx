import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Calendar,
  CreditCard,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Layers,
  Check,
  Edit3,
  Receipt,
  Truck,
  Flame,
  HelpCircle,
  Download,
  Plus,
  DollarSign,
  ChevronRight,
  School,
  Lock,
  RefreshCw,
  BellRing,
  Heart,
  LogOut,
  LogIn,
  Save,
  Trash2
} from 'lucide-react';
import { ParentAccount, ParentAccountChild, MealCategory, Allergen, AuthUser, FamilyMember } from '../types';
import { sfx } from '../utils/audio';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: AuthUser | null;
  familyMembers?: FamilyMember[];
  onSwitchPlanGlobal?: (plan: MealCategory) => void;
  onLogout?: () => void;
  onUpdateUser?: (updatedUser: AuthUser) => void;
  onUpdateFamilyMembers?: (updatedMembers: FamilyMember[]) => void;
  onOpenAuth?: () => void;
}

const DEFAULT_INVOICES = [
  {
    id: 'INV-2026-0901',
    date: 'Sep 01, 2026',
    amount: 32.50,
    description: 'Standard Plan - 5 Days Hot Tiffin Delivery',
    status: 'paid' as const
  },
  {
    id: 'INV-2026-0825',
    date: 'Aug 25, 2026',
    amount: 19.50,
    description: 'Standard Plan - 3 Days Hot Tiffin Delivery',
    status: 'paid' as const
  },
  {
    id: 'INV-2026-0818',
    date: 'Aug 18, 2026',
    amount: 6.50,
    description: 'Refund: 7:00 AM Sick Day Morning Pause Credit',
    status: 'refunded' as const
  }
];

const DEFAULT_DELIVERIES = [
  {
    id: 'del-01',
    date: 'Today, 11:35 AM',
    mealName: 'Grilled Herb Chicken & Avocado Wrap',
    childName: 'Student',
    tempArrival: '68.2°C (Optimal)',
    status: 'In Transit' as const,
    childFeedback: 'Insulated Bento received at school gate'
  },
  {
    id: 'del-02',
    date: 'Yesterday, 11:32 AM',
    mealName: 'Tokyo Teriyaki Glazed Salmon & Bento',
    childName: 'Student',
    tempArrival: '67.8°C (Verified)',
    status: 'Delivered On Time' as const,
    childFeedback: '100% Finished • 5 stars rating ⭐'
  },
  {
    id: 'del-03',
    date: 'Friday, 11:30 AM',
    mealName: 'Mild Paneer Veggie Pulao Bowl',
    childName: 'Student',
    tempArrival: '69.1°C (Verified)',
    status: 'Delivered On Time' as const,
    childFeedback: 'Clean Tiffin returned for thermal sanitization'
  }
];

const PLAN_RATES: Record<MealCategory, { name: string; price: number; desc: string }> = {
  basic: {
    name: 'Wholesome Everyday',
    price: 4.50,
    desc: 'Nutrient-rich, comforting classics with balanced carbs & fresh veggies'
  },
  standard: {
    name: 'Vitality & High-Protein',
    price: 6.50,
    desc: 'Extra protein, superfoods, fresh fruit bowls and certified thermal packaging'
  },
  premium: {
    name: 'Gourmet Bento & Omega-3',
    price: 8.50,
    desc: 'Chef specialty wild salmon, avocado sushi rolls, and cold-pressed juices'
  }
};

const ALL_ALLERGENS: { key: Allergen; label: string }[] = [
  { key: 'nuts', label: 'Peanuts / Tree Nuts' },
  { key: 'dairy', label: 'Dairy / Lactose' },
  { key: 'gluten', label: 'Gluten / Wheat' },
  { key: 'eggs', label: 'Eggs' },
  { key: 'soy', label: 'Soy' },
  { key: 'seafood', label: 'Seafood / Shellfish' },
  { key: 'sesame', label: 'Sesame' }
];

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  familyMembers = [],
  onSwitchPlanGlobal,
  onLogout,
  onUpdateUser,
  onUpdateFamilyMembers,
  onOpenAuth
}) => {
  const [account, setAccount] = useState<ParentAccount | null>(null);
  const [selectedChildIndex, setSelectedChildIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'plan' | 'child' | 'deliveries' | 'billing' | 'profile'>('plan');
  
  // Voucher state
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherMsg, setVoucherMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // New Child Inline Form
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildSchool, setNewChildSchool] = useState('Scholastica Senior Campus (Uttara, Dhaka)');
  const [newChildGrade, setNewChildGrade] = useState('Class 3B');

  // Edit Parent Profile fields
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('House 24, Road 11, Block D, Banani');
  const [editCity, setEditCity] = useState('Dhaka (Gulshan / Banani Zone)');
  const [editPostalCode, setEditPostalCode] = useState('1213');
  const [editDeliveryNotes, setEditDeliveryNotes] = useState('Please leave with designated school thermal lunch lockers before 11:30 AM.');

  // Synchronize account state whenever currentUser or familyMembers or isOpen changes
  useEffect(() => {
    if (!currentUser) {
      setAccount(null);
      return;
    }

    setEditName(currentUser.name);
    setEditEmail(currentUser.email);
    setEditPhone(currentUser.phone || '+880 1712-345678');
    setEditAddress(currentUser.address || 'House 24, Road 11, Block D, Banani');
    setEditCity(currentUser.city || 'Dhaka (Gulshan / Banani Zone)');
    setEditPostalCode(currentUser.postalCode || '1213');
    setEditDeliveryNotes(currentUser.deliveryNotes || 'Please leave with designated school thermal lunch lockers before 11:30 AM.');

    // Build children strictly for currentUser
    let mappedChildren: ParentAccountChild[] = [];
    
    // Use family members marked as Child, or all family members if none marked as Child
    let relevantFamily = familyMembers && familyMembers.length > 0
      ? familyMembers.filter(m => m.relation === 'Child')
      : (currentUser.familyMembers && currentUser.familyMembers.length > 0
          ? currentUser.familyMembers.filter(m => m.relation === 'Child')
          : []);

    if (relevantFamily.length === 0 && familyMembers && familyMembers.length > 0) {
      relevantFamily = familyMembers;
    }
    
    if (relevantFamily.length > 0) {
      mappedChildren = relevantFamily.map((m, idx) => ({
        id: m.id || `child-${idx}`,
        name: m.name,
        age: m.age || 8,
        schoolName: m.deliveryLocation?.includes('•') ? m.deliveryLocation.split('•')[0].trim() : (m.deliveryLocation || 'Scholastica Senior Campus (Uttara, Dhaka)'),
        gradeClass: m.deliveryLocation?.includes('•') ? (m.deliveryLocation.split('•')[1] || 'Class 3B').trim() : 'Class 3B',
        lunchLocker: `Yellow Locker #${idx * 14 + 14}`,
        allergies: m.allergies || ['nuts'],
        dietaryPreferences: m.dietaryPreferences || ['Nut-Free Certified'],
        portionSize: 'regular',
        activeDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        isPausedToday: false,
        notes: 'Nut-free certified meal, sealed thermal container.'
      }));
    } else {
      mappedChildren = [];
    }

    const currentDeliveries = DEFAULT_DELIVERIES.map(d => ({
      ...d,
      childName: mappedChildren[0]?.name || 'Student'
    }));

    setAccount({
      id: currentUser.id || 'acc-parent-active',
      parentName: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || '+44 (0) 7700 900822',
      avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      walletBalance: typeof currentUser.walletBalance === 'number' ? currentUser.walletBalance : 28.50,
      activePlan: currentUser.activePlan || 'standard',
      billingCycle: 'weekly',
      autoRenew: true,
      nextBillingDate: 'Monday, Sep 15, 2026',
      membershipTier: (currentUser.membershipTier as any) || 'Gold VIP',
      paymentMethod: {
        brand: 'visa',
        last4: '4242',
        expiry: '08/28'
      },
      children: mappedChildren,
      recentInvoices: DEFAULT_INVOICES,
      recentDeliveries: currentDeliveries
    });

    if (selectedChildIndex >= mappedChildren.length) {
      setSelectedChildIndex(0);
    }
  }, [currentUser, familyMembers, isOpen]);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => {
      setSaveSuccessMsg(null);
    }, 3500);
  };

  // If no user is logged in, show Guest CTA screen
  if (!currentUser || !account) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
        <div 
          className="bg-[#1C1712] rounded-3xl max-w-md w-full p-6 sm:p-8 text-center border border-orange-500/30 text-[#F5EBE1] shadow-2xl relative animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              sfx.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#15100C] text-[#D4C5B5] hover:text-white border border-orange-500/30"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-orange-600/30 mb-4">
            <User className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-black text-[#F5EBE1]">Parent Account Portal</h3>
          <p className="text-xs text-[#D4C5B5] mt-2 mb-6">
            Sign in to access your child's weekly tiffin schedules, real-time thermal telemetry, 7:00 AM pause refunds, and your Smart Tiffin Wallet.
          </p>

          <button
            onClick={() => {
              sfx.playSuccess();
              onClose();
              if (onOpenAuth) onOpenAuth();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 shimmer-effect"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In or Register (+$10 Bonus)</span>
          </button>
        </div>
      </div>
    );
  }

  const currentChild: ParentAccountChild | null = account.children[selectedChildIndex] || account.children[0] || null;

  const currentPlan = account.activePlan;
  const currentRate = PLAN_RATES[currentPlan] || PLAN_RATES.standard;
  const weeklyCost = currentRate.price * (currentChild?.activeDays?.length || 5);

  const handleToggleDay = (day: typeof WEEK_DAYS[number]) => {
    if (!currentChild) return;
    sfx.playPop();
    const active = currentChild.activeDays.includes(day);
    let newDays: typeof WEEK_DAYS[number][];
    if (active) {
      if (currentChild.activeDays.length <= 1) {
        return; // Minimum 1 day required
      }
      newDays = currentChild.activeDays.filter((d) => d !== day);
    } else {
      newDays = [...currentChild.activeDays, day];
    }

    const updatedChildren = [...account.children];
    updatedChildren[selectedChildIndex] = {
      ...currentChild,
      activeDays: newDays
    };
    
    setAccount({ ...account, children: updatedChildren });
  };

  const handleSelectPlan = (planKey: MealCategory) => {
    sfx.playSuccess();
    setAccount({ ...account, activePlan: planKey });
    if (currentUser && onUpdateUser) {
      onUpdateUser({ ...currentUser, activePlan: planKey });
    }
    if (onSwitchPlanGlobal) {
      onSwitchPlanGlobal(planKey);
    }
    showFeedback(`Switched to ${PLAN_RATES[planKey].name} Plan!`);
  };

  const handleTogglePauseToday = () => {
    if (!currentChild) return;
    const isCurrentlyPaused = currentChild.isPausedToday;
    const dayRate = PLAN_RATES[account.activePlan].price;

    if (!isCurrentlyPaused) {
      sfx.playSuccess();
      const updatedBalance = Number((account.walletBalance + dayRate).toFixed(2));
      const updatedChildren = [...account.children];
      updatedChildren[selectedChildIndex] = {
        ...currentChild,
        isPausedToday: true,
        pauseReason: 'Paused before 7:00 AM Morning Cutoff'
      };

      const newInvoice = {
        id: `REF-${Date.now().toString().slice(-4)}`,
        date: 'Today',
        amount: dayRate,
        description: `7:00 AM Morning Pause Credit (${currentChild.name})`,
        status: 'refunded' as const
      };

      const updatedAccount = {
        ...account,
        walletBalance: updatedBalance,
        children: updatedChildren,
        recentInvoices: [newInvoice, ...account.recentInvoices]
      };

      setAccount(updatedAccount);

      if (currentUser && onUpdateUser) {
        onUpdateUser({
          ...currentUser,
          walletBalance: updatedBalance
        });
      }

      showFeedback(`Today's lunch paused! +$${dayRate.toFixed(2)} credited to your Wallet.`);
    } else {
      sfx.playPop();
      const updatedChildren = [...account.children];
      updatedChildren[selectedChildIndex] = {
        ...currentChild,
        isPausedToday: false,
        pauseReason: undefined
      };
      setAccount({
        ...account,
        children: updatedChildren
      });
      showFeedback(`Resumed today's lunch delivery for ${currentChild.name}!`);
    }
  };

  const handleToggleAllergen = (alg: Allergen) => {
    if (!currentChild) return;
    sfx.playPop();
    const hasAlg = currentChild.allergies.includes(alg);
    let newAlgs: Allergen[];
    if (hasAlg) {
      newAlgs = currentChild.allergies.filter((a) => a !== alg);
    } else {
      newAlgs = [...currentChild.allergies, alg];
    }
    const updatedChildren = [...account.children];
    updatedChildren[selectedChildIndex] = {
      ...currentChild,
      allergies: newAlgs
    };
    setAccount({ ...account, children: updatedChildren });
  };

  const handleSaveChildProfile = () => {
    if (!currentChild) return;
    sfx.playSuccess();
    if (onUpdateFamilyMembers && familyMembers) {
      const updatedFam = familyMembers.map((m, idx) => {
        if (idx === selectedChildIndex || m.id === currentChild.id) {
          return {
            ...m,
            name: currentChild.name,
            deliveryLocation: `${currentChild.schoolName} • ${currentChild.gradeClass} (${currentChild.lunchLocker})`,
            allergies: currentChild.allergies
          };
        }
        return m;
      });
      onUpdateFamilyMembers(updatedFam);
    }
    showFeedback(`Child Profile for ${currentChild.name} updated successfully!`);
  };

  const handleAddNewChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;

    sfx.playSuccess();
    const newChildObj: ParentAccountChild = {
      id: `child-${Date.now()}`,
      name: newChildName.trim(),
      age: 7,
      schoolName: newChildSchool,
      gradeClass: newChildGrade,
      lunchLocker: `Locker #${Math.floor(Math.random() * 50 + 10)}`,
      allergies: ['nuts'],
      dietaryPreferences: ['Nut-Free Certified'],
      portionSize: 'regular',
      activeDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      isPausedToday: false
    };

    const newFamilyMember: FamilyMember = {
      id: newChildObj.id,
      name: newChildObj.name,
      relation: 'Child',
      age: 7,
      deliveryLocation: `${newChildSchool} • ${newChildGrade}`,
      allergies: ['nuts'],
      dietaryPreferences: ['Nut-Free Certified'],
      avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80',
      colorTheme: 'orange',
      defaultPlan: 'standard'
    };

    const updatedChildren = [...account.children, newChildObj];
    setAccount({ ...account, children: updatedChildren });
    setSelectedChildIndex(updatedChildren.length - 1);

    if (onUpdateFamilyMembers) {
      onUpdateFamilyMembers([...(familyMembers || []), newFamilyMember]);
    }

    setNewChildName('');
    setIsAddingChild(false);
    showFeedback(`Added ${newChildObj.name} to your registered students!`);
  };

  const handleSaveParentProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playSuccess();
    const updatedAccount = {
      ...account,
      parentName: editName.trim() || account.parentName,
      email: editEmail.trim() || account.email,
      phone: editPhone.trim() || account.phone,
      address: editAddress.trim(),
      city: editCity.trim(),
      postalCode: editPostalCode.trim(),
      deliveryNotes: editDeliveryNotes.trim()
    };
    setAccount(updatedAccount);

    if (currentUser && onUpdateUser) {
      onUpdateUser({
        ...currentUser,
        name: updatedAccount.parentName,
        email: updatedAccount.email,
        phone: updatedAccount.phone,
        address: updatedAccount.address,
        city: updatedAccount.city,
        postalCode: updatedAccount.postalCode,
        deliveryNotes: updatedAccount.deliveryNotes
      });
    }

    showFeedback('Parent Profile & Delivery Address updated successfully!');
  };

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const code = voucherInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'TIFFIN15' || code === 'SAVE15' || code === 'WELCOME10') {
      sfx.playSuccess();
      const bonus = 10.00;
      const newBal = Number((account.walletBalance + bonus).toFixed(2));
      setAccount({ ...account, walletBalance: newBal });
      if (currentUser && onUpdateUser) {
        onUpdateUser({ ...currentUser, walletBalance: newBal });
      }
      setVoucherMsg({ text: '🎉 Promo Applied! +$10.00 credited to your Tiffin Wallet.', isError: false });
      setVoucherInput('');
    } else if (code === 'HEALTHYKID' || code === 'FREEDAY') {
      sfx.playSuccess();
      const bonus = 6.50;
      const newBal = Number((account.walletBalance + bonus).toFixed(2));
      setAccount({ ...account, walletBalance: newBal });
      if (currentUser && onUpdateUser) {
        onUpdateUser({ ...currentUser, walletBalance: newBal });
      }
      setVoucherMsg({ text: '🎉 Free Lunch Day credited! +$6.50 added to wallet.', isError: false });
      setVoucherInput('');
    } else {
      sfx.playPop();
      setVoucherMsg({ text: 'Invalid code. Try "TIFFIN15" or "HEALTHYKID".', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-[#1C1712] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-orange-500/25 text-[#F5EBE1] flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-[#261E18] border-b border-orange-500/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={account.avatar}
                alt={account.parentName}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-orange-500/40"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#1C1712] rounded-full" title="Active Parent Session"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-[#F5EBE1] leading-tight">
                  {account.parentName}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-[10px] uppercase tracking-wider shadow-xs">
                  {account.membershipTier}
                </span>
              </div>
              <p className="text-xs text-[#D4C5B5] mt-0.5">
                {account.email} • {account.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Wallet quick badge */}
            <div className="flex flex-col items-end bg-[#15100C] px-3.5 py-1.5 rounded-2xl border border-orange-500/20">
              <span className="text-[10px] uppercase font-bold text-[#A8988A]">Lunch Wallet Balance</span>
              <span className="text-sm font-black text-amber-400">${account.walletBalance.toFixed(2)}</span>
            </div>

            {/* Logout button in header */}
            {onLogout && (
              <button
                onClick={() => {
                  sfx.playPop();
                  onLogout();
                }}
                className="p-2.5 rounded-2xl bg-[#15100C] hover:bg-rose-950/80 text-[#8C7B6D] hover:text-rose-300 border border-orange-500/20 transition-all"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            {/* Close button */}
            <button
              onClick={() => {
                sfx.playPop();
                onClose();
              }}
              className="p-2.5 rounded-full bg-[#15100C] hover:bg-[#2F251E] text-[#D4C5B5] hover:text-white border border-orange-500/30 transition-all hover:scale-105"
              aria-label="Close Parent Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Child Switcher Ribbon & Emergency Pause Action */}
        <div className="px-5 sm:px-6 py-3 bg-[#15100C] border-b border-orange-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            <span className="text-xs font-bold text-[#A8988A] uppercase tracking-wider mr-1 hidden sm:inline">
              Student:
            </span>
            {account.children.map((child, idx) => (
              <button
                key={child.id || idx}
                onClick={() => {
                  sfx.playPop();
                  setSelectedChildIndex(idx);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  selectedChildIndex === idx
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 ring-1 ring-orange-400/40'
                    : 'bg-[#261E18] text-[#D4C5B5] hover:bg-[#2F251E] hover:text-white border border-orange-500/20'
                }`}
              >
                <span>🎒 {child.name}</span>
                <span className="text-[10px] opacity-80">({child.gradeClass})</span>
              </button>
            ))}

            {/* Add Child Mini Button */}
            <button
              onClick={() => {
                sfx.playPop();
                setIsAddingChild(!isAddingChild);
              }}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#261E18] text-orange-400 hover:text-white hover:bg-orange-600/30 border border-orange-500/30 flex items-center gap-1 whitespace-nowrap"
              title="Add another student / child profile"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Child</span>
            </button>
          </div>

          {/* 7:00 AM Emergency Pause Switch */}
          {currentChild ? (
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-left sm:text-right">
                <span className="text-[11px] font-bold block text-[#F5EBE1]">
                  Today's Lunch: {currentChild.isPausedToday ? '🔴 Paused (Refunded)' : '🟢 Active Delivery'}
                </span>
                <span className="text-[10px] text-[#A8988A]">
                  7:00 AM 1-click morning cancellation
                </span>
              </div>
              <button
                onClick={handleTogglePauseToday}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                  currentChild.isPausedToday
                    ? 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm'
                    : 'bg-rose-950/90 hover:bg-rose-900 border border-rose-600/50 text-rose-200'
                }`}
              >
                {currentChild.isPausedToday ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resume Lunch</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-rose-400" />
                    <span>Pause Today & Refund</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="text-xs text-[#A8988A] font-semibold">
              No registered students yet. Click '+ Add Child' to begin.
            </div>
          )}
        </div>

        {/* Quick Add Child Drawer */}
        {isAddingChild && (
          <div className="px-5 sm:px-6 py-3.5 bg-[#201812] border-b border-orange-500/25 animate-in slide-in-from-top-2">
            <form onSubmit={handleAddNewChild} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                required
                placeholder="Child's Full Name (e.g. Zoya Chowdhury)"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                className="w-full sm:flex-1 bg-[#15100C] border border-orange-500/25 rounded-xl px-3 py-2 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="School (e.g. Scholastica / Mastermind)"
                value={newChildSchool}
                onChange={(e) => setNewChildSchool(e.target.value)}
                className="w-full sm:w-48 bg-[#15100C] border border-orange-500/25 rounded-xl px-3 py-2 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
              />
              <input
                type="text"
                placeholder="Grade (e.g. Class 2A)"
                value={newChildGrade}
                onChange={(e) => setNewChildGrade(e.target.value)}
                className="w-full sm:w-28 bg-[#15100C] border border-orange-500/25 rounded-xl px-3 py-2 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
              />
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  Save Student
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingChild(false)}
                  className="px-3 py-2 bg-[#15100C] text-[#8C7B6D] hover:text-white text-xs rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center px-5 sm:px-6 bg-[#261E18] border-b border-orange-500/20 gap-2 overflow-x-auto">
          {[
            { id: 'plan', label: 'Subscription & Days', icon: Calendar },
            { id: 'child', label: 'Child Profile & Allergens', icon: User },
            { id: 'deliveries', label: 'Delivery Telemetry', icon: Truck },
            { id: 'billing', label: 'Wallet & Invoices', icon: CreditCard },
            { id: 'profile', label: 'Parent Details', icon: Edit3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sfx.playPop();
                  setActiveTab(tab.id as any);
                }}
                className={`py-3.5 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'border-orange-500 text-orange-400 bg-orange-950/30'
                    : 'border-transparent text-[#D4C5B5] hover:text-white hover:bg-[#2F251E]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-[#A8988A]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Toast Inside Modal */}
        {saveSuccessMsg && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: SUBSCRIPTION PLAN & DELIVERY SCHEDULE */}
          {activeTab === 'plan' && (
            currentChild ? (
              <div className="space-y-6">

                {/* Current Active Plan Overview */}
                <div className="bg-[#261E18] rounded-3xl p-6 border border-orange-500/25 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-orange-500/20">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                        Active School Plan
                      </span>
                      <h4 className="text-xl font-extrabold text-[#F5EBE1] mt-0.5">
                        {currentRate.name}
                      </h4>
                      <p className="text-xs text-[#D4C5B5] mt-1">
                        {currentRate.desc}
                      </p>
                    </div>
                    <div className="bg-[#15100C] p-4 rounded-2xl border border-orange-500/20 text-left sm:text-right flex-shrink-0">
                      <span className="text-[10px] uppercase font-bold text-[#A8988A] block">Weekly Auto-Charge</span>
                      <span className="text-2xl font-black text-orange-400">${weeklyCost.toFixed(2)}</span>
                      <span className="text-[10px] text-[#A8988A] block mt-0.5">({currentChild.activeDays.length} days / week @ ${currentRate.price.toFixed(2)}/day)</span>
                    </div>
                  </div>

                  {/* Plan Tier Switcher Options */}
                  <div className="pt-5">
                    <span className="text-xs font-bold text-[#D4C5B5] block mb-3">
                      Upgrade or Switch Plan (1-Click Instant Update):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(Object.keys(PLAN_RATES) as MealCategory[]).map((pKey) => {
                        const p = PLAN_RATES[pKey];
                        const isSelected = account.activePlan === pKey;
                        return (
                          <div
                            key={pKey}
                            onClick={() => handleSelectPlan(pKey)}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-orange-950/40 border-orange-500 shadow-md shadow-orange-950/40 ring-1 ring-orange-500/30'
                                : 'bg-[#15100C] border-orange-500/20 hover:border-orange-500/40 hover:bg-[#2F251E]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-extrabold text-xs text-[#F5EBE1]">{p.name}</h5>
                                {isSelected && (
                                  <span className="w-4 h-4 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">
                                    <Check className="w-2.5 h-2.5" />
                                  </span>
                                )}
                              </div>
                              <span className="text-base font-black text-orange-400">${p.price.toFixed(2)}<span className="text-[10px] text-[#A8988A] font-normal">/day</span></span>
                              <p className="text-[11px] text-[#D4C5B5] mt-1.5 line-clamp-2">{p.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Delivery Days Matrix */}
                <div className="bg-[#261E18] rounded-3xl p-6 border border-orange-500/20 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-extrabold text-[#F5EBE1]">Weekly School Delivery Days</h4>
                      <p className="text-xs text-[#D4C5B5]">Select days to receive hot insulated lunch at {currentChild.schoolName}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#15100C] border border-orange-500/20 text-orange-400 text-xs font-bold">
                      {currentChild.activeDays.length} of {WEEK_DAYS.length} Days Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-2">
                    {WEEK_DAYS.map((day) => {
                      const isSelected = currentChild.activeDays.includes(day);
                      return (
                        <button
                          key={day}
                          onClick={() => handleToggleDay(day)}
                          className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                            isSelected
                              ? 'bg-orange-600 border-orange-500 text-white font-bold shadow-md shadow-orange-600/30'
                              : 'bg-[#15100C] border-orange-500/20 text-[#A8988A] hover:text-[#D4C5B5] hover:bg-[#2F251E]'
                          }`}
                        >
                          <span className="text-xs font-bold">{day.slice(0, 3)}</span>
                          <span className="text-[10px] opacity-90">{isSelected ? `$${currentRate.price.toFixed(2)}` : 'Off'}</span>
                          <div className={`w-4 h-4 rounded-full mt-1 flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-[#261E18]'}`}>
                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-4 border-t border-orange-500/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8988A] gap-2">
                    <span>💡 Tip: Adjusting days automatically recalculates your weekly invoice with no cancellation fees.</span>
                    <button
                      onClick={() => {
                        sfx.playSuccess();
                        showFeedback('Schedule preferences saved!');
                      }}
                      className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs"
                    >
                      Save Days Schedule
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-[#261E18] rounded-3xl p-8 border border-dashed border-orange-500/30 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-950/80 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/30">
                  <User className="w-7 h-7" />
                </div>
                <h4 className="text-base font-extrabold text-white">No Children Added Yet</h4>
                <p className="text-xs text-[#D4C5B5] max-w-sm mx-auto">
                  Add your child's profile to choose their school delivery schedule and subscription plan.
                </p>
                <button
                  onClick={() => setIsAddingChild(true)}
                  className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/30 inline-flex items-center gap-2 active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Child Profile</span>
                </button>
              </div>
            )
          )}

          {/* TAB 2: CHILD PROFILE & ALLERGEN PASSPORT */}
          {activeTab === 'child' && (
            currentChild ? (
              <div className="space-y-6">

                {/* School & Locker Info */}
                <div className="bg-[#261E18] rounded-3xl p-6 border border-orange-500/20 shadow-xl space-y-4">
                  <h4 className="text-sm font-extrabold text-[#F5EBE1] flex items-center gap-2">
                    <School className="w-4 h-4 text-orange-400" />
                    <span>Classroom & Delivery Drop Point</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Child Full Name</label>
                      <input
                        type="text"
                        value={currentChild.name}
                        onChange={(e) => {
                          const updated = [...account.children];
                          updated[selectedChildIndex].name = e.target.value;
                          setAccount({ ...account, children: updated });
                        }}
                        className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#A8988A] block mb-1.5">School Name</label>
                      <input
                        type="text"
                        value={currentChild.schoolName}
                        onChange={(e) => {
                          const updated = [...account.children];
                          updated[selectedChildIndex].schoolName = e.target.value;
                          setAccount({ ...account, children: updated });
                        }}
                        className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Grade / Section</label>
                      <input
                        type="text"
                        value={currentChild.gradeClass}
                        onChange={(e) => {
                          const updated = [...account.children];
                          updated[selectedChildIndex].gradeClass = e.target.value;
                          setAccount({ ...account, children: updated });
                        }}
                        className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Designated Lunch Drop Locker / Cubby</label>
                    <input
                      type="text"
                      value={currentChild.lunchLocker}
                      onChange={(e) => {
                        const updated = [...account.children];
                        updated[selectedChildIndex].lunchLocker = e.target.value;
                        setAccount({ ...account, children: updated });
                      }}
                      placeholder="e.g. Locker #42, Hallway B"
                      className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Allergen Quarantine Matrix */}
                <div className="bg-[#261E18] rounded-3xl p-6 border border-orange-500/20 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-[#F5EBE1] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-orange-400" />
                        <span>Allergen Quarantine & Safety Matrix</span>
                      </h4>
                      <p className="text-xs text-[#D4C5B5]">Kitchen staff automatically flags and substitutes ingredients based on these rules</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {ALL_ALLERGENS.map((alg) => {
                      const isAllergic = currentChild.allergies.includes(alg.key);
                      return (
                        <button
                          key={alg.key}
                          onClick={() => handleToggleAllergen(alg.key)}
                          className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                            isAllergic
                              ? 'bg-rose-950/80 border-rose-600 text-rose-200 font-bold'
                              : 'bg-[#15100C] border-orange-500/20 text-[#D4C5B5] hover:bg-[#2F251E]'
                          }`}
                        >
                          <span className="text-xs">{alg.label}</span>
                          {isAllergic && <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Chef Notes & Preferences</label>
                    <textarea
                      rows={2}
                      value={currentChild.notes || ''}
                      onChange={(e) => {
                        const updated = [...account.children];
                        updated[selectedChildIndex].notes = e.target.value;
                        setAccount({ ...account, children: updated });
                      }}
                      placeholder="e.g. Mild spice only, please cut fruits into small slices"
                      className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl p-3 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleSaveChildProfile}
                      className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/30"
                    >
                      Save Child Profile
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-[#261E18] rounded-3xl p-8 border border-dashed border-orange-500/30 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-950/80 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/30">
                  <User className="w-7 h-7" />
                </div>
                <h4 className="text-base font-extrabold text-white">No Children Added Yet</h4>
                <p className="text-xs text-[#D4C5B5] max-w-sm mx-auto">
                  Register your child's profile to configure their Dhaka school campus, classroom locker, and strict allergen quarantine rules.
                </p>
                <button
                  onClick={() => setIsAddingChild(true)}
                  className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/30 inline-flex items-center gap-2 active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Child Profile</span>
                </button>
              </div>
            )
          )}

          {/* TAB 3: DELIVERY TELEMETRY & REPORT */}
          {activeTab === 'deliveries' && (
            <div className="space-y-6">

              {/* Recent Deliveries Log */}
              <div className="bg-[#261E18] rounded-3xl p-6 border border-orange-500/20 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-[#F5EBE1] flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-400" />
                    <span>Real-Time Logistics & Thermal Delivery Log</span>
                  </h4>
                  <span className="text-[11px] text-orange-400 font-semibold">Live GPS & Sensor Synced</span>
                </div>

                <div className="space-y-3">
                  {account.recentDeliveries.map((del) => (
                    <div
                      key={del.id}
                      className="p-4 rounded-2xl bg-[#15100C] border border-orange-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-[#F5EBE1]">{del.mealName}</span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            del.status === 'In Transit'
                              ? 'bg-orange-950 text-orange-300 border border-orange-500/40 animate-pulse'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                          }`}>
                            {del.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#A8988A]">
                          Recipient: <span className="text-[#D4C5B5] font-semibold">{del.childName}</span> • Time: {del.date}
                        </p>
                        {del.childFeedback && (
                          <p className="text-[11px] text-amber-300 italic">{del.childFeedback}</p>
                        )}
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-orange-500/10">
                        <span className="text-[10px] uppercase font-bold text-[#A8988A]">Arrival Temperature</span>
                        <span className="text-xs font-black text-orange-400 bg-orange-950/80 px-2.5 py-1 rounded-lg border border-orange-500/30">
                          🌡️ {del.tempArrival}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition Summary Report Card */}
              <div className="bg-gradient-to-r from-orange-950/60 via-[#261E18] to-amber-950/50 rounded-3xl p-6 border border-orange-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Monthly Pediatric Nutrition & Growth Report</span>
                  </h4>
                  <p className="text-xs text-[#D4C5B5] max-w-lg">
                    Certified breakdown of RDA calories, complete amino acid profiles, and micronutrient vitamins consumed by your child this term.
                  </p>
                </div>
                <button
                  onClick={() => {
                    sfx.playSuccess();
                    showFeedback('Downloading Monthly Pediatric Nutrition PDF...');
                  }}
                  className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/30 flex items-center gap-2 whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Report (PDF)</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 4: WALLET & INVOICES */}
          {activeTab === 'billing' && (
            <div className="space-y-6">

              {/* Wallet Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#261E18] rounded-3xl p-6 border border-orange-500/25 shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                      Smart Tiffin Wallet
                    </span>
                    <h4 className="text-3xl font-black text-amber-400 mt-2">
                      ${account.walletBalance.toFixed(2)}
                    </h4>
                    <p className="text-xs text-[#D4C5B5] mt-1">
                      Auto-credited whenever a meal is paused before 7:00 AM or promotional vouchers are redeemed.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-orange-500/20 flex items-center gap-2">
                    <button
                      onClick={() => {
                        sfx.playSuccess();
                        showFeedback('Wallet balance will automatically discount your next school delivery bill!');
                      }}
                      className="px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs shadow-sm hover:bg-orange-500"
                    >
                      Apply Credit to Next Bill
                    </button>
                  </div>
                </div>

                {/* Voucher Promo Code */}
                <div className="bg-[#261E18] rounded-3xl p-6 border border-orange-500/25 shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                      Redeem Voucher / Credit Code
                    </span>
                    <p className="text-xs text-[#D4C5B5] mt-1">
                      Have a school referral or promotion code? Enter it below.
                    </p>
                    <form onSubmit={handleApplyVoucher} className="mt-3 flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. TIFFIN15"
                        value={voucherInput}
                        onChange={(e) => setVoucherInput(e.target.value)}
                        className="bg-[#15100C] border border-orange-500/25 rounded-xl px-3.5 py-2 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500 flex-1 uppercase"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl transition-all"
                      >
                        Redeem
                      </button>
                    </form>
                    {voucherMsg && (
                      <p className={`text-xs font-semibold mt-2 ${voucherMsg.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {voucherMsg.text}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-[#A8988A] pt-2">
                    Try demo codes: <strong className="text-orange-400">TIFFIN15</strong> (+$10) or <strong className="text-orange-400">HEALTHYKID</strong> (+$6.50)
                  </span>
                </div>
              </div>

              {/* Payment Method on File */}
              <div className="bg-[#261E18] rounded-3xl p-6 border border-orange-500/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#15100C] border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-[#F5EBE1]">
                      Visa ending in {account.paymentMethod.last4}
                    </h5>
                    <p className="text-xs text-[#A8988A]">
                      Expires {account.paymentMethod.expiry} • Next automatic renewal on {account.nextBillingDate}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    sfx.playPop();
                    showFeedback('Payment gateway updated!');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#15100C] hover:bg-[#2F251E] border border-orange-500/30 text-[#D4C5B5] text-xs font-bold"
                >
                  Update Card
                </button>
              </div>

              {/* Recent Invoices Table */}
              <div className="bg-[#261E18] rounded-3xl p-6 border border-orange-500/20 shadow-xl space-y-4">
                <h4 className="text-sm font-extrabold text-[#F5EBE1] flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-orange-400" />
                  <span>Invoice & Billing History</span>
                </h4>

                <div className="space-y-2.5">
                  {account.recentInvoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-3.5 rounded-2xl bg-[#15100C] border border-orange-500/20 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-extrabold text-[#F5EBE1] block">{inv.description}</span>
                        <span className="text-[11px] text-[#A8988A]">{inv.id} • {inv.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-sm text-orange-400">${inv.amount.toFixed(2)}</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          inv.status === 'paid' ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40' :
                            'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}>
                          {inv.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: PARENT PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-[#261E18] rounded-3xl p-6 border border-orange-500/25 shadow-xl space-y-5">
                <h4 className="text-base font-extrabold text-[#F5EBE1] flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-400" />
                  <span>Parent Account Profile Information</span>
                </h4>

                <form onSubmit={handleSaveParentProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Parent Full Name</label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Delivery & Billing Address Section */}
                  <div className="pt-2 border-t border-orange-500/20 space-y-3">
                    <span className="text-xs font-bold text-orange-400 block uppercase tracking-wider">
                      Home / Delivery Address
                    </span>

                    <div>
                      <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Street Address & Flat / House #</label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="e.g. Flat 4B, Maple Residency, Orchard Road"
                        className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-[#A8988A] block mb-1.5">City / Zone (Dhaka)</label>
                        <input
                          type="text"
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                          placeholder="e.g. Dhaka (Gulshan / Banani / Dhanmondi)"
                          className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Postal Code</label>
                        <input
                          type="text"
                          value={editPostalCode}
                          onChange={(e) => setEditPostalCode(e.target.value)}
                          placeholder="e.g. 1213 / 1205"
                          className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Default Driver Delivery Notes</label>
                      <input
                        type="text"
                        value={editDeliveryNotes}
                        onChange={(e) => setEditDeliveryNotes(e.target.value)}
                        placeholder="e.g. Gate passcode #1024, leave in designated yellow locker"
                        className="w-full bg-[#15100C] border border-orange-500/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/30 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Profile & Address</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#261E18] border-t border-orange-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#A8988A]">
            <Lock className="w-4 h-4 text-orange-400" />
            <span>256-Bit SSL Encrypted Parent Portal & Food Safety Registry</span>
          </div>
          <button
            onClick={() => {
              sfx.playPop();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/30"
          >
            Done & Return to Site
          </button>
        </div>

      </div>
    </div>
  );
};
