
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

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
  const [error, setError] = useState("");

  const validateFrequency = (value: string) => {
    const frequencyPattern = /^\d+-\d+-\d+$/;
    return frequencyPattern.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^\d-]/g, '');
    const cleanValue = filteredValue.replace(/-+/g, '-');

    let finalValue = cleanValue;
    if (finalValue.startsWith('-')) {
      finalValue = finalValue.substring(1);
    }

    setName(finalValue);

    if (error && finalValue.length === 0) {
      setError("");
    }
  };

  const handleInputBlur = () => {
    if (name && !validateFrequency(name)) {
      setError("Please enter frequency in format: number-number-number (e.g., 1-1-1)");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Frequency is required");
      return;
    }

    if (!validateFrequency(name)) {
      setError("Please enter frequency in format: number-number-number (e.g., 1-1-1)");
      return;
    }

    const parts = name.split('-').map(Number);
    if (parts.some(part => part === 0)) {
      setError("Frequency values cannot be 0");
      return;
    }

    setError("");
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">
            Medicine Frequency
            <span className="text-sm text-muted-foreground ml-2">
              (Format: Morning-Afternoon-Night, e.g., 1-1-1)
            </span>
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`bg-background/50 ${error ? 'border-red-500 focus:border-red-500' : ''}`}
            placeholder="1-1-1"
            maxLength={11}
            required
          />
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            Enter how many times to take the medicine: Morning-Afternoon-Night
            <br />
            Examples: 1-0-1 (morning and night), 1-1-1 (three times daily)
          </div>
        </div>

        <Button 
          type="submit"
          className="w-full group relative overflow-hidden"
          disabled={!!error || !name.trim()}
        >
          <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-teal/80 to-primary group-hover:w-full"></span>
          <span className="relative flex items-center justify-center gap-2">
            Add Frequency
          </span>
        </Button>
      </div>
    </form>
  );
};

export default AddMedicineFrequencyForm;
