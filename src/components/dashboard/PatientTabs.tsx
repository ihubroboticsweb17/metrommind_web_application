import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./tabs/OverviewTab";
import SessionsTab from "./tabs/SessionsTab";
import AssessmentsTab from "./tabs/AssessmentsTab";
import ChatTab from "./tabs/ChatTab";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useState } from "react";
import useVoiceProcessor from "@/hooks/useVoiceProcessor";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import Chatbox from "./tabs/Chatbox";
import ChatBotPage from "@/pages/ChatBotPage";
import TaketoHuman from "./tabs/TaketoHuman";
import VoiceAssistant from "../VoiceAssistant";
import SchedulePatientTab from "./tabs/SchedulePatientTab";
import AssessmentPatentTab from "./tabs/AssessmentPatentTab";
import MedicineTab from "./tabs/MedicineTab";
import PatientAppointments from "./tabs/PatientAppointments";

const PatientTabs = () => {
  const [isListening, setIsListening] = useState(false);
  const patientIdString = localStorage.getItem("user_id"); // string or null
  const patientId = patientIdString ? Number(patientIdString) : null;
  const { toggleListening, assistantResponse } = useVoiceProcessor();
  const isMobile = useIsMobile();

  const handleToggleAssistant = () => {
    toggleListening();
    setIsListening(!isListening);
  };

  return (
    <>
      <div
        className={`flex ${
          isMobile ? "flex-col gap-3" : "justify-between items-center"
        } mb-4`}
      >
        {/* <Tabs
          defaultValue="overview"
          className={`space-y-4 ${isMobile ? "w-full" : "flex-1"}`}
        > */}
        <Tabs
          defaultValue="overview"
          className={`space-y-4 ${isMobile ? "w-full" : "flex-1"}`}
        >
          <TabsList className="dark:bg-metro-dark-highlight bg-white p-1 rounded-xl shadow-sm border border-teal-100">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="assessments"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              Assessments
            </TabsTrigger>
              <TabsTrigger
              value="medicine"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              Medicine
            </TabsTrigger>
                <TabsTrigger
              value="appoinment"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white rounded-lg"
            >
              Appoinment
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="schedule">
            <SchedulePatientTab />
          </TabsContent>
          <TabsContent value="assessments">
            <AssessmentPatentTab patientId={patientId}/>
          </TabsContent>
          <TabsContent value="call">
            <TaketoHuman />
          </TabsContent>
          <TabsContent value="medicine">
            <MedicineTab/>
          </TabsContent>
            <TabsContent value="appoinment">
            <PatientAppointments/>
          </TabsContent>
        </Tabs>
        {/* 
        <Button
          onClick={handleToggleAssistant}
          className={`rounded-full p-3 transition-all ${
            isListening
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } ${isMobile ? "self-end" : ""}`}
          aria-label={
            isListening ? "Turn off voice assistant" : "Turn on voice assistant"
          }
        >
          {isListening ? (
            <MicOff className="h-5 w-5 text-white" />
          ) : (
            <Mic className="h-5 w-5 text-white" />
          )}
        </Button> */}
      </div>

      {isListening && assistantResponse && (
        <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/lovable-uploads/99dad8bd-4bed-4a53-8968-b70c9accef70.png"
                alt="MetroMind Assistant"
              />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">MetroMind Assistant:</p>
              <p>{assistantResponse}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientTabs;
