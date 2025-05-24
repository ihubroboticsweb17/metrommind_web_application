
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { ConversationDisplayProps } from './types';

const ConversationDisplay = ({ 
  transcript, 
  assistantResponse,
  assistantAvatar = "/lovable-uploads/99dad8bd-4bed-4a53-8968-b70c9accef70.png",
  conversationHistory = []
}: ConversationDisplayProps) => {
  // Reference for auto-scrolling to the bottom of the conversation
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, assistantResponse, conversationHistory]);

  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-lg dark:bg-black/20">
      {/* Past conversation turns */}
      {conversationHistory.map((turn, index) => (
        <React.Fragment key={index}>
          {/* User message */}
          <div className="flex items-start gap-3">
            <div className="bg-primary rounded-full p-2 flex-shrink-0">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="bg-muted p-3 rounded-lg dark:bg-black/40 flex-1">
              <p className="text-sm">{turn.userMessage}</p>
            </div>
          </div>
          
          {/* Assistant message */}
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={assistantAvatar} alt="Assistant" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div className="bg-primary/10 p-3 rounded-lg dark:bg-primary/20 flex-1">
              <p className="text-sm">{turn.assistantMessage}</p>
            </div>
          </div>
        </React.Fragment>
      ))}
      
      {/* Current transcript if any */}
      {transcript && (
        <div className="flex items-start gap-3">
          <div className="bg-primary rounded-full p-2 flex-shrink-0">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="bg-muted p-3 rounded-lg dark:bg-black/40 flex-1">
            <p className="text-sm">{transcript} <span className="inline-block animate-pulse">•</span></p>
          </div>
        </div>
      )}
      
      {/* Current assistant response if any */}
      {assistantResponse && !conversationHistory.some(turn => turn.assistantMessage === assistantResponse) && (
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={assistantAvatar} alt="Assistant" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <div className="bg-primary/10 p-3 rounded-lg dark:bg-primary/20 flex-1">
            <p className="text-sm">{assistantResponse}</p>
          </div>
        </div>
      )}
      
      {/* Empty state */}
      {!transcript && !assistantResponse && conversationHistory.length === 0 && (
        <div className="text-center text-muted-foreground py-10">
          <Avatar className="h-16 w-16 mx-auto mb-4">
            <AvatarImage src={assistantAvatar} alt="MetroMind Assistant" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <p>Hi, I'm your MetroMind Assistant.</p>
          <p className="text-sm mt-1">Click the microphone to start speaking</p>
        </div>
      )}
      
      {/* Invisible element for scrolling to the bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationDisplay;
