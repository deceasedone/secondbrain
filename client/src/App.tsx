import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import AppContent from './components/AppContent';
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster as Sonner } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index"; 

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Router>
              <Toaster position="top-right" />
              <Sonner />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} /> {/* Landing page */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes */}
                <Route 
                  path="/app/*" 
                  element={
                    <ProtectedRoute>
                      <AppContent />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Redirect any unknown routes to the landing page */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
