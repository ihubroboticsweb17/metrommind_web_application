import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pill, Loader, XCircle } from "lucide-react";
import { MedicineDetailList } from "@/models/auth";

// Define the medicine type based on your data structure
interface PatientMedicine {
  id: number;
  name: string;
  brand: string;
  frequency: string;
  strength: string;
  dosage: string;
  uom: string;
  route: string;
  period: string;
  quantity: string;
  remarks: string;
}

export default function PatientMedicinesList() {
  const [medicines, setMedicines] = useState<PatientMedicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedMedicine, setExpandedMedicine] = useState<number | null>(null);

  // This will be replaced with actual API call later
  const fetchPatientMedicines = async () => {
    try {
      MedicineDetailList
      setLoading(true);
              const data = await MedicineDetailList();
              console.log("Medicine",data);
               setMedicines(data);
      // Mock API response for now
      // This will be replaced with actual API call
      setTimeout(() => {
        // const mockData = [
        //   {
        //     id: 1,
        //     name: "Paracetamol",
        //     brand: "Calpol",
        //     frequency: "TID (3 times a day)",
        //     strength: "500mg",
        //     dosage: "1 tablet",
        //     uom: "tablet",
        //     route: "Oral",
        //     period: "7",
        //     quantity: "21",
        //     remarks: "Take after meals"
        //   },
        //   {
        //     id: 2,
        //     name: "Amoxicillin",
        //     brand: "Mox",
        //     frequency: "BID (2 times a day)",
        //     strength: "250mg",
        //     dosage: "1 capsule",
        //     uom: "capsule",
        //     route: "Oral",
        //     period: "5",
        //     quantity: "10",
        //     remarks: "Take with water"
        //   },  
        //   {
        //     id: 3,
        //     name: "Ibuprofen",
        //     brand: "Advil",
        //     frequency: "QID (4 times a day)",
        //     strength: "200mg",
        //     dosage: "1 tablet",
        //     uom: "tablet",
        //     route: "Oral",
        //     period: "5",
        //     quantity: "20",
        //     remarks: "Take with food to avoid stomach upset"
        //   },
        //   {
        //     id: 4,
        //     name: "Cetirizine",
        //     brand: "Zyrtec",
        //     frequency: "QD (once daily)",
        //     strength: "10mg",
        //     dosage: "1 tablet",
        //     uom: "tablet",
        //     route: "Oral",
        //     period: "30",
        //     quantity: "30",
        //     remarks: "Take at bedtime"
        //   },
        //   {
        //     id: 4,
        //     name: "Cetirizine",
        //     brand: "Zyrtec",
        //     frequency: "QD (once daily)",
        //     strength: "10mg",
        //     dosage: "1 tablet",
        //     uom: "tablet",
        //     route: "Oral",
        //     period: "30",
        //     quantity: "30",
        //     remarks: "Take at bedtime"
        //   },
        //   {
        //     id: 4,
        //     name: "Cetirizine",
        //     brand: "Zyrtec",
        //     frequency: "QD (once daily)",
        //     strength: "10mg",
        //     dosage: "1 tablet",
        //     uom: "tablet",
        //     route: "Oral",
        //     period: "30",
        //     quantity: "30",
        //     remarks: "Take at bedtime"
        //   },
        //   {
        //     id: 4,
        //     name: "Cetirizine",
        //     brand: "Zyrtec",
        //     frequency: "QD (once daily)",
        //     strength: "10mg",
        //     dosage: "1 tablet",
        //     uom: "tablet",
        //     route: "Oral",
        //     period: "30",
        //     quantity: "30",
        //     remarks: "Take at bedtime"
        //   },
        //   {
        //     id: 4,
        //     name: "Cetirizine",
        //     brand: "Zyrtec",
        //     frequency: "QD (once daily)",
        //     strength: "10mg",
        //     dosage: "1 tablet",
        //     uom: "tablet",
        //     route: "Oral",
        //     period: "30",
        //     quantity: "30",
        //     remarks: "Take at bedtime"
        //   },
        // ];
        
        // setMedicines(mockData);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError("Failed to load patient medicines");
      setLoading(false);
    }
  };

  const toggleMedicineDetails = (id: number) => {
    if (expandedMedicine === id) {
      setExpandedMedicine(null);
    } else {
      setExpandedMedicine(id);
    }
  };

  useEffect(() => {
    fetchPatientMedicines();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Pill className="text-teal-600" size={20} />
          Patient Medicines
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs border-teal-600 text-teal-600 hover:bg-teal-50"
          onClick={fetchPatientMedicines}
        >
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader className="animate-spin text-teal-600 mr-2" size={20} />
          <span className="text-gray-600">Loading medicines...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-8 text-red-500">
          <XCircle className="mr-2" size={20} />
          <span>{error}</span>
        </div>
      ) : medicines.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          <p>No medicines have been added to this patient yet.</p>
        </div>
      ) : (
        <div className="max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="space-y-3">
            {medicines.map((medicine) => (
              <div 
                key={medicine.id} 
                className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 hover:shadow-md transition"
              >
                {/* Medicine summary row - always visible */}
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer"
                  onClick={() => toggleMedicineDetails(medicine.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      💊
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{medicine.name}</p>
                      <p className="text-xs text-gray-500">{medicine.strength} • {medicine.frequency}</p>
                    </div>
                  </div>
                  <div className="text-blue-600">
                    {expandedMedicine === medicine.id ? "▲" : "▼"}
                  </div>
                </div>

                {/* Expanded details section */}
                {expandedMedicine === medicine.id && (
                  <div className="border-t border-gray-200 p-4 bg-white">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Brand</p>
                        <p className="font-medium">{medicine.brand}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Route</p>
                        <p className="font-medium">{medicine.route}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Dosage</p>
                        <p className="font-medium">{medicine.dosage} {medicine.uom}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium">{medicine.period} days</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p className="font-medium">{medicine.quantity}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Frequency</p>
                        <p className="font-medium">{medicine.frequency}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500">Remarks</p>
                        <p className="font-medium">{medicine.remarks || "No remarks"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}