
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
      case "junior_psychologist":
        navigate("/junior-pysychology-dashboard");
        break;
        case "senior_psychologist":
        navigate("/senior-pysychology-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
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
    <div className={` ${theme !== "default" ? `theme-${theme}` : ""}`}>
      <Navbar onLearnMore={handleLearnMore} />
       <main className="pt-16">
        <HeroSection theme={theme} />
        <FeaturesSection theme={theme} />
      </main> {/* Add padding to account for fixed navbar */}
      
      <FooterSection theme={theme}/>
    </div>
  );
};

export default Index;
