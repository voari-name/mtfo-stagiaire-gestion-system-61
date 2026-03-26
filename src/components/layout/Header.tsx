

import React, { useState, useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { NotificationBar } from "@/components/layout/NotificationBar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface HeaderProps {
  title: string;
  username?: string;
}

export const Header = ({ title, username = "RAHAJANIAINA Olivier" }: HeaderProps) => {
  const { darkMode, translations } = useSettings();
  const { user } = useAuth();
  const [photoUrl, setPhotoUrl] = useState("/lovable-uploads/profile-photo-olivier.jpg");

  useEffect(() => {
    const loadPhoto = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('photo_url')
        .eq('user_id', user.id)
        .single();
      if (data?.photo_url) {
        setPhotoUrl(data.photo_url);
      }
    };
    loadPhoto();
  }, [user]);

  return (
    <header className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white'} border-b px-6 py-4 flex justify-between items-center shadow-sm`}>
      <div>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-800'}`}>{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <NotificationBar />
        
        <div className="flex items-center space-x-3">
          <img
            src={photoUrl}
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
