import { Brain, ArrowRight } from "lucide-react";
import { ThemeType } from "@/App";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "/image/logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface HeroSectionProps {
  theme?: ThemeType;
}
import Lottie from "lottie-react";
import Ani from "../../assets/json/logoAni.json";
const HeroSection = ({ theme = "default" }: HeroSectionProps) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role"); // Assuming this is the key you're storing the role in
    if (token) {
      setIsLoggedIn(true);
    }
    if (role) {
      setUserRole(role);
    }
  }, []);      


  const handleLearnMore = () => {
    switch (userRole) {
       case "user":
        navigate("/patient-dashboard");
        break;
      case "psychiatrist":
        navigate("/psychiatrist_dashboard");
        break;
      case "junior_psychologist":
        navigate("/junior-pysychology-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
        case "senior_psychologist":
          navigate("/senior-pysychology-dashboard");
          break;
      default:
        navigate("/");
        break;
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case "royal":
        return "bg-gradient-radial from-theme-royal-background via-theme-royal-card/30 to-theme-royal-background";
      case "ocean":
        return "bg-gradient-radial from-theme-ocean-background via-theme-ocean-card/30 to-theme-ocean-background";
      case "emerald":
        return "bg-gradient-radial from-theme-emerald-background via-theme-emerald-card/30 to-theme-emerald-background";
      case "sunset":
        return "bg-gradient-radial from-theme-sunset-background via-theme-sunset-card/30 to-theme-sunset-background";
      case "pink":
        return "bg-gradient-radial from-theme-pink-background via-theme-pink-card/30 to-theme-pink-background";
      case "green":
        return "bg-white"; // Clean white background for green theme
      default:
        return "bg-gradient-radial from-white via-blue-50/30 to-white dark:from-background dark:via-card/30 dark:to-background";
    }
  };

  const getButtonClass = () => {
    switch (theme) {
      case "royal":
        return "bg-theme-royal-primary hover:bg-theme-royal-accent royal-glow";
      case "ocean":
        return "bg-theme-ocean-primary hover:bg-theme-ocean-accent ocean-glow";
      case "emerald":
        return "bg-theme-emerald-primary hover:bg-theme-emerald-accent emerald-glow";
      case "sunset":
        return "bg-theme-sunset-primary hover:bg-theme-sunset-accent sunset-glow";
      case "pink":
        return "bg-theme-pink-primary hover:bg-theme-pink-accent pink-glow";
      case "green":
        return "bg-theme-green-primary hover:bg-teal-600 text-white hover:shadow-lg";
      default:
        return "metro-button";
    }
  };

  const getSecondaryButtonClass = () => {
    switch (theme) {
      case "royal":
        return "border-theme-royal-primary/20 text-theme-royal-primary hover:bg-theme-royal-primary/5";
      case "ocean":
        return "border-theme-ocean-primary/20 text-theme-ocean-primary hover:bg-theme-ocean-primary/5";
      case "emerald":
        return "border-theme-emerald-primary/20 text-theme-emerald-primary hover:bg-theme-emerald-primary/5";
      case "sunset":
        return "border-theme-sunset-primary/20 text-theme-sunset-primary hover:bg-theme-sunset-primary/5";
      case "pink":
        return "border-theme-pink-primary/20 text-theme-pink-primary hover:bg-theme-pink-primary/5";
      case "green":
        return "border-theme-green-primary text-theme-green-primary hover:bg-theme-green-primary/5";
      default:
        return "border-primary/20 text-primary hover:bg-primary/5";
    }
  };

  const getIconClass = () => {
    switch (theme) {
      case "royal":
        return "text-theme-royal-primary";
      case "ocean":
        return "text-theme-ocean-primary";
      case "emerald":
        return "text-theme-emerald-primary";
      case "sunset":
        return "text-theme-sunset-primary";
      case "pink":
        return "text-theme-pink-primary";
      case "green":
        return "text-theme-green-primary";
      default:
        return "text-primary";
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center pt-8 pb-32 ${getThemeClasses()}`}
    >
      <div className="metro-container">
        <div className="text-center ">
          <div
            className={`inline-block  ${
              theme === "green"
                ? "bg-theme-white-primary/10"
                : theme !== "default"
                ? `bg-${
                    theme === "royal"
                      ? "theme-royal-primary"
                      : theme === "ocean"
                      ? "theme-ocean-primary"
                      : theme === "emerald"
                      ? "theme-emerald-primary"
                      : theme === "sunset"
                      ? "theme-sunset-primary"
                      : theme === "pink"
                      ? "theme-pink-primary"
                      : "primary"
                  }/5`
                : "bg-primary/5"
            } rounded-2xl`}
          >
            {/* <Brain className={`h-12 w-12 ${getIconClass()}`} /> */}
            {/* <img src={Logo} alt={Logo} className="relative z-10 w-32 " /> */}
         <img 
  src={Logo} 
  alt="Logo" 
  className="relative z-10 w-32 h-30 object-contain" 
/>

          </div>
          <motion.h1
           
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
          >
            AI-Powered Mental Health
            <span
              className={`${
                theme === "green"
                  ? "text-theme-green-primary"
                  : theme !== "default"
                  ? "theme-gradient-text"
                  : "text-primary"
              } block`}
            >
              Dashboard
            </span>
          </motion.h1>
     

          <p className="max-w-2xl mx-auto text-xl text-muted-foreground pt-6">
            Transform mental healthcare delivery with advanced AI analytics,
            real-time monitoring, and intelligent insights for better patient
            outcomes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            {isLoggedIn ? (
              <button
                onClick={handleLearnMore}
                className={`px-4 py-2.5 rounded-md group font-medium transition-all duration-300 
                  ${getButtonClass()} inline-flex items-center`}
              >
                Dashboard
                <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <Link
                to="/login"
                className={`px-6 py-2.5 rounded-md group font-medium transition-all duration-300 
                  ${getButtonClass()} inline-flex items-center`}
              >
                Login
                <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            {/* <button
              className={`px-6 py-2.5 rounded-md border transition-colors duration-300 ${getSecondaryButtonClass()}`}
            >
              Learn More
            </button> */}
          </div>
        </div>
        <div className="border-b border-teal-200 mt-32"></div>
      </div>
    </div>
  );
};

export default HeroSection;