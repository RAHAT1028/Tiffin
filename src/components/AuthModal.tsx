import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  School, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  UtensilsCrossed,
  HeartHandshake,
  Smartphone,
  Check,
  Award
} from 'lucide-react';
import { AuthUser, FamilyMember, Allergen } from '../types';
import { sfx } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  initialMode?: 'login' | 'register';
}

export const DEMO_PARENT_USER: AuthUser = {
  id: 'usr-parent-9921',
  name: 'Dr. Sarah Jenkins',
  email: 'sarah.jenkins@familymail.com',
  phone: '+44 (0) 7700 900822',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  role: 'parent',
  membershipTier: 'Gold VIP',
  walletBalance: 28.50,
  activePlan: 'standard'
};

const PARTNER_SCHOOL_LIST = [
  'St. Mary Academy (Zone A)',
  'Oakridge International School (Zone A)',
  'Kingsway Grammar Academy (Zone B)',
  'Westminster Primary & Nursery (Zone B)',
  'St. Jude Catholic School (Zone C)',
  'Greenwich Community School (Zone D)',
  'Cambridge International Foundation'
];

const ALLERGEN_OPTIONS: { key: Allergen; label: string }[] = [
  { key: 'nuts', label: 'Nut-Free' },
  { key: 'dairy', label: 'Dairy-Free' },
  { key: 'gluten', label: 'Gluten-Free' },
  { key: 'eggs', label: 'Egg-Free' },
  { key: 'soy', label: 'Soy-Free' },
  { key: 'seafood', label: 'Seafood-Free' }
];

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onLoginSuccess,
  initialMode = 'login' 
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'otp'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Registration Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('8');
  const [childGrade, setChildGrade] = useState('Class 3B');
  const [school, setSchool] = useState(PARTNER_SCHOOL_LIST[0]);
  const [selectedAllergies, setSelectedAllergies] = useState<Allergen[]>(['nuts']);
  
  // Login Form fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  
  // Feedback states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleAllergen = (alg: Allergen) => {
    sfx.playPop();
    if (selectedAllergies.includes(alg)) {
      setSelectedAllergies(selectedAllergies.filter(a => a !== alg));
    } else {
      setSelectedAllergies([...selectedAllergies, alg]);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    const targetEmail = loginEmail.trim();
    if (!targetEmail || !loginPassword) {
      setErrorMsg('Please enter both your email/phone and password.');
      sfx.playPop();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      // Check localStorage for registered users
      let savedAccounts: any[] = [];
      try {
        const stored = localStorage.getItem('smart_tiffin_accounts');
        if (stored) savedAccounts = JSON.parse(stored);
      } catch (err) {
        console.error('Error loading accounts from localStorage', err);
      }

      const existing = savedAccounts.find(
        (acc) => acc.email.toLowerCase() === targetEmail.toLowerCase()
      );

      let authenticatedUser: AuthUser;

      if (existing) {
        authenticatedUser = {
          id: existing.id || `usr-${Date.now()}`,
          name: existing.name || 'Parent Member',
          email: existing.email,
          phone: existing.phone || '+44 7700 900822',
          avatar: existing.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          role: 'parent',
          membershipTier: existing.membershipTier || 'Silver VIP',
          walletBalance: typeof existing.walletBalance === 'number' ? existing.walletBalance : 10.00,
          familyMembers: existing.familyMembers || [],
          activePlan: existing.activePlan || 'standard'
        };
      } else if (targetEmail.toLowerCase().includes('sarah') || targetEmail === DEMO_PARENT_USER.email) {
        authenticatedUser = DEMO_PARENT_USER;
      } else {
        // Create an active session for any custom login
        const generatedChild: FamilyMember = {
          id: `child-${Date.now()}`,
          name: `${targetEmail.split('@')[0]}'s Child`,
          relation: 'Child',
          age: 8,
          deliveryLocation: 'St. Mary Academy • Class 3B (Locker #14)',
          allergies: ['nuts'],
          dietaryPreferences: ['High-Protein', 'Halal'],
          avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80',
          colorTheme: 'orange',
          defaultPlan: 'standard'
        };

        authenticatedUser = {
          id: `usr-${Date.now()}`,
          name: targetEmail.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()) || 'Parent Member',
          email: targetEmail,
          phone: '+44 (0) 7700 900822',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
          role: 'parent',
          membershipTier: 'Silver VIP',
          walletBalance: 15.00,
          familyMembers: [generatedChild],
          activePlan: 'standard'
        };
      }

      sfx.playSuccess();
      try {
        localStorage.setItem('smart_tiffin_current_user', JSON.stringify(authenticatedUser));
      } catch (e) {}

      onLoginSuccess(authenticatedUser);
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedChildName = childName.trim();

    if (!trimmedName || !trimmedEmail || !password || !trimmedChildName) {
      setErrorMsg('Please fill in all required fields (Parent Name, Email, Password, Child Name).');
      sfx.playPop();
      return;
    }

    if (password.length < 4) {
      setErrorMsg('Password must be at least 4 characters.');
      sfx.playPop();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      // 1. Build the newly registered child profile
      const newChildMember: FamilyMember = {
        id: `child-${Date.now()}`,
        name: trimmedChildName,
        relation: 'Child',
        age: parseInt(childAge, 10) || 8,
        deliveryLocation: `${school} • ${childGrade || 'Classroom'} (Locker #${Math.floor(Math.random() * 50 + 10)})`,
        allergies: selectedAllergies,
        dietaryPreferences: ['Nut-Free Certified', 'Pediatric Approved'],
        avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=300&q=80',
        colorTheme: 'orange',
        defaultPlan: 'standard'
      };

      // 2. Build the new parent AuthUser with $10 welcome bonus
      const newUser: AuthUser = {
        id: `usr-parent-${Date.now().toString().slice(-4)}`,
        name: trimmedName,
        email: trimmedEmail.toLowerCase(),
        phone: phone.trim() || '+44 7700 900822',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        role: 'parent',
        membershipTier: 'Silver VIP',
        walletBalance: 10.00, // $10 Welcome bonus
        familyMembers: [newChildMember],
        activePlan: 'standard'
      };

      // 3. Save to localStorage accounts database
      try {
        let savedAccounts: any[] = [];
        const stored = localStorage.getItem('smart_tiffin_accounts');
        if (stored) savedAccounts = JSON.parse(stored);
        
        // Remove duplicate if exists
        savedAccounts = savedAccounts.filter(acc => acc.email.toLowerCase() !== newUser.email.toLowerCase());
        savedAccounts.push({
          ...newUser,
          password: password // In-browser demo persistence
        });
        localStorage.setItem('smart_tiffin_accounts', JSON.stringify(savedAccounts));
        localStorage.setItem('smart_tiffin_current_user', JSON.stringify(newUser));
      } catch (err) {
        console.error('LocalStorage write error:', err);
      }

      sfx.playSuccess();
      onLoginSuccess(newUser);
      onClose();
    }, 700);
  };

  const handleQuickDemoLogin = () => {
    sfx.playSuccess();
    setLoginEmail(DEMO_PARENT_USER.email);
    setLoginPassword('••••••••');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        localStorage.setItem('smart_tiffin_current_user', JSON.stringify(DEMO_PARENT_USER));
      } catch (e) {}
      onLoginSuccess(DEMO_PARENT_USER);
      onClose();
    }, 400);
  };

  const handleSendForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) {
      setErrorMsg('Please enter your registered email address.');
      sfx.playPop();
      return;
    }
    sfx.playSuccess();
    setInfoMsg(`Password reset instructions have been sent to ${loginEmail}`);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#1C1712] rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-orange-500/30 text-[#F5EBE1] relative animate-in zoom-in-95 duration-200 scrollbar-thin scrollbar-thumb-orange-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Background glow flares */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => {
            sfx.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#15100C]/90 hover:bg-[#261E18] text-[#D4C5B5] hover:text-white border border-orange-500/30 transition-all hover:scale-105"
          aria-label="Close Login Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Branding */}
        <div className="p-6 sm:p-7 pb-3 text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-600/30 mb-3">
            <UtensilsCrossed className="w-6 h-6" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#F5EBE1] tracking-tight">
            {mode === 'login' && 'Parent Account Sign In'}
            {mode === 'register' && 'Create Parent Account'}
            {mode === 'forgot' && 'Reset Your Password'}
            {mode === 'otp' && 'Instant SMS Sign In'}
          </h3>
          <p className="text-xs text-[#D4C5B5] mt-1 max-w-sm mx-auto">
            {mode === 'login' && 'Access weekly lunch schedules, 7:00 AM pause credits, and live thermal telemetry.'}
            {mode === 'register' && 'Register in 60s to get $10.00 Welcome Lunch Credit and allergen-safe hot delivery.'}
            {mode === 'forgot' && 'Enter your email to receive a secure password recovery magic link.'}
            {mode === 'otp' && 'Enter the 6-digit verification code sent to your phone.'}
          </p>

          {/* Mode Switcher Tabs */}
          {(mode === 'login' || mode === 'register') && (
            <div className="grid grid-cols-2 gap-2 mt-4 p-1 bg-[#15100C] rounded-2xl border border-orange-500/20">
              <button
                type="button"
                onClick={() => {
                  sfx.playPop();
                  setMode('login');
                  setErrorMsg(null);
                  setInfoMsg(null);
                }}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'login'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : 'text-[#D4C5B5] hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  sfx.playPop();
                  setMode('register');
                  setErrorMsg(null);
                  setInfoMsg(null);
                }}
                className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'register'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : 'text-[#D4C5B5] hover:text-white'
                }`}
              >
                <span>Create Account</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-black text-[9px] font-black">
                  +$10
                </span>
              </button>
            </div>
          )}

          {/* Quick Demo Parent One-Click Fill Button */}
          {mode === 'login' && (
            <div className="mt-3">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-orange-950/90 via-[#261E18] to-amber-950/90 border border-orange-500/40 text-xs font-bold text-orange-300 hover:text-white hover:border-orange-400 transition-all flex items-center justify-center gap-2 shadow-sm animate-glow-orange group"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-400 group-hover:rotate-12 transition-transform" />
                <span>One-Click Demo Login (Dr. Sarah Jenkins • $28.50)</span>
              </button>
            </div>
          )}
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mx-6 sm:mx-7 mb-3 p-3 rounded-xl bg-rose-950/80 border border-rose-600/60 text-rose-200 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {infoMsg && (
          <div className="mx-6 sm:mx-7 mb-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{infoMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="px-6 sm:px-7 pb-7 space-y-4">
          
          {/* 1. SIGN IN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#A8988A] block mb-1.5">
                  Email or Registered Phone Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C7B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. sarah.jenkins@familymail.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#15100C] border border-orange-500/25 rounded-2xl pl-10 pr-4 py-3 text-xs text-[#F5EBE1] placeholder-[#8C7B6D] focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#A8988A]">Password</label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C7B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your account password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#15100C] border border-orange-500/25 rounded-2xl pl-10 pr-11 py-3 text-xs text-[#F5EBE1] placeholder-[#8C7B6D] focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C7B6D] hover:text-[#D4C5B5]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & OTP Link */}
              <div className="flex items-center justify-between text-xs text-[#D4C5B5] pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-orange-500/30 text-orange-600 focus:ring-orange-500 bg-[#15100C]"
                  />
                  <span>Keep me logged in</span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode('otp')}
                  className="text-amber-400 font-bold hover:underline"
                >
                  SMS Quick Code
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 transition-all flex items-center justify-center gap-2 active:scale-95 shimmer-effect mt-2"
              >
                {isLoading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In to Parent Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* 2. REGISTER / SIGN UP FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              
              {/* Parent Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-[#A8988A] block mb-1">Parent Full Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#8C7B6D] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#15100C] border border-orange-500/25 rounded-xl pl-9 pr-3 py-2 text-xs text-[#F5EBE1] placeholder-[#8C7B6D] focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#A8988A] block mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#8C7B6D] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+880 1700 000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#15100C] border border-orange-500/25 rounded-xl pl-9 pr-3 py-2 text-xs text-[#F5EBE1] placeholder-[#8C7B6D] focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#A8988A] block mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#8C7B6D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="yourname@familymail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#15100C] border border-orange-500/25 rounded-xl pl-9 pr-3 py-2 text-xs text-[#F5EBE1] placeholder-[#8C7B6D] focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Child Information (Core for School Lunch Tiffin) */}
              <div className="p-3 bg-[#15100C] rounded-2xl border border-orange-500/25 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-orange-400 flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5" />
                    <span>Child & School Information</span>
                  </span>
                  <span className="text-[10px] text-[#A8988A]">Lunchbox recipient</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-[#A8988A] block mb-0.5">Child's Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oliver / Maya"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full bg-[#261E18] border border-orange-500/20 rounded-lg px-2.5 py-1.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#A8988A] block mb-0.5">Grade / Class</label>
                    <input
                      type="text"
                      placeholder="e.g. Class 3B"
                      value={childGrade}
                      onChange={(e) => setChildGrade(e.target.value)}
                      className="w-full bg-[#261E18] border border-orange-500/20 rounded-lg px-2.5 py-1.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#A8988A] block mb-0.5">Select Partner School *</label>
                  <select
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full bg-[#261E18] border border-orange-500/20 rounded-lg px-2.5 py-1.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                  >
                    {PARTNER_SCHOOL_LIST.map((s) => (
                      <option key={s} value={s} className="bg-[#1C1712] text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Allergen Filters */}
                <div>
                  <label className="text-[10px] font-bold text-[#A8988A] block mb-1">Allergies / Safe Rules</label>
                  <div className="flex flex-wrap gap-1.5">
                    {ALLERGEN_OPTIONS.map((alg) => {
                      const isChecked = selectedAllergies.includes(alg.key);
                      return (
                        <button
                          key={alg.key}
                          type="button"
                          onClick={() => toggleAllergen(alg.key)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                            isChecked
                              ? 'bg-orange-600 text-white shadow-xs'
                              : 'bg-[#261E18] text-[#A8988A] hover:text-[#D4C5B5] border border-orange-500/20'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5" />}
                          <span>{alg.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#A8988A] block mb-1">Create Account Password *</label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-[#8C7B6D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 4 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#15100C] border border-orange-500/25 rounded-xl pl-9 pr-10 py-2 text-xs text-[#F5EBE1] placeholder-[#8C7B6D] focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7B6D] hover:text-[#D4C5B5]"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Bonus Notification Box */}
              <div className="p-2.5 bg-gradient-to-r from-amber-950/60 to-orange-950/60 rounded-xl border border-amber-500/30 text-[11px] text-amber-200 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>🎁 <strong>$10.00 Welcome Bonus</strong> will be instantly credited to your Parent Tiffin Wallet!</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 shimmer-effect"
              >
                {isLoading ? (
                  <span>Setting Up Your Account...</span>
                ) : (
                  <>
                    <span>Create Parent Account (Get $10 Bonus)</span>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* 3. FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleSendForgotPassword} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Registered Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C7B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah.jenkins@familymail.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#15100C] border border-orange-500/25 rounded-2xl pl-10 pr-4 py-3 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Send Password Reset Link</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs font-semibold text-[#D4C5B5] hover:text-white pt-1 block"
              >
                ← Back to Sign In
              </button>
            </form>
          )}

          {/* 4. OTP SMS SIGN IN */}
          {mode === 'otp' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#A8988A] block mb-1.5">Enter 6-Digit SMS Code</label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-[#8C7B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 584920"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full bg-[#15100C] border border-orange-500/25 rounded-2xl pl-10 pr-4 py-3 text-sm tracking-widest font-black text-amber-400 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <span className="text-[11px] text-[#8C7B6D] mt-1 block">
                  Demo code: Type any 6 digits to verify instantly.
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  sfx.playSuccess();
                  try {
                    localStorage.setItem('smart_tiffin_current_user', JSON.stringify(DEMO_PARENT_USER));
                  } catch (e) {}
                  onLoginSuccess(DEMO_PARENT_USER);
                  onClose();
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs font-semibold text-[#D4C5B5] hover:text-white pt-1 block"
              >
                ← Back to Password Sign In
              </button>
            </div>
          )}

          {/* Social Logins */}
          <div className="pt-3 border-t border-orange-500/20 text-center">
            <span className="text-[11px] text-[#8C7B6D] font-medium block mb-2.5">Or continue with</span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="py-2 px-3 rounded-2xl bg-[#15100C] hover:bg-[#261E18] border border-orange-500/20 text-xs font-bold text-[#F5EBE1] flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-base font-black text-red-400">G</span>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="py-2 px-3 rounded-2xl bg-[#15100C] hover:bg-[#261E18] border border-orange-500/20 text-xs font-bold text-[#F5EBE1] flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-base"></span>
                <span>Apple ID</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
