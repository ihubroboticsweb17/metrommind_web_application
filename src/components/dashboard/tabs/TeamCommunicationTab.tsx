import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

// Assuming AssignDoctorList is imported from your API service file

import { DoctorList } from '@/models/auth';

const TeamCommunicationTab = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssDoctorlist = async () => {
      try {
        setLoading(true);
        const data = await DoctorList();
        console.log("DoctorList@", data);
        setDoctorList(data.users || []);
      } catch (err) {
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssDoctorlist();
  }, []);

  const openWhatsApp = (phoneNumber) => {
    // Remove any non-numeric characters from the phone number
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    
    // Open WhatsApp web with the phone number
    window.open(`https://web.whatsapp.com/send?phone=${formattedNumber}`, '_blank');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading doctors...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="p-4">
    
      {doctorList.length === 0 ? (
        <p>No doctors available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctorList.map((doctor) => (
            <div 
              key={doctor.id} 
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold">
                  {doctor.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-gray-600 text-sm capitalize">{doctor.role.replace('_', ' ')}</p>
                </div>
              </div>
              
              <div className="space-y-1 mb-4">
                <p className="text-sm flex items-center">
                  <span className="font-medium mr-2">Email:</span> {doctor.email}
                </p>
                {doctor.mobile_number && (
                  <p className="text-sm flex items-center">
                    <span className="font-medium mr-2">Phone:</span> {doctor.mobile_number}
                  </p>
                )}
              </div>
              
              <div className="flex space-x-2">
                {doctor.mobile_number && (
                  <>
                    <button 
                      onClick={() => openWhatsApp(doctor.mobile_number)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </button>
                    
                    <button 
                      onClick={() => window.open(`tel:${doctor.mobile_number}`)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                    >
                      <Phone size={16} />
                      Call
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamCommunicationTab;