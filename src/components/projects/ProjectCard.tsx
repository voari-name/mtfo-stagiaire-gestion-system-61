
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Project } from "@/hooks/useProjects";

interface ProjectCardProps {
  project: Project;
  progress: number;
  onViewDetails: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  progress, 
  onViewDetails 
}) => {
  // Check if project has interns
  const hasInterns = project.interns && project.interns.length > 0;
  const firstIntern = hasInterns ? project.interns[0] : null;

  return (
    <Card key={project.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <Badge variant={firstIntern?.status === "fin" ? "outline" : "default"}>
            {firstIntern?.status === "fin" ? "Terminé" : "En cours"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Période</p>
            <p className="font-medium">
              {new Date(project.startDate).toLocaleDateString('fr-FR')} au {new Date(project.endDate).toLocaleDateString('fr-FR')}
            </p>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Progression</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Stagiaires assignés</p>
            {hasInterns ? (
              <div className="space-y-2">
                {project.interns.map(intern => (
                  <div key={intern.id} className="flex items-center justify-between">
                    <span className="text-sm">{intern.name}</span>
                    <Badge variant="outline" className={
                      intern.status === 'fin' ? 'border-green-500 text-green-700 bg-green-50' : 
                      intern.status === 'en cours' ? 'border-blue-500 text-blue-700 bg-blue-50' : 
                      'border-amber-500 text-amber-700 bg-amber-50'
                    }>
                      {intern.status === 'fin' ? 'Terminé' : 
                       intern.status === 'en cours' ? 'En cours' : 'À commencer'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">Aucun stagiaire assigné</p>
            )}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => onViewDetails(project)}
          >
            Voir les détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
