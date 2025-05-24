
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';

interface ApiKeySettingsProps {
  apiKeyType: 'webrtc' | 'elevenlabs';
  apiKey: string;
  setApiKey: (key: string) => void;
  isInitialized: boolean;
  handleSetApiKey: () => void;
  handleRemoveApiKey: () => void;
  handleResetApiKey?: () => void;
}

const ApiKeySettings = ({
  apiKeyType,
  apiKey,
  setApiKey,
  isInitialized,
  handleSetApiKey,
  handleRemoveApiKey,
  handleResetApiKey
}: ApiKeySettingsProps) => {
  const isWebRtc = apiKeyType === 'webrtc';
  const serviceName = isWebRtc ? 'WebRTC GPT' : 'ElevenLabs';
  const successMessage = isWebRtc ? 'intelligent responses' : 'voice';
  
  if (!isInitialized) {
    return (
      <div className="mb-4 p-4 bg-primary/5 rounded-lg dark:bg-black/20">
        <p className="text-sm mb-2 dark:text-white">Enter your {serviceName} API key for {isWebRtc ? 'intelligent responses' : 'enhanced voice'}:</p>
        <div className="flex space-x-2">
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={`${serviceName} API Key`}
            className="flex-1 dark:bg-black/20 dark:border-metro-dark-border"
          />
          <Button onClick={handleSetApiKey} size="sm">
            Set
          </Button>
        </div>
        {isWebRtc && (
          <p className="text-xs mt-2 text-green-500">
            A new API key has been configured for the voice assistant.
          </p>
        )}
      </div>
    );
  }
  
  return (
    <div className="mb-4 p-3 bg-primary/5 rounded-lg dark:bg-black/20">
      <div className="flex justify-between items-center">
        <p className="text-xs dark:text-green-400">✓ Using {serviceName} for {successMessage}</p>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRemoveApiKey}
            className="text-xs h-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
          >
            Remove
          </Button>
          {handleResetApiKey && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleResetApiKey}
              className="text-xs h-8"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Change
            </Button>
          )}
        </div>
      </div>
      {isWebRtc && (
        <p className="text-xs mt-2 text-green-500">
          Using updated API key
        </p>
      )}
    </div>
  );
};

export default ApiKeySettings;
