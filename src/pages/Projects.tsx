
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import { ProjectsEmptyState } from "@/components/projects/ProjectsEmptyState";
import { ProjectDeletionHandler } from "@/components/projects/ProjectDeletionHandler";
import { useProjectCreationHandler } from "@/components/projects/ProjectCreationHandler";
import { useSupabaseProjects, ProjectWithDetails } from "@/hooks/useSupabaseProjects";
import { useProjects } from "@/hooks/useProjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2, Save } from "lucide-react";

const Projects = () => {
  const { projects, loading } = useSupabaseProjects();
  const { calculateProgress, getStatusColor } = useProjects();
  const { handleProjectCreated } = useProjectCreationHandler();
  
  const [showForm, setShowForm] = useState(false);
  const [pendingProject, setPendingProject] = useState<any>(null);
  const [savedProjects, setSavedProjects] = useState<ProjectWithDetails[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectWithDetails | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const handleProjectFormSubmit = async (projectData: any) => {
    // Stocker les données en attente sans les afficher
    setPendingProject(projectData);
    setShowForm(false);
  };

  const handleSaveProject = async () => {
    if (pendingProject) {
      // Créer le projet dans la base de données
      await handleProjectCreated(pendingProject);
      
      // Transformer et ajouter aux projets sauvegardés
      const newProject: ProjectWithDetails = {
        ...pendingProject,
        id: Date.now().toString(), // ID temporaire
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: '',
        tasks: [],
        startDate: pendingProject.start_date,
        endDate: pendingProject.end_date,
        interns: pendingProject.selectedInterns || []
      };
      
      setSavedProjects(prev => [...prev, newProject]);
      setPendingProject(null);
    }
  };

  const handleEditProject = (project: ProjectWithDetails) => {
    setEditingProject(project);
    setPendingProject({
      title: project.title,
      start_date: project.start_date,
      end_date: project.end_date,
      description: project.description,
      selectedInterns: project.interns || []
    });
    setShowForm(true);
  };

  const handleSaveEditedProject = async () => {
    if (editingProject && pendingProject) {
      // Mettre à jour le projet dans la liste
      setSavedProjects(prev => 
        prev.map(p => 
          p.id === editingProject.id 
            ? { ...p, ...pendingProject, startDate: pendingProject.start_date, endDate: pendingProject.end_date }
            : p
        )
      );
      setEditingProject(null);
      setPendingProject(null);
      setShowForm(false);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    setSavedProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setPendingProject(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <MainLayout title="Gestion des projets" currentPage="projects">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Gestion des projets" currentPage="projects">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Projets</h2>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleNewProject}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M5 12h14" /><path d="M12 5v14" />
            </svg>
            Nouveau projet
          </Button>
        </div>

        {/* Formulaire conditionnel */}
        {showForm && (
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingProject ? "Modifier le projet" : "Créer un nouveau projet"}
            </h3>
            <CreateProjectDialog
              open={true}
              onOpenChange={() => setShowForm(false)}
              onProjectCreated={handleProjectFormSubmit}
              editingProject={editingProject}
              initialData={pendingProject}
            />
          </div>
        )}

        {/* Bouton d'enregistrement pour les données en attente */}
        {pendingProject && !showForm && (
          <div className="flex justify-center">
            <Button 
              onClick={editingProject ? handleSaveEditedProject : handleSaveProject}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          </div>
        )}

        {/* Affichage des projets sauvegardés */}
        {savedProjects.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Projets enregistrés</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge variant="default">
                        En cours
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Période</p>
                        <p className="font-medium">
                          {new Date(project.start_date).toLocaleDateString('fr-FR')} au {new Date(project.end_date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Progression</span>
                          <span className="text-sm font-medium">{calculateProgress(project.tasks)}%</span>
                        </div>
                        <Progress value={calculateProgress(project.tasks)} className="h-2" />
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Stagiaires assignés</p>
                        {project.interns && project.interns.length > 0 ? (
                          <div className="space-y-2">
                            {project.interns.map((intern, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm">{intern.first_name} {intern.last_name}</span>
                                <Badge variant="outline">En cours</Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">Aucun stagiaire assigné</p>
                        )}
                      </div>
                      
                      {/* Boutons d'action */}
                      <div className="flex justify-between gap-2 pt-4 border-t">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProject(project)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="h-3 w-3" />
                          🔄 Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setProjectToDelete(project.id)}
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="h-3 w-3" />
                          🗑️ Supprimer
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                        >
                          <Save className="h-3 w-3" />
                          💾 Enregistrer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* État vide si aucun projet sauvegardé */}
        {savedProjects.length === 0 && !pendingProject && !showForm && (
          <ProjectsEmptyState />
        )}
      </div>

      <ProjectDeletionHandler
        projectToDelete={projectToDelete}
        onOpenChange={() => setProjectToDelete(null)}
        onDelete={handleDeleteProject}
      />
    </MainLayout>
  );
};

export default Projects;
