import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MinistryInfoDialog = () => {
  return (
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
  );
};

export default MinistryInfoDialog;