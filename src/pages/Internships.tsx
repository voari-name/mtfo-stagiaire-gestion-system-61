
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhotoUpload } from "@/components/ui/photo-upload";
import { Edit, Trash2 } from "lucide-react";

// Updated interface without title and status
interface Intern {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
  gender: string;
}

// Sample data without title and status
const initialInterns: Intern[] = [
  { 
    id: 1, 
    firstName: "Jean", 
    lastName: "Rakoto", 
    email: "jean.rakoto@example.com",
    gender: "masculin"
  },
  { 
    id: 2, 
    firstName: "Marie", 
    lastName: "Razafy", 
    email: "marie.razafy@example.com",
    gender: "féminin"
  },
  { 
    id: 3, 
    firstName: "Hery", 
    lastName: "Randriamaro", 
    email: "hery.r@example.com",
    gender: "masculin"
  },
];

const Internships = () => {
  const [interns, setInterns] = useState<Intern[]>(initialInterns);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
    gender: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (photo: string | null) => {
    setFormData({ ...formData, photo: photo || "" });
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      photo: "",
      gender: ""
    });
  };

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.gender) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const newIntern: Intern = {
      id: interns.length + 1,
      ...formData
    };
    
    setInterns([...interns, newIntern]);
    resetForm();
    setIsDialogOpen(false);
    
    toast({
      title: "Stagiaire ajouté",
      description: `${formData.firstName} ${formData.lastName} a été ajouté avec succès.`,
    });
  };

  const handleCancel = () => {
    resetForm();
    setIsDialogOpen(false);
  };

  const handleDeleteIntern = (id: number) => {
    setInterns(interns.filter(intern => intern.id !== id));
    toast({
      title: "Stagiaire supprimé",
      description: "Le stagiaire a été supprimé avec succès.",
      variant: "destructive"
    });
  };

  const renderInternCard = (intern: Intern) => (
    <Card key={intern.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-blue-800 flex items-center justify-center text-white text-lg font-bold overflow-hidden">
                {intern.photo ? (
                  <img src={intern.photo} alt={`${intern.firstName} ${intern.lastName}`} className="w-full h-full object-cover" />
                ) : (
                  `${intern.firstName.charAt(0)}${intern.lastName.charAt(0)}`
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">{intern.firstName} {intern.lastName}</h3>
                <p className="text-sm text-muted-foreground">{intern.email}</p>
                <p className="text-sm text-muted-foreground capitalize">{intern.gender}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 flex flex-col justify-center space-y-3 md:w-48">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteIntern(intern.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <MainLayout title="Stagiaires" currentPage="internships">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Stagiaires</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                Ajouter un stagiaire
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau stagiaire</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-center mb-4">
                  <PhotoUpload onPhotoChange={handlePhotoChange} currentPhoto={formData.photo} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Sexe *</Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={(value) => handleSelectChange("gender", value)}
                    required
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Sélectionnez le sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculin">Masculin</SelectItem>
                      <SelectItem value="féminin">Féminin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
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
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  Annuler
                </Button>
                <Button onClick={handleSave}>
                  Enregistrer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          {interns.map(renderInternCard)}
        </div>
      </div>
    </MainLayout>
  );
};

export default Internships;
