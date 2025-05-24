
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LogIn, Eye, EyeOff, Info, UserPlus } from "lucide-react";
import { MOCK_USERS } from "@/models/auth";

interface AddDoctorFormProps {
  name: string;
  setName: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  mobilenumber: string;
  setMobilenumber: (value: string) => void;
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
  const [showCredentials, setShowCredentials] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCredentialsVisibility = () => {
    setShowCredentials(!showCredentials);
  };

  return (
    // <form onSubmit={onSubmit}>
    //   <div className="grid gap-4">
    //   <div className="grid gap-2">
    //       <Label htmlFor="name">Name</Label>
    //       <Input
    //         id="name"
    //         type="name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         className="bg-background/50"
    //         required
    //       />
    //     </div>
    //     <div className="grid gap-2">
    //       <Label htmlFor="username">UserName</Label>
    //       <Input
    //         id="username"
    //         type="username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         className="bg-background/50"
    //         required
    //       />
    //     </div>
    //     <div className="grid gap-2">
    //       <Label htmlFor="email">Email</Label>
    //       <Input
    //         id="email"
    //         type="email"
    //         placeholder="name@example.com"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="bg-background/50"
    //         required
    //       />
    //     </div>
    //     <div className="grid gap-2">
    //       <Label htmlFor="mobilenumber">Mobile Number</Label>
    //       <Input
    //         id="mobilenumber"
    //         type="mobilenumber"
    //         value={mobilenumber}
    //         onChange={(e) => setMobilenumber(e.target.value)}
    //         className="bg-background/50"
    //         required
    //       />
    //     </div>
    //     <div className="grid gap-2">
    //         <Label htmlFor="">
    //           Role
    //         </Label>
    //           <select id="role"value={role}
    //           onChange={(e) => setRole(e.target.value)} className="p-2 border rounded bg-white">
    //           <option value="">Select </option>
    //           <option value="junior_psychologist">Junior Psychologist</option>
    //           <option value="senior_psychologist">Senior Psychologist</option>
    //           <option value="psychiatrist">Psychiatrist</option>
    //           <option value="other">Other</option>
    //         </select>
    //       </div>
    //       <div className="flex items-center space-x-4">
    //       <div className="grid gap-4">
    //         <Label htmlFor="">Education</Label>
    //         <Input
    //           id="education"
    //           type="education"
    //           // placeholder="mobilenumber"
    //           value={education}
    //           onChange={(e) => setEducation(e.target.value)}
    //           className="bg-background/50"
    //           required
    //         />
    //       </div>
    //       <div className="grid gap-2">
    //         <Label htmlFor="">Occupation</Label>
    //         <Input
    //           id="occupation"
    //           type="occupation"
    //           // placeholder="mobilenumber"
    //           value={occupation}
    //           onChange={(e) => setOccupation(e.target.value)}
    //           className="bg-background/50"
    //           required
    //         />
    //       </div>
    //       </div>
    //     <div className="grid gap-2">
    //       <div className="flex items-center justify-between">
    //         <Label htmlFor="password">Password</Label>
    //       </div>
    //       <div className="relative">
    //         <Input
    //           id="password"
    //           type={showPassword ? "text" : "password"}
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="bg-background/50 pr-10"
    //           required
    //         />
    //         <button
    //           type="button"
    //           className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
    //           onClick={togglePasswordVisibility}
    //         >
    //           {showPassword ? (
    //             <EyeOff className="h-5 w-5" />
    //           ) : (
    //             <Eye className="h-5 w-5" />
    //           )}
    //         </button>
    //       </div>
    //     </div>
    
    //     <Button type="submit" className="w-full group relative overflow-hidden">
    //       <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
    //       <span className="relative flex items-center justify-center gap-2">
    //         <LogIn className="h-4 w-4" />
    //         Add doctor
    //       </span>
    //     </Button>
    //   </div>
    // </form>
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Name and Username in one row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs font-medium text-gray-700">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username" className="text-xs font-medium text-gray-700">
            Username
          </Label>
          <Input
            id="username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-8 text-sm"
            required
          />
        </div>
      </div>

      {/* Email and Mobile in one row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-8 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="mobilenumber" className="text-xs font-medium text-gray-700">
            Mobile
          </Label>
          <Input
            id="mobilenumber"
            type="tel"
            value={mobilenumber}
            onChange={(e) => setMobilenumber(e.target.value)}
            className="h-8 text-sm"
            required
          />
        </div>
      </div>

      {/* Role */}
            <div className="grid grid-cols-2 gap-3">
               <div className="space-y-1">
          <Label htmlFor="education" className="text-xs font-medium text-gray-700">
            Education
          </Label>
          <Input
            id="education"
            type="text"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="h-8 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
        <Label htmlFor="role" className="text-xs font-medium text-gray-700">
          Role
        </Label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full h-8 px-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        >
          <option value="">Select Role</option>
          <option value="junior_psychologist">Junior Psychologist</option>
          <option value="senior_psychologist">Senior Psychologist</option>
          <option value="psychiatrist">Psychiatrist</option>
        </select>
      </div>
            </div>
      

      {/* Education and Occupation in one row */}
      <div className="grid grid-cols-2 gap-3 ">
       
        <div className="space-y-1">
          <Label htmlFor="occupation" className="text-xs font-medium text-gray-700">
            Occupation
          </Label>
          <Input
            id="occupation"
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="h-8 text-sm"
            required
          />
        </div>
            <div className="space-y-1">
        <Label htmlFor="password" className="text-xs font-medium text-gray-700">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-8 text-sm pr-8"
            required
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
      </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-9 bg-teal-500 hover:bg-teal-600 text-white font-medium text-sm mt-4 transition-colors"
      >
        <UserPlus className="h-3 w-3 mr-2" />
        Add Doctor
      </Button>
    </form>
  );
};

export default AddDoctorForm;
