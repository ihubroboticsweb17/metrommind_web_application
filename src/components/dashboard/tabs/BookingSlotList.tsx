// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "@/App";
// import { fetchDoctorSlots, SlotBookedList } from "@/models/auth";
// import { Dialog } from "@radix-ui/react-dialog";
// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
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
//   const [loading, setLoading] = useState(true);
//   const [selectedDoctor, setSelectedDoctor] = useState<{
//     name: string;
//     date: string;
//   } | null>(null);
//   const [doctorSlots, setDoctorSlots] = useState<Booking[]>([]);
// console.log("doctorSlots",doctorSlots);

//   useEffect(() => {
//     const fetchSlotList = async () => {
//       try {
//         setLoading(true);
//         const data = await SlotBookedList();
//         setSlotListData(data);
//       } catch (err) {
//         setError("Failed to load doctor");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSlotList();
//   }, []);

//   // const openOtherSlots = (doctorId: string) => {
//   //   setSelectedDoctorId(doctorId);
//   //   setIsOpenSl(true);
//   // };

//   const openOtherSlots = async (doctorName: string, date: string) => {
//     try {
//       setSelectedDoctor({ name: doctorName, date });
//       const data = await fetchDoctorSlots(doctorName, date);
//       console.log("data******", data.data);
//       setDoctorSlots(data);
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

//   return (
//     <div className="rounded-md">
//       <div className="grid grid-cols-5 bg-green-50 p-3 text-sm font-medium text-green-800">
//         <div>Name</div>
//         <div>Date</div>
//         <div>From Time</div>
//         <div>To Time</div>
//       </div>
//       <div className="divide-y dark:divide-metro-dark-border/50 divide-green-100">
//         {getUniqueDoctorSlots(slotListData).map((slot) => (
//           <div
//             key={slot.id}
//             className="grid grid-cols-5 p-4 text-sm items-center hover:bg-green-50/50 transition-colors"
//           >
//             <div className="font-medium text-green-800">
//               {slot.doctor_details.name}
//             </div>
//             <div className="font-medium text-green-700">{slot.date}</div>
//             <div className="font-medium text-green-700">{slot.from_time}</div>
//             <div className="font-medium text-green-700">{slot.to_time}</div>
//             <div className="text-right">
//               <Button
//                 variant="outline"
//                 onClick={() =>
//                   openOtherSlots(slot.doctor_details.name, slot.date)
//                 }
//                 size="sm"
//                 className="bg-teal-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
//               >
//                 Other slot
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Dialog for other slots */}
//       <Dialog open={isOpenSl} onOpenChange={setIsOpenSl}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-center text-green-800">
//               Other Slots by Doctor
//             </DialogTitle>
//           </DialogHeader>

//           <div className="space-y-2">
//             {/* {filteredSlots.length > 0 ? (
//               filteredSlots.map((slot) => (
//                 <div
//                   key={slot.id}
//                   className="grid grid-cols-4 gap-4 text-sm p-2 bg-green-50 rounded"
//                 >
//                   <div>{slot.date}</div>
//                   <div>{slot.from_time}</div>
//                   <div>{slot.to_time}</div>
//                   <div className="text-right text-green-800 font-medium">
//                     {slot.doctor_details.name}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-sm text-gray-500 text-center">No other slots found.</p>
//             )} */}

//             <div className="mt-4 space-y-2">
//               {doctorSlots.length > 0 ? (
//                 doctorSlots.map((slot) => (
//                   <div
//                     key={slot.id}
//                     className="p-3 rounded-md border text-sm text-green-700 bg-green-50"
//                   >
//                     Date: {slot.date} <br />
//                     From: {slot.from_time} | To: {slot.to_time}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-sm text-muted-foreground">
//                   No slots available
//                 </p>
//               )}
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
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
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<{
    name: string;
    date: string;
  } | null>(null);

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

      // Find the doctor ID from the main list
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

  const filteredSlots = slotListData.filter(
    (slot) => slot.doctor_details.id === selectedDoctorId
  );

  return (
    <div className="rounded-md">
      <div className="grid grid-cols-5 bg-green-50 p-3 text-sm font-medium text-green-800">
        <div>Name</div>
        <div>Date</div>
        <div>From Time</div>
        <div>To Time</div>
      </div>

      <div className="divide-y dark:divide-metro-dark-border/50 divide-green-100">
        {getUniqueDoctorSlots(slotListData).map((slot) => (
          <div
            key={slot.id}
            className="grid grid-cols-5 p-4 text-sm items-center hover:bg-green-50/50 transition-colors"
          >
            <div className="font-medium text-green-800">
              {slot.doctor_details.name}
            </div>
            <div className="font-medium text-green-700">{slot.date}</div>
            <div className="font-medium text-green-700">{slot.from_time}</div>
            <div className="font-medium text-green-700">{slot.to_time}</div>
            <div className="text-right">
              <Button
                variant="outline"
                onClick={() =>
                  openOtherSlots(slot.doctor_details.name, slot.date)
                }
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-green-800">
              Other Slots by Doctor
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-2">
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="p-3 rounded-md border text-sm text-green-700 bg-green-50"
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
  );
};

export default BookingSlotList;
