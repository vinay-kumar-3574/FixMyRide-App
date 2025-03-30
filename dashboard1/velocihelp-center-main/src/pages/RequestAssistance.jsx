import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import Map from "../components/ui/Map.jsx";
import { Car, MapPin, Phone, Wrench } from "lucide-react";
import { Mail } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const RequestAssistance = () => {
  const { toast } = useToast();
  const [requestType, setRequestType] = useState("roadside");
  const [vehicle, setVehicle] = useState("Toyota Camry");
  const [issue, setIssue] = useState("");
  const [selected, setSelected] = useState("phone");
  const navigate = useNavigate();
  const handleSubmit = () => {
    try {
      toast({
        title: "Request submitted",
      description: "Your request has been submitted and is being processed.",
      });
      console.log("✅ Toast executed successfully");
    } catch (error) {
      console.error("❌ Error in toast:", error);
    }

    // Navigate after a short delay (optional for better UX)
    setTimeout(() => {
      navigate("/dashboard/waiting");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <Navbar />
      <div className="flex flex-1">
        <main className="flex-1 flex flex-col w-full transition-all duration-300">
          <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Request Assistance</h1>
              <p className="text-muted-foreground mt-1">
                Get help with your vehicle right away
              </p>
            </div>

            {/* Tabs for request types */}
            <Tabs defaultValue="roadside" className="w-full">
              <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                <TabsTrigger value="roadside">Roadside Assistance</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance Request</TabsTrigger>
              </TabsList>
              
              {/* Roadside Assistance */}
              <TabsContent value="roadside" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Car className="h-5 w-5" />
                          Vehicle Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor="vehicle">Select Vehicle</Label>
                            <Input
                              id="vehicle"
                              defaultValue={vehicle}
                              onChange={(e) => setVehicle(e.target.value)}
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="issue">Describe Issue</Label>
                            <Input
                              id="issue"
                              placeholder="e.g., Flat tire, Engine won't start"
                              onChange={(e) => setIssue(e.target.value)}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="h-full">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Your Location
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="h-[400px]">
                        <div className="relative h-full w-full rounded-md overflow-hidden">
                          <Map 
                            className="h-full w-full"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSubmit}>
                    Request Assistance
                  </Button>
                </div>
              </TabsContent>
              
              {/* Maintenance Request */}
              <TabsContent value="maintenance" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      Maintenance Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="vehicle">Select Vehicle</Label>
                        <Input
                          id="vehicle"
                          defaultValue={vehicle}
                          onChange={(e) => setVehicle(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="issue">Describe Maintenance</Label>
                        <Input
                          id="issue"
                          placeholder="e.g., Oil change, Brake inspection"
                          onChange={(e) => setIssue(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid gap-3">
      <Label className="text-lg font-semibold text-gray-800 dark:text-white">
        Preferred Contact Method
      </Label>
                      <div className="flex gap-4">
                        {/* Phone Button */}
                        <button
                          className={`flex items-center px-6 py-3 border rounded-full transition-all duration-300 shadow-md 
                          hover:scale-105 active:scale-95 focus:ring-2 focus:ring-offset-2 
                          ${
                            selected === "phone"
                              ? "bg-blue-500 text-white border-blue-500 shadow-blue-300"
                              : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                          }`}
                          onClick={() => setSelected("phone")}
                        >
                          <Phone
                            className={`h-5 w-5 transition-all duration-300 ${
                              selected === "phone" ? "text-white rotate-[8deg] scale-110" : "text-blue-500"
                            }`}
                          />
                          <span className="ml-3 font-medium">Phone</span>
                        </button>

                        {/* Email Button */}
                        <button
                          className={`flex items-center px-6 py-3 border rounded-full transition-all duration-300 shadow-md 
                          hover:scale-105 active:scale-95 focus:ring-2 focus:ring-offset-2 
                          ${
                            selected === "email"
                              ? "bg-blue-500 text-white border-blue-500 shadow-blue-300"
                              : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                          }`}
                          onClick={() => setSelected("email")}
                        >
                          <Mail
                            className={`h-5 w-5 transition-all duration-300 ${
                              selected === "email" ? "text-white rotate-[8deg] scale-110" : "text-blue-500"
                            }`}
                          />
                          <span className="ml-3 font-medium">Message</span>
                        </button>
                      </div>
                    </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button onClick={handleSubmit}>
                    Request Maintenance
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="flex justify-end p-4">
            
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default RequestAssistance;
