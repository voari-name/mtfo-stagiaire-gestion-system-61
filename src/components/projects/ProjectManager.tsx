
import React from "react";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { ProjectsEmptyState } from "@/components/projects/ProjectsEmptyState";
import { ProjectDeletionHandler } from "@/components/projects/ProjectDeletionHandler";
import { ProjectsLoading } from "@/components/projects/ProjectsLoading";
import { PendingProjectDisplay } from "@/components/projects/PendingProjectDisplay";
import { useProjectManager } from "@/hooks/useProjectManager";

export const ProjectManager = () => {
  const {
    showForm,
    setShowForm,
    savedProjects,
    editingProject,
    projectToDelete,
    setProjectToDelete,
    searchTerm,
    filteredProjects,
    loading,
    handleProjectFormSubmit,
    handleEditProject,
    handleDeleteProject,
    handleNewProject,
    handleSearch,
    addNotification
  } = useProjectManager();

  if (loading) {
    return <ProjectsLoading />;
  }

  return (
    <div className="space-y-6">
      <ProjectHeader 
        onSearch={handleSearch}
        onNewProject={handleNewProject}
      />

      <ProjectForm
        showForm={showForm}
        onFormClose={() => setShowForm(false)}
        onProjectCreated={handleProjectFormSubmit}
        editingProject={editingProject}
        pendingProject={editingProject ? {
          title: editingProject.title,
          start_date: editingProject.start_date,
          end_date: editingProject.end_date,
          description: editingProject.description,
          selectedInterns: editingProject.interns || []
        } : null}
      />

      {/* Afficher les projets sauvegardés avec boutons modifier/supprimer */}
      {savedProjects.length > 0 && !showForm && (
        <div className="space-y-4">
          {savedProjects.map((project) => (
            <PendingProjectDisplay
              key={project.id}
              projectData={{
                title: project.title,
                start_date: project.start_date,
                end_date: project.end_date,
                description: project.description,
                selectedInterns: project.interns || []
              }}
              onSave={() => {}}
              isEditing={false}
              showActions={true}
              onEdit={() => handleEditProject(project)}
              onDelete={() => setProjectToDelete(project.id)}
            />
          ))}
        </div>
      )}

      {savedProjects.length === 0 && !showForm && (
        <ProjectsEmptyState />
      )}

      <ProjectDeletionHandler
        projectToDelete={projectToDelete}
        onOpenChange={() => setProjectToDelete(null)}
        onDelete={handleDeleteProject}
      />
    </div>
  );
};
