// import { useState, useRef, useEffect } from "react"
// import { ArrowUp, User, ClipboardPlus } from "lucide-react"


// import axios from "axios"
// import Lottie from "lottie-react";
// import Ani from "../../../assets/json/logoAni.json"
// import Splash from "../../../assets/json/Splash (1).json"
// import { useNavigate } from 'react-router-dom';
// export default function ChatUI() {
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I'm Metro Mind. How can I assist you today?",
//       sender: "bot",
//     },
//   ])
//   const [input, setInput] = useState("")
//   const [sectionId, setSectionId] = useState(null)

//   const messagesEndRef = useRef(null)
//   const inputRef = useRef(null)
  

//   // Auto scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (input.trim() === "") return

//     const newUserMessage = {
//       id: messages.length + 1,
//       text: input,
//       sender: "user",
//     }

//     setMessages((prev) => [...prev, newUserMessage])
//     setInput("")
//     inputRef.current?.focus()

//     try {
//       const payload = {
//         message: input,
//         ...(sectionId && { section_id: sectionId, switch_press: false }),
//       }

//       const res = await axios.post("http://192.168.1.29:8000/accounts/preliminary-chat/", payload)
//       const { reply, section_id } = res.data

//       if (section_id && !sectionId) {
//         setSectionId(section_id)
//       }

//       const botResponse = {
//         id: messages.length + 2,
//         text: reply || "I'm a demo bot. This is a simulated response.",
//         sender: "bot",
//       }

//       setMessages((prev) => [...prev, botResponse])
//     } catch (error) {
//       console.error("API Error:", error)
//     }
//   }

//   const handleGenerateClick = async () => {
//     if (!sectionId) return alert("Please start a chat first.")

//     try {
//       const res = await axios.post("https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/accounts/preliminary-chat/", {
//         section_id: sectionId,
//         switch_press: true,
//       })

//       if (res.data?.success === true || res.data?.switch_press === true) {
//         navigate("/patient-dashboard")
//       } else {
//         alert("Failed to generate report.")
//       }
//     } catch (error) {
//       console.error("Generate Error:", error)
//     }
//   }

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header */}
//       <header className="flex items-center justify-center p-4 bg-white border-b border-gray-100 shadow-sm">
//         <div className="flex items-center justify-between w-full px-4">
//           {/* Logo & Title */}
//           <div className="flex items-center">
//             <Lottie animationData={Splash} loop style={{ width: 60, height: 60 }} />
//             <div className="ml-4">
//               <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
//                 Metro Mind
//               </h1>
//               <p className="text-xs sm:text-sm text-teal-500 mt-1">Your AI assistant</p>
//             </div>
//           </div>

//           {/* Generate Button */}
//           <button
//             onClick={handleGenerateClick}
//             className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500 text-white shadow-md hover:bg-teal-600"
//           >
//             <ClipboardPlus size={18} />
//             Generate
//           </button>
//         </div>
//       </header>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto pl-80 pr-80 p-8 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
//           >
//             <div
//               className={`flex items-start space-x-2 max-w-[85%] md:max-w-[70%] ${
//                 message.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
//               }`}
//             >
//               <div
//                 className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full ${
//                   message.sender === "user" ? "bg-gradient-to-r from-teal-400 to-teal-600" : "bg-gray-200"
//                 }`}
//               >
//                 {message.sender === "user" ? (
//                   <User size={16} className="text-white" />
//                 ) : (
//                   <Lottie animationData={Ani} loop style={{ width: 80, height: 80 }} />
//                 )}
//               </div>
//               <div
//                 className={`px-4 py-3 rounded-2xl ${
//                   message.sender === "user"
//                     ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
//                     : "bg-white border border-gray-100 shadow-sm"
//                 }`}
//               >
//                 <p className={message.sender === "user" ? "text-white" : "text-gray-800"}>
//                   {message.text}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="p-4 bg-white border-t border-gray-100">
//         <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
//           <input
//             ref={inputRef}
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Message Metro Mind..."
//             className="w-full pl-4 pr-12 py-3 bg-gray-50 border-0 rounded-full focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-800 shadow-sm"
//           />
//           <button
//             type="submit"
//             className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
//               input.trim() === ""
//                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:shadow-md"
//             }`}
//             disabled={input.trim() === ""}
//           >
//             <ArrowUp size={18} />
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }
import { useState, useRef, useEffect } from "react"
import { ArrowUp, User, ClipboardPlus } from "lucide-react"
import axios from "axios"
import Lottie from "lottie-react";
import Ani from "../../../assets/json/logoAni.json"
import Splash from "../../../assets/json/Splash (1).json"
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp?: string;
  status?: 'sent' | 'delivered' | 'read';
};

export default function ChatUI() {
    const { theme } = useTheme();
    const { toast } = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Metro Mind. How can I assist you today?",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [generateMode, setGenerateMode] = useState(false);

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  
  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load session ID from localStorage on component mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem("chat_section_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim() === "") return

    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("Authentication Error: User is not authenticated");
      return;
    }

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent"
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInput("")
    inputRef.current?.focus()

    try {
      const response = await fetch("https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/accounts/preliminary-chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: input,
          session_id: sessionId ?? undefined,
          switch_press: generateMode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to send message");
      }

      const data = await response.json();
      
      if (data.section_id && !sessionId) {
        setSessionId(data.section_id);
        setGenerateMode(data.switch_press);
        localStorage.setItem("chat_section_id", data.section_id);
      }

      if (data?.message) {
        const botResponse: Message = {
          id: messages.length + 2,
          text: data.message,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }

        setMessages((prev) => [...prev, botResponse])
        setGenerateMode(false);

        if (!sessionId && data.session_id) {
          setSessionId(data.session_id);
        }
      }

      if (data?.switch_press === true) {
        console.log("Redirecting to patient dashboard");
        navigate("/patient-dashboard");
      }
    } catch (error) {
      console.error("API Error:", error)
    }
  }

  // const handleGenerateClick = async () => {
  //   alert("Please start a chat first.")
  //   if (!sessionId) {
  //     console.error("Please start a chat first.");
  //     return;
  //   }

  //   const token = localStorage.getItem("access_token");

  //   if (!token) {
  //     console.error("Authentication Error: User is not authenticated");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/accounts/preliminary-chat/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         message: input || "Generate utharamAI report", // Use input text if available
  //         session_id: sessionId,
  //         switch_press: true,
  //       }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData?.error || "Failed to generate");
  //     }

  //     const data = await response.json();
  //     console.log("Generate API Response:", data.switch_press);

  //     // Add the user message if there was input text
  //     if (input.trim()) {
  //       const userMessage: Message = {
  //         id: messages.length + 1,
  //         text: input,
  //         sender: "user",
  //         timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  //         status: "sent"
  //       };
  //       setMessages((prev) => [...prev, userMessage]);
  //       setInput(""); // Clear input after sending
  //     }

  //     // Redirect if instructed
  //     if (data?.switch_press === true) {
  //       navigate("/patient-dashboard");
  //     }

  //     if (data?.message || data?.reply) {
  //       const assistantMessage: Message = {
  //         id: messages.length + (input.trim() ? 2 : 1),
  //         sender: "bot",
  //         text: data.message || data.reply,
  //         timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  //       };
  //       setMessages((prev) => [...prev, assistantMessage]);
  //     }
  //   } catch (error: any) {
  //     console.error("Generate failed:", error);
  //   }
  // }
const handleGenerateClick = async () => {
    console.log("123")
    const token = localStorage.getItem("access_token");
  
    if (!token) {
      toast({
        title: "Authentication Error",
        description: "User is not authenticated. Please log in again.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const response = await fetch("https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/accounts/preliminary-chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: "Generate utharamAI report", // dummy or trigger message
          session_id: sessionId ?? undefined,
          switch_press: true, // pass TRUE here!
          max_tokens: 100,
          temperature: 0.7,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to generate");
      }
  
      const data = await response.json();
      console.log("Generate API Response:", data.switch_press);
      const switchStatus=data.switch_press;
      console.log("switchStatus",switchStatus)
      // Redirect if instructed
      if (`${switchStatus}` === "true") {
        navigate("/patient-dashboard");
      }
  
      if (data?.message) {
        const assistantMessage: Message = {
          id: messages.length + 1,
          sender: "bot",
          text: data.message,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
  
    } catch (error: any) {
      console.error("Generate failed:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-center p-4 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between w-full px-4">
          {/* Logo & Title */}
          <div className="flex items-center">
            <Lottie animationData={Splash} loop style={{ width: 60, height: 60 }} />
            <div className="ml-4">
              <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                Metro Mind
              </h1>
              <p className="text-xs sm:text-sm text-teal-500 mt-1">Your AI assistant</p>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500 text-white shadow-md hover:bg-teal-600"
          >
            <ClipboardPlus size={18} />
            Generate
          </button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto pl-80 pr-80 p-8 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[85%] md:max-w-[70%] ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full ${
                  message.sender === "user" ? "bg-gradient-to-r from-teal-400 to-teal-600" : "bg-gray-200"
                }`}
              >
                {message.sender === "user" ? (
                  <User size={16} className="text-white" />
                ) : (
                  <Lottie animationData={Ani} loop style={{ width: 80, height: 80 }} />
                )}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                    : "bg-white border border-gray-100 shadow-sm"
                }`}
              >
                <p className={message.sender === "user" ? "text-white" : "text-gray-800"}>
                  {message.text}
                </p>
                {message.timestamp && (
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className={`text-xs ${message.sender === 'user' ? "opacity-70" : "text-gray-500"}`}>
                      {message.timestamp}
                    </span>
                    {message.status === 'read' && (
                      <div className="text-xs opacity-70">✓✓</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Metro Mind..."
            className="w-full pl-4 pr-12 py-3 bg-gray-50 border-0 rounded-full focus:ring-2 focus:ring-teal-500 focus:outline-none text-gray-800 shadow-sm"
          />
          <button
            type="submit"
            className={`absolute right-1.5 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
              input.trim() === ""
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-400 to-teal-600 text-white hover:shadow-md"
            }`}
            disabled={input.trim() === ""}
          >
            <ArrowUp size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}