// import ForgotBackground from "@/components/Forgotpassword/ForgotBackground";
// import React, { useState } from "react";
// import { useTheme } from "next-themes";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import Logo from "/image/logo.png";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Shield } from "lucide-react";
// const StepVerifyOtp = ({ setStep, userId }) => {
//   const [otp, setOtp] = useState("");
//   const [errors, setErrors] = useState<{ email?: string; otp?: string }>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   const { theme } = useTheme();

//   const handleVerify = async () => {
//     const res = await fetch(
//       `https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/forgott_password/verify/otp/${userId}/`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ otp_entered: otp }),
//       }
//     );

//     if (res.ok) {

//       setStep(3);
//     } else {
//       alert("Invalid OTP");
//     }
//   };
//   const getThemeClasses = () => {
//     if (!theme || theme === "default") return "";
//     return `theme-${theme}`;
//   };

//   const themeClasses = getThemeClasses();
//   return (
//     <ForgotBackground themeClasses={themeClasses}>
//       <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
//         <div
//           className={`absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-30`}
//         >
//           <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//         </div>

//         <CardHeader className="space-y-1">
//           <div className="flex justify-center mb-2">
//             <img
//               src={Logo}
//               alt="MetroMind Logo"
//               className="relative z-10 w-20 h-20 animate-pulse-subtle"
//             />
//           </div>
//           <CardTitle className="text-2xl font-bold text-center">
//             {/* {currentStep === 'email' ? 'Forgot Password' : 'Verify OTP'} */}
//             Verify OTP
//           </CardTitle>
//           <CardDescription className="text-center">
//             {/* {currentStep === 'email' 
//               ? 'Enter your email to receive an OTP' 
//               : `Enter the OTP sent to ${email}`
//             } */}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-8">
//             <div className="grid gap-2">
//               <Label htmlFor="otp" className="text-gray-400">
//                 Enter 6-digit OTP
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="otp"
//                   type="text"
//                   placeholder="123456"
//                   value={otp}
//                   // onChange={handleOtpChange}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className={`bg-background/50 pl-10 text-center text-lg tracking-widest ${
//                     errors.otp ? "border-red-500" : ""
//                   }`}
//                   maxLength={6}
//                   required
//                   disabled={isLoading}
//                   autoComplete="one-time-code"
//                 />
//                 <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//               </div>
//               {errors.otp && (
//                 <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
//               )}
//             </div>
//             <Button
//               className="w-full group relative overflow-hidden"
//               disabled={isLoading}
//               onClick={handleVerify}
//             >
//               <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
//               <span className="relative flex items-center justify-center gap-2">
//                 {isLoading ? "Verifying..." : "Verify"}
//               </span>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </ForgotBackground>
//   );
// };

// export default StepVerifyOtp;
import ForgotBackground from "@/components/Forgotpassword/ForgotBackground";
import React, { useState, useEffect, useRef } from "react";
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
import { Shield, RefreshCw, Clock, CheckCircle2 } from "lucide-react";

// ✅ Error state type for better TS support
type ErrorState = {
  otp?: string;
};

interface StepVerifyOtpProps {
  setStep: (step: number) => void;
  userId: string;
  userEmail: string;
}

const StepVerifyOtp: React.FC<StepVerifyOtpProps> = ({ setStep, userId, userEmail }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<ErrorState>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    setResendTimer(60);
    setCanResend(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validateOtp = (otpValue: string[]) => {
    const fullOtp = otpValue.join("");
    const newErrors: ErrorState = {};

    if (!fullOtp) {
      newErrors.otp = "OTP is required";
    } else if (fullOtp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
    } else if (!/^\d+$/.test(fullOtp)) {
      newErrors.otp = "OTP must contain only numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (errors.otp) setErrors({});
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (newOtp.every((digit) => digit !== "")) validateOtp(newOtp);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length === 6) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      validateOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (!validateOtp(otp)) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/forgott_password/verify/otp/${userId}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp_entered: fullOtp }),
        }
      );

      if (response.ok) {
        toast({
          title: "Success!",
          description: "OTP verified successfully",
          variant: "default",
        });
        setStep(3);
      } else {
        const errorData = await response.json();
        setErrors({ otp: errorData.message || "Invalid OTP. Please try again." });
        toast({
          title: "Verification Failed",
          description: "Invalid OTP. Please check and try again.",
          variant: "destructive",
        });
      }
    } catch {
      setErrors({ otp: "Network error. Please try again." });
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const response = await fetch(
        `https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/forgott_password/resend/otp/${userId}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        toast({
          title: "✅ Success",
          description: "A new OTP has been sent to your email",
          variant: "default",
        });
        setResendTimer(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        setErrors({});
        inputRefs.current[0]?.focus();
      } else {
        toast({
          title: "Resend Failed",
          description: "Failed to resend OTP. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  const themeClasses = theme && theme !== "default" ? `theme-${theme}` : "";
  const fullOtp = otp.join("");
  const isOtpComplete = fullOtp.length === 6;

  return (
    <ForgotBackground themeClasses={themeClasses}>
      <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/90 border-border/50 rounded-3xl">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex justify-center mb-4">
            <img src={Logo} alt="MetroMind Logo" className="w-20 h-20" />
          </div>
          <CardTitle className="text-2xl font-bold text-center ">
            Verify OTP
          </CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to <br />
            <span className="font-medium text-foreground">{userEmail || "your email"}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4" />
              Enter 6-digit OTP
            </Label>
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el!)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-12 text-center text-lg font-bold border-2 ${
                    errors.otp
                      ? "border-red-500"
                      : digit
                      ? "border-primary"
                      : "border-border"
                  }`}
                  maxLength={1}
                  disabled={isLoading}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
            {isOtpComplete && !errors.otp && (
              <p className="text-green-500 text-sm flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> OTP format is valid
              </p>
            )}
          </div>

          <Button
            className="w-full"
            disabled={isLoading || !isOtpComplete}
            onClick={handleVerify}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Verify OTP
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">Didn't receive the code?</p>
            {canResend ? (
              <Button variant="ghost" onClick={handleResendOtp} disabled={isResending}>
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    Resending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend OTP
                  </>
                )}
              </Button>
            ) : (
              <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Resend in {resendTimer}s
              </div>
            )}
          </div>

          <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
            Back to Email
          </Button>
        </CardContent>
      </Card>
    </ForgotBackground>
  );
};

export default StepVerifyOtp;

