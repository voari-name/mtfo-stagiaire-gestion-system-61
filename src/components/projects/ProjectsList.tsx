
import React from "react";
import { ProjectWithDetails } from "@/hooks/useSupabaseProjects";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

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
  const handleDelete = (project: ProjectWithDetails) => {
    if (onDeleteProject) {
      onDeleteProject(project.id);
    }
  };

  const handleEdit = (project: ProjectWithDetails) => {
    if (onEditProject) {
      onEditProject(project);
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(project);
                }}
                title="Modifier"
              >
                <Edit className="h-3 w-3" />
              </Button>
            )}
            {onDeleteProject && (
              <Button
                size="sm"
                variant="destructive"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(project);
                }}
                title="Supprimer"
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
