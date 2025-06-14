
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useTheme } from "@/App";
import { useEffect, useState } from "react";
import { quotesauth } from "@/models/auth";
import { useToast } from "@/hooks/use-toast";
import PatientDataTab from "./PatientDataTab";

interface Quote {
  quote: string;
  author: string;
}

const OverviewTab = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [quote, setQuote] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const qa = await quotesauth();
        if (qa && qa.length > 0) {
          setQuote(qa);
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
        toast({
          title: "Error fetching quote",
          description: "Could not load the daily inspiration.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, [toast]);

  const nextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quote.length);
  };

  return (
    <div className="space-y-4">
      {/* Quote Card - Animated and Interactive */}
      {!loading && quote.length > 0 && (
        <Card
          className="overflow-hidden group relative transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] cursor-pointer"
          onClick={nextQuote} // Cycle on click
        >
          <div
            className={`relative p-8 rounded-lg flex items-center justify-center min-h-[180px] ${
              theme === "green"
                ? "bg-gradient-to-br from-teal-50 to-teal-200 text-gray-800"
                : "bg-gradient-to-br from-gray-900 to-gray-700 text-gray-100"
            } transition-colors duration-300`}
          >
            {/* Large, subtle quote icon in background */}
            <Quote
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 opacity-5 ${
                theme === "green" ? "text-teal-600" : "text-teal-400"
              } transition-opacity duration-300`}
            />

            {quote.length > 0 && (
              <div
                key={currentQuoteIndex} // Key for re-rendering and animation on change
                // Use a simple Tailwind animation. You might need to define custom keyframes
                // in your tailwind.config.js if you want more complex effects like slide-in.
                // For now, we'll use 'animate-in fade-in zoom-in' from shadcn/ui or similar if available,
                // or just basic opacity transition.
                className="max-w-3xl mx-auto text-center relative z-10 transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-95"
              >
                <p
                  className={`italic text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-4 ${
                    theme === "green" ? "text-gray-900" : "text-gray-50"
                  } transition-colors duration-300`}
                >
                  "{quote[currentQuoteIndex].quote}"
                </p>
                <p
                  className={`mt-4 text-right font-semibold text-md md:text-lg ${
                    theme === "green" ? "text-teal-700" : "text-teal-300"
                  } transition-colors duration-300`}
                >
                  — {quote[currentQuoteIndex].author}
                </p>
              </div>
            )}
            {/* Navigation arrows for multiple quotes, visible on hover */}
            {quote.length > 1 && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => { e.stopPropagation(); nextQuote(); }}
                  className={`p-2 rounded-full ${theme === "green" ? "bg-teal-700/20 text-teal-800 hover:bg-teal-700/40" : "bg-white/10 text-white/70 hover:bg-white/30"} focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === "green" ? "focus:ring-teal-500" : "focus:ring-white"} transition-all duration-200`}
                  aria-label="Next quote"
                >
                  &#x2192; {/* Right arrow */}
                </button>
              </div>
            )}
            {quote.length > 1 && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + quote.length) % quote.length); }}
                  className={`p-2 rounded-full ${theme === "green" ? "bg-teal-700/20 text-teal-800 hover:bg-teal-700/40" : "bg-white/10 text-white/70 hover:bg-white/30"} focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === "green" ? "focus:ring-teal-500" : "focus:ring-white"} transition-all duration-200`}
                  aria-label="Previous quote"
                >
                  &#x2190; {/* Left arrow */}
                </button>
              </div>
            )}
          </div>
        </Card>
      )}

     <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">

{/* <EnquiryTab/> */}

<PatientDataTab/>

</div>

      <div className="grid gap-4 md:grid-cols-1">
        {/* Other components like ActivityList, AssistantCard, PatientProgress can go here */}
        {/* <ActivityList /> */}
        {/* <AssistantCard theme={theme} /> */}
        {/* <PatientProgress /> */}
      </div>
    </div>
  );
};

export default OverviewTab;