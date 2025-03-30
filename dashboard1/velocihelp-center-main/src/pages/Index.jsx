import { useState, useEffect } from "react";
import { Car } from "lucide-react";
import Layout from "../components/layout/Layout";
import HeroSection from "../components/dashboard/HeroSection";
import VehicleCards from "../components/dashboard/VehicleCards";
import ServiceHistory from "../components/dashboard/ServiceHistory";
import SupportSection from "../components/dashboard/SupportSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-float">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-brand-blue to-brand-teal animate-pulse-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Car className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <p className="text-lg font-medium animate-pulse-opacity">
            Loading FixMyRide...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <HeroSection />
        <VehicleCards />
        <ServiceHistory />
        <SupportSection />
      </div>
    </Layout>
  );
};

export default Index;
