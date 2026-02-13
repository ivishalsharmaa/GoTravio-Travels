// client/src/pages/Ticket.jsx
import React, { useState, useEffect } from "react";
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
  Globe
} from "lucide-react";

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

  useEffect(() => {
    const initialCount = parseInt(form.passengers) || 1;
    if (passengerNames.length !== initialCount) {
      setPassengerNames(Array(initialCount).fill(""));
    }
  }, []);

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
    setStatus({ type: "loading", message: "Submitting your enquiry..." });

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
        source: "website_form"
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
        ? `🎫 New Train Ticket Enquiry!\n\nFrom: ${form.from}\nTo: ${form.to}\nDate: ${form.date}\nPassengers (${form.passengers}):\n${passengerList}\nPhone: ${form.phone}\nService: ${form.serviceType}\nClass: ${form.travelClass || "Not specified"}`
        : `✈️ New Flight Ticket Enquiry!\n\nFrom: ${form.from}\nTo: ${form.to}\nDate: ${form.date}\nTrip: ${form.tripType}\nPassengers (${form.passengers}):\n${passengerList}\nPhone: ${form.phone}\nClass: ${form.flightClass}\n${form.returnDate ? `Return: ${form.returnDate}` : ''}`;
      
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

  const styles = {
    page: "min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden",
    
    // Hero section
    heroSection: "relative bg-gradient-to-br from-indigo-950 via-blue-900 to-purple-900 text-white overflow-hidden",
    heroBlur1: "absolute top-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl",
    heroBlur2: "absolute bottom-1/4 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-500/10 rounded-full blur-3xl",
    heroContainer: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24",
    heroBadge: "inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6",
    heroBadgeIcon: "text-blue-300",
    heroBadgeText: "text-xs sm:text-sm font-medium",
    heroTitle: "text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4",
    heroTitleSpan: "block text-blue-300 mt-2",
    heroDesc: "text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4",
    heroButtons: "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 md:mb-12 px-4",
    heroButton: "group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl",
    heroButton2: "group relative bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl",
    heroButtonBlur: "absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all",
    
    // Trust indicators
    trustGrid: "grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto px-4",
    trustItem: "flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-white/10",
    trustText: "text-[10px] sm:text-xs md:text-sm font-medium truncate",
    
    // Quick stats
    statsContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16",
    statsGrid: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6",
    statCard: "group relative",
    statBg: "absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl transform group-hover:scale-105 transition-all duration-300",
    statContent: "relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 border border-gray-200/50 group-hover:border-blue-300/50 transition-all",
    statFlex: "flex items-center gap-2 sm:gap-3 md:gap-4 mb-1 sm:mb-2 md:mb-3",
    statIconBg: "p-1.5 sm:p-2 bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl",
    statValue: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900",
    statLabel: "text-[10px] sm:text-xs md:text-sm font-medium text-gray-700",
    statDesc: "text-[8px] sm:text-[10px] md:text-xs text-gray-500 hidden xs:block",
    
    // Benefits section
    benefitsSection: "py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50",
    benefitsContainer: "max-w-7xl mx-auto",
    benefitsHeader: "text-center mb-6 sm:mb-8 md:mb-10",
    benefitsBadge: "inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4",
    benefitsBadgeIcon: "text-blue-500",
    benefitsBadgeText: "text-xs sm:text-sm font-medium text-blue-700",
    benefitsTitle: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 px-4",
    benefitsTitleSpan: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600",
    benefitsDesc: "text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4",
    benefitsGrid: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8",
    benefitCard: "group relative",
    benefitBg: "absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-sm group-hover:shadow-lg",
    benefitContent: "relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200/50 group-hover:border-blue-300 transition-all",
    benefitFlex: "flex flex-col xs:flex-row items-start gap-3 sm:gap-4",
    benefitIconBg: "p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex-shrink-0",
    benefitTextContainer: "flex-1 w-full xs:w-auto",
    benefitTitle: "font-bold text-base sm:text-lg md:text-xl text-gray-900 mb-1 sm:mb-2",
    benefitDesc: "text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4",
    benefitFeatures: "space-y-1 sm:space-y-2",
    benefitFeature: "flex items-start gap-1.5 sm:gap-2",
    benefitFeatureIcon: "text-blue-500 flex-shrink-0 mt-0.5",
    benefitFeatureText: "text-[11px] sm:text-xs text-gray-700",
    
    // Form section
    formSection: "py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8",
    formContainer: "max-w-4xl mx-auto",
    formHeader: "text-center mb-8 sm:mb-10 md:mb-12",
    formBadge: "inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4",
    formBadgeIcon: "text-blue-500",
    formBadgeText: "text-xs sm:text-sm font-medium text-blue-700",
    formTitle: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 px-4",
    formTitleSpan: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600",
    formDesc: "text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4",
    
    formCard: "bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50",
    formCardHeader: "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 sm:p-5 md:p-6",
    formHeaderFlex: "flex flex-col md:flex-row items-start md:items-center justify-between mb-4 sm:mb-5 md:mb-6 gap-3 sm:gap-4",
    formHeaderTitle: "text-lg sm:text-xl md:text-2xl font-bold text-white",
    formHeaderSub: "text-xs sm:text-sm text-blue-100",
    formHeaderRight: "hidden md:flex items-center gap-2",
    formHeaderRightIcon: "text-blue-300",
    formHeaderRightText: "text-xs sm:text-sm font-medium text-white",
    
    ticketToggle: "flex flex-col xs:flex-row space-x-0 xs:space-x-1 space-y-2 xs:space-y-0 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-1 max-w-full xs:max-w-md",
    ticketToggleBtn: "flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm",
    
    formContent: "p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6",
    
    // Journey card
    journeyCard: "bg-gradient-to-br from-blue-50/50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-100/50",
    journeyHeader: "flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6",
    journeyIcon: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0",
    journeyTitle: "text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate",
    journeySub: "text-xs sm:text-sm text-gray-600 truncate",
    
    // Form fields
    formRow: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6",
    formGroup: "space-y-1 sm:space-y-2",
    formLabel: "block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2",
    formLabelIcon: "text-blue-500",
    inputWrapper: "relative",
    input: "w-full rounded-lg sm:rounded-xl border px-3 sm:px-4 py-2 sm:py-3 pl-8 sm:pl-10 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none",
    inputError: "border-red-500",
    inputNormal: "border-gray-300",
    inputIcon: "absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
    errorText: "text-red-500 text-[10px] sm:text-xs mt-1",
    
    switchBtn: "p-1.5 sm:p-2 md:p-3 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 transition-all",
    select: "w-full rounded-lg sm:rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 pl-8 sm:pl-10 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white",
    
    vehicleGrid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3",
    vehicleBtn: "p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm",
    vehicleBtnActive: "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700",
    vehicleBtnInactive: "border-gray-200 hover:border-blue-300 hover:bg-blue-50",
    
    infoCard: "bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100",
    infoFlex: "flex items-start gap-2 sm:gap-3",
    infoIcon: "text-blue-600 mt-0.5 flex-shrink-0",
    infoTitle: "text-xs sm:text-sm font-medium text-gray-900",
    infoList: "text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1",
    
    // Contact card
    contactCard: "bg-gradient-to-br from-indigo-50/50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-100/50",
    contactHeader: "flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6",
    contactIcon: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0",
    
    // Status display
    statusSuccess: "rounded-lg sm:rounded-xl p-3 sm:p-4 border bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-800",
    statusError: "rounded-lg sm:rounded-xl p-3 sm:p-4 border bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-800",
    statusLoading: "rounded-lg sm:rounded-xl p-3 sm:p-4 border bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-800",
    statusFlex: "flex items-center gap-2 sm:gap-3",
    statusIcon: "flex-shrink-0",
    statusText: "text-[11px] sm:text-xs md:text-sm font-medium",
    
    // Submit button
    submitBtn: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg disabled:opacity-70 transition-all duration-300 hover:shadow-xl group",
    submitFlex: "flex items-center justify-center gap-2 sm:gap-3",
    
    // WhatsApp link
    whatsappLink: "text-center mt-6 sm:mt-8 px-4",
    whatsappText: "text-[11px] sm:text-xs md:text-sm text-gray-500",
    whatsappNumber: "text-blue-600 font-medium hover:text-blue-800",
    
    // Process section
    processSection: "py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50",
    processGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8",
    processCard: "bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-shadow",
    processNumber: "inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4",
    processTitleFlex: "flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3",
    processIconBg: "p-1.5 sm:p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg",
    processTitle: "font-bold text-sm sm:text-base md:text-lg text-gray-900",
    processDesc: "text-xs sm:text-sm text-gray-600",
    
    // Floating WhatsApp
    floatingWhatsApp: "fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group",
    floatingBg: "absolute inset-0 bg-blue-500 rounded-full blur-lg group-hover:blur-xl transition-all opacity-70",
    floatingBtn: "relative bg-gradient-to-br from-blue-500 to-teal-500 text-white p-2.5 sm:p-3 md:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110",
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
          <div className={styles.heroBlur1}></div>
          <div className={styles.heroBlur2}></div>
        </div>

        <div className={styles.heroContainer}>
          <div className="text-center max-w-4xl mx-auto">
            <div className={styles.heroBadge}>
              <Sparkles size={14} className={styles.heroBadgeIcon} />
              <span className={styles.heroBadgeText}>Travel Ticket Enquiry</span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Get Confirmed
              <span className={styles.heroTitleSpan}>Travel Tickets</span>
            </h1>
            
            <p className={styles.heroDesc}>
              Expert assistance for train and flight bookings across India and worldwide.
            </p>
            
            <div className={styles.heroButtons}>
              <button 
                onClick={() => {
                  const formElement = document.getElementById('enquiry-form');
                  if (formElement) {
                    formElement.scrollIntoView({behavior: 'smooth'});
                  }
                }}
                className={styles.heroButton}
              >
                <div className={styles.heroButtonBlur}></div>
                <TicketIcon className="relative z-10 group-hover:animate-pulse" size={18} /> 
                <span className="relative z-10">Enquire for Tickets</span>
              </button>
              <a 
                href="https://wa.me/919023884833"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroButton2}
              >
                <div className={styles.heroButtonBlur}></div>
                <MessageCircle className="relative z-10" size={18} /> 
                <span className="relative z-10">Instant WhatsApp Quote</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <ShieldCheck size={16} className="text-blue-400" />
                <span className={styles.trustText}>Verified Service</span>
              </div>
              <div className={styles.trustItem}>
                <Clock size={16} className="text-indigo-400" />
                <span className={styles.trustText}>Quick Response</span>
              </div>
              <div className={styles.trustItem}>
                <TrendingUp size={16} className="text-teal-400" />
                <span className={styles.trustText}>Best Price</span>
              </div>
              <div className={styles.trustItem}>
                <Target size={16} className="text-purple-400" />
                <span className={styles.trustText}>High Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <div className={styles.statsContainer}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statBg}></div>
            <div className={styles.statContent}>
              <div className={styles.statFlex}>
                <div className={styles.statIconBg}>
                  <Users className="text-blue-500" size={16} />
                </div>
                <div>
                  <div className={styles.statValue}>100+</div>
                  <div className={styles.statLabel}>Happy Travelers</div>
                </div>
              </div>
              <p className={styles.statDesc}>Trusted service</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statBg}></div>
            <div className={styles.statContent}>
              <div className={styles.statFlex}>
                <div className={styles.statIconBg}>
                  <Target className="text-indigo-500" size={16} />
                </div>
                <div>
                  <div className={styles.statValue}>99.2%</div>
                  <div className={styles.statLabel}>Success Rate</div>
                </div>
              </div>
              <p className={styles.statDesc}>Confirmed tickets</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statBg}></div>
            <div className={styles.statContent}>
              <div className={styles.statFlex}>
                <div className={styles.statIconBg}>
                  <Clock className="text-teal-500" size={16} />
                </div>
                <div>
                  <div className={styles.statValue}>15-20 min</div>
                  <div className={styles.statLabel}>Avg Response</div>
                </div>
              </div>
              <p className={styles.statDesc}>Quick replies</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statBg}></div>
            <div className={styles.statContent}>
              <div className={styles.statFlex}>
                <div className={styles.statIconBg}>
                  <PhoneCall className="text-blue-500" size={16} />
                </div>
                <div>
                  <div className={styles.statValue}>24/7</div>
                  <div className={styles.statLabel}>Support</div>
                </div>
              </div>
              <p className={styles.statDesc}>Always available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsContainer}>
          <div className={styles.benefitsHeader}>
            <div className={styles.benefitsBadge}>
              <Star size={14} className={styles.benefitsBadgeIcon} />
              <span className={styles.benefitsBadgeText}>Why Choose Us</span>
            </div>
            <h2 className={styles.benefitsTitle}>
              The <span className={styles.benefitsTitleSpan}>Travel Advantage</span>
            </h2>
            <p className={styles.benefitsDesc}>
              Expert assistance for all your train and flight ticket needs
            </p>
          </div>
          
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitBg}></div>
              <div className={styles.benefitContent}>
                <div className={styles.benefitFlex}>
                  <div className={styles.benefitIconBg}>
                    <ShieldCheck className="text-blue-600" size={20} />
                  </div>
                  <div className={styles.benefitTextContainer}>
                    <h3 className={styles.benefitTitle}>Expert Assistance</h3>
                    <p className={styles.benefitDesc}>
                      Our travel experts have 10+ years experience in finding confirmed tickets
                    </p>
                    <div className={styles.benefitFeatures}>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>Tatkal booking experts</span>
                      </div>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>Best flight deals</span>
                      </div>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>Seat optimization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitBg}></div>
              <div className={styles.benefitContent}>
                <div className={styles.benefitFlex}>
                  <div className={styles.benefitIconBg}>
                    <TrendingUp className="text-indigo-600" size={20} />
                  </div>
                  <div className={styles.benefitTextContainer}>
                    <h3 className={styles.benefitTitle}>Best Price Guarantee</h3>
                    <p className={styles.benefitDesc}>
                      We compare multiple options to ensure you get the best fares
                    </p>
                    <div className={styles.benefitFeatures}>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>No hidden charges</span>
                      </div>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>Transparent pricing</span>
                      </div>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>Price match guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitBg}></div>
              <div className={styles.benefitContent}>
                <div className={styles.benefitFlex}>
                  <div className={styles.benefitIconBg}>
                    <Clock className="text-teal-600" size={20} />
                  </div>
                  <div className={styles.benefitTextContainer}>
                    <h3 className={styles.benefitTitle}>Quick Response</h3>
                    <p className={styles.benefitDesc}>
                      Get options within 15 minutes. 24/7 service available
                    </p>
                    <div className={styles.benefitFeatures}>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>Instant WhatsApp replies</span>
                      </div>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>Flight tracking</span>
                      </div>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>Emergency booking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitBg}></div>
              <div className={styles.benefitContent}>
                <div className={styles.benefitFlex}>
                  <div className={styles.benefitIconBg}>
                    <CheckCircle className="text-purple-600" size={20} />
                  </div>
                  <div className={styles.benefitTextContainer}>
                    <h3 className={styles.benefitTitle}>100% Verified</h3>
                    <p className={styles.benefitDesc}>
                      Safe and secure ticket booking with verified partners
                    </p>
                    <div className={styles.benefitFeatures}>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>Secure payment</span>
                      </div>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>Ticket verification</span>
                      </div>
                      <div className={styles.benefitFeature}>
                        <Check size={12} className={styles.benefitFeatureIcon} />
                        <span className={styles.benefitFeatureText}>Booking confirmation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section id="enquiry-form" className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <div className={styles.formBadge}>
              <Zap size={14} className={styles.formBadgeIcon} />
              <span className={styles.formBadgeText}>Quick & Easy Enquiry</span>
            </div>
            <h2 className={styles.formTitle}>
              Get Your <span className={styles.formTitleSpan}>Custom Quote</span>
            </h2>
            <p className={styles.formDesc}>
              Fill in your journey details and receive the best options from our travel experts
            </p>
          </div>
          
          <div className={styles.formCard}>
            {/* Form Header */}
            <div className={styles.formCardHeader}>
              <div className={styles.formHeaderFlex}>
                <div>
                  <h3 className={styles.formHeaderTitle}>Travel Ticket Enquiry Form</h3>
                  <p className={styles.formHeaderSub}>Get expert assistance for confirmed tickets</p>
                </div>
                <div className={styles.formHeaderRight}>
                  <Sparkles size={18} className={styles.formHeaderRightIcon} />
                  <span className={styles.formHeaderRightText}>Quick Response Guaranteed</span>
                </div>
              </div>

              {/* Ticket Type Toggle */}
              <div className={styles.ticketToggle}>
                <button
                  type="button"
                  onClick={() => handleTicketTypeChange("train")}
                  className={`${styles.ticketToggleBtn} ${
                    ticketType === "train" 
                      ? "bg-white text-blue-600 shadow-lg" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Train size={16} />
                  Train Tickets
                </button>
                <button
                  type="button"
                  onClick={() => handleTicketTypeChange("flight")}
                  className={`${styles.ticketToggleBtn} ${
                    ticketType === "flight" 
                      ? "bg-white text-blue-600 shadow-lg" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Plane size={16} />
                  Flight Tickets
                </button>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className={styles.formContent}>
              {/* Journey Details Card */}
              <div className={styles.journeyCard}>
                <div className={styles.journeyHeader}>
                  <div className={styles.journeyIcon}>
                    {ticketType === "train" ? 
                      <Train size={18} className="text-blue-600" /> : 
                      <Plane size={18} className="text-blue-600" />
                    }
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={styles.journeyTitle}>
                      {ticketType === "train" ? "Train Journey Details" : "Flight Journey Details"}
                    </h3>
                    <p className={styles.journeySub}>
                      {ticketType === "train" ? "Where and when you want to travel by train" : "Where and when you want to fly"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {/* From/To Locations */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        <MapPin size={12} className={styles.formLabelIcon} />
                        {ticketType === "train" ? "From Station *" : "From City/Airport *"}
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          name="from"
                          value={form.from}
                          onChange={handleChange}
                          className={`${styles.input} ${errors.from ? styles.inputError : styles.inputNormal}`}
                          placeholder={ticketType === "train" ? "Enter departure station" : "Enter departure city or airport"}
                        />
                        {ticketType === "train" ? (
                          <Train size={14} className={styles.inputIcon} />
                        ) : (
                          <Globe size={14} className={styles.inputIcon} />
                        )}
                      </div>
                      {errors.from && (
                        <p className={styles.errorText}>{errors.from}</p>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        <Navigation size={12} className="text-indigo-500" />
                        {ticketType === "train" ? "To Station *" : "To City/Airport *"}
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          name="to"
                          value={form.to}
                          onChange={handleChange}
                          className={`${styles.input} ${errors.to ? styles.inputError : styles.inputNormal}`}
                          placeholder={ticketType === "train" ? "Enter destination station" : "Enter destination city or airport"}
                        />
                        {ticketType === "train" ? (
                          <Train size={14} className={styles.inputIcon} />
                        ) : (
                          <Globe size={14} className={styles.inputIcon} />
                        )}
                      </div>
                      {errors.to && (
                        <p className={styles.errorText}>{errors.to}</p>
                      )}
                    </div>
                  </div>

                  {/* Switch Locations Button */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={switchLocations}
                      className={styles.switchBtn}
                    >
                      <ArrowUpDown size={14} />
                    </button>
                  </div>

                  {/* Date and Service/Trip Type */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        <Calendar size={12} className="text-indigo-500" />
                        {ticketType === "train" ? "Travel Date *" : "Departure Date *"}
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          min={getMinDate()}
                          className={`${styles.input} ${errors.date ? styles.inputError : styles.inputNormal}`}
                          required
                        />
                        <Calendar size={14} className={styles.inputIcon} />
                      </div>
                      {errors.date && (
                        <p className={styles.errorText}>{errors.date}</p>
                      )}
                    </div>

                    {ticketType === "train" ? (
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                          <Zap size={12} className="text-teal-500" />
                          Service Type *
                        </label>
                        <div className={styles.inputWrapper}>
                          <select
                            name="serviceType"
                            value={form.serviceType}
                            onChange={handleChange}
                            className={styles.select}
                          >
                            {TRAIN_SERVICE_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          <Zap size={14} className={styles.inputIcon} />
                        </div>
                      </div>
                    ) : (
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                          <ArrowRightLeft size={12} className="text-teal-500" />
                          Trip Type *
                        </label>
                        <div className={styles.inputWrapper}>
                          <select
                            name="tripType"
                            value={form.tripType}
                            onChange={handleChange}
                            className={styles.select}
                          >
                            {FLIGHT_TRIP_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          <ArrowRightLeft size={14} className={styles.inputIcon} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Return Date for Flight Round Trip */}
                  {ticketType === "flight" && form.tripType === "Round Trip" && (
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        <Calendar size={12} className="text-indigo-500" />
                        Return Date *
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          type="date"
                          name="returnDate"
                          value={form.returnDate}
                          onChange={handleChange}
                          min={form.date || getMinDate()}
                          className={`${styles.input} ${errors.returnDate ? styles.inputError : styles.inputNormal}`}
                        />
                        <Calendar size={14} className={styles.inputIcon} />
                      </div>
                      {errors.returnDate && (
                        <p className={styles.errorText}>{errors.returnDate}</p>
                      )}
                    </div>
                  )}

                  {/* Class and Passengers */}
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                        {ticketType === "train" ? "Travel Class" : "Flight Class"}
                      </label>
                      <div className={styles.inputWrapper}>
                        <select
                          name={ticketType === "train" ? "travelClass" : "flightClass"}
                          value={ticketType === "train" ? form.travelClass : form.flightClass}
                          onChange={handleChange}
                          className={styles.select}
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
                          <Train size={14} className={styles.inputIcon} />
                        ) : (
                          <Plane size={14} className={styles.inputIcon} />
                        )}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        <Users size={12} className="text-blue-500" />
                        Passengers *
                      </label>
                      <div className={styles.inputWrapper}>
                        <select
                          name="passengers"
                          value={form.passengers}
                          onChange={handleChange}
                          className={styles.select}
                        >
                          {[1,2,3,4,5,6].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                          ))}
                        </select>
                        <Users size={14} className={styles.inputIcon} />
                      </div>
                    </div>
                  </div>

                  {/* Passenger Names */}
                  <div className="space-y-3 sm:space-y-4">
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                      Passenger Names *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {passengerNames.map((name, index) => (
                        <div key={index} className="space-y-1 sm:space-y-2">
                          <div className={styles.inputWrapper}>
                            <input
                              value={name}
                              onChange={(e) => handlePassengerNameChange(index, e.target.value)}
                              data-passenger-index={index}
                              className={`${styles.input} ${errors[`passenger_${index}`] ? styles.inputError : styles.inputNormal}`}
                              placeholder={`Passenger ${index + 1} Full Name`}
                              required
                            />
                            <User size={14} className={styles.inputIcon} />
                          </div>
                          {errors[`passenger_${index}`] && (
                            <p className={styles.errorText}>{errors[`passenger_${index}`]}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details Card */}
              <div className={styles.contactCard}>
                <div className={styles.contactHeader}>
                  <div className={styles.contactIcon}>
                    <PhoneCall size={18} className="text-indigo-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={styles.journeyTitle}>Contact Details</h3>
                    <p className={styles.journeySub}>Where should we contact you?</p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                        Mobile Number *
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className={`${styles.input} ${errors.phone ? styles.inputError : styles.inputNormal}`}
                          placeholder="Enter 10-digit mobile number"
                          required
                        />
                        <Phone size={14} className={styles.inputIcon} />
                      </div>
                      {errors.phone && (
                        <p className={styles.errorText}>{errors.phone}</p>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                        Email (Optional)
                      </label>
                      <div className={styles.inputWrapper}>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className={`${styles.input} ${styles.inputNormal}`}
                          placeholder="your.email@example.com"
                        />
                        <Mail size={14} className={styles.inputIcon} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                      Preferred Time (Optional)
                    </label>
                    <input
                      type="time"
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={handleChange}
                      className={`${styles.input} ${styles.inputNormal}`}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      name="specialRequest"
                      value={form.specialRequest}
                      onChange={handleChange}
                      rows={3}
                      className={`${styles.input} ${styles.inputNormal} resize-none`}
                      placeholder="Any special requirements or preferences..."
                    />
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className={styles.infoCard}>
                <div className={styles.infoFlex}>
                  <Check size={14} className={styles.infoIcon} />
                  <div>
                    <p className={styles.infoTitle}>What happens next?</p>
                    <ul className={styles.infoList}>
                      <li>✓ Our {ticketType} ticket expert contacts you within 15 minutes</li>
                      <li>✓ Receive best available options & prices</li>
                      <li>✓ Get confirmed ticket booking assistance</li>
                      <li>✓ Professional service with 24/7 support</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Status Display */}
              {status.message && (
                <div className={
                  status.type === "success" ? styles.statusSuccess :
                  status.type === "error" ? styles.statusError :
                  styles.statusLoading
                }>
                  <div className={styles.statusFlex}>
                    {status.type === "success" ? (
                      <CheckCircle size={14} className={styles.statusIcon} />
                    ) : status.type === "error" ? (
                      <AlertCircle size={14} className={styles.statusIcon} />
                    ) : (
                      <Loader2 className={`animate-spin ${styles.statusIcon}`} size={14} />
                    )}
                    <span className={styles.statusText}>{status.message}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                {isSubmitting ? (
                  <span className={styles.submitFlex}>
                    <Loader2 className="animate-spin" size={16} />
                    Submitting Enquiry...
                  </span>
                ) : (
                  <span className={styles.submitFlex}>
                    <MessageCircle size={16} />
                    Submit {ticketType === "train" ? "Train" : "Flight"} Ticket Enquiry
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </form>
          </div>

          <div className={styles.whatsappLink}>
            <p className={styles.whatsappText}>
              💬 Prefer to talk? WhatsApp us at{" "}
              <a href="https://wa.me/916371106588" className={styles.whatsappNumber}>
                +91 63711 06588
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className={styles.benefitsTitle}>
              How It <span className={styles.benefitsTitleSpan}>Works</span>
            </h2>
            <p className={styles.benefitsDesc}>
              Simple process from enquiry to confirmed tickets
            </p>
          </div>
          
          <div className={styles.processGrid}>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>01</div>
              <div className={styles.processTitleFlex}>
                <div className={styles.processIconBg}>
                  <TicketIcon size={18} />
                </div>
                <h3 className={styles.processTitle}>Submit Enquiry</h3>
              </div>
              <p className={styles.processDesc}>Fill the form with your journey details</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>02</div>
              <div className={styles.processTitleFlex}>
                <div className={styles.processIconBg}>
                  <Phone size={18} />
                </div>
                <h3 className={styles.processTitle}>Expert Contact</h3>
              </div>
              <p className={styles.processDesc}>Get call from travel specialist within 15 min</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>03</div>
              <div className={styles.processTitleFlex}>
                <div className={styles.processIconBg}>
                  <CheckCircle size={18} />
                </div>
                <h3 className={styles.processTitle}>Get Options</h3>
              </div>
              <p className={styles.processDesc}>Receive best available tickets & prices</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>04</div>
              <div className={styles.processTitleFlex}>
                <div className={styles.processIconBg}>
                  <ShieldCheck size={18} />
                </div>
                <h3 className={styles.processTitle}>Confirm Booking</h3>
              </div>
              <p className={styles.processDesc}>Book tickets with 24/7 support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919023884833"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingWhatsApp}
      >
        <div className="relative">
          <div className={styles.floatingBg}></div>
          <div className={styles.floatingBtn}>
            <MessageCircle size={20} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Tickets;