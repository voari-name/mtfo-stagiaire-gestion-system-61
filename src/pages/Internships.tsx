
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PhotoUpload } from "@/components/ui/photo-upload";
import { Edit, Trash2 } from "lucide-react";

interface Intern {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
  gender: string;
}

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
  const [editingIntern, setEditingIntern] = useState<Intern | null>(null);
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
    setEditingIntern(null);
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

    if (editingIntern) {
      // Modifier un stagiaire existant
      setInterns(interns.map(intern => 
        intern.id === editingIntern.id 
          ? { ...editingIntern, ...formData }
          : intern
      ));
      toast({
        title: "Stagiaire modifié",
        description: `${formData.firstName} ${formData.lastName} a été modifié avec succès.`,
      });
    } else {
      // Ajouter un nouveau stagiaire
      const newIntern: Intern = {
        id: interns.length + 1,
        ...formData
      };
      setInterns([...interns, newIntern]);
      toast({
        title: "Stagiaire ajouté",
        description: `${formData.firstName} ${formData.lastName} a été ajouté avec succès.`,
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEditIntern = (intern: Intern) => {
    setEditingIntern(intern);
    setFormData({
      firstName: intern.firstName,
      lastName: intern.lastName,
      email: intern.email,
      photo: intern.photo || "",
      gender: intern.gender
    });
    setIsDialogOpen(true);
  };

  const handleDeleteIntern = (id: number) => {
    const deletedIntern = interns.find(intern => intern.id === id);
    setInterns(interns.filter(intern => intern.id !== id));
    toast({
      title: "Stagiaire supprimé",
      description: `${deletedIntern?.firstName} ${deletedIntern?.lastName} a été supprimé avec succès.`,
      variant: "destructive"
    });
  };

  const renderInternCard = (intern: Intern) => (
    <Card key={intern.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg font-bold overflow-hidden shadow-lg">
                {intern.photo ? (
                  <img src={intern.photo} alt={`${intern.firstName} ${intern.lastName}`} className="w-full h-full object-cover" />
                ) : (
                  `${intern.firstName.charAt(0)}${intern.lastName.charAt(0)}`
                )}
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800">{intern.firstName} {intern.lastName}</h3>
                <p className="text-sm text-blue-600 font-medium">{intern.email}</p>
                <p className="text-sm text-gray-500 capitalize mt-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {intern.gender}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 flex flex-col justify-center space-y-3 md:w-48">
            <Button 
              variant="outline" 
              className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => handleEditIntern(intern)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <Button 
              variant="destructive" 
              className="bg-red-500 hover:bg-red-600"
              onClick={() => handleDeleteIntern(intern.id)}
            >
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
          <h2 className="text-3xl font-bold text-gray-800">Stagiaires</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M5 12h14" /><path d="M12 5v14" />
                </svg>
                Ajouter un stagiaire
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-gray-800">
                  {editingIntern ? "Modifier le stagiaire" : "Ajouter un nouveau stagiaire"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                {/* Photo */}
                <div className="flex justify-center">
                  <div className="text-center">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Photo</Label>
                    <PhotoUpload onPhotoChange={handlePhotoChange} currentPhoto={formData.photo} />
                  </div>
                </div>
                
                {/* Nom et Prénom */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Nom *</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleInputChange} 
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Entrez le nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">Prénom *</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleInputChange} 
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Entrez le prénom"
                    />
                  </div>
                </div>

                {/* Sexe */}
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium text-gray-700">Sexe *</Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={(value) => handleSelectChange("gender", value)}
                    required
                  >
                    <SelectTrigger id="gender" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Sélectionnez le sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculin">Masculin</SelectItem>
                      <SelectItem value="féminin">Féminin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="exemple@email.com"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={handleCancel} className="px-6">
                  Annuler
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-6">
                  Enregistrer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {interns.map(renderInternCard)}
        </div>
      </div>
    </MainLayout>
  );
};

export default Internships;
