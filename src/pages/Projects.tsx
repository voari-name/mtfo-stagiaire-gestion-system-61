
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import ProjectsList from "@/components/projects/ProjectsList";
import { useSupabaseProjects, ProjectWithDetails } from "@/hooks/useSupabaseProjects";

const Projects = () => {
  const {
    projects,
    loading,
    createProject,
    deleteProject,
    updateProject,
    calculateProgress
  } = useSupabaseProjects();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectWithDetails | null>(null);

  const handleViewDetails = (project: ProjectWithDetails) => {
    setSelectedProject(project);
  };

  const handleEditProject = (project: ProjectWithDetails) => {
    // Pour l'instant, on ouvre juste les détails
    handleViewDetails(project);
  };

  return (
    <MainLayout title="Gestion des projets" currentPage="projects">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projets</h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Chargement des projets...</p>
          </div>
        ) : projects.length > 0 ? (
          <ProjectsList
            projects={projects}
            calculateProgress={calculateProgress}
            onViewDetails={handleViewDetails}
            onDeleteProject={deleteProject}
            onEditProject={handleEditProject}
          />
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Créer un nouveau projet</h3>
              <p className="text-gray-500 mb-4">
                Utilisez le formulaire pour créer et gérer vos projets.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                Créer un projet
              </Button>
            </div>
          </div>
        )}
      </div>

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onProjectCreated={createProject}
      />
    </MainLayout>
  );
};

export default Projects;
