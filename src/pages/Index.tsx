import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import ChatInterface from "@/components/ChatInterface";
import WeatherPage from "@/components/WeatherPage";
import MandiPrices from "@/components/MandiPrices";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [lang, setLang] = useState("en");

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentLang={lang}
        onLangChange={setLang}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      <main className="container max-w-2xl py-4">
        {currentPage === "dashboard" && <Dashboard lang={lang} onNavigate={setCurrentPage} />}
        {currentPage === "chat" && <ChatInterface lang={lang} onBack={() => setCurrentPage("dashboard")} />}
        {currentPage === "weather" && <WeatherPage lang={lang} onBack={() => setCurrentPage("dashboard")} />}
        {currentPage === "mandi" && <MandiPrices lang={lang} onBack={() => setCurrentPage("dashboard")} />}
      </main>
    </div>
  );
};

export default Index;
