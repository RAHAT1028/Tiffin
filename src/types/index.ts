export type MealCategory = 'basic' | 'standard' | 'premium';

export type Allergen = 'nuts' | 'dairy' | 'gluten' | 'eggs' | 'soy' | 'seafood' | 'sesame';

export interface NutritionInfo {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  calciumMg?: number;
  ironMg?: number;
}

export interface MealItem {
  id: string;
  name: string;
  tagline: string;
  category: MealCategory;
  pricePerDay: number;
  imageUrl: string;
  description: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  allergens: Allergen[];
  tags: string[];
  isVegetarian: boolean;
  isHalal: boolean;
  isNutFree: boolean;
  nutrition: NutritionInfo;
  chefNote?: string;
  includedItems: string[];
}

export interface ChildProfile {
  name: string;
  ageGroup: 'nursery' | 'primary' | 'secondary';
  schoolName: string;
  gradeClass: string;
  allergies: Allergen[];
  dietaryPreferences: string[];
  notes: string;
}

export interface SubscriptionConfig {
  plan: MealCategory;
  daysPerWeek: number; // 3 or 5
  selectedDays: string[];
  durationWeeks: number;
  portionSize: 'regular' | 'large';
  addOns: {
    fruitBowl: boolean;
    coldPressedJuice: boolean;
    organicYoghurt: boolean;
    proteinCookie: boolean;
  };
}

export interface DeliveryStatusStep {
  time: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  iconName: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedMeals?: string[];
}

export interface ParentAccountChild {
  id: string;
  name: string;
  age: number;
  schoolName: string;
  gradeClass: string;
  lunchLocker: string;
  allergies: Allergen[];
  dietaryPreferences: string[];
  portionSize: 'regular' | 'large';
  activeDays: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[];
  isPausedToday: boolean;
  pauseReason?: string;
  notes?: string;
}

export interface AccountInvoice {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'paid' | 'refunded' | 'pending';
  receiptUrl?: string;
}

export interface AccountDeliveryLog {
  id: string;
  date: string;
  mealName: string;
  childName: string;
  tempArrival: string;
  status: 'Delivered On Time' | 'In Transit' | 'Paused/Refunded';
  childFeedback?: string;
}

export interface ParentAccount {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  avatar: string;
  walletBalance: number;
  activePlan: MealCategory;
  billingCycle: 'weekly' | 'monthly' | 'term';
  autoRenew: boolean;
  nextBillingDate: string;
  membershipTier: 'Silver' | 'Gold VIP' | 'Platinum';
  paymentMethod: {
    brand: 'visa' | 'mastercard' | 'applepay';
    last4: string;
    expiry: string;
  };
  children: ParentAccountChild[];
  recentInvoices: AccountInvoice[];
  recentDeliveries: AccountDeliveryLog[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  role: 'parent' | 'admin';
  membershipTier: string;
  walletBalance: number;
}
