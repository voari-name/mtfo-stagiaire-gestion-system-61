
import { useState } from "react";
import { ProjectWithDetails } from "@/hooks/useSupabaseProjects";
import { useProjectCreationHandler } from "@/components/projects/ProjectCreationHandler";
import { useNotifications } from "@/contexts/NotificationContext";

export const useProjectManager = () => {
  const { handleProjectCreated } = useProjectCreationHandler();
  const { addNotification } = useNotifications();
  
  const [showForm, setShowForm] = useState(false);
  const [pendingProject, setPendingProject] = useState<any>(null);
  const [savedProjects, setSavedProjects] = useState<ProjectWithDetails[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectWithDetails | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = savedProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.interns?.some(intern => 
      `${intern.first_name} ${intern.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleProjectFormSubmit = async (projectData: any) => {
    setPendingProject(projectData);
    setShowForm(false);
    
    addNotification({
      title: "Projet créé",
      message: `Le projet "${projectData.title}" est prêt à être enregistré`,
      type: "info"
    });
  };

  const handleSaveProject = async () => {
    if (pendingProject) {
      await handleProjectCreated(pendingProject);
      
      const newProject: ProjectWithDetails = {
        ...pendingProject,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: '',
        tasks: [],
        startDate: pendingProject.start_date,
        endDate: pendingProject.end_date,
        interns: pendingProject.selectedInterns || []
      };
      
      setSavedProjects(prev => [...prev, newProject]);
      setPendingProject(null);
      
      addNotification({
        title: "Projet enregistré",
        message: `Le projet "${newProject.title}" a été enregistré avec succès`,
        type: "success"
      });
    }
  };

  const handleEditProject = (project: ProjectWithDetails) => {
    setEditingProject(project);
    setPendingProject({
      title: project.title,
      start_date: project.start_date,
      end_date: project.end_date,
      description: project.description,
      selectedInterns: project.interns || []
    });
    setShowForm(true);
    
    addNotification({
      title: "Modification en cours",
      message: `Modification du projet "${project.title}" en cours`,
      type: "info"
    });
  };

  const handleSaveEditedProject = async () => {
    if (editingProject && pendingProject) {
      setSavedProjects(prev => 
        prev.map(p => 
          p.id === editingProject.id 
            ? { ...p, ...pendingProject, startDate: pendingProject.start_date, endDate: pendingProject.end_date }
            : p
        )
      );
      
      addNotification({
        title: "Projet modifié",
        message: `Le projet "${editingProject.title}" a été modifié avec succès`,
        type: "success"
      });
      
      setEditingProject(null);
      setPendingProject(null);
      setShowForm(false);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    const deletedProject = savedProjects.find(p => p.id === projectId);
    setSavedProjects(prev => prev.filter(p => p.id !== projectId));
    
    if (deletedProject) {
      addNotification({
        title: "Projet supprimé",
        message: `Le projet "${deletedProject.title}" a été supprimé`,
        type: "warning"
      });
    }
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setPendingProject(null);
    setShowForm(true);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return {
    showForm,
    setShowForm,
    pendingProject,
    savedProjects,
    editingProject,
    projectToDelete,
    setProjectToDelete,
    searchTerm,
    filteredProjects,
    handleProjectFormSubmit,
    handleSaveProject,
    handleEditProject,
    handleSaveEditedProject,
    handleDeleteProject,
    handleNewProject,
    handleSearch,
    addNotification
  };
};
