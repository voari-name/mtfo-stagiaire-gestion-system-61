
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseInterns } from "@/hooks/useSupabaseInterns";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const InternsContent = () => {
  const { interns, createIntern, deleteIntern, updateIntern, loading } = useSupabaseInterns();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    title: "",
    gender: "",
    start_date: "",
    end_date: "",
    status: "début"
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.title || !formData.start_date || !formData.end_date) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    try {
      await createIntern(formData);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        title: "",
        gender: "",
        start_date: "",
        end_date: "",
        status: "début"
      });
      setIsCreateDialogOpen(false);
      toast({
        title: "Stagiaire ajouté",
        description: "Le stagiaire a été ajouté avec succès"
      });
    } catch (error) {
      console.error('Erreur lors de la création du stagiaire:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le stagiaire",
        variant: "destructive"
      });
    }
  };

  const filteredInterns = interns.filter(intern =>
    intern.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <MainLayout title="Stagiaires" currentPage="internships">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Stagiaires" currentPage="internships">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Input
              type="text"
              placeholder="Rechercher un stagiaire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>Ajouter un stagiaire</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Nouveau stagiaire</DialogTitle>
                  <DialogDescription>
                    Ajoutez un nouveau stagiaire en remplissant les informations ci-dessous.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">Prénom *</Label>
                      <Input
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Nom *</Label>
                      <Input
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Titre du stage *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Genre</Label>
                    <Select onValueChange={(value) => handleSelectChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homme">Homme</SelectItem>
                        <SelectItem value="femme">Femme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start_date">Date de début *</Label>
                      <Input
                        id="start_date"
                        name="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="end_date">Date de fin *</Label>
                      <Input
                        id="end_date"
                        name="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="status">Statut</Label>
                    <Select onValueChange={(value) => handleSelectChange("status", value)} defaultValue="début">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="début">Début</SelectItem>
                        <SelectItem value="en cours">En cours</SelectItem>
                        <SelectItem value="fin">Fin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">Enregistrer</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInterns.map((intern) => (
            <Card key={intern.id} className="hover:shadow-lg transition-shadow">
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
                  <p><strong>Titre:</strong> {intern.title}</p>
                  <p><strong>Période:</strong> {new Date(intern.start_date).toLocaleDateString()} - {new Date(intern.end_date).toLocaleDateString()}</p>
                  {intern.gender && <p><strong>Genre:</strong> {intern.gender}</p>}
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => deleteIntern(intern.id)}>
                      Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInterns.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucun stagiaire trouvé.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

const Internships = () => {
  return (
    <ProtectedRoute>
      <InternsContent />
    </ProtectedRoute>
  );
};

export default Internships;
