import { jsPDF } from 'jspdf';
import { ParentAccount, ParentAccountChild, AccountInvoice } from '../types';

/**
 * Generates and triggers download of a certified Monthly Pediatric Nutrition & Growth Report PDF
 */
export const downloadNutritionReportPDF = (
  child?: ParentAccountChild | null,
  account?: ParentAccount | null
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const childName = child?.name || account?.children[0]?.name || 'Student';
  const childAge = child?.age || account?.children[0]?.age || 8;
  const schoolName = child?.schoolName || account?.children[0]?.schoolName || 'Scholastica Senior Campus, Dhaka';
  const gradeClass = child?.gradeClass || account?.children[0]?.gradeClass || 'Grade 3 (Section B)';
  const locker = child?.lunchLocker || account?.children[0]?.lunchLocker || 'Locker #14 (Thermal Drop Zone)';
  const allergies = child?.allergies && child.allergies.length > 0
    ? child.allergies.map(a => a.toUpperCase()).join(', ')
    : 'None (Verified Allergy-Safe)';
  const activePlan = account?.activePlan === 'premium'
    ? 'Premium Gourmet Bento (High Protein & Omega-3)'
    : account?.activePlan === 'basic'
      ? 'Wholesome Everyday Nourish'
      : 'Vitality & High-Protein Balanced Bento';
  const parentName = account?.parentName || 'Parent / Guardian';
  const reportDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const reportCertId = `DH-NUTR-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  // ==========================================
  // 1. TOP HEADER BANNER (Dark Luxury Header)
  // ==========================================
  doc.setFillColor(28, 20, 15); // #1C140F
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Orange Accent Stripe
  doc.setFillColor(232, 93, 4); // #E85D04
  doc.rect(0, 38, pageWidth, 2.5, 'F');

  // Brand Logo & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 179, 71); // Amber/Orange
  doc.text('TIFFIN', margin, 16);

  doc.setFontSize(8);
  doc.setTextColor(220, 200, 180);
  doc.setFont('helvetica', 'normal');
  doc.text('SMART SCHOOL LUNCH LAB • CLINICAL PEDIATRIC WING', margin, 22);
  doc.text('DHAKA CENTRAL COMMISSARY & MICRO-NUTRITION BOARD', margin, 27);

  // Certification Badge on Top Right
  doc.setFillColor(45, 30, 20);
  doc.roundedRect(pageWidth - margin - 65, 8, 65, 23, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 153, 51);
  doc.text('OFFICIAL CERTIFICATION', pageWidth - margin - 60, 14);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(210, 210, 210);
  doc.text(`Cert ID: ${reportCertId}`, pageWidth - margin - 60, 19);
  doc.text(`Issued: ${reportDate}`, pageWidth - margin - 60, 24);
  doc.text('Standard: WHO & AAP Pediatric RDA', pageWidth - margin - 60, 28);

  // ==========================================
  // 2. DOCUMENT TITLE
  // ==========================================
  let curY = 48;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(30, 25, 20);
  doc.text('MONTHLY PEDIATRIC NUTRITION & GROWTH REPORT', margin, curY);

  curY += 5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 90, 85);
  doc.text('Certified audit of clinical macronutrients, micronutrient RDA compliance, and thermal food safety.', margin, curY);

  // ==========================================
  // 3. STUDENT & PARENT PROFILE CARD
  // ==========================================
  curY += 7;
  doc.setFillColor(248, 245, 240);
  doc.setDrawColor(220, 210, 200);
  doc.roundedRect(margin, curY, contentWidth, 36, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(200, 70, 0);
  doc.text('STUDENT PROFILE', margin + 5, curY + 6);
  doc.text('SCHOOL & LOGISTICS', margin + contentWidth / 2 + 5, curY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(40, 35, 30);

  // Left Column
  doc.text(`Student Name: `, margin + 5, curY + 13);
  doc.setFont('helvetica', 'bold');
  doc.text(childName, margin + 28, curY + 13);
  doc.setFont('helvetica', 'normal');

  doc.text(`Age & Term: `, margin + 5, curY + 18);
  doc.text(`${childAge} Years • Fall Academic Term 2026`, margin + 28, curY + 18);

  doc.text(`Registered Parent: `, margin + 5, curY + 23);
  doc.text(parentName, margin + 28, curY + 23);

  doc.text(`Allergen Profile: `, margin + 5, curY + 28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 40, 20);
  doc.text(allergies, margin + 28, curY + 28);
  doc.setTextColor(40, 35, 30);
  doc.setFont('helvetica', 'normal');

  // Right Column
  doc.text(`Campus / School: `, margin + contentWidth / 2 + 5, curY + 13);
  doc.setFont('helvetica', 'bold');
  doc.text(schoolName, margin + contentWidth / 2 + 32, curY + 13);
  doc.setFont('helvetica', 'normal');

  doc.text(`Class & Locker: `, margin + contentWidth / 2 + 5, curY + 18);
  doc.text(`${gradeClass} • ${locker}`, margin + contentWidth / 2 + 32, curY + 18);

  doc.text(`Active Meal Plan: `, margin + contentWidth / 2 + 5, curY + 23);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(200, 80, 0);
  doc.text(activePlan, margin + contentWidth / 2 + 32, curY + 23);
  doc.setTextColor(40, 35, 30);
  doc.setFont('helvetica', 'normal');

  doc.text(`Tiffin Hardware: `, margin + contentWidth / 2 + 5, curY + 28);
  doc.text('304 Surgical Stainless Steel Vacuum Bento (0% Plastic)', margin + contentWidth / 2 + 32, curY + 28);

  // ==========================================
  // 4. MONTHLY MACRONUTRIENT RDA SCORECARD
  // ==========================================
  curY += 42;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 25, 20);
  doc.text('1. Midday Macronutrient Breakdown vs. Pediatric Target', margin, curY);

  curY += 4;
  // Table Header
  doc.setFillColor(35, 25, 18);
  doc.rect(margin, curY, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('NUTRIENT METRIC', margin + 4, curY + 4.8);
  doc.text('DAILY AVERAGE', margin + 55, curY + 4.8);
  doc.text('MIDDAY RDA TARGET', margin + 95, curY + 4.8);
  doc.text('FULFILMENT STATUS', margin + 140, curY + 4.8);

  const macros = [
    { label: 'Energy / Calories', avg: '545 kcal', target: '520 - 580 kcal', status: '100% Target Met', pass: true },
    { label: 'Bioavailable Protein', avg: '24.8 g', target: '20.0 - 26.0 g', status: 'Optimal (Lean Muscle / Growth)', pass: true },
    { label: 'Complex Carbohydrates (Low-GI)', avg: '68.5 g', target: '65.0 - 75.0 g', status: 'Sustained 4-Hr Energy Release', pass: true },
    { label: 'Essential Lipids & Omega-3', avg: '16.2 g', target: '14.0 - 18.0 g', status: 'Healthy Brain & Cellular Focus', pass: true },
    { label: 'Prebiotic Dietary Fiber', avg: '7.8 g', target: '6.5 - 8.5 g', status: 'Complete Gut Microbiome Balance', pass: true },
  ];

  curY += 7;
  macros.forEach((m, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 245, idx % 2 === 0 ? 255 : 242, idx % 2 === 0 ? 255 : 238);
    doc.rect(margin, curY, contentWidth, 6.5, 'F');
    doc.setDrawColor(230, 220, 210);
    doc.line(margin, curY + 6.5, margin + contentWidth, curY + 6.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 35, 30);
    doc.text(m.label, margin + 4, curY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.text(m.avg, margin + 55, curY + 4.5);
    doc.text(m.target, margin + 95, curY + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 130, 60); // Green
    doc.text(`✓ ${m.status}`, margin + 140, curY + 4.5);

    curY += 6.5;
  });

  // ==========================================
  // 5. MICRONUTRIENT & VITAMIN RDA ANALYSIS
  // ==========================================
  curY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 25, 20);
  doc.text('2. Micronutrient, Mineral & Bone Growth Index', margin, curY);

  curY += 4;
  doc.setFillColor(35, 25, 18);
  doc.rect(margin, curY, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('MICRONUTRIENT', margin + 4, curY + 4.8);
  doc.text('ABSORBED LEVEL', margin + 55, curY + 4.8);
  doc.text('PHYSIOLOGICAL BENEFIT', margin + 95, curY + 4.8);
  doc.text('CLINICAL SCORE', margin + 145, curY + 4.8);

  const micros = [
    { label: 'Calcium & Magnesium', level: '420 mg / meal', benefit: 'Bone density, skeletal growth & dental strength', score: '105% of RDA' },
    { label: 'Elemental Iron (Fe)', level: '6.8 mg / meal', benefit: 'Hemoglobin synthesis & cognitive fatigue resistance', score: '98% of RDA' },
    { label: 'Vitamin D3 & Zinc (Zn)', level: '190 IU / 4.2 mg', benefit: 'Infection immunity, white blood cell vitality', score: '100% of RDA' },
    { label: 'Vitamin A & Beta-Carotene', level: '480 mcg / meal', benefit: 'Optic nerve protection & classroom screen relief', score: '110% of RDA' },
    { label: 'Electrolytic Hydration', level: '450 ml / meal', benefit: 'Thermoregulation & active playground alertness', score: 'Optimal' },
  ];

  curY += 7;
  micros.forEach((m, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 245, idx % 2 === 0 ? 255 : 242, idx % 2 === 0 ? 255 : 238);
    doc.rect(margin, curY, contentWidth, 6.5, 'F');
    doc.setDrawColor(230, 220, 210);
    doc.line(margin, curY + 6.5, margin + contentWidth, curY + 6.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 35, 30);
    doc.text(m.label, margin + 4, curY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.text(m.level, margin + 55, curY + 4.5);
    doc.text(m.benefit, margin + 95, curY + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 90, 0); // Amber
    doc.text(m.score, margin + 145, curY + 4.5);

    curY += 6.5;
  });

  // ==========================================
  // 6. FOOD SAFETY & THERMAL AUDIT (2 Column Grid)
  // ==========================================
  curY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 25, 20);
  doc.text('3. Thermal Food Safety & Kitchen Hygiene Telemetry', margin, curY);

  curY += 4;
  const colW = (contentWidth - 6) / 2;

  // Box 1: Thermal Chain
  doc.setFillColor(248, 245, 240);
  doc.setDrawColor(220, 210, 200);
  doc.roundedRect(margin, curY, colW, 26, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(200, 70, 0);
  doc.text('HOT-CHAIN THERMAL DISPATCH AUDIT', margin + 4, curY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 45, 40);
  doc.text('• Kitchen Cook-Seal Core Temp: 76.5°C (HACCP Compliant)', margin + 4, curY + 11);
  doc.text('• Gate Arrival Temp (Average): 68.4°C (Safe Zone > 65°C)', margin + 4, curY + 16);
  doc.text('• Thermal Insulation Performance: 99.8% Perfect Warmth', margin + 4, curY + 21);

  // Box 2: Quality & Hygiene
  doc.setFillColor(248, 245, 240);
  doc.setDrawColor(220, 210, 200);
  doc.roundedRect(margin + colW + 6, curY, colW, 26, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(20, 130, 60);
  doc.text('HYGIENE & ZERO-PLASTIC AUDIT', margin + colW + 10, curY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 45, 40);
  doc.text('• Commissary Audit: ISO 22000 Grade A+ (Dhaka Lab)', margin + colW + 10, curY + 11);
  doc.text('• 0% Microplastics • BPA & Phthalate Free Stainless Bento', margin + colW + 10, curY + 16);
  doc.text('• 100°C Steam UV-C Autoclave Sanitization Between Uses', margin + colW + 10, curY + 21);

  // ==========================================
  // 7. PEDIATRICIAN RECOMMENDATION & SIGN OFF
  // ==========================================
  curY += 31;
  doc.setFillColor(255, 249, 242);
  doc.setDrawColor(240, 180, 140);
  doc.roundedRect(margin, curY, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(190, 70, 0);
  doc.text('CLINICAL PEDIATRIC NUTRITIONIST OPINION:', margin + 4, curY + 5.5);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(60, 50, 45);
  doc.text(
    `"${childName} demonstrates excellent dietary balance and consistent nutrient intake across the 5-day cycle. Active carbohydrate-to-protein ratio has completely prevented afternoon energy crashes. Continue current hydration and probiotic yoghurt add-ons."`,
    margin + 4,
    curY + 11,
    { maxWidth: contentWidth - 8 }
  );

  // Signatures & Official Stamp
  curY += 27;
  doc.setDrawColor(200, 190, 180);
  doc.line(margin, curY + 10, margin + 60, curY + 10);
  doc.line(pageWidth - margin - 60, curY + 10, pageWidth - margin, curY + 10);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(40, 35, 30);
  doc.text('Dr. Sarah Chowdhury, MBBS, MSc', margin, curY + 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(110, 100, 95);
  doc.text('Lead Pediatric Nutrition Consultant • BMDC Reg #58219', margin, curY + 18);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(40, 35, 30);
  doc.text('Dhaka Central Commissary Board', pageWidth - margin - 60, curY + 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(110, 100, 95);
  doc.text('Certified School Logistics Director • QA Seal Verified', pageWidth - margin - 60, curY + 18);

  // ==========================================
  // 8. FOOTER
  // ==========================================
  doc.setFillColor(28, 20, 15);
  doc.rect(0, pageHeight - 9, pageWidth, 9, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(200, 190, 180);
  doc.text('Smart School Tiffin Bangladesh • Helpline: +880 1700-TIFFIN • Web: www.smart-tiffin.bd • Dhaka, Bangladesh', margin, pageHeight - 3.5);
  doc.text(`Page 1 of 1 • Generated for ${childName}`, pageWidth - margin - 45, pageHeight - 3.5);

  // Trigger browser download
  const safeFilename = `Pediatric_Nutrition_Report_${childName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(safeFilename);
};

/**
 * Generates and triggers download of an official Tax Invoice / Receipt PDF
 */
export const downloadInvoicePDF = (
  invoice: AccountInvoice,
  account?: ParentAccount | null
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  const parentName = account?.parentName || 'Valued Parent';
  const email = account?.email || 'parent@tiffin.bd';
  const phone = account?.phone || '+880 1712-345678';
  const address = account?.address || 'Gulshan 2, Dhaka 1212, Bangladesh';

  // Top header
  doc.setFillColor(28, 20, 15);
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setFillColor(232, 93, 4);
  doc.rect(0, 35, pageWidth, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 179, 71);
  doc.text('TIFFIN', margin, 16);

  doc.setFontSize(8);
  doc.setTextColor(220, 200, 180);
  doc.setFont('helvetica', 'normal');
  doc.text('SMART SCHOOL TIFFIN PLATFORM • DHAKA, BANGLADESH', margin, 22);
  doc.text('BIN / Tax ID: 004829104-0101 • Helpline: +880 1700-TIFFIN', margin, 27);

  // Invoice badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('TAX INVOICE / RECEIPT', pageWidth - margin - 65, 18);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 179, 71);
  doc.text(`Status: ${invoice.status.toUpperCase()}`, pageWidth - margin - 65, 24);

  // Meta details
  let curY = 48;
  doc.setFillColor(248, 245, 240);
  doc.setDrawColor(220, 210, 200);
  doc.roundedRect(margin, curY, contentWidth, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(200, 70, 0);
  doc.text('BILLED TO (PARENT / GUARDIAN):', margin + 5, curY + 6);
  doc.text('INVOICE METADATA:', margin + contentWidth / 2 + 5, curY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(40, 35, 30);

  doc.text(`Name: ${parentName}`, margin + 5, curY + 13);
  doc.text(`Email: ${email}`, margin + 5, curY + 18);
  doc.text(`Phone: ${phone}`, margin + 5, curY + 23);
  doc.text(`Address: ${address}`, margin + 5, curY + 28);

  doc.text(`Invoice ID: ${invoice.id}`, margin + contentWidth / 2 + 5, curY + 13);
  doc.text(`Billing Date: ${invoice.date}`, margin + contentWidth / 2 + 5, curY + 18);
  doc.text(`Payment Gateway: Visa Card / bKash Online`, margin + contentWidth / 2 + 5, curY + 23);
  doc.text(`Currency: BDT (Bangladeshi Taka - ৳)`, margin + contentWidth / 2 + 5, curY + 28);

  // Line item table
  curY += 42;
  doc.setFillColor(35, 25, 18);
  doc.rect(margin, curY, contentWidth, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('DESCRIPTION / MEAL SUBSCRIPTION', margin + 5, curY + 5.5);
  doc.text('QTY', margin + 110, curY + 5.5);
  doc.text('RATE (BDT)', margin + 130, curY + 5.5);
  doc.text('TOTAL', margin + 155, curY + 5.5);

  curY += 8;
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, curY, contentWidth, 14, 'F');
  doc.setDrawColor(220, 210, 200);
  doc.line(margin, curY + 14, margin + contentWidth, curY + 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 35, 30);
  doc.text(invoice.description, margin + 5, curY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 110, 100);
  doc.text('Includes Insulated Hot Tiffin Logistics & Temperature Guarantee', margin + 5, curY + 10.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(40, 35, 30);
  doc.text('1 Cycle', margin + 110, curY + 7);
  doc.text(`৳${invoice.amount.toFixed(0)}`, margin + 130, curY + 7);
  doc.setFont('helvetica', 'bold');
  doc.text(`৳${invoice.amount.toFixed(0)}`, margin + 155, curY + 7);

  // Totals Box
  curY += 22;
  const totW = 75;
  const totX = pageWidth - margin - totW;
  doc.setFillColor(248, 245, 240);
  doc.roundedRect(totX, curY, totW, 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 75, 70);
  doc.text('Subtotal:', totX + 5, curY + 7);
  doc.text(`৳${invoice.amount.toFixed(0)}`, totX + totW - 5, curY + 7, { align: 'right' });

  doc.text('VAT / Tax (0% Exempted):', totX + 5, curY + 13);
  doc.text('৳0', totX + totW - 5, curY + 13, { align: 'right' });

  doc.setDrawColor(200, 190, 180);
  doc.line(totX + 5, curY + 17, totX + totW - 5, curY + 17);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(200, 70, 0);
  doc.text('Grand Total:', totX + 5, curY + 23);
  doc.text(`৳${invoice.amount.toFixed(0)}`, totX + totW - 5, curY + 23, { align: 'right' });

  // Thank you note
  curY += 38;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 35, 30);
  doc.text('Thank you for trusting Smart School Tiffin with your child\'s health!', margin, curY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(110, 100, 95);
  doc.text('This is an electronically generated receipt and does not require a physical signature.', margin, curY + 5);

  // Footer
  doc.setFillColor(28, 20, 15);
  doc.rect(0, pageHeight - 9, pageWidth, 9, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(200, 190, 180);
  doc.text('Smart School Tiffin Bangladesh • 24/7 Hotline: +880 1700-TIFFIN • support@tiffin.bd', margin, pageHeight - 3.5);
  doc.text(`Invoice #${invoice.id}`, pageWidth - margin - 30, pageHeight - 3.5);

  const safeFilename = `Tiffin_Invoice_${invoice.id}.pdf`;
  doc.save(safeFilename);
};

/**
 * Generates and triggers download of a custom calculated pediatric plan from the interactive calculator
 */
export const downloadCalculatedPediatricPlanPDF = (calc: {
  age: number;
  activity: string;
  appetite: string;
  goal: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  hydrationMl: number;
  calciumMg: number;
  planBadge: string;
  planReason: string;
}) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const reportDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // Top header
  doc.setFillColor(28, 20, 15);
  doc.rect(0, 0, pageWidth, 36, 'F');
  doc.setFillColor(232, 93, 4);
  doc.rect(0, 36, pageWidth, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 179, 71);
  doc.text('TIFFIN', margin, 16);

  doc.setFontSize(8);
  doc.setTextColor(220, 200, 180);
  doc.setFont('helvetica', 'normal');
  doc.text('PEDIATRIC NUTRITION CALCULATOR • CLINICAL ASSESSMENT', margin, 22);
  doc.text('WHO & AAP DIETARY GUIDELINES • DHAKA PEDIATRIC LAB', margin, 27);

  let curY = 48;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 25, 20);
  doc.text('PERSONALIZED PEDIATRIC NUTRITION PRESCRIPTION', margin, curY);

  curY += 5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 90, 85);
  doc.text(`Calculated for child age: ${calc.age} years • Assessment Date: ${reportDate}`, margin, curY);

  // Parameters card
  curY += 7;
  doc.setFillColor(248, 245, 240);
  doc.roundedRect(margin, curY, contentWidth, 22, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(200, 70, 0);
  doc.text('INPUT PARAMETERS:', margin + 4, curY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(40, 35, 30);
  doc.text(`• Child Age: ${calc.age} Years`, margin + 4, curY + 12);
  doc.text(`• Activity Level: ${calc.activity.toUpperCase()}`, margin + 4, curY + 17);
  doc.text(`• Appetite Profile: ${calc.appetite.toUpperCase()}`, margin + contentWidth / 2, curY + 12);
  doc.text(`• Core Health Goal: ${calc.goal.toUpperCase()}`, margin + contentWidth / 2, curY + 17);

  // Macro Table
  curY += 28;
  doc.setFillColor(35, 25, 18);
  doc.rect(margin, curY, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('TARGET METRIC', margin + 4, curY + 4.8);
  doc.text('RECOMMENDED LUNCH TARGET', margin + 70, curY + 4.8);
  doc.text('CLINICAL PURPOSE', margin + 125, curY + 4.8);

  const targets = [
    { label: 'Midday Calories', val: `${calc.calories} kcal`, desc: '30-35% daily metabolic requirement' },
    { label: 'Bioavailable Protein', val: `${calc.proteinGrams} g`, desc: 'Lean growth & cellular repair' },
    { label: 'Complex Carbohydrates', val: `${calc.carbsGrams} g`, desc: 'Sustained classroom mental focus' },
    { label: 'Essential Lipids / Fats', val: `${calc.fatsGrams} g`, desc: 'Omega-3 fatty acids for neuron health' },
    { label: 'Midday Hydration', val: `${calc.hydrationMl} ml`, desc: 'Thermoregulation & electrolyte balance' },
    { label: 'Calcium & Bone Index', val: `${calc.calciumMg} mg`, desc: 'Skeletal development & teeth protection' },
  ];

  curY += 7;
  targets.forEach((t, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 245, idx % 2 === 0 ? 255 : 242, idx % 2 === 0 ? 255 : 238);
    doc.rect(margin, curY, contentWidth, 6.5, 'F');
    doc.setDrawColor(220, 210, 200);
    doc.line(margin, curY + 6.5, margin + contentWidth, curY + 6.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 35, 30);
    doc.text(t.label, margin + 4, curY + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(200, 70, 0);
    doc.text(t.val, margin + 70, curY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 75, 70);
    doc.text(t.desc, margin + 125, curY + 4.5);

    curY += 6.5;
  });

  // Recommended Plan Card
  curY += 8;
  doc.setFillColor(255, 249, 242);
  doc.setDrawColor(240, 180, 140);
  doc.roundedRect(margin, curY, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(200, 70, 0);
  doc.text(`RECOMMENDED TIFFIN PLAN: ${calc.planBadge.toUpperCase()}`, margin + 4, curY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 45, 40);
  doc.text(calc.planReason, margin + 4, curY + 12, { maxWidth: contentWidth - 8 });

  // Footer
  doc.setFillColor(28, 20, 15);
  doc.rect(0, pageHeight - 9, pageWidth, 9, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(200, 190, 180);
  doc.text('Smart School Tiffin Bangladesh • Clinical Pediatric Division • www.smart-tiffin.bd', margin, pageHeight - 3.5);

  doc.save(`Pediatric_Nutrition_Plan_Age_${calc.age}.pdf`);
};
