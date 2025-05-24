
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ElevenLabsService from '@/utils/ElevenLabsService';

interface UseTextToSpeechReturn {
  speak: (text: string) => Promise<void>;
  isSpeaking: boolean;
}

const useTextToSpeech = (): UseTextToSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  useEffect(() => {
    // Initialize with default settings
    const savedApiKey = localStorage.getItem('elevenLabsApiKey');
    if (savedApiKey) {
      ElevenLabsService.initialize(savedApiKey);
    }
    
    // Check for saved voice preference
    const savedVoiceId = localStorage.getItem('elevenLabsVoiceId');
    if (savedVoiceId) {
      ElevenLabsService.setVoiceId(savedVoiceId);
    }
  }, []);

  const useElevenLabsSpeech = async (text: string): Promise<boolean> => {
    try {
      setIsSpeaking(true);
      const audioData = await ElevenLabsService.textToSpeech(text);
      if (audioData) {
        console.log('Successfully generated audio with ElevenLabs');
        const audio = new Audio(URL.createObjectURL(
          new Blob([audioData], { type: 'audio/mpeg' })
        ));
        
        audio.onended = () => {
          setIsSpeaking(false);
          console.log('ElevenLabs audio playback ended');
        };
        
        audio.play().catch(error => {
          console.error('Error playing ElevenLabs audio:', error);
          setIsSpeaking(false);
          return false;
        });
        
        return true;
      }
      setIsSpeaking(false);
      return false;
    } catch (error) {
      console.error('ElevenLabs speech error:', error);
      setIsSpeaking(false);
      return false;
    }
  };

  const useNativeSpeech = (text: string): boolean => {
    if ('speechSynthesis' in window) {
      console.log('Using native speech synthesis');
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set voice (optional - uses default if not set)
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Try to find a female voice for the assistant
        const femaleVoice = voices.find(voice => 
          voice.name.includes('female') || 
          voice.name.includes('woman') || 
          voice.name.includes('girl')
        );
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
        console.log('Native speech ended');
      };
      
      utterance.onerror = (e) => {
        setIsSpeaking(false);
        console.error('Native speech error:', e);
      };
      
      window.speechSynthesis.speak(utterance);
      return true;
    } else {
      console.error('Speech synthesis not supported');
      setIsSpeaking(false);
      return false;
    }
  };

  const speak = async (text: string): Promise<void> => {
    if (!text || text.trim() === '') {
      console.log('Empty text, not speaking');
      return;
    }
    
    console.log('Speaking text:', text.substring(0, 50) + '...');
    
    // Use ElevenLabs if available, otherwise use native speech
    const isElevenLabsAvailable = ElevenLabsService.isInitialized();
    console.log('ElevenLabs available:', isElevenLabsAvailable);
    
    if (isElevenLabsAvailable) {
      const success = await useElevenLabsSpeech(text);
      if (!success) {
        console.log('ElevenLabs speech failed, falling back to native speech');
        useNativeSpeech(text);
      }
    } else {
      console.log('ElevenLabs not initialized, using native speech');
      useNativeSpeech(text);
    }
  };

  return {
    speak,
    isSpeaking
  };
};

export default useTextToSpeech;
