
import React from 'react'
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import registerDoctor from '@/components/adddoctor/AddDoctorForm';
import { useToast } from "@/hooks/use-toast";
import AddDoctorForm from '@/components/adddoctor/AddDoctorForm';
import { Doctorregister, MedicineBrandCreat, Medicineregister } from '@/models/auth';
import AddMedicineForm from '@/components/AddMedicine/AddMedicineForm';
import AddBrandMedicineForm from '@/components/Addbrand/AddBrandMedicineForm';
interface AddMedicineBrandTabProps {
  onSuccess: () => void;
}
const  AddMedicineBrandTab: React.FC<AddMedicineBrandTabProps> = ({ onSuccess }) => {
    const [name, setName] = useState("");
 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
      const { toast } = useToast();

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const formData = {
            name,
        };
    
        console.log("Sending data:", formData);
    
        try {
          const data = await MedicineBrandCreat(formData);
    
          toast({
            title: "Success",
            description: "Medicine Brand Created successfully!",
          });
     onSuccess();
        } catch (error: any) {
          console.error("Medicine Brand  Created failed:", error);
    
          if (error.response && error.response.data) {
            const errorData = error.response.data;
                                                                                                                                
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
  return (

   <AddBrandMedicineForm
    name={name}
    setName={setName} 
    onSubmit={handleSubmit}
    />
  
  )
}

export default  AddMedicineBrandTab;
