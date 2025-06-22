
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/contexts/SettingsContext";

const Assignments = () => {
  const { translations } = useSettings();

  const assignments = [
    {
      id: 1,
      student: "RAHAJANIAINA Olivier",
      supervisor: "Dr. RANDRIAMANALINA",
      company: "Telma Madagascar",
      department: "IT",
      status: "assigned",
      startDate: "2024-07-01",
      endDate: "2024-12-31"
    },
    {
      id: 2,
      student: "RAKOTO Marie",
      supervisor: "Ing. RAZAFY",
      company: "Orange Madagascar",
      department: "Engineering",
      status: "pending",
      startDate: "2024-08-01",
      endDate: "2024-12-31"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <MainLayout title={translations["Affectations"]} currentPage="assignments">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">{translations["Gestion des affectations"]}</h1>
          <Button className="bg-blue-800 hover:bg-blue-900">
            Nouvelle affectation
          </Button>
        </div>

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
                    {assignment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Encadreur: </span>
                    {assignment.supervisor}
                  </div>
                  <div>
                    <span className="font-medium">Période: </span>
                    {assignment.startDate} - {assignment.endDate}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">Modifier</Button>
                  <Button variant="outline" size="sm">Détails</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Assignments;
