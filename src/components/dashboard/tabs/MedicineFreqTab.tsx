import React, { useEffect, useState } from "react";
import {
  deleteMedicineFreq,
  MedicineFreqList,

} from "@/models/auth"; 
import { useToast } from "@/hooks/use-toast";
import { Search, Trash2 } from "lucide-react";
import { Card} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Medicine {
  id: number;
  name: string;
}
interface MedicineFreqTabProps {
  refreshTrigger: boolean;
}
const MedicineFreqTab: React.FC<MedicineFreqTabProps> = ({
  refreshTrigger,
}) => {
  const { toast } = useToast();
  const [medicineList, setMedicineList] = useState<Medicine[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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
const filteredData = medicineList.filter((medicine) =>
  medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const totalItems = filteredData.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

const paginatedData = filteredData.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
  return (
    <div>
      {loading ? (
        <p>Loading medicines...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Card>
          <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-4 m-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-500" />
              <Input
                type="text"
                placeholder="Search Frequencies"
                className="pl-9  border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); 
                }}
              />
            </div>
          </div>

          {/* <ul className="space-y-3">
            {paginatedData.map((medicine) => (
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
                    <Trash2 className="h-6 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul> */}
               <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Frequencies</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((medicine) => (
                  <TableRow key={medicine.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-sm">
                          💊
                        </div>
                        <span className="font-medium">{medicine.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {medicine.id}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(medicine.id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
        
      )}
    </div>
    
  );
};

export default MedicineFreqTab;
