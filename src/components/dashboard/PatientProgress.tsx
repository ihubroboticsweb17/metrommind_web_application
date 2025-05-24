
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ThemeType } from "@/App";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface PatientProgressProps {
  theme: ThemeType;
}

const PatientProgress = ({ theme }: PatientProgressProps) => {
  const isMobile = useIsMobile();
  
  // Sample mood data for visualization
  const moodData = [
    { day: "Mon", value: 75 },
    { day: "Tue", value: 62 },
    { day: "Wed", value: 80 },
    { day: "Thu", value: 85 },
    { day: "Fri", value: 72 },
    { day: "Sat", value: 90 },
    { day: "Sun", value: 88 },
  ];

  // Treatment plan progress data
  const treatmentProgress = [
    { name: "Anxiety Management", completed: 8, total: 10 },
    { name: "Sleep Improvement", completed: 6, total: 8 },
    { name: "Mindfulness", completed: 12, total: 15 },
  ];

  const getThemeColor = () => {
    switch (theme) {
      case "royal": return "#7C3AED";
      case "ocean": return "#0EA5E9";
      case "emerald": return "#10B981";
      case "sunset": return "#F97316";
      case "pink": return "#EC4899";
      case "green": return "#2ecc71";
      default: return "#2ecc71";
    }
  };

  return (
    <Card className={`${theme !== "default" ? `bg-theme-${theme}-card border-theme-${theme}-border` : "bg-black-gradient border border-white/5 shadow-dark-glow"}`}>
      <CardHeader>
        <CardTitle className={theme !== "default" ? "theme-gradient-text" : ""}>
          Treatment Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Chart - Show on all devices */}
        <div>
          <h3 className="text-sm font-medium mb-2">Weekly Mood Tracking</h3>
          <ChartContainer
            config={{
              mood: {
                label: "Mood Score",
                theme: {
                  light: getThemeColor(),
                  dark: getThemeColor(),
                },
              },
            }}
            className="h-48"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis hide />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      label="Mood Score"
                      labelFormatter={(value) => `${value}`}
                    />
                  }
                />
                <Bar 
                  dataKey="value" 
                  name="mood" 
                  radius={[4, 4, 0, 0]} 
                  fill={theme === "green" ? "#2ecc71" : getThemeColor()} 
                  fillOpacity={0.8} 
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Treatment Plan Progress - ONLY shown on desktop */}
        {!isMobile && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Treatment Plan Progress</h3>
            {treatmentProgress.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">
                    {item.completed}/{item.total} sessions
                  </span>
                </div>
                <Progress 
                  value={(item.completed / item.total) * 100} 
                  className={`h-2 ${theme === "green" ? "green-gradient" : ""}`}
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Mobile treatment progress - COMPLETELY REDESIGNED with green cards ONLY */}
        {isMobile && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Treatment Plan Progress</h3>
            {treatmentProgress.map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-green-50 border border-green-100 shadow-sm">
                <div className="flex flex-col gap-1.5">
                  <span className="font-medium text-sm text-green-800">{item.name}</span>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-700">
                      {Math.round((item.completed / item.total) * 100)}% Complete
                    </span>
                    <span className="text-sm px-2.5 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                      {item.completed}/{item.total}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientProgress;
