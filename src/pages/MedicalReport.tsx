import React from "react";

interface MedicalReportProps {
  doctor: string;
  date: string;
  specialization: string;
  patient: string;
  birthDate: string;
  medNumber: string;
  phone: string;
  ihi: string;
  email: string;
  assessment: string;
  diagnosis: string;
  prescription: string;
}

const MedicalReport: React.FC<MedicalReportProps> = ({
  doctor,
  date,
  specialization,
  patient,
  birthDate,
  medNumber,
  phone,
  ihi,
  email,
  assessment,
  diagnosis,
  prescription,
}) => {
    const dummyData: MedicalReportProps = {
        doctor: "Dr. Smith",
        date: "07.04.2025",
        specialization: "Neurology",
        patient: "Jane Doe",
        birthDate: "10.10.1990",
        medNumber: "MED12345",
        phone: "+91 9876543210",
        ihi: "IHI12345",
        email: "jane@example.com",
        assessment: "Stable condition.",
        diagnosis: "Migraine",
        prescription: "Paracetamol 500mg"
      };
  return (
    <div className="max-w-4xl mx-auto mt-10 p-10 bg-white shadow border text-black text-sm leading-relaxed font-sans">
      <h1 className="text-center text-xl font-bold mb-6">MEDICAL REPORT</h1>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <h2 className="text-green-700 font-semibold">Visit Info</h2>
          <p><strong>Doctor's Name:</strong> {doctor}</p>
          <p><strong>Specialization:</strong> {specialization}</p>
        </div>
        <div>
          <p><strong>Visit Date:</strong> {date}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <h2 className="text-green-700 font-semibold">Patient Info</h2>
          <p><strong>Full Name:</strong> {patient}</p>
          <p><strong>Med. Number:</strong> {medNumber}</p>
          <p><strong>Phone:</strong> {phone}</p>
        </div>
        <div>
          <p><strong>Birth Date:</strong> {birthDate}</p>
          <p><strong>IHI:</strong> {ihi}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>
      </div>

      <div className="mb-3">
        <h2 className="text-green-700 font-semibold">Assessment</h2>
        <p>{assessment}</p>
      </div>

      <div className="mb-3">
        <h2 className="text-green-700 font-semibold">Diagnosis</h2>
        <p>{diagnosis}</p>
      </div>

      <div className="mb-3">
        <h2 className="text-green-700 font-semibold">Prescription</h2>
        <p>{prescription}</p>
      </div>
    </div>
  );
};

export default MedicalReport;
