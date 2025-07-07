
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/contexts/SettingsContext";
import { AssignmentForm } from "@/components/assignments/AssignmentForm";
import { AssignmentHeader } from "@/components/assignments/AssignmentHeader";
import { Edit, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateAssignmentPDF } from "@/utils/assignmentPdfGenerator";
import { useSupabaseAssignments, Assignment } from "@/hooks/useSupabaseAssignments";

const Assignments = () => {
  const { translations } = useSettings();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { assignments, loading, createAssignment, updateAssignment, deleteAssignment } = useSupabaseAssignments();

  // Filtrer les affectations basé sur le terme de recherche
  const filteredAssignments = assignments.filter(assignment => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      assignment.student.toLowerCase().includes(searchLower) ||
      assignment.company.toLowerCase().includes(searchLower) ||
      assignment.department.toLowerCase().includes(searchLower) ||
      assignment.supervisor.toLowerCase().includes(searchLower)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "assigned": return "Affecté";
      case "pending": return "En attente";
      case "completed": return "Terminé";
      default: return status;
    }
  };

  const handleNewAssignment = () => {
    setEditingAssignment(undefined);
    setIsFormOpen(true);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setIsFormOpen(true);
  };

  const handleDeleteAssignment = async (id: string) => {
    try {
      await deleteAssignment(id);
      toast({
        title: "Affectation supprimée",
        description: "L'affectation a été supprimée avec succès.",
        variant: "destructive"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPDF = (assignment: Assignment) => {
    try {
      generateAssignmentPDF(assignment);
      toast({
        title: "PDF généré avec succès",
        description: `L'ordre d'affectation pour ${assignment.student} a été téléchargé.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la génération du PDF.",
        variant: "destructive"
      });
    }
  };

  const handleSaveAssignment = async (assignmentData: Omit<Assignment, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      if (editingAssignment) {
        await updateAssignment(editingAssignment.id, assignmentData);
        toast({
          title: "Affectation modifiée",
          description: `L'affectation de ${assignmentData.student} a été modifiée avec succès.`,
        });
      } else {
        await createAssignment(assignmentData);
        toast({
          title: "Affectation créée",
          description: `L'affectation de ${assignmentData.student} a été créée avec succès.`,
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement.",
        variant: "destructive"
      });
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <MainLayout title={translations["Affectations"]} currentPage="assignments">
        <div>Chargement...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={translations["Affectations"]} currentPage="assignments">
      <div className="space-y-6">
        <AssignmentHeader 
          onSearch={handleSearch}
          onNewAssignment={handleNewAssignment}
        />

        {filteredAssignments.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <p className="text-gray-500">
                {searchTerm 
                  ? `Aucune affectation trouvée pour "${searchTerm}".` 
                  : "Aucune affectation trouvée. Créez une nouvelle affectation pour commencer."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{assignment.student}</CardTitle>
                      <CardDescription>{assignment.company} - {assignment.department}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(assignment.status)} text-white`}>
                      {getStatusText(assignment.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="font-medium">Encadreur: </span>
                      {assignment.supervisor}
                    </div>
                    <div>
                      <span className="font-medium">Période: </span>
                      {new Date(assignment.start_date).toLocaleDateString('fr-FR')} - {new Date(assignment.end_date).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditAssignment(assignment)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadPDF(assignment)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger PDF
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteAssignment(assignment.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <AssignmentForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveAssignment}
          assignment={editingAssignment}
        />
      </div>
    </MainLayout>
  );
};

export default Assignments;
