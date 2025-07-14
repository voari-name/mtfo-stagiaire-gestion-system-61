import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import MinistryInfoDialog from "./MinistryInfoDialog";

const HeroSection = () => {
  const [showMTEFoPInfo, setShowMTEFoPInfo] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
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
                <MinistryInfoDialog />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="relative animate-float">
            <img 
              src="/lovable-uploads/85fb290d-d5c9-45d9-a72b-b63c11346cfa.png" 
              alt="MTEFoP Header" 
              className="w-full h-auto rounded-lg shadow-lg hover-scale transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;