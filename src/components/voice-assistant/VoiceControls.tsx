
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, X } from 'lucide-react';
import { VoiceControlsProps } from './types';

const VoiceControls = ({
  isListening,
  isProcessing,
  isSpeaking,
  transcript,
  assistantResponse,
  toggleListening,
  clearConversation
}: VoiceControlsProps) => {
  return (
    <div className="flex items-center gap-2 justify-center pb-6">
      <Button
        variant={isProcessing ? "secondary" : isListening ? "destructive" : "default"}
        onClick={toggleListening}
        disabled={isProcessing || isSpeaking}
        className="rounded-full h-14 w-14 p-0 shadow-md hover:shadow-lg transition-all"
        style={{
          background: isListening 
            ? 'linear-gradient(135deg, #ff5b5b, #ff3838)' 
            : isProcessing 
            ? 'linear-gradient(135deg, #f2f2f2, #e0e0e0)' 
            : 'linear-gradient(135deg, #a0f2a8, #4BDE5C)',
          border: 'none'
        }}
      >
        {isListening ? (
          <MicOff className="h-6 w-6 text-white" />
        ) : (
          <Mic className="h-6 w-6 text-white" />
        )}
      </Button>
      
      {(transcript || assistantResponse) && (
        <Button 
          variant="outline" 
          onClick={clearConversation}
          className="ml-2"
        >
          <X className="h-4 w-4 mr-1" /> Clear
        </Button>
      )}
      
      <div className="text-xs text-muted-foreground ml-2">
        Status: {isListening ? 'Listening' : isProcessing ? 'Processing' : isSpeaking ? 'Speaking' : 'Ready'}
      </div>
    </div>
  );
};

export default VoiceControls;
