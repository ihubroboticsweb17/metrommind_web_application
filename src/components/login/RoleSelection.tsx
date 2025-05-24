
import { User, UserCog, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

type Role = "patients" | "therapists" | "admins";

interface RoleSelectionProps {
  selectedRole: Role | null;
  onRoleSelect: (role: Role) => void;
}

const RoleSelection = ({ selectedRole, onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button
        variant={selectedRole === "patients" ? "default" : "outline"}
        className={`flex flex-col items-center justify-center py-6 transition-all ${
          selectedRole === "patients" 
            ? "shadow-md" 
            : "hover:bg-accent/10"
        }`}
        onClick={() => onRoleSelect("patients")}
      >
        <User className={`h-6 w-6 mb-2 ${selectedRole === "patients" ? "text-primary-foreground" : "text-primary"}`} />
        <span className="text-xs font-medium">Patient</span>
      </Button>
      <Button
        variant={selectedRole === "therapists" ? "default" : "outline"}
        className={`flex flex-col items-center justify-center py-6 transition-all ${
          selectedRole === "therapists" 
            ? "shadow-md" 
            : "hover:bg-accent/10"
        }`}
        onClick={() => onRoleSelect("therapists")}
      >
        <Brain className={`h-6 w-6 mb-2 ${selectedRole === "therapists" ? "text-primary-foreground" : "text-primary"}`} />
        <span className="text-xs font-medium">Therapist</span>
      </Button>
      <Button
        variant={selectedRole === "admins" ? "default" : "outline"}
        className={`flex flex-col items-center justify-center py-6 transition-all ${
          selectedRole === "admins" 
            ? "shadow-md" 
            : "hover:bg-accent/10"
        }`}
        onClick={() => onRoleSelect("admins")}
      >
        <UserCog className={`h-6 w-6 mb-2 ${selectedRole === "admins" ? "text-primary-foreground" : "text-primary"}`} />
        <span className="text-xs font-medium">Admin</span>
      </Button>
    </div>
  );
};

export default RoleSelection;
