
import { ConversationTurn } from "@/types/voiceTypes";

export interface VoiceAssistantButtonProps {
  isListening: boolean;
  isProcessing: boolean;
  onClick: () => void;
}

export interface ConversationDisplayProps {
  transcript: string;
  assistantResponse: string;
  assistantAvatar?: string;
  conversationHistory?: ConversationTurn[];
}

export interface VoiceControlsProps {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  transcript: string;
  assistantResponse: string;
  toggleListening: () => void;
  clearConversation: () => void;
}
