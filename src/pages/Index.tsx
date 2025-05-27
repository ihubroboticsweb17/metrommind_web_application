
// import HeroSection from "@/components/ui/HeroSection";
// import FeaturesSection from "@/components/ui/FeaturesSection";
// import Navbar from "@/components/layout/Navbar";
// import { useTheme } from "@/App";

// const Index = () => {
//   const { theme } = useTheme();
  
//   return (
//     <div className={`min-h-screen ${theme !== "default" ? `theme-${theme}` : ""}`}>
//       <Navbar />
//       <div className="pt-16"> {/* Add padding to account for fixed navbar */}
//         <HeroSection theme={theme} />
//         <FeaturesSection theme={theme} />
//       </div>
//     </div>
//   );
// };

// export default Index;
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/ui/HeroSection";
import FeaturesSection from "@/components/ui/FeaturesSection"; 
import Navbar from "@/components/layout/Navbar";
import { useTheme } from "@/App";
import { useEffect, useState } from "react";
import FooterSection from "@/components/ui/FooterSection";


const Index = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  
  // Get user role on component mount
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setUserRole(role);
    }
  }, []);
  
  const handleLearnMore = () => {
    switch (userRole) {
      case "psychiatrist":
        navigate("/psychiatrist_dashboard");
        break;
      case "junior":
        navigate("/junior_dashboard");
        break;
      case "admin":
        navigate("/admin_dashboard");
        break;
      case "user":
      navigate("/patient-dashboard");
      break;
      default:
        navigate("/learn-more");
        break;
    }
  };
  
  return (
    <div className={`min-h-screen ${theme !== "default" ? `theme-${theme}` : ""}`}>
      <Navbar onLearnMore={handleLearnMore} />
      <div className="pt-8 pb-6"> {/* Add padding to account for fixed navbar */}
        <HeroSection theme={theme} />
        <FeaturesSection theme={theme} />
      
      </div>
      <FooterSection theme={theme}/>
    </div>
  );
};

export default Index;
