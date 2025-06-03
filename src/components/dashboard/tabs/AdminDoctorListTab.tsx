
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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DoctorList, TalktoEnableButton } from "@/models/auth";
import AddDoctorTab from "./AddDoctorTab";
import SlotSelector from "./SlotSelector";
import { useToast } from "@/hooks/use-toast";


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

const AdminDoctorListTab = () => {
    const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDoctorDialogOpen, setIsAddDoctorDialogOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isOpenSlot, setIsOpenSlot] = useState(false);
  const [toggleLoading, setToggleLoading] = useState({});
 const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
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
      console.log("doctorlist",data)
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
      setToggleLoading(prev => ({ ...prev, [doctorId]: true }));
      
      const formData = {
        doctor_id: doctorId,
        is_call_available: !currentStatus
      };

      const response = await TalktoEnableButton(formData);
      
      if (response.status === "ok") {
        // Update the doctor's call_enabled status in the local state
        const updatedDoctors = doctors.map(doctor => 
          doctor.id === doctorId 
            ? { ...doctor, call_enabled: !currentStatus }
            : doctor
        );
        console.log("response.is_call_available",response.is_call_available)
        setDoctors(updatedDoctors);
        setFilteredDoctors(updatedDoctors);
        
           toast({
          variant: "default",
        title: response.message
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
      setToggleLoading(prev => ({ ...prev, [doctorId]: false }));
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
    const endItem = Math.min(currentPage * itemsPerPage, filteredDoctors.length);
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
              <CardTitle className="text-teal-800 text-lg">
                Doctor List
              </CardTitle>
              <CardDescription className="text-teal-600">
                Total doctors: {doctors.length}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1"
                onClick={() => setIsAddDoctorDialogOpen(true)}
                  
              >
                <Plus className="h-4 w-4" />
                Add Doctor
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1"
                onClick={() => setIsOpenSlot(true)}
              >
                <Plus className="h-4 w-4" />
                Add Slot
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
                placeholder="Search doctors..."
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
          <div className="hidden md:grid md:grid-cols-6 bg-teal-50 p-3 rounded-t-lg text-sm font-medium text-teal-800">
            <div className="pl-2">Sl.No</div>
            <div>Name</div>
            <div>Role</div>
            <div>Doctor ID</div>
            <div>Call Available</div>
            <div></div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="p-8 text-center text-teal-600 flex flex-col items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p>Loading doctors...</p>
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
                Add Doctor
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
                    className="md:grid md:grid-cols-6 p-4 flex flex-col text-sm items-start md:items-center hover:bg-teal-50/50 transition-colors"
                  >
                    {/* Mobile view doctor card */}
                    <div className="flex items-center justify-between w-full md:hidden mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 bg-teal-100 text-teal-700">
                          <AvatarFallback>{getInitials(doc.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-teal-800">
                            {doc.name}
                          </div>
                          <Badge
                            className={`${getRoleBadgeColor(
                              doc.role
                            )} font-normal`}
                          >
                            {formatRole(doc.role)}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setIsDialogOpen(true);
                        }}
                      >
                        View
                      </Button>
                    </div>

                    {/* Mobile call toggle */}
                    <div className="flex items-center justify-between w-full md:hidden mb-2">
                      <Label htmlFor={`call-toggle-mobile-${doc.id}`} className="text-sm font-medium text-teal-700">
                        Call Available
                      </Label>
                      <div className="flex items-center space-x-2">
                        {toggleLoading[doc.id] && (
                          <Loader2 className="h-4 w-4 animate-spin text-teal-500" />
                        )}
                        <Switch
                          id={`call-toggle-mobile-${doc.id}`}
                          checked={doc.call_enabled || false}
                          onCheckedChange={() => handleCallToggle(doc.id, doc.call_enabled)}
                          disabled={toggleLoading[doc.id]}
                          className="data-[state=checked]:bg-teal-600"
                        />
                      </div>
                    </div>

                    {/* Desktop view table cells */}
                    <div className="hidden md:block font-medium text-teal-800">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </div>
                    <div className="hidden md:block text-teal-700">
                      {doc.name}
                    </div>
                    <div className="hidden md:block">
                      <Badge
                        className={`${getRoleBadgeColor(doc.role)} font-normal`}
                      >
                        {formatRole(doc.role)}
                      </Badge>
                    </div>
                    <div className="hidden md:block text-teal-700">{doc.id}</div>
                    <div className="hidden md:flex items-center space-x-2">
                      {toggleLoading[doc.id] && (
                        <Loader2 className="h-4 w-4 animate-spin text-teal-500" />
                      )}
                      <Switch
                        checked={doc.call_enabled || false}
                        onCheckedChange={() => handleCallToggle(doc.id, doc.call_enabled)}
                        disabled={toggleLoading[doc.id]}
                        className="data-[state=checked]:bg-teal-600"
                      />
                    </div>
                    <div className="hidden md:block text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setIsDialogOpen(true);
                        }}
                      >
                        View Profile
                      </Button>
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
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                            variant={currentPage === pageNum ? "default" : "outline"}
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
                      })}
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
              <User className="mr-2 h-5 w-5" />
              Doctor Profile
            </DialogTitle>
          </DialogHeader>

          {selectedDoctor && (
            <>
              <div className="p-4 space-y-4">
                <div className="flex flex-col items-center justify-center mb-6">
                  <Avatar className="h-20 w-20 bg-teal-800 text-teal-700 mb-3">
                    <AvatarFallback>
                      {getInitials(selectedDoctor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-teal-900">
                    {selectedDoctor.name}
                  </h3>
                  <Badge
                    className={`mt-1 ${getRoleBadgeColor(selectedDoctor.role)}`}
                  >
                    {formatRole(selectedDoctor.role)}
                  </Badge>
                  <div className="flex items-center mt-2">
                    <Badge
                      variant="outline"
                      className="flex items-center text-xs border-teal-200 text-teal-700"
                    >
                      ID: {selectedDoctor.id}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="ml-2 flex items-center text-xs border-teal-200 text-teal-700"
                    >
                      {selectedDoctor.verified === "true" ? (
                        <>
                          <Check className="mr-1 h-3 w-3" /> Verified
                        </>
                      ) : (
                        <>
                          <X className="mr-1 h-3 w-3" /> Not Verified
                        </>
                      )}
                    </Badge>
                  </div>
                </div>

                {/* Call availability in profile */}
                <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                  <Label htmlFor={`call-toggle-profile-${selectedDoctor.id}`} className="text-sm font-medium text-teal-700">
                    Call Available
                  </Label>
                  <div className="flex items-center space-x-2">
                    {toggleLoading[selectedDoctor.id] && (
                      <Loader2 className="h-4 w-4 animate-spin text-teal-500" />
                    )}
                    <Switch
                      id={`call-toggle-profile-${selectedDoctor.id}`}
                      checked={selectedDoctor.call_enabled || false}
                      onCheckedChange={() => handleCallToggle(selectedDoctor.id, selectedDoctor.call_enabled)}
                      disabled={toggleLoading[selectedDoctor.id]}
                      className="data-[state=checked]:bg-teal-600"
                   
                    />
                  </div>
                </div>

                <div className="space-y-3 border-t border-b border-teal-100 py-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-teal-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-teal-900">Phone</p>
                      <p className="text-sm text-teal-600">
                        {selectedDoctor.mobile_number || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-teal-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-teal-900">Email</p>
                      <p className="text-sm text-teal-600">
                        {selectedDoctor.email || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {selectedDoctor.age && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-teal-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-teal-900">
                          Age & Gender
                        </p>
                        <p className="text-sm text-teal-600">
                          {selectedDoctor.age} years,{" "}
                          {selectedDoctor.gender?.charAt(0).toUpperCase() +
                            selectedDoctor.gender?.slice(1) || ""}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedDoctor.occupation && (
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 text-teal-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-teal-900">
                          Occupation
                        </p>
                        <p className="text-sm text-teal-600">
                          {selectedDoctor.occupation}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedDoctor.education && (
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 text-teal-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-teal-900">
                          Education
                        </p>
                        <p className="text-sm text-teal-600">
                          {selectedDoctor.education}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedDoctor.address && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-teal-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-teal-900">
                          Address
                        </p>
                        <p className="text-sm text-teal-600">
                          {selectedDoctor.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="p-2 bg-gray-50">
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Doctor Dialog */}
      <Dialog
        open={isAddDoctorDialogOpen}
        onOpenChange={setIsAddDoctorDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800 flex items-center justify-center">
              <Plus className="mr-2 h-5 w-5" />
              Add New Doctor
            </DialogTitle>
          </DialogHeader>
          <AddDoctorTab onSuccess={() => setIsAddDoctorDialogOpen(false)} 
             onDoctorAdded={handleDoctorAdded} />
        </DialogContent>
      </Dialog>

      {/* Add Slot Dialog */}
      <Dialog open={isOpenSlot} onOpenChange={setIsOpenSlot}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center bg-teal-50 border-b border-teal-100 p-4">
              Create Slot
            </DialogTitle>
          </DialogHeader>
          <SlotSelector 
            onClose={() => {
    
    setIsOpenSlot(false);
  }}
  onSlotAdded={() => {
   
    window.location.reload(); 
  }}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDoctorListTab;
