import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  CheckCircle,
  Clock,
  Filter,
  Search,
  Star,
  AlertTriangle,
  Calendar,
} from "lucide-react";

const ServiceHistory = () => {
  const [serviceHistory, setServiceHistory] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:5000/api/service-history")
      .then((response) => response.json())
      .then((data) => setServiceHistory(data))
      .catch((error) => console.error("Error fetching service history:", error));
  }, []);

  const filteredHistory = filter === "all"
    ? serviceHistory
    : serviceHistory.filter(item => 
        filter === "completed" 
          ? item.status === "Completed" 
          : item.status === "Pending"
      );

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Service History</h2>
          <p className="text-white-foreground mt-1">
            View and manage your past service requests
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                className="pl-9 h-10 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-3 py-2 w-full sm:w-60"
                placeholder="Search service history..."
              />
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] gap-2 text-black">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Service
          </Button>
        </div>
        
        <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Mechanic</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((item, index) => (
                  <TableRow key={item._id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <TableCell className="font-medium">{item.service}</TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {item.status === "Completed" ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>{item.status}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Clock className="h-4 w-4" />
                          <span>{item.status}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{item.mechanic}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      {item.rating ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span>{item.rating}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredHistory.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <AlertTriangle className="h-10 w-10 text-muted-foreground" />
                        <h3 className="text-lg font-medium">No records found</h3>
                        <p className="text-muted-foreground">No matching service records found for the current filter.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHistory;
