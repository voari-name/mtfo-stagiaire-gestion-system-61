
import { useState } from "react";

// Types
export type TaskStatus = "completed" | "in-progress" | "not-started";

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
}

export interface ProjectIntern {
  id: number;
  name: string;
  status: string;
  completion: number;
}

export interface Project {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  interns: ProjectIntern[];
  tasks: Task[];
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Function to calculate overall project progress
  const calculateProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completedCount = tasks.filter(task => task.status === "completed").length;
    return Math.round((completedCount / tasks.length) * 100);
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const addProject = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const editProject = (project: Project) => {
    // Pour l'instant, on ouvre juste les détails
    // Plus tard, on peut ajouter un dialog d'édition
    handleViewDetails(project);
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-blue-500";
      case "not-started": return "bg-gray-300";
      default: return "bg-gray-300";
    }
  };

  return {
    projects,
    selectedProject,
    isDetailsOpen,
    setIsDetailsOpen,
    handleViewDetails,
    addProject,
    deleteProject,
    editProject,
    calculateProgress,
    getStatusColor
  };
};
