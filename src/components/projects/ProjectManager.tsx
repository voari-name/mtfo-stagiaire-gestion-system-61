
import React from "react";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { PendingProjectDisplay } from "@/components/projects/PendingProjectDisplay";
import { SavedProjectsList } from "@/components/projects/SavedProjectsList";
import { ProjectsEmptyState } from "@/components/projects/ProjectsEmptyState";
import { ProjectDeletionHandler } from "@/components/projects/ProjectDeletionHandler";
import { useProjectManager } from "@/hooks/useProjectManager";

export const ProjectManager = () => {
  const {
    showForm,
    setShowForm,
    pendingProject,
    savedProjects,
    editingProject,
    projectToDelete,
    setProjectToDelete,
    searchTerm,
    filteredProjects,
    handleProjectFormSubmit,
    handleSaveProject,
    handleEditProject,
    handleSaveEditedProject,
    handleDeleteProject,
    handleNewProject,
    handleSearch,
    addNotification
  } = useProjectManager();

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
        pendingProject={pendingProject}
      />

      {pendingProject && !showForm && (
        <PendingProjectDisplay
          projectData={pendingProject}
          onSave={editingProject ? handleSaveEditedProject : handleSaveProject}
          isEditing={!!editingProject}
        />
      )}

      <SavedProjectsList
        projects={filteredProjects}
        searchTerm={searchTerm}
        onEditProject={handleEditProject}
        onDeleteProject={(projectId) => setProjectToDelete(projectId)}
        onNotify={addNotification}
      />

      {savedProjects.length === 0 && !pendingProject && !showForm && (
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
