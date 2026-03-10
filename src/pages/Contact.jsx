import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Send,
  User,
  HelpCircle,
  ShieldCheck,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Sparkles,
  Headphones,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { API } from "../api.js";

// ================= ANIMATION VARIANTS =================

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInDown = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring", stiffness: 50 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring", stiffness: 50 } }
};

const slideInUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 50 } }
};

const slideInDown = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 50 } }
};

// ================= ANIMATED SECTION COMPONENT =================

const AnimatedSection = ({ children, delay = 0, className = "", direction = "left", once = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: once, amount: 0.2 });
  
  let initialX = 0;
  let initialY = 0;
  
  if (direction === "left") initialX = -100;
  else if (direction === "right") initialX = 100;
  else if (direction === "up") initialY = 100;
  else if (direction === "down") initialY = -100;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initialX, y: initialY }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 50 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ================= LIGHT COLOR GRADIENTS =================

const getCardGradient = (index) => {
  const gradients = [
    "bg-gradient-to-br from-blue-50 via-cyan-50 to-white",
    "bg-gradient-to-br from-purple-50 via-pink-50 to-white",
    "bg-gradient-to-br from-green-50 via-emerald-50 to-white",
    "bg-gradient-to-br from-yellow-50 via-amber-50 to-white",
    "bg-gradient-to-br from-indigo-50 via-blue-50 to-white",
    "bg-gradient-to-br from-orange-50 via-red-50 to-white",
    "bg-gradient-to-br from-teal-50 via-cyan-50 to-white",
    "bg-gradient-to-br from-rose-50 via-pink-50 to-white"
  ];
  return gradients[index % gradients.length];
};

const getIconColor = (index) => {
  const colors = [
    "text-blue-500",
    "text-purple-500",
    "text-green-500",
    "text-yellow-500",
    "text-indigo-500",
    "text-orange-500",
    "text-teal-500",
    "text-rose-500"
  ];
  return colors[index % colors.length];
};

// ========== CONFIGURATION ==========
const BUSINESS_CONFIG = {
  phone: "+919023884833",
  whatsapp: "+916371106588",
  email: "gotravio.travel@gmail.com",
  whatsappMessage: "Hi GoTravio, I need travel assistance",
  social: {
    facebook: "https://facebook.com/gotravio",
    instagram: "https://instagram.com/gotravio",
    twitter: "https://twitter.com/gotravio",
    linkedin: "https://linkedin.com/company/gotravio"
  }
};

const SERVICE_TYPES = [
  "Cab & Vehicle Rental",
  "Train Ticket Assistance (Including Tatkal)",
  "Flight Booking",
  "Tour Packages",
  "Hotel Booking",
  "Visa Assistance",
  "Travel Insurance",
  "Corporate Travel",
  "Custom Itinerary",
  "General Inquiry"
];

// ========== VALIDATION UTILITIES ==========
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

const validateName = (name) => {
  return name.trim().length >= 2;
};

const validateMessage = (message) => {
  return message.trim().length >= 10;
};

// ========== COMPONENTS ==========

const SuccessModal = ({ isOpen, onClose, onContinueWhatsApp }) => {
  if (!isOpen) return null;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(BUSINESS_CONFIG.whatsappMessage);
    window.open(`https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
              >
                <CheckCircle className="text-green-600" size={32} />
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2"
              >
                Enquiry Sent Successfully!
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8"
              >
                Our travel expert will review your enquiry and contact you within 1 hour.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 sm:space-y-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                >
                  <MessageCircle size={20} />
                  Continue on WhatsApp
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full py-3 sm:py-4 text-gray-700 hover:text-gray-900 font-medium text-sm sm:text-base lg:text-lg"
                >
                  Close
                </motion.button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200"
              >
                <p className="text-xs sm:text-sm lg:text-base text-gray-500">
                  <Clock className="inline mr-2" size={14} />
                  Response time: 15 min (WhatsApp) • 1 hour (Email)
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const QuickContactCard = ({ icon, title, description, actionText, actionUrl, gradient, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });

  const handleClick = () => {
    if (actionUrl.includes('mailto:')) {
      window.location.href = actionUrl;
    } else if (actionUrl.includes('tel:')) {
      window.location.href = actionUrl;
    } else {
      window.open(actionUrl, '_blank');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeInScale}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Animated shadow on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isHovered ? { opacity: 1, scale: 1.05 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl"
      />
      
      <div className={`relative ${getCardGradient(index)} rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300`}>
        <motion.div
          animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl bg-gradient-to-r ${gradient} mb-4 sm:mb-5 lg:mb-6`}
        >
          {icon}
        </motion.div>
        
        <h3 className="font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-900 mb-2 sm:mb-3">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-5">{description}</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="w-full py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base lg:text-lg hover:from-gray-100 hover:to-gray-200 transition-all border border-gray-200 group-hover:border-blue-300"
        >
          {actionText}
        </motion.button>
      </div>
    </motion.div>
  );
};

// ========== MAIN COMPONENT ==========

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // FAQ data for schema
  const faqs = [
    {
      question: "How can I contact GoTravio for travel assistance?",
      answer: "You can contact us through multiple channels: Fill out the enquiry form on this page, WhatsApp us at +91 90238 84833 for instant responses, call us at +91 90238 84833 for immediate assistance, or email us at gotravio.travel@gmail.com for detailed queries."
    },
    {
      question: "What are your business hours?",
      answer: "We are available 24/7, 365 days a year. Our travel experts are always ready to assist you with any travel requirements, including emergency bookings and last-minute changes."
    },
    {
      question: "How quickly can I expect a response?",
      answer: "We pride ourselves on quick response times. WhatsApp messages are typically answered within 5-10 minutes. Phone calls are answered immediately during business hours. Email enquiries are responded to within 1-2 hours. Form submissions are handled within 15-30 minutes."
    },
    {
      question: "Do you provide support in regional languages?",
      answer: "Yes, our travel experts are multilingual and can assist you in Hindi, English, and several regional languages including Tamil, Telugu, Kannada, Malayalam, Bengali, and Gujarati."
    },
    {
      question: "Can I visit your office for in-person consultation?",
      answer: "Currently, we operate as a digital-first travel assistance service to provide you with the best convenience. However, we're happy to schedule video calls for detailed travel planning. For urgent matters, our phone and WhatsApp support is available 24/7."
    }
  ];

  // Schema.org structured data for contact page
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact GoTravio Travels",
    "description": "Get in touch with GoTravio for travel assistance, cab bookings, train tickets, flight bookings, and tour packages.",
    "url": "https://gotravio.com/contact",
    "mainEntity": {
      "@type": "TravelAgency",
      "name": "GoTravio Travels",
      "telephone": "+91 90238 84833",
      "email": "gotravio.travel@gmail.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91 90238 84833",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Gujarati"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "India",
        "addressCountry": "IN"
      }
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const quickContacts = [
    {
      icon: <MessageCircle className="text-white" size={22} />,
      title: "WhatsApp Chat",
      description: "Instant response, document sharing, quick queries",
      actionText: "Chat on WhatsApp",
      actionUrl: `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappMessage)}`,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <Phone className="text-white" size={22} />,
      title: "Call Expert",
      description: "Immediate assistance, detailed discussion, 24/7 support",
      actionText: "Call Now",
      actionUrl: `tel:${BUSINESS_CONFIG.phone}`,
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Mail className="text-white" size={22} />,
      title: "Email Us",
      description: "Detailed queries, document attachments, formal communication",
      actionText: "Send Email",
      actionUrl: `mailto:${BUSINESS_CONFIG.email}?subject=Travel%20Assistance%20Enquiry`,
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateName(form.name)) {
      newErrors.name = "Please enter a valid name (min 2 characters)";
    }

    if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePhone(form.phone)) {
      newErrors.phone = "Please enter a valid phone number with country code";
    }

    if (!form.serviceType) {
      newErrors.serviceType = "Please select a service type";
    }

    if (!validateMessage(form.message)) {
      newErrors.message = "Please provide more details (min 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const enquiryData = {
        name: form.name,
        service: form.serviceType,
        phone: form.phone.replace(/\D/g, ''),
        email: form.email,
        details: form.message,
        source: 'contact_page'
      };

      console.log('Submitting contact enquiry:', enquiryData);

      const response = await API.post("/enquiry", enquiryData);
      
      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: response.data.message || 'Enquiry submitted successfully!'
        });
        
        setShowSuccessModal(true);

        setForm({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          message: "",
        });
        setErrors({});

      } else {
        throw new Error(response.data.message || 'Failed to submit enquiry');
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || error.message || 'Failed to submit enquiry. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeNotification = () => {
    setSubmitStatus({ type: null, message: "" });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <SEO 
        title="Contact GoTravio Travels | Travel Assistance, Cab, Train, Flight & Tour Enquiries"
        description="Get in touch with GoTravio for expert travel assistance. Contact us via phone, WhatsApp, or email for cab bookings, train tickets (including Tatkal), flight bookings, and tour packages. 24/7 support available."
        keywords="contact GoTravio, travel assistance contact, cab booking enquiry, train ticket help, flight booking support, tour package enquiry, travel agency contact India, 24/7 travel support, GoTravio contact"
        canonicalUrl="/contact"
        ogImage="https://gotravio.com/contact-og-image.jpg"
        schemaData={[contactSchema, faqSchema]}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white w-full overflow-x-hidden">
        {/* Notification Banner */}
        <AnimatePresence>
          {submitStatus.type && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`fixed top-4 right-4 z-50 max-w-md w-[calc(100%-2rem)] sm:w-full ${submitStatus.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 transition-all duration-300`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 sm:gap-4">
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-semibold text-sm sm:text-base ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                      {submitStatus.type === 'success' ? 'Success!' : 'Error!'}
                    </p>
                    <p className={`text-xs sm:text-sm mt-1 ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {submitStatus.message}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeNotification}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <AnimatedSection direction="down">
          <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white w-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            />
            
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 relative z-10">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 sm:py-3 mb-6 sm:mb-8"
                  >
                    <Sparkles size={16} className="sm:w-5 sm:h-5 text-yellow-300" />
                    <span className="text-sm sm:text-base lg:text-lg font-medium">24/7 Expert Travel Support</span>
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
                  >
                    Contact Our
                    <motion.span 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="block text-blue-300 mt-2 sm:mt-3"
                    >
                      Travel Experts
                    </motion.span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                    className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto"
                  >
                    Get personalized assistance for all your travel needs - cab bookings, train tickets, flight bookings, and tour packages.
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Quick Contact Options */}
        <section className="px-4 sm:px-6 lg:px-12 xl:px-16 -mt-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
            >
              {quickContacts.map((contact, idx) => (
                <QuickContactCard key={idx} {...contact} index={idx} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Main Enquiry Form */}
            <AnimatedSection direction="up" delay={0.2}>
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Form Header */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 sm:p-8 lg:p-10"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2">Travel Enquiry Form</h2>
                      <p className="text-sm sm:text-base lg:text-lg text-blue-100">Our expert will personally review your request</p>
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <ShieldCheck size={20} className="sm:w-6 sm:h-6 text-yellow-300" />
                      <span className="text-xs sm:text-sm lg:text-base font-medium">Secure & Private</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-7 lg:space-y-8">
                  {/* Form-level success/error messages */}
                  <AnimatePresence>
                    {submitStatus.type && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`p-4 sm:p-5 ${submitStatus.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-xl sm:rounded-2xl`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          {submitStatus.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                          )}
                          <p className={`font-medium text-sm sm:text-base lg:text-lg ${submitStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                            {submitStatus.message}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
                    {/* Name Field */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="space-y-2 sm:space-y-3"
                    >
                      <label className="block text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-sm sm:text-base lg:text-lg`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-red-500 text-xs sm:text-sm lg:text-base mt-1"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Email Field */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="space-y-2 sm:space-y-3"
                    >
                      <label className="block text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-sm sm:text-base lg:text-lg`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-red-500 text-xs sm:text-sm lg:text-base mt-1"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
                    {/* Phone Field */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="space-y-2 sm:space-y-3"
                    >
                      <label className="block text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-sm sm:text-base lg:text-lg`}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.phone && (
                          <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-red-500 text-xs sm:text-sm lg:text-base mt-1"
                          >
                            {errors.phone}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Service Type */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="space-y-2 sm:space-y-3"
                    >
                      <label className="block text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
                        Service Needed *
                      </label>
                      <div className="relative">
                        <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <select
                          name="serviceType"
                          value={form.serviceType}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl border ${
                            errors.serviceType ? 'border-red-500' : 'border-gray-300'
                          } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors appearance-none cursor-pointer text-sm sm:text-base lg:text-lg`}
                        >
                          <option value="">Select a service</option>
                          {SERVICE_TYPES.map((service, idx) => (
                            <option key={idx} value={service}>{service}</option>
                          ))}
                        </select>
                        <motion.div
                          animate={{ rotate: 90 }}
                          transition={{ duration: 0.3 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          <ChevronRight size={18} />
                        </motion.div>
                      </div>
                      <AnimatePresence>
                        {errors.serviceType && (
                          <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-red-500 text-xs sm:text-sm lg:text-base mt-1"
                          >
                            {errors.serviceType}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Message Field */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="space-y-2 sm:space-y-3"
                  >
                    <label className="block text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors resize-none text-sm sm:text-base lg:text-lg`}
                      placeholder="Please provide details about your travel plans, dates, destinations, number of travelers, budget, and any specific requirements..."
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="text-red-500 text-xs sm:text-sm lg:text-base mt-1"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-500">
                      Provide as much detail as possible for better assistance
                    </p>
                  </motion.div>

                  {/* Trust Note */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-blue-100"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <ShieldCheck size={20} className="sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm sm:text-base lg:text-lg text-gray-900">Your information is secure</p>
                        <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                          We respect your privacy. Your details are encrypted and never shared with third parties.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg lg:text-xl transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 sm:gap-4"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-white border-t-transparent"
                        />
                        <span className="text-sm sm:text-base lg:text-lg">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} className="sm:w-6 sm:h-6" />
                        <span className="text-sm sm:text-base lg:text-lg">Send Enquiry</span>
                      </>
                    )}
                  </motion.button>

                  {/* Alternative Options */}
                  <div className="text-center pt-4 sm:pt-5">
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                      Prefer to talk?{' '}
                      <motion.a
                        whileHover={{ scale: 1.05, color: "#2563eb" }}
                        href={`https://wa.me/${BUSINESS_CONFIG.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                      >
                        WhatsApp us directly
                        <MessageCircle size={16} className="sm:w-5 sm:h-5" />
                      </motion.a>
                    </p>
                  </div>
                </form>
              </div>
            </AnimatedSection>

            {/* Simple Response Info */}
            <AnimatedSection direction="left" delay={0.3}>
              <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`${getCardGradient(0)} rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-3 lg:p-4 rounded-lg ${getIconColor(0)}`}>
                      <Clock size={20} />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-900">Response Time</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm lg:text-base">
                      <span className="text-gray-600">WhatsApp</span>
                      <span className="font-medium text-green-600">5-10 minutes</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm lg:text-base">
                      <span className="text-gray-600">Phone Calls</span>
                      <span className="font-medium text-blue-600">Instant</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm lg:text-base">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium text-purple-600">1 hour</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className={`${getCardGradient(1)} rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-3 lg:p-4 rounded-lg ${getIconColor(1)}`}>
                      <Headphones size={20} />
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-900">24/7 Emergency Support</h3>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4">
                    For urgent travel issues, cancellations, or immediate assistance
                  </p>
                  <motion.a
                    whileHover={{ scale: 1.05, x: 5 }}
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className={`inline-flex items-center gap-2 font-medium text-sm sm:text-base lg:text-lg ${getIconColor(1)}`}
                  >
                    <Phone size={16} className="sm:w-5 sm:h-5" />
                    Call +91 90238 84833
                  </motion.a>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* FAQ Section */}
        <AnimatedSection direction="right" delay={0.4}>
          <section className="w-full bg-gradient-to-b from-white to-gray-50 py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-6 sm:mb-10">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-2 sm:mb-3">
                  <HelpCircle size={14} className="sm:w-4 sm:h-4 text-blue-500" />
                  <span className="text-[10px] sm:text-xs md:text-sm font-medium text-blue-700">Got Questions?</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 px-2">
                  Frequently Asked{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Questions
                  </span>
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
                  Find answers to common questions about contacting us and our services
                </p>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 overflow-hidden ${getCardGradient(index)}`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left focus:outline-none"
                      aria-expanded={openFaq === index}
                    >
                      <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown
                          size={18}
                          className={`${getIconColor(index)} flex-shrink-0`}
                        />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-xs sm:text-sm lg:text-base text-gray-600 border-t border-gray-100 pt-2 sm:pt-3">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Still have questions banner */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-8 sm:mt-10 md:mt-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-white text-center"
              >
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Still Have Questions?</h3>
                  <p className="text-xs sm:text-sm md:text-base text-blue-100 mb-3 sm:mb-4">
                    Can't find the answer you're looking for? Chat with our friendly team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`https://wa.me/${BUSINESS_CONFIG.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-white text-blue-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm hover:bg-blue-50 transition-all"
                    >
                      <MessageCircle size={16} className="sm:w-4 sm:h-4" />
                      WhatsApp Us
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const formElement = document.getElementById('enquiry-form');
                        if (formElement) {
                          formElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center justify-center gap-1.5 bg-transparent border-2 border-white text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm hover:bg-white/10 transition-all"
                    >
                      <Send size={16} className="sm:w-4 sm:h-4" />
                      Send Enquiry
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </AnimatedSection>

        {/* Success Modal */}
        <SuccessModal 
          isOpen={showSuccessModal} 
          onClose={() => setShowSuccessModal(false)}
          onContinueWhatsApp={() => {
            const message = encodeURIComponent(BUSINESS_CONFIG.whatsappMessage);
            window.open(`https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${message}`, '_blank');
            setShowSuccessModal(false);
          }}
        />

        {/* Floating WhatsApp Button */}
        <motion.a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(BUSINESS_CONFIG.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-40 group"
        >
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-green-500 rounded-full blur-lg group-hover:blur-xl transition-all opacity-70"
            />
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-3 sm:p-4 lg:p-5 rounded-full shadow-2xl hover:shadow-3xl transition-all">
              <MessageCircle size={22} className="sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </div>
          </div>
        </motion.a>
      </div>
    </>
  );
};

export default Contact;