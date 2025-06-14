


// import React from 'react'
// import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "@/App";
// import ChatbotBackground from '@/components/chatbot/ChatbotBackground';
// import Chatbox from '@/components/dashboard/tabs/Chatbox';
// import Lottie from "lottie-react";
// import Splash from "../assets/json/Splash (1).json"

// const ChatBotPage = () => {
//   const { toast } = useToast();
//   const { theme } = useTheme();
  
//   // Determine theme-specific classes
//   const getThemeClasses = () => {
//     if (!theme || theme === "default") return "";
//     return `theme-${theme}`;
//   };
  
//   const themeClasses = getThemeClasses();
  
//   return (
//     <ChatbotBackground themeClasses={themeClasses}>
//       <div className="h-screen flex flex-col">
//         {/* Header */}
//         <div className="flex-shrink-0 border-b border-border/20 bg-background/80 backdrop-blur-sm">
//           <div className="max-w-4xl mx-auto px-4 py-3">
//             <div className="flex items-center justify-center space-x-3">
//               <Lottie animationData={Splash} loop style={{ width: 40, height: 40 }} />
//               <h1 className="text-xl font-semibold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
//                 Metro Mind
//               </h1>
//             </div>
//           </div>
//         </div>
        
//         {/* Chat Container */}
//         <div className="flex-1 flex justify-center overflow-hidden">
//           <div className="w-full max-w-4xl h-full">
//             <Chatbox />
//           </div>
//         </div>
//       </div>
//     </ChatbotBackground>
//   )
// }

// export default ChatBotPage
import React, { useRef } from 'react'
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/App";
import { Button } from "@/components/ui/button";
import { HelpCircle, Sparkles } from "lucide-react";
import ChatbotBackground from '@/components/chatbot/ChatbotBackground';
import Chatbox from '@/components/dashboard/tabs/Chatbox';
import Lottie from "lottie-react";
import Splash from "../assets/json/Splash (1).json"
import { TooltipProvider, TooltipTrigger,Tooltip,TooltipContent } from '@radix-ui/react-tooltip';

const ChatBotPage = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const chatboxRef = useRef(null);

  // Determine theme-specific classes
  const getThemeClasses = () => {
    if (!theme || theme === "default") return "";
    return `theme-${theme}`;
  };

  const themeClasses = getThemeClasses();

  // Handle generate report
  const handleGenerateReport = () => {
    if (chatboxRef.current && chatboxRef.current.handleGenerateClick) {
      chatboxRef.current.handleGenerateClick();
    }
  };

  return (
    <ChatbotBackground themeClasses={themeClasses}>
      <div className="min-h-screen w-full flex flex-col">
        {/* Header with Generate Report Button */}
        <div className="sticky top-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-sm w-full">
          <div className="w-full px-4 py-5 flex justify-between items-center">
            {/* Left side - Logo and Title */}
            <div className="flex items-center space-x-4">
              <Lottie animationData={Splash} loop style={{ width: 56, height: 56 }} />
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                Metro Mind
              </h1>
            </div>
            
            {/* Right side - Generate Report Button */}
              <div className="flex items-center gap-2"> {/* Added a flex container with gap */}
              {/* Tooltip for instructions - MOVED HERE */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-sm bg-white rounded-lg p-4 shadow-md">
                    <p className="font-semibold mb-1 text-teal-800">How to Use Metro Mind:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Start by sharing your feelings and thoughts with this psychologist chatbot.</li>
                      <li>The chatbot needs sufficient data from your conversation to generate a meaningful report.</li>
                      <li>The "Generate Report" button will become active only after enough interaction.</li>
                      <li>Once the report is generated, you'll be redirected to your dashboard.</li>
                      <li>Keep chatting until the "Generate Report" button is enabled!</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Generate Report Button */}
              <Button
                onClick={handleGenerateReport}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
        
        {/* Chat Container */}
        <div className="flex-1 w-full flex justify-center items-stretch bg-background">
          <Chatbox ref={chatboxRef} />
        </div>
      </div>
    </ChatbotBackground>
  )
}

export default ChatBotPage;