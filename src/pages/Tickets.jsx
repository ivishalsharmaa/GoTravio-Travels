import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { API } from "../api.js";
import { 
  Train, 
  Calendar, 
  Users, 
  Phone, 
  MapPin,
  Clock,
  Zap,
  Sparkles,
  MessageCircle,
  ArrowRightLeft,
  Star,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  Target,
  CheckCircle,
  Loader2,
  Ticket as TicketIcon,
  Mail,
  AlertCircle,
  ArrowUpDown,
  Check,
  Navigation,
  Plane,
  User,
  Globe,
  HelpCircle,
  ChevronDown,
  Award,
  Gem,
  Rocket,
  Compass,
  Heart,
  Sun,
  Cloud,
  Coffee,
  Wifi,
  Battery,
  Camera,
  Headphones
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
};

const slideInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
};

const rotateIn = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
};

const bounceIn = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 15 
    }
  }
};

const Tickets = () => {
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    serviceType: "Normal",
    passengers: "1",
    phone: "",
    email: "",
    travelClass: "",
    preferredTime: "",
    specialRequest: "",
    tripType: "One Way",
    flightClass: "Economy",
    returnDate: ""
  });

  const [passengerNames, setPassengerNames] = useState(() => {
    const initialCount = parseInt(form.passengers) || 1;
    return Array(initialCount).fill("");
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({});
  const [ticketType, setTicketType] = useState("train");
  const [openFaq, setOpenFaq] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Light color gradients for cards
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

  const getHoverColor = (index) => {
    const colors = [
      "group-hover:bg-blue-50",
      "group-hover:bg-purple-50",
      "group-hover:bg-green-50",
      "group-hover:bg-yellow-50",
      "group-hover:bg-indigo-50",
      "group-hover:bg-orange-50",
      "group-hover:bg-teal-50",
      "group-hover:bg-rose-50"
    ];
    return colors[index % colors.length];
  };

  // HD Travel Images Array
  const travelImages = [
    {
      url: "/scenic.png",
      title: "Scenic Train Journey in India",
      description: "Experience the beauty of rail travel through mountains",
      alt: "Scenic train journey through Indian mountains for train ticket booking"
    },
    {
      url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      title: "Luxury Air Travel",
      description: "Comfortable and premium flight experience",
      alt: "Luxury flight interior for flight ticket booking"
    },
    {
      url: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80",
      title: "Modern Train Interior",
      description: "Contemporary rail travel with all amenities",
      alt: "Modern AC train interior for train ticket booking"
    },
    {
      url: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Business Class Comfort",
      description: "Premium seating for a relaxing journey",
      alt: "Business class flight seats for flight booking"
    },
    {
      url: "/sunsetflight.png",
      title: "Sunset Flight",
      description: "Beautiful views during your air travel",
      alt: "Sunset view from airplane window for flight ticket booking"
    },
    {
      url: "/sunsettrain.png",
      title: "Train at Sunset",
      description: "Magical moments on rail journeys",
      alt: "Train at sunset for railway ticket booking"
    }
  ];

  // FAQ Data
  const faqs = [
    {
      question: "How do I book train or flight tickets through GoTravio?",
      answer: "Simply fill out the enquiry form with your journey details including from/to locations, travel date, number of passengers, and your contact information. Our travel expert will contact you within 15 minutes with the best available options and prices. We'll then assist you with the complete booking process including Tatkal tickets and flight bookings."
    },
    {
      question: "What is your success rate for train ticket confirmation?",
      answer: "We have a 99.2% success rate for train ticket confirmations. Our travel experts have 10+ years of experience and know the best strategies for getting confirmed tickets, especially for Tatkal bookings and waitlisted tickets. We work with multiple partners to ensure maximum confirmation."
    },
    {
      question: "Do you provide Tatkal train ticket booking assistance?",
      answer: "Yes, absolutely! We specialize in Tatkal and Premium Tatkal train ticket bookings. Our experts are well-versed with Tatkal timings (10:00 AM for AC classes, 11:00 AM for non-AC) and procedures. We have a high success rate for confirmed Tatkal tickets."
    },
    {
      question: "What train classes can I book through your service?",
      answer: "We can book all train classes including Sleeper (SL), 3A (AC 3 Tier), 2A (AC 2 Tier), 1A (AC First Class), Chair Car (CC), Executive Chair Car (EC), and Second Seating (2S). Simply select your preferred class in the form and our expert will find the best options for you."
    },
    {
      question: "Do you offer flight booking assistance for international flights?",
      answer: "Yes, we provide flight booking assistance for both domestic and international flights. Our experts can help you find the best deals on all major airlines including Indigo, SpiceJet, Air India, Vistara, Emirates, Qatar Airways, and more."
    },
    {
      question: "How quickly will I get a response after submitting the form?",
      answer: "We pride ourselves on quick response times. Our travel experts typically contact you within 15 minutes of receiving your enquiry. For urgent Tatkal bookings or last-minute flight requirements, we recommend using the WhatsApp option for an even faster response, usually within 5-10 minutes."
    }
  ];

  // Benefits data with light colors
  const benefits = [
    {
      icon: <Zap size={24} />,
      title: "Quick Confirmation",
      description: "Get confirmed tickets including Tatkal within minutes",
      stat: "99.2% Success Rate"
    },
    {
      icon: <Gem size={24} />,
      title: "Best Prices",
      description: "We find the most competitive fares for you",
      stat: "Save up to 30%"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Secure Booking",
      description: "Your transactions and data are 100% secure",
      stat: "SSL Encrypted"
    },
    {
      icon: <PhoneCall size={24} />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your queries",
      stat: "Always Available"
    },
    {
      icon: <Award size={24} />,
      title: "Expert Assistance",
      description: "10+ years of travel industry experience",
      stat: "Certified Experts"
    },
    {
      icon: <Heart size={24} />,
      title: "Customer First",
      description: "Personalized service for every traveler",
      stat: "500+ Happy Clients"
    }
  ];

  // Process steps with light colors
  const processSteps = [
    {
      icon: <TicketIcon size={24} />,
      title: "Submit Enquiry",
      description: "Fill the form with your travel details"
    },
    {
      icon: <PhoneCall size={24} />,
      title: "Expert Call",
      description: "Get contact from specialist within 15 min"
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Get Options",
      description: "Receive best available tickets & prices"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Confirm Booking",
      description: "Book tickets with 24/7 support"
    }
  ];

  // Stats data with light colors
  const stats = [
    { number: "500+", label: "Happy Travelers", icon: <Users size={20} /> },
    { number: "99.2%", label: "Success Rate", icon: <TrendingUp size={20} /> },
    { number: "15 min", label: "Avg Response", icon: <Clock size={20} /> },
    { number: "10+", label: "Years Experience", icon: <Award size={20} /> }
  ];

  const TRAIN_SERVICE_TYPES = ["Normal", "Tatkal", "Premium Tatkal", "Emergency"];
  
  const TRAIN_CLASS_OPTIONS = [
    "Sleeper (SL)",
    "3A (AC 3 Tier)",
    "2A (AC 2 Tier)",
    "1A (AC First Class)",
    "CC (Chair Car)",
    "EC (Executive Chair Car)",
    "2S (Second Seating)"
  ];

  const FLIGHT_TRIP_TYPES = ["One Way", "Round Trip", "Multi City"];
  const FLIGHT_CLASS_OPTIONS = ["Economy", "Premium Economy", "Business", "First Class"];

  // Schema.org structured data for ticket service
  const ticketSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Train and Flight Ticket Booking Service",
    "provider": {
      "@type": "TravelAgency",
      "name": "GoTravio Travels",
      "url": "https://gotravio.com",
      "logo": "https://gotravio.com/logo.png"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "description": "Expert assistance for train ticket booking including Tatkal quota, and flight ticket booking for domestic and international travel. High success rate, quick response, and transparent pricing.",
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Ticket Booking Assistance"
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

  // Auto-slide carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === travelImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const initialCount = parseInt(form.passengers) || 1;
    if (passengerNames.length !== initialCount) {
      setPassengerNames(Array(initialCount).fill(""));
    }
  }, [form.passengers]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.from.trim()) newErrors.from = "From location is required";
    if (!form.to.trim()) newErrors.to = "To location is required";
    
    if (form.from.trim().toLowerCase() === form.to.trim().toLowerCase()) {
      newErrors.to = "From and To cannot be same";
    }
    
    if (!form.date) {
      newErrors.date = "Travel date is required";
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }
    
    if (ticketType === "flight" && form.tripType === "Round Trip") {
      if (!form.returnDate) {
        newErrors.returnDate = "Return date is required for round trip";
      } else {
        const departureDate = new Date(form.date);
        const returnDate = new Date(form.returnDate);
        if (returnDate < departureDate) {
          newErrors.returnDate = "Return date must be after departure date";
        }
      }
    }
    
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneRegex = /^[6-9]\d{9}$/;
      const cleanedPhone = form.phone.replace(/\D/g, '');
      if (cleanedPhone.length !== 10 || !phoneRegex.test(cleanedPhone)) {
        newErrors.phone = "Enter a valid 10-digit Indian mobile number";
      }
    }
    
    passengerNames.forEach((name, index) => {
      if (!name.trim()) {
        newErrors[`passenger_${index}`] = `Passenger ${index + 1} name is required`;
      }
    });
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    if (name === "passengers") {
      const count = Math.max(1, Math.min(6, parseInt(value) || 1));
      
      const newNames = [...passengerNames];
      if (count > newNames.length) {
        while (newNames.length < count) {
          newNames.push("");
        }
      } else if (count < newNames.length) {
        newNames.length = count;
      }
      setPassengerNames(newNames);
      
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith('passenger_')) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  const handlePassengerNameChange = (index, value) => {
    const updatedNames = [...passengerNames];
    updatedNames[index] = value;
    setPassengerNames(updatedNames);
    
    if (errors[`passenger_${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`passenger_${index}`];
      setErrors(newErrors);
    }
  };

  const switchLocations = () => {
    setForm(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
    
    setErrors(prev => ({
      ...prev,
      from: "",
      to: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus({
        type: "error",
        message: "Please fix the errors below"
      });
      
      const firstError = Object.keys(newErrors)[0];
      let element;
      
      if (firstError.startsWith('passenger_')) {
        const index = firstError.split('_')[1];
        element = document.querySelector(`[data-passenger-index="${index}"]`);
      } else {
        element = document.querySelector(`[name="${firstError}"]`);
      }
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Submitting your ticket enquiry..." });

    try {
      const payload = {
        from: form.from,
        to: form.to,
        date: form.date,
        passengers: form.passengers,
        passengerNames: passengerNames.filter(name => name.trim()),
        phone: form.phone,
        email: form.email,
        preferredTime: form.preferredTime,
        specialRequest: form.specialRequest,
        ticketMode: ticketType,
        source: "ticket_booking_page"
      };

      if (ticketType === "train") {
        payload.serviceType = form.serviceType;
        payload.travelClass = form.travelClass;
      } else {
        payload.tripType = form.tripType;
        payload.flightClass = form.flightClass;
        if (form.returnDate) {
          payload.returnDate = form.returnDate;
        }
      }

      Object.keys(payload).forEach(key => {
        if (payload[key] === "" || payload[key] === null || payload[key] === undefined) {
          delete payload[key];
        }
      });

      await API.post("/tickets", payload);
      
      const passengerList = passengerNames.map((name, index) => 
        `${index + 1}. ${name.trim()}`
      ).join('\n');
      
      const message = ticketType === "train" 
        ? `🎫 New Train Ticket Enquiry from GoTravio!\n\nFrom: ${form.from}\nTo: ${form.to}\nDate: ${form.date}\nPassengers (${form.passengers}):\n${passengerList}\nPhone: ${form.phone}\nService: ${form.serviceType}\nClass: ${form.travelClass || "Not specified"}`
        : `✈️ New Flight Ticket Enquiry from GoTravio!\n\nFrom: ${form.from}\nTo: ${form.to}\nDate: ${form.date}\nTrip: ${form.tripType}\nPassengers (${form.passengers}):\n${passengerList}\nPhone: ${form.phone}\nClass: ${form.flightClass}\n${form.returnDate ? `Return: ${form.returnDate}` : ''}`;
      
      const whatsappUrl = `https://wa.me/919023884833?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      setStatus({
        type: "success",
        message: `✅ ${ticketType === "train" ? "Train" : "Flight"} ticket enquiry submitted! Our expert will contact you within 15 minutes.`
      });
      
      setTimeout(() => {
        const resetForm = {
          from: "",
          to: "",
          date: "",
          serviceType: "Normal",
          passengers: "1",
          phone: "",
          email: "",
          travelClass: "",
          preferredTime: "",
          specialRequest: "",
          tripType: "One Way",
          flightClass: "Economy",
          returnDate: ""
        };
        
        setForm(resetForm);
        setPassengerNames([""]);
        setErrors({});
        setIsSubmitting(false);
      }, 5000);

    } catch (err) {
      setStatus({
        type: "error",
        message: `❌ Something went wrong: ${err.response?.data?.message || err.message}`
      });
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleTicketTypeChange = (type) => {
    setTicketType(type);
    const resetForm = {
      from: "",
      to: "",
      date: "",
      serviceType: "Normal",
      passengers: "1",
      phone: "",
      email: "",
      travelClass: "",
      preferredTime: "",
      specialRequest: "",
      tripType: "One Way",
      flightClass: "Economy",
      returnDate: ""
    };
    setForm(resetForm);
    setPassengerNames([""]);
    setErrors({});
    setStatus({ type: "", message: "" });
  };

  return (
    <>
      <SEO 
        title="Train & Flight Ticket Booking Assistance India | Tatkal Tickets - GoTravio"
        description="Get expert assistance for train ticket booking including Tatkal quota, and flight bookings at best prices. 99.2% success rate, quick response within 15 minutes, and transparent pricing. Book your tickets today!"
        keywords="train ticket booking, Tatkal ticket booking, flight booking India, online train ticket, flight ticket booking, IRCTC ticket help, Tatkal assistance, domestic flights, international flights, GoTravio tickets, railway ticket booking"
        canonicalUrl="/tickets"
        ogImage="https://gotravio.com/tickets-og-image.jpg"
        schemaData={[ticketSchema, faqSchema]}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white w-full overflow-x-hidden">
        {/* ================= HERO SECTION ================= */}
        <section className="relative bg-gradient-to-br from-indigo-950 via-blue-900 to-purple-900 text-white overflow-hidden w-full">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-24">
            <div className="w-full">
              <div className="text-center w-full max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 sm:py-3 mb-4 sm:mb-6"
                >
                  <Sparkles size={16} className="text-blue-300" />
                  <span className="text-sm sm:text-base font-medium">Expert Train & Flight Ticket Booking</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                >
                  Online Train & Flight
                  <span className="block text-blue-300 mt-2 sm:mt-3">Ticket Booking India</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.4 }}
                  className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto"
                >
                  Get confirmed train tickets including Tatkal quota and flight bookings at best prices. 
                  99.2% success rate with quick response within 15 minutes.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center mb-8 sm:mb-10"
                >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const formElement = document.getElementById('enquiry-form');
                      if (formElement) {
                        formElement.scrollIntoView({behavior: 'smooth'});
                      }
                    }}
                    className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-sm sm:text-base lg:text-lg xl:text-xl flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                    <TicketIcon className="relative z-10 group-hover:animate-pulse" size={18} /> 
                    <span className="relative z-10">Book Tickets Now</span>
                  </motion.button>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/919023884833?text=Hi%20GoTravio,%20I%20need%20help%20with%20ticket%20booking"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-sm sm:text-base lg:text-lg xl:text-xl flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                    <MessageCircle className="relative z-10" size={18} /> 
                    <span className="relative z-10">Instant WhatsApp Help</span>
                  </motion.a>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.8 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto"
                >
                  {[
                    { icon: <ShieldCheck size={18} />, text: "99.2% Success Rate", color: "text-green-400" },
                    { icon: <Clock size={18} />, text: "15 Min Response", color: "text-blue-400" },
                    { icon: <TrendingUp size={18} />, text: "Best Price", color: "text-yellow-400" },
                    { icon: <Target size={18} />, text: "Tatkal Expert", color: "text-purple-400" }
                  ].map((badge, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 sm:gap-3 lg:gap-4 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10"
                    >
                      <motion.div 
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                        className={`${badge.color} flex-shrink-0`}
                      >
                        {badge.icon}
                      </motion.div>
                      <span className="text-xs sm:text-sm lg:text-base font-medium">{badge.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= QUICK STATS ================= */}
        <section className="w-full bg-white py-10 sm:py-12 lg:py-16">
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={bounceIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className={`group relative ${getCardGradient(index)} rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 ${getHoverColor(index)}`}
                >
                  <motion.div
                    animate={hoveredCard === index ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex p-2 sm:p-3 lg:p-4 bg-white/80 rounded-lg sm:rounded-xl mb-2 sm:mb-3 ${getIconColor(index)}`}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">{stat.label}</div>
                  
                  {/* Animated background effect on hover */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={hoveredCard === index ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-blue-500 rounded-xl sm:rounded-2xl lg:rounded-3xl"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= BENEFITS SECTION ================= */}
        <section className="w-full bg-gradient-to-b from-white to-gray-50 py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 sm:px-5 py-2 sm:py-3 mb-3 sm:mb-4">
                <Star size={16} className="text-blue-500" />
                <span className="text-sm sm:text-base lg:text-lg font-medium text-blue-700">Why Choose Us</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ticket Advantage</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                Expert assistance for all your train and flight ticket needs
              </p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 w-full"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={slideInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onHoverStart={() => setHoveredCard(index + 10)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className={`group relative ${getCardGradient(index)} rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 ${getHoverColor(index)}`}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 lg:gap-6">
                    <motion.div
                      animate={hoveredCard === index + 10 ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl bg-white shadow-md ${getIconColor(index)} flex-shrink-0`}
                    >
                      {benefit.icon}
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3 
                        animate={hoveredCard === index + 10 ? { x: 5 } : { x: 0 }}
                        className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 mb-2"
                      >
                        {benefit.title}
                      </motion.h3>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3">{benefit.description}</p>
                      <motion.div 
                        animate={hoveredCard === index + 10 ? { scale: 1.05 } : { scale: 1 }}
                        className="inline-block px-3 py-1 bg-white rounded-full text-xs sm:text-sm font-semibold text-blue-600 shadow-sm"
                      >
                        {benefit.stat}
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Animated background effect */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={hoveredCard === index + 10 ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-blue-500 rounded-xl sm:rounded-2xl lg:rounded-3xl"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= MAIN FORM SECTION ================= */}
        <section id="enquiry-form" className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 sm:px-5 py-2 sm:py-3 mb-3 sm:mb-4">
                <Zap size={16} className="text-blue-500" />
                <span className="text-sm sm:text-base lg:text-lg font-medium text-blue-700">Quick & Easy Ticket Enquiry</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ticket Quote</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                Fill in your journey details and receive the best options from our travel experts
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl lg:rounded-4xl shadow-2xl overflow-hidden border border-gray-200/50"
            >
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 sm:p-6 lg:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">Train & Flight Ticket Enquiry Form</h3>
                    <p className="text-sm sm:text-base lg:text-lg text-blue-100">Get expert assistance for confirmed tickets</p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 sm:gap-3">
                    <Sparkles size={20} className="text-yellow-300" />
                    <span className="text-sm sm:text-base lg:text-lg font-medium text-white">Quick Response Guaranteed</span>
                  </div>
                </div>

                {/* Ticket Type Toggle */}
                <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-1 space-y-2 sm:space-y-0 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-1 max-w-full sm:max-w-md lg:max-w-lg">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTicketTypeChange("train")}
                    className={`flex-1 py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-lg sm:rounded-xl lg:rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base ${
                      ticketType === "train" 
                        ? "bg-white text-blue-600 shadow-lg" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Train size={18} />
                    Train Tickets
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTicketTypeChange("flight")}
                    className={`flex-1 py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-lg sm:rounded-xl lg:rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base ${
                      ticketType === "flight" 
                        ? "bg-white text-blue-600 shadow-lg" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Plane size={18} />
                    Flight Tickets
                  </motion.button>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 lg:p-8 xl:p-10 space-y-5 sm:space-y-6 lg:space-y-8">
                {/* Journey Details Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50/50 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-blue-100/50 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-5 lg:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      {ticketType === "train" ? <Train size={20} className="text-blue-600" /> : <Plane size={20} className="text-blue-600" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 truncate">
                        {ticketType === "train" ? "Train Journey Details" : "Flight Journey Details"}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 truncate">
                        {ticketType === "train" ? "Where and when you want to travel by train" : "Where and when you want to fly"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                    {/* From/To Locations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                      <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                        <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                          <MapPin size={14} className="text-blue-500" />
                          {ticketType === "train" ? "From Station *" : "From City/Airport *"}
                        </label>
                        <div className="relative">
                          <input
                            name="from"
                            value={form.from}
                            onChange={handleChange}
                            className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors.from ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                            placeholder={ticketType === "train" ? "Enter departure station" : "Enter departure city or airport"}
                          />
                          {ticketType === "train" ? (
                            <Train size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          ) : (
                            <Globe size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          )}
                        </div>
                        {errors.from && (
                          <p className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">{errors.from}</p>
                        )}
                      </div>

                      <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                        <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                          <Navigation size={14} className="text-indigo-500" />
                          {ticketType === "train" ? "To Station *" : "To City/Airport *"}
                        </label>
                        <div className="relative">
                          <input
                            name="to"
                            value={form.to}
                            onChange={handleChange}
                            className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors.to ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                            placeholder={ticketType === "train" ? "Enter destination station" : "Enter destination city or airport"}
                          />
                          {ticketType === "train" ? (
                            <Train size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          ) : (
                            <Globe size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          )}
                        </div>
                        {errors.to && (
                          <p className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">{errors.to}</p>
                        )}
                      </div>
                    </div>

                    {/* Switch Locations Button */}
                    <div className="flex justify-center">
                      <motion.button
                        type="button"
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={switchLocations}
                        className="p-2 sm:p-3 lg:p-4 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 transition-all shadow-md"
                      >
                        <ArrowUpDown size={18} />
                      </motion.button>
                    </div>

                    {/* Date and Service/Trip Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                      <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                        <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                          <Calendar size={14} className="text-indigo-500" />
                          {ticketType === "train" ? "Travel Date *" : "Departure Date *"}
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            min={getMinDate()}
                            className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors.date ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                            required
                          />
                          <Calendar size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.date && (
                          <p className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">{errors.date}</p>
                        )}
                      </div>

                      {ticketType === "train" ? (
                        <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                          <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                            <Zap size={14} className="text-teal-500" />
                            Service Type *
                          </label>
                          <div className="relative">
                            <select
                              name="serviceType"
                              value={form.serviceType}
                              onChange={handleChange}
                              className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white transition-all"
                            >
                              {TRAIN_SERVICE_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                            <Zap size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                          <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                            <ArrowRightLeft size={14} className="text-teal-500" />
                            Trip Type *
                          </label>
                          <div className="relative">
                            <select
                              name="tripType"
                              value={form.tripType}
                              onChange={handleChange}
                              className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white transition-all"
                            >
                              {FLIGHT_TRIP_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                            <ArrowRightLeft size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Return Date for Flight Round Trip */}
                    {ticketType === "flight" && form.tripType === "Round Trip" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1 sm:space-y-2 lg:space-y-3"
                      >
                        <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                          <Calendar size={14} className="text-indigo-500" />
                          Return Date *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="returnDate"
                            value={form.returnDate}
                            onChange={handleChange}
                            min={form.date || getMinDate()}
                            className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors.returnDate ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                          />
                          <Calendar size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.returnDate && (
                          <p className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">{errors.returnDate}</p>
                        )}
                      </motion.div>
                    )}

                    {/* Class and Passengers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                      <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                        <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700">
                          {ticketType === "train" ? "Travel Class" : "Flight Class"}
                        </label>
                        <div className="relative">
                          <select
                            name={ticketType === "train" ? "travelClass" : "flightClass"}
                            value={ticketType === "train" ? form.travelClass : form.flightClass}
                            onChange={handleChange}
                            className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white transition-all"
                          >
                            <option value="">Select Class</option>
                            {ticketType === "train" 
                              ? TRAIN_CLASS_OPTIONS.map(option => (
                                  <option key={option} value={option}>{option}</option>
                                ))
                              : FLIGHT_CLASS_OPTIONS.map(option => (
                                  <option key={option} value={option}>{option}</option>
                                ))
                            }
                          </select>
                          {ticketType === "train" ? (
                            <Train size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          ) : (
                            <Plane size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                        <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                          <Users size={14} className="text-blue-500" />
                          Passengers *
                        </label>
                        <div className="relative">
                          <select
                            name="passengers"
                            value={form.passengers}
                            onChange={handleChange}
                            className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white transition-all"
                          >
                            {[1,2,3,4,5,6].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                            ))}
                          </select>
                          <Users size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Passenger Names */}
                    <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                      <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700">
                        Passenger Names *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                        {passengerNames.map((name, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-1 sm:space-y-2"
                          >
                            <div className="relative">
                              <input
                                value={name}
                                onChange={(e) => handlePassengerNameChange(index, e.target.value)}
                                data-passenger-index={index}
                                className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors[`passenger_${index}`] ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                                placeholder={`Passenger ${index + 1} Full Name`}
                                required
                              />
                              <User size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                            {errors[`passenger_${index}`] && (
                              <p className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">{errors[`passenger_${index}`]}</p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Details Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-indigo-50/50 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-indigo-100/50 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-5 lg:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <PhoneCall size={20} className="text-indigo-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 truncate">Contact Details</h3>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 truncate">Where should we contact you?</p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                      <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                        <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700">
                          Mobile Number *
                        </label>
                        <div className="relative">
                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                            placeholder="Enter 10-digit mobile number"
                            required
                          />
                          <Phone size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                        <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700">
                          Email (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            placeholder="your.email@example.com"
                          />
                          <Mail size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                      <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700">
                        Preferred Time (Optional)
                      </label>
                      <input
                        type="time"
                        name="preferredTime"
                        value={form.preferredTime}
                        onChange={handleChange}
                        className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                      <label className="block text-xs sm:text-sm lg:text-base font-medium text-gray-700">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        name="specialRequest"
                        value={form.specialRequest}
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none transition-all"
                        placeholder="Any special requirements or preferences..."
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border border-blue-200 shadow-md"
                >
                  <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                    <Check size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-900">What happens next?</p>
                      <ul className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
                        <li>✓ Our {ticketType} ticket expert contacts you within 15 minutes</li>
                        <li>✓ Receive best available options & prices</li>
                        <li>✓ Get confirmed ticket booking assistance</li>
                        <li>✓ Professional service with 24/7 support</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Status Display */}
                <AnimatePresence>
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border ${
                        status.type === "success" 
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800" 
                          : status.type === "error"
                          ? "bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800"
                          : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                        {status.type === "success" ? (
                          <CheckCircle size={16} className="flex-shrink-0" />
                        ) : status.type === "error" ? (
                          <AlertCircle size={16} className="flex-shrink-0" />
                        ) : (
                          <Loader2 className="animate-spin flex-shrink-0" size={16} />
                        )}
                        <span className="text-sm sm:text-base lg:text-lg font-medium">{status.message}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl lg:rounded-2xl font-bold text-sm sm:text-base lg:text-lg xl:text-xl disabled:opacity-70 transition-all duration-300 hover:shadow-xl group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
                      <Loader2 className="animate-spin" size={18} />
                      Submitting Enquiry...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
                      <MessageCircle size={18} />
                      Submit {ticketType === "train" ? "Train" : "Flight"} Ticket Enquiry
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>

            <div className="text-center mt-6 sm:mt-8 lg:mt-10">
              <p className="text-xs sm:text-sm lg:text-base text-gray-500">
                💬 Prefer to talk? WhatsApp us at{" "}
                <a href="https://wa.me/916371106588" className="text-blue-600 font-medium hover:text-blue-800">
                  +91 63711 06588
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ================= PROCESS SECTION ================= */}
        <section className="w-full bg-gradient-to-b from-white to-gray-50 py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Works</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                Simple process from enquiry to confirmed tickets
              </p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full"
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInScale}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onHoverStart={() => setHoveredCard(index + 20)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className={`group relative ${getCardGradient(index)} rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 ${getHoverColor(index)}`}
                >
                  <motion.div
                    animate={hoveredCard === index + 20 ? { scale: 1.1, rotate: 360 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl text-white font-bold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4"
                  >
                    {index + 1}
                  </motion.div>
                  <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3">
                    <motion.div
                      animate={hoveredCard === index + 20 ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg ${getIconColor(index)}`}
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="font-bold text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">{step.description}</p>
                  
                  {/* Animated background effect */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={hoveredCard === index + 20 ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-blue-500 rounded-xl sm:rounded-2xl lg:rounded-3xl"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= IMAGE CAROUSEL SECTION ================= */}
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 sm:px-5 py-2 sm:py-3 mb-3 sm:mb-4">
                <Sparkles size={16} className="text-blue-500" />
                <span className="text-sm sm:text-base lg:text-lg font-medium text-blue-700">Travel Inspiration</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Moments</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                Experience the beauty of train and flight travel through our stunning visuals
              </p>
            </motion.div>

            {/* Carousel Container */}
            <div className="relative rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden shadow-2xl">
              {/* Main Image */}
              <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px] w-full">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={travelImages[currentImageIndex].url}
                    alt={travelImages[currentImageIndex].alt}
                    title={travelImages[currentImageIndex].title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Image Caption */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 xl:p-10 text-white"
                >
                  <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2">
                    {travelImages[currentImageIndex].title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-200">
                    {travelImages[currentImageIndex].description}
                  </p>
                </motion.div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                  {travelImages.map((_, index) => (
                    <button
                      key={index}
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

        {/* ================= FAQ SECTION ================= */}
        <section className="w-full bg-gradient-to-b from-white to-gray-50 py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about our ticket booking service
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${getCardGradient(index)} rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} className={`${getIconColor(index)} flex-shrink-0`} />
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
                        <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-sm lg:text-base text-gray-600 border-t border-gray-100 pt-3 sm:pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Still have questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 sm:mt-10 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 sm:px-6 py-3 sm:py-4">
                <MessageCircle size={18} className="text-blue-600" />
                <span className="text-sm sm:text-base text-gray-700">
                  Still have questions?{" "}
                  <a
                    href="https://wa.me/919023884833"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:text-blue-700 underline"
                  >
                    WhatsApp us
                  </a>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Floating WhatsApp Button */}
        <motion.a
          href="https://wa.me/919023884833"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-50 group"
        >
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-green-500 rounded-full blur-lg group-hover:blur-xl transition-all opacity-70"
            />
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-3 sm:p-4 lg:p-5 rounded-full shadow-2xl hover:shadow-3xl transition-all">
              <MessageCircle size={24} className="group-hover:animate-bounce" />
            </div>
          </div>
        </motion.a>
      </div>
    </>
  );
};

export default Tickets;