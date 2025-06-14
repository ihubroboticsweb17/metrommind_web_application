
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Video, Phone, AlertCircle } from "lucide-react";
import { AppointmentDetailtoPatient } from "@/models/auth"; // Import your API function
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO, isToday, isTomorrow, isPast, isValid } from "date-fns";

interface ThemeType {
  type: "royal" | "ocean" | "emerald" | "sunset" | "pink" | "green";
}

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

interface ApiResponse {
  status: string;
  message: string;
  data: Appointment[];
}

const PsychiatristPatientAppointment = ({ theme = "green" }: PatientAppointmentsProps) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { toast } = useToast();

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

  const getButtonClass = () => {
    switch (theme) {
      case "royal":
        return "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl";
      case "ocean":
        return "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl";
      case "emerald":
        return "bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl";
      case "sunset":
        return "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl";
      case "pink":
        return "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl";
      case "green":
        return "bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg";
    }
  };

  const getStatusBadge = (appointment: Appointment): string => {
    const appointmentDate = parseISO(appointment.date);
    const appointmentTime = new Date(`${appointment.date}T${appointment.slot_details.from_time}`);
    const isPastAppointment = isPast(appointmentTime);
    
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium border-2 transform transition-all duration-200 hover:scale-105";
    
    if (appointment.consulted) {
      return `${baseClasses} bg-gray-100 text-gray-800 border-gray-300 shadow-sm`;
    } else if (isPastAppointment) {
      return `${baseClasses} bg-red-100 text-red-800 border-red-300 shadow-sm`;
    } else if (isToday(appointmentDate)) {
      return `${baseClasses} bg-green-100 text-green-800 border-green-300 shadow-sm`;
    } else if (isTomorrow(appointmentDate)) {
      return `${baseClasses} bg-blue-100 text-blue-800 border-blue-300 shadow-sm`;
    } else {
      return `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-300 shadow-sm`;
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
        return format(date, "PPP"); // Returns format like "April 29, 2023"
      }
    } catch (error) {
      console.error("Date parsing error:", error);
      return dateStr;
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

  if (appointments.length === 0) {
    return (
      <Card className={`overflow-hidden rounded-xl ${getThemeClasses()} transition-all duration-300`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-teal-600" />
            Your Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-gray-100 p-4 mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No appointments scheduled</h3>
            <p className="text-gray-500 mb-4">You don't have any upcoming appointments at the moment.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort appointments by date and time
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.slot_details.from_time}`);
    const dateB = new Date(`${b.date}T${b.slot_details.from_time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <>
      <Card className={`overflow-hidden rounded-xl ${getThemeClasses()} transition-all duration-300`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-teal-600" />
            Your Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedAppointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="bg-white/70 rounded-lg p-4 border border-gray-100 shadow-sm transform transition-all duration-300 hover:shadow-md hover:border-teal-200"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <User className="h-8 w-8 rounded-full bg-teal-100 p-1 text-teal-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
 
                        {appointment.patient_details.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {appointment.patient_details.patient_id_metro}
                      </p>
                    </div>
                  </div>
                  <span className={getStatusBadge(appointment)}>
                    {getStatusText(appointment)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{formatAppointmentDate(appointment.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      {appointment.slot_details.from_time} - {appointment.slot_details.to_time}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    onClick={() => handleViewDetails(appointment)}
                    className={`text-sm px-3 py-1 h-8 ${getButtonClass()}`}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointment Detail Dialog */}
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
                  {selectedAppointment.patient_details.patient_id_metro}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{formatAppointmentDate(selectedAppointment.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Time Slot</p>
                    <p className="font-medium">
                      {selectedAppointment.slot_details.from_time} to {selectedAppointment.slot_details.to_time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{selectedAppointment.patient_details.mobile_number}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">
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
              className={getButtonClass()}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PsychiatristPatientAppointment;

