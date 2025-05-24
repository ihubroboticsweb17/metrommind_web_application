import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

interface UseSpeechRecognitionProps {
  onTranscriptChange?: (transcript: string) => void;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

const useSpeechRecognition = ({ 
  onTranscriptChange 
}: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    // Notify parent component when transcript changes
    if (onTranscriptChange) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);

  const startListening = () => {
    try {
      // Check if the browser supports speech recognition
      if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
        toast.error('Speech recognition is not supported in this browser');
        return;
      }

      // Initialize SpeechRecognition
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      // Create a new instance each time to prevent issues with reusing the same instance
      recognitionRef.current = new SpeechRecognitionConstructor();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US'; // Set language explicitly
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            // Update with interim results too
            setTranscript(prevTranscript => prevTranscript + transcript);
          }
        }
        
        if (finalTranscript) {
          setTranscript(finalTranscript);
          console.log('Speech recognition final result:', finalTranscript);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        
        // Handle specific error cases
        if (event.error === 'not-allowed') {
          toast.error('Microphone access denied. Please allow microphone access in your browser settings.');
        } else if (event.error === 'no-speech') {
          toast.error('No speech detected. Please try speaking again.');
        } else {
          toast.error(`Speech recognition error: ${event.error}`);
        }
        
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        // Only restart if we want to keep listening
        if (isListening) {
          try {
            recognitionRef.current?.start();
            console.log('Restarted speech recognition after it ended');
          } catch (error) {
            console.error('Failed to restart speech recognition:', error);
            setIsListening(false);
          }
        }
      };
      
      recognitionRef.current.start();
      setIsListening(true);
      toast.success('Voice assistant is listening');
      console.log('Voice assistant started listening');
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      toast.error('Could not start the voice assistant');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    console.log('Stopping speech recognition');
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
      setIsListening(false);
    }
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript
  };
};

export default useSpeechRecognition;
