
// import { FormEvent, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { LogIn, Eye, EyeOff, Info, User, CircleUserRound, Mail, Phone, GraduationCap, Lock, MapPinHouse, BriefcaseBusiness, CalendarFold } from "lucide-react";
// import { MOCK_USERS, register } from "@/models/auth";
// import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "@/App";
// import { useNavigate } from "react-router-dom";
// interface RegisterFormProps {
//   name: string;
//   setName: (name: string) => void;
//   username: string;
//   setUsername: (username: string) => void;
//   email: string;
//   setEmail: (email: string) => void;
//   mobilenumber: string;
//   setMobilenumber: (mobilenumber: string) => void;
//   age: string;
//   setAge: (age: string) => void;
//   gender: string;
//   setGender: (gender: string) => void;
//   education: string;
//   setEducation: (education: string) => void;
//   occupation: string;
//   setOccupation: (occupation: string) => void;
//   password: string;
//   setPassword: (password: string) => void;
//   confrimpassword: string;
//   setConfrimPassword: (confrimpassword: string) => void;
//   address: string;
//   setAddress: (address: string) => void;
//   onSubmit: (e: FormEvent) => void;
//   selectedRole: "patients" | "therapists" | "admins" | null;
// }

// interface ValidationErrors {
//   name?: string;
//   username?: string;
//   email?: string;
//   mobilenumber?: string;
//   age?: string;
//   gender?: string;
//   education?: string;
//   occupation?: string;
//   password?: string;
//   confrimpassword?: string;
//   address?: string;
//   pdf?: string;
// }

// const RegisterForm = ({
//   name,
//   setName,
//   username,
//   setUsername,
//   email,
//   setEmail,
//   mobilenumber,
//   setMobilenumber,
//   age,
//   setAge,
//   education,
//   setEducation,
//   gender,
//   setGender,
//   occupation,
//   setOccupation,
//   address,
//   setAddress,
//   password,
//   setPassword,
//   confrimpassword,
//   setConfrimPassword,
//   onSubmit,
//   selectedRole,
// }: RegisterFormProps) => {
//     const navigate = useNavigate();
//   const { toast } = useToast();
//   const { theme } = useTheme();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCredentials, setShowCredentials] = useState(false);
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [errors, setErrors] = useState<ValidationErrors>({});
//   const [touched, setTouched] = useState<Record<string, boolean>>({});
//   const [isLoading, setIsLoading] = useState(false);
//     const [loading, setLoading] = useState(false);
//      const [error, setError] = useState("");
//   // Email validation regex
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
//   // Phone validation regex (basic)
//   const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

//   const validateField = (fieldName: string, value: string): string | undefined => {
//     switch (fieldName) {
//       case 'name':
//         if (!value.trim()) return 'Name is required';
//         if (value.trim().length < 2) return 'Name must be at least 2 characters';
//         return undefined;
      
//       case 'username':
//         if (!value.trim()) return 'Username is required';
//         if (value.trim().length < 3) return 'Username must be at least 3 characters';
//         if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
//         return undefined;
      
//       case 'email':
//         if (!value.trim()) return 'Email is required';
//         if (!emailRegex.test(value)) return 'Please enter a valid email address';
//         return undefined;
      
//       case 'mobilenumber':
//         if (!value.trim()) return 'Mobile number is required';
//         if (!phoneRegex.test(value.replace(/\s+/g, ''))) return 'Please enter a valid mobile number';
//         return undefined;
      
//       case 'age':
//         if (!value.trim()) return 'Age is required';
//         const ageNum = parseInt(value);
//         if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) return 'Please enter a valid age (1-120)';
//         return undefined;
      
//       case 'gender':
//         if (!value) return 'Please select a gender';
//         return undefined;
      
//       case 'education':
//         if (!value.trim()) return 'Education is required';
//         return undefined;
      
//       case 'occupation':
//         if (!value.trim()) return 'Occupation is required';
//         return undefined;
      
//       case 'password':
//         if (!value) return 'Password is required';
//         if (value.length < 6) return 'Password must be at least 6 characters';
//         if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
//           return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
//         }
//         return undefined;
      
//       case 'confrimpassword':
//         if (!value) return 'Please confirm your password';
//         if (value !== password) return 'Passwords do not match';
//         return undefined;
      
//       case 'address':
//         if (!value.trim()) return 'Address is required';
//         if (value.trim().length < 10) return 'Please enter a complete address';
//         return undefined;
      
//       default:
//         return undefined;
//     }
//   };

//   const handleFieldChange = (fieldName: string, value: string) => {
//     // Update the field value
//     switch (fieldName) {
//       case 'name': setName(value); break;
//       case 'username': setUsername(value); break;
//       case 'email': setEmail(value); break;
//       case 'mobilenumber': setMobilenumber(value); break;
//       case 'age': setAge(value); break;
//       case 'gender': setGender(value); break;
//       case 'education': setEducation(value); break;
//       case 'occupation': setOccupation(value); break;
//       case 'password': setPassword(value); break;
//       case 'confrimpassword': setConfrimPassword(value); break;
//       case 'address': setAddress(value); break;
//     }
    
//     // Validate the field if it has been touched
//     if (touched[fieldName]) {
//       const error = validateField(fieldName, value);
//       setErrors(prev => ({ ...prev, [fieldName]: error }));
//     }
//   };

//   const handleFieldBlur = (fieldName: string, value: string) => {
//     setTouched(prev => ({ ...prev, [fieldName]: true }));
//     const error = validateField(fieldName, value);
//     setErrors(prev => ({ ...prev, [fieldName]: error }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];

//       if (selectedFile.type === "application/pdf") {
//         setPdfFile(selectedFile);
//         setErrors(prev => ({ ...prev, pdf: undefined }));
//       } else {
//         setErrors(prev => ({ ...prev, pdf: "Please upload a valid PDF file." }));
//         e.target.value = "";
//       }
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleCredentialsVisibility = () => {
//     setShowCredentials(!showCredentials);
//   };

//   const getDemoCredentials = () => {
//     if (!selectedRole) return null;
//     const user = MOCK_USERS[selectedRole][0];
//     return user ? { email: user.email, password: user.password } : null;
//   };

//   const demoCredentials = getDemoCredentials();

//   const fillDemoCredentials = () => {
//     if (demoCredentials) {
//       setName(demoCredentials.email.split('@')[0]); // Use email prefix as name
//       setEmail(demoCredentials.email);
//       setPassword(demoCredentials.password);
//       setConfrimPassword(demoCredentials.password);
      
//       // Clear validation errors for filled fields
//       setErrors(prev => ({
//         ...prev,
//         name: undefined,
//         email: undefined,
//         password: undefined,
//         confrimpassword: undefined
//       }));
//     }
//   };

 
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsLoading(true);
//   setLoading(true);
//   setError("");

//   // Validate all fields first
//   const newErrors: ValidationErrors = {};
//   const fields = {
//     name, 
//     username, 
//     email, 
//     mobilenumber, 
//     age, 
//     gender,
//     education, 
//     occupation, 
//     password, 
//     confrimpassword, 
//     address
//   };

//   // Run validation for each field
//   Object.entries(fields).forEach(([fieldName, value]) => {
//     const error = validateField(fieldName, value);
//     if (error) newErrors[fieldName as keyof ValidationErrors] = error;
//   });

//   // Check if PDF is required (modify this logic as needed)
//   if (!pdfFile) {
//     newErrors.pdf = "Medical report PDF is required";
//   }

//   // Update errors and touched state
//   setErrors(newErrors);
//   setTouched(Object.keys(fields).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

//   // If validation fails, stop here and don't proceed with API call
//   // if (Object.keys(newErrors).length > 0) {
//   //   setIsLoading(false);
//   //   setLoading(false);
    
//   //   // Show validation error toast
//   //   toast({
//   //     variant: "destructive",
//   //     title: "Validation Error",
//   //     description: "Please fix the errors in the form before submitting.",
//   //   });
    
//   //   return; // Exit early if validation fails
//   // }

//   // If validation passes, proceed with registration
//   const formData = {
//     name,
//     username,
//     email,
//     mobile_number: mobilenumber, // This will now have the value from localStorage
//     age,
//     gender,
//     education,
//     occupation,
//     address,
//     password,
//     confirm_password: confrimpassword,
//   };

//   console.log("Sending data:", formData);

//   try {
//     const data = await register(formData);

//     console.log("Registration successful!", data);
//     toast({
//       title: "Success",
//       description: "Registration completed!",
//     });
    
//     // Only navigate to login if registration is successful
//     navigate("/login");
//   } catch (error: any) {
//     console.error("Registration failed:", error);

//     if (error.response && error.response.data) {
//       const errorData = error.response.data;

//       // Loop through all error fields and show them in toasts
//       for (const key in errorData) {
//         if (errorData.hasOwnProperty(key)) {
//           const messages = Array.isArray(errorData[key])
//             ? errorData[key].join(", ")
//             : errorData[key];

//           toast({
//             variant: "destructive",
//             title: `${key.charAt(0).toUpperCase() + key.slice(1)} Error`,
//             description: messages,
//           });
//         }
//       }
//     } else {
//       toast({
//         variant: "destructive",
//         title: "Unexpected Error",
//         description: "Something went wrong. Please try again later.",
//       });
//     }
//   } finally {
//     setLoading(false);
//     setIsLoading(false);
//   }
// };
//   const ErrorMessage = ({ error }: { error?: string }) => 
//     error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null;

//   return (
//     <form onSubmit={handleSubmit} noValidate>
//       <div className="grid gap-4">
//           <div className="flex gap-2">
//             <div className="grid gap-2 flex-1">
//           <Label htmlFor="name">Name <span className="text-red-800">*</span></Label>
//           <div className="relative">
//             <Input 
//               id="name" 
//               value={name} 
//               onChange={(e) => handleFieldChange('name', e.target.value)}
//               onBlur={(e) => handleFieldBlur('name', e.target.value)}
//               required 
//               className={`bg-background/50 pr-10 pl-10 ${errors.name ? 'border-red-500' : ''}`}
//             />
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           </div>
//           <ErrorMessage error={errors.name} />
//         </div>
// <div className="grid gap-2 flex-1">
//           <Label htmlFor="username">Username <span className="text-red-800">*</span></Label>
//           <div className="relative">
//             <Input 
//               id="username" 
//               className={`bg-background/50 pr-10 pl-10 ${errors.username ? 'border-red-500' : ''}`}
//               value={username} 
//               onChange={(e) => handleFieldChange('username', e.target.value)}
//               onBlur={(e) => handleFieldBlur('username', e.target.value)}
//               required 
//             />
//             <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           </div>
//           <ErrorMessage error={errors.username} />
//         </div>
//           </div>
        
//          <div className="grid gap-2 ">
//             <Label htmlFor="email">Email <span className="text-red-800">*</span></Label>
//             <div className="relative">
//               <Input 
//                 className={`bg-background/50 pr-10 pl-10 ${errors.email ? 'border-red-500' : ''}`}
//                 id="email" 
//                 type="email" 
//                 placeholder="example@gmail.com"
//                 value={email} 
//                 onChange={(e) => handleFieldChange('email', e.target.value)}
//                 onBlur={(e) => handleFieldBlur('email', e.target.value)}
//                 required 
//                 style={{ minWidth: '200px' }} // Ensure minimum width for long emails
//               />
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//             </div>
//             <ErrorMessage error={errors.email} />
//           </div>

//         <div className=" gap-2">
//           {/* <div className="grid gap-2 flex-1">
//             <Label htmlFor="email">Email <span className="text-red-800">*</span></Label>
//             <div className="relative">
//               <Input 
//                 className={`bg-background/50 pr-10 pl-10 ${errors.email ? 'border-red-500' : ''}`}
//                 id="email" 
//                 type="email" 
//                 value={email} 
//                 onChange={(e) => handleFieldChange('email', e.target.value)}
//                 onBlur={(e) => handleFieldBlur('email', e.target.value)}
//                 required 
//                 style={{ minWidth: '200px' }} // Ensure minimum width for long emails
//               />
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//             </div>
//             <ErrorMessage error={errors.email} />
//           </div> */}
//           <div className="grid gap-2">
//             <Label htmlFor="mobilenumber">Phone number <span className="text-red-800">*</span></Label>
//             <div className="relative">
//               <Input 
//                 className={`bg-background/50 pr-10 pl-10 ${errors.mobilenumber ? 'border-red-500' : ''}`}
//                 id="mobilenumber" 
//                 disabled
//                 value={mobilenumber} 
//                 onChange={(e) => handleFieldChange('mobilenumber', e.target.value)}
//                 onBlur={(e) => handleFieldBlur('mobilenumber', e.target.value)}
//                 required 
//               />
//               <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
//             </div>
//             <ErrorMessage error={errors.mobilenumber} />
//           </div>
//         </div>

//         <div className="flex gap-2 ">
          
 
//            <div className="grid gap-2 flex-1">
//             <Label htmlFor="age">Age <span className="text-red-800">*</span></Label>
//             <div className="relative">
//               <CalendarFold className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
//               <Input 
//                 className={`bg-background/50 pr-10 pl-10 `}
//                 id="age" 
//                 type="number"
//                 value={age} 
//                 onChange={(e) => handleFieldChange('age', e.target.value)}
//                 onBlur={(e) => handleFieldBlur('age', e.target.value)}
//                 required 
//               />
//             </div>
//             <ErrorMessage error={errors.age} />
//           </div>
//           <div className="grid gap-2 flex-1">
//             <Label htmlFor="gender">Gender <span className="text-red-800">*</span></Label>
//             <select 
//               id="gender" 
//               value={gender} 
//               onChange={(e) => handleFieldChange('gender', e.target.value)}
//               onBlur={(e) => handleFieldBlur('gender', e.target.value)}
//               className={`p-2 border rounded bg-white `}
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             <ErrorMessage error={errors.gender} />
//           </div>
  
//         </div>

//         <div className="flex gap-2">
      
//           <div className="grid gap-2 flex-1">
//             <Label htmlFor="education">Education</Label>
//             <div className="relative">
//               <Input 
//                 className={`bg-background/50 pr-10 pl-10 `}
//                 id="education" 
//                 value={education} 
//                 onChange={(e) => handleFieldChange('education', e.target.value)}
//                 onBlur={(e) => handleFieldBlur('education', e.target.value)}
//                 required 
//               />
//               <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
//             </div>
//             {/* <ErrorMessage error={errors.education} /> */}
//           </div>
//           <div className="grid gap-2 flex-1">
//             <Label htmlFor="occupation">Occupation</Label>
//             <div className="relative">
//               <BriefcaseBusiness className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <Input 
//                 className={`bg-background/50 pr-10 pl-10 `}
//                 id="occupation" 
//                 value={occupation} 
//                 onChange={(e) => handleFieldChange('occupation', e.target.value)}
//                 onBlur={(e) => handleFieldBlur('occupation', e.target.value)}
//                 required 
//               />
//             </div>
//             {/* <ErrorMessage error={errors.occupation} /> */}
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <div className="grid gap-2 flex-1 relative">
//             <Label htmlFor="password">Password <span className="text-red-800">*</span></Label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => handleFieldChange('password', e.target.value)}
//                 onBlur={(e) => handleFieldBlur('password', e.target.value)}
//                 required
//                 className={`bg-background/50 pr-10 pl-10 ${errors.password ? 'border-red-500' : ''}`}
//               />
//               {/* <button 
//                 type="button" 
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2" 
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//               </button> */}
//             </div>
//             <ErrorMessage error={errors.password} />
//           </div>

//           <div className="grid gap-2 flex-1 relative">
//             <Label htmlFor="confirm-password">Confirm Password <span className="text-red-800">*</span></Label>
//             <div className="relative">
//               <Input
//                 id="confirm-password"
//                 type={showPassword ? "text" : "password"}
//                 value={confrimpassword}
//                 onChange={(e) => handleFieldChange('confrimpassword', e.target.value)}
//                 onBlur={(e) => handleFieldBlur('confrimpassword', e.target.value)}
//                 required
//                 className={`${errors.confrimpassword ? 'border-red-500' : ''}`}
//               />
//             </div>
//             <ErrorMessage error={errors.confrimpassword} />
//           </div>
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="address">Address</Label>
//           <div className="relative">
//             <MapPinHouse className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
//             <Input 
//               className={`bg-background/50 pr-10 pl-10 `}
//               id="address" 
//               value={address} 
//               onChange={(e) => handleFieldChange('address', e.target.value)}
//               onBlur={(e) => handleFieldBlur('address', e.target.value)}
//               required 
//             />
//           </div>
//           {/* <ErrorMessage error={errors.address} /> */}
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="pdf">Upload Medical Report PDF</Label>
//           <Input 
//             id="pdf" 
//             type="file" 
//             accept="application/pdf" 
//             onChange={handleFileChange}
//             className={errors.pdf ? 'border-teal-500' : ''}
//           />
//           {pdfFile && <p className="text-sm text-gray-500">Selected: {pdfFile.name}</p>}
//           {/* <ErrorMessage error={errors.pdf} /> */}
//         </div>

//         <Button type="submit" className="w-full">
//           <LogIn className="h-4 w-4 mr-2" />
//           Register
//         </Button>

//         {selectedRole && (
//           <div className="mt-4 pt-2 border-t">
//             <div className="flex items-center justify-between text-sm text-gray-600">
//               <div className="flex items-center gap-2">
//                 <Info className="text-primary w-4 h-4" />
//                 Demo credentials available
//               </div>
//               <Button variant="ghost" size="sm" onClick={toggleCredentialsVisibility}>
//                 {showCredentials ? "Hide" : "Show"}
//               </Button>
//             </div>

//             {showCredentials && demoCredentials && (
//               <div className="mt-2 bg-gray-50 p-3 rounded-md border text-sm">
//                 <div className="flex flex-col gap-2">
//                   <div className="break-all">
//                     <span className="font-semibold">Email:</span>{" "}
//                     <code className="bg-white px-1 py-0.5 rounded text-xs">{demoCredentials.email}</code>
//                   </div>
//                   <div>
//                     <span className="font-semibold">Password:</span>{" "}
//                     <code className="bg-white px-1 py-0.5 rounded text-xs">{demoCredentials.password}</code>
//                   </div>
//                 </div>
//                 <Button size="sm" className="mt-2" onClick={fillDemoCredentials}>
//                   Fill Demo Credentials
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </form>
//   );
// };

// export default RegisterForm;
import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  LogIn,
  Eye,
  EyeOff,
  Info,
  User,
  CircleUserRound,
  Mail,
  Phone,
  GraduationCap,
  Lock,
  MapPinIcon as MapPinHouse,
  BriefcaseBusiness,
  CalendarFold,
  FileText,
  FileCheck,
  Loader2,
  ArrowLeft,
  ArrowRight,
  UserCog,
} from "lucide-react";
import { MOCK_USERS, register } from "@/models/auth";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/App";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AxiosError } from "axios";

interface RegisterFormProps {
  name: string;
  setName: (name: string) => void;
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  mobilenumber: string;
  setMobilenumber: (mobilenumber: string) => void;
  age: string;
  setAge: (age: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  education: string;
  setEducation: (education: string) => void;
  occupation: string;
  setOccupation: (occupation: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confrimpassword: string;
  setConfrimPassword: (confrimpassword: string) => void;
  address: string;
  setAddress: (address: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  selectedRole: "patients" | "therapists" | "admins" | null;
}

interface ValidationErrors {
  name?: string;
  username?: string;
  email?: string;
  mobilenumber?: string;
  age?: string;
  gender?: string;
  education?: string;
  occupation?: string;
  password?: string;
  confrimpassword?: string;
  address?: string;
  pdf?: string;
}

interface ErrorResponse {
  [key: string]: string | string[];
}

const RegisterForm = ({
  name,
  setName,
  username,
  setUsername,
  email,
  setEmail,
  mobilenumber,
  setMobilenumber,
  age,
  setAge,
  education,
  setEducation,
  gender,
  setGender,
  occupation,
  setOccupation,
  address,
  setAddress,
  password,
  setPassword,
  confrimpassword,
  setConfrimPassword,
  onSubmit,
  selectedRole,
}: RegisterFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("account");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Phone validation regex (basic)
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;

  const validateField = (
    fieldName: string,
    value: string
  ): string | undefined => {
    switch (fieldName) {
      case "name": {
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return undefined;
      }
      case "username": {
        if (!value.trim()) return "Username is required";
        if (value.trim().length < 3)
          return "Username must be at least 3 characters";
        return undefined;
      }
      case "email": {
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        return undefined;
      }
      case "mobilenumber": {
        if (!value.trim()) return "Mobile number is required";
        if (!phoneRegex.test(value.replace(/\s+/g, "")))
          return "Please enter a valid mobile number";
        return undefined;
      }
      case "age": {
        if (!value.trim()) return "Age is required";
        const ageNum = Number.parseInt(value);
        if (isNaN(ageNum) || ageNum < 1 || ageNum > 120)
          return "Please enter a valid age (1-120)";
        return undefined;
      }
      case "gender": {
        if (!value) return "Please select a gender";
        return undefined;
      }
      case "password": {
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return "Password must contain uppercase, lowercase, and number";
        }
        return undefined;
      }
      case "confrimpassword": {
        if (!value) return "Please confirm your password";
        if (value !== password) return "Passwords do not match";
        return undefined;
      }
      case "address": {
        if (!value.trim()) return "Address is required";
        if (value.trim().length < 10) return "Please enter a complete address";
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    // Update the field value
    switch (fieldName) {
      case "name":
        setName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "mobilenumber":
        setMobilenumber(value);
        break;
      case "age":
        setAge(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "education":
        setEducation(value);
        break;
      case "occupation":
        setOccupation(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confrimpassword":
        setConfrimPassword(value);
        break;
      case "address":
        setAddress(value);
        break;
    }

    // Validate the field if it has been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleFieldBlur = (fieldName: string, value: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const error = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type === "application/pdf") {
        setPdfFile(selectedFile);
        setErrors((prev) => ({ ...prev, pdf: undefined }));
      } else {
        setErrors((prev) => ({
          ...prev,
          pdf: "Please upload a valid PDF file",
        }));
        e.target.value = "";
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCredentialsVisibility = () => {
    setShowCredentials(!showCredentials);
  };

  const getDemoCredentials = () => {
    if (!selectedRole) return null;
    const user = MOCK_USERS[selectedRole][0];
    return user ? { email: user.email, password: user.password } : null;
  };

  const demoCredentials = getDemoCredentials();

  const fillDemoCredentials = () => {
    if (demoCredentials) {
      setName(demoCredentials.email.split("@")[0]); // Use email prefix as name
      setEmail(demoCredentials.email);
      setPassword(demoCredentials.password);
      setConfrimPassword(demoCredentials.password);

      // Clear validation errors for filled fields
      setErrors((prev) => ({
        ...prev,
        name: undefined,
        email: undefined,
        password: undefined,
        confrimpassword: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields again for final submission
    const newErrors: ValidationErrors = {};
    const fields = {
      name,
      username,
      email,
      mobilenumber,
      age,
      gender,
      education,
      occupation,
      password,
      confrimpassword,
      address,
    };

    Object.entries(fields).forEach(([fieldName, value]) => {
      const error = validateField(fieldName, value);
      if (error) newErrors[fieldName as keyof ValidationErrors] = error;
    });

    if (selectedRole === "patients" && !pdfFile) {
      newErrors.pdf = "Medical report PDF is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsLoading(false);

      // Find which tab has errors and switch to it
      if (
        newErrors.name ||
        newErrors.username ||
        newErrors.email ||
        newErrors.mobilenumber ||
        newErrors.password ||
        newErrors.confrimpassword
      ) {
        setActiveTab("account");
      } else if (newErrors.age || newErrors.gender || newErrors.address) {
        setActiveTab("personal");
      } else {
        setActiveTab("additional");
      }

      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please correct the errors before submitting.",
      });
      return;
    }

    const formData = {
      name,
      username,
      email,
      mobile_number: mobilenumber,
      age,
      gender,
      education,
      occupation,
      address,
      password,
      confirm_password: confrimpassword,
    };

    try {
      const data = await register(formData);
      toast({
        title: "Success",
        description: "Registration completed!",
      });
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data as ErrorResponse;
        Object.entries(errorData).forEach(([key, messages]) => {
          const formattedMessages = Array.isArray(messages)
            ? messages.join(", ")
            : messages;
          toast({
            variant: "destructive",
            title: `${key.charAt(0).toUpperCase() + key.slice(1)} Error`,
            description: formattedMessages,
          });
        });
      } else {
        toast({
          variant: "destructive",
          title: "Unexpected Error",
          description: "Something went wrong. Please try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fixed-height error message component to prevent layout shifts
  const ErrorMessage = ({ error }: { error?: string }) => (
    <div className="min-h-[20px] text-left mt-1">
      {error && (
        <p className="text-destructive text-sm flex items-center gap-1">
          <Info className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            // Reset errors when switching tabs
            setErrors({});
          }}
          className="w-full"
        >
          <TabsList className="grid w-1/2 grid-cols-2 mb-8 mx-auto">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-primary-foreground"
              disabled={isLoading}
            >
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-primary-foreground"
              disabled={isLoading}
            >
              <UserCog className="w-4 h-4 mr-2" />
              Personal
            </TabsTrigger>
          </TabsList>

          {/* Account Information Tab */}
          <TabsContent value="account" className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      onBlur={(e) => handleFieldBlur("name", e.target.value)}
                      className={`pl-9 h-10 ${
                        errors.name ? "border-destructive" : ""
                      }`}
                    />
                    <ErrorMessage error={errors.name} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">
                    Username <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    {" "}
                    {/* Removed flex items-center */}
                    <CircleUserRound className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                    <Input
                      id="username"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) =>
                        handleFieldChange("username", e.target.value)
                      }
                      onBlur={(e) =>
                        handleFieldBlur("username", e.target.value)
                      }
                      className={`pl-9 h-10 ${
                        errors.username ? "border-destructive" : ""
                      }`}
                    />
                    <ErrorMessage error={errors.username} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  {" "}
                  {/* Added flex items-center here */}
                  <Mail className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />{" "}
                  {/* Removed top-1/2 and -translate-y-1/2 */}
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    onBlur={(e) => handleFieldBlur("email", e.target.value)}
                    className={`pl-9 h-10 ${
                      errors.email ? "border-destructive" : ""
                    }`}
                  />
                  <ErrorMessage error={errors.email} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobilenumber">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  {" "}
                  {/* Added flex items-center here */}
                  <Phone className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />{" "}
                  {/* Removed top-1/2 and -translate-y-1/2 */}
                  <Input
                    id="mobilenumber"
                    placeholder="+91 1234567890"
                    value={mobilenumber}
                     disabled
                    onChange={(e) =>
                      handleFieldChange("mobilenumber", e.target.value)
                    }
                    onBlur={(e) =>
                      handleFieldBlur("mobilenumber", e.target.value)
                    }
                    className={`pl-9 h-10 ${
                      errors.mobilenumber ? "border-destructive" : ""
                    }`}
                  />
                  <ErrorMessage error={errors.mobilenumber} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    {" "}
                    {/* Added flex items-center here */}
                    <Lock className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />{" "}
                    {/* Removed top-1/2 and -translate-y-1/2 */}
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        handleFieldChange("password", e.target.value)
                      }
                      onBlur={(e) =>
                        handleFieldBlur("password", e.target.value)
                      }
                      className={`pl-9 h-10 ${
                        errors.password ? "border-destructive" : ""
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-10 px-3 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <ErrorMessage error={errors.password} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    {" "}
                    {/* Added flex items-center here */}
                    <Lock className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />{" "}
                    {/* Removed top-1/2 and -translate-y-1/2 */}
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confrimpassword}
                      onChange={(e) =>
                        handleFieldChange("confrimpassword", e.target.value)
                      }
                      onBlur={(e) =>
                        handleFieldBlur("confrimpassword", e.target.value)
                      }
                      className={`pl-9 h-10 ${
                        errors.confrimpassword ? "border-destructive" : ""
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-10 px-3 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <ErrorMessage error={errors.confrimpassword} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={() => setActiveTab("personal")}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Personal Details Tab */}
          <TabsContent value="personal" className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">
                    Age <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <CalendarFold className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age"
                      value={age}
                      onChange={(e) => handleFieldChange("age", e.target.value)}
                      onBlur={(e) => handleFieldBlur("age", e.target.value)}
                      className={`pl-9 h-10 ${errors.age ? "border-destructive" : ""}`}
                    />
                    <ErrorMessage error={errors.age} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={gender}
                    onValueChange={(value) => {
                      handleFieldChange("gender", value);
                      handleFieldBlur("gender", value);
                    }}
                  >
                    <SelectTrigger
                      className={`h-10 ${errors.gender ? "border-destructive" : ""}`}
                    >
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage error={errors.gender} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <div className="relative">
                    {" "}
                    {/* Added flex items-center here */}
                    <GraduationCap className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />{" "}
                    {/* Removed top-1/2 and -translate-y-1/2 */}
                    <Input
                      id="education"
                      placeholder="Your highest education"
                      value={education}
                      onChange={(e) => handleFieldChange("education", e.target.value)}
                      className="pl-9 h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <div className="relative">
                    {" "}
                    {/* Added flex items-center here */}
                    <BriefcaseBusiness className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />{" "}
                    {/* Removed top-1/2 and -translate-y-1/2 */}
                    <Input
                      id="occupation"
                      placeholder="Your current occupation"
                      value={occupation}
                      onChange={(e) => handleFieldChange("occupation", e.target.value)}
                      className="pl-9 h-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPinHouse className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                  <Textarea
                    id="address"
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => handleFieldChange("address", e.target.value)}
                    onBlur={(e) => handleFieldBlur("address", e.target.value)}
                    className={`pl-9 min-h-[80px] ${errors.address ? "border-destructive" : ""}`}
                  />
                  <ErrorMessage error={errors.address} />
                </div>
              </div>

              {selectedRole === "patients" && (
                <div className="space-y-2">
                  <Label htmlFor="pdf">
                    Medical Report PDF <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    {" "}
                    {/* Added flex items-center here */}
                    <FileText className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                    {/* Removed top-1/2 and -translate-y-1/2 */}
                    <Input
                      id="pdf"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className={`pl-9 h-10 ${errors.pdf ? "border-destructive" : ""}`}
                    />
                    {pdfFile && (
                      <p className="text-sm text-muted-foreground mt-1 flex items-center">
                        <FileCheck className="h-4 w-4 mr-1" />
                        Selected: {pdfFile.name}
                      </p>
                    )}
                    <ErrorMessage error={errors.pdf} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("account")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Register
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>

      {selectedRole && (
        <div className="mt-8 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Info className="text-primary w-4 h-4" />
              Demo credentials available
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCredentialsVisibility}
            >
              {showCredentials ? "Hide" : "Show"}
            </Button>
          </div>

          {showCredentials && demoCredentials && (
            <div className="mt-4 bg-muted/50 p-4 rounded-lg border">
              <div className="space-y-2">
                <div className="break-all">
                  <span className="font-medium">Email:</span>{" "}
                  <code className="bg-background px-1.5 py-0.5 rounded text-xs">
                    {demoCredentials.email}
                  </code>
                </div>
                <div>
                  <span className="font-medium">Password:</span>{" "}
                  <code className="bg-background px-1.5 py-0.5 rounded text-xs">
                    {demoCredentials.password}
                  </code>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={fillDemoCredentials}
              >
                Fill Demo Credentials
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RegisterForm;