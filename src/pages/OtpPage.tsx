// // import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "@/App";
// import LoginBackground from "@/components/login/LoginBackground";
// import { VerifyOtp } from "@/models/auth";
// import Logo from "/image/logo.png";
// import OtpForm from "@/components/Otp/OtpForm";
// import { useEffect, useState } from "react";
// import Ani from "../assets/json/logoAni.json";
// import Lottie from "lottie-react";
// import { Link } from "lucide-react";
// const OtpPage = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { theme } = useTheme();
//   const [otpNo, setOtpNo] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//   // Get phone data from localStorage
//   const [phone, setPhone] = useState("");
//   const [countryCode, setCountryCode] = useState("+91");
//   const [fullPhone, setFullPhone] = useState("");

//   useEffect(() => {
//     // Retrieve phone number details from localStorage
//     const savedPhone = localStorage.getItem('userPhone');
//     const savedCountryCode = localStorage.getItem('userCountryCode');
//     const savedFullPhone = localStorage.getItem('userFullPhone');
    
//     if (savedPhone) {
//       setPhone(savedPhone);
//     }
    
//     if (savedCountryCode) {
//       setCountryCode(savedCountryCode);
//     }
    
//     if (savedFullPhone) {
//       setFullPhone(savedFullPhone);
//     }
//   }, []);

// //   const handleVerOtp = async (e) => {
// //     e.preventDefault();
// //  setIsLoading(true);
// //     if (otpNo.length < 4) {
// //       toast({
// //         title: "Invalid OTP",
// //         description: "Please enter full 4-digit OTP.",
// //       });
// //       return;
// //     }

// //     // Use the retrieved fullPhone from localStorage
// //     const formData = {
// //       mobile_number: fullPhone,
// //       otp: otpNo,
// //     };

// //     console.log("Sending verification data:", formData);

// //     try {
// //       const res = await VerifyOtp(formData);
// //       console.log("Verification response:", res);
      
// //       if (res.status === "ok") {
// //         toast({
// //           title: "Success",
// //           description: "OTP verified successfully!",
// //         });
// //         navigate("/register");
// //       } else {
// //         toast({
// //           title: "Failed",
// //           description: "Failed to verify OTP. Please try again.",
// //         });
// //       }
// //     } catch (err) {
// //       console.error("OTP verification error:", err);
// //       toast({
// //         title: "Error",
// //         description: "Error verifying OTP. Please try again.",
// //       });
// //     }
// //   };
// const handleVerOtp = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);
  
//   if (otpNo.length < 4) {
//     setIsLoading(false); // Reset loading state
//     toast({
//       title: "Invalid OTP",
//       description: "Please enter full 4-digit OTP.",
//     });
//     return;
//   }

//   // Use the retrieved fullPhone from localStorage
//   const formData = {
//     mobile_number: fullPhone,
//     otp: otpNo,
//   };

//   console.log("Sending verification data:", formData);

//   try {
//     const res = await VerifyOtp(formData);
//     console.log("Verification response:", res);
    
//     if (res.status === "ok") {
//       toast({
//         title: "Success",
//         description: "OTP verified successfully!",
//       });
//       navigate("/register");
//     } else {
//       setIsLoading(false); // Reset loading state on failure
//       toast({
//         title: "Failed",
//         description: "Failed to verify OTP. Please try again.",
//         variant: "destructive", // Add variant for error styling
//       });
//     }
//   } catch (err) {
//     console.error("OTP verification error:", err);
//     setIsLoading(false); // Reset loading state on error
//     toast({
//       title: "Error",
//       description: "Error verifying OTP. Please try again.",
//       variant: "destructive", // Add variant for error styling
//     });
//   }
// };
//   // Determine theme-specific classes
//   const getThemeClasses = () => {
//     if (!theme || theme === "default") return "";
//     return `theme-${theme}`;
//   };

//   const themeClasses = getThemeClasses();
//   const LoadingOverlay = () => (
//     <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-3xl">
//       <div className="flex flex-col items-center space-y-4">
//         <div className="w-24 h-24">
//           <Lottie animationData={Ani} loop={true} />
//         </div>
//         <p className="text-sm text-muted-foreground">Signing you in...</p>
//       </div>
//     </div>
//   );
//   return (
//     <LoginBackground themeClasses={themeClasses}>
//       <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
        
//           {isLoading && <LoadingOverlay />}
//           <CardHeader className="space-y-1">
//           <div className="flex justify-center mb-2">
//             <img
//               src={Logo}
//               alt="Logo"
//               className="relative z-10 w-20 h-20 animate-pulse-subtle"
//             />
//           </div>
//           <CardTitle className="text-2xl font-bold text-center">
//             Enter Verification Code
//           </CardTitle>
//           <CardDescription className="text-center">
//             Please enter the code sent to 
              
//                <a
//               href="/phoneverify"
//               className="text-primary underline-offset-4 hover:underline"
//             >
//          {countryCode} {phone}
//             </a>   
 
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <div className="grid gap-6">
//             <OtpForm
//               otpNo={otpNo}
//               setOtpNo={setOtpNo}
//               onSubmit={handleVerOtp}
//             />
//           </div>
//         </CardContent>
//       </Card>
//     </LoginBackground>
//   );
// };

// export default OtpPage;
// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/App";
import LoginBackground from "@/components/login/LoginBackground";
import { VerifyOtp } from "@/models/auth";
import Logo from "/image/logo.png";
import OtpForm from "@/components/Otp/OtpForm";
import { useEffect, useState } from "react";
import Ani from "../assets/json/logoAni.json";
import Lottie from "lottie-react";
import { Link } from "lucide-react";
const OtpPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [otpNo, setOtpNo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  // Get phone data from localStorage
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [fullPhone, setFullPhone] = useState("");

  useEffect(() => {
    // Retrieve phone number details from localStorage
    const savedPhone = localStorage.getItem('userPhone');
    const savedCountryCode = localStorage.getItem('userCountryCode');
    const savedFullPhone = localStorage.getItem('userFullPhone');
    
    if (savedPhone) {
      setPhone(savedPhone);
    }
    
    if (savedCountryCode) {
      setCountryCode(savedCountryCode);
    }
    
    if (savedFullPhone) {
      setFullPhone(savedFullPhone);
    }
  }, []);

//   const handleVerOtp = async (e) => {
//     e.preventDefault();
//  setIsLoading(true);
//     if (otpNo.length < 4) {
//       toast({
//         title: "Invalid OTP",
//         description: "Please enter full 4-digit OTP.",
//       });
//       return;
//     }

//     // Use the retrieved fullPhone from localStorage
//     const formData = {
//       mobile_number: fullPhone,
//       otp: otpNo,
//     };

//     console.log("Sending verification data:", formData);

//     try {
//       const res = await VerifyOtp(formData);
//       console.log("Verification response:", res);
      
//       if (res.status === "ok") {
//         toast({
//           title: "Success",
//           description: "OTP verified successfully!",
//         });
//         navigate("/register");
//       } else {
//         toast({
//           title: "Failed",
//           description: "Failed to verify OTP. Please try again.",
//         });
//       }
//     } catch (err) {
//       console.error("OTP verification error:", err);
//       toast({
//         title: "Error",
//         description: "Error verifying OTP. Please try again.",
//       });
//     }
//   };
const handleVerOtp = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  if (otpNo.length < 4) {
    setIsLoading(false); // Reset loading state
    toast({
      title: "Invalid OTP",
      description: "Please enter full 4-digit OTP.",
    });
    return;
  }

  // Use the retrieved fullPhone from localStorage
  const formData = {
    mobile_number: fullPhone,
    otp: otpNo,
  };

  console.log("Sending verification data:", formData);

  try {
    const res = await VerifyOtp(formData);
    console.log("Verification response:", res);
    
    if (res.status === "ok") {
      toast({
        title: "Success",
        description: "OTP verified successfully!",
      });
      navigate("/register");
    } else {
      setIsLoading(false); 
      toast({
        title: "Verification Failed",
        description: "Invalid OTP. Please check and try again",
        variant: "destructive", 
      });
    }
  } catch (err) {
    console.error("OTP verification error:", err);
    setIsLoading(false);
    toast({
      title: "Error",
      description: "Error verifying OTP. Please try again.",
      variant: "destructive", // Add variant for error styling
    });
  }
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
      </div>
    </div>
  );
  return (
    <LoginBackground themeClasses={themeClasses}>
      <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
        
          {isLoading && <LoadingOverlay />}
          <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <img
              src={Logo}
              alt="Logo"
              className="relative z-10 w-24 h-28 animate-pulse-subtle"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Enter Verification Code
          </CardTitle>
          <CardDescription className="text-center">
            Please enter the code sent to 
              
               <a
              href="/phoneverify"
              className="text-primary underline-offset-4 hover:underline"
            >
         {countryCode} {phone}
            </a>   
 
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            <OtpForm
              otpNo={otpNo}
              setOtpNo={setOtpNo}
              onSubmit={handleVerOtp}
            />
          </div>
        </CardContent>
      </Card>
    </LoginBackground>
  );
};

export default OtpPage;