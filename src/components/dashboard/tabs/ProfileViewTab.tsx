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
import { DoctorAssessmenttoPatient, MedicineAssignPatientList, ObservationCreated } from "@/models/auth";
import { ArrowBigLeft, Check, Download, Eye, Plus } from "lucide-react";
import PatientMedicinesList from "./PatientMedicinesList";

interface Medicine {
  id: number;
  name: string;
}

export default function ProfileViewTab() {
  const location = useLocation();
const patientData = location.state?.patient;
console.log("$$$$$$patientData",patientData);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const [medicineList, setMedicineList] = useState<Medicine[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [observationText, setObservationText] = useState("");
  const [editText, setEditText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');


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
      diagnosis:diagnosisId,
    };

    console.log("Sending formData:", formData);

    const response = await ObservationCreated(formData);
    if (response.status === 'ok') {
      setSuccessMsg('Observation added successfully!');
      setEditText('');
      toast({
        title: "Success",
        description: "Observation added successfully.",
      });
    } else {
      console.warn("Unexpected response:", response);
      alert('Something went wrong.');
    }
  } catch (error) {
    console.error('Error adding observation:', error);
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
      <div className="flex items-center justify-between mb-4 absolute top-4 left-0 right-0 px-4">
        <Button
          variant="outline"
          className="border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-600"
          onClick={() => window.history.back()}
        >
          <ArrowBigLeft /> Back
        </Button>
      </div>
      {/* Header */}

      {/* Patient Info */}
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-2 border border-teal-100 mt-12">
        <h2 className="text-lg font-semibold text-gray-800">
          Patient Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium">Name:</p>
            <p>{patientData.patient.name}</p>
          </div>
          <div>
            <p className="font-medium">Patient ID:</p>
            <p>{patientData.patient.patient_id}</p>
          </div>
          <div>
            <p className="font-medium">Age:</p>
            <p>{patientData.patient.age}</p>
          </div>
          <div>
            <p className="font-medium">Email:</p>
            <p>{patientData.patient.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            <p>{patientData.patient.mobile_number}</p>
          </div>
          <div>
            <p className="font-medium">Disease:</p>
            <div className="flex items-center gap-2">
              <span>beb</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-red-600 text-white">
                HIGH
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Diagnosis Report */}
      {/* <div className="bg-white p-6 rounded-xl shadow-lg border border-teal-100 space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">
          AI Diagnosis Report
        </h2>

        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Summary
          </label>
          <Input id="summary" placeholder="Enter summary..." />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Download /> <span>Download</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Eye /> <span>View</span>
            </Button>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white transition">
            <Check /> Approve
          </Button>
        </div>
      </div> */}

      {/* Patient Medicines List - New Component */}
   
{/* <PatientMedicinesList/> */}
      {/* Observation */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-teal-100 space-y-2">
        <label className="font-medium">Add Observation</label>
        <Textarea 
          placeholder="Enter Observation" 
          maxLength={100} 
          value={editText}
    onChange={(e) => setEditText(e.target.value)}
    className="w-full p-2 border rounded mb-2"
    rows={4}
        />
        <p className="text-sm text-gray-500 text-right">
          {editText.length}/100
        </p>
        <button
    onClick={handleAddObservation}
    disabled={loading}
    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
  >
    {loading ? 'Saving...' : 'Add '}
  </button>
  {successMsg && (
    <p className="text-green-600 mt-2">{successMsg}</p>
  )}
      </div>
      {/* <div className="mt-6">
  <h4 className="font-semibold mb-1 text-teal-600">
    Add Observations
  </h4>
  <textarea
    value={editText}
    onChange={(e) => setEditText(e.target.value)}
    className="w-full p-2 border rounded mb-2"
    rows={4}
  />
  <button
    onClick={handleAddObservation}
    disabled={loading}
    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
  >
    {loading ? 'Saving...' : 'Add '}
  </button>
  {successMsg && (
    <p className="text-green-600 mt-2">{successMsg}</p>
  )}
</div> */}

      {/* Action Buttons */}
      
      <div className="flex gap-4 justify-end">
        <Button
          variant="outline"
          className="border-teal-600 text-teal-600 hover:scale-105 transition transform delay-50 hover:bg-teal-600 hover:text-white"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus /> Add Medicine
        </Button>
        <Button className="hover:scale-105 transition transform delay-50 bg-teal-600 hover:bg-teal-700">
          Submit
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
            <DialogTitle className="text-center text-teal-800">
              Add Medicine
            </DialogTitle>
          </DialogHeader>
          <MedicinesAddTab onSuccess={handleAddMedicineSuccess}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}