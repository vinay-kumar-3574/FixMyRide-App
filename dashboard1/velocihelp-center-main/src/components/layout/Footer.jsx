
import { Link } from "react-router-dom";
import { Car, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <Car className="h-6 w-6 text-brand-blue" />
              <span className="text-foreground">
                Fix<span className="text-brand-blue">My</span>Ride
              </span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Your trusted vehicle breakdown assistance service, always ready to help when you need it most.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-brand-blue transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-brand-blue transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-brand-blue transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-brand-blue transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-muted-foreground hover:text-foreground transition-colors">
                  Service History
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/roadside" className="text-muted-foreground hover:text-foreground transition-colors">
                  Roadside Assistance
                </Link>
              </li>
              <li>
                <Link to="/services/towing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Towing Services
                </Link>
              </li>
              <li>
                <Link to="/services/mechanical" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mechanical Repairs
                </Link>
              </li>
              <li>
                <Link to="/services/fuel" className="text-muted-foreground hover:text-foreground transition-colors">
                  Fuel Delivery
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                1234 Road Avenue, Cartown, CT 56789
              </li>
              <li>
                <a href="tel:1-800-349-7433" className="text-muted-foreground hover:text-foreground transition-colors">
                  1-800-FIX-RIDE (1-800-349-7433)
                </a>
              </li>
              <li>
                <a href="mailto:support@fixmyride.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  support@fixmyride.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} FixMyRide. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
