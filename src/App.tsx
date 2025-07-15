import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
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
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/internships" element={
                  <ProtectedRoute>
                    <Internships />
                  </ProtectedRoute>
                } />
                <Route path="/projects" element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                } />
                <Route path="/evaluations" element={
                  <ProtectedRoute>
                    <Evaluations />
                  </ProtectedRoute>
                } />
                <Route path="/assignments" element={
                  <ProtectedRoute>
                    <Assignments />
                  </ProtectedRoute>
                } />
                <Route path="/statistics" element={
                  <ProtectedRoute>
                    <Statistics />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
