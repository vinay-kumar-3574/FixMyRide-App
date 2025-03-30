import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import Map from "../../components/ui/Map";
import { Bell, Car, Fuel, Wrench } from "lucide-react";
import { toast } from "sonner";

const HeroSection = () => {
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const { latitude, longitude } = location.state || {};

  const handleRequestAssistance = () => {
    toast.success("Assistance request sent! Help is on the way.", {
      description: "You'll be connected with a service provider shortly.",
    });
    navigate("/dashboard/request");
  };

  const clearNotifications = () => {
    setNotificationCount(0);
    toast.info("All notifications cleared");
  };

  return (
    <section className="container mx-auto px-4 py-8 relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
        {/* Left section - Responsive grid */}
        <div className="lg:col-span-3 space-y-6 relative z-10">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center md:text-left">
              Vehicle Assistance Dashboard
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl text-center md:text-left">
              Request immediate help, manage your vehicles, and track service history all in one place.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="gap-2 bg-brand-blue hover:bg-brand-blue/90 font-medium text-black dark:text-white rounded-full px-6 py-6 animate-pulse-opacity shadow-lg hover:shadow-xl transition-all"
                onClick={handleRequestAssistance}
              >
                <Wrench className="h-5 w-5" />
                Request Assistance
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-2 relative rounded-full px-6"
                  >
                    <Bell className="h-5 w-5" />
                    Notifications
                    {notificationCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full md:w-80 z-[9999]" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Recent Notifications</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={clearNotifications}
                      >
                        Clear all
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Responsive Map */}
          <div className="h-64 md:h-[350px] w-full rounded-xl overflow-hidden shadow-lg animate-fade-in animation-delay-200 relative z-0">
            <Map className="h-full w-full" latitude={latitude} longitude={longitude} />
          </div>
        </div>
        
        {/* Right section - Responsive services */}
        <div className="lg:col-span-2 space-y-6 relative z-10">
          <div className="glass-card p-6 animate-fade-in animation-delay-300">
            <h2 className="text-xl font-semibold text-center md:text-left">Available Services</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover-lift">
                <div className="bg-brand-blue/10 p-3 rounded-full">
                  <Wrench className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Mechanic Services</h3>
                  <p className="text-sm text-muted-foreground">Car won't start? Engine issues? Get help from certified mechanics.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover-lift">
                <div className="bg-brand-blue/10 p-3 rounded-full">
                  <Fuel className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Fuel Delivery</h3>
                  <p className="text-sm text-muted-foreground">Running low on gas? Get fuel delivered to your location.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover-lift">
                <div className="bg-brand-blue/10 p-3 rounded-full">
                  <Car className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Towing Services</h3>
                  <p className="text-sm text-muted-foreground">Need a tow? Reliable towing services are available 24/7.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
