import { useEffect, useMemo, useState } from "react"
import {
  AddOnAiSummry,
  AddOnSecondAiSummry,
  ApproveAiDiagnosisSummary,
  ApproveButton,
  EnquiriesList,
  GeneratButton,
  RejectButton,
} from "@/models/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowBigLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  EyeIcon,
  Search,
  X,
  AlertTriangle,
  FileText,
  User,
  Stethoscope,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UserData {
  id: number
  name: string
  username: string
  email: string
  mobile_number: string
  medical_report: string
  medical_report_url: string
  role: string
  age: number | null
  gender: string
  occupation: string | null
  education: string | null
  address: string | null
  patient_id: number | null | string
  diagnosis?: {
    id: number
    ai_report: {
      patient_report: {
        [key: string]: string
      }
      therapist_report: {
        Severity: number | null
        Suicidality_Risk: string
        Presenting_Complaints: string
        Disease_Diagnosed: string
      }
    }
  }[]
}

interface PatientState {
  isAddNotSuccss: boolean
  isApproved: boolean
  isApprovedSecond: boolean
  isSecondAssessmentSubmitted: boolean
  addOnObs: string
  addOnSecondObs: string
  therapistNotes: string
  pdfUrl: string | null
  secondAssessmentPdfUrl: string
}

const PatientEnquiryTab = () => {
  const [patients, setPatients] = useState<UserData[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedPatient, setSelectedPatient] = useState<UserData | null>(null)
  const { toast } = useToast()
  const [generatedStatus, setGeneratedStatus] = useState<{
    [key: number]: boolean
  }>({})
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [fullReportDialog, setFullReportDialog] = useState(false)
  const [secondReportDialog, setSecondReportDialog] = useState(false)
  const [openSecondDialog, setOpenSecondDialog] = useState(false)
  const [therapistNotes, setTherapistNotes] = useState("")
  const [addOnObs, setAddOnObs] = useState("")
  const [checkState, setCheckState] = useState(null)
  const [disease, setDisease] = useState(null)
  const [isApproved, setIsApproved] = useState(false)
  const [isAddNotSuccss, setIsAddNotSuccss] = useState(false)
  const [isApprovedpatientList, setIsApprovedpatientList] = useState(false)
  const [pdfUrls, setPdfUrls] = useState({})
  const [addOnSecondObs, setAddOnSecondObs] = useState("")
  const [summary, setSummary] = useState("")
  const [isSecondAssessmentSubmitted, setIsSecondAssessmentSubmitted] = useState(false)
  const [secondAssessmentPdfUrl, setSecondAssessmentPdfUrl] = useState("")
  const [isApprovedSecond, setIsApprovedSecond] = useState(false)
  const [patientStates, setPatientStates] = useState<{
    [key: number]: PatientState
  }>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [patientsPerPage] = useState(10)

  // Helper functions for patient state management
  const getPatientState = (patientId: number): PatientState => {
    return (
      patientStates[patientId] || {
        isAddNotSuccss: false,
        isApproved: false,
        isApprovedSecond: false,
        isSecondAssessmentSubmitted: false,
        addOnObs: "",
        addOnSecondObs: "",
        therapistNotes: "",
        pdfUrl: null,
        secondAssessmentPdfUrl: "",
      }
    )
  }

  const updatePatientState = (patientId: number, newState: Partial<PatientState>) => {
    setPatientStates((prev) => ({
      ...prev,
      [patientId]: {
        ...getPatientState(patientId),
        ...newState,
      },
    }))
  }

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await EnquiriesList()
        setPatients(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load patients.")
        toast({
          title: "Error",
          description: "Unable to fetch patient data. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchPatients()
  }, [toast])

  useEffect(() => {
    if (selectedPatient) {
      const patientState = getPatientState(selectedPatient.id)
      setIsAddNotSuccss(patientState.isAddNotSuccss)
      setIsApproved(patientState.isApproved)
      setIsApprovedSecond(patientState.isApprovedSecond)
      setIsSecondAssessmentSubmitted(patientState.isSecondAssessmentSubmitted)
      setAddOnObs(patientState.addOnObs)
      setAddOnSecondObs(patientState.addOnSecondObs)
      setTherapistNotes(patientState.therapistNotes)
      setPdfUrl(patientState.pdfUrl)
      setSecondAssessmentPdfUrl(patientState.secondAssessmentPdfUrl)

      if (pdfUrls[selectedPatient.id]) {
        setPdfUrl(pdfUrls[selectedPatient.id])
      }

      setOpenDialog(false)
      setOpenSecondDialog(false)
      setFullReportDialog(false)
      setSecondReportDialog(false)
    }
  }, [selectedPatient?.id, pdfUrls])

  useEffect(() => {
    if (
      selectedPatient?.diagnosis?.length > 0 &&
      selectedPatient.diagnosis[selectedPatient.diagnosis.length - 1]?.ai_report?.therapist_report
    ) {
      const lastDiagnosis = selectedPatient.diagnosis[selectedPatient.diagnosis.length - 1]
      setCheckState(lastDiagnosis.ai_report.therapist_report)
      setSummary(lastDiagnosis.ai_report.patient_report.patient_summary)
      setDisease(lastDiagnosis.id)
    }
  }, [selectedPatient])

  const handleGenerate = async (userId: number) => {
    if (!userId) return

    try {
      const formData = { user: userId }
      const response = await GeneratButton(formData)
      if (response.status === "ok") {
        toast({
          title: "Success",
          description: "AI report imported successfully",
        })

        setPdfUrl(response.summary_file_url)
        setGeneratedStatus((prev) => ({ ...prev, [userId]: true }))
        setPdfUrls((prev) => ({
          ...prev,
          [userId]: response.file_url,
        }))

        updatePatientState(userId, {
          pdfUrl: response.summary_file_url,
        })
      } else {
        throw new Error(response.message || "Unknown error.")
      }
    } catch (err) {
      console.error("PDF generation failed", err)
      toast({
        title: "Warning",
        description: "No AI report found for this patient. Please ensure the patient has completed the assessment.",
        variant: "destructive",
      })
    }
  }

  const handleSubmitTherapistNotes = async () => {
    if (!selectedPatient) return
    if (!addOnObs.trim()) {
      toast({
        title: "Missing Notes",
        description: "Please enter therapist notes before submitting.",
        variant: "destructive",
      })
      return
    }

    const doctorid = localStorage.getItem("user_id")

    try {
      const formData = {
        patient_id: selectedPatient?.id,
        add_on_obs: addOnObs,
        diagnosis_id: disease,
        doctor_id: doctorid,
      }
      const response = await AddOnAiSummry(formData)
      if (response.status === "ok") {
        toast({
          title: "Success",
          description: "Therapist notes submitted successfully",
        })
        setOpenDialog(false)
        setIsAddNotSuccss(true)

        updatePatientState(selectedPatient.id, {
          isAddNotSuccss: true,
          addOnObs: addOnObs,
        })
      } else {
        toast({
          title: "Failed",
          description: response.message || "Failed to submit therapist notes",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to submit therapist notes",
        variant: "destructive",
      })
    }
  }

  const handleApproveAiDiagnosisSummary = async (patientId: number) => {
    if (!selectedPatient || !disease) return

    try {
      const lastDiagnosis = selectedPatient.diagnosis[selectedPatient.diagnosis.length - 1]
      const formData = { diagnosis_id: lastDiagnosis.id }
      const response = await ApproveAiDiagnosisSummary(formData)
      if (response.status === "ok") {
        toast({
          title: "Success",
          description: "Primary diagnosis approved successfully",
        })
        setIsApproved(true)

        updatePatientState(selectedPatient.id, {
          isApproved: true,
        })
      } else {
        throw new Error(response.message || "Unknown error.")
      }
    } catch (err) {
      console.error("Approval failed", err)
      toast({
        title: "Error",
        description: "Failed to approve diagnosis",
        variant: "destructive",
      })
    }
  }

  const handleSubmitSecondTherapistNotes = async () => {
    if (!selectedPatient) return
    if (!addOnSecondObs.trim()) {
      toast({
        title: "Missing Notes",
        description: "Please enter second therapist notes before submitting.",
        variant: "destructive",
      })
      return
    }

    try {
      const formData = {
        user_id: selectedPatient?.id,
        therapist_input: addOnSecondObs,
      }
      const response = await AddOnSecondAiSummry(formData)
      if (response.status === "ok") {
        toast({
          title: "Success",
          description: "Second assessment completed successfully",
        })
        setOpenSecondDialog(false)
        setIsSecondAssessmentSubmitted(true)
        setIsApprovedSecond(true)
        setSecondAssessmentPdfUrl(response.second_assessment_url)

        updatePatientState(selectedPatient.id, {
          isSecondAssessmentSubmitted: true,
          isApprovedSecond: true,
          addOnSecondObs: addOnSecondObs,
          secondAssessmentPdfUrl: response.second_assessment_url,
        })
      } else {
        toast({
          title: "Failed",
          description: response.message || "Failed to submit second assessment",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to submit second assessment",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (id: number) => {
    try {
      const response = await RejectButton(id)
      if (response.status === "ok") {
        toast({
          title: "Patient Rejected",
          description: response.message,
        })
        setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id))
        if (selectedPatient?.id === id) {
          setSelectedPatient(null)
        }
      } else {
        throw new Error(response.message || "Unknown error.")
      }
    } catch (error) {
      toast({
        title: "Rejection failed",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      })
    }
  }

  const handleApprove = async (id: number) => {
    try {
      const response = await ApproveButton(id)
      if (response.status === "ok") {
        toast({
          title: "Patient Approved",
          description: response.message,
        })
        setIsApprovedpatientList(true)
        setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id))
        if (selectedPatient?.id === id) {
          setSelectedPatient(null)
        }
        updatePatientState(id, { isApproved: true })
      } else {
        throw new Error(response.message || "Unknown error.")
      }
    } catch (error) {
      toast({
        title: "Approval failed",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      })
    }
  }

  const filteredAndPaginatedPatients = useMemo(() => {
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toString().includes(searchTerm) ||
        (patient.mobile_number && patient.mobile_number.includes(searchTerm)),
    )

    const totalPages = Math.ceil(filtered.length / patientsPerPage)
    const startIndex = (currentPage - 1) * patientsPerPage
    const endIndex = startIndex + patientsPerPage
    const paginatedPatients = filtered.slice(startIndex, endIndex)

    return {
      patients: paginatedPatients,
      totalPatients: filtered.length,
      totalPages,
      currentPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    }
  }, [patients, searchTerm, currentPage, patientsPerPage])

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <div className=" ">
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="secondary"
              size="sm"
              className="shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white border border-teal-200 text-teal-700 hover:text-teal-900"
              onClick={() => window.history.back()}
            >
              <ArrowBigLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>

          <CardHeader className=" text-white">
            <div className="text-center">
              <CardTitle className="text-teal-600 text-3xl font-bold mb-2">Patient Enquiry Management</CardTitle>
              
            </div>
          </CardHeader>

        <CardContent className="p-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Patient List */}
            <div className="lg:col-span-1">
              <Card className="border-teal-100 shadow-sm h-full">
                <CardHeader className="bg-teal-50 border-b border-teal-100 py-3">
                  <CardTitle className="text-teal-800 text-lg">Patient Enquiries</CardTitle>
                  <div className="relative mt-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-10 border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  {searchTerm && (
                    <div className="text-sm text-gray-600 mt-2">
                      {filteredAndPaginatedPatients.totalPatients} patient(s) found
                    </div>
                  )}
                </CardHeader>

                <CardContent className="p-0 flex flex-col h-full">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                    </div>
                  ) : error ? (
                    <div className="p-4 text-red-500 text-center">{error}</div>
                  ) : (
                    <>
                      <div className="flex-1">
                        <ScrollArea className="h-[400px]">
                          {filteredAndPaginatedPatients.patients.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                              {searchTerm ? `No patients found matching "${searchTerm}"` : "No patient enquiries found"}
                            </div>
                          ) : (
                            filteredAndPaginatedPatients.patients.map((patient) => (
                              <div
                                key={patient.id}
                                className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                                  selectedPatient?.id === patient.id
                                    ? "bg-teal-50 border-l-4 border-teal-500"
                                    : "border-b"
                                }`}
                                onClick={() => setSelectedPatient(patient)}
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-teal-700">{patient.name}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500">ID: {patient.id}</span>
                                    {patient.age && <span className="text-xs text-gray-500">• Age: {patient.age}</span>}
                                  </div>
                                  {searchTerm && <div className="text-xs text-gray-400 mt-1">{patient.email}</div>}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-teal-600 hover:text-teal-800 hover:bg-teal-50"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedPatient(patient)
                                  }}
                                >
                                  <EyeIcon className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </div>
                            ))
                          )}
                        </ScrollArea>
                        {filteredAndPaginatedPatients.totalPages > 1 && (
                          <div className="border-t border-teal-100 p-4 bg-teal-50">
                            <div className="flex items-center justify-between">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={!filteredAndPaginatedPatients.hasPrevPage}
                                className="border-teal-300 text-teal-700 hover:bg-teal-100"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <span className="text-sm font-medium text-teal-800 px-2">
                                Page {currentPage} of {filteredAndPaginatedPatients.totalPages}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={!filteredAndPaginatedPatients.hasNextPage}
                                className="border-teal-300 text-teal-700 hover:bg-teal-100"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Combined Patient Details and AI Diagnosis */}
            <div className="lg:col-span-2">
              <Card className="border-teal-100 shadow-sm h-full">
                <CardHeader className="bg-teal-50 border-b border-teal-100 py-3">
                  <CardTitle className="text-teal-800 text-lg">Patient Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {!selectedPatient ? (
                    <div className="flex flex-col items-center justify-center h-[500px] text-gray-500">
                      <EyeIcon className="h-12 w-12 mb-4 text-gray-300" />
                      <p>Select a patient to view details</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Patient Details Section */}
                      <Card className="border-blue-100 bg-blue-50/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-blue-800 text-lg flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Patient Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <span className="font-medium text-gray-700">Name:</span>
                                <p className="text-gray-900">{selectedPatient.name}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Age:</span>
                                <p className="text-gray-900">{selectedPatient.age || "Not specified"}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Gender:</span>
                                <p className="text-gray-900">{selectedPatient.gender || "Not specified"}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Patient ID:</span>
                                <p className="text-gray-900">{selectedPatient.patient_id || selectedPatient.id}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <span className="font-medium text-gray-700">Email:</span>
                                <p className="text-gray-900">{selectedPatient.email}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Phone:</span>
                                <p className="text-gray-900">{selectedPatient.mobile_number || "Not provided"}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Address:</span>
                                <p className="text-gray-900">{selectedPatient.address || "Not provided"}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* AI Diagnosis Section */}
                      <Card className="border-teal-100 bg-teal-50/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-teal-800 text-lg flex items-center gap-2">
                            <Stethoscope className="h-5 w-5" />
                            AI Diagnosis Assessment
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {!generatedStatus[selectedPatient.id] ? (
                            <div className="space-y-4">
                              <Alert className="border-amber-200 bg-amber-50">
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                                <AlertDescription className="text-amber-800">
                                  No AI report available for this patient. Import the AI report to view detailed
                                  diagnosis information.
                                </AlertDescription>
                              </Alert>
                              <div className="text-center">
                                <Button
                                  onClick={() => handleGenerate(selectedPatient.id)}
                                  className="bg-teal-600 hover:bg-teal-700"
                                >
                                  <FileText className="w-4 h-4 mr-2" />
                                  Import AI Report
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              {/* Primary Diagnosis */}
                              <div className="bg-white rounded-lg p-4 border border-teal-200">
                                <h4 className="font-semibold mb-3 text-teal-800 flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  Primary Diagnosis Summary
                                </h4>
                                <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 mb-4">
                                  <p className="text-gray-700">{summary}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                  <Button
                                    onClick={() => setFullReportDialog(true)}
                                    variant="outline"
                                    className="border-teal-600 text-teal-600 hover:bg-teal-50"
                                  >
                                    <FileText className="w-4 h-4 mr-2" />
                                    View Full Report
                                  </Button>

                                  {!isAddNotSuccss ? (
                                    <Button
                                      onClick={() => setOpenDialog(true)}
                                      className="bg-blue-600 hover:bg-blue-700"
                                    >
                                      Add Therapist Notes
                                    </Button>
                                  ) : (
                                    <Badge className="bg-green-100 text-green-800 border border-green-200 px-3 py-1">
                                      ✓ Therapist Notes Added
                                    </Badge>
                                  )}

                                  {!isApproved ? (
                                    <Button
                                      className="bg-green-600 text-white hover:bg-green-700"
                                      onClick={() => handleApproveAiDiagnosisSummary(selectedPatient.id)}
                                      disabled={!isAddNotSuccss}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Approve Primary Diagnosis
                                    </Button>
                                  ) : (
                                    <Badge className="bg-green-100 text-green-800 border border-green-200 px-3 py-1">
                                      ✓ Primary Diagnosis Approved
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Secondary Diagnosis - Only show when primary is approved */}
                              {isApproved && (
                                <div className="bg-white rounded-lg p-4 border border-purple-200">
                                  <h4 className="font-semibold mb-3 text-purple-800 flex items-center gap-2">
                                    <Stethoscope className="h-4 w-4" />
                                    Secondary Assessment
                                  </h4>

                                  {!isSecondAssessmentSubmitted ? (
                                    <div className="space-y-4">
                                      <p className="text-gray-600 text-sm">
                                        Primary diagnosis approved. Proceed with secondary assessment for comprehensive
                                        evaluation.
                                      </p>
                                      <Button
                                        onClick={() => setOpenSecondDialog(true)}
                                        className="bg-purple-600 hover:bg-purple-700"
                                      >
                                        Add Secondary Assessment Notes
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="space-y-4">
                                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                                        <p className="text-sm text-green-600 mb-2 flex items-center gap-2">
                                          <CheckCircle className="h-4 w-4" />
                                          Secondary assessment completed successfully
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                          <Button
                                            onClick={() => setSecondReportDialog(true)}
                                            variant="outline"
                                            className="border-purple-600 text-purple-600 hover:bg-purple-50"
                                          >
                                            <FileText className="w-4 h-4 mr-2" />
                                            View Secondary Report
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                              if (secondAssessmentPdfUrl) {
                                                window.open(secondAssessmentPdfUrl, "_blank")
                                              }
                                            }}
                                          >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Report
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Final Actions */}
                              {isSecondAssessmentSubmitted && (
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                  <h4 className="font-semibold mb-3 text-gray-800">Final Decision</h4>
                                  <div className="flex justify-end gap-3">
                                    {!isApprovedpatientList && (
                                      <>
                                        <Button
                                          variant="outline"
                                          className="text-red-600 border-red-600 hover:bg-red-50"
                                          onClick={() => handleReject(selectedPatient.id)}
                                        >
                                          <X className="w-4 h-4 mr-2" />
                                          Reject Patient
                                        </Button>
                                        <Button
                                          className="bg-green-600 text-white hover:bg-green-700"
                                          onClick={() => handleApprove(selectedPatient.id)}
                                        >
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          Approve Patient
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>

      {/* Dialogs remain the same */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800">Primary Therapist Notes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">Add your professional assessment to supplement the AI diagnosis.</p>
            <Textarea
              value={addOnObs}
              onChange={(e) => setAddOnObs(e.target.value)}
              placeholder="Enter your clinical observations and recommendations..."
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitTherapistNotes} className="bg-teal-600 hover:bg-teal-700">
              Submit Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openSecondDialog} onOpenChange={setOpenSecondDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-purple-800">Secondary Assessment Notes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              Add detailed observations for comprehensive patient assessment and generate secondary AI report.
            </p>
            <Textarea
              value={addOnSecondObs}
              onChange={(e) => setAddOnSecondObs(e.target.value)}
              placeholder="Enter detailed clinical observations for secondary assessment..."
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenSecondDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitSecondTherapistNotes} className="bg-purple-600 hover:bg-purple-700">
              Submit Secondary Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={fullReportDialog} onOpenChange={setFullReportDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-teal-800">Primary AI Assessment Report</DialogTitle>
          </DialogHeader>
          <div className="h-[60vh] overflow-auto border rounded-md bg-white">
            {pdfUrl ? (
              <iframe src={pdfUrl} title="AI Report PDF" width="100%" height="100%" className="border-0"></iframe>
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (pdfUrl) {
                  window.open(pdfUrl, "_blank")
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={secondReportDialog} onOpenChange={setSecondReportDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-purple-800">Secondary AI Assessment Report</DialogTitle>
          </DialogHeader>
          <div className="h-[60vh] overflow-auto border rounded-md bg-white">
            {secondAssessmentPdfUrl ? (
              <iframe
                src={secondAssessmentPdfUrl}
                title="Secondary AI Report PDF"
                width="100%"
                height="100%"
                className="border-0"
              ></iframe>
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (secondAssessmentPdfUrl) {
                  window.open(secondAssessmentPdfUrl, "_blank")
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PatientEnquiryTab