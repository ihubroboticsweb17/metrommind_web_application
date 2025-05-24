import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { ApproveButton, EnquiriesList, GeneratButton, patientlist, RejectButton } from '@/models/auth';
import { Dialog } from '@radix-ui/react-dialog';
import { Navigate, useNavigate } from 'react-router-dom'; 
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  User,
} from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Skeleton } from "@/components/ui/skeleton";
interface Diagnosis {
  diagnosis_summary: string;
  chat_history: string;
  created_at: string;
  severity: string;
}
interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  mobile_number: string;
  medical_report: string;
  medical_report_url: string;
  role: string;
  age: number | null;
  gender: string;
  occupation: string | null;
  education: string | null;
  address: string | null;
  patient_id: number | null;
  diagnosis: Diagnosis;
}
const EnquiriesListTab= () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogViewOpen, setIsDialogViewOpen] = useState(false);
  const [enquiri, setEnquiri] = useState<UserData[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedenquiri, setSelectedEnquiri] = useState<any>(null);
    const [isDialogAddOpen, setIsDialogAddOpen] = useState(false);
    const [generatedStatus, setGeneratedStatus] = useState<{ [key: number]: boolean }>({});
    const [approvedStatus, setApprovedStatus] = useState<{ [key: number]: boolean }>({});
    const [rejectStatus, setRejectStatus] = useState<{ [key: number]: boolean }>({});
     const [pdfUrls, setPdfUrls] = useState({});
        useEffect(() => {
          const fetchPatients = async () => {
            try {
              setLoading(true);
              const data = await EnquiriesList();
              console.log("@@@@@@@data2", data);
              setEnquiri(data);
            } catch (err) {
              setError("Failed to load patients.");
            } finally {
              setLoading(false); // stop loading
            }
          };
      
          fetchPatients();
        }, []);
        const handleGenerate = async (userId: number) => {
            if (!userId) return
        
            try {
              const formData = { user: userId }
              const response = await GeneratButton(formData)
              if (response.status === "ok") {
                toast({
                  title: "Success",
                  description: "AI report generated successfully",
                })
        
                // setPdfUrl(response.file_url)
                // localStorage.setItem("pdf",response.file_url)
                setGeneratedStatus((prev) => ({ ...prev, [userId]: true }))
                        setPdfUrls((prev) => ({
                  ...prev,
                  [userId]: response.file_url
                }));
        
              } else {
                throw new Error(response.message || "Unknown error.")
              }
            } catch (err) {
              console.error("PDF generation failed", err)
              toast({
                title: "Error",
                description: "Failed to generate AI report",
                variant: "destructive",
              })
            }
          }
        // const handleGenerate = async () => {
        //   try {
        //     const result = await GeneratButton(); // Call your actual API function
        //     alert("AI Generation Successful");
        //     setGeneratedStatus((prev) => ({
        //       ...prev,
        //       [id]: true,
        //     }));
        //   } catch (err) {
        //     alert("AI Generation Failed.");
        //     console.error(err);
        //   }
        // };
        const handleApprove = async (id: number) => {
          try {
            const response = await ApproveButton(id); 
            console.log("API response########:", response);
        
            if (response.status === "ok") {
              toast({
                title: "AI Approve Successful",
                description: response.message,
              });
         
              // alert("AI Approve Successful");
        
              // setApprovedStatus((prev) => ({
              //   ...prev,
              //   [id]: true,
              // }));
              setLoading(true)
            } else {
              throw new Error(response.message || "Unknown error.");
            }
          } catch (error) {
           
            toast({
              title: "Approval failed",
              description: error?.message || "Something went wrong",
            });
            console.error("Approval error:", error);
          }
        };
        const handleReject = async (id: number) => {
          try {
            const response = await RejectButton(id); 
            console.log("API response########:", response);
        
            if (response.status === "ok") {
              toast({
                title: "AI Reject Successful",
                description: response.message,
              });
              setLoading(true)
            } else {
              throw new Error(response.message || "Unknown error.");
            }
          } catch (error) {
           
            toast({
              title: "Reject failed",
              description: error?.message || "Something went wrong",
            });
            console.error("Reject error:", error);
          }
        };
        // const handleApprove = async (id: number) => {
        //   try {
         
        //     const response = await ApproveButton(id); 
        //     console.log(" response!!!!!!!!!!!", response )
        //     if (response.success) {
        //       toast({
        //         title: "AI Approve Successful",
        //         description: `${response.message}`,
        //       });
        //       alert("AI Approve Successful")
        //       setLoading(true)
        //       setGeneratedStatus((prev) => ({
        //         ...prev,
        //         [id]: true,
        //       }));
        //     }
        //   } catch (error) {
        //     alert("Generation failed.");
        //     toast({
        //       title: "Generation failed",
        //       description: `Generation failed`,
        //     });
        //     console.error(error);
        //   }
        // };
        // const handleApprove = async (id: number) => {
        //   try {
        //     const res = await ApproveButton(id);
        //     alert(res.message);
        //     setApprovedStatus((prev) => ({ ...prev, [id]: true }));
        //   } catch (error) {
        //     alert("Approval failed.");
        //   }
        // };
        const fakeGenerateAPI = async (id: number) => {
          return new Promise((resolve) => {
            setTimeout(() => resolve({ success: true }), 1000); // Simulate network delay
          });
        };
       
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 mt-4 p-10">
    <Card className="border-teal-100 shadow-teal-glow overflow-hidden bg-white transition-all duration-200 hover:shadow-lg hover:scale-105 ">
    <CardHeader className="bg-teal-50 border-b border-teal-100">
      <div className="flex items-center justify-between">
        <CardTitle className="text-teal-800 flex items-center gap-2">
          Enquiries List
          <Sparkles className="h-4 w-4 text-teal-500" />
        </CardTitle>
        <Badge className="bg-teal-500 hover:bg-teal-600">
          {/* {patients.length} Active Patients */}
        </Badge>
      </div>
    </CardHeader>       
    <CardContent>
  
       <div className="grid grid-cols-6 bg-teal-50 p-3 text-sm font-medium text-teal-800">
         <div>Name</div>
         <div>Patient Id</div>
         <div>Mobile Number</div>
         <div>Ai Generate</div>
         <div></div>
         <div>View</div>
       </div>
       <div className="divide-y dark:divide-metro-dark-border/50 divide-teal-100">
         {enquiri.map((doc,index) => (
           <div
             key={doc.id}
             className="grid grid-cols-6 p-4 text-sm items-center hover:bg-teal-50/50 transition-colors"
           > 
             {/* <div className="font-medium text-teal-800">
               {index+1}
             </div> */}
             
             <div className="flex p-2 text-teal-700">
             <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User/>  
                </div>
                <div className='p-2'>
                {doc.name}
                </div>
             </div>
             <div>{doc.patient_id}</div>
             <div>{doc.mobile_number}</div>
            <div>
            {!generatedStatus[doc.id] ? (
              <Button onClick={() => handleGenerate(doc.id)}>Generate</Button>
            ) : (
              <p className="text-green-600 font-medium">Generated</p>
            )}
            </div>
             <div className="flex text-right gap-2">
             {generatedStatus[doc.id] && (
              <>
                <Button onClick={() => handleApprove(doc.id)} >Approve</Button>
                <Button
                  size="sm"onClick={() => handleReject(doc.id)}
                  className="border border-red-600 text-red-400 bg-white hover:bg-red-500 hover:text-white hover:border-red-800"
                >
                  Reject
                </Button>
              </>
             )} 

              {/* <Button>Approve</Button>
              <Button  size="sm"
                 className="border border-red-600 text-red-400 bg-white hover:bg-red-500 hover:text-white hover:border-red-800">Reject</Button>
               */}
             </div>
             <div>
             {/* <Button
                 variant="outline"
                 size="sm"
                 className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                 onClick={() => {
                  setSelectedEnquiri(doc);
                   setIsDialogOpen(true);
                 }}
               >
                 View Profile
               </Button> */}
             </div>
           </div>
         ))}
   
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
           <DialogContent>
             <DialogHeader className="bg-teal-50 border-b border-teal-100 p-4  ">
               <DialogTitle  className="text-center  text-teal-800 ">
                 Doctor Profile
               </DialogTitle>
             </DialogHeader>
             {selectedenquiri && (
               <div className="space-y-2">
                 <p>
                   <strong>Name:</strong> {selectedenquiri.name}
                 </p>
                 <p>
                   <strong>Doctor Id:</strong> {selectedenquiri.id}
                 </p>
                 <p>
                   <strong>Role:</strong>{" "}
                   {selectedenquiri.role}
                 </p>
                 <p>
                   <strong>Mobile No:</strong> {selectedenquiri.mobile_number}
                 </p>
               </div>
             )}
           </DialogContent>
         </Dialog>
       </div>
   
    </CardContent> 
 </Card>
 </div>
  )
}

export default EnquiriesListTab;

