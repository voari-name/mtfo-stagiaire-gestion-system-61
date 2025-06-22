
import { useState } from "react";

export interface Intern {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  startDate: string;
  endDate: string;
  status: string;
  photo?: string;
  gender: string;
}

const initialInterns: Intern[] = [
  { 
    id: 1, 
    firstName: "Jean", 
    lastName: "Rakoto", 
    title: "Développement Web", 
    email: "jean.rakoto@example.com",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    status: "en cours",
    gender: "masculin"
  },
  { 
    id: 2, 
    firstName: "Marie", 
    lastName: "Razafy", 
    title: "Gestion de Projet", 
    email: "marie.razafy@example.com",
    startDate: "2025-02-15",
    endDate: "2025-05-15",
    status: "en cours",
    gender: "féminin"
  },
  { 
    id: 3, 
    firstName: "Hery", 
    lastName: "Randriamaro", 
    title: "Analyse de données", 
    email: "hery.r@example.com",
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    status: "fin",
    gender: "masculin"
  },
];

export const useInterns = () => {
  const [interns, setInterns] = useState<Intern[]>(initialInterns);

  const addIntern = (newIntern: Intern) => {
    setInterns(prev => [...prev, newIntern]);
  };

  const getAvailableInterns = () => {
    return interns.filter(intern => intern.status === 'en cours');
  };

  return {
    interns,
    addIntern,
    getAvailableInterns
  };
};
