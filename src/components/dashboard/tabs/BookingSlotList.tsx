
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "@/App";
// import { fetchDoctorSlots, SlotBookedList } from "@/models/auth";
// import { Dialog } from "@radix-ui/react-dialog";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";

// interface Booking {
//   id: number;
//   name: string;
//   date: string;
//   from_time: string;
//   to_time: string;
//   doctor_details: {
//     id: string;
//     name: string;
//     email: string;
//     mobile_number: string;
//   };
// }

// const BookingSlotList = () => {
//   const [isDialogViewOpen, setIsDialogViewOpen] = useState(false);
//   const { toast } = useToast();
//   const { theme } = useTheme();
//   const [error, setError] = useState("");
//   const [isOpenSl, setIsOpenSl] = useState(false);
//   const [slotListData, setSlotListData] = useState<Booking[]>([]);
//   const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
//    const [isMobile, setIsMobile] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//       const [searchTerm, setSearchTerm] = useState("");
//       const [currentPage, setCurrentPage] = useState(1);
//       const itemsPerPage = 5;
//   const [selectedDoctor, setSelectedDoctor] = useState<{
//     name: string;
//     date: string;
//   } | null>(null);
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkIfMobile();

//     window.addEventListener("resize", checkIfMobile);

//     return () => {
//       window.removeEventListener("resize", checkIfMobile);
//     };
//   }, []);
//   useEffect(() => {
//     const fetchSlotList = async () => {
//       try {
//         setLoading(true);
//         const data = await SlotBookedList();
//         setSlotListData(data);
//       } catch (err) {
//         setError("Failed to load doctor slots");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSlotList();
//   }, []);

//   const openOtherSlots = async (doctorName: string, date: string) => {
//     try {
//       setSelectedDoctor({ name: doctorName, date });

//       // Find the doctor ID from the main list
//       const selectedSlot = slotListData.find(
//         (s) => s.doctor_details.name === doctorName && s.date === date
//       );
//       if (!selectedSlot) return;

//       setSelectedDoctorId(selectedSlot.doctor_details.id);
//       setIsOpenSl(true);
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Failed to fetch other slots",
//       });
//     }
//   };

//   const getUniqueDoctorSlots = (slots: Booking[]) => {
//     const seen = new Set();
//     return slots.filter((slot) => {
//       if (seen.has(slot.doctor_details.id)) return false;
//       seen.add(slot.doctor_details.id);
//       return true;
//     });
//   };

//   const filteredSlots = slotListData.filter(
//     (slot) => slot.doctor_details.id === selectedDoctorId 
  
//   );
// const filteredData = getUniqueDoctorSlots(slotListData).filter((slot) =>
//   slot.doctor_details.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//    slot.doctor_details.id.toString().includes(searchTerm.toLowerCase()) ||
//     slot.date.toString().includes(searchTerm.toLowerCase())
// );

// const totalItems = filteredData.length;
// const totalPages = Math.ceil(totalItems / itemsPerPage);

// const paginatedData = filteredData.slice(
//   (currentPage - 1) * itemsPerPage,
//   currentPage * itemsPerPage
// );
//   return (
//     <Card className="shadow-sm border-teal-100">
//       <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100 p-4 md:p-6">
//         <div
//         className={`flex ${
//           isMobile ? "flex-col gap-3" : "justify-between items-center"
//         }`}
//         ></div>
//         <CardTitle className="text-teal-800 text-lg">Slot List</CardTitle>
//         <CardDescription className="text-teal-600">
//           Total doctors: {slotListData.length}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="pt-4 px-3 md:px-6">
//         <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-4">
//           <div className="relative w-full sm:w-64">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-500" />
//             {/* <Input
//               type="text"
//               placeholder="Search slot..."
//               className="pl-9 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
//               value={searchQuery}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             /> */}
//               <Input
//                             type="text"
//                             placeholder="Search Slot"
//                             className="pl-9  border-teal-200 focus:border-teal-500 focus:ring-teal-500"
//                             value={searchTerm}
//                             onChange={(e) => {
//                               setSearchTerm(e.target.value);
//                               setCurrentPage(1); 
//                             }}
//                           />
//           </div>
//         </div>
//         <div className="rounded-md">
//           <div className="grid grid-cols-5 bg-teal-50 p-3 text-sm font-medium text-green-800">
//             <div>Name</div>
//             <div>Date</div>
//             <div>From Time</div>
//             <div>To Time</div>
//             <div  className="text-center">Action</div>
//           </div>

//           <div className="divide-y dark:divide-metro-dark-border/50 divide-green-100">
//             {getUniqueDoctorSlots(slotListData).map((slot) => (
//               <div
//                 key={slot.id}
//                 className="grid grid-cols-5 p-4 text-sm items-center hover:bg-green-50/50 transition-colors"
//               >
//                 <div className="font-medium text-green-800">
//                   {slot.doctor_details.name}
//                 </div>
//                 <div className="font-medium text-green-700">{slot.date}</div>
//                 <div className="font-medium text-green-700">
//                   {slot.from_time}
//                 </div>
//                 <div className="font-medium text-green-700">{slot.to_time}</div>
//                 <div className="text-center">
//                   <Button
//                     variant="outline"
//                     onClick={() =>
//                       openOtherSlots(slot.doctor_details.name, slot.date)
//                     }
//                     size="sm"
//                     className="bg-teal-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
//                   >
//                     Other slot
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Dialog for other slots */}
//           <Dialog open={isOpenSl} onOpenChange={setIsOpenSl}>
//             <DialogContent className="sm:max-w-md ">
//               <DialogHeader>
//                 <DialogTitle className="text-center text-teal-800">
//                   Other Slots by Doctor
//                 </DialogTitle>
//               </DialogHeader>

//               <div className="mt-4 space-y-2 mr-4 overflow-y-auto max-h-96 pr-1">
//                 {filteredSlots.length > 0 ? (
//                   filteredSlots.map((slot) => (
//                     <div
//                       key={slot.id}
//                       className="p-3 rounded-md border text-sm text-teal-700 bg-teal-50"
//                     >
//                       Date: {slot.date} <br />
//                       From: {slot.from_time} | To: {slot.to_time}
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center text-sm text-muted-foreground">
//                     No slots available
//                   </p>
//                 )}
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </CardContent>
//    <div className="flex justify-center m-4 gap-2">
//   <button
//     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//     disabled={currentPage === 1}
//     className="px-3 py-1 bg-teal-100 rounded-md disabled:opacity-50"
//   >
//     Prev
//   </button>
//   <span className="px-3 py-1">{`Page ${currentPage} of ${totalPages}`}</span>
//   <button
//     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//     disabled={currentPage === totalPages}
//      className="px-3 py-1 bg-teal-100 rounded-md disabled:opacity-50"
//   >
//     Next
//   </button>
// </div> 
//     </Card>
//   );
// };

// export default BookingSlotList;
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/App";
import { fetchDoctorSlots, SlotBookedList } from "@/models/auth";
import { Dialog } from "@radix-ui/react-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Booking {
  id: number;
  name: string;
  date: string;
  from_time: string;
  to_time: string;
  doctor_details: {
    id: string;
    name: string;
    email: string;
    mobile_number: string;
  };
}

const BookingSlotList = () => {
  const [isDialogViewOpen, setIsDialogViewOpen] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();
  const [error, setError] = useState("");
  const [isOpenSl, setIsOpenSl] = useState(false);
  const [slotListData, setSlotListData] = useState<Booking[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedDoctor, setSelectedDoctor] = useState<{
    name: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const fetchSlotList = async () => {
      try {
        setLoading(true);
        const data = await SlotBookedList();
        setSlotListData(data);
      } catch (err) {
        setError("Failed to load doctor slots");
      } finally {
        setLoading(false);
      }
    };
    fetchSlotList();
  }, []);

  const openOtherSlots = async (doctorName: string, date: string) => {
    try {
      setSelectedDoctor({ name: doctorName, date });

      const selectedSlot = slotListData.find(
        (s) => s.doctor_details.name === doctorName && s.date === date
      );
      if (!selectedSlot) return;

      setSelectedDoctorId(selectedSlot.doctor_details.id);
      setIsOpenSl(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch other slots",
      });
    }
  };

  const getUniqueDoctorSlots = (slots: Booking[]) => {
    const seen = new Set();
    return slots.filter((slot) => {
      if (seen.has(slot.doctor_details.id)) return false;
      seen.add(slot.doctor_details.id);
      return true;
    });
  };

  const filteredData = getUniqueDoctorSlots(slotListData).filter((slot) =>
    slot.doctor_details.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slot.doctor_details.id.toString().includes(searchTerm.toLowerCase()) ||
    slot.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSlots = slotListData.filter(
    (slot) => slot.doctor_details.id === selectedDoctorId
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="shadow-sm border-teal-100">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100 p-4 md:p-6">
        <div
          className={`flex ${isMobile ? "flex-col gap-3" : "justify-between items-center"}`}
        ></div>
        <CardTitle className="text-teal-800 text-lg">Slot List</CardTitle>
        <CardDescription className="text-teal-600">
          Total results: {filteredData.length}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4 px-3 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-500" />
            <Input
              type="text"
              placeholder="Search Slot"
              className="pl-9 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to first page
              }}
            />
          </div>
        </div>

        <div className="rounded-md">
          <div className="grid grid-cols-5 bg-teal-50 p-3 text-sm font-medium text-green-800">
            <div>Name</div>
            <div>Date</div>
            <div>From Time</div>
            <div>To Time</div>
            <div className="text-center">Action</div>
          </div>

          <div className="divide-y divide-green-100">
            {paginatedData.map((slot) => (
              <div
                key={slot.id}
                className="grid grid-cols-5 p-4 text-sm items-center hover:bg-green-50/50 transition-colors"
              >
                <div className="font-medium text-green-800">{slot.doctor_details.name}</div>
                <div className="font-medium text-green-700">{slot.date}</div>
                <div className="font-medium text-green-700">{slot.from_time}</div>
                <div className="font-medium text-green-700">{slot.to_time}</div>
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => openOtherSlots(slot.doctor_details.name, slot.date)}
                    size="sm"
                    className="bg-teal-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                  >
                    Other slot
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Dialog for other slots */}
          <Dialog open={isOpenSl} onOpenChange={setIsOpenSl}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-teal-800">
                  Other Slots by Doctor
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-2 mr-4 overflow-y-auto max-h-96 pr-1">
                {filteredSlots.length > 0 ? (
                  filteredSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="p-3 rounded-md border text-sm text-teal-700 bg-teal-50"
                    >
                      Date: {slot.date} <br />
                      From: {slot.from_time} | To: {slot.to_time}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-muted-foreground">
                    No slots available
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>

      <div className="flex justify-center m-4 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-teal-100 rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-teal-100 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Card>
  );
};

export default BookingSlotList;