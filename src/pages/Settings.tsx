
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings } from "@/contexts/SettingsContext";

const Settings = () => {
  const { 
    darkMode, 
    brightness, 
    language, 
    setDarkMode, 
    setBrightness, 
    setLanguage,
    translations 
  } = useSettings();

  const languages = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "mg", label: "Malagasy" }
  ];

  return (
    <MainLayout title={translations["Paramètres"]} currentPage="settings" username="RAHAJANIAINA Olivier">
      <div className="space-y-6 animate-fade-in">
        <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-blue-800">{translations["Préférences d'affichage"]}</CardTitle>
            <CardDescription>Gérez l'apparence de l'application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mode">{translations["Mode sombre"]}</Label>
                  <Switch 
                    id="mode" 
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="brightness">{translations["Luminosité"]}</Label>
                    <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
                  </div>
                  <Slider
                    id="brightness"
                    min={10}
                    max={100}
                    step={1}
                    value={brightness}
                    onValueChange={setBrightness}
                    className="transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CardHeader>
            <CardTitle className="text-blue-800">Langue</CardTitle>
            <CardDescription>Choisissez votre langue préférée</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">{translations["Langue de l'application"]}</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full transition-all duration-300 focus:scale-105">
                  <SelectValue placeholder="Sélectionnez une langue" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Cette option modifie la langue de l'interface utilisateur. Toutes les données existantes resteront inchangées.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
