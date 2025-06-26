
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PhotoUpload } from "@/components/ui/photo-upload";

interface Intern {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  start_date: string;
  end_date: string;
  gender?: string;
  photo?: string;
}

interface EditInternDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intern: Intern | null;
  onSubmit: (id: string, data: any) => Promise<void>;
}

const EditInternDialog: React.FC<EditInternDialogProps> = ({ 
  open, 
  onOpenChange, 
  intern, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    photo: "",
    last_name: "",
    first_name: "",
    email: "",
    gender: "",
    start_date: "",
    end_date: "",
    status: "en cours"
  });
  const { toast } = useToast();

  useEffect(() => {
    if (intern) {
      setFormData({
        photo: intern.photo || "",
        last_name: intern.last_name,
        first_name: intern.first_name,
        email: intern.email,
        gender: intern.gender || "",
        start_date: intern.start_date,
        end_date: intern.end_date,
        status: intern.status
      });
    }
  }, [intern]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (photo: string | null) => {
    setFormData({ ...formData, photo: photo || "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.start_date || !formData.end_date || !intern) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    try {
      await onSubmit(intern.id, formData);
      onOpenChange(false);
    } catch (error) {
      console.error('Erreur lors de la modification du stagiaire:', error);
    }
  };

  if (!intern) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-blue-800">Modifier le stagiaire</DialogTitle>
          <DialogDescription className="text-gray-600">
            Modifiez les informations du stagiaire ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-2">
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label htmlFor="photo" className="text-sm font-medium text-gray-700 mb-2 block">Photo</Label>
            <PhotoUpload 
              onPhotoChange={handlePhotoChange}
              currentPhoto={formData.photo}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">Nom *</Label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">Prénom *</Label>
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender" className="text-sm font-medium text-gray-700">Genre</Label>
            <Select onValueChange={(value) => handleSelectChange("gender", value)} value={formData.gender}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Sélectionner le genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homme">Homme</SelectItem>
                <SelectItem value="femme">Femme</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="start_date" className="text-sm font-medium text-gray-700">Date de début *</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date" className="text-sm font-medium text-gray-700">Date de fin *</Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-gray-700">Statut</Label>
            <Select onValueChange={(value) => handleSelectChange("status", value)} value={formData.status}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Sélectionner le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en cours">En cours</SelectItem>
                <SelectItem value="fin">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="px-6">
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInternDialog;
