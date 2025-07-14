import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSettings } from "@/contexts/SettingsContext";

const Index = () => {
  const [showMTEFoPInfo, setShowMTEFoPInfo] = useState(false);
  const { translations } = useSettings();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Header with MTFoP Banner */}
      <div className="w-full bg-gradient-to-r from-red-600 via-white to-green-600 p-4 shadow-md animate-fade-in">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gold animate-slide-in-left">
            <p className="text-sm text-gold font-semibold">REPOBLIKAN'I MADAGASIKARA</p>
            <p className="text-sm text-gold font-light">Fitiavana - Tanindrazana - Fandrosoana</p>
          </div>
          <div className="flex justify-center my-4 md:my-0 animate-bounce-slow">
            <img 
              src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
              alt="MTFoP Logo" 
              className="h-24 w-auto hover-scale transition-transform duration-300 animate-pulse-slow"
            />
          </div>
          <div className="text-right animate-slide-in-right">
            <p className="text-md font-semibold text-green-800">Ministère du Travail, de l'Emploi</p>
            <p className="text-md font-semibold text-green-800">et de la Fonction Publique</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 animate-fade-in-up">
            <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-400 mb-6 animate-slide-in-right animate-gradient-text">Système de Gestion des Stagiaires</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Bienvenue sur la plateforme de gestion des stagiaires et des projets du Ministère du Travail, 
              de l'Emploi et de la Fonction Publique de Madagascar.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Cette plateforme permet de gérer efficacement les stages, les évaluations et les projets
              au sein de notre ministère.
            </p>
            <div className="flex space-x-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <Button 
                onClick={handleLogin}
                className="bg-blue-800 hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-2 rounded-md hover-scale transition-all duration-300 animate-pulse-button"
              >
                Se connecter
              </Button>
              <Dialog open={showMTEFoPInfo} onOpenChange={setShowMTEFoPInfo}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-blue-800 text-blue-800 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 hover-scale transition-all duration-300">
                    En savoir plus
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto animate-scale-in">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-900 dark:text-blue-400">Ministère du Travail, de l'Emploi et de la Fonction Publique (MTEFoP)</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <Card className="animate-fade-in">
                      <CardHeader>
                        <CardTitle className="text-blue-800">1. Historique</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Créé après l'indépendance, le MTEFoP est chargé de la mise en œuvre de la politique gouvernementale en matière de Fonction Publique, d'Emploi, de Travail, de Formation professionnelle et de Lois sociales.</p>
                      </CardContent>
                    </Card>

                    <Card className="animate-fade-in" style={{animationDelay: '0.2s'}}>
                      <CardHeader>
                        <CardTitle className="text-blue-800">2. Missions principales</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Élaborer et appliquer la politique nationale dans les domaines du travail, de l'emploi et de la fonction publique.</li>
                          <li>Garantir les droits fondamentaux des travailleurs et renforcer leur sécurité sociale.</li>
                          <li>Réformer et moderniser la Fonction Publique pour plus d'efficacité.</li>
                          <li>Favoriser l'employabilité des jeunes, des personnes vulnérables et la professionnalisation des métiers.</li>
                          <li>Contrôler le respect des lois en matière de gestion des ressources humaines de l'État.</li>
                          <li>Renforcer la formation continue et les capacités des agents publics.</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="animate-fade-in" style={{animationDelay: '0.4s'}}>
                      <CardHeader>
                        <CardTitle className="text-blue-800">3. Organisation administrative</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Le Ministre dirige la politique générale du ministère.</li>
                          <li>Le Secrétariat Général coordonne l'ensemble des directions centrales et régionales.</li>
                          <li>Le Cabinet du Ministre conseille et appuie politiquement le Ministre.</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="animate-fade-in" style={{animationDelay: '0.6s'}}>
                      <CardHeader>
                        <CardTitle className="text-blue-800">4. Grandes Directions Générales</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                          <li><strong>Direction Générale du Travail :</strong> gère la législation du travail, la sécurité sociale, le travail décent et la migration professionnelle.</li>
                          <li><strong>Direction Générale de la Fonction Publique :</strong> supervise la gestion des ressources humaines de l'État, l'éthique, la formation et les réformes.</li>
                          <li><strong>Direction Générale de la Promotion de l'Emploi :</strong> développe l'insertion professionnelle, la formation continue et l'auto-emploi.</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="animate-fade-in" style={{animationDelay: '0.8s'}}>
                      <CardHeader>
                        <CardTitle className="text-blue-800">5. Établissements sous tutelle</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                          <li>ENAM (École Nationale d'Administration de Madagascar)</li>
                          <li>INFA (Institut National de Formation Administrative)</li>
                          <li>CNaPS (Caisse Nationale de Prévoyance Sociale)</li>
                          <li>INTra (Institut National du Travail)</li>
                          <li>ONEF (Office National de l'Emploi et de la Formation)</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <div className="relative animate-float">
              <img 
                src="/lovable-uploads/85fb290d-d5c9-45d9-a72b-b63c11346cfa.png" 
                alt="MTFoP Header" 
                className="w-full h-auto rounded-lg shadow-lg hover-scale transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Section with Enhanced Madagascar Emblem */}
      <div className="bg-gray-100 dark:bg-card py-12 animate-fade-in">
        <div className="container mx-auto px-4">
          {/* Enhanced Madagascar Emblem positioned above À propos */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <div className="relative animate-float">
                <img 
                  src="/lovable-uploads/00f9c523-711b-4306-a064-0c9681e407f3.png" 
                  alt="République de Madagascar" 
                  className="h-40 w-auto hover-scale transition-transform duration-500 animate-glow shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-xl animate-pulse-slow"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-400 mb-4 animate-gradient-text">République de Madagascar</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 animate-fade-in" style={{animationDelay: '0.2s'}}>Fitiavana - Tanindrazana - Fandrosoana</p>
          </div>

          <h2 className="text-2xl font-bold text-center text-blue-900 dark:text-blue-400 mb-8 animate-fade-in">À propos du MTFoP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in-up hover:bg-gradient-to-br hover:from-blue-50 hover:to-white dark:hover:from-blue-950 dark:hover:to-card">
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3">Notre Mission</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Le Ministère du Travail, de l'Emploi et de la Fonction Publique œuvre pour l'amélioration 
                des conditions de travail et la promotion de l'emploi à Madagascar.
              </p>
            </div>
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in-up hover:bg-gradient-to-br hover:from-green-50 hover:to-white dark:hover:from-green-950 dark:hover:to-card" style={{animationDelay: '0.2s'}}>
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3">Nos Services</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Nous offrons divers services pour les employeurs, les employés et les stagiaires, 
                incluant des programmes de formation et d'insertion professionnelle.
              </p>
            </div>
            <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in-up hover:bg-gradient-to-br hover:from-red-50 hover:to-white dark:hover:from-red-950 dark:hover:to-card" style={{animationDelay: '0.4s'}}>
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3">Nos Valeurs</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Intégrité, professionnalisme, transparence et engagement envers le développement 
                du capital humain de Madagascar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 dark:bg-gray-900 text-white py-6 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© 2025 MTEFoP - Tous droits réservés</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline transition-all duration-300 hover:text-gold">Mentions légales</a>
              <a href="#" className="hover:underline transition-all duration-300 hover:text-gold">Politique de confidentialité</a>
              <a href="/contact" className="hover:underline transition-all duration-300 hover:text-gold">
                Contact: 038 51 621 07
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
