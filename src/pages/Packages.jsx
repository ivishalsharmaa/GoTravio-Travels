import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { API } from "../api.js";
import { 
  MapPin,
  Calendar,
  Users,
  Star,
  Clock,
  Shield,
  ChevronRight,
  Filter,
  Search,
  Heart,
  TrendingUp,
  Sparkles,
  Navigation,
  Hotel,
  Utensils,
  Car,
  Ticket,
  Globe,
  Award,
  CheckCircle,
  MessageCircle,
  Phone,
  Zap,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Pause,
  Play,
  User,
  Mail,
  Send,
  AlertCircle,
  X,
  Package as PackageIcon,
  Tag,
  DollarSign,
  FileText,
  Mountain,
  Waves,
  Sun,
  Snowflake,
  Castle,
  Coffee,
  Palette,
  HelpCircle,
  ChevronDown,
  Camera
} from "lucide-react";

// ================= ANIMATION VARIANTS =================

// Slide in animations from different directions - ONCE only
const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      type: "spring", 
      stiffness: 50,
      damping: 20
    } 
  }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      type: "spring", 
      stiffness: 50,
      damping: 20
    } 
  }
};

const slideInFromTop = {
  hidden: { opacity: 0, y: -100 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      type: "spring", 
      stiffness: 50,
      damping: 20
    } 
  }
};

const slideInFromBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      type: "spring", 
      stiffness: 50,
      damping: 20
    } 
  }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.6, 
      type: "spring", 
      stiffness: 100,
      damping: 15
    } 
  }
};

const rotateIn = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: { 
    opacity: 1, 
    rotate: 0, 
    scale: 1, 
    transition: { 
      duration: 0.8, 
      type: "spring", 
      stiffness: 50,
      damping: 15
    } 
  }
};

// Stagger container for children animations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// ================= ANIMATED SECTION COMPONENT =================

const AnimatedSection = ({ children, direction = "left", delay = 0, className = "", id = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { 
    once: true,  // This ensures animation only happens once
    amount: 0.2,
    margin: "-50px 0px -50px 0px"
  });
  
  let animationVariant;
  switch(direction) {
    case "left":
      animationVariant = slideInFromLeft;
      break;
    case "right":
      animationVariant = slideInFromRight;
      break;
    case "top":
      animationVariant = slideInFromTop;
      break;
    case "bottom":
      animationVariant = slideInFromBottom;
      break;
    case "scale":
      animationVariant = fadeInScale;
      break;
    case "rotate":
      animationVariant = rotateIn;
      break;
    default:
      animationVariant = slideInFromLeft;
  }
  
  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={animationVariant}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ================= ANIMATED CARD COMPONENT =================

const AnimatedCard = ({ children, index = 0, className = "" }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      variants={fadeInScale}
      custom={index}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative ${className}`}
    >
      {/* Animated shadow on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={hovered ? { opacity: 1, scale: 1.05 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl"
      />
      
      {/* Card content */}
      <div className="relative">
        {children}
      </div>
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

// ================= CIRCULAR CAROUSEL COMPONENT =================
// ⚠️ THIS SECTION IS UNTOUCHED - NO CHANGES MADE ⚠️

const CircularCarousel = ({ packages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const totalPackages = packages.length;
  const radius = 180;
  const mobileRadius = 100;
  const angleStep = (2 * Math.PI) / totalPackages;

  useEffect(() => {
    if (totalPackages <= 1 || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalPackages);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [totalPackages, isPaused]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalPackages) % totalPackages);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalPackages);
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const getCardPosition = (index, isMobile = false) => {
    const currentRadius = isMobile ? mobileRadius : radius;
    const angle = angleStep * index - Math.PI / 2;
    const x = Math.cos(angle) * currentRadius;
    const y = Math.sin(angle) * currentRadius;
    
    const distance = Math.min(
      Math.abs(index - activeIndex),
      totalPackages - Math.abs(index - activeIndex)
    );
    const scale = 1 - (distance * 0.15);
    const opacity = 1 - (distance * 0.3);
    const zIndex = totalPackages - distance;
    
    return { x, y, scale, opacity, zIndex };
  };

  const activePackage = packages[activeIndex] || packages[0];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-hidden">
      {/* Carousel Controls */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
        <button
          onClick={handlePrev}
          className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all"
          aria-label="Previous package"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all"
          aria-label={isPaused ? "Play carousel" : "Pause carousel"}
        >
          {isPaused ? <Play size={20} className="sm:w-6 sm:h-6" /> : <Pause size={20} className="sm:w-6 sm:h-6" />}
        </button>
        
        <button
          onClick={handleNext}
          className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all"
          aria-label="Next package"
        >
          <ChevronRightIcon size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Desktop Layout */}
        <div className="hidden md:block relative w-full h-full">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="w-80 opacity-0 pointer-events-none"></div>
          </div>

          {/* Circular Cards */}
          {packages.map((pkg, index) => {
            const position = getCardPosition(index);
            const isActive = index === activeIndex;
            
            return (
              <button
                key={pkg._id || pkg.id || index}
                onClick={() => handleCardClick(index)}
                className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out ${
                  isActive ? 'cursor-default' : 'cursor-pointer hover:scale-110'
                }`}
                style={{
                  transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${position.scale})`,
                  opacity: position.opacity,
                  zIndex: position.zIndex,
                  width: isActive ? '320px' : '200px',
                }}
              >
                <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform duration-300`}>
                  <div className={`rounded-2xl overflow-hidden border-2 ${
                    isActive 
                      ? 'border-orange-500 shadow-2xl scale-110' 
                      : 'border-gray-200 shadow-lg'
                  } transition-all duration-300`}>
                    <div className="relative">
                      <div className="h-32 overflow-hidden">
                        <img
                          src={pkg.imageUrl || pkg.image || pkg.images?.[0] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400"}
                          alt={`${pkg.title} tour package in ${pkg.location || pkg.destination}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      </div>
                      
                      <div className="p-4 bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-900 text-sm truncate">{pkg.title}</h3>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-bold">4.5</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
                          <MapPin size={10} />
                          <span className="truncate">{pkg.location || pkg.destination}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={10} />
                            <span>{pkg.days || pkg.duration} days</span>
                          </div>
                          <div className="text-sm font-bold text-orange-600 flex-shrink-0">
                            ₹{pkg.priceFrom?.toLocaleString() || pkg.price?.toLocaleString() || "Custom"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden relative w-full h-full">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-56 sm:w-64">
            {activePackage && (
              <div className="rounded-2xl overflow-hidden border-2 border-orange-500 shadow-2xl">
                <div className="relative">
                  <div className="h-32 sm:h-40 overflow-hidden">
                    <img
                      src={activePackage.imageUrl || activePackage.image || activePackage.images?.[0] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400"}
                      alt={`${activePackage.title} tour package`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="p-3 sm:p-4 bg-white">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate pr-2">{activePackage.title}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-sm">4.5</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm mb-3">
                      <MapPin size={14} />
                      <span className="truncate">{activePackage.location || activePackage.destination}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                        <Clock size={14} />
                        <span>{activePackage.days || activePackage.duration} days</span>
                      </div>
                      <div className="text-base sm:text-lg font-bold text-orange-600">
                        ₹{activePackage.priceFrom?.toLocaleString() || activePackage.price?.toLocaleString() || "Custom"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side Cards for Mobile */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between px-2">
            {packages.map((pkg, index) => {
              if (index === activeIndex) return null;
              if (Math.abs(index - activeIndex) > 1) return null;
              
              const isLeft = index < activeIndex;
              
              return (
                <button
                  key={pkg._id || pkg.id || index}
                  onClick={() => handleCardClick(index)}
                  className="z-20"
                  style={{
                    opacity: 0.7,
                    transform: `scale(0.7)`,
                  }}
                >
                  <div className={`w-28 sm:w-36 rounded-xl overflow-hidden border border-gray-200 shadow-lg ${isLeft ? 'mr-auto' : 'ml-auto'}`}>
                    <div className="h-16 sm:h-20 overflow-hidden">
                      <img
                        src={pkg.imageUrl || pkg.image || pkg.images?.[0] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400"}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <h4 className="font-bold text-gray-900 text-xs truncate">{pkg.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-xs text-gray-500">{pkg.days || pkg.duration}d</div>
                        <div className="text-xs font-bold text-orange-600 truncate">
                          ₹{pkg.priceFrom?.toLocaleString() || pkg.price?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Package Details */}
      {activePackage && (
        <div className="mt-8 sm:mt-12 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              {activePackage.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {activePackage.description}
            </p>
            
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-6 sm:mb-8">
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full">
                <MapPin size={14} className="sm:w-4 sm:h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">{activePackage.location || activePackage.destination}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-50 to-pink-50 rounded-full">
                <Clock size={14} className="sm:w-4 sm:h-4 text-orange-600" />
                <span className="text-xs sm:text-sm font-medium">{activePackage.days || activePackage.duration} days</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full">
                <Users size={14} className="sm:w-4 sm:h-4 text-green-600" />
                <span className="text-xs sm:text-sm font-medium">{activePackage.tag || "All Groups"}</span>
              </div>
            </div>
            
            <a
              href={`https://wa.me/916371106588?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(activePackage.title)}%20package`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <MessageCircle size={18} className="sm:w-5 sm:h-5" />
              Enquire About This Package
              <ChevronRightIcon size={18} className="sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      )}

      {/* Package Indicators */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
        {packages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`transition-all ${
              index === activeIndex 
                ? 'w-4 sm:w-6 h-1.5 sm:h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full' 
                : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-300 hover:bg-gray-400 rounded-full'
            }`}
            aria-label={`Go to package ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ================= PACKAGE ENQUIRY FORM COMPONENT =================

const PackageEnquiryForm = ({ selectedPackage, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travellers: "1",
    budget: "",
    travelDate: "",
    message: "",
    packageName: selectedPackage?.title || ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      if (!formData.name || !formData.phone) {
        throw new Error('Please fill in all required fields');
      }

      const enquiryData = {
        name: formData.name,
        service: `Tour Package: ${formData.packageName}`,
        phone: formData.phone,
        email: formData.email || '',
        details: `Package: ${formData.packageName}
Travelers: ${formData.travellers}
Budget: ₹${formData.budget || 'Not specified'}
Travel Date: ${formData.travelDate || 'Not specified'}
Message: ${formData.message || 'No additional message'}`,
        source: "packages_page"
      };

      console.log('Submitting package enquiry:', enquiryData);

      const response = await API.post("/enquiry", enquiryData);
      
      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Package enquiry submitted successfully! Our travel expert will contact you within 1-2 hours.'
        });

        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            travellers: "1",
            budget: "",
            travelDate: "",
            message: "",
            packageName: selectedPackage?.title || ""
          });
          if (onClose) onClose();
        }, 2000);
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-orange-600 to-pink-600 text-white p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Enquire About This Package</h3>
            <p className="text-orange-100 text-xs sm:text-sm truncate max-w-[200px] sm:max-w-full">{selectedPackage?.title}</p>
          </div>
          {onClose && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-white hover:text-orange-200 p-1"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </motion.button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <AnimatePresence>
          {submitStatus.type && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-3 sm:p-4 ${submitStatus.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-xl`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                )}
                <p className={`text-xs sm:text-sm ${submitStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                  {submitStatus.message}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
          <div className="flex items-center gap-2 sm:gap-3">
            <PackageIcon className="text-orange-500 flex-shrink-0" size={18} />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{selectedPackage?.title}</p>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{selectedPackage?.location || selectedPackage?.destination} • {selectedPackage?.days || selectedPackage?.duration} days</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 sm:pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Your full name"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-9 sm:pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="10-digit mobile number"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 sm:pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Number of Travelers
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <select
                name="travellers"
                value={formData.travellers}
                onChange={handleChange}
                className="w-full pl-9 sm:pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Budget (per person)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full pl-9 sm:pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., ₹25,000"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Preferred Travel Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                className="w-full pl-9 sm:pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Additional Requirements
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400" size={14} />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full pl-9 sm:pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Any special requests, dietary requirements, or additional information..."
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
              Submit Package Enquiry
            </>
          )}
        </motion.button>

        <div className="text-center pt-1 sm:pt-2">
          <p className="text-xs text-gray-500">
            <Shield className="inline mr-1" size={10} />
            Your information is secure. We'll contact you within 1-2 hours.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

// ================= COMPONENTS =================

const HeroSection = ({ scrollToPackages, scrollToCarousel }) => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white overflow-hidden w-full">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-orange-500/10"></div>
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-orange-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-24">
        <div className="w-full">
          <div className="text-center max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-3 mb-4 sm:mb-6"
            >
              <Sparkles size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-300" />
              <span className="text-xs sm:text-sm lg:text-base font-medium">India Tour Packages & Holiday Deals</span>
            </motion.div>
          
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 lg:mb-10 leading-tight"
            >
              Discover Amazing
              <span className="block text-orange-300 mt-2 sm:mt-3 lg:mt-4">India Tour Packages</span>
            </motion.h1>
          
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto px-4"
            >
              Choose from our curated tour packages to Kashmir, Goa, Kerala, Rajasthan, Ladakh, and Himachal. Customizable itineraries, best prices, and expert travel assistance.
            </motion.p>
          
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center mb-8 sm:mb-10 lg:mb-12 px-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToCarousel}
                className="group relative bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-sm sm:text-base lg:text-lg xl:text-xl flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                <Globe className="relative z-10 group-hover:animate-pulse" size={18} /> 
                <span className="relative z-10">View Tour Packages</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToPackages}
                className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-sm sm:text-base lg:text-lg xl:text-xl flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                <Grid className="relative z-10 group-hover:animate-pulse" size={18} /> 
                <span className="relative z-10">Browse All Packages</span>
              </motion.button>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/916371106588?text=Hi%20GoTravio,%20I'm%20interested%20in%20custom%20tour%20packages"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-sm sm:text-base lg:text-lg xl:text-xl flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                <MessageCircle className="relative z-10" size={18} /> 
                <span className="relative z-10">Custom Trip Enquiry</span>
              </motion.a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto px-4"
            >
              {[
                { icon: <Award size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />, text: "6+ Curated Packages", color: "text-yellow-400" },
                { icon: <Shield size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />, text: "Best Price Guarantee", color: "text-green-400" },
                { icon: <Star size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />, text: "4.8+ Rating", color: "text-pink-400" },
                { icon: <Clock size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />, text: "24/7 Support", color: "text-blue-400" },
              ].map((badge, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-2 sm:gap-3 lg:gap-4 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10"
                >
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                    className={`${badge.color} flex-shrink-0`}
                  >
                    {badge.icon}
                  </motion.div>
                  <span className="text-xs sm:text-sm lg:text-base font-medium truncate">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Grid = ({ size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

// Package Type Filters Component
const PackageTypeFilter = ({ activeFilter, setActiveFilter, packages }) => {
  const totalPackages = packages.length;
  
  const domesticPackages = packages.filter(pkg => {
    const location = (pkg.location || pkg.destination || '').toLowerCase();
    return location.includes('india') || 
           location.includes('kashmir') || 
           location.includes('goa') || 
           location.includes('kerala') || 
           location.includes('rajasthan') || 
           location.includes('ladakh') || 
           location.includes('himachal') ||
           location.includes('agra') ||
           location.includes('jaipur') ||
           location.includes('varanasi') ||
           location.includes('mysore');
  }).length;

  const internationalPackages = totalPackages - domesticPackages;

  const honeymoonPackages = packages.filter(pkg => 
    (pkg.tag || pkg.category || '').toLowerCase() === 'honeymoon'
  ).length;

  const adventurePackages = packages.filter(pkg => 
    (pkg.tag || pkg.category || '').toLowerCase() === 'adventure'
  ).length;

  const familyPackages = packages.filter(pkg => 
    (pkg.tag || pkg.category || '').toLowerCase() === 'family'
  ).length;

  const filters = [
    { id: "all", label: "All Packages", icon: <Globe size={14} />, count: totalPackages },
    { id: "domestic", label: "Domestic Tours", icon: <MapPin size={14} />, count: domesticPackages },
    { id: "international", label: "International", icon: <Globe size={14} />, count: internationalPackages },
    { id: "honeymoon", label: "Honeymoon", icon: <Heart size={14} />, count: honeymoonPackages },
    { id: "adventure", label: "Adventure", icon: <Mountain size={14} />, count: adventurePackages },
    { id: "family", label: "Family", icon: <Users size={14} />, count: familyPackages },
  ];

  const [showAllFilters, setShowAllFilters] = useState(false);
  const visibleFilters = showAllFilters ? filters : filters.slice(0, 4);

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8 lg:mb-10">
      <div className="flex flex-wrap gap-2 lg:gap-3 justify-center">
        {visibleFilters.map((filter, index) => (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-1.5 sm:gap-2 lg:gap-3 px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-3 rounded-full transition-all text-xs sm:text-sm lg:text-base ${
              activeFilter === filter.id
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : `${getCardGradient(index)} text-gray-700 hover:bg-gray-50 border border-gray-200`
            }`}
          >
            <span className={activeFilter === filter.id ? "text-white" : getIconColor(index)}>
              {filter.icon}
            </span>
            <span className="font-medium">{filter.label}</span>
            <span className={`text-[10px] sm:text-xs lg:text-sm px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full ${
              activeFilter === filter.id 
                ? "bg-white/20 text-white" 
                : `${getCardGradient(index)} text-gray-600`
            }`}>
              {filter.count}
            </span>
          </motion.button>
        ))}
      </div>
      
      {filters.length > 4 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAllFilters(!showAllFilters)}
          className="text-xs sm:text-sm lg:text-base text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
        >
          {showAllFilters ? 'Show Less' : `+${filters.length - 4} More Filters`}
          <ChevronRightIcon size={14} className={`transform transition-transform ${showAllFilters ? 'rotate-90' : ''}`} />
        </motion.button>
      )}
    </div>
  );
};

// QuickStats Component
const QuickStats = ({ packages }) => {
  const totalPackages = packages.length;
  const uniqueDestinations = [...new Set(packages.map(pkg => pkg.location || pkg.destination))].length;

  const stats = [
    { 
      value: totalPackages + "+", 
      label: "Curated Packages",
      icon: <Globe size={18} />,
      desc: "Domestic & international"
    },
    { 
      value: uniqueDestinations + "+", 
      label: "Destinations",
      icon: <MapPin size={18} />,
      desc: "Across India & abroad"
    },
    { 
      value: "95%", 
      label: "Satisfaction",
      icon: <Star size={18} />,
      desc: "Rated 4.5+ stars"
    },
    { 
      value: "Custom", 
      label: "Trip Planning",
      icon: <Sparkles size={18} />,
      desc: "Fully personalized"
    },
  ];

  return (
    <AnimatedSection direction="left">
      <div className="w-full bg-white py-8 sm:py-12 lg:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={() => {}}
                onHoverEnd={() => {}}
                className={`group relative ${getCardGradient(idx)} rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 xl:p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex flex-col xs:flex-row items-center xs:items-start gap-2 sm:gap-3 lg:gap-4 mb-1 sm:mb-2 lg:mb-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`p-1.5 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl lg:rounded-2xl flex-shrink-0 ${getIconColor(idx)}`}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-center xs:text-left">
                    <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">{stat.label}</div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 text-center xs:text-left">{stat.desc}</p>
                
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-indigo-500 rounded-xl sm:rounded-2xl lg:rounded-3xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// ================= PACKAGE CARD COMPONENT =================

const PackageCard = ({ pkg, onEnquire, index }) => {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleEnquire = () => {
    setShowEnquiryForm(true);
    if (onEnquire) onEnquire(pkg);
  };

  return (
    <>
      <AnimatedCard index={index}>
        <motion.div
          whileHover={{ y: -8 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          className={`group relative ${getCardGradient(index)} rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500`}
        >
          <div className="relative h-48 sm:h-56 lg:h-72 overflow-hidden">
            <motion.img
              animate={hovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.7 }}
              src={pkg.imageUrl || pkg.image || pkg.images?.[0] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200"}
              alt={`${pkg.title} - Tour package in ${pkg.location || pkg.destination}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <motion.div 
              animate={hovered ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-3 sm:top-4 lg:top-5 left-3 sm:left-4 lg:left-5"
            >
              <span className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-gradient-to-r from-orange-600 to-pink-600 text-white text-[10px] sm:text-xs lg:text-sm font-bold rounded-full shadow-lg">
                {pkg.tag || pkg.category || "Popular Package"}
              </span>
            </motion.div>

            <motion.div 
              animate={hovered ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 sm:bottom-4 lg:bottom-5 left-3 sm:left-4 lg:left-5"
            >
              <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-[10px] sm:text-xs lg:text-sm">
                <Clock size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                <span>{pkg.days || pkg.duration} days</span>
              </div>
            </motion.div>
          </div>

          <div className="p-4 sm:p-5 lg:p-6 xl:p-8">
            <div className="flex items-start justify-between mb-2 sm:mb-3 lg:mb-4">
              <div className="min-w-0 flex-1 pr-2">
                <h3 className="font-bold text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors truncate">
                  {pkg.title}
                </h3>
                <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 text-gray-600 text-xs sm:text-sm lg:text-base">
                  <MapPin size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                  <span className="truncate">{pkg.location || pkg.destination}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-gray-900 text-xs sm:text-sm lg:text-base">4.5</span>
              </div>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 lg:mb-5 line-clamp-2">
              {pkg.description || `Experience amazing ${pkg.location || 'destinations'} with our expertly curated package.`}
            </p>

            <div className="flex flex-col xs:flex-row xs:items-center justify-between pt-3 sm:pt-4 lg:pt-5 border-t border-gray-100 gap-2 xs:gap-0">
              <div>
                <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">
                  ₹{pkg.priceFrom?.toLocaleString() || pkg.price?.toLocaleString() || "On Request"}
                </div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-gray-500">per person</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnquire}
                className="w-full xs:w-auto px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium text-xs sm:text-sm lg:text-base flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 transition-all shadow-md hover:shadow-xl"
              >
                <MessageCircle size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                Enquire Now
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={hovered ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-indigo-500 rounded-2xl sm:rounded-3xl lg:rounded-4xl"
          />
        </motion.div>
      </AnimatedCard>

      <AnimatePresence>
        {showEnquiryForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
          >
            <PackageEnquiryForm 
              selectedPackage={pkg}
              onClose={() => setShowEnquiryForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ================= CUSTOM PACKAGE CTA =================

const CustomPackageCTA = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <AnimatedSection direction="right">
        <section className="w-full py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden shadow-2xl"
            >
              <div className="grid lg:grid-cols-2 items-center">
                <div className="p-6 sm:p-8 lg:p-10 xl:p-12 text-white">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-3 mb-4 sm:mb-6">
                    <Sparkles size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-300" />
                    <span className="text-xs sm:text-sm lg:text-base font-medium">Custom Trip Planning</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4">
                    Don't See What You're Looking For?
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
                    Let our travel experts design a completely personalized itinerary tailored to your preferences, budget, and schedule.
                  </p>
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {[
                      "100% Customizable itineraries",
                      "Flexible dates & destinations",
                      "Personal travel consultant",
                      "Best price guarantee"
                    ].map((feature, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 text-green-300 flex-shrink-0" />
                        <span className="text-xs sm:text-sm lg:text-base">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-6 sm:p-8 lg:p-10 xl:p-12">
                  <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Request Custom Package</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(true)}
                    className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white py-2.5 sm:py-3 lg:py-4 rounded-lg font-medium text-sm sm:text-base lg:text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    Get Custom Quote
                  </motion.button>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-3 sm:mt-4 text-center">
                    Our travel expert will contact you within 1 hour
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-md my-4 sm:my-8"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Custom Package Request</h3>
                      <p className="text-indigo-100 text-xs sm:text-sm">Tell us your dream trip details</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowForm(false)}
                      className="text-white hover:text-indigo-200 p-1"
                    >
                      <X size={18} className="sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://wa.me/916371106588?text=Hi,%20I%20want%20a%20custom%20travel%20package.%20Please%20contact%20me."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 mb-3 sm:mb-4 shadow-md hover:shadow-xl"
                  >
                    <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                    WhatsApp for Custom Package
                  </motion.a>
                  
                  <p className="text-xs sm:text-sm text-gray-600 text-center">
                    For custom packages, we prefer to discuss details directly on WhatsApp for better planning.
                  </p>
                  
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <Phone className="inline mr-1.5 sm:mr-2 text-gray-400" size={14} />
                      <span className="text-xs sm:text-sm text-gray-600">Or call: +91 90238 84833</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ================= IMAGE CAROUSEL SECTION =================

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // HD Travel Images Array - Top visited places with tags
  const travelImages = [
    {
      url: "/taj.png",
      location: "Agra, Uttar Pradesh",
      description: "A global icon of love, history, and architectural brilliance.",
      alt: "Taj Mahal in Agra - popular tourist destination"
    },
    {
      url: "/citypalace.png",
      location: "Jaipur, Rajasthan",
      description: "Where Rajput grandeur and royal heritage come alive.",
      alt: "City Palace Jaipur - Rajasthan heritage tour"
    },
    {
      url: "/kerla.png",
      location: "Alleppey, Kerala",
      description: "A serene web of lakes and lagoons, ideal for houseboat journeys.",
      alt: "Kerala backwaters houseboat tour"
    },
    {
      url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop",
      location: "Goa",
      description: "Golden beaches, electric nights, and timeless Portuguese influence.",
      alt: "Goa beaches - popular beach holiday destination"
    },
    {
      url: "/leh.png",
      location: "Ladakh",
      description: "Where rugged Himalayan beauty meets spiritual calm.",
      alt: "Ladakh mountains - adventure tour package"
    },
    {
      url: "/banaras.png",
      location: "Varanasi, Uttar Pradesh",
      description: "Where the Ganges flows through centuries of faith and ritual.",
      alt: "Varanasi Ganga Aarti - spiritual tour"
    },
    {
      url: "/Mysore.jpg",
      location: "Mysore, Karnataka",
      description: "A breathtaking display of royal grandeur lit up for festive evenings.",
      alt: "Mysore Palace - heritage tour package"
    }
  ];

  // Auto-slide carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === travelImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedSection direction="left">
      <section className="w-full bg-gradient-to-b from-white to-gray-50 py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full px-4 sm:px-5 py-2 sm:py-3 mb-3 sm:mb-4">
              <Camera size={16} className="text-indigo-500" />
              <span className="text-sm sm:text-base lg:text-lg font-medium text-indigo-700">Top Tour Destinations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
              Most Visited <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Places in India</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the most popular destinations that travelers love the most
            </p>
          </motion.div>

          <div className="relative rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden shadow-2xl">
            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[550px] w-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={travelImages[currentImageIndex].url}
                  alt={travelImages[currentImageIndex].alt}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 xl:p-10 text-white"
              >
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 sm:py-1.5 mb-2 sm:mb-3">
                  <MapPin size={12} className="sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                  <span className="text-[10px] sm:text-xs lg:text-sm font-medium">{travelImages[currentImageIndex].location}</span>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2">
                  {travelImages[currentImageIndex].location.split(',')[0]}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-200 max-w-2xl">
                  {travelImages[currentImageIndex].description}
                </p>
              </motion.div>

              {/* Carousel Indicators */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                {travelImages.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'w-6 sm:w-8 bg-white' 
                        : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

// ================= FAQ SECTION =================

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How do I book a tour package with GoTravio?",
      answer: "Booking a tour package is simple! You can browse through our packages, click on 'Enquire Now' for any package you're interested in, fill out the enquiry form, and our travel expert will contact you within 1-2 hours. Alternatively, you can WhatsApp us directly for instant assistance."
    },
    {
      question: "Can I customize a package to suit my preferences?",
      answer: "Absolutely! We specialize in creating fully customized itineraries. Whether you want to modify an existing package or create a completely new one, our travel experts will work with you to design the perfect trip tailored to your preferences, budget, and schedule."
    },
    {
      question: "What is included in the package price?",
      answer: "Our package prices typically include accommodation, meals as specified in the itinerary, transportation during the tour, sightseeing as per the plan, and the services of a tour guide. However, each package may have different inclusions. Please check the package details or contact us for specific information."
    },
    {
      question: "What is your cancellation and refund policy?",
      answer: "Our cancellation policy varies depending on the package and how far in advance you cancel. Generally, cancellations made 30+ days before departure receive a full refund minus processing fees. For cancellations within 30 days, partial refunds may apply. Please check the specific package terms or contact us for details."
    },
    {
      question: "Can I book a package for solo travel?",
      answer: "Yes, we welcome solo travelers! Many of our packages are suitable for solo travelers, and we can also help you connect with other solo travelers if you prefer group tours. We offer special solo traveler options with no single supplement on select packages."
    },
    {
      question: "How do I make payment for my booking?",
      answer: "We accept multiple payment methods including bank transfers, UPI (Google Pay, PhonePe, Paytm). After your enquiry, we'll send you payment instructions with secure payment options."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <AnimatedSection direction="right">
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full px-4 sm:px-5 py-2 sm:py-3 mb-3 sm:mb-4">
              <HelpCircle size={16} className="text-indigo-500" />
              <span className="text-sm sm:text-base lg:text-lg font-medium text-indigo-700">Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Questions</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our tour packages and booking process
            </p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${getCardGradient(index)} rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} className={`${getIconColor(index)} flex-shrink-0`} />
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full px-4 sm:px-6 py-3 sm:py-4">
              <MessageCircle size={18} className="text-indigo-600" />
              <span className="text-xs sm:text-sm lg:text-base text-gray-700">
                Still have questions?{" "}
                <a
                  href="https://wa.me/916371106588"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-semibold hover:text-indigo-700 underline"
                >
                  WhatsApp us
                </a>{" "}
                for instant answers
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
};

// ================= 6 DEMO PACKAGES =================

const getDemoPackages = () => [
  {
    _id: "1",
    title: "Kashmir Paradise Tour",
    location: "Srinagar, Gulmarg, Pahalgam",
    description: "Experience the beauty of Kashmir with houseboat stays, shikara rides, and snow adventures in the Himalayas.",
    days: 7,
    priceFrom: 25000,
    tag: "Honeymoon Package",
    imageUrl: "https://media.istockphoto.com/id/498628231/photo/lake-of-blue-water.webp?a=1&b=1&s=612x612&w=0&k=20&c=JWajlJmK-qq7ITeu1m0KJeqA-hUu731rQpgJ3g2rAyY=",
    highlights: ["Houseboat Stay", "Shikara Ride", "Skiing in Gulmarg", "Pahalgam Valley"]
  },
  {
    _id: "2",
    title: "Goa Beach Holiday",
    location: "North Goa, South Goa",
    description: "Sun, sand, and Portuguese heritage with beach shacks, water sports, and vibrant nightlife.",
    days: 5,
    priceFrom: 18000,
    tag: "Beach Package",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200",
    highlights: ["Beach Hopping", "Water Sports", "Portuguese Churches", "Nightlife"]
  },
  {
    _id: "3",
    title: "Kerala Backwaters Tour",
    location: "Alleppey, Munnar, Kochi",
    description: "Houseboat cruise through backwaters, tea plantations, and Ayurvedic wellness treatments.",
    days: 6,
    priceFrom: 22000,
    tag: "Wellness Package",
    imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=1200",
    highlights: ["Houseboat Stay", "Tea Plantations", "Ayurvedic Spa", "Kathakali Show"]
  },
  {
    _id: "4",
    title: "Rajasthan Royal Heritage",
    location: "Jaipur, Udaipur, Jodhpur",
    description: "Palaces, forts, desert safaris, and cultural experiences in royal Rajasthan.",
    days: 8,
    priceFrom: 28000,
    tag: "Heritage Package",
    imageUrl: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=600&auto=format&fit=crop&q=60",
    highlights: ["Palace Stay", "Desert Safari", "Folk Performances", "Shopping"]
  },
  {
    _id: "5",
    title: "Ladakh Adventure Tour",
    location: "Leh, Nubra Valley, Pangong",
    description: "High altitude lakes, monasteries, mountain passes, and adventure activities in Ladakh.",
    days: 9,
    priceFrom: 32000,
    tag: "Adventure Package",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200",
    highlights: ["Pangong Lake", "Monastery Tour", "Mountain Biking", "Camping"]
  },
  {
    _id: "6",
    title: "Himachal Hill Stations",
    location: "Shimla, Manali, Dharamshala",
    description: "Hill stations, mountain views, adventure sports, and Tibetan culture experiences.",
    days: 7,
    priceFrom: 24000,
    tag: "Family Package",
    imageUrl: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGltYWNoYWx8ZW58MHx8MHx8fDA%3D0",
    highlights: ["Toy Train", "Skiing", "Tibetan Culture", "River Rafting"]
  }
];

// ================= MAIN COMPONENT =================

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [error, setError] = useState(null);

  // References for scroll animations
  const statsRef = useRef(null);
  const carouselRef = useRef(null);
  const packagesRef = useRef(null);
  const ctaRef = useRef(null);
  const imageCarouselRef = useRef(null);
  const faqRef = useRef(null);

  // FAQ data for schema
  const faqs = [
    {
      question: "How do I book a tour package with GoTravio?",
      answer: "Booking a tour package is simple! You can browse through our packages, click on 'Enquire Now' for any package you're interested in, fill out the enquiry form, and our travel expert will contact you within 1-2 hours. Alternatively, you can WhatsApp us directly for instant assistance."
    },
    {
      question: "Can I customize a package to suit my preferences?",
      answer: "Absolutely! We specialize in creating fully customized itineraries. Whether you want to modify an existing package or create a completely new one, our travel experts will work with you to design the perfect trip tailored to your preferences, budget, and schedule."
    },
    {
      question: "What is included in the package price?",
      answer: "Our package prices typically include accommodation, meals as specified in the itinerary, transportation during the tour, sightseeing as per the plan, and the services of a tour guide. However, each package may have different inclusions. Please check the package details or contact us for specific information."
    },
    {
      question: "What is your cancellation and refund policy?",
      answer: "Our cancellation policy varies depending on the package and how far in advance you cancel. Generally, cancellations made 30+ days before departure receive a full refund minus processing fees. For cancellations within 30 days, partial refunds may apply. Please check the specific package terms or contact us for details."
    }
  ];

  // Schema.org structured data for tour packages
  const packagesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": packages.map((pkg, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TouristTrip",
        "name": pkg.title,
        "description": pkg.description,
        "touristType": pkg.tag,
        "itinerary": {
          "@type": "ItemList",
          "itemListElement": (pkg.highlights || []).map((highlight, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "TouristDestination",
              "name": highlight
            }
          }))
        },
        "offers": {
          "@type": "Offer",
          "price": (pkg.priceFrom || pkg.price || 25000).toString().replace(/,/g, ''),
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
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

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Fetching packages from API...");
        
        const response = await API.get("/packages");
        console.log("API Response status:", response.status);
        console.log("API Response data:", response.data);
        
        if (response.data && Array.isArray(response.data)) {
          const transformedPackages = response.data.map(pkg => ({
            _id: pkg._id || pkg.id || Math.random().toString(36).substr(2, 9),
            id: pkg.id || pkg._id || Math.random().toString(36).substr(2, 9),
            title: pkg.title || "Untitled Package",
            location: pkg.location || pkg.destination || "Unknown Location",
            destination: pkg.destination || pkg.location || "Unknown Destination",
            description: pkg.description || `${pkg.title} - Experience amazing destinations`,
            days: pkg.days || pkg.duration || 5,
            duration: pkg.duration || pkg.days || 5,
            priceFrom: pkg.priceFrom || pkg.price || 10000,
            price: pkg.price || pkg.priceFrom || 10000,
            tag: pkg.tag || pkg.category || "Popular",
            category: pkg.category || pkg.tag || "Popular",
            imageUrl: pkg.imageUrl || pkg.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200",
            image: pkg.image || pkg.imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200",
            images: pkg.images || [pkg.imageUrl] || ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200"],
            highlights: pkg.highlights || ["Scenic Views", "Cultural Experience", "Comfortable Stay"]
          }));
          
          setPackages(transformedPackages);
          setFilteredPackages(transformedPackages);
          console.log("Packages loaded from backend:", transformedPackages.length);
          
          if (transformedPackages.length === 0) {
            console.log("No packages from backend, loading demo data");
            loadDemoPackages();
          }
        } else {
          console.log("Invalid response format, loading demo data");
          loadDemoPackages();
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
        console.log("Error details:", error.response?.data);
        setError(`Failed to load packages from server: ${error.message}`);
        
        loadDemoPackages();
      } finally {
        setIsLoading(false);
      }
    };

    const loadDemoPackages = () => {
      const demoPackages = getDemoPackages();
      setPackages(demoPackages);
      setFilteredPackages(demoPackages);
      console.log("Using demo packages:", demoPackages.length);
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    let filtered = packages;
    
    if (activeFilter !== "all") {
      if (activeFilter === "domestic") {
        filtered = filtered.filter(pkg => {
          const location = (pkg.location || pkg.destination || '').toLowerCase();
          return location.includes('india') || 
                 location.includes('kashmir') || 
                 location.includes('goa') || 
                 location.includes('kerala') || 
                 location.includes('rajasthan') || 
                 location.includes('ladakh') || 
                 location.includes('himachal') ||
                 location.includes('agra') ||
                 location.includes('jaipur') ||
                 location.includes('varanasi') ||
                 location.includes('mysore');
        });
      } else if (activeFilter === "international") {
        filtered = filtered.filter(pkg => {
          const location = (pkg.location || pkg.destination || '').toLowerCase();
          return !(location.includes('india') || 
                   location.includes('kashmir') || 
                   location.includes('goa') || 
                   location.includes('kerala') || 
                   location.includes('rajasthan') || 
                   location.includes('ladakh') || 
                   location.includes('himachal') ||
                   location.includes('agra') ||
                   location.includes('jaipur') ||
                   location.includes('varanasi') ||
                   location.includes('mysore'));
        });
      } else {
        filtered = filtered.filter(pkg => 
          (pkg.tag || pkg.category || '').toLowerCase() === activeFilter.toLowerCase()
        );
      }
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(pkg => 
        pkg.title?.toLowerCase().includes(term) ||
        pkg.location?.toLowerCase().includes(term) ||
        pkg.description?.toLowerCase().includes(term) ||
        pkg.tag?.toLowerCase().includes(term)
      );
    }
    
    setFilteredPackages(filtered);
  }, [packages, activeFilter, searchTerm]);

  const scrollToPackages = () => {
    document.getElementById('packages-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCarousel = () => {
    document.getElementById('circular-carousel')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnquireClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowEnquiryForm(true);
  };

  return (
    <>
      <SEO 
        title="India Tour Packages | Custom Travel Packages & Holiday Deals - GoTravio"
        description="Explore our curated India tour packages including Kashmir, Goa, Kerala, Rajasthan, Ladakh, and Himachal. Customizable itineraries, best prices, and expert travel assistance. Book your dream vacation today!"
        keywords="India tour packages, holiday packages India, Kashmir tour package, Goa holiday package, Kerala backwaters tour, Rajasthan heritage tour, Ladakh adventure tour, Himachal tour, family vacation packages, honeymoon packages, GoTravio tours"
        canonicalUrl="/packages"
        ogImage="https://gotravio.com/packages-og-image.jpg"
        schemaData={[packagesSchema, faqSchema]}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white w-full overflow-x-hidden">
        <HeroSection scrollToPackages={scrollToPackages} scrollToCarousel={scrollToCarousel} />
        
        <div ref={statsRef}>
          <QuickStats packages={packages} />
        </div>
        
        {/* Circular Carousel Section - ⚠️ UNTOUCHED - NO CHANGES MADE ⚠️ */}
        <section id="circular-carousel" ref={carouselRef} className="w-full py-10 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-indigo-50/30 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-3 mb-3 sm:mb-4">
              <Sparkles size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-indigo-500" />
              <span className="text-xs sm:text-sm lg:text-base font-medium text-indigo-700">Featured Tour Packages</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 px-4">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Top India Destinations</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Browse through our most popular tour packages with interactive circular carousel
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12 sm:py-16 md:py-20 px-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-indigo-600"></div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">Loading amazing packages...</p>
            </div>
          ) : packages.length > 0 ? (
            <CircularCarousel packages={packages.slice(0, 6)} />
          ) : (
            <div className="text-center py-8 sm:py-10 md:py-12 px-4">
              <Globe size={48} className="sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto text-gray-300 mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-gray-600">No packages available yet</p>
            </div>
          )}
        </section>
        
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 mt-4 sm:mt-6 lg:mt-8">
          <PackageTypeFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} packages={packages} />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 lg:left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search packages by destination, theme, or duration..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 lg:pl-14 pr-4 py-2.5 sm:py-3 lg:py-4 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm sm:text-base lg:text-lg shadow-sm"
            />
          </div>
        </div>
        
        <AnimatePresence>
          {error && (
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 mb-6 sm:mb-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-yellow-700">
                  ⚠️ {error}. Showing demo packages. Check if backend is running on port 5000.
                </p>
              </div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Packages Grid Section */}
        <section id="packages-grid" ref={packagesRef} className="w-full py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            {filteredPackages.length === 0 ? (
              <div className="text-center py-10 sm:py-12 md:py-16 bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl border border-gray-200/50 px-4">
                <Globe size={48} className="sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto text-gray-300 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">No packages found</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
                  {searchTerm 
                    ? `No packages match "${searchTerm}". Try a different search or browse all packages.`
                    : "Packages will be added soon. Contact us for custom trip planning."
                  }
                </p>
                <div className="flex flex-col xs:flex-row gap-3 justify-center px-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveFilter("all");
                      setSearchTerm("");
                    }}
                    className="w-full xs:w-auto px-5 sm:px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium text-sm sm:text-base"
                  >
                    View All Packages
                  </motion.button>
                  <a
                    href="https://wa.me/916371106588"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full xs:w-auto px-5 sm:px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                    WhatsApp for Custom Trip
                  </a>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">
                      All Tour Packages
                    </h2>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600">
                      {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''} found
                      {packages.length === getDemoPackages().length && " (Demo Data)"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 w-full xs:w-auto">
                    <span className="text-xs sm:text-sm lg:text-base text-gray-500 whitespace-nowrap">Sort by:</span>
                    <select className="w-full xs:w-auto px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 text-xs sm:text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                      <option>Popularity</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Duration</option>
                    </select>
                  </div>
                </div>
                
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8"
                >
                  {filteredPackages.map((pkg, index) => (
                    <PackageCard key={pkg._id} pkg={pkg} onEnquire={handleEnquireClick} index={index} />
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </section>

        <div ref={ctaRef}>
          <CustomPackageCTA />
        </div>
        
        <div ref={imageCarouselRef}>
          <ImageCarousel />
        </div>
        
        <div ref={faqRef}>
          <FAQSection />
        </div>
        
        <AnimatePresence>
          {showEnquiryForm && selectedPackage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
            >
              <PackageEnquiryForm 
                selectedPackage={selectedPackage}
                onClose={() => {
                  setShowEnquiryForm(false);
                  setSelectedPackage(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Floating WhatsApp */}
        <motion.a
          href="https://wa.me/916371106588"
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

export default Packages;