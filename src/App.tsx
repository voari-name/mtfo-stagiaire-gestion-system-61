
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Internships from "./pages/Internships";
import Evaluations from "./pages/Evaluations";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";
import { SettingsProvider } from "./contexts/SettingsContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/evaluations" element={<Evaluations />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
