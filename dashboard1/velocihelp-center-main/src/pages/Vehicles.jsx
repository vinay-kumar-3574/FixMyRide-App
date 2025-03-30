import React from 'react';
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import { Car, Plus, FileText, Edit, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";



// Sample vehicles data
const vehicles = [
  {
    id: 1,
    name: "Toyota Camry",
    model: "2019",
    licensePlate: "XYZ-1234",
    lastService: "March 15, 2023",
    status: "Good Condition",
    type: "Sedan",
    color: "Silver",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Honda Civic",
    model: "2021",
    licensePlate: "ABC-5678",
    lastService: "January 10, 2023",
    status: "Needs Service",
    type: "Sedan",
    color: "Blue",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Ford Explorer",
    model: "2020",
    licensePlate: "DEF-9012",
    lastService: "December 5, 2022",
    status: "Good Condition",
    type: "SUV",
    color: "White",
    image: "/placeholder.svg",
  },
];

const Vehicles = () => {
  const { vehicles, loading, addVehicle, deleteVehicle } = useVehicles();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-component">
      <h1 className="text-2xl font-bold dashboard-text mb-4">Vehicles</h1>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <main className="flex-1 flex flex-col w-full transition-all duration-300">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold">My Vehicles</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage and monitor your registered vehicles
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4 md:mt-0 gap-2">
                      <Plus className="h-4 w-4" />
                      Add New Vehicle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Add New Vehicle</DialogTitle>
                      <DialogDescription>
                        Enter your vehicle details below. You can add more information later.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="vehicle-name">Vehicle Name</Label>
                        <Input
                          id="vehicle-name"
                          placeholder="e.g., Toyota Camry"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="model">Model Year</Label>
                          <Input id="model" placeholder="e.g., 2021" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="license-plate">License Plate</Label>
                          <Input
                            id="license-plate"
                            placeholder="e.g., ABC-1234"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="type">Vehicle Type</Label>
                          <Input id="type" placeholder="e.g., Sedan" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="color">Color</Label>
                          <Input id="color" placeholder="e.g., Silver" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="image">Vehicle Image</Label>
                        <Input id="image" type="file" className="cursor-pointer" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => toast({ title: "Operation cancelled", description: "Vehicle was not added" })}>
                        Cancel
                      </Button>
                      <Button onClick={() => {
                        toast({
                          title: "Vehicle added successfully",
                          description: "Your vehicle has been registered",
                        });
                      }}>
                        Add Vehicle
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveTab}>
                <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                  <TabsTrigger value="all">All Vehicles</TabsTrigger>
                  <TabsTrigger value="good">Good Condition</TabsTrigger>
                  <TabsTrigger value="service">Needs Service</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map(vehicle => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="good" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles
                      .filter(v => v.status === "Good Condition")
                      .map(vehicle => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="service" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles
                      .filter(v => v.status === "Needs Service")
                      .map(vehicle => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex justify-end p-4">
              <Sidebar />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const VehicleCard = ({ vehicle }) => {
  const { toast } = useToast();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <div className="aspect-video bg-muted relative overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
          vehicle.status === "Good Condition" 
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
        }`}>
          {vehicle.status}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" /> {vehicle.name}
        </CardTitle>
        <CardDescription>
          {vehicle.model} • {vehicle.licensePlate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span>{vehicle.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Color:</span>
            <span>{vehicle.color}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Service:</span>
            <span>{vehicle.lastService}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="gap-1" onClick={() => toast({ description: "Documents feature coming soon!" })}>
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Documents</span>
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => toast({ description: "Edit feature coming soon!" })}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => toast({ title: "Cannot delete", description: "Vehicle deletion is disabled in demo mode" })}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Vehicles;
