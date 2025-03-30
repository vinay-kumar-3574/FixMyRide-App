
import { useState } from "react";
import Navbar from "../components/layout/Navbar";

import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { useDarkMode } from "../hooks/useDarkMode";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings updated",
        description: "Your profile information has been saved.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <main className="flex-1 flex flex-col w-full transition-all duration-300">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground mt-1 text-white">
                Manage your account preferences and settings
              </p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full md:w-[600px] grid-cols-5">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="help">Help</TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your account details and personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <div className="relative">
                          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                            <img 
                              src="/placeholder.svg" 
                              alt="Profile" 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                          >
                            <span className="sr-only">Change avatar</span>
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
                              className="lucide lucide-pencil"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              <path d="m15 5 4 4" />
                            </svg>
                          </Button>
                        </div>
                        <div className="w-full space-y-1">
                          <p className="text-sm font-medium">Profile photo</p>
                          <p className="text-sm text-muted-foreground">
                            This will be displayed on your profile
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button type="button" variant="outline" size="sm">
                              Upload
                            </Button>
                            <Button type="button" variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                          <Label htmlFor="firstName">Full Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email address</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone number</Label>
                          <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="address">Home address</Label>
                        <Input id="address" defaultValue="123 Main St, Anytown, USA 12345" />
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                          {loading ? "Saving..." : "Save changes"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Control how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Email Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="service-updates">Service Updates</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive emails about your service requests
                              </p>
                            </div>
                            <Switch id="service-updates" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="marketing">Marketing emails</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive emails about new features and promotions
                              </p>
                            </div>
                            <Switch id="marketing" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="maintenance">Maintenance Reminders</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive maintenance reminders for your vehicles
                              </p>
                            </div>
                            <Switch id="maintenance" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Push Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="push-service">Service Status</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive updates about your active service requests
                              </p>
                            </div>
                            <Switch id="push-service" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="push-messages">Messages</Label>
                              <p className="text-sm text-muted-foreground">
                                Get notified about new messages from mechanics
                              </p>
                            </div>
                            <Switch id="push-messages" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="push-promos">Promotions</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive notifications about deals and promotions
                              </p>
                            </div>
                            <Switch id="push-promos" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="button" onClick={() => {
                          toast({
                            title: "Notification preferences updated",
                            description: "Your notification settings have been saved.",
                          });
                        }}>
                          Save preferences
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and authentication options
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <div className="space-y-3">
                          <div className="grid gap-2">
                            <Label htmlFor="current-password">Current password</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="new-password">New password</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm new password</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                          <Button onClick={() => toast({ title: "Password updated", description: "Your password has been changed successfully." })}>
                            Update password
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Two-factor authentication</div>
                              <p className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account
                              </p>
                            </div>
                            <Button variant="outline" onClick={() => toast({ description: "2FA configuration coming soon!" })}>
                              {false ? "Disable" : "Enable"}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Appearance</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Dark mode</div>
                              <p className="text-sm text-muted-foreground">
                                Toggle between light and dark mode
                              </p>
                            </div>
                            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Delete account</div>
                              <p className="text-sm text-muted-foreground">
                                Permanently delete your account and all data
                              </p>
                            </div>
                            <Button variant="destructive" onClick={() => toast({
                              title: "Cannot delete account",
                              description: "Account deletion is disabled in demo mode",
                              variant: "destructive"
                            })}>
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Billing Tab */}
              <TabsContent value="billing" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Billing & Subscription
                    </CardTitle>
                    <CardDescription>
                      Manage your payment methods and subscription plans
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Current Plan</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Free Plan</div>
                              <p className="text-sm text-muted-foreground">
                                Basic roadside assistance
                              </p>
                            </div>
                            <Button variant="outline" onClick={() => toast({ description: "Subscription management coming soon!" })}>
                              Upgrade
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Payment Methods</h3>
                        <div className="space-y-3">
                          <div className="border rounded-lg p-4">
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">No payment methods added yet</p>
                              <Button className="mt-4" variant="outline" onClick={() => toast({ description: "Payment method management coming soon!" })}>
                                Add Payment Method
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Billing History</h3>
                        <div className="space-y-3">
                          <div className="border rounded-lg p-4">
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">No billing history available</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Help Tab */}
              <TabsContent value="help" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      Help & Support
                    </CardTitle>
                    <CardDescription>
                      Get help with your account and service requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                        <div className="space-y-3">
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium">How do I request roadside assistance?</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              You can request assistance from the dashboard by clicking on the "Request Assistance" button. Follow the prompts to specify your location and the type of help you need.
                            </p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium">How long does it take for help to arrive?</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Response times vary based on your location, traffic, and the type of service needed. Typically, help arrives within 30-45 minutes.
                            </p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h4 className="font-medium">Is my service history saved in the app?</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Yes, all your service history is stored in your account. You can view past services, including details like date, mechanic, and service type.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Contact Support</h3>
                        <div className="space-y-3">
                          <div className="grid gap-2">
                            <Label htmlFor="support-subject">Subject</Label>
                            <Input id="support-subject" placeholder="What can we help you with?" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="support-message">Message</Label>
                            <Textarea 
                              id="support-message" 
                              placeholder="Please describe your issue in detail..."
                              className="min-h-[120px]"
                            />
                          </div>
                          <Button onClick={() => toast({ title: "Message sent", description: "We've received your message and will respond shortly." })}>
                            Send Message
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Emergency Contact</h3>
                        <div className="flex items-center gap-4 border rounded-lg p-4">
                          <AlertTriangle className="h-10 w-10 text-destructive" />
                          <div>
                            <p className="font-medium">24/7 Emergency Support</p>
                            <p className="text-muted-foreground">
                              For immediate assistance, call our emergency hotline:
                            </p>
                            <p className="font-medium text-lg mt-1">1-800-FIX-RIDE</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <Footer />
        </main>
        
      </div>
    </div>
  );
};

export default Settings;
