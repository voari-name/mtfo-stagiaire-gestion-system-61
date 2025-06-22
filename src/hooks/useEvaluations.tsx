
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { EvaluationType } from "@/types/evaluations";
import { generateEvaluationPDF } from "@/utils/evaluationPdfGenerator";

// Sample data for evaluations without default values
const initialEvaluations = [
  {
    id: 1,
    firstName: "",
    lastName: "",
    startDate: "",
    endDate: "",
    grade: 0,
    comment: ""
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
          description: `Le certificat de stage pour ${evaluation.firstName} ${evaluation.lastName} a été téléchargé avec les logos officiels.`,
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
