
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import WebRTCGptService from '@/utils/WebRTCGptService';

interface UseWebRtcGptReturn {
  webrtcApiKey: string;
  setWebrtcApiKey: (key: string) => void;
  isGptInitialized: boolean;
  handleSetWebRtcApiKey: () => void;
  handleRemoveWebRtcApiKey: () => void;
  handleResetWebRtcApiKey: () => void;
}

const useWebRtcGpt = (): UseWebRtcGptReturn => {
  // Initialize with the current API key
  const [webrtcApiKey, setWebrtcApiKey] = useState(() => {
    // Get the service's current API key
    const currentKey = WebRTCGptService.getApiKey();
    console.log('Initial WebRTC key:', currentKey ? 'Found' : 'Not found');
    
    // Update localStorage with this key
    if (currentKey) {
      localStorage.setItem('webrtcGptApiKey', currentKey);
    }
    
    return currentKey || '';
  });
  
  const [isGptInitialized, setIsGptInitialized] = useState(false);
  
  // Initialize WebRTC GPT on mount
  useEffect(() => {
    const apiKey = WebRTCGptService.getApiKey();
    
    if (apiKey) {
      console.log('Initializing WebRTC GPT with API key');
      WebRTCGptService.initialize(apiKey);
      setWebrtcApiKey(apiKey);
      setIsGptInitialized(true);
      toast.success('Voice assistant activated');
    } else {
      console.warn('No WebRTC GPT API key available');
      setIsGptInitialized(false);
    }
  }, []);
  
  const handleSetWebRtcApiKey = () => {
    if (webrtcApiKey.trim()) {
      WebRTCGptService.initialize(webrtcApiKey.trim());
      setIsGptInitialized(true);
      localStorage.setItem('webrtcGptApiKey', webrtcApiKey.trim());
      toast.success('WebRTC GPT API key set successfully');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  const handleRemoveWebRtcApiKey = () => {
    localStorage.removeItem('webrtcGptApiKey');
    setWebrtcApiKey('');
    setIsGptInitialized(false);
    toast.success('WebRTC GPT API key removed');
  };
  
  const handleResetWebRtcApiKey = () => {
    setWebrtcApiKey('');
    setIsGptInitialized(false);
    localStorage.removeItem('webrtcGptApiKey');
  };
  
  return {
    webrtcApiKey,
    setWebrtcApiKey,
    isGptInitialized,
    handleSetWebRtcApiKey,
    handleRemoveWebRtcApiKey,
    handleResetWebRtcApiKey
  };
};

export default useWebRtcGpt;
