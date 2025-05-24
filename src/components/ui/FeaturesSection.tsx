import { Activity, Brain, Shield, Users, FileText,Stethoscope,GraduationCap, MessageSquare, ArrowRight, BookHeart,ClipboardPlus } from "lucide-react";
import { useState } from "react";
import DashboardCard from "./DashboardCard";
import { ThemeType } from "@/App";

const features = [
  {
    title: "Metromind Therapy",
    description: "Metro Mind Therapy utilize a scientific approach to improve mood, thoughts, and behaviors through a combination of pharmacological treatments, psychological interventions, and electromagnetic therapies.",
    icon: ClipboardPlus ,
    benefit: "Save 30% more time managing patient information"
  },
  {
    title: "Psychedelic Therapy",
    description: "By integrating cutting-edge research with patient-centered care, this therapy aims to provide transformative mental health outcomes.",
    icon: BookHeart,
    benefit: "Identify critical cases 2x faster than manual methods"
  },
  {
    title: "rTMS Therapy",
    description: "Repetitive Transcranial Magnetic Stimulation (rTMS) is a non-invasive, evidence-based therapy used to treat mental health conditions like depression, anxiety, and OCD.",
    icon: Stethoscope,
    benefit: "Reduce documentation time by up to 40%"
  },
  {
    title: "IV Therapy Clinic",
    description: "IV Drip Therapy or Intravenous Therapy, is the ultimate in delivering essential nutrients directly into the bloodstream via a cannula. Bypassing the gut barrier, IV administartion allows for maximum bio availability of the nutrients meaning your body may absorb what it needs quickly.",
    icon: GraduationCap ,
    benefit: "Improve team communication efficiency by 25%"
  },
];

interface FeaturesSectionProps {
  theme?: ThemeType;
}

const FeaturesSection = ({ theme = "default" }: FeaturesSectionProps) => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const getSectionClass = () => {
    switch (theme) {
      case "royal":
        return "bg-theme-royal-background/50";
      case "ocean":
        return "bg-theme-ocean-background/50";
      case "emerald":
        return "bg-theme-emerald-background/50";
      case "sunset":
        return "bg-theme-sunset-background/50";
      case "pink":
        return "bg-theme-pink-background/50";
      case "green":
        return "bg-theme-green-background/50";
      default:
        return "bg-secondary/30";
    }
  };

  const getHeadingClass = () => {
    if (theme !== "default") {
      return "theme-gradient-text";
    }
    return "text-foreground";
  }

  const getAccentColor = () => {
    switch (theme) {
      case "royal": return "text-theme-royal-primary";
      case "ocean": return "text-theme-ocean-primary";
      case "emerald": return "text-theme-emerald-primary";
      case "sunset": return "text-theme-sunset-primary";
      case "pink": return "text-theme-pink-primary";
      case "green": return "text-theme-green-primary";
      default: return "text-primary";
    }
  }

  return (
    // <section id="features" className={`py-8 ${getSectionClass()}`}>
      <div className="metro-container">
        <div className="text-center mb-16">
          <span className={`${getAccentColor()} font-medium text-sm uppercase tracking-wider mb-2 block`}>
            Powerful Platform
          </span>
          <h2 className={`text-4xl font-bold mb-6 ${getHeadingClass()}`}>
            Features Designed For Mental Health Professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered tools streamline your workflow, enhance patient care, and improve clinical outcomes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
  <div
    key={index}
    className="flex flex-col justify-between p-6 rounded-2xl shadow-md bg-white h-full"
  >
    <div className="flex items-center gap-2 mb-4 text-teal-600">
      <feature.icon className="h-6 w-6" />
      <h3 className="text-xl font-semibold">{feature.title}</h3>
    </div>
    
    <p className="text-muted-foreground line-clamp-4">
      {feature.description}
    </p>

    <div className="mt-4">
      <button
        onClick={() => setActiveFeature(index)}
        className="text-sm text-teal-600 hover:underline"
      >
        Read More
      </button>
    </div>
  </div>
))}
        </div>
        {activeFeature !== null && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white max-w-lg w-full rounded-lg p-6 relative shadow-lg">
      <button
        onClick={() => setActiveFeature(null)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h3 className="text-2xl font-semibold mb-2">{features[activeFeature].title}</h3>
      <p className="text-muted-foreground mb-4">{features[activeFeature].description}</p>
      {/* <p className="text-sm font-medium text-primary">{features[activeFeature].benefit}</p> */}
    </div>
  </div>
)}
      </div>
    // </section>
  );
};

export default FeaturesSection;