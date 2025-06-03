
import { useState, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/App";
import RoleSelection from "@/components/login/RoleSelection";
import LoginForm from "@/components/login/LoginForm";
import LoginBackground from "@/components/login/LoginBackground";
import { UserRole, saveUserSession, getSavedEmail } from "@/models/auth";
import axios from "axios";
import { login } from "@/models/auth";
import Logo from "/image/logo.png";
import Lottie from "lottie-react";
import Ani from "../assets/json/logoAni.json";
import { z } from "zod";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [loginDetail, setLoginDetail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    const savedEmail = getSavedEmail();
    console.log("savedEmail", savedEmail);
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    
    try {
      const data = await login(email, password);
      console.log("Data", data);
      setLoginDetail(data);
      // setUserName(data.name);
      setLoginEmail(data.email);
      localStorage.setItem("loginEmailId", data.email);
      localStorage.setItem("firsttime", data.first_time);
      const userName = localStorage.getItem("name")
      const singularRole = localStorage.getItem("role");
      const firsttime = localStorage.getItem("first");
      console.log("firsttime", firsttime);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userName}!`,
      });

      // Navigate based on role
      const userData = data.data;
      console.log("userdata", userData);

      if (`${singularRole}` === "user") {
        if (`${firsttime}` === "false") {
          navigate("/chatbot");
        } else {
          navigate("/patient-dashboard");
        }
      } else if (`${singularRole}` === "psychiatrist") {
        navigate("/psychiatrist_dashboard");
      } else if (`${singularRole}` === "admin") {
        navigate("/admin-dashboard");
      } else if (`${singularRole}` === "junior_psychologist") {
        navigate("/junior-pysychology-dashboard");
      } else if (`${singularRole}` === "senior_psychologist") {
        navigate("/senior-pysychology-dashboard");
      }
    } catch (error: any) {
      // Reset loading state on error
      setIsLoading(false);
      
      toast({
        title: "Login failed",
        description: error?.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  // Function to handle back to login (reset loading state)
  const handleBackToLogin = () => {
    setIsLoading(false);
    setErrors([]);
  };

  // Determine theme-specific classes
  const getThemeClasses = () => {
    if (!theme || theme === "default") return "";
    return `theme-${theme}`;
  };

  const themeClasses = getThemeClasses();
  
  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-3xl">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24">
          <Lottie animationData={Ani} loop={true} />
        </div>
        <p className="text-sm text-muted-foreground">Signing you in...</p>
        {/* Optional: Add a cancel button */}
        <button
          onClick={handleBackToLogin}
          className="text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const loginSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Enter a valid email address."),
    password: z.string().trim().min(1, "Password is required."),
  });

  return (
    <LoginBackground themeClasses={themeClasses}>
      <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
        {isLoading && <LoadingOverlay />}
        <div
          className={`absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-30`}
        >
          <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
        </div>

        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            {/* <img
              src={Logo}
              alt={Logo}
              className="relative z-10 w-20 h-20 animate-pulse-subtle"
            /> */}
            <img
  src={Logo}
  alt="MetroMind Logo"
  width="80"
  height="80"
  className="relative z-10 w-20 h-20 object-contain"
/>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            MetroMind Login
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to access your MetroMind account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              onSubmit={handleLogin}
              selectedRole={selectedRole}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <div className="text-sm text-center text-muted-foreground mt-2">
            Don't have an account?{" "}
            <a
              href="/phoneverify"
              className="text-primary underline-offset-4 hover:underline"
            >
             Create an account
            </a>
          </div>
        </CardFooter>
      </Card>
    </LoginBackground>
  );
};

export default Login;