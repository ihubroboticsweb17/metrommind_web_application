// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Pill, Clock, Calendar, AlertCircle, CheckCircle, Droplets } from "lucide-react";

// import { useToast } from "@/hooks/use-toast";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { MedicineDetailList } from "@/models/auth";

// // Interface based on the actual API response
// interface MedicineDetail {
//   id: number;
//   brand: string | null;
//   date_time: string;
//   dosage: string;
//   frequency: string | null;
//   is_active: boolean;
//   medicine: string | null;
//   patient: number;
//   period: number;
//   quantity: number;
//   remarks: string;
//   route: string;
//   strength: string;
//   uom: string;
// }

// const MedicineTab = ({ theme = "green" }) => {
//   const [medicines, setMedicines] = useState<MedicineDetail[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       try {
//         setIsLoading(true);
//         const data = await MedicineDetailList();
//         console.log("data",data.data)
//         setMedicines(data.data);
//       } catch (error) {
//         console.error("Error fetching medicine list:", error);
//         toast({
//           title: "Error",
//           description: "Failed to load medicine details",
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };
//  console.log("data",medicines)
//     fetchMedicines();
//   }, [toast]);

//   const getThemeClasses = () => {
//     switch (theme) {
//       case "royal":
//         return "bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-lg hover:shadow-purple-300";
//       case "ocean":
//         return "bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg hover:shadow-blue-300";
//       case "emerald":
//         return "bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 shadow-lg hover:shadow-emerald-300";
//       case "sunset":
//         return "bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 shadow-lg hover:shadow-orange-300";
//       case "pink":
//         return "bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 shadow-lg hover:shadow-pink-300";
//       case "green":
//         return "bg-gradient-to-br from-teal-50 to-green-50 border-2 border-teal-200 shadow-lg hover:shadow-teal-300";
//       default:
//         return "bg-white border-2 border-gray-200 shadow-lg";
//     }
//   };

//   const renderSkeletonLoaders = () => {
//     return Array(3)
//       .fill(0)
//       .map((_, index) => (
//         <div key={index} className="bg-white/80 rounded-lg p-4 shadow-sm border border-gray-100">
//           <div className="flex justify-between items-start">
//             <div className="space-y-2 w-full">
//               <Skeleton className="h-6 w-2/3" />
//               <Skeleton className="h-4 w-1/2" />
//               <div className="flex gap-2 mt-3">
//                 <Skeleton className="h-4 w-20" />
//                 <Skeleton className="h-4 w-24" />
//               </div>
//               <div className="mt-2">
//                 <Skeleton className="h-16 w-full" />
//               </div>
//             </div>
//             <Skeleton className="h-6 w-20" />
//           </div>
//         </div>
//       ));
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Group medicines by active status
//   const sortMedicines = () => {
//     // Show active medicines first
//     return [...medicines].sort((a, b) => {
//       if (a.is_active && !b.is_active) return -1;
//       if (!a.is_active && b.is_active) return 1;
//       return 0;
//     });
//   };

//   return (
//     <Card className={`h-fit ${getThemeClasses()}`}>
//       <CardHeader className="pb-3">
//         <CardTitle className="text-xl flex items-center text-gray-800">
//           <Pill className="w-5 h-5 mr-2 text-teal-600" />
//           Prescribed Medications
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {isLoading ? (
//           <div className="space-y-4">{renderSkeletonLoaders()}</div>
//         ) : medicines.length === 0 ? (
//           <div className="text-center py-8 text-gray-500">
//             No medications prescribed at this time
//           </div>
//         ) : (
//           <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
//             {sortMedicines().map((medicine) => (
//               <div
//                 key={medicine.id}
//                 className="bg-white/80 rounded-lg p-4 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
//               >
//                 <div className="flex justify-between items-start">
//                   <h4 className="font-semibold text-gray-800">
//                     {medicine.brand || medicine.medicine || `Medication #${medicine.id}`}
//                   </h4>
//                   <Badge 
//                     className={medicine.is_active 
//                       ? "bg-green-100 text-green-800 border border-green-300 hover:bg-green-200"
//                       : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
//                     }
//                   >
//                     {medicine.is_active 
//                       ? <><CheckCircle className="w-3 h-3 mr-1" /> Active</>
//                       : <><AlertCircle className="w-3 h-3 mr-1" /> Inactive</>
//                     }
//                   </Badge>
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 text-sm text-gray-600">
//                   <div className="bg-gray-50 rounded-md p-2">
//                     <span className="text-xs text-gray-500 block">Strength:</span>
//                     <span className="font-medium">{medicine.strength}</span>
//                   </div>
                  
//                   <div className="bg-gray-50 rounded-md p-2">
//                     <span className="text-xs text-gray-500 block">Dosage:</span>
//                     <span className="font-medium">{medicine.dosage}</span>
//                   </div>
                  
//                   <div className="bg-gray-50 rounded-md p-2">
//                     <span className="text-xs text-gray-500 block">Quantity:</span>
//                     <span className="font-medium">{medicine.quantity} {medicine.uom}</span>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-x-4 mt-3 text-xs text-gray-500">
//                   <div className="flex items-center">
//                     <Calendar className="w-3 h-3 mr-1" />
//                     Prescribed: {formatDate(medicine.date_time)}
//                   </div>
                  
//                   <div className="flex items-center">
//                     <Clock className="w-3 h-3 mr-1" />
//                     Period: {medicine.period} {medicine.period === 1 ? 'day' : 'days'}
//                   </div>
                  
//                   <div className="flex items-center">
//                     <Droplets className="w-3 h-3 mr-1" />
//                     Route: {medicine.route}
//                   </div>
//                 </div>

//                 {medicine.remarks && (
//                   <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm text-gray-700 border-l-2 border-teal-400">
//                     <p className="text-xs font-medium text-gray-500 mb-1">Remarks:</p>
//                     {medicine.remarks}
//                   </div>
//                 )}

//                 {medicine.frequency && (
//                   <div className="mt-2 text-xs text-gray-600">
//                     <span className="font-medium">Frequency:</span> {medicine.frequency}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// export default MedicineTab;
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Clock, Calendar, AlertCircle, CheckCircle, Droplets, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MedicineDetailList } from "@/models/auth";
import { Input } from "@/components/ui/input";

// Interface based on the actual API response
interface MedicineDetail {
  id: number;
  brand: string | null;
  date_time: string;
  dosage: string;
  frequency: string | null;
  is_active: boolean;
  medicine: string | null;
  patient: number;
  period: number;
  quantity: number;
  remarks: string;
  route: string;
  strength: string;
  uom: string;
}

const MedicineTable = ({ theme = "green" }) => {
  const [medicines, setMedicines] = useState<MedicineDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const itemsPerPage = 5;
  const { toast } = useToast();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setIsLoading(true);
        const data = await MedicineDetailList();
        setMedicines(data.data);
      } catch (error) {
        console.error("Error fetching medicine list:", error);
        toast({
          title: "Error",
          description: "Failed to load medicine details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicines();
  }, [toast]);

  const getThemeClasses = () => {
    switch (theme) {
      case "royal":
        return "bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-lg hover:shadow-purple-300";
      case "ocean":
        return "bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg hover:shadow-blue-300";
      case "emerald":
        return "bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 shadow-lg hover:shadow-emerald-300";
      case "sunset":
        return "bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 shadow-lg hover:shadow-orange-300";
      case "pink":
        return "bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 shadow-lg hover:shadow-pink-300";
      case "green":
        return "bg-gradient-to-br from-teal-50 to-green-50 border-2 border-teal-200 shadow-lg hover:shadow-teal-300";
      default:
        return "bg-white border-2 border-gray-200 shadow-lg";
    }
  };

  const renderSkeletonLoaders = () => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <tr key={index} className="border-b border-gray-100">
          <td colSpan={5} className="p-4">
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </td>
        </tr>
      ));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Group medicines by active status
  const sortMedicines = () => {
    // Show active medicines first
    return [...medicines].sort((a, b) => {
      if (a.is_active && !b.is_active) return -1;
      if (!a.is_active && b.is_active) return 1;
      return 0;
    });
  };

  // Filter medicines based on search term
  const filteredMedicines = sortMedicines().filter(medicine => {
    const searchString = searchTerm.toLowerCase();
    const medicineName = (medicine.brand || medicine.medicine || "").toLowerCase();
    const strength = medicine.strength.toLowerCase();
    const dosage = medicine.dosage.toLowerCase();
    const route = medicine.route.toLowerCase();
    const remarks = medicine.remarks.toLowerCase();
    
    return medicineName.includes(searchString) || 
           strength.includes(searchString) || 
           dosage.includes(searchString) || 
           route.includes(searchString) || 
           remarks.includes(searchString);
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedicines = filteredMedicines.slice(startIndex, endIndex);

  const toggleExpandedRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Card className={`h-fit ${getThemeClasses()}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center text-gray-800">
          <Pill className="w-5 h-5 mr-2 text-teal-600" />
          Prescribed Medications
        </CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="pl-9 bg-white/90 border-gray-200 focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-left">Medication</th>
                  <th className="px-4 py-3 text-left">Strength</th>
                  <th className="px-4 py-3 text-left">Dosage</th>
                  <th className="px-4 py-3 text-left">Prescribed</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {renderSkeletonLoaders()}
              </tbody>
            </table>
          </div>
        ) : filteredMedicines.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-white/80 rounded-lg">
            {searchTerm ? "No medications match your search" : "No medications prescribed at this time"}
          </div>
        ) : (
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-left">Medication</th>
                    <th className="px-4 py-3 text-left">Strength</th>
                    <th className="px-4 py-3 text-left">Dosage</th>
                    <th className="px-4 py-3 text-left">Prescribed</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentMedicines.map((medicine) => (
                    <>
                      <tr 
                        key={medicine.id} 
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => toggleExpandedRow(medicine.id)}
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-800">
                            {medicine.brand || medicine.medicine || `Medication #${medicine.id}`}
                          </div>
                          {medicine.frequency && (
                            <div className="text-xs text-gray-500">
                              Frequency: {medicine.frequency}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {medicine.strength}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {medicine.dosage}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {formatDate(medicine.date_time)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge 
                            className={medicine.is_active 
                              ? "bg-green-100 text-green-800 border border-green-300 hover:bg-green-200"
                              : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                            }
                          >
                            {medicine.is_active 
                              ? <><CheckCircle className="w-3 h-3 mr-1" /> Active</>
                              : <><AlertCircle className="w-3 h-3 mr-1" /> Inactive</>
                            }
                          </Badge>
                        </td>
                      </tr>
                      {expandedRow === medicine.id && (
                        <tr>
                          <td colSpan={5} className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                              <div className="bg-white rounded-md p-2 shadow-sm">
                                <span className="text-xs text-gray-500 block">Quantity:</span>
                                <span className="font-medium">{medicine.quantity} {medicine.uom}</span>
                              </div>
                              <div className="bg-white rounded-md p-2 shadow-sm">
                                <span className="text-xs text-gray-500 block">Period:</span>
                                <span className="font-medium">{medicine.period} {medicine.period === 1 ? 'day' : 'days'}</span>
                              </div>
                              <div className="bg-white rounded-md p-2 shadow-sm">
                                <span className="text-xs text-gray-500 block">Route:</span>
                                <span className="font-medium">{medicine.route}</span>
                              </div>
                            </div>
                            
                            {medicine.remarks && (
                              <div className="p-3 bg-white rounded-md shadow-sm border-l-2 border-teal-400">
                                <p className="text-xs font-medium text-gray-500 mb-1">Remarks:</p>
                                <p className="text-sm text-gray-700">{medicine.remarks}</p>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredMedicines.length)} of {filteredMedicines.length} medicines
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-1 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-md text-sm ${
                        currentPage === page 
                          ? 'bg-teal-500 text-white'
                          : 'text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-1 rounded-md text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MedicineTable;