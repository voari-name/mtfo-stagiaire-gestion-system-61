
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useInterns } from "@/hooks/useInterns";
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
    startDate: "",
    endDate: ""
  });
  const [selectedInterns, setSelectedInterns] = useState<any[]>([]);
  const { toast } = useToast();
  const { interns } = useInterns();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.startDate || !formData.endDate) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const newProject = {
      id: Date.now(),
      title: formData.title,
      startDate: formData.startDate,
      endDate: formData.endDate,
      interns: selectedInterns.map(intern => ({
        id: intern.id,
        name: `${intern.firstName} ${intern.lastName}`,
        status: "en cours",
        completion: 0
      })),
      tasks: []
    };

    onProjectCreated(newProject);
    
    toast({
      title: "Projet créé",
      description: "Le nouveau projet a été créé avec succès"
    });

    setFormData({ title: "", startDate: "", endDate: "" });
    setSelectedInterns([]);
    onOpenChange(false);
  };

  const handleAddIntern = (internId: string) => {
    const intern = interns.find(i => i.id.toString() === internId);
    if (intern && !selectedInterns.find(i => i.id === intern.id)) {
      setSelectedInterns([...selectedInterns, intern]);
    }
  };

  const handleRemoveIntern = (internId: number) => {
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
              <Label htmlFor="startDate" className="text-right">
                Date début *
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                Date fin *
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">
                Stagiaires
              </Label>
              <div className="col-span-3 space-y-3">
                <Select onValueChange={handleAddIntern}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ajouter un stagiaire" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableInterns.map(intern => (
                      <SelectItem key={intern.id} value={intern.id.toString()}>
                        {intern.firstName} {intern.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedInterns.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedInterns.map(intern => (
                      <Badge key={intern.id} variant="secondary" className="flex items-center gap-1">
                        {intern.firstName} {intern.lastName}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleRemoveIntern(intern.id)}
                        />
                      </Badge>
                    ))}
                  </div>
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
