import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserPlus, Eye, EyeOff, AlertCircle } from "lucide-react";

interface AddDoctorFormProps {
  name: string;
  setName: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  mobilenumber: string;
  setMobilenumber: (value: string) => void;
  countryCode: string;
  setCountryCode: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  occupation: string;
  setOccupation: (value: string) => void;
  education: string;
  setEducation: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

const AddDoctorForm = ({
  name,
  setName,
  username,
  setUsername,
  mobilenumber,
  setMobilenumber,
  countryCode,
  setCountryCode,
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  occupation,
  setOccupation,
  education,
  setEducation,
  onSubmit,
}: AddDoctorFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  // Country codes with their names and validation info
  const countryCodes = [
    { code: '+91', name: 'India', flag: '🇮🇳', placeholder: 'Enter 10-digit number' },
    { code: '+1', name: 'US/Canada', flag: '🇺🇸', placeholder: 'Enter 10-digit number' },
    { code: '+44', name: 'UK', flag: '🇬🇧', placeholder: 'Enter 10-11 digit number' },
    { code: '+61', name: 'Australia', flag: '🇦🇺', placeholder: 'Enter 9-digit number' },
    { code: '+86', name: 'China', flag: '🇨🇳', placeholder: 'Enter 11-digit number' },
    { code: '+81', name: 'Japan', flag: '🇯🇵', placeholder: 'Enter 10-digit number' },
    { code: '+49', name: 'Germany', flag: '🇩🇪', placeholder: 'Enter 10-11 digit number' },
    { code: '+33', name: 'France', flag: '🇫🇷', placeholder: 'Enter 9-digit number' },
  ];

  const getCurrentCountry = () => {
    return countryCodes.find(country => country.code === countryCode) || countryCodes[0];
  };

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile: string, countryCode: string) => {
    // Remove any spaces, dashes, or other formatting
    const cleanMobile = mobile.replace(/[\s\-\(\)]/g, '');
    
    switch (countryCode) {
      case '+91': // India
        return /^[6-9]\d{9}$/.test(cleanMobile);
      case '+1': // US/Canada
        return /^\d{10}$/.test(cleanMobile);
      case '+44': // UK
        return /^[1-9]\d{9,10}$/.test(cleanMobile);
      case '+61': // Australia
        return /^[2-9]\d{8}$/.test(cleanMobile);
      case '+86': // China
        return /^1[3-9]\d{9}$/.test(cleanMobile);
      case '+81': // Japan
        return /^[789]0\d{8}$/.test(cleanMobile);
      case '+49': // Germany
        return /^1[5-7]\d{8,9}$/.test(cleanMobile);
      case '+33': // France
        return /^[67]\d{8}$/.test(cleanMobile);
      default:
        return cleanMobile.length >= 7 && cleanMobile.length <= 15; // General validation
    }
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
  };

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  };

  // Real-time validation
  const validateField = (fieldName: string, value: string) => {
    let error = '';
    
    switch (fieldName) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (!validateName(value)) error = 'Name must be at least 2 characters and contain only letters';
        break;
      case 'username':
        if (!value.trim()) error = 'Username is required';
        else if (!validateUsername(value)) error = 'Username must be 3-20 characters, letters, numbers, or underscore only';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Please enter a valid email address';
        break;
      case 'mobilenumber':
        if (!value.trim()) error = 'Mobile number is required';
        else if (!validateMobile(value, countryCode)) {
          const currentCountry = getCurrentCountry();
          error = `Please enter a valid mobile number for ${currentCountry.name}`;
        }
        break;
      case 'password':
        if (!value.trim()) error = 'Password is required';
        else if (!validatePassword(value)) error = 'Password must be 8+ chars with uppercase, lowercase, and number';
        break;
      case 'role':
        if (!value) error = 'Please select a role';
        break;
      case 'education':
        if (!value.trim()) error = 'Education is required';
        else if (value.trim().length < 2) error = 'Education must be at least 2 characters';
        break;
      case 'occupation':
        if (!value.trim()) error = 'Occupation is required';
        else if (value.trim().length < 2) error = 'Occupation must be at least 2 characters';
        break;
    }
    
    setErrors(prev => ({ ...prev, [fieldName]: error }));
    return error === '';
  };

  const handleBlur = (fieldName: string, value: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, value);
  };

  const handleChange = (fieldName: string, value: string, setter: (value: string) => void) => {
    setter(value);
    if (touched[fieldName]) {
      validateField(fieldName, value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const fields = {
      name, username, email, mobilenumber, password, role, education, occupation
    };
    
    let hasErrors = false;
    Object.keys(fields).forEach(fieldName => {
      const isValid = validateField(fieldName, fields[fieldName as keyof typeof fields]);
      if (!isValid) hasErrors = true;
      setTouched(prev => ({ ...prev, [fieldName]: true }));
    });

    if (!hasErrors) {
      // Include country code in the mobile number when submitting
      console.log('Full mobile number:', countryCode + mobilenumber);
      onSubmit(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputClassName = (fieldName: string) => {
    const baseClass = "h-8 text-sm";
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-500 focus:ring-red-500`;
    }
    return baseClass;
  };

  const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
    if (touched[fieldName] && errors[fieldName]) {
      return (
        <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
          <AlertCircle className="h-3 w-3" />
          <span>{errors[fieldName]}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {/* Name and Username in one row */}
      <div className="grid grid-cols-2 gap-3 noValidate">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => handleChange('name', e.target.value, setName)}
            onBlur={(e) => handleBlur('name', e.target.value)}
            className={getInputClassName('name')}
            placeholder="Enter full name"
          />
          <ErrorMessage fieldName="name" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username" className="text-xs font-medium text-gray-700">
            Username <span className="text-red-500">*</span>
          </Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => handleChange('username', e.target.value, setUsername)}
            onBlur={(e) => handleBlur('username', e.target.value)}
            className={getInputClassName('username')}
            placeholder="Enter username"
          />
          <ErrorMessage fieldName="username" />
        </div>
      </div>

      {/* Email and Mobile in one row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleChange('email', e.target.value, setEmail)}
            onBlur={(e) => handleBlur('email', e.target.value)}
            className={getInputClassName('email')}
            placeholder="Enter email address"
          />
          <ErrorMessage fieldName="email" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="mobilenumber" className="text-xs font-medium text-gray-700">
            Mobile <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-1">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="h-8 px-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-[80px]"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <Input
              id="mobilenumber"
              type="tel"
              value={mobilenumber}
              onChange={(e) => {
                // Allow only numbers, spaces, dashes, and parentheses
                const cleanValue = e.target.value.replace(/[^\d\s\-\(\)]/g, '');
                handleChange('mobilenumber', cleanValue, setMobilenumber);
              }}
              onBlur={(e) => handleBlur('mobilenumber', e.target.value)}
              className={`${getInputClassName('mobilenumber')} flex-1`}
              placeholder={getCurrentCountry().placeholder}
            />
          </div>
          <ErrorMessage fieldName="mobilenumber" />
        </div>
      </div>

      {/* Education and Role */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="education" className="text-xs font-medium text-gray-700">
            Education <span className="text-red-500">*</span>
          </Label>
          <Input
            id="education"
            type="text"
            value={education}
            onChange={(e) => handleChange('education', e.target.value, setEducation)}
            onBlur={(e) => handleBlur('education', e.target.value)}
            className={getInputClassName('education')}
            placeholder="Enter education qualification"
          />
          <ErrorMessage fieldName="education" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="role" className="text-xs font-medium text-gray-700">
            Role <span className="text-red-500">*</span>
          </Label>
          <select
            id="role"
            value={role}
            onChange={(e) => handleChange('role', e.target.value, setRole)}
            onBlur={(e) => handleBlur('role', e.target.value)}
            className={`w-full h-8 px-2 text-sm border rounded-md bg-white focus:outline-none focus:ring-2 ${
              touched.role && errors.role 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-teal-500'
            }`}
          >
            <option value="">Select Role</option>
            <option value="junior_psychologist">Junior Psychologist</option>
            <option value="senior_psychologist">Senior Psychologist</option>
            <option value="psychiatrist">Psychiatrist</option>
          </select>
          <ErrorMessage fieldName="role" />
        </div>
      </div>

      {/* Occupation and Password */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="occupation" className="text-xs font-medium text-gray-700">
            Occupation <span className="text-red-500">*</span>
          </Label>
          <Input
            id="occupation"
            type="text"
            value={occupation}
            onChange={(e) => handleChange('occupation', e.target.value, setOccupation)}
            onBlur={(e) => handleBlur('occupation', e.target.value)}
            className={getInputClassName('occupation')}
            placeholder="Enter occupation"
          />
          <ErrorMessage fieldName="occupation" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password" className="text-xs font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => handleChange('password', e.target.value, setPassword)}
              onBlur={(e) => handleBlur('password', e.target.value)}
              className={`${getInputClassName('password')} pr-8`}
              placeholder="Enter secure password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-3 w-3" />
              ) : (
                <Eye className="h-3 w-3" />
              )}
            </button>
          </div>
          <ErrorMessage fieldName="password" />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        onClick={handleSubmit}
        className="w-full h-9 bg-teal-500 hover:bg-teal-600 text-white font-medium text-sm mt-4 transition-colors"
      >
        <UserPlus className="h-3 w-3 mr-2" />
        Add Doctor
      </Button>
    </div>
  );
};

export default AddDoctorForm;