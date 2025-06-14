// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/layout/Navbar";
// import { useToast } from "@/hooks/use-toast";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Users,
//   Calendar,
//   Brain,
//   ClipboardList,
//   Search,
//   Bell,
//   Settings,
//   Sparkles,
//   Plus,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Input } from "@/components/ui/input";

// import StatsCard from "@/components/dashboard/StatsCard";
// import DashboardHeader from "@/components/dashboard/DashboardHeader";
// import axios from "axios";
// import DoctorAsgPatientList from "@/components/dashboard/tabs/DoctorAsgPatientList";
// import { AssignDoctorPatientList, Medicineregister } from "@/models/auth";
// import SeniorSchedulTab from "@/components/dashboard/tabs/SeniorSchedulTab";

// import { Card, CardContent, CardHeader, CardTitle, CardDescription,} from "@/components/ui/card";

// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Dialog } from "@radix-ui/react-dialog";
// import BookingSlotList from "@/components/dashboard/tabs/BookingSlotList";
// import AddMedicineTab from "@/components/dashboard/tabs/AddMedicineTab";
// import MedicineListTab from "@/components/dashboard/tabs/MedicineListTab";
// import MedicineBrandTab from "@/components/dashboard/tabs/MedicineBrandTab";
// import MedicineFreqTab from "@/components/dashboard/tabs/MedicineFreqTab";
// import AddMedicineBrandTab from "@/components/dashboard/tabs/AddMedicineBrandTab";
// import AddMedicineFreqTab from "@/components/dashboard/tabs/AddMedicineFreqTab";
// import ProfileViewTab from "@/components/dashboard/tabs/ProfileViewTab";
// import AdminCountTab from "@/components/dashboard/tabs/AdminCountTab";
// import PsychiatristCountTab from "@/components/dashboard/tabs/PsychiatristCountTab";
// import AssessmentPsychiatristTab from "@/components/dashboard/tabs/AssesmentPsychiatristTab";
// import AllReportDoctorList from "@/components/dashboard/tabs/AllReportDoctorList";
// import AllReportPatientList from "@/components/dashboard/tabs/AllReportPatientList";

// interface Patient {
//   id: string;
//   name: string;
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
// interface PatientAssignment {
//   id: number;
//   doctor: any;
//   patient: Patient;
//   assigned_at: string;
//   patient_diagnosis: any[];
// }
// const PsychiatristDashboard = () => {
//   const [patients, setPatients] = useState<Patient[]>([]);
//   const [nameMedicine, setNameMedicine] = useState("");
//   const [assignments, setAssignments] = useState<PatientAssignment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isDialogFreqOpen, setIsDialogFreqOpen] = useState(false);
//   const [isDialogBrandOpen, setIsDialogBrandOpen] = useState(false);
//   const [isPatientDialogdOpen, setIsPatientDialogdOpen] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState<any>(null);
//   const [error, setError] = useState("");
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   console.log("patients", patients);
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         //  const doctorId =localStorage.getItem("user_id");
//         const data = await AssignDoctorPatientList("doctorId");
//         console.log("Fetched patients:", data);
//         setPatients(data);
//         setAssignments(data);
//       } catch (error) {
//         console.error("Error fetching patient list:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPatients();
//   }, []);
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const formData = {
//       nameMedicine,
//     };

//     console.log("Sending data:", formData);

//     // try {
//     //   const data = await Medicineregister(formData);

//     //   console.log("Registration successful!", formData);
//     //   toast({
//     //     title: "Success",
//     //     description: "Registration completed!",
//     //   });
//     // } catch (error: any) {
//     //   console.error("Registration failed:", error);

//     //   if (error.response && error.response.data) {
//     //     const errorData = error.response.data;

//     //     // Loop through all error fields and show them in toasts
//     //     for (const key in errorData) {
//     //       if (errorData.hasOwnProperty(key)) {
//     //         const messages = Array.isArray(errorData[key])
//     //           ? errorData[key].join(", ")
//     //           : errorData[key];

//     //         toast({
//     //           variant: "destructive",
//     //           title: `${key.charAt(0).toUpperCase() + key.slice(1)} Error`,
//     //           description: messages,
//     //         });
//     //       }
//     //     }
//     //   } else {
//     //     toast({
//     //       variant: "destructive",
//     //       title: "Unexpected Error",
//     //       description: "Something went wrong. Please try again later.",
//     //     });
//     //   }
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
//       <Navbar />
//       <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <DashboardHeader title="Psychiatrist Dashboard" />

//         <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
//           <DialogContent>
//             <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4  ">
//               <DialogTitle className="text-center  text-teal-800 ">
//                 Add New Medicine
//               </DialogTitle>
//             </DialogHeader>
//             <AddMedicineTab />
//           </DialogContent>
//         </Dialog>
//         <Dialog
//           open={isDialogBrandOpen}
//           onOpenChange={() => setIsDialogBrandOpen(false)}
//         >
//           <DialogContent>
//             <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4  ">
//               <DialogTitle className="text-center  text-teal-800 ">
//                 Add New Brand
//               </DialogTitle>
//             </DialogHeader>
//             <AddMedicineBrandTab />
//           </DialogContent>
//         </Dialog>
//         <Dialog open={isDialogFreqOpen} onOpenChange={setIsDialogFreqOpen}>
//           <DialogContent>
//             <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4  ">
//               <DialogTitle className="text-center  text-teal-800 ">
//                 Add New Frequency
//               </DialogTitle>
//             </DialogHeader>
//             <AddMedicineFreqTab />
//           </DialogContent>
//         </Dialog>
//         <Tabs defaultValue="patients" className="space-y-6">
//           <TabsList className="dark:bg-metro-dark-highlight bg-white p-1 rounded-xl shadow-sm border border-green-100">
//             <TabsTrigger
//               value="patients"
//               className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
//             >
//               My Patients
//             </TabsTrigger>
//             <TabsTrigger
//               value="schedule"
//               className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
//             >
//               Schedule
//             </TabsTrigger>
//             <TabsTrigger
//               value="assessments"
//               className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
//             >
//               Assessments
//             </TabsTrigger>
//             <TabsTrigger
//               value="reports"
//               className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
//             >
//               Reports
//             </TabsTrigger>
//             <TabsTrigger
//               value="medicine"
//               className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
//             >
//               Medicine 
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="patients" className="space-y-4">
//             {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 "> */}
//             <PsychiatristCountTab />
//             <Card className="border-teal-100 shadow-teal-glow overflow-hidden bg-white transition-all duration-200 hover:shadow-lg hover:scale-105 ">
//               <CardHeader className="bg-teal-50 border-b border-teal-100">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-teal-800 flex items-center gap-2">
//                     Patient List
//                     <Sparkles className="h-4 w-4 text-teal-500" />
//                   </CardTitle>
//                   <Badge className="bg-teal-500 hover:bg-teal-600">
//                     {/* {patients.length} Active Patients */}
//                   </Badge>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-0">
//                 {loading ? (
//                   <Skeleton className="h-12 w-full bg-teal-100" />
//                 ) : (
//                   <div className="rounded-md">
//                     <div className="grid grid-cols-6 bg-teal-50 p-3 text-sm font-medium text-teal-800">
//                       <div>Name</div>
//                       <div>Email</div>
//                       <div>Patient Id</div>
//                       <div>Phone</div>
//                       <div></div>
//                       <div>Action</div>
//                     </div>
//                     <div className="divide-y dark:divide-metro-dark-border/50 divide-teal-100">
//                       {assignments.map((item) => (
//                         <div
//                           key={item.id}
//                           className="grid grid-cols-5 p-4 text-sm items-center hover:bg-teal-50/50 transition-colors"
//                         >
//                           <div className="font-medium text-teal-800">
//                             {item.patient.name}
//                           </div>
//                           <div className="text-teal-700">
//                             {item.patient.email}
//                           </div>
//                           <div className="text-teal-700">
//                             {item.patient.patient_id}
//                           </div>
//                           <div className="text-teal-700">
//                             {item.patient.mobile_number}
//                           </div>
//                           {/* <div>
//                           <Badge className={`
//                             ${patient.status === "High Risk" ? "bg-red-500 hover:bg-red-600" : 
//                               patient.status === "Stable" ? "bg-green-500 hover:bg-green-600" : 
//                               patient.status === "Improving" ? "bg-blue-500 hover:bg-blue-600" : 
//                               "bg-yellow-500 hover:bg-yellow-600"}
//                               shadow-sm
//                           `}>
//                             {patient.status}
//                           </Badge>
//                         </div> */}
//                           {/* <div className="text-green-700">{patient.nextSession}</div> */}
//                           <div className="text-right">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-real-300"
//                               // onClick={() =>
//                               //   // setSelectedPatient(item.patientp)
//                               //   navigate(`/profile/${item.patient.patient_id}`)
//                               // }
//                               onClick={() =>
//                                 navigate(
//                                   `/profile/${item.patient.patient_id}`,
//                                   {
//                                     state: { patient: item },
//                                   }
//                                 )
//                               }
//                             >
//                               View 
//                             </Button>
//                             {/* <Dialog open={isPatientDialogdOpen} onOpenChange={setIsPatientDialogdOpen} >
//           <DialogContent>
//             <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4  ">
//               <DialogTitle className="text-center  text-teal-800 ">
//               Patient Details
//               </DialogTitle>
//             </DialogHeader>
// <ProfileViewTab/>
//           </DialogContent>
//         </Dialog> */}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </TabsContent>
          
//           <TabsContent value="schedule" className="space-y-6">
//             <Card className="border-teal-100 shadow-teal-glow bg-white">
//               <CardHeader className="bg-teal-50 border-b border-teal-100">
//                 <CardTitle className="text-teal-800">Weekly Schedule</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <SeniorSchedulTab />
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="assessments" className="space-y-6">
//             <Card className="border-teal-100 shadow-teal-glow bg-white">
//               <CardHeader className="bg-teal-50 border-b border-teal-100">
//                 <CardTitle className="text-teal-800">
//                   Patient Assessments
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <AssessmentPsychiatristTab patientId={patients}/>
//                 <div className="grid gap-4 p-2">
//                   <Skeleton className="h-[200px] w-full bg-teal-50" />
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="reports" className="space-y-6">
//             <Card className="border-teal-100 shadow-teal-glow bg-white">
//               <CardHeader className="bg-teal-50 border-b border-teal-100">
//                 <CardTitle className="text-teal-800">
//                   AI Insights & Reports
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                       <AllReportDoctorList />
//                       {/* <AllReportPatientList/> */}
//                 {/* <div className="grid gap-4 p-2">
//                   <Skeleton className="h-[200px] w-full bg-teal-50" />
             
//                 </div> */}
//               </CardContent>
//             </Card>
//           </TabsContent>
//           <TabsContent value="medicine" className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <Dialog>
//                 <Card className="border-teal-100 shadow-sm overflow-hidden bg-white col-span-3 md:col-span-1">
//                   <CardHeader className="bg-teal-50 border-b border-teal-100">
//                     <CardTitle className="text-teal-800 flex items-center justify-between">
//                       <span>Medicines</span>
//                       <DialogTrigger asChild>
//                         <Button
//                           size="sm"
//                           className="bg-teal-600 hover:bg-teal-700"
//                         >
//                           <Plus className="h-4 w-4 mr-1" /> Add
//                         </Button>
//                       </DialogTrigger>
//                     </CardTitle>
//                     <CardDescription className="text-teal-600">
//                       Manage your medicine database
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <MedicineListTab />
//                   </CardContent>
//                 </Card>
//                 <DialogContent>
//                   <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
//                     <DialogTitle className="text-center text-teal-800">
//                       Add New Medicine
//                     </DialogTitle>
//                   </DialogHeader>
//                   <AddMedicineTab />
//                 </DialogContent>
//               </Dialog>

//               <Dialog>
//                 <Card className="border-teal-100 shadow-sm overflow-hidden bg-white col-span-3 md:col-span-1">
//                   <CardHeader className="bg-teal-50 border-b border-teal-100">
//                     <CardTitle className="text-teal-800 flex items-center justify-between">
//                       <span>Brands</span>
//                       <DialogTrigger asChild>
//                         <Button
//                           size="sm"
//                           className="bg-teal-600 hover:bg-teal-700"
//                         >
//                           <Plus className="h-4 w-4 mr-1" /> Add
//                         </Button>
//                       </DialogTrigger>
//                     </CardTitle>
//                     <CardDescription className="text-teal-600">
//                       Manage medicine brands
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <MedicineBrandTab />
//                   </CardContent>
//                 </Card>
//                 <DialogContent>
//                   <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
//                     <DialogTitle className="text-center text-teal-800">
//                       Add New Brand
//                     </DialogTitle>
//                   </DialogHeader>
//                   <AddMedicineBrandTab />
//                 </DialogContent>
//               </Dialog>

//               <Dialog>
//                 <Card className="border-teal-100 shadow-sm overflow-hidden bg-white col-span-3 md:col-span-1">
//                   <CardHeader className="bg-teal-50 border-b border-teal-100">
//                     <CardTitle className="text-teal-800 flex items-center justify-between">
//                       <span>Frequencies</span>
//                       <DialogTrigger asChild>
//                         <Button
//                           size="sm"
//                           className="bg-teal-600 hover:bg-teal-700"
//                         >
//                           <Plus className="h-4 w-4 mr-1" /> Add
//                         </Button>
//                       </DialogTrigger>
//                     </CardTitle>
//                     <CardDescription className="text-teal-600">
//                       Manage dosage schedules
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="p-4">
//                     <MedicineFreqTab />
//                   </CardContent>
//                 </Card>
//                 <DialogContent>
//                   <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
//                     <DialogTitle className="text-center text-teal-800">
//                       Add New Frequency
//                     </DialogTitle>
//                   </DialogHeader>
//                   <AddMedicineFreqTab />
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </TabsContent>
//           {/* <TabsContent value="medicinefreq" className="space-y-2">
//             <div className="flex flex-1">Medicine Frequency List</div>
//             <div className="flex flex-1">
//               {" "}
//               <Button className="" onClick={() => setIsDialogFreqOpen(true)}>
//                 + Medicine Frequency
//               </Button>{" "}
//             </div>

//             <MedicineFreqTab />
//           </TabsContent>  */}
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default PsychiatristDashboard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";
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
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

import StatsCard from "@/components/dashboard/StatsCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import axios from "axios";
import DoctorAsgPatientList from "@/components/dashboard/tabs/DoctorAsgPatientList";
import { AssignDoctorPatientList, Medicineregister, PatientAssessmentList } from "@/models/auth";
import SeniorSchedulTab from "@/components/dashboard/tabs/SeniorSchedulTab";

import { Card, CardContent, CardHeader, CardTitle, CardDescription,} from "@/components/ui/card";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Dialog } from "@radix-ui/react-dialog";
import BookingSlotList from "@/components/dashboard/tabs/BookingSlotList";
import AddMedicineTab from "@/components/dashboard/tabs/AddMedicineTab";
import MedicineListTab from "@/components/dashboard/tabs/MedicineListTab";
import MedicineBrandTab from "@/components/dashboard/tabs/MedicineBrandTab";
import MedicineFreqTab from "@/components/dashboard/tabs/MedicineFreqTab";
import AddMedicineBrandTab from "@/components/dashboard/tabs/AddMedicineBrandTab";
import AddMedicineFreqTab from "@/components/dashboard/tabs/AddMedicineFreqTab";
import ProfileViewTab from "@/components/dashboard/tabs/ProfileViewTab";
import AdminCountTab from "@/components/dashboard/tabs/AdminCountTab";
import PsychiatristCountTab from "@/components/dashboard/tabs/PsychiatristCountTab";
import AssessmentPsychiatristTab from "@/components/dashboard/tabs/AssesmentPsychiatristTab";
import AllReportDoctorList from "@/components/dashboard/tabs/AllReportDoctorList";
import AllReportPatientList from "@/components/dashboard/tabs/AllReportPatientList";
import SeniorCountTab from "@/components/dashboard/tabs/SeniorCountTab";

import PatientAppointments from "@/components/dashboard/tabs/PatientAppointments";
import PsychiatristPatientAppointment from "@/components/dashboard/tabs/PsychiatristPatientAppointment";

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
}
const PsychiatristDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [nameMedicine, setNameMedicine] = useState("");
  const [assignments, setAssignments] = useState<PatientAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogFreqOpen, setIsDialogFreqOpen] = useState(false);
  const [isDialogBrandOpen, setIsDialogBrandOpen] = useState(false);
  const [isPatientDialogdOpen, setIsPatientDialogdOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        //  const doctorId =localStorage.getItem("user_id");
        const data = await AssignDoctorPatientList();
        console.log("Fetched patients:", data);
        setPatients(data);
        setAssignments(data);
        
        // Set the first patient as selected by default if there are any patients
        if (data.length > 0 && data[0].patient && data[0].patient.id) {
          // Convert string ID to number if needed
          const patientId = typeof data[0].patient.id === 'string' 
            ? parseInt(data[0].patient.id, 10)
            : data[0].patient.id;
            
          setSelectedPatientId(patientId);
        }
      } catch (error) {
        console.error("Error fetching patient list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      nameMedicine,
    };

    console.log("Sending data:", formData);

    // Implementation for medicine registration commented out
  };

  // Handler for patient selection in the Assessments tab
  const handleSelectPatient = (patientId: number) => {
    setSelectedPatientId(patientId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <DashboardHeader title="Psychiatrist Dashboard" />

        {/* <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
          <DialogContent>
            <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4  ">
              <DialogTitle className="text-center  text-teal-800 ">
                Add New Medicine
              </DialogTitle>
            </DialogHeader>
            <AddMedicineTab />
          </DialogContent>
        </Dialog>
        <Dialog
          open={isDialogBrandOpen}
          onOpenChange={() => setIsDialogBrandOpen(false)}
        >
          <DialogContent>
            <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4  ">
              <DialogTitle className="text-center  text-teal-800 ">
                Add New Brand
              </DialogTitle>
            </DialogHeader>
            <AddMedicineBrandTab />
          </DialogContent>
        </Dialog>
        <Dialog open={isDialogFreqOpen} onOpenChange={setIsDialogFreqOpen}>
          <DialogContent>
            <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4  ">
              <DialogTitle className="text-center  text-teal-800 ">
                Add New Frequency
              </DialogTitle>
            </DialogHeader>
            <AddMedicineFreqTab />
          </DialogContent>
        </Dialog> */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="dark:bg-metro-dark-highlight bg-white p-1 rounded-xl shadow-sm border border-green-100 gap-1">
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
              value="reports"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Reports
            </TabsTrigger>
            {/* <TabsTrigger
              value="medicine"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Medicine 
            </TabsTrigger> */}
                <TabsTrigger
              value="appoinment"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Appointment

            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-4">
            {/* <PsychiatristCountTab /> */}
            <SeniorCountTab/>
            <Card className="border-teal-100 shadow-teal-glow overflow-hidden bg-white  ">
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
              <CardContent className="pt-4 px-3 md:px-6">
                {loading ? (
                  <Skeleton className="h-12 w-full bg-teal-100" />
                ) : (
                  <div className="rounded-md">
               
                    <div className="grid grid-cols-6 bg-teal-50 p-3 text-sm font-medium text-teal-800">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Patient Id</div>
                      <div>Phone</div>
                      <div></div>
                      <div className="text-center">Action</div>
                    </div>
                    <div className="divide-y dark:divide-metro-dark-border/50 divide-teal-100">
                      {assignments.map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-6 p-4 text-sm items-center hover:bg-teal-50/50 transition-colors"
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
                          <div></div>
                          <div className="text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-real-300"
                              onClick={() =>
                                navigate(
                                  `/profile/${item.patient.patient_id}`,
                                  {
                                    state: { patient: item },
                                  }
                                )
                              }
                            >
                              View 
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
              
                  </div>
                )}
              </CardContent>
            </Card>
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
                <div className="mb-6">
                  <h3 className="text-teal-800 mb-2 font-medium">Select Patient</h3>
                  <div className="flex flex-wrap gap-2">
                    {assignments.map((item) => (
                      <Button
                        key={item.id}
                        variant={selectedPatientId === parseInt(item.patient.id) ? "default" : "outline"}
                        size="sm"
                        className={
                          selectedPatientId === parseInt(item.patient.id)
                            ? "bg-teal-600 hover:bg-teal-700"
                            : "border-teal-200 text-teal-600 hover:bg-teal-50"
                        }
                        onClick={() => handleSelectPatient(parseInt(item.patient.id))}
                      >
                        {item.patient.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {selectedPatientId ? (
                  <AssessmentPsychiatristTab patientId={selectedPatientId} />
                ) : (
                  <div className="text-center py-8 text-teal-600">
                    Please select a patient to view their assessments
                  </div>
                )}
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
                <AllReportDoctorList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appoinment" className="space-y-6">
            <PsychiatristPatientAppointment/>
   
    {/* <PsychiatristPatientAppointment/> */}
          </TabsContent>
          
          <TabsContent value="medicine" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* <Dialog>
                <Card className="border-teal-100 shadow-sm overflow-hidden bg-white col-span-3 md:col-span-1">
                  <CardHeader className="bg-teal-50 border-b border-teal-100">
                    <CardTitle className="text-teal-800 flex items-center justify-between">
                      <span>Medicines</span>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </DialogTrigger>
                    </CardTitle>
                    <CardDescription className="text-teal-600">
                      Manage your medicine database
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <MedicineListTab />
                  </CardContent>
                </Card>
                <DialogContent>
                  <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
                    <DialogTitle className="text-center text-teal-800">
                      Add New Medicine
                    </DialogTitle>
                  </DialogHeader>
                  <AddMedicineTab />
                </DialogContent>
              </Dialog>

              <Dialog>
                <Card className="border-teal-100 shadow-sm overflow-hidden bg-white col-span-3 md:col-span-1">
                  <CardHeader className="bg-teal-50 border-b border-teal-100">
                    <CardTitle className="text-teal-800 flex items-center justify-between">
                      <span>Brands</span>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </DialogTrigger>
                    </CardTitle>
                    <CardDescription className="text-teal-600">
                      Manage medicine brands
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <MedicineBrandTab />
                  </CardContent>
                </Card>
                <DialogContent>
                  <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
                    <DialogTitle className="text-center text-teal-800">
                      Add New Brand
                    </DialogTitle>
                  </DialogHeader>
                  <AddMedicineBrandTab />
                </DialogContent>
              </Dialog> */}

              {/* <Dialog>
                <Card className="border-teal-100 shadow-sm overflow-hidden bg-white col-span-3 md:col-span-1">
                  <CardHeader className="bg-teal-50 border-b border-teal-100">
                    <CardTitle className="text-teal-800 flex items-center justify-between">
                      <span>Frequencies</span>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </DialogTrigger>
                    </CardTitle>
                    <CardDescription className="text-teal-600">
                      Manage dosage schedules
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <MedicineFreqTab />
                  </CardContent>
                </Card>
                <DialogContent>
                  <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
                    <DialogTitle className="text-center text-teal-800">
                      Add New Frequency
                    </DialogTitle>
                  </DialogHeader>
                  <AddMedicineFreqTab />
                </DialogContent>
              </Dialog> */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PsychiatristDashboard;