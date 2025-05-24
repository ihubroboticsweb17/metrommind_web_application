import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LogIn, Eye, EyeOff, Info, Mail ,Lock} from "lucide-react";
import { MOCK_USERS } from "@/models/auth";
import Logo from "/image/logo.png";
interface OtpFormProps {

  otpNo:string;
  setOtpNo:(otp:string)=>void
  onSubmit: (e: FormEvent) => void;
  
}

const OtpForm = ({ otpNo, setOtpNo, onSubmit }: OtpFormProps) => {
    const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const handleChange = (value: string, index: number) => {
    const newOtp = [...otpDigits];
    newOtp[index] = value.replace(/\D/, ""); // only digits
    setOtpDigits(newOtp);
    setOtpNo(newOtp.join(""));
    
    // Auto focus next input
    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (value && nextInput) nextInput.focus();
  };
  return (
    <form onSubmit={onSubmit}>
    <div className="flex flex-col items-center gap-6 p-6 bg-white  w-full max-w-md mx-auto">

    
        <div className="flex justify-between gap-3">
          {otpDigits.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-14 h-14 text-center text-xl border-2 border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>
      <p className="text-sm text-blue-600 cursor-pointer hover:underline">Resend Code</p>
  
      <Button type="submit" 
       disabled={otpNo.length < 4}
       className="w-full bg-teal-600 hover:bg-teal-600 hover:text-white text-white  text-lg py-2  border-1 border-teal-600 rounded-lg transition">
        Verify
      </Button>
  
    </div>
  </form>
  );
};

export default OtpForm;
