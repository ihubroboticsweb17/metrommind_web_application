// import React from "react";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogIn, Mail } from "lucide-react";

interface ForgotFormProps {
  email: string | null;
  setEmail: (email: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading?: boolean;
}

const ForgotForm = ({ email, setEmail, onSubmit, isLoading = false }: ForgotFormProps) => {
  const [errors, setErrors] = useState<{ email?: string }>({});

  const validate = () => {
    const newErrors: { email?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-8">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-gray-400">
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50 pl-10"
              required
              disabled={isLoading}
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <Button 
        type="submit" 
        className="w-full group relative overflow-hidden" 
        disabled={isLoading}
      >
        <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
        <span className="relative flex items-center justify-center gap-2">
          <LogIn className="h-4 w-4" />
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </span>
      </Button>
      </div>
      
    </form>
  );
};

export default ForgotForm;