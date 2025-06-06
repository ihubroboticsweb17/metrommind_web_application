import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LogIn, Eye, EyeOff, Info } from "lucide-react";
import { MOCK_USERS } from "@/models/auth";

interface AddMedicineFrequencyFormProps {
    name: string;
    setName: (value: string) => void;
    onSubmit: (e: FormEvent) => void;
}

const AddMedicineFrequencyForm = ({
  name,
  setName,
  onSubmit,
  
}: AddMedicineFrequencyFormProps) => {

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
      <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background/50"
            required
          />
        </div>
          <Button type="submit" className="w-full group relative overflow-hidden">
          <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
          <span className="relative flex items-center justify-center gap-2">
              Add Frequency
          </span>
        </Button>
      </div>
    </form>
  );
};

export default AddMedicineFrequencyForm;
