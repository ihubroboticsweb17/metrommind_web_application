
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Phone, PhoneCall, X } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSheetOpenChange = async (open: boolean) => {
    setIsSheetOpen(open);
    if (open) {
      setIsLoading(true);
      try {
        const response = await AvailableDoctorsList();
        if (response.status === "ok") {
          setDoctorList(response.data);
        }
      } catch (error) {
        console.error("Error loading doctor list", error);
        toast({
          title: "Error",
          description: "Failed to load doctor list",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCallDoctor = async (doctor: Doctor) => {
    try {
      // Option 1: Direct phone call using tel: protocol
      if (doctor.mobile_number) {
        // This will open the device's default calling app
        window.location.href = `tel:${doctor.mobile_number}`;
        
        toast({
          title: "Redirecting to Phone",
          description: `Opening dialer for Dr. ${doctor.name}`,
          className: "gap-6 ml-4 mr-2",
        });
      }

      // Option 2: If you have a calling API service
      // const callResponse = await DoctorCallMakeList({
      //   doctor_id: doctor.doctor_id,
      //   call_id: doctor.call_id
      // });
      
      // if (callResponse.status === "ok") {
      //   toast({
      //     title: "Call Initiated",
      //     description: `Connecting to Dr. ${doctor.name}`,
      //   });
      // }

    } catch (error) {
      console.error("Error initiating call", error);
      toast({
        title: "Call Failed",
        description: "Unable to initiate call. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCallOpen = () => {
    setIsSheetOpen(true);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <button
          onClick={handleCallOpen}
          className="w-9 h-9 bg-teal-500 text-white rounded-full flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <Phone className="h-5 w-5 text-white" />
        </button>
      </SheetTrigger>
      
      <SheetContent className="w-[400px] sm:max-w-md flex flex-col">
        {/* Fixed Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <h2 className="text-xl text-teal-600 font-semibold">
            Available Doctors
          </h2>
          {/* <button
            onClick={() => setIsSheetOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </button> */}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="space-y-3 pr-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                <span className="ml-2 text-teal-600">Loading doctors...</span>
              </div>
            ) : doctorList.length === 0 ? (
              <div className="text-center py-8">
                <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-teal-500 text-lg">No doctors available.</p>
                <p className="text-gray-400 text-sm mt-2">Please try again later.</p>
              </div>
            ) : (
              doctorList.map((doctor) => (
                <div
                  key={doctor.call_id}
                  className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-teal-50 cursor-pointer transition-colors duration-200 group"
                  onClick={() => handleCallDoctor(doctor)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-teal-600 truncate">
                      {doctor.name || doctor.doctor_name}
                    </p>
                    <p className="text-sm text-gray-500 capitalize mt-1">
                      <strong>Role:</strong> {doctor.role.replace(/_/g, " ")}
                    </p>
                    {doctor.mobile_number && (
                      <p className="text-sm text-gray-600 mt-1">
                        📞 {doctor.mobile_number}
                      </p>
                    )}
                    {doctor.is_active && (
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                        doctor.is_active === 'true' || doctor.is_active === '1' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {doctor.is_active === 'true' || doctor.is_active === '1' ? 'Active' : 'Inactive'}
                      </span>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <PhoneCall className="text-green-600 group-hover:text-green-700 transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fixed Footer (Optional) */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            Tap on a doctor to initiate a call
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DoctorCallList;