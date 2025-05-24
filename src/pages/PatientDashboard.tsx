
import Navbar from "@/components/layout/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VoiceAssistant from "@/components/VoiceAssistant";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PatientTabs from "@/components/dashboard/PatientTabs";
import { useTheme, ThemeType } from "@/App";
import { Button } from "@/components/ui/button";
import { Paintbrush } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const isMobile = useIsMobile();

  // Check if user is logged in and has correct role
  // useEffect(() => {
  //   const userData = localStorage.getItem("role");
  //   if (!userData) {
  //     navigate("/login");
  //     return;
  //   }
    
  //   const user = JSON.parse(userData);
  //   if (user!== "patient") {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const handleScheduleSession = () => {
    // Placeholder for session scheduling functionality
    console.log("Schedule session clicked");
  };

  const themes: ThemeType[] = ["default", "royal", "ocean", "emerald", "sunset", "pink", "green"];

  return (
    <div className={`min-h-screen bg-background ${theme !== 'default' ? `theme-${theme}` : ''}`}>
      <Navbar />
      <div className={`${isMobile ? 'pt-20 px-2' : 'pt-24 px-4 sm:px-6 lg:px-8'} max-w-7xl mx-auto relative`}>
        <div className={`absolute ${isMobile ? 'top-1 right-1' : 'top-2 right-2'} z-10`}>
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "icon"} 
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="bg-white/80 border-green-200 hover:bg-green-50 hover:text-green-700"
          >
            <Paintbrush className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
          </Button>
          
          {showThemeSelector && (
            <div className={`absolute right-0 mt-2 p-2 bg-white rounded-md border border-green-100 ${isMobile ? 'w-36' : 'w-48'} shadow-md animate-fade-in`}>
              <p className="text-sm mb-2 text-gray-700">Select Theme:</p>
              <div className="grid grid-cols-3 gap-2">
                {themes.map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => {
                      setTheme(themeName);
                      setShowThemeSelector(false);
                    }}
                    className={`p-2 rounded-md transition-all ${
                      theme === themeName ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <div className={`h-6 w-full rounded-sm ${
                      themeName === "default" ? "bg-primary" :
                      themeName === "royal" ? "bg-theme-royal-primary" :
                      themeName === "ocean" ? "bg-theme-ocean-primary" :
                      themeName === "emerald" ? "bg-theme-emerald-primary" :
                      themeName === "sunset" ? "bg-theme-sunset-primary" :
                      themeName === "pink" ? "bg-theme-pink-primary" :
                      "bg-theme-green-primary"
                    }`}></div>
                    <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} mt-1 block text-gray-700`}>{themeName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DashboardHeader 
          title="Patient Dashboard" 
        />
        <PatientTabs />

      </div> 
      {/* <VoiceAssistant /> */}
     
    </div>
  );
};

export default PatientDashboard;
