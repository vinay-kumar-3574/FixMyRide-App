import { useLogout } from "../../hooks/logoutHandler";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/useDarkMode";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Car,
  Home,
  Menu,
  Moon,
  Sun,
  User,
  Wrench,
  ClipboardList,
  HelpCircle,
  LogOut,
  Settings,
} from "lucide-react";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const handleLogout = useLogout(navigate);
  useEffect(() => {
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuRef]);
  

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm"
          : "bg-background/80 backdrop-blur-lg shadow-sm"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold transition-transform hover:scale-105"
        >
         <img 
            src="\fixmyapp logo.png" 
            alt="App Logo" 
            className="h-12 w-auto mx-auto"
          />
          <span className="text-foreground">
            Fix<span className="text-brand-blue">My</span>Ride
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 animate-slide-in-down">
  <Link
    to="/dashboard"
    className="group flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-all duration-300"
  >
    <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
    <span className="relative link-underline">Home</span>
  </Link>

  <Link
    to="/dashboard/services"
    className="group flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-all duration-300"
  >
    <Wrench className="h-5 w-5 transition-transform group-hover:scale-110" />
    <span className="relative link-underline">Services</span>
  </Link>

  <Link
    to="/dashboard/history"
    className="group flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-all duration-300"
  >
    <ClipboardList className="h-5 w-5 transition-transform group-hover:scale-110" />
    <span className="relative link-underline">History</span>
  </Link>

  <Link
    to="/dashboard/support"
    className="group flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-all duration-300"
  >
    <HelpCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
    <span className="relative link-underline">Support</span>
  </Link>
</div>


        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon "
            onClick={toggleDarkMode}
            className="rounded-full transition-transform hover:scale-110 text-black"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-brand-blue" />
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full transition-transform hover:scale-110 text-black"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-scale-in glass-card w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-2 cursor-pointer"  onClick={() => navigate("/dashboard/profile")}>
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => navigate("/dashboard/settings")}>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-2 cursor-pointer text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4"  />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border shadow-lg animate-slide-in-right"
        >
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted text-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/dashboard/services"
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted text-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Wrench className="h-5 w-5" />
              <span>Services</span>
            </Link>
            <Link
              to="/dashboard/history"
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted text-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ClipboardList className="h-5 w-5" />
              <span>History</span>
            </Link>
            <Link
              to="/dashboard/support"
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted text-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HelpCircle className="h-5 w-5" />
              <span>Support</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
