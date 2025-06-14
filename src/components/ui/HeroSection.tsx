import {
  ArrowRight,
  Brain,
  Phone,
  Shield,
  Lightbulb,
  TrendingUp,
  Users,
  BotMessageSquare,
  Landmark,
  PhoneCall,
} from "lucide-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Assuming ThemeType is defined elsewhere in your App.tsx or a types file
interface ThemeType {
  // Define properties of ThemeType here
  name?: string;
}

// Add interface for button configuration
interface ButtonConfig {
  text: string;
  path: string;
  icon: React.ReactNode;
  subtitle?: string;
}

interface HeroSectionProps {
  theme?: ThemeType | string; // Allow string for direct theme names
}

// Types for the interactive diagram
interface Point {
  x: number;
  y: number;
}

interface Line {
  id: string;
  from: Point;
  to: Point;
}

// Helper function to get dashboard path based on role
const getDashboardPath = (role: string): string => {
  switch (role) {
    case "admin":
      return "/admin-dashboard";
    case "junior_psychologist":
      return "/junior-pysychology-dashboard";
    case "senior_psychologist":
      return "/senior-pysychology-dashboard";
    case "psychiatrist":
      return "/psychiatrist_dashboard";
    case "user":
      return "/patient-dashboard";
    default:
      return "/dashboard";
  }
};

// Reusable FeatureBox component for the interactive diagram
interface FeatureBoxProps {
  title: string;
  icon: React.ElementType;
  className?: string;
  theme: string | ThemeType;
  id: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({
  title,
  icon: Icon,
  className,
  theme,
  id,
}) => {
  const getFeatureBoxClasses = (currentTheme: string | ThemeType) => {
    const themeStr =
      typeof currentTheme === "string"
        ? currentTheme
        : currentTheme.name || "default";
    switch (themeStr) {
      case "royal":
        return "bg-theme-royal-card text-theme-royal-text shadow-royal-glow ring-1 ring-theme-royal-primary/20";
      case "ocean":
        return "bg-theme-ocean-card text-theme-ocean-text shadow-ocean-glow ring-1 ring-theme-ocean-primary/20";
      case "emerald":
        return "bg-theme-emerald-card text-theme-emerald-text shadow-emerald-glow ring-1 ring-emerald-primary/20";
      case "sunset":
        return "bg-theme-sunset-card text-theme-sunset-text shadow-sunset-glow ring-1 ring-sunset-primary/20";
      case "pink":
        return "bg-theme-pink-card text-theme-pink-text shadow-pink-glow ring-1 ring-pink-primary/20";
      case "green":
        return "bg-white text-gray-800 shadow-md ring-1 ring-green-primary/20";
      default:
        return "bg-card text-foreground shadow-lg ring-1 ring-primary/20";
    }
  };

  const getIconColorClass = (currentTheme: string | ThemeType) => {
    const themeStr =
      typeof currentTheme === "string"
        ? currentTheme
        : currentTheme.name || "default";
    switch (themeStr) {
      case "royal":
        return "text-theme-royal-primary";
      case "ocean":
        return "text-theme-ocean-primary";
      case "emerald":
        return "text-theme-emerald-primary";
      case "sunset":
        return "text-theme-sunset-primary";
      case "pink":
        return "text-theme-pink-primary";
      case "green":
        return "text-theme-green-primary";
      default:
        return "text-primary";
    }
  };

  return (
    <div
      id={id}
      className={`absolute flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm
      ${getFeatureBoxClasses(theme)} ${className}`}
    >
      <Icon className={`w-4 h-4 ${getIconColorClass(theme)}`} />
      {title}
    </div>
  );
};

// Reusable DiagramImage component for the interactive diagram
interface DiagramImageProps {
  src: string;
  alt: string;
  className?: string; // For additional styling
  id: string; // Unique ID for tracking position for SVG lines
}

const DiagramImage: React.FC<DiagramImageProps> = ({
  src,
  alt,
  className,
  id,
}) => {
  return (
    <img
      id={id} // Add ID for easy referencing in SVG line calculations
      src={src}
      alt={alt}
      className={`absolute w-32 h-32 md:w-40 md:h-40 object-cover rounded-full shadow-lg border-2 border-white ${className}`}
      onError={(e) => {
        // Fallback for broken images
        e.currentTarget.src = `https://placehold.co/${e.currentTarget.width}x${e.currentTarget.height}/cccccc/ffffff?text=Image`;
      }}
    />
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({ theme = "default" }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [hasGeneratedReport, setHasGeneratedReport] = useState(false);
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [animatedPath, setAnimatedPath] = useState<{
    d: string;
    length: number;
  } | null>(null);

  // Add authentication state listener
  const checkAuthState = useCallback(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setUserRole(role || "");

    // Reset states if logged out
    if (!token) {
      setHasGeneratedReport(false);
      setHasActiveSession(false);
    }
  }, []);

  // Listen for storage changes
  useEffect(() => {
    checkAuthState(); // Check initial state

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "access_token" || e.key === "role") {
        checkAuthState();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Add a custom event listener for logout
    const handleLogout = () => checkAuthState();
    window.addEventListener("auth-logout", handleLogout);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-logout", handleLogout);
    };
  }, [checkAuthState]);

  // Function to calculate center of an element relative to the diagram container
  const getElementCenter = (id: string) => {
    const element = document.getElementById(id);
    const diagramContainer = diagramRef.current;
    if (element && diagramContainer) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = diagramContainer.getBoundingClientRect();

      const centerX =
        (elementRect.left + elementRect.right) / 2 - containerRect.left;
      const centerY =
        (elementRect.top + elementRect.bottom) / 2 - containerRect.top;
      return { x: centerX, y: centerY };
    }
    return { x: 0, y: 0 };
  };

  // Function to draw lines and define the single animation path
  const drawPaths = useCallback(() => {
    const newLines = [];
    const elements = {
      sentimentAnalysisBox: getElementCenter("sentimentAnalysisBox"),
      numberPrivacyBox: getElementCenter("numberPrivacyBox"),
      callBargingBox: getElementCenter("callBargingBox"),
      deepDataLearningBox: getElementCenter("deepDataLearningBox"),
      image1: getElementCenter("image1"),
      image2: getElementCenter("image2"),
      image3: getElementCenter("image3"),
      image4: getElementCenter("image4"),
    };

    // Define the sequence of points for the single animated line
    // You'll need to manually define the 'railroad' path here
    // This is an example sequence, adjust it to your desired flow for a continuous loop
    const sequenceOfPoints = [
      elements.sentimentAnalysisBox,
      elements.image1,
      elements.callBargingBox,
      elements.image3,
      elements.sentimentAnalysisBox, // Loop back to start to complete the circle
      elements.image2,
      elements.numberPrivacyBox,
      elements.image4,
      elements.deepDataLearningBox,
      elements.sentimentAnalysisBox, // End at a common point to make loop visually cohesive
    ];

    let pathD = "";
    let tempPathLength = 0; // To accumulate path length for the animated line

    for (let i = 0; i < sequenceOfPoints.length; i++) {
      const currentPoint = sequenceOfPoints[i];
      if (i === 0) {
        pathD += `M ${currentPoint.x},${currentPoint.y}`;
      } else {
        const prevPoint = sequenceOfPoints[i - 1];
        pathD += ` L ${currentPoint.x},${currentPoint.y}`;
        // Calculate segment length and add to total
        tempPathLength += Math.sqrt(
          Math.pow(currentPoint.x - prevPoint.x, 2) +
            Math.pow(currentPoint.y - prevPoint.y, 2)
        );
      }
    }

    setAnimatedPath({ d: pathD, length: tempPathLength });

    // Still render individual dashed lines
    newLines.push({
      id: "line1",
      from: elements.sentimentAnalysisBox,
      to: elements.image1,
    });
    newLines.push({
      id: "line2",
      from: elements.numberPrivacyBox,
      to: elements.image2,
    });
    newLines.push({
      id: "line3",
      from: elements.image1,
      to: elements.callBargingBox,
    });
    newLines.push({
      id: "line4",
      from: elements.image2,
      to: elements.deepDataLearningBox,
    });
    newLines.push({
      id: "line5",
      from: elements.image3,
      to: elements.sentimentAnalysisBox,
    });
    newLines.push({
      id: "line6",
      from: elements.image4,
      to: elements.numberPrivacyBox,
    });
    newLines.push({
      id: "line7",
      from: elements.callBargingBox,
      to: elements.image3,
    });
    newLines.push({
      id: "line8",
      from: elements.deepDataLearningBox,
      to: elements.image4,
    });

    setLines(newLines);
  }, []);

  useEffect(() => {
    drawPaths();
    window.addEventListener("resize", drawPaths);
    const observer = new ResizeObserver(drawPaths);
    const currentRef = diagramRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }
    const bodyObserver = new ResizeObserver(drawPaths);
    bodyObserver.observe(document.body);

    return () => {
      window.removeEventListener("resize", drawPaths);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      bodyObserver.unobserve(document.body);
    };
  }, [drawPaths]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
    }
    if (role) {
      setUserRole(role);
    }
  }, []);

  useEffect(() => {
    const reportGenerated = localStorage.getItem("ai_report_generated");
    const sessionId = localStorage.getItem("chat_section_id");
    const chatMessages = localStorage.getItem("chat_messages");

    if (reportGenerated === "true") {
      setHasGeneratedReport(true);
    }

    if (sessionId && chatMessages) {
      try {
        const messages = JSON.parse(chatMessages);
        if (messages.length > 0) {
          setHasActiveSession(true);
        }
      } catch (error) {
        console.error("Error parsing chat messages:", error);
      }
    }
  }, []);

  const handleSignup = () => {
    navigate("/phoneverify");
  };

  const getThemeClasses = () => {
    const themeStr =
      typeof theme === "string" ? theme : theme.name || "default";
    switch (themeStr) {
      case "royal":
        return "bg-gradient-radial from-theme-royal-background via-theme-royal-card/30 to-theme-royal-background animate-gradient-move";
      case "ocean":
        return "bg-gradient-radial from-theme-ocean-background via-theme-ocean-card/30 to-theme-ocean-background animate-gradient-move";
      case "emerald":
        return "bg-gradient-radial from-theme-emerald-background via-theme-emerald-card/30 to-theme-emerald-background animate-gradient-move";
      case "sunset":
        return "bg-gradient-radial from-theme-sunset-background via-theme-sunset-card/30 to-theme-sunset-background animate-gradient-move";
      case "pink":
        return "bg-gradient-radial from-theme-pink-background via-theme-pink-card/30 to-theme-pink-background animate-gradient-move";
      case "green":
        return "bg-white"; // Green theme might not need a gradient animation
      default:
        return "bg-gradient-radial from-white via-blue-50/30 to-white dark:from-background dark:via-card/30 dark:to-background animate-gradient-move";
    }
  };

  const getButtonClass = () => {
    const themeStr =
      typeof theme === "string" ? theme : theme.name || "default";
    switch (themeStr) {
      case "royal":
        return "bg-theme-royal-primary text-white shadow-royal-glow hover:bg-theme-royal-accent";
      case "ocean":
        return "bg-theme-ocean-primary text-white shadow-ocean-glow hover:bg-theme-ocean-accent";
      case "emerald":
        return "bg-theme-emerald-primary text-white shadow-emerald-glow hover:bg-theme-emerald-accent";
      case "sunset":
        return "bg-theme-sunset-primary text-white shadow-sunset-glow hover:bg-theme-sunset-accent";
      case "pink":
        return "bg-theme-pink-primary text-white shadow-pink-glow hover:bg-theme-pink-accent";
      case "green":
        return "bg-theme-green-primary text-white hover:bg-theme-green-primary/90 shadow-md";
      default:
        return "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg";
    }
  };

  const getSecondaryButtonClass = () => {
    const themeStr =
      typeof theme === "string" ? theme : theme.name || "default";
    switch (themeStr) {
      case "royal":
        return "border-theme-royal-primary/40 text-theme-royal-primary hover:bg-theme-royal-primary/10";
      case "ocean":
        return "border-theme-ocean-primary/40 text-theme-ocean-primary hover:bg-theme-ocean-primary/10";
      case "emerald":
        return "border-theme-emerald-primary/40 text-theme-emerald-primary hover:bg-theme-emerald-primary/10";
      case "sunset":
        return "border-theme-sunset-primary/40 text-theme-sunset-primary hover:bg-theme-sunset-primary/10";
      case "pink":
        return "border-theme-pink-primary/40 text-theme-pink-primary hover:bg-theme-pink-primary/10";
      case "green":
        return "border-theme-green-primary/40 text-theme-green-primary hover:bg-theme-green-primary/10";
      default:
        return "border-primary/40 text-primary hover:bg-primary/10";
    }
  };

  const getMobileBadgeClasses = () => {
    const themeStr =
      typeof theme === "string" ? theme : theme.name || "default";
    switch (themeStr) {
      case "royal":
        return "bg-theme-royal-primary/10 text-theme-royal-primary";
      case "ocean":
        return "bg-theme-ocean-primary/10 text-theme-ocean-primary";
      case "emerald":
        return "bg-theme-emerald-primary/10 text-theme-emerald-primary";
      case "sunset":
        return "bg-theme-sunset-primary/10 text-theme-sunset-primary";
      case "pink":
        return "bg-theme-pink-primary/10 text-theme-pink-primary";
      case "green":
        return "bg-theme-green-primary/10 text-theme-green-primary";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getPrimaryButtonConfig = () => {
    // If not logged in, show sign in
    if (!isLoggedIn) {
      return {
        text: "Sign In",
        path: "/login",
        icon: (
          <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        ),
      };
    }

    // If not a user role, return dashboard path for professionals
    if (userRole && userRole !== "user") {
      return {
        text: "Go to Dashboard",
        path: getDashboardPath(userRole),
        icon: (
          <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        ),
      };
    }

    // Logic for 'user' role
    const firstTime = localStorage.getItem("first_time");

    // If chat is completed (first_time is true), always show dashboard
    if (firstTime === "true") {
      return {
        text: "Dashboard",
        path: "/patient-dashboard",
        icon: (
          <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        ),
      };
    }

    // Only show chatbot options if first_time is false (chat not completed)
    if (hasActiveSession) {
      return {
        text: "Continue Chat",
        path: "/chatbot",
        icon: (
          <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        ),
        subtitle: "Resume your session",
      };
    }

    // For new users or if no active session (and first_time is false)
    return {
      text: "Start AI Chat",
      path: "/chatbot",
      icon: (
        <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      ),
    };
  };

  const buttonConfig = getPrimaryButtonConfig();

  return (
    <div
      className={`relative py-20 px-4 md:px-8 overflow-hidden ${getThemeClasses()}`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Section: Text Content */}
        <div className="text-center md:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${getMobileBadgeClasses()}`}
          >
            <Brain className="h-5 w-5 mr-2" /> AI-Powered Care
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6"
          >
            Your Partner in Mental Health
            <span
              className={`${
                theme === "green"
                  ? "text-theme-green-primary"
                  : theme !== "default"
                  ? "theme-gradient-text"
                  : "text-primary"
              } block`}
            >
              Transformation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-2xl text-lg md:text-xl text-muted-foreground mx-auto md:mx-0 mb-10 leading-relaxed"
          >
            Transform mental healthcare delivery with advanced AI analytics,
            real-time monitoring, and intelligent insights for better patient
            outcomes and empowered professionals.
          </motion.p>

          {isLoggedIn && hasActiveSession && !hasGeneratedReport && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium shadow-md mb-6"
            >
              <span className="w-2.5 h-2.5 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
              You have an incomplete chat session
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8"
          >
            <Link
              to={buttonConfig.path}
              className={`px-8 py-3 rounded-full group font-semibold text-lg transition-all duration-300 ease-in-out 
                ${getButtonClass()} inline-flex items-center justify-center relative overflow-hidden
                hover:scale-105 active:scale-95 transform shadow-lg`}
            >
              {buttonConfig.text}
              {buttonConfig.icon}
              {buttonConfig.subtitle && (
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-background whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {buttonConfig.subtitle}
                </span>
              )}
            </Link>

            {!isLoggedIn && (
              <button
                onClick={handleSignup}
                className={`px-8 py-3 rounded-full border-2 font-semibold text-lg transition-colors duration-300 ease-in-out 
                  ${getSecondaryButtonClass()} hover:shadow-md hover:scale-105 active:scale-95 transform`}
              >
                Sign up
              </button>
            )}
          </motion.div>
        </div>

        {/* Right Section: Interactive Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden md:flex justify-center items-center relative z-10 min-h-[400px]"
        >
          <div
            ref={diagramRef}
            className="relative w-full h-[500px] max-w-[600px] flex items-center justify-center"
          >
            {/* SVG for Dotted Lines and the single animated path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* SVG filter for glow effect */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Feature Boxes */}
            <FeatureBox
              id="sentimentAnalysisBox"
              title="Sentiment Analysis"
              icon={TrendingUp}
              theme={theme}
              className="top-[10%] left-1/2 -translate-x-1/2"
            />
            <FeatureBox
              id="numberPrivacyBox"
              title="Data Privacy"
              icon={Shield}
              theme={theme}
              className="top-[45%] left-[10%]"
            />
            <FeatureBox
              id="callBargingBox"
              title="Expert Oversight"
              icon={PhoneCall}
              theme={theme}
              className="top-[45%] right-[10%]"
            />
            <FeatureBox
              id="deepDataLearningBox"
              title="AI-Powered Insights"
              icon={Lightbulb}
              theme={theme}
              className="bottom-[10%] left-1/2 -translate-x-1/2"
            />

            {/* Images - Using placeholder for now */}
            <DiagramImage
              id="image1"
              src="https://media.istockphoto.com/id/1460124878/photo/social-media-connection-and-woman-typing-on-a-phone-for-communication-app-and-chat-web-search.jpg?s=612x612&w=0&k=20&c=fJvxm6AuV1B0RkSKPx9BOuy-JQTevt1Ah0kySJ_GeRY="
              alt="User on phone"
              className="top-[8%] left-[5%] z-10 transform transition-transform duration-300 ease-in-out hover:scale-105"
            />

            <DiagramImage
              id="image2"
              src="https://img.freepik.com/free-photo/back-view-man-wearing-backpack_23-2150170361.jpg"
              alt="Man with backpack"
              className="top-[10%] right-[10%] z-10 transform transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <DiagramImage
              id="image3"
              src="https://imageio.forbes.com/specials-images/imageserve/63d22a0b8c85bfb9504c5504/0x0.jpg?format=jpg&crop=2667,1500,x333,y0,safe&height=900&width=1600&fit=bounds"
              alt="People shaking hands"
              className="bottom-[10%] left-[10%] z-10 transform transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <DiagramImage
              id="image4"
              src="https://bgr.com/wp-content/uploads/2024/01/doctor-ai.jpg?quality=82&strip=all"
              alt="Man looking at screen"
              className="bottom-[10%] right-[10%] z-10 transform transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
