
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CreateEvaluationDialogProps {
  onEvaluationCreated: (evaluation: any) => void;
}

export const CreateEvaluationDialog = ({ onEvaluationCreated }: CreateEvaluationDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    startDate: "",
    endDate: "",
    grade: "",
    gradeText: "",
    comment: ""
  });
  const { toast } = useToast();

  const gradeOptions = [
    { value: "18", label: "18/20 - Excellent", text: "Excellent" },
    { value: "19", label: "19/20 - Excellent", text: "Excellent" },
    { value: "20", label: "20/20 - Excellent", text: "Excellent" },
    { value: "16", label: "16/20 - Très bien", text: "Très bien" },
    { value: "17", label: "17/20 - Très bien", text: "Très bien" },
    { value: "14", label: "14/20 - Bien", text: "Bien" },
    { value: "15", label: "15/20 - Bien", text: "Bien" },
    { value: "12", label: "12/20 - Assez bien", text: "Assez bien" },
    { value: "13", label: "13/20 - Assez bien", text: "Assez bien" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGradeChange = (value: string) => {
    const selectedGrade = gradeOptions.find(option => option.value === value);
    setFormData({ 
      ...formData, 
      grade: value,
      gradeText: selectedGrade?.text || ""
    });
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.startDate || !formData.endDate || !formData.grade) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const newEvaluation = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      grade: parseInt(formData.grade),
      comment: formData.comment
    };

    onEvaluationCreated(newEvaluation);
    
    setFormData({
      lastName: "",
      firstName: "",
      startDate: "",
      endDate: "",
      grade: "",
      gradeText: "",
      comment: ""
    });
    
    setIsOpen(false);
    
    toast({
      title: "Évaluation créée",
      description: `L'évaluation de ${formData.firstName} ${formData.lastName} a été créée avec succès.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="hover-scale transition-all duration-300 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M5 12h14" /><path d="M12 5v14" />
          </svg>
          Créer une évaluation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-800">Nouvelle évaluation</DialogTitle>
          <DialogDescription>
            Formulaire de création d'une évaluation de stage
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom *</Label>
            <Input 
              id="lastName" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleInputChange}
              placeholder="Nom de famille"
              className="transition-all duration-300 focus:scale-105"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom *</Label>
            <Input 
              id="firstName" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleInputChange}
              placeholder="Prénom"
              className="transition-all duration-300 focus:scale-105"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Date de début *</Label>
            <Input 
              id="startDate" 
              name="startDate" 
              type="date" 
              value={formData.startDate} 
              onChange={handleInputChange}
              className="transition-all duration-300 focus:scale-105"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">Date de fin *</Label>
            <Input 
              id="endDate" 
              name="endDate" 
              type="date" 
              value={formData.endDate} 
              onChange={handleInputChange}
              className="transition-all duration-300 focus:scale-105"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade">Note sur 20 *</Label>
            <Select onValueChange={handleGradeChange}>
              <SelectTrigger className="transition-all duration-300 focus:scale-105">
                <SelectValue placeholder="Sélectionnez une note" />
              </SelectTrigger>
              <SelectContent>
                {gradeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Commentaire</Label>
            <Input 
              id="comment" 
              name="comment" 
              value={formData.comment} 
              onChange={handleInputChange}
              placeholder="Commentaire optionnel..."
              className="transition-all duration-300 focus:scale-105"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="hover-scale transition-all duration-300">
            Annuler
          </Button>
          <Button onClick={handleSubmit} className="hover-scale transition-all duration-300">
            Enregistrer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
