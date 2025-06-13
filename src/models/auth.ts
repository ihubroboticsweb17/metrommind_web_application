import api from "../services/api";
import axios from "axios";
// Mock user data - in a real app, this would come from a backend

export const MOCK_USERS = {
  patients: [{ email: "patient@example.com", password: "patient123" }],
  therapists: [{ email: "therapist@example.com", password: "therapist123" }],
  admins: [{ email: "admin@example.com", password: "admin123" }],
};

export type UserRole = "patients" | "therapists" | "admins" | null;

export interface UserCredentials {
  email: string;
  password: string;
}

export function authenticateUser(
  credentials: UserCredentials,
  role: UserRole
): boolean {
  if (!role) return false;

  const users = MOCK_USERS[role];

  if (!users) return false;

  return users.some(
    (user) =>
      user.email === credentials.email && user.password === credentials.password
  );
}

export function saveUserSession(
  email: string,
  role: UserRole,
  rememberEmail: boolean
): void {
  // Save email if rememberMe is checked
  if (rememberEmail) {
    localStorage.setItem("metroMindSavedEmail", email);
  } else {
    localStorage.removeItem("metroMindSavedEmail");
  }

  if (!role) return;

  // Convert plural role to singular for storage
  const singularRole = role.slice(0, -1);
  const loginmail = localStorage.getItem("email");
  // Store user info in localStorage (in a real app use proper auth)
  localStorage.setItem(
    "metroMindUser",
    JSON.stringify({ email: loginmail, role: singularRole })
  );
}

export function getSavedEmail(): string | null {
  return localStorage.getItem("email");
}

export const VerifyPhoneNo = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  try {
    const response = await api.post("accounts/send_otp/", formData, {
      headers,
    });

    console.log("VerifyPhoneNo response", response.data);
    return response.data;
  } catch (error) {
    console.error("VerifyPhoneNo error:", error);
    throw error;
  }
};
export const VerifyOtp = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  try {
    const response = await api.post("accounts/check_otp/", formData, {
      headers,
    });
    console.log("VerifyOtp response", response.data);
    return response.data;
  } catch (error) {
    console.error("VerifyPhoneNo error:", error);
    throw error;
  }
};
export const register = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  const response = await api.post("accounts/register/", formData, { headers });
  const data = response.data.data;
  return response.data;
};
export const login = async (email: string, password: string) => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("loginData");
  const response = await api.post("accounts/login/", { email, password });
  const data = response.data.data;
  localStorage.setItem("loginData", data);
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("name", data.name);
  localStorage.setItem("user_id", data.user_id.toString());
  localStorage.setItem("email", data.email);
  localStorage.setItem("first", data.first_time);
  return data;
};

export const patientlist = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.get("assign_doctor/new/patience/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data; // return patient list
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
export const patientDetails = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.get(`accounts/user/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user; // return patient list
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
export const patientDiagnosis = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post(
    "patient_functions/patient/diagnosis/data/",
    formData,
    {
      headers,
    }
  );
  const data = response.data;
  console.log("data", data);
  return response.data;
};
export const AssignDoctorList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.get("doctors/list/consult/doctors/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.users;
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};

export const assignDoctorToPatient = async (
  doctorId: number,
  patientId: number
) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No access token found. Please log in.");
  }

  const response = await api.post(
    `assign_doctor/assign-doctor/${patientId}/`,
    {
      doctor: doctorId,
      patient_id: patientId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const ForgotPasswordSentOpt = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post(
    "forgott_password/forgot/password/",
    formData,
    {
      headers,
    }
  );
  const data = response.data;
  return response.data;
};
export const VerifyOtpAndResetPassword = async (
 id: string | number,
  formData:any
) => {
  try {
    const response = await api.post(`forgott_password/verify/otp/${id}/`,{formData});
    console.log("OTP verification response:", response);
    return response;
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};
export const ResetPassword = async (
 id: string | number,
  formData:any
) => {
  try {
    const response = await api.post(`forgott_password/new/password/${id}/`,{formData});
    console.log("OTP verification response:", response);
    return response;
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};
export const Doctorregister = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("doctors/register/doctor/", formData, {
    headers,
  });
  const data = response.data.data;
  return response.data;
};
interface MedicinePayload {
  name: string;
}

export const Medicineregister = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("medicine/medicine/create/", formData, {
    headers,
  });
  const data = response.data;
  console.log("data", data);
  return response.data;
};
export const MedicineDetailList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.get("medicine_assign/patient/medicine/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching medicine list:", error);
    throw error;
  }
};
export const MedicineList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.get("medicine/medicine/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data; // <<=== THIS IS IMPORTANT
  } catch (error: any) {
    console.error("Error fetching medicine list:", error);
    throw error;
  }
};

export const deleteMedicine = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.delete(`medicine/medicine/delete/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error deleting medicine:", error);
    throw error;
  }
};
export const MedicineBrandCreat = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("medicine/create-brand/", formData, {
    headers,
  });
  const data = response.data;
  console.log("data", data);
  return response.data;
};
export const MedicineBrandlist = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.get("medicine/brand/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data; // <<=== THIS IS IMPORTANT
  } catch (error: any) {
    console.error("Error fetching medicine list:", error);
    throw error;
  }
};
export const deleteMedicineBrand = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.delete(`medicine/brand/delete/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error deleting medicine:", error);
    throw error;
  }
};
export const MedicineFreqCreated = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("medicine/frequency/create/", formData, {
    headers,
  });
  const data = response.data;
  console.log("data", data);
  return response.data;
};
export const ObservationCreated = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post(
    "doctor_observations/observation/create/",
    formData,
    {
      headers,
    }
  );
  const data = response.data;
  console.log("data", data);
  return response.data;
};
export const MedicineFreqList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.get("medicine/frequency/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching medicine list:", error);
    throw error;
  }
};
export const deleteMedicineFreq = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.delete(`medicine/frequency/delete/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error deleting medicine:", error);
    throw error;
  }
};
export const MedicinesAdd = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("medicine_assign/add-medicines/", formData, {
    headers,
  });
  console.log("response", response);
  const data = response.data.data;
  return response.data;
};
export const MedicineAssignPatientList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.get("medicine_assign/patient/medicine/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    console.error("Error  medicine assign patient list:", error);
    throw error;
  }
};
// export const PatientChat = async (

//   headers = {

//     "Content-Type": "application/json",
//   }
// ) => {
//   const token = localStorage.getItem("access_token");
//   const response = await api.post("accounts/psychiatrist-chat/",{ headers

//   });
//   const data = response.data.data;
//   return response.data;
// };
// export const PatientChat = async (message: string, sessionId: string) => {
//   try {
//     const token = localStorage.getItem("access_token");

//     if (!token) {
//       throw new Error("No access token found");
//     }

//     const response = await api.post("accounts/psychiatrist-chat/", null, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },

//     });

//     return response.data; // or response.data.data if needed
//   } catch (error) {
//     console.error("Chat API error:", error);
//     throw error;
//   }
// };
export const PatientChat = async (message: string, sessionId: string) => {
  const token = localStorage.getItem("access_token");

  const response = await api.post(
    "accounts/psychiatrist-chat/",
    {
      message: message,
      session_id: sessionId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
// export const PatientAssessmentList = async (
//   patientId: number
// ) => {
//   const token = localStorage.getItem("access_token");

//   if (!token) {
//     throw new Error("No access token found. Please log in.");
//   }

//   const response = await api.post(
//     `thoughts/patient-thoughts/list/${patientId}/`,
//     {
//       patient_id: patientId,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data;
// };
// export const PatientAssessmentAdd = async (id: number) => {
//   try {
//     const token = localStorage.getItem("access_token");

//     if (!token) {
//       throw new Error("No access token found. Please log in.");
//     }
//     // const userid=localStorage.getItem("user_id")
//     const response = await api.patch(`/thoughts/thoughts/update/${id}/`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error: any) {
//     console.error("Error :", error);
//     throw error;
//   }
// };
export const PatientAssessmentUpdate = async (id: number, responseText: string) => {
  try {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.patch(`/thoughts/thoughts/update/${id}/`, 
      {
        response_text: responseText, // Send the updated response text
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error updating assessment:", error);
    throw error;
  }
};
export const PatientAssessmentList = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }
    // const userid=localStorage.getItem("user_id")
    const response = await api.get(`thoughts/patient-thoughts/list/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
export const PatientAppoinmentList = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }
    // const userid=localStorage.getItem("user_id")
    const response = await api.get("appointment/appointment/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
export const DoctorAssessmenttoPatient = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("thoughts/thoughts/create/", formData, {
    headers,
  });
  const data = response.data.data;
  return response.data;
};
export const PatientAssessmenttoDoctorList = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("thoughts/patient-thoughts/list/", formData, {
    headers,
  });
  const data = response.data.data;
  return response.data;
};

export const DoctorSlotCreate = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("booking/slots/create/", formData, {
    headers,
  });
  const data = response.data.data;
  return response.data;
};
export const DoctorList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }
    const response = await api.get("doctors/list/doctors/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Doctor list:", error);
    throw error;
  }
};
export const EnquiriesList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.get("accounts/unverified-users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
export const SlotBookedList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.get("booking/list/all/slots/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
export const fetchDoctorSlots = async (doctor_name: string, date: string) => {
  const response = await api.get(`appointment/slots/filter/`, {
    params: { doctor_name, date },
  });
  return response.data.data;
};
export const AssesmentList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.get("doctor_observations/observation/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
interface AppointmentData {
  doctor: number;
  patient: number;
  slot: number;
  date: string;
}
export const MakeAppointment = async (
  formData: AppointmentData,
  token?: string // Optional: pass token if available
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await api.post(
      "appointment/appointment/create/",
      formData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create appointment:", error);
    throw error;
  }
};
export const DoctorCallMakeList = async (
  token?: string // Optional: pass token if available
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await api.post("call_doctors/get_assigned_doctors/", {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create appointment:", error);
    throw error;
  }
};

export const AssignDoctorPatientList = async () => {
  const response = await api.get(
    `assign_doctor/doctor/patients/list/${localStorage.getItem("user_id")}/`
  );
  console.log("API response:", response.data);
  return response.data.data;
};
export const DoctorObservationPatient = async (doctorId: string) => {
  const response = await api.get(`doctor_observations/doctor-observations/`);
  console.log("DoctorObservationPatient", response.data);
  return response.data.data;
};
export const AddOnAiSummry = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post(
    "doctor_observations/preliminary-addons/create/",
    formData,
    {
      headers,
    }
  );
  const data = response.data;
  return response.data;
};
export const AddOnSecondAiSummry = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("accounts/second-assessment-api/", formData, {
    headers,
  });
  const data = response.data;
  return response.data;
};
export const GeneratButton = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("accounts/generate_pdf/", formData, {
    headers,
  });
  const data = response.data;
  return response.data;
};
export const fetchAddon = async (patient_id: string) => {
  const response = await api.get(`doctor_observations/preliminary-addons/`, {
    params: { patient_id },
  });
  return response.data.data;
};
export const PdfSowInPatientDashboard = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("accounts/view_ai_report_pdf/", formData, {
    headers,
  });
  const data = response.data;
  return response.data;
};

export const ApproveAiDiagnosisSummary = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post(
    "accounts/approve_ai_diagnosis_summary/",
    formData,
    {
      headers,
    }
  );
  const data = response.data;
  return response.data;
};
export const ChatEnableApi = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("accounts/enable_chat_api/", formData, {
    headers,
  });
  const data = response.data;
  return response.data;
};
export const ApproveButton = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.post(
      `accounts/approve-user/${id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API response@@@@@@@@@@@@@:", response);
    return response.data;
  } catch (error: any) {
    console.error("Error approving user:", error);
    throw error;
  }
};

export const RejectButton = async (id: number) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }
    const response = await api.post(`accounts/reject-user/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
export const RejectedPatientList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.get("accounts/notapproved-users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
export const AllReportList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.post("senior_function/assigned/patient/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API response@@@@@@@@@@@@@:", response);
    return response;
  } catch (error: any) {
    console.error("Error approving user:", error);
    throw error;
  }
};
export const DoctorCallvoxbay = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post(
    "voxbay/click-to-call/",
    formData,
    {
      headers,
    }
  );
  const data = response;
  console.log("data");
  return response.data;
};
export const DoctorCallvoxbayCreat = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post(
    "voxbay/api/voxbay/create/",
    formData,
    {
      headers,
    }
  );
  const data = response;
  console.log("data");
  return response.data;
};
export const AllPatientReports = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post(
    "senior_function/assigned/patient/diagnosis/list/",
    formData,
    {
      headers,
    }
  );
  const data = response;
  console.log("data");
  return response.data;
};
export const AppointmentDetailtoPatient = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.get("appointment/appointment/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
export const TalktoEnableButton = async (
  formData: any,
  headers = {
    "Content-Type": "application/json",
  }
) => {
  const response = await api.post("accounts/toggle_call_assigning/", formData, {
    headers,
  });
  const data = response.data;
  return response.data;
};
export const AvailableDoctorsList = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.get("accounts/available-doctors/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
export const Reappointment = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }

    const response = await api.get("assign_doctor/doctor/assign/list/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching patient list:", error);
    throw error;
  }
};
export const quotesauth = async () => {
  const response = await api.get(`accounts/quotes/`);
  console.log("DoctorObservationPatient", response);
  return [response.data.message];
};
export const CountData = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }
    const response = await api.get("counts/admin/dashboard/count/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching Doctor list:", error);
    throw error;
  }
};
export const CountDataSeniorDashboard = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found. Please log in.");
    }
    const response = await api.get("counts/senior/dashboard/count/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching Doctor list:", error);
    throw error;
  }
};
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role");
  localStorage.removeItem("user_id");
  localStorage.removeItem("email");
  localStorage.removeItem("phoneNo");
  localStorage.removeItem("phoneNo");
  localStorage.removeItem("chat_section_id");
  // Optional: clear everything
  // localStorage.clear();
};
