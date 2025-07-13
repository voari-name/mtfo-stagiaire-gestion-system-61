
import { useState, useEffect } from "react";
import { useSupabaseProjects, ProjectWithDetails } from "@/hooks/useSupabaseProjects";
import { useProjectCreationHandler } from "@/components/projects/ProjectCreationHandler";
import { useNotifications } from "@/contexts/NotificationContext";

export const useProjectManager = () => {
  const { projects, loading, createProject, updateProject, deleteProject } = useSupabaseProjects();
  const { addNotification } = useNotifications();
  
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectWithDetails | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Utiliser les projets de Supabase directement
  const savedProjects = projects.map(project => ({
    ...project,
    tasks: [],
    startDate: project.start_date,
    endDate: project.end_date,
    interns: project.interns || []
  }));

  const filteredProjects = savedProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.interns?.some(intern => 
      `${intern.first_name} ${intern.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleProjectFormSubmit = async (projectData: any) => {
    try {
      // Créer le projet directement en base de données
      const newProject = await createProject({
        title: projectData.title,
        start_date: projectData.start_date,
        end_date: projectData.end_date,
        description: projectData.description || null
      });

      // Assigner les stagiaires si il y en a
      if (projectData.selectedInterns && projectData.selectedInterns.length > 0 && newProject) {
        const { supabase } = await import('@/integrations/supabase/client');
        
        for (const intern of projectData.selectedInterns) {
          await supabase
            .from('project_interns')
            .insert({
              project_id: newProject.id,
              intern_id: intern.id
            });
        }
      }

      setShowForm(false);
      
      addNotification({
        title: "Projet créé",
        message: `Le projet "${projectData.title}" a été créé et enregistré avec succès`,
        type: "success"
      });

    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      addNotification({
        title: "Erreur",
        message: "Impossible de créer le projet",
        type: "error"
      });
    }
  };

  const handleEditProject = (project: ProjectWithDetails) => {
    setEditingProject(project);
    setShowForm(true);
    
    addNotification({
      title: "Modification en cours",
      message: `Modification du projet "${project.title}" en cours`,
      type: "info"
    });
  };

  const handleSaveEditedProject = async (projectData: any) => {
    if (editingProject) {
      try {
        await updateProject(editingProject.id, {
          title: projectData.title,
          start_date: projectData.start_date,
          end_date: projectData.end_date,
          description: projectData.description || null
        });

        // Gérer les stagiaires assignés
        if (projectData.selectedInterns) {
          const { supabase } = await import('@/integrations/supabase/client');
          
          // Supprimer les anciennes assignations
          await supabase
            .from('project_interns')
            .delete()
            .eq('project_id', editingProject.id);

          // Ajouter les nouvelles assignations
          for (const intern of projectData.selectedInterns) {
            await supabase
              .from('project_interns')
              .insert({
                project_id: editingProject.id,
                intern_id: intern.id
              });
          }
        }

        addNotification({
          title: "Projet modifié",
          message: `Le projet "${editingProject.title}" a été modifié avec succès`,
          type: "success"
        });
        
        setEditingProject(null);
        setShowForm(false);

      } catch (error) {
        console.error('Erreur lors de la modification:', error);
        addNotification({
          title: "Erreur",
          message: "Impossible de modifier le projet",
          type: "error"
        });
      }
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      
      addNotification({
        title: "Projet supprimé",
        message: "Le projet a été supprimé avec succès",
        type: "warning"
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      addNotification({
        title: "Erreur",
        message: "Impossible de supprimer le projet",
        type: "error"
      });
    }
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return {
    showForm,
    setShowForm,
    savedProjects,
    editingProject,
    projectToDelete,
    setProjectToDelete,
    searchTerm,
    filteredProjects,
    loading,
    handleProjectFormSubmit: editingProject ? handleSaveEditedProject : handleProjectFormSubmit,
    handleEditProject,
    handleDeleteProject,
    handleNewProject,
    handleSearch,
    addNotification
  };
};
