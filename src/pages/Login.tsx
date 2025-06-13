
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/App";
import LoginForm from "@/components/login/LoginForm";
import LoginBackground from "@/components/login/LoginBackground";
import { UserRole, getSavedEmail } from "@/models/auth";
import { login } from "@/models/auth";
import Logo from "/image/logo.png";
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
      setLoginDetail(data);
      setLoginEmail(data.email);
      localStorage.setItem("loginEmailId", data.email);
      const userName = localStorage.getItem("name");
      const singularRole = localStorage.getItem("role");
      const firstTime = localStorage.getItem("first_time");

      toast({
        title: "✅ Success",
        description:"Login successful"
        // description: `Welcome back, ${userName}!`,
      });

      // Navigate based on role
      if (singularRole === "user") {
        if (firstTime === "true") {
          // If the user has completed chat, go to dashboard
          navigate("/patient-dashboard");
        } else {
          // If chat is not completed, go to chatbot
          navigate("/chatbot");
        }
      } else if (singularRole === "psychiatrist") {
        navigate("/psychiatrist_dashboard");
      } else if (singularRole === "admin") {
        navigate("/admin-dashboard");
      } else if (singularRole === "junior_psychologist") {
        navigate("/junior-pysychology-dashboard");
      } else if (singularRole === "senior_psychologist") {
        navigate("/senior-pysychology-dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error instanceof Error ? error.message : "Invalid credentials";
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  // Determine theme-specific classes
  const getThemeClasses = () => {
    if (!theme || theme === "default") return "";
    return `theme-${theme}`;
  };

  const themeClasses = getThemeClasses();

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
      <Card className="w-full max-w-md relative z-10 shadow-lg bg-card/95 rounded-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
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
              isLoading={isLoading}
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