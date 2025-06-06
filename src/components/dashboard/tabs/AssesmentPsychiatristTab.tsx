// import React, { useEffect, useState } from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Activity, BadgeAlert, Brain, Calendar } from "lucide-react";
// import { AssesmentList, DoctorObservationPatient, PatientAssessmentList } from "@/models/auth";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
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
// interface AssessmentPatentTabProps {
//     patientId: number | null;
//   }
// const  AssessmentPsychiatristTab  = () =>{
//   const [patientData, setPatientData] = useState<Patient[]>([]);
//   const [loading, setLoading] = useState(true);
//    const [error, setError] = useState("");
   
//   useEffect(() => {
//     const fetchPatients = async () => {
   
//       try {
//         const data = await AssesmentList();
//         console.log("assesment:", data);
//         setPatientData(data);
//       } catch (error) {
//         console.error("Error fetching patient list:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatients();
//   }, []);
//   return (
//     <div className="grid gap-4 p-2">
//       <div className="space-y-3">
//         {/* <div className="font-medium text-teal-800 flex items-center gap-2">
//         <Calendar className="h-4 w-4 text-teal-500" />
//           Today
//         </div> */}
//         {loading ? (
//             <>
//                <p>Loading medicines...</p>
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

// export default AssessmentPsychiatristTab;
// 

import { Skeleton } from "@/components/ui/skeleton";
import { Activity, BadgeAlert, Brain, Calendar, FileText, CheckCircle, Clock } from "lucide-react";
import { DoctorObservationPatient, PatientAssessmentList } from "@/models/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Updated interface to match the API response
interface AssessmentItem {
  id: number;
  question_text: string;
  response_text: string | null;
  doctor: {
    id: number;
    name: string;
    username: string;
    email: string;
    mobile_number: string;
  };
  patient: {
    id: number;
    name: string;
    username: string;
    email: string;
    mobile_number: string;
  };
  created_at: string;
}

interface AssessmentResponse {
  data: AssessmentItem[];
  message: string;
  status: string;
}

interface AssessmentPsychiatristTabProps {
  patientId: number | null;
}

const AssessmentPsychiatristTab: React.FC<AssessmentPsychiatristTabProps> = ({ patientId }) => {
  const [assessmentData, setAssessmentData] = useState<AssessmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssessments = async () => {
      if (!patientId) return;
      try {
        const response: AssessmentResponse = await PatientAssessmentList(patientId);
        console.log("assessment data:", response);
        
        if (response.status === "ok" && response.data) {
          setAssessmentData(response.data);
        } else {
          setError("Failed to fetch assessment data");
        }
      } catch (error) {
        console.error("Error fetching assessment list:", error);
        setError("Error loading assessments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [patientId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-CA"), // YYYY-MM-DD
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  if (loading) {
    return (
      <div className="grid gap-4 p-2">
        <div className="space-y-3">
          <p>Loading assessments...</p>
          <Skeleton className="h-24 w-full bg-teal-50" />
          <Skeleton className="h-24 w-full bg-teal-50" />
          <Skeleton className="h-24 w-full bg-teal-50" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid gap-4 p-2">
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-500 flex items-center gap-2">
            <BadgeAlert className="h-4 w-4" />
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (assessmentData.length === 0) {
    return (
      <div className="grid gap-4 p-2">
        <div className="p-8 text-center bg-gray-50 rounded-md">
          <Brain className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No assessments found for this patient</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-2">
      <div className="space-y-4">
        <div className="font-medium text-teal-800 flex items-center gap-2">
          <FileText className="h-5 w-5 text-teal-500" />
          Patient Assessments ({assessmentData.length})
        </div>

        {assessmentData.map((assessment) => {
          const { date, time } = formatDate(assessment.created_at);
          
          return (
            <Card key={assessment.id} className="bg-teal-50 border-teal-100 hover:shadow-md transition-all">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-teal-800 text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Assessment #{assessment.id}
                    </CardTitle>
                    <p className="text-sm text-teal-600 mt-1">
                      By Dr. {assessment.doctor.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-teal-800">{time}</p>
                    <p className="text-sm text-teal-600">{date}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="bg-white rounded-md p-3 mb-3">
                  <p className="font-medium text-gray-700 mb-2">Question:</p>
                  <p className="text-gray-800">{assessment.question_text}</p>
                </div>
                
                <div className="bg-white rounded-md p-3">
                  <p className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                    Response:
                    {assessment.response_text ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-orange-500" />
                    )}
                  </p>
                  {assessment.response_text ? (
                    <p className="text-gray-800">{assessment.response_text}</p>
                  ) : (
                    <p className="text-orange-500 italic">Pending response</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentPsychiatristTab;