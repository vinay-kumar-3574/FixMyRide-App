import React, { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

import Index from "./pages/Index";
import LoginForm from "../login/login"; // ✅ Fixed path
import SignUpForm from "../login/Signup"; // ✅ Fixed path
import Onboarding from "./Onboarding/Onboarding"; // ✅ Fixed path
import MapPage from "./Onboarding/mapfile";
import NotFound from "../dashboard1/velocihelp-center-main/src/pages/NotFound";
// Import the dashboard with its original path
import DashboardApp from "../dashboard1/velocihelp-center-main/src/DashboardApp";

// ✅ Initialize QueryClient
const queryClient = new QueryClient();

// ✅ Ensure `API_URL` is loaded correctly
const API_URL = "http://localhost:5000;"
console.log("API URL:", API_URL); // Debugging log

// Loading Component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">Loading...</div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
        <div className="container mx-auto px-4 min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/onboarding" element={<Onboarding />} />
            < Route path ="/map" element={<MapPage />} />

            {/* Dashboard route with error boundary and suspense */}
            <Route
              path="/dashboard/*"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback />}>
                    <DashboardApp />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
