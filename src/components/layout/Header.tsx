
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSettings } from "@/contexts/SettingsContext";

interface HeaderProps {
  title: string;
  username?: string;
}

export const Header = ({ title, username = "RAHAJANIAINA Olivier" }: HeaderProps) => {
  const navigate = useNavigate();
  const { darkMode, translations } = useSettings();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'} border-b px-6 py-4 flex justify-between items-center shadow-sm`}>
      <div>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-800'}`}>{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className={`h-10 w-10 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-800'} flex items-center justify-center text-white font-bold`}>
            {username.split(' ').map(name => name.charAt(0)).join('')}
          </div>
          <div>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{username}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Administrateur</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className={`${darkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white' : ''}`}
        >
          {translations["Déconnexion"]}
        </Button>
      </div>
    </header>
  );
};
