
import React from "react";
import { Button } from "@/components/ui/button";
import { AssignmentSearchBar } from "@/components/assignments/AssignmentSearchBar";

interface AssignmentHeaderProps {
  onSearch: (term: string) => void;
  onNewAssignment: () => void;
}

export const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({
  onSearch,
  onNewAssignment
}) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <h1 className="text-2xl font-bold text-blue-800">Gestion des affectations</h1>
      <div className="flex items-center gap-4 flex-1 justify-end">
        <AssignmentSearchBar 
          onSearch={onSearch}
          placeholder="Rechercher une affectation..."
        />
        <Button 
          className="bg-blue-800 hover:bg-blue-900 whitespace-nowrap" 
          onClick={onNewAssignment}
        >
          Nouvelle affectation
        </Button>
      </div>
    </div>
  );
};
