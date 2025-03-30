import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { Radar, Loader2, Ban, BellRing, Check, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "../components/ui/alert-dialog";

const WaitingForMechanic = () => {
  const [searching, setSearching] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [mechanic, setMechanic] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (searching) {
      const timer = setTimeout(() => {
        const foundMechanic = {
          name: "Alex Johnson",
          rating: 4.8,
          eta: "10 min",
          distance: "2.5 miles",
          image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
        };
  
        setMechanic(foundMechanic);
        setSearching(false);
        setShowNotification(true);


  
        try {
          toast({
            title: "Mechanic Found",
            description: `${foundMechanic.name} will arrive in ${foundMechanic.eta}`,
          });
        } catch (error) {
          console.error("Error displaying toast notification:", error);
        }
        // Redirect after 7 seconds
        setTimeout(() => {
          navigate("/dashboard/serviceTracker");
        }, 7000);
        
      }, 5000);
  
      return () => clearTimeout(timer);
    }
  }, [searching, navigate]);

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    console.log("🚀 Confirm Cancel Triggered");
  
    setSearching(false);
    setShowCancelDialog(false);
    setShowNotification(false);
    setMechanic(null);
  
    try {
      toast({
        title: "Request Cancelled",
        description: "Your mechanic request has been cancelled",
        variant: "destructive",
      });
      console.log("✅ Toast executed successfully");
    } catch (error) {
      console.error("❌ Error in toast:", error);
    }
  
    console.log("✅ Navigating...");
    setTimeout(() => {
        console.log("✅ Navigating...");
        navigate("/dashboard/request");
      }, 1000);
  };

  const dismissNotification = () => {
    setShowNotification(false);
  };


  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 sf-pro overflow-hidden">
      {/* 🔹 Animated Rotating Rings (Backside Animation) */}
      {searching && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-96 h-96 border-4 border-mechanic-blue rounded-full animate-pulse-ring opacity-20" />
          <div className="absolute w-72 h-72 border-4 border-mechanic-blue rounded-full animate-pulse-ring opacity-30" style={{ animationDelay: "0.5s" }} />
          <div className="absolute w-48 h-48 border-4 border-mechanic-blue rounded-full animate-pulse-ring opacity-40" style={{ animationDelay: "1s" }} />
          <div className="absolute w-32 h-32 border-4 border-mechanic-blue rounded-full animate-rotate opacity-50" />
        </div>
      )}

      <div className="z-10 flex flex-col items-center justify-center p-8 rounded-2xl backdrop-blur-subtle bg-white/70 shadow-sm transform transition-all duration-500 w-[90%] max-w-md">
        {searching ? (
          <div className="animate-fade-in">
            <div className="flex flex-col items-center">
              <Radar className="text-mechanic-blue w-16 h-16 animate-scanning" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Searching for Mechanics</h2>
              <p className="text-gray-600 text-center mb-10">We're finding the best mechanics near your location</p>
              
              <div className="flex items-center gap-4">
                <Loader2 className="w-5 h-5 text-mechanic-blue animate-spin" />
                <span className="text-sm text-gray-600">This may take a moment...</span>
              </div>
            </div>
          </div>
        ) : mechanic ? (
          <div className="w-full animate-scale-in">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-mechanic-green rounded-full flex items-center justify-center mb-6">
                <Check className="text-white w-10 h-10" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">Mechanic Confirmed</h2>
              <p className="text-gray-500 text-center mb-6">Your request has been accepted</p>
              
              <div className="w-full bg-white rounded-xl p-4 shadow-sm mb-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={mechanic.image} 
                    alt={mechanic.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-mechanic-blue"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{mechanic.name}</h3>
                    <p className="text-sm text-gray-600">{mechanic.eta} away</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleCancel} 
                variant="outline" 
                className="mt-2 w-full border border-red-300 text-red-600 hover:bg-red-50 transition-colors duration-300"
              >
                Cancel Request
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in text-center">
            <Ban className="mx-auto w-16 h-16 text-mechanic-red mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Request Cancelled</h2>
            <p className="text-gray-600 mb-6">Your request for a mechanic has been cancelled</p>
          </div>
        )}
        
        {searching && (
          <Button 
            onClick={handleCancel} 
            variant="outline" 
            className="mt-8 w-full border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
          >
            Cancel Request
          </Button>
        )}
      </div>
      
      {showNotification && mechanic && (
        <div className="fixed bottom-8 right-0 transform transition-all duration-500 animate-slide-in z-50">
          <div className="bg-white rounded-l-xl p-4 shadow-lg flex items-start gap-4 max-w-xs">
            <div className="shrink-0 bg-blue-100 rounded-full p-2">
              <BellRing className="w-6 h-6 text-mechanic-blue" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">Mechanic Found</h4>
                <button 
                  onClick={dismissNotification} 
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {mechanic.name} accepted your request and will arrive in {mechanic.eta}
              </p>
            </div>
          </div>
        </div>
      )}
    
      
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your request?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-black">Keep Searching</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>Cancel Request</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WaitingForMechanic;
