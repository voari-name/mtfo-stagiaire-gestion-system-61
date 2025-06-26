
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseInterns } from "@/hooks/useSupabaseInterns";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import InternForm from "@/components/internships/InternForm";
import InternsList from "@/components/internships/InternsList";
import EditInternDialog from "@/components/internships/EditInternDialog";

const InternsContent = () => {
  const { interns, createIntern, deleteIntern, updateIntern, loading } = useSupabaseInterns();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<any>(null);
  const { toast } = useToast();

  const handleCreateIntern = async (formData: any) => {
    try {
      const internData = {
        ...formData,
        title: "Stagiaire"
      };
      
      await createIntern(internData);
      toast({
        title: "Stagiaire ajouté",
        description: "Le stagiaire a été ajouté avec succès"
      });
    } catch (error) {
      console.error('Erreur lors de la création du stagiaire:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le stagiaire",
        variant: "destructive"
      });
    }
  };

  const handleEditIntern = (intern: any) => {
    setSelectedIntern(intern);
    setIsEditDialogOpen(true);
  };

  const handleUpdateIntern = async (id: string, formData: any) => {
    try {
      await updateIntern(id, formData);
      toast({
        title: "Stagiaire modifié",
        description: "Le stagiaire a été modifié avec succès"
      });
    } catch (error) {
      console.error('Erreur lors de la modification du stagiaire:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le stagiaire",
        variant: "destructive"
      });
    }
  };

  const filteredInterns = interns.filter(intern =>
    intern.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <MainLayout title="Stagiaires" currentPage="internships">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Stagiaires" currentPage="internships">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Input
              type="text"
              placeholder="Rechercher un stagiaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <InternForm
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
              onSubmit={handleCreateIntern}
            />
          </div>
        </div>

        <InternsList 
          interns={filteredInterns}
          onDeleteIntern={deleteIntern}
          onEditIntern={handleEditIntern}
        />

        <EditInternDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          intern={selectedIntern}
          onSubmit={handleUpdateIntern}
        />
      </div>
    </MainLayout>
  );
};

const Internships = () => {
  return (
    <ProtectedRoute>
      <InternsContent />
    </ProtectedRoute>
  );
};

export default Internships;
