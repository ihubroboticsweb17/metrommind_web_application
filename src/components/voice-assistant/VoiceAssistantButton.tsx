
import React from 'react';
import { useTheme } from '@/App';
import { useIsMobile } from '@/hooks/use-mobile';

interface VoiceAssistantButtonProps {
  isListening: boolean;
  isProcessing: boolean;
  onClick: () => void;
}

const VoiceAssistantButton = ({ 
  isListening, 
  isProcessing, 
  onClick 
}: VoiceAssistantButtonProps) => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  const getPulseColor = () => {
    switch(theme) {
      case "green":
        return "bg-theme-green-primary/30";
      case "royal":
        return "bg-theme-royal-primary/30";
      case "ocean":
        return "bg-theme-ocean-primary/30";
      case "emerald":
        return "bg-theme-emerald-primary/30";
      case "sunset":
        return "bg-theme-sunset-primary/30";
      case "pink":
        return "bg-theme-pink-primary/30";
      default:
        return "bg-primary/20";
    }
  };
  
  const getFilterStyle = () => {
    if (isListening) {
      switch(theme) {
        case "green":
          return "brightness(1.5) hue-rotate(100deg)";
        default:
          return "brightness(1.4) hue-rotate(45deg)";
      }
    }
    return "brightness(1)";
  };

  // Position higher on mobile, maintain desktop position
  const positionClass = isMobile ? "bottom-24 right-6" : "bottom-8 right-8";
  const sizeClass = isMobile ? "h-16 w-16" : "h-24 w-24";

  return (
    <button
      className={`fixed ${positionClass} rounded-full ${sizeClass} shadow-xl hover:shadow-2xl transition-all z-50 border-none focus:outline-none animate-pulse`}
      onClick={onClick}
      style={{ 
        background: 'none',
        padding: 0,
        animation: isListening ? 'pulse 1.5s infinite' : 'none'
      }}
    >
      <div className={`absolute inset-0 rounded-full ${isListening ? getPulseColor() : 'bg-transparent'} scale-125 ${isListening ? 'animate-ping' : ''}`}></div>
      <div className="relative">
        <img 
          src="/lovable-uploads/4ff57bab-5fb9-4c5f-b4e7-94b356096f24.png" 
          alt="Voice Assistant" 
          className="w-full h-full rounded-full"
          style={{ 
            filter: getFilterStyle(),
            transform: isProcessing ? 'scale(0.92)' : 'scale(1)',
            transition: 'all 0.3s ease'
          }}
        />
        {isListening && (
          <div className={`absolute -top-3 -right-3 ${theme === 'green' ? 'bg-green-500' : 'bg-red-500'} ${isMobile ? 'h-6 w-6' : 'h-8 w-8'} rounded-full flex items-center justify-center animate-pulse`}>
            <span className="sr-only">Recording</span>
            <div className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} bg-white rounded-full`}></div>
          </div>
        )}
      </div>
    </button>
  );
};

export default VoiceAssistantButton;
