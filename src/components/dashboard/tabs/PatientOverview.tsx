import { useEffect, useMemo, useState } from "react";
import {
  patientlist,
  fetchDoctorSlots,
  MakeAppointment,
  fetchAddon,
  ApproveButton,
  GeneratButton,
  AddOnSecondAiSummry,
  ChatEnableApi,
  assignDoctorToPatient,
} from "@/models/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
  Search,
  User,
  UserRound,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DoctorListTab from "./DoctorList";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import ChatButtonTab from "./ChatButtonTab";
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
  patient_id: number | null;
  diagnosis: {
    id: number | null;
    ai_summary_file: string | null;

    ai_report: {
      patient_report: {
        patient_summary: string | null;
        physical_symptoms: string | null;
        emotional_symptoms: string | null;
        cognitive_symptoms: string | null;
        behavioral_symptoms: string | null;
      };
      therapist_report: {
        Severity: number | null;
        Suicidality_Risk: string | null;
        Presenting_Complaints: string | null;
        Disease_Diagnosed: string | null;
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

const PatientOverview = () => {
  const [patients, setPatients] = useState<UserData[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<UserData | null>(null);
  const { toast } = useToast();

  // Doctor selection and appointment states
  const [doctorDialogOpen, setDoctorDialogOpen] = useState(false);
  const [assignedDoctor, setAssignedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [aiReportDialogOpen, setAiReportDialogOpen] = useState(false);

  const [aiSecondReportDialogOpen, setAiSecondReportDialogOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [addonData, setAddonData] = useState<UserData | null>(null);
  const [checkState, setCheckState] = useState(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [reportPdf, setReportPdf] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [addOnObs, setAddOnObs] = useState("");
  const [disease, setDisease] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [data, setData] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [secondsPdf, setSecondsPdf] = useState<string | null>(null);
  const [load, setLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const [isConformpatientList, setIsConformpatientList] = useState(false);
  // console.log("setSelectedDate$$$$$$$$$", selectedPatient);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await patientlist();
        console.log("data", data);
        setPatients(data);
        setLoading(true);
        const pdffile = localStorage.getItem("pdf");
        console.log("pdffile", pdffile);
        setPdfUrl(pdffile);
      } catch (err) {
        setError("No data found.");
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

  useEffect(() => {
    if (
      selectedPatient?.diagnosis?.length > 0 &&
      selectedPatient.diagnosis[selectedPatient.diagnosis.length - 1]?.ai_report
        ?.therapist_report
    ) {
      const lastDiagnosis =
        selectedPatient.diagnosis[selectedPatient.diagnosis.length - 1];
      console.log("lastDiagnosis", lastDiagnosis);
      setCheckState(lastDiagnosis.ai_report.therapist_report);
      setDisease(lastDiagnosis.id);
      setReportPdf(lastDiagnosis.ai_summary_file);
      setData(lastDiagnosis.ai_report.patient_report.patient_summary);
      if (selectedPatient.diagnosis.length > 1) {
        const secondDiagnosis =
          selectedPatient.diagnosis[selectedPatient.diagnosis.length - 2];
        console.log("secondDiagnosis", secondDiagnosis.ai_summary_file);

        setSeconds(
          secondDiagnosis.ai_report?.patient_report?.patient_summary || ""
        );
        setSecondsPdf(secondDiagnosis.ai_summary_file || "");
      }
    }
  }, [selectedPatient]);

  console.log("diaganosis report ai ", checkState);
  console.log("show  ", checkState);

  const handleDoctorAssign = (doctor: Doctor) => {
    setAssignedDoctor(doctor);
    setDoctorDialogOpen(false);

    // Reset date and slot when doctor changes
    setSelectedDate("");
    setSelectedSlot(null);
    setAvailableSlots([]);

    toast({
      title: "Doctor Assigned",
      description: `Dr. ${doctor.name} has been assigned to this patient. Select a slot to finish appointment`,
    });
  };

  const handleDateChange = async (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);

    if (!assignedDoctor) return;

    try {
      const slots = await fetchDoctorSlots(assignedDoctor.name, date);
      setAvailableSlots(slots);

      if (slots.length === 0) {
        toast({
          title: "No Available Slots",
          description: `No slots available for Dr. ${
            assignedDoctor.name
          } on ${format(new Date(date), "MMMM d, yyyy")}.`,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Failed to fetch slots:", err);
      setAvailableSlots([]);
      toast({
        title: "Error",
        description: "Failed to fetch available slots.",
        variant: "destructive",
      });
    }
  };


  const handleAppointment = async () => {
    if (!selectedPatient || !assignedDoctor || !selectedDate || !selectedSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a doctor, date, and time slot.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const doctorId = assignedDoctor.id;
    const patientId = selectedPatient.id;

    try {
      const token = localStorage.getItem("access_token");

      const assignRes = await assignDoctorToPatient(doctorId, patientId);

      if (assignRes.status !== "ok") {
        toast({
          title: "Doctor Assignment Failed",
          description:
            assignRes.message || "Could not assign doctor to patient.",
          variant: "destructive",
        });
        return;
      }

      const formData = {
        doctor: doctorId,
        patient: patientId,
        slot: selectedSlot.id,
        date: selectedDate,
      };

      const response = await MakeAppointment(formData, token);

      if (response.status === "ok") {
        toast({
          title: "Success",
          description: "Appointment scheduled successfully!",
        });

        setActiveTab("overview");
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient.id !== selectedPatient.id)
        );
        setSelectedPatient(null);
      } else {
        toast({
          title: "Failed",
          description: response.message || "Failed to schedule appointment",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while scheduling the appointment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await ApproveButton(id);
      // console.log("API response########:", response);

      if (response.status === "ok") {
        toast({
          title: "AI Approve Successful",
          description: response.message,
        });
        setLoading(true);
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

  const handleSubmitSecondTherapistNotes = async () => {
    if (!selectedPatient) return;

    const doctorid = localStorage.getItem("user_id");

    try {
      const formData = {
        user_id: selectedPatient?.id,
        therapist_input: addOnObs,
        // diagnosis_id: disease,
        // doctor_id: doctorid,
      };
      const response = await AddOnSecondAiSummry(formData);
      if (response.status === "ok") {
        toast({
          title: "Success",
          description: "Second Assaesment notes submitted successfully",
        });
        setOpenDialog(false);
        setAddOnObs(addOnObs);
        // setTherapistNotes("");
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

  const handleChatEnable = async () => {
    setLoad(true);
    try {
      const formData = { patient_id: selectedPatient.id };
      const response = await ChatEnableApi(formData);
      console.log("response", response);
      if (response.status === "true") {
        toast({
          title: "Success",
          description: "AI chat enabled",
        });
        setIsApproved(true); // Hide or disable the button
      } else if (response.message === "AI chat is already enabled.") {
        toast({
          title: "Info",
          description: "AI chat is already enabled.",
        });
        setIsApproved(true); // Also treat this as success
      } else {
        toast({
          title: "Error",
          description: response.message || "Unknown error.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Chat generation failed", err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChatDisable = async () => {
    try {
      const formData = { patient_id: selectedPatient.id };
      const response = await ChatEnableApi(formData); // Assuming you have this API
      if (response.status === "ok") {
        toast({
          title: "Success",
          description: "AI chat disabled",
        });
        setIsApproved(false); // Update state if using isApproved
      } else {
        throw new Error(response.message || "Unknown error.");
      }
    } catch (err) {
      console.error("chat disable failed", err);
      toast({
        title: "Error",
        description: "Failed to disable chat",
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Patient List */}
        <div className="lg:col-span-1">
          <Card className="border-teal-100 shadow-sm h-full">
            <CardHeader className="bg-teal-50 border-b border-teal-100 py-3">
              <CardTitle className="text-teal-800 flex items-center gap-3">
                <UserRound className="h-5 w-5" />
                Patient Queue
              </CardTitle>
              {/* Search Bar */}
              <div className="relative mt-4">
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
                  {filteredAndPaginatedPatients.totalPatients} patient(s) found
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                </div>
              ) : error ? (
                <div className="p-4 text-red-500 text-center">{error}</div>
              ) : (
                <>
                  <div className="flex-1">
                    <ScrollArea className="h-[600px]">
                      {filteredAndPaginatedPatients.patients.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No patients found
                        </div>
                      ) : (
                        filteredAndPaginatedPatients.patients.map((patient) => (
                          <div
                            key={patient.id}
                            className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                              selectedPatient?.id === patient.id
                                ? "bg-teal-50 border-l-4 border-teal-500"
                                : "border-b"
                            }`}
                            onClick={() => {
                              setSelectedPatient(patient);
                              setActiveTab("overview");
                            }}
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
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-teal-600 hover:text-teal-800 hover:bg-teal-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPatient(patient);
                                setActiveTab("overview");
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        ))
                      )}
                    </ScrollArea>

                    {filteredAndPaginatedPatients.totalPages > 1 && (
                      <div className="border-t border-teal-100 p-4 bg-teal-50">
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={!filteredAndPaginatedPatients.hasPrevPage}
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
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={!filteredAndPaginatedPatients.hasNextPage}
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
            <CardFooter></CardFooter>
          </Card>
        </div>

        {/* Right Panel - Patient Details */}
        <div className="lg:col-span-2">
          <Card className="border-teal-100 shadow-sm h-full">
            <CardHeader className="bg-teal-50 border-b border-teal-100 py-3">
              <CardTitle className="text-teal-800 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Patient Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {!selectedPatient ? (
                <div className="flex flex-col items-center justify-center h-[500px] text-gray-500">
                  <User className="h-12 w-12 mb-4 text-gray-300" />
                  <p>Select a patient to view details</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="w-full grid grid-cols-1 sm:grid-cols-3 gap-1">
                      <TabsTrigger
                        value="overview"
                        className="text-sm sm:text-base"
                      >
                        Patient Details
                      </TabsTrigger>
                      <TabsTrigger
                        value="diagnosis"
                        className="text-sm sm:text-base"
                      >
                        AI Diagnosis
                      </TabsTrigger>
                      <TabsTrigger
                        value="appointment"
                        className="text-sm sm:text-base"
                      >
                        Schedule Appointment
                      </TabsTrigger>
                    </TabsList>
                    {/* Patient Overview Tab */}

                    <TabsContent value="overview" className="mt-14">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
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
                              {selectedPatient.patient_id || selectedPatient.id}
                            </p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
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
                              {selectedPatient.mobile_number || "Not provided"}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium text-gray-700">
                                Address:
                              </span>{" "}
                              {selectedPatient.address || "Not provided"}
                            </p>
                          </div>
                        </div>
                        {/* <div className="md:col-span-2 bg-white p-4 rounded-lg border shadow-sm">
                          <h3 className="font-semibold text-teal-800 mb-3">
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
                        </div> */}
                        <div className="md:col-span-2 bg-white p-4 rounded-lg border shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-teal-800">
                              AI Diagnosis Summary
                            </h3>
                            <br />
                            <Button
                              onClick={() => setAiReportDialogOpen(true)}
                              variant="outline"
                              className="border-teal-600 text-teal-600 hover:bg-teal-50"
                            >
                              View Full AI Report
                            </Button>
                          </div>
                          <p className="flex text-sm text-gray-600"> {data}</p>
                          <p className="text-gray-600">
                            {/* Patient shows signs of moderate depression and anxiety with potential risk factors that
                            require attention. Recommended for further evaluation by a specialist.
                          */}
                            {checkState?.Presenting_Complaints}{" "}
                          </p>
                        </div>
                        <div className="md:col-span-2 bg-white p-4 rounded-lg border shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-teal-800">
                              Second Diagnosis Summary
                            </h3>
                            <br />
                            <Button
                              onClick={() => setAiSecondReportDialogOpen(true)}
                              variant="outline"
                              className="border-teal-600 text-teal-600 hover:bg-teal-50"
                            >
                              View Second Ai Report
                            </Button>
                          </div>
                          {/* <p className="flex text-sm text-gray-600"> {seconds}</p> */}
                          <p className="text-gray-600">
                            {/* Patient shows signs of moderate depression and anxiety with potential risk factors that
                            require attention. Recommended for further evaluation by a specialist.
                          */}
                            {checkState?.Presenting_Complaints}{" "}
                          </p>
                        </div>
                        <div>
                          {/* <Button onClick={() => setOpenDialog(true)}>
                            Start Second Assesment
                          </Button> */}
                        </div>
                      </div>
                    </TabsContent>
                    {/* SecondTherapist Notes Dialog */}
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-center text-teal-800">
                            Second Therapist's Notes
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <p className="text-sm text-gray-600">
                            Add your professional assessment to supplement the
                            Patient details.
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
                          <Button
                            variant="outline"
                            onClick={() => setOpenDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSubmitSecondTherapistNotes}
                            className="bg-teal-600 hover:bg-teal-700"
                          >
                            Submit Second Notes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* AI Diagnosis Tab */}
                    <TabsContent value="diagnosis" className="mt-14">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <h3 className="font-semibold text-teal-800 mb-3">
                            Disease Diagnosis
                          </h3>
                          <p className="text-sm text-gray-600">
                            {checkState?.disease_diagnosed}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <h3 className="font-semibold text-teal-800 mb-3">
                            Diagnosis Suggestions
                          </h3>
                          <ul className="text-sm text-gray-600 list-disc ml-4 space-y-1">
                            <li>{checkState?.presenting_complaints}</li>
                            <li>{checkState?.mood_cognition_thought}</li>
                            <li>{checkState?.patient_goals_expectations}</li>
                            {/* <li>Sleep disturbance</li> */}
                          </ul>
                        </div>
                        <div className="md:col-span-2 bg-white p-4 rounded-lg border shadow-sm">
                          <h3 className="font-semibold text-teal-800 mb-3">
                            Risk Factors
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-red-50 text-red-600 border border-red-200">
                                ⚠️ High
                              </Badge>
                              <p className="text-sm text-red-600">
                                Suicide risk - {checkState?.suicidality_risk}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-yellow-50 text-yellow-700 border border-yellow-200">
                                ⚠️ Medium
                              </Badge>
                              <p className="text-sm text-yellow-700">
                                Self-harm tendencies
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-50 text-blue-600 border border-blue-200">
                                ⚠️ Low
                              </Badge>
                              <p className="text-sm text-blue-600">
                                Substance abuse
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-2 bg-white p-4 rounded-lg border shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-teal-800">
                              Treatment Recommendations
                            </h3>
                            {/* <Button
                              onClick={() => setAiReportDialogOpen(true)}
                              variant="outline"
                              className="border-teal-600 text-teal-600 hover:bg-teal-50"
                            >
                              View Full AI Report
                            </Button> */}
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>
                              <span className="font-medium">Therapy:</span>{" "}
                              {/* Cognitive Behavioral Therapy (CBT) with a focus on
                              depression and anxiety management. */}
                              {checkState?.psychiatric_history}
                            </p>
                            <p>
                              <span className="font-medium">Medication:</span>{" "}
                              {/* Consider SSRI antidepressants under psychiatric
                              supervision. */}
                              {checkState?.medical_history}
                            </p>
                            <p>
                              <span className="font-medium">Follow-up:</span>{" "}
                              {/* Weekly sessions initially, with suicide risk
                              assessment at each visit. */}
                              {checkState?.substance_use}
                            </p>
                          </div>
                        </div>
                        <div>
                          {/* <Button
                            onClick={handleChatEnable}
                            className="bg-teal-600 hover:bg-teal-700"
                          >
                            Chat Enable
                          </Button> */}
                          {/* <Button
    onClick={isApproved ? handleChatDisable : handleChatEnable}
    className={isApproved ? "bg-red-600 hover:bg-red-700" : "bg-teal-600 hover:bg-teal-700"}
  >
    {isApproved ? "Chat Disable" : "Chat Enable"}
  </Button> */}
                          {/* <ChatButtonTab selectedPatient={selectedPatient.patient_id || selectedPatient.id}/> */}
                          {!isApproved && (
                            <Button
                              onClick={handleChatEnable}
                              className="bg-teal-600 hover:bg-teal-700"
                              disabled={load}
                            >
                              {load ? "Chat Disable" : "Chat Enable "}
                            </Button>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Appointment Scheduling Tab */}
                    <TabsContent value="appointment" className="mt-16">
                      <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg border shadow-sm">
                          <h3 className="font-semibold text-teal-800 mb-4 flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Select Specialist
                          </h3>

                          {!assignedDoctor ? (
                            <div className="text-center py-4">
                              <p className="text-gray-600 mb-4">
                                No specialist has been assigned to this patient
                                yet.
                              </p>
                              <Button
                                onClick={() => setDoctorDialogOpen(true)}
                                className="bg-teal-600 hover:bg-teal-700"
                              >
                                Recommend Specialist
                              </Button>
                            </div>
                          ) : (
                            <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-teal-800">
                                    {assignedDoctor.name}
                                  </p>
                                  <p className="text-sm text-teal-600">
                                    {assignedDoctor.email}
                                  </p>
                                  <p className="text-sm text-teal-600">
                                    {assignedDoctor.mobile_number}
                                  </p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setDoctorDialogOpen(true)}
                                  className="border-teal-600 text-teal-600 hover:bg-teal-50"
                                >
                                  Change
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        {assignedDoctor && (
                          <div className="bg-white p-6 rounded-lg border shadow-sm">
                            <h3 className="font-semibold text-teal-800 mb-4 flex items-center gap-2">
                              <Calendar className="h-5 w-5" />
                              Select Appointment Date
                            </h3>

                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                              <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) =>
                                  handleDateChange(e.target.value)
                                }
                                className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                                min={new Date().toISOString().split("T")[0]}
                              />

                              {selectedDate && (
                                <div className="bg-gray-50 p-2 rounded-md text-sm text-gray-600 flex-1">
                                  Selected date:{" "}
                                  <span className="font-medium">
                                    {format(
                                      new Date(selectedDate),
                                      "MMMM d, yyyy"
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {selectedDate && availableSlots.length > 0 && (
                          <div className="bg-white p-6 rounded-lg border shadow-sm">
                            <h3 className="font-semibold text-teal-800 mb-4 flex items-center gap-2">
                              <Clock className="h-5 w-5" />
                              Select Time Slot
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {availableSlots.map((slot) => (
                                <div
                                  key={slot.id}
                                  className={`p-3 border rounded-md cursor-pointer transition-colors ${
                                    selectedSlot?.id === slot.id
                                      ? "bg-teal-100 border-teal-500 text-teal-800"
                                      : "hover:bg-gray-50"
                                  }`}
                                  onClick={() => setSelectedSlot(slot)}
                                >
                                  <p className="text-center font-medium">
                                    {slot.from_time} - {slot.to_time}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedDate && availableSlots.length === 0 && (
                          <div className="bg-white p-6 rounded-lg border shadow-sm">
                            <div className="text-center py-4">
                              <p className="text-red-500">
                                No slots available for Dr.{" "}
                                {assignedDoctor?.name} on{" "}
                                {format(new Date(selectedDate), "MMMM d, yyyy")}
                                .
                              </p>
                              <p className="text-gray-600 mt-2">
                                Please select a different date or create a new
                                slot.
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedSlot && (
                          <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
                            <h3 className="font-semibold text-teal-800 mb-3">
                              Appointment Summary
                            </h3>
                            <div className="space-y-2">
                              <p className="text-teal-700">
                                <span className="font-medium">Doctor:</span>{" "}
                                {assignedDoctor?.name}
                              </p>
                              <p className="text-teal-700">
                                <span className="font-medium">Date:</span>{" "}
                                {format(new Date(selectedDate), "MMMM d, yyyy")}
                              </p>
                              <p className="text-teal-700">
                                <span className="font-medium">Time:</span>{" "}
                                {selectedSlot.from_time} -{" "}
                                {selectedSlot.to_time}
                              </p>
                              <p className="text-teal-700">
                                <span className="font-medium">Patient:</span>{" "}
                                {selectedPatient.name}
                              </p>
                            </div>

                            {/* <div className="mt-4 flex justify-end">
                              <Button
                                onClick={handleAppointment}
                                className="bg-teal-600 hover:bg-teal-700"
                              >
                                Confirm Appointment
                              </Button>
                            </div> */}
                            <div className="mt-4 flex justify-end">
                              <Button
                                onClick={handleAppointment}
                                className="bg-teal-600 hover:bg-teal-700"
                                disabled={isLoading}
                              >
                                {isLoading
                                  ? "Scheduling..."
                                  : "Confirm Appointment"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Doctor Selection Dialog */}
      <Dialog open={doctorDialogOpen} onOpenChange={setDoctorDialogOpen}>
        <DialogContent className="sm:max-w-md ">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800">
              Select Specialist
            </DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <DoctorListTab
              patientId={selectedPatient.id}
              onDoctorAssign={handleDoctorAssign}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* AI Report Dialog */}
      <Dialog open={aiReportDialogOpen} onOpenChange={setAiReportDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800">
              Complete AI Assessment Report
            </DialogTitle>
          </DialogHeader>
          <div className="h-[60vh] overflow-auto border rounded-md bg-white">
            {reportPdf ? (
              <iframe
                src={reportPdf}
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={aiSecondReportDialogOpen}
        onOpenChange={setAiSecondReportDialogOpen}
      >
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800">
              Second Assessment Report
            </DialogTitle>
          </DialogHeader>
          <div className="h-[60vh] overflow-auto border rounded-md bg-white">
            {secondsPdf ? (
              <iframe
                src={secondsPdf}
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
                if (secondsPdf) {
                  window.open(secondsPdf, "_blank");
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientOverview;
