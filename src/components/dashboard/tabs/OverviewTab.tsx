
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Brain, Activity, AlertCircle, Quote } from "lucide-react";
import StatsCard from "../StatsCard";
import ActivityList from "../ActivityList";
import AssistantCard from "../AssistantCard";
import PatientProgress from "../PatientProgress";
import { useTheme } from "@/App";
import EnquiryTab from "./EnquiryTab";
import { useEffect, useState } from "react";
import { quotesauth,} from "@/models/auth";
import { useToast } from "@/hooks/use-toast";
import PatientCountTab from "./PatientCountTab";

interface Quote {
      quote:string;
    author: string;
}
const OverviewTab = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [quote, setQuote] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const qa = await quotesauth();
        console.log("q",qa)
        setQuote(qa);
      } catch (err) {
        console.error("Error fetching quote:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, []);

  return (
    <div className="space-y-4">
       {/* <div className=" gap-4 bg-yellow-200 text-teal-800 p-3 rounded-md shadow-inner">
       {quote.map((q, i) => (
  <div key={i}>
       <p className="italic text-gray-800 text-lg">“{q.quote}”</p>
       <p className="mt-4 text-right font-semibold text-gray-600">— {q.author}</p>
       </div>
))}
      </div> */}      {/* Quote Card - Animated and Interactive */}
      {!loading && quote.length > 0 && (
        <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
          <div
            className={`relative p-6 ${
              theme === "green"
                ? "bg-gradient-to-r from-teal-50 to-teal-100"
                : "bg-gradient-to-r from-gray-900 to-gray-800"
            }`}
          >
            <div className="absolute top-4 right-4">
              <Quote
                className={`h-8 w-8 opacity-30 ${
                  theme === "green" ? "text-teal-600" : "text-teal-400"
                }`}
              />
            </div>
            <div className="max-w-3xl mx-auto">
              {quote.map((q, i) => (
                <div key={i} className="animate-fade-in">
                  <p
                    className={`italic text-xl md:text-2xl font-light leading-relaxed ${
                      theme === "green" ? "text-gray-800" : "text-gray-100"
                    }`}
                  >
                    "{q.quote}"
                  </p>
                  <p
                    className={`mt-4 text-right font-semibold ${
                      theme === "green" ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    — {q.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
      <EnquiryTab/>
      </div>
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          title="Next Session" 
          value="Tomorrow, 2:00 PM" 
          description="Dr. Sarah Johnson"
          icon={<Calendar className="h-4 w-4" />}
          theme={theme}
        />
        <StatsCard 
          title="Medication" 
          value="Improving" 
          description="7-day trend: Positive"
          icon={<Activity className="h-4 w-4" />}
          animationDelay="0.1s"
          theme={theme}
        />
        <StatsCard 
          title="Progress Score" 
          value="65% Complete" 
          description="Treatment plan: 13/20 sessions"
          icon={<Brain className="h-4 w-4" />}
          animationDelay="0.2s"
          theme={theme}
        />
      
      </div> */}
      
      <div className="grid gap-4 md:grid-cols-1">
        {/* <Card className={`col-span-1 ${theme !== "default" ? `bg-theme-${theme}-card border-theme-${theme}-border` : "bg-black-gradient border border-white/5 shadow-dark-glow"}`}>
          <CardHeader>
            <CardTitle className={
            theme === "green"
              ? "text-teal-600"
              : theme !== "default"
              ? "theme-gradient-text"
              : ""
          }>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityList theme={theme} />
          </CardContent>
        </Card> */}
        
        {/* <AssistantCard theme={theme} /> */}
      </div>
      
      {/* New visualization section */}
      {/* <div className="grid gap-4 md:grid-cols-2">
        <PatientProgress theme={theme} />
        
        <Card className={`${theme !== "default" ? `bg-theme-${theme}-card border-theme-${theme}-border` : "bg-black-gradient border border-white/5 shadow-dark-glow"}`}>
          <CardHeader>
            <CardTitle className={theme !== "default" ? "theme-gradient-text" : ""}>
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "May 15", time: "2:00 PM", doctor: "Dr. Sarah Johnson", type: "Therapy Session" },
                { date: "May 22", time: "11:30 AM", doctor: "Dr. Sarah Johnson", type: "Progress Review" },
                { date: "May 29", time: "3:15 PM", doctor: "Dr. Michael Chen", type: "Psychiatric Eval" }
              ].map((appointment, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md flex justify-between items-center ${theme === "green" ? "green-soft-gradient green-border" : "bg-muted/50"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === "green" ? "green-gradient text-white" : "bg-muted"}`}>
                      {appointment.date.split(" ")[1]}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{appointment.type}</p>
                      <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.date}</p>
                    <p className="text-sm text-muted-foreground">{appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};

export default OverviewTab;
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar, Brain, Activity, AlertCircle, Quote, ArrowRight } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "@/App";
// import { quotesauth } from "@/models/auth";
// import StatsCard from "../StatsCard";
// import ActivityList from "../ActivityList";
// import EnquiryTab from "./EnquiryTab";
// import PatientProgress from "../PatientProgress";

// interface Quote {
//   quote: string;
//   author: string;
// }

// const OverviewTab = () => {
//   const { toast } = useToast();
//   const { theme } = useTheme();
//   const [quote, setQuote] = useState<Quote[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeSection, setActiveSection] = useState("overview");

//   useEffect(() => {
//     const fetchQuote = async () => {
//       try {
//         const qa = await quotesauth();
//         setQuote(qa);
//       } catch (err) {
//         console.error("Error fetching quote:", err);
//         toast({
//           title: "Error",
//           description: "Failed to fetch inspirational quote. Please try again later.",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuote();
//   }, [toast]);

//   return (
//     <div className="space-y-6 max-w-7xl mx-auto">
//       {/* Section Navigation */}
//       <div className="flex overflow-x-auto pb-2 mb-2 gap-4">
//         {["overview", "progress", "treatment"].map((section) => (
//           <button
//             key={section}
//             onClick={() => setActiveSection(section)}
//             className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
//               activeSection === section
//                 ? theme === "green"
//                   ? "bg-teal-500 text-white shadow-md"
//                   : "bg-theme-primary text-white"
//                 : theme === "green"
//                 ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                 : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//             }`}
//           >
//             {section.charAt(0).toUpperCase() + section.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Quote Card - Animated and Interactive */}
//       {!loading && quote.length > 0 && (
//         <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
//           <div
//             className={`relative p-6 ${
//               theme === "green"
//                 ? "bg-gradient-to-r from-teal-50 to-teal-100"
//                 : "bg-gradient-to-r from-gray-900 to-gray-800"
//             }`}
//           >
//             <div className="absolute top-4 right-4">
//               <Quote
//                 className={`h-8 w-8 opacity-30 ${
//                   theme === "green" ? "text-teal-600" : "text-teal-400"
//                 }`}
//               />
//             </div>
//             <div className="max-w-3xl mx-auto">
//               {quote.map((q, i) => (
//                 <div key={i} className="animate-fade-in">
//                   <p
//                     className={`italic text-xl md:text-2xl font-light leading-relaxed ${
//                       theme === "green" ? "text-gray-800" : "text-gray-100"
//                     }`}
//                   >
//                     "{q.quote}"
//                   </p>
//                   <p
//                     className={`mt-4 text-right font-semibold ${
//                       theme === "green" ? "text-gray-600" : "text-gray-300"
//                     }`}
//                   >
//                     — {q.author}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       )}

//       {/* Patient Information */}
//       <EnquiryTab theme={theme} />

//       {/* Stats Overview */}
//       <div className="grid gap-6 md:grid-cols-3">
//         <StatsCard
//           title="Next Session"
//           value="Tomorrow, 2:00 PM"
//           description="Dr. Sarah Johnson"
//           icon={<Calendar className="h-5 w-5" />}
//           theme={theme}
//           className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
//         />
//         <StatsCard
//           title="Medication"
//           value="Improving"
//           description="7-day trend: Positive"
//           icon={<Activity className="h-5 w-5" />}
//           animationDelay="0.1s"
//           theme={theme}
//           className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
//         />
//         <StatsCard
//           title="Progress Score"
//           value="65% Complete"
//           description="Treatment plan: 13/20 sessions"
//           icon={<Brain className="h-5 w-5" />}
//           animationDelay="0.2s"
//           theme={theme}
//           className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
//         />
//       </div>

//       {/* Activity Timeline */}
//       <div className="grid gap-6 md:grid-cols-2">
//         <Card
//           className={`transition-all duration-300 hover:shadow-lg ${
//             theme === "green"
//               ? "border-teal-100"
//               : theme !== "default"
//               ? `border-theme-${theme}-border`
//               : "border-gray-800"
//           }`}
//         >
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle
//               className={
//                 theme === "green"
//                   ? "text-teal-600"
//                   : theme !== "default"
//                   ? "theme-gradient-text"
//                   : "text-white"
//               }
//             >
//               Recent Activity
//             </CardTitle>
//             <button
//               className={`text-sm flex items-center gap-1 transition-colors ${
//                 theme === "green"
//                   ? "text-teal-600 hover:text-teal-800"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               View all <ArrowRight className="h-3 w-3" />
//             </button>
//           </CardHeader>
//           <CardContent>
//             <ActivityList theme={theme} />
//           </CardContent>
//         </Card>

//         {/* Patient Progress Chart */}
//         <Card
//           className={`transition-all duration-300 hover:shadow-lg ${
//             theme === "green"
//               ? "border-teal-100"
//               : theme !== "default"
//               ? `border-theme-${theme}-border`
//               : "border-gray-800"
//           }`}
//         >
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle
//               className={
//                 theme === "green"
//                   ? "text-teal-600"
//                   : theme !== "default"
//                   ? "theme-gradient-text"
//                   : "text-white"
//               }
//             >
//               Patient Progress
//             </CardTitle>
//             <div
//               className={`px-2 py-1 rounded text-xs font-medium ${
//                 theme === "green"
//                   ? "bg-teal-100 text-teal-800"
//                   : "bg-gray-800 text-gray-300"
//               }`}
//             >
//               Last 30 days
//             </div>
//           </CardHeader>
//           <CardContent>
//             <PatientProgress theme={theme} />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Alerts and Notifications */}
//       <Card
//         className={`transition-all duration-300 hover:shadow-lg ${
//           theme === "green"
//             ? "border-teal-100 bg-gradient-to-r from-yellow-50 to-orange-50"
//             : theme !== "default"
//             ? `border-theme-${theme}-border bg-gradient-to-r from-gray-900 to-gray-800`
//             : "border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800"
//         }`}
//       >
//         <CardHeader className="pb-2">
//           <CardTitle
//             className={
//               theme === "green"
//                 ? "text-orange-600 flex items-center gap-2"
//                 : theme !== "default"
//                 ? "theme-gradient-text flex items-center gap-2"
//                 : "text-white flex items-center gap-2"
//             }
//           >
//             <AlertCircle className="h-5 w-5" />
//             Important Reminders
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ul className="space-y-3">
//             {[
//               { text: "Medication refill needed in 3 days", priority: "high" },
//               { text: "Lab results ready for review", priority: "medium" },
//               { text: "Follow-up appointment required", priority: "low" },
//             ].map((alert, index) => (
//               <li
//                 key={index}
//                 className={`flex items-start gap-3 p-3 rounded-md ${
//                   theme === "green"
//                     ? alert.priority === "high"
//                       ? "bg-red-50 border-l-4 border-red-500"
//                       : alert.priority === "medium"
//                       ? "bg-yellow-50 border-l-4 border-yellow-500"
//                       : "bg-blue-50 border-l-4 border-blue-500"
//                     : alert.priority === "high"
//                     ? "bg-red-900/30 border-l-4 border-red-500"
//                     : alert.priority === "medium"
//                     ? "bg-yellow-900/30 border-l-4 border-yellow-500"
//                     : "bg-blue-900/30 border-l-4 border-blue-500"
//                 }`}
//               >
//                 <div
//                   className={`h-2 w-2 mt-1.5 rounded-full ${
//                     alert.priority === "high"
//                       ? "bg-red-500"
//                       : alert.priority === "medium"
//                       ? "bg-yellow-500"
//                       : "bg-blue-500"
//                   }`}
//                 />
//                 <span
//                   className={
//                     theme === "green" ? "text-gray-800" : "text-gray-200"
//                   }
//                 >
//                   {alert.text}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default OverviewTab;