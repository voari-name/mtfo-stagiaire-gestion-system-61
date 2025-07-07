
import React from "react";
import { Button } from "@/components/ui/button";
import { ProjectSearchBar } from "@/components/projects/ProjectSearchBar";

interface ProjectHeaderProps {
  onSearch: (term: string) => void;
  onNewProject: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  onSearch,
  onNewProject
}) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <h2 className="text-2xl font-bold">Projets</h2>
      <div className="flex items-center gap-4 flex-1 justify-end">
        <ProjectSearchBar 
          onSearch={onSearch}
          placeholder="Rechercher un projet..."
        />
        <Button 
          className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
          onClick={onNewProject}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M5 12h14" /><path d="M12 5v14" />
          </svg>
          Nouveau projet
        </Button>
      </div>
    </div>
  );
};
