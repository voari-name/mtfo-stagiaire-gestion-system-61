import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ProjectWithDetails } from "@/hooks/useSupabaseProjects";

interface ProjectDetailsProps {
  project: ProjectWithDetails;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  getStatusColor: (status: string) => string;
  onEditProject?: (project: ProjectWithDetails) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ 
  project, 
  open, 
  onOpenChange, 
  getStatusColor,
  onEditProject 
}) => {
  if (!project) return null;

  const handleEdit = () => {
    if (onEditProject) {
      onEditProject(project);
    }
    onOpenChange(false);
  };

  // Calculer la progression
  const completedTasks = project.tasks?.filter(task => task.status === "completed").length || 0;
  const totalTasks = project.tasks?.length || 0;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Modifier
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Informations générales</h3>
              <div className="space-y-2">
                <p><strong>Date de début:</strong> {new Date(project.start_date).toLocaleDateString('fr-FR')}</p>
                <p><strong>Date de fin:</strong> {new Date(project.end_date).toLocaleDateString('fr-FR')}</p>
                {project.description && (
                  <p><strong>Description:</strong> {project.description}</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Progression</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Progression globale</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {completedTasks} tâche(s) terminée(s) sur {totalTasks}
                </p>
              </div>
            </div>
          </div>

          {/* Stagiaires assignés */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stagiaires assignés</h3>
            {project.interns && project.interns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.interns.map((intern) => (
                  <div key={intern.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{intern.first_name} {intern.last_name}</h4>
                      <Badge variant="outline" className={
                        intern.status === 'fin' ? 'border-green-500 text-green-700 bg-green-50' : 
                        intern.status === 'en cours' ? 'border-blue-500 text-blue-700 bg-blue-50' : 
                        'border-amber-500 text-amber-700 bg-amber-50'
                      }>
                        {intern.status === 'fin' ? 'Terminé' : 
                         intern.status === 'en cours' ? 'En cours' : 'À commencer'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{intern.email}</p>
                    <p className="text-sm text-muted-foreground">{intern.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">Aucun stagiaire assigné à ce projet.</p>
            )}
          </div>

          {/* Liste des tâches */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Tâches du projet</h3>
            {project.tasks && project.tasks.length > 0 ? (
              <div className="space-y-3">
                {project.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
                      <span className="font-medium">{task.name}</span>
                    </div>
                    <Badge variant="outline">
                      {task.status === "completed" ? "Terminée" : 
                       task.status === "in-progress" ? "En cours" : "À faire"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">Aucune tâche définie pour ce projet.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetails;
