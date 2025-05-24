// import React from 'react'
// import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "@/App";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Brain } from 'lucide-react';
// import ChatbotBackground from '@/components/chatbot/ChatbotBackground';
// import Chatbox from '@/components/dashboard/tabs/Chatbox';
// import Ani  from "../assets/json/logoAni.json"
// import Lottie from "lottie-react";
// import Logo from '/image/logo.png'
// import ChatUI from '@/components/dashboard/tabs/ChatUI';
// const ChatBotPage = () => {
//     const { toast } = useToast();
//   const { theme } = useTheme();
//       // Determine theme-specific classes
//   const getThemeClasses = () => {
//     if (!theme || theme === "default") return "";
//     return `theme-${theme}`;
//   };
//     const themeClasses = getThemeClasses();
//   return (
//     <ChatbotBackground themeClasses={themeClasses}>
//       <ChatUI/>
//       {/* <Chatbox/> */}
//     </ChatbotBackground>
//   )
// }

// export default ChatBotPage
// // import ChatUI from '@/components/dashboard/tabs/ChatUI'
// // import React from 'react'

// // export const ChatBotPage = () => {
// //   return (
// //     <div>
// //       <ChatUI/>
// //     </div>
// //   )
// // }

// import React from 'react'
// import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "@/App";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Brain } from 'lucide-react';
// import ChatbotBackground from '@/components/chatbot/ChatbotBackground';
// import Chatbox from '@/components/dashboard/tabs/Chatbox';
// import Ani  from "../assets/json/logoAni.json"
// import Lottie from "lottie-react";
// import Logo from '/image/logo.png'
// import ChatUI from '@/components/dashboard/tabs/ChatUI';
// const ChatBotPage = () => {
//     const { toast } = useToast();
//   const { theme } = useTheme();
//       // Determine theme-specific classes
//   const getThemeClasses = () => {
//     if (!theme || theme === "default") return "";
//     return `theme-${theme}`;
//   };
//     const themeClasses = getThemeClasses();
//   return (
//     <ChatbotBackground themeClasses={themeClasses}>
//         <Card className="w-full max-w-md relative z-10 shadow-xl backdrop-blur-sm bg-card/80 border-border/50">
//         <div
//           className={`absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-30`}
//         >
//           <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//         </div>
//         <CardHeader className="space-y-1">
//         <div className="flex justify-center mb-2">
//         {/* <div style={{ width: 100, height: 100 }}>
//       <Lottie animationData={Ani} loop={true} />
//     </div> */}
//     <img src={Logo} alt={Logo} className="relative z-10 w-20 h-20  animate-pulse-subtle" />
//             {/* <Brain className={`h-12 w-12 text-primary animate-pulse-subtle`} /> */}
//         </div>
//         <CardTitle className="text-3xl font-bold text-center">
//             MetroMind Chats
//           </CardTitle>
//         </CardHeader>
//           <CardContent>   
//                     <Chatbox/>
//          </CardContent>
//       </Card>
//       {/* <ChatUI/> */}
//     </ChatbotBackground>
//   )
// }

// export default ChatBotPage

// import React from 'react'
// import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "@/App";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Brain } from 'lucide-react';
// import ChatbotBackground from '@/components/chatbot/ChatbotBackground';
// import Chatbox from '@/components/dashboard/tabs/Chatbox';
// import Ani from "../assets/json/logoAni.json"
// import Lottie from "lottie-react";
// import Logo from '/image/logo.png'
// import ChatUI from '@/components/dashboard/tabs/ChatUI';
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
//       <div className="w-full h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <Card className=" relative z-10 shadow-xl backdrop-blur-sm bg-card/90 border-border/50 flex flex-col overflow-hidden">
//           <div
//             className={`absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-30`}
//           >
//             <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//             <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//             <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//             <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//           </div>
          
//           <CardHeader className="space-y-1 pb-4 border-b border-border/50">
//             <div className="flex justify-center items-center space-x-3">
//                   <Lottie animationData={Splash} loop style={{ width: 60, height: 60 }} />
//               {/* <img src={Logo} alt="Logo" className="relative z-10 w-12 h-12 animate-pulse-subtle" /> */}
//               <CardTitle className="text-2xl font-bold text-center text-primary">
//                 <div className="flex items-center">
        
//             <div className="ml-4">
//               <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
//                 Metro Mind
//               </h1>
//               {/* <p className="text-xs sm:text-sm text-teal-500 mt-1">Your AI assistant</p> */}
//             </div>
//           </div>
//               </CardTitle>
//             </div>
//           </CardHeader>
          
//           <CardContent className="flex-1 p-0 overflow-hidden">
//             <div className="">
//               <Chatbox />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </ChatbotBackground>
//   )
// }

// export default ChatBotPage


import React from 'react'
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/App";
import ChatbotBackground from '@/components/chatbot/ChatbotBackground';
import Chatbox from '@/components/dashboard/tabs/Chatbox';
import Lottie from "lottie-react";
import Splash from "../assets/json/Splash (1).json"

const ChatBotPage = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  
  // Determine theme-specific classes
  const getThemeClasses = () => {
    if (!theme || theme === "default") return "";
    return `theme-${theme}`;
  };
  
  const themeClasses = getThemeClasses();
  
  return (
    <ChatbotBackground themeClasses={themeClasses}>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-border/20 bg-background/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-center space-x-3">
              <Lottie animationData={Splash} loop style={{ width: 40, height: 40 }} />
              <h1 className="text-xl font-semibold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                Metro Mind
              </h1>
            </div>
          </div>
        </div>
        
        {/* Chat Container */}
        <div className="flex-1 flex justify-center overflow-hidden">
          <div className="w-full max-w-4xl h-full">
            <Chatbox />
          </div>
        </div>
      </div>
    </ChatbotBackground>
  )
}

export default ChatBotPage