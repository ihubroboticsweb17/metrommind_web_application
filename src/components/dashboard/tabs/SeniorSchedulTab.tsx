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
// }
// const SeniorSchedulTab = () => {
//   const [patientData, setPatientData] = useState<Patient[]>([]);
//   const [loading, setLoading] = useState(true);
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
//   return (
//     <div className="grid gap-4 p-2">
//       <div className="space-y-3">
//         <div className="font-medium text-teal-800 flex items-center gap-2">
//           <Calendar className="h-4 w-4 text-teal-500" />
//           Today
//         </div>
//         <div className="space-y-3">
//         {patientData.map((item,i) => (
//           <div className="p-4 rounded-md bg-teal-50 border border-teal-100 hover:shadow-md transition-all">
           
//               <div className="flex justify-between" key={item.id}>
//                 <div>
//                   <p className="font-medium text-teal-800">{item.patient_name}</p>
//                   <p className="text-sm text-teal-600">Initial Assessment</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium text-teal-800">2:00 PM - 3:00 PM</p>
//                   <p className="text-sm text-teal-600">Virtual</p>
//                 </div>
//               </div>
         
//           </div>   ))}
//           {/* More schedule items would go here */}
//           <Skeleton className="h-20 w-full bg-teal-50" />
//           <Skeleton className="h-20 w-full bg-teal-50" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeniorSchedulTab;
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ChevronDown, ChevronUp, Clock, Search, X } from "lucide-react";
import { DoctorObservationPatient } from "@/models/auth";
import { format, parse, parseISO } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  assigned_at:string;
  observations:string;
  doctor_name:string;


}

interface PatientReport {
  behavioral_symptoms: string;
  cognitive_symptoms: string;
  emotional_symptoms: string;
  patient_summary: string;
  physical_symptoms: string;
}

interface TherapistReport {
  data_sufficiency_check: string;
  disease_diagnosed: string;
  family_history: string;
  medical_history: string;
  mood_cognition_thought: string;
  patient_goals_expectations: string;
  presenting_complaints: string;
  psychiatric_history: string;
  severity: number;
  substance_use: string;
  suicidality_risk: string;
  suicidality_severity_score: number;
  supporting_rag_line: string;
}

interface AIResponse {
  patient_report: PatientReport;
  session_id: string | null;
  therapist_report: TherapistReport;
}

interface PatientData extends Patient {
  ai_summary?: AIResponse;
}

const SeniorSchedulTab = () => {
  const [patientData, setPatientData] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
  
  const itemsPerPage = 5;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

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
 // Format date and time from ISO string
  const formatDateTime = (isoString: string) => {
    try {
      const date = parseISO(isoString);
      return {
        date: format(date, "MMM dd, yyyy"),parseISO
        // time: format(date, "h:mm a"),
      };
    } catch (error) {
      console.error("Error parsing date:", error);
      return {
        date: "Invalid date",
        time: "Invalid time"
      };
    }
  };
  const togglePatientExpansion = (patientId: string) => {
    if (expandedPatient === patientId) {
      setExpandedPatient(null);
    } else {
      setExpandedPatient(patientId);
    }
  };

  // Filter patients based on search query
  const filteredPatients = patientData.filter(patient => 
    patient.patient_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  // Render the severity indicator
  const SeverityIndicator = ({ level }: { level: number }) => {
    const getColor = () => {
      if (level <= 1) return "bg-green-100";
       if (level <= 2) return "bg-green-500";
        if (level <= 3) return "bg-yellow-500";
         if (level <= 4) return "bg-orange-500";
      if (level <= 5) return "bg-red-500";
      return "bg-red-500";
    };
    
    return (
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${getColor()}`}></div>
        <span className="text-sm font-medium">Severity: {level}/5</span>
      </div>
    );
  };

  return (
    <div className="grid gap-4 p-2">
       <Card className="shadow-sm border-teal-100">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100 p-4 md:p-6">
          <div className={`flex ${isMobile ? "flex-col gap-3" : "justify-between items-center"}`}>
            <div>
              <CardTitle className="text-teal-800 text-lg">
                Patient List
              </CardTitle>
              <CardDescription className="text-teal-600">
                {/* Total Patients: {patients.length} */}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
         <CardContent className="pt-4 px-3 md:px-6">
           {/* <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </div>
        <input
          type="text"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 p-2.5"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div> */}
      {/* Search and Add Doctor Header */}
                <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-4">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-500" />
                    <Input
                      type="text"
                      placeholder="Search Shedule..."
                      className="pl-9 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

      <div className="space-y-3">
        <div className="font-medium text-teal-800 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-teal-500" />
          Today
        </div>
        <div className="space-y-3">
          {loading ? (
            <>
              <Skeleton className="h-20 w-full bg-teal-50" />
              <Skeleton className="h-20 w-full bg-teal-50" />
              <Skeleton className="h-20 w-full bg-teal-50" />
            </>
          ) : currentPatients.length > 0 ? (
            currentPatients.map((patient) => (
              <div 
                key={patient.id} 
                className="rounded-md bg-teal-50 border border-teal-100 hover:shadow-md transition-all overflow-hidden"
              >
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => togglePatientExpansion(patient.id)}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-teal-800">{patient.patient_name}</p>
                        {patient.ai_summary?.therapist_report.suicidality_risk?.includes("Yes") && (
                          <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
                            High Risk
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-teal-600">Initial Assessment: • {patient.age}y • {patient.gender}</p>
                    <p className="text-sm text-teal-600">Observation:
                      <strong>{patient.observations}</strong></p>
                    </div>   
                    <div className="text-right flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-teal-800">
                     
                        {patient.assigned_at && (
                        <p className="text-xs text-teal-600 mt-1">
                          {formatDateTime(patient.assigned_at).date}
                        </p>
                      )}
                        </p>
                        {expandedPatient === patient.id ? (
                          <ChevronUp className="h-4 w-4 text-teal-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-teal-500" />
                        )}
                      </div>
                      <div className="flex items-center">
                        {/* <Clock className="h-3 w-3 text-teal-600 mr-1" /> */}
                        <p className="text-sm text-teal-600">   {formatDateTime(patient.assigned_at).time}
                                 {/* {patient.assigned_at && (() => {
                          const { time } = formatDateTime(patient.assigned_at);
                          return <p className="font-medium text-teal-800">{time}</p>;
                        })()} */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {expandedPatient === patient.id && patient.ai_summary && (
                  <div className="border-t border-teal-100 p-4 bg-white">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-teal-800 mb-2">Patient Summary</h3>
                        <p className="text-sm text-gray-700">
                          {patient.ai_summary.patient_report.patient_summary}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-teal-50 p-3 rounded-md">
                          <h4 className="font-medium text-teal-800 mb-2">AI Observations</h4>
                          <div className="space-y-2">
                            <SeverityIndicator level={patient.ai_summary.therapist_report.severity} />
                            
                            {patient.ai_summary.patient_report.physical_symptoms !== "insufficient information" && (
                              <div>
                                <span className="text-xs font-medium text-teal-700">Physical Symptoms:</span>
                                <p className="text-sm">{patient.ai_summary.patient_report.physical_symptoms}</p>
                              </div>
                            )}
                            
                            {patient.ai_summary.patient_report.emotional_symptoms !== "insufficient information" && (
                              <div>
                                <span className="text-xs font-medium text-teal-700">Emotional Symptoms:</span>
                                <p className="text-sm">{patient.ai_summary.patient_report.emotional_symptoms}</p>
                              </div>
                            )}
                            
                            {patient.ai_summary.patient_report.cognitive_symptoms !== "insufficient information" && (
                              <div>
                                <span className="text-xs font-medium text-teal-700">Cognitive Symptoms:</span>
                                <p className="text-sm">{patient.ai_summary.patient_report.cognitive_symptoms}</p>
                              </div>
                            )}
                            
                            {patient.ai_summary.patient_report.behavioral_symptoms !== "insufficient information" && (
                              <div>
                                <span className="text-xs font-medium text-teal-700">Behavioral Symptoms:</span>
                                <p className="text-sm">{patient.ai_summary.patient_report.behavioral_symptoms}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="bg-teal-50 p-3 rounded-md">
                          <h4 className="font-medium text-teal-800 mb-2">Therapist Report</h4>
                          <div className="space-y-2">
                            {patient.ai_summary.therapist_report.disease_diagnosed && (
                              <div>
                                <span className="text-xs font-medium text-teal-700">Diagnosis:</span>
                                <p className="text-sm">{patient.ai_summary.therapist_report.disease_diagnosed}</p>
                              </div>
                            )}
                            
                            {patient.ai_summary.therapist_report.presenting_complaints && (
                              <div>
                                <span className="text-xs font-medium text-teal-700">Presenting Complaints:</span>
                                <p className="text-sm">{patient.ai_summary.therapist_report.presenting_complaints}</p>
                              </div>
                            )}
                            
                            {patient.ai_summary.therapist_report.suicidality_risk && (
                              <div>
                                <span className="text-xs font-medium text-teal-700">Suicide Risk:</span>
                                <p className="text-sm font-medium text-red-600">
                                  {patient.ai_summary.therapist_report.suicidality_risk}
                                </p>
                              </div>
                            )}
                            
                            {patient.ai_summary.therapist_report.supporting_rag_line && (
                              <div>
                                <span className="text-xs font-medium text-teal-700">Supporting Evidence:</span>
                                <p className="text-sm italic">{patient.ai_summary.therapist_report.supporting_rag_line}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center p-4 bg-teal-50 rounded-md">
              No patients found matching your search criteria.
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-teal-100 rounded-md disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-teal-100 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
         </CardContent>
      {/* Search bar */}
     
      </Card>
    </div>
  );
};

export default SeniorSchedulTab;