
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ProfilePhotoUploadProps {
  currentPhoto: string;
  onPhotoChange: (newPhoto: string) => void;
}

const ProfilePhotoUpload = ({ currentPhoto, onPhotoChange }: ProfilePhotoUploadProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(filePath);

      // Add cache buster
      const photoUrl = `${publicUrl}?t=${Date.now()}`;

      // Update profile in database
      await supabase
        .from('profiles')
        .update({ photo_url: photoUrl })
        .eq('user_id', user.id);

      onPhotoChange(photoUrl);
      setIsEditing(false);
      toast({
        title: "Photo mise à jour",
        description: "Votre photo de profil a été changée avec succès.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de télécharger la photo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <img
          src={currentPhoto}
          alt="Profile Photo"
          className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg hover-scale transition-all duration-300"
        />
        <Button
          size="sm"
          className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 hover-scale transition-all duration-300"
          onClick={() => setIsEditing(!isEditing)}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
          <span className="sr-only">Edit</span>
        </Button>
      </div>
      
      {isEditing && (
        <div className="space-y-2">
          <Label htmlFor="photo-upload">Sélectionner une nouvelle photo</Label>
          <Input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
            disabled={uploading}
          />
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(false)}
            className="w-full"
            disabled={uploading}
          >
            Annuler
          </Button>
        </div>
      )}
      
      {!isEditing && (
        <Button 
          variant="outline" 
          className="w-full hover-scale transition-all duration-300"
          onClick={() => setIsEditing(true)}
        >
          Changer la photo
        </Button>
      )}
    </div>
  );
};

export default ProfilePhotoUpload;
