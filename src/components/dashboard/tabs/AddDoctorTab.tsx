import React from "react";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import registerDoctor from "@/components/adddoctor/AddDoctorForm";
import { useToast } from "@/hooks/use-toast";
import AddDoctorForm from "@/components/adddoctor/AddDoctorForm";
import { Doctorregister } from "@/models/auth";
interface AddDoctorTabProps {
  onSuccess?: () => void; // Callback to close dialog
}
const AddDoctorTab = ({ onSuccess }: AddDoctorTabProps) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      name,
      username,
      mobile_number: mobilenumber,
      email,
      password,
      role,
      occupation,
      education,
    };

    console.log("Sending data:", formData);

    try {
      const data = await Doctorregister(formData);

      console.log("Registration successful!", formData);
      toast({
        title: "Success",
        description: "Registration completed!",
      });
      //       setTimeout(() => {
      //   if (onSuccess) {
      //     onSuccess();
      //   }
      // }, 1500);
      if (typeof onSuccess === "function") {
        // Execute the callback immediately after toast
        onSuccess();
      }
    } catch (error: any) {
      console.error("Registration failed:", error);

      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Loop through all error fields and show them in toasts
        for (const key in errorData) {
          if (errorData.hasOwnProperty(key)) {
            const messages = Array.isArray(errorData[key])
              ? errorData[key].join(", ")
              : errorData[key];

            toast({
              variant: "destructive",
              title: `${key.charAt(0).toUpperCase() + key.slice(1)} Error`,
              description: messages,
            });
          }
        }
      } else {
        toast({
          variant: "destructive",
          title: "Unexpected Error",
          description: "Something went wrong. Please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  // const handleSubmit = () => {
  //     console.log("Doctor Data Submitted:", {
  //       name,
  //       username,
  //       mobilenumber,
  //       email,
  //       password,
  //       role,
  //       occupation,
  //       education,
  //     });
  //     // Add your form submission logic here
  //   };
  return (
    <AddDoctorForm
      name={name}
      setName={setName}
      username={username}
      setUsername={setUsername}
      mobilenumber={mobilenumber}
      setMobilenumber={setMobilenumber}
      countryCode={countryCode}
      setCountryCode={setCountryCode}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      role={role}
      setRole={setRole}
      occupation={occupation}
      setOccupation={setOccupation}
      education={education}
      setEducation={setEducation}
      onSubmit={handleSubmit}
      //  loading={loading}
    />
  );
};

export default AddDoctorTab;
