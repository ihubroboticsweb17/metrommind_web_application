// import { FormEvent, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { LogIn, Eye, EyeOff, Info, Mail ,Lock} from "lucide-react";
// import { MOCK_USERS } from "@/models/auth";

// interface LoginFormProps {
//   email: string;
//   setEmail: (email: string) => void;
//   password: string;
//   setPassword: (password: string) => void;
//   rememberMe: boolean;
//   setRememberMe: (remember: boolean) => void;
//   onSubmit: (e: FormEvent) => void;
//   selectedRole: "patients" | "therapists" | "admins" | null;
// }

// const LoginForm = ({
//   email,
//   setEmail,
//   password,
//   setPassword,
//   rememberMe,
//   setRememberMe,
//   onSubmit,
//   selectedRole,
// }: LoginFormProps) => {
 
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCredentials, setShowCredentials] = useState(false);
 
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

//   const togglePasswordVisibility = () => {
//     // setShowPassword(!showPassword);
//     setShowPassword((prev) => !prev);
//   };

//   const toggleCredentialsVisibility = () => {
//     setShowCredentials(!showCredentials);
//   };

//   // Get demo credentials based on selected role
//   const getDemoCredentials = () => {
//     if (!selectedRole) return null;

//     const user = MOCK_USERS[selectedRole][0];
//     return user ? { email: user.email, password: user.password } : null;
//   };

//   const demoCredentials = getDemoCredentials();

//   const fillDemoCredentials = () => {
//     if (demoCredentials) {
//       setEmail(demoCredentials.email);
//       setPassword(demoCredentials.password);
//     }
//   };
// const validate = () => {
//   const newErrors: { email?: string; password?: string } = {};
//   if (!email.trim()) {
//     newErrors.email = "Email is required.";
//   } else if (!/\S+@\S+\.\S+/.test(email)) {
//     newErrors.email = "Enter a valid email address.";
//   }

//   if (!password.trim()) {
//     newErrors.password = "Password is required.";
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };
// const handleSubmit = (e: FormEvent) => {
//   e.preventDefault();
//   if (validate()) {
//     onSubmit(e);
//   }
// };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="grid gap-8">
//         <div className="grid gap-2">
//           <Label htmlFor="email" className="text-gray-400">Email</Label>
//           <div className="relative">
//             <Input
//               id="email"
//               type="email"
//               placeholder="name@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-background/50 pl-10" // <-- Important: padding-left for icon space
//               required
//             />
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           </div>
//           {/* {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} */}
        
//         </div>
//          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

//         <div className="grid gap-2">
//           <div className="flex items-center justify-between">
//             <Label htmlFor="password"className="text-gray-400">Password</Label>
//             {/* <a
//               href="#"
//               className="text-sm text-primary underline-offset-4 hover:underline"
//             >
//               Forgot password?
//             </a> */}
//           </div>
          
//           <div className="relative">
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//                placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="bg-background/50 pr-10 pl-10"
//               required
//             />
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"  />
//             <button
//               type="button"
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? (
//            <Eye className="h-5 w-5" />
//         ) : (
//          <EyeOff className="h-5 w-5" />
//         )}
//             </button>
//           </div>
//         {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

//         </div>
          
//         {/* <div className="flex items-center space-x-2">
//           <Switch
//             id="remember-me"
//             checked={rememberMe}
//             onCheckedChange={setRememberMe}
//           />
//           <Label htmlFor="remember-me" className="text-sm">
//             Remember email
//           </Label>
//         </div> */}
//         <Button type="submit" className="w-full group relative overflow-hidden">
//           <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
//           <span className="relative flex items-center justify-center gap-2">
//             <LogIn className="h-4 w-4" />
//             Sign In
//           </span>
//         </Button>

//         {selectedRole && (
//           <div className="mt-4 pt-2 border-t border-gray-100">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center text-sm text-gray-500 gap-1">
//                 <Info className="h-4 w-4 text-primary" />
//                 <span>Demo credentials available</span>
//               </div>
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 className="text-primary text-xs"
//                 onClick={toggleCredentialsVisibility}
//               >
//                 {showCredentials ? "Hide" : "Show"}
//               </Button>
//             </div>

//             {showCredentials && demoCredentials && (
//               <div className="mt-2 p-3 bg-primary/5 rounded-md border border-primary/10 text-sm">
//                 <div className="flex flex-col gap-1">
//                   <div className="grid grid-cols-[80px_1fr] gap-2">
//                     <span className="font-medium">Email:</span>
//                     <code className="bg-primary/10 px-1 rounded">
//                       {demoCredentials.email}
//                     </code>
//                   </div>
//                   <div className="grid grid-cols-[80px_1fr] gap-2">
//                     <span className="font-medium">Password:</span>
//                     <code className="bg-primary/10 px-1 rounded">
//                       {demoCredentials.password}
//                     </code>
//                   </div>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     className="mt-2 text-xs"
//                     onClick={fillDemoCredentials}
//                   >
//                     Auto-fill
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </form>
//   );
// };

// export default LoginForm;
// import { FormEvent, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { LogIn, Eye, EyeOff, Info, Mail ,Lock} from "lucide-react";
// import { MOCK_USERS } from "@/models/auth";

// interface LoginFormProps {
//   email: string;
//   setEmail: (email: string) => void;
//   password: string;
//   setPassword: (password: string) => void;
//   rememberMe: boolean;
//   setRememberMe: (remember: boolean) => void;
//   onSubmit: (e: FormEvent) => void;
//   selectedRole: "patients" | "therapists" | "admins" | null;
// }

// const LoginForm = ({
//   email,
//   setEmail,
//   password,
//   setPassword,
//   rememberMe,
//   setRememberMe,
//   onSubmit,
//   selectedRole,
// }: LoginFormProps) => {
 
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCredentials, setShowCredentials] = useState(false);
 
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

//   const togglePasswordVisibility = () => {
//     // setShowPassword(!showPassword);
//     setShowPassword((prev) => !prev);
//   };

//   const toggleCredentialsVisibility = () => {
//     setShowCredentials(!showCredentials);
//   };

//   // Get demo credentials based on selected role
//   const getDemoCredentials = () => {
//     if (!selectedRole) return null;

//     const user = MOCK_USERS[selectedRole][0];
//     return user ? { email: user.email, password: user.password } : null;
//   };

//   const demoCredentials = getDemoCredentials();

//   const fillDemoCredentials = () => {
//     if (demoCredentials) {
//       setEmail(demoCredentials.email);
//       setPassword(demoCredentials.password);
//     }
//   };

//   const validate = () => {
//     const newErrors: { email?: string; password?: string } = {};
    
//     // Email validation
//     if (!email.trim()) {
//       newErrors.email = "Email is required.";
//     } else if (email.startsWith(' ')) {
//       newErrors.email = "Leading spaces are not allowed.";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Enter a valid email address.";
//     }

//     // Password validation
//     if (!password.trim()) {
//       newErrors.password = "Password is required.";
//     } else if (password.startsWith(' ')) {
//       newErrors.password = "Leading spaces are not allowed.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       onSubmit(e);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="grid gap-8">
//         <div className="grid gap-2">
//           <Label htmlFor="email" className="text-gray-400">Email</Label>
//           <div className="relative">
//             <Input
//               id="email"
//               type="email"
//               placeholder="name@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-background/50 pl-10" // <-- Important: padding-left for icon space
//               required
//             />
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           </div>
//           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//         </div>

//         <div className="grid gap-2">
//           <div className="flex items-center justify-between">
//             <Label htmlFor="password"className="text-gray-400">Password</Label>
//             {/* <a
//               href="#"
//               className="text-sm text-primary underline-offset-4 hover:underline"
//             >
//               Forgot password?
//             </a> */}
//           </div>
          
//           <div className="relative">
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//                placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="bg-background/50 pr-10 pl-10"
//               required
//             />
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"  />
//             <button
//               type="button"
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? (
//            <Eye className="h-5 w-5" />
//         ) : (
//          <EyeOff className="h-5 w-5" />
//         )}
//             </button>
//           </div>
//           {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//         </div>
          
//         {/* <div className="flex items-center space-x-2">
//           <Switch
//             id="remember-me"
//             checked={rememberMe}
//             onCheckedChange={setRememberMe}
//           />
//           <Label htmlFor="remember-me" className="text-sm">
//             Remember email
//           </Label>
//         </div> */}
//         <Button type="submit" className="w-full group relative overflow-hidden">
//           <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
//           <span className="relative flex items-center justify-center gap-2">
//             <LogIn className="h-4 w-4" />
//             Sign In
//           </span>
//         </Button>

//         {selectedRole && (
//           <div className="mt-4 pt-2 border-t border-gray-100">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center text-sm text-gray-500 gap-1">
//                 <Info className="h-4 w-4 text-primary" />
//                 <span>Demo credentials available</span>
//               </div>
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 className="text-primary text-xs"
//                 onClick={toggleCredentialsVisibility}
//               >
//                 {showCredentials ? "Hide" : "Show"}
//               </Button>
//             </div>

//             {showCredentials && demoCredentials && (
//               <div className="mt-2 p-3 bg-primary/5 rounded-md border border-primary/10 text-sm">
//                 <div className="flex flex-col gap-1">
//                   <div className="grid grid-cols-[80px_1fr] gap-2">
//                     <span className="font-medium">Email:</span>
//                     <code className="bg-primary/10 px-1 rounded">
//                       {demoCredentials.email}
//                     </code>
//                   </div>
//                   <div className="grid grid-cols-[80px_1fr] gap-2">
//                     <span className="font-medium">Password:</span>
//                     <code className="bg-primary/10 px-1 rounded">
//                       {demoCredentials.password}
//                     </code>
//                   </div>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     className="mt-2 text-xs"
//                     onClick={fillDemoCredentials}
//                   >
//                     Auto-fill
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </form>
//   );
// };

// export default LoginForm;
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LogIn, Eye, EyeOff, Info, Mail ,Lock} from "lucide-react";
import { MOCK_USERS } from "@/models/auth";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  onSubmit: (e: FormEvent) => void;
  selectedRole: "patients" | "therapists" | "admins" | null;
}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  onSubmit,
  selectedRole,
}: LoginFormProps) => {
 
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
 
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const togglePasswordVisibility = () => {
    // setShowPassword(!showPassword);
    setShowPassword((prev) => !prev);
  };

  const toggleCredentialsVisibility = () => {
    setShowCredentials(!showCredentials);
  };

  // Get demo credentials based on selected role
  const getDemoCredentials = () => {
    if (!selectedRole) return null;

    const user = MOCK_USERS[selectedRole][0];
    return user ? { email: user.email, password: user.password } : null;
  };

  const demoCredentials = getDemoCredentials();

  const fillDemoCredentials = () => {
    if (demoCredentials) {
      setEmail(demoCredentials.email);
      setPassword(demoCredentials.password);
    }
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-8">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-gray-400">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50 pl-10"
              required
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="grid gap-2">
         
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-gray-400">Password</Label>
             <a
              // href="/forgotpassword"
                href="/Emailverify"
             className="text-sm text-primary underline-offset-4 hover:underline"
            >
               Forgot password?
             </a> 
          </div>
          
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50 pr-10 pl-10"
              required
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
          
        <Button type="submit" className="w-full group relative overflow-hidden">
          <span className="absolute inset-0 w-0 transition-all duration-500 h-full bg-gradient-to-r from-primary/80 to-primary"></span>
          <span className="relative flex items-center justify-center gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </span>
        </Button>

        {selectedRole && (
          <div className="mt-4 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500 gap-1">
                <Info className="h-4 w-4 text-primary" />
                <span>Demo credentials available</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-primary text-xs"
                onClick={toggleCredentialsVisibility}
              >
                {showCredentials ? "Hide" : "Show"}
              </Button>
            </div>

            {showCredentials && demoCredentials && (
              <div className="mt-2 p-3 bg-primary/5 rounded-md border border-primary/10 text-sm">
                <div className="flex flex-col gap-1">
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-medium">Email:</span>
                    <code className="bg-primary/10 px-1 rounded">
                      {demoCredentials.email}
                    </code>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-medium">Password:</span>
                    <code className="bg-primary/10 px-1 rounded">
                      {demoCredentials.password}
                    </code>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 text-xs"
                    onClick={fillDemoCredentials}
                  >
                    Auto-fill
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default LoginForm;