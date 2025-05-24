
import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";
import { ThemeType } from "@/App";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  style?: CSSProperties;
  theme?: ThemeType;
}

const DashboardCard = ({ 
  title, 
  children, 
  className, 
  icon, 
  style,
  theme = "default" 
}: DashboardCardProps) => {
  
  const getThemeClasses = () => {
    switch (theme) {
      case "royal":
        return "bg-theme-royal-card border-theme-royal-border shadow-royal-glow";
      case "ocean":
        return "bg-theme-ocean-card border-theme-ocean-border shadow-ocean-glow";
      case "emerald":
        return "bg-theme-emerald-card border-theme-emerald-border shadow-emerald-glow";
      case "sunset":
        return "bg-theme-sunset-card border-theme-sunset-border shadow-sunset-glow";
      case "pink":
        return "bg-theme-pink-card border-theme-pink-border shadow-pink-glow";
      case "green":
        return "bg-theme-teal-card border-teal-200-border shadow-gray-200";
      default:
        return "dark:bg-[#0c0621] dark:border dark:border-primary/10 dark:shadow-purple-card hover:dark:shadow-purple-hover";
    }
  };

  return (
    <div className={cn(
      "metro-card animate-scale-in card-shimmer transition-shadow duration-300",
      getThemeClasses(),
      className
    )} style={style}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={cn(
          "text-xl font-semibold text-foreground",
          theme !== "default" && "theme-gradient-text"
        )}>{title}</h3>
        {icon && <div className={cn(
          "animate-float-subtle",
          theme === "royal" ? "text-theme-royal-primary" : 
          theme === "ocean" ? "text-theme-ocean-primary" : 
          theme === "emerald" ? "text-theme-emerald-primary" : 
          theme === "sunset" ? "text-theme-sunset-primary" : 
          theme === "pink" ? "text-theme-pink-primary" : 
          theme === "green" ? "text-theme-green-primary" : 
          "text-primary"
        )}>{icon}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardCard;
