import { TrendingUp, TrendingDown, ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MandiPricesProps {
  lang: string;
  onBack: () => void;
}

const t = (lang: string, en: string, hi: string, mr: string) =>
  lang === "hi" ? hi : lang === "mr" ? mr : en;

const priceData = [
  { crop: { en: "Wheat", hi: "गेहूं", mr: "गहू" }, price: 2275, change: 3.2, unit: "quintal", mandi: "Indore" },
  { crop: { en: "Rice", hi: "चावल", mr: "तांदूळ" }, price: 3450, change: -1.5, unit: "quintal", mandi: "Bhopal" },
  { crop: { en: "Soybean", hi: "सोयाबीन", mr: "सोयाबीन" }, price: 4680, change: 5.1, unit: "quintal", mandi: "Ujjain" },
  { crop: { en: "Cotton", hi: "कपास", mr: "कापूस" }, price: 6200, change: -2.3, unit: "quintal", mandi: "Nagpur" },
  { crop: { en: "Onion", hi: "प्याज", mr: "कांदा" }, price: 1850, change: 8.7, unit: "quintal", mandi: "Nashik" },
  { crop: { en: "Tomato", hi: "टमाटर", mr: "टोमॅटो" }, price: 2100, change: -4.0, unit: "quintal", mandi: "Pune" },
  { crop: { en: "Chana", hi: "चना", mr: "हरभरा" }, price: 5100, change: 1.8, unit: "quintal", mandi: "Latur" },
  { crop: { en: "Mustard", hi: "सरसों", mr: "मोहरी" }, price: 5450, change: 2.4, unit: "quintal", mandi: "Jaipur" },
];

const MandiPrices = ({ lang, onBack }: MandiPricesProps) => {
  return (
    <div className="space-y-4 pb-8">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-display font-bold text-xl text-foreground">
          {t(lang, "Mandi Prices", "मंडी भाव", "बाजारभाव")}
        </h2>
      </div>

      {/* Top performers */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
          <p className="text-xs text-primary font-semibold">{t(lang, "Highest Rise", "सबसे ज्यादा बढ़ा", "सर्वाधिक वाढ")}</p>
          <p className="font-display font-bold text-lg text-foreground mt-1">{t(lang, "Onion", "प्याज", "कांदा")}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">+8.7%</span>
          </div>
        </div>
        <div className="bg-destructive/10 rounded-2xl p-4 border border-destructive/20">
          <p className="text-xs text-destructive font-semibold">{t(lang, "Biggest Drop", "सबसे ज्यादा गिरा", "सर्वाधिक घट")}</p>
          <p className="font-display font-bold text-lg text-foreground mt-1">{t(lang, "Tomato", "टमाटर", "टोमॅटो")}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <span className="text-sm font-bold text-destructive">-4.0%</span>
          </div>
        </div>
      </div>

      {/* Price list */}
      <div className="bg-card rounded-2xl border shadow-card overflow-hidden">
        <div className="divide-y">
          {priceData.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-4">
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {item.crop[lang as keyof typeof item.crop] || item.crop.en}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {item.mandi}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-foreground">₹{item.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">/{item.unit}</p>
              </div>
              <div className={`flex items-center gap-1 ml-3 px-2 py-1 rounded-lg ${
                item.change > 0 ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
              }`}>
                {item.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-xs font-bold">{item.change > 0 ? "+" : ""}{item.change}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="bg-muted rounded-2xl p-4">
        <p className="text-sm font-semibold text-foreground">
          💡 {t(lang, "Selling Tip: Onion prices are rising. Consider selling in the next 2-3 days for best returns.", "बिक्री सुझाव: प्याज के भाव बढ़ रहे हैं। अगले 2-3 दिनों में बेचने पर अच्छा मुनाफा हो सकता है।", "विक्री सल्ला: कांद्याचे भाव वाढत आहेत. पुढील 2-3 दिवसांत विक्री करा.")}
        </p>
      </div>
    </div>
  );
};

export default MandiPrices;
