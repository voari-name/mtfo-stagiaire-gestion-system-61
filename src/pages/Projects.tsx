
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import { useSupabaseProjects } from "@/hooks/useSupabaseProjects";

const Projects = () => {
  const { createProject } = useSupabaseProjects();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createdProject, setCreatedProject] = useState<any>(null);

  const handleProjectCreated = async (projectData: any) => {
    try {
      const newProject = await createProject(projectData);
      // Stocker le projet créé pour l'affichage
      setCreatedProject({
        ...projectData,
        id: newProject?.id || Date.now().toString()
      });
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
    }
  };

  return (
    <MainLayout title="Gestion des projets" currentPage="projects">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projets</h2>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M5 12h14" /><path d="M12 5v14" />
            </svg>
            Nouveau projet
          </Button>
        </div>

        {createdProject ? (
          <Card className="max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{createdProject.title}</CardTitle>
                <Badge variant="default" className="bg-blue-500">
                  Nouveau projet
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Période</p>
                  <p className="font-medium">
                    Du {new Date(createdProject.start_date).toLocaleDateString('fr-FR')} au {new Date(createdProject.end_date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                
                {createdProject.selectedInterns && createdProject.selectedInterns.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Stagiaires assignés</p>
                    <div className="space-y-2">
                      {createdProject.selectedInterns.map((intern: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{intern.first_name} {intern.last_name}</span>
                          <Badge variant="outline" className="border-blue-500 text-blue-700 bg-blue-50">
                            Assigné
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-green-600 font-medium">✓ Projet créé avec succès</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Gestion des projets</h3>
              <p className="text-gray-500 mb-4">
                Utilisez le bouton "Nouveau projet" pour créer votre projet. Les informations saisies s'afficheront ici.
              </p>
            </div>
          </div>
        )}
      </div>

      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onProjectCreated={handleProjectCreated}
      />
    </MainLayout>
  );
};

export default Projects;
