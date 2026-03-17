
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/contexts/SettingsContext";

const PersonalInfoForm = () => {
  const { translations } = useSettings();

  const profileData = {
    lastName: "RAHAJANIAINA",
    firstName: "Olivier",
    email: "olivierrahajaniaina9@gmail.com",
    phone: "038 51 621 07",
    position: "Administrateur"
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input id="lastName" value={profileData.lastName} disabled className="transition-all duration-300" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input id="firstName" value={profileData.firstName} disabled className="transition-all duration-300" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={profileData.email} disabled className="transition-all duration-300" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" value={profileData.phone} disabled className="transition-all duration-300" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Poste</Label>
          <Input id="position" value={profileData.position} disabled className="transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
