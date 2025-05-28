import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Loader,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { ApproveButton, RejectedPatientList } from "@/models/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

// Mock API function (replace with your actual API call)
interface Patient {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  address: string;
  gender: string;
  age: number;
  occupation: string;
  education: string;
  patient_id: string;
}
const AdminPatientRejectListTab = () => {
      const { toast } = useToast();
//   const [patients, setPatients] = useState([]);
const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [itemsPerPage] = useState(10);
    const [isApprovedpatientList, setIsApprovedpatientList] = useState(false);
  
  // Check if the screen is mobile size
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
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await RejectedPatientList();
      if (response.status === "ok") {
        setPatients(response.data);
      }
    } catch (err) {
      setError("Failed to fetch patient data");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter patients based on search term
  const filteredPatients = useMemo(() => {
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.mobile_number.includes(searchTerm) ||
        patient.occupation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }
  const handleApprove = async (id: number) => {
    try {
      const response = await ApproveButton(id);
      // console.log("API response########:", response);

    //   if (response.status === "ok") {
    //     toast({
    //       title: "AI Approve Successful",
    //       description: response.message,
    //     });
    //     setLoading(true);
    //     setIsApprovedpatientList(true);
    //   } 
    if (response.status === "ok") {
  toast({
    title: "AI Approve Successful",
    description: response.message,
  });
  fetchPatients(); // Refresh list
}
      else {
        throw new Error(response.message || "Unknown error.");
      }
    } catch (error) {
      toast({
        title: "Approval failed",
        description: error?.message || "Something went wrong",
      });
      console.error("Approval error:", error);
    }
  };
  return (
    // <div className="space-y-6">
    <div className="w-full space-y-4">
      <Card className="shadow-sm border-teal-100">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100 p-4 md:p-6">
          <div
            className={`flex ${
              isMobile ? "flex-col gap-3" : "justify-between items-center"
            }`}
          >
            <div>
              <CardTitle className="text-teal-800 text-lg">
                Rejected Patients
              </CardTitle>
              <CardDescription className="text-teal-600">
                Total patients: {filteredPatients.length}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 px-3 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-500" />
              <Input
                type="text"
                placeholder="Search reject patient..."
                className="pl-9 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </CardContent>
          {/* Table Header - Hidden on mobile */}
          {/* <div className="hidden md:grid md:grid-cols-6 bg-teal-50 p-3 rounded-t-lg text-sm font-medium text-teal-800">
            <div className="pl-2">Sl.No</div>
            <div>Patient Info</div>
            <div>Contact</div>
            <div>Demographics</div>
            <div>Professional</div>
            <div>Status</div>
          </div> */}
          
             {/* Loading state */}
                    {loading && (
                      <div className="p-8 text-center text-teal-600 flex flex-col items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                        <p>Loading patients...</p>
                      </div>
                    )}
                       {/* Error state */}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md flex items-center justify-center">
              <p>{error}</p>
            </div>
          )}
          
 

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
        <div className="">
          <table className="min-w-full divide-y divide-gray-200 m-8">
            <thead className="bg-teal-50 ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Demographics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Professional
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPatients.map((patient) => (
             
                <tr key={patient.id} className="hover:bg-gray-50">
                 
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {patient.patient_id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.email}</div>
                    <div className="text-sm text-gray-500">
                      {patient.mobile_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.age} years, {patient.gender}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-32">
                      {patient.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">
                      {patient.occupation}
                    </div>
                    <div className="text-sm text-gray-500 uppercase">
                      {patient.education}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                
                    {/* <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      {patient.verified}
                    </span> */}
                       <Button
                                                            //  size="sm"
                                                             className="bg-green-600 text-white hover:bg-green-700"
                                                             // onClick={handleApproveReport}
                                                            //  onClick={() =>
                                                            //    handleApprove({patient.id})
                                                            //  }
                                                            onClick={() => handleApprove(patient.id)}
                                                            //  onClick={() => handleApproveAiDiagnosisSummary (selectedPatient.id)}
                                                           >
                                                             <CheckCircle className="w-3 h-3 mr-1" />{" "}
                                                             Approve
                                                           </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {currentPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.patient_id}</p>
                </div>
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                {/* {patient.verified} */}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {patient.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {patient.mobile_number}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                {patient.age} years, {patient.gender}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                {patient.occupation} ({patient.education.toUpperCase()})
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="truncate">{patient.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No patients found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm
              ? "Try adjusting your search terms."
              : "No rejected patients at this time."}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-lg shadow">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredPatients.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredPatients.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
           </Card>
    </div>
  );
};

export default AdminPatientRejectListTab;
