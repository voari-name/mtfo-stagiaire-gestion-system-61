
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useSettings } from "@/contexts/SettingsContext";
import { useSupabaseInterns } from "@/hooks/useSupabaseInterns";
import { useSupabaseProjects } from "@/hooks/useSupabaseProjects";
import { useEvaluations } from "@/hooks/useEvaluations";

const Statistics = () => {
  const { translations } = useSettings();
  const { interns } = useSupabaseInterns();
  const { projects } = useSupabaseProjects();
  const { evaluations } = useEvaluations();

  const internshipData = [
    { month: "Jan", count: 12 },
    { month: "Fév", count: 18 },
    { month: "Mar", count: 25 },
    { month: "Avr", count: 22 },
    { month: "Mai", count: 30 },
    { month: "Jun", count: 35 }
  ];

  const departmentData = [
    { name: "IT", value: 45, color: "#0088FE" },
    { name: "Engineering", value: 30, color: "#00C49F" },
    { name: "Marketing", value: 15, color: "#FFBB28" },
    { name: "HR", value: 10, color: "#FF8042" }
  ];

  const stats = [
    { title: "📋 Stagiaires", value: interns.length.toString(), change: "" },
    { title: "📌 Évaluations", value: evaluations.length.toString(), change: "" },
    { title: "📌 Affectations", value: "0", change: "" }
  ];

  return (
    <MainLayout title={translations["Statistiques"]} currentPage="statistics">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">{translations["Tableau de bord statistiques"]}</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <CardTitle>Évolution des stages par mois</CardTitle>
              <CardDescription>Nombre de stages par mois cette année</CardDescription>
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
              <CardTitle>Répartition par département</CardTitle>
              <CardDescription>Distribution des stages par secteur</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
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
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Statistics;
