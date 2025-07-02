
import MainLayout from "@/components/MainLayout";
import { useSupabaseProjects } from "@/hooks/useSupabaseProjects";
import { ProjectManager } from "@/components/projects/ProjectManager";
import { ProjectsLoading } from "@/components/projects/ProjectsLoading";

const Projects = () => {
  const { loading } = useSupabaseProjects();

  if (loading) {
    return (
      <MainLayout title="Gestion des projets" currentPage="projects">
        <ProjectsLoading />
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Gestion des projets" currentPage="projects">
      <ProjectManager />
    </MainLayout>
  );
};

export default Projects;
