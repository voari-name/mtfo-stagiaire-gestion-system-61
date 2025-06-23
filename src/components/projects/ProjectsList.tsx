
import React from "react";
import { ProjectWithDetails } from "@/hooks/useSupabaseProjects";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectsListProps {
  projects: ProjectWithDetails[];
  calculateProgress: (tasks: any[]) => number;
  onViewDetails: (project: ProjectWithDetails) => void;
  onDeleteProject?: (id: string) => void;
  onEditProject?: (project: ProjectWithDetails) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ 
  projects, 
  calculateProgress, 
  onViewDetails,
  onDeleteProject,
  onEditProject 
}) => {
  const { toast } = useToast();

  const handleDelete = (project: ProjectWithDetails) => {
    if (onDeleteProject) {
      onDeleteProject(project.id);
      toast({
        title: "Projet supprimé",
        description: `Le projet "${project.title}" a été supprimé avec succès.`,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (project: ProjectWithDetails) => {
    if (onEditProject) {
      onEditProject(project);
      toast({
        title: "Modification du projet",
        description: `Ouverture de l'éditeur pour le projet "${project.title}".`,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="relative group">
          <ProjectCard 
            project={project}
            progress={calculateProgress(project.tasks)}
            onViewDetails={onViewDetails}
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
            {onEditProject && (
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                onClick={() => handleEdit(project)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                </svg>
              </Button>
            )}
            {onDeleteProject && (
              <Button
                size="sm"
                variant="destructive"
                className="h-8 w-8 p-0"
                onClick={() => handleDelete(project)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
