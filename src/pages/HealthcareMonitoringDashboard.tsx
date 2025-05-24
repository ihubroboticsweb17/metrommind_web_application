import { useState, useEffect } from "react";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  Bell, 
  AlertTriangle, 
  Activity, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock,
  RefreshCw
} from "lucide-react";

// Mock data for the dashboard
const mockPatientStats = {
  total: 87,
  new: 12,
  critical: 5,
  pending: 23,
  treated: 47
};

const mockSeverityData = [
  { name: "High", value: 15, color: "#ef4444" },
  { name: "Medium", value: 32, color: "#f59e0b" },
  { name: "Low", value: 40, color: "#3b82f6" }
];

const mockConditionData = [
  { name: "Depression", count: 34, color: "#8b5cf6" },
  { name: "Anxiety", count: 27, color: "#ec4899" },
  { name: "PTSD", count: 14, color: "#14b8a6" },
  { name: "Bipolar", count: 8, color: "#f97316" },
  { name: "Other", count: 4, color: "#6b7280" }
];

const mockActivityData = [
  { name: "Mon", appointments: 14, diagnoses: 7 },
  { name: "Tue", appointments: 21, diagnoses: 11 },
  { name: "Wed", appointments: 17, diagnoses: 9 },
  { name: "Thu", appointments: 23, diagnoses: 15 },
  { name: "Fri", appointments: 19, diagnoses: 12 },
  { name: "Sat", appointments: 8, diagnoses: 5 },
  { name: "Sun", appointments: 4, diagnoses: 2 }
];

const mockAlerts = [
  { id: 1, patient: "Jessica Wilson", type: "High Risk", message: "Suicide risk detected", time: "10 mins ago" },
  { id: 2, patient: "Michael Brown", type: "Pending Action", message: "Awaiting specialist assignment", time: "43 mins ago" },
  { id: 3, patient: "Sarah Johnson", type: "Follow-up", message: "Follow-up appointment required", time: "2 hrs ago" },
  { id: 4, patient: "David Clark", type: "Critical", message: "Critical diagnosis needs approval", time: "3 hrs ago" }
];

const mockPatients = [
  { id: 101, name: "Jessica Wilson", age: 28, gender: "Female", diagnosis: "Depression, Anxiety", severity: "High", lastSeen: "Today", status: "Pending specialist" },
  { id: 102, name: "Michael Brown", age: 42, gender: "Male", diagnosis: "PTSD", severity: "Medium", lastSeen: "Yesterday", status: "Treatment ongoing" },
  { id: 103, name: "Sarah Johnson", age: 35, gender: "Female", diagnosis: "Bipolar disorder", severity: "Medium", lastSeen: "May 5", status: "Follow-up needed" },
  { id: 104, name: "David Clark", age: 19, gender: "Male", diagnosis: "Depression", severity: "High", lastSeen: "May 7", status: "Critical" },
  { id: 105, name: "Emma Thompson", age: 31, gender: "Female", diagnosis: "Anxiety", severity: "Low", lastSeen: "May 4", status: "Treatment ongoing" }
];

const HealthcareMonitoringDashboard = () => {
  const [selectedView, setSelectedView] = useState("dashboard");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const getSeverityBadge = (severity) => {
    const severityColors = {
      "High": "bg-red-100 text-red-800 border-red-200",
      "Medium": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Low": "bg-blue-100 text-blue-800 border-blue-200"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${severityColors[severity]}`}>
        {severity}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      "Pending specialist": "bg-purple-100 text-purple-800 border-purple-200",
      "Treatment ongoing": "bg-green-100 text-green-800 border-green-200",
      "Follow-up needed": "bg-blue-100 text-blue-800 border-blue-200",
      "Critical": "bg-red-100 text-red-800 border-red-200"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="w-full bg-gray-50 text-gray-800">
      {/* Header & Navigation */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-teal-700">Healthcare Monitoring System</h1>
          <p className="text-sm text-gray-500">Real-time patient monitoring dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleRefresh}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <RefreshCw className={`h-5 w-5 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              4
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex border-b border-gray-200 bg-white">
        <button 
          className={`py-3 px-6 font-medium text-sm transition-colors ${selectedView === 'dashboard' ? 'border-b-2 border-teal-500 text-teal-700' : 'text-gray-600 hover:text-teal-600'}`}
          onClick={() => setSelectedView('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`py-3 px-6 font-medium text-sm transition-colors ${selectedView === 'patients' ? 'border-b-2 border-teal-500 text-teal-700' : 'text-gray-600 hover:text-teal-600'}`}
          onClick={() => setSelectedView('patients')}
        >
          Patients
        </button>
        <button 
          className={`py-3 px-6 font-medium text-sm transition-colors ${selectedView === 'alerts' ? 'border-b-2 border-teal-500 text-teal-700' : 'text-gray-600 hover:text-teal-600'}`}
          onClick={() => setSelectedView('alerts')}
        >
          Alerts
        </button>
      </div>

      {/* Dashboard View */}
      {selectedView === 'dashboard' && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Patient Stats */}
          <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <p className="text-2xl font-bold text-gray-800">{mockPatientStats.total}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">New Patients</p>
                <p className="text-2xl font-bold text-gray-800">{mockPatientStats.new}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center">
              <div className="p-3 rounded-full bg-red-100 mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Critical Cases</p>
                <p className="text-2xl font-bold text-gray-800">{mockPatientStats.critical}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Review</p>
                <p className="text-2xl font-bold text-gray-800">{mockPatientStats.pending}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center">
              <div className="p-3 rounded-full bg-teal-100 mr-4">
                <CheckCircle className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Treated Patients</p>
                <p className="text-2xl font-bold text-gray-800">{mockPatientStats.treated}</p>
              </div>
            </div>
          </div>
          
          {/* Activity Chart */}
          <div className="col-span-full md:col-span-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium mb-4 text-gray-700">Weekly Activity</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockActivityData}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" fill="#3b82f6" name="Appointments" />
                <Bar dataKey="diagnoses" fill="#10b981" name="Diagnoses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Risk Severity Chart */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium mb-4 text-gray-700">Risk Severity</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={mockSeverityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {mockSeverityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Conditions Chart */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-medium mb-4 text-gray-700">Top Conditions</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart 
                layout="vertical"
                data={mockConditionData}
                margin={{ top: 0, right: 0, left: 35, bottom: 0 }}
              >
                <XAxis type="number" fontSize={12} />
                <YAxis dataKey="name" type="category" fontSize={12} />
                <Tooltip />
                <Bar dataKey="count">
                  {mockConditionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Recent Alerts */}
          <div className="col-span-full md:col-span-2 lg:col-span-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">Recent Alerts</h2>
              <button className="text-sm text-teal-600 hover:text-teal-700">View All</button>
            </div>
            <div className="space-y-3">
              {mockAlerts.map(alert => (
                <div key={alert.id} className="flex items-center border-b border-gray-100 pb-3">
                  <div className={`p-2 rounded-full mr-3 ${
                    alert.type === "High Risk" ? "bg-red-100" : 
                    alert.type === "Critical" ? "bg-orange-100" : 
                    alert.type === "Pending Action" ? "bg-blue-100" : "bg-yellow-100"
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      alert.type === "High Risk" ? "text-red-600" : 
                      alert.type === "Critical" ? "text-orange-600" : 
                      alert.type === "Pending Action" ? "text-blue-600" : "text-yellow-600"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{alert.patient}</p>
                    <p className="text-sm text-gray-500">{alert.message}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      alert.type === "High Risk" ? "bg-red-100 text-red-800" : 
                      alert.type === "Critical" ? "bg-orange-100 text-orange-800" : 
                      alert.type === "Pending Action" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {alert.type}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Appointments */}
          <div className="col-span-full md:col-span-2 lg:col-span-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700">Today's Appointments</h2>
              <button className="text-sm text-teal-600 hover:text-teal-700">View Schedule</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="p-2 bg-teal-100 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Jessica Wilson</p>
                  <p className="text-sm text-gray-500">Follow-up session</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">10:30 AM</p>
                  <p className="text-xs text-gray-500">Dr. Roberts</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Michael Brown</p>
                  <p className="text-sm text-gray-500">Initial consultation</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">1:15 PM</p>
                  <p className="text-xs text-gray-500">Dr. Thompson</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="p-2 bg-purple-100 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Therapy session</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">3:45 PM</p>
                  <p className="text-xs text-gray-500">Dr. Wilson</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Patients View */}
      {selectedView === 'patients' && (
        <div className="p-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-700">Patient List</h2>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Search patients..." 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>All Severities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age/Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{patient.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.age} / {patient.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.diagnosis}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSeverityBadge(patient.severity)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.lastSeen}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(patient.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="px-2 py-1 bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200">
                            View
                          </button>
                          <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                            Assign
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">87</span> patients
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Alerts View */}
      {selectedView === 'alerts' && (
        <div className="p-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-700">System Alerts</h2>
              <div className="flex items-center gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>All Alert Types</option>
                  <option>High Risk</option>
                  <option>Critical</option>
                  <option>Pending Action</option>
                  <option>Follow-up</option>
                </select>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {mockAlerts.map(alert => (
                <div key={alert.id} className="flex p-4 border rounded-lg">
                  <div className={`p-3 rounded-full mr-4 ${
                    alert.type === "High Risk" ? "bg-red-100" : 
                    alert.type === "Critical" ? "bg-orange-100" : 
                    alert.type === "Pending Action" ? "bg-blue-100" : "bg-yellow-100"
                  }`}>
                    <AlertTriangle className={`h-6 w-6 ${
                      alert.type === "High Risk" ? "text-red-600" : 
                      alert.type === "Critical" ? "text-orange-600" : 
                      alert.type === "Pending Action" ? "text-blue-600" : "text-yellow-600"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{alert.patient}</h3>
                        <p className="text-gray-600">{alert.message}</p>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        alert.type === "High Risk" ? "bg-red-100 text-red-800" : 
                        alert.type === "Critical" ? "bg-orange-100 text-orange-800" : 
                        alert.type === "Pending Action" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {alert.type}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm text-gray-500">{alert.time}</p>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md">
                          Dismiss
                        </button>
                        <button className="px-3 py-1 text-sm bg-teal-100 text-teal-700 hover:bg-teal-200 rounded-md">
                          Take Action
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthcareMonitoringDashboard;
