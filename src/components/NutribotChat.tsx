import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  Flame, 
  ShieldAlert, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { ChatMessage } from '../types';

interface NutribotChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome',
    sender: 'bot',
    text: "Hello! I am **JK Nutribot**, your AI School Lunch Nutritionist & Meal Advisor. 🥦🍎\n\nHow can I help you today? I can recommend allergen-safe meal plans, calculate macros for your child's age, or explain our thermal delivery and schedule flexibility.",
    timestamp: 'Just now',
    suggestedMeals: ['Paneer Veggie Pulao', 'Chicken Teriyaki Bento', 'Baked Turkey Meatballs']
  }
];

const PRESET_PROMPTS = [
  "Suggest a high-protein, nut-free lunch for an active 8-year-old",
  "How do you keep hot lunches warm until 12:30 PM?",
  "Recommend dairy-free calcium-rich options",
  "How does the same-day cancellation policy work?"
];

export const NutribotChat: React.FC<NutribotChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Call backend API endpoint /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botReply = data.reply || "I've reviewed your request! Here are our recommended options tailored for your child.";
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: botReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      // Intelligent fallback expert paediatric nutrition answers
      const lower = messageText.toLowerCase();
      let fallbackText = "Thank you for reaching out! ";

      if (lower.includes('protein') || lower.includes('active') || lower.includes('energy')) {
        fallbackText = `For energetic, active students, our **Standard Vitality** and **Premium Bento** plans offer 28g–36g of high-quality protein per meal (e.g. *Grilled Herb Chicken Wrap* or *Atlantic Salmon Bento*). All our options are 100% nut-free and paired with complex carbohydrates (quinoa, brown rice, sweet potatoes) for sustained stamina without sugar crashes.`;
      } else if (lower.includes('warm') || lower.includes('temperature') || lower.includes('hot') || lower.includes('box')) {
        fallbackText = `We pack every hot meal directly at 72°C inside **double-wall vacuum-insulated 304 food-grade stainless steel tiffins**. Our custom heated delivery vans maintain ambient temperature, ensuring the meal remains at a safe and delicious 65°C–68°C right up to lunchtime!`;
      } else if (lower.includes('dairy') || lower.includes('lactose') || lower.includes('calcium')) {
        fallbackText = `For dairy-free requirements, we substitute cow's milk with calcium-fortified oat and sesame-free tahini sauces, steamed edamame, and broccoli florets which provide over 300mg of bio-available calcium per serving. Try our *Mexican Burrito Fiesta Bowl* on Wednesday!`;
      } else if (lower.includes('cancel') || lower.includes('sick') || lower.includes('pause') || lower.includes('refund')) {
        fallbackText = `You have full flexibility! You can **pause or cancel any delivery up until 7:00 AM on the day** via your parent dashboard. Any cancelled meals are immediately credited back to your balance for future school days.`;
      } else {
        fallbackText = `I recommend starting with our **Standard Vitality Plan ($6.50/day)**. It is our most popular tier and includes balanced lean protein, hidden vegetable sugos, fresh fruit bowls, and 100% nut-free safety certification. Would you like me to tailor a plan for a specific age group?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full sm:max-w-lg h-[90vh] sm:h-[650px] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-sm font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base">JK Nutribot</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  AI Paediatric Advisor
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Project JK • Smart School Tiffin</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages(INITIAL_MESSAGES)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-br-none'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-none'
                }`}
              >
                {/* Render simple markdown bolding and bullet points */}
                <div className="whitespace-pre-wrap space-y-1">
                  {msg.text.split('\n').map((line, i) => {
                    // Check bold markers
                    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return (
                      <p 
                        key={i} 
                        dangerouslySetInnerHTML={{ __html: formattedLine }} 
                        className={line.startsWith('-') || line.startsWith('•') ? 'pl-2 text-slate-700 font-medium' : ''}
                      />
                    );
                  })}
                </div>

                <span className={`text-[10px] block mt-2 font-medium ${msg.sender === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>JK Nutribot is crafting personalized meal advice...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
          {PRESET_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:border-emerald-200 text-slate-700 hover:text-emerald-800 text-xs font-semibold border border-slate-200 transition-colors flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about allergies, calorie needs, meal swaps..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold transition-all shadow-md shadow-emerald-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
