import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SEO from "../components/SEO";
import {
  Phone,
  Shield,
  Users,
  ChevronRight,
  Car,
  Ticket,
  Package,
  Clock,
  MessageCircle,
  Headphones,
  CheckCircle,
  Zap,
  Heart,
  Search,
  FileText,
  User,
  Calendar,
  Mail,
  Send,
  AlertCircle,
  X,
  Star,
  ThumbsUp,
  Award,
  MapPin
} from "lucide-react";
import { API } from "../api.js";
import UniqueImagesSection from "../components/UniqueImagesSection";
import Carousel3DSection from "../components/Carousel3DSection";
import PhoneAnimationSection from "../components/PhoneAnimationSection";
import StackedCardCarousel from "../components/StackedCardCarousel";

// Add CSS as a string for global styles - using style tag in component
const FloatingStyles = () => (
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(-50%); }
      50% { transform: translateY(-10px) translateX(-50%); }
    }
    @media (min-width: 640px) {
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    }
    .float-animation {
      animation: float 3s ease-in-out infinite;
    }
  `}</style>
);

// Memoized components to prevent re-renders
const SectionHeading = memo(({ title, subtitle }) => (
  <div className="text-center mb-8 sm:mb-12 lg:mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4"
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto"
    >
      {subtitle}
    </motion.p>
  </div>
));

// Optimized 3D Card Component - Light Colors
const ServiceCard = memo(({ service, onClick, index }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  
  // Light background colors based on service type
  const getCardBg = () => {
    if (service.title.includes("Cab")) return "bg-gradient-to-br from-blue-50 to-cyan-50";
    if (service.title.includes("Ticket")) return "bg-gradient-to-br from-purple-50 to-pink-50";
    if (service.title.includes("Tour")) return "bg-gradient-to-br from-orange-50 to-yellow-50";
    return "bg-gradient-to-br from-indigo-50 to-blue-50";
  };
  
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    
    requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * 5;
      const rotateY = ((centerX - x) / centerX) * 5;
      
      setRotate({ x: rotateX, y: rotateY });
    });
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 50
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        transformStyle: "preserve-3d",
        perspective: 1000,
        transition: "transform 0.1s ease-out"
      }}
      onClick={onClick}
      className={`group rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg border border-slate-200 cursor-pointer transition-shadow hover:shadow-2xl ${getCardBg()}`}
    >
      <div className={`inline-flex p-3 sm:p-4 lg:p-5 rounded-xl bg-gradient-to-r ${service.color} text-white mb-4 sm:mb-6`}>
        {service.icon}
      </div>
      <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 text-slate-800">{service.title}</h3>
      <p className="text-slate-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">{service.desc}</p>
      <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
        {service.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-slate-700">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-indigo-700 font-semibold text-sm sm:text-base lg:text-lg">
        <span>Submit Enquiry</span>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
      </div>
    </motion.div>
  );
});

// Optimized Contact Option Component - Light Colors
const ContactOption = memo(({ option, index }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  
  // Light background colors
  const getContactBg = () => {
    if (option.title.includes("WhatsApp")) return "bg-gradient-to-br from-green-50 to-emerald-50";
    if (option.title.includes("Phone")) return "bg-gradient-to-br from-blue-50 to-indigo-50";
    if (option.title.includes("Email")) return "bg-gradient-to-br from-purple-50 to-violet-50";
    return "bg-gradient-to-br from-slate-50 to-gray-50";
  };
  
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    
    requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * 5;
      const rotateY = ((centerX - x) / centerX) * 5;
      
      setRotate({ x: rotateX, y: rotateY });
    });
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
  }, []);
  
  return (
    <motion.button
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 50
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        transformStyle: "preserve-3d",
        perspective: 1000,
        transition: "transform 0.1s ease-out"
      }}
      onClick={option.action}
      className={`group rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border-2 ${option.color} hover:shadow-xl transition-all text-left w-full ${getContactBg()}`}
    >
      <div className="inline-flex p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm mb-4 sm:mb-6">
        <div className="text-indigo-600">{option.icon}</div>
      </div>
      <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 text-slate-800">{option.title}</h3>
      <p className="text-slate-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">{option.desc}</p>
      <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
        {option.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base text-slate-700">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 sm:gap-2 text-indigo-700 font-semibold text-sm sm:text-base lg:text-lg">
        Connect Now
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
      </div>
    </motion.button>
  );
});

// Memoized Animated Section
const AnimatedSection = memo(({ children, delay = 0, className = "", direction = "left" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  
  const initialX = direction === "left" ? -100 : direction === "right" ? 100 : 0;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initialX }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 50 }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

const Home = () => {
  const [enquiryData, setEnquiryData] = useState({
    name: "",
    service: "",
    phone: "",
    details: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: ""
  });
  
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  // Carousel images data - memoized
  const carouselImages = useMemo(() => [
    {
      url: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1600",
      alt: "Travel consultant helping customer with travel planning in India",
      title: "Expert Travel Consultation"
    },
    {
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600",
      alt: "Beautiful travel destination in India - Himalayan mountains",
      title: "Himalayan Adventure"
    },
    {
      url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1600",
      alt: "Travel planning with map and compass for India tour",
      title: "Plan Your India Trip"
    },
    {
      url: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1600",
      alt: "Adventure travel in India - Trekking in mountains",
      title: "Adventure Tours India"
    },
    {
      url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=1600",
      alt: "Luxury travel in India - Premium travel experience",
      title: "Luxury Travel India"
    }
  ], []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Memoized data
  const homeSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "GoTravio Travels",
    "description": "India's premier travel assistance platform for cab rentals, train tickets, flight bookings, and custom tour packages.",
    "url": "https://gotravio.com",
    "logo": "https://gotravio.com/logo.png",
    "image": "https://gotravio.com/og-image.jpg",
    "telephone": "+91 90238 84833",
    "email": "gotravio.travel@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "India",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/gotravio",
      "https://www.instagram.com/gotravio",
      "https://twitter.com/gotravio"
    ],
    "openingHours": "Mo-Su 00:00-24:00",
    "priceRange": "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  }), []);

  const services = useMemo(() => [
    {
      icon: <Car className="w-7 h-7" />,
      title: "Cab & Vehicle Rentals",
      desc: "Assistance with local, outstation, and airport transfers across vehicle types.",
      features: ["Verified drivers", "Multiple vehicle options", "GPS tracking available"],
      link: "/cabs",
      color: "from-blue-600 to-cyan-500"
    },
    {
      icon: <Ticket className="w-7 h-7" />,
      title: "Ticket Assistance",
      desc: "Help with train, bus, and flight tickets including special quota requirements.",
      features: ["Normal & Tatkal", "All major airlines", "Seat selection help"],
      link: "/tickets",
      color: "from-purple-600 to-pink-500"
    },
    {
      icon: <Package className="w-7 h-7" />,
      title: "Tour Planning",
      desc: "Custom domestic and international tour packages with itinerary planning.",
      features: ["Tailored itineraries", "Accommodation help", "Activity planning"],
      link: "/packages",
      color: "from-orange-600 to-yellow-500"
    },
  ], []);

  const contactOptions = useMemo(() => [
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: "WhatsApp Chat",
      desc: "Quick responses for enquiries and document sharing",
      action: () => window.open('https://wa.me/919023884833?text=Hi%20GOTravio,%20I%20need%20travel%20assistance', '_blank'),
      features: ["Instant messaging", "File sharing", "Quick queries"],
      color: "border-green-200 bg-green-50 hover:bg-green-100"
    },
    {
      icon: <Phone className="w-7 h-7" />,
      title: "Phone Consultation",
      desc: "Detailed discussion for complex travel requirements",
      action: () => window.location.href = 'tel:+919023884833',
      features: ["Personal attention", "Detailed planning", "Clarification"],
      color: "border-blue-200 bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: "Email Support",
      desc: "Comprehensive planning with detailed itineraries",
      action: () => window.location.href = 'mailto:gotravio.travel@gmail.com?subject=Travel%20Assistance%20Enquiry&body=Hi%20GOTravio%20Team,%0A%0AI%20need%20assistance%20with%20my%20travel%20plans.%0A%0ARegards,%0A[Your%20Name]',
      features: ["Documented process", "Detailed responses", "Record keeping"],
      color: "border-purple-200 bg-purple-50 hover:bg-purple-100"
    },
  ], []);

  const processSteps = useMemo(() => [
    {
      step: "01",
      title: "Share Your Requirements",
      desc: "Tell us about your travel plans, dates, and preferences. The more details, the better we can assist you."
    },
    {
      step: "02",
      title: "Agent Review & Verification",
      desc: "Our experts check availability, compare options, and verify all details to ensure accuracy."
    },
    {
      step: "03",
      title: "Receive Options & Details",
      desc: "Get comprehensive information, including pricing, itineraries, and recommendations to make an informed decision."
    },
    {
      step: "04",
      title: "Proceed with Confidence",
      desc: "Once you're satisfied, we help you book with no hidden charges. We remain available for support throughout your journey."
    },
     {
    step: "05",
    title: "Post-Booking Support",
    desc: "We stay connected even after booking. Get real-time updates, travel tips, and 24/7 assistance during your journey."
  },
  {
  step: "06",
  title: "Share Your Feedback",
  desc: "After your journey, share your experience with us. Your feedback helps us improve and assist future travelers better."
}
  
  ], []);

  const whyBookReasons = useMemo(() => [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Personalized Assistance",
      desc: "Every enquiry is handled by a real travel expert who understands your needs and provides tailored solutions."
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Trust & Transparency",
      desc: "We believe in clear communication with no hidden fees. You'll know exactly what you're getting before you commit."
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Time-Saving",
      desc: "Let us do the research and legwork. We present you with the best options so you can focus on enjoying your trip."
    },
    {
      icon: <ThumbsUp className="w-7 h-7" />,
      title: "Verified Options",
      desc: "We only work with trusted partners and verified service providers to ensure quality and reliability."
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Experienced Team",
      desc: "Our team has years of experience in the travel industry, helping countless travelers with their plans."
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: "End-to-End Support",
      desc: "From the first enquiry to after your journey, we're here to assist you every step of the way."
    },
  ], []);

  const benefitsList = useMemo(() => [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Detailed Documentation",
      desc: "We provide clear records of all communications, options, and confirmations for your reference."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Risk Minimization",
      desc: "Our verification process helps avoid common travel pitfalls and ensures you deal with reliable providers."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Time Saving",
      desc: "We handle the research and coordination, saving you hours of browsing and calling."
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Quality Assurance",
      desc: "We personally vet services to ensure they meet our standards of comfort and reliability."
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Customer Satisfaction",
      desc: "Our focus is on making your travel experience smooth and enjoyable, with prompt issue resolution."
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Personal Touch",
      desc: "We treat every traveler as an individual, not just a booking number."
    },
  ], []);

  const googleReviews = useMemo(() => [
    {
      name: "Rahul Sharma",
      rating: 5,
      date: "2 weeks ago",
      text: "GoTravio helped me book a last-minute cab to the airport when I was in a rush. Their response was super quick and the driver was professional. Highly recommended!",
      initial: "RS"
    },
    {
      name: "Priya Patel",
      rating: 5,
      date: "1 month ago",
      text: "Amazing service for train ticket booking! They got me confirmed Tatkal tickets when I couldn't book myself. Very helpful team.",
      initial: "PP"
    },
    {
      name: "Amit Kumar",
      rating: 5,
      date: "3 weeks ago",
      text: "Booked a Manali tour package through them. Everything was perfectly arranged - cabs, hotels, sightseeing. Great experience!",
      initial: "AK"
    },
    {
      name: "Neha Singh",
      rating: 5,
      date: "2 months ago",
      text: "Very responsive and professional. They helped me with flight tickets and even suggested better options than I found online. Will use again!",
      initial: "NS"
    }
  ], []);

  const faqs = useMemo(() => [
    {
      question: "How do I start my enquiry?",
      answer: "Simply fill out the quick enquiry form on this page, or reach out via WhatsApp, phone, or email. Provide your travel details, and one of our experts will get back to you within 1-2 hours."
    },
    {
      question: "Is there any charge for the enquiry?",
      answer: "No, our enquiry service is completely free. We only facilitate bookings; you pay the actual service provider directly. There are no hidden fees or markups."
    },
    {
      question: "What services do you assist with?",
      answer: "We help with cab rentals (local, outstation, airport transfers), train and flight tickets (including Tatkal), and custom tour packages for domestic and international destinations."
    },
    {
      question: "How do you ensure the best price?",
      answer: "Our experts compare multiple options from trusted partners and use their industry knowledge to find competitive rates. We also help you understand any applicable discounts or offers."
    },
    {
      question: "What if I need to make changes to my booking?",
      answer: "Contact us immediately. We'll guide you through the modification or cancellation process as per the service provider's policy and help minimize any inconvenience."
    },
    {
      question: "Do you handle last-minute bookings?",
      answer: "Yes, we specialize in quick assistance for urgent travel needs, including Tatkal train tickets and last-minute flight or cab bookings."
    },
  ], []);

  const faqSchema = useMemo(() => ({
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
  }), [faqs]);

  // Memoized handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEnquiryData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmitEnquiry = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      if (!enquiryData.name || !enquiryData.service || !enquiryData.phone || !enquiryData.email) {
        throw new Error('Please fill in all required fields');
      }

      const phoneRegex = /^[+]?[0-9\s-]{10,}$/;
      if (!phoneRegex.test(enquiryData.phone)) {
        throw new Error('Please enter a valid phone number');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(enquiryData.email)) {
        throw new Error('Please enter a valid email address');
      }

      const response = await API.post("/enquiry", enquiryData);
      
      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: response.data.message || 'Enquiry submitted successfully! Our team will contact you within 1-2 hours.'
        });

        setEnquiryData({
          name: "",
          service: "",
          phone: "",
          details: "",
          email: ""
        });

        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        throw new Error(response.data.message || 'Failed to submit enquiry');
      }

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || error.message || 'Failed to submit enquiry. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [enquiryData]);

  const closeNotification = useCallback(() => {
    setSubmitStatus({ type: null, message: "" });
  }, []);

  const scrollToEnquiryForm = useCallback(() => {
    const formSection = document.getElementById('travel-enquiry-form');
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const handleServiceClick = useCallback((serviceType, e) => {
    e.preventDefault();
    setEnquiryData(prev => ({
      ...prev,
      service: serviceType
    }));
    scrollToEnquiryForm();
  }, [scrollToEnquiryForm]);

  const toggleFaq = useCallback((idx) => {
    setOpenFaqIndex(prev => prev === idx ? null : idx);
  }, []);

  const googleReviewsUrl = "https://g.page/r/CWzur7SdZeacEBM/review";

  // Light color classes for various sections
  const getWhyBookBg = (index) => {
    const colors = [
      "bg-gradient-to-br from-blue-50 to-indigo-50",
      "bg-gradient-to-br from-green-50 to-emerald-50",
      "bg-gradient-to-br from-yellow-50 to-amber-50",
      "bg-gradient-to-br from-purple-50 to-violet-50",
      "bg-gradient-to-br from-pink-50 to-rose-50",
      "bg-gradient-to-br from-cyan-50 to-teal-50"
    ];
    return colors[index % colors.length];
  };

  const getBenefitBg = (index) => {
    const colors = [
      "bg-gradient-to-br from-slate-50 to-gray-50",
      "bg-gradient-to-br from-stone-50 to-neutral-50",
      "bg-gradient-to-br from-zinc-50 to-slate-50"
    ];
    return colors[index % colors.length];
  };

  // 🔥 NEW: Different light colors for FAQ
  const getFaqBg = (index) => {
    const colors = [
      "bg-gradient-to-br from-blue-50 to-indigo-30",      // Blue gradient
      "bg-gradient-to-br from-green-50 to-emerald-30",    // Green gradient
      "bg-gradient-to-br from-yellow-50 to-amber-30",     // Yellow gradient
      "bg-gradient-to-br from-purple-50 to-violet-30",    // Purple gradient
      "bg-gradient-to-br from-pink-50 to-rose-30",        // Pink gradient
      "bg-gradient-to-br from-cyan-50 to-teal-30"         // Cyan gradient
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <FloatingStyles />
      <SEO 
        title="GoTravio Travels - India's Premier Travel Assistance Platform | Cab, Train, Flight & Tour Packages"
        description="GoTravio provides expert travel assistance for cab rentals, train tickets (including Tatkal), flight bookings, and custom tour packages across India. Get personalized help from real travel experts with quick response."
        keywords="travel assistance India, cab booking, train ticket booking, Tatkal ticket help, flight booking, tour packages India, travel agency, holiday packages, trip planning, GoTravio"
        canonicalUrl="/"
        ogImage="https://gotravio.com/home-og-image.jpg"
        schemaData={[homeSchema, faqSchema]}
        publishedTime="2024-01-01T08:00:00+05:30"
        modifiedTime={new Date().toISOString()}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-x-hidden">
        {/* Animated Notification Banner */}
        <AnimatePresence>
          {submitStatus.type && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", stiffness: 100 }}
              className={`fixed top-4 right-4 z-50 max-w-md w-[calc(100%-2rem)] sm:w-full ${
                submitStatus.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              } border rounded-xl shadow-lg p-4`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  )}
                  <div>
                    <p className={`font-semibold ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                      {submitStatus.type === 'success' ? 'Success!' : 'Error!'}
                    </p>
                    <p className={`text-sm mt-1 ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {submitStatus.message}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeNotification}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section - 3D Parallax */}
        <motion.section 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 overflow-hidden w-full"
        >
          {/* Static background elements */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20" />

          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-24 relative z-10">
            <div className="w-full">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left Content */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { staggerChildren: 0.2 }
                    }
                  }}
                  className="text-white space-y-6 md:space-y-8 text-center lg:text-left"
                >
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 60 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="inline-flex items-center justify-center lg:justify-start gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm font-semibold"
                  >
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                    Expert-Assisted Travel Platform
                  </motion.div>

                  <motion.h1
                    variants={{
                      hidden: { opacity: 0, y: 60 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                  >
                    Travel Assistance
                    <span className="block text-yellow-300 mt-2 md:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                      Made Personal
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 60 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="text-blue-100 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
                  >
                    GoTravio provides human-powered assistance for cab rentals, train & flight tickets, 
                    and custom tour packages. Real experts handle your travel enquiries.
                  </motion.p>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 60 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={scrollToEnquiryForm}
                      className="group px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-4 bg-white text-indigo-900 rounded-xl font-bold flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl transition-all text-xs sm:text-sm md:text-base"
                    >
                      <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      Start Your Enquiry
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to="/contact"
                        className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-4 border-2 border-white/60 text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-sm text-xs sm:text-sm md:text-base"
                      >
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        Speak with Expert
                      </Link>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 60 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 sm:pt-8 border-t border-white/20"
                  >
                    {[
                      ["Real Experts", "No automation"],
                      ["Transparent Process", "Clear updates"],
                      ["Multiple Channels", "Call/WhatsApp/Email"],
                    ].map(([label, sub], idx) => (
                      <div key={label} className="text-center">
                        <p className="text-xs sm:text-sm md:text-base font-bold text-white">{label}</p>
                        <p className="text-[10px] sm:text-xs md:text-sm text-blue-300 mt-1">{sub}</p>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Content - Carousel */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative mt-6 lg:mt-0"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className="absolute inset-0"
                        >
                          <img
                            src={carouselImages[currentImageIndex].url}
                            alt={carouselImages[currentImageIndex].alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          
                          {/* Image Caption */}
                          <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="absolute bottom-4 left-4 text-white"
                          >
                            <p className="text-sm font-semibold bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                              {carouselImages[currentImageIndex].title}
                            </p>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {carouselImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex 
                              ? 'bg-white w-4' 
                              : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Floating Card */}
                  <div
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 sm:-translate-x-0 sm:left-0 lg:-left-6 bg-gradient-to-br from-white to-indigo-50 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-2xl max-w-[160px] sm:max-w-xs float-animation"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm md:text-base text-slate-900">Personal Service</p>
                        <p className="text-[10px] sm:text-xs text-slate-500">Dedicated agent handling</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Approach Section */}
        <section className="px-4 sm:px-6 lg:px-12 xl:px-16 -mt-4 relative z-20">
          <AnimatedSection direction="up">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 md:p-8"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  {
                    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
                    title: "Agent-Assisted",
                    desc: "Real people handle your enquiries"
                  },
                  {
                    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
                    title: "Transparent",
                    desc: "Clear process with regular updates"
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
                    title: "Verified Options",
                    desc: "Manually checked by our team"
                  },
                  {
                    icon: <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />,
                    title: "Full Support",
                    desc: "Available through your journey"
                  },
                ].map((item, index) => (
                  <div key={index} className="text-center p-2 sm:p-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl mb-2 sm:mb-4">
                      <div className="text-indigo-600">{item.icon}</div>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 text-slate-800">{item.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </section>

        {/* Stacked Card Carousel - Destinations */}
        <StackedCardCarousel />

        {/* Services Section */}
        <section className="w-full bg-gray-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <SectionHeading 
              title="How We Can Assist You"
              subtitle="Comprehensive travel assistance across multiple services"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  service={service}
                  index={index}
                  onClick={(e) => handleServiceClick(
                    service.title.toLowerCase().includes('cab') ? 'cab' : 
                    service.title.toLowerCase().includes('ticket') ? 'train' : 'tour', 
                    e
                  )}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Book With Us Section */}
        <section className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <SectionHeading 
              title="Why Book With Us?"
              subtitle="We're not just a booking platform – we're your travel partner"
            />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {whyBookReasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`${getWhyBookBg(idx)} rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-slate-200`}
                >
                  <div className="inline-flex p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm mb-4">
                    <div className="text-indigo-600">{reason.icon}</div>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 text-slate-800">{reason.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base lg:text-lg">{reason.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Unique Images below Why Book With Us */}
        <UniqueImagesSection />

        {/* Process Section */}
        <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <SectionHeading 
              title="How Our Process Works"
              subtitle="Simple, transparent steps to get you travel-ready"
            />
            
            <div className="grid lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {processSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-3/4 w-full h-0.5 bg-gradient-to-r from-indigo-200 to-blue-200" />
                  )}
                  
                  <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-700 rounded-xl font-bold text-lg sm:text-xl lg:text-2xl mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 text-slate-800">{item.title}</h3>
                    <p className="text-slate-600 text-sm sm:text-base lg:text-lg">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3D Carousel Section */}
        <Carousel3DSection />

        {/* Enquiry Form Section */}
        <section id="travel-enquiry-form" className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Side - Process Steps */}
              <AnimatedSection direction="left" className="space-y-4 sm:space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8 text-slate-800"
                >
                  Ready to Start? Fill the Form
                </motion.h2>
                
                {processSteps.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="bg-gradient-to-br from-white to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-700 flex items-center justify-center rounded-lg font-bold text-sm sm:text-base">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-slate-800">{item.title}</h3>
                        <p className="text-slate-600 text-xs sm:text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatedSection>

              {/* Right Side - Form */}
              <AnimatedSection direction="right">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 md:p-8 border border-slate-200"
                >
                  <h3 className="font-bold text-xl sm:text-2xl mb-2 text-slate-800">Quick Travel Enquiry</h3>
                  <p className="text-slate-600 text-sm sm:text-base mb-6 sm:mb-8">Get assistance from our travel experts</p>
                  
                  <form onSubmit={handleSubmitEnquiry} className="space-y-4 sm:space-y-6">
                    {/* Form Fields */}
                    {[
                      { name: "name", label: "Full Name *", icon: User, type: "text", placeholder: "Enter your full name" },
                      { name: "service", label: "Service Required *", icon: Ticket, type: "select" },
                      { name: "phone", label: "Phone / WhatsApp Number *", icon: Phone, type: "tel", placeholder: "+91 98765 43210" },
                      { name: "email", label: "Email Address *", icon: Mail, type: "email", placeholder: "your.email@example.com" },
                    ].map((field, idx) => (
                      <div key={field.name}>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                          {field.label}
                        </label>
                        <div className="relative">
                          <field.icon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                          {field.type === "select" ? (
                            <select
                              name={field.name}
                              value={enquiryData[field.name]}
                              onChange={handleInputChange}
                              className="w-full pl-10 sm:pl-12 pr-8 sm:pr-10 py-3 sm:py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base bg-white"
                              required
                            >
                              <option value="">Select a service</option>
                              <option value="Cab Rental">Cab Rental</option>
                              <option value="Train Ticket">Train Ticket</option>
                              <option value="Bus Ticket">Bus Ticket</option>
                              <option value="Flight Ticket">Flight Ticket</option>
                              <option value="Tour Package">Tour Package</option>
                              <option value="Multiple">Multiple Services</option>
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              name={field.name}
                              value={enquiryData[field.name]}
                              onChange={handleInputChange}
                              placeholder={field.placeholder}
                              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base bg-white"
                              required
                            />
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Details Textarea */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                        Additional Information
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        <textarea
                          name="details"
                          value={enquiryData.details}
                          onChange={handleInputChange}
                          rows="3"
                          placeholder="Travel date, pickup/drop location, number of people, budget (if any)"
                          className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm sm:text-base bg-white"
                        />
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200">
                      <p className="text-xs sm:text-sm text-slate-700">
                        <Shield className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-600" />
                        Handled by real travel experts • No automated pricing • No spam
                      </p>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                          Submit Enquiry
                        </>
                      )}
                    </motion.button>

                    {/* Response Time Note */}
                    <p className="text-[10px] sm:text-xs text-slate-500 text-center">
                      <Clock className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-indigo-600" />
                      Our team typically responds within 1–2 hours
                    </p>
                  </form>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Phone Animation Section below Enquiry form */}
        <PhoneAnimationSection />

        {/* Benefits Section */}
        <section className="w-full bg-gradient-to-br from-slate-50 to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <SectionHeading 
              title="Key Benefits of Using GoTravio"
              subtitle="Why travelers choose us for their journey planning"
            />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {benefitsList.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`${getBenefitBg(index)} rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm`}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm mb-4">
                    <div className="text-indigo-600">{benefit.icon}</div>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 text-slate-800">{benefit.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base lg:text-lg">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Options Section */}
        <section className="w-full bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <SectionHeading 
              title="Connect with Our Experts"
              subtitle="Choose your preferred way to get travel assistance"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {contactOptions.map((option, index) => (
                <ContactOption key={index} option={option} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Google Reviews Section */}
        <section className="w-full bg-gradient-to-br from-yellow-50 to-orange-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <AnimatedSection direction="up">
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-5">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 fill-yellow-600" />
                  <span className="text-xs sm:text-sm font-medium text-orange-700">Trusted by Travelers</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 text-slate-800">
                  Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">100+ Happy Travelers</span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                  See what our customers are saying about us on Google
                </p>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - QR Code */}
              <AnimatedSection direction="left">
                <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-yellow-100">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center justify-center gap-2 mb-4">
                      <img 
                        src="https://www.google.com/favicon.ico" 
                        alt="Google" 
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                      <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Google</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Check us out on</h3>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-4">
                      GoTravio Travels
                    </div>
                    
                    {/* QR Code */}
                    <a 
                      href={googleReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto my-6 sm:my-8 block cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl rotate-6 opacity-20"></div>
                      <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-yellow-200 overflow-hidden">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://g.page/r/CWzur7SdZeacEBM/review" 
                          alt="Scan to write a Google Review for GoTravio"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </a>
                    
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                      Scan to write a review on Google
                    </p>
                    
                    <a 
                      href={googleReviewsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
                    >
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                      Write a Google Review
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  </div>

                  {/* Rating Summary */}
                  <div className="border-t border-yellow-100 pt-6 sm:pt-8">
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <div className="text-3xl sm:text-4xl font-bold text-gray-900">4.9</div>
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">Based on 100+ reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right Side - Reviews Grid */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {googleReviews.map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group bg-gradient-to-br from-white to-yellow-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-yellow-100 hover:border-yellow-300 shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-[10px] sm:text-xs font-bold text-indigo-700">{review.initial}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-xs sm:text-sm text-gray-900">{review.name}</h3>
                          <p className="text-[8px] sm:text-[10px] text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2 italic">
                      "{review.text}"
                    </p>
                    <div className="mt-2 sm:mt-3 flex items-center gap-1 text-yellow-600 text-[8px] sm:text-[10px]">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>Google Review</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 🔥 FAQ Section - Different Light Colors */}
        <section className="w-full bg-gray-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <SectionHeading 
              title="Frequently Asked Questions"
              subtitle="Got questions? We've got answers."
            />
            
            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.1 }}
                  className="mb-4"
                >
                  <motion.button
                    onClick={() => toggleFaq(idx)}
                    whileHover={{ scale: 1.01 }}
                    className={`w-full text-left ${getFaqBg(idx)} rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all border border-slate-200`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-base sm:text-lg lg:text-xl pr-4 text-slate-800">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openFaqIndex === idx ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronRight className="w-5 h-5 text-indigo-600" />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {openFaqIndex === idx && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-slate-600 text-sm sm:text-base lg:text-lg overflow-hidden"
                        >
                          {faq.answer}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-900 relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          {/* Static background elements */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready for Personalized Travel Assistance?
              </h2>
              
              <p className="text-blue-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
                Experience travel planning with real experts, transparent processes, 
                and dedicated support throughout your journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center">
                <motion.button
                  onClick={scrollToEnquiryForm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-900 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  Start Your Enquiry
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/contact"
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    Speak with Expert
                  </Link>
                </motion.div>
              </div>

              <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-white/20">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-white/80">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Transparent Process</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Expert Handling</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Quick Response</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;