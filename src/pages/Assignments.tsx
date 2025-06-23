
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/contexts/SettingsContext";
import { AssignmentForm } from "@/components/assignments/AssignmentForm";
import { Edit, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateAssignmentPDF } from "@/utils/assignmentPdfGenerator";

interface Assignment {
  id: number;
  student: string;
  supervisor: string;
  company: string;
  department: string;
  status: string;
  startDate: string;
  endDate: string;
}

const Assignments = () => {
  const { translations } = useSettings();
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | undefined>();

  const [assignments, setAssignments] = useState<Assignment[]>([]);

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

  const handleDeleteAssignment = (id: number) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
    toast({
      title: "Affectation supprimée",
      description: "L'affectation a été supprimée avec succès.",
      variant: "destructive"
    });
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

  const handleSaveAssignment = (assignment: Assignment) => {
    if (editingAssignment) {
      setAssignments(assignments.map(a => a.id === assignment.id ? assignment : a));
    } else {
      setAssignments([...assignments, assignment]);
    }
  };

  return (
    <MainLayout title={translations["Affectations"]} currentPage="assignments">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">{translations["Gestion des affectations"]}</h1>
          <Button className="bg-blue-800 hover:bg-blue-900" onClick={handleNewAssignment}>
            Nouvelle affectation
          </Button>
        </div>

        {assignments.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <p className="text-gray-500">Aucune affectation trouvée. Créez une nouvelle affectation pour commencer.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {assignments.map((assignment) => (
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
                      {assignment.startDate} - {assignment.endDate}
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
