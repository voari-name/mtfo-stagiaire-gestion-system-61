
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Intern = Database['public']['Tables']['interns']['Row'];
type InternInsert = Database['public']['Tables']['interns']['Insert'];

export const useSupabaseInterns = () => {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Récupérer tous les stagiaires
  const fetchInterns = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('interns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setInterns(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des stagiaires:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les stagiaires.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Créer un nouveau stagiaire
  const createIntern = async (internData: InternInsert) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utilisateur non connecté');

      const { data, error } = await supabase
        .from('interns')
        .insert([{ ...internData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Stagiaire ajouté",
        description: `${internData.first_name} ${internData.last_name} a été ajouté avec succès.`,
      });

      // Rafraîchir la liste
      fetchInterns();
      
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du stagiaire:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le stagiaire.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Supprimer un stagiaire
  const deleteIntern = async (internId: string) => {
    try {
      const { error } = await supabase
        .from('interns')
        .delete()
        .eq('id', internId);

      if (error) throw error;

      toast({
        title: "Stagiaire supprimé",
        description: "Le stagiaire a été supprimé avec succès.",
        variant: "destructive"
      });

      // Rafraîchir la liste
      fetchInterns();
    } catch (error) {
      console.error('Erreur lors de la suppression du stagiaire:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le stagiaire.",
        variant: "destructive"
      });
    }
  };

  // Mettre à jour un stagiaire
  const updateIntern = async (internId: string, updates: Partial<InternInsert>) => {
    try {
      const { error } = await supabase
        .from('interns')
        .update(updates)
        .eq('id', internId);

      if (error) throw error;

      toast({
        title: "Stagiaire modifié",
        description: "Le stagiaire a été modifié avec succès.",
      });

      // Rafraîchir la liste
      fetchInterns();
    } catch (error) {
      console.error('Erreur lors de la modification du stagiaire:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le stagiaire.",
        variant: "destructive"
      });
    }
  };

  // Récupérer les stagiaires disponibles pour assignation
  const getAvailableInterns = () => {
    return interns.filter(intern => intern.status === 'en cours');
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  return {
    interns,
    loading,
    createIntern,
    deleteIntern,
    updateIntern,
    getAvailableInterns,
    refreshInterns: fetchInterns
  };
};
