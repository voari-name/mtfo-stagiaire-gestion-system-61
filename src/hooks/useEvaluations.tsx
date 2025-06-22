
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { EvaluationType } from "@/types/evaluations";
import { generateEvaluationPDF } from "@/utils/evaluationPdfGenerator";

// Sample data for evaluations
const initialEvaluations = [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Rakoto",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    grade: 16,
    comment: "Très bon stagiaire, autonome et créatif."
  },
  {
    id: 2,
    firstName: "Marie",
    lastName: "Razafy",
    startDate: "2025-02-15",
    endDate: "2025-05-15",
    grade: 14,
    comment: "Bon travail, mais peut améliorer sa communication."
  },
  {
    id: 3,
    firstName: "Hery",
    lastName: "Randriamaro",
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    grade: 18,
    comment: "Excellent stagiaire, compétences techniques remarquables."
  }
];

export const useEvaluations = () => {
  const [evaluations, setEvaluations] = useState<EvaluationType[]>(initialEvaluations);
  const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const addEvaluation = (newEvaluation: EvaluationType) => {
    setEvaluations([...evaluations, newEvaluation]);
  };

  const handleEditEvaluation = (evaluation: EvaluationType) => {
    setCurrentEvaluation({ ...evaluation });
    setIsEditDialogOpen(true);
  };

  const handleSaveEvaluation = () => {
    if (currentEvaluation) {
      setEvaluations(evaluations.map(item => 
        item.id === currentEvaluation.id ? currentEvaluation : item
      ));
      
      setIsEditDialogOpen(false);
      toast({
        title: "Évaluation mise à jour",
        description: `L'évaluation de ${currentEvaluation.firstName} ${currentEvaluation.lastName} a été modifiée.`,
      });
    }
  };

  const handleDeleteEvaluation = (id: number) => {
    setEvaluations(evaluations.filter(item => item.id !== id));
    toast({
      title: "Évaluation supprimée",
      description: "L'évaluation a été supprimée avec succès.",
      variant: "destructive"
    });
  };

  const handleGeneratePdf = (id: number) => {
    const evaluation = evaluations.find(e => e.id === id);
    if (evaluation) {
      try {
        generateEvaluationPDF(evaluation);
        toast({
          title: "Certificat généré avec succès",
          description: `Le certificat de stage pour ${evaluation.firstName} ${evaluation.lastName} a été téléchargé avec le logo officiel.`,
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
