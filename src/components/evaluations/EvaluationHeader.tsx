
import React from "react";
import { EvaluationSearchBar } from "@/components/evaluations/EvaluationSearchBar";
import { CreateEvaluationDialog } from "@/components/evaluations/CreateEvaluationDialog";

interface EvaluationHeaderProps {
  onSearch: (term: string) => void;
  onEvaluationCreated: (evaluation: any) => void;
}

export const EvaluationHeader: React.FC<EvaluationHeaderProps> = ({
  onSearch,
  onEvaluationCreated
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Évaluations</h2>
      <div className="flex items-center gap-4">
        <EvaluationSearchBar 
          onSearch={onSearch}
          placeholder="Rechercher une évaluation..."
        />
        <CreateEvaluationDialog onEvaluationCreated={onEvaluationCreated} />
      </div>
    </div>
  );
};
