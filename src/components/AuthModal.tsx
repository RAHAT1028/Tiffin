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
  Smartphone
} from 'lucide-react';
import { AuthUser } from '../types';
import { sfx } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  initialMode?: 'login' | 'register';
}

const DEMO_PARENT_USER: AuthUser = {
  id: 'usr-parent-9921',
  name: 'Dr. Sarah Jenkins',
  email: 'sarah.jenkins@familymail.com',
  phone: '+44 (0) 7700 900822',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  role: 'parent',
  membershipTier: 'Gold VIP',
  walletBalance: 28.50
};

const PARTNER_SCHOOL_LIST = [
  'St. Mary Academy',
  'Oakridge International School',
  'Kingsway Grammar School',
  'Westminster Primary & Nursery',
  'St. Jude Catholic School',
  'Greenwich Community School'
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
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [school, setSchool] = useState(PARTNER_SCHOOL_LIST[0]);
  const [otpCode, setOtpCode] = useState('');
  
  // Feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    if (!email || !password) {
      setErrorMsg('Please enter both your email/phone and password.');
      sfx.playPop();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      sfx.playSuccess();
      const user: AuthUser = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: email.includes('sarah') ? 'Dr. Sarah Jenkins' : (email.split('@')[0] || 'Parent Member'),
        email: email,
        phone: '+44 (0) 7700 900822',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        role: 'parent',
        membershipTier: 'Gold VIP',
        walletBalance: 28.50
      };
      onLoginSuccess(user);
      onClose();
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    if (!name || !email || !password || !childName) {
      setErrorMsg('Please fill in all required fields (Name, Email, Password, Child Name).');
      sfx.playPop();
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      sfx.playPop();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      sfx.playSuccess();
      const newUser: AuthUser = {
        id: `usr-parent-${Date.now().toString().slice(-4)}`,
        name: name,
        email: email,
        phone: phone || '+44 7700 900000',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        role: 'parent',
        membershipTier: 'Silver VIP',
        walletBalance: 10.00 // $10 welcome bonus
      };
      onLoginSuccess(newUser);
      onClose();
    }, 900);
  };

  const handleQuickDemoLogin = () => {
    sfx.playSuccess();
    setEmail(DEMO_PARENT_USER.email);
    setPassword('••••••••');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(DEMO_PARENT_USER);
      onClose();
    }, 500);
  };

  const handleSendForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your registered email address.');
      sfx.playPop();
      return;
    }
    sfx.playSuccess();
    setInfoMsg(`Password reset instructions have been sent to ${email}`);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#1C1712] rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-orange-500/30 text-[#F5EBE1] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Background glow flares */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

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
        <div className="p-6 sm:p-8 pb-4 text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-600/30 mb-3.5">
            <UtensilsCrossed className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-black text-[#F5EBE1] tracking-tight">
            {mode === 'login' && 'Parent Account Sign In'}
            {mode === 'register' && 'Create Parent Account'}
            {mode === 'forgot' && 'Reset Your Password'}
            {mode === 'otp' && 'Instant SMS Sign In'}
          </h3>
          <p className="text-xs text-[#D4C5B5] mt-1 max-w-sm mx-auto">
            {mode === 'login' && 'Access your child’s weekly hot tiffin schedule, 7 AM pause controls, and temperature logs.'}
            {mode === 'register' && 'Register in 60 seconds to get fresh, allergen-safe hot lunch delivered to your child desk.'}
            {mode === 'forgot' && 'Enter your email to receive a secure password recovery magic link.'}
            {mode === 'otp' && 'Enter the 6-digit verification code sent to your phone.'}
          </p>

          {/* Quick Demo Parent One-Click Fill Button */}
          {mode === 'login' && (
            <div className="mt-4 pt-1">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-orange-950/80 via-[#261E18] to-amber-950/80 border border-orange-500/40 text-xs font-bold text-orange-300 hover:text-white hover:border-orange-400 transition-all flex items-center justify-center gap-2 shadow-sm animate-glow-orange group"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-400 group-hover:rotate-12 transition-transform" />
                <span>One-Click Demo Parent Login (Dr. Sarah Jenkins)</span>
              </button>
            </div>
          )}

          {/* Mode Switcher Tabs */}
          {(mode === 'login' || mode === 'register') && (
            <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-[#15100C] rounded-2xl border border-orange-500/20">
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
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'register'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : 'text-[#D4C5B5] hover:text-white'
                }`}
              >
                New Parent? Register
              </button>
            </div>
          )}
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="mx-6 sm:mx-8 mb-3 p-3 rounded-xl bg-rose-950/80 border border-rose-600/60 text-rose-200 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {infoMsg && (
          <div className="mx-6 sm:mx-8 mb-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{infoMsg}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="px-6 sm:px-8 pb-8 space-y-4">
          
          {/* SIGN IN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#A8988A] block mb-1.5">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C7B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. sarah.jenkins@familymail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <div className="flex items-center justify-between text-xs text-[#D4C5B5] pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-orange-500/30 text-orange-600 focus:ring-orange-500 bg-[#15100C]"
                  />
                  <span>Remember my login</span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode('otp')}
                  className="text-amber-400 font-bold hover:underline"
                >
                  Sign in via SMS Code
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 transition-all flex items-center justify-center gap-2 active:scale-95 shimmer-effect mt-2"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Parent Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* REGISTER / SIGN UP FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#A8988A] block mb-1">Parent Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C7B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#15100C] border border-orange-500/25 rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-[#F5EBE1] placeholder-[#8C7B6D] focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#A8988A] block mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C7B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+44 7700 900822"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#15100C] border border-orange-500/25 rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-[#F5EBE1] placeholder-[#8C7B6D] focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#A8988A] block mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C7B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="sarah.jenkins@familymail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#15100C] border border-orange-500/25 rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-[#F5EBE1] placeholder-[#8C7B6D] focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#A8988A] block mb-1">Child's Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oliver Jenkins"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full bg-[#15100C] border border-orange-500/25 rounded-2xl px-3.5 py-2.5 text-xs text-[#F5EBE1] placeholder-[#8C7B6D] focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#A8988A] block mb-1">Select Partner School *</label>
                  <select
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full bg-[#15100C] border border-orange-500/25 rounded-2xl px-3.5 py-2.5 text-xs text-[#F5EBE1] focus:outline-none focus:border-orange-500"
                  >
                    {PARTNER_SCHOOL_LIST.map((s) => (
                      <option key={s} value={s} className="bg-[#1C1712] text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#A8988A] block mb-1">Create Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C7B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#15100C] border border-orange-500/25 rounded-2xl pl-10 pr-11 py-2.5 text-xs text-[#F5EBE1] placeholder-[#8C7B6D] focus:outline-none focus:border-orange-500"
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

              <div className="p-3 bg-[#15100C] rounded-xl border border-orange-500/20 text-[11px] text-[#D4C5B5] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Nut-Free Kitchen Guarantee & Same-day 7 AM cancellation policy apply.</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 shimmer-effect"
              >
                {isLoading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Complete Registration (Get $10 Welcome Bonus)</span>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                className="w-full text-center text-xs font-semibold text-[#D4C5B5] hover:text-white pt-2 block"
              >
                ← Back to Sign In
              </button>
            </form>
          )}

          {/* OTP SMS SIGN IN */}
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
                className="w-full text-center text-xs font-semibold text-[#D4C5B5] hover:text-white pt-2 block"
              >
                ← Back to Password Sign In
              </button>
            </div>
          )}

          {/* Social Logins */}
          <div className="pt-4 border-t border-orange-500/20 text-center">
            <span className="text-[11px] text-[#8C7B6D] font-medium block mb-3">Or continue with</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="py-2.5 px-3 rounded-2xl bg-[#15100C] hover:bg-[#261E18] border border-orange-500/20 text-xs font-bold text-[#F5EBE1] flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-base">G</span>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="py-2.5 px-3 rounded-2xl bg-[#15100C] hover:bg-[#261E18] border border-orange-500/20 text-xs font-bold text-[#F5EBE1] flex items-center justify-center gap-2 transition-colors"
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
