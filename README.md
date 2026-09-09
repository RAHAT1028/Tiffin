# 🍱 TIFFIN – Smart School Tiffin Platform

> **Warm, Wholesome & Allergen-Safe School Lunches Delivered Daily to Your Child's Desk across Dhaka, Bangladesh.**

**TIFFIN** is a full-stack, enterprise-grade smart school meal subscription platform built for parents, students, and schools in Dhaka. Fresh, certified paediatric nutritionist-approved meals are prepared daily in hygienic central commissaries and delivered piping hot in double-wall vacuum-insulated stainless steel containers (68°C guaranteed) right to school lockers and classroom gates before lunchtime.

---

## ✨ Key Features

- **🇧🇩 100% Bangladeshi Taka (৳ / BDT) Native Currency & Pricing**:
  - **Basic Nourish Plan (৳২২০/দিন | ৳১,১০০/সপ্তাহ)**: Balanced home-style classics, gentle lentils & hidden veggie sugos.
  - **Standard Vitality Plan (৳৩২০/দিন | ৳১,৬০০/সপ্তাহ)**: High-protein artisan wraps, grilled poultry, quinoa bowls & seasonal fruits.
  - **Premium Gourmet Bento (৳৪৫০/দিন | ৳২,২৫০/সপ্তাহ)**: Wild Atlantic salmon, lamb kofta, beef bulgogi & cold-pressed juices.
  - **70+ Meal Price Calibration**: Nuanced individual meal pricing ranging from **৳180 to ৳480**.

- **👨‍👩‍👧‍👦 Family & Children Hub (Multi-Member Management)**:
  - Add, edit, and manage multiple children and family members with individual schools, grades, and lunch lockers.
  - 1-click lunch allocation for each child with automatic **15% Multi-Child Family Discount** in cart.
  - Full local storage persistence (data remains saved across page refreshes and session restarts).

- **🍱 Interactive 3D Bento Builder**:
  - Live 4-compartment thermal stainless steel lunchbox customizer.
  - Real-time paediatric macro calculation (Calories, Bioavailable Protein, Low-GI Carbs, Omega-3 Fats, Fiber).
  - 1-click paediatrician-approved preset combos and shuffle randomizer.

- **🏛️ Top Dhaka Partner Cloud Kitchens & Restaurants**:
  - Order authentic chef specialties from Dhaka's finest vetted restaurants:
    - **Sultan's Dine** (Dhanmondi, Gulshan-2 & Uttara) – Basmati Mutton Kacchi & Shahi Polao
    - **Star Kabab & Restaurant** (Banani & Dhanmondi) – Charcoal Chicken Boti & Tender Leg Roast
    - **Takeout Burgers** (Banani Road 11) – Gourmet Smash Beef Burgers & Wedges
    - **Yum Cha District** (Gulshan-2) – Steamed Crystal Dim Sum & Teriyaki Bento
    - **Spaghetti Jazz Trattoria** (Gulshan) – Handcrafted Fettuccine & Pomodoro Sugo
    - **Shawarma House** (Gulshan Avenue) – Flame-Grilled Rotisserie Shawarma & Falafel

- **📊 Certified Pediatric Nutrition & Growth Report (PDF Export)**:
  - Instant client-side download of official certified WHO & AAP compliant paediatric nutrition reports.
  - Detailed macronutrient breakdown, micronutrient scorecards (Calcium, Iron, Vitamin D3/Zinc), hot-chain thermal food safety audit, and paediatrician recommendations.

- **🧾 Tax Invoice & Receipt PDF Generation**:
  - Instant electronic receipt and billing invoice PDF downloads with official tax metadata.

- **🧮 Interactive Kid Nutrition & Calorie Calculator**:
  - Dynamic nutrition calculator based on age (3-18 yrs), activity level, appetite, and health goal.
  - 1-click personalized diet prescription PDF download.

- **🌡️ Live IoT Temperature & Delivery Telemetry**:
  - Real-time hot-chain telemetry tracking from central kitchen dispatch (74°C) to school gate delivery (68°C verified).

- **🤖 Nutribot AI Paediatric Advisor**:
  - Powered by Google Gemini (`@google/genai`) with fallback heuristics for instant dietary recommendations, allergen queries, and lunchbox advice.

- **🛡️ 100% Nut-Free Facility & Strict Allergen Segregation**:
  - Filter by 100% Vegetarian, 100% Halal, High-Protein (25g+), Nut-Free, Gluten-Free, Dairy-Free.

- **👛 Smart Tiffin Wallet & Promo Voucher System**:
  - Welcome bonus credit (+৳500), referral codes (`TIFFIN15`, `HEALTHYKID`), and automatic pause refunds credited to wallet.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Tailwind CSS v4, Motion, Lucide React, Recharts |
| **PDF Engine** | jsPDF (Client-Side Vector PDF Generator) |
| **Build & Bundler** | Vite 6, tsx, esbuild |
| **Backend** | Node.js, Express.js |
| **AI Integration** | `@google/genai` (Gemini 2.5 Flash / Interactions API) |
| **Styling & Theme** | Warm Artisan Bento Palette (Charcoal `#15100C`, Amber `#F59E0B`, Orange `#E85D04`) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Option 1: ⚡ 1-Click Automated Launch (Recommended for Windows)

The project includes dedicated one-click launcher scripts for both **Command Prompt (`.bat`)** and **PowerShell (`.ps1`)**, available at both the project level and root workspace level:

#### 📁 Inside Project Folder (`project-jk/`):
- **[`project-jk/run.bat`](file:///p:/web/project-jk/run.bat)**: Double-click to instantly run via Windows Command Prompt (CMD).
- **[`project-jk/run.ps1`](file:///p:/web/project-jk/run.ps1)**: Run with PowerShell for formatted colored terminal logs.

#### 📁 From Root / Workspace Folder (`../`):
- **[`run.bat`](file:///p:/web/run.bat)**: Root batch runner — automatically detects `project-jk`, configures environment, and launches the server.
- **[`run.ps1`](file:///p:/web/run.ps1)**: Root PowerShell runner with directory auto-switching.

> **What the 1-Click Runner Scripts Automate:**
> 1. 📦 Checks if `node_modules` exists; if not, automatically executes `npm install`.
> 2. ⚙️ Checks if `.env` exists; if not, automatically generates `.env` from `.env.example`.
> 3. 🌐 Opens your default web browser automatically at `http://localhost:3000`.
> 4. 🚀 Starts the development server with live Hot-Module Replacement (`npm run dev`).

---

### Option 2: 🛠️ Manual Terminal Installation (CLI)

If you prefer to run commands manually in your terminal (Bash, PowerShell, or Zsh):

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/RAHAT1028/Tiffin.git
   cd Tiffin
   ```
   *(Or navigate into `cd project-jk` if working inside the workspace).*

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file by copying `.env.example`:
   ```bash
   # Windows (CMD)
   copy .env.example .env

   # Windows (PowerShell)
   Copy-Item .env.example -Destination .env

   # Mac / Linux
   cp .env.example .env
   ```
   *Optional:* Add your Gemini API key inside `.env`:
   ```env
   PORT=3000
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```
   *(Note: The application has built-in paediatric clinical fallback logic if no API key is set).*

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

6. **Run Production Server**:
   ```bash
   npm start
   ```

---

## 📁 Project Architecture & Runner Structure

```text
├── run.bat                     # Root 1-Click Windows Batch Runner (Auto cd project-jk)
├── run.ps1                     # Root 1-Click PowerShell Runner (Auto cd project-jk)
├── project-jk/
│   ├── run.bat                 # Project 1-Click Windows Batch Runner
│   ├── run.ps1                 # Project 1-Click PowerShell Runner
│   ├── index.html              # HTML5 Entry Point with Google Fonts (Plus Jakarta Sans)
│   ├── server.ts               # Express Backend & Vite SSR/HMR Development Server
│   ├── vite.config.ts          # Vite & Tailwind CSS v4 Configuration
│   ├── package.json            # Project Dependencies & Scripts
│   ├── package-lock.json       # Locked Dependency Manifest
│   ├── src/
│   │   ├── main.tsx            # React Root Mount
│   │   ├── App.tsx             # Core State, Toasts, Cart, Auth & Family State Management
│   │   ├── index.css           # Tailwind v4 Tokens, Animations, Glassmorphism
│   │   ├── types/              # TypeScript Types & Interfaces (Meals, Plans, Invoices, Members)
│   │   ├── utils/
│   │   │   ├── audio.ts        # Sound Effects Engine (Web Audio API)
│   │   │   └── pdfGenerator.ts # Certified Pediatric Nutrition Report & Tax Invoice PDF Generator
│   │   ├── data/
│   │   │   └── mockData.ts     # 77+ Weekly Meals, Partner Restaurants, Plans & Nutrition Data
│   │   └── components/
│   │       ├── Navbar.tsx      # Responsive Header with Wallet Pill, Cart Count & Auth
│   │       ├── Hero.tsx        # Animated Hero Banner, Value Proposition & Quick CTA
│   │       ├── FamilyMembersModal.tsx # Multi-Child / Family Hub Manager (Add/Remove/Assign)
│   │       ├── WeeklyMenu.tsx  # 7-Day Lunch Menu with Dietary, Price Range & Sort Filters
│   │       ├── InteractiveTiffinVisualizer.tsx # 3D 4-Compartment Insulated Bento Builder
│   │       ├── TopRestaurants.tsx # Dhaka Partner Restaurants & Cloud Kitchen Ordering
│   │       ├── KidNutritionCalculator.tsx # Pediatric Calorie & RDA Calculator with PDF Export
│   │       ├── MealPlanSelector.tsx # 3-Tier Subscription Cards (Basic, Standard, Premium)
│   │       ├── TiffinCustomizer.tsx # Interactive Duration, Portion & Add-On Configurator
│   │       ├── LiveTracker.tsx # IoT Thermal Telemetry & Real-Time Delivery Steps
│   │       ├── NutribotChat.tsx # AI Paediatric Dietician Floating Chatbot
│   │       ├── AccountModal.tsx # Parent Dashboard, Child Profiles, Deliveries, Invoices & PDF
│   │       ├── AuthModal.tsx   # Authentication & Welcome Bonus Modal
│   │       ├── CartDrawer.tsx  # Multi-Item Cart, Family Discounts & Checkout
│   │       ├── MealModal.tsx   # Deep-Dive Meal Modal with Macronutrient Breakdown
│   │       ├── HygieneSection.tsx # ISO 22000 & 85°C Thermal Autoclave Sanitization
│   │       ├── Testimonials.tsx # Dhaka Parents Reviews & Partner Schools Showcase
│   │       ├── MobileBottomNav.tsx # Mobile Bottom Navigation Bar
│   │       └── Footer.tsx      # Contact, Commissary Locations, Policies & Hotline
```
│   ├── data/
│   │   └── mockData.ts         # 77+ Weekly Meals, Partner Restaurants, Plans & Nutrition Data
│   └── components/
│       ├── Navbar.tsx          # Responsive Header with Wallet Pill, Cart Count & Auth
│       ├── Hero.tsx            # Animated Hero Banner, Value Proposition & Quick CTA
│       ├── FamilyMembersModal.tsx # Multi-Child / Family Hub Manager (Add/Remove/Assign)
│       ├── WeeklyMenu.tsx      # 7-Day Lunch Menu with Dietary, Price Range & Sort Filters
│       ├── InteractiveTiffinVisualizer.tsx # 3D 4-Compartment Insulated Bento Builder
│       ├── TopRestaurants.tsx  # Dhaka Partner Restaurants & Cloud Kitchen Ordering
│       ├── KidNutritionCalculator.tsx # Pediatric Calorie & RDA Calculator with PDF Export
│       ├── MealPlanSelector.tsx # 3-Tier Subscription Cards (Basic, Standard, Premium)
│       ├── TiffinCustomizer.tsx # Interactive Duration, Portion & Add-On Configurator
│       ├── LiveTracker.tsx     # IoT Thermal Telemetry & Real-Time Delivery Steps
│       ├── NutribotChat.tsx    # AI Paediatric Dietician Floating Chatbot
│       ├── AccountModal.tsx    # Parent Dashboard, Child Profiles, Deliveries, Invoices & PDF
│       ├── AuthModal.tsx       # Authentication & Welcome Bonus Modal
│       ├── CartDrawer.tsx      # Multi-Item Cart, Family Discounts & Checkout
│       ├── MealModal.tsx       # Deep-Dive Meal Modal with Macronutrient Breakdown
│       ├── HygieneSection.tsx  # ISO 22000 & 85°C Thermal Autoclave Sanitization
│       ├── Testimonials.tsx    # Dhaka Parents Reviews & Partner Schools Showcase
│       ├── MobileBottomNav.tsx # Mobile Bottom Navigation Bar
│       └── Footer.tsx          # Contact, Commissary Locations, Policies & Hotline
```

---

## 🔒 Safety & Food Standards

- **ISO 22000 Certified** Commissary Prep Facility (Dhaka Central Commissary).
- **BSTI & Dhaka Safe Food Authority** compliance.
- **100% Halal Verified** poultry, prime grass-fed beef, and sustainable seafood.
- **0% Single-Use Plastic**: Food-grade 304 Stainless Steel vacuum containers with zero BPA or phthalates.

---

## 📜 License

MIT License © 2026 **TIFFIN – Smart School Tiffin Platform**. All rights reserved.
