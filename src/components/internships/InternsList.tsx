
import React from "react";
import InternCard from "./InternCard";

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
}

interface InternsListProps {
  interns: Intern[];
  onDeleteIntern: (id: string) => void;
  onEditIntern?: (intern: Intern) => void;
}

const InternsList: React.FC<InternsListProps> = ({ interns, onDeleteIntern, onEditIntern }) => {
  if (interns.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun stagiaire trouvé.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {interns.map((intern) => (
        <InternCard 
          key={intern.id} 
          intern={intern} 
          onDelete={onDeleteIntern} 
          onEdit={onEditIntern}
        />
      ))}
    </div>
  );
};

export default InternsList;
