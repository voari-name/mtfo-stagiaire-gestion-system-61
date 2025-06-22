
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhotoUpload } from "@/components/ui/photo-upload";
import { Edit, Trash2 } from "lucide-react";

// Updated interface to include photo and gender
interface Intern {
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

// Sample data
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

const Internships = () => {
  const [interns, setInterns] = useState<Intern[]>(initialInterns);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    startDate: "",
    endDate: "",
    status: "en cours",
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

  const handleAddIntern = () => {
    const newIntern: Intern = {
      id: interns.length + 1,
      ...formData
    };
    
    setInterns([...interns, newIntern]);
    setFormData({
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      startDate: "",
      endDate: "",
      status: "en cours",
      photo: "",
      gender: ""
    });
    
    setIsDialogOpen(false);
    toast({
      title: "Stagiaire ajouté",
      description: `${formData.firstName} ${formData.lastName} a été ajouté avec succès.`,
    });
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Intitulé du stage</p>
                <p className="font-medium">{intern.title}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Période</p>
                <p className="font-medium">
                  {new Date(intern.startDate).toLocaleDateString('fr-FR')} au {new Date(intern.endDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Statut</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                  intern.status === 'en cours' ? 'bg-blue-100 text-blue-800' :
                  intern.status === 'fin' ? 'bg-green-100 text-green-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {intern.status === 'en cours' ? 'En cours' : 
                   intern.status === 'fin' ? 'Terminé' : 'À commencer'}
                </span>
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
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau stagiaire</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-center mb-4">
                  <PhotoUpload onPhotoChange={handlePhotoChange} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Sexe</Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={(value) => handleSelectChange("gender", value)}
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
                  <Label htmlFor="title">Intitulé du stage</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Date de début</Label>
                    <Input 
                      id="startDate" 
                      name="startDate" 
                      type="date" 
                      value={formData.startDate} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Date de fin</Label>
                    <Input 
                      id="endDate" 
                      name="endDate" 
                      type="date" 
                      value={formData.endDate} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en cours">En cours</SelectItem>
                      <SelectItem value="fin">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddIntern}>Ajouter le stagiaire</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="ongoing">En cours</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {interns.map(renderInternCard)}
          </TabsContent>
          
          <TabsContent value="ongoing" className="space-y-6">
            {interns.filter(intern => intern.status === 'en cours').map(renderInternCard)}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            {interns.filter(intern => intern.status === 'fin').map(renderInternCard)}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Internships;
