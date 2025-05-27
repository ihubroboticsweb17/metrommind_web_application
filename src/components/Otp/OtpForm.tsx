// import { FormEvent, useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { LogIn, Eye, EyeOff, Info, Mail ,Lock} from "lucide-react";
// import { MOCK_USERS, VerifyPhoneNo } from "@/models/auth";
// import Logo from "/image/logo.png";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "next-themes";
// interface OtpFormProps {

//   otpNo:string;
//   setOtpNo:(otp:string)=>void
//   onSubmit: (e: FormEvent) => void;
  
// }

// const OtpForm = ({ otpNo, setOtpNo, onSubmit }: OtpFormProps) => {
//     const navigate = useNavigate();
//     const { toast } = useToast();
//     const { theme } = useTheme();
//     const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCredentials, setShowCredentials] = useState(false);
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
//     const [phone, setPhone] = useState("");
//     const [countryCode, setCountryCode] = useState("+91");
//      const [isLoading, setIsLoading] = useState(false);
//        const [resendTimer, setResendTimer] = useState(60);
//     // Load phone from localStorage if available
//     useEffect(() => {
//       const savedPhone = localStorage.getItem('userPhone');
//       const savedCountryCode = localStorage.getItem('userCountryCode');
      
//       if (savedPhone) {
//         setPhone(savedPhone);
//       }
      
//       if (savedCountryCode) {
//         setCountryCode(savedCountryCode);
//       }
//     }, []);
//   const handleChange = (value: string, index: number) => {
//     const newOtp = [...otpDigits];
//     newOtp[index] = value.replace(/\D/, ""); // only digits
//     setOtpDigits(newOtp);
//     setOtpNo(newOtp.join(""));
    
//     // Auto focus next input
//     const nextInput = document.getElementById(`otp-${index + 1}`);
//     if (value && nextInput) nextInput.focus();
//   };
// const handleSendOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // if (!phone) {
//     //   alert("Please enter your phone number");
//     //   return;
//     // }
    
//     const fullPhone = `${countryCode}${phone}`;
    
//     // Store phone number and country code in localStorage
//     localStorage.setItem('userPhone', phone);
//     localStorage.setItem('userCountryCode', countryCode);
//     localStorage.setItem('userFullPhone', fullPhone);
    
//     const formData = {
//       mobile_number: fullPhone,
//     };
    
//     console.log("Sending data:", formData);
    
//     const payload = { phone_number: phone };
//     console.log("payload", payload);
    
//     try {
//       const res = await VerifyPhoneNo(formData);
//       console.log("res", res);
      
//       if (res.status === "ok") {
//         toast({
//           title: "Success",
//           description: `OTP sent successfully!`,
//         });
//         navigate("/otp");
//       } else {
//         alert("Failed to send OTP.");
//       }
//     } catch (err) {
//       alert("Error sending OTP. Try again.");
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//     <div className="flex flex-col items-center gap-6 p-6 bg-white  w-full max-w-md mx-auto">

    
//         <div className="flex justify-between gap-3">
//           {otpDigits.map((digit, i) => (
//             <input
//               key={i}
//               id={`otp-${i}`}
//               type="text"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(e.target.value, i)}
//               className="w-14 h-14 text-center text-xl border-2 border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           ))}
//         </div>
//       <p className="text-sm text-blue-600 cursor-pointer hover:underline" onClick={handleSendOtp}>Resend Code  <span className="text-sm text-muted-foreground">
//            in {resendTimer}s
//         </span></p> 
//       <Button type="submit" 
//        disabled={otpNo.length < 4}
//        className="w-full bg-teal-600 hover:bg-teal-600 hover:text-white text-white  text-lg py-2  border-1 border-teal-600 rounded-lg transition">
//         Verify
//       </Button>
  
//     </div>
//   </form>
//   );
// };

// export default OtpForm;
import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LogIn, Eye, EyeOff, Info, Mail, Lock, ArrowLeft, Phone } from "lucide-react";
import { MOCK_USERS, VerifyPhoneNo } from "@/models/auth";
import Logo from "/image/logo.png";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

interface OtpFormProps {
  otpNo: string;
  setOtpNo: (otp: string) => void;
  onSubmit: (e: FormEvent) => void;
}

const OtpForm = ({ otpNo, setOtpNo, onSubmit }: OtpFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Load phone from localStorage if available
  useEffect(() => {
    const savedPhone = localStorage.getItem('userPhone');
    const savedCountryCode = localStorage.getItem('userCountryCode');
    
    if (savedPhone) {
      setPhone(savedPhone);
    }
    
    if (savedCountryCode) {
      setCountryCode(savedCountryCode);
    }
  }, []);

  // Timer effect for resend countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (resendTimer > 0 && !canResend) {
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

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer, canResend]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otpDigits];
    newOtp[index] = value.replace(/\D/, ""); // only digits
    setOtpDigits(newOtp);
    setOtpNo(newOtp.join(""));
    
    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || isResending) return;
    
    setIsResending(true);
    
    const fullPhone = `${countryCode}${phone}`;
    const formData = {
      mobile_number: fullPhone,
    };
    
    console.log("Resending OTP to:", formData);
    
    try {
      const res = await VerifyPhoneNo(formData);
      console.log("Resend OTP response:", res);
      
      if (res.status === "ok") {
        toast({
          title: "Success",
          description: "OTP resent successfully!",
        });
        
        // Reset timer and states
        setResendTimer(60);
        setCanResend(false);
        setOtpDigits(["", "", "", ""]);
        setOtpNo("");
        
        // Focus first input
        const firstInput = document.getElementById('otp-0');
        if (firstInput) firstInput.focus();
      } else {
        toast({
          title: "Error",
          description: "Failed to resend OTP. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
      toast({
        title: "Error",
        description: "Network error. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleChangePhoneNumber = () => {
    // Navigate back to phone number entry page
    navigate(-1); // Go back to previous page
    // Or navigate to specific route: navigate("/login") or navigate("/phone-verify")
  };

  const formatPhoneNumber = (phone: string, countryCode: string) => {
    // Format phone number for display (e.g., +91 98765 43210)
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length >= 10) {
      return `${countryCode} ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`;
    }
    return `${countryCode} ${cleanPhone}`;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col items-center gap-6 p-6 bg-white w-full max-w-md mx-auto">
        
        {/* OTP Input Fields */}
        <div className="flex justify-between gap-3">
          {otpDigits.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-14 h-14 text-center text-xl border-2 border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              autoComplete="off"
            />
          ))}
        </div>

        {/* Resend Code Section */}
        <div className="text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-sm text-teal-600 hover:text-teal-700 cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? "Resending..." : "Resend Code"}
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              Resend code in{" "}
              <span className="font-medium text-teal-600">
                {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
              </span>
            </p>
          )}
        </div>

        {/* Verify Button */}
        <Button 
          type="submit" 
          disabled={otpNo.length < 4 || isLoading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </form>
  );
};

export default OtpForm;