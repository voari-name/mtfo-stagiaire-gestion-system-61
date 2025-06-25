
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettings } from "@/contexts/SettingsContext";
import ProfilePhotoUpload from "@/components/profile/ProfilePhotoUpload";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";

const Profile = () => {
  const { translations } = useSettings();
  const [profilePhoto, setProfilePhoto] = useState("/lovable-uploads/d23d8c4c-1324-4c58-9904-d37fd7d53be4.png");

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
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
