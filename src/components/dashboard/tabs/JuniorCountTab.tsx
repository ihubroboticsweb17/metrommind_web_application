import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CountData } from '@/models/auth';
import { Brain, User, Users, ClipboardList, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
  key: string;
  value: number;
  delay: number;
}

const JuniorCountTab = () => {
  const [count, setCount] = useState<UserData[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const icons = [User, Users, Brain, ClipboardList];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true);
        const data = await CountData();
        setCount(data);
      } catch (err) {
        setError("Failed to load Count.");
      } finally {
        setLoading(false);
      }
    };
    fetchCount();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {loading ? (
        <div className="col-span-4 text-center py-10">
          <div className="animate-pulse text-teal-700">Loading statistics...</div>
        </div>
      ) : error ? (
        <div className="col-span-4 text-center py-10">
          <div className="text-red-500">{error}</div>
        </div>
      ) : (
        count.map((item, index) => {
          const IconComponent = icons[index % icons.length];
          const isLastItem = index === count.length - 1;
         
          return (     
  <Card
    key={index}
    onClick={isLastItem ? () => navigate('/patient-enquiry') : undefined}
    className="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 shadow-lg rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-xl h-40"
    style={{ transitionDelay: `${item.delay}ms` }}
  >
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-bold text-teal-800">
        {item.key}
      </CardTitle>
      <div className="p-3 bg-teal-100 rounded-full">
        <IconComponent className="h-8 w-8 text-teal-600" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-gray-800 mb-1">{item.value}</div>
      {isLastItem && (
        <div className="flex justify-end mb-24">
          <button
            onClick={() => navigate('/patient-enquiry')}
            className="flex items-center gap-2 px-2 py-0 text-white rounded-lg transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="h-5 w-5 text-teal-700" />
          </button>
        </div>
      )}
    </CardContent>
  </Card>


          );
        })
      )}
    </div>
  );
};

export default JuniorCountTab;