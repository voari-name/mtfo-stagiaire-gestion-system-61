
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseInterns } from "@/hooks/useSupabaseInterns";
import { X } from "lucide-react";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreated: (project: any) => void;
  editingProject?: any;
  initialData?: any;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  open,
  onOpenChange,
  onProjectCreated,
  editingProject,
  initialData
}) => {
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: ""
  });
  const [selectedInterns, setSelectedInterns] = useState<any[]>([]);
  const { toast } = useToast();
  const { interns } = useSupabaseInterns();

  // Mettre à jour le formulaire avec les données initiales
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        start_date: initialData.start_date || "",
        end_date: initialData.end_date || ""
      });
      setSelectedInterns(initialData.selectedInterns || []);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.start_date || !formData.end_date) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    try {
      const projectData = {
        ...formData,
        selectedInterns
      };

      await onProjectCreated(projectData);
      
      toast({
        title: editingProject ? "Projet modifié" : "Projet créé",
        description: editingProject ? "Le projet a été modifié avec succès" : "Le projet est prêt à être enregistré"
      });

    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le projet.",
        variant: "destructive"
      });
    }
  };

  const handleAddIntern = (internId: string) => {
    const intern = interns.find(i => i.id === internId);
    if (intern && !selectedInterns.find(i => i.id === intern.id)) {
      setSelectedInterns([...selectedInterns, intern]);
    }
  };

  const handleRemoveIntern = (internId: string) => {
    setSelectedInterns(selectedInterns.filter(i => i.id !== internId));
  };

  const availableInterns = interns.filter(intern => 
    !selectedInterns.find(selected => selected.id === intern.id)
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 py-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Titre *
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Titre du projet"
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start_date" className="text-sm font-medium text-gray-700">
              Date début *
            </Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end_date" className="text-sm font-medium text-gray-700">
              Date fin *
            </Label>
            <Input
              id="end_date"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            Stagiaires
          </Label>
          {availableInterns.length > 0 && (
            <Select onValueChange={handleAddIntern}>
              <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Ajouter un stagiaire" />
              </SelectTrigger>
              <SelectContent>
                {availableInterns.map(intern => (
                  <SelectItem key={intern.id} value={intern.id}>
                    {intern.first_name} {intern.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {selectedInterns.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedInterns.map(intern => (
                <Badge key={intern.id} variant="secondary" className="flex items-center gap-1">
                  {intern.first_name} {intern.last_name}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveIntern(intern.id)}
                  />
                </Badge>
              ))}
            </div>
          )}
          
          {availableInterns.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Aucun stagiaire disponible. Ajoutez d'abord des stagiaires dans la section "Stagiaires".
            </p>
          )}
        </div>
      </div>
      <div className="pt-4 border-t">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
          {editingProject ? "Modifier le projet" : "Créer le projet"}
        </Button>
      </div>
    </form>
  );
};

export default CreateProjectDialog;
