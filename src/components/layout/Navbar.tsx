// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X, LogIn, LogOut, User, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { logout } from "@/models/auth";
// import Logo from '/image/logo.png';

// interface NavbarProps {
//   onLearnMore?: () => void;
// }

// const Navbar = ({ onLearnMore }: NavbarProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [email, setEmail] = useState(null);
//   const [name, setName] = useState(null);
//   const [role, setRole] = useState(null);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   // Check if user is logged in on component mount
//   useEffect(() => {
//     const storedEmail = localStorage.getItem("email");
//     const storedRole = localStorage.getItem("role");
//     const storedName = localStorage.getItem("name");
//     if (storedEmail && storedRole) {
//       setEmail(storedEmail);
//       setRole(storedRole);
//       setName(storedName);
//     }
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setUserDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setEmail(null);
//     setRole(null);
//     setName(null);
//     setUserDropdownOpen(false);
//     navigate("/");
//     toast({
//       title: "Logged out successfully",
//       description: " You have been sucessfully logout",
//     });
//   };

//   // Determine dashboard link based on user role - FIXED VERSION
//   const getDashboardLink = () => {
//     if (!role) return "/dashboard";
//     switch (role) {
//       case "user":
//         return "/patient-dashboard";
//       case "psychiatrist":
//         return "/psychiatrist_dashboard";
//       case "junior_psychologist":
//         return "/junior-pysychology-dashboard";
//       case "admin":
//         return "/admin-dashboard";
//       case "senior_psychologist":
//         return "/senior-pysychology-dashboard";
//       default:
//         return "/dashboard";
//     }
//   };

//   // Handle dashboard navigation for mobile
//   const handleDashboardClick = () => {
//     const dashboardPath = getDashboardLink();
//     navigate(dashboardPath);
//     setIsOpen(false);
//   };

//   return (
//     <nav className="fixed w-full bg-white shadow-sm z-50 border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center ">
//               <img 
//                 src={Logo} 
//                 alt="MetroMind Logo" 
//                 width="64" 
//                 height="64"
//                 className="w-16 h-16 sm:w-12 sm:h-12 object-contain object-center"
//               />
//               <span className="text-xl font-bold text-gray-900">MetroMind</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <div className="flex items-center space-x-8">
//               {email ? (
//                 <div className="relative" ref={dropdownRef}>
//                   <button 
//                     className="flex items-center gap-2 text-gray-700 hover:text-teal-500 transition-colors duration-200" 
//                     onClick={() => setUserDropdownOpen(!userDropdownOpen)}
//                   >
//                     <User className="h-5 w-5" />
//                     <span>{name || email}</span>
//                     <ChevronDown className="h-4 w-4" />
//                   </button>
                  
//                   {userDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
//                       <div className="px-4 py-2 border-b border-gray-100">
//                         <p className="font-medium text-gray-800">{name}</p>
//                         <p className="text-sm text-gray-600">{email}</p>
//                         <p className="text-xs text-gray-500 capitalize">{role}</p>
//                       </div>
//                       <div className="px-4 py-2">
//                         <button
//                           onClick={() => {
//                             navigate(getDashboardLink());
//                             setUserDropdownOpen(false);
//                           }}
//                           className="flex items-center gap-2 py-2 text-gray-700 hover:text-teal-500 transition-colors duration-200 w-full text-left"
//                         >
//                           Dashboard
//                         </button>
                        
//                         <button
//                           onClick={handleLogout}
//                           className="flex items-center gap-2 py-2 text-gray-700 hover:text-red-500 transition-colors duration-200 w-full"
//                         >
//                           <LogOut className="h-4 w-4" />
//                           Sign out
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <Button
//                   asChild
//                   variant="default"
//                   className="bg-teal-500 hover:bg-teal-600 text-white"
//                 >
//                   <Link to="/login" className="flex items-center gap-2">
//                     <LogIn className="h-4 w-4" />
//                     Sign in
//                   </Link>
//                 </Button>
//               )}
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700 hover:text-teal-500 transition-colors duration-200"
//             >
//               {isOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden py-4 animate-slide-down bg-white">
//             <Link
//               to="/"
//               className="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Home
//             </Link>
//             {email && (
//               <button
//                 onClick={handleDashboardClick}
//                 className="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-200 w-full text-left"
//               >
//                 Dashboard
//               </button>
//             )}
//             <Link
//               to="#features"
//               className="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Features
//             </Link>
//             <Link
//               to="#contact"
//               className="block py-2 text-gray-700 hover:text-teal-500 transition-colors duration-200"
//               onClick={() => setIsOpen(false)}
//             >
//               Contact
//             </Link>

//             {email ? (
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="mb-2">
//                   <p className="font-medium text-gray-800">{name}</p>
//                   <p className="text-sm text-gray-600">{email}</p>
//                   <p className="text-xs text-gray-500 capitalize">{role}</p>
//                 </div>
//                 <Button
//                   onClick={handleLogout}
//                   variant="outline"
//                   size="sm"
//                   className="flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-50"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   Sign out
//                 </Button>
//               </div>
//             ) : (
//               <Button
//                 asChild
//                 className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white"
//               >
//                 <Link
//                   to="/login"
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <LogIn className="h-4 w-4" />
//                   Sign in
//                 </Link>
//               </Button>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react"; // Added LayoutDashboard icon
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/models/auth";
import Logo from "/image/logo.png";

interface NavbarProps {
  onLearnMore?: () => void; // Keeping this if you need it for specific home page interactions
}

const Navbar = ({ onLearnMore }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication state on mount
  useEffect(() => {
    const checkAuthState = () => {
      const storedEmail = localStorage.getItem("email");
      const storedRole = localStorage.getItem("role");
      const storedName = localStorage.getItem("name");
      const token = localStorage.getItem("access_token");

      if (storedEmail && token) {
        setEmail(storedEmail);
        setRole(storedRole);
        setName(storedName);
        console.log("User is logged in:", {
          email: storedEmail,
          role: storedRole,
          name: storedName,
        });
      } else {
        setEmail(null);
        setRole(null);
        setName(null);
        console.log("User is not logged in");
      }
    };

    checkAuthState();
    // Add event listener for storage changes
    window.addEventListener("storage", checkAuthState);

    return () => {
      window.removeEventListener("storage", checkAuthState);
    };
  }, []);

  // Add scroll detection with debounce for better performance
  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(() => {
        setIsScrolled(window.scrollY > 10);
      }, 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleLogout = () => {
    logout(); // This function should clear relevant local storage items
    setEmail(null);
    setRole(null);
    setName(null);
    setUserDropdownOpen(false);

    // Dispatch custom event for logout
    window.dispatchEvent(new CustomEvent("auth-logout"));

    navigate("/");
    toast({
      title: "Logged out successfully",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!role) return "/"; // Fallback if no role is found

    switch (role) {
      case "user":
        return "/patient-dashboard";
      case "psychiatrist":
        return "/psychiatrist_dashboard";
      case "junior_psychologist":
        return "/junior-pysychology-dashboard";
      case "admin":
        return "/admin-dashboard";
      case "senior_psychologist":
        return "/senior-pysychology-dashboard";
      default:
        return "/"; // Default if role doesn't match
    }
  };

  const handleDashboardClick = () => {
    navigate(getDashboardLink());
    setIsOpen(false); // Close mobile menu if open
    setUserDropdownOpen(false); // Close desktop dropdown if open
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/60 backdrop-blur-md backdrop-saturate-150 border-b border-gray-100/20 shadow-lg supports-[backdrop-filter]:bg-white/40"
          : "bg-white/95 border-b border-gray-100"
      }`}
    >
      <div
        className={`max-w-full mx-auto px-4 sm:px-6 lg:px-8 ${
          isScrolled ? "py-2" : "py-4"
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src={Logo}
                alt="MetroMind Logo"
                className="w-24 h-20 object-contain object-center transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-extrabold text-gray-900  tracking-tight">
                Metro<span className="text-teal-600">Mind</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation & User Actions */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {/* Main Navigation Links (if any, add them here) */}
              {/* For now, assuming links are only in mobile or dashboard */}
            

              {email ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center gap-2 text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 focus:outline-none"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    aria-expanded={userDropdownOpen ? "true" : "false"}
                  >
                    <User className="h-5 w-5" />
                    <span className="truncate max-w-[120px]">
                      {name || email}
                    </span>{" "}
                    {/* Truncate long names/emails */}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        userDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-800 truncate">
                          {name}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {email}
                        </p>
                        <p className="text-xs text-gray-500 capitalize mt-1 px-2 py-0.5 bg-gray-100 rounded-full inline-block">
                          {role?.replace(/_/g, " ") || "User"}
                        </p>
                      </div>
                      <div className="px-4 py-2 space-y-1">
                       
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 py-2 px-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full text-left rounded-md"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  asChild
                  variant="default"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Link to="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-teal-600 transition-colors duration-200 focus:outline-none"
              aria-label="Toggle mobile menu"
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
          <div className="md:hidden py-4 border-t border-gray-100 bg-white animate-slide-down">
            <Link
              to="/"
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors duration-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {email && (
              <button
                onClick={handleDashboardClick}
                className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors duration-200 font-medium w-full text-left"
              >
                Dashboard
              </button>
            )}
            {/* Added example static links - you might want to make these dynamic or conditional */}
            <Link
              to="/#features" // Assuming you have an ID 'features' on your homepage
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors duration-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/#contact" // Assuming you have an ID 'contact' on your homepage
              className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors duration-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {email ? (
              <div className="mt-4 pt-4 border-t border-gray-100 px-4">
                <div className="mb-3">
                  <p className="font-semibold text-gray-800 truncate">{name}</p>
                  <p className="text-sm text-gray-600 truncate">{email}</p>
                  <p className="text-xs text-gray-500 capitalize mt-1 px-2 py-0.5 bg-gray-100 rounded-full inline-block">
                    {role?.replace(/_/g, " ") || "User"}
                  </p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full justify-center"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                asChild
                className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg justify-center"
              >
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Sign in
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