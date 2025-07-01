
import { useSupabaseProjects } from "@/hooks/useSupabaseProjects";
import { useToast } from "@/hooks/use-toast";

export const useProjectCreationHandler = () => {
  const { createProject, refetch } = useSupabaseProjects();
  const { toast } = useToast();

  const handleProjectCreated = async (projectData: any) => {
    try {
      console.log('Données du projet à créer:', projectData);
      
      const newProject = await createProject({
        title: projectData.title,
        start_date: projectData.start_date,
        end_date: projectData.end_date,
        description: projectData.description || null
      });

      console.log('Projet créé:', newProject);

      if (projectData.selectedInterns && projectData.selectedInterns.length > 0 && newProject) {
        console.log('Assignation des stagiaires:', projectData.selectedInterns);
        
        const { supabase } = await import('@/integrations/supabase/client');
        
        for (const intern of projectData.selectedInterns) {
          const { error: assignError } = await supabase
            .from('project_interns')
            .insert({
              project_id: newProject.id,
              intern_id: intern.id
            });

          if (assignError) {
            console.error('Erreur lors de l\'assignation du stagiaire:', assignError);
            throw assignError;
          }
        }
      }

      await refetch();

      toast({
        title: "Projet créé avec succès",
        description: `Le projet "${projectData.title}" a été créé et enregistré.`,
      });

    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le projet.",
        variant: "destructive"
      });
    }
  };

  return { handleProjectCreated };
};
