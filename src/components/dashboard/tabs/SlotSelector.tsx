import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { AssignDoctorList, DoctorSlotCreate } from "@/models/auth";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/App";

interface Doctor {
  id: number;
  name: string;
  username: string;
  email: string;
  mobile_number: string;
  medical_report: string;
  medical_report_url: string;
  role: string;
  age: number | null;
  gender: string;
  occupation: string | null;
  education: string | null;
  address: string | null;
  patient_id: number | null;
}

interface DoctorListTabProps {
  patientId: number | null;
  DoctorId: number | null;
}

interface SlotSelectorProps {
  onClose?: () => void; // Function to close the dialog
  onSlotAdded?: () => void; // Function to refresh slot list
}

const SlotSelector: React.FC<SlotSelectorProps> = ({ onClose, onSlotAdded }) => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [doctor, setDoctor] = useState("");
  const [toTime, setToTime] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [Date, setDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [slotData, setSlotData] = useState<{
    doctor: string;
    date: string;
    from_time: string;
    to_time: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("rollllllllle", userRole);

  useEffect(() => {
    const fetchAssDoctorlist = async () => {
      try {
        setLoading(true);
        const data = await AssignDoctorList();
        console.log("DoctorList@", data);
        setDoctorList(data);
      } catch (err) {
        setError("Failed to load doctor");
      } finally {
        setLoading(false);
      }
    };
    const role = localStorage.getItem("role");
    console.log("rollllllllle", role);
    setUserRole(role);
    fetchAssDoctorlist();
  }, []);

  // Reset form function
  const resetForm = () => {
    setDoctor("");
    setDate("");
    setFromTime("");
    setToTime("");
    setErrorMessage("");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    const formData = {
      doctor,
      date: Date,
      from_time: fromTime,
      to_time: toTime,
    };
    
    if (
      ![
        "psychiatrist",
        "senior_psychologist",
        "junior_psychologist",
        "admin",
      ].includes(userRole || "")
    ) {
      setErrorMessage(
        "Only psychiatrist, senior psychologist, junior psychologist, and admins can create slots."
      );
      return;
    }
    
    try {
      setLoading(true);
      const data = await DoctorSlotCreate(formData);

      console.log("Registration successful!", data);
      toast({
        variant: "default",
        title: "Success",
        description: "Slot created successfully!",
      });
      
    
      resetForm();
      
     
      if (onSlotAdded) {
        onSlotAdded();
      }
      
  
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 2500); 
      
    } catch (error: any) {
      console.error("Slot Create failed:", error);

      if (error.response && error.response.data) {
        const errorData = error.response.data;
        // Handle specific error messages
        setErrorMessage(errorData.message || "The selected time range is invalid or overlaps with another scheduled slot. Please choose a different range");
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
    <form onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doctor Selection */}
        <div className="space-y-2">
          <Label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
            Doctor
          </Label>
          <div className="relative">
            <select
              id="doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer hover:border-gray-400 transition-all duration-200 relative z-20"
              required
            >
              <option value="" disabled className="text-gray-500">
                Select a doctor
              </option>
              {doctorList.map((doc) => (
                <option key={doc.id} value={doc.id} className="text-teal-900">
                  {doc.name} 
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none z-10">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={Date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-background/50"
            required
          />
        </div>

        {/* From Time */}
        <div className="space-y-2">
          <Label htmlFor="from_time">From Time</Label>
          <Input
            id="from_time"
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            className="bg-background/50"
            required
          />
        </div>

        {/* To Time */}
        <div className="space-y-2">
          <Label htmlFor="to_time">To Time</Label>
          <Input
            id="to_time"
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            className="bg-background/50"
            required
          />
        </div>
      </div>
      
      {/* Error Message Display */}
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 rounded">
          {errorMessage}
        </div>
      )}
      
      <div className="gap-2 flex justify-center p-4">
        <Button type="submit" className="w-full group relative overflow-hidden" disabled={loading}>
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding Slot...
            </div>
          ) : (
            "Add Slot"
          )}
        </Button>
      </div>
    </form>
  );
};

export default SlotSelector;