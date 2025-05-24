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
const SlotSelector = () => {
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
      const data = await DoctorSlotCreate(formData);

      console.log("Registration successful!", data);
      toast({
        variant: "default",
        title: "Success",
        description: "Slot Create completed!",
      });
setLoading(true);
setTimeout(() => setLoading(false), 3000);
    } catch (error: any) {
      console.error("Slot Create failed:", error);

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

    // try {
    //   const response = await fetch("http://192.168.1.28:8000/booking/slots/create/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    //     },
    //     body: JSON.stringify({
    //       doctor,
    //       date: Date,
    //       from_time: fromTime,
    //       to_time: toTime,
    //     }),
    //   });

    //   const result = await response.json();
    //   if (response.ok) {
    //     toast({
    //         title: result.message,
    //         description: "Slot added successfully!",
    //       })
    //     console.log("Slot added successfully:", result);
    //     // Optionally reset form here
    //   } else {
    //     console.error("Failed to add slot:", result);
    //   }
    // } catch (error) {
    //   console.error("An error occurred:", error);
    // }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Doctor */}
        {/* <div className="flex flex-col gap-1">
      <Label htmlFor="doctor">Doctor</Label>
      <Input
        id="doctor"
        type="text"
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
        className="bg-background/50"
        required
      />
    </div> */}
        <div className="grid gap-2">
          <Label htmlFor="doctor">Doctor</Label>
          <select
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="bg-background/50 p-2 rounded border"
            required
          >
            <option value="">Select a doctor</option>
            {doctorList.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1">
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
        <div className="flex flex-col gap-1">
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
        <div className="flex flex-col gap-1">
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
      <div className="gap-2 flex justify-center p-4 ">
          <Button
       

            type="submit"
            className="w-full group relative overflow-hidden"
          >
            <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
            <span className="relative flex items-center justify-center gap-2">
              Add slot
            </span>
          </Button>
        </div>
    </form>
  );
};

export default SlotSelector;
