import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { patientlist } from "@/models/auth";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PatientReport {
  emotional_support_message: string;
  patient_summary: string;
  therapy_next_steps: string;
  wellness_recommendations: string;
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
  suicidality_severity_score: string;
  supporting_rag_line: string;
}

interface AIReport {
  patient_report: PatientReport;
  session_id: string;
  therapist_report: TherapistReport;
}

interface Diagnosis {
  ai_report: AIReport;
  ai_report_url: string | null;
  ai_summary_file: string;
  chat_history: any[];
  chat_session_id: string;
  created_at: string;
  id: number;
  is_approved: boolean;
  is_preliminary: boolean;
  user: number;
  user_email: string;
  user_name: string;
  user_role: string;
}

interface UserData {
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
  diagnosis: Diagnosis[];
}

const PatientListTab = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [patients, setPatients] = useState<UserData[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await patientlist();
        console.log("@@@@@@@data2", data);
        setPatients(data);
      } catch (err) {
        setError("Failed to load patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Function to get status based on severity
  const getStatusFromSeverity = (severity: number): string => {
    if (severity >= 5) return "Critical";
    if (severity >= 4) return "Severe";
    if (severity >= 3) return "High";
    if (severity >= 2) return "Mild";
    if (severity >= 1) return "Low";

    return "Unknown";
  };

  // Function to get status color classes for badges
  const getStatusColorClasses = (status: string): string => {
    switch (status) {
      case "Critical":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "Severe":
        return "bg-orange-500 hover:bg-orange-600 text-white";
      case "High":
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
      case "Mild":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "Low":
        return "bg-green-500 hover:bg-green-500 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  // Helper function to get severity from diagnosis
  const getSeverity = (diagnosis: Diagnosis[]): number => {
    if (!diagnosis || diagnosis.length === 0) return 0;
    return diagnosis[0]?.ai_report?.therapist_report?.severity || 0;
  };

  // Helper function to get status based on severity
  const getPatientStatus = (diagnosis: Diagnosis[]): string => {
    const severity = getSeverity(diagnosis);
    return getStatusFromSeverity(severity);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-teal-600">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }
const filteredData = patients.filter((medicine) =>
  medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const totalItems = filteredData.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

const paginatedData = filteredData.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
  return (
    <div className="rounded-md">
      <Card className="shadow-sm border-teal-100">
        <CardHeader className="bg-teal-50 border-b border-teal-100">
          <div
            className={`flex ${
              isMobile ? "flex-col gap-3" : "justify-between items-center"
            }`}
          >
            <div>
              <CardTitle className="text-teal-800 flex items-center gap-2">
                Patient List
              </CardTitle>
              <CardDescription className="text-teal-600">
                {/* Total doctors: {doctors.length} */}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 px-3 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-4 m-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-500" />
              <Input
                type="text"
                placeholder="Search Patient..."
                className="pl-9  border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
     
          <div className="grid grid-cols-6 bg-teal-50 p-4 text-sm font-medium text-teal-800 mb-4">
            <div>Sl.No</div>
            <div>Name</div>
            <div>Age</div>
            <div>Email</div>
            <div>Severity</div>
            <div className="text-center">Action</div>
          </div>
                {/* Loading state */}
          {loading && (
            <div className="p-8 text-center text-teal-600 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p>Loading doctors...</p>
            </div>
          )}
            {/* Error state */}
                    {error && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-md flex items-center justify-center">
                        <p>{error}</p>
                       
                      </div>
                    )}

          <div className="divide-y dark:divide-metro-dark-border/50 divide-teal-100">
            {paginatedData.map((patient, index) => {
              const status = getPatientStatus(patient.diagnosis);
              const severity = getSeverity(patient.diagnosis);

              return (
                <div
                  key={patient.id}
                  className="grid grid-cols-6 p-4 text-sm items-center hover:bg-teal-50/50 transition-colors"
                >
                  <div className="font-medium text-teal-800">{index + 1}</div>
                  <div className="text-teal-700">{patient.name}</div>
                  <div className="text-teal-700">{patient.age || "N/A"}</div>
                  <div className="text-teal-700">{patient.email}</div>
                  <div>
                    <Badge
                      className={`${getStatusColorClasses(status)} shadow-sm`}
                    >
                      {status} ({severity})
                    </Badge>
                  </div>

                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setIsDialogOpen(true);
                      }}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              );
            })}
        <div className="flex justify-center m-4 gap-2">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-3 py-1 bg-teal-100 rounded-md disabled:opacity-50"
  >
    Prev
  </button>
  <span className="px-3 py-1">{`Page ${currentPage} of ${totalPages}`}</span>
  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
     className="px-3 py-1 bg-teal-100 rounded-md disabled:opacity-50"
  >
    Next
  </button>
</div> 
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
                  <DialogTitle className="text-center text-teal-800 text-lg font-semibold">
                    Patient Profile
                  </DialogTitle>
                </DialogHeader>
                {selectedPatient && (
                  <div className="p-6 space-y-6">
                    {/* Basic Information Section */}
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-teal-800 mb-3">
                        Basic Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium text-teal-700">
                            Name:
                          </span>
                          <p className="text-gray-700">
                            {selectedPatient.name}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-teal-700">
                            Age:
                          </span>
                          <p className="text-gray-700">
                            {selectedPatient.age || "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-teal-700">
                            Gender:
                          </span>
                          <p className="text-gray-700">
                            {selectedPatient.gender || "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-teal-700">
                            Email:
                          </span>
                          <p className="text-gray-700">
                            {selectedPatient.email}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-teal-700">
                            Mobile:
                          </span>
                          <p className="text-gray-700">
                            {selectedPatient.mobile_number || "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-teal-700">
                            Status:
                          </span>
                          <div className="mt-1">
                            <Badge
                              className={`${getStatusColorClasses(
                                getPatientStatus(selectedPatient.diagnosis)
                              )}`}
                            >
                              {getPatientStatus(selectedPatient.diagnosis)}{" "}
                              (Severity:{" "}
                              {getSeverity(selectedPatient.diagnosis)})
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Diagnosis Information */}
                    {selectedPatient.diagnosis &&
                      selectedPatient.diagnosis.length > 0 && (
                        <div className="bg-red-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-red-800 mb-3">
                            Clinical Diagnosis
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-red-700">
                                Diagnosis:
                              </span>
                              <p className="text-gray-700">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.therapist_report?.disease_diagnosed
                                }
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-red-700">
                                Severity Score:
                              </span>
                              <p className="text-gray-700">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.therapist_report?.severity
                                }
                                /5
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-red-700">
                                Presenting Complaints:
                              </span>
                              <p className="text-gray-700">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.therapist_report?.presenting_complaints
                                }
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-red-700">
                                Mood, Cognition, Thought:
                              </span>
                              <p className="text-gray-700">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.therapist_report?.mood_cognition_thought
                                }
                              </p>
                            </div>
                            {selectedPatient.diagnosis[0]?.ai_report
                              ?.therapist_report?.suicidality_risk !==
                              "N/A - emergency case" && (
                              <div>
                                <span className="font-medium text-red-700">
                                  Suicidality Risk:
                                </span>
                                <p className="text-gray-700">
                                  {
                                    selectedPatient.diagnosis[0]?.ai_report
                                      ?.therapist_report?.suicidality_risk
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Patient Report Section */}
                    {selectedPatient.diagnosis &&
                      selectedPatient.diagnosis.length > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-blue-800 mb-3">
                            Patient Support Information
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <span className="font-medium text-blue-700">
                                Patient Summary:
                              </span>
                              <p className="text-gray-700 mt-1 leading-relaxed">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.patient_report?.patient_summary
                                }
                              </p>
                            </div>

                            <div>
                              <span className="font-medium text-blue-700">
                                Emotional Support Message:
                              </span>
                              <p className="text-gray-700 mt-1 leading-relaxed">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.patient_report?.emotional_support_message
                                }
                              </p>
                            </div>

                            <div>
                              <span className="font-medium text-blue-700">
                                Therapy Next Steps:
                              </span>
                              <p className="text-gray-700 mt-1 leading-relaxed">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.patient_report?.therapy_next_steps
                                }
                              </p>
                            </div>

                            <div>
                              <span className="font-medium text-blue-700">
                                Wellness Recommendations:
                              </span>
                              <p className="text-gray-700 mt-1 leading-relaxed">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.patient_report?.wellness_recommendations
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Medical History */}
                    {selectedPatient.diagnosis &&
                      selectedPatient.diagnosis[0]?.ai_report?.therapist_report
                        ?.medical_history !== "N/A - emergency case" && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-green-800 mb-3">
                            Medical History
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-green-700">
                                Medical History:
                              </span>
                              <p className="text-gray-700">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.therapist_report?.medical_history
                                }
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-green-700">
                                Family History:
                              </span>
                              <p className="text-gray-700">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.therapist_report?.family_history
                                }
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-green-700">
                                Psychiatric History:
                              </span>
                              <p className="text-gray-700">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.therapist_report?.psychiatric_history
                                }
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-green-700">
                                Substance Use:
                              </span>
                              <p className="text-gray-700">
                                {
                                  selectedPatient.diagnosis[0]?.ai_report
                                    ?.therapist_report?.substance_use
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Session Information */}
                    {selectedPatient.diagnosis &&
                      selectedPatient.diagnosis.length > 0 && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-purple-800 mb-3">
                            Session Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <span className="font-medium text-purple-700">
                                Session ID:
                              </span>
                              <p className="text-gray-700 text-sm">
                                {selectedPatient.diagnosis[0]?.chat_session_id}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-purple-700">
                                Date Created:
                              </span>
                              <p className="text-gray-700">
                                {new Date(
                                  selectedPatient.diagnosis[0]?.created_at
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-purple-700">
                                Approved:
                              </span>
                              <p className="text-gray-700">
                                {selectedPatient.diagnosis[0]?.is_approved
                                  ? "Yes"
                                  : "No"}
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-purple-700">
                                Preliminary:
                              </span>
                              <p className="text-gray-700">
                                {selectedPatient.diagnosis[0]?.is_preliminary
                                  ? "Yes"
                                  : "No"}
                              </p>
                            </div>
                          </div>
                          {selectedPatient.diagnosis[0]?.ai_summary_file && (
                            <div className="mt-4">
                              <a
                                href={
                                  selectedPatient.diagnosis[0].ai_summary_file
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors"
                              >
                                Download AI Summary Report
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                    {/* Medical Report Section */}
                    {selectedPatient.medical_report && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          Medical Report
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {selectedPatient.medical_report}
                        </p>
                        {selectedPatient.medical_report_url && (
                          <div className="mt-3">
                            <a
                              href={selectedPatient.medical_report_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            >
                              View Report Document
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientListTab;
