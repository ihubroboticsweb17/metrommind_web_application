
import React, { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ConversationDisplay from './voice-assistant/ConversationDisplay';
import VoiceControls from './voice-assistant/VoiceControls';
import VoiceAssistantHeader from './voice-assistant/VoiceAssistantHeader';
import VoiceAssistantButton from './voice-assistant/VoiceAssistantButton';
import useVoiceProcessor from '@/hooks/useVoiceProcessor';
import useWebRtcGpt from '@/hooks/useWebRtcGpt';

const VoiceAssistant = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { isGptInitialized } = useWebRtcGpt();
  const processingRef = useRef(false);
  
  const {
    isListening,
    isSpeaking,
    isProcessing,
    transcript,
    assistantResponse,
    toggleListening,
    clearConversation,
    handleProcessCommand,
    conversationHistory,
    stopAllVoiceActivity
  } = useVoiceProcessor();
  
  // Show initial state on mount without toast notifications
  useEffect(() => {
    console.log('VoiceAssistant mounted');
  }, [isGptInitialized]);
  
  // Process transcript when stopping listening
  useEffect(() => {
    if (!isListening && transcript && !isProcessing && !processingRef.current) {
      console.log('Stopped listening with transcript, processing command:', transcript);
      processingRef.current = true;
      
      // Use setTimeout to avoid state update conflicts
      setTimeout(() => {
        handleProcessCommand(transcript)
          .finally(() => {
            processingRef.current = false;
          });
      }, 100);
    }
  }, [isListening, transcript, isProcessing, handleProcessCommand]);

  // Stop voice activity when sheet is closed
  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open && (isListening || isSpeaking)) {
      console.log('Voice assistant closed, stopping all voice activity');
      stopAllVoiceActivity();
    }
  };

  const handleButtonClick = () => {
    console.log('Voice assistant button clicked');
    setIsSheetOpen(true);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <div onClick={handleButtonClick}>
          <VoiceAssistantButton 
            isListening={isListening} 
            isProcessing={isProcessing} 
          />
        </div>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-md dark:bg-metro-dark-highlight dark:border-metro-dark-border backdrop-blur-lg">
        <VoiceAssistantHeader />
        
        <div className="mt-6 flex flex-col h-[calc(100vh-200px)]">
          {/* Conversation display */}
          <ConversationDisplay
            transcript={transcript}
            assistantResponse={assistantResponse}
            assistantAvatar="/lovable-uploads/99dad8bd-4bed-4a53-8968-b70c9accef70.png"
            conversationHistory={conversationHistory}
          />
          
          {/* Voice controls */}
          <VoiceControls
            isListening={isListening}
            isProcessing={isProcessing}
            isSpeaking={isSpeaking}
            transcript={transcript}
            assistantResponse={assistantResponse}
            toggleListening={toggleListening}
            clearConversation={clearConversation}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VoiceAssistant;
