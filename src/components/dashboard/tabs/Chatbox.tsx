import React, { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Sparkles, User, Bot } from "lucide-react";
import { useTheme } from "@/App";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Ani from "../../../assets/json/logoAni.json"

type Message = {
  id: number;
  sender: 'user' | 'therapist';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
};

const Chatbox = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // Load existing chat history for follow-up sessions
  const loadChatHistory = async (sessionId: string) => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/accounts/get-chat-history/${sessionId}/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // Convert backend chat history to frontend message format
        if (data.messages && Array.isArray(data.messages)) {
          const formattedMessages: Message[] = data.messages.map((msg: any, index: number) => ({
            id: Date.now() + index,
            sender: msg.sender === 'user' ? 'user' : 'therapist',
            text: msg.message || msg.text,
            timestamp: msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: msg.sender === 'user' ? 'sent' : undefined,
          }));
          
          setMessages(formattedMessages);
        }
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      // Don't show error toast for history loading as it's not critical
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const storedSessionId = localStorage.getItem("chat_section_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
      // Load existing chat history for follow-up sessions
      loadChatHistory(storedSessionId);
    }

    // Check if report was already generated
    const reportStatus = localStorage.getItem("ai_report_generated");
    if (reportStatus === "true") {
      setReportGenerated(true);
    }
  }, []);

  // Prevent browser back button navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (!reportGenerated) {
        // Push the current state back to prevent navigation
        window.history.pushState(null, '', window.location.pathname);
        
        // Show warning toast
        toast({
          title: "Report Required",
          description: "Please generate your AI report before leaving this page.",
          variant: "destructive",
        });
      }
    };

    // Push initial state
    window.history.pushState(null, '', window.location.pathname);
    
    // Add event listener
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [reportGenerated, toast]);

  // Block page refresh/close without report
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!reportGenerated && messages.length > 0) {
        event.preventDefault();
        event.returnValue = 'You have an incomplete session. Generate your AI report before leaving.';
        return event.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [reportGenerated, messages.length]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || isLoading) return;

    const token = localStorage.getItem("access_token");

    if (!token) {
      toast({
        title: "Authentication Error",
        description: "User is not authenticated. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/accounts/preliminary-chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: newMessage,
          session_id: sessionId ?? undefined,
          switch_press: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to send message");
      }

      const data = await response.json();
      
      if (data.section_id && !sessionId) {
        setSessionId(data.section_id);
        localStorage.setItem("chat_section_id", data.section_id);
      }
      
      if (data?.message) {
        const assistantMessage: Message = {
          id: Date.now() + 1,
          sender: "therapist",
          text: data.message,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        if (!sessionId && data.session_id) {
          setSessionId(data.session_id);
        }
      }
      
      if (data?.switch_press === true) {
        // Mark report as generated before navigation
        setReportGenerated(true);
        localStorage.setItem("ai_report_generated", "true");
        navigate("/patient-dashboard");
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Message Failed",
        description: error.message || "Could not send the message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateClick = async () => {
    // Check if there are messages to generate report from
    if (messages.length === 0) {
      toast({
        title: "No Conversation",
        description: "Please have a conversation first before generating a report.",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      toast({
        title: "Authentication Error",
        description: "User is not authenticated. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://metromind-web-backend-euh0gkdwg9deaudd.uaenorth-01.azurewebsites.net/accounts/preliminary-chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: "Generate utharamAI report",
          session_id: sessionId ?? undefined,
          switch_press: true,
          max_tokens: 100,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to generate");
      }

      const data = await response.json();
      
      // Mark report as generated
      setReportGenerated(true);
      localStorage.setItem("ai_report_generated", "true");
      
      if (data?.switch_press === true) {
        navigate("/patient-dashboard");
      }

      if (data?.message) {
        const assistantMessage: Message = {
          id: Date.now(),
          sender: "therapist",
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Generate Button - Fixed in top right */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={handleGenerateClick}
          disabled={isLoading || messages.length === 0}
          className={`px-4 py-2 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 ${
            messages.length === 0 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white'
          }`}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Report
          {!reportGenerated && messages.length > 0 && (
            <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-red-400 animate-pulse"></span>
          )}
        </Button>
      </div>

      {/* Warning Banner for incomplete session */}
      {messages.length > 0 && !reportGenerated && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Session in progress:</strong> Don't forget to generate your AI report before leaving this page.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-4">
                <Bot className="h-16 w-16 mx-auto text-teal-500 opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Start a conversation
              </h3>
              <p className="text-sm text-muted-foreground">
                I'm here to help you. Ask me anything about your mental health and wellbeing.
              </p>
              <p className="text-xs text-yellow-600 mt-4 bg-yellow-50 p-2 rounded-lg inline-block">
                💡 You'll need to have a conversation before you can generate your AI report
              </p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className={`
                  ${message.sender === 'user' 
                    ? 'bg-teal-100 text-teal-700' 
                    : 'bg-purple-100 text-purple-700'
                  }
                `}>
                  {message.sender === 'user' ? <User className="h-4 w-4" /> : 
                     <Lottie animationData={Ani} loop style={{ width: 80, height: 80 }} />
                  }
                </AvatarFallback>
              </Avatar>
              
              <div className={`flex-1 space-y-1 ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div
                  className={`inline-block p-3 rounded-2xl max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-teal-500 text-white rounded-br-sm'
                      : 'bg-muted/50 text-foreground rounded-bl-sm border border-border/50'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground px-2">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-purple-100 text-purple-700">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-bl-sm p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border/20 bg-background/80 backdrop-blur-sm p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              // disabled={isLoading}
              className="pr-12 bg-muted/30 border-border/30 focus:bg-background focus:border-teal-500/50 transition-all duration-200"
            />
            <Button
              onClick={handleSendMessage}
              disabled={newMessage.trim() === '' || isLoading}
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg h-8 w-8 p-0 transition-colors duration-200 disabled:bg-muted-foreground disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-2 text-center">
            {messages.length === 0 
              ? "Start by typing a message to begin your wellness conversation"
              : !reportGenerated 
                ? "Press Enter to send, or click Generate Report to create your wellness summary"
                : "Session complete! Your report has been generated."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;