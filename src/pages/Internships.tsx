
import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PhotoUpload } from "@/components/ui/photo-upload";
import { Edit, Trash2 } from "lucide-react";
import { useSupabaseInterns } from "@/hooks/useSupabaseInterns";

const Internships = () => {
  const {
    interns,
    loading,
    createIntern,
    deleteIntern,
    updateIntern
  } = useSupabaseInterns();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    photo: "",
    gender: "",
    title: "",
    start_date: "",
    end_date: "",
    status: "en cours"
  });
  const [editingIntern, setEditingIntern] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (photo) => {
    setFormData({ ...formData, photo: photo || "" });
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      photo: "",
      gender: "",
      title: "",
      start_date: "",
      end_date: "",
      status: "en cours"
    });
    setEditingIntern(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validation des champs requis
    if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.email.trim() || 
        !formData.gender || !formData.title.trim() || !formData.start_date || !formData.end_date) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      if (editingIntern) {
        await updateIntern(editingIntern.id, formData);
      } else {
        await createIntern(formData);
      }
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
  };

  const handleCancel = () => {
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEditIntern = (intern) => {
    setEditingIntern(intern);
    setFormData({
      first_name: intern.first_name,
      last_name: intern.last_name,
      email: intern.email,
      photo: intern.photo || "",
      gender: intern.gender,
      title: intern.title,
      start_date: intern.start_date,
      end_date: intern.end_date,
      status: intern.status
    });
    setIsDialogOpen(true);
  };

  const handleDeleteIntern = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce stagiaire ?')) {
      try {
        await deleteIntern(id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression. Veuillez réessayer.');
      }
    }
  };

  if (loading) {
    return (
      <MainLayout title="Stagiaires" currentPage="internships">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Chargement des stagiaires...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const renderInternCard = (intern) => (
    <Card key={intern.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg font-bold overflow-hidden shadow-lg">
                {intern.photo ? (
                  <img src={intern.photo} alt={`${intern.first_name} ${intern.last_name}`} className="w-full h-full object-cover" />
                ) : (
                  `${intern.first_name.charAt(0)}${intern.last_name.charAt(0)}`
                )}
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-800">{intern.first_name} {intern.last_name}</h3>
                <p className="text-sm text-blue-600 font-medium">{intern.email}</p>
                <p className="text-sm text-gray-600">{intern.title}</p>
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg" onClick={() => setIsDialogOpen(true)}>
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
              <form onSubmit={handleSave} className="grid gap-6 py-6">
                <div className="flex justify-center">
                  <div className="text-center">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Photo</Label>
                    <PhotoUpload onPhotoChange={handlePhotoChange} currentPhoto={formData.photo} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">Nom *</Label>
                    <Input 
                      id="last_name" 
                      name="last_name" 
                      value={formData.last_name} 
                      onChange={handleInputChange} 
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Entrez le nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">Prénom *</Label>
                    <Input 
                      id="first_name" 
                      name="first_name" 
                      value={formData.first_name} 
                      onChange={handleInputChange} 
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Entrez le prénom"
                    />
                  </div>
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">Titre du stage *</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange} 
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Développement Web, Gestion..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date" className="text-sm font-medium text-gray-700">Date de début *</Label>
                    <Input 
                      id="start_date" 
                      name="start_date" 
                      type="date"
                      value={formData.start_date} 
                      onChange={handleInputChange} 
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date" className="text-sm font-medium text-gray-700">Date de fin *</Label>
                    <Input 
                      id="end_date" 
                      name="end_date" 
                      type="date"
                      value={formData.end_date} 
                      onChange={handleInputChange} 
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={handleCancel} className="px-6">
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
                    Enregistrer
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {interns.length > 0 ? (
            interns.map(renderInternCard)
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun stagiaire trouvé. Ajoutez votre premier stagiaire.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Internships;
