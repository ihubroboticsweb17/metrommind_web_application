// import { FormEvent, useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { LogIn, Eye, EyeOff, Info, User, CircleUserRound, Mail, Phone, GraduationCap,Lock, MapPinHouse, BriefcaseBusiness, CalendarFold } from "lucide-react";
// import { MOCK_USERS } from "@/models/auth";

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
//   setAddress: (remember: string) => void;
//   onSubmit: (e: FormEvent) => void;
//   selectedRole: "patients" | "therapists" | "admins" | null;
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
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCredentials, setShowCredentials] = useState(false);
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//    const [phone, setPhone] = useState("");
//     const [countryCode, setCountryCode] = useState("+91");
//     const [fullPhone, setFullPhone] = useState("");
//  useEffect(() => {
//     const savedPhone = localStorage.getItem("userPhone");
//     const savedCountryCode = localStorage.getItem("userCountryCode");
//     const savedFullPhone = localStorage.getItem("userFullPhone");
//     console.log(savedFullPhone,"savedFullPhone......")
//     if (savedPhone) {
//       setPhone(savedPhone);
//     }

//     if (savedCountryCode) {
//       setCountryCode(savedCountryCode);
//     }
//        if( savedFullPhone){
//       setFullPhone( savedFullPhone)
//     }
//   }, []);
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];

//       if (selectedFile.type === "application/pdf") {
//         setPdfFile(selectedFile);
//       } else {
//         alert("Please upload a valid PDF file.");
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
//       setName(demoCredentials.email);
//       setEmail(demoCredentials.email);
//       setPassword(demoCredentials.password);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <div className="grid gap-4">
//         <div className="grid gap-2">
//           <Label htmlFor="name">Name</Label>
//           <div className="relative">
//           <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required 
//            className="bg-background/50 pr-10 pl-10"/>
//           <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           </div>
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="username">Username</Label>
//           <div className="relative">
       
//           <Input id="username" 
//            className="bg-background/50 pr-10 pl-10" 
//            value={username} onChange={(e) => setUsername(e.target.value)} required />
//               <CircleUserRound  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           </div>
        
//         </div>

//         <div className="flex gap-2">
//           <div className="grid gap-2 flex-1">
//             <Label htmlFor="email">Email</Label>
//             <div className="relative">
//               <Input 
//              className="bg-background/50 pr-10 pl-10"
//              id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
           
//             </div>
          
//           </div>
//           <div className="grid gap-2 flex-1">
//             <Label htmlFor="mobilenumber">Mobile Number</Label>
//             <div className="relative" >
             
//               <Input 
//                 className="bg-background/50 pr-10 pl-10"
//                 id="mobilenumber" value={mobilenumber} onChange={(e) => setMobilenumber(e.target.value)} required />
//              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
//             </div>
           
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <div className="grid gap-2 flex-1">
//             <Label htmlFor="age">Age</Label>
//             <div className="relative" >
//             <CalendarFold className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
//             <Input 
//               className="bg-background/50 pr-10 pl-10"
//               id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
//               </div>
//           </div>
//           <div className="grid gap-2 flex-1">
//             <Label htmlFor="gender">Gender</Label>
//             <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="p-2 border rounded bg-white">
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <div className="grid gap-2 flex-1">
//             <Label htmlFor="education">Education</Label>
//             <div className="relative" >
//             <Input 
//              className="bg-background/50 pr-10 pl-10"
//             id="education" value={education} onChange={(e) => setEducation(e.target.value)} required />
//           <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
//           </div>
//           </div>
//           <div className="grid gap-2 flex-1">
//             <Label htmlFor="occupation">Occupation</Label>
//             <div className="relative" >
//             <BriefcaseBusiness className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"  />
//             <Input 
//              className="bg-background/50 pr-10 pl-10"
//              id="occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
//           </div>
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <div className="grid gap-2 flex-1 relative">
//             <Label htmlFor="password">Password</Label>
//             <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"  />
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//                  className="bg-background/50 pr-10 pl-10"
//             />
             
//             </div>
            
//             <button type="button" className="absolute right-2 top-[38px]" onClick={togglePasswordVisibility}>
//               {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//             </button>
//           </div>

//           <div className="grid gap-2 flex-1 relative">
//             <Label htmlFor="confirm-password">Confirm Password</Label>
//             <Input
//               id="confirm-password"
//               type={showPassword ? "text" : "password"}
//               value={confrimpassword}
//               onChange={(e) => setConfrimPassword(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="address">Address</Label>
//           <div className="relative">
//           <MapPinHouse  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
//           <Input 
//           className="bg-background/50 pr-10 pl-10"
//           id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
//         </div>
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="pdf">Upload Medical Report PDF</Label>
//           <Input id="pdf" type="file" accept="application/pdf" onChange={handleFileChange} />
//           {pdfFile && <p className="text-sm text-gray-500">Selected: {pdfFile.name}</p>}
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
//                 <div className="flex justify-between">
//                   <div>
//                     <span className="font-semibold">Email:</span>{" "}
//                     <code>{demoCredentials.email}</code>
//                   </div>
//                   <div>
//                     <span className="font-semibold">Password:</span>{" "}
//                     <code>{demoCredentials.password}</code>
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
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogIn, Eye, EyeOff, Info, User, CircleUserRound, Mail, Phone, GraduationCap, Lock, MapPinHouse, BriefcaseBusiness, CalendarFold } from "lucide-react";
import { MOCK_USERS } from "@/models/auth";

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
  onSubmit: (e: FormEvent) => void;
  selectedRole: "patients" | "therapists" | "admins" | null;
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
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type === "application/pdf") {
        setPdfFile(selectedFile);
      } else {
        alert("Please upload a valid PDF file.");
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
      setName(demoCredentials.email);
      setEmail(demoCredentials.email);
      setPassword(demoCredentials.password);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <div className="relative">
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="bg-background/50 pr-10 pl-10"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <Input 
              id="username" 
              className="bg-background/50 pr-10 pl-10" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input 
                className="bg-background/50 pr-10 pl-10"
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          <div className="grid gap-2 flex-1">
            <Label htmlFor="mobilenumber">Mobile Number</Label>
            <div className="relative">
              <Input 
                className="bg-background/50 pr-10 pl-10"
                id="mobilenumber" 
                value={mobilenumber} 
                onChange={(e) => setMobilenumber(e.target.value)} 
                required 
              />
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="age">Age</Label>
            <div className="relative">
              <CalendarFold className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
              <Input 
                className="bg-background/50 pr-10 pl-10"
                id="age" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                required 
              />
            </div>
          </div>
          <div className="grid gap-2 flex-1">
            <Label htmlFor="gender">Gender</Label>
            <select 
              id="gender" 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              className="p-2 border rounded bg-white"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="grid gap-2 flex-1">
            <Label htmlFor="education">Education</Label>
            <div className="relative">
              <Input 
                className="bg-background/50 pr-10 pl-10"
                id="education" 
                value={education} 
                onChange={(e) => setEducation(e.target.value)} 
                required 
              />
              <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
            </div>
          </div>
          <div className="grid gap-2 flex-1">
            <Label htmlFor="occupation">Occupation</Label>
            <div className="relative">
              <BriefcaseBusiness className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                className="bg-background/50 pr-10 pl-10"
                id="occupation" 
                value={occupation} 
                onChange={(e) => setOccupation(e.target.value)} 
                required 
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="grid gap-2 flex-1 relative">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50 pr-10 pl-10"
              />
            </div>
            <button 
              type="button" 
              className="absolute right-2 top-[38px]" 
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="grid gap-2 flex-1 relative">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              value={confrimpassword}
              onChange={(e) => setConfrimPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <div className="relative">
            <MapPinHouse className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
            <Input 
              className="bg-background/50 pr-10 pl-10"
              id="address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="pdf">Upload Medical Report PDF</Label>
          <Input 
            id="pdf" 
            type="file" 
            accept="application/pdf" 
            onChange={handleFileChange} 
          />
          {pdfFile && <p className="text-sm text-gray-500">Selected: {pdfFile.name}</p>}
        </div>

        <Button type="submit" className="w-full">
          <LogIn className="h-4 w-4 mr-2" />
          Register
        </Button>

        {selectedRole && (
          <div className="mt-4 pt-2 border-t">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Info className="text-primary w-4 h-4" />
                Demo credentials available
              </div>
              <Button variant="ghost" size="sm" onClick={toggleCredentialsVisibility}>
                {showCredentials ? "Hide" : "Show"}
              </Button>
            </div>

            {showCredentials && demoCredentials && (
              <div className="mt-2 bg-gray-50 p-3 rounded-md border text-sm">
                <div className="flex justify-between">
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    <code>{demoCredentials.email}</code>
                  </div>
                  <div>
                    <span className="font-semibold">Password:</span>{" "}
                    <code>{demoCredentials.password}</code>
                  </div>
                </div>
                <Button size="sm" className="mt-2" onClick={fillDemoCredentials}>
                  Fill Demo Credentials
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;