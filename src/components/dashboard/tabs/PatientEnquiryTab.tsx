"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AddOnAiSummry,
  AddOnSecondAiSummry,
  ApproveAiDiagnosisSummary,
  ApproveButton,
  EnquiriesList,
  GeneratButton,
  MakeAppointment,
  RejectButton,
} from "@/models/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowBigLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  EyeIcon,
  Search,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface Diagnosis {
  diagnosis_summary: string;
  chat_history: string;
  created_at: string;
  severity: string;
}

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
  patient_id: number | null | string;
  diagnosis?: {
    id: number;
    ai_report: {
      patient_report: {
        [key: string]: string;
      };
      therapist_report: {
        Severity: number | null;
        Suicidality_Risk: string;
        Presenting_Complaints: string;
        Disease_Diagnosed: string;
      };
    };
  }[];
}

interface Slot {
  id: number;
  from_time: string;
  to_time: string;
  date: string;
  doctor: number;
  status: boolean;
  doctor_details: {
    id: number;
    name: string;
    email: string;
    mobile_number: string;
  };
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
  is_preliminary: boolean;
  ai_summary_file: string;
  is_approved: boolean;
  ai_report_url: string | null;
  ai_patient_summary_file: string;
}

// Interface for tracking patient-specific states
interface PatientState {
  isAddNotSuccss: boolean;
  isApproved: boolean;
  isApprovedSecond: boolean;
  isSecondAssessmentSubmitted: boolean;
  addOnObs: string;
  addOnSecondObs: string;
  therapistNotes: string;
  pdfUrl: string | null;
  secondAssessmentPdfUrl: string;
}

const PatientEnquiryTab = () => {
  const [patients, setPatients] = useState<UserData[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<UserData | null>(null);
  const { toast } = useToast();
  const [assignedDoctor, setAssignedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [generatedStatus, setGeneratedStatus] = useState<{
    [key: number]: boolean;
  }>({});
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [fullReportDialog, setFullReportDialog] = useState(false);
  const [secondReportDialog, setSecondReportDialog] = useState(false);
  const [secondDialog, setSecondDialog] = useState(false);
  const [therapistNotes, setTherapistNotes] = useState("");
  const [addOnObs, setAddOnObs] = useState("");
  const [checkState, setCheckState] = useState(null);
  const [disease, setDisease] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isAddNotSuccss, setIsAddNotSuccss] = useState(false);
  const [isApprovedpatientList, setIsApprovedpatientList] = useState(false);
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(
    null
  );
  const [pdfUrls, setPdfUrls] = useState({});
  const [openSecondDialog, setOpenSecondDialog] = useState(false);
  const [addOnSecondObs, setAddOnSecondObs] = useState("");
  const [summary, setSummary] = useState("");
  const [isSecondAssessmentSubmitted, setIsSecondAssessmentSubmitted] =
    useState(false);
  const [secondAssessmentPdfUrl, setSecondAssessmentPdfUrl] = useState("");
  const [isApprovedSecond, setIsApprovedSecond] = useState(false);

  // New state for tracking patient-specific data
  const [patientStates, setPatientStates] = useState<{
    [key: number]: PatientState;
  }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);
  // Helper function to get patient-specific state
  const getPatientState = (patientId: number): PatientState => {
    return (
      patientStates[patientId] || {
        isAddNotSuccss: false,
        isApproved: false,
        isApprovedSecond: false,
        isSecondAssessmentSubmitted: false,
        addOnObs: "",
        addOnSecondObs: "",
        therapistNotes: "",
        pdfUrl: null,
        secondAssessmentPdfUrl: "",
      }
    );
  };

  // Helper function to update patient-specific state
  const updatePatientState = (
    patientId: number,
    newState: Partial<PatientState>
  ) => {
    setPatientStates((prev) => ({
      ...prev,
      [patientId]: {
        ...getPatientState(patientId),
        ...newState,
      },
    }));
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await EnquiriesList();
        console.log("EnquiriesList", data);
        setPatients(data);
        setLoading(true);
      } catch (err) {
        setError("Failed to load patients.");
        toast({
          title: "Error",
          description: "Failed to load patient data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [toast, loading]);

  // Fixed useEffect for patient selection
  useEffect(() => {
    if (selectedPatient) {
      const patientState = getPatientState(selectedPatient.id);

      // Set current patient states from stored patient-specific data
      setIsAddNotSuccss(patientState.isAddNotSuccss);
      setIsApproved(patientState.isApproved);
      setIsApprovedSecond(patientState.isApprovedSecond);
      setIsSecondAssessmentSubmitted(patientState.isSecondAssessmentSubmitted);
      setAddOnObs(patientState.addOnObs);
      setAddOnSecondObs(patientState.addOnSecondObs);
      setTherapistNotes(patientState.therapistNotes);
      setPdfUrl(patientState.pdfUrl);
      setSecondAssessmentPdfUrl(patientState.secondAssessmentPdfUrl);

      // Set PDF URL from global pdfUrls if available
      if (pdfUrls[selectedPatient.id]) {
        setPdfUrl(pdfUrls[selectedPatient.id]);
      }

      // Reset dialog states
      setOpenDialog(false);
      setOpenSecondDialog(false);
      setFullReportDialog(false);
      setSecondReportDialog(false);
      setSecondDialog(false);
    }
  }, [selectedPatient?.id, pdfUrls]);

  useEffect(() => {
    if (
      selectedPatient?.diagnosis?.length > 0 &&
      selectedPatient.diagnosis[selectedPatient.diagnosis.length - 1]?.ai_report
        ?.therapist_report
    ) {
      const lastDiagnosis =
        selectedPatient.diagnosis[selectedPatient.diagnosis.length - 1];
      setCheckState(lastDiagnosis.ai_report.therapist_report);
      setSummary(lastDiagnosis.ai_report.patient_report.patient_summary);
      setDisease(lastDiagnosis.id);
    }
  }, [selectedPatient]);

  const handleGenerate = async (userId: number) => {
    if (!userId) return;

    try {
      const formData = { user: userId };
      const response = await GeneratButton(formData);
      if (response.status === "ok") {
        toast({
          title: "Success",
          description: "AI report generated successfully",
        });

        setPdfUrl(response.summary_file_url);
        setGeneratedStatus((prev) => ({ ...prev, [userId]: true }));
        setPdfUrls((prev) => ({
          ...prev,
          [userId]: response.file_url,
        }));

        // Update patient-specific state
        updatePatientState(userId, {
          pdfUrl: response.summary_file_url,
        });
      } else {
        throw new Error(response.message || "Unknown error.");
      }
    } catch (err) {
      console.error("PDF generation failed", err);
      toast({
        title: "Error",
        description: "No ai report found for this user",
        variant: "destructive",
      });
    }
  };

  const handleSubmitTherapistNotes = async () => {
    if (!selectedPatient) return;

    const doctorid = localStorage.getItem("user_id");

    try {
      const formData = {
        patient_id: selectedPatient?.id,
        add_on_obs: addOnObs,
        diagnosis_id: disease,
        doctor_id: doctorid,
      };
      const response = await AddOnAiSummry(formData);
      if (response.status === "ok") {
        toast({
          title: "Success",
          description: "Therapist notes submitted successfully",
        });
        setOpenDialog(false);
        setIsAddNotSuccss(true);
        setTherapistNotes("");

        // Update patient-specific state
        updatePatientState(selectedPatient.id, {
          isAddNotSuccss: true,
          addOnObs: addOnObs,
        });
      } else {
        toast({
          title: "Failed",
          description: response.message || "Failed to schedule appointment",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to submit therapist notes",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await RejectButton(id);

      if (response.status === "ok") {
        toast({
          title: "AI Reject Successful",
          description: response.message,
        });
        setLoading(true);
      } else {
        throw new Error(response.message || "Unknown error.");
      }
    } catch (error) {
      toast({
        title: "Reject failed",
        description: error?.message || "Something went wrong",
      });
      console.error("Reject error:", error);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await ApproveButton(id);

      if (response.status === "ok") {
        toast({
          title: "AI Approve Successful",
          description: response.message,
        });
        setLoading(true);
        setIsApprovedpatientList(true);

        // Update patient-specific state
        updatePatientState(id, {
          isApproved: true,
        });
      } else {
        throw new Error(response.message || "Unknown error.");
      }
    } catch (error) {
      toast({
        title: "Approval failed",
        description: error?.message || "Something went wrong",
      });
      console.error("Approval error:", error);
    }
  };

  const handleApproveAiDiagnosisSummary = async (patientId: number) => {
    if (!selectedPatient || !disease) return;

    try {
      const lastDiagnosis =
        selectedPatient.diagnosis[selectedPatient.diagnosis.length - 1];
      const formData = { diagnosis_id: lastDiagnosis.id };
      const response = await ApproveAiDiagnosisSummary(formData);
      if (response.status === "ok") {
        toast({
          title: "Success",
          description: "AI report approved Successfully",
        });
        setIsApproved(true);

        // Update patient-specific state
        updatePatientState(patientId, {
          isApproved: true,
        });
      } else {
        throw new Error(response.message || "Unknown error.");
      }
    } catch (err) {
      console.error("PDF generation failed", err);
      toast({
        title: "Error",
        description: "Failed to generate AI report",
        variant: "destructive",
      });
    }
  };

  const handleSubmitSecondTherapistNotes = async () => {
    setLoading(true);
    if (!selectedPatient) return;

    const doctorid = localStorage.getItem("user_id");

    try {
      const formData = {
        user_id: selectedPatient?.id,
        therapist_input: addOnSecondObs,
      };
      const response = await AddOnSecondAiSummry(formData);
      if (response.status === "ok") {
        toast({
          title: "Success",
          description: "Second Assessment notes submitted successfully",
        });
        setOpenSecondDialog(false);
        setIsApproved(true);
        setIsSecondAssessmentSubmitted(true);
        setIsApprovedSecond(true);
        setSecondAssessmentPdfUrl(response.second_assessment_url);

        // Update patient-specific state
        updatePatientState(selectedPatient.id, {
          isSecondAssessmentSubmitted: true,
          isApprovedSecond: true,
          addOnSecondObs: addOnSecondObs,
          secondAssessmentPdfUrl: response.second_assessment_url,
        });
      } else {
        toast({
          title: "Failed",
          description: response.message || "Failed to schedule appointment",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to submit therapist notes",
        variant: "destructive",
      });
    }
  };
  const filteredAndPaginatedPatients = useMemo(() => {
    // Filter patients based on search term
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toString().includes(searchTerm) ||
        (patient.mobile_number && patient.mobile_number.includes(searchTerm))
    );

    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / patientsPerPage);
    const startIndex = (currentPage - 1) * patientsPerPage;
    const endIndex = startIndex + patientsPerPage;
    const paginatedPatients = filtered.slice(startIndex, endIndex);

    return {
      patients: paginatedPatients,
      totalPatients: filtered.length,
      totalPages,
      currentPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }, [patients, searchTerm, currentPage, patientsPerPage]);
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-md border-teal-200">
        <CardHeader className="bg-teal-50 border-b border-teal-100">
          
          <CardTitle className="text-teal-800 text-center ">
          <Button
          variant="outline"
          className="border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-600 text-left m-8"
          onClick={() => window.history.back()}
        >
          <ArrowBigLeft /> Back
        </Button>
         
             Patient Enquiry Management 
         
          
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Patient List */}
         
            <div className="lg:col-span-1">
              <Card className="border-teal-100 shadow-sm h-full">
                <CardHeader className="bg-teal-50 border-b border-teal-100 py-3">
                  <CardTitle className="text-teal-800 text-lg">
                    Patient Enquiries
                  </CardTitle>
                  {/* Search Bar */}
                  <div className="relative mt-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  {/* Results Counter */}
                  {searchTerm && (
                    <div className="text-sm text-gray-600 mt-2">
                      {filteredAndPaginatedPatients.totalPatients} patient(s)
                      found
                    </div>
                  )}
                </CardHeader>

                <CardContent className="p-0 flex flex-col h-full">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                    </div>
                  ) : error ? (
                    <div className="p-4 text-red-500 text-center">{error}</div>
                  ) : (
                    <>
                      {/* Patient List */}
                      <div className="flex-1">
                        <ScrollArea className="h-[400px]">
                          {filteredAndPaginatedPatients.patients.length ===
                          0 ? (
                            <div className="p-4 text-center text-gray-500">
                              {searchTerm
                                ? `No patients found matching "${searchTerm}"`
                                : "No patient enquiries found"}
                            </div>
                          ) : (
                            filteredAndPaginatedPatients.patients.map(
                              (patient, index) => (
                                <div
                                  key={patient.id}
                                  className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                                    selectedPatient?.id === patient.id
                                      ? "bg-teal-50 border-l-4 border-teal-500"
                                      : "border-b"
                                  }`}
                                  onClick={() => setSelectedPatient(patient)}
                                >
                                  <div className="flex-1">
                                    <p className="font-medium text-teal-700">
                                      {patient.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs text-gray-500">
                                        ID: {patient.id}
                                      </span>
                                      {patient.age && (
                                        <span className="text-xs text-gray-500">
                                          • Age: {patient.age}
                                        </span>
                                      )}
                                    </div>
                                    {/* Show email in search results for better context */}
                                    {searchTerm && (
                                      <div className="text-xs text-gray-400 mt-1">
                                        {patient.email}
                                      </div>
                                    )}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-teal-600 hover:text-teal-800 hover:bg-teal-50"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedPatient(patient);
                                    }}
                                  >
                                    <EyeIcon className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                </div>
                              )
                            )
                          )}
                        </ScrollArea>
                        {/* Pagination */}
                        {filteredAndPaginatedPatients.totalPages > 1 && (
                          <div className="border-t border-teal-100 p-4 bg-teal-50">
                            <div className="flex items-center justify-between">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    Math.max(prev - 1, 1)
                                  )
                                }
                                disabled={
                                  !filteredAndPaginatedPatients.hasPrevPage
                                }
                                className="border-teal-300 text-teal-700 hover:bg-teal-100"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>

                              <span className="text-sm font-medium text-teal-800 px-2">
                                Page {currentPage} of{" "}
                                {filteredAndPaginatedPatients.totalPages}
                              </span>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setCurrentPage((prev) => prev + 1)
                                }
                                disabled={
                                  !filteredAndPaginatedPatients.hasNextPage
                                }
                                className="border-teal-300 text-teal-700 hover:bg-teal-100"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Page Numbers (Optional - for better UX with many pages) */}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Patient Details */}
            <div className="lg:col-span-2">
              <Card className="border-teal-100 shadow-sm h-full">
                <CardHeader className="bg-teal-50 border-b border-teal-100 py-3">
                  <CardTitle className="text-teal-800 text-lg">
                    Patient Enquiries Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {!selectedPatient ? (
                    <div className="flex flex-col items-center justify-center h-[500px] text-gray-500">
                      <EyeIcon className="h-12 w-12 mb-4 text-gray-300" />
                      <p>Select a patient to view details</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <Tabs defaultValue="details">
                        <TabsList className="w-full">
                          <TabsTrigger value="details" className="flex-1">
                            Patient Details
                          </TabsTrigger>
                          <TabsTrigger value="diagnosis" className="flex-1">
                            AI Diagnosis
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg border">
                            <div>
                              <h3 className="font-semibold text-teal-800 mb-3">
                                Personal Information
                              </h3>
                              <div className="space-y-2">
                                <p className="text-sm">
                                  <span className="font-medium text-gray-700">
                                    Name:
                                  </span>{" "}
                                  {selectedPatient.name}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium text-gray-700">
                                    Age:
                                  </span>{" "}
                                  {selectedPatient.age || "Not specified"}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium text-gray-700">
                                    Gender:
                                  </span>{" "}
                                  {selectedPatient.gender || "Not specified"}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium text-gray-700">
                                    Patient ID:
                                  </span>{" "}
                                  {selectedPatient.patient_id ||
                                    selectedPatient.id}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-teal-800 mb-3">
                                Contact Information
                              </h3>
                              <div className="space-y-2">
                                <p className="text-sm">
                                  <span className="font-medium text-gray-700">
                                    Email:
                                  </span>{" "}
                                  {selectedPatient.email}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium text-gray-700">
                                    Phone:
                                  </span>{" "}
                                  {selectedPatient.mobile_number ||
                                    "Not provided"}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium text-gray-700">
                                    Address:
                                  </span>{" "}
                                  {selectedPatient.address || "Not provided"}
                                </p>
                              </div>
                            </div>
                            <div className="md:col-span-2 mt-2">
                              <h3 className="font-semibold text-teal-800 mb-2">
                                Risk Assessment
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                <Badge className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100">
                                  ⚠️ Suicide risk
                                </Badge>
                                <Badge className="bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100">
                                  Anxiety
                                </Badge>
                                <Badge className="bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100">
                                  Depression
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="diagnosis" className="mt-4">
                          <Card className="border-teal-100">
                            <CardContent className="p-6">
                              <h3 className="font-medium text-teal-800 mb-4">
                                Preliminary AI Diagnosis Summary
                              </h3>

                              {!generatedStatus[selectedPatient.id] ? (
                                <div className="bg-gray-50 rounded-lg p-6 text-center">
                                  <p className="text-gray-600 mb-4">
                                    No AI diagnosis has been generated for this
                                    patient yet. Generate a report to view the
                                    AI assessment.
                                  </p>
                                  <Button
                                    onClick={() =>
                                      handleGenerate(selectedPatient.id)
                                    }
                                    className="bg-teal-600 hover:bg-teal-700"
                                  >
                                    Generate AI Report
                                  </Button>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
                                    <h4 className="font-semibold mb-2 text-teal-800">
                                      Summary
                                    </h4>
                                    <p className="text-gray-700">{summary}</p>
                                  </div>

                                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                    <Button
                                      onClick={() => setFullReportDialog(true)}
                                      variant="outline"
                                      className="border-teal-600 text-teal-600 hover:bg-teal-50"
                                    >
                                      View Full AI Report
                                    </Button>

                                    <Button
                                      onClick={() => setOpenDialog(true)}
                                      className="bg-teal-600 hover:bg-teal-700"
                                      disabled={isAddNotSuccss}
                                    >
                                      {isAddNotSuccss
                                        ? "Notes Submitted ✓"
                                        : "Add Therapist Notes"}
                                    </Button>

                                    <Button
                                      className="bg-green-600 text-white hover:bg-green-700"
                                      onClick={() =>
                                        handleApproveAiDiagnosisSummary(
                                          selectedPatient.id
                                        )
                                      }
                                      disabled={!isAddNotSuccss || isApproved}
                                    >
                                      {/* <CheckCircle className="w-4 h-4 mr-1" /> */}
                                      {isApproved
                                        ? "Diagnosis Approved ✓"
                                        : "Approve Diagnosis"}
                                    </Button>
                                  </div>

                                  <Separator className="my-4" />

                                  <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
                                    <h3 className="font-medium text-teal-800 mb-4">
                                      Second Diagnosis Summary
                                    </h3>

                                    {!isSecondAssessmentSubmitted ? (
                                      <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                        <Button
                                          onClick={() =>
                                            setOpenSecondDialog(true)
                                          }
                                          disabled={!isApproved}
                                        >
                                          Add Second Therapist Notes
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className="space-y-4">
                                        <div className="bg-white rounded-lg p-4 border border-teal-200">
                                          <p className="text-sm text-green-600 mb-2">
                                            ✓ Second assessment completed
                                          </p>
                                          <div className="flex flex-col sm:flex-row gap-3">
                                            <Button
                                              onClick={() =>
                                                setSecondDialog(true)
                                              }
                                              variant="outline"
                                              className="border-teal-600 text-teal-600 hover:bg-teal-50"
                                            >
                                              View Second Assessment Report
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => {
                                                if (secondAssessmentPdfUrl) {
                                                  window.open(
                                                    secondAssessmentPdfUrl,
                                                    "_blank"
                                                  );
                                                }
                                              }}
                                            >
                                              <Download className="w-4 h-4 mr-2" />
                                              Download Report
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <Separator className="my-4" />

                                  <div className="flex justify-end items-center">
                                    <div className="space-x-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 border-red-600 hover:bg-red-50"
                                        onClick={() =>
                                          handleReject(selectedPatient.id)
                                        }
                                      >
                                        <X className="w-3 h-3 mr-1" /> Reject
                                      </Button>
                                      {!isApprovedpatientList && (
                                        <>
                                          <Button
                                            size="sm"
                                            className="bg-green-600 text-white hover:bg-green-700"
                                            onClick={() =>
                                              handleApprove(selectedPatient.id)
                                            }
                                          >
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Approve
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Therapist Notes Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800">
              Therapist's Notes
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              Add your professional assessment to supplement the AI diagnosis.
            </p>
            <Textarea
              // value={therapistNotes}
              // onChange={(e) => setTherapistNotes(e.target.value)}
              value={addOnObs}
              onChange={(e) => setAddOnObs(e.target.value)}
              placeholder="Enter your clinical observations and recommendations..."
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitTherapistNotes}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Submit Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* SecondTherapist Notes Dialog */}
      <Dialog open={openSecondDialog} onOpenChange={setOpenSecondDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800">
              Second Therapist's Notes
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              Add Therapist's professional observation of the Patient and
              generate a Detailed AI Report.
            </p>
            <Textarea
              // value={therapistNotes}
              // onChange={(e) => setTherapistNotes(e.target.value)}
              value={addOnSecondObs}
              onChange={(e) => setAddOnSecondObs(e.target.value)}
              placeholder="Enter your clinical observations and recommendations..."
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitSecondTherapistNotes}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={loading}
            >
              {/* Submit Second Notes */}
              {loading ? "Submitting..." : "Submit Second Notes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Full AI Report Dialog */}
      <Dialog open={fullReportDialog} onOpenChange={setFullReportDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800">
              Complete AI Assessment Report
            </DialogTitle>
          </DialogHeader>
          <div className="h-[60vh] overflow-auto border rounded-md bg-white">
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                title="AI Report PDF"
                width="100%"
                height="100%"
                className="border-0"
              ></iframe>
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (pdfUrl) {
                  window.open(pdfUrl, "_blank");
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            {/* {isApproved && ( */}
            <div className="space-x-2">
              {/* <Button 
              variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                <X className="w-4 h-4 mr-1" /> Reject
              </Button> */}
              {/* <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  // onClick={handleApproveReport}
                  onClick={() =>
                    handleApproveAiDiagnosisSummary(selectedPatient.id)
                  }
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> Approve Daignosis
                </Button> */}
            </div>
            {/* )} */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={secondReportDialog} onOpenChange={setSecondReportDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800">
              Complete AI Assessment Report
            </DialogTitle>
          </DialogHeader>
          <div className="h-[60vh] overflow-auto border rounded-md bg-white">
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                title="AI Report PDF"
                width="100%"
                height="100%"
                className="border-0"
              ></iframe>
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (pdfUrl) {
                  window.open(pdfUrl, "_blank");
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            {!isApproved && (
              <div className="space-x-2">
                {/* <Button 
              variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                <X className="w-4 h-4 mr-1" /> Reject
              </Button> */}
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  // onClick={handleApproveReport}
                  onClick={() =>
                    handleApproveAiDiagnosisSummary(selectedPatient.id)
                  }
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> Approve Daignosis
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={secondDialog} onOpenChange={setSecondDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800">
              Complete AI Assessment Report
            </DialogTitle>
          </DialogHeader>
          <div className="h-[60vh] overflow-auto border rounded-md bg-white">
            {secondAssessmentPdfUrl ? (
              <iframe
                src={secondAssessmentPdfUrl}
                title="AI Report PDF"
                width="100%"
                height="100%"
                className="border-0"
              ></iframe>
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (secondAssessmentPdfUrl) {
                  window.open(secondAssessmentPdfUrl, "_blank");
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            {!isApproved && (
              <div className="space-x-2">
                {/* <Button 
              variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                <X className="w-4 h-4 mr-1" /> Reject
              </Button> */}
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  // onClick={handleApproveReport}
                  onClick={() =>
                    handleApproveAiDiagnosisSummary(selectedPatient.id)
                  }
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> Approve Daignosis
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientEnquiryTab;
