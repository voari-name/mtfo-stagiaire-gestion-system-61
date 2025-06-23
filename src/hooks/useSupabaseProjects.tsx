
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Project = Database['public']['Tables']['projects']['Row'];
type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type Intern = Database['public']['Tables']['interns']['Row'];
type Task = Database['public']['Tables']['tasks']['Row'];

export interface ProjectWithDetails extends Project {
  interns: Intern[];
  tasks: Task[];
  // Ajouter des propriétés pour la compatibilité avec les composants existants
  startDate: string;
  endDate: string;
}

export const useSupabaseProjects = () => {
  const [projects, setProjects] = useState<ProjectWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Récupérer tous les projets avec leurs détails
  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Récupérer les projets
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      // Pour chaque projet, récupérer les stagiaires et tâches
      const projectsWithDetails = await Promise.all(
        (projectsData || []).map(async (project) => {
          // Récupérer les stagiaires assignés au projet
          const { data: projectInterns, error: internsError } = await supabase
            .from('project_interns')
            .select(`
              interns (*)
            `)
            .eq('project_id', project.id);

          if (internsError) throw internsError;

          // Récupérer les tâches du projet
          const { data: tasks, error: tasksError } = await supabase
            .from('tasks')
            .select('*')
            .eq('project_id', project.id)
            .order('created_at', { ascending: true });

          if (tasksError) throw tasksError;

          return {
            ...project,
            interns: projectInterns?.map(pi => pi.interns).filter(Boolean) || [],
            tasks: tasks || [],
            // Ajouter les propriétés de compatibilité
            startDate: project.start_date,
            endDate: project.end_date
          };
        })
      );

      setProjects(projectsWithDetails);
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les projets.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Créer un nouveau projet
  const createProject = async (projectData: ProjectInsert) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utilisateur non connecté');

      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...projectData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Projet créé",
        description: `Le projet "${projectData.title}" a été créé avec succès.`,
      });

      // Rafraîchir la liste
      fetchProjects();
      
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le projet.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Supprimer un projet
  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "Projet supprimé",
        description: "Le projet a été supprimé avec succès.",
        variant: "destructive"
      });

      // Rafraîchir la liste
      fetchProjects();
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le projet.",
        variant: "destructive"
      });
    }
  };

  // Mettre à jour un projet
  const updateProject = async (projectId: string, updates: Partial<ProjectInsert>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "Projet modifié",
        description: "Le projet a été modifié avec succès.",
      });

      // Rafraîchir la liste
      fetchProjects();
    } catch (error) {
      console.error('Erreur lors de la modification du projet:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le projet.",
        variant: "destructive"
      });
    }
  };

  // Calculer la progression d'un projet
  const calculateProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completedCount = tasks.filter(task => task.status === "completed").length;
    return Math.round((completedCount / tasks.length) * 100);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    createProject,
    deleteProject,
    updateProject,
    calculateProgress,
    refreshProjects: fetchProjects
  };
};
