import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../layout/Navbar';
import FooterSection from '../ui/FooterSection';

interface ContactFormProps {
  theme?: "default" | "royal" | "ocean" | "emerald" | "sunset" | "pink" | "green";
}

const Contact = ({ theme = "default" }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const getBackgroundClass = () => {
    switch (theme) {
      case "royal":
        return "bg-gradient-to-br from-theme-royal-background to-theme-royal-card";
      case "ocean":
        return "bg-gradient-to-br from-theme-ocean-background to-theme-ocean-card";
      case "emerald":
        return "bg-gradient-to-br from-theme-emerald-background to-theme-emerald-card";
      case "sunset":
        return "bg-gradient-to-br from-theme-sunset-background to-theme-sunset-card";
      case "pink":
        return "bg-gradient-to-br from-theme-pink-background to-theme-pink-card";
      case "green":
        return "bg-gradient-to-br from-teal-50 to-white";
      default:
        return "bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800";
    }
  };

  const getCardClass = () => {
    switch (theme) {
      case "royal":
        return "bg-white/80 backdrop-blur-sm border border-theme-royal-primary/20";
      case "ocean":
        return "bg-white/80 backdrop-blur-sm border border-theme-ocean-primary/20";
      case "emerald":
        return "bg-white/80 backdrop-blur-sm border border-theme-emerald-primary/20";
      case "sunset":
        return "bg-white/80 backdrop-blur-sm border border-theme-sunset-primary/20";
      case "pink":
        return "bg-white/80 backdrop-blur-sm border border-theme-pink-primary/20";
      case "green":
        return "bg-white/90 backdrop-blur-sm border border-teal-200";
      default:
        return "bg-white/90 backdrop-blur-sm border border-gray-200 dark:bg-gray-800/90 dark:border-gray-700";
    }
  };

  const getAccentColor = () => {
    switch (theme) {
      case "royal": return "text-theme-royal-primary";
      case "ocean": return "text-theme-ocean-primary";
      case "emerald": return "text-theme-emerald-primary";
      case "sunset": return "text-theme-sunset-primary";
      case "pink": return "text-theme-pink-primary";
      case "green": return "text-teal-600";
      default: return "text-teal-600 dark:text-teal-400";
    }
  };

  const getButtonClass = () => {
    switch (theme) {
      case "royal":
        return "bg-theme-royal-primary hover:bg-theme-royal-accent text-white";
      case "ocean":
        return "bg-theme-ocean-primary hover:bg-theme-ocean-accent text-white";
      case "emerald":
        return "bg-theme-emerald-primary hover:bg-theme-emerald-accent text-white";
      case "sunset":
        return "bg-theme-sunset-primary hover:bg-theme-sunset-accent text-white";
      case "pink":
        return "bg-theme-pink-primary hover:bg-theme-pink-accent text-white";
      case "green":
        return "bg-teal-600 hover:bg-teal-700 text-white";
      default:
        return "bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600";
    }
  };

  const getInputClass = () => {
    switch (theme) {
      case "royal":
        return "border-theme-royal-primary/20 focus:border-theme-royal-primary focus:ring-theme-royal-primary/20";
      case "ocean":
        return "border-theme-ocean-primary/20 focus:border-theme-ocean-primary focus:ring-theme-ocean-primary/20";
      case "emerald":
        return "border-theme-emerald-primary/20 focus:border-theme-emerald-primary focus:ring-theme-emerald-primary/20";
      case "sunset":
        return "border-theme-sunset-primary/20 focus:border-theme-sunset-primary focus:ring-theme-sunset-primary/20";
      case "pink":
        return "border-theme-pink-primary/20 focus:border-theme-pink-primary focus:ring-theme-pink-primary/20";
      case "green":
        return "border-teal-200 focus:border-teal-500 focus:ring-teal-500/20";
      default:
        return "border-gray-300 focus:border-teal-500 focus:ring-teal-500/20 dark:border-gray-600 dark:focus:border-teal-400";
    }
  };

  const getSocialIconClass = () => {
    switch (theme) {
      case "royal": return "bg-theme-royal-primary/10 text-theme-royal-primary";
      case "ocean": return "bg-theme-ocean-primary/10 text-theme-ocean-primary";
      case "emerald": return "bg-theme-emerald-primary/10 text-theme-emerald-primary";
      case "sunset": return "bg-theme-sunset-primary/10 text-theme-sunset-primary";
      case "pink": return "bg-theme-pink-primary/10 text-theme-pink-primary";
      case "green": return "bg-teal-50 text-teal-600";
      default: return "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className={`min-h-screen   ${getBackgroundClass()}`}>
    <Navbar />

      <div className="max-w-7xl mx-auto py-12 mt-14">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${getAccentColor()}`}>
            Contact Us
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Get in touch with our team. We're here to help with your mental healthcare needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className={`lg:col-span-1 ${getCardClass()} rounded-2xl p-8 shadow-xl h-fit`}>
            <h2 className={`text-2xl font-bold mb-8 ${getAccentColor()}`}>
              Contact Info
            </h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${getSocialIconClass()}`}>
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    37, Karippai Rd, South Kalamassery,<br />
                    Kalamassery, Kochi, Kerala 683501
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${getSocialIconClass()}`}>
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    +91 73068 08867
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${getSocialIconClass()}`}>
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    metromindhospital@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className={`font-semibold mb-4 ${getAccentColor()}`}>Business Hours</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 ${getCardClass()} rounded-2xl p-8 shadow-xl`}>
            <h2 className={`text-2xl font-bold mb-8 ${getAccentColor()}`}>
              Send Message
            </h2>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-800">Your message has been sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800">There was an error sending your message. Please try again.</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${getInputClass()} focus:ring-2 focus:outline-none transition-all duration-200 bg-white dark:bg-gray-800 dark:text-white`}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${getInputClass()} focus:ring-2 focus:outline-none transition-all duration-200 bg-white dark:bg-gray-800 dark:text-white`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${getInputClass()} focus:ring-2 focus:outline-none transition-all duration-200 bg-white dark:bg-gray-800 dark:text-white`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${getInputClass()} focus:ring-2 focus:outline-none transition-all duration-200 bg-white dark:bg-gray-800 dark:text-white`}
                    placeholder="What is this regarding?"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${getInputClass()} focus:ring-2 focus:outline-none transition-all duration-200 resize-none bg-white dark:bg-gray-800 dark:text-white`}
                    placeholder="Please describe how we can help you..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${getButtonClass()} disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
          <FooterSection theme={theme} />

    </div>
  );
};

export default Contact;