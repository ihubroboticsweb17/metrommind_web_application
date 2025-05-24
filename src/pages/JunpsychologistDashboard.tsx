import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle,CardDescription} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import {
  Users,
  Calendar,
  Brain,
  ClipboardList,
  BarChart as LucideBarChart,
} from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,DialogTrigger
} from "@/components/ui/dialog";
import PatientOverview from "@/components/dashboard/tabs/PatientOverview";
import PatientListTab from "@/components/dashboard/tabs/PatientListTab";
import AienginTab from "@/components/dashboard/tabs/AienginTab";
import SettingTab from "@/components/dashboard/tabs/SettingTab";
import AddDoctorTab from "@/components/dashboard/tabs/AddDoctorTab";
import { Dialog } from "@radix-ui/react-dialog";
import BookingSlotList from "@/components/dashboard/tabs/BookingSlotList";
import SlotSelector from "@/components/dashboard/tabs/SlotSelector";
import JuniorCountTab from "@/components/dashboard/tabs/JuniorCountTab";
import AddMedicineFreqTab from "@/components/dashboard/tabs/AddMedicineFreqTab";
import MedicineFreqTab from "@/components/dashboard/tabs/MedicineFreqTab";
import AddMedicineTab from "@/components/dashboard/tabs/AddMedicineTab";
import MedicineListTab from "@/components/dashboard/tabs/MedicineListTab";
import AddMedicineBrandTab from "@/components/dashboard/tabs/AddMedicineBrandTab";
import MedicineBrandTab from "@/components/dashboard/tabs/MedicineBrandTab";
import { DoctorList } from "@/models/auth";
import AdminDoctorListTab from "@/components/dashboard/tabs/AdminDoctorListTab";
import TeamCommunicationTab from "@/components/dashboard/tabs/TeamCommunicationTab";
const JunpsychologistDashboard = () => {
  const patient = [
    {
      name: "Arun K",
      age: 30,
      id: "12345",
      summary: "AI Summary Ready",
      diagnosis: ["Generalized anxiety disorder", "Major depressive disorder"],
      alert: "Suicide risk",
    },
    {
      name: "Priya S",
      age: 28,
      id: "67890",
      summary: "AI Summary Ready",
      diagnosis: ["Adjustment disorder"],
      alert: "",
      email: "priya@gmail.com",
    },
  ];
  const [selectedPatient, setSelectedPatient] = useState(patient[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOpenSlot, setIsOpenSlot] = useState(false);
      const [refreshList, setRefreshList] = useState(false);
  const [open, setOpen] = useState(false); 
  const [openFreq, setOpenFreq] = useState(false); 
    const [openMedicine, setOpenMedicine] = useState(false); 
      const [refreshListfre, setRefreshListfre] = useState(false);
            const [refreshListBrand, setRefreshListBrand] = useState(false);
 // dialog control

  const handleSuccess = () => {
    setOpenMedicine(false);
    setRefreshList((prev) => !prev); 
  };
    const handleSuccessFre = () => {
    setOpenFreq(false);
    setRefreshListfre((prev) => !prev); 
  };
     const handleSuccessBrand = () => {
    setOpen(false);
    setRefreshListBrand((prev) => !prev); 
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <DashboardHeader
          title="Junior Psychologist Dashboard"
          buttonText="Add New Doctor"
          //   onButtonClick={() => console.log("Add new patient clicked")}
          onButtonClick={() => setIsDialogOpen(true)}
          secondButtonText="Add Slot"
          onSecondButtonClick={()=>setIsOpenSlot(true)}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md w-full max-h-[85vh] p-4 overflow-hidden">
            <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4  ">
              <DialogTitle className="text-center  text-teal-800 ">
                Add New Doctor
              </DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto p-1 space-y-3">
      <AddDoctorTab  onSuccess={() => setIsDialogOpen(false)}/>
    </div>
            {/* <AddDoctorTab /> */}
          </DialogContent>
        </Dialog>
         <Dialog open={isOpenSlot} onOpenChange={setIsOpenSlot}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-center bg-teal-50 border-b border-teal-100 p-4">
                              Create Slot
                            </DialogTitle>
                          </DialogHeader>
                      <SlotSelector />
                        </DialogContent>
                      </Dialog>

        <Tabs defaultValue="Overview" className="space-y-7">
          <TabsList className="dark:bg-metro-dark-highlight bg-white p-1 rounded-xl shadow-sm border border-teal-100 gap-2">
            <TabsTrigger
              value="Overview"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="Patientlist"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              Patient List
            </TabsTrigger>
            {/* <TabsTrigger
              value="aiengine"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              AI Engine
            </TabsTrigger> */}
            <TabsTrigger
              value="Teamcommunication"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              Team communication
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              Settings
            </TabsTrigger>
            <TabsTrigger
              value="slotList"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              Slot List
            </TabsTrigger>
            <TabsTrigger
                          value="medicine"
                          className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg  transition-all duration-200 hover:shadow-lg hover:scale-105"
                        >
                          Medicine 
                        </TabsTrigger>
          </TabsList>
          <TabsContent value="Overview" className="space-y-6">
            {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"> */}
              <JuniorCountTab/>
              {/* <StatsCard
                title="Patient Servierity"
                value="24"
                description="+2 this month"
                icon={<Users className="h-5 w-5" />}
                theme="green"
                animationDelay="0ms"
              />

              <StatsCard
                title="Active Therapist"
                value="5"
                description="Next: Alex Johnson (2:00 PM)"
                icon={<Calendar className="h-5 w-5" />}
                theme="green"
                animationDelay="100ms"
              />
              <StatsCard
                title="Monthly Sessions"
                value="7 New"
                description="Across 4 patients"
                icon={<Brain className="h-5 w-5" />}
                theme="green"
                animationDelay="200ms"
              />
              <StatsCard
                title="Enquires"
                value="3"
                description="Treatment plans needing review"
                icon={<ClipboardList className="h-5 w-5" />}
                theme="green"
                animationDelay="300ms"
              /> */}
       
            {/* <div><PatientOverview/></div> */}
            <div >
              <PatientOverview />
            </div>
          </TabsContent>
          <TabsContent value="Patientlist" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow overflow-hidden bg-white">
    
              <CardContent className="p-0 ">
                <PatientListTab />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="aiengine" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow bg-white">
              <CardHeader className="bg-teal-50 border-b border-teal-100">
                <div className="flex justify-between items-center mb-4">
                  <CardTitle className="text-teal-800 flex items-center gap-2">
                    AI Engine
                  </CardTitle>
                  {/* <button className="px-4 py-2 border rounded hover:bg-gray-100">
                    Fine-Tuning Controls
                  </button> */}
                </div>
              </CardHeader>
              <CardContent className="text-teal-800">
                <AienginTab />
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
               <TeamCommunicationTab/>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow bg-white">
              <CardHeader className="bg-teal-50 border-b border-teal-100">
                <CardTitle className="text-teal-800">Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <SettingTab />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="slotList" className="space-y-6">
            <Card className="border-teal-100 shadow-teal-glow bg-white">
              {/* <CardHeader className="bg-teal-50 border-b border-teal-100">
                <CardTitle className="text-teal-800">Slot List</CardTitle>
              </CardHeader>
              <CardContent> */}
            <BookingSlotList/>
              {/* </CardContent> */}
            </Card>
          </TabsContent>
            <TabsContent value="medicine" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Dialog open={openMedicine} onOpenChange={setOpenMedicine}>
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
                    <MedicineListTab  refreshTrigger={refreshList}/>
                  </CardContent>
                </Card>
                <DialogContent>
                  <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
                    <DialogTitle className="text-center text-teal-800">
                      Add New Medicine
                    </DialogTitle>
                  </DialogHeader>
                  <AddMedicineTab onSuccess={handleSuccess} />
                </DialogContent>
              </Dialog>

              <Dialog open={open} onOpenChange={setOpen}>
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
                    <MedicineBrandTab refreshTrigger={refreshListBrand} />
                  </CardContent>
                </Card>
                <DialogContent>
                  <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
                    <DialogTitle className="text-center text-teal-800">
                      Add New Brand
                    </DialogTitle>
                  </DialogHeader>
                  <AddMedicineBrandTab  onSuccess={handleSuccessBrand}/>
                </DialogContent>
              </Dialog>

              <Dialog open={openFreq} onOpenChange={setOpenFreq}>
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
                    <MedicineFreqTab refreshTrigger={refreshListfre}/>
                  </CardContent>
                </Card>
                <DialogContent>
                  <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
                    <DialogTitle className="text-center text-teal-800">
                      Add New Frequency
                    </DialogTitle>
                  </DialogHeader>
                  <AddMedicineFreqTab onSuccess={handleSuccessFre}/>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JunpsychologistDashboard;
