
export interface ConversationTurn {
  userMessage: string;
  assistantMessage: string;
}

export interface UseVoiceProcessorProps {
  onTranscriptChange?: (text: string) => void;
}

export interface UseVoiceProcessorReturn {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  transcript: string;
  assistantResponse: string;
  toggleListening: () => void;
  clearConversation: () => void;
  handleProcessCommand: (command: string) => Promise<void>;
  conversationHistory: ConversationTurn[];
  stopAllVoiceActivity: () => void;
}
