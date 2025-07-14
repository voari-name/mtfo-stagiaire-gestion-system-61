import { useSettings } from "@/contexts/SettingsContext";
import Header from "@/components/home/Header";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  const { translations } = useSettings();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Header with MTEFoP Banner */}
      <Header />

      {/* Main Content */}
      <HeroSection />

      {/* About Section with Enhanced Madagascar Emblem */}
      <AboutSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
