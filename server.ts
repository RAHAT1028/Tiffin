import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: [".env.local", ".env"] });

// Initialize Gemini SDK with telemetry headers
const apiKey = process.env.GEMINI_API_KEY || "";
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.warn("Could not initialize GoogleGenAI with provided key:", err);
  }
}

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

// API: AI Nutritionist chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemInstruction = `You are 'TIFFIN Nutribot', the smart AI school lunch nutritionist and meal planner for TIFFIN – Smart School Tiffin Platform across Dhaka, Bangladesh. 
Your mission is to help busy parents design wholesome, nutritious, and allergen-safe tiffins for school-going kids (ages 3-18).
Reassure parents and school administrators with friendly, empathetic, and clear advice.
Always use British/UK English spelling (e.g., customisation, flavour, colour, organise, standardise).
In your recommendations, reference our meal plans (Basic Nourish at ৳220/day, Standard Vitality at ৳320/day, Premium Gourmet Bento at ৳450/day) and emphasize our 100% nut-free hygiene standards, fresh ingredients, 68°C insulated thermal tiffins, and flexible same-day schedule cancellation (before 7:00 AM).
Provide meal ideas, nutritional breakdowns, and friendly tips. Keep your response in structured Markdown format, with readable paragraphs and clear bullet points.`;

    if (ai) {
      try {
        const chat = ai.chats.create({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction,
            temperature: 0.7,
          },
          history: (history || []).map((msg: any) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text || msg.message || "" }],
          })),
        });

        const response = await chat.sendMessage({
          message: message,
        });

        const reply = response.text || "I have formulated a nutrition plan for your child!";
        return res.json({ reply });
      } catch (geminiError: any) {
        console.warn("Gemini API call warning, using intelligent paediatric nutritionist fallback:", geminiError?.message);
      }
    }

    // Smart paediatric nutritionist response fallback if GEMINI_API_KEY is not configured
    const lower = (message || "").toLowerCase();
    let reply = "Hello from JK Nutribot! ";

    if (lower.includes("protein") || lower.includes("active") || lower.includes("sports")) {
      reply = `### High-Protein Recommendations for Active Students 🏃‍♂️\n\nFor active children, we recommend our **Standard Vitality (৳320/day)** or **Premium Bento (৳450/day)** plans:\n\n- **Grilled Herb Chicken & Avocado Wrap** (28g Protein, 510 kcal)\n- **Oven-Baked Turkey Meatballs with Quinoa** (31g Protein, 495 kcal)\n- **Teriyaki Glazed Salmon Bento** (34g Protein, 590 kcal with Omega-3 DHA)\n\nAll options are 100% nut-free and paired with complex slow-release carbohydrates for all-day focus.`;
    } else if (lower.includes("warm") || lower.includes("temperature") || lower.includes("hot") || lower.includes("cold")) {
      reply = `### Thermal Freshness & Safety Guarantee 🌡️\n\n- **68°C Hot Delivery**: Sealed in double-wall surgical grade 304 stainless steel vacuum containers directly from our morning ovens.\n- **No Microwaving Required**: Food remains fresh, moist, and piping hot until the lunch bell at 12:30 PM.\n- **Zero Plastic Contact**: High-grade stainless steel compartments with silicone airtight gaskets.`;
    } else if (lower.includes("cancel") || lower.includes("sick") || lower.includes("pause") || lower.includes("holiday")) {
      reply = `### Flexible Cancellation Policy 📅\n\n- **Same-Day Notice**: You can cancel or pause any school day delivery up to **7:00 AM on the day** directly from your parent app.\n- **Instant Credit**: 100% of the day's rate is credited to your balance for upcoming school days. Zero hassle or penalties.`;
    } else if (lower.includes("dairy") || lower.includes("lactose") || lower.includes("allergy") || lower.includes("nut")) {
      reply = `### Strict Allergen Protocols 🛡️\n\n- **100% Nut-Free Kitchen Zone**: Strict quarantine on all peanuts and tree nuts.\n- **Custom Substitutions**: Dairy-free calcium boosters (calcium-set tofu, fortified oat sauces, edamame) provide 300mg+ calcium per serving without cow dairy.\n- Check out our **Mexican Burrito Fiesta Bowl** (Zero top-9 allergens!).`;
    } else {
      reply = `### Personalised School Lunch Recommendation 🍱\n\nBased on your query, our **Standard Vitality Plan (৳320/day)** is our most popular choice for balanced paediatric nutrition.\n\n- **Daily Rotating Warm Dish** (Whole-grain pasta sugo, chicken katsu, lean turkey bowls)\n- **Crunchy Vegetable Finger Food** (Carrot batons, sweet bell peppers, hummus)\n- **Seasonal Fresh Fruit Bowl** (Berries, apple slices, seedless grapes)\n\nWould you like me to tailor a specific weekly plan for your child's age group?`;
    }

    return res.json({ reply });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ 
      error: "Unable to process nutrition request at this moment." 
    });
  }
});

// Serve frontend assets
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite HMR...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Vite startup error:", err);
});
