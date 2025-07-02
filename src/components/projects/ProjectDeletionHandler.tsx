
import { useSupabaseProjects } from "@/hooks/useSupabaseProjects";
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

interface ProjectDeletionHandlerProps {
  projectToDelete: string | null;
  onOpenChange: () => void;
  onDelete?: (projectId: string) => void;
}

export const ProjectDeletionHandler: React.FC<ProjectDeletionHandlerProps> = ({
  projectToDelete,
  onOpenChange,
  onDelete
}) => {
  const { deleteProject } = useSupabaseProjects();
  const { toast } = useToast();

  const handleDeleteProject = async (projectId: string) => {
    try {
      if (onDelete) {
        // Suppression locale pour les projets non sauvegardés en base
        onDelete(projectId);
      } else {
        // Suppression en base de données
        await deleteProject(projectId);
      }
      
      onOpenChange();
      
      toast({
        title: "Projet supprimé",
        description: "Le projet a été supprimé avec succès.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le projet.",
        variant: "destructive"
      });
    }
  };

  return (
    <AlertDialog open={!!projectToDelete} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => projectToDelete && handleDeleteProject(projectToDelete)}
            className="bg-red-600 hover:bg-red-700"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
