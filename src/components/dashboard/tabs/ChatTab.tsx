
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, Image, Smile, User, ThumbsUp } from "lucide-react";
import { useTheme } from "@/App";

type Message = {
  id: number;
  sender: 'user' | 'therapist';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
};

const ChatTab = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'therapist',
      text: "Hello! How are you feeling today? I hope you've been practicing the breathing exercises we discussed last session.",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: 'user',
      text: "Hi Dr. Johnson, I've been doing better. I practiced the breathing exercises daily and they really helped when I felt anxious yesterday.",
      timestamp: "10:32 AM",
      status: 'read',
    },
    {
      id: 3,
      sender: 'therapist',
      text: "That's great to hear! The exercises often become more effective with practice. Can you tell me more about what triggered your anxiety yesterday?",
      timestamp: "10:33 AM",
    },
    {
      id: 4,
      sender: 'user',
      text: "It was before my presentation at work. But I used the 4-7-8 technique we practiced and it really calmed me down.",
      timestamp: "10:35 AM",
      status: 'read',
    },
    {
      id: 5,
      sender: 'therapist',
      text: "I'm proud of you for applying those techniques in a real situation. How did the presentation go afterwards?",
      timestamp: "10:36 AM",
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate therapist reply
    setTimeout(() => {
      const reply: Message = {
        id: messages.length + 2,
        sender: 'therapist',
        text: "I'm currently busy with another patient, but I'll respond to your message as soon as I can. Thank you for your patience!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-250px)]">
      <Card className={`flex flex-col flex-grow ${theme === "green" ? "bg-white border border-green-200 shadow-green-glow" : "bg-black-gradient border border-white/5 shadow-dark-glow"} overflow-hidden rounded-xl`}>
        <div className={`${theme === "green" ? "border-b border-green-200 p-4 bg-gradient-to-r from-green-50 to-white" : "border-b border-white/5 p-4 bg-black/20"}`}>
          <div className="flex items-center space-x-3">
            <Avatar className={theme === "green" ? "border-2 border-green-100" : ""}>
              <AvatarImage src="/placeholder.svg" alt="Dr. Sarah Johnson" />
              <AvatarFallback className={theme === "green" ? "bg-green-100 text-green-800" : ""}>SJ</AvatarFallback>
            </Avatar>
            <div>
              <h3 className={`font-medium ${theme === "green" ? "text-green-800" : ""}`}>Dr. Sarah Johnson</h3>
              <p className={`text-xs ${theme === "green" ? "text-green-600" : "text-muted-foreground"}`}>Therapist • Online</p>
            </div>
          </div>
        </div>
        
        <CardContent className="flex-grow p-0 overflow-y-auto bg-white">
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-green-500 to-green-400 text-white rounded-br-none shadow-sm' 
                      : `${theme === "green" ? "bg-green-50 border border-green-100 shadow-sm" : "bg-card/20 border border-white/5"} rounded-bl-none`
                  }`}
                >
                  <div className={`text-sm ${message.sender === 'therapist' && theme === "green" ? "text-gray-800" : ""}`}>
                    {message.text}
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className={`text-xs ${message.sender === 'user' ? "opacity-70" : theme === "green" ? "text-gray-500" : "opacity-70"}`}>
                      {message.timestamp}
                    </span>
                    {message.status === 'read' && (
                      <div className="text-xs opacity-70">✓✓</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        
        <div className={`${theme === "green" ? "border-t border-green-200 p-3 bg-gradient-to-r from-white to-green-50" : "border-t border-white/5 p-3"}`}>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className={`rounded-full ${theme === "green" ? "text-green-600 hover:bg-green-50 hover:text-green-700" : ""}`}>
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className={`rounded-full ${theme === "green" ? "text-green-600 hover:bg-green-50 hover:text-green-700" : ""}`}>
              <Image className="h-5 w-5" />
            </Button>
            <Input 
              placeholder="Type a message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className={`${theme === "green" ? "bg-white border-green-200 focus:border-green-400 focus:ring-green-200" : "bg-card/10 border-white/5"}`}
            />
            <Button variant="ghost" size="icon" className={`rounded-full ${theme === "green" ? "text-green-600 hover:bg-green-50 hover:text-green-700" : ""}`}>
              <Smile className="h-5 w-5" />
            </Button>
            <Button 
              onClick={handleSendMessage} 
              disabled={newMessage.trim() === ''} 
              className={`rounded-full h-9 w-9 p-0 ${theme === "green" ? "bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 shadow-sm" : "bg-primary"}`}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground px-2">
            <span className={theme === "green" ? "text-green-600" : ""}>End-to-end encrypted</span>
            <div className="flex items-center gap-1">
              <span className={theme === "green" ? "text-green-600" : ""}>Urgent?</span>
              <Button variant="ghost" size="sm" className={`h-auto py-0 px-1 text-xs ${theme === "green" ? "text-green-500 hover:text-green-600 font-medium" : ""}`}>
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatTab;
