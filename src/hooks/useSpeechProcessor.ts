
import { useState, useCallback, useRef } from 'react';
import { processVoiceCommand } from '@/utils/voiceCommandProcessor';
import useNativeSpeech from '@/hooks/useNativeSpeech';

interface UseSpeechProcessorProps {
  isListening: boolean;
  stopListening: () => void;
  resetTranscript: () => void;
  setAssistantResponse: (response: string) => void;
  addConversationTurn: (userMessage: string, assistantMessage: string) => void;
}

const useSpeechProcessor = ({
  isListening,
  stopListening,
  resetTranscript,
  setAssistantResponse,
  addConversationTurn
}: UseSpeechProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { speak, isSpeaking } = useNativeSpeech();
  const processingRef = useRef(false);

  const handleProcessCommand = useCallback(async (command: string) => {
    if (!command || command.trim() === '') {
      console.log('Empty command, not processing');
      return;
    }
    
    // Prevent duplicate processing
    if (processingRef.current) {
      console.log('Already processing a command, ignoring');
      return;
    }
    
    setIsProcessing(true);
    processingRef.current = true;
    console.log('Processing command:', command);
    
    try {
      // Process the command
      const response = await processVoiceCommand(command);
      console.log('Got response:', response);
      setAssistantResponse(response);
      
      // Add to conversation history
      addConversationTurn(command, response);
      
      // Temporarily stop listening while speaking
      if (isListening) {
        stopListening();
      }
      
      // Speak the response
      await speak(response);
      
      // Reset transcript for next turn
      resetTranscript();
      
    } catch (error) {
      console.error('Error processing command:', error);
      setAssistantResponse("I'm sorry, I encountered an error. Please try again.");
      
      // Try to speak the error message
      try {
        await speak("I'm sorry, I encountered an error. Please try again.");
      } catch (speakError) {
        console.error('Failed to speak error message:', speakError);
      }
    } finally {
      setIsProcessing(false);
      processingRef.current = false;
    }
  }, [speak, isListening, stopListening, resetTranscript, setAssistantResponse, addConversationTurn]);

  return {
    isProcessing,
    isSpeaking,
    handleProcessCommand
  };
};

export default useSpeechProcessor;
