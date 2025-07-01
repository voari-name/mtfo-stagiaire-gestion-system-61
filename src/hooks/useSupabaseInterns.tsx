
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Intern {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  start_date: string;
  end_date: string;
  status: string;
  completion?: number;
  gender?: string;
  photo?: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

export const useSupabaseInterns = () => {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchInterns = async () => {
    if (!user) {
      setInterns([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('interns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des stagiaires:', error);
        return;
      }

      setInterns(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des stagiaires:', error);
    } finally {
      setLoading(false);
    }
  };

  const createIntern = async (internData: Omit<Intern, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      const { data, error } = await supabase
        .from('interns')
        .insert([
          {
            ...internData,
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la création du stagiaire:', error);
        throw error;
      }

      // Rafraîchir la liste des stagiaires
      await fetchInterns();
      
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du stagiaire:', error);
      throw error;
    }
  };

  const updateIntern = async (id: string, updates: Partial<Intern>) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      const { data, error } = await supabase
        .from('interns')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la mise à jour du stagiaire:', error);
        throw error;
      }

      // Rafraîchir la liste des stagiaires
      await fetchInterns();
      
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du stagiaire:', error);
      throw error;
    }
  };

  const deleteIntern = async (id: string) => {
    if (!user) {
      throw new Error('Utilisateur non connecté');
    }

    try {
      const { error } = await supabase
        .from('interns')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erreur lors de la suppression du stagiaire:', error);
        throw error;
      }

      // Rafraîchir la liste des stagiaires
      await fetchInterns();
    } catch (error) {
      console.error('Erreur lors de la suppression du stagiaire:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchInterns();
  }, [user]);

  return {
    interns,
    loading,
    createIntern,
    updateIntern,
    deleteIntern,
    refetch: fetchInterns
  };
};
