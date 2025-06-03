// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { useTheme } from "@/App";
// import { Brain } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import RegisterBackground from "@/components/register/RegisterBackground";
// import RegisterForm from "@/components/register/RegisterForm";
// import axios from "axios";
// import Logo from "/image/logo.png";
// import {
//   UserRole,
//   saveUserSession,
//   getSavedEmail,
//   register,
// } from "@/models/auth";
// import Ani from "../assets/json/logoAni.json";
// import Lottie from "lottie-react";
// const Register = () => {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [age, setAge] = useState("");
//   const [occupation, setOccupation] = useState("");
//   const [education, setEducation] = useState("");
//   const [gender, setGender] = useState("");
//   const [mobilenumber, setMobilenumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [confrimpassword, setConfrimPassword] = useState("");
//   const [address, setAddress] = useState("");
//   const [selectedRole, setSelectedRole] = useState<UserRole>(null);
//   const [error, setError] = useState("");
//   const [phone, setPhone] = useState("");
//   const [countryCode, setCountryCode] = useState("+91");
//   const [fullPhone, setFullPhone] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(() => {
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
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setLoading(true);
//     setError("");

//     const formData = {
//       name,
//       username,
//       email,
//       mobile_number: mobilenumber,
//       age,
//       gender,
//       education,
//       occupation,
//       address,
//       password,
//       confirm_password: confrimpassword,
//     };

//     console.log("Sending data:", formData);

//     try {
//       const data = await register(formData);

//       console.log("Registration successful!", data);
//       toast({
//         title: "Success",
//         description: "Registration completed!",
//       });
//       navigate("/login");
//     } catch (error: any) {
//       console.error("Registration failed:", error);

//       if (error.response && error.response.data) {
//         const errorData = error.response.data;

//         // Loop through all error fields and show them in toasts
//         for (const key in errorData) {
//           if (errorData.hasOwnProperty(key)) {
//             const messages = Array.isArray(errorData[key])
//               ? errorData[key].join(", ")
//               : errorData[key];

//             toast({
//               variant: "destructive",
//               title: `${key.charAt(0).toUpperCase() + key.slice(1)} Error`,
//               description: messages,
//             });
//           }
//         }
//       } else {
//         toast({
//           variant: "destructive",
//           title: "Unexpected Error",
//           description: "Something went wrong. Please try again later.",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { theme } = useTheme();

//   const getThemeClasses = () => {
//     if (!theme || theme === "default") return "";
//     return `theme-${theme}`;
//   };

//   const themeClasses = getThemeClasses();
//   const LoadingOverlay = () => (
//     <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-3xl">
//       <div className="flex flex-col items-center space-y-4">
//         <div className="w-24 h-24">
//           <Lottie animationData={Ani} loop={true} />
//         </div>
//         <p className="text-sm text-muted-foreground">Signing you in...</p>
//       </div>
//     </div>
//   );
//   return (
//     <RegisterBackground themeClasses={themeClasses}>
//       <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
//         {isLoading && <LoadingOverlay />}{" "}
//         <div
//           className={`absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-30`}
//         >
//           <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
//           <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
//         </div>
//         <CardHeader className="space-y-1">
//           <div className="flex justify-center mb-2">
//             {/* <Brain className={`h-12 w-12 text-primary animate-pulse-subtle`} /> */}
//             <img
//               src={Logo}
//               alt={Logo}
//               className="relative z-10 w-20 h-20  animate-pulse-subtle"
//             />
//           </div>
//           <CardTitle className="text-2xl font-bold text-center">
//             MetroMind Register
//           </CardTitle>
//           <CardDescription className="text-center">
//             Register in to access your MetroMind account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-6">
//             <RegisterForm
//               name={name}
//               setName={setName}
//               username={username}
//               setUsername={setUsername}
//               email={email}
//               setEmail={setEmail}
//               mobilenumber={mobilenumber}
//               setMobilenumber={setMobilenumber}
//               age={age}
//               setAge={setAge}
//               gender={gender}
//               setGender={setGender}
//               education={education}
//               setEducation={setEducation}
//               occupation={occupation}
//               setOccupation={setOccupation}
//               address={address}
//               setAddress={setAddress}
//               password={password}
//               setPassword={setPassword}
//               confrimpassword={confrimpassword}
//               setConfrimPassword={setConfrimPassword}
//               onSubmit={handleSubmit}
//               selectedRole={selectedRole}
//             />
//           </div>
//         </CardContent>
//         <CardFooter className="flex flex-col">
//           <div className="text-sm text-center text-muted-foreground mt-2">
//             Already have an account?{" "}
//             <a
//               href="/login"
//               className="text-primary underline-offset-4 hover:underline"
//             >
//               Login here
//             </a>
//           </div>
//         </CardFooter>
//       </Card>
//     </RegisterBackground>
//   );
// };

// export default Register;
// ......................................................

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/App";
import { Brain } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterBackground from "@/components/register/RegisterBackground";
import RegisterForm from "@/components/register/RegisterForm";
import axios from "axios";
import Logo from "/image/logo.png";
import {
  UserRole,
  saveUserSession,
  getSavedEmail,
  register,
} from "@/models/auth";
import Ani from "../assets/json/logoAni.json";
import Lottie from "lottie-react";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [gender, setGender] = useState("");
  const [mobilenumber, setMobilenumber] = useState(""); // This should hold the phone number
  const [password, setPassword] = useState("");
  const [confrimpassword, setConfrimPassword] = useState("");
  const [address, setAddress] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [fullPhone, setFullPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedPhone = localStorage.getItem("userPhone");
    const savedCountryCode = localStorage.getItem("userCountryCode");
    const savedFullPhone = localStorage.getItem("userFullPhone");
    
    console.log(savedFullPhone, "savedFullPhone......");
    
    if (savedPhone) {
      // Set the mobile number state instead of separate phone state
      // setMobilenumber(savedPhone);
    }

    if (savedCountryCode) {
      setCountryCode(savedCountryCode);
    }
    
    if (savedFullPhone) {
      setFullPhone(savedFullPhone);
      // If you want to use the full phone number instead of just the number part
      setMobilenumber(savedFullPhone);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoading(true);
    setError("");

    const formData = {
      name,
      username,
      email,
      mobile_number: mobilenumber, // This will now have the value from localStorage
      age,
      gender,
      education,
      occupation,
      address,
      password,
      confirm_password: confrimpassword,
    };

    console.log("Sending data:", formData);

    try {
      const data = await register(formData);

      console.log("Registration successful!", data);
      toast({
        title: "Success",
        description: "Registration completed!",
      });
      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed:", error);

      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Loop through all error fields and show them in toasts
        for (const key in errorData) {
          if (errorData.hasOwnProperty(key)) {
            const messages = Array.isArray(errorData[key])
              ? errorData[key].join(", ")
              : errorData[key];

            toast({
              variant: "destructive",
              title: `${key.charAt(0).toUpperCase() + key.slice(1)} Error`,
              description: messages,
            });
          }
        }
      } else {
        toast({
          variant: "destructive",
          title: "Unexpected Error",
          description: "Something went wrong. Please try again later.",
        });
      }
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();

  const getThemeClasses = () => {
    if (!theme || theme === "default") return "";
    return `theme-${theme}`;
  };

  const themeClasses = getThemeClasses();
  
  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-3xl">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24">
          <Lottie animationData={Ani} loop={true} />
        </div>
        <p className="text-sm text-muted-foreground">Signing you in...</p>
      </div>
    </div>
  );

  return (
    <RegisterBackground themeClasses={themeClasses}>
      <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/80 border-border/50 rounded-3xl">
        {isLoading && <LoadingOverlay />}
        <div
          className={`absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-30`}
        >
          <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
        </div>
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            {/* <img
              src={Logo}
              alt={Logo}
              className="relative z-10 w-20 h-20 animate-pulse-subtle"
            /> */}
                <img
              src={Logo}
              alt="MetroMind Logo"
              className="relative z-10 w-20 h-20"
              style={{
                imageRendering: 'crisp-edges',
                objectFit: 'contain'
              }}
              onError={(e) => {
                console.error('Logo failed to load:', e);
              }}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            MetroMind Register
          </CardTitle>
          <CardDescription className="text-center">
            Register in to access your MetroMind account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <RegisterForm
              name={name}
              setName={setName}
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              mobilenumber={mobilenumber}
              setMobilenumber={setMobilenumber}
              age={age}
              setAge={setAge}
              gender={gender}
              setGender={setGender}
              education={education}
              setEducation={setEducation}
              occupation={occupation}
              setOccupation={setOccupation}
              address={address}
              setAddress={setAddress}
              password={password}
              setPassword={setPassword}
              confrimpassword={confrimpassword}
              setConfrimPassword={setConfrimPassword}
              onSubmit={handleSubmit}
              selectedRole={selectedRole}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-center text-muted-foreground mt-2">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary underline-offset-4 hover:underline"
            >
              Login here
            </a>
          </div>
        </CardFooter>
      </Card>
    </RegisterBackground>
  );
};

export default Register;