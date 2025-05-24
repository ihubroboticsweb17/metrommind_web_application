
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VoiceOption {
  id: string;
  name: string;
}

interface VoiceSelectorProps {
  availableVoices: VoiceOption[];
  currentVoiceId: string;
  handleVoiceChange: (voiceId: string) => void;
  testVoice: () => void;
  isSpeaking: boolean;
}

const VoiceSelector = ({
  availableVoices,
  currentVoiceId,
  handleVoiceChange,
  testVoice,
  isSpeaking
}: VoiceSelectorProps) => {
  return (
    <div className="p-3 bg-primary/5 rounded-lg dark:bg-black/20">
      <p className="text-xs mb-2 dark:text-white">Select voice:</p>
      <Select value={currentVoiceId} onValueChange={handleVoiceChange}>
        <SelectTrigger className="dark:bg-black/30 dark:border-metro-dark-border">
          <SelectValue placeholder="Select a voice" />
        </SelectTrigger>
        <SelectContent className="dark:bg-metro-dark-highlight border-metro-dark-border">
          {availableVoices.map((voice) => (
            <SelectItem key={voice.id} value={voice.id}>
              {voice.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={testVoice}
        disabled={isSpeaking}
        className="mt-2 w-full dark:bg-black/20 dark:border-metro-dark-border"
      >
        Test Voice
      </Button>
    </div>
  );
};

export default VoiceSelector;
