
import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import DashboardCard from "@/components/ui/DashboardCard";
import { BarChart, LineChart, PieChart, Activity, Calendar, Users, Brain } from "lucide-react";

// Sample data for the dashboard
const stats = [
  { 
    title: "Total Patients", 
    value: "1,248", 
    icon: <Users className="h-5 w-5" />,
    change: "+12.5%",
    changeType: "positive" 
  },
  { 
    title: "Sessions This Month", 
    value: "854", 
    icon: <Calendar className="h-5 w-5" />,
    change: "+5.2%",
    changeType: "positive" 
  },
  { 
    title: "Risk Assessments", 
    value: "642", 
    icon: <Activity className="h-5 w-5" />,
    change: "-2.4%",
    changeType: "negative" 
  },
  { 
    title: "AI Insights Generated", 
    value: "389", 
    icon: <Brain className="h-5 w-5" />,
    change: "+18.3%",
    changeType: "positive" 
  }
];

interface DashboardSectionProps {
  title: string;
  children: ReactNode;
}

const DashboardSection = ({ title, children }: DashboardSectionProps) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
              New Assessment
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  {stat.icon}
                </div>
              </div>
              <div className={`mt-2 text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Activity */}
          <DashboardSection title="Patient Activity">
            <DashboardCard 
              title="Weekly Sessions" 
              icon={<BarChart className="h-5 w-5" />}
              className="h-full"
            >
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Chart visualization would appear here</p>
              </div>
            </DashboardCard>
          </DashboardSection>

          {/* Risk Assessment */}
          <DashboardSection title="Risk Assessment">
            <DashboardCard 
              title="Risk Level Distribution" 
              icon={<PieChart className="h-5 w-5" />}
              className="h-full"
            >
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Chart visualization would appear here</p>
              </div>
            </DashboardCard>
          </DashboardSection>
        </div>

        {/* Recent Insights */}
        <DashboardSection title="Recent AI Insights">
          <DashboardCard 
            title="Sentiment Analysis Trends" 
            icon={<LineChart className="h-5 w-5" />}
          >
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              <p className="text-gray-500">Chart visualization would appear here</p>
            </div>
          </DashboardCard>
        </DashboardSection>
      </div>
    </div>
  );
};

export default Dashboard;
