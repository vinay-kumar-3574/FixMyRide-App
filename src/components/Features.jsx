import React from "react";
import { Wrench, MapPin, Truck, CreditCard } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            How it Works?
          </h2>
          <p className="text-white/80">
            Experience seamless vehicle breakdown assistance with our easy process.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Wrench,
              title: "Select Breakdown Issue",
              description: "Choose from common vehicle problems or describe your specific issue in detail for better assistance.",
            },
            {
              icon: MapPin,
              title: "Find Nearest Mechanic",
              description: "Our AI suggests the best-matched mechanics based on your issue, rating, and proximity to your location.",
            },
            {
              icon: Truck,
              title: "Track Mechanic in Real-Time",
              description: "Watch as your mechanic approaches with live ETA updates and direct in-app communication.",
            },
            {
              icon: CreditCard,
              title: "Service Completed & Payment",
              description: "Approve the completed service, make secure payment, and rate your mechanic all through the app.",
            },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-forest-light p-8 rounded-xl border border-mint/10"
            >
              <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center mb-6">
                {React.createElement(feature.icon, { className: "w-6 h-6 text-forest" })}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
