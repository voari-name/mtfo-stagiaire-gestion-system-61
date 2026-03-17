import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const validateRecoverySession = async () => {
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const hasRecoveryLink = hashParams.get("type") === "recovery" || hashParams.has("access_token");
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      const isReady = Boolean(hasRecoveryLink || session);
      setRecoveryReady(isReady);

      if (!isReady) {
        toast({
          title: "Lien invalide",
          description: "Demandez un nouveau lien de réinitialisation de mot de passe.",
          variant: "destructive",
        });
      }
    };

    validateRecoverySession();

    return () => {
      isMounted = false;
    };
  }, [toast]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast({
        title: "Réinitialisation impossible",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();

    toast({
      title: "Mot de passe mis à jour",
      description: "Reconnectez-vous avec votre nouveau mot de passe.",
    });

    navigate("/login", { replace: true });
    setLoading(false);
  };

  if (recoveryReady === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!recoveryReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <Card className="w-full max-w-md border-border">
          <CardHeader>
            <CardTitle>Lien expiré ou invalide</CardTitle>
            <CardDescription>Demandez un nouveau lien depuis la page d'authentification.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => navigate("/auth?tab=reset")}>Demander un nouveau lien</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8 text-foreground">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader>
          <CardTitle>Créer un nouveau mot de passe</CardTitle>
          <CardDescription>Entrez votre nouveau mot de passe pour récupérer l'accès à votre compte.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Entrez votre nouveau mot de passe"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirmer le mot de passe</Label>
              <div className="relative">
                <Input
                  id="confirm-new-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirmez votre nouveau mot de passe"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/login")}>
              Retour à la connexion
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
