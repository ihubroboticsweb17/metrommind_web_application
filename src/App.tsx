import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, createContext, useState, useContext } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import TherapistDashboard from "./pages/TherapistDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ChatBotPage from "./pages/ChatBotPage";
import DoctorCreateForm from "./pages/DoctorCreateform";
import MedicalReport from "./pages/MedicalReport";
import JunpsychologistDashboard from "./pages/JunpsychologistDashboard";
import SeniorpsychologistDashboard from "./pages/SeniorpsychologistDashboard";
import PsychiatristDashboard from "./pages/PsychiatristDashboard";
import DoctorCallList from "./components/dashboard/tabs/DoctorCallList";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import ProfileViewTab from "./components/dashboard/tabs/ProfileViewTab";
import OtpPage from "./pages/OtpPage";
import PhoneNoVerify from "./pages/PhoneNoVerify";
import ChatUI from "./components/dashboard/tabs/ChatUI";
import EnquiriesListTab from "./components/dashboard/tabs/EnquiriesListTab";
import PatientEnquiryTab from "./components/dashboard/tabs/PatientEnquiryTab";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import EmailOtpForgoatPassword from "./pages/EmailOtpForgoatPassword";
import StepVerifyOtp from "./pages/StepVerifyOtp";
import ForgotPasswordFlow from "./pages/ForgotPasswordFlow";
import PasswordRestPage from "./pages/PasswordRestPage";
// Define available themes
export type ThemeType =
  | "default"
  | "royal"
  | "ocean"
  | "emerald"
  | "sunset"
  | "pink"
  | "green";

// Create theme context
interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "green", // Changed default theme to green
  setTheme: () => {},
});

// Theme provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("green"); // Changed default theme to green

  // Apply theme class to body
  useEffect(() => {
    document.body.classList.remove(
      "theme-royal",
      "theme-ocean",
      "theme-emerald",
      "theme-sunset",
      "theme-pink",
      "theme-green"
    );

    if (theme !== "default") {
      document.body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
export const useTheme = () => useContext(ThemeContext);

const queryClient = new QueryClient();

const App = () => {
  // Apply dark mode on load - removing this to use light theme with green
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/patient-dashboard"
                  element={
                    <ProtectedRoute>
                      <PatientDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/therapist-dashboard"
                  element={
                    <ProtectedRoute>
                      <TherapistDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/junior-pysychology-dashboard"
                  element={
                    <ProtectedRoute>
                      <JunpsychologistDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/senior-pysychology-dashboard"
                  element={
                    <ProtectedRoute>
                      <SeniorpsychologistDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/psychiatrist_dashboard"
                  element={
                    <ProtectedRoute>
                      <PsychiatristDashboard />
                    </ProtectedRoute>
                  }
                />
                 <Route path="/chat" element={ <ProtectedRoute><ChatUI/></ProtectedRoute>} />
              
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/register" element={<Register/>} /> */}
                {/* <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/senior-pysychology-dashboard" element={<SeniorpsychologistDashboard/>} />
                <Route path="/junior-pysychology-dashboard" element={<JunpsychologistDashboard/>} />
                <Route path="/psychiatrist_dashboard" element={<PsychiatristDashboard/>} /> */}
                <Route path="*" element={<NotFound />} />
                <Route path="/chatbot" element={<ProtectedRoute><ChatBotPage/></ProtectedRoute>} />
                <Route path="/createDoctor" element={<DoctorCreateForm />} />
                <Route path="/doctorCallList" element={<DoctorCallList />} />
                <Route path="/profile/:id" element={<ProfileViewTab/>} />
                <Route path="/otp" element={<OtpPage/>} />
                <Route path="/phoneverify" element={<PhoneNoVerify/>} />
                {/* <Route path="/chat" element={<ChatUI/>} /> */}
                <Route path="/enquiries" element={<EnquiriesListTab/>} />
                <Route path="/patient-enquiry" element={<ProtectedRoute><PatientEnquiryTab/></ProtectedRoute>} />
                  {/* <Route path="/forgotpassword" element={<ForgotPasswordPage/>}/> */}
                         {/* <Route path="/VerifyOtp" element={<EmailOtpForgoatPassword/>}/> */}
                        <Route path="/Emailverify" element={<ForgotPasswordFlow/>}/>
                            {/* <Route path="/Passwordrest" element={<PasswordRestPage/>}/> */}
                <Route
                  path="/MedicalReport"
                  element={
                    <MedicalReport
                      doctor="Dr. John Smith"
                      date="07.04.2025"
                      specialization="Cardiology"
                      patient="Alice Johnson"
                      birthDate="01.01.1985"
                      medNumber="123456789"
                      phone="+91-9876543210"
                      ihi="IHI-2345678"
                      email="alice@example.com"
                      assessment="Patient shows signs of improvement."
                      diagnosis="Hypertension"
                      prescription="Amlodipine 5mg daily"
                    />
                  }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
