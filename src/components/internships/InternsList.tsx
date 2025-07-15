
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, Edit, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  onDeleteIntern: (id: string) => Promise<void>;
  onEditIntern: (intern: Intern) => void;
}

const InternsList: React.FC<InternsListProps> = ({ interns, onDeleteIntern, onEditIntern }) => {
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; intern: Intern | null }>({
    open: false,
    intern: null
  });
  const { toast } = useToast();

  const handleDeleteClick = (intern: Intern) => {
    setDeleteDialog({ open: true, intern });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.intern) {
      try {
        await onDeleteIntern(deleteDialog.intern.id);
        toast({
          title: "Stagiaire supprimé",
          description: `${deleteDialog.intern.first_name} ${deleteDialog.intern.last_name} a été supprimé avec succès.`
        });
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le stagiaire. Veuillez réessayer.",
          variant: "destructive"
        });
      }
    }
    setDeleteDialog({ open: false, intern: null });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en cours':
        return <Badge className="bg-green-100 text-green-800">En cours</Badge>;
      case 'fin':
      case 'terminé':
        return <Badge className="bg-gray-100 text-gray-800">Terminé</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (interns.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun stagiaire disponible</h3>
        <p className="text-gray-500">Ajoutez d'abord des stagiaires dans la section "Stagiaires".</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interns.map((intern) => (
          <Card key={intern.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={intern.photo} alt={`${intern.first_name} ${intern.last_name}`} />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {getInitials(intern.first_name, intern.last_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{intern.first_name} {intern.last_name}</CardTitle>
                  <p className="text-sm text-gray-600">{intern.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Statut:</span>
                  {getStatusBadge(intern.status)}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Période:</span>
                  <p className="text-sm text-gray-600">
                    Du {new Date(intern.start_date).toLocaleDateString('fr-FR')} 
                    au {new Date(intern.end_date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditIntern(intern)}
                    className="flex items-center space-x-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Modifier</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(intern)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Supprimer</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, intern: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le stagiaire {deleteDialog.intern?.first_name} {deleteDialog.intern?.last_name} ? 
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default InternsList;
