import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import Layout from "./components/layout/Layout";

import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import RequestAssistance from "./pages/RequestAssistance";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Profile from "./pages/profile";
import Services from "./pages/services";
import WaitingForMechanic from "./pages/waitingMechanic";
import ServiceTracker from "./pages/serviceTracker";
import  Chatbot  from "./pages/chatbox";
import SupportPage from "./pages/Support";
const queryClient = new QueryClient();

const DashboardApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          {/* ✅ Only one Layout wrapper */}
          
            <Routes>
              <Route index element={<Index />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/request" element={<RequestAssistance />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path ="/services" element={<Services/>} />
              <Route path ="/waiting" element={<WaitingForMechanic/>} />
              <Route path ="/serviceTracker" element={<ServiceTracker/>} />
              <Route path ="/chatbot" element={<Chatbot/>} />
              <Route path ="/support" element={<SupportPage/>} />
              <Route path="*" element={<NotFound />} />
               
              
            </Routes>
          
        </TooltipProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  );
};

export default DashboardApp;
