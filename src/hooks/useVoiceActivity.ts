
import { useCallback } from 'react';

interface UseVoiceActivityProps {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  stopListening: () => void;
  stopSpeaking: () => void;
}

const useVoiceActivity = ({
  isListening,
  isSpeaking,
  isProcessing,
  stopListening,
  stopSpeaking
}: UseVoiceActivityProps) => {
  
  // Stop all voice activities (both listening and speaking)
  const stopAllVoiceActivity = useCallback(() => {
    console.log('Stopping all voice activity');
    
    // Stop speech recognition if active
    if (isListening) {
      stopListening();
    }
    
    // Stop speech synthesis if active
    if (isSpeaking) {
      stopSpeaking();
    }
    
    console.log('All voice activity stopped');
  }, [isListening, isSpeaking, stopListening, stopSpeaking]);

  return {
    stopAllVoiceActivity
  };
};

export default useVoiceActivity;
