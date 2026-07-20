import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Initialize Gemini SDK with telemetry headers
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const app = express();
const PORT = 3000;

app.use(express.json());

// API: AI Nutritionist chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemInstruction = `You are 'JK Nutribot', the smart AI school lunch nutritionist and meal planner for Project JK – Smart School Tiffin Platform. 
Your mission is to help busy parents design wholesome, nutritious, and allergen-safe tiffins for school-going kids (ages 3-18).
Reassure parents and school administrators with friendly, empathetic, and clear advice.
Always use British/UK English spelling (e.g., customisation, flavour, colour, organise, standardise).
In your recommendations, reference our meal plans (Basic, Standard, Premium) and emphasize our hygiene standards, fresh ingredients, and flexible schedule cancellation.
Provide meal ideas, nutritional breakdowns, and friendly tips. Keep your response in structured Markdown format, with readable paragraphs and clear bullet points.`;

    // Configure the chat session with model gemini-3.5-flash
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
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

    const reply = response.text || "I apologize, but I am unable to generate a recommendation at this moment.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "Failed to communicate with our AI assistant. Please check if your GEMINI_API_KEY is configured in Settings > Secrets." 
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
