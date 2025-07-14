
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPage: string;
  onLogout: () => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen, currentPage, onLogout }: SidebarProps) => {
  const navigate = useNavigate();
  const { translations, darkMode } = useSettings();

  const menuItems = [
    { id: "profile", label: translations["Mon profil"], icon: "👤", path: "/profile" },
    { id: "internships", label: translations["Stagiaires"], icon: "👥", path: "/internships" },
    { id: "projects", label: translations["Projets"], icon: "📋", path: "/projects" },
    { id: "evaluations", label: translations["Évaluations"], icon: "📊", path: "/evaluations" },
    { id: "assignments", label: translations["Affectations"], icon: "📌", path: "/assignments" },
    { id: "statistics", label: translations["Statistiques"], icon: "📈", path: "/statistics" },
    { id: "settings", label: translations["Paramètres"], icon: "⚙️", path: "/settings" },
  ];

  return (
    <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg transition-all duration-300 animate-slide-in-right ${sidebarOpen ? 'w-64' : 'w-16'} flex flex-col`}>
      {/* Header */}
      <div className={`p-4 ${darkMode ? 'border-slate-700' : 'border-gray-200'} border-b flex items-center justify-between`}>
        {sidebarOpen && (
          <div className="flex items-center space-x-2 animate-fade-in">
            <img 
              src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
              alt="MTEFoP Logo" 
              className="h-8 w-auto"
            />
            <span className={`font-bold ${darkMode ? 'text-white' : 'text-blue-800'}`}>MTEFoP</span>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 hover-scale transition-all duration-300 ${darkMode ? 'text-white hover:bg-slate-700' : 'hover:bg-gray-100'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18m-9-9l9 9-9 9"/>
          </svg>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Button
                variant={currentPage === item.id ? "default" : "ghost"}
                className={`w-full justify-start transition-all duration-300 hover-scale ${
                  currentPage === item.id 
                    ? "bg-blue-800 text-white" 
                    : darkMode 
                      ? "text-white hover:bg-slate-700" 
                      : "hover:bg-blue-50"
                }`}
                onClick={() => navigate(item.path)}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span className="ml-3 animate-fade-in">{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className={`p-4 ${darkMode ? 'border-slate-700' : 'border-gray-200'} border-t`}>
        <Button
          variant="ghost"
          onClick={onLogout}
          className={`w-full justify-start text-red-600 hover-scale transition-all duration-300 ${
            darkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
          }`}
        >
          <span className="text-lg">🚪</span>
          {sidebarOpen && <span className="ml-3 animate-fade-in">{translations["Déconnexion"]}</span>}
        </Button>
      </div>
    </div>
  );
};
