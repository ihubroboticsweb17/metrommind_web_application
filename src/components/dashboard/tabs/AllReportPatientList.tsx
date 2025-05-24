"use client";
import { AllReportList } from "@/models/auth";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PatientDetails() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AllReportList()
           console.log("Error fetching data:", result.data);

        const fetchedData = result.data.data.map(
          (item: any) => item.patient_details
        );
        console.log("All patient details:", fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full p-4">
      <ul className="space-y-4 w-full max-w-md">
        {data.map((item: any) => (
          <li
            key={item.id}
            className="p-4 border rounded shadow  w-full"
          >
            <p className="text-emerald-300"><strong>Name:</strong> {item.name}</p>
            <p className="text-emerald-300"><strong>Email:</strong> {item.email}</p>
            <p className="text-emerald-300"><strong>Mobile:</strong> {item.mobile_number}</p>
            <p className="text-emerald-300"><strong>Patient ID:</strong> {item.patient_id_metro}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}