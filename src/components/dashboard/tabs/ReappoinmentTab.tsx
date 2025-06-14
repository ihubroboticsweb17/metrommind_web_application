import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Calendar,
  Filter,
  Plus,
  Eye,
  Edit,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { DoctorSlotCreate, Reappointment } from "@/models/auth";
import { FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "react-day-picker";

const ReappointmentTab = () => {
  const { toast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await Reappointment();
        console.log(result.data);
        setData(result.data || []);
      } catch (error) {
        setError(error.message || "Failed to fetch data");
        console.error("Error fetching reappointment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and search logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.patient.patient_id
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesDate =
        dateFilter === "" ||
        new Date(item.assigned_at).toDateString() ===
          new Date(dateFilter).toDateString();

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && item.status) ||
        (statusFilter === "inactive" && !item.status);

      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [data, searchTerm, dateFilter, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleNewSlot = (appointment = null) => {
    setSelectedAppointment(appointment);
    setShowSlotModal(true);
  };

  const SlotCreationModal = () => {
    // const [slotData, setSlotData] = useState({
    //   date: '',
    //   from_time: '',

    //   duration: '60',
    //   notes: ''
    // });
    const [slotData, setSlotData] = useState({
      doctor: "",
      date: "",
      from_time: "",
      to_time: "",
    });
    // const handleSubmit = async (e: FormEvent<HTMLFormElement>)=> {
    //   e.preventDefault();
    //   console.log('Creating slot:', slotData, 'for appointment:', selectedAppointment?.id,
    //     "patient:" ,selectedAppointment.patient.name,
    //     "doctor:",selectedAppointment.doctor.name,
    //   );
    //   // Here you would call your API to create the slot
    //     const formData = {
    //   doctor:selectedAppointment.doctor.name,
    //   date: slotData.date,
    //   from_time: slotData.from_time,
    //   to_time: slotData.to_time,
    // };

    //     const data = await DoctorSlotCreate(formData);
    //     console.log("data",data)
    //         setShowSlotModal(false);
    //          setSlotData({ date: '', to_time: '',from_time: "" ,doctor:""});

    // };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent default form submission

      // Validate form data before submission
      if (
        !selectedAppointment?.doctor?.id ||
        !slotData.date ||
        !slotData.from_time ||
        !slotData.to_time
      ) {
        setErrorMessage("All fields are required.");
        return;
      }

      const formData = {
        doctor: selectedAppointment.doctor.id, // Use ID, not name
        date: slotData.date,
        from_time: slotData.from_time,
        to_time: slotData.to_time,
      };

      try {
        setLoading(true);

        const data = await DoctorSlotCreate(formData); // API call to create slot

        // On success: reset form, hide modal, and show success toast
        setShowSlotModal(false);
        setSlotData({ date: "", from_time: "", to_time: "", doctor: "" });
        setErrorMessage(""); // Clear any previous errors

        console.log("Slot created successfully!", data);

        toast({
          variant: "default",
          title: "Success",
          description: "Slot created successfully!",
        });
      } catch (error: any) {
        console.error("Slot Create failed:", error);

        // Handle backend error messages
        if (error.response && error.response.data) {
          const errorData = error.response.data;

          // Show specific backend error if available
          setErrorMessage(
            errorData.message ||
              "The selected time range is invalid or overlaps with another scheduled slot. Please choose a different range."
          );
        } else {
          // Fallback error
          toast({
            variant: "destructive",
            title: "Unexpected Error",
            description: "Something went wrong. Please try again later.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4 text-center bg-teal-50">
            {selectedAppointment
              ? "Create Reappointment Slot"
              : "Create New Slot"}
          </h3>

          {selectedAppointment && (
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <p className="text-sm">
                <strong>Patient:</strong> {selectedAppointment.patient.name}
              </p>
              <p className="text-sm">
                <strong>Doctor:</strong> {selectedAppointment.doctor.name}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={slotData.date}
                onChange={(e) =>
                  setSlotData({ ...slotData, date: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                From Time
              </label>
              <input
                type="time"
                value={slotData.from_time}
                onChange={(e) =>
                  setSlotData({ ...slotData, from_time: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To Time</label>
              <input
                type="time"
                value={slotData.to_time}
                onChange={(e) =>
                  setSlotData({ ...slotData, to_time: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setShowSlotModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-800"
              >
                Create Slot
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className=" rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b bg-teal-50">
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-2xl font-bold text-teal-800">
              Reappointment Management
            </h2>
            {/* <button
              onClick={() => handleNewSlot()}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Slot
            </button> */}
          </div>

          {/* Filters */}
        </div>
        <div className="m-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients, doctors, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div> */}

            {/* <div className="text-sm pt-2">
              Showing {paginatedData.length} of {filteredData.length} appointments
            </div> */}
          </div>
        </div>

        {/* Table */}
        {!loading && !error && paginatedData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-teal-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor Info
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diagnosis
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patient.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {appointment.patient.patient_id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.patient.email}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                       Dr.{appointment.doctor.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.doctor.role}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.doctor.email}
                        </div>
                      </div>
                    </td>

                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(appointment.assigned_at)}
                    </td> */}

                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          appointment.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status ? "Active" : "Inactive"}
                      </span>
                    </td> */}

                    

                    <td className="px-6 py-6 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleNewSlot(appointment)}
                          className="flex items-center space-x-1 text-teal-600 hover:text-teal-900"
                          title="Create Slot"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Slot</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredData.length > itemsPerPage && (
          <div className="px-6 py-3 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + Math.max(1, currentPage - 2);
                  if (pageNum <= totalPages) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 border rounded-md ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slot Creation Modal */}
      {showSlotModal && <SlotCreationModal />}
    </div>
  );
};

export default ReappointmentTab;
