
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { EvaluationType } from "@/types/evaluations";
import { generateEvaluationPDF } from "@/utils/evaluationPdfGenerator";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useEvaluations = () => {
  const [evaluations, setEvaluations] = useState<EvaluationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchEvaluations = async () => {
    if (!user) {
      setEvaluations([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('evaluations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur récupération évaluations:', error);
        return;
      }

      const mapped: EvaluationType[] = (data || []).map(e => ({
        id: e.id as any,
        dbId: e.id,
        firstName: e.first_name,
        lastName: e.last_name,
        startDate: e.start_date,
        endDate: e.end_date,
        grade: Number(e.grade),
        comment: e.comment || ""
      }));

      setEvaluations(mapped);
    } catch (error) {
      console.error('Erreur récupération évaluations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, [user]);

  const addEvaluation = async (newEvaluation: EvaluationType) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('evaluations')
        .insert({
          first_name: newEvaluation.firstName,
          last_name: newEvaluation.lastName,
          start_date: newEvaluation.startDate,
          end_date: newEvaluation.endDate,
          grade: newEvaluation.grade,
          comment: newEvaluation.comment || null,
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Erreur création évaluation:', error);
        toast({
          title: "Erreur",
          description: "Impossible de créer l'évaluation.",
          variant: "destructive"
        });
        return;
      }

      await fetchEvaluations();
    } catch (error) {
      console.error('Erreur création évaluation:', error);
    }
  };

  const handleEditEvaluation = (evaluation: EvaluationType) => {
    setCurrentEvaluation({ ...evaluation });
    setIsEditDialogOpen(true);
  };

  const handleSaveEvaluation = async () => {
    if (!currentEvaluation || !user) return;

    try {
      const evalId = (currentEvaluation as any).dbId || currentEvaluation.id;
      
      const { error } = await supabase
        .from('evaluations')
        .update({
          first_name: currentEvaluation.firstName,
          last_name: currentEvaluation.lastName,
          start_date: currentEvaluation.startDate,
          end_date: currentEvaluation.endDate,
          grade: currentEvaluation.grade,
          comment: currentEvaluation.comment || null
        })
        .eq('id', evalId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erreur mise à jour évaluation:', error);
        toast({
          title: "Erreur",
          description: "Impossible de modifier l'évaluation.",
          variant: "destructive"
        });
        return;
      }

      await fetchEvaluations();
      setIsEditDialogOpen(false);
      toast({
        title: "Évaluation mise à jour",
        description: `L'évaluation de ${currentEvaluation.firstName} ${currentEvaluation.lastName} a été modifiée.`,
      });
    } catch (error) {
      console.error('Erreur mise à jour évaluation:', error);
    }
  };

  const handleDeleteEvaluation = async (id: number | string) => {
    if (!user) return;

    const evaluation = evaluations.find(e => e.id === id);
    const evalId = evaluation ? ((evaluation as any).dbId || evaluation.id) : id;

    try {
      const { error } = await supabase
        .from('evaluations')
        .delete()
        .eq('id', evalId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erreur suppression évaluation:', error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer l'évaluation.",
          variant: "destructive"
        });
        return;
      }

      await fetchEvaluations();
      toast({
        title: "Évaluation supprimée",
        description: "L'évaluation a été supprimée avec succès.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Erreur suppression évaluation:', error);
    }
  };

  const handleGeneratePdf = (id: number | string) => {
    const evaluation = evaluations.find(e => e.id === id);
    if (evaluation) {
      try {
        generateEvaluationPDF(evaluation);
        toast({
          title: "Certificat généré avec succès",
          description: `Le certificat de stage pour ${evaluation.firstName} ${evaluation.lastName} a été téléchargé.`,
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la génération du certificat.",
          variant: "destructive"
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (currentEvaluation) {
      setCurrentEvaluation({
        ...currentEvaluation,
        [name]: name === "grade" ? parseInt(value, 10) || 0 : value
      });
    }
  };

  return {
    evaluations,
    loading,
    currentEvaluation,
    isEditDialogOpen,
    setIsEditDialogOpen,
    handleEditEvaluation,
    handleSaveEvaluation,
    handleDeleteEvaluation,
    handleGeneratePdf,
    handleInputChange,
    addEvaluation
  };
};
