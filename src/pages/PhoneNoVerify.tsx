// import { useState, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/App";
import RoleSelection from "@/components/login/RoleSelection";
import LoginForm from "@/components/login/LoginForm";
import LoginBackground from "@/components/login/LoginBackground";
import { UserRole, saveUserSession, getSavedEmail, VerifyPhoneNo } from "@/models/auth";
import axios from "axios";
import { login } from "@/models/auth";
import Logo from '/image/logo.png'
import PhonoveriBackground from "@/components/Phonenoverification/VerificationBackground";
import VerificationForm from "@/components/Phonenoverification/VerificationForm";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Ani from "../assets/json/logoAni.json";

const PhoneNoVerify = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
   const [isLoading, setIsLoading] = useState(false);
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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // if (!phone) {
    //   alert("Please enter your phone number");
    //   return;
    // }
    
    const fullPhone = `${countryCode}${phone}`;
    
    // Store phone number and country code in localStorage
    localStorage.setItem('userPhone', phone);
    localStorage.setItem('userCountryCode', countryCode);
    localStorage.setItem('userFullPhone', fullPhone);
    
    const formData = {
      mobile_number: fullPhone,
    };
    
    console.log("Sending data:", formData);
    
    const payload = { phone_number: phone };
    console.log("payload", payload);
    
    try {
      const res = await VerifyPhoneNo(formData);
      console.log("res", res);
      
      if (res.status === "ok") {
        toast({
          title: "Success",
          description: `OTP sent successfully!`,
        });
        navigate("/otp");
      } else {
        alert("Failed to send OTP.");
      }
    } catch (err) {
      alert("Error sending OTP. Try again.");
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
      <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
          {isLoading && <LoadingOverlay />}
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <img src={Logo} alt="Logo" className="relative z-10 w-20 h-20 animate-pulse-subtle" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Hello!
          </CardTitle>
          <CardDescription className="text-center">
            Welcome to MetroMind
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-6 justify-center">
            <h1 className="text-center">Please Enter your phone number</h1>
            
            <VerificationForm
              phone={phone}
              setPhone={setPhone}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              onSubmit={handleSendOtp}
            />
          </div>
        </CardContent>
      </Card>
    </PhonoveriBackground>
  );
};

export default PhoneNoVerify;