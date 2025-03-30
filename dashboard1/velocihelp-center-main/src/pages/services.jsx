import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Wrench, 
  Car,
  Cog, 
  Battery, 
  Hammer, 
  Cpu, 
  AlertTriangle,
  Clock,
  ArrowRight 
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../components/ui/carousel";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const pulse = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1],
    transition: { 
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

const rotateIcon = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360,
    transition: { 
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear"
    }
  }
};

const serviceCategories = [
  { id: "mechanical", label: "Mechanical" },
  { id: "electrical", label: "Electrical" },
  { id: "diagnostic", label: "Diagnostic" },
  { id: "emergency", label: "Emergency" }
];

const servicesData = {
  mechanical: [
    {
      title: "Engine Tune-Up",
      description: "Comprehensive engine performance optimization to ensure smooth operation and fuel efficiency.",
      icon: <Wrench />,
      price: "$99",
      duration: "2 hours"
    },
    {
      title: "Brake Service",
      description: "Complete brake system inspection, pad replacement, and rotor resurfacing for optimal safety.",
      icon: <Car />,
      price: "$120",
      duration: "1.5 hours"
    },
    
    {
      title: "Transmission Service",
      description: "Full transmission fluid exchange and system inspection to prevent costly repairs.",
      icon: <Cog />,
      price: "$150",
      duration: "2 hours"
    }
  ],
  electrical: [
    {
      title: "Battery Replacement",
      description: "Quick and reliable battery testing and replacement service to keep you on the road.",
      icon: <Battery />,
      price: "$75",
      duration: "30 minutes"
    },
    {
      title: "Alternator Repair",
      description: "Diagnosis and repair of charging system issues to prevent battery drain and electrical failures.",
      icon: <Cog />,
      price: "$220",
      duration: "2.5 hours"
    },
    {
      title: "Electrical Diagnostics",
      description: "Comprehensive troubleshooting of electrical systems using advanced diagnostic equipment.",
      icon: <Cpu />,
      price: "$85",
      duration: "1 hour"
    }
  ],
  diagnostic: [
    {
      title: "Computer Diagnostics",
      description: "State-of-the-art computer diagnostics to identify and resolve complex vehicle issues.",
      icon: <Cpu />,
      price: "$89",
      duration: "1 hour"
    },
    {
      title: "Emissions Testing",
      description: "Complete emissions system check to ensure your vehicle meets environmental standards.",
      icon: <AlertTriangle />,
      price: "$60",
      duration: "45 minutes"
    },
    {
      title: "Performance Analysis",
      description: "Detailed evaluation of your vehicle's performance metrics to optimize driving experience.",
      icon: <Hammer />,
      price: "$120",
      duration: "1.5 hours"
    }
  ],
  emergency: [
    {
      title: "Roadside Assistance",
      description: "24/7 emergency help for breakdowns, flat tires, and other roadside emergencies.",
      icon: <AlertTriangle />,
      price: "$70",
      duration: "ASAP"
    },
    {
      title: "Jump Start Service",
      description: "Quick battery jump start to get you back on the road when your battery fails.",
      icon: <Battery />,
      price: "$45",
      duration: "30 minutes"
    },
    {
      title: "Emergency Towing",
      description: "Fast and reliable towing service when your vehicle cannot be repaired on-site.",
      icon: <Car />,
      price: "$95",
      duration: "Varies"
    }
  ]
};

const testimonials = [
  {
    name: "Sarah Johnson",
    service: "Engine Tune-Up",
    text: "The service was exceptional! My car runs smoother than ever, and the team was very professional.",
    rating: 5
  },
  {
    name: "Michael Chen",
    service: "Brake Service",
    text: "Quick, efficient, and affordable. I've been coming here for years and have never been disappointed.",
    rating: 5
  },
  {
    name: "Emma Williams",
    service: "Electrical Diagnostics",
    text: "They diagnosed a complicated electrical issue that two other shops couldn't figure out. Highly recommended!",
    rating: 5
  },
  {
    name: "Robert Davis",
    service: "Roadside Assistance",
    text: "They came to my rescue in the middle of the night when my car broke down. Fast service and very helpful staff.",
    rating: 4
  }
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("mechanical");
  
  useEffect(() => {
    console.log('Services component mounted');
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-4 sm:px-6 md:py-28">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <div className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-blue-500 blur-3xl opacity-30" />
          <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-indigo-500 blur-3xl opacity-30" />
          
          <motion.div 
            className="relative z-10 max-w-5xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-6"
              variants={fadeInUp}
            >
              Professional 
              <span className="relative inline-block px-2">
                <span className="relative z-10">Automotive</span>
                <div className="absolute bottom-1 left-0 w-full h-3 bg-brand-blue/30 rounded-lg -rotate-1" />
              </span> 
              Services
            </motion.h1>
            
            <motion.p 
              className="max-w-2xl mx-auto mt-4 text-xl text-blue-100"
              variants={fadeInUp}
            >
              Expert service and repair for all makes and models. Our certified technicians use the latest technology for superior results.
            </motion.p>
            
            <motion.div 
              className="mt-10"
              variants={fadeInUp}
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold hover:shadow-lg transition-all group"
              >
                Book Service Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Service Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Our Service Categories</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                We offer a comprehensive range of automotive services to keep your vehicle in optimal condition.
              </p>
            </motion.div>
            
            <Tabs 
              defaultValue="mechanical" 
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full"
            >
              <div className="flex justify-center mb-8">
                <TabsList className="bg-muted/50 p-1 rounded-full">
                  {serviceCategories.map((category) => (
                    <TabsTrigger 
                      key={category.id}
                      value={category.id}
                      className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {Object.keys(servicesData).map((category) => (
                <TabsContent key={category} value={category} className="mt-2">
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {servicesData[category].map((service, index) => (
                      <motion.div 
                        key={index}
                        variants={fadeInUp}
                        className="flex"
                      >
                        <Card className="w-full glass-card hover:shadow-xl glass-card-hover transition-all duration-300">
                          <CardHeader>
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                              <motion.div
                                variants={rotateIcon}
                                initial="initial"
                                animate="animate"
                              >
                                {service.icon}
                              </motion.div>
                            </div>
                            <CardTitle>{service.title}</CardTitle>
                            <CardDescription className="mt-2">{service.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm mt-2">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{service.duration}</span>
                              </div>
                              <div className="text-lg font-bold text-primary">
                                {service.price}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              Learn More
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Our Service Process</h2>
              <p className="mt-4 text-xl text-black-foreground max-w-3xl mx-auto">
                We follow a structured approach to ensure your vehicle receives the best care.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { 
                  title: "Diagnosis", 
                  description: "We perform a thorough inspection and diagnostic tests to identify issues.",
                  icon: <Cpu className="h-8 w-8" />
                },
                { 
                  title: "Estimate", 
                  description: "We provide a detailed estimate with transparent pricing before any work begins.",
                  icon: <AlertTriangle className="h-8 w-8" />
                },
                { 
                  title: "Repair", 
                  description: "Our certified technicians perform the necessary repairs with precision.",
                  icon: <Wrench className="h-8 w-8" />,
                },
                { 
                  title: "Quality Check", 
                  description: "We conduct a final inspection to ensure everything meets our high standards.",
                  icon: <Cog className="h-8 w-8" />
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  variants={fadeInUp}
                >
                  <div className="bg-background rounded-lg p-8 h-full glass-card relative z-10">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 mx-auto"
                      variants={pulse}
                      initial="initial"
                      animate="animate"
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-center mb-4">{step.title}</h3>
                    <p className="text-muted-foreground text-center">{step.description}</p>
                    <div className="absolute top-12 left-full w-full hidden md:block">
                      {index < 3 && (
                        <div className="flex items-center justify-center w-full">
                          <div className="h-1 bg-primary/30 w-full" />
                          <div className="h-3 w-3 rounded-full bg-primary absolute left-full ml-0.5" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute -top-2 -bottom-2 -left-2 -right-2 bg-gradient-to-r from-primary/10 to-background/0 rounded-lg z-0 opacity-50" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">What Our Customers Say</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Don't just take our word for it — hear from our satisfied customers.
              </p>
            </motion.div>
            
            <Carousel className="w-full max-w-5xl mx-auto mt-12">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                    <div className="p-1 h-full">
                      <Card className="glass-card h-full">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={i < testimonial.rating ? "currentColor" : "none"}
                                stroke={i < testimonial.rating ? "none" : "currentColor"}
                                className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}`}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            ))}
                          </div>
                          <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                          <CardDescription>{testimonial.service}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground">"{testimonial.text}"</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-8">
                <CarouselPrevious className="static left-auto translate-y-0 mr-2" />
                <CarouselNext className="static right-auto translate-y-0" />
              </div>
            </Carousel>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary to-indigo-600 py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <div className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-blue-500 blur-3xl opacity-30" />
          <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-indigo-500 blur-3xl opacity-30" />
          
          <motion.div 
            className="relative z-10 max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to experience premium automotive service?
            </h2>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Book your appointment today and join thousands of satisfied customers who trust our expertise.
            </p>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Button size="lg" variant="default" className="bg-white text-primary hover:bg-blue-50 hover:shadow-lg">
                Book Service Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;