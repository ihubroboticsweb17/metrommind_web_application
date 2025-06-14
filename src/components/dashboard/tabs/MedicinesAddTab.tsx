
// import { useToast } from "@/hooks/use-toast";
// import {
//   AssignDoctorPatientList,
//   MedicineBrandlist,
//   MedicineFreqList,
//   MedicineList,
//   MedicinesAdd,
//   patientlist,
// } from "@/models/auth";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion"; // Need to add this package for animations

// interface MedicineForm {
//   medicine: string;
//   brand: string;
//   frequency: string;
//   strength: string;
//   dosage: string;
//   uom: string;
//   route: string;
//   period: string;
//   quantity: string;
//   remarks: string;
//   medicineName?: string;
// }

// interface MedicinesAddTabProps {
//   onSuccess?: () => void;
// }

// const MedicinesAddTab: React.FC<MedicinesAddTabProps> = ({ onSuccess }) => {
//   const { toast } = useToast();
//   const [medicines, setMedicines] = useState<MedicineForm[]>([
//     {
//       medicine: "",
//       brand: "",
//       frequency: "",
//       strength: "",
//       dosage: "",
//       uom: "",
//       route: "",
//       period: "",
//       quantity: "",
//       remarks: "",
//       medicineName: "",
//     },
//   ]);

//   const [medicin, setMedicin] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [frequencies, setFrequencies] = useState([]);
//   const [user, setUser] = useState([]);
//   const [patient, setPatient] = useState("");
//   const [expandedMedicine, setExpandedMedicine] = useState<number | null>(0);
//   const [loading, setLoading] = useState(false);

//   const addNewMedicine = () => {
//     const newMedicineIndex = medicines.length;
//     setMedicines([
//       ...medicines,
//       {
//         medicine: "",
//         brand: "",
//         frequency: "",
//         strength: "",
//         dosage: "",
//         uom: "",
//         route: "",
//         period: "",
//         quantity: "",
//         remarks: "",
//         medicineName: "", // This will be updated when medicine is selected
//       },
//     ]);
//     setExpandedMedicine(newMedicineIndex); // Auto-expand the newly added medicine
//   };

//   const handleFieldChange = (
//     index: number,
//     field: keyof MedicineForm,
//     value: string
//   ) => {
//     const updated = [...medicines];
//     updated[index][field] = value;
    
//     // Update medicine name when medicine is selected
//     if (field === "medicine" && value) {
//       const selectedMedicine = medicin.find((item: any) => item.id === value);
//       updated[index].medicineName = selectedMedicine ? selectedMedicine.name : "";
//     }
    
//     setMedicines(updated);
//   };

//   // Helper function to get display text for medicine header
//   const getMedicineDisplayText = (med: MedicineForm, index: number) => {
//     if (med.medicineName) {
//       return med.medicineName;
//     }
//     if (med.medicine) {
//       // Fallback: try to find medicine name if medicineName is not set
//       const selectedMedicine = medicin.find((item: any) => item.id === med.medicine);
//       return selectedMedicine ? selectedMedicine.name : "Medicine selected";
//     }
//     return "Not selected";
//   };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     // Find the selected patient object to get the correct patient ID
//     const selectedPatientObj = user.find((item: any) => item.id.toString() === patient);
    
//     if (!selectedPatientObj) {
//       throw new Error("Please select a valid patient");
//     }

//     // Use the actual patient ID from the patient object
//     const actualPatientId = selectedPatientObj.patient?.id || selectedPatientObj.patient_id;
    
//     if (!actualPatientId) {
//       throw new Error("Patient ID not found. Please contact support.");
//     }

//     // Validate all medicines have required fields
//     const validatedMedicines = medicines.map((med, index) => {
//       if (!med.medicine || !med.brand || !med.frequency) {
//         throw new Error(`Medicine ${index + 1}: Please fill all required fields`);
//       }

//       return {
//         medicine: parseInt(med.medicine),
//         brand: parseInt(med.brand),
//         frequency: parseInt(med.frequency),
//         strength: med.strength.trim(),
//         dosage: med.dosage.trim(),
//         uom: med.uom.trim(),
//         route: med.route.trim(),
//         period: parseInt(med.period),
//         quantity: parseInt(med.quantity),
//         remarks: med.remarks.trim(),
//         is_active: true
//       };
//     });

//     const payload = {
//       patient: actualPatientId, // Use the actual patient ID
//       medicines: validatedMedicines,
//     };

//     console.log("Sending payload:", payload);
//     console.log("Selected patient object:", selectedPatientObj);

//     await MedicinesAdd(payload);

//     toast({
//       title: "Success",
//       description: "Prescription created successfully!",
//     });

//     // Reset form
//     setMedicines([
//       {
//         medicine: "",
//         brand: "",
//         frequency: "",
//         strength: "",
//         dosage: "",
//         uom: "",
//         route: "",
//         period: "",
//         quantity: "",
//         remarks: "",
//         medicineName: "",
//       },
//     ]);
//     setPatient("");
//     setExpandedMedicine(0);
    
//     if (onSuccess) {
//       onSuccess();
//     }
//   } catch (error: any) {
//     console.error("Submit error:", error);
    
//     toast({
//       title: "Error",
//       description: error.message || "Failed to add prescription",
//       variant: "destructive",
//     });
//   } finally {
//     setLoading(false);
//   }
// };

//   const toggleMedicineExpand = (index: number) => {
//     setExpandedMedicine(expandedMedicine === index ? null : index);
//   };

//   const removeMedicine = (index: number) => {
//     const updatedMedicines = [...medicines];
//     updatedMedicines.splice(index, 1);
//     setMedicines(updatedMedicines);
    
//     if (expandedMedicine === index) {
//       setExpandedMedicine(index > 0 ? index - 1 : 0);
//     } else if (expandedMedicine !== null && expandedMedicine > index) {
//       setExpandedMedicine(expandedMedicine - 1);
//     }
//   };

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const meds = await MedicineList();
//         const brds = await MedicineBrandlist();
//         const freqs = await MedicineFreqList();
//         const patien = await AssignDoctorPatientList();
//         console.log("1234",patien)
//         setMedicin(meds);
//         setBrands(brds);
//         setFrequencies(freqs);
//         setUser(patien);
//       } catch (error) {
//         console.error("Dropdown fetch failed", error);
//       }
//     };
//     fetchDropdownData();
//   }, []);

//   return (
//     <div className="w-full mx-auto p-3 sm:p-4 max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Patient Selection */}
//         <motion.div 
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="p-3 sm:p-4 border rounded-lg shadow-sm bg-gradient-to-r from-indigo-50 to-purple-50"
//         >
//           <label className="block mb-2 font-medium text-gray-700">Select Patient</label>
//           <select
//             name="patient"
//             onChange={(e) => setPatient(e.target.value)}
//             value={patient}
//             className="border border-indigo-200 rounded-lg px-3 py-2.5 w-full bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition duration-200"
//             required
//           >
//             <option value="">Select Patient</option>
//             {user.map((item: any) => (
//               <option key={item.id} value={item.id}>
//                 {item.patient?.name || item.patient_name || `Patient ID: ${item.patient?.id}`}
//               </option>
//             ))}
//           </select>
//         </motion.div>

//         {/* Medicine List Summary */}
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
//             <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//             </svg>
//             Prescribed Medicines
//           </h3>
          
//           {medicines.map((med, idx) => (
//             <motion.div 
//               key={idx}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: idx * 0.1 }}
//               className="border border-indigo-200 rounded-lg mb-3 overflow-hidden"
//             >
//               {/* Medicine Header - Updated this section */}
//               <div 
//                 className={`flex justify-between items-center p-3 ${
//                   expandedMedicine === idx 
//                     ? 'bg-gradient-to-r from-teal-600 to-teal-400 text-white' 
//                     : 'bg-gradient-to-r from-indigo-100 to-purple-100'
//                 } cursor-pointer transition-all duration-300`}
//                 onClick={() => toggleMedicineExpand(idx)}
//               >
//                 <div className={`font-medium ${expandedMedicine === idx ? 'text-white' : 'text-gray-800'}`}>
//                   Medicine {idx + 1}: {getMedicineDisplayText(med, idx)}
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <button 
//                     type="button" 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeMedicine(idx);
//                     }}
//                     className={`${
//                       expandedMedicine === idx 
//                         ? 'text-pink-200 hover:text-white' 
//                         : 'text-red-500 hover:text-red-700'
//                     } transition-colors duration-200 text-sm px-2 py-1 rounded-full flex items-center`}
//                   >
//                     <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                     <span className="hidden sm:inline">Remove</span>
//                   </button>
//                   <span className={`${expandedMedicine === idx ? 'text-white' : 'text-indigo-600'} transition-transform duration-300 transform ${expandedMedicine === idx ? 'rotate-180' : ''}`}>
//                     ▼
//                   </span>
//                 </div>
//               </div>

//               {/* Expanded medicine form */}
//               {expandedMedicine === idx && (
//                 <motion.div 
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="p-3 sm:p-4 border-t"
//                 >
//                   <div className="grid grid-cols-1 gap-3">
//                     <div className="mb-2">
//                       <label className="text-xs text-gray-500 block mb-1">Medicine Name*</label>
//                       <select
//                         name="medicine"
//                         onChange={(e) => handleFieldChange(idx, "medicine", e.target.value)}
//                         value={med.medicine}
//                         className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
//                         required
//                       >
//                         <option value="">Select Medicine</option>
//                         {medicin.map((item: any) => (
//                           <option key={item.id} value={item.id}>
//                             {item.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="mb-2">
//                       <label className="text-xs text-gray-500 block mb-1">Brand*</label>
//                       <select
//                         name="brand"
//                         onChange={(e) => handleFieldChange(idx, "brand", e.target.value)}
//                         value={med.brand}
//                         className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
//                         required
//                       >
//                         <option value="">Select Brand</option>
//                         {brands.map((item: any) => (
//                           <option key={item.id} value={item.id}>
//                             {item.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="mb-2">
//                       <label className="text-xs text-gray-500 block mb-1">Frequency*</label>
//                       <select
//                         name="frequency"
//                         onChange={(e) => handleFieldChange(idx, "frequency", e.target.value)}
//                         value={med.frequency}
//                         className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
//                         required
//                       >
//                         <option value="">Select Frequencies</option>
//                         {frequencies.map((item: any) => (
//                           <option key={item.id} value={item.id}>
//                             {item.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Two fields side by side on larger screens */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                       <div>
//                         <label className="text-xs text-gray-500 block mb-1">Strength*</label>
//                         <input
//                           placeholder="e.g. 500"
//                           className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
//                           value={med.strength}
//                           onChange={(e) => handleFieldChange(idx, "strength", e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="text-xs text-gray-500 block mb-1">Dosage*</label>
//                         <input
//                           placeholder="e.g. 1 tablet"
//                           className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
//                           value={med.dosage}
//                           onChange={(e) => handleFieldChange(idx, "dosage", e.target.value)}
//                           required
//                         />
//                       </div>
//                     </div>

//                     {/* Two fields side by side on larger screens */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                       <div>
//                         <label className="text-xs text-gray-500 block mb-1">UOM*</label>
//                         <input
//                           placeholder="Unit of measurement "
//                           className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
//                           value={med.uom}
//                           onChange={(e) => handleFieldChange(idx, "uom", e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="text-xs text-gray-500 block mb-1">Route*</label>
//                         <input
//                           placeholder="e.g. Oral"
//                           className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
//                           value={med.route}
//                           onChange={(e) => handleFieldChange(idx, "route", e.target.value)}
//                           required
//                         />
//                       </div>
//                     </div>

//                     {/* Two fields side by side on larger screens */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                       <div>
//                         <label className="text-xs text-gray-500 block mb-1">Period (days)*</label>
//                         <input
//                           type="number"
//                           placeholder="e.g. 7"
//                           className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
//                           value={med.period}
//                           onChange={(e) => handleFieldChange(idx, "period", e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="text-xs text-gray-500 block mb-1">Quantity*</label>
//                         <input
//                           type="number"
//                           placeholder="e.g. 14"
//                           className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
//                           value={med.quantity}
//                           onChange={(e) => handleFieldChange(idx, "quantity", e.target.value)}
//                           required
//                         />
//                       </div>
//                     </div>
                    
//                     <div>
//                       <label className="text-xs text-gray-500 block mb-1">Remarks</label>
//                       <textarea
//                         placeholder="Any additional instructions"
//                         className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
//                         value={med.remarks}
//                         onChange={(e) => handleFieldChange(idx, "remarks", e.target.value)}
//                         rows={2}
//                       />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </motion.div>
//           ))}

//           {/* Empty state if no medicines */}
//           {medicines.length === 0 && (
//             <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
//               <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//               </svg>
//               <p>No medicines added yet. Click "Add Medicine" below to start.</p>
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 sticky bottom-0 bg-white p-2 border-t">
//           <button
//             type="button"
//             onClick={addNewMedicine}
//             className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-lg w-full sm:w-auto flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//             Add Medicine
//           </button>

//           <button
//             type="submit"
//             className={`bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2.5 rounded-lg w-full sm:w-auto flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg ${
//               (!patient || medicines.length === 0 || loading) ? 'opacity-70 cursor-not-allowed' : 'hover:from-teal-600 hover:to-emerald-600'
//             }`}
//             disabled={!patient || medicines.length === 0 || loading}
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Processing...
//               </>
//             ) : (
//               <>
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Submit Prescription
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MedicinesAddTab;
import { useToast } from "@/hooks/use-toast";
import {
  AssignDoctorPatientList,
  MedicineBrandlist,
  MedicineFreqList,
  MedicineList,
  MedicinesAdd,
  patientlist,
} from "@/models/auth";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Need to add this package for animations

interface MedicineForm {
  medicine: string;
  brand: string;
  frequency: string;
  strength: string;
  dosage: string;
  uom: string;
  route: string;
  period: string;
  quantity: string;
  remarks: string;
  medicineName?: string;
}

interface MedicinesAddTabProps {
  onSuccess?: () => void;
  preSelectedPatient?: {
    id: string;
    name: string;
  };
}

const MedicinesAddTab: React.FC<MedicinesAddTabProps> = ({ onSuccess, preSelectedPatient }) => {
  const { toast } = useToast();
  const [medicines, setMedicines] = useState<MedicineForm[]>([
    {
      medicine: "",
      brand: "",
      frequency: "",
      strength: "",
      dosage: "",
      uom: "",
      route: "",
      period: "",
      quantity: "",
      remarks: "",
      medicineName: "",
    },
  ]);

  const [medicin, setMedicin] = useState([]);
  const [brands, setBrands] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [user, setUser] = useState([]);
  const [patient, setPatient] = useState("");
  const [expandedMedicine, setExpandedMedicine] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);

  // UOM options
  const uomOptions = [
    { value: "ML", label: "ML (milliliters)" },
    { value: "MG", label: "MG (milligrams)" },
    { value: "G", label: "G (grams)" },
  ];

  const addNewMedicine = () => {
    const newMedicineIndex = medicines.length;
    setMedicines([
      ...medicines,
      {
        medicine: "",
        brand: "",
        frequency: "",
        strength: "",
        dosage: "",
        uom: "",
        route: "",
        period: "",
        quantity: "",
        remarks: "",
        medicineName: "", // This will be updated when medicine is selected
      },
    ]);
    setExpandedMedicine(newMedicineIndex); // Auto-expand the newly added medicine
  };

  const handleFieldChange = (
    index: number,
    field: keyof MedicineForm,
    value: string
  ) => {
    const updated = [...medicines];
    updated[index][field] = value;
    
    // Update medicine name when medicine is selected
    if (field === "medicine" && value) {
      const selectedMedicine = medicin.find((item: any) => item.id === value);
      updated[index].medicineName = selectedMedicine ? selectedMedicine.name : "";
    }
    
    setMedicines(updated);
  };

  // Helper function to get display text for medicine header
  const getMedicineDisplayText = (med: MedicineForm, index: number) => {
    if (med.medicineName) {
      return med.medicineName;
    }
    if (med.medicine) {
      // Fallback: try to find medicine name if medicineName is not set
      const selectedMedicine = medicin.find((item: any) => item.id === med.medicine);
      return selectedMedicine ? selectedMedicine.name : "Medicine selected";
    }
    return "Not selected";
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    let actualPatientId;

    // If preSelectedPatient is provided, use it directly
    if (preSelectedPatient) {
      actualPatientId = preSelectedPatient.id;
    } else {
      // Find the selected patient object to get the correct patient ID
      const selectedPatientObj = user.find((item: any) => item.id.toString() === patient);
      
      if (!selectedPatientObj) {
        throw new Error("Please select a valid patient");
      }

      // Use the actual patient ID from the patient object
      actualPatientId = selectedPatientObj.patient?.id || selectedPatientObj.patient_id;
    }
    
    if (!actualPatientId) {
      throw new Error("Patient ID not found. Please contact support.");
    }

    // Validate all medicines have required fields
    const validatedMedicines = medicines.map((med, index) => {
      if (!med.medicine || !med.brand || !med.frequency) {
        throw new Error(`Medicine ${index + 1}: Please fill all required fields`);
      }

      return {
        medicine: parseInt(med.medicine),
        brand: parseInt(med.brand),
        frequency: parseInt(med.frequency),
        strength: med.strength.trim(),
        dosage: med.dosage.trim(),
        uom: med.uom.trim(),
        route: med.route.trim(),
        period: parseInt(med.period),
        quantity: parseInt(med.quantity),
        remarks: med.remarks.trim(),
        is_active: true
      };
    });

    const payload = {
      patient: actualPatientId, // Use the actual patient ID
      medicines: validatedMedicines,
    };

    console.log("Sending payload:", payload);

    await MedicinesAdd(payload);

    toast({
      title: "Success",
      description: "Prescription created successfully!",
    });

    // Reset form
    setMedicines([
      {
        medicine: "",
        brand: "",
        frequency: "",
        strength: "",
        dosage: "",
        uom: "",
        route: "",
        period: "",
        quantity: "",
        remarks: "",
        medicineName: "",
      },
    ]);
    setPatient("");
    setExpandedMedicine(0);
    
    if (onSuccess) {
      onSuccess();
    }
  } catch (error: any) {
    console.error("Submit error:", error);
    
    toast({
      title: "Error",
      description: error.message || "Failed to add prescription",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};

  const toggleMedicineExpand = (index: number) => {
    setExpandedMedicine(expandedMedicine === index ? null : index);
  };

  const removeMedicine = (index: number) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
    
    if (expandedMedicine === index) {
      setExpandedMedicine(index > 0 ? index - 1 : 0);
    } else if (expandedMedicine !== null && expandedMedicine > index) {
      setExpandedMedicine(expandedMedicine - 1);
    }
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const meds = await MedicineList();
        const brds = await MedicineBrandlist();
        const freqs = await MedicineFreqList();
        
        // Only fetch patient list if no preSelectedPatient is provided
        if (!preSelectedPatient) {
          const patien = await AssignDoctorPatientList();
          console.log("1234", patien);
          setUser(patien);
        }
        
        setMedicin(meds);
        setBrands(brds);
        setFrequencies(freqs);
      } catch (error) {
        console.error("Dropdown fetch failed", error);
      }
    };
    fetchDropdownData();
  }, [preSelectedPatient]);

  // Set patient if preSelectedPatient is provided
  useEffect(() => {
    if (preSelectedPatient) {
      setPatient(preSelectedPatient.id);
    }
  }, [preSelectedPatient]);

  return (
    <div className="w-full mx-auto p-3 sm:p-4 max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Patient Selection - Only show if no preSelectedPatient */}
        {!preSelectedPatient && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 sm:p-4 border rounded-lg shadow-sm bg-gradient-to-r from-indigo-50 to-purple-50"
          >
            <label className="block mb-2 font-medium text-gray-700">Select Patient</label>
            <select
              name="patient"
              onChange={(e) => setPatient(e.target.value)}
              value={patient}
              className="border border-indigo-200 rounded-lg px-3 py-2.5 w-full bg-white focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition duration-200"
              required
            >
              <option value="">Select Patient</option>
              {user.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.patient?.name || item.patient_name || `Patient ID: ${item.patient?.id}`}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        {/* Show selected patient info if preSelectedPatient is provided */}
        {preSelectedPatient && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 sm:p-4 border rounded-lg shadow-sm bg-gradient-to-r from-green-50 to-blue-50"
          >
            <label className="block mb-2 font-medium text-gray-700">Selected Patient</label>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{preSelectedPatient.name}</p>
                <p className="text-sm text-gray-600">ID: {preSelectedPatient.id}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Medicine List Summary */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Prescribed Medicines
          </h3>
          
          {medicines.map((med, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border border-indigo-200 rounded-lg mb-3 overflow-hidden"
            >
              {/* Medicine Header - Updated this section */}
              <div 
                className={`flex justify-between items-center p-3 ${
                  expandedMedicine === idx 
                    ? 'bg-gradient-to-r from-teal-600 to-teal-400 text-white' 
                    : 'bg-gradient-to-r from-indigo-100 to-purple-100'
                } cursor-pointer transition-all duration-300`}
                onClick={() => toggleMedicineExpand(idx)}
              >
                <div className={`font-medium ${expandedMedicine === idx ? 'text-white' : 'text-gray-800'}`}>
                  Medicine {idx + 1}: {getMedicineDisplayText(med, idx)}
                </div>
                <div className="flex gap-2 items-center">
                  <button 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMedicine(idx);
                    }}
                    className={`${
                      expandedMedicine === idx 
                        ? 'text-pink-200 hover:text-white' 
                        : 'text-red-500 hover:text-red-700'
                    } transition-colors duration-200 text-sm px-2 py-1 rounded-full flex items-center`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                  <span className={`${expandedMedicine === idx ? 'text-white' : 'text-indigo-600'} transition-transform duration-300 transform ${expandedMedicine === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </div>

              {/* Expanded medicine form */}
              {expandedMedicine === idx && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 sm:p-4 border-t"
                >
                  <div className="grid grid-cols-1 gap-3">
                    <div className="mb-2">
                      <label className="text-xs text-gray-500 block mb-1">Medicine Name*</label>
                      <select
                        name="medicine"
                        onChange={(e) => handleFieldChange(idx, "medicine", e.target.value)}
                        value={med.medicine}
                        className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                        required
                      >
                        <option value="">Select Medicine</option>
                        {medicin.map((item: any) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-2">
                      <label className="text-xs text-gray-500 block mb-1">Brand*</label>
                      <select
                        name="brand"
                        onChange={(e) => handleFieldChange(idx, "brand", e.target.value)}
                        value={med.brand}
                        className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                        required
                      >
                        <option value="">Select Brand</option>
                        {brands.map((item: any) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-2">
                      <label className="text-xs text-gray-500 block mb-1">Frequency*</label>
                      <select
                        name="frequency"
                        onChange={(e) => handleFieldChange(idx, "frequency", e.target.value)}
                        value={med.frequency}
                        className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                        required
                      >
                        <option value="">Select Frequencies</option>
                        {frequencies.map((item: any) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Two fields side by side on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Strength*</label>
                        <input
                          placeholder="e.g. 500"
                          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                          value={med.strength}
                          onChange={(e) => handleFieldChange(idx, "strength", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Dosage*</label>
                        <input
                          placeholder="e.g. 1 tablet"
                          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                          value={med.dosage}
                          onChange={(e) => handleFieldChange(idx, "dosage", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Two fields side by side on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">UOM (Unit of Measurement)*</label>
                        <select
                          name="uom"
                          onChange={(e) => handleFieldChange(idx, "uom", e.target.value)}
                          value={med.uom}
                          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                          required
                        >
                          <option value="">Select Unit</option>
                          {uomOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Route*</label>
                        <input
                          placeholder="e.g. Oral"
                          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                          value={med.route}
                          onChange={(e) => handleFieldChange(idx, "route", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Two fields side by side on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Period (days)*</label>
                        <input
                          type="number"
                          placeholder="e.g. 7"
                          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                          value={med.period}
                          onChange={(e) => handleFieldChange(idx, "period", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Quantity*</label>
                        <input
                          type="number"
                          placeholder="e.g. 14"
                          className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                          value={med.quantity}
                          onChange={(e) => handleFieldChange(idx, "quantity", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Remarks</label>
                      <textarea
                        placeholder="Any additional instructions"
                        className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
                        value={med.remarks}
                        onChange={(e) => handleFieldChange(idx, "remarks", e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Empty state if no medicines */}
          {medicines.length === 0 && (
            <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <p>No medicines added yet. Click "Add Medicine" below to start.</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 sticky bottom-0 bg-white p-2 border-t">
          <button
            type="button"
            onClick={addNewMedicine}
            className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-lg w-full sm:w-auto flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Medicine
          </button>

          <button
            type="submit"
            className={`bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2.5 rounded-lg w-full sm:w-auto flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg ${
              ((!patient && !preSelectedPatient) || medicines.length === 0 || loading) ? 'opacity-70 cursor-not-allowed' : 'hover:from-teal-600 hover:to-emerald-600'
            }`}
            disabled={(!patient && !preSelectedPatient) || medicines.length === 0 || loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submit Prescription
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicinesAddTab;