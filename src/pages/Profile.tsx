
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/contexts/SettingsContext";
import ProfilePhotoUpload from "@/components/profile/ProfilePhotoUpload";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";

const Profile = () => {
  const { 
    darkMode, 
    brightness, 
    language, 
    setDarkMode, 
    setBrightness, 
    setLanguage,
    translations 
  } = useSettings();

  const [profilePhoto, setProfilePhoto] = useState("/lovable-uploads/d23d8c4c-1324-4c58-9904-d37fd7d53be4.png");

  const languages = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "mg", label: "Malagasy" }
  ];

  return (
    <MainLayout title={translations["Mon profil"]} currentPage="profile" username="RAHAJANIAINA Olivier">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        <div className="md:col-span-1">
          <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-800 dark:text-blue-400">{translations["Photo de profil"]}</CardTitle>
              <CardDescription>Cette photo sera visible par les autres utilisateurs</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfilePhotoUpload 
                currentPhoto={profilePhoto}
                onPhotoChange={setProfilePhoto}
              />
              <div className="text-center mt-4">
                <h3 className="font-medium">RAHAJANIAINA Olivier</h3>
                <p className="text-sm text-muted-foreground">Administrateur</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-400">{translations["Informations personnelles"]}</CardTitle>
              <CardDescription>Gérez vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent>
              <PersonalInfoForm />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-400">{translations["Préférences d'affichage"]}</CardTitle>
              <CardDescription>Gérez l'apparence de l'application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">{translations["Mode sombre"]}</Label>
                  <Switch 
                    id="darkMode" 
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
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
                
                <div className="space-y-2">
                  <Label htmlFor="language">{translations["Langue de l'application"]}</Label>
                  <Select 
                    value={language} 
                    onValueChange={setLanguage}
                  >
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
