import { useEffect, useState } from "react";
import Ani from "../assets/json/logoAni.json";
import Logo from '/image/logo.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { VerifyPhoneNo } from "@/models/auth";
import Lottie from "lottie-react";
import PhonoveriBackground from "@/components/Phonenoverification/VerificationBackground";
 import {
   Card,
 CardContent,
  CardDescription,
  CardFooter,
   CardHeader,
  CardTitle,
 } from "@/components/ui/card";

const PhoneNoVerify = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load saved phone numberu
  useEffect(() => {
    const savedPhone = localStorage.getItem('userFullPhone');
    if (savedPhone) {
      setPhone(savedPhone.replace('+', ''));
    }
  }, []);



const handleSendOtp = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const fullPhone = `+${phone}`;
  localStorage.setItem('userFullPhone', fullPhone);

  const formData = {
    mobile_number: fullPhone,
  };

  try {
    const res = await VerifyPhoneNo(formData);

    if (res.status === "ok") {
      toast({
        title: "Success",
        description: "OTP sent successfully!",
      });
      navigate("/otp");
    } else {
      // Show the backend message directly if something went wrong
      toast({
        variant: "destructive",
        title: "Error",
        description: res.message || "Failed to send OTP. Please try again.",
      });
    }
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Something went wrong. Please try again later.",
    });
  } finally {
    setIsLoading(false);
  }
};

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
    <PhonoveriBackground themeClasses={themeClasses}>
      <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-xl">
        {isLoading && <LoadingOverlay />}

        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <img src={Logo} alt="Logo" className="relative z-10 w-24 h-28 animate-pulse-subtle" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Hello!</CardTitle>
          <CardDescription className="text-center">Welcome to MetroMind</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 justify-center">
            <h1 className="text-center">Please Enter your phone number</h1>
            <form onSubmit={handleSendOtp} className="space-y-8">
              
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={(value) => setPhone(value)}
                inputClass="!w-full !py-2 !pl-12 !pr-4 !text-sm !rounded-sm !border !border-input"
                containerClass="!w-full"
                buttonClass="!bg-transparent !border-none"
                dropdownClass="!rounded-lg !shadow-lg"
                specialLabel=""
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                }}
              />
              <button
                type="submit"
                className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-all duration-200 w-full"
              >
                Send OTP
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </PhonoveriBackground>
  );
};

export default PhoneNoVerify;

