
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AssignmentSearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export const AssignmentSearchBar: React.FC<AssignmentSearchBarProps> = ({
  onSearch,
  placeholder = "Rechercher une affectation..."
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-10 w-64"
      />
    </div>
  );
};
