
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Assignment {
  id: number;
  student: string;
  supervisor: string;
  company: string;
  department: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface AssignmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assignment: Assignment) => void;
  assignment?: Assignment;
}

export const AssignmentForm = ({ isOpen, onClose, onSave, assignment }: AssignmentFormProps) => {
  const [formData, setFormData] = useState({
    student: assignment?.student || "",
    supervisor: assignment?.supervisor || "",
    company: assignment?.company || "",
    department: assignment?.department || "",
    status: assignment?.status || "",
    startDate: assignment?.startDate || "",
    endDate: assignment?.endDate || ""
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

    const newAssignment: Assignment = {
      id: assignment?.id || Date.now(),
      ...formData
    };

    onSave(newAssignment);
    onClose();
    
    toast({
      title: assignment ? "Affectation modifiée" : "Affectation créée",
      description: `L'affectation de ${formData.student} a été ${assignment ? "modifiée" : "créée"} avec succès.`,
    });
  };

  const handleCancel = () => {
    setFormData({
      student: "",
      supervisor: "",
      company: "",
      department: "",
      status: "",
      startDate: "",
      endDate: ""
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
              <Label htmlFor="startDate">Date de début</Label>
              <Input 
                id="startDate" 
                name="startDate" 
                type="date" 
                value={formData.startDate} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input 
                id="endDate" 
                name="endDate" 
                type="date" 
                value={formData.endDate} 
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
