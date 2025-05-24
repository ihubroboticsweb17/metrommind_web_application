import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Phone, PhoneCall } from "lucide-react";
import { AvailableDoctorsList, DoctorCallMakeList } from "@/models/auth";

interface Doctor {
  id: string;
  name: string;
  call_id: number;
  doctor_id: number;
  doctor_name: string;
  role: string;
  is_active: string;
  mobile_number: string;
}

const DoctorCallList = () => {
  const { toast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);

  const handleSheetOpenChange = async (open: boolean) => {
    setIsSheetOpen(open);
    if (open) {
      try {
        // const response = await DoctorCallMakeList (); // Optionally pass token

        const response = await AvailableDoctorsList();
        if (response.status === "ok") {
          setDoctorList(response.data);
        }
      } catch (error) {
        console.error("Error loading doctor list", error);
      }
    }
  };

  const handleCallDoctor = (doctor: Doctor) => {
    // Replace with your actual call logic
    // alert(`Calling Dr. ${doctor.doctor_name} (ID: ${doctor.doctor_id})`);
    toast({
      title: "`Calling...",
      description: `Calling Dr. ${doctor.name} (ID: ${doctor.id})`,
      className: "gap-6 ml-4 mr-2",
    });
  };
  const handleCallOpen = () => {
    setIsSheetOpen(true);
  };
  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        {/* <button className="text-blue-600 underline">Doctor Call List</button> */}
        <button
          onClick={handleCallOpen}
          className="w-9 h-9 bg-teal-500 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <Phone className="h-5 w-5 text-teal-800" />
          {isSheetOpen && <DoctorCallList />}
        </button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-md">
        <h2 className="text-xl text-teal-600 font-semibold mb-4 ">
          Available Doctors
        </h2>
        <div className="space-y-4">
          {doctorList.length === 0 ? (
            <p className="text-teal-500">No doctors available.</p>
          ) : (
            doctorList.map((doctor) => (
              <div
                key={doctor.call_id}
                className="flex items-center justify-between p-3 border rounded shadow-sm hover:bg-teal-50 cursor-pointer"
                onClick={() => handleCallDoctor(doctor)}
              >
                <div>
                  <p className="font-medium  text-teal-500 ">{doctor.name}</p>
                  <p className="text-sm text-gray-400 capitalize">
                    <strong>Role:</strong>
                    {doctor.role.replace(/_/g, " ")}
                  </p>
                   <p className="text-sm text-gray-400 capitalize">
                    {doctor.mobile_number}
                   </p>
                </div>
                <PhoneCall className="text-green-600" />
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DoctorCallList;
