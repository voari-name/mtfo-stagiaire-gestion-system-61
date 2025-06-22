
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en' | 'mg';

type Translations = {
  [key: string]: string;
};

interface SettingsContextType {
  darkMode: boolean;
  standbyMode: boolean;
  brightness: number[];
  language: Language;
  translations: Translations;
  setDarkMode: (value: boolean) => void;
  setStandbyMode: (value: boolean) => void;
  setBrightness: (value: number[]) => void;
  setLanguage: (value: Language) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const translationsMap: Record<Language, Translations> = {
  fr: {
    "Mon profil": "Mon profil",
    "Stagiaires": "Stagiaires",
    "Projets": "Projets",
    "Évaluations": "Évaluations",
    "Affectations": "Affectations",
    "Statistiques": "Statistiques",
    "Paramètres": "Paramètres",
    "Déconnexion": "Déconnexion",
    "Photo de profil": "Photo de profil",
    "Informations personnelles": "Informations personnelles",
    "Préférences d'affichage": "Préférences d'affichage",
    "Mode sombre": "Mode sombre",
    "Mode veille": "Mode veille",
    "Luminosité": "Luminosité",
    "Langue de l'application": "Langue de l'application",
    "Gestion des affectations": "Gestion des affectations",
    "Tableau de bord statistiques": "Tableau de bord statistiques"
  },
  en: {
    "Mon profil": "My Profile",
    "Stagiaires": "Interns",
    "Projets": "Projects",
    "Évaluations": "Evaluations",
    "Affectations": "Assignments",
    "Statistiques": "Statistics",
    "Paramètres": "Settings",
    "Déconnexion": "Logout",
    "Photo de profil": "Profile Photo",
    "Informations personnelles": "Personal Information",
    "Préférences d'affichage": "Display Preferences",
    "Mode sombre": "Dark Mode",
    "Mode veille": "Standby Mode",
    "Luminosité": "Brightness",
    "Langue de l'application": "Application Language",
    "Gestion des affectations": "Assignment Management",
    "Tableau de bord statistiques": "Statistics Dashboard"
  },
  mg: {
    "Mon profil": "Ny mombamomba ahy",
    "Stagiaires": "Mpianatra",
    "Projets": "Tetikasa",
    "Évaluations": "Fanombanana",
    "Affectations": "Fanendrena",
    "Statistiques": "Antontan'isa",
    "Paramètres": "Fandrindrana",
    "Déconnexion": "Fivoahana",
    "Photo de profil": "Sary mombamomba",
    "Informations personnelles": "Fampahalalana manokana",
    "Préférences d'affichage": "Safidy fisehoana",
    "Mode sombre": "Fomba maizina",
    "Mode veille": "Fomba fiandrasana",
    "Luminosité": "Hazavana",
    "Langue de l'application": "Fitenin'ny rindrambaiko",
    "Gestion des affectations": "Fitantanana ny fanendrena",
    "Tableau de bord statistiques": "Sehatry ny antontan'isa"
  }
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [standbyMode, setStandbyMode] = useState(false);
  const [brightness, setBrightness] = useState([80]);
  const [language, setLanguage] = useState<Language>('fr');

  const translations = translationsMap[language];

  const value = {
    darkMode,
    standbyMode,
    brightness,
    language,
    translations,
    setDarkMode,
    setStandbyMode,
    setBrightness,
    setLanguage,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
