// import React, { useState } from "react";
// import { useTheme } from "next-themes";
// import { useToast } from "@/hooks/use-toast";
// import EmailOtpBackground from "@/components/EmailOtpverify/EmailOtpBackground";
// import { useNavigate, useParams } from 'react-router-dom';
// import Logo from "/image/logo.png";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import EmailOtpForm from "@/components/EmailOtpverify/EmailOtpForm";
// import { VerifyOtpAndResetPassword } from "@/models/auth";
// const EmailOtpForgoatPassword = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentStep, setCurrentStep] = useState<"email" | "otp">("email");
//   const [userId, setUserId] = useState<number | null>(null);
//   const [showPasswordFields, setShowPasswordFields] = useState(false);
// const [isOtpVerified, setIsOtpVerified] = useState(false);
// const [otp, setOtp] = useState("");
//   const { toast } = useToast();
//   const { theme } = useTheme();
//   const navigate = useNavigate();
//   const userID = localStorage.getItem("resUserId");
//   const handleOTPVerification = async (otp: string, newPassword: string) => {
//     setIsLoading(true);

//     try {
//       if (!userID) {
//         throw new Error("User ID not found");
//       }
//       const formData = {
//          otp_entered: otp 
//         };
//       const response = await VerifyOtpAndResetPassword(userID, formData);
// console.log("response,",response)
//       toast({
//         title: "Success",
//         description:
//           "Password reset successfully. Please login with your new password.",
//         variant: "default",
//       });

//       // Navigate to login page
//         navigate('/Passwordrest');
//     } catch (error: any) {
//       console.error("Error verifying OTP:", error);
//       toast({
//         title: "Error",
//         description:
//           error.response?.data?.message ||
//           "Invalid OTP or failed to reset password.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
// // const handleOTPVerification = async (e) => {
// //     e.preventDefault();
// //       if (otp.length < 6) {
// //     setIsLoading(false); // Reset loading state
// //     toast({
// //       title: "Invalid OTP",
// //       description: "Please enter full 4-digit OTP.",
// //     });
// //     return;
// //   }
// //   // setIsLoading(true);
// //     const formData = {
// //       otp_entered: otp
// //     };
// //    console.log("Sending verification data:", formData);
// //   try {
// //     if (!userID) {
// //       throw new Error("User ID not found");
// //     }
    
  
    
// //     const response = await VerifyOtpAndResetPassword(userID, formData);
// //     console.log("OTP verification response:", response);
    
// //     if (response.data.message) { // Adjust based on your API response structure
// //       setIsOtpVerified(true);
// //       setShowPasswordFields(true);
      
// //       toast({
// //         title: "Success",
// //         description: "OTP verified successfully. Please enter your new password.",
// //         variant: "default",
// //       });
// //     }
// //   } catch (error: any) {
// //     console.error("Error verifying OTP:", error);
// //     toast({
// //       title: "Error",
// //       description: error.response?.data?.message || "Invalid OTP. Please try again.",
// //       variant: "destructive",
// //     });
// //   } finally {
// //     setIsLoading(false);
// //   }
// // };

//   const handleBackToEmail = () => {
//     setCurrentStep("email");
//     setUserId(null);
//   };
//   const getThemeClasses = () => {
//     if (!theme || theme === "default") return "";
//     return `theme-${theme}`;
//   };

//   const themeClasses = getThemeClasses();
//   return (
//     <div>
//       <EmailOtpBackground themeClasses={themeClasses}>
//         <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
//           <div
//             className={`absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-30`}
//           >
//             <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//             <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//             <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//             <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//           </div>

//           <CardHeader className="space-y-1">
//             <div className="flex justify-center mb-2">
//               <img
//                 src={Logo}
//                 alt="MetroMind Logo"
//                 className="relative z-10 w-20 h-20 animate-pulse-subtle"
//               />
//             </div>
//             <CardTitle className="text-2xl font-bold text-center"></CardTitle>
//             <CardDescription className="text-center"></CardDescription>
//           </CardHeader>

//           <CardContent>
//             <EmailOtpForm
//               isLoading={isLoading}
//                 onBack={handleBackToEmail}
//               onSubmit={handleOTPVerification}
//             />
//           </CardContent>
//         </Card>
//       </EmailOtpBackground>
//     </div>
//   );
// };

// export default EmailOtpForgoatPassword;
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import EmailOtpBackground from "@/components/EmailOtpverify/EmailOtpBackground";
import { useNavigate, useParams } from 'react-router-dom';
import Logo from "/image/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmailOtpForm from "@/components/EmailOtpverify/EmailOtpForm";
import { VerifyOtpAndResetPassword } from "@/models/auth";

const EmailOtpForgoatPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<"email" | "otp">("email");
  const [userId, setUserId] = useState<number | null>(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const userID = localStorage.getItem("resUserId");

  const handleOTPVerification = async (otp: string, newPassword: string) => {
    setIsLoading(true);

    try {
      if (!userID) {
        throw new Error("User ID not found");
      }

      // Validate inputs
      if (!otp || otp.length !== 6) {
        throw new Error("Please enter a valid 6-digit OTP");
      }

      if (!newPassword || newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      // Prepare form data with both OTP and new password
      const formData = {
        otp_entered: otp,
        new_password: newPassword,
        confirm_password: newPassword // Add if your API requires confirmation
      };

      console.log("Sending verification data:", formData);
      
      const response = await VerifyOtpAndResetPassword(userID, formData);
      console.log("API response:", response);

      // Check if the response indicates success
      if (response.data && (response.data.success || response.status === 200)) {
        toast({
          title: "Success",
          description: "Password reset successfully. Please login with your new password.",
          variant: "default",
        });

        // Clear localStorage if needed
        localStorage.removeItem("resUserId");
        
        // Navigate to login page
        navigate('/login'); // Changed from '/Passwordrest' to '/login'
      } else {
        throw new Error(response.data?.message || "Failed to reset password");
      }

    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      
      let errorMessage = "Invalid OTP or failed to reset password.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setCurrentStep("email");
    setUserId(null);
    setOtp("");
    setIsOtpVerified(false);
    setShowPasswordFields(false);
  };

  const getThemeClasses = () => {
    if (!theme || theme === "default") return "";
    return `theme-${theme}`;
  };

  const themeClasses = getThemeClasses();

  return (
    <div>
      <EmailOtpBackground themeClasses={themeClasses}>
        <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
          <div className={`absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-30`}>
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
              Reset Password
            </CardTitle>
            <CardDescription className="text-center">
              Enter the OTP sent to your email and your new password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <EmailOtpForm
              isLoading={isLoading}
              onBack={handleBackToEmail}
              onSubmit={handleOTPVerification}
            />
          </CardContent>
        </Card>
      </EmailOtpBackground>
    </div>
  );
};

export default EmailOtpForgoatPassword;