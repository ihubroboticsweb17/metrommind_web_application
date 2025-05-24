
import React from 'react';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const VoiceAssistantHeader = () => {
  return (
    <SheetHeader className="flex flex-col items-center">
      <Avatar className="h-24 w-24 mb-2">
        <AvatarImage src="/lovable-uploads/99dad8bd-4bed-4a53-8968-b70c9accef70.png" alt="MetroMind Assistant" />
        <AvatarFallback>MA</AvatarFallback>
      </Avatar>
      <SheetTitle className="dark:text-white">MetroMind Voice Assistant</SheetTitle>
    </SheetHeader>
  );
};

export default VoiceAssistantHeader;
