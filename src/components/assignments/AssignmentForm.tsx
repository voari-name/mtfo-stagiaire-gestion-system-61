
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Assignment } from "@/hooks/useSupabaseAssignments";

interface AssignmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assignment: Omit<Assignment, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => void;
  assignment?: Assignment;
}

export const AssignmentForm = ({ isOpen, onClose, onSave, assignment }: AssignmentFormProps) => {
  const [formData, setFormData] = useState({
    student: assignment?.student || "",
    supervisor: assignment?.supervisor || "",
    company: assignment?.company || "",
    department: assignment?.department || "",
    status: assignment?.status || "",
    start_date: assignment?.start_date || "",
    end_date: assignment?.end_date || ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.student || !formData.supervisor || !formData.company || !formData.department || !formData.status) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      student: "",
      supervisor: "",
      company: "",
      department: "",
      status: "",
      start_date: "",
      end_date: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {assignment ? "Modifier l'affectation" : "Nouvelle affectation"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student">Étudiant *</Label>
              <Input 
                id="student" 
                name="student" 
                value={formData.student} 
                onChange={handleInputChange} 
                placeholder="Nom de l'étudiant"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supervisor">Encadreur *</Label>
              <Input 
                id="supervisor" 
                name="supervisor" 
                value={formData.supervisor} 
                onChange={handleInputChange} 
                placeholder="Nom de l'encadreur"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise *</Label>
              <Input 
                id="company" 
                name="company" 
                value={formData.company} 
                onChange={handleInputChange} 
                placeholder="Nom de l'entreprise"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Département *</Label>
              <Input 
                id="department" 
                name="department" 
                value={formData.department} 
                onChange={handleInputChange} 
                placeholder="Département"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Statut *</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Sélectionnez un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="assigned">Affecté</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Date de début</Label>
              <Input 
                id="start_date" 
                name="start_date" 
                type="date" 
                value={formData.start_date} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">Date de fin</Label>
              <Input 
                id="end_date" 
                name="end_date" 
                type="date" 
                value={formData.end_date} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Enregistrer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
