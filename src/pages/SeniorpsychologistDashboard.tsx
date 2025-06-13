import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Calendar,
  Brain,
  ClipboardList,
  Search,
  Bell,
  Settings,
  Sparkles,
  X,
  User,
  Mail,
  Phone,
  IdCard,
  MapPin,
  Book,
  Briefcase,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import VoiceAssistant from "@/components/VoiceAssistant";
import StatsCard from "@/components/dashboard/StatsCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import axios from "axios";
import DoctorAsgPatientList from "@/components/dashboard/tabs/DoctorAsgPatientList";
import {
  AssignDoctorPatientList,
  DoctorAssessmenttoPatient,
} from "@/models/auth";
import SeniorSchedulTab from "@/components/dashboard/tabs/SeniorSchedulTab";
import Lottie from "lottie-react";
import Ani from "../assets/json/logoAni.json";
import AllReportDoctorList from "@/components/dashboard/tabs/AllReportDoctorList";
import { useToast } from "@/hooks/use-toast";
import AssesmentSeniorTab from "@/components/dashboard/tabs/AssesmentSeniorTab";
import SeniorCountTab from "@/components/dashboard/tabs/SeniorCountTab";
import TeamCommunicationTab from "@/components/dashboard/tabs/TeamCommunicationTab";
import PatientAppoinmentList from "@/components/dashboard/tabs/PatientAppoinmentList";

interface Patient {
  id: string;
  name: string;
  username: string;
  email: string;
  mobile_number: string;
  age: number;
  gender: string;
  occupation: string;
  education: string;
  address: string;
  patient_id: string;
}

interface PatientAssignment {
  id: number;
  doctor: any;
  patient: Patient;
  assigned_at: string;
  patient_diagnosis: any[];
  ai_summary?: any;
  doctor_name?: string;
  doctor_role?: string;
  is_active?: boolean;
  observations?: string;
  session?: string;
}

const SeniorpsychologistDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [assignments, setAssignments] = useState<PatientAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] =
    useState<PatientAssignment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [assessment, setAssessment] = useState("");
  const [savingAssessment, setSavingAssessment] = useState(false);
  const patientIdString = localStorage.getItem("user_id"); // string or null
  const patientId = patientIdString ? Number(patientIdString) : null;
  const navigate = useNavigate();
  const { toast } = useToast();
  console.log("patients", patients);
  console.log("selectedPatient", selectedPatient);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await AssignDoctorPatientList();
        console.log("Fetched patients..........:", data.patient);
        setPatients(data);
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching patient list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);
  const handleSaveAssessment = async () => {
    if (!selectedPatient || !assessment.trim()) {
      alert("Assessment text is required");
      return;
    }

    setSavingAssessment(true);

    try {
      const formData = {
        patient: selectedPatient.patient.id,
        question_text: assessment,
      };

      const response = await DoctorAssessmenttoPatient(formData);

      if (response?.data?.status === "ok") {
        // Update local state
        setAssignments((prev) =>
          prev.map((assignment) =>
            assignment.id === selectedPatient.id
              ? { ...assignment, observations: assessment }
              : assignment
          )
        );
      } else {
        toast({
          title: "Success",
          description: "Assessment created successfully",
        });
      }
    } catch (error) {
      console.error("Error:", error);

      toast({
        title: "Failed",
        description: "Failed to save assessment",
      });
    } finally {
      // Always close the dialog and reset state
      setSavingAssessment(false);
      setIsDialogOpen(false);
      setAssessment("");
      setSelectedPatient(null);
    }
  };

  // Option 2: Add a manual close function
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setAssessment("");
    setSelectedPatient(null);
  };
  const handleViewProfile = (assignment: PatientAssignment) => {
    setSelectedPatient(assignment);
    setAssessment(assignment.observations || "");
    setIsDialogOpen(true);
  };

  // const handleSaveAssessment = async () => {
  //   if (!selectedPatient || !assessment.trim()) {
  //     // Show error if no assessment text is provided
  //     console.error("Assessment text is required");
  //     return;
  //   }

  //   setSavingAssessment(true);
  //   try {
  //     const formData = {
  //     patient: selectedPatient.patient.id,
  //        question_text: assessment}
  //      const response = await DoctorAssessmenttoPatient(formData);
  //     // const response = await axios.post('/api/assessment/create', {
  //     //   patient: selectedPatient.patient.id,
  //     //   question_text: assessment
  //     // });

  //     if (response.data.status === "ok") {
  //       console.log("Assessment created successfully:", response.data);

  //       // Update local state with the new assessment
  //       setAssignments(prev => prev.map(assignment =>
  //         assignment.id === selectedPatient.id
  //           ? { ...assignment, observations: assessment }
  //           : assignment
  //       ));

  //       // Close the dialog
  //       setIsDialogOpen(false);

  //       // Reset assessment text
  //       setAssessment("");
  //     }
  //   } catch (error) {
  //     console.error("Error creating assessment:", error);

  //     // Show error message to user
  //     if (error.response && error.response.data && error.response.data.message) {
  //       alert(`Error: ${error.response.data.message}`);
  //     } else {
  //       alert("Failed to create assessment. Please try again.");
  //     }
  //   } finally {
  //     setSavingAssessment(false);
  //   }
  // };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <DashboardHeader title="Senior Psychologist Dashboard" />

        <Tabs defaultValue="patients" className="space-y-7">
          <TabsList className="dark:bg-metro-dark-highlight bg-white p-1 rounded-xl shadow-sm border border-green-100">
            <TabsTrigger
              value="patients"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              My Patients
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="assessments"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Assessments
            </TabsTrigger>
            <TabsTrigger
              value="Teamcommunication"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              Team communication
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Reports
            </TabsTrigger>
          
                    <TabsTrigger
                          value="appoinment"
                          className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
                        >
                          Appointment
            
                        </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            <SeniorCountTab />
            <Card className="border-teal-100 shadow-teal-glow overflow-hidden bg-white transition-all duration-200 hover:shadow-lg hover:scale-105">
              <CardHeader className="bg-teal-50 border-b border-teal-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-teal-800 flex items-center gap-2">
                    Patient List
                    <Sparkles className="h-4 w-4 text-teal-500" />
                  </CardTitle>
                  <Badge className="bg-teal-500 hover:bg-teal-600">
                    {assignments.length} Active Patients
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <Lottie
                    animationData={Ani}
                    loop={true}
                    autoplay={true}
                    className="h-12 w-full bg-teal-100"
                  />
                ) : (
                  <div className="rounded-md">
                    {/* Desktop Table Header - Hidden on mobile */}
                    <div className="hidden md:grid grid-cols-5 bg-teal-50 p-3 text-sm font-medium text-teal-800">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Patient Id</div>
                      <div>Phone</div>
                      <div></div>
                    </div>

                    {/* Desktop Table Rows - Hidden on mobile */}
                    <div className="hidden md:block divide-y divide-teal-100">
                      {assignments.map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-5 p-4 text-sm items-center hover:bg-teal-50/50 transition-colors"
                        >
                          <div className="font-medium text-teal-800">
                            {item.patient.name}
                          </div>
                          <div className="text-teal-700">
                            {item.patient.email}
                          </div>
                          <div className="text-teal-700">
                            {item.patient.patient_id}
                          </div>
                          <div className="text-teal-700">
                            {item.patient.mobile_number}
                          </div>
                          <div className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                              onClick={() => handleViewProfile(item)}
                            >
                              View Profile
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mobile Card Layout - Visible only on mobile */}
                    <div className="md:hidden divide-y divide-teal-100">
                      {assignments.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 hover:bg-teal-50/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-teal-800 text-base truncate">
                                {item.patient.name}
                              </h3>
                              <p className="text-sm text-teal-600 truncate">
                                ID: {item.patient.patient_id}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 ml-3 flex-shrink-0"
                              onClick={() => handleViewProfile(item)}
                            >
                              View
                            </Button>
                          </div>

                          <div className="space-y-1 text-sm">
                            <div className="text-teal-700 truncate">
                              📧 {item.patient.email}
                            </div>
                            <div className="text-teal-700">
                              📱 {item.patient.mobile_number}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            {/* <Card className="border-teal-100 shadow-teal-glow overflow-hidden bg-white transition-all duration-200 hover:shadow-lg hover:scale-105 ">
              <CardHeader className="bg-teal-50 border-b border-teal-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-teal-800 flex items-center gap-2">
                    Patient List
                    <Sparkles className="h-4 w-4 text-teal-500" />
                  </CardTitle>
                  <Badge className="bg-teal-500 hover:bg-teal-600">
                    {assignments.length} Active Patients
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <Lottie animationData={Ani} loop={true} autoplay={true}  className="h-12 w-full bg-teal-100"/>
                ) : (
                  <div className="rounded-md">
                    <div className="grid grid-cols-5 bg-teal-50 p-3 text-sm font-medium text-teal-800">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Patient Id</div>
                      <div>Phone</div>
                      <div></div>
                    </div>
                    <div className="divide-y dark:divide-metro-dark-border/50 divide-teal-100">
                      {assignments.map((item) => (
                        <div 
                          key={item.id} 
                          className="grid grid-cols-5 p-4 text-sm items-center hover:bg-teal-50/50 transition-colors"
                        >
                          <div className="font-medium text-teal-800">
                            {item.patient.name}
                          </div>
                          <div className="text-teal-700">{item.patient.email}</div>
                          <div className="text-teal-700">{item.patient.patient_id}</div>
                          <div className="text-teal-700">{item.patient.mobile_number}</div>
                          <div className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                              onClick={() => handleViewProfile(item)}
                            >
                              View Profile
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card> */}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow bg-white">
              <CardHeader className="bg-teal-50 border-b border-teal-100">
                <CardTitle className="text-teal-800">Weekly Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <SeniorSchedulTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow bg-white">
              <CardHeader className="bg-teal-50 border-b border-teal-100">
                <CardTitle className="text-teal-800">
                  Patient Assessments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 p-2">
                  <Skeleton className="h-[200px] w-full bg-teal-50" />
                  <AssesmentSeniorTab patientId={patientId} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow bg-white">
              <CardHeader className="bg-teal-50 border-b border-teal-100">
                <CardTitle className="text-teal-800">
                  AI Insights & Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* <div className="grid gap-4 p-2">
                  <Skeleton className="h-[200px] w-full bg-teal-50" />
                </div> */}
                <AllReportDoctorList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="Teamcommunication" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow bg-white">
              <CardHeader className="bg-teal-50 border-b border-teal-100">
                <CardTitle className="text-teal-800 flex items-center gap-2">
                  Team communication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TeamCommunicationTab />
              </CardContent>
            </Card>
          </TabsContent>
            <TabsContent value="appoinment" className="space-y-6">
                    <PatientAppoinmentList/>
                    </TabsContent>
        </Tabs>
      </div>

      {/* Patient Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-teal-800">
              Patient Details
            </DialogTitle>
            <DialogClose className="absolute right-4 top-4">
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-6">
              {/* Patient Basic Information */}
              <Card className="border-teal-100">
                <CardHeader className="bg-teal-50">
                  <CardTitle className="text-teal-800 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-gray-700">Name:</span>
                        <span className="text-gray-900">
                          {selectedPatient.patient.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IdCard className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-gray-700">
                          Patient ID:
                        </span>
                        <span className="text-gray-900">
                          {selectedPatient.patient.patient_id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-gray-700">
                          Email:
                        </span>
                        <span className="text-gray-900">
                          {selectedPatient.patient.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-gray-700">
                          Phone:
                        </span>
                        <span className="text-gray-900">
                          {selectedPatient.patient.mobile_number}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-gray-700">Age:</span>
                        <span className="text-gray-900">
                          {selectedPatient.patient.age}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-gray-700">
                          Gender:
                        </span>
                        <span className="text-gray-900">
                          {selectedPatient.patient.gender}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-gray-700">
                          Occupation:
                        </span>
                        <span className="text-gray-900">
                          {selectedPatient.patient.occupation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Book className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-gray-700">
                          Education:
                        </span>
                        <span className="text-gray-900">
                          {selectedPatient.patient.education}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-gray-700">
                          Address:
                        </span>
                        <span className="text-gray-900">
                          {selectedPatient.patient.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        <span className="font-medium text-gray-700">
                          Assigned:
                        </span>
                        <span className="text-gray-900">
                          {formatDate(selectedPatient.assigned_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Doctor Assessment Section */}
              <Card className="border-teal-100">
                <CardHeader className="bg-teal-50">
                  <CardTitle className="text-teal-800 flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Doctor Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Label
                      htmlFor="assessment"
                      className="text-base font-medium text-gray-700"
                    >
                      Add/Update Assessment
                    </Label>
                    <Textarea
                      id="assessment"
                      value={assessment}
                      onChange={(e) => setAssessment(e.target.value)}
                      placeholder="Enter your assessment, observations, or treatment notes..."
                      className="min-h-32 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveAssessment}
                        disabled={savingAssessment}
                        className="bg-teal-500 hover:bg-teal-600 text-white"
                      >
                        {savingAssessment ? "Saving..." : "Save Assessment"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Summary Section (if available) */}
              {selectedPatient.ai_summary && (
                <Card className="border-teal-100">
                  <CardHeader className="bg-teal-50">
                    <CardTitle className="text-teal-800 flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      AI Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {selectedPatient.ai_summary.patient_report && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Patient Report:
                          </h4>
                          <p className="text-gray-600">
                            {JSON.stringify(
                              selectedPatient.ai_summary.patient_report
                            )}
                          </p>
                        </div>
                      )}
                      {selectedPatient.ai_summary.therapist_report && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">
                            Therapist Report:
                          </h4>
                          <p className="text-gray-600">
                            {JSON.stringify(
                              selectedPatient.ai_summary.therapist_report
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* <VoiceAssistant /> */}
    </div>
  );
};

export default SeniorpsychologistDashboard;
