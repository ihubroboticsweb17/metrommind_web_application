// import React, { useEffect, useState } from "react";
// import { Search, Filter, ArrowUpDown, Calendar, Clock, Pill, Info, Plus, Printer, Pencil, MessageSquare } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   Dialog,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { format } from 'date-fns';
// import { MedicineDetailList } from "@/models/auth";

// // Define interfaces for data structure
// interface Medicine {
//   id: number;
//   strength: string;
//   medicine: string | null;
//   brand: string | null;
//   patient: number;
//   dosage: string;
//   uom: string;
//   route: string;
//   remarks: string;
//   period: number | null;
//   quantity: number | null;
//   is_active: boolean;
//   date_time: string;
//   frequency: number | null;
// }

// interface ApiResponse {
//   status: string;
//   message: string;
//   count: number;
//   data: Medicine[];
// }

// const MedicineListDashboard = () => {
//   const [medicines, setMedicines] = useState<Medicine[]>([]);
//   const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
//   const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [totalCount, setTotalCount] = useState(0);

//   //Mock function to simulate API call - replace with your actual API function
// // const fetchMedicineData = async () => {
// //    try {
// //      setLoading(true);
// //      // This is sample data - replace with your actual API call
// //      const response= await MedicineDetailList();
// //   console.log("response",response)
// //     setTotalCount(response.count);
// //     setMedicines(response.data);
// //     setFilteredMedicines(response.data);
// //     } catch (err) {
// //       setError("Failed to load medicine data");
// //      console.error(err);
// //     } finally {
// //       setLoading(false);
// //    }
// //  };
//  useEffect(() => {
//     const fetchMedicine = async () => {
//       try {
//         setLoading(true);
//         const data = await MedicineDetailList();
//         console.log("##########", data);
//         setMedicines(data.data);
//         setTotalCount(data.count);
//       } catch (err) {
//         setError("Failed to load Doctors.");
//        } finally {
//          setLoading(false); // stop loading
//        }
//      };

//    fetchMedicine();
//  }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const results = medicines.filter(med => 
//         (med.medicine && med.medicine.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (med.strength && med.strength.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (med.route && med.route.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (med.dosage && med.dosage.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//       setFilteredMedicines(results);
//     } else {
//       setFilteredMedicines(medicines);
//     }
//   }, [searchTerm, medicines]);

//   const formatDateTime = (dateTimeStr) => {
//     try {
//       const date = new Date(dateTimeStr);
//       return format(date, 'MMM dd, yyyy h:mm a');
//     } catch (error) {
//       return dateTimeStr;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-teal-600">Loading medicine data...</div>
//       </div>
//     );
//   }

//   // if (error) {
//   //   return (
//   //     <div className="bg-red-50 p-4 rounded-md text-red-700">
//   //       <p>{error}</p>
//   //       <Button 
//   //         onClick={fetchMedicineData} 
//   //         className="mt-2 bg-red-100 text-red-700 hover:bg-red-200"
//   //       >
//   //         Retry
//   //       </Button>
//   //     </div>
//   //   );
//   // }

//   return (
//     <Card className="shadow-sm border-teal-100">
//       <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100">
//         <div className="flex justify-between items-center">
//           <div>
//             <CardTitle className="text-teal-800 text-lg">Medicine List</CardTitle>
//             <CardDescription className="text-teal-600">
//               Total medicines: {totalCount}
//             </CardDescription>
//           </div>
//           <div className="flex gap-2">
//             <Button 
//               onClick={() => setIsAddDialogOpen(true)}
//               className="bg-teal-600 hover:bg-teal-700 text-white"
//             >
//               <Plus className="h-4 w-4 mr-1" /> Add Medicine
//             </Button>
//           </div>
//         </div>
//       </CardHeader>
      
//       <CardContent className="pt-4">
//         <div className="flex justify-between items-center mb-4">
//           <div className="relative">
//             <Search className="absolute left-2 top-2.5 h-4 w-4 text-teal-500" />
//             <Input
//               placeholder="Search medicines..."
//               className="pl-8 border-teal-200 focus:border-teal-500 w-64"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             {/* <Button variant="outline" size="sm" className="border-teal-200 text-teal-700">
//               <Filter className="h-4 w-4 mr-1" /> Filter
//             </Button>
//             <Button variant="outline" size="sm" className="border-teal-200 text-teal-700">
//               <ArrowUpDown className="h-4 w-4 mr-1" /> Sort
//             </Button> */}
//           </div>
//         </div>

//         <div className="rounded-md border border-teal-100 overflow-hidden">
//           <Table>
//             <TableHeader className="bg-teal-50">
//               <TableRow>
//                 <TableHead className="text-teal-800 font-medium">ID</TableHead>
//                 <TableHead className="text-teal-800 font-medium">Strength</TableHead>
//                 <TableHead className="text-teal-800 font-medium">Dosage</TableHead>
//                 <TableHead className="text-teal-800 font-medium">UOM</TableHead>
//                 <TableHead className="text-teal-800 font-medium">Route</TableHead>
//                 <TableHead className="text-teal-800 font-medium">Patient ID</TableHead>
//                 <TableHead className="text-teal-800 font-medium">Status</TableHead>
//                 <TableHead className="text-teal-800 font-medium text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredMedicines.length > 0 ? (
//                 filteredMedicines.map((medicine) => (
//                   <TableRow key={medicine.id} className="hover:bg-teal-50/50 transition-colors">
//                     <TableCell className="font-medium">{medicine.id}</TableCell>
//                     <TableCell>{medicine.strength}</TableCell>
//                     <TableCell>{medicine.dosage}</TableCell>
//                     <TableCell>{medicine.uom}</TableCell>
//                     <TableCell>{medicine.route}</TableCell>
//                     <TableCell>{medicine.patient}</TableCell>
//                     <TableCell>
//                       {medicine.is_active ? (
//                         <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
//                       ) : (
//                         <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>
//                       )}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
//                         onClick={() => {
//                           setSelectedMedicine(medicine);
//                           setIsDetailDialogOpen(true);
//                         }}
//                       >
//                         View Details
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={8} className="text-center py-8 text-gray-500">
//                     No medicines found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>

//       {/* Medicine Details Dialog */}
//      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
//   <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
//     <DialogHeader className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 sticky top-0 z-10">
//       <DialogTitle className="text-center text-white flex items-center justify-center text-lg">
//         <Pill className="mr-2 h-5 w-5" /> Medicine Details
//       </DialogTitle>
//     </DialogHeader>
    
//     {selectedMedicine && (
//       <div className="space-y-3 p-3">
//         {/* ID & Patient ID - Horizontal compact bar */}
//         <div className="flex gap-2 text-xs">
//           <div className="bg-gray-50 p-2 rounded-md flex-1 border-l-4 border-teal-400">
//             <p className="text-gray-500">ID</p>
//             <p className="font-medium truncate">{selectedMedicine.id}</p>
//           </div>
//           <div className="bg-gray-50 p-2 rounded-md flex-1 border-l-4 border-blue-400">
//             <p className="text-gray-500">Patient ID</p>
//             <p className="font-medium truncate">{selectedMedicine.patient}</p>
//           </div>
//         </div>
        
//         {/* Medicine Information */}
//         <div className="bg-teal-50 p-3 rounded-md border border-teal-100 shadow-sm">
//           <h3 className="font-medium text-teal-800 mb-1 flex items-center text-sm">
//             <Info className="mr-1 h-4 w-4" /> Medicine Information
//           </h3>
//           <div className="grid grid-cols-2 gap-2 text-xs">
//             <div>
//               <p className="text-gray-500">Medicine Name</p>
//               <p className="font-medium">{selectedMedicine.medicine || "Not specified"}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Brand</p>
//               <p className="font-medium">{selectedMedicine.brand || "Not specified"}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Strength</p>
//               <p className="font-medium">{selectedMedicine.strength}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">UOM</p>
//               <p className="font-medium">{selectedMedicine.uom}</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Dosage Details */}
//         <div className="bg-blue-50 p-3 rounded-md border border-blue-100 shadow-sm">
//           <h3 className="font-medium text-blue-800 mb-1 flex items-center text-sm">
//             <Pill className="mr-1 h-4 w-4" /> Dosage Details
//           </h3>
//           <div className="grid grid-cols-3 gap-2 text-xs">
//             <div>
//               <p className="text-gray-500">Dosage</p>
//               <p className="font-medium">{selectedMedicine.dosage}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Route</p>
//               <p className="font-medium">{selectedMedicine.route}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Period</p>
//               <p className="font-medium">{selectedMedicine.period || "N/A"} days</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Frequency</p>
//               <p className="font-medium">{selectedMedicine.frequency || "N/A"}</p>
//             </div>
//             <div className="col-span-2">
//               <p className="text-gray-500">Quantity</p>
//               <p className="font-medium">{selectedMedicine.quantity || "N/A"}</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Remarks with icon */}
//         <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100 shadow-sm">
//           <h3 className="font-medium text-yellow-800 mb-1 flex items-center text-sm">
//             <MessageSquare className="mr-1 h-4 w-4" /> Remarks
//           </h3>
//           <p className="text-xs bg-white p-2 rounded-md border border-yellow-50">
//             {selectedMedicine.remarks || "No remarks provided"}
//           </p>
//         </div>
        
//         {/* Created date with smaller text */}
//         <div className="flex items-center space-x-1 text-xs text-gray-500 my-1 px-1">
//           <Calendar className="h-3 w-3" />
//           <span>Created: {formatDateTime(selectedMedicine.date_time)}</span>
//         </div>
        
//         {/* <DialogFooter className="flex justify-between pt-2 border-t border-gray-100">
//           <Badge className={`text-xs ${selectedMedicine.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
//             <span className={`mr-1 inline-block w-2 h-2 rounded-full ${selectedMedicine.is_active ? "bg-green-500" : "bg-gray-500"}`}></span>
//             {selectedMedicine.is_active ? "Active" : "Inactive"}
//           </Badge>
//           <div className="flex gap-2">
//             <Button size="sm" variant="outline" className="text-xs border-teal-200 text-teal-700">
//               <Pencil className="h-3 w-3 mr-1" /> Edit
//             </Button>
//             <Button size="sm" className="text-xs bg-teal-600 hover:bg-teal-700 text-white">
//               <Printer className="h-3 w-3 mr-1" /> Print
//             </Button>
//           </div>
//         </DialogFooter> */}
//       </div>
//     )}
//   </DialogContent>
// </Dialog>
      
//       {/* Add Medicine Dialog - Placeholder structure */}
//       <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
//             <DialogTitle className="text-center text-teal-800">
//               Add New Medicine
//             </DialogTitle>
//           </DialogHeader>
//           <div className="p-4">
//             <p className="text-center text-gray-500">Add medicine form would go here</p>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default MedicineListDashboard;
import React, { useEffect, useState } from "react";
import { Search, Filter, ArrowUpDown, Calendar, Clock, Pill, Info, Plus, Printer, Pencil, MessageSquare, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import { MedicineDetailList } from "@/models/auth";
import MedicinesAddTab from "./MedicinesAddTab";

// Define interfaces for data structure
interface Medicine {
  id: number;
  strength: string;
  medicine: string | null;
  brand: string | null;
  patient: number;
  dosage: string;
  uom: string;
  route: string;
  remarks: string;
  period: number | null;
  quantity: number | null;
  is_active: boolean;
  date_time: string;
  frequency: number | null;
}

interface ApiResponse {
  status: string;
  message: string;
  count: number;
  data: Medicine[];
}

const MedicineListDashboard = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        setLoading(true);
        const data = await MedicineDetailList();
        console.log("##########", data);
        setMedicines(data.data);
        setFilteredMedicines(data.data);
        setTotalCount(data.count);
      } catch (err) {
        setError("Failed to load Doctors.");
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchMedicine();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = medicines.filter(med => 
        (med.medicine && med.medicine.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (med.strength && med.strength.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (med.route && med.route.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (med.dosage && med.dosage.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredMedicines(results);
    } else {
      setFilteredMedicines(medicines);
    }
  }, [searchTerm, medicines]);

  const formatDateTime = (dateTimeStr) => {
    try {
      const date = new Date(dateTimeStr);
      return format(date, 'MMM dd, yyyy h:mm a');
    } catch (error) {
      return dateTimeStr;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-teal-600">Loading medicine data...</div>
      </div>
    );
  }

  // Mobile view for medicine cards
  const MobileMedicineCard = ({ medicine }) => (
    <Card className="mb-4 shadow-sm border-teal-100">
      <CardHeader className="py-3 px-4 bg-gradient-to-r from-teal-50 to-teal-100">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm text-teal-800">
              {medicine.medicine || "Medicine"} - {medicine.strength}
            </CardTitle>
            <CardDescription className="text-xs text-teal-600">
              ID: {medicine.id} | Patient: {medicine.patient}
            </CardDescription>
          </div>
          <Badge className={medicine.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
            {medicine.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="py-3 px-4 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">Dosage</p>
            <p className="font-medium">{medicine.dosage}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Route</p>
            <p className="font-medium">{medicine.route}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">UOM</p>
            <p className="font-medium">{medicine.uom}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="py-2 px-4 bg-gray-50 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-teal-200 text-teal-600 hover:bg-teal-50"
          onClick={() => {
            setSelectedMedicine(medicine);
            setIsDetailDialogOpen(true);
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <Card className="shadow-sm border-teal-100">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100 p-4 md:p-6">
        <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'}`}>
          <div>
            <CardTitle className="text-teal-800 text-lg">Medicine List</CardTitle>
            <CardDescription className="text-teal-600">
              Total medicines: {totalCount}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white w-full md:w-auto"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Medicine
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 px-3 md:px-6">
        <div className={`${isMobile ? 'flex flex-col gap-3' : 'flex justify-between items-center'} mb-4`}>
          <div className={`relative ${isMobile ? 'w-full' : 'w-64'}`}>
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-teal-500" />
            <Input
              placeholder="Search medicines..."
              className="pl-8 border-teal-200 focus:border-teal-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {!isMobile && (
            <div className="flex items-center gap-2">
              {/* Filter and Sort buttons - hidden on mobile */}
            </div>
          )}
        </div>

        {isMobile ? (
          // Mobile View: Cards
          <div className="space-y-1">
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((medicine) => (
                <MobileMedicineCard key={medicine.id} medicine={medicine} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No medicines found
              </div>
            )}
          </div>
        ) : (
          // Desktop View: Table
          <div className="rounded-md border border-teal-100 overflow-hidden overflow-x-auto">
            <Table>
              <TableHeader className="bg-teal-50">
                <TableRow>
                  <TableHead className="text-teal-800 font-medium">ID</TableHead>
                  <TableHead className="text-teal-800 font-medium">Strength</TableHead>
                  <TableHead className="text-teal-800 font-medium">Dosage</TableHead>
                  <TableHead className="text-teal-800 font-medium">UOM</TableHead>
                  <TableHead className="text-teal-800 font-medium">Route</TableHead>
                  <TableHead className="text-teal-800 font-medium">Patient ID</TableHead>
                  <TableHead className="text-teal-800 font-medium">Status</TableHead>
                  <TableHead className="text-teal-800 font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.map((medicine) => (
                    <TableRow key={medicine.id} className="hover:bg-teal-50/50 transition-colors">
                      <TableCell className="font-medium">{medicine.id}</TableCell>
                      <TableCell>{medicine.strength}</TableCell>
                      <TableCell>{medicine.dosage}</TableCell>
                      <TableCell>{medicine.uom}</TableCell>
                      <TableCell>{medicine.route}</TableCell>
                      <TableCell>{medicine.patient}</TableCell>
                      <TableCell>
                        {medicine.is_active ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                          onClick={() => {
                            setSelectedMedicine(medicine);
                            setIsDetailDialogOpen(true);
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No medicines found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {/* Medicine Details Dialog - Mobile responsive */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0 w-[95vw] md:w-[600px]  mx-auto">
          <DialogHeader className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 sticky top-0 z-10">
            <DialogTitle className="text-center text-white flex items-center justify-center text-lg">
              <Pill className="mr-2 h-5 w-5" /> Medicine Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedMedicine && (
            <div className="space-y-3 p-3">
              {/* ID & Patient ID - Horizontal compact bar */}
              <div className="flex gap-2 text-xs">
                <div className="bg-gray-50 p-2 rounded-md flex-1 border-l-4 border-teal-400">
                  <p className="text-gray-500">ID</p>
                  <p className="font-medium truncate">{selectedMedicine.id}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-md flex-1 border-l-4 border-blue-400">
                  <p className="text-gray-500">Patient ID</p>
                  <p className="font-medium truncate">{selectedMedicine.patient}</p>
                </div>
              </div>
              
              {/* Medicine Information */}
              <div className="bg-teal-50 p-3 rounded-md border border-teal-100 shadow-sm">
                <h3 className="font-medium text-teal-800 mb-1 flex items-center text-sm">
                  <Info className="mr-1 h-4 w-4" /> Medicine Information
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Medicine Name</p>
                    <p className="font-medium">{selectedMedicine.medicine || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Brand</p>
                    <p className="font-medium">{selectedMedicine.brand || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Strength</p>
                    <p className="font-medium">{selectedMedicine.strength}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">UOM</p>
                    <p className="font-medium">{selectedMedicine.uom}</p>
                  </div>
                </div>
              </div>
              
              {/* Dosage Details */}
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100 shadow-sm">
                <h3 className="font-medium text-blue-800 mb-1 flex items-center text-sm">
                  <Pill className="mr-1 h-4 w-4" /> Dosage Details
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Dosage</p>
                    <p className="font-medium">{selectedMedicine.dosage}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Route</p>
                    <p className="font-medium">{selectedMedicine.route}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Period</p>
                    <p className="font-medium">{selectedMedicine.period || "N/A"} days</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Frequency</p>
                    <p className="font-medium">{selectedMedicine.frequency || "N/A"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Quantity</p>
                    <p className="font-medium">{selectedMedicine.quantity || "N/A"}</p>
                  </div>
                </div>
              </div>
              
              {/* Remarks with icon */}
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100 shadow-sm">
                <h3 className="font-medium text-yellow-800 mb-1 flex items-center text-sm">
                  <MessageSquare className="mr-1 h-4 w-4" /> Remarks
                </h3>
                <p className="text-xs bg-white p-2 rounded-md border border-yellow-50">
                  {selectedMedicine.remarks || "No remarks provided"}
                </p>
              </div>
              
              {/* Created date with smaller text */}
              <div className="flex items-center space-x-1 text-xs text-gray-500 my-1 px-1">
                <Calendar className="h-3 w-3" />
                <span>Created: {formatDateTime(selectedMedicine.date_time)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Add Medicine Dialog - Mobile responsive */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md w-[95vw] md:w-auto mx-auto">
           <MedicinesAddTab/>
          {/* <div className="p-4">
           
            <p className="text-center text-gray-500">Add medicine form would go here</p>
          </div> */}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MedicineListDashboard;