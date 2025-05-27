// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";
// import ReactFlagsSelect from "react-flags-select";
// const VerificationForm = ({ 
//   phone, 
//   setPhone, 
//   countryCode, 
//   setCountryCode, 
//   onSubmit 
// }) => {
//     const [selected, setSelected] = useState("");
//   const countryCodes = [
//     { value: "+1", label: "United States (+1)" },
//     { value: "+44", label: "United Kingdom (+44)" },
//     { value: "+91", label: "India (+91)" },
//     { value: "+61", label: "Australia (+61)" },
//     { value: "+86", label: "China (+86)" },
//     { value: "+49", label: "Germany (+49)" },
//     { value: "+33", label: "France (+33)" },
//     { value: "+81", label: "Japan (+81)" },
//     { value: "+7", label: "Russia (+7)" },
//     { value: "+55", label: "Brazil (+55)" },
//   ];

//   return (
//     <form onSubmit={onSubmit} className="space-y-4 w-full max-w-xs mx-auto">
//       <div className="flex gap-2">
//         <div className="w-1.5/5">
//           <Select 
//             value={countryCode} 
//             onValueChange={setCountryCode}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={countryCode} />
//             </SelectTrigger>
//             <SelectContent>
//               {countryCodes.map((code) => (
//                 <SelectItem key={code.value} value={code.value}>
//                   {code.value}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
          

//   {/* <ReactFlagsSelect
//     selected={selected}
//     onSelect={(code) => setSelected(code)}
//   /> */}
//         </div>
//         <div className="w-3.5/5">
//           <Input
//             type="tel"
//             placeholder="Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full"
//             required
//           />
//         </div>
//       </div>
//       <Button type="submit" className="w-full">
//         Send OTP
//       </Button>
//     </form>
//   );
// };

// export default VerificationForm;
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

const VerificationForm = ({
  phone,
  setPhone,
  countryCode,
  setCountryCode,
  onSubmit
}) => {
  const [phoneError, setPhoneError] = useState("");

  // Country-specific phone number configurations
  const countryConfigs = {
    "+1": { label: "United States (+1)", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    "+44": { label: "United Kingdom (+44)", minLength: 10, maxLength: 10, pattern: /^\d{10}$/ },
    "+91": { label: "India (+91)", minLength: 10, maxLength: 10, pattern: /^[6-9]\d{9}$/ },
    "+61": { label: "Australia (+61)", minLength: 9, maxLength: 9, pattern: /^\d{9}$/ },
    "+86": { label: "China (+86)", minLength: 11, maxLength: 11, pattern: /^1[3-9]\d{9}$/ },
    "+49": { label: "Germany (+49)", minLength: 10, maxLength: 12, pattern: /^\d{10,12}$/ },
    "+33": { label: "France (+33)", minLength: 9, maxLength: 9, pattern: /^[1-9]\d{8}$/ },
    "+81": { label: "Japan (+81)", minLength: 10, maxLength: 11, pattern: /^[7-9]\d{8,9}$/ },
    "+7": { label: "Russia (+7)", minLength: 10, maxLength: 10, pattern: /^9\d{9}$/ },
    "+55": { label: "Brazil (+55)", minLength: 10, maxLength: 11, pattern: /^[1-9]\d{8,9}$/ },
  };

  const countryCodes = Object.entries(countryConfigs).map(([value, config]) => ({
    value,
    label: config.label
  }));

  // Validate phone number based on country
  const validatePhoneNumber = (phoneNumber, countryCode) => {
    if (!phoneNumber.trim()) {
      return "Phone number is required";
    }

    const config = countryConfigs[countryCode];
    if (!config) {
      return "Invalid country code";
    }

    // Check if it contains only digits
    if (!/^\d+$/.test(phoneNumber)) {
      return "Phone number must contain only digits";
    }

    // Check length
    if (phoneNumber.length < config.minLength) {
      return `Phone number must be at least ${config.minLength} digits`;
    }

    if (phoneNumber.length > config.maxLength) {
      return `Phone number must not exceed ${config.maxLength} digits`;
    }

    // Check country-specific pattern
    if (!config.pattern.test(phoneNumber)) {
      switch (countryCode) {
        case "+91":
          return "Indian mobile numbers must start with 6, 7, 8, or 9";
        case "+86":
          return "Chinese mobile numbers must start with 1";
        case "+33":
          return "French numbers cannot start with 0";
        case "+81":
          return "Japanese mobile numbers must start with 7, 8, or 9";
        case "+7":
          return "Russian mobile numbers must start with 9";
        case "+55":
          return "Brazilian numbers cannot start with 0";
        default:
          return "Invalid phone number format";
      }
    }

    return "";
  };

  // Handle phone number input with restrictions
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Remove all non-digit characters and leading/trailing spaces
    value = value.replace(/[^\d]/g, '');
    
    // Limit to maximum 16 digits (global limit)
    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    setPhone(value);
    
    // Validate and set error
    if (value) {
      const error = validatePhoneNumber(value, countryCode);
      setPhoneError(error);
    } else {
      setPhoneError("");
    }
  };

  // Handle country code change
  const handleCountryCodeChange = (newCountryCode) => {
    setCountryCode(newCountryCode);
    
    // Re-validate phone number with new country code
    if (phone) {
      const error = validatePhoneNumber(phone, newCountryCode);
      setPhoneError(error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const error = validatePhoneNumber(phone, countryCode);
    setPhoneError(error);
    
    if (!error) {
      onSubmit(e);
    }
  };

  // Handle key press to prevent non-digit characters
  const handleKeyPress = (e) => {
    // Allow backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true)) {
      return;
    }
    
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs mx-auto">
      <div className="flex gap-2">
        <div className="w-1/3">
          <Select
            value={countryCode}
            onValueChange={handleCountryCodeChange}
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
        </div>
        
        <div className="w-2/3">
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={handlePhoneChange}
            onKeyDown={handleKeyPress}
            className={`w-full ${phoneError ? 'border-red-500 focus:border-red-500' : ''}`}
            maxLength={16}
            autoComplete="tel"
          />
          {phoneError && (
            <p className="text-red-500 text-xs mt-1 min-h-[16px]">
              {phoneError}
            </p>
          )}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={!!phoneError || !phone.trim()}
      >
        Send OTP
      </Button>
    </form>
  );
};

export default VerificationForm;