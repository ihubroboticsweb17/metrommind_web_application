import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MedicinesAddTab from "./MedicinesAddTab";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  DoctorAssessmenttoPatient,
  MedicineAssignPatientList,
  ObservationCreated,
} from "@/models/auth";
import {
  ArrowBigLeft,

} from "lucide-react";
import { 
  ArrowLeft, 
  Check, 
  Download, 
  Eye, 
  Plus, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  Pill,
  FileText,
  AlertTriangle,
  Stethoscope,
  Activity
} from "lucide-react";
import PatientMedicinesList from "./PatientMedicinesList";

import MedicineTable from "./MedicineTab";

interface Medicine {
  id: number;
  name: string;
}

export default function ProfileViewTab() {
  const location = useLocation();
  const patientData = location.state?.patient;
  console.log("$$$$$$patientData", patientData);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const [medicineList, setMedicineList] = useState<Medicine[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [observationText, setObservationText] = useState("");
  const [editText, setEditText] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchMedicineAssignList = async () => {
    try {
      setLoading(true);
      const data = await MedicineAssignPatientList();
      console.log("MedicineList@", data);
      setMedicineList(data);
    } catch (err) {
      setError("Failed to load medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicineAssignList();
  }, []);

  const handleAddMedicineSuccess = () => {
    setIsDialogOpen(false);
    // Refresh medicine list after adding a new medicine
    fetchMedicineAssignList();
    toast({
      title: "Success",
      description: "Medicine added successfully to patient",
    });
  };
  // const handleAddObservation = async () => {
  //   if (!editText.trim()) {
  //     alert("Please enter an observation.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const formData = {
  //     observations: editText,
  //     doctor:patientData.doctor.id,
  //     patient:patientData.patient.id,
  //     diagnosis:patientData.patient_diagnosis.id,
  //   };
  //     const response = await ObservationCreated(formData);
  //     // const response =await DoctorAssessmenttoPatient(formData)
  //     if (response.status === 'ok') {
  //       setSuccessMsg('Observation added successfully!');
  //       setEditText('');
  //     } else {
  //       alert('Something went wrong.');
  //        toast({
  //     title: "Success",
  //     description: "Medicine added successfully to patient",
  //   });
  //     }
  //   } catch (error) {
  //     console.error('Error adding observation:', error);
  //     toast({
  //         title: "Error",
  //         description: "Failed to load observation data.",
  //         variant: "destructive",
  //       })
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleAddObservation = async () => {
    if (!editText.trim()) {
      alert("Please enter an observation.");
      return;
    }

    // if (!patientData?.patient_diagnosis?.id) {
    //   alert("Diagnosis ID is missing. Cannot add observation.");
    //   return;
    // }
    const diagnosisId = patientData?.patient_diagnosis?.[0]?.id;

    if (!diagnosisId) {
      toast({
        title: "Error",
        description: "Diagnosis ID is missing. Cannot add observation.",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      const formData = {
        observations: editText,
        doctor: patientData?.doctor?.id,
        patient: patientData?.patient?.id,
        diagnosis: diagnosisId,
      };

      console.log("Sending formData:", formData);

      const response = await ObservationCreated(formData);
      if (response.status === "ok") {
        setSuccessMsg("Observation added successfully!");
        setEditText("");
        toast({
          title: "Success",
          description: "Observation added successfully.",
        });
      } else {
        console.warn("Unexpected response:", response);
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Error adding observation:", error);
      toast({
        title: "Error",
        description: "Failed to load observation data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-2 space-y-4 bg-gray-50 min-h-screen">
         <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Header with improved styling */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-teal-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 transition-all duration-200"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Patients
            </Button>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              <span className="font-semibold text-teal-800">Patient Profile</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Patient Information Card - Enhanced */}
        <div className="bg-white rounded-2xl shadow-xl border border-teal-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{patientData?.patient?.name || 'N/A'}</h1>
                  <p className="text-teal-100">ID: {patientData?.patient?.patient_id || 'N/A'}</p>
                </div>
              </div>
              <Button
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 transition-all duration-200"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Medicine
              </Button>
            </div>
          </div>

          {/* Patient Details Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg">
                <Calendar className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="font-semibold text-gray-800">{patientData?.patient?.age || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg">
                <Mail className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800 text-sm">{patientData?.patient?.email || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg">
                <Phone className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-800">{patientData?.patient?.mobile_number || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Disease Status */}
            <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Current Condition</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold text-gray-800">General Assessment</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 border border-red-200">
                      HIGH PRIORITY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Observation Section - Enhanced */}
        <div className="bg-white rounded-2xl shadow-xl border border-teal-100 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 text-white">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Clinical Observations</h2>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label 
                htmlFor="observation-textarea" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Add New Observation
              </label>
              <Textarea
                id="observation-textarea"
                placeholder="Enter detailed clinical observations, symptoms, or notes..."
                maxLength={500}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full min-h-[120px] border-teal-200 focus:border-teal-500 focus:ring-teal-500 rounded-lg resize-none"
                rows={5}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  {editText.length}/500 characters
                </p>
                {successMsg && (
                  <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    {successMsg}
                  </p>
                )}
              </div>
            </div>
            
            <Button
              onClick={handleAddObservation}
              disabled={loading || !editText.trim()}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium py-2.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-spin" />
                  Saving Observation...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Observation
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Action Buttons - Enhanced */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            variant="outline"
            className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-200 font-medium px-6 py-2.5"
            onClick={() => setIsDialogOpen(true)}
          >
            <Pill className="w-4 h-4 mr-2" />
            Manage Medicines
          </Button>
        </div> */}
      </div>
      {/* <div className="flex items-center justify-between mb-4 absolute top-4 left-0 right-0 px-4">
        <Button
          variant="outline"
          className="border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-600"
          onClick={() => window.history.back()}
        >
          <ArrowBigLeft /> Back
        </Button>
      </div> */}
      {/* Header */}

 
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
            <DialogTitle className="text-center text-teal-800">
              Add Prescription
            </DialogTitle>
          </DialogHeader>
          <MedicinesAddTab onSuccess={handleAddMedicineSuccess} />
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
