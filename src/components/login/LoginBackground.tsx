
import { ReactNode } from "react";

interface LoginBackgroundProps {
  themeClasses: string;
  children: ReactNode;
}

const LoginBackground = ({ themeClasses, children }: LoginBackgroundProps) => {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/90 px-4 ${themeClasses}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent blur-3xl opacity-40"></div>
        <div className="absolute right-0 bottom-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent blur-3xl opacity-40"></div>
      </div>
      {children}
    </div>
  );
};

export default LoginBackground;
