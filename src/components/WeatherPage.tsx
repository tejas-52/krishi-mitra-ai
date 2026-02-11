import { Sun, CloudRain, Cloud, Wind, Droplets, ArrowLeft, Thermometer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeatherPageProps {
  lang: string;
  onBack: () => void;
}

const t = (lang: string, en: string, hi: string, mr: string) =>
  lang === "hi" ? hi : lang === "mr" ? mr : en;

const forecastData = [
  { day: "Mon", icon: Sun, temp: 33, low: 22, rain: 0 },
  { day: "Tue", icon: Sun, temp: 34, low: 23, rain: 5 },
  { day: "Wed", icon: Cloud, temp: 31, low: 21, rain: 20 },
  { day: "Thu", icon: CloudRain, temp: 28, low: 20, rain: 70 },
  { day: "Fri", icon: CloudRain, temp: 27, low: 19, rain: 80 },
  { day: "Sat", icon: Cloud, temp: 30, low: 21, rain: 30 },
  { day: "Sun", icon: Sun, temp: 32, low: 22, rain: 10 },
];

const WeatherPage = ({ lang, onBack }: WeatherPageProps) => {
  return (
    <div className="space-y-4 pb-8">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-display font-bold text-xl text-foreground">
          {t(lang, "Weather Forecast", "मौसम का पूर्वानुमान", "हवामान अंदाज")}
        </h2>
      </div>

      {/* Current */}
      <div className="gradient-sky rounded-2xl p-6 text-sky-foreground shadow-elevated">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sky-foreground/70 text-sm">{t(lang, "Right Now", "अभी", "सध्या")}</p>
            <p className="font-display font-bold text-5xl mt-1">32°C</p>
            <p className="text-sky-foreground/80 mt-1">{t(lang, "Feels like 35°C", "महसूस 35°C", "जाणवते 35°C")}</p>
          </div>
          <Sun className="w-16 h-16 text-secondary animate-float" />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            <div>
              <p className="text-xs text-sky-foreground/70">{t(lang, "Humidity", "नमी", "आर्द्रता")}</p>
              <p className="font-semibold">65%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5" />
            <div>
              <p className="text-xs text-sky-foreground/70">{t(lang, "Wind", "हवा", "वारा")}</p>
              <p className="font-semibold">12 km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5" />
            <div>
              <p className="text-xs text-sky-foreground/70">{t(lang, "UV Index", "UV सूचकांक", "UV निर्देशांक")}</p>
              <p className="font-semibold">7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className="bg-secondary/20 border border-secondary rounded-xl p-4">
        <p className="font-semibold text-sm text-secondary-foreground">
          ⚠️ {t(lang, "Rain Alert: Heavy rain expected on Thursday-Friday. Plan harvest accordingly.", "बारिश चेतावनी: गुरुवार-शुक्रवार भारी बारिश की संभावना। कटाई की योजना बनाएं।", "पावसाचा इशारा: गुरुवार-शुक्रवारी जोरदार पावसाची शक्यता. कापणी नियोजन करा.")}
        </p>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-card rounded-2xl border shadow-card overflow-hidden">
        <h3 className="font-display font-bold text-foreground px-4 pt-4 pb-2">
          {t(lang, "7-Day Forecast", "7 दिन का पूर्वानुमान", "7 दिवसांचा अंदाज")}
        </h3>
        <div className="divide-y">
          {forecastData.map((day, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <span className="font-semibold text-sm text-foreground w-10">{day.day}</span>
              <day.icon className={`w-6 h-6 ${day.rain > 50 ? "text-sky" : "text-secondary"}`} />
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-foreground">{day.temp}°</span>
                <span className="text-muted-foreground">{day.low}°</span>
              </div>
              <div className="flex items-center gap-1 w-16 justify-end">
                <Droplets className="w-3 h-3 text-sky" />
                <span className={`text-xs font-semibold ${day.rain > 50 ? "text-sky" : "text-muted-foreground"}`}>
                  {day.rain}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farming advice */}
      <div className="bg-card rounded-2xl border shadow-card p-4">
        <h3 className="font-display font-bold text-foreground mb-2">
          🌾 {t(lang, "Weather-Based Advice", "मौसम आधारित सलाह", "हवामान आधारित सल्ला")}
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✅ {t(lang, "Ideal time for irrigation today", "आज सिंचाई का उत्तम समय", "आज सिंचनासाठी उत्तम वेळ")}</li>
          <li>⚠️ {t(lang, "Postpone fertilizer application before rain", "बारिश से पहले उर्वरक न डालें", "पावसापूर्वी खत टाकू नका")}</li>
          <li>✅ {t(lang, "Good conditions for pest spraying today", "आज कीटनाशक छिड़काव के लिए अच्छा समय", "आज कीटकनाशक फवारणीसाठी चांगली वेळ")}</li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherPage;
