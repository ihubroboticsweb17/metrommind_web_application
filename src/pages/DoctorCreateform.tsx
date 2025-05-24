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
import { Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/App";
import RoleSelection from "@/components/login/RoleSelection";
import LoginForm from "@/components/login/LoginForm";
import LoginBackground from "@/components/login/LoginBackground";
import {
  UserRole,
  authenticateUser,
  saveUserSession,
  getSavedEmail,
} from "@/models/auth";
import AddDoctorForm from "@/components/adddoctor/AddDoctorForm";

const DoctorCreateForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();

  // Check for saved email on component mount
  useEffect(() => {
    const savedEmail = getSavedEmail();
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Determine theme-specific classes
  const getThemeClasses = () => {
    if (!theme || theme === "default") return "";
    return `theme-${theme}`;
  };

  const themeClasses = getThemeClasses();

  return (
    <LoginBackground themeClasses={themeClasses}>
      <Card className="w-full max-w-md relative z-10 shadow-xl backdrop-blur-sm bg-card/80 border-border/50">
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
            <Brain className={`h-12 w-12 text-primary animate-pulse-subtle`} />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Add New Doctor
          </CardTitle>
          {/* <CardDescription className="text-center">
            Sign in to access your MetroMind account
          </CardDescription> */}
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            <AddDoctorForm
              email={email}
              setEmail={setEmail}
              name={name}
              setName={setName}
              username={username}
              setUsername={setUsername}
              mobilenumber={mobilenumber}
              setMobilenumber={setMobilenumber}
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
            <a
              href="#"
              className="text-primary underline-offset-4 hover:underline"
            ></a>
          </div>
        </CardFooter>
      </Card>
    </LoginBackground>
  );
};

export default DoctorCreateForm;
