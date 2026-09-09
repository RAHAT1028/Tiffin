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
    text: "Hello! I am **TIFFIN Nutribot**, your AI School Lunch Nutritionist & Meal Advisor. 🍱✨\n\nHow can I help you today? I can recommend allergen-safe meal plans, calculate macros for your child's age, or explain our thermal delivery and schedule flexibility across Dhaka.",
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
      // Paediatric nutrition answers
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#1C1712] w-full sm:max-w-lg h-[90vh] sm:h-[650px] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-orange-500/30 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-[#261E18] text-white flex items-center justify-between border-b border-orange-500/20 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-sm font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white">TIFFIN Nutribot</h3>
                <span className="px-2 py-0.5 rounded-full bg-orange-950 text-orange-400 text-[10px] font-bold border border-orange-500/30">
                  AI Paediatric Advisor
                </span>
              </div>
              <p className="text-[11px] text-[#A8988A]">TIFFIN • Smart School Tiffin</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages(INITIAL_MESSAGES)}
              className="p-2 rounded-xl text-[#D4C5B5] hover:text-white hover:bg-[#15100C] transition-colors border border-orange-500/20"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#D4C5B5] hover:text-white hover:bg-[#15100C] transition-colors border border-orange-500/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#15100C]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-orange-600 text-white rounded-br-none'
                    : 'bg-[#261E18] border border-orange-500/20 text-[#F5EBE1] rounded-tl-none'
                }`}
              >
                {/* Render markdown formatting */}
                <div className="whitespace-pre-wrap space-y-1">
                  {msg.text.split('\n').map((line, i) => {
                    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-300">$1</strong>');
                    return (
                      <p 
                        key={i} 
                        dangerouslySetInnerHTML={{ __html: formattedLine }} 
                        className={line.startsWith('-') || line.startsWith('•') ? 'pl-2 text-[#D4C5B5] font-medium' : ''}
                      />
                    );
                  })}
                </div>

                <span className={`text-[10px] block mt-2 font-medium ${msg.sender === 'user' ? 'text-orange-200 text-right' : 'text-[#8C7B6D]'}`}>
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-[#261E18] text-orange-400 border border-orange-500/30 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#261E18] border border-orange-500/20 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-2 text-[#D4C5B5] text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                  <span>TIFFIN Nutribot is crafting personalized meal advice...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-3 bg-[#261E18] border-t border-orange-500/20 flex gap-2 overflow-x-auto no-scrollbar">
          {PRESET_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#15100C] hover:bg-[#2F251E] hover:border-orange-500/40 text-[#D4C5B5] hover:text-orange-300 text-xs font-semibold border border-orange-500/20 transition-colors flex-shrink-0"
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
          className="p-3 sm:p-4 bg-[#261E18] border-t border-orange-500/20 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about allergies, calorie needs, meal swaps..."
            className="flex-1 px-4 py-3 rounded-xl bg-[#15100C] border border-orange-500/20 text-white placeholder-[#8C7B6D] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-3 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold transition-all shadow-md shadow-orange-600/30 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
