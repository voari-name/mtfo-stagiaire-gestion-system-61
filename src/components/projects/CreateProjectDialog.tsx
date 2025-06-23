
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  open,
  onOpenChange,
  onProjectCreated
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: ""
  });
  const [selectedInterns, setSelectedInterns] = useState<any[]>([]);
  const { toast } = useToast();
  const { interns } = useSupabaseInterns();

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
      const newProject = {
        title: formData.title,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date
      };

      await onProjectCreated(newProject);
      
      toast({
        title: "Projet créé",
        description: "Le nouveau projet a été créé avec succès"
      });

      setFormData({ title: "", description: "", start_date: "", end_date: "" });
      setSelectedInterns([]);
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in">
        <DialogHeader>
          <DialogTitle>Nouveau projet</DialogTitle>
          <DialogDescription>
            Créez un nouveau projet en remplissant les informations ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Titre *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="col-span-3"
                placeholder="Titre du projet"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                placeholder="Description du projet"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start_date" className="text-right">
                Date début *
              </Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end_date" className="text-right">
                Date fin *
              </Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                Stagiaires
              </Label>
              <div className="col-span-3 space-y-3">
                {availableInterns.length > 0 && (
                  <Select onValueChange={handleAddIntern}>
                    <SelectTrigger>
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
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">Créer le projet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
