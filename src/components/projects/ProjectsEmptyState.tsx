
import React from "react";

export const ProjectsEmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun projet</h3>
        <p className="text-gray-500 mb-4">
          Commencez par créer votre premier projet avec le bouton "Nouveau projet".
        </p>
      </div>
    </div>
  );
};
