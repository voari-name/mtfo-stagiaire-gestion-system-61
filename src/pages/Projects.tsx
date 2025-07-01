
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import ProjectsList from "@/components/projects/ProjectsList";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { ProjectsEmptyState } from "@/components/projects/ProjectsEmptyState";
import { ProjectDeletionHandler } from "@/components/projects/ProjectDeletionHandler";
import { useProjectCreationHandler } from "@/components/projects/ProjectCreationHandler";
import { useSupabaseProjects, ProjectWithDetails } from "@/hooks/useSupabaseProjects";
import { useProjects } from "@/hooks/useProjects";

const Projects = () => {
  const { projects, loading } = useSupabaseProjects();
  const { calculateProgress, getStatusColor } = useProjects();
  const { handleProjectCreated } = useProjectCreationHandler();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectWithDetails | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const handleViewDetails = (project: ProjectWithDetails) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const handleEditProject = async (project: ProjectWithDetails) => {
    handleViewDetails(project);
  };

  // Transform projects for ProjectsList
  const transformedProjects: ProjectWithDetails[] = projects.map(project => ({
    ...project,
    tasks: [],
    startDate: project.start_date,
    endDate: project.end_date
  }));

  if (loading) {
    return (
      <MainLayout title="Gestion des projets" currentPage="projects">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Gestion des projets" currentPage="projects">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projets</h2>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M5 12h14" /><path d="M12 5v14" />
            </svg>
            Nouveau projet
          </Button>
        </div>

        {transformedProjects.length > 0 ? (
          <ProjectsList
            projects={transformedProjects}
            calculateProgress={calculateProgress}
            onViewDetails={handleViewDetails}
            onDeleteProject={(id) => setProjectToDelete(id)}
            onEditProject={handleEditProject}
          />
        ) : (
          <ProjectsEmptyState />
        )}
      </div>

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onProjectCreated={handleProjectCreated}
      />

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          getStatusColor={getStatusColor}
          onEditProject={handleEditProject}
        />
      )}

      <ProjectDeletionHandler
        projectToDelete={projectToDelete}
        onOpenChange={() => setProjectToDelete(null)}
      />
    </MainLayout>
  );
};

export default Projects;
