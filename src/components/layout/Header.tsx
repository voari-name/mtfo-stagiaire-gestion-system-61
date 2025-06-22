
import React from "react";
import { useSettings } from "@/contexts/SettingsContext";

interface HeaderProps {
  title: string;
  username?: string;
}

export const Header = ({ title, username = "RAHAJANIAINA Olivier" }: HeaderProps) => {
  const { darkMode, translations } = useSettings();

  return (
    <header className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'} border-b px-6 py-4 flex justify-between items-center shadow-sm`}>
      <div>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-800'}`}>{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <img
            src="/lovable-uploads/d23d8c4c-1324-4c58-9904-d37fd7d53be4.png"
            alt="Photo de profil"
            className="h-10 w-10 rounded-full object-cover border-2 border-blue-600"
          />
          <div>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{username}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Administrateur</p>
          </div>
        </div>
      </div>
    </header>
  );
};
