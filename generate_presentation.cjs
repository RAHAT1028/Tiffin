const PptxGenJS = require('pptxgenjs');
const fs = require('fs');

// Initialize presentation
const pptx = new PptxGenJS();

// Set presentation properties
pptx.layout = 'LAYOUT_16x9'; // 16:9 Widescreen (10" x 5.625")
pptx.title = 'TIFFIN - Smart School Tiffin Platform Presentation';
pptx.author = 'Smart School Tiffin Team';
pptx.company = 'TIFFIN Bangladesh';
pptx.subject = 'Comprehensive Project Presentation';

// Color Palette Constants
const COLOR_BG_DARK = '17120D';      // Dark Charcoal
const COLOR_CARD_DARK = '261E18';    // Medium Dark Card
const COLOR_CARD_BORDER = '423328';  // Border Dark
const COLOR_ORANGE_PRIMARY = 'E85D04'; // Warm Vibrant Orange
const COLOR_ORANGE_LIGHT = 'F97316';
const COLOR_AMBER = 'F59E0B';        // Amber Gold
const COLOR_AMBER_LIGHT = 'FDE68A';
const COLOR_WHITE = 'FFFFFF';
const COLOR_TEXT_MUTED = 'D4C5B5';   // Warm Gray
const COLOR_GREEN = '10B981';
const COLOR_BLUE = '0EA5E9';

// Helper function to add consistent slide header
function addSlideHeader(slide, categoryText, titleText, subtitleText) {
  // Top Accent Bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.1,
    fill: { color: COLOR_ORANGE_PRIMARY }
  });

  // Category Tag
  slide.addText(categoryText.toUpperCase(), {
    x: 0.8,
    y: 0.35,
    w: 8.4,
    h: 0.25,
    fontSize: 10,
    fontFace: 'Trebuchet MS',
    bold: true,
    color: COLOR_AMBER,
    charSpacing: 2
  });

  // Title
  slide.addText(titleText, {
    x: 0.8,
    y: 0.6,
    w: 8.4,
    h: 0.45,
    fontSize: 20,
    fontFace: 'Trebuchet MS',
    bold: true,
    color: COLOR_WHITE
  });

  // Subtitle / Description
  if (subtitleText) {
    slide.addText(subtitleText, {
      x: 0.8,
      y: 1.05,
      w: 8.4,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED
    });
  }
}

// Helper function to add slide footer
function addSlideFooter(slide, slideNumber, totalSlides) {
  slide.addShape(pptx.ShapeType.line, {
    x: 0.8,
    y: 5.15,
    w: 8.4,
    h: 0,
    line: { color: '382A20', width: 1 }
  });

  slide.addText('TIFFIN • Smart School Tiffin Platform (Dhaka, Bangladesh)', {
    x: 0.8,
    y: 5.25,
    w: 5.0,
    h: 0.3,
    fontSize: 8.5,
    fontFace: 'Calibri',
    color: '8E7E70'
  });

  slide.addText(`Slide ${slideNumber} of ${totalSlides}`, {
    x: 6.8,
    y: 5.25,
    w: 2.4,
    h: 0.3,
    fontSize: 8.5,
    fontFace: 'Calibri',
    color: COLOR_AMBER,
    align: 'right'
  });
}

// =========================================================================
// SLIDE 1: TITLE & EXECUTIVE VISION (Hero Cover)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  // Decorative Accent Block
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.15,
    fill: { color: COLOR_ORANGE_PRIMARY }
  });

  // Pill Badge
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 0.8,
    w: 4.8,
    h: 0.35,
    rectRadius: 0.15,
    fill: { color: '382112' },
    line: { color: COLOR_ORANGE_PRIMARY, width: 1 }
  });
  slide.addText('🍱 SMART SCHOOL TIFFIN PLATFORM • DHAKA', {
    x: 0.8,
    y: 0.8,
    w: 4.8,
    h: 0.35,
    fontSize: 10,
    fontFace: 'Trebuchet MS',
    bold: true,
    color: COLOR_AMBER_LIGHT,
    align: 'center'
  });

  // Main Hero Title
  slide.addText('TIFFIN', {
    x: 0.8,
    y: 1.35,
    w: 8.4,
    h: 0.9,
    fontSize: 44,
    fontFace: 'Trebuchet MS',
    bold: true,
    color: COLOR_ORANGE_PRIMARY
  });

  slide.addText('Next-Gen Paediatric Nutrition, Insulated Hot-Chain Logistics & AI Meal Intelligence', {
    x: 0.8,
    y: 2.3,
    w: 8.4,
    h: 0.6,
    fontSize: 16,
    fontFace: 'Trebuchet MS',
    bold: true,
    color: COLOR_WHITE
  });

  slide.addText(
    'A full-stack, enterprise-grade school lunch ecosystem delivering fresh, certified nutritionist-approved hot meals (68°C guaranteed) to students across premier schools in Dhaka, Bangladesh.',
    {
      x: 0.8,
      y: 3.0,
      w: 8.4,
      h: 0.7,
      fontSize: 11.5,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED,
      lineSpacing: 16
    }
  );

  // 3 Feature Highlights on Title Slide
  const highlights = [
    { title: '🇧🇩 100% BDT Pricing', desc: 'Plans from ৳220/day • 77+ menu items' },
    { title: '🌡️ 68°C Hot Delivery', desc: '304 Stainless steel vacuum tiffins' },
    { title: '🤖 AI Nutribot & PDF', desc: 'Gemini 2.5 Flash + WHO/AAP reports' }
  ];

  highlights.forEach((h, idx) => {
    const xPos = 0.8 + idx * 2.9;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 3.9,
      w: 2.6,
      h: 0.9,
      rectRadius: 0.1,
      fill: { color: COLOR_CARD_DARK },
      line: { color: COLOR_CARD_BORDER, width: 1 }
    });
    slide.addText(h.title, {
      x: xPos + 0.15,
      y: 4.0,
      w: 2.3,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_AMBER
    });
    slide.addText(h.desc, {
      x: xPos + 0.15,
      y: 4.35,
      w: 2.3,
      h: 0.4,
      fontSize: 9.5,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED
    });
  });

  addSlideFooter(slide, 1, 13);
}

// =========================================================================
// SLIDE 2: THE PROBLEM (The Dhaka School Lunch Crisis)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  addSlideHeader(
    slide,
    'Market Reality & Pain Points',
    'The School Lunch Challenge in Dhaka',
    'Working parents and children in Dhaka face severe obstacles in maintaining daily wholesome nutrition.'
  );

  const problems = [
    {
      num: '01',
      title: 'Morning Rush & Parental Burnout',
      desc: 'Parents wake up at 5:00 AM to cook lunches before battling Dhaka traffic, causing severe daily stress and rushed meal choices.'
    },
    {
      num: '02',
      title: 'Unhealthy Canteen Junk & Trans Fats',
      desc: 'School canteens predominantly sell processed fried snacks, trans-fat singaras, and high-sugar items leading to afternoon lethargy.'
    },
    {
      num: '03',
      title: 'Cold, Soggy & Bacteria-Prone Lunches',
      desc: 'Traditional plastic lunchboxes drop below 40°C in 2 hours, breeding food-borne bacteria and causing soggy, unappetizing meals.'
    },
    {
      num: '04',
      title: 'Zero Allergen Segregation',
      desc: 'No institutional controls for children with peanut, dairy, gluten, egg, or seafood allergies, causing severe safety concerns.'
    }
  ];

  problems.forEach((p, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const xPos = 0.8 + col * 4.3;
    const yPos = 1.5 + row * 1.7;

    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 4.1,
      h: 1.5,
      rectRadius: 0.1,
      fill: { color: COLOR_CARD_DARK },
      line: { color: '4A2A20', width: 1 }
    });

    // Number Badge
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos + 0.2,
      y: yPos + 0.2,
      w: 0.5,
      h: 0.4,
      rectRadius: 0.08,
      fill: { color: '4A1A0A' }
    });
    slide.addText(p.num, {
      x: xPos + 0.2,
      y: yPos + 0.2,
      w: 0.5,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_ORANGE_LIGHT,
      align: 'center'
    });

    // Title
    slide.addText(p.title, {
      x: xPos + 0.85,
      y: yPos + 0.2,
      w: 3.1,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_WHITE
    });

    // Desc
    slide.addText(p.desc, {
      x: xPos + 0.2,
      y: yPos + 0.7,
      w: 3.7,
      h: 0.7,
      fontSize: 10,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED,
      lineSpacing: 14
    });
  });

  addSlideFooter(slide, 2, 13);
}

// =========================================================================
// SLIDE 3: THE SOLUTION & CORE VALUE PROPOSITION
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  addSlideHeader(
    slide,
    'Our Value Proposition',
    'The TIFFIN Solution: Smart, Safe & Nutritious',
    'A turnkey subscription platform that guarantees hot, certified balanced meals delivered directly to school gates.'
  );

  const pillars = [
    {
      icon: '🍲',
      title: 'Central Cloud Commissary',
      points: ['Cooked fresh each morning at 6:30 AM', 'Paediatrician-balanced macronutrients', 'Low sodium & zero trans fats']
    },
    {
      icon: '🌡️',
      title: 'Thermal Vacuum Logistics',
      points: ['Food-grade 304 stainless steel', 'Double-wall vacuum insulation', 'Guaranteed 68°C at lunchtime']
    },
    {
      icon: '🛡️',
      title: 'Certified Food Safety',
      points: ['100% Nut-free dedicated facility', 'Strict allergen segregation', '85°C autoclave sanitization']
    },
    {
      icon: '📱',
      title: 'Parent Freedom & Flexibility',
      points: ['Pause meals up to 7:00 AM on the day', 'Instant wallet credit for sick days', 'Real-time temperature telemetry']
    }
  ];

  pillars.forEach((p, idx) => {
    const xPos = 0.8 + idx * 2.15;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.5,
      w: 2.0,
      h: 3.3,
      rectRadius: 0.1,
      fill: { color: COLOR_CARD_DARK },
      line: { color: '382B20', width: 1 }
    });

    // Icon & Header
    slide.addText(p.icon, {
      x: xPos + 0.15,
      y: 1.65,
      w: 1.7,
      h: 0.4,
      fontSize: 22,
      align: 'center'
    });

    slide.addText(p.title, {
      x: xPos + 0.1,
      y: 2.1,
      w: 1.8,
      h: 0.5,
      fontSize: 11,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_AMBER,
      align: 'center'
    });

    // Bullet points
    const bulletText = p.points.map(pt => `• ${pt}`).join('\n\n');
    slide.addText(bulletText, {
      x: xPos + 0.15,
      y: 2.7,
      w: 1.7,
      h: 1.9,
      fontSize: 9.5,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED,
      lineSpacing: 13
    });
  });

  addSlideFooter(slide, 3, 13);
}

// =========================================================================
// SLIDE 4: PAEDIATRIC MEAL PLANS & DYNAMIC BDT PRICING
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  addSlideHeader(
    slide,
    'Subscription Tiers & Economics',
    '3 Paediatric Meal Plans & Bangladeshi Taka (৳) Pricing',
    'Transparent, accessible subscription plans designed for varying appetites and developmental stages.'
  );

  const plans = [
    {
      name: 'Basic Nourish Plan',
      daily: '৳220 / day',
      weekly: '৳1,100 / 5 Days',
      target: 'Nursery & Primary (Ages 4-8)',
      desc: 'Comforting home-style classics, gentle lentils, veggie pulao, mild paneer, and wholemeal rotis with hidden vegetable sugos.',
      badge: 'POPULAR LITE'
    },
    {
      name: 'Standard Vitality Plan',
      daily: '৳320 / day',
      weekly: '৳1,600 / 5 Days',
      target: 'Active School Stamina (Ages 8-14)',
      desc: 'High-protein grilled herb chicken wraps, chicken tikka, quinoa bowls, slow-release carbs, and fresh seasonal fruit bowls.',
      badge: 'RECOMMENDED BEST-SELLER'
    },
    {
      name: 'Premium Gourmet Bento',
      daily: '৳450 / day',
      weekly: '৳2,250 / 5 Days',
      target: 'Varsity Athletes & Teens (Ages 12-18)',
      desc: 'Wild Atlantic salmon teriyaki, lamb kofta, beef bulgogi, California maki rolls, DHA omega-3 seeds, and cold-pressed juices.',
      badge: 'CHEF SIGNATURE'
    }
  ];

  plans.forEach((pl, idx) => {
    const xPos = 0.8 + idx * 2.9;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.5,
      w: 2.7,
      h: 3.3,
      rectRadius: 0.12,
      fill: { color: idx === 1 ? '332014' : COLOR_CARD_DARK },
      line: { color: idx === 1 ? COLOR_ORANGE_PRIMARY : COLOR_CARD_BORDER, width: idx === 1 ? 2 : 1 }
    });

    // Badge
    slide.addText(pl.badge, {
      x: xPos + 0.2,
      y: 1.65,
      w: 2.3,
      h: 0.25,
      fontSize: 8.5,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: idx === 1 ? COLOR_ORANGE_LIGHT : COLOR_AMBER
    });

    // Plan Title
    slide.addText(pl.name, {
      x: xPos + 0.2,
      y: 1.95,
      w: 2.3,
      h: 0.35,
      fontSize: 13,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_WHITE
    });

    // Price
    slide.addText(pl.daily, {
      x: xPos + 0.2,
      y: 2.3,
      w: 2.3,
      h: 0.35,
      fontSize: 16,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_AMBER
    });

    slide.addText(pl.weekly, {
      x: xPos + 0.2,
      y: 2.65,
      w: 2.3,
      h: 0.25,
      fontSize: 9.5,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED
    });

    // Target Audience
    slide.addText(`Target: ${pl.target}`, {
      x: xPos + 0.2,
      y: 2.95,
      w: 2.3,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Calibri',
      bold: true,
      color: COLOR_WHITE
    });

    // Description
    slide.addText(pl.desc, {
      x: xPos + 0.2,
      y: 3.3,
      w: 2.3,
      h: 1.3,
      fontSize: 9,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED,
      lineSpacing: 13
    });
  });

  addSlideFooter(slide, 4, 13);
}

// =========================================================================
// SLIDE 5: MULTI-CHILD FAMILY HUB & SMART WALLET
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  addSlideHeader(
    slide,
    'Family Centric Experience',
    'Family & Multi-Child Hub + Smart Tiffin Wallet',
    'Seamless multi-child lunch allocation with automated discounts and instant pause refunds.'
  );

  const features = [
    {
      title: '👨‍👩‍👧‍👦 Multi-Child Management',
      desc: 'Add and manage multiple children with custom school names (Scholastica, Sunnydale, Sunbeams, AISD), grades, and lunch locker numbers.'
    },
    {
      title: '🏷️ 15% Automatic Family Discount',
      desc: 'Cart automatically detects multi-member meal assignments and applies a 15% discount on the entire weekly family billing.'
    },
    {
      title: '💾 Persistent Local State',
      desc: 'Child profiles and custom delivery notes are stored securely in browser LocalStorage, preventing accidental data loss upon page refresh.'
    },
    {
      title: '👛 Smart Tiffin Wallet',
      desc: 'Auto-credited whenever a meal is paused before 7:00 AM. Includes +৳500 registration welcome bonus and promo code redemptions.'
    }
  ];

  features.forEach((f, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const xPos = 0.8 + col * 4.3;
    const yPos = 1.5 + row * 1.7;

    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 4.1,
      h: 1.5,
      rectRadius: 0.1,
      fill: { color: COLOR_CARD_DARK },
      line: { color: '3A2B20', width: 1 }
    });

    slide.addText(f.title, {
      x: xPos + 0.25,
      y: yPos + 0.2,
      w: 3.6,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_AMBER
    });

    slide.addText(f.desc, {
      x: xPos + 0.25,
      y: yPos + 0.6,
      w: 3.6,
      h: 0.75,
      fontSize: 10,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED,
      lineSpacing: 14
    });
  });

  addSlideFooter(slide, 5, 13);
}

// =========================================================================
// SLIDE 6: INTERACTIVE 3D BENTO BUILDER & CALCULATOR
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  addSlideHeader(
    slide,
    'Customization & Paediatric Tools',
    'Interactive 3D Bento Builder & Nutrition Calculator',
    'Empowering parents and children to custom-craft meals with live clinical macronutrient feedback.'
  );

  // Left Card: 3D Bento Builder
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.5,
    w: 4.1,
    h: 3.3,
    rectRadius: 0.1,
    fill: { color: COLOR_CARD_DARK },
    line: { color: COLOR_ORANGE_PRIMARY, width: 1.5 }
  });

  slide.addText('🍱 Interactive 4-Compartment Bento Builder', {
    x: 1.0,
    y: 1.7,
    w: 3.7,
    h: 0.35,
    fontSize: 12.5,
    fontFace: 'Trebuchet MS',
    bold: true,
    color: COLOR_WHITE
  });

  const bentoBullets = [
    'Slot 1: Main Protein (Chicken, Salmon, Turkey, Paneer)',
    'Slot 2: Low-GI Grain (Basmati Rice, Quinoa, Sweet Potato)',
    'Slot 3: Steamed Veggies (Broccoli, Edamame, Sweetcorn)',
    'Slot 4: Fresh Fruit & Dessert (Watermelon, Kiwi, Chia)',
    'Live Paediatric Macro Scorecard (Calories, Protein, Carbs, Fat)',
    '1-Click Doctor Approved Combos (Omega Brain Fuel, Vegan)'
  ];
  slide.addText(bentoBullets.map(b => `• ${b}`).join('\n'), {
    x: 1.0,
    y: 2.1,
    w: 3.7,
    h: 2.5,
    fontSize: 9.5,
    fontFace: 'Calibri',
    color: COLOR_TEXT_MUTED,
    lineSpacing: 14
  });

  // Right Card: Nutrition Calculator
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.1,
    y: 1.5,
    w: 4.1,
    h: 3.3,
    rectRadius: 0.1,
    fill: { color: COLOR_CARD_DARK },
    line: { color: COLOR_CARD_BORDER, width: 1 }
  });

  slide.addText('🧮 Paediatric Nutrition Calculator', {
    x: 5.3,
    y: 1.7,
    w: 3.7,
    h: 0.35,
    fontSize: 12.5,
    fontFace: 'Trebuchet MS',
    bold: true,
    color: COLOR_WHITE
  });

  const calcBullets = [
    'Interactive Age Slider: Calibrated for ages 3 to 18 years',
    'Activity Multiplier: Low, Moderate, High & Athlete modes',
    'Appetite Tuning: Light, Normal, and Hearty portions',
    'Health Goals: Sustained Energy, Linear Growth, Immunity, Focus',
    'Midday RDA Target: Outputs exact Calories, Protein (g) & Hydration',
    'Instant PDF Export: Download personalized diet charts'
  ];
  slide.addText(calcBullets.map(b => `• ${b}`).join('\n'), {
    x: 5.3,
    y: 2.1,
    w: 3.7,
    h: 2.5,
    fontSize: 9.5,
    fontFace: 'Calibri',
    color: COLOR_TEXT_MUTED,
    lineSpacing: 14
  });

  addSlideFooter(slide, 6, 13);
}

// =========================================================================
// SLIDE 7: DHAKA TOP RESTAURANT PARTNERS & CLOUD KITCHENS
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  addSlideHeader(
    slide,
    'Culinary Diversity & Heritage',
    'Dhaka Premier Cloud Kitchens & Restaurant Partners',
    'Delivering authentic chef specialties sealed in thermal packaging to student lockers and office desks.'
  );

  const restaurants = [
    {
      name: "Sultan's Dine",
      location: 'Dhanmondi, Gulshan-2 & Uttara',
      specialty: 'Basmati Mutton Kacchi & Shahi Polao',
      rating: '4.98 ⭐'
    },
    {
      name: 'Star Kabab & Restaurant',
      location: 'Banani & Dhanmondi',
      specialty: 'Charcoal Chicken Boti & Mutton Roast',
      rating: '4.92 ⭐'
    },
    {
      name: 'Takeout Burgers',
      location: 'Banani Road 11 & Dhanmondi',
      specialty: 'Juicy Smash Beef Burgers & Wedges',
      rating: '4.93 ⭐'
    },
    {
      name: 'Yum Cha District & Bento',
      location: 'Gulshan-2 & Banani',
      specialty: 'Steamed Crystal Dim Sum & Teriyaki Salmon',
      rating: '4.96 ⭐'
    },
    {
      name: 'Spaghetti Jazz Trattoria',
      location: 'Gulshan-2 & Dhanmondi',
      specialty: 'Handcrafted Fettuccine & Pomodoro Sugo',
      rating: '4.92 ⭐'
    },
    {
      name: 'Shawarma House',
      location: 'Gulshan Avenue & Dhanmondi',
      specialty: 'Flame-Grilled Chicken Shawarma & Kofta',
      rating: '4.91 ⭐'
    }
  ];

  restaurants.forEach((r, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const xPos = 0.8 + col * 2.85;
    const yPos = 1.5 + row * 1.7;

    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 2.7,
      h: 1.5,
      rectRadius: 0.1,
      fill: { color: COLOR_CARD_DARK },
      line: { color: '382B20', width: 1 }
    });

    // Rating
    slide.addText(r.rating, {
      x: xPos + 0.15,
      y: yPos + 0.15,
      w: 2.4,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_AMBER,
      align: 'right'
    });

    // Name
    slide.addText(r.name, {
      x: xPos + 0.15,
      y: yPos + 0.15,
      w: 1.9,
      h: 0.35,
      fontSize: 11,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_WHITE
    });

    // Location
    slide.addText(`📍 ${r.location}`, {
      x: xPos + 0.15,
      y: yPos + 0.55,
      w: 2.4,
      h: 0.3,
      fontSize: 8.5,
      fontFace: 'Calibri',
      color: COLOR_ORANGE_LIGHT
    });

    // Specialty
    slide.addText(r.specialty, {
      x: xPos + 0.15,
      y: yPos + 0.9,
      w: 2.4,
      h: 0.45,
      fontSize: 9,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED
    });
  });

  addSlideFooter(slide, 7, 13);
}

// =========================================================================
// SLIDE 8: AI-POWERED NUTRIBOT (Gemini 2.5 Flash)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  addSlideHeader(
    slide,
    'Artificial Intelligence & Guidance',
    'TIFFIN Nutribot: AI Paediatric Meal Advisor',
    'Powered by Google Gemini 2.5 Flash with deep clinical knowledge & instant interactive responses.'
  );

  const aiFeatures = [
    {
      title: '🤖 Google Gemini 2.5 Flash Integration',
      desc: 'Processes parent queries regarding childhood nutrition, exam-term focus food, allergy safety, and stamina requirements in real time.'
    },
    {
      title: '🛡️ Clinical Paediatric Guardrails',
      desc: 'Grounding system prompts enforce strict paediatric nutrition standards (WHO, British Nutrition Foundation, AAP guidelines).'
    },
    {
      title: '⚡ Dual-Engine Reliability',
      desc: 'Seamless fallback heuristic engine guarantees zero downtime even during offline states or network interruptions.'
    },
    {
      title: '💡 Contextual Meal Recommendations',
      desc: 'Recommends specific weekly menu dishes (e.g. Teriyaki Salmon for Omega-3 focus, Paneer Pulao for bone growth).'
    }
  ];

  aiFeatures.forEach((f, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const xPos = 0.8 + col * 4.3;
    const yPos = 1.5 + row * 1.7;

    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 4.1,
      h: 1.5,
      rectRadius: 0.1,
      fill: { color: COLOR_CARD_DARK },
      line: { color: '382B20', width: 1 }
    });

    slide.addText(f.title, {
      x: xPos + 0.25,
      y: yPos + 0.2,
      w: 3.6,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_AMBER
    });

    slide.addText(f.desc, {
      x: xPos + 0.25,
      y: yPos + 0.6,
      w: 3.6,
      h: 0.75,
      fontSize: 10,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED,
      lineSpacing: 14
    });
  });

  addSlideFooter(slide, 8, 13);
}

// =========================================================================
// SLIDE 9: CERTIFIED PDF REPORTS & AUTOMATED INVOICING
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  addSlideHeader(
    slide,
    'Client-Side Document Generation',
    'Certified Paediatric Growth Reports & Tax Invoicing',
    'Instant client-side PDF export engine with medical certifications, macro audits, and tax receipts.'
  );

  const pdfCards = [
    {
      title: '📊 Monthly Paediatric Nutrition Report',
      desc: 'Official medical document containing student profile, school locker, monthly caloric RDA scorecard, bioavailable protein & micronutrient analysis (Calcium, Iron, Zinc, Vitamin D3), food safety temperature audit, and doctor clinical sign-off.'
    },
    {
      title: '🧾 Electronic Tax Invoice & Receipt',
      desc: 'Complete billing breakdown with unique Invoice ID, date, meal subscription plan, 0% VAT tax exemption notes, parent contact details, and electronic verification seal.'
    },
    {
      title: '🧮 Personalized Diet Prescription PDF',
      desc: 'Direct export from the Kid Nutrition Calculator detailing child age, activity multipliers, appetite factors, and recommended meal plan reasoning.'
    }
  ];

  pdfCards.forEach((c, idx) => {
    const xPos = 0.8 + idx * 2.85;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.5,
      w: 2.7,
      h: 3.3,
      rectRadius: 0.1,
      fill: { color: COLOR_CARD_DARK },
      line: { color: COLOR_CARD_BORDER, width: 1 }
    });

    slide.addText(c.title, {
      x: xPos + 0.2,
      y: 1.75,
      w: 2.3,
      h: 0.6,
      fontSize: 12,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_AMBER
    });

    slide.addText(c.desc, {
      x: xPos + 0.2,
      y: 2.45,
      w: 2.3,
      h: 2.2,
      fontSize: 9.5,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED,
      lineSpacing: 14
    });
  });

  addSlideFooter(slide, 9, 13);
}

// =========================================================================
// SLIDE 10: IOT HOT-CHAIN TELEMETRY & FOOD SAFETY
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  addSlideHeader(
    slide,
    'Quality, Safety & Compliance',
    'IoT Hot-Chain Telemetry & Food Safety Standards',
    'Maintaining verifiable medical-grade temperature chains and stringent hygiene audits across Dhaka.'
  );

  const steps = [
    {
      step: 'STEP 1',
      temp: '74.5°C',
      title: 'Kitchen Cook-Seal',
      desc: 'Oven-baked and vacuum-sealed in sterilized stainless steel chambers at Central Commissary.'
    },
    {
      step: 'STEP 2',
      temp: '71.0°C',
      title: 'Thermal Transit',
      desc: 'Dispatched in insulated electric vans with GPS route-optimization across Dhaka schools.'
    },
    {
      step: 'STEP 3',
      temp: '68.4°C',
      title: 'School Gate Arrival',
      desc: 'Logged at school entrance by dedicated tiffin stewards before student lunch bell rings.'
    },
    {
      step: 'STEP 4',
      temp: '85.0°C',
      title: 'Autoclave Sanitization',
      desc: 'Used containers returned daily and steam-sanitized at 85°C UV-C before next morning prep.'
    }
  ];

  steps.forEach((s, idx) => {
    const xPos = 0.8 + idx * 2.15;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.5,
      w: 2.0,
      h: 3.3,
      rectRadius: 0.1,
      fill: { color: COLOR_CARD_DARK },
      line: { color: '382B20', width: 1 }
    });

    slide.addText(s.step, {
      x: xPos + 0.15,
      y: 1.7,
      w: 1.7,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_ORANGE_LIGHT
    });

    slide.addText(s.temp, {
      x: xPos + 0.15,
      y: 1.95,
      w: 1.7,
      h: 0.4,
      fontSize: 16,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_AMBER
    });

    slide.addText(s.title, {
      x: xPos + 0.15,
      y: 2.4,
      w: 1.7,
      h: 0.35,
      fontSize: 11,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_WHITE
    });

    slide.addText(s.desc, {
      x: xPos + 0.15,
      y: 2.8,
      w: 1.7,
      h: 1.8,
      fontSize: 9,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED,
      lineSpacing: 13
    });
  });

  addSlideFooter(slide, 10, 13);
}

// =========================================================================
// SLIDE 11: TECHNICAL ARCHITECTURE & STACK
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  addSlideHeader(
    slide,
    'Engineering & Tech Stack',
    'Modern Full-Stack Technical Architecture',
    'Engineered for blazing fast speed, responsiveness, clean modularity, and offline resilience.'
  );

  const techBlocks = [
    {
      category: 'Frontend & UI Framework',
      stack: 'React 19 • TypeScript • Tailwind CSS v4',
      desc: 'Modular architecture with high-performance component tree, custom glassmorphism styling, and responsive layout.'
    },
    {
      category: 'Motion & Visualizations',
      stack: 'Motion • Recharts • Lucide React',
      desc: 'Silky micro-animations, dynamic radar & macro area charts, and clean responsive icon system.'
    },
    {
      category: 'Backend & Development',
      stack: 'Node.js • Express.js • Vite 6 • tsx',
      desc: 'Express API server with Vite Hot-Module Replacement (HMR) for instant development feedback.'
    },
    {
      category: 'PDF & AI Intelligence',
      stack: 'jsPDF • Google Gemini 2.5 Flash API',
      desc: 'Client-side vector PDF generation engine paired with Google Gemini AI for smart paediatric reasoning.'
    }
  ];

  techBlocks.forEach((t, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const xPos = 0.8 + col * 4.3;
    const yPos = 1.5 + row * 1.7;

    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 4.1,
      h: 1.5,
      rectRadius: 0.1,
      fill: { color: COLOR_CARD_DARK },
      line: { color: '382B20', width: 1 }
    });

    slide.addText(t.category, {
      x: xPos + 0.25,
      y: yPos + 0.18,
      w: 3.6,
      h: 0.25,
      fontSize: 9.5,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_ORANGE_LIGHT
    });

    slide.addText(t.stack, {
      x: xPos + 0.25,
      y: yPos + 0.42,
      w: 3.6,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_WHITE
    });

    slide.addText(t.desc, {
      x: xPos + 0.25,
      y: yPos + 0.8,
      w: 3.6,
      h: 0.55,
      fontSize: 9.5,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED,
      lineSpacing: 13
    });
  });

  addSlideFooter(slide, 11, 13);
}

// =========================================================================
// SLIDE 12: BUSINESS MODEL & UNIT ECONOMICS
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  addSlideHeader(
    slide,
    'Business & Sustainability',
    'Subscription Economics & Growth Model',
    'High retention, recurring revenue model built on centralized bulk procurement and clustered school routes.'
  );

  const bizPoints = [
    {
      title: '🔄 Recurring Subscription Revenue',
      desc: 'Predictable monthly and term subscriptions (Basic ৳4,400/mo, Standard ৳6,400/mo, Premium ৳9,000/mo) ensure high customer lifetime value (LTV).'
    },
    {
      title: '📈 High-Margin Add-Ons',
      desc: 'Cold-pressed juices (+৳80), probiotic yoghurt pots (+৳50), and seasonal fruit bowls (+৳60) increase average order value (AOV) by 24%.'
    },
    {
      title: '🚚 Route Density & Clustered Logistics',
      desc: 'Delivering 50-100 meals to a single school campus (e.g. Scholastica Uttara) reduces per-unit delivery cost to less than ৳15 per tiffin.'
    },
    {
      title: '🤝 Restaurant Partner Commissions',
      desc: 'Cloud kitchen partnerships with top Dhaka restaurants generate 15-20% commission per order while leveraging off-peak morning kitchen capacity.'
    }
  ];

  bizPoints.forEach((b, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const xPos = 0.8 + col * 4.3;
    const yPos = 1.5 + row * 1.7;

    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: yPos,
      w: 4.1,
      h: 1.5,
      rectRadius: 0.1,
      fill: { color: COLOR_CARD_DARK },
      line: { color: '382B20', width: 1 }
    });

    slide.addText(b.title, {
      x: xPos + 0.25,
      y: yPos + 0.2,
      w: 3.6,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_AMBER
    });

    slide.addText(b.desc, {
      x: xPos + 0.25,
      y: yPos + 0.6,
      w: 3.6,
      h: 0.75,
      fontSize: 10,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED,
      lineSpacing: 14
    });
  });

  addSlideFooter(slide, 12, 13);
}

// =========================================================================
// SLIDE 13: SUMMARY, ROADMAP & CONCLUSION (Closing Slide)
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLOR_BG_DARK };

  // Decorative Accent Block
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.15,
    fill: { color: COLOR_ORANGE_PRIMARY }
  });

  slide.addText('FUTURE ROADMAP & SUMMARY', {
    x: 0.8,
    y: 0.45,
    w: 8.4,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Trebuchet MS',
    bold: true,
    color: COLOR_AMBER,
    charSpacing: 2
  });

  slide.addText('Transforming School Nutrition Across Bangladesh', {
    x: 0.8,
    y: 0.75,
    w: 8.4,
    h: 0.5,
    fontSize: 22,
    fontFace: 'Trebuchet MS',
    bold: true,
    color: COLOR_WHITE
  });

  // Roadmap Cards
  const roadmap = [
    { phase: 'Phase 1 (Completed)', desc: 'Full Dhaka platform launch, 77+ menu items, 3D bento builder, BDT pricing, and PDF reporting.' },
    { phase: 'Phase 2 (Q4 2026)', desc: 'Smart RFID school locker integration for automated temperature and drop-off confirmation.' },
    { phase: 'Phase 3 (2027)', desc: 'Expansion to Chittagong and Sylhet English medium schools and native iOS/Android mobile apps.' }
  ];

  roadmap.forEach((r, idx) => {
    const xPos = 0.8 + idx * 2.85;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xPos,
      y: 1.45,
      w: 2.7,
      h: 1.7,
      rectRadius: 0.1,
      fill: { color: COLOR_CARD_DARK },
      line: { color: '382B20', width: 1 }
    });

    slide.addText(r.phase, {
      x: xPos + 0.2,
      y: 1.6,
      w: 2.3,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Trebuchet MS',
      bold: true,
      color: COLOR_AMBER
    });

    slide.addText(r.desc, {
      x: xPos + 0.2,
      y: 1.95,
      w: 2.3,
      h: 1.1,
      fontSize: 9.5,
      fontFace: 'Calibri',
      color: COLOR_TEXT_MUTED,
      lineSpacing: 13
    });
  });

  // Contact / Thank you banner
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 3.35,
    w: 8.4,
    h: 1.6,
    rectRadius: 0.12,
    fill: { color: '26150C' },
    line: { color: COLOR_ORANGE_PRIMARY, width: 1.5 }
  });

  slide.addText('Thank You! • Questions & Discussion', {
    x: 1.0,
    y: 3.5,
    w: 8.0,
    h: 0.4,
    fontSize: 18,
    fontFace: 'Trebuchet MS',
    bold: true,
    color: COLOR_WHITE,
    align: 'center'
  });

  slide.addText(
    '🌐 Platform: www.smart-tiffin.bd   |   📞 Hotline: +880 1700-TIFFIN   |   💻 GitHub: github.com/RAHAT1028/Tiffin',
    {
      x: 1.0,
      y: 4.0,
      w: 8.0,
      h: 0.35,
      fontSize: 11,
      fontFace: 'Calibri',
      bold: true,
      color: COLOR_AMBER_LIGHT,
      align: 'center'
    }
  );

  slide.addText('Dedicated to wholesome health, cognitive vitality, and happy school days for every child.', {
    x: 1.0,
    y: 4.4,
    w: 8.0,
    h: 0.3,
    fontSize: 9.5,
    fontFace: 'Calibri',
    italic: true,
    color: COLOR_TEXT_MUTED,
    align: 'center'
  });

  addSlideFooter(slide, 13, 13);
}

// Generate the PPTX file
const outputPath = 'TIFFIN_Smart_School_Tiffin_Presentation.pptx';

pptx.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`Presentation generated successfully: ${fileName}`);
  })
  .catch(err => {
    console.error('Error generating presentation:', err);
  });
