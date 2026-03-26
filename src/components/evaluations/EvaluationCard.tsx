
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { EvaluationType } from "@/types/evaluations";

interface EvaluationCardProps {
  evaluation: EvaluationType;
  onEdit: (evaluation: EvaluationType) => void;
  onDelete: (id: number | string) => void;
  onGeneratePdf: (id: number | string) => void;
}

const EvaluationCard = ({ evaluation, onEdit, onDelete, onGeneratePdf }: EvaluationCardProps) => {
  return (
    <Card key={evaluation.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center text-white text-lg font-bold">
                {evaluation.firstName.charAt(0)}{evaluation.lastName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{evaluation.firstName} {evaluation.lastName}</h3>
                <p className="text-sm text-muted-foreground">
                  Du {new Date(evaluation.startDate).toLocaleDateString('fr-FR')} au {new Date(evaluation.endDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Note</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">{evaluation.grade}/20</span>
                  <span className="ml-2 px-2 py-1 rounded bg-gray-100 text-xs">
                    {evaluation.grade >= 16 ? 'Excellent' : 
                     evaluation.grade >= 14 ? 'Très bien' : 
                     evaluation.grade >= 12 ? 'Bien' : 
                     evaluation.grade >= 10 ? 'Passable' : 'Insuffisant'}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Commentaire</p>
                <p className="font-medium">{evaluation.comment}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 flex flex-col justify-center space-y-3 md:w-48">
            <Button onClick={() => onGeneratePdf(evaluation.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onEdit(evaluation)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              Modifier
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action supprimera définitivement l'évaluation de {evaluation.firstName} {evaluation.lastName}.
                    Cette action ne peut pas être annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(evaluation.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationCard;
