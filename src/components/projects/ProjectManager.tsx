
import React from "react";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { ProjectsEmptyState } from "@/components/projects/ProjectsEmptyState";
import { ProjectDeletionHandler } from "@/components/projects/ProjectDeletionHandler";
import { ProjectsLoading } from "@/components/projects/ProjectsLoading";
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

      {!showForm && filteredProjects.length === 0 && (
        <ProjectsEmptyState />
      )}

      {!showForm && filteredProjects.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{project.description}</p>
              <div className="text-sm text-gray-500 mb-3">
                Du {new Date(project.startDate).toLocaleDateString()} 
                au {new Date(project.endDate).toLocaleDateString()}
              </div>
              {project.interns && project.interns.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Stagiaires assignés:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.interns.map((intern) => (
                      <span key={intern.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {intern.first_name} {intern.last_name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleEditProject(project)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Modifier
                </button>
                <button
                  onClick={() => setProjectToDelete(project.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectDeletionHandler
        projectToDelete={projectToDelete}
        onOpenChange={() => setProjectToDelete(null)}
        onDelete={handleDeleteProject}
      />
    </div>
  );
};
