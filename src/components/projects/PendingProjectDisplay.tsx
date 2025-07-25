
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Save, Edit, Trash2 } from "lucide-react";

interface PendingProjectDisplayProps {
  projectData: any;
  onSave: () => void;
  isEditing?: boolean;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const PendingProjectDisplay: React.FC<PendingProjectDisplayProps> = ({ 
  projectData, 
  onSave, 
  isEditing = false,
  showActions = false,
  onEdit,
  onDelete
}) => {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-blue-800">
            {isEditing ? "Modifications en cours" : showActions ? "Projet enregistré" : "Nouveau projet en attente"}
          </CardTitle>
          <Badge variant="outline" className="border-blue-300 text-blue-700">
            {showActions ? "Enregistré" : "En attente"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-blue-700">Titre</p>
          <p className="text-blue-900">{projectData.title}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-blue-700">Date de début</p>
            <p className="text-blue-900">
              {new Date(projectData.start_date).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700">Date de fin</p>
            <p className="text-blue-900">
              {new Date(projectData.end_date).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
        
        {projectData.selectedInterns && projectData.selectedInterns.length > 0 && (
          <div>
            <p className="text-sm font-medium text-blue-700 mb-2">Stagiaires assignés</p>
            <div className="flex flex-wrap gap-2">
              {projectData.selectedInterns.map((intern: any, index: number) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  {intern.first_name} {intern.last_name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-center gap-3 pt-4">
          {showActions ? (
            <>
              <Button 
                onClick={onEdit}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-100 px-6"
              >
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </Button>
              <Button 
                onClick={onDelete}
                variant="destructive"
                className="px-6"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </>
          ) : (
            <Button 
              onClick={onSave}
              className="bg-green-600 hover:bg-green-700 px-6"
            >
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Confirmer les modifications" : "Enregistrer le projet"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
