import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";
import "react-chatbot-kit/build/main.css";

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-container" >
      {/* <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close Chatbot" : "Open Chatbot"}
      </button>

      {isOpen && (
        <div className="chatbot-wrapper" >
          <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
        </div>
      )} */}
      <div className="chatbot-wrapper  p-6">
          <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
        </div>
    </div>
  );
};

export default Chat;

// import React, { useEffect, useState } from "react";
// import Chatbot from "react-chatbot-kit";
// import "react-chatbot-kit/build/main.css";
// import config from "../chatbot/config";
// import MessageParser from "../chatbot/MessageParser";
// import ActionProvider from "../chatbot/ActionProvider";

// const ChatBotComponent: React.FC = () => {
//   const [showChatbot, setShowChatbot] = useState(false);

//   useEffect(() => {
//     const firstLogin = localStorage.getItem("firstLogin");
//     if (firstLogin === "true") {
//       setShowChatbot(true);

//       // Mark that chatbot has been shown, so it doesn’t show again
//       localStorage.setItem("firstLogin", "false");
//     }
//   }, []);

//   return showChatbot ? (
//     <div className="chat-container">
//       <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
//     </div>
//   ) : null; // Do not show chatbot if it's not the first login
// };

// export default ChatBotComponent;

