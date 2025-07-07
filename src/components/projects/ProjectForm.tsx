
import React from "react";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import { ProjectWithDetails } from "@/hooks/useSupabaseProjects";

interface ProjectFormProps {
  showForm: boolean;
  onFormClose: () => void;
  onProjectCreated: (projectData: any) => void;
  editingProject: ProjectWithDetails | null;
  pendingProject: any;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  showForm,
  onFormClose,
  onProjectCreated,
  editingProject,
  pendingProject
}) => {
  if (!showForm) return null;

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">
        {editingProject ? "Modifier le projet" : "Créer un nouveau projet"}
      </h3>
      <CreateProjectDialog
        open={true}
        onOpenChange={onFormClose}
        onProjectCreated={onProjectCreated}
        editingProject={editingProject}
        initialData={pendingProject}
      />
    </div>
  );
};
