import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";
import { DoctorObservationPatient } from "@/models/auth";
interface Patient {
  id: string;
  patient_name: string;
  username: string;
  email: string;
  mobile_number: string;
  age: number;
  gender: string;
  occupation: string;
  education: string;
  address: string;
  patient_id: string;
  doctor_name: string;
  doctor_role: string;
  assigned_at: string;
}
const SchedulePatientTab = () => {
  const [patientData, setPatientData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await DoctorObservationPatient("doctorId");
        console.log("patients:", data);
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);
  return (
    <div className="grid gap-4 p-2">
      <div className="space-y-3">
        {/* <div className="font-medium text-teal-800 flex items-center gap-2">
        <Calendar className="h-4 w-4 text-teal-500" />
          Today
        </div> */}
        {loading ? (
            <>
               <p>Loading medicines...</p>
            </>
        ): error ? (
             <p className="text-red-500">{error}</p>
        ):  (
            <div className="space-y-3">
          {patientData.map((item, i) => (
            <div className="p-4 rounded-md bg-teal-50 border border-teal-100 hover:shadow-md transition-all">
              <div className="flex justify-between" key={item.id}>
                <div>
                  <p className="font-medium text-teal-800">
                    {item.doctor_name}
                  </p>
                  <p className="text-sm text-teal-600">{item.doctor_role}</p>
                </div>
                <div className="text-right">
                {(() => {
  const dateObj = new Date(item.assigned_at);
  const formattedDate = dateObj.toLocaleDateString("en-CA"); // YYYY-MM-DD
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <p className="font-medium text-teal-800">{formattedTime}</p>
      <p className="text-sm text-teal-600">{formattedDate}</p>
    </>
  );
})()}
                  {/* <p className="font-medium text-teal-800">2:00 PM - 3:00 PM</p>
                  <p className="text-sm text-teal-600">Virtual</p> */}
                </div>
              </div>
            </div>
          ))}
          {/* More schedule items would go here */}
          <Skeleton className="h-20 w-full bg-teal-50" />
          <Skeleton className="h-20 w-full bg-teal-50" />
        </div>
    
        )}
         </div>  
        
    </div>
  );
};

export default SchedulePatientTab;
