
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Intern {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  start_date: string;
  end_date: string;
  gender?: string;
  photo?: string;
}

interface InternCardProps {
  intern: Intern;
  onDelete: (id: string) => void;
  onEdit?: (intern: Intern) => void;
}

const InternCard: React.FC<InternCardProps> = ({ intern, onDelete, onEdit }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {intern.photo && (
              <img 
                src={intern.photo} 
                alt={`${intern.first_name} ${intern.last_name}`}
                className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
              />
            )}
            <div>
              <CardTitle className="text-lg">
                {intern.first_name} {intern.last_name}
              </CardTitle>
              <CardDescription>{intern.email}</CardDescription>
            </div>
          </div>
          <Badge variant={intern.status === "fin" ? "default" : intern.status === "en cours" ? "secondary" : "outline"}>
            {intern.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Période:</strong> {new Date(intern.start_date).toLocaleDateString()} - {new Date(intern.end_date).toLocaleDateString()}</p>
          {intern.gender && <p><strong>Genre:</strong> {intern.gender}</p>}
          <div className="flex justify-end space-x-2 mt-4">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(intern)}>
                <Edit className="h-4 w-4 mr-1" />
                Modifier
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => onDelete(intern.id)}>
              <Trash2 className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InternCard;
