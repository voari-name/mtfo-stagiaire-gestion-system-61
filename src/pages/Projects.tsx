
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import ProjectsList from "@/components/projects/ProjectsList";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { useSupabaseProjects, ProjectWithDetails } from "@/hooks/useSupabaseProjects";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Projects = () => {
  const { projects, loading, createProject, updateProject, deleteProject, refetch } = useSupabaseProjects();
  const { calculateProgress, getStatusColor } = useProjects();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectWithDetails | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const handleProjectCreated = async (projectData: any) => {
    try {
      console.log('Données du projet à créer:', projectData);
      
      const newProject = await createProject({
        title: projectData.title,
        start_date: projectData.start_date,
        end_date: projectData.end_date,
        description: projectData.description || null
      });

      console.log('Projet créé:', newProject);

      if (projectData.selectedInterns && projectData.selectedInterns.length > 0 && newProject) {
        console.log('Assignation des stagiaires:', projectData.selectedInterns);
        
        const { supabase } = await import('@/integrations/supabase/client');
        
        for (const intern of projectData.selectedInterns) {
          const { error: assignError } = await supabase
            .from('project_interns')
            .insert({
              project_id: newProject.id,
              intern_id: intern.id
            });

          if (assignError) {
            console.error('Erreur lors de l\'assignation du stagiaire:', assignError);
            throw assignError;
          }
        }
      }

      await refetch();

      toast({
        title: "Projet créé avec succès",
        description: `Le projet "${projectData.title}" a été créé et enregistré.`,
      });

    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le projet.",
        variant: "destructive"
      });
    }
  };

  const handleViewDetails = (project: ProjectWithDetails) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const handleEditProject = async (project: ProjectWithDetails) => {
    // Pour l'instant, on ouvre les détails - plus tard on peut ajouter un dialog d'édition
    handleViewDetails(project);
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjectToDelete(null);
      
      toast({
        title: "Projet supprimé",
        description: "Le projet a été supprimé avec succès.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le projet.",
        variant: "destructive"
      });
    }
  };

  // Transformer les projets pour le format attendu par ProjectsList
  const transformedProjects: ProjectWithDetails[] = projects.map(project => ({
    ...project,
    tasks: [], // Pour l'instant, pas de tâches
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
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun projet</h3>
              <p className="text-gray-500 mb-4">
                Commencez par créer votre premier projet avec le bouton "Nouveau projet".
              </p>
            </div>
          </div>
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

      <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => projectToDelete && handleDeleteProject(projectToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Projects;
