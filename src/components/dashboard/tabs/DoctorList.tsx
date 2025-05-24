import React, { useEffect, useState } from "react";
import { useTheme } from "@/App";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AssignDoctorList, assignDoctorToPatient } from "@/models/auth";
import { useToast } from "@/hooks/use-toast";

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

interface DoctorListTabProps {
  patientId: number | null;
  onDoctorAssign: (doctor: Doctor) => void;
}

const DoctorListTab: React.FC<DoctorListTabProps> = ({ patientId, onDoctorAssign }) => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [assignedDoctor, setAssignedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (patientId) {
      console.log("Assigning doctor to patient ID:", patientId);
    }
  }, [patientId]);

  useEffect(() => {
    const fetchAssDoctorlist = async () => {
      try {
        setLoading(true);
        const data = await AssignDoctorList();
        console.log("DoctorList@", data);
        setDoctorList(data);
      } catch (err) {
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchAssDoctorlist();
  }, []);

  const handleAssignDoctor = async (doctorId: number) => {
    try {
      const res = await assignDoctorToPatient(doctorId, patientId);
      const assignedDoctor = doctorList.find((doc) => doc.id === doctorId);
      
      if (assignedDoctor) {
        onDoctorAssign(assignedDoctor);
        setAssignedDoctor(assignedDoctor);
      }
      
      toast({
        title: "Success",
        description: "Doctor assigned successfully!",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to assign doctor!",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
    
      
      <div className="overflow-y-auto max-h-96 pr-1">
        {doctorList.length === 0 ? (
          <p className="text-center text-gray-500">No doctors available</p>
        ) : (
          doctorList.map((dr, i) => (
            <div 
              key={dr.id}
              className={`mb-3 p-3 rounded-md flex items-center justify-between ${
                theme === "default" ? "bg-gray-800" : "bg-gray-100"
              } ${
                assignedDoctor?.id === dr.id ? "border-2 border-teal-500" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-teal-100 text-teal-800">
                    {dr.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{dr.name}</h3>
                  <p className="text-sm text-gray-500">{dr.role}</p>
                </div>
              </div>
              
              <button
                onClick={() => handleAssignDoctor(dr.id)}
                disabled={assignedDoctor?.id === dr.id}
                className={`text-white text-sm px-3 py-1 rounded-md transition-colors ${
                  assignedDoctor?.id === dr.id 
                  ? "bg-green-500 cursor-default" 
                  : "bg-teal-500 hover:bg-teal-600"
                }`}
              >
                {assignedDoctor?.id === dr.id ? "Assigned" : "Assign"}
              </button>
            </div>
          ))
        )}
      </div>
      
      {patientId && (
        <div className="mt-4 text-sm text-center text-gray-500">
          Assigning doctor to patient ID: {patientId}
        </div>
      )}
    </div>
  );
};

export default DoctorListTab;