import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:5000/api/vehicles"; // Update with deployed URL

const AddVehicleCard = ({ onOpen }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Card className="glass-card glass-card-hover h-full flex flex-col justify-center items-center p-8 border-dashed cursor-pointer shadow-lg">
      <motion.div className="bg-primary/10 p-4 rounded-full mb-4" animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity }}>
        <Plus className="h-8 w-8 text-primary" />
      </motion.div>
      <h3 className="text-xl font-medium mb-2">Add New Vehicle</h3>
      <Button onClick={onOpen} className="mt-4">Add Vehicle</Button>
    </Card>
  </motion.div>
);

const VehicleCards = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ name: "", year: "", licensePlate: "", type: "", lastService: "", status: "Good" });

  // Fetch vehicles from backend
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setVehicles(response.data))
      .catch(error => console.error("Error fetching vehicles:", error));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewVehicle((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, { ...newVehicle, image: "https://placehold.co/400x200/777/FFFFFF/png?text=New+Vehicle" });
      setVehicles([...vehicles, response.data]);
      toast.success("Vehicle added successfully!");
      setIsAddModalOpen(false);
      console.log(newVehicle)
    } catch (error) {
      toast.error("Error adding vehicle.");
      console.error(error);
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
      toast.success("Vehicle deleted successfully!");
    } catch (error) {
      toast.error("Error deleting vehicle.");
      console.error(error);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">My Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {vehicles.map((vehicle, index) => (
              <motion.div key={vehicle._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.1 }}>
                <Card className="glass-card glass-card-hover overflow-hidden shadow-lg relative">
                  <motion.img src={vehicle.image} alt={vehicle.name} className="w-full h-44 object-cover hover:scale-110 transition-transform duration-500" />
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">License Plate</span>
                        <span className="text-sm">{vehicle.licensePlate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Last Service</span>
                        <span className="text-sm">{vehicle.lastService}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${vehicle.status === "Good" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{vehicle.status}</span>
                      </div>
                    </div>
                    <Button variant="destructive" className="absolute top-2 right-2 p-2" onClick={() => handleDeleteVehicle(vehicle._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <AddVehicleCard onOpen={() => setIsAddModalOpen(true)} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass-card shadow-2xl">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>Enter your vehicle details below.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddVehicle}>
                <div className="grid gap-4 py-4 text-black">
                  <Label htmlFor="name">Vehicle Name</Label>
                  <Input id="name" required onChange={handleChange} />
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" required onChange={handleChange} />
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input id="licensePlate" required onChange={handleChange} />
                </div>
                <DialogFooter>
                  <Button type="submit">Add Vehicle</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default VehicleCards;
