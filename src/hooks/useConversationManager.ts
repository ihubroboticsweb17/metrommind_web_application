
import { useState, useCallback } from 'react';
import { ConversationTurn } from '@/types/voiceTypes';

interface UseConversationManagerProps {
  resetTranscript: () => void;
}

const useConversationManager = ({ resetTranscript }: UseConversationManagerProps) => {
  const [assistantResponse, setAssistantResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);

  const addConversationTurn = useCallback((userMessage: string, assistantMessage: string) => {
    setConversationHistory(prev => [
      ...prev, 
      { userMessage, assistantMessage }
    ]);
  }, []);

  const clearConversation = useCallback(() => {
    resetTranscript();
    setAssistantResponse('');
    setConversationHistory([]);
    console.log('Conversation cleared');
  }, [resetTranscript]);

  return {
    assistantResponse,
    setAssistantResponse,
    conversationHistory,
    addConversationTurn,
    clearConversation
  };
};

export default useConversationManager;
