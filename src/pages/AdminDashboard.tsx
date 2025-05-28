import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

import {
  BrainCircuit,
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardList,
  Layers,
  Pill,
  Plus,
  Sparkle,
  Sparkles,
  Stethoscope,
  PillBottle,
  BriefcaseMedical,
  Cross,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Users,
  Brain,
  FileText,
  BarChart as LucideBarChart,
  PieChart,
  TrendingUp,
  Activity,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/App";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { Dialog } from "@radix-ui/react-dialog";
// import AddDoctorForm from "@/components/adddoctor/adddoctorForm";
import DoctorCreateForm from "./DoctorCreateform";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddDoctorForm from "@/components/adddoctor/AddDoctorForm";
import PatientListTab from "@/components/dashboard/tabs/PatientListTab";
import AdminDoctorListTab from "@/components/dashboard/tabs/AdminDoctorListTab";
import AdminMedicinListTab from "@/components/dashboard/tabs/AdminMedicinListTab";
import AdminCountTab from "@/components/dashboard/tabs/AdminCountTab";
import { CountData } from "@/models/auth";
import SeniorSchedulTab from "@/components/dashboard/tabs/SeniorSchedulTab";
import AdminPatientListTab from "@/components/dashboard/tabs/AdminPatientListTab";
import AienginTab from "@/components/dashboard/tabs/AienginTab";
import AddMedicineTab from "@/components/dashboard/tabs/AddMedicineTab";
import MedicineListTab from "@/components/dashboard/tabs/MedicineListTab";
import MedicineBrandTab from "@/components/dashboard/tabs/MedicineBrandTab";
import AddMedicineBrandTab from "@/components/dashboard/tabs/AddMedicineBrandTab";
import MedicineFreqTab from "@/components/dashboard/tabs/MedicineFreqTab";
import AddMedicineFreqTab from "@/components/dashboard/tabs/AddMedicineFreqTab";
import AdminPatientRejectListTab from "@/components/dashboard/tabs/AdminPatientRejectListTab";

// Sample data for charts
const sessionData = [
  { month: "Jan", sessions: 800, goal: 1000 },
  { month: "Feb", sessions: 950, goal: 1000 },
  { month: "Mar", sessions: 1100, goal: 1000 },
  { month: "Apr", sessions: 1050, goal: 1000 },
  { month: "May", sessions: 1200, goal: 1200 },
  { month: "Jun", sessions: 1350, goal: 1200 },
  { month: "Jul", sessions: 1250, goal: 1200 },
  { month: "Aug", sessions: 1400, goal: 1400 },
  { month: "Sep", sessions: 1500, goal: 1400 },
  { month: "Oct", sessions: 1250, goal: 1400 },
  { month: "Nov", sessions: 1300, goal: 1400 },
  { month: "Dec", sessions: 1450, goal: 1400 },
];
interface Data {
  key: string;
  value: number;
  delay: 500;
}
const userDistributionData = [
  { name: "Patients", value: 462, color: "#4dabf7" },
  { name: "Therapists", value: 32, color: "#9775fa" },
  { name: "Administrators", value: 8, color: "#63e6be" },
  { name: "Support Staff", value: 22, color: "#ffa94d" },
];

const serverMetricsData = [
  { name: "CPU Usage", value: 42 },
  { name: "Memory Usage", value: 67 },
  { name: "Disk Usage", value: 35 },
  { name: "Network Usage", value: 28 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [animate, setAnimate] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpend, setIsOpend] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isDialogAddOpen, setIsDialogAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [count, setCount] = useState<Data[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [refreshList, setRefreshList] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFreq, setOpenFreq] = useState(false);
  const [openMedicine, setOpenMedicine] = useState(false);
  const [refreshListfre, setRefreshListfre] = useState(false);
  const [refreshListBrand, setRefreshListBrand] = useState(false);
  // dialog control

  const handleSuccess = () => {
    setOpenMedicine(false);
    setRefreshList((prev) => !prev);
  };
  const handleSuccessFre = () => {
    setOpenFreq(false);
    setRefreshListfre((prev) => !prev);
  };
  const handleSuccessBrand = () => {
    setOpen(false);
    setRefreshListBrand((prev) => !prev);
  };
  const handleOpenPdf = () => {
    window.open("/medicalReport", "_blank");
  };
  const handleSubmit = () => {
    console.log("Doctor Data Submitted:", {
      name,
      username,
      mobilenumber,
      email,
      password,
    });
    // Add your form submission logic here
  };
  useEffect(() => {
    const userData = localStorage.getItem("role");
    console.log("userData", userData);
    if (!userData) {
      navigate("/login");
      return;
    }

    // const user = localStorage.getItem("role");;
    // console.log("user", user);
    // if (user !== "admin") {
    //   navigate("/login");
    // }
  }, [navigate]);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Helper function to get theme colors
  const getThemeColor = (type: "primary" | "secondary" | "accent") => {
    if (theme === "royal") {
      return type === "primary"
        ? "#51C2B9"
        : type === "secondary"
        ? "#C4B5FD"
        : "#4C1D95";
    } else if (theme === "ocean") {
      return type === "primary"
        ? "#0EA5E9"
        : type === "secondary"
        ? "#BAE6FD"
        : "#0369A1";
    } else if (theme === "emerald") {
      return type === "primary"
        ? "#10B981"
        : type === "secondary"
        ? "#A7F3D0"
        : "#047857";
    } else if (theme === "sunset") {
      return type === "primary"
        ? "#F97316"
        : type === "secondary"
        ? "#FFEDD5"
        : "#C2410C";
    } else if (theme === "pink") {
      return type === "primary"
        ? "#EC4899"
        : type === "secondary"
        ? "#FCE7F3"
        : "#DB2777";
    } else {
      return type === "primary"
        ? "hsl(268, 75%, 60%)"
        : type === "secondary"
        ? "hsl(268, 30%, 96%)"
        : "hsl(268, 75%, 45%)";
    }
  };
  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        const data = await CountData();
        console.log("##########", data);
        setCount(data);
      } catch (err) {
        setError("Failed to load Cound.");
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchCount();
  }, []);

  return (
    <div
      className={`min-h-screen bg-background ${
        theme !== "default" ? `theme-${theme}` : ""
      }`}
    >
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div
            className={`transition-all duration-500 transform ${
              animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome to the MetroMind admin control panel
            </p>
          </div>
          <div
            className={`flex gap-2 transition-all duration-500 delay-100 transform ${
              animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {/* <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleOpenPdf}
            >
              <FileText className="h-4 w-4" />
              Export Reports
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={() => setIsDialogAddOpen(true)}
            >
              Add Doctor
            </Button> */}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-3">
          <TabsList className="grid grid-cols-5 sm:w-[800px] w-full gap-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg gap-2"
            >
              <LucideBarChart className="h-4 w-4 " />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg gap-2"
            >
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>
            {/* <TabsTrigger value="patients" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Patients</span>
            </TabsTrigger> */}
            <TabsTrigger
              value="doctors"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg gap-2"
            >
              <Stethoscope className="h-4 w-4" />
              <span className="hidden sm:inline">Doctors</span>
            </TabsTrigger>
            <TabsTrigger
              value="medicins"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg gap-2"
            >
              {/* <Pill className="h-8 w-8" /> */}
              <BriefcaseMedical className="h-4 w-4" />

              <span className="hidden sm:inline">Medicine Stock</span>
            </TabsTrigger>
            {/* <TabsTrigger
              value="aiengine"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg gap-2"
            >
              <BrainCircuit className="h-4 w-4" />
             <span className="hidden sm:inline">AI Engine</span>    

            </TabsTrigger> */}
            <TabsTrigger
              value="rejectlist"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg gap-2"
            >
              <Cross className="h-4 w-4" />
              <span className="hidden sm:inline">Reject List</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow overflow-hidden bg-white">
              {/* <CardHeader className="bg-teal-50 border-b border-teal-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-teal-800 flex items-center gap-2">
                    Patient List
                    <Sparkles className="h-4 w-4 text-teal-500" />
                  </CardTitle>
                  <Badge className="bg-teal-500 hover:bg-teal-600">
                    Active Patients
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <PatientListTab />
              </CardContent> */}
              <AdminPatientListTab />
            </Card>
          </TabsContent>
          <TabsContent value="rejectlist" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow overflow-hidden bg-white">
              <AdminPatientRejectListTab />
            </Card>
          </TabsContent>
          <TabsContent value="doctors" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow overflow-hidden bg-white">
              {/* <CardHeader className="bg-teal-50 border-b border-teal-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-teal-800 flex items-center gap-2">
                    Doctors List
                    <Sparkles className="h-4 w-4 text-teal-500" />
                  </CardTitle>
                  <Badge className="bg-teal-500 hover:bg-teal-600">
                    Active Doctors
                  </Badge>
                </div>
              </CardHeader> */}
              <CardContent className="p-0">
                <AdminDoctorListTab />
              </CardContent>
            </Card>
          </TabsContent>
          {/* <TabsContent value="medicins" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow overflow-hidden bg-white">
              <CardContent className="p-0">
                <AdminMedicinListTab />
              </CardContent>
            </Card>
          </TabsContent> */}
          <TabsContent value="aiengine" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow bg-white">
              <CardHeader className="bg-teal-50 border-b border-teal-100">
                <div className="flex justify-between items-center mb-4">
                  <CardTitle className="text-teal-800 flex items-center gap-2">
                    AI Engine
                  </CardTitle>
                  {/* <button className="px-4 py-2 border rounded hover:bg-gray-100">
                              Fine-Tuning Controls
                            </button> */}
                </div>
              </CardHeader>
              <CardContent className="text-teal-800">
                <AienginTab />
              </CardContent>
            </Card>
          </TabsContent>
          {/* <TabsContent value="overview" className="space-y-4">
            <OwlCarouselComponent/
          </TabsContent> */}
          <TabsContent value="overview" className="space-y-4">
            <AdminCountTab />
            {/* <div className="grid gap-4 md:grid-cols-2">
              <Card
                className={`col-span-1 transition-all duration-500 transform ${
                  animate
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Session Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      sessions: { color: getThemeColor("primary") },
                      goal: { color: getThemeColor("secondary") },
                    }}
                    className="h-80"
                  >
                    <AreaChart
                      data={sessionData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorSessions"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={getThemeColor("primary")}
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor={getThemeColor("primary")}
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border/40"
                      />
                      <XAxis
                        dataKey="month"
                        className="fill-foreground text-xs"
                      />
                      <YAxis className="fill-foreground text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="sessions"
                        stroke={getThemeColor("primary")}
                        fillOpacity={1}
                        fill="url(#colorSessions)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="goal"
                        stroke={getThemeColor("secondary")}
                        strokeDasharray="5 5"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card
                className={`col-span-1 transition-all duration-500 transform ${
                  animate
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "700ms" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-4 w-4" />
                    User Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={userDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {userDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} users`, name]}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div> */}

            {/* <div className="grid gap-4 md:grid-cols-2">
              <Card
                className={`col-span-1 transition-all duration-500 transform ${
                  animate
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "800ms" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Server Status</span>
                      <span className="text-sm font-medium text-teal-500 flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-teal-500"></span>
                        Operational
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Load</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="w-full bg-secondary/30 rounded-full h-2 mb-4">
                      <div
                        className="h-2 rounded-full bg-primary transition-all duration-1000 ease-out"
                        style={{ width: animate ? "42%" : "0%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Response Time</span>
                      <span className="text-sm font-medium">124ms</span>
                    </div>
                    <div className="w-full bg-secondary/30 rounded-full h-2 mb-4">
                      <div
                        className="h-2 rounded-full bg-teal-500 transition-all duration-1000 ease-out"
                        style={{ width: animate ? "24%" : "0%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Storage Usage</span>
                      <span className="text-sm font-medium">3.2TB / 8TB</span>
                    </div>
                    <div className="w-full bg-secondary/30 rounded-full h-2 mb-4">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-1000 ease-out"
                        style={{ width: animate ? "40%" : "0%" }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Backup</span>
                      <span className="text-sm font-medium">
                        Today, 4:00 AM
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Security Status</span>
                      <span className="text-sm font-medium text-teal-500 flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-teal-500"></span>
                        Secure
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`col-span-1 transition-all duration-500 transform ${
                  animate
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "900ms" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Server Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={serverMetricsData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border/40"
                      />
                      <XAxis
                        type="number"
                        domain={[0, 100]}
                        className="fill-foreground text-xs"
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        className="fill-foreground text-xs"
                      />
                      <Tooltip formatter={(value) => [`${value}%`, "Usage"]} />
                      <Bar
                        dataKey="value"
                        fill={getThemeColor("primary")}
                        radius={[0, 4, 4, 0]}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div> */}
          </TabsContent>
          <TabsContent value="medicins" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Dialog open={openMedicine} onOpenChange={setOpenMedicine}>
                <Card className="border-teal-100 shadow-sm overflow-hidden bg-white col-span-3 md:col-span-1">
                  <CardHeader className="bg-teal-50 border-b border-teal-100">
                    <CardTitle className="text-teal-800 flex items-center justify-between">
                      <span>Medicines</span>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </DialogTrigger>
                    </CardTitle>
                    <CardDescription className="text-teal-600">
                      Manage your medicine database
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <MedicineListTab refreshTrigger={refreshList} />
                  </CardContent>
                </Card>
                <DialogContent>
                  <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
                    <DialogTitle className="text-center text-teal-800">
                      Add New Medicine
                    </DialogTitle>
                  </DialogHeader>
                  <AddMedicineTab onSuccess={handleSuccess} />
                </DialogContent>
              </Dialog>

              <Dialog open={open} onOpenChange={setOpen}>
                <Card className="border-teal-100 shadow-sm overflow-hidden bg-white col-span-3 md:col-span-1">
                  <CardHeader className="bg-teal-50 border-b border-teal-100">
                    <CardTitle className="text-teal-800 flex items-center justify-between">
                      <span>Brands</span>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </DialogTrigger>
                    </CardTitle>
                    <CardDescription className="text-teal-600">
                      Manage medicine brands
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <MedicineBrandTab refreshTrigger={refreshListBrand} />
                  </CardContent>
                </Card>
                <DialogContent>
                  <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
                    <DialogTitle className="text-center text-teal-800">
                      Add New Brand
                    </DialogTitle>
                  </DialogHeader>
                  <AddMedicineBrandTab onSuccess={handleSuccessBrand} />
                </DialogContent>
              </Dialog>

              <Dialog open={openFreq} onOpenChange={setOpenFreq}>
                <Card className="border-teal-100 shadow-sm overflow-hidden bg-white col-span-3 md:col-span-1">
                  <CardHeader className="bg-teal-50 border-b border-teal-100">
                    <CardTitle className="text-teal-800 flex items-center justify-between">
                      <span>Frequencies</span>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </DialogTrigger>
                    </CardTitle>
                    <CardDescription className="text-teal-600">
                      Manage dosage schedules
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <MedicineFreqTab refreshTrigger={refreshListfre} />
                  </CardContent>
                </Card>
                <DialogContent>
                  <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
                    <DialogTitle className="text-center text-teal-800">
                      Add New Frequency
                    </DialogTitle>
                  </DialogHeader>
                  <AddMedicineFreqTab onSuccess={handleSuccessFre} />
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          {/* <TabsContent
            value="users"
            className="h-[400px] flex items-center justify-center border rounded-md"
          >
            <div className="text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                User management panel will appear here.
              </p>
              <Button variant="outline" className="mt-4">
                Configure User Management
              </Button>
            </div>
          </TabsContent> */}

          {/* <TabsContent
            value="analytics"
            className="h-[400px] flex items-center justify-center border rounded-md"
          >
            <div className="text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                Detailed analytics and reporting will appear here.
              </p>
              <Button variant="outline" className="mt-4">
                Setup Analytics Dashboard
              </Button>
            </div>
          </TabsContent> */}

          {/* <TabsContent
            value="settings"
            className="h-[400px] flex items-center justify-center border rounded-md"
          >
            <div className="text-center">
              <Server className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                System settings and configuration will appear here.
              </p>
              <Button variant="outline" className="mt-4">
                Configure System
              </Button>
            </div>
          </TabsContent> */}

          <div className="space-y-3 p-4">
            {/* Personal Details Row with Dropdown Button */}
            <TabsContent value="schedule" className="space-y-6">
              <SeniorSchedulTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <Dialog open={isDialogAddOpen} onOpenChange={setIsDialogAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center"> Add New Doctor</DialogTitle>
          </DialogHeader>
          {/* <AddDoctorForm
            name={name}
            setName={setName}
            username={username}
            setUsername={setUsername}
            mobilenumber={mobilenumber}
            setMobilenumber={setMobilenumber}
            email={email}
            setEmail={setEmail}
            role={role}
            setRole={setRole}
            password={password}
            setPassword={setPassword}
            education={education}
            setEducation={setEducation}
            occupation={occupation}
            setOccupation={setOccupation}
            onSubmit={handleSubmit}
          /> */}
        </DialogContent>
      </Dialog>
      {isOpend && (
        <div className="space-y-3 p-4 items-center justify-center border rounded-md">
          <DoctorCreateForm />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
