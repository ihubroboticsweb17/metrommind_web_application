// import { useState, useEffect } from "react";
// import { Search } from "lucide-react";


// const AllReportDoctorList = () => {
//   const [appointments, setAppointments] = useState([])
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//    const [data, setData] = useState([]);
//   // Fetch data using the AllReportList function
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await AllReportList();
      
//         setAppointments(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load appointments");
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, []);

//   // Filter appointments based on search term
//   const filteredAppointments = appointments.filter((appointment) => {
//     const searchString = searchTerm.toLowerCase();
//     const patientName = appointment.patient_details?.name?.toLowerCase() || "";
//     const patientId = appointment.patient_details?.patient_id_metro?.toLowerCase() || "";
//     const doctorName = appointment.doctor_details?.name?.toLowerCase() || "";
//     const date = appointment.date?.toLowerCase() || "";
    
//     return (
//       patientName.includes(searchString) ||
//       patientId.includes(searchString) ||
//       doctorName.includes(searchString) ||
//       date.includes(searchString)
//     );
//   });
  
//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  
//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
//   // Format time to 12-hour format
//   const formatTime = (time) => {
//     if (!time) return "";
//     const [hours, minutes] = time.split(":");
//     const hour = parseInt(hours);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minutes} ${ampm}`;
//   };
  
//   // Format date to more readable format
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };
  
//   if (loading) {
//     return <div className="flex justify-center items-center h-64">Loading...</div>;
//   }
  
//   if (error) {
//     return <div className="text-red-500 text-center p-4">{error}</div>;
//   }

//   return (
//     <div className="w-full px-4 py-6">
//       <h1 className="text-2xl font-bold mb-6">Patient Appointments</h1>
      
//       {/* Search Bar */}
//       <div className="relative mb-6">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//           <Search className="h-5 w-5 text-gray-400" />
//         </div>
//         <input
//           type="text"
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
//           placeholder="Search by patient name, ID, doctor, or date..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1); // Reset to first page on search
//           }}
//         />
//       </div>
      
//       {/* Desktop View - Table */}
//       <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
//         <table className="w-full text-sm text-left text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3">Patient ID</th>
//               <th scope="col" className="px-6 py-3">Patient Name</th>
//               {/* <th scope="col" className="px-6 py-3">Doctor</th> */}
//               <th scope="col" className="px-6 py-3">Date</th>
//               <th scope="col" className="px-6 py-3">Time</th>
//               <th scope="col" className="px-6 py-3">Status</th>
//               <th scope="col" className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.length > 0 ? (
//               currentItems.map((appointment) => (
//                 <tr key={appointment.id} className="bg-white border-b hover:bg-gray-50">
//                   <td className="px-6 py-4">{appointment.patient_details?.patient_id_metro}</td>
//                   <td className="px-6 py-4">{appointment.patient_details?.name}</td>
//                   {/* <td className="px-6 py-4">{appointment.doctor_details?.name}</td> */}
//                   <td className="px-6 py-4">{formatDate(appointment.date)}</td>
//                   <td className="px-6 py-4">
//                     {formatTime(appointment.slot_details?.from_time)} - {formatTime(appointment.slot_details?.to_time)}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 rounded-full text-xs ${appointment.consulted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
//                       {appointment.consulted ? "Consulted" : "Pending"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <button>View</button></td> 
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td  className="px-6 py-4 text-center">No appointments found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
      
//       {/* Mobile View - Cards */}
//       <div className="md:hidden space-y-4">
//         {currentItems.length > 0 ? (
//           currentItems.map((appointment) => (
//             <div key={appointment.id} className="bg-white p-4 rounded-lg shadow">
//               <div className="flex justify-between items-start mb-2">
//                 <div>
//                   <h3 className="font-medium">{appointment.patient_details?.name}</h3>
//                   <p className="text-sm text-gray-500">{appointment.patient_details?.patient_id_metro}</p>
//                 </div>
//                 <span className={`px-2 py-1 rounded-full text-xs ${appointment.consulted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
//                   {appointment.consulted ? "Consulted" : "Pending"}
//                 </span>
//               </div>
//               <div className="text-sm">
//                 <p><span className="font-medium">Doctor:</span> {appointment.doctor_details?.name}</p>
//                 <p><span className="font-medium">Date:</span> {formatDate(appointment.date)}</p>
//                 <p><span className="font-medium">Time:</span> {formatTime(appointment.slot_details?.from_time)} - {formatTime(appointment.slot_details?.to_time)}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="bg-white p-4 rounded-lg shadow text-center">No appointments found</div>
//         )}
//       </div>
      
//       {/* Pagination */}
//       {filteredAppointments.length > 0 && (
//         <div className="flex justify-between items-center mt-4">
//           <div className="text-sm text-gray-700">
//             Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
//             <span className="font-medium">
//               {indexOfLastItem > filteredAppointments.length ? filteredAppointments.length : indexOfLastItem}
//             </span>{" "}
//             of <span className="font-medium">{filteredAppointments.length}</span> results
//           </div>
          
//           <div className="flex space-x-1">
//             <button
//               onClick={() => paginate(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-3 py-1 rounded-md ${
//                 currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
//               }`}
//             >
//               Prev
//             </button>
            
//             {[...Array(totalPages)].map((_, index) => {
//               // Show limited page numbers with ellipsis for better UX
//               const pageNum = index + 1;
//               if (
//                 pageNum === 1 ||
//                 pageNum === totalPages ||
//                 (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
//               ) {
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => paginate(pageNum)}
//                     className={`px-3 py-1 rounded-md ${
//                       currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
//                 return <span key={pageNum} className="px-2 py-1">...</span>;
//               }
//               return null;
//             })}
            
//             <button
//               onClick={() => paginate(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-3 py-1 rounded-md ${
//                 currentPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
//               }`}
//             >
//               Next
//             </button>
//           </div>
          
//           <div className="hidden sm:block">
//             <select
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-2 py-1"
//               value={itemsPerPage}
//               onChange={(e) => {
//                 setItemsPerPage(Number(e.target.value));
//                 setCurrentPage(1); // Reset to first page when changing items per page
//               }}
//             >
//               <option value={5}>5 per page</option>
//               <option value={10}>10 per page</option>
//               <option value={20}>20 per page</option>
//             </select>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // This is just a placeholder to make the component work in this example
// // In your actual code, you would use the AllReportList function you provided
// const AllReportList = async () => {
//   try {
//     const token = localStorage.getItem("access_token");

//     if (!token) {
//       throw new Error("No access token found. Please log in.");
//     }

//     // For testing purposes, returning mock data that matches your API response format
//     return {
//       status: "ok",
//       message: "Appointments retrieved successfully",
//       data: [
//         {
//           id: 31,
//           doctor_details: {
//             id: 91,
//             name: "kavya",
//             email: "kavya@gmail.com",
//             mobile_number: "685746565666",
//             role: "psychiatrist"
//           },
//           patient_details: {
//             id: 88,
//             name: "manu",
//             email: "manu@gmail.com",
//             mobile_number: "98475611356",
//             patient_id_metro: "UM-001"
//           },
//           slot_details: {
//             id: 58,
//             date: "2025-05-20",
//             from_time: "03:47",
//             to_time: "04:47"
//           },
//           date: "2025-05-20",
//           consulted: false,
//           doctor: 91,
//           patient: 88,
//           slot: 58
//         },
//         // More appointments from your sample data
//         // ...
//       ]
//     };
    
//     // In the real implementation, you would call your API:
//     // const response = await api.post("senior_function/assigned/patient/list/", {}, {
//     //   headers: {
//     //     Authorization: `Bearer ${token}`,
//     //   },
//     // });
//     // return response.data;
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     throw error;
//   }
// };

// export default AllReportDoctorList;
"use client";

// import { AllPatientReports, AllReportList } from "@/models/auth";
// import { useState, useEffect } from "react";
// import { Search, ChevronLeft, ChevronRight, List, Grid, X } from "lucide-react";


// export default function PatientDetails() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState("table"); // "table" or "list"
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const result = await AllReportList();
//         const fetchedData = result.data.data.map(
//           (item) => item.patient_details
//         );
//         console.log("All patient details:", fetchedData);
//         setData(fetchedData);
     
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchPatients = async (patient:number) => {
//               if (!patient) return;
//       try {
       
//         const formData = { patient_id:patient}
//         const data = await AllPatientReports(formData);
//         console.log("Pdf List:", data);
//         // setPatients(data);
      
//       } catch (error) {
//         console.error("Error fetching patient list:", error);
//       } finally {
//         setLoading(false);
//       }
//     };


//     fetchPatients();
//   }, []);

//   // Filter data based on search term
//   const filteredData = data.filter((patient) => {
//     return (
//       patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       patient.patient_id_metro?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       patient.mobile_number?.includes(searchTerm)
//     );
//   });

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleViewPatient = (patient) => {
//     setSelectedPatient(patient);
//     setIsDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedPatient(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-emerald-500 text-xl">Loading patient data...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col w-full p-4">
//       {/* Header with search and view toggle */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//          <div className="relative flex-grow md:flex-grow-0 md:w-64">
//             <input
//               type="text"
//               placeholder="Search patients..."
//               className="pl-10 pr-4 py-2 border rounded-lg w-full"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1); // Reset to first page when searching
//               }}
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           </div>
        
//         <div className="flex items-center gap-4 w-full md:w-auto">
//           {/* Search Bar */}
         
          
//           {/* View Toggle Buttons */}
//           <div className="flex border rounded-lg overflow-hidden">
//             <button
//               className={`px-3 py-2 ${
//                 viewMode === "table" ? "bg-emerald-500 text-white" : "bg-white text-gray-700"
//               }`}
//               onClick={() => setViewMode("table")}
//               aria-label="Table View"
//             >
//               <Grid size={18} />
//             </button>
//             <button
//               className={`px-3 py-2 ${
//                 viewMode === "list" ? "bg-emerald-500 text-white" : "bg-white text-gray-700"
//               }`}
//               onClick={() => setViewMode("list")}
//               aria-label="List View"
//             >
//               <List size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table View */}
//       {viewMode === "table" && (
//         <div className="overflow-x-auto shadow-md rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-emerald-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider hidden md:table-cell">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider hidden sm:table-cell">
//                   Mobile
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
//                   Patient ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {currentItems.length > 0 ? (
//                 currentItems.map((patient) => (
//                   <tr key={patient.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {patient.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
//                       {patient.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
//                       {patient.mobile_number}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {patient.patient_id_metro}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <button
//                         onClick={() => handleViewPatient(patient)}
//                         className="text-emerald-600 hover:text-emerald-800 font-medium"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
//                     No patients found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* List View (Mobile Friendly) */}
//       {viewMode === "list" && (
//         <div className="grid grid-cols-1 gap-4">
//           {currentItems.length > 0 ? (
//             currentItems.map((patient) => (
//               <div
//                 key={patient.id}
//                 className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="font-medium text-lg text-emerald-700">
//                     {patient.name}
//                   </h3>
//                   <button
//                     onClick={() => handleViewPatient(patient)}
//                     className="text-teal-600 hover:text-teal-800 font-medium text-sm px-3 py-1 border border-emerald-600 rounded-full"
//                   >
//                     View Details
//                   </button>
//                 </div>
//                 <div className="text-sm text-gray-600 space-y-1">
//                   <p>
//                     <span className="font-medium">Email:</span> {patient.email}
//                   </p>
//                   <p>
//                     <span className="font-medium">Mobile:</span> {patient.mobile_number}
//                   </p>
//                   <p>
//                     <span className="font-medium">Patient ID:</span> {patient.patient_id_metro}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-8 text-gray-500">No patients found</div>
//           )}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       {filteredData.length > 0 && (
//         <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
//           <div className="flex flex-1 justify-between sm:hidden">
//             <button
//               onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
//                 currentPage === 1
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               Previous
//             </button>
//             <button
//               onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//               disabled={currentPage === totalPages}
//               className={`relative ml-3 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
//                 currentPage === totalPages
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   : "bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//           <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm text-gray-700">
//                 Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
//                 <span className="font-medium">
//                   {Math.min(indexOfLastItem, filteredData.length)}
//                 </span>{" "}
//                 of <span className="font-medium">{filteredData.length}</span> results
//               </p>
//             </div>
//             <div>
//               <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//                 <button
//                   onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                   disabled={currentPage === 1}
//                   className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
//                     currentPage === 1
//                       ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                       : "bg-white text-gray-500 hover:bg-gray-50"
//                   }`}
//                 >
//                   <ChevronLeft className="h-5 w-5" aria-hidden="true" />
//                 </button>
                
//                 {Array.from({ length: totalPages }).map((_, index) => {
//                   const pageNumber = index + 1;
//                   // Only show a few pages around current page
//                   if (
//                     pageNumber === 1 ||
//                     pageNumber === totalPages ||
//                     Math.abs(pageNumber - currentPage) <= 1
//                   ) {
//                     return (
//                       <button
//                         key={pageNumber}
//                         onClick={() => handlePageChange(pageNumber)}
//                         className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
//                           currentPage === pageNumber
//                             ? "z-10 bg-teal-500 text-white focus-visible:outline focus-visible:outline-2"
//                             : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//                         }`}
//                       >
//                         {pageNumber}
//                       </button>
//                     );
//                   } else if (
//                     pageNumber === currentPage - 2 ||
//                     pageNumber === currentPage + 2
//                   ) {
//                     return (
//                       <span
//                         key={`ellipsis-${pageNumber}`}
//                         className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700"
//                       >
//                         ...
//                       </span>
//                     );
//                   }
//                   return null;
//                 })}
                
//                 <button
//                   onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                   disabled={currentPage === totalPages}
//                   className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
//                     currentPage === totalPages
//                       ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                       : "bg-white text-gray-500 hover:bg-gray-50"
//                   }`}
//                 >
//                   <ChevronRight className="h-5 w-5" aria-hidden="true" />
//                 </button>
//               </nav>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Patient Details Dialog */}
//       {isDialogOpen && selectedPatient && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-full overflow-y-auto">
//             <div className="flex justify-between items-center border-b p-4">
//               <h3 className="text-lg font-medium text-emerald-700">Patient Details</h3>
//               <button
//                 onClick={handleCloseDialog}
//                 className="text-gray-400 hover:text-gray-500"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-1 gap-4">
//                 <div className="border-b pb-3">
//                   <p className="text-sm text-gray-500">Full Name</p>
//                   <p className="font-medium">{selectedPatient.name}</p>
//                 </div>
//                 <div className="border-b pb-3">
//                   <p className="text-sm text-gray-500">Email Address</p>
//                   <p className="font-medium">{selectedPatient.email}</p>
//                 </div>
//                 <div className="border-b pb-3">
//                   <p className="text-sm text-gray-500">Mobile Number</p>
//                   <p className="font-medium">{selectedPatient.mobile_number}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Patient ID</p>
//                   <p className="font-medium">{selectedPatient.patient_id_metro}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="border-t p-4 flex justify-end">
//               <button
//                 onClick={handleCloseDialog}
//                 className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, List, Grid, X, FileText, AlertCircle } from "lucide-react";
import { AllPatientReports, AllReportList } from "@/models/auth";

export default function PatientDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [patientReports, setPatientReports] = useState(null);
  const [loadingReports, setLoadingReports] = useState(false);
  const [reportsError, setReportsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await AllReportList();
        const fetchedData = result.data.data.map(
          (item) => item.patient_details
        );
        console.log("All patient details:", fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // This function will be called when "View Details" is clicked
  const fetchPatientReports = async (patientId) => {
    if (!patientId) return;
    setLoadingReports(true);
    setReportsError(null);
    
    try {
      const formData = { patient_id: patientId };
      const data = await AllPatientReports(formData);
      console.log("Patient diagnostic reports:", data);
      setPatientReports(data);
    } catch (error) {
      console.error("Error fetching patient reports:", error);
      setReportsError("Failed to load patient diagnostic reports");
    } finally {
      setLoadingReports(false);
    }
  };

  // Filter data based on search term
  const filteredData = data.filter((patient) => {
    return (
      patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient?.patient_id_metro?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient?.mobile_number?.includes(searchTerm)
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
    // Fetch reports when viewing a patient
    fetchPatientReports(patient.id);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPatient(null);
    setPatientReports(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-emerald-500 text-xl">Loading patient data...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-4">
      {/* Header with search and view toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative flex-grow md:flex-grow-0 md:w-64">
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* View Toggle Buttons */}
          <div className="flex border rounded-lg overflow-hidden">
            <button
              className={`px-3 py-2 ${
                viewMode === "table" ? "bg-emerald-500 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => setViewMode("table")}
              aria-label="Table View"
            >
              <Grid size={18} />
            </button>
            <button
              className={`px-3 py-2 ${
                viewMode === "list" ? "bg-emerald-500 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider hidden sm:table-cell">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Patient ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {patient.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                      {patient.mobile_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.patient_id_metro}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewPatient(patient)}
                        className="text-emerald-600 hover:text-emerald-800 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* List View (Mobile Friendly) */}
      {viewMode === "list" && (
        <div className="grid grid-cols-1 gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((patient) => (
              <div
                key={patient.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg text-emerald-700">
                    {patient.name}
                  </h3>
                  <button
                    onClick={() => handleViewPatient(patient)}
                    className="text-teal-600 hover:text-teal-800 font-medium text-sm px-3 py-1 border border-emerald-600 rounded-full"
                  >
                    View Details
                  </button>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Email:</span> {patient.email}
                  </p>
                  <p>
                    <span className="font-medium">Mobile:</span> {patient.mobile_number}
                  </p>
                  <p>
                    <span className="font-medium">Patient ID:</span> {patient.patient_id_metro}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No patients found</div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {filteredData.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredData.length)}
                </span>{" "}
                of <span className="font-medium">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  // Only show a few pages around current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    Math.abs(pageNumber - currentPage) <= 1
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          currentPage === pageNumber
                            ? "z-10 bg-teal-500 text-white focus-visible:outline focus-visible:outline-2"
                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span
                        key={`ellipsis-${pageNumber}`}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
                
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Patient Details Dialog */}
      {isDialogOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium text-emerald-700">Patient Details</h3>
              <button
                onClick={handleCloseDialog}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Basic Patient Information */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{selectedPatient.name}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{selectedPatient.email}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500">Mobile Number</p>
                  <p className="font-medium">{selectedPatient.mobile_number}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500">Patient ID</p>
                  <p className="font-medium">{selectedPatient.patient_id_metro}</p>
                </div>
              </div>
              
              {/* Diagnostic Reports Section */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-emerald-700 mb-4">Diagnostic Reports</h4>
                
                {loadingReports && (
                  <div className="flex justify-center items-center py-8">
                    <div className="text-emerald-500">Loading diagnostic reports...</div>
                  </div>
                )}
                
                {reportsError && (
                  <div className="flex items-center p-4 mb-4 bg-red-50 border-l-4 border-red-500 rounded">
                    <AlertCircle className="text-red-500 mr-2" size={20} />
                    <p className="text-red-700">{reportsError}</p>
                  </div>
                )}
                
                {!loadingReports && !reportsError && patientReports && (
                  <div className="space-y-6">
                    {/* Preliminary Diagnoses */}
                    {patientReports.preliminary_diagnoses && patientReports.preliminary_diagnoses.length > 0 ? (
                      <div className="space-y-4">
                        <h5 className="font-medium text-gray-700">Preliminary Diagnoses</h5>
                        {patientReports.preliminary_diagnoses.map((diagnosis) => (
                          <div key={diagnosis.id} className="border rounded-lg p-4 bg-emerald-50">
                            <div className="mb-4 pb-2 border-b">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Date:</span>
                                <span>{new Date(diagnosis.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric', month: 'short', day: 'numeric'
                                })}</span>
                              </div>
                              {diagnosis.is_approved && (
                                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Approved
                                </div>
                              )}
                            </div>
                            
                            {diagnosis.ai_report && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <h6 className="font-medium text-sm">Patient Summary:</h6>
                                  <p className="text-sm text-gray-700">
                                    {diagnosis.ai_report.patient_report.patient_summary}
                                  </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h6 className="font-medium text-sm">Physical Symptoms:</h6>
                                    <p className="text-sm text-gray-700">
                                      {diagnosis.ai_report.patient_report.physical_symptoms || "None reported"}
                                    </p>
                                  </div>
                                  <div>
                                    <h6 className="font-medium text-sm">Emotional Symptoms:</h6>
                                    <p className="text-sm text-gray-700">
                                      {diagnosis.ai_report.patient_report.emotional_symptoms || "None reported"}
                                    </p>
                                  </div>
                                </div>
                                
                                {diagnosis.ai_report.therapist_report && (
                                  <div className="space-y-2 border-t pt-4 mt-4">
                                    <h6 className="font-medium text-sm">Severity:</h6>
                                    <div className="flex items-center">
                                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                          className="bg-red-600 h-2.5 rounded-full" 
                                          style={{ width: `${diagnosis.ai_report.therapist_report.severity * 20}%` }}
                                        ></div>
                                      </div>
                                      <span className="ml-2 text-sm font-medium">
                                        {diagnosis.ai_report.therapist_report.severity}/5
                                      </span>
                                    </div>
                                    
                                    {diagnosis.ai_report.therapist_report.suicidality_risk && (
                                      <div className="mt-2">
                                        <h6 className="font-medium text-sm">Suicidality Risk:</h6>
                                        <p className="text-sm text-red-600">
                                          {diagnosis.ai_report.therapist_report.suicidality_risk}
                                        </p>
                                      </div>
                                    )}
                                    
                                    {diagnosis.ai_report.therapist_report.disease_diagnosed && (
                                      <div className="mt-2">
                                        <h6 className="font-medium text-sm">Diagnosis:</h6>
                                        <p className="text-sm text-gray-700">
                                          {diagnosis.ai_report.therapist_report.disease_diagnosed}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                {/* PDF Downloads Section */}
                                <div className="border-t pt-4 mt-4">
                                  <h6 className="font-medium text-sm mb-2">Patient Reports:</h6>
                                  <div className="flex flex-wrap gap-3">
                                    {diagnosis.ai_patient_summary_file && (
                                      <a 
                                        href={diagnosis.ai_patient_summary_file}
                                        target="_blank"
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center px-3 py-2 border border-emerald-600 rounded-md text-sm font-medium text-emerald-700 bg-white hover:bg-emerald-50"
                                      >
                                        <FileText size={16} className="mr-2" />
                                        Patient Summary
                                      </a>
                                    )}
                                    
                                    {diagnosis.ai_summary_file && (
                                      <a 
                                        href={diagnosis.ai_summary_file}
                                        target="_blank"
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center px-3 py-2 border border-emerald-600 rounded-md text-sm font-medium text-emerald-700 bg-white hover:bg-emerald-50"
                                      >
                                        <FileText size={16} className="mr-2" />
                                        Full Report
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">No preliminary diagnoses found</div>
                    )}
                          {patientReports.secondary_diagnoses && patientReports.secondary_diagnoses.length > 0 ? (
                      <div className="space-y-4">
                        <h5 className="font-medium text-gray-700">Secondary Diagnoses</h5>
                        {patientReports.secondary_diagnoses.map((diagnosis) => (
                          <div key={diagnosis.id} className="border rounded-lg p-4 bg-emerald-50">
                            <div className="mb-4 pb-2 border-b">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Date:</span>
                                <span>{new Date(diagnosis.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric', month: 'short', day: 'numeric'
                                })}</span>
                              </div>
                              {diagnosis.is_approved && (
                                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Approved
                                </div>
                              )}
                            </div>
                            
                            {diagnosis.ai_report && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <h6 className="font-medium text-sm">Patient Summary:</h6>
                                  <p className="text-sm text-gray-700">
                                    {diagnosis.ai_report.patient_report.patient_summary}
                                  </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h6 className="font-medium text-sm">Physical Symptoms:</h6>
                                    <p className="text-sm text-gray-700">
                                      {diagnosis.ai_report.patient_report.physical_symptoms || "None reported"}
                                    </p>
                                  </div>
                                  <div>
                                    <h6 className="font-medium text-sm">Emotional Symptoms:</h6>
                                    <p className="text-sm text-gray-700">
                                      {diagnosis.ai_report.patient_report.emotional_symptoms || "None reported"}
                                    </p>
                                  </div>
                                </div>
                                
                                {diagnosis.ai_report.therapist_report && (
                                  <div className="space-y-2 border-t pt-4 mt-4">
                                    <h6 className="font-medium text-sm">Severity:</h6>
                                    <div className="flex items-center">
                                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                          className="bg-red-600 h-2.5 rounded-full" 
                                          style={{ width: `${diagnosis.ai_report.therapist_report.severity * 20}%` }}
                                        ></div>
                                      </div>
                                      <span className="ml-2 text-sm font-medium">
                                        {diagnosis.ai_report.therapist_report.severity}/5
                                      </span>
                                    </div>
                                    
                                    {diagnosis.ai_report.therapist_report.suicidality_risk && (
                                      <div className="mt-2">
                                        <h6 className="font-medium text-sm">Suicidality Risk:</h6>
                                        <p className="text-sm text-red-600">
                                          {diagnosis.ai_report.therapist_report.suicidality_risk}
                                        </p>
                                      </div>
                                    )}
                                    
                                    {diagnosis.ai_report.therapist_report.disease_diagnosed && (
                                      <div className="mt-2">
                                        <h6 className="font-medium text-sm">Diagnosis:</h6>
                                        <p className="text-sm text-gray-700">
                                          {diagnosis.ai_report.therapist_report.disease_diagnosed}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                {/* PDF Downloads Section */}
                                <div className="border-t pt-4 mt-4">
                                  <h6 className="font-medium text-sm mb-2">Patient Reports:</h6>
                                  <div className="flex flex-wrap gap-3">
                                    {diagnosis.ai_patient_summary_file && (
                                      <a 
                                        href={diagnosis.ai_patient_summary_file}
                                        target="_blank"
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center px-3 py-2 border border-emerald-600 rounded-md text-sm font-medium text-emerald-700 bg-white hover:bg-emerald-50"
                                      >
                                        <FileText size={16} className="mr-2" />
                                        Patient Summary
                                      </a>
                                    )}
                                    
                                    {diagnosis.ai_summary_file && (
                                      <a 
                                        href={diagnosis.ai_summary_file}
                                        target="_blank"
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center px-3 py-2 border border-emerald-600 rounded-md text-sm font-medium text-emerald-700 bg-white hover:bg-emerald-50"
                                      >
                                        <FileText size={16} className="mr-2" />
                                        Full Report
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">No secondary diagnoses found</div>
                    )}
                    {/* General Chats */}
                    {patientReports.general_chats && patientReports.general_chats.length > 0 && (
                      <div className="mt-6">
                        <h5 className="font-medium text-gray-700 mb-3">Recent Conversations</h5>
                        <div className="space-y-3">
                          {patientReports.general_chats.map((chat) => (
                            <div key={chat.id} className="border rounded-lg p-4 bg-gray-50">
                              <div className="flex justify-between">
                                <span className="font-medium">Session Date:</span>
                                <span>{new Date(chat.created_at).toLocaleDateString()}</span>
                              </div>
                              <p className="mt-2 text-sm text-gray-600">
                                Chat session: {chat.chat_session_id.substring(0, 8)}...
                              </p>
                              {/* PDF Downloads Section */}
                                <div className="border-t pt-4 mt-4">
                                  <h6 className="font-medium text-sm mb-2">Patient Reports:</h6>
                                  <div className="flex flex-wrap gap-3">
                                    {chat.ai_patient_summary_file && (
                                      <a 
                                        href={chat.ai_patient_summary_file}
                                        target="_blank"
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center px-3 py-2 border border-emerald-600 rounded-md text-sm font-medium text-emerald-700 bg-white hover:bg-emerald-50"
                                      >
                                        <FileText size={16} className="mr-2" />
                                        Patient Summary
                                      </a>
                                    )}
                                    
                                    {chat.ai_summary_file && (
                                      <a 
                                        href={chat.ai_summary_file}
                                        target="_blank"
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center px-3 py-2 border border-emerald-600 rounded-md text-sm font-medium text-emerald-700 bg-white hover:bg-emerald-50"
                                      >
                                        <FileText size={16} className="mr-2" />
                                        Full Report
                                      </a>
                                    )}
                                  </div>
                                </div>
                            </div>
                            
                          ))}
                        </div>
                        
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t p-4 flex justify-end sticky bottom-0 bg-white">
              <button
                onClick={handleCloseDialog}
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}