import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import ReappoinmentTab from "./ReappoinmentTab";


const SettingTab = () => {
  const [availability, setAvailability] = useState(true);
  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border rounded-lg p-4 mb-4 shadow-sm">
        <h2 className="text-xl font-semibold text-teal-800  mb-4">Profile </h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
          <div>
            <p className="font-mediumtext-teal-800 ">Dr.Name</p>
            <p>
              Specialty: <strong>Specialist</strong>
            </p>
            <div className="flex items-center mt-2">
              <label className="mr-2">Availability</label>
              <input
                type="checkbox"
                checked={availability}
                onChange={() => setAvailability(!availability)}
                className="toggle toggle-primary"
              />
              <span className="ml-2">{availability ? "On" : "Off"}</span>
            </div>

            <div className="mt-2">
              <p className="mb-1">Notification Preferences</p>
              <label className="mr-4">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      email: !prev.email,
                    }))
                  }
                />
                <span className="ml-1">Email</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={() =>
                    setNotifications((prev) => ({ ...prev, sms: !prev.sms }))
                  }
                />
                <span className="ml-1">SMS</span>
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Preferences Grid
      <div className="grid grid-cols-2 gap-4">
        <Card className="border p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-teal-800  mb-2">
            Data Access Control
          </h3>
          <p>Assigned Patients</p>
          <p>View All Records</p>
        </Card>

        <Card className="border p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-teal-800  mb-2">AI Preferences</h3>
          <label className="block">
            <input type="checkbox" /> Show AI suggestions
          </label>
          <label className="block">
            <input type="checkbox" /> Confidence Scores
          </label>
          <label className="block">
            <input type="checkbox" /> Diagnostic probabilities
          </label>
        </Card>

        <Card className="border p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-teal-800  mb-2">
            Interface Settings
          </h3>
          <p>
            Appearance: <input type="radio" name="theme" /> Light
          </p>
          <p>Font Size:</p>
          <label>
            <input type="radio" name="fontsize" /> Small
          </label>
          <label className="ml-4">
            <input type="radio" name="fontsize" /> Large
          </label>
        </Card>

        <Card className="border p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-teal-800  mb-2">
            Legal & Compliance
          </h3>
          <p>Consent Templates</p>
          <p>Access Logs</p>
        </Card>
   
      </div> */}

      {/* <div className="mt-6 text-center">
        <button className="bg-teal-500 text-white border px-4 py-2 rounded  hover:bg-white  hover:text-black">
          Save Changes
        </button>
      </div> */}
    </div>
  );
};

export default SettingTab;
