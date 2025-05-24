
import { useState } from 'react';

interface UseNativeSpeechReturn {
  speak: (text: string) => Promise<void>;
  isSpeaking: boolean;
  stopSpeaking: () => void;
}

const useNativeSpeech = (): UseNativeSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      console.log('Cancelling speech synthesis');
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speak = async (text: string): Promise<void> => {
    if (!text || text.trim() === '') {
      console.log('Empty text, not speaking');
      return;
    }
    
    console.log('Speaking text:', text.substring(0, 50) + '...');
    
    return new Promise((resolve, reject) => {
      if ('speechSynthesis' in window) {
        console.log('Using native speech synthesis');
        setIsSpeaking(true);
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Removed problematic break tags
        // Set natural speech parameters
        utterance.rate = 0.95; // Slightly slower than default for clarity
        utterance.pitch = 1.05; // Slightly higher pitch for engagement
        utterance.volume = 1.0; // Full volume
        
        // Set voice (optional - uses default if not set)
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          // Try to find a natural-sounding female voice
          const naturalVoice = voices.find(voice => 
            (voice.name.includes('female') || voice.name.includes('woman')) && 
            (voice.name.includes('natural') || voice.name.includes('premium') || 
             voice.name.toLowerCase().includes('enhanced'))
          );
          
          // Second preference: any female voice
          const femaleVoice = voices.find(voice => 
            voice.name.includes('female') || 
            voice.name.includes('woman') || 
            voice.name.includes('girl')
          );
          
          if (naturalVoice) {
            console.log('Using natural-sounding voice:', naturalVoice.name);
            utterance.voice = naturalVoice;
          } else if (femaleVoice) {
            console.log('Using female voice:', femaleVoice.name);
            utterance.voice = femaleVoice;
          } else {
            // Find any voice that might sound more natural
            const defaultVoice = voices.find(voice => 
              voice.name.includes('natural') || 
              voice.name.includes('enhanced') ||
              voice.name.includes('premium')
            );
            
            if (defaultVoice) {
              console.log('Using enhanced default voice:', defaultVoice.name);
              utterance.voice = defaultVoice;
            }
          }
        }
        
        // Removed onboundary handler that was causing issues
        
        utterance.onend = () => {
          setIsSpeaking(false);
          console.log('Native speech ended');
          resolve();
        };
        
        utterance.onerror = (e) => {
          setIsSpeaking(false);
          console.error('Native speech error:', e);
          reject(e);
        };
        
        window.speechSynthesis.speak(utterance);
      } else {
        console.error('Speech synthesis not supported');
        setIsSpeaking(false);
        reject(new Error('Speech synthesis not supported'));
      }
    });
  };

  return {
    speak,
    isSpeaking,
    stopSpeaking
  };
};

export default useNativeSpeech;
