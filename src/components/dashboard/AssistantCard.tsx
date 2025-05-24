import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { ThemeType } from "@/App";

interface AssistantCardProps {
  theme?: ThemeType;
}

const AssistantCard = ({ theme = "default" }: AssistantCardProps) => {
  
  const getThemeClasses = () => {
    switch (theme) {
      case "royal":
        return "bg-theme-royal-card border-theme-royal-border royal-gradient bg-opacity-10";
      case "ocean":
        return "bg-theme-ocean-card border-theme-ocean-border ocean-gradient bg-opacity-10";
      case "emerald":
        return "bg-theme-emerald-card border-theme-emerald-border emerald-gradient bg-opacity-10";
      case "sunset":
        return "bg-theme-sunset-card border-theme-sunset-border sunset-gradient bg-opacity-10";
      case "pink":
        return "bg-theme-pink-card border-theme-pink-border pink-gradient bg-opacity-10";
      case "green":
        return "bg-white border-teal-200 shadow-sm hover:shadow-teal-glow transition-all duration-300";
      default:
        return "glass-card";
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
        return "bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 shadow-sm hover:shadow-md transition-all duration-300";
      default:
        return "animate-pulse-glow";
    }
  };
  
  const getMessageBoxClass = () => {
    switch (theme) {
      case "royal":
        return "bg-black/40 backdrop-blur-md rounded-lg p-4 mb-4 border border-theme-royal-primary/10";
      case "ocean":
        return "bg-black/40 backdrop-blur-md rounded-lg p-4 mb-4 border border-theme-ocean-primary/10";
      case "emerald":
        return "bg-black/40 backdrop-blur-md rounded-lg p-4 mb-4 border border-theme-emerald-primary/10";
      case "sunset":
        return "bg-black/40 backdrop-blur-md rounded-lg p-4 mb-4 border border-theme-sunset-primary/10";
      case "pink":
        return "bg-black/40 backdrop-blur-md rounded-lg p-4 mb-4 border border-theme-pink-primary/10";
      case "green":
        return "bg-teal-50 rounded-lg p-4 mb-4 border border-teal-100 shadow-sm";
      default:
        return "bg-black/40 backdrop-blur-md rounded-lg p-4 mb-4 border border-primary/10";
    }
  };

  return (
    <Card className={`col-span-1 ${getThemeClasses()}`}>
      <CardHeader>
        <CardTitle className={theme === "green" ? "text-teal-600" : theme !== "default" ? "theme-gradient-text" : ""}>
          MetroMind Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={getMessageBoxClass()}>
          <p className={`text-sm ${theme === "green" ? "text-teal-800" : ""}`}>How are you feeling today? Would you like to talk about anything specific?</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className={`flex-1 ${theme === "green" ? "border-teal-200 text-teal-700 bg-white hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300" : "border-white/10 bg-black/40 hover:bg-primary/20 hover:text-primary hover:border-primary/30"}`}
          >
            I'm feeling anxious
          </Button>
          <Button 
            variant="outline" 
            className={`flex-1 ${theme === "green" ? "border-teal-200 text-teal-700 bg-white hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300" : "border-white/10 bg-black/40 hover:bg-primary/20 hover:text-primary hover:border-primary/30"}`}
          >
            I'm doing well
          </Button>
          <Button className={`flex-shrink-0 ${getButtonClass()}`}>
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssistantCard;
