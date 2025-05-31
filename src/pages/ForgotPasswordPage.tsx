// import ForgotBackground from '@/components/Forgotpassword/ForgotBackground'
// import ForgotForm from '@/components/Forgotpassword/ForgotForm'

// import { useToast } from '@/hooks/use-toast';
// import { ForgotPasswordSentOpt } from '@/models/auth';
// import { useTheme } from 'next-themes';
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import Logo from "/image/logo.png";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// const ForgotPasswordPage = () => {
//       const [email, setEmail] = useState("");
//         // Determine theme-specific classes
//           const navigate = useNavigate();
//   const { toast } = useToast();
//   const { theme } = useTheme();
//   const getThemeClasses = () => {
//     if (!theme || theme === "default") return "";
//     return `theme-${theme}`;
//   };
//         const themeClasses = getThemeClasses();
//         const handleLogin = async (e: React.FormEvent) => {
//             e.preventDefault();
          
//           };
//   return (
//     <ForgotBackground themeClasses={themeClasses}>
//         <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">

//  <div
//           className={`absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-30`}
//         >
//           <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//         </div>
//             <CardHeader className="space-y-1">
//           <div className="flex justify-center mb-2">
//             <img
//               src={Logo}
//               alt={Logo}
//               className="relative z-10 w-20 h-20 animate-pulse-subtle"
//             />
//           </div>
//           <CardTitle className="text-2xl font-bold text-center">
//             MetroMind Login
//           </CardTitle>
//           <CardDescription className="text-center">
//             Sign in to access your MetroMind account
//           </CardDescription>
//         </CardHeader>
//          <CardContent>
//              <ForgotForm  
//          email={email}
//               setEmail={setEmail}
//               onSubmit={handleLogin} />
//          </CardContent>
       
//         </Card>
         
//      </ForgotBackground>
       

//   )
// }

// export default ForgotPasswordPage
import ForgotBackground from '@/components/Forgotpassword/ForgotBackground';
import ForgotForm from '@/components/Forgotpassword/ForgotForm';

import { useToast } from '@/hooks/use-toast';
import { ForgotPasswordSentOpt,  } from '@/models/auth';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "/image/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState<'email' | 'otp'>('email');
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();

  const getThemeClasses = () => {
    if (!theme || theme === "default") return "";
    return `theme-${theme}`;
  };

  const themeClasses = getThemeClasses();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
              const formData = { email:email };
      const response = await ForgotPasswordSentOpt(formData);
      console.log("response###",response)
      toast({
        title: "Success",
        description: response.message || "OTP has been sent to your email",
        variant: "default",
      });
localStorage.setItem("resUserId",response.user_id)
      setUserId(response.user_id);
      
      setCurrentStep('otp');
      navigate('/VerifyOtp');
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

//   const handleOTPVerification = async (otp: string, newPassword: string) => {
//     setIsLoading(true);

//     try {
//       if (!userId) {
//         throw new Error("User ID not found");
//       }

//       const response = await VerifyOtpAndResetPassword(userId, otp, newPassword);
      
//       toast({
//         title: "Success",
//         description: "Password reset successfully. Please login with your new password.",
//         variant: "default",
//       });

//       // Navigate to login page
//       navigate('/login');
//     } catch (error: any) {
//       console.error("Error verifying OTP:", error);
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "Invalid OTP or failed to reset password.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

  const handleBackToEmail = () => {
    setCurrentStep('email');
    setUserId(null);
  };

  return (
    <ForgotBackground themeClasses={themeClasses}>
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
          {/* {currentStep === 'email' ? ( */}
            <ForgotForm
              email={email}
              setEmail={setEmail}
              onSubmit={handleSendOTP}
              isLoading={isLoading}
            />
        
        </CardContent>
      </Card>
    </ForgotBackground>
  );
};

export default ForgotPasswordPage;