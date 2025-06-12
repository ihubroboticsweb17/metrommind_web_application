import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
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

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1C98nntw4B/" },
    { icon: Twitter, href: "https://x.com/metromindkerala" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/metro-mind/" },
    { icon: Instagram, href: "https://www.instagram.com/metromindhospital?igsh=ZW4zY2JvOWtkMXc2" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${getFooterBackgroundClass()} text-gray-800 dark:text-gray-200`}>
      <div className="p-8 rounded-sm bg-teal-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12">
            {/* Company Info & Socials */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img
                  src={Logo}
                  alt="MetroMind Logo"
                  className="w-12 h-12 object-contain bg-teal-50 rounded-lg p-1"
                />
                <h3 className={`text-white text-2xl font-bold ${getAccentColor()}`}>
                  MetroMind
                </h3>
              </div>
              <p className="text-white text-md leading-relaxed">
                Transforming mental healthcare delivery with advanced AI analytics,
                real-time monitoring, and intelligent insights for better patient outcomes.
              </p>
              <div className="flex space-x-4 mt-4">
                {socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`p-3 rounded-full transition-all duration-300 ${getSocialIconClass()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.icon.name}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className={`text-white text-xl font-semibold ${getAccentColor()}`}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Services', path: '/services' },
                  { name: 'Contact Us', path: '/contact' },
                  { name: 'About Us', path: '/about' },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className={`text-white text-sm ${getHoverColor()} transition-colors duration-200`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className={`text-white text-xl font-semibold ${getAccentColor()}`}>
                Get in Touch
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-3 rounded-full ${getSocialIconClass()}`}>
                    <Mail className={`h-5 w-5 ${getAccentColor()}`} />
                  </div>
                  {/* Mailto link */}
                  <a
                    href="mailto:support@metromind.com"
                    className="text-white text-sm pt-1 hover:underline" // Added hover effect
                  >
                    support@metromind.com
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <div className={`p-3 rounded-full ${getSocialIconClass()}`}>
                    <Phone className={`h-5 w-5 ${getAccentColor()}`} />
                  </div>
                  {/* Tel link */}
                  <a
                    href="tel:+917306808867" // Standard format: tel:+[countrycode][number]
                    className="text-white text-sm pt-1 hover:underline" // Added hover effect
                  >
                    +91 73068 08867
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <div className={`p-3 rounded-full ${getSocialIconClass()}`}>
                    <MapPin className={`h-5 w-5 ${getAccentColor()}`} />
                  </div>
                  {/* Google Maps link (example) */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Rajagiri+Rd,+Rajagiri+P.O,+South+Kalamassery,+Kalamassery,+Kochi,+Kerala+683104"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm pt-1 hover:underline" // Added hover effect
                  >
                    <address className="not-italic text-white text-sm pt-1">
                      Rajagiri Rd, Rajagiri P.O, South Kalamassery, Kalamassery, Kochi, Kerala 683104
                    </address>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={`border-t ${getBorderColor()} pt-8 mt-12 text-center md:flex md:justify-between md:items-center`}>
            <p className="text-white text-sm mb-4 md:mb-0">
              &copy; {currentYear} MetroMind. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6">
              <Link
                to="/privacy"
                className={`text-white text-sm ${getHoverColor()} transition-colors duration-200`}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className={`text-white text-sm ${getHoverColor()} transition-colors duration-200`}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;