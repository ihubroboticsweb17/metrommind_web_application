// import PasswordRestForm from '@/components/PasswordRest/PasswordRestForm'
// import React, { useState } from 'react'
//   import { useTheme } from "next-themes";
// import { useToast } from "@/hooks/use-toast";
// import { useNavigate } from 'react-router-dom';
// import PasswordRestBackground from '@/components/PasswordRest/PasswordRestBackground';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Logo from "/image/logo.png";

// const PasswordRestPage = () => {
//     const [isLoading, setIsLoading] = useState(false);
//       const { toast } = useToast();
//   const { theme } = useTheme();
//   const navigate = useNavigate();

//       const getThemeClasses = () => {
//     if (!theme || theme === "default") return "";
//     return `theme-${theme}`;
//   };

//   const themeClasses = getThemeClasses();
//    const handleOTPVerification = async (otp: string, newPassword: string) => {
//     setIsLoading(true);

      

//          if (res.ok) {
//       alert('Password updated! Please login.');
//       window.location.href = '/login'; // or use history.push('/login')
//     } else {
//       alert('Something went wrong.');
//     }
// }
//   return (
//     <PasswordRestBackground themeClasses={themeClasses}>
//           <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
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
//                 <PasswordRestForm
//            isLoading={isLoading}
          
//               onSubmit={handleOTPVerification}
//               />
//           </CardContent>
//         </Card>
      
//     </PasswordRestBackground>
    
    
//   )
// }

// export default PasswordRestPage
import PasswordRestForm from '@/components/PasswordRest/PasswordRestForm'
import React, { useState } from 'react'
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from 'react-router-dom';
import PasswordRestBackground from '@/components/PasswordRest/PasswordRestBackground';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "/image/logo.png";
import { ResetPassword } from '@/models/auth';


const PasswordRestPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from URL params

  const getThemeClasses = () => {
    if (!theme || theme === "default") return "";
    return `theme-${theme}`;
  };

  const themeClasses = getThemeClasses();

  const handlePasswordReset = async (otp: string, newPassword: string) => {
    setIsLoading(true);
    
    try {
      // Check if ID exists
      if (!id) {
        toast({
          title: "Error",
          description: "Invalid reset link. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Prepare form data - adjust based on your API requirements
      const formData = {
        otp: otp,
        new_password: newPassword,
        // Add other fields if required by your API
      };

      const response = await ResetPassword(id, formData);
      
      // Handle successful response
      if (response.status === 200 || response.data.success) {
        toast({
          title: "Success!",
          description: "Password has been reset successfully. Please login with your new password.",
          variant: "default",
        });
        
        // Navigate to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        throw new Error(response.data.message || 'Password reset failed');
      }
      
    } catch (error: any) {
      console.error("Password reset error:", error);
      
      // Handle different error scenarios
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 400) {
          errorMessage = "Invalid OTP or password. Please check your details.";
        } else if (error.response.status === 404) {
          errorMessage = "Reset link is invalid or expired.";
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Password Reset Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PasswordRestBackground themeClasses={themeClasses}>
      <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
        {/* Enhanced gradient border effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl opacity-40">
          <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
          <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
        </div>

        <CardHeader className="space-y-4 pb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={Logo}
                alt="MetroMind Logo"
                className="relative z-10 w-20 h-20 animate-pulse-subtle drop-shadow-lg"
              />
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl -z-10 animate-pulse"></div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Enter the OTP sent to your email and create a new secure password
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-8">
          <PasswordRestForm
            isLoading={isLoading}
            onSubmit={handlePasswordReset}
          />
        </CardContent>
      </Card>
    </PasswordRestBackground>
  );
};

export default PasswordRestPage;