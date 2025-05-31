import ForgotBackground from "@/components/Forgotpassword/ForgotBackground";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Logo from "/image/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
const StepVerifyOtp = ({ setStep, userId }) => {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<{ email?: string; otp?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleVerify = async () => {
    const res = await fetch(
      `https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/forgott_password/verify/otp/${userId}/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp_entered: otp }),
      }
    );

    if (res.ok) {
      setStep(3);
    } else {
      alert("Invalid OTP");
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
            Verify OTP
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
              <Label htmlFor="otp" className="text-gray-400">
                Enter 6-digit OTP
              </Label>
              <div className="relative">
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  // onChange={handleOtpChange}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`bg-background/50 pl-10 text-center text-lg tracking-widest ${
                    errors.otp ? "border-red-500" : ""
                  }`}
                  maxLength={6}
                  required
                  disabled={isLoading}
                  autoComplete="one-time-code"
                />
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
              )}
            </div>
            <Button
              className="w-full group relative overflow-hidden"
              disabled={isLoading}
              onClick={handleVerify}
            >
              <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? "Verifying..." : "Verify"}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </ForgotBackground>
  );
};

export default StepVerifyOtp;
