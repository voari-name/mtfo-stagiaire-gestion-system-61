
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import EvaluationCard from "@/components/evaluations/EvaluationCard";
import EditEvaluationDialog from "@/components/evaluations/EditEvaluationDialog";
import { EvaluationHeader } from "@/components/evaluations/EvaluationHeader";
import { useEvaluations } from "@/hooks/useEvaluations";

const Evaluations = () => {
  const {
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
  } = useEvaluations();

  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les évaluations basé sur le terme de recherche
  const filteredEvaluations = evaluations.filter(evaluation => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      evaluation.firstName.toLowerCase().includes(searchLower) ||
      evaluation.lastName.toLowerCase().includes(searchLower) ||
      evaluation.comment?.toLowerCase().includes(searchLower) ||
      evaluation.grade.toString().includes(searchLower)
    );
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <MainLayout title="Évaluations des stagiaires" currentPage="evaluations" username="RAHAJANIAINA Olivier">
      <div className="space-y-6 animate-fade-in">
        <EvaluationHeader 
          onSearch={handleSearch}
          onEvaluationCreated={addEvaluation}
        />

        {filteredEvaluations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm 
              ? `Aucune évaluation trouvée pour "${searchTerm}".` 
              : "Aucune évaluation trouvée. Créez une nouvelle évaluation pour commencer."
            }
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredEvaluations.map((evaluation, index) => (
              <div key={evaluation.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <EvaluationCard
                  evaluation={evaluation}
                  onEdit={handleEditEvaluation}
                  onDelete={handleDeleteEvaluation}
                  onGeneratePdf={handleGeneratePdf}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <EditEvaluationDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        evaluation={currentEvaluation}
        onSave={handleSaveEvaluation}
        onInputChange={handleInputChange}
      />
    </MainLayout>
  );
};

export default Evaluations;
