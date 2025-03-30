import { Wrench, MapPin, CreditCard, AlertTriangle } from "lucide-react";

const MobilePreview = () => {
  return (
    <section className="py-20 px-4">
      <div id="Keyfeatures" className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Key Features
          </h2>
          <p className="text-white/80">
            Explore the smart features that make vehicle breakdown assistance effortless.
          </p>
        </div>

        {/* Features Section */}
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              icon: MapPin,
              title: "Live Location Tracking",
              description: "View mechanics nearby in real-time and get accurate ETA updates.",
            },
            {
              icon: Wrench,
              title: "AI-Based Recommendations",
              description: "Our smart system suggests the best qualified mechanics for your issue.",
            },
            {
              icon: CreditCard,
              title: "Secure Payments",
              description: "Pay seamlessly with multiple secure options and get instant receipts.",
            },
            {
              icon: AlertTriangle,
              title: "SOS Emergency Assistance",
              description: "Priority service for unsafe locations with direct emergency connections.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="w-64 p-6 bg-forest-light rounded-xl border border-mint/10 text-center"
            >
              <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon && <feature.icon className="w-6 h-6 text-forest" />}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobilePreview;
