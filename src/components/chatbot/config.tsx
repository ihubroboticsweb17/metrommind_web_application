import { IceCream2Icon } from "lucide-react";
import { createChatBotMessage } from "react-chatbot-kit";

const config = {

    botName: "MetroMind",
    customComponents: {
      header: () =>
         <div className="chat-header"></div>, // Custom header
    },
    // chatContainer: (props:any) => (
    //   <div style={{ width: "1000px", maxWidth: "100%", border: "none", boxShadow: "none" }}>
    //     {props.children}
    //   </div>
    // ),
    initialMessages: [
      createChatBotMessage("Hello! How can I help you today?", { delay: 500 }) // Example with delay
    ],
      customStyles: {
        botMessageBox: {
          backgroundColor: "#28a745", 
          // Chatbot message bubble color
          color: "black",
          
          // Text color inside bot messages
        },
        userMessageBox: {
          backgroundColor: "#28a745", // User message bubble color
          color: "#ffffff", 
          innerWidth:"20px"// Text color inside user messages
        },
        chatButton: {
          backgroundColor: "#28a745", // Chatbot button color
        },
      },
  };
  
  

export default config;
