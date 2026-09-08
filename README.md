# 🍱 Smart School Tiffin (Project JK)

> **Warm, Wholesome & Allergen-Safe School Lunches Delivered Daily to Your Child's Desk.**

Smart School Tiffin is an innovative full-stack meal platform designed for busy parents and schools. We prepare fresh, nutritionist-approved meals every morning and deliver them hot in medical-grade double-wall vacuum-insulated stainless steel containers before lunchtime.

---

## ✨ Key Features

- **🥗 Rotated Weekly Menu**: 5-day paediatrician-designed meal rotation across three pricing tiers:
  - *Basic Nourish ($4.50/day)*: Balanced home-style classics with hidden vegetable sugos.
  - *Standard Vitality ($6.50/day)*: High-protein artisan wraps, grain bowls, and gut-healthy sides.
  - *Premium Gourmet Bento ($8.50/day)*: Wild salmon, grass-fed meats, DHA omega-3 boosters & 100% cold-pressed juices.
- **🛡️ 100% Nut-Free & Strict Allergen Segregation**: Segregated preparation zones for nuts, dairy, gluten, eggs, soy, and shellfish.
- **🌡️ Live Temperature & Delivery Telemetry**: Real-time tracking from kitchen ovens (72°C) to school desk delivery (68°C verified).
- **🤖 JK Nutribot (AI Meal Advisor)**: AI-powered paediatric nutritionist powered by Gemini to provide customized meal recommendations, macro calculations, and allergen guidance.
- **📅 Flexible Cancellation**: Cancel or pause any school day delivery up to 7:00 AM on the day with instant account credit.
- **♻️ Zero Single-Use Plastics**: 304 food-grade stainless steel containers washed and steam-sanitized at 85°C daily.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Recharts
- **Bundler & Dev Server**: Vite 6, tsx
- **Backend**: Express.js (Node.js)
- **AI Integration**: `@google/genai` (Gemini 2.5 Flash) with fallback heuristics

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RAHAT1028/Tiffin.git
   cd Tiffin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Set up your Gemini API key in `.env.local`:
   ```bash
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```
   *(Note: The app includes full paediatric fallback responses if no API key is provided).*

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
├── index.html              # HTML entry point with Google Fonts
├── server.ts               # Express backend & Vite HMR dev server
├── vite.config.ts          # Vite & Tailwind configuration
├── package.json            # Project dependencies & scripts
├── src/
│   ├── main.tsx            # React application mount
│   ├── App.tsx             # Main dashboard, cart drawer & state management
│   ├── index.css           # Tailwind v4 styles, custom typography & glassmorphism
│   ├── types/              # TypeScript interfaces (Meals, Plans, Child Profiles)
│   ├── data/               # Mock weekly meals, reviews & partner schools
│   └── components/
│       ├── Navbar.tsx      # Responsive header with live cart & AI trigger
│       ├── Hero.tsx        # Value proposition & live thermal status showcase
│       ├── WeeklyMenu.tsx  # 5-day interactive lunch menu with dietary filters
│       ├── MealModal.tsx   # Macronutrient breakdown & chef notes popover
│       ├── MealPlanSelector.tsx # Pricing plans (Basic, Standard, Premium)
│       ├── TiffinCustomizer.tsx # Personalised meal subscription calculator
│       ├── LiveTracker.tsx # Real-time delivery & temperature sensor tracker
│       ├── NutribotChat.tsx# JK Nutribot AI Paediatric Advisor
│       ├── CartDrawer.tsx  # Order review & subscription checkout drawer
│       ├── HygieneSection.tsx # Safety standards & sanitization cycle
│       ├── Testimonials.tsx # Parent reviews & partner schools network
│       └── Footer.tsx      # Platform links, policies & kitchen contact
```

---

## 📜 License

MIT License © 2026 Project JK – Smart School Tiffin Platform.
