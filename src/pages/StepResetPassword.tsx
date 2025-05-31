import ForgotBackground from "@/components/Forgotpassword/ForgotBackground";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import Logo from "/image/logo.png";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
const StepResetPassword = ({ userId }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ confirm?: string; password?: string }>(
    {}
  );
  const { toast } = useToast();
  const { theme } = useTheme();
const validate = () => {
    const newErrors: {
      otp?: string;
      password?: string;
      confirm?: string;
    } = {};

   

    if (!password.trim()) {
      newErrors.password = "New password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirm = "Please confirm your password.";
    } else if (password !== confirm) {
      newErrors.confirm = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = async () => {
        if (validate()) {
    return;
    }
    const res = await fetch(
      ` https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/forgott_password/new/password/${userId}/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          new_password: password,
          confirm_password: confirm,
        }),
      }
    );

    if (res.ok) {
       toast({
          title: "Success",
          description: "Password updated successfully! Please login.",
          variant: "default",
        });
      // alert("Password updated! Please login.");
       setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        
    } else {
      const errorData = await res.json();
        toast({
          title: "Error",
          description: errorData.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
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
            {/* {currentStep === 'email' ? 'Forgot Password' : 'Verify OTP'} */}
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            {/* {currentStep === 'email' 
                    ? 'Enter your email to receive an OTP' 
                    : `Enter the OTP sent to ${email}`
                  } */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-400">
                New Password
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" /> */}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-400">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                {/* <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" /> */}
              </div>
              {errors.confirm && (
                <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>
              )}
            </div>
             <Button 
             onClick={handleReset}
              className="w-full group relative overflow-hidden">
          <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
          <span className="relative flex items-center justify-center gap-2">
          <Lock  className="h-4 w-4"/>
          Reset {isLoading ? "Reseting..." : "Reset"}
          </span>
        </Button>
            {/* <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /> */}
            {/* <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            /> */}
            {/* <button onClick={handleReset}>Reset</button> */}
          </div>
        </CardContent>
      </Card>
    </ForgotBackground>
  );
};

export default StepResetPassword;
