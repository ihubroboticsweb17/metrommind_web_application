import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, LogOut, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/models/auth";
import Logo from '/image/logo.png';

interface NavbarProps {
  onLearnMore?: () => void;
}

const Navbar = ({ onLearnMore }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");
    if (storedEmail && storedRole) {
      setEmail(storedEmail);
      setRole(storedRole);
      setName(storedName);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setEmail(null);
    setRole(null);
    setName(null);
    setUserDropdownOpen(false);
    navigate("/");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!role) return "/dashboard";

    switch (role) {
      case "patient":
        return "/patient-dashboard";
      case "therapist":
        return "/therapist-dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/dashboard";
    }
  };

  return (
    <nav className="fixed w-full bg-white shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center ">
              {/* <img src={Logo} alt="Logo" className="relative z-10 w-14 h-16" /> */}
                <img 
                  src={Logo} 
                  alt="MetroMind Logo" 
                  className="w-16 h-16 sm:w-12 sm:h-12  object-contain object-center"
                />
              
              <span className="text-xl font-bold text-gray-900">MetroMind</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
          

              {email ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    className="flex items-center gap-2 text-gray-700 hover:text-teal-500 transition-colors duration-200" 
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  >
                    <User className="h-5 w-5" />
                    <span>{name || email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-gray-800">{name}</p>
                        <p className="text-sm text-gray-600">{email}</p>
                        <p className="text-xs text-gray-500 capitalize">{role}</p>
                      </div>
                      <div className="px-4 py-2">
                       <button onClick={onLearnMore }>
                          Dashboard
                        </button>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 py-2 text-gray-700 hover:text-red-500 transition-colors duration-200 w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  asChild
                  variant="default"
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <Link to="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-teal-500 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-slide-down bg-white">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {email && (
              <Link
                to={getDashboardLink()}
                className="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="#features"
              className="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="#contact"
              className="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {email ? (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="mb-2">
                  <p className="font-medium text-gray-800">{name}</p>
                  <p className="text-sm text-gray-600">{email}</p>
                  <p className="text-xs text-gray-500 capitalize">{role}</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                asChild
                className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white"
              >
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;