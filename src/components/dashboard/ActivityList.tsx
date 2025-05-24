
import { ThemeType } from "@/App";
import { useEffect } from "react";

interface ActivityListProps {
  theme?: ThemeType;
}

const ActivityList = ({ theme = "default" }: ActivityListProps) => {
  
  const getDotClass = (index: number) => {
    if (theme === "default") {
      return index === 0 ? "bg-primary" : 
             index === 1 ? "bg-blue-500" : 
             "bg-purple-500";
    }
    
    switch (theme) {
      case "royal":
        return index === 0 ? "bg-theme-royal-primary" : 
               index === 1 ? "bg-theme-royal-secondary" : 
               "bg-theme-royal-accent";
      case "ocean":
        return index === 0 ? "bg-theme-ocean-primary" : 
               index === 1 ? "bg-theme-ocean-secondary" : 
               "bg-theme-ocean-accent";
      case "emerald":
        return index === 0 ? "bg-theme-emerald-primary" : 
               index === 1 ? "bg-theme-emerald-secondary" : 
               "bg-theme-emerald-accent";
      case "sunset":
        return index === 0 ? "bg-theme-sunset-primary" : 
               index === 1 ? "bg-theme-sunset-secondary" : 
               "bg-theme-sunset-accent";
      case "pink":
        return index === 0 ? "bg-theme-pink-primary" : 
               index === 1 ? "bg-theme-pink-secondary" : 
               "bg-theme-pink-accent";
      case "green":
        return index === 0 ? "bg-theme-teal-primary" : 
               index === 1 ? "bg-theme-teal-secondary" : 
               "bg-theme-green-accent";
      default:
        return index === 0 ? "bg-primary" : 
               index === 1 ? "bg-blue-500" : 
               "bg-purple-500";
    }
  };
  
  const activities = [
    {
      title: "Completed mood assessment",
      time: "Yesterday at 4:30 PM"
    },
    {
      title: "Therapy session with Dr. Johnson",
      time: "Monday at 2:00 PM"
    },
    {
      title: "Updated treatment goals",
      time: "Last week"
    }
  ];
 
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className={`w-2 h-2 rounded-full ${getDotClass(index)} animate-pulse`}></div>
          <div className="flex-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
// import { useEffect, useState } from "react";

// import { ThemeType } from "@/App";
// import { PatientAssessmentList } from "@/models/auth";

// interface ActivityListProps {
//   theme?: ThemeType;
//   patientId: number;
// }

// const ActivityList = ({ theme = "default", patientId }: ActivityListProps) => {
//   const [questions, setQuestions] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchAssessment = async () => {
//       try {
//         const data = await PatientAssessmentList(patientId);
// console.log("activity",data)
//         // Assuming `data` is an array of objects with a `question_text` field
//         const questionTexts = data.map((item: any) => item.question_text);
//         setQuestions(questionTexts);
//       } catch (error) {
//         console.error("Failed to fetch assessment questions:", error);
//       }
//     };

//     fetchAssessment();
//   }, [patientId]);

//   const getDotClass = (index: number) => {
//     if (theme === "default") {
//       return index === 0
//         ? "bg-primary"
//         : index === 1
//         ? "bg-blue-500"
//         : "bg-purple-500";
//     }

//     switch (theme) {
//       case "royal":
//         return index === 0
//           ? "bg-theme-royal-primary"
//           : index === 1
//           ? "bg-theme-royal-secondary"
//           : "bg-theme-royal-accent";
//       case "ocean":
//         return index === 0
//           ? "bg-theme-ocean-primary"
//           : index === 1
//           ? "bg-theme-ocean-secondary"
//           : "bg-theme-ocean-accent";
//       case "emerald":
//         return index === 0
//           ? "bg-theme-emerald-primary"
//           : index === 1
//           ? "bg-theme-emerald-secondary"
//           : "bg-theme-emerald-accent";
//       case "sunset":
//         return index === 0
//           ? "bg-theme-sunset-primary"
//           : index === 1
//           ? "bg-theme-sunset-secondary"
//           : "bg-theme-sunset-accent";
//       case "pink":
//         return index === 0
//           ? "bg-theme-pink-primary"
//           : index === 1
//           ? "bg-theme-pink-secondary"
//           : "bg-theme-pink-accent";
//       case "green":
//         return index === 0
//           ? "bg-theme-teal-primary"
//           : index === 1
//           ? "bg-theme-teal-secondary"
//           : "bg-theme-green-accent";
//       default:
//         return index === 0
//           ? "bg-primary"
//           : index === 1
//           ? "bg-blue-500"
//           : "bg-purple-500";
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {questions.map((question, index) => (
//         <div key={index} className="flex items-center gap-4">
//           <div
//             className={`w-2 h-2 rounded-full ${getDotClass(index)} animate-pulse`}
//           ></div>
//           <div className="flex-1">
//             <p className="text-sm font-medium">{question}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ActivityList;
