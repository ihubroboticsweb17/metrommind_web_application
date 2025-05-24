import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import ReactFlagsSelect from "react-flags-select";
const VerificationForm = ({ 
  phone, 
  setPhone, 
  countryCode, 
  setCountryCode, 
  onSubmit 
}) => {
    const [selected, setSelected] = useState("");
  const countryCodes = [
    { value: "+1", label: "United States (+1)" },
    { value: "+44", label: "United Kingdom (+44)" },
    { value: "+91", label: "India (+91)" },
    { value: "+61", label: "Australia (+61)" },
    { value: "+86", label: "China (+86)" },
    { value: "+49", label: "Germany (+49)" },
    { value: "+33", label: "France (+33)" },
    { value: "+81", label: "Japan (+81)" },
    { value: "+7", label: "Russia (+7)" },
    { value: "+55", label: "Brazil (+55)" },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full max-w-xs mx-auto">
      <div className="flex gap-2">
        <div className="w-1.5/5">
          <Select 
            value={countryCode} 
            onValueChange={setCountryCode}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={countryCode} />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((code) => (
                <SelectItem key={code.value} value={code.value}>
                  {code.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          

  {/* <ReactFlagsSelect
    selected={selected}
    onSelect={(code) => setSelected(code)}
  /> */}
        </div>
        <div className="w-3.5/5">
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Send OTP
      </Button>
    </form>
  );
};

export default VerificationForm;