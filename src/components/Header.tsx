import { useState } from "react";
import { Sprout, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
];

interface HeaderProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header = ({ currentLang, onLangChange, onNavigate, currentPage }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: currentLang === "hi" ? "डैशबोर्ड" : currentLang === "mr" ? "डॅशबोर्ड" : "Dashboard" },
    { id: "chat", label: currentLang === "hi" ? "सलाह लें" : currentLang === "mr" ? "सल्ला घ्या" : "Ask Advice" },
    { id: "weather", label: currentLang === "hi" ? "मौसम" : currentLang === "mr" ? "हवामान" : "Weather" },
    { id: "mandi", label: currentLang === "hi" ? "मंडी भाव" : currentLang === "mr" ? "बाजारभाव" : "Mandi Prices" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16">
        <button onClick={() => onNavigate("dashboard")} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
            <Sprout className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">KrishiMitra</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Globe className="w-4 h-4 text-muted-foreground ml-1" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLangChange(lang.code)}
                className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                  currentLang === lang.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t bg-card p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                currentPage === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
