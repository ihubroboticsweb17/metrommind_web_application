import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ChatEnableApi } from '@/models/auth';

const ChatButtonTab = ({ selectedPatient }) => {
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check chat status on component mount or when patient changes
  useEffect(() => {
    if (selectedPatient?.id) {
      checkChatStatus();
    }
  }, [selectedPatient?.id]);

  // Function to check current chat status
  const checkChatStatus = async () => {
    try {
      const response = await ChatEnableApi({ patient_id: selectedPatient.id });
      setIsApproved(response.status === true || response.status === "true");
    } catch (err) {
      console.error("Failed to check chat status", err);
    }
  };

  // Function to handle chat enable
  const handleChatEnable = async () => {
    if (!selectedPatient?.id) {
      toast({
        title: "Error",
        description: "No patient selected",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = { patient_id: selectedPatient.id };
      const response = await ChatEnableApi(formData);
      
      // Check for both boolean and string responses
      if (response.status === true || response.status === "true") {
        toast({
          title: "Success",
          description: "AI chat enabled successfully"
        });
        setIsApproved(true);
      } else {
        // Handle the case where chat is already enabled
        if (response.message === "AI chat is already enabled.") {
          toast({
            title: "Info",
            description: "AI chat is already enabled",
            variant: "default",
          });
          setIsApproved(true); // Set to true since it's already enabled
        } else {
          throw new Error(response.message || "Failed to enable chat");
        }
      }
    } catch (err) {
      console.error("Chat enable failed", err);
      toast({
        title: "Error",
        description: err.message || "Failed to enable AI chat",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle chat disable
  const handleChatDisable = async () => {
    if (!selectedPatient?.id) {
      toast({
        title: "Error",
        description: "No patient selected",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = { patient_id: selectedPatient.id };
      const response = await ChatEnableApi(formData);
      
      // Check for both boolean and string responses
      if (response.status === true || response.status === "true") {
        toast({
          title: "Success",
          description: "AI chat disabled successfully"
        });
        setIsApproved(false);
      } else {
        throw new Error(response.message || "Failed to disable chat");
      }
    } catch (err) {
      console.error("Chat disable failed", err);
      toast({
        title: "Error",
        description: err.message || "Failed to disable AI chat",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Chat Enable Button - Show when chat is disabled */}
      {!isApproved && (
        <Button
          onClick={handleChatEnable}
          disabled={isLoading || !selectedPatient?.id}
          className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400"
        >
          {isLoading ? "Enabling..." : "Enable Chat"}
        </Button>
      )}

      {/* Chat Disable Button - Show when chat is enabled */}
      {isApproved && (
        <Button
          onClick={handleChatDisable}
          disabled={isLoading || !selectedPatient?.id}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
        >
          {isLoading ? "Disabling..." : "Disable Chat"}
        </Button>
      )}

      {/* Status Indicator */}
      <div className="flex items-center">
        <span className={`px-2 py-1 rounded text-sm ${
          isApproved 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          Chat {isApproved ? 'Enabled' : 'Disabled'}
        </span>
      </div>
    </div>
  );
};

export default ChatButtonTab;