import ForgotBackground from "@/components/Forgotpassword/ForgotBackground";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogIn, Mail } from "lucide-react";
import Logo from "/image/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const StepEnterEmail = ({ setStep, setUserId, setEmail }) => {
  const [email, setEmailLocal] = useState("");
    const [currentStep, setCurrentStep] = useState<'email' | 'otp'>('email');
      const [errors, setErrors] = useState<{ email?: string }>({});
      const[isLoading,setIsLoading]= useState(false)
  const { toast } = useToast();
  const { theme } = useTheme();
  const handleSubmit = async () => {
    const res = await fetch(
      "https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/forgott_password/forgot/password/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      setUserId(data.user_id);
      setEmail(email);
        setCurrentStep('otp');
      setStep(2);
    } else {
      alert(data.message);
    }
  };
  const getThemeClasses = () => {
    if (!theme || theme === "default") return "";
    return `theme-${theme}`;
  };

  const themeClasses = getThemeClasses();
  return (
    <ForgotBackground themeClasses={themeClasses}>
      <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
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
            <img
              src={Logo}
              alt="MetroMind Logo"
              className="relative z-10 w-20 h-20 animate-pulse-subtle"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {currentStep === 'email' ? 'Forgot Password' : 'Verify OTP'}
          </CardTitle>
          <CardDescription className="text-center">
            {currentStep === 'email' 
              ? 'Enter your email to receive an OTP' 
              : `Enter the OTP sent to ${email}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
                   <div className="grid gap-8">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-gray-400">
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmailLocal(e.target.value)}
              className="bg-background/50 pl-10"
              required
              disabled={isLoading}
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <Button 
    
        className="w-full group relative overflow-hidden" 
        disabled={isLoading}
        onClick={handleSubmit}
      >
        <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
        <span className="relative flex items-center justify-center gap-2">
          <LogIn className="h-4 w-4" />
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </span>
      </Button>
      </div>
          
        </CardContent>
      </Card>
    </ForgotBackground>
  );
};

export default StepEnterEmail;
