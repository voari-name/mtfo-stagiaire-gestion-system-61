
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsList from "@/components/projects/ProjectsList";
import ProjectDetails from "@/components/projects/ProjectDetails";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
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

  const [selectedProject, setSelectedProject] = useState<ProjectWithDetails | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleViewDetails = (project: ProjectWithDetails) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const handleEditProject = (project: ProjectWithDetails) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-blue-500";
      case "not-started": return "bg-gray-300";
      default: return "bg-gray-300";
    }
  };

  if (loading) {
    return (
      <MainLayout title="Gestion des projets" currentPage="projects">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Chargement des projets...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Filter projects based on their status from the database
  const activeProjects = projects.filter(p => p.status === "en cours");
  const completedProjects = projects.filter(p => p.status === "terminé");

  return (
    <MainLayout title="Gestion des projets" currentPage="projects">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projets</h2>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M5 12h14" /><path d="M12 5v14" />
            </svg>
            Nouveau projet
          </Button>
        </div>

        {/* Message d'information quand aucun projet n'existe */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun projet créé</h3>
              <p className="text-gray-500 mb-4">
                Commencez par créer votre premier projet en cliquant sur le bouton "Nouveau projet" ci-dessus.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                Créer mon premier projet
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">Tous ({projects.length})</TabsTrigger>
              <TabsTrigger value="active">En cours ({activeProjects.length})</TabsTrigger>
              <TabsTrigger value="completed">Terminés ({completedProjects.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              <ProjectsList 
                projects={projects} 
                calculateProgress={calculateProgress}
                onViewDetails={handleViewDetails}
                onDeleteProject={deleteProject}
                onEditProject={handleEditProject}
              />
            </TabsContent>
            
            <TabsContent value="active">
              {activeProjects.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun projet en cours.</p>
                </div>
              ) : (
                <ProjectsList 
                  projects={activeProjects} 
                  calculateProgress={calculateProgress}
                  onViewDetails={handleViewDetails}
                  onDeleteProject={deleteProject}
                  onEditProject={handleEditProject}
                />
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              {completedProjects.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun projet terminé.</p>
                </div>
              ) : (
                <ProjectsList 
                  projects={completedProjects} 
                  calculateProgress={calculateProgress}
                  onViewDetails={handleViewDetails}
                  onDeleteProject={deleteProject}
                  onEditProject={handleEditProject}
                />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>

      <ProjectDetails 
        project={selectedProject} 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen} 
        getStatusColor={getStatusColor}
        onEditProject={updateProject}
      />

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onProjectCreated={createProject}
      />
    </MainLayout>
  );
};

export default Projects;
