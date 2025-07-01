
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Project {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  interns?: any[];
}

export const useSupabaseProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProjects = async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          interns:project_interns(
            intern:interns(*)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des projets:', error);
        return;
      }

      // Transformer les données pour avoir un format plus simple
      const transformedProjects = data?.map(project => ({
        ...project,
        interns: project.interns?.map((pi: any) => pi.intern) || []
      })) || [];

      setProjects(transformedProjects);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            ...projectData,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la création du projet:', error);
        throw error;
      }

      // Rafraîchir la liste des projets
      await fetchProjects();
      
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      throw error;
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la mise à jour du projet:', error);
        throw error;
      }

      // Rafraîchir la liste des projets
      await fetchProjects();
      
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet:', error);
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erreur lors de la suppression du projet:', error);
        throw error;
      }

      // Rafraîchir la liste des projets
      await fetchProjects();
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects
  };
};
