import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
  secondButtonText?: string;      
  onSecondButtonClick?: () => void;
  therdButtonText?: string;      
  onTherdButtonClick?: () => void;
}

const DashboardHeader = ({ 
  title, 
  buttonText,
  onButtonClick,
  secondButtonText,
  onSecondButtonClick,
  therdButtonText,
  onTherdButtonClick,
}: DashboardHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`${isMobile ? 'flex flex-col gap-3' : 'flex items-center justify-between'} mb-8 bg-white p-4 rounded-lg shadow-sm`}>
      <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-800`}>{title}</h1>
      
      <div className={`${isMobile ? 'flex flex-col gap-2' : 'flex items-center gap-4'}`}>
        {buttonText && (
          <Button 
            className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm w-fit"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
        {secondButtonText && (
          <Button 
            className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm w-fit"
            onClick={onSecondButtonClick}
          >
            {secondButtonText}
          </Button>
        )}
          {therdButtonText && (
          <Button 
            className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm w-fit"
            onClick={onTherdButtonClick}
          >
            {therdButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
