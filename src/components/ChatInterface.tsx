import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Camera, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  lang: string;
  onBack: () => void;
}

const t = (lang: string, en: string, hi: string, mr: string) =>
  lang === "hi" ? hi : lang === "mr" ? mr : en;

const welcomeMessages: Record<string, string> = {
  en: "Namaste! 🙏 I'm KrishiMitra, your farming advisor. Ask me anything about crops, weather, soil, pests, or government schemes. How can I help you today?",
  hi: "नमस्ते! 🙏 मैं कृषिमित्र हूं, आपका कृषि सलाहकार। फसल, मौसम, मिट्टी, कीट या सरकारी योजनाओं के बारे में कुछ भी पूछें। आज मैं आपकी कैसे मदद कर सकता हूं?",
  mr: "नमस्कार! 🙏 मी कृषिमित्र, तुमचा शेती सल्लागार. पिके, हवामान, माती, कीटक किंवा सरकारी योजनांबद्दल काहीही विचारा. आज मी तुम्हाला कशी मदत करू शकतो?",
};

const quickActions = {
  en: ["Best crop for this season?", "Weather this week?", "Detect crop disease", "Government schemes"],
  hi: ["इस मौसम के लिए सबसे अच्छी फसल?", "इस हफ्ते का मौसम?", "फसल की बीमारी पहचानें", "सरकारी योजनाएं"],
  mr: ["या हंगामासाठी सर्वोत्तम पीक?", "या आठवड्यातील हवामान?", "पिकाचा रोग ओळखा", "सरकारी योजना"],
};

const ChatInterface = ({ lang, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: welcomeMessages[lang] || welcomeMessages.en, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;
    setInput("");

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: messageText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Simulated AI response (will be replaced with real API)
    setTimeout(() => {
      const response = getSimulatedResponse(messageText, lang);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: response, timestamp: new Date() }]);
      setIsLoading(false);
    }, 1200);
  };

  const toggleMic = () => {
    setIsListening(!isListening);
    // Voice recognition will be implemented with Cloud
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-3 border-b bg-card">
        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
          <span className="text-lg">🌾</span>
        </div>
        <div>
          <h2 className="font-display font-bold text-foreground">KrishiMitra AI</h2>
          <p className="text-xs text-primary">{t(lang, "Online • Ready to help", "ऑनलाइन • मदद के लिए तैयार", "ऑनलाइन • मदतीसाठी तयार")}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card text-card-foreground border shadow-card rounded-bl-md"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm max-w-none text-card-foreground">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm">{msg.content}</p>
              )}
              <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border rounded-2xl rounded-bl-md px-4 py-3 shadow-card">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse-gentle" />
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse-gentle" style={{ animationDelay: "0.3s" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse-gentle" style={{ animationDelay: "0.6s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 bg-card border-t flex gap-2 overflow-x-auto">
          {(quickActions[lang as keyof typeof quickActions] || quickActions.en).map((action, i) => (
            <button
              key={i}
              onClick={() => handleSend(action)}
              className="shrink-0 px-3 py-2 rounded-xl bg-muted text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 bg-card border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-primary">
            <Camera className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t(lang, "Type your question...", "अपना सवाल लिखें...", "तुमचा प्रश्न लिहा...")}
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMic}
            className={`shrink-0 ${isListening ? "text-destructive animate-pulse-gentle" : "text-muted-foreground hover:text-primary"}`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
          <Button
            size="icon"
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="shrink-0 rounded-xl bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4 text-primary-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

function getSimulatedResponse(question: string, lang: string): string {
  const q = question.toLowerCase();
  if (q.includes("weather") || q.includes("मौसम") || q.includes("हवामान")) {
    return lang === "hi"
      ? "🌤️ **आज का मौसम:**\n\n- तापमान: 32°C\n- नमी: 65%\n- हवा: 12 km/h\n\n**अगले 3 दिन:** अंशिक बादल, बारिश की कम संभावना।\n\n**सलाह:** सिंचाई करने का अच्छा समय है।"
      : "🌤️ **Today's Weather:**\n\n- Temperature: 32°C\n- Humidity: 65%\n- Wind: 12 km/h\n\n**Next 3 days:** Partly cloudy, low chance of rain.\n\n**Advice:** Good time for irrigation.";
  }
  if (q.includes("crop") || q.includes("season") || q.includes("फसल") || q.includes("मौसम") || q.includes("पीक") || q.includes("हंगाम")) {
    return lang === "hi"
      ? "🌱 **इस मौसम के लिए सुझाव:**\n\n1. **गेहूं** - रबी मौसम के लिए उत्तम\n2. **सरसों** - कम पानी में अच्छी उपज\n3. **चना** - मिट्टी की उर्वरता बढ़ाता है\n\n**ध्यान दें:** बुआई से पहले मिट्टी की जांच करवाएं।"
      : "🌱 **Season Recommendations:**\n\n1. **Wheat** - Ideal for Rabi season\n2. **Mustard** - Good yield with less water\n3. **Chickpea** - Improves soil fertility\n\n**Tip:** Get soil tested before sowing.";
  }
  if (q.includes("disease") || q.includes("बीमारी") || q.includes("रोग") || q.includes("detect")) {
    return lang === "hi"
      ? "📸 **फसल रोग पहचान:**\n\nकृपया प्रभावित पत्ती या पौधे की फोटो अपलोड करें। मैं पहचान सकता हूं:\n\n- कीट का प्रकार\n- पत्ती रोग\n- पोषक तत्वों की कमी\n\n*कैमरा बटन दबाएं* 📷"
      : "📸 **Crop Disease Detection:**\n\nPlease upload a photo of the affected leaf or plant. I can identify:\n\n- Type of pest\n- Leaf diseases\n- Nutrient deficiencies\n\n*Tap the camera button* 📷";
  }
  if (q.includes("scheme") || q.includes("योजना")) {
    return lang === "hi"
      ? "🏛️ **आपके लिए सरकारी योजनाएं:**\n\n1. **PM-KISAN** - ₹6000/वर्ष सीधे बैंक में\n2. **फसल बीमा योजना** - प्राकृतिक आपदा से सुरक्षा\n3. **किसान क्रेडिट कार्ड** - कम ब्याज पर ऋण\n\n**आवेदन:** नजदीकी CSC केंद्र पर जाएं।"
      : "🏛️ **Government Schemes for You:**\n\n1. **PM-KISAN** - ₹6000/year direct to bank\n2. **Crop Insurance (PMFBY)** - Natural disaster protection\n3. **Kisan Credit Card** - Low interest loans\n\n**Apply:** Visit nearest CSC center.";
  }
  return lang === "hi"
    ? "🌾 मैं आपकी मदद कर सकता हूं! कृपया फसल, मौसम, मिट्टी, कीट या सरकारी योजनाओं के बारे में पूछें।"
    : "🌾 I'm here to help! Please ask about crops, weather, soil, pests, or government schemes for personalized advice.";
}

export default ChatInterface;
