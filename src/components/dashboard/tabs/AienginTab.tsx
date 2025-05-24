import React, { useState } from "react";

const tabs = ["Summarizer", "Diagnosis", "Protocol", "Outcome"];

const AienginTab = () => {
  const [activeTab, setActiveTab] = useState("Summarizer");

  return (
    <div className="p-6  bg-white">

      {/* <div className="flex border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 border-r font-medium ${
              activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div> */}

      {/* Content cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="AI Summarizer" description="Generate a clinical summary based on symptoms and history" />
        <Card title="Diagnosis Assistant" description="Suggest a diagnosis based on patient data and input" />
        <Card title="Protocol Generator" description="Recommend a treatment plan based on the diagnosis" />
        <Card title="Outcome Predictor" description="Predict therapy response and recommend adjustments" />
      </div>
    </div>
  );
};

const Card = ({ title, description }: { title: string; description: string }) => (
  <div className="border rounded-lg p-4 shadow-sm">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <button className="bg-teal-500 text-white border px-4 py-2 rounded  hover:bg-white  hover:text-black">
      Generate
    </button>
  </div>
);

export default AienginTab;