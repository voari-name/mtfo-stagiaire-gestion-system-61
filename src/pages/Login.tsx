
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check credentials (hardcoded as requested)
    if (username === "RAHAJANIAINA" && password === "Olivier") {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur la plateforme de gestion",
      });
      navigate("/profile"); // Redirection vers la page Profil
    } else if (username !== "RAHAJANIAINA") {
      setError("Nom d'utilisateur incorrect");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Banner MTFoP */}
      <div className="w-full bg-gradient-to-r from-red-600 via-white to-green-600 p-3 shadow-lg animate-fade-in">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gold font-semibold">REPOBLIKAN'I MADAGASIKARA</p>
          </div>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
              alt="MTFoP Logo" 
              className="h-16 w-auto animate-scale-in"
            />
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-green-800">MTFoP</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="absolute top-20 left-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover-scale transition-all duration-300 animate-slide-in-right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Retour à l'accueil
          </Button>
        </div>
        
        <Card className="w-full max-w-md mx-4 shadow-2xl border-t-4 border-t-blue-800 animate-scale-in">
          <CardHeader className="space-y-1 flex items-center flex-col">
            <div className="flex justify-center mb-4 animate-fade-in">
              <img 
                src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
                alt="MTFoP Logo" 
                className="h-16 w-auto hover-scale transition-transform duration-300"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center animate-fade-in">Connexion</CardTitle>
            <CardDescription className="text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
              Entrez vos identifiants pour accéder à la plateforme
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="space-y-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  placeholder="Entrez votre nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Mot de passe oublié?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-105"
                />
              </div>
              {error && (
                <div className="bg-red-50 text-red-700 px-4 py-2 rounded-md text-sm animate-fade-in">
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 hover-scale transition-all duration-300">
                Se connecter
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
