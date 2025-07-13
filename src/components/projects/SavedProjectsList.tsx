
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { ProjectWithDetails } from "@/hooks/useSupabaseProjects";
import { useProjects } from "@/hooks/useProjects";

interface SavedProjectsListProps {
  projects: ProjectWithDetails[];
  searchTerm: string;
  onEditProject: (project: ProjectWithDetails) => void;
  onDeleteProject: (projectId: string) => void;
  onNotify: (notification: any) => void;
}

export const SavedProjectsList: React.FC<SavedProjectsListProps> = ({
  projects,
  searchTerm,
  onEditProject,
  onDeleteProject,
  onNotify
}) => {
  const { calculateProgress } = useProjects();

  if (projects.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Projets enregistrés</h3>
        {searchTerm && (
          <p className="text-sm text-gray-500">
            {projects.length} résultat{projects.length > 1 ? 's' : ''} pour "{searchTerm}"
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <Badge variant="default">
                  En cours
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Période</p>
                  <p className="font-medium">
                    {new Date(project.start_date).toLocaleDateString('fr-FR')} au {new Date(project.end_date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Progression</span>
                    <span className="text-sm font-medium">{calculateProgress(project.tasks)}%</span>
                  </div>
                  <Progress value={calculateProgress(project.tasks)} className="h-2" />
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Stagiaires assignés</p>
                  {project.interns && project.interns.length > 0 ? (
                    <div className="space-y-2">
                      {project.interns.map((intern, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{intern.first_name} {intern.last_name}</span>
                          <Badge variant="outline">En cours</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Aucun stagiaire assigné</p>
                  )}
                </div>
                
                <div className="flex justify-between gap-2 pt-4 border-t">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEditProject(project)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    Modifier
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDeleteProject(project.id)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {searchTerm && projects.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucun projet trouvé pour "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};
