
import { useRef, useEffect, useCallback } from 'react';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import useSpeechProcessor from '@/hooks/useSpeechProcessor';
import useConversationManager from '@/hooks/useConversationManager';
import useVoiceActivity from '@/hooks/useVoiceActivity';
import WebRTCGptService from '@/utils/WebRTCGptService';
import { UseVoiceProcessorProps, UseVoiceProcessorReturn } from '@/types/voiceTypes';

const useVoiceProcessor = ({ 
  onTranscriptChange 
}: UseVoiceProcessorProps = {}): UseVoiceProcessorReturn => {
  const lastTranscriptRef = useRef('');
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize the WebRTC GPT service
  useEffect(() => {
    const apiKey = WebRTCGptService.getApiKey();
    if (apiKey) {
      console.log('Initializing WebRTC GPT in useVoiceProcessor');
      WebRTCGptService.initialize(apiKey);
    } else {
      console.warn('No API key available for WebRTC GPT');
    }
  }, []);
  
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    resetTranscript 
  } = useSpeechRecognition({
    onTranscriptChange
  });

  const {
    assistantResponse,
    setAssistantResponse,
    conversationHistory,
    addConversationTurn,
    clearConversation
  } = useConversationManager({
    resetTranscript
  });

  const {
    isProcessing,
    isSpeaking,
    handleProcessCommand
  } = useSpeechProcessor({
    isListening,
    stopListening,
    resetTranscript,
    setAssistantResponse,
    addConversationTurn
  });

  const { stopAllVoiceActivity } = useVoiceActivity({
    isListening,
    isSpeaking,
    isProcessing,
    stopListening,
    stopSpeaking: () => {
      // This is handled in useNativeSpeech internally
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    }
  });

  const toggleListening = useCallback(() => {
    console.log('Toggling listening, current state:', isListening);
    
    // Don't allow toggling while processing or speaking
    if (isProcessing || isSpeaking) {
      console.log('Cannot toggle listening while processing or speaking');
      return;
    }
    
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      lastTranscriptRef.current = '';
      startListening();
    }
  }, [isListening, startListening, stopListening, resetTranscript, isProcessing, isSpeaking]);

  // Auto-process speech after a pause
  useEffect(() => {
    // Only setup the timer if we're listening and have new transcript content
    if (isListening && transcript && transcript !== lastTranscriptRef.current) {
      console.log('Speech detected, setting up processing timeout');
      
      // Clear any existing timeout
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
      
      // Set up a new timeout to process after 1.5 seconds of silence
      speechTimeoutRef.current = setTimeout(() => {
        console.log('Speech pause detected, processing transcript:', transcript);
        
        // Only process if we have meaningful content and aren't already processing
        if (transcript.trim() && !isProcessing && !isSpeaking) {
          // Temporarily pause listening
          stopListening();
          
          // Process the transcript
          handleProcessCommand(transcript);
        }
        
        // Update last processed transcript
        lastTranscriptRef.current = transcript;
      }, 1500); // 1.5 seconds pause to trigger processing
    }
    
    return () => {
      // Clean up timeout when component unmounts or effect re-runs
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
    };
  }, [transcript, isListening, isProcessing, isSpeaking, stopListening, handleProcessCommand]);

  // Resume listening after speaking completes
  useEffect(() => {
    if (!isSpeaking && !isListening && conversationHistory.length > 0) {
      console.log('Speaking finished, resuming listening');
      startListening();
      resetTranscript();
      lastTranscriptRef.current = '';
    }
  }, [isSpeaking, isListening, startListening, conversationHistory.length, resetTranscript]);

  return {
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
  };
};

export default useVoiceProcessor;
