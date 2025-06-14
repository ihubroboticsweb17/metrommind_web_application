import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Download,
  MessageSquare,
  User,
  FileText,
  Activity,
  CheckCircle,
  XCircle,
  PhoneIncoming,
  Calendar,
  Book,
} from "lucide-react";
import type { ThemeType } from "@/App";
import { useEffect, useRef, useState } from "react";
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
  PatientAssessmentUpdate,
} from "@/models/auth";
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
  patient_id: number;
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
  question_text: string;
  response_text: string;
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
  const [patientPdf, setPatientPdf] = useState<string | null>(null);
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [updateLoading, setUpdateLoading] = useState<number | null>(null);
  const [showAppointments, setShowAppointments] = useState(false);

  // Helper function to safely access patient summary
  const getSafePatientSummary = (chatData: DiagnosisData | null) => {
    if (!chatData?.ai_report) return null;

    // Try different possible paths for patient summary
    return (
      chatData.ai_report.patient_report?.patient_summary ||
      chatData.ai_report.patient_summary ||
      chatData.ai_report.therapist_report?.patient_summary ||
      null
    );
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
        localStorage.setItem("voxPhonNo", data.mobile_number);

        // Assuming the API returns an array and we want the first patient
        const patient = Array.isArray(data) ? data[0] : data;
        setPatientData(patient);

        if (Array.isArray(patient.diagnosis) && patient.diagnosis.length > 0) {
          const lastItem = patient.diagnosis[patient.diagnosis.length - 1];
          setChatData(lastItem);
          setPatientPdf(lastItem.ai_patient_summary_file || "");

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
            setDiagnosisData(patient.diagnosis[patient.diagnosis.length - 1]);
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

        if (response.status === "ok" && response.data) {
          setAssessmentData(response.data);
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

  const handleEditStart = (item: AssessmentQuestion) => {
    // Only allow editing if response_text is null or empty
    if (!item.response_text || item.response_text.trim() === "") {
      setEditingId(item.id);
      setEditValue(item.response_text || "");
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleEditSave = async (id: number) => {
    if (!editValue.trim()) return;

    setUpdateLoading(id);
    try {
      await PatientAssessmentUpdate(id, editValue.trim());

      // Update local state
      setAssessmentData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, response_text: editValue.trim() } : item
        )
      );

      setEditingId(null);
      setEditValue("");
    } catch (error) {
      console.error("Error updating assessment:", error);
    } finally {
      setUpdateLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "true"
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
      : "bg-amber-50 text-amber-700 border border-amber-200";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
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
  const isPreliminary = chatData?.is_preliminary;

  const handleAppointmentCardClick = () => {
    setShowAppointments(true);
  };

  return (
    <div className="p-6 bg-gray-50/50">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Patient ID</p>
              <p className="text-2xl font-bold">{patientData.patient_id}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-full">
              <User className="h-5 w-5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Assessments</p>
              <p className="text-2xl font-bold">{assessmentData.length}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Book className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        
        <Card
          className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${
            patientData.diagnosis?.some(
              (d: DiagnosisData) => d.ai_patient_summary_file
            )
              ? "cursor-pointer hover:shadow-md transition-shadow" // Add hover effects for clickable
              : ""
          }`}
          onClick={() => {
            if (
              patientData.diagnosis?.some(
                (d: DiagnosisData) => d.ai_patient_summary_file
              )
            ) {
              handleOpenPatientSummary();
            }
          }}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Available Reports</p>
              {patientData.diagnosis?.some(
                (d: DiagnosisData) => d.ai_patient_summary_file
              ) ? (
                <p className="text-xl font-bold text-blue-600">View Summary</p> // Changed text to indicate what opens
              ) : (
                <p className="text-2xl font-bold text-gray-400">
                  Not Available
                </p>
              )}
            </div>
            <div
              className={`p-3 rounded-full ${
                patientData.diagnosis?.some(
                  (d: DiagnosisData) => d.ai_patient_summary_file
                )
                  ? "bg-blue-50"
                  : "bg-gray-100"
              }`}
            >
              {patientData.diagnosis?.some(
                (d: DiagnosisData) => d.ai_patient_summary_file
              ) ? (
                <FileText className="h-5 w-5 text-blue-600" />
              ) : (
                <FileText className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2">
          {/* Patient Profile Card */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 border-4 border-white shadow-sm">
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xl font-bold">
                    {patientData.patient_name ? (
                      patientData.patient_name.charAt(0).toUpperCase()
                    ) : (
                      <User />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {patientData.patient_name || email || "Unknown Patient"}
                      </h2>
                      <p className="text-gray-600">
                        <span className="font-medium">{patientData.age}</span>{" "}
                        years •
                        <span className="font-medium ml-1">
                          {patientData.gender || "N/A"}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="flex gap-2">
                        {isChatEnabled === "true" && (
                          <Button
                            onClick={handleChatbotOpen}
                            size="sm"
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-sm"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Metro Mind AI
                          </Button>
                        )}
                        <DoctorCallList />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium text-gray-800">
                    {patientData.email}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Mobile</p>
                  <p className="font-medium text-gray-800">
                    {patientData.mobile_number || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Education</p>
                  <p className="font-medium text-gray-800">
                    {patientData.education || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="font-medium text-gray-800">
                    {patientData.address || "N/A"}
                  </p>
                </div>
              </div>

             
            </CardContent>
          </Card>

          {/* Appointments Section */}
          <div className="mb-6">
            <PatientAppointments theme="green" />
          </div>

          {/* Medicine Tab */}
          <MedicineTab theme={theme} />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Assessment Questions Card */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <CardHeader className="p-4 border-b border-gray-100">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-emerald-600" />
                Assessment Questions
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {assessmentLoading ? (
                <div className="flex justify-center items-center  p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-4 px-6">
                  {error}
                </div>
              ) : assessmentData.length > 0 ? (
                <div className="max-h-[200px] overflow-y-auto divide-y divide-gray-100">
                  {assessmentData.map((item, index) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50">
                      <div className="space-y-2">
                        <p className="font-medium text-gray-800 text-sm">
                          Q{index + 1}: {item.question_text}
                        </p>

                        {editingId === item.id ? (
                          // Edit mode
                          <div className="space-y-2">
                            <textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-full p-2 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              rows={3}
                              placeholder="Enter your answer..."
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditSave(item.id)}
                                disabled={
                                  updateLoading === item.id || !editValue.trim()
                                }
                                className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                              >
                                {updateLoading === item.id ? (
                                  <>
                                    <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                                    Saving...
                                  </>
                                ) : (
                                  "Save"
                                )}
                              </button>
                              <button
                                onClick={handleEditCancel}
                                disabled={updateLoading === item.id}
                                className="px-3 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View mode
                          <div className="flex justify-between items-start gap-2">
                            {item.response_text &&
                            item.response_text.trim() !== "" ? (
                              // Has answer - show answer only
                              <p className="text-gray-600 text-sm bg-gray-50 rounded-lg p-2 flex-1">
                                {item.response_text}
                              </p>
                            ) : (
                              // No answer - show placeholder and edit button
                              <>
                                <p className="text-gray-400 text-sm bg-gray-50 rounded-lg p-2 flex-1 italic">
                                  No answer provided yet
                                </p>
                                <button
                                  onClick={() => handleEditStart(item)}
                                  className="px-2 py-1 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                                  title="Add answer"
                                >
                                  Answer
                                </button>
                              </>
                            )}
                          </div>
                        )}

                        <p className="text-xs text-gray-400">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8 px-6">
                  No assessment questions available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Diagnosis Information */}
          {diagnosisData && (
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <CardHeader className="p-4 border-b border-gray-100">
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-emerald-600" />
                  Diagnosis Information
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Created</p>
                    <p className="font-medium text-sm">
                      {new Date(diagnosisData.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <p
                      className={`font-medium text-sm ${
                        diagnosisData.is_approved === "true"
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    >
                      {diagnosisData.is_approved === "true"
                        ? "Approved"
                        : "Pending Review"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Type</p>
                    <p className="font-medium text-sm">
                      {diagnosisData.is_preliminary === "true"
                        ? "Preliminary"
                        : "Final"}
                    </p>
                  </div>
                  {diagnosisData.ai_report?.therapist_report?.Severity && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Severity</p>
                      <p
                        className={`font-medium text-sm ${
                          diagnosisData.ai_report.therapist_report.Severity ===
                          "critical"
                            ? "text-red-600"
                            : diagnosisData.ai_report.therapist_report
                                .Severity === "high"
                            ? "text-orange-600"
                            : "text-amber-600"
                        }`}
                      >
                        {diagnosisData.ai_report.therapist_report.Severity}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Enquiry Information */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <CardHeader className="p-4 border-b border-gray-100">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                <PhoneIncoming className="w-5 h-5 mr-2 text-emerald-600" />
                Enquiry Information
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Created Date</p>
                  <p className="font-medium text-sm">
                    {diagnosisData
                      ? new Date(diagnosisData.created_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Assigned At</p>
                  <p className="font-medium text-sm">
                    {patientData.assigned_at
                      ? new Date(patientData.assigned_at).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 sm:col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Patient ID</p>
                  <p className="font-medium text-sm">
                    {patientData.patient_id}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PDF Dialogs */}
      <Dialog open={fullReportDialog} onOpenChange={setFullReportDialog}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] p-0 rounded-xl overflow-hidden">
          <DialogHeader className="p-4 border-b border-gray-100">
            <DialogTitle className="text-center text-emerald-800 text-xl">
              Complete AI Assessment Report
            </DialogTitle>
          </DialogHeader>
          <div className="h-[75vh] overflow-auto bg-white">
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                title="AI Report PDF"
                width="100%"
                height="100%"
                className="border-0"
              />
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between items-center p-4 border-t border-gray-100">
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
              className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            <Button
              onClick={() => setFullReportDialog(false)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Patient Summary Dialog */}
      <Dialog open={patientReportDialog} onOpenChange={setPatientReportDialog}>
        <DialogContent className=" sm:max-w-5xl max-h-[90vh] p-0 rounded-xl overflow-hidden">
          <DialogHeader className="p-4 border-b border-gray-100">
            <DialogTitle className="text-center text-blue-800 text-xl">
              Patient Summary Report
            </DialogTitle>
          </DialogHeader>
          <div className="h-[75vh] overflow-auto bg-white">
            {patientPdf ? (
              <iframe
                src={patientPdf}
                title="Patient Summary PDF"
                width="100%"
                height="100%"
                className="border-0"
              />
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                No patient summary available
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between items-center p-4 border-t border-gray-100">
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
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Appointments Dialog */}
      <Dialog open={showAppointments} onOpenChange={setShowAppointments}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Your Appointments</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <PatientAppointments theme="green" />
          </div>
          <DialogFooter>
            <Button
              onClick={() => setShowAppointments(false)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDataTab;