
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Video, Phone, AlertCircle, Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { endOfDay, isPast, isToday, isTomorrow, isValid, parseISO, startOfDay,format  } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { AppointmentDetailtoPatient } from "@/models/auth";


// Using native JavaScript Date methods instead of date-fns

interface PatientAppointmentsProps {
  theme?: string;
}

interface DoctorDetails {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  role: string;
}

interface PatientDetails {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  patient_id_metro: string;
}

interface SlotDetails {
  id: number;
  date: string;
  from_time: string;
  to_time: string;
}

interface Appointment {
  id: number;
  doctor_details: DoctorDetails;
  patient_details: PatientDetails;
  slot_details: SlotDetails;
  date: string;
  consulted: boolean;
  doctor: number;
  patient: number;
  slot: number;
}

const PatientAppoinmentList = ({ theme = "green" }: PatientAppointmentsProps) => {
    const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  
  // Table state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Mock data for demonstration
   useEffect(() => {
      const fetchAppointments = async () => {
        try {
          setIsLoading(true);
          const response = await AppointmentDetailtoPatient();
          if (response.status === "ok") {
            setAppointments(response.data);
            
          } else {
            toast({
              title: "Error",
              description: "Failed to load appointments",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error fetching appointments:", error);
          toast({
            title: "Error",
            description: "Failed to load appointments",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchAppointments();
    }, [toast]);

  const getThemeClasses = () => {
    switch (theme) {
      case "royal":
        return "bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200";
      case "ocean":
        return "bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200";
      case "emerald":
        return "bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200";
      case "sunset":
        return "bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200";
      case "pink":
        return "bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200";
      case "green":
        return "bg-gradient-to-br from-teal-50 to-green-50 border-2 border-teal-200";
      default:
        return "bg-white border-2 border-gray-200";
    }
  };

  const getButtonClass = () => {
    switch (theme) {
      case "royal":
        return "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700";
      case "ocean":
        return "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700";
      case "emerald":
        return "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700";
      case "sunset":
        return "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700";
      case "pink":
        return "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700";
      case "green":
        return "bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800";
    }
  };

  const getStatusBadge = (appointment: Appointment): string => {
    const appointmentDate = parseISO(appointment.date);
    const appointmentTime = new Date(`${appointment.date}T${appointment.slot_details.from_time}`);
    const isPastAppointment = isPast(appointmentTime);
    
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    if (appointment.consulted) {
      return `${baseClasses} bg-gray-100 text-gray-800`;
    } else if (isPastAppointment) {
      return `${baseClasses} bg-red-100 text-red-800`;
    } else if (isToday(appointmentDate)) {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else if (isTomorrow(appointmentDate)) {
      return `${baseClasses} bg-blue-100 text-blue-800`;
    } else {
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  const getStatusText = (appointment: Appointment): string => {
    const appointmentDate = parseISO(appointment.date);
    const appointmentTime = new Date(`${appointment.date}T${appointment.slot_details.from_time}`);
    const isPastAppointment = isPast(appointmentTime);
    
    if (appointment.consulted) {
      return "Completed";
    } else if (isPastAppointment) {
      return "Missed";
    } else if (isToday(appointmentDate)) {
      return "Today";
    } else if (isTomorrow(appointmentDate)) {
      return "Tomorrow";
    } else {
      return "Upcoming";
    }
  };

  const formatAppointmentDate = (dateStr: string): string => {
    try {
      const date = parseISO(dateStr);
      if (!isValid(date)) {
        return "Invalid date";
      }
      
      if (isToday(date)) {
        return "Today";
      } else if (isTomorrow(date)) {
        return "Tomorrow";
      } else {
        return format(date, "MMM dd, yyyy");
      }
    } catch (error) {
      console.error("Date parsing error:", error);
      return dateStr;
    }
  };

  // Filter and sort logic
  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = [...appointments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.doctor_details.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctor_details.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patient_details.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(appointment => {
        const appointmentTime = new Date(`${appointment.date}T${appointment.slot_details.from_time}`);
        const isPastAppointment = isPast(appointmentTime);
        const appointmentDate = parseISO(appointment.date);
        
        switch (statusFilter) {
          case "completed":
            return appointment.consulted;
          case "missed":
            return !appointment.consulted && isPastAppointment;
          case "today":
            return !appointment.consulted && isToday(appointmentDate);
          case "upcoming":
            return !appointment.consulted && !isPastAppointment;
          default:
            return true;
        }
      });
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      filtered = filtered.filter(appointment => {
        const appointmentDate = parseISO(appointment.date);
        
        switch (dateFilter) {
          case "today":
            return isToday(appointmentDate);
          case "week":
            const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            return appointmentDate >= startOfDay(now) && appointmentDate <= endOfDay(weekFromNow);
          case "month":
            const monthFromNow = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
            return appointmentDate >= startOfDay(now) && appointmentDate <= endOfDay(monthFromNow);
          case "past":
            return appointmentDate < startOfDay(now);
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case "doctor":
          aValue = a.doctor_details.name;
          bValue = b.doctor_details.name;
          break;
        case "date":
          aValue = new Date(`${a.date}T${a.slot_details.from_time}`);
          bValue = new Date(`${b.date}T${b.slot_details.from_time}`);
          break;
        case "status":
          aValue = getStatusText(a);
          bValue = getStatusText(b);
          break;
        default:
          aValue = new Date(`${a.date}T${a.slot_details.from_time}`);
          bValue = new Date(`${b.date}T${b.slot_details.from_time}`);
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [appointments, searchTerm, statusFilter, dateFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAndSortedAppointments.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleViewDetails = (appointment: Appointment): void => {
    setSelectedAppointment(appointment);
    setShowDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Card className={`overflow-hidden rounded-xl ${getThemeClasses()} transition-all duration-300`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center text-gray-900">
            <Calendar className="mr-2 h-5 w-5 text-teal-600" />
            Your Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search doctor or patient name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 bg-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="missed">Missed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-48 bg-white">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Patient
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("doctor")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Doctor</span>
                        {sortField === "doctor" && (
                          <span className="text-teal-600">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                   
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date & Time</span>
                        {sortField === "date" && (
                          <span className="text-teal-600">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        {sortField === "status" && (
                          <span className="text-teal-600">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                        No appointments found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedAppointments.map((appointment) => (
                      <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4">
                                 <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <User className="h-8 w-8 rounded-full bg-teal-100 p-1 text-teal-700" />
                            </div>
                            <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                            {appointment.patient_details.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {appointment.patient_details.patient_id_metro}
                          </div>
                          </div>
                            </div>
                          
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                          
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                Dr. {appointment.doctor_details.name}
                              </div>
                              <div className="text-sm text-gray-500 capitalize">
                                {appointment.doctor_details.role}
                              </div>
                            </div>
                          </div>
                        </td>
                    
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {formatAppointmentDate(appointment.date)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.slot_details.from_time} - {appointment.slot_details.to_time}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={getStatusBadge(appointment)}>
                            {getStatusText(appointment)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <Button
                            onClick={() => handleViewDetails(appointment)}
                            size="sm"
                            className={`text-xs ${getButtonClass()} text-white`}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedAppointments.length)} of {filteredAndSortedAppointments.length} results
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-20 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="bg-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-white"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appointment Detail Dialog - Same as original */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Appointment Details</DialogTitle>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center pb-4 border-b border-gray-200">
                <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center mb-2">
                  <User className="h-8 w-8 text-teal-700" />
                </div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {selectedAppointment.patient_details.name}
                </h3>
                <p className="text-gray-600 capitalize">
                ID: {selectedAppointment.patient_details.patient_id_metro}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">{formatAppointmentDate(selectedAppointment.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Time Slot</p>
                    <p className="font-medium text-gray-900">
                      {selectedAppointment.slot_details.from_time} to {selectedAppointment.slot_details.to_time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium text-gray-900">{selectedAppointment.patient_details.mobile_number}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium text-gray-900">
                      {getStatusText(selectedAppointment)}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* {!selectedAppointment.consulted && !isPast(new Date(`${selectedAppointment.date}T${selectedAppointment.slot_details.from_time}`)) && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <Video className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Joining Instructions</p>
                      <p className="text-sm text-blue-700 mt-1">
                        You'll receive a link to join the video consultation 15 minutes before your appointment time.
                      </p>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          )}
          
          <DialogFooter>
            <Button
              onClick={() => setShowDialog(false)}
              className={`${getButtonClass()} text-white`}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientAppoinmentList;
