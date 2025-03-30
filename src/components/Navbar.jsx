import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getInitialTheme = () => {
    if (typeof window !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme") === "dark";
    }
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-white transition-transform hover:scale-105"
        >
          <img
            src="/fixmyapp logo.png"
            alt="App Logo"
            className="h-10 sm:h-12 w-auto bg-white rounded-full shadow-lg"
          />
          <span className="text-white text-lg sm:text-2xl">
            Fix<span className="text-yellow-400">My</span>Ride
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { label: "Features", id: "Keyfeatures" },
              { label: "How it Works", id: "features" },
              { label: "Reviews", id: "testimonials" },
              { label: "Contact Us", id: "contact-us" },
            ].map(({ label, id }, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(id)}
                className="text-white/90 hover:text-yellow-300 transition-all duration-300"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Login & Signup - Always Outside Hamburger */}
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-semibold transition-all duration-300"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            onClick={() => setDarkMode(!darkMode)}
            variant="outline"
            className="hidden sm:flex border-white/30 text-white hover:bg-white/10 transition-all duration-300"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden text-white hover:text-yellow-300 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center space-y-6 py-6 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {[
          { label: "Features", id: "Keyfeatures" },
          { label: "How it Works", id: "features" },
          { label: "Reviews", id: "testimonials" },
          { label: "Contact Us", id: "contact-us" },
        ].map(({ label, id }, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(id)}
            className="relative w-4/5 max-w-xs px-6 py-3 text-lg font-semibold text-white uppercase tracking-wide bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:from-yellow-400 hover:to-red-500 active:scale-95 active:shadow-none"
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
