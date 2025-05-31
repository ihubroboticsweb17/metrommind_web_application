
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Shield, Lock, Eye, EyeOff } from "lucide-react";

// interface EmailOtpFormProps {
//   onSubmit: (otp: string, newPassword: string) => void;
//   onBack: () => void;
//   isLoading?: boolean;
// }

// const EmailOtpForm = ({ 
//   onSubmit,
//      onBack,
//       isLoading = false }: EmailOtpFormProps) => {
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errors, setErrors] = useState<{
//     otp?: string;
//     newPassword?: string;
//     confirmPassword?: string;
//   }>({});

//   const validate = () => {
//     const newErrors: {
//       otp?: string;
//       newPassword?: string;
//       confirmPassword?: string;
//     } = {};

//     if (!otp.trim()) {
//       newErrors.otp = "OTP is required.";
//     } else if (otp.length !== 6) {
//       newErrors.otp = "OTP must be 6 digits.";
//     }

//     if (!newPassword.trim()) {
//       newErrors.newPassword = "New password is required.";
//     } else if (newPassword.length < 8) {
//       newErrors.newPassword = "Password must be at least 8 characters.";
//     }

//     if (!confirmPassword.trim()) {
//       newErrors.confirmPassword = "Please confirm your password.";
//     } else if (newPassword !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       onSubmit(otp, newPassword);
//     }
//   };
//   // const handleSubmit = (e: Fo) => {
//   //   e.preventDefault();
//   //   if (validate()) {
//   //     onSubmit(e);
//   //   }
//   // };
//   return (
//     <form onSubmit={handleSubmit} noValidate className="space-y-6">
//       <div className="grid gap-2">
//         <Label htmlFor="otp" className="text-gray-400">
//           Enter 6-digit OTP
//         </Label>
//         <div className="relative">
//           <Input
//             id="otp"
//             type="text"
//             placeholder="123456"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//             className="bg-background/50 pl-10 text-center text-lg tracking-widest"
//             maxLength={6}
//             required
//             disabled={isLoading}
//           />
//           <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//         </div>
//         {errors.otp && (
//           <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
//         )}
//       </div>

//       <div className="flex gap-3">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={onBack}
//           className="flex-1"
//           disabled={isLoading}
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back
//         </Button>
//         <Button
//           type="submit"
//           className="flex-1 group relative overflow-hidden"
//           disabled={isLoading}
//         >
//           <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
//           <span className="relative flex items-center justify-center gap-2">
//             <Shield className="h-4 w-4" />
//             {isLoading ? "Verifying..." : "Reset Password"}
//           </span>
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default EmailOtpForm;
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Eye, EyeOff } from "lucide-react";

interface EmailOtpFormProps {
  onSubmit: (otp: string, newPassword: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

const EmailOtpForm = ({
  onSubmit,
  onBack,
  isLoading = false
}: EmailOtpFormProps) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    otp?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      otp?: string;
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    // Validate OTP
    if (!otp.trim()) {
      newErrors.otp = "OTP is required.";
    } else if (otp.length !== 6) {
      newErrors.otp = "OTP must be 6 digits.";
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = "OTP must contain only numbers.";
    }

    // Validate new password
    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required.";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters.";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    if (validate()) {
      onSubmit(otp, newPassword);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 6 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    
    // Clear OTP error when user starts typing
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    
    // Clear password errors when user starts typing
    if (errors.newPassword) {
      setErrors(prev => ({ ...prev, newPassword: undefined }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    // Clear confirm password error when user starts typing
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* OTP Input */}
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
            onChange={handleOtpChange}
            className={`bg-background/50 pl-10 text-center text-lg tracking-widest ${
              errors.otp ? 'border-red-500' : ''
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

      {/* New Password Input */}
      <div className="grid gap-2">
        <Label htmlFor="newPassword" className="text-gray-400">
          New Password
        </Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={handlePasswordChange}
            className={`bg-background/50 pl-10 pr-10 ${
              errors.newPassword ? 'border-red-500' : ''
            }`}
            required
            disabled={isLoading}
            autoComplete="new-password"
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
        )}
      </div>

      {/* Confirm Password Input */}
      <div className="grid gap-2">
        <Label htmlFor="confirmPassword" className="text-gray-400">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`bg-background/50 pl-10 pr-10 ${
              errors.confirmPassword ? 'border-red-500' : ''
            }`}
            required
            disabled={isLoading}
            autoComplete="new-password"
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
          disabled={isLoading}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 group relative overflow-hidden"
          disabled={isLoading || !otp || !newPassword || !confirmPassword}
        >
          <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary group-hover:w-full"></span>
          <span className="relative flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            {isLoading ? "Resetting..." : "Reset Password"}
          </span>
        </Button>
      </div>
    </form>
  );
};

export default EmailOtpForm;