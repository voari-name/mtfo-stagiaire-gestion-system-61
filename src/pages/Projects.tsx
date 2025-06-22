
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsList from "@/components/projects/ProjectsList";
import ProjectDetails from "@/components/projects/ProjectDetails";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import { useProjects } from "@/hooks/useProjects";

const Projects = () => {
  const {
    projects,
    selectedProject,
    isDetailsOpen,
    setIsDetailsOpen,
    handleViewDetails,
    addProject,
    calculateProgress,
    getStatusColor,
    deleteProject,
    editProject
  } = useProjects();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="active">En cours</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <ProjectsList 
              projects={projects} 
              calculateProgress={calculateProgress}
              onViewDetails={handleViewDetails}
              onDeleteProject={deleteProject}
              onEditProject={editProject}
            />
          </TabsContent>
          
          <TabsContent value="active">
            <ProjectsList 
              projects={projects.filter(p => p.interns.some(i => i.status === "en cours"))} 
              calculateProgress={calculateProgress}
              onViewDetails={handleViewDetails}
              onDeleteProject={deleteProject}
              onEditProject={editProject}
            />
          </TabsContent>
          
          <TabsContent value="completed">
            <ProjectsList 
              projects={projects.filter(p => p.interns.every(i => i.status === "fin"))} 
              calculateProgress={calculateProgress}
              onViewDetails={handleViewDetails}
              onDeleteProject={deleteProject}
              onEditProject={editProject}
            />
          </TabsContent>
        </Tabs>
      </div>

      <ProjectDetails 
        project={selectedProject} 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen} 
        getStatusColor={getStatusColor}
      />

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onProjectCreated={addProject}
      />
    </MainLayout>
  );
};

export default Projects;
