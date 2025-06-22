
import { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useSettings } from "@/contexts/SettingsContext";

type MainLayoutProps = {
  children: ReactNode;
  title: string;
  currentPage?: string;
  username?: string;
};

const MainLayout = ({ 
  children, 
  title, 
  currentPage = "dashboard",
  username = ""
}: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { darkMode } = useSettings();
  
  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!",
    });
    navigate("/");
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-slate-900' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} username={username} />
        <main className={`flex-1 overflow-y-auto p-6 ${darkMode ? 'bg-slate-900' : 'bg-gray-100'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
