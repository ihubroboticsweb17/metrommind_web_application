import React, { useEffect, useState } from "react";
import { deleteMedicine, deleteMedicineFreq, MedicineFreqList, MedicineList } from "@/models/auth"; // your api
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface Medicine {
  id: number;
  name: string;
}
interface MedicineFreqTabProps {
  refreshTrigger: boolean;
}
const MedicineFreqTab: React.FC<MedicineFreqTabProps> = ({ refreshTrigger }) => {
  const { toast } = useToast();
  const [medicineList, setMedicineList] = useState<Medicine[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMedicinelist = async () => {
    try {
      setLoading(true);
      const data = await MedicineFreqList();
      console.log("MedicineList@", data);
      setMedicineList(data);
    } catch (err) {
      setError("Failed to load medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicinelist();
  }, [refreshTrigger]);

  const handleDelete = async (id: number) => {
    try {
      await deleteMedicineFreq(id);
      toast({
        title: "Medicine deleted",
        description: `Medicine ID ${id} deleted successfully.`,
      });
      fetchMedicinelist(); 
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete medicine",
      });
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading medicines...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-3">
          {medicineList.map((medicine) => (
            <li
              key={medicine.id}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  💊
                </div>
                <div>
                  <p className="font-medium">{medicine.name}</p>
                  <p className="text-xs text-gray-500">ID: {medicine.id}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(medicine.id)}
                className="bg-white-50 hover:text-red-600 text-teal text-sm px-3 py-1"
                >
          <Trash2 className="h-6 w-4"/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicineFreqTab;

