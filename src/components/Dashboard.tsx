import { Cloud, Sun, MessageCircle, Leaf, TrendingUp, ShieldCheck, Camera, MapPin } from "lucide-react";
import heroFarm from "@/assets/hero-farm.jpg";

interface DashboardProps {
  lang: string;
  onNavigate: (page: string) => void;
}

const t = (lang: string, en: string, hi: string, mr: string) =>
  lang === "hi" ? hi : lang === "mr" ? mr : en;

const Dashboard = ({ lang, onNavigate }: DashboardProps) => {
  const features = [
    {
      icon: MessageCircle,
      title: t(lang, "Ask AI Advisor", "AI सलाहकार", "AI सल्लागार"),
      desc: t(lang, "Get instant crop advice", "फसल की तुरंत सलाह लें", "पिकाबद्दल त्वरित सल्ला"),
      color: "gradient-hero",
      page: "chat",
    },
    {
      icon: Cloud,
      title: t(lang, "Weather", "मौसम", "हवामान"),
      desc: t(lang, "7-day forecast & alerts", "7 दिन का पूर्वानुमान", "7 दिवसांचा अंदाज"),
      color: "gradient-sky",
      page: "weather",
    },
    {
      icon: TrendingUp,
      title: t(lang, "Mandi Prices", "मंडी भाव", "बाजारभाव"),
      desc: t(lang, "Nearby market rates", "नजदीकी बाजार भाव", "जवळच्या बाजारभाव"),
      color: "gradient-warm",
      page: "mandi",
    },
    {
      icon: Camera,
      title: t(lang, "Crop Doctor", "फसल डॉक्टर", "पीक डॉक्टर"),
      desc: t(lang, "Scan & detect disease", "बीमारी का पता लगाएं", "रोग शोधा"),
      color: "gradient-hero",
      page: "chat",
    },
    {
      icon: Leaf,
      title: t(lang, "Soil Advisory", "मिट्टी सलाह", "माती सल्ला"),
      desc: t(lang, "Fertilizer & soil tips", "उर्वरक और मिट्टी सुझाव", "खत आणि माती सूचना"),
      color: "gradient-sky",
      page: "chat",
    },
    {
      icon: ShieldCheck,
      title: t(lang, "Govt. Schemes", "सरकारी योजनाएं", "सरकारी योजना"),
      desc: t(lang, "Check eligible schemes", "पात्र योजनाएं देखें", "पात्र योजना पहा"),
      color: "gradient-warm",
      page: "chat",
    },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden shadow-elevated">
        <img src={heroFarm} alt="Farm landscape" className="w-full h-48 sm:h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary-foreground">
            {t(lang, "Welcome to KrishiMitra", "कृषिमित्र में स्वागत", "कृषिमित्रमध्ये स्वागत")} 🌾
          </h1>
          <p className="text-primary-foreground/80 mt-1 text-sm sm:text-base">
            {t(lang, "Your smart farming companion", "आपका स्मार्ट खेती साथी", "तुमचा स्मार्ट शेती साथीदार")}
          </p>
        </div>
      </div>

      {/* Location bar */}
      <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3">
        <MapPin className="w-5 h-5 text-primary shrink-0" />
        <div>
          <p className="text-xs text-muted-foreground">{t(lang, "Your Location", "आपका स्थान", "तुमचे स्थान")}</p>
          <p className="text-sm font-semibold text-foreground">{t(lang, "Detecting location...", "स्थान का पता लगा रहे हैं...", "स्थान शोधत आहे...")}</p>
        </div>
      </div>

      {/* Quick weather */}
      <div className="bg-card rounded-2xl p-4 shadow-card border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{t(lang, "Today's Weather", "आज का मौसम", "आजचे हवामान")}</p>
            <p className="font-display font-bold text-2xl text-foreground">32°C</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Sun className="w-4 h-4 text-secondary" />
              {t(lang, "Partly Cloudy", "आंशिक बादल", "अंशतः ढगाळ")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">{t(lang, "Humidity", "नमी", "आर्द्रता")}</p>
            <p className="font-semibold text-foreground">65%</p>
            <p className="text-xs text-primary mt-1">{t(lang, "No rain expected", "बारिश की उम्मीद नहीं", "पावसाची शक्यता नाही")}</p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {features.map((f, i) => (
          <button
            key={i}
            onClick={() => onNavigate(f.page)}
            className="bg-card rounded-2xl p-4 border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 text-left group"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <f.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display font-bold text-sm text-foreground">{f.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
