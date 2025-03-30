import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Fix my Ride</h3>
            <p className="text-white/60 max-w-xs">
              Professional auto repair and maintenance services to keep your vehicle running smoothly.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-white/60 hover:text-mint transition-colors">All Services</Link></li>
              <li><Link to="/services/oil-change" className="text-white/60 hover:text-mint transition-colors">Oil Change</Link></li>
              <li><Link to="/services/brake-repair" className="text-white/60 hover:text-mint transition-colors">Brake Repair</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="text-white/60 hover:text-mint transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-white/60 hover:text-mint transition-colors">Careers</Link></li>
              <li><Link to="/reviews" className="text-white/60 hover:text-mint transition-colors">Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-white/60 hover:text-mint transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-white/60 hover:text-mint transition-colors">Terms</Link></li>
              <li><Link to="/warranty" className="text-white/60 hover:text-mint transition-colors">Warranty</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-mint/10 mt-16 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Fix my Ride. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
