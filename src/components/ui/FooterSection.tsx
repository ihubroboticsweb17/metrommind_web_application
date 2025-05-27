import React from 'react';
import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeType } from '@/App';
import Logo from '/image/logo.png';

interface FooterSectionProps {
  theme?: ThemeType;
}

const FooterSection = ({ theme = "default" }: FooterSectionProps) => {
  const getFooterBackgroundClass = () => {
    switch (theme) {
      case "royal":
        return "bg-gradient-to-b from-theme-royal-background to-theme-royal-card";
      case "ocean":
        return "bg-gradient-to-b from-theme-ocean-background to-theme-ocean-card";
      case "emerald":
        return "bg-gradient-to-b from-theme-emerald-background to-theme-emerald-card";
      case "sunset":
        return "bg-gradient-to-b from-theme-sunset-background to-theme-sunset-card";
      case "pink":
        return "bg-gradient-to-b from-theme-pink-background to-theme-pink-card";
      case "green":
        return "bg-gradient-to-b from-teal-10 to-gray-100";
      default:
        return "bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800";
    }
  };

  const getAccentColor = () => {
    switch (theme) {
      case "royal": return "text-theme-royal-primary";
      case "ocean": return "text-theme-ocean-primary";
      case "emerald": return "text-theme-emerald-primary";
      case "sunset": return "text-theme-sunset-primary";
      case "pink": return "text-theme-pink-primary";
      case "green": return "text-theme-teal-primary";
      default: return "text-teal-600";
    }
  };

  const getHoverColor = () => {
    switch (theme) {
      case "royal": return "hover:text-theme-royal-accent";
      case "ocean": return "hover:text-theme-ocean-accent";
      case "emerald": return "hover:text-theme-emerald-accent";
      case "sunset": return "hover:text-theme-sunset-accent";
      case "pink": return "hover:text-theme-pink-accent";
      case "green": return "hover:text-white-700";
      default: return "hover:text-teal-700";
    }
  };

  const getBorderColor = () => {
    switch (theme) {
      case "royal": return "border-theme-royal-primary/20";
      case "ocean": return "border-theme-ocean-primary/20";
      case "emerald": return "border-theme-emerald-primary/20";
      case "sunset": return "border-theme-sunset-primary/20";
      case "pink": return "border-theme-pink-primary/20";
      case "green": return "border-theme-green-primary/20";
      default: return "border-teal-200";
    }
  };

  const getSocialIconClass = () => {
    switch (theme) {
      case "royal": return "bg-theme-royal-primary/10 hover:bg-theme-royal-primary hover:text-white";
      case "ocean": return "bg-theme-ocean-primary/10 hover:bg-theme-ocean-primary hover:text-white";
      case "emerald": return "bg-theme-emerald-primary/10 hover:bg-theme-emerald-primary hover:text-white";
      case "sunset": return "bg-theme-sunset-primary/10 hover:bg-theme-sunset-primary hover:text-white";
      case "pink": return "bg-theme-pink-primary/10 hover:bg-theme-pink-primary hover:text-white";
      case "green": return "bg-theme-white-primary/10 hover:bg-theme-green-primary text-white hover:text-white";
      default: return "bg-teal-50 hover:bg-teal-600 hover:text-white";
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={` ${getFooterBackgroundClass()} `}>
      <div className="metro-container rounded-sm bg-teal-600">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 mt-8">
          {/* Company Info */}
          <div className="space-y-3  mt-12">
            <div className="flex items-center space-x-3 ">
              <img 
                src={Logo} 
                alt="MetroMind Logo" 
                className="w-10 h-10 object-contain bg-teal-50 rounded-sm" 
              />
              <h3 className={`text-white text-xl font-bold ${getAccentColor()}`}>
                MetroMind
              </h3>
            </div>
            <p className="text-white text-muted-foreground text-sm leading-relaxed">
              Transforming mental healthcare delivery with advanced AI analytics, 
              real-time monitoring, and intelligent insights for better patient outcomes.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="https://metromindhospitals.com/#"
                  className={`p-2 rounded-lg transition-all duration-300 ${getSocialIconClass()} ${getAccentColor()}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3  mt-12">
            <h4 className={`text-white text-lg font-semibold ${getAccentColor()}`}>
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                'Metromind Therapy',
                'Psychedelic Therapy',
                'rTMS Therapy',
                'IV Therapy Clinic'
              ].map((service, index) => (
                <li key={index}>
                  <Link 
                    to="#" 
                    className={`text-white text-muted-foreground ${getHoverColor()} transition-colors duration-200 text-sm`}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4  mt-12">
            <h4 className={`text-white text-lg font-semibold ${getAccentColor()}`}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                // { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Help Center', path: '/help' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className={`text-white text-muted-foreground ${getHoverColor()} transition-colors duration-200 text-sm`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mt-12">
            <h4 className={`text-white text-lg font-semibold ${getAccentColor()}`}>
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getSocialIconClass()}`}>
                  <Mail className={`h-4 w-4 ${getAccentColor()}`} />
                </div>
                <span className="text-white text-muted-foreground text-sm">
                  support@metromind.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getSocialIconClass()}`}>
                  <Phone className={`h-4 w-4 ${getAccentColor()}`} />
                </div>
                <span className="text-white text-muted-foreground text-sm">
            +91 73068 08867
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getSocialIconClass()}`}>
                  <MapPin className={`h-4 w-4 ${getAccentColor()}`} />
                </div>
                <span className="text-white text-muted-foreground text-sm">
             Rajagiri Rd, Rajagiri P.O, South Kalamassery, Kalamassery, Kochi, Kerala 683104
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${getBorderColor()} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-white text-muted-foreground text-sm">
              © {currentYear} MetroMind. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link 
                to="/privacy" 
                className={`text-white text-muted-foreground ${getHoverColor()} transition-colors duration-200 text-sm`}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className={`text-white text-muted-foreground ${getHoverColor()} transition-colors duration-200 text-sm`}
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className={`text-white text-muted-foreground ${getHoverColor()} transition-colors duration-200 text-sm`}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;