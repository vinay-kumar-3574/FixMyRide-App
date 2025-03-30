import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { 
  User, 
  Car, 
   
  MapPin, 
  Phone, 
  Mail, 
  Edit, 
  Shield, 
  Activity,
  Award,
  Settings
} from "lucide-react";


const Profile = () => {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail"); // ✅ Get stored email
  
    fetch(`http://localhost:5000/api/profile?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Profile Data Received:", data); // ✅ Debugging log
        setUserData(data);
      })
      .catch((error) => console.error("❌ Error fetching profile:", error));
  }, []);
  

  if (!userData) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }
  
  return (
    <div className="flex min-h-screen bg-background">
      
      <div className="flex-1 p-6 lg:p-10">
        <div className="mb-6">
        <Link 
            to="/dashboard" 
            className="group inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-primary/80 active:scale-95 shadow-md"
            >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="transition-transform duration-300 group-hover:-translate-x-1"
            >
                <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Dashboard
            </Link>

          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Profile Summary Card */}
          <Card className="lg:col-span-4">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4 pb-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="text-lg">JS</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1 text-center">
                  <h2 className="text-xl font-semibold">{userData.name || "Not provided"} </h2>
                  <p className="text-sm text-muted-foreground">Premium Member</p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Verified
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3" /> 0 Years
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.email || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.contactNumber || "Not provided"}7</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{userData.location || "Not provided"}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span>0 service requests completed</span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Car className="mr-2 h-4 w-4" />
                  Manage Vehicles
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="lg:col-span-8 space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="membership">Membership</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" defaultValue={userData.name || "Not provided"} />
                  </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData.email || "Not provided"}  />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={userData.contactNumber || "Not provided"}/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value={userData?.location || "Not provided"} readOnly />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" value={userData?.city || "Not provided"} readOnly />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" value={userData?.state || "Not provided"} readOnly />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="zip">Zip Code</Label>
                          <Input id="zip" value={userData?.zipCode || "Not provided"} readOnly />
                      </div>
                  </div>

                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="membership" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-primary" />
                      Membership Details
                    </CardTitle>
                    <CardDescription>Your current membership information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium">Premium Plan</h3>
                            <p className="text-sm text-muted-foreground">Unlimited roadside assistance</p>
                          </div>
                          <Badge>Active</Badge>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Membership ID</span>
                            <span>PREM-12345</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Renewal Date</span>
                            <span>January 15, 2025</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Payment Method</span>
                            <span>•••• •••• •••• 4242</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="text-md font-medium">Membership Benefits</h3>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            Unlimited roadside assistance calls
                          </li>
                          <li className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            Priority service response
                          </li>
                          <li className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            100-mile towing distance included
                          </li>
                          <li className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                            Rental car reimbursement
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View All Benefits</Button>
                    <Button>Upgrade Plan</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2 h-5 w-5 text-primary" />
                      Communication Preferences
                    </CardTitle>
                    <CardDescription>Manage how we contact you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                          <label htmlFor="email-prefs" className="sr-only">Toggle</label>
                          <input 
                            type="checkbox" 
                            id="email-prefs" 
                            className="h-4 w-4 rounded border-gray-300" 
                            defaultChecked 
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">SMS Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive text messages for service updates</p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                          <label htmlFor="sms-prefs" className="sr-only">Toggle</label>
                          <input 
                            type="checkbox" 
                            id="sms-prefs" 
                            className="h-4 w-4 rounded border-gray-300" 
                            defaultChecked 
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Marketing Communications</h4>
                          <p className="text-sm text-muted-foreground">Receive news and special offers</p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                          <label htmlFor="marketing-prefs" className="sr-only">Toggle</label>
                          <input 
                            type="checkbox" 
                            id="marketing-prefs" 
                            className="h-4 w-4 rounded border-gray-300" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <Label htmlFor="bio">Bio/About</Label>
                      <Textarea 
                        id="bio"
                        placeholder="Tell us a bit about yourself"
                        className="min-h-[100px]"
                        defaultValue="Car enthusiast and frequent road-tripper. I love exploring new places and going on adventures."
                      />
                      <p className="text-xs text-muted-foreground">This information may be shown on your public profile</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;