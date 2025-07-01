
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Erreur de connexion",
        description: error.message === "Invalid login credentials" 
          ? "Email ou mot de passe incorrect" 
          : error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur la plateforme de gestion",
      });
      navigate("/profile");
    }
    setLoading(false);
  };

  const handleForgotPassword = () => {
    // Rediriger vers la page Auth avec l'onglet reset activé
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
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
            className="flex items-center gap-2 hover-scale transition-all duration-300 animate-slide-in-right dark:text-white dark:hover:bg-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Retour à l'accueil
          </Button>
        </div>
        
        <Card className="w-full max-w-md mx-4 shadow-2xl border-t-4 border-t-blue-800 animate-scale-in dark:bg-slate-800 dark:border-slate-700">
          <CardHeader className="space-y-1 flex items-center flex-col">
            <div className="flex justify-center mb-4 animate-fade-in">
              <img 
                src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
                alt="MTFoP Logo" 
                className="h-16 w-auto hover-scale transition-transform duration-300"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center animate-fade-in dark:text-white">Connexion</CardTitle>
            <CardDescription className="text-center animate-fade-in dark:text-gray-300" style={{animationDelay: '0.2s'}}>
              Entrez vos identifiants pour accéder à la plateforme
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-105 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-white">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-105 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Button 
                type="submit" 
                className="w-full bg-blue-800 hover:bg-blue-900 hover-scale transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
              <Button 
                type="button" 
                variant="link" 
                onClick={handleForgotPassword}
                className="text-blue-600 hover:text-blue-800 transition-colors dark:text-blue-400 dark:hover:text-blue-300"
              >
                Mot de passe oublié?
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
