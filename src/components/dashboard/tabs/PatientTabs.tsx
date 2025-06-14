import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ChatTab from "./ChatTab";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useState } from "react";
import useVoiceProcessor from "@/hooks/useVoiceProcessor";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import Chatbox from "./Chatbox";
import ChatBotPage from "@/pages/ChatBotPage";
import TaketoHuman from "./TaketoHuman";

import SchedulePatientTab from "./SchedulePatientTab";
import AssessmentPatentTab from "./AssessmentPatentTab";

import AssessmentsTab from "./AssessmentsTab";
import OverviewTab from "./OverviewTab";
import SessionsTab from "./SessionsTab";
import MedicineTable from "./MedicineTab";

// import MedicineTab from "./tabs/MedicineTab";

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
          {/* <TabsContent value="medicine">
            <MedicineTab/>
          </TabsContent> */}
        </Tabs>
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
