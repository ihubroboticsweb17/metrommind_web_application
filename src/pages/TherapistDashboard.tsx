
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, Brain, ClipboardList, Search, Bell, Settings, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import VoiceAssistant from "@/components/VoiceAssistant";
import StatsCard from "@/components/dashboard/StatsCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const TherapistDashboard = () => {
  const navigate = useNavigate();

  // Check if user is logged in and has correct role
  useEffect(() => {
    const userData = localStorage.getItem("metroMindUser");
    if (!userData) {
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== "therapist") {
      navigate("/login");
    }
  }, [navigate]);

  // Sample patient data
  const patients = [
    { id: 1, name: "Alex Johnson", lastSession: "Yesterday", status: "High Risk", nextSession: "Tomorrow, 2:00 PM" },
    { id: 2, name: "Maria Garcia", lastSession: "3 days ago", status: "Stable", nextSession: "Friday, 10:00 AM" },
    { id: 3, name: "James Wilson", lastSession: "1 week ago", status: "Improving", nextSession: "Monday, 3:30 PM" },
    { id: 4, name: "Sarah Chen", lastSession: "2 days ago", status: "New Patient", nextSession: "Thursday, 1:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <DashboardHeader 
          title="Therapist Dashboard" 
          buttonText="Add New Patient"
          onButtonClick={() => console.log("Add new patient clicked")}
        />

        <div className="flex items-center justify-between mb-8 p-4 bg-white dark:bg-metro-dark-highlight rounded-lg shadow-sm">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search patients..." 
              className="pl-10 bg-transparent dark:bg-metro-dark-highlight/50 border-none focus-visible:ring-green-500" 
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-xs text-white">3</span>
            </Button>
            
            <Button variant="outline" size="icon" className="text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button className="bg-green-500 hover:bg-green-600 hidden md:flex">
              Add New Patient
            </Button>
          </div>
        </div>

        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="dark:bg-metro-dark-highlight bg-white p-1 rounded-xl shadow-sm border border-green-100">
            <TabsTrigger 
              value="patients" 
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg"
            >
              My Patients
            </TabsTrigger>
            <TabsTrigger 
              value="schedule" 
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger 
              value="assessments" 
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg"
            >
              Assessments
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg"
            >
              Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="patients" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Patients"
                value="24"
                description="+2 this month"
                icon={<Users className="h-5 w-5" />}
                theme="green"
                animationDelay="0ms"
              />
              <StatsCard
                title="Today's Sessions"
                value="5"
                description="Next: Alex Johnson (2:00 PM)"
                icon={<Calendar className="h-5 w-5" />}
                theme="green"
                animationDelay="100ms"
              />
              <StatsCard
                title="AI Insights"
                value="7 New"
                description="Across 4 patients"
                icon={<Brain className="h-5 w-5" />}
                theme="green"
                animationDelay="200ms"
              />
              <StatsCard
                title="Pending Reviews"
                value="3"
                description="Treatment plans needing review"
                icon={<ClipboardList className="h-5 w-5" />}
                theme="green"
                animationDelay="300ms"
              />
            </div>
            
            <Card className="border-green-100 shadow-green-glow overflow-hidden bg-white">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    Patient List
                    <Sparkles className="h-4 w-4 text-green-500" />
                  </CardTitle>
                  <Badge className="bg-green-500 hover:bg-green-600">
                    {patients.length} Active Patients
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md">
                  <div className="grid grid-cols-5 bg-green-50 p-3 text-sm font-medium text-green-800">
                    <div>Name</div>
                    <div>Last Session</div>
                    <div>Status</div>
                    <div>Next Session</div>
                    <div></div>
                  </div>
                  <div className="divide-y dark:divide-metro-dark-border/50 divide-green-100">
                    {patients.map((patient) => (
                      <div 
                        key={patient.id} 
                        className="grid grid-cols-5 p-4 text-sm items-center hover:bg-green-50/50 transition-colors"
                      >
                        <div className="font-medium text-green-800">{patient.name}</div>
                        <div className="text-green-700">{patient.lastSession}</div>
                        <div>
                          <Badge className={`
                            ${patient.status === "High Risk" ? "bg-red-500 hover:bg-red-600" : 
                              patient.status === "Stable" ? "bg-green-500 hover:bg-green-600" : 
                              patient.status === "Improving" ? "bg-blue-500 hover:bg-blue-600" : 
                              "bg-yellow-500 hover:bg-yellow-600"}
                              shadow-sm
                          `}>
                            {patient.status}
                          </Badge>
                        </div>
                        <div className="text-green-700">{patient.nextSession}</div>
                        <div className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-6">
            <Card className="border-green-100 shadow-green-glow bg-white">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-green-800">Weekly Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 p-2">
                  <div className="space-y-3">
                    <div className="font-medium text-green-800 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-500" />
                      Today
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 rounded-md bg-green-50 border border-green-100 hover:shadow-md transition-all">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium text-green-800">Alex Johnson</p>
                            <p className="text-sm text-green-600">Initial Assessment</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-800">2:00 PM - 3:00 PM</p>
                            <p className="text-sm text-green-600">Virtual</p>
                          </div>
                        </div>
                      </div>
                      {/* More schedule items would go here */}
                      <Skeleton className="h-20 w-full bg-green-50" />
                      <Skeleton className="h-20 w-full bg-green-50" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="assessments" className="space-y-6">
            <Card className="border-green-100 shadow-green-glow bg-white">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-green-800">Patient Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 p-2">
                  <Skeleton className="h-[200px] w-full bg-green-50" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <Card className="border-green-100 shadow-green-glow bg-white">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-green-800">AI Insights & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 p-2">
                  <Skeleton className="h-[200px] w-full bg-green-50" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <VoiceAssistant />
    </div>
  );
};

export default TherapistDashboard;
