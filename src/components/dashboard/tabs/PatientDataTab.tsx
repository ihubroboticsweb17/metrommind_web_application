
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Download,
  MessageSquare,
  User,
  FileText,
  Eye,
  Activity,
  CheckCircle,
  XCircle,
  PhoneIncoming,
} from "lucide-react";
import type { ThemeType } from "@/App";
import { useEffect, useRef, useState } from "react";
import ActivityList from "../ActivityList";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import DoctorCallList from "./DoctorCallList";
import { useToast } from "@/hooks/use-toast";
import {
  patientDetails,
  PdfSowInPatientDashboard,
  PatientAssessmentList,
} from "@/models/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientAppointments from "./PatientAppointments";
import MedicineTab from "./MedicineTab";

interface PatientDataTabProps {
  theme?: ThemeType;
}

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
  patient_id: number; // Changed from string to number
  doctor_name: string;
  doctor_role: string;
  assigned_at: string;
  verified: string;
  chat_enabled: string;
  diagnosis: DiagnosisData[];
  is_approved: string;
}

interface DiagnosisData {
  id: number;
  user: number;
  user_email: string;
  user_name: string;
  user_role: string;
  chat_session_id: string;
  created_at: string;
  ai_report: any;
  is_preliminary: string;
  ai_summary_file: string;
  is_approved: string;
  ai_report_url: string | null;
  ai_patient_summary_file: string;
}

interface AssessmentQuestion {
  id: number;
  question: string;
  answer: string;
  created_at: string;
}

interface AssessmentResponse {
  status: string;
  data: AssessmentQuestion[];
}

const PatientDataTab = ({ theme = "green" }: PatientDataTabProps) => {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [fullReportDialog, setFullReportDialog] = useState(false);
  const [patientReportDialog, setPatientReportDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [patientPdf,setPatientPdf]= useState<string | null>(null);
  const [patientSummaryUrl, setPatientSummaryUrl] = useState<string | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [chatData, setChatData] = useState<DiagnosisData | null>(null);
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(
    null
  );
  const [assessmentData, setAssessmentData] = useState<AssessmentQuestion[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [assessmentLoading, setAssessmentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  // Helper function to safely access patient summary
  const getSafePatientSummary = (chatData: DiagnosisData | null) => {
    if (!chatData?.ai_report) return null;
    
    // Try different possible paths for patient summary
    return chatData.ai_report.patient_report?.patient_summary ||
           chatData.ai_report.patient_summary ||
           chatData.ai_report.therapist_report?.patient_summary ||
           null;
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");
    const Id = localStorage.getItem("user_id");

    if (storedEmail && storedRole) {
      setEmail(storedEmail);
      setRole(storedRole);
    }
    if (Id) {
      setUserId(Id);
    }
  }, []);

  useEffect(() => {
    const fetchPatients = async (userId: number) => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const data = await patientDetails(userId);
        console.log("patientDetails:", data);

        // Assuming the API returns an array and we want the first patient
        const patient = Array.isArray(data) ? data[0] : data;
        console.log("Full deal data patient", patient);
        setPatientData(patient);

        if (Array.isArray(patient.diagnosis) && patient.diagnosis.length > 0) {
          const lastItem = patient.diagnosis[patient.diagnosis.length - 1];
          console.log("lastItem**##", lastItem.ai_patient_summary_file);
          setChatData(lastItem);
          setPatientPdf(lastItem.ai_patient_summary_file || "")
          
          // Safe access to patient summary
          const patientSummary = getSafePatientSummary(lastItem);
          setSummary(patientSummary);
        } else if (data) {
          setChatData(data); // fallback
          const patientSummary = getSafePatientSummary(data);
          setSummary(patientSummary);
        }

        // Find the most relevant diagnosis data
        if (patient?.diagnosis && patient.diagnosis.length > 0) {
          const diagnosisWithSummary = patient.diagnosis.find(
            (d: DiagnosisData) => d.ai_summary_file
          );
          const diagnosisWithPatientSummary = patient.diagnosis.find(
            (d: DiagnosisData) => d.ai_patient_summary_file
          );

          if (diagnosisWithSummary && diagnosisWithPatientSummary) {
            setDiagnosisData({
              ...diagnosisWithSummary,
              ai_patient_summary_file:
                diagnosisWithPatientSummary.ai_patient_summary_file,
            });
          } else if (diagnosisWithSummary) {
            setDiagnosisData(diagnosisWithSummary);
          } else if (diagnosisWithPatientSummary) {
            setDiagnosisData(diagnosisWithPatientSummary);
          } else {
            setDiagnosisData(patient.diagnosis[patient.diagnosis.length-1]);
          }
        }
      } catch (error) {
        console.error("Error fetching patient list:", error);
        toast({
          title: "Error",
          description: "Failed to fetch patient details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients(Number(userId));
  }, [userId]);

  // Fetch assessment data
  useEffect(() => {
    const fetchAssessments = async () => {
      if (!patientData?.id) return;

      setAssessmentLoading(true);
      try {
        const response: AssessmentResponse = await PatientAssessmentList(
          Number(patientData?.id)
        );
        console.log("assessment data:", response);

        if (response.status === "ok" && response.data) {
          setAssessmentData(response.data);
          console.log("AAA",response.data)
        } else {
          setError("Failed to fetch assessment data");
        }
      } catch (error) {
        console.error("Error fetching assessment list:", error);
        setError("Error loading assessments");
      } finally {
        setAssessmentLoading(false);
      }
    };

    fetchAssessments();
  }, [patientData?.id]);

  const handleChatbotOpen = () => {
    navigate("/chatbot");
  };

  const handleCallOpen = () => {
    setIsSheetOpen(true);
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

  const getButtonClass = () => {
    switch (theme) {
      case "royal":
        return "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl";
      case "ocean":
        return "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl";
      case "emerald":
        return "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl";
      case "sunset":
        return "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl";
      case "pink":
        return "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl";
      case "green":
        return "bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg";
    }
  };

  const handleOpenPdfDialog = async () => {
    try {
      if (!userId) {
        toast({
          title: "Error",
          description: "User ID not found",
          variant: "destructive",
        });
        return;
      }

      const formData = { user_id: userId };
      const pdfBlob = await PdfSowInPatientDashboard(formData);
      const blobUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(blobUrl);
      setFullReportDialog(true);
    } catch (error) {
      console.error("Failed to load PDF:", error);
      toast({
        title: "Error",
        description: "Failed to load AI Report PDF",
        variant: "destructive",
      });
    }
  };

  const handleOpenPatientSummary = () => {
    const diagWithPatientSummary = patientData?.diagnosis?.find(
      (d: DiagnosisData) => d.ai_patient_summary_file
    );

    if (diagWithPatientSummary?.ai_patient_summary_file) {
      setPatientSummaryUrl(diagWithPatientSummary.ai_patient_summary_file);
      setPatientReportDialog(true);
    } else {
      toast({
        title: "Information",
        description: "No patient summary available",
      });
    }
  };

  const downloadPdf = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-medium border-2 transform transition-all duration-200 hover:scale-105";
    switch (status) {
      case "true":
        return `${baseClasses} bg-green-100 text-green-800 border-green-300 shadow-sm`;
      case "false":
        return `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-300 shadow-sm`;
      default:
        return `${baseClasses} bg-red-100 text-red-800 border-red-300 shadow-sm`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No patient data available
      </div>
    );
  }

  const getPatientSummary = () => {
    // First try to get from diagnosisData
    if (diagnosisData?.ai_report?.patient_summary) {
      return diagnosisData.ai_report.patient_summary;
    }

    // Then try from chatData
    if (chatData?.ai_report) {
      const summary = getSafePatientSummary(chatData);
      if (summary) return summary;
    }

    // Finally try from patient diagnosis array
    for (const diag of patientData?.diagnosis || []) {
      const summary = getSafePatientSummary(diag);
      if (summary) return summary;
    }

    return "No patient summary available";
  };

  const summaryText = getPatientSummary();
  const isChatEnabled = patientData?.chat_enabled;
  console.log("isChatEnabled@@@@@@@@@@@", isChatEnabled);
  const isPreliminary = chatData?.is_preliminary;
  console.log("isPreliminary..........", isPreliminary);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="flex-1">
        <Card
          className={`overflow-hidden rounded-xl ${getThemeClasses()} transition-all duration-300`}
        >
          <div className="relative">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                theme === "green"
                  ? "from-teal-500/10 to-green-500/10"
                  : "from-gray-500/10 to-gray-600/10"
              }`}
            ></div>
            <div className="relative p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarFallback
                    className={`text-2xl font-bold ${
                      theme === "green"
                        ? "bg-gradient-to-br from-teal-500 to-teal-800 text-white"
                        : "bg-gradient-to-br from-gray-500 to-gray-600 text-white"
                    }`}
                  >
                    {patientData.patient_name ? (
                      patientData.patient_name.charAt(0).toUpperCase()
                    ) : (
                      <User className="w-10 h-10" />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        {patientData.patient_name || email || "Unknown Patient"}
                      </h2>
                      <p className="text-gray-600 mb-2">
                        <span className="font-semibold">{patientData.age}</span>{" "}
                        years •
                        <span className="font-semibold ml-1">
                          {patientData.gender || "N/A"}
                        </span>
                      </p>
                      {/* <p className="text-sm text-gray-500">
                        <span className="font-medium">Doctor:</span>{" "}
                        {patientData.doctor_name || "Not assigned"}
                      </p> */}
                    </div>

                    <div className="text-right space-y-3">
                      <span
                        className={getStatusBadge(patientData.chat_enabled)}
                      >
                        {isChatEnabled === "true" ? (
                          <>
                            <CheckCircle className="w-4 h-4 inline mr-1" /> Chat
                            Enabled
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 inline mr-1" /> Chat
                            Disabled
                          </>
                        )}
                      </span>

                      <div className="flex space-x-3">
                        {isChatEnabled  && (
                          <Button
                            onClick={handleChatbotOpen}
                            className={`${getButtonClass()} transition-all duration-300 transform hover:scale-105`}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Metro Mind AI
                          </Button>
                        )}
                        <DoctorCallList />
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-500">Email</p>
                      <p className="font-semibold text-gray-800">
                        {patientData.email}
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-500">Mobile</p>
                      <p className="font-semibold text-gray-800">
                        {patientData.mobile_number || "N/A"}
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-500">Education</p>
                      <p className="font-semibold text-gray-800">
                        {patientData.education || "N/A"}
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-500">Address</p>
                      <p className="font-semibold text-gray-800">
                        {patientData.address || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Section */}
          
          {/* {isPreliminary === "true" && ( */}
             {isPreliminary && ( 
            <div className="border-t border-gray-200 bg-white/30 p-6">
              <h4 className="text-lg font-bold mb-4 text-gray-800">
                Available Reports
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {patientData.diagnosis?.some(
                  (d: DiagnosisData) => d.ai_patient_summary_file
                ) && (
                  <Button
                    onClick={handleOpenPatientSummary}
                    variant="outline"
                    className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 transform hover:scale-105"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Patient Summary
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Patient Summary Section */}
                    {isPreliminary && (
          // {isPreliminary === "true" && (
            <div className="border-t border-gray-200 bg-blue-50/50 p-6">
              <h4 className="text-lg font-bold mb-3 text-blue-800">
                Patient Summary
              </h4>
              <div className="bg-white/70 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {summaryText}
                </p>
              </div>
              <button
                className="mt-2 text-blue-600 hover:underline"
                onClick={() => setShowModal(true)}
              >
                Show More
              </button>
              {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-xl w-full">
                    <h4 className="text-lg font-bold mb-4">
                      Full Patient Summary
                    </h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {summary || summaryText || "No patient summary available"}
                    </p>
                    <button
                      onClick={() => setShowModal(false)}
                      className="mt-4 text-blue-600 hover:underline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
        <div className="mt-6">
          <MedicineTab theme={theme} />
        </div>
      </div>

      {/* Recent Activity and Assessment Questions Card */}
      <div className="w-full lg:w-96">
        <Card className={`h-fit ${getThemeClasses()}`}>
          <Tabs defaultValue="assessment" className="w-full">
            <TabsList className="grid w-full grid-cols-1 rounded-t-xl">
              
              {/* <TabsTrigger value="activity" className="rounded-tl-xl">
                Recent Activity
              </TabsTrigger> */}
                   <TabsTrigger value="assessment" className="rounded-tr-xl">
                Assessment Q&A
              </TabsTrigger>
         
            </TabsList>
{/* 
            <TabsContent value="activity" className="p-0">
              <CardContent className="p-6">
                <ActivityList theme={theme} />
              </CardContent>
            </TabsContent> */}

            <TabsContent value="assessment" className="p-0">
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-4 text-gray-800">
                  Assessment Questions
                </CardTitle>
                {assessmentLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div>
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-center py-4">{error}</div>
                ) : assessmentData.length > 0 ? (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {assessmentData.map((item, index) => (
                      <div
                        key={item.id}
                        className="bg-white/70 rounded-lg p-4 shadow-sm border border-gray-200"
                      >
                        <div className="space-y-2">
                          <p className="font-semibold text-gray-700 text-sm">
                            Q{index + 1}: {item.question}
                          </p>
                          <p className="text-gray-600 text-sm bg-gray-50 rounded p-2">
                            {item.answer}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    No assessment questions available
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Diagnosis Information */}
        <div className="w-full lg:w-96 mt-6">
          <Card className={`h-fit ${getThemeClasses()}`}>
            {diagnosisData && (
              <div className="border-t border-gray-200 bg-white/30 p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-teal-600" />
                  Diagnosis Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-500">Created</p>
                    <p className="font-semibold">
                      {new Date(diagnosisData.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-500">Status</p>
                    <p
                      className={`font-semibold ${
                        diagnosisData.is_approved === "true"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {diagnosisData.is_approved === "true"
                        ? "Approved"
                        : "Pending Review"}
                    </p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-500">Type</p>
                    <p className="font-semibold">
                      {diagnosisData.is_preliminary === "true" ? "Preliminary" : "Final"}
                    </p>
                  </div>
                  {diagnosisData.ai_report?.therapist_report?.Severity && (
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-gray-500">Severity</p>
                      <p
                        className={`font-semibold ${
                          diagnosisData.ai_report.therapist_report.Severity ===
                          "critical"
                            ? "text-red-600"
                            : diagnosisData.ai_report.therapist_report
                                .Severity === "high"
                            ? "text-orange-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {diagnosisData.ai_report.therapist_report.Severity}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Enquiry Details */}
        <div className="w-full lg:w-96 mt-6">
          <Card className={`h-fit ${getThemeClasses()}`}>
            <div className="border-t border-gray-200 bg-gray-50/50 p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <PhoneIncoming className="w-5 h-5 mr-2 text-teal-600" />
                Enquiry Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-gray-500">Created Date</p>
                  <p className="font-semibold">
                    {diagnosisData
                      ? new Date(diagnosisData.created_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-gray-500">Assigned At</p>
                  <p className="font-semibold">
                    {patientData.assigned_at
                      ? new Date(patientData.assigned_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-gray-500">Patient ID</p>
                  <p className="font-semibold">{patientData.patient_id}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <PatientAppointments theme={theme} />
        </div>
        <Dialog open={fullReportDialog} onOpenChange={setFullReportDialog}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800 text-xl">
              Complete AI Assessment Report
            </DialogTitle>
          </DialogHeader>
          <div className="h-[75vh] overflow-auto border rounded-lg bg-white shadow-inner">
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                title="AI Report PDF"
                width="100%"
                height="100%"
                className="border-0 rounded-lg"
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => {
                if (pdfUrl) {
                  downloadPdf(
                    pdfUrl,
                    `ai-report-${patientData.patient_id || "unknown"}.pdf`
                  );
                }
              }}
              className="text-teal-600 border-teal-200 hover:bg-teal-50"
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            <Button
              onClick={() => setFullReportDialog(false)}
              className={getButtonClass()}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Patient Summary Dialog */}
      <Dialog open={patientReportDialog} onOpenChange={setPatientReportDialog}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-center text-blue-800 text-xl">
              Patient Summary Report
            </DialogTitle>
          </DialogHeader>
          <div className="h-[75vh] overflow-auto border rounded-lg bg-white shadow-inner">
            {patientPdf ? (
              <iframe
                src={patientPdf}
                title="Patient Summary PDF"
                width="100%"
                height="100%"
                className="border-0 rounded-lg"
              />
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                No patient summary available
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => {
                if (patientPdf) {
                  downloadPdf(
                    patientPdf,
                    `patient-summary-${patientData.patient_id || "unknown"}.pdf`
                  );
                }
              }}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            <Button
              onClick={() => setPatientReportDialog(false)}
              className={getButtonClass()}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );}
  export default PatientDataTab;