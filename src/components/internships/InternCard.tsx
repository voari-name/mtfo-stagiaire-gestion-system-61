
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Intern {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  start_date: string;
  end_date: string;
  gender?: string;
}

interface InternCardProps {
  intern: Intern;
  onDelete: (id: string) => void;
}

const InternCard: React.FC<InternCardProps> = ({ intern, onDelete }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{intern.first_name} {intern.last_name}</span>
          <Badge variant={intern.status === "fin" ? "default" : intern.status === "en cours" ? "secondary" : "outline"}>
            {intern.status}
          </Badge>
        </CardTitle>
        <CardDescription>{intern.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Période:</strong> {new Date(intern.start_date).toLocaleDateString()} - {new Date(intern.end_date).toLocaleDateString()}</p>
          {intern.gender && <p><strong>Genre:</strong> {intern.gender}</p>}
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => onDelete(intern.id)}>
              Supprimer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InternCard;
