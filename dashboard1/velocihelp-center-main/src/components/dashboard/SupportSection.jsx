import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { MessageSquare, Phone, Mail, HelpCircle } from "lucide-react";
import { toast } from "sonner";

// FAQ data
const faqs = [
  {
    question: "How do I request roadside assistance?",
    answer:
      "To request roadside assistance, log into your FixMyRide account and click the 'Request Assistance' button on the dashboard. You'll be prompted to confirm your location and specify the issue you're experiencing. Our system will then connect you with the nearest available service provider.",
  },
  {
    question: "What services does FixMyRide offer?",
    answer:
      "FixMyRide offers a comprehensive range of vehicle breakdown services including mechanical repairs, towing, battery jump-starts, tire changes, fuel delivery, lockout assistance, and general roadside assistance. Our network of certified mechanics and service providers ensures quality service no matter what issue you're facing.",
  },
  {
    question: "How long does it typically take for help to arrive?",
    answer:
      "Service response times vary based on your location, traffic conditions, time of day, and service provider availability. In urban areas, you can typically expect assistance to arrive within 30-45 minutes. In rural or remote areas, wait times may be longer. You'll receive real-time updates on your service provider's estimated arrival time through the app.",
  },
  {
    question: "Are there membership plans available?",
    answer:
      "Yes, FixMyRide offers several membership plans to suit different needs and budgets. Our Basic, Premium, and Family plans provide varying levels of service coverage, priority response, and free service calls. You can view and compare membership options in the 'Subscription' section of your account settings.",
  },
  {
    question: "How do I add or remove vehicles from my account?",
    answer:
      "To manage your vehicles, go to the 'My Vehicles' section of your dashboard. Click 'Add Vehicle' to register a new vehicle with your account, or select an existing vehicle and click 'Edit' or 'Remove' to modify or delete it. You can store details for multiple vehicles under a single account.",
  },
];

const SupportSection = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleStartChat = () => {
    toast.success("Support chat initiated!", {
      description: "A customer service representative will be with you shortly.",
    });
    setChatOpen(false);
    navigate("/dashboard/chatbot");
  };
  
  const handleEmergencyCall = () => {
    toast("Calling emergency roadside assistance...", {
      description: "Please stay on the line while we connect you.",
    });

  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: FAQs */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-1">
              Find answers to common questions about our services
            </p>
          </div>
          
          <div className="glass-card p-6 animate-fade-in">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left py-4 hover:no-underline">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <HelpCircle className="h-5 w-5 text-brand-blue" />
                      </div>
                      <span className="font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        {/* Right column: Contact options */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Need Help?</h2>
            <p className="text-muted-foreground mt-1">
              Contact our support team through these channels
            </p>
          </div>
          
          <div className="space-y-4">
            <Dialog open={chatOpen} onOpenChange={setChatOpen}>
              <DialogTrigger asChild>
                <div className="glass-card glass-card-hover p-6 flex items-start gap-4 cursor-pointer animate-fade-in">
                  <div className="bg-brand-blue/10 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Live Chat Support</h3>
                    <p className="text-muted-foreground">
                      Chat with our customer service team in real-time for immediate assistance.
                    </p>
                    <p className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Online • Typical response time: &lt;2 minutes
                    </p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] glass-card">
                <DialogHeader>
                  <DialogTitle>Start a Live Chat</DialogTitle>
                  <DialogDescription>
                    Connect with our support team for immediate assistance with your issue.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2 text-black dark:text-white ">What can we help you with?</p>
                    <select className=" text-black dark:text-white w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="" className="text-black dark:text-white">Select a topic</option>
                      <option value="technical" className="text-black dark:text-white">Technical Issue</option>
                      <option value="billing" className="text-black dark:text-white">Billing Question</option>
                      <option value="account" className="text-black dark:text-white">Account Management</option>
                      <option value="service" className="text-black dark:text-white" >Service Inquiry</option>
                      <option value="other" className="text-black dark:text-white">Other</option>
                    </select>
                  </div>
                  
                  <textarea
                    placeholder="Briefly describe your issue..."
                    className=" text-black dark:text-white w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleStartChat}>Start Chat</Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <div 
              className="glass-card glass-card-hover p-6 flex items-start gap-4 cursor-pointer animate-fade-in animation-delay-100"
              onClick={handleEmergencyCall}
            >
              <div className="bg-brand-orange/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Emergency Assistance</h3>
                <p className="text-muted-foreground">
                  Call our 24/7 emergency assistance hotline for immediate help.
                </p>
                <p className="mt-2 text-brand-orange font-medium">
                  1-800-FIX-RIDE (1-800-349-7433)
                </p>
              </div>
            </div>
            
            <a 
              href="mailto:support@fixmyride.com"
              className="glass-card glass-card-hover p-6 flex items-start gap-4 block animate-fade-in animation-delay-200"
            >
              <div className="bg-brand-teal/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-brand-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email Support</h3>
                <p className="text-muted-foreground">
                  Send us an email for non-urgent inquiries or detailed questions.
                </p>
                <p className="mt-2 text-brand-teal font-medium">
                  support@fixmyride.com
                </p>
              </div>
            </a>
          </div>
          
          <div className="glass-card p-6 animate-fade-in animation-delay-300">
            <h3 className="font-semibold text-lg mb-3">Support Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Online Chat:</span>
                <span className="font-medium">24/7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone Support:</span>
                <span className="font-medium">24/7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email Response:</span>
                <span className="font-medium">Within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
