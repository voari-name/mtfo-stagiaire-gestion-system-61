
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Intern {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  start_date: string;
  end_date: string;
  gender?: string;
  photo?: string;
  title: string;
  user_id?: string;
}

export const useSupabaseInterns = () => {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchInterns = async () => {
    try {
      setLoading(true);
      console.log('Fetching interns...');
      
      const { data, error } = await supabase
        .from('interns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching interns:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les stagiaires.",
          variant: "destructive"
        });
        return;
      }

      console.log('Interns fetched successfully:', data);
      setInterns(data || []);
    } catch (error) {
      console.error('Error fetching interns:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite lors du chargement des stagiaires.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createIntern = async (internData: Omit<Intern, 'id'>) => {
    try {
      console.log('Creating intern with data:', internData);
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('User not authenticated:', userError);
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour ajouter un stagiaire.",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('interns')
        .insert([{ ...internData, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Error creating intern:', error);
        toast({
          title: "Erreur",
          description: "Impossible de créer le stagiaire. Veuillez réessayer.",
          variant: "destructive"
        });
        throw error;
      }

      console.log('Intern created successfully:', data);
      await fetchInterns();
      return data;
    } catch (error) {
      console.error('Error in createIntern:', error);
      throw error;
    }
  };

  const updateIntern = async (id: string, internData: Partial<Intern>) => {
    try {
      console.log('Updating intern:', id, internData);
      
      const { data, error } = await supabase
        .from('interns')
        .update(internData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating intern:', error);
        toast({
          title: "Erreur",
          description: "Impossible de modifier le stagiaire. Veuillez réessayer.",
          variant: "destructive"
        });
        throw error;
      }

      console.log('Intern updated successfully:', data);
      await fetchInterns();
      return data;
    } catch (error) {
      console.error('Error in updateIntern:', error);
      throw error;
    }
  };

  const deleteIntern = async (id: string) => {
    try {
      console.log('Deleting intern:', id);
      
      const { error } = await supabase
        .from('interns')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting intern:', error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le stagiaire. Veuillez réessayer.",
          variant: "destructive"
        });
        throw error;
      }

      console.log('Intern deleted successfully');
      await fetchInterns();
    } catch (error) {
      console.error('Error in deleteIntern:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  return {
    interns,
    loading,
    createIntern,
    updateIntern,
    deleteIntern,
    refetch: fetchInterns
  };
};
