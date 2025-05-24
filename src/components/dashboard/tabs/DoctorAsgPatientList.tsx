import { AssignDoctorPatientList } from '@/models/auth';
import React, { useEffect, useState } from 'react';
 // adjust the path

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  // add other fields based on your API response
}

interface ParentProps {
  doctorId: string;
}

const DoctorAsgPatientList: React.FC<ParentProps> = ({ doctorId}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!doctorId) return;
  
    const fetchPatients = async () => {
      try {
        const data = await AssignDoctorPatientList(doctorId);
        console.log("Fetched patients:", data);
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patient list:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPatients();
  }, [doctorId]);

  if (loading) return <p>Loading patients...</p>;

  return (
    <div>
      <h2>Assigned Patients</h2>
      {patients.length === 0 ? (
        <p>No patients assigned.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Gender</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{patient.name}</td>
                <td className="border px-4 py-2">{patient.age}</td>
                <td className="border px-4 py-2">{patient.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorAsgPatientList;
