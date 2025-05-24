import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { ThemeType } from "@/App";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: ReactNode;
  animationDelay?: string;
  theme?: ThemeType;
}

const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  animationDelay,
  theme = "default"
}: StatsCardProps) => {
  
  const getThemeClasses = () => {
    switch (theme) {
      case "royal":
        return "bg-theme-royal-card border-theme-royal-border";
      case "ocean":
        return "bg-theme-ocean-card border-theme-ocean-border";
      case "emerald":
        return "bg-theme-emerald-card border-theme-emerald-border";
      case "sunset":
        return "bg-theme-sunset-card border-theme-sunset-border";
      case "pink":
        return "bg-theme-pink-card border-theme-pink-border";
      case "green":
        return "bg-theme-green-card border-theme-green-border";
      default:
        return "black-card";
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
        return "text-teal-500";
      default:
        return "text-primary";
    }
  };

  return (
    <Card 
      className={`${getThemeClasses()}${theme === "green" ? "bg-teal-50 " : ""} animate-fade-in hover:shadow-lg hover:-translate-y-1 transition-all duration-600 rounded-md`}
     
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-muted py-4">
        <CardTitle className={`text-sm font-medium ${theme === "green" ? "text-teal-800" : ""}`}>{title}</CardTitle>
        <div className={`${getIconClass()} ${theme === "green" ? "bg-teal-50 p-2 rounded-full" : ""}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${theme === "green" ? "text-teal-600" : theme !== "default" ? "bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent" : ""}`}>{value}</div>
        {description && (
          <p className={`text-xs ${theme === "green" ? "text-teal-600/80" : "text-muted-foreground"}`}>{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
