// import React, { useEffect, useState } from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Calendar } from "lucide-react";
// import { DoctorObservationPatient } from "@/models/auth";
// interface Patient {
//   id: string;
//   patient_name: string;
//   username: string;
//   email: string;
//   mobile_number: string;
//   age: number;
//   gender: string;
//   occupation: string;
//   education: string;
//   address: string;
//   patient_id: string;
//   doctor_name: string;
//   doctor_role: string;
//   assigned_at: string;
// }
// const SchedulePatientTab = () => {
//   const [patientData, setPatientData] = useState<Patient[]>([]);
//   const [loading, setLoading] = useState(true);
//    const [error, setError] = useState("");
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const data = await DoctorObservationPatient("doctorId");
//         console.log("patients:", data);
//         setPatientData(data);
//       } catch (error) {
//         console.error("Error fetching patient list:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatients();
//   }, []);
//   if (loading) {
//     return (
//       <div className="grid gap-4 p-2">
//         <div className="space-y-3">
//           <div className="font-medium text-teal-800 flex items-center gap-2">
//             <Calendar className="h-4 w-4 text-teal-500" />
//             Loading patient schedules...
//           </div>
//           <Skeleton className="h-20 w-full bg-teal-50" />
//           <Skeleton className="h-20 w-full bg-teal-50" />
//           <Skeleton className="h-20 w-full bg-teal-50" />
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="grid gap-4 p-2">
//       <div className="space-y-3">
//         {/* <div className="font-medium text-teal-800 flex items-center gap-2">
//         <Calendar className="h-4 w-4 text-teal-500" />
//           Today
//         </div> */}
//         {loading ? (
//             <>
//                <p>Loading ...</p>
//             </>
//         ): error ? (
//              <p className="text-red-500">{error}</p>
//         ):  (
//             <div className="space-y-3">
//           {patientData.map((item, i) => (
//             <div className="p-4 rounded-md bg-teal-50 border border-teal-100 hover:shadow-md transition-all">
//               <div className="flex justify-between" key={item.id}>
//                 <div>
//                   <p className="font-medium text-teal-800">
//                     {item.doctor_name}
//                   </p>
//                   <p className="text-sm text-teal-600">{item.doctor_role}</p>
//                 </div>
//                 <div className="text-right">
//                 {(() => {
//   const dateObj = new Date(item.assigned_at);
//   const formattedDate = dateObj.toLocaleDateString("en-CA"); // YYYY-MM-DD
//   const formattedTime = dateObj.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <>
//       <p className="font-medium text-teal-800">{formattedTime}</p>
//       <p className="text-sm text-teal-600">{formattedDate}</p>
//     </>
//   );
// })()}
//                   {/* <p className="font-medium text-teal-800">2:00 PM - 3:00 PM</p>
//                   <p className="text-sm text-teal-600">Virtual</p> */}
//                 </div>
//               </div>
//             </div>
//           ))}
//           {/* More schedule items would go here */}
//           <Skeleton className="h-20 w-full bg-teal-50" />
//           <Skeleton className="h-20 w-full bg-teal-50" />
//         </div>
    
//         )}
//          </div>  
        
//     </div>
//   );
// };

// export default SchedulePatientTab;
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, BadgeAlert, Users } from "lucide-react";
import { DoctorObservationPatient } from "@/models/auth";
import { Card } from "@/components/ui/card";

// Mock function to simulate API call - replace with your actual import
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
const SchedulePatientTab = ({ theme = "green" }) => {
  const [patientData, setPatientData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await DoctorObservationPatient("doctorId");
        console.log("patients:", data);
        setPatientData(data || []);
      } catch (error) {
        console.error("Error fetching patient list:", error);
        setError(error instanceof Error ? error.message : "Failed to load patient data");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="grid gap-4 p-2">
        <div className="space-y-3">
          <div className="font-medium text-teal-800 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-500" />
            Loading patient schedules...
          </div>
          <Skeleton className="h-20 w-full bg-teal-50" />
          <Skeleton className="h-20 w-full bg-teal-50" />
          <Skeleton className="h-20 w-full bg-teal-50" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="grid gap-4 p-2">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-500 flex items-center gap-2">
            <BadgeAlert className="h-4 w-4" />
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (patientData.length === 0) {
    return (
      <div className="grid gap-4 p-2">
        <div className="p-8 text-center bg-gray-50 rounded-md">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 font-medium mb-2">No patient schedules found</p>
          <p className="text-gray-400 text-sm">Patient assignments will appear here once available</p>
        </div>
      </div>
    );
  }

  // Format date and time helper
  const formatDateTime = (dateString: string) => {
    try {
      const dateObj = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return { time: "Invalid time", date: "Invalid date" };
      }
      
      const formattedDate = dateObj.toLocaleDateString("en-CA"); // YYYY-MM-DD
      const formattedTime = dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
      
      return { time: formattedTime, date: formattedDate };
    } catch (error) {
      return { time: "Invalid time", date: "Invalid date" };
    }
  };
const getThemeClasses = () => {
    switch (theme) {
      case "royal":
        return "bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-lg hover:shadow-purple-300";
      case "ocean":
        return "bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg hover:shadow-blue-300";
      case "emerald":
        return "bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 shadow-lg hover:shadow-emerald-300";
      case "sunset":
        return "bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 shadow-lg hover:shadow-orange-300";
      case "pink":
        return "bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 shadow-lg hover:shadow-pink-300";
      case "green":
        return "bg-gradient-to-br from-teal-50 to-green-50 border-2 border-teal-200 shadow-lg hover:shadow-teal-300";
      default:
        return "bg-white border-2 border-gray-200 shadow-lg";
    }
  };
  return (
      <Card className={`h-fit ${getThemeClasses()}`}>
    <div className="grid gap-4 p-2">
      <div className="space-y-3">
        <div className="font-medium text-teal-800 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-teal-500" />
      Doctor Schedules ({patientData.length})
        </div>
        
        <div className="space-y-3">
          {patientData.map((item) => {
            const { time, date } = formatDateTime(item.assigned_at);
            
            return (
             
              <div 
                key={item.id} 
                className="p-4 rounded-md bg-teal-50 border border-teal-100 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="mb-2">
                      <p className="font-medium text-teal-800">
                        {item.patient_name}
                      </p>
                      <p className="text-sm text-teal-600">
                        Patient ID: {item.patient_id}
                      </p>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p><span className="font-medium">Doctor:</span> <strong>{item.doctor_name}</strong></p>
                      <p><span className="font-medium">Role:</span> {item.doctor_role}</p>
                      <p><span className="font-medium">Age:</span> {item.age} • <span className="font-medium">Gender:</span> {item.gender}</p>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <p className="font-medium text-teal-800">{time}</p>
                    <p className="text-sm text-teal-600">{date}</p>
                    <p className="text-xs text-gray-500 mt-1">Assigned</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div></Card>
  );
};

export default SchedulePatientTab;