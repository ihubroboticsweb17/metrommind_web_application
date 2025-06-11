import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Phone,
  Mail,
  User,
  Check,
  X,
  Briefcase,
  GraduationCap,
  MapPin,
  Search,
  Plus,
  Loader2,
  ChevronRight,
  ChevronLeft,
  PhoneIcon,
  Activity,
  Delete,
  DeleteIcon,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DoctorList, TalktoEnableButton } from "@/models/auth";
import AddDoctorTab from "./AddDoctorTab";
import SlotSelector from "./SlotSelector";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface DoctorCallFormData {
  staff: string;
  did_no: string;
  ext_no: string;
  emp_code: string;
}
// Helper function to format role display
const formatRole = (role) => {
  return role
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Helper to get initials from name
const getInitials = (name) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

// Helper to get role color
const getRoleBadgeColor = (role) => {
  switch (role) {
    case "psychiatrist":
      return "bg-purple-100 text-purple-800";
    case "senior_psychologist":
      return "bg-blue-100 text-blue-800";
    case "junior_psychologist":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AdminPromptTab = () => {
  const { toast } = useToast();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenvox, setIsDialogOpenvox] = useState(false);
  const [isAddDoctorDialogOpen, setIsAddDoctorDialogOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [assessment, setAssessment] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [toggleLoading, setToggleLoading] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [errors, setErrors] = useState<Partial<DoctorCallFormData>>({});
  const [formData, setFormData] = useState<DoctorCallFormData>({
    staff: "",
    did_no: "",
    ext_no: "",
    emp_code: "",
  });
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

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       setLoading(true);
  //       await new Promise((resolve) => setTimeout(resolve, 800));
  //       const data = await DoctorList();
  //       setDoctors(data.users || []);
  //       setFilteredDoctors(data.users || []);
  //     } catch (err) {
  //       console.error("Error fetching doctors:", err);
  //       setError("Failed to load doctors. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDoctors();
  // }, []);
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await DoctorList();
      console.log("doctorlist", data);
      setDoctors(data.users || []);
      setFilteredDoctors(data.users || []);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDoctorAdded = () => {
    // Refresh the doctors list
    fetchDoctors();
  };
  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDoctors(doctors);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(lowerCaseQuery) ||
        doctor.role.toLowerCase().includes(lowerCaseQuery) ||
        doctor.email.toLowerCase().includes(lowerCaseQuery) ||
        doctor.id.toString().includes(lowerCaseQuery)
    );

    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  // Handle call availability toggle
  const handleCallToggle = async (doctorId, currentStatus) => {
    try {
      setToggleLoading((prev) => ({ ...prev, [doctorId]: true }));

      const formData = {
        doctor_id: doctorId,
        is_call_available: !currentStatus,
      };

      const response = await TalktoEnableButton(formData);

      if (response.status === "ok") {
        // Update the doctor's call_enabled status in the local state
        const updatedDoctors = doctors.map((doctor) =>
          doctor.id === doctorId
            ? { ...doctor, call_enabled: !currentStatus }
            : doctor
        );
        console.log("response.is_call_available", response.is_call_available);
        setDoctors(updatedDoctors);
        setFilteredDoctors(updatedDoctors);

        toast({
          variant: "default",
          title: response.message,
        });
        // Show success message (you can replace this with a toast notification)
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error toggling call availability:", error);
      // Handle error (you can show an error toast here)
      toast({
        variant: "destructive",
        title: "Error toggling call availability",
      });
      setError("Failed to update call availability. Please try again.");
    } finally {
      setToggleLoading((prev) => ({ ...prev, [doctorId]: false }));
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type === "application/pdf") {
        setPdfFile(selectedFile);
        setErrors((prev) => ({ ...prev, pdf: undefined }));
      } else {
        setErrors((prev) => ({
          ...prev,
          pdf: "Please upload a valid PDF file.",
        }));
        e.target.value = "";
      }
    }
  };

  useEffect(() => {
    const total = Math.ceil(filteredDoctors.length / itemsPerPage);
    setTotalPages(total);

    // Ensure current page is valid
    if (currentPage > total && total > 0) {
      setCurrentPage(total);
    }
  }, [filteredDoctors.length, itemsPerPage, currentPage]);

  // Get paginated doctors
  const getPaginatedDoctors = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredDoctors.slice(startIndex, endIndex);
  };
  // Handle successful doctor addition
  const handleDoctorAddSuccess = () => {
    setIsAddDoctorDialogOpen(false);
    // Refresh the doctor list
    fetchDoctors();
  };

  // Pagination controls
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationInfo = () => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(
      currentPage * itemsPerPage,
      filteredDoctors.length
    );
    return `${startItem}-${endItem} of ${filteredDoctors.length}`;
  };

  return (
    <div className="w-full space-y-4">
      <Card className="shadow-sm border-teal-100">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100 p-4 md:p-6">
          <div
            className={`flex ${
              isMobile ? "flex-col gap-3" : "justify-between items-center"
            }`}
          >
            <div>
              <CardTitle className="text-teal-800 text-lg">AI Prompt</CardTitle>
              <CardDescription className="text-teal-600">
                Total Prompt: {doctors.length}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1"
                onClick={() => setIsAddDoctorDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add Prompt
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 px-3 md:px-6">
          {/* Search and Items per page */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 items-center mb-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-teal-500" />
              <Input
                type="text"
                placeholder="Search prompt..."
                className="pl-9 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="itemsPerPage" className="text-sm text-teal-700">
                Show:
              </Label>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table Header - Hidden on mobile */}
          <div className="hidden md:grid md:grid-cols-4 bg-teal-50 p-3 rounded-t-lg text-sm font-medium text-teal-800">
            <div className="pl-2">Sl.No</div>
            <div>Text Name</div>
            <div>Pdf</div>
            <div>Action</div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="p-8 text-center text-teal-600 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p>Loading Prompt...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md flex items-center justify-center">
              <p>{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="ml-4 border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => {
                  setError("");
                  fetchDoctors();
                }}
              >
                Retry
              </Button>
            </div>
          )}

          {/* Empty state - No doctors */}
          {!loading && !error && doctors.length === 0 && (
            <div className="p-8 text-center text-teal-600 border border-dashed border-teal-200 rounded-lg">
              <User className="h-12 w-12 mx-auto mb-2 text-teal-400" />
              <p className="text-lg font-medium mb-1">No doctors found</p>
              <p className="text-sm text-teal-500 mb-4">
                Add your first doctor to get started
              </p>
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1"
                onClick={() => setIsAddDoctorDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add Prompt
              </Button>
            </div>
          )}

          {/* Empty search results */}
          {!loading &&
            !error &&
            doctors.length > 0 &&
            filteredDoctors.length === 0 && (
              <div className="p-8 text-center text-teal-600 border border-dashed border-teal-200 rounded-lg">
                <Search className="h-12 w-12 mx-auto mb-2 text-teal-400" />
                <p className="text-lg font-medium mb-1">No doctors found</p>
                <p className="text-sm text-teal-500">
                  Try using different search terms
                </p>
              </div>
            )}

          {/* Doctor list */}
          {!loading && !error && filteredDoctors.length > 0 && (
            <>
              <div className="divide-y divide-teal-100 rounded-b-lg border border-teal-100">
                {getPaginatedDoctors().map((doc, index) => (
                  <div
                    key={doc.id}
                    className="md:grid md:grid-cols-4 p-4 flex flex-col text-sm items-start md:items-center hover:bg-teal-50/50 transition-colors"
                  >
                    {/* Mobile view doctor card */}
                    <div className="flex items-center justify-between w-full md:hidden mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 bg-teal-100 text-teal-700">
                          <AvatarFallback>
                            {getInitials(doc.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-teal-800">
                            {doc.name}
                          </div>
                         
                        </div>
                      </div>
                      {/* <Button
                        variant="outline"
                        size="sm"
                        className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setIsDialogOpen(true);
                        }}
                      >
                        View
                      </Button> */}
                    </div>

             
               

                    {/* Desktop view table cells */}
                    <div className="hidden md:block font-medium text-teal-800">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </div>
                    <div className="hidden md:block text-teal-700">
                      {doc.name}
                    </div>
                    <div className="hidden md:block"></div>
                    {/* <div className="hidden md:block text-teal-700"></div>
                    <div className="hidden md:flex items-center space-x-2"></div> */}
                 
                    <div className="flex gap-2">
                          <Button
                        // variant="outline"
                        size="sm"
                        className="border-teal-200 text-white hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setIsDialogOpenvox(true);
                        }}
                      >
                    Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setIsDialogOpen(true);
                        }}
                      >
                        View Pdf
                      </Button>
                      <Button     variant="outline"
                       className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                      > <Trash2 /></Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 px-2">
                  <div className="text-sm text-teal-600">
                    Showing {getPaginationInfo()} entries
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="border-teal-200 text-teal-600 hover:bg-teal-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex items-center space-x-1">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <Button
                              key={pageNum}
                              variant={
                                currentPage === pageNum ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => goToPage(pageNum)}
                              className={
                                currentPage === pageNum
                                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                                  : "border-teal-200 text-teal-600 hover:bg-teal-50"
                              }
                            >
                              {pageNum}
                            </Button>
                          );
                        }
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="border-teal-200 text-teal-600 hover:bg-teal-50"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      {/* Doctor Profile Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md p-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
            <DialogTitle className="text-center text-teal-800 flex items-center justify-center">
            
            Prompt Pdf
            </DialogTitle>
          </DialogHeader>
 <div className="h-[60vh] overflow-auto border rounded-md bg-white">
            {/* {reportPdf ? ( */}
              <iframe
                // src={reportPdf}
                title="AI Report PDF"
                width="100%"
                height="100%"
                className="border-0"
              ></iframe>
            {/* ) : (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              </div>
            )} */}
          </div>
          
              <DialogFooter className="p-2 bg-gray-50">
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add prompt Dialog */}
      <Dialog
        open={isAddDoctorDialogOpen}
        onOpenChange={setIsAddDoctorDialogOpen}
      >
        <DialogContent className="sm:max-w-md p-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
            <DialogTitle className="text-center text-teal-800 flex items-center justify-center">
              New Prompt
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="">
              <label
                htmlFor="observation-textarea"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Add Text
              </label>
              <Textarea
                id="assessment"
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                placeholder="Enter your assessment..."
                className="min-h-32 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  {assessment.length}/10000 characters
                </p>
                {successMsg && (
                  <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    {successMsg}
                  </p>
                )}
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="pdf">Upload Prompt PDF</Label>
                <Input
                  id="pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="border-teal-500"
                />
                {pdfFile && (
                  <p className="text-sm text-gray-500">
                    Selected: {pdfFile.name}
                  </p>
                )}
                {/* <ErrorMessage error={errors.pdf} /> */}
              </div>
            </div>

            <Button
              //   onClick={handleSaveAssessment}
              //   disabled={loading || !assessment.trim()}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium py-2.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-spin" />
                  Saving Prompt...
                </div>
              ) : (
                <div className="flex items-center gap-2">Submit</div>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpenvox} onOpenChange={setIsDialogOpenvox}>
        <DialogContent className="sm:max-w-md p-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4">
            <DialogTitle className="text-center text-teal-800 flex items-center justify-center">
              <PhoneIcon className="mr-2 h-5 w-5" />
              Edit Prompt{" "}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="">
              <label
                htmlFor="observation-textarea"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
            Edit Text
              </label>
              <Textarea
                id="assessment"
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                placeholder="Enter your assessment..."
                className="min-h-32 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  {assessment.length}/10000 characters
                </p>
                {successMsg && (
                  <p className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    {successMsg}
                  </p>
                )}
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="pdf">Upload Prompt PDF</Label>
                <Input
                  id="pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="border-teal-500"
                />
                {pdfFile && (
                  <p className="text-sm text-gray-500">
                    Selected: {pdfFile.name}
                  </p>
                )}
                {/* <ErrorMessage error={errors.pdf} /> */}
              </div>
            </div>

            <Button
              //   onClick={handleSaveAssessment}
              //   disabled={loading || !assessment.trim()}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium py-2.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-spin" />
                  Saving Prompt...
                </div>
              ) : (
                <div className="flex items-center gap-2">Submit</div>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPromptTab;
