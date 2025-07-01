
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Assignment {
  id: string;
  student: string;
  supervisor: string;
  company: string;
  department: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export const useSupabaseAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAssignments = async () => {
    if (!user) {
      setAssignments([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des affectations:', error);
        return;
      }

      setAssignments(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des affectations:', error);
    } finally {
      setLoading(false);
    }
  };

  const createAssignment = async (assignmentData: Omit<Assignment, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      const { data, error } = await supabase
        .from('assignments')
        .insert([
          {
            ...assignmentData,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la création de l\'affectation:', error);
        throw error;
      }

      await fetchAssignments();
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'affectation:', error);
      throw error;
    }
  };

  const updateAssignment = async (id: string, updates: Partial<Assignment>) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      const { data, error } = await supabase
        .from('assignments')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la mise à jour de l\'affectation:', error);
        throw error;
      }

      await fetchAssignments();
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'affectation:', error);
      throw error;
    }
  };

  const deleteAssignment = async (id: string) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erreur lors de la suppression de l\'affectation:', error);
        throw error;
      }

      await fetchAssignments();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'affectation:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [user]);

  return {
    assignments,
    loading,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    refetch: fetchAssignments
  };
};
