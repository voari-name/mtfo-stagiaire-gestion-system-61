
import { useState } from "react";
import { useInterns, Intern } from "./useInterns";

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

// Sample projects data with proper task status typing
const initialProjects: Project[] = [
  {
    id: 1,
    title: "Développement Web",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    interns: [
      { id: 1, name: "Jean Rakoto", status: "en cours", completion: 65 }
    ],
    tasks: [
      { id: 1, name: "Conception de la base de données", status: "completed" },
      { id: 2, name: "Développement Frontend", status: "in-progress" },
      { id: 3, name: "Intégration API", status: "not-started" }
    ]
  },
  {
    id: 2,
    title: "Gestion de Projet",
    startDate: "2025-02-15",
    endDate: "2025-05-15",
    interns: [
      { id: 2, name: "Marie Razafy", status: "en cours", completion: 45 }
    ],
    tasks: [
      { id: 1, name: "Analyse des besoins", status: "completed" },
      { id: 2, name: "Planification", status: "completed" },
      { id: 3, name: "Suivi du projet", status: "in-progress" }
    ]
  },
  {
    id: 3,
    title: "Analyse de données",
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    interns: [
      { id: 3, name: "Hery Randriamaro", status: "fin", completion: 100 }
    ],
    tasks: [
      { id: 1, name: "Collecte des données", status: "completed" },
      { id: 2, name: "Nettoyage des données", status: "completed" },
      { id: 3, name: "Analyse et visualisation", status: "completed" }
    ]
  }
];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { getAvailableInterns } = useInterns();

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
    calculateProgress,
    getStatusColor,
    availableInterns: getAvailableInterns()
  };
};
