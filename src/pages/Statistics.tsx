
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useSettings } from "@/contexts/SettingsContext";
import { useSupabaseInterns } from "@/hooks/useSupabaseInterns";
import { useSupabaseProjects } from "@/hooks/useSupabaseProjects";
import { useSupabaseAssignments } from "@/hooks/useSupabaseAssignments";
import { useEvaluations } from "@/hooks/useEvaluations";

const Statistics = () => {
  const { translations } = useSettings();
  const { interns } = useSupabaseInterns();
  const { projects } = useSupabaseProjects();
  const { assignments } = useSupabaseAssignments();
  const { evaluations } = useEvaluations();

  // Calculer les données basées sur les projets réels
  const getProjectsByMonth = () => {
    const monthCounts = {};
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    
    // Initialiser tous les mois à 0
    months.forEach(month => {
      monthCounts[month] = 0;
    });

    // Compter les projets par mois de création
    projects.forEach(project => {
      const startDate = new Date(project.start_date);
      const monthIndex = startDate.getMonth();
      const monthName = months[monthIndex];
      monthCounts[monthName]++;
    });

    return months.map(month => ({
      month,
      count: monthCounts[month]
    }));
  };

  // Calculer la répartition des stagiaires par projet
  const getInternDistribution = () => {
    const distribution = {};
    
    projects.forEach(project => {
      const internCount = project.interns ? project.interns.length : 0;
      const key = internCount === 0 ? 'Sans stagiaire' : 
                  internCount === 1 ? '1 stagiaire' :
                  `${internCount} stagiaires`;
      
      distribution[key] = (distribution[key] || 0) + 1;
    });

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
    return Object.entries(distribution).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length]
    }));
  };

  const internshipData = getProjectsByMonth();
  const departmentData = getInternDistribution();

  const stats = [
    { title: "📋 Stagiaires", value: interns.length.toString(), change: "" },
    { title: "📊 Projets", value: projects.length.toString(), change: "" },
    { title: "📌 Évaluations", value: evaluations.length.toString(), change: "" },
    { title: "📋 Affectations", value: assignments.length.toString(), change: "" }
  ];

  return (
    <MainLayout title={translations["Statistiques"]} currentPage="statistics">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">{translations["Tableau de bord statistiques"]}</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <CardDescription>{stat.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-800">{stat.value}</span>
                  <span className="text-sm text-green-600">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Évolution des projets par mois</CardTitle>
              <CardDescription>Nombre de projets créés par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={internshipData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1e40af" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Répartition des projets</CardTitle>
              <CardDescription>Distribution par nombre de stagiaires assignés</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {departmentData.length > 0 ? (
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Aucun projet créé pour le moment</p>
                  </div>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Statistics;
