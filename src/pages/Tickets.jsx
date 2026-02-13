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

  return (
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
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 sm:py-3 mb-4 sm:mb-6">
                <Sparkles size={16} className="text-blue-300" />
                <span className="text-sm sm:text-base font-medium">Travel Ticket Enquiry</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                Get Confirmed
                <span className="block text-blue-300 mt-2 sm:mt-3">Travel Tickets</span>
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto">
                Expert assistance for train and flight bookings across India and worldwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center mb-8 sm:mb-10">
                <button 
                  onClick={() => {
                    const formElement = document.getElementById('enquiry-form');
                    if (formElement) {
                      formElement.scrollIntoView({behavior: 'smooth'});
                    }
                  }}
                  className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-sm sm:text-base lg:text-lg xl:text-xl flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                  <TicketIcon className="relative z-10 group-hover:animate-pulse" size={18} /> 
                  <span className="relative z-10">Enquire for Tickets</span>
                </button>
                <a 
                  href="https://wa.me/919023884833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl font-bold text-sm sm:text-base lg:text-lg xl:text-xl flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                  <MessageCircle className="relative z-10" size={18} /> 
                  <span className="relative z-10">Instant WhatsApp Quote</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10">
                  <ShieldCheck size={18} className="text-blue-400" />
                  <span className="text-xs sm:text-sm lg:text-base font-medium">Verified Service</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10">
                  <Clock size={18} className="text-indigo-400" />
                  <span className="text-xs sm:text-sm lg:text-base font-medium">Quick Response</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10">
                  <TrendingUp size={18} className="text-teal-400" />
                  <span className="text-xs sm:text-sm lg:text-base font-medium">Best Price</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10">
                  <Target size={18} className="text-purple-400" />
                  <span className="text-xs sm:text-sm lg:text-base font-medium">High Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK STATS ================= */}
      <div className="w-full bg-white py-10 sm:py-12 lg:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-gray-200/50 group-hover:border-blue-300/50 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl">
                    <Users className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">100+</div>
                    <div className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">Happy Travelers</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm lg:text-base text-gray-500">Trusted service</p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-gray-200/50 group-hover:border-blue-300/50 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl">
                    <Target className="text-indigo-500" size={20} />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">99.2%</div>
                    <div className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">Success Rate</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm lg:text-base text-gray-500">Confirmed tickets</p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-gray-200/50 group-hover:border-blue-300/50 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl">
                    <Clock className="text-teal-500" size={20} />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">15-20 min</div>
                    <div className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">Avg Response</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm lg:text-base text-gray-500">Quick replies</p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-gray-200/50 group-hover:border-blue-300/50 transition-all">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl">
                    <PhoneCall className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">24/7</div>
                    <div className="text-xs sm:text-sm lg:text-base font-medium text-gray-700">Support</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm lg:text-base text-gray-500">Always available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BENEFITS SECTION ================= */}
      <section className="w-full bg-gradient-to-b from-white to-gray-50 py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="w-full">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 sm:px-5 py-2 sm:py-3 mb-3 sm:mb-4">
              <Star size={16} className="text-blue-500" />
              <span className="text-sm sm:text-base lg:text-lg font-medium text-blue-700">Why Choose Us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Travel Advantage</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Expert assistance for all your train and flight ticket needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 w-full">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-sm group-hover:shadow-lg"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/50 group-hover:border-blue-300 transition-all">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 lg:gap-6">
                  <div className="p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex-shrink-0">
                    <ShieldCheck className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-900 mb-2">Expert Assistance</h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4">Our travel experts have 10+ years experience in finding confirmed tickets</p>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">Tatkal booking experts</span>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">Best flight deals</span>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">Seat optimization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-sm group-hover:shadow-lg"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/50 group-hover:border-blue-300 transition-all">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 lg:gap-6">
                  <div className="p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex-shrink-0">
                    <TrendingUp className="text-indigo-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-900 mb-2">Best Price Guarantee</h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4">We compare multiple options to ensure you get the best fares</p>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">No hidden charges</span>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">Transparent pricing</span>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">Price match guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-sm group-hover:shadow-lg"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/50 group-hover:border-blue-300 transition-all">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 lg:gap-6">
                  <div className="p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex-shrink-0">
                    <Clock className="text-teal-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-900 mb-2">Quick Response</h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4">Get options within 15 minutes. 24/7 service available</p>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">Instant WhatsApp replies</span>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">Flight tracking</span>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">Emergency booking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-sm group-hover:shadow-lg"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/50 group-hover:border-blue-300 transition-all">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 lg:gap-6">
                  <div className="p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex-shrink-0">
                    <CheckCircle className="text-purple-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-900 mb-2">100% Verified</h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4">Safe and secure ticket booking with verified partners</p>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">Secure payment</span>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">Ticket verification</span>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Check size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base lg:text-lg text-gray-700">Booking confirmation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN FORM SECTION ================= */}
      <section id="enquiry-form" className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 sm:px-5 py-2 sm:py-3 mb-3 sm:mb-4">
              <Zap size={16} className="text-blue-500" />
              <span className="text-sm sm:text-base lg:text-lg font-medium text-blue-700">Quick & Easy Enquiry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
              Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Custom Quote</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Fill in your journey details and receive the best options from our travel experts
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl lg:rounded-4xl shadow-2xl overflow-hidden border border-gray-200/50">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 sm:p-6 lg:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3 sm:gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">Travel Ticket Enquiry Form</h3>
                  <p className="text-sm sm:text-base lg:text-lg text-blue-100">Get expert assistance for confirmed tickets</p>
                </div>
                <div className="hidden md:flex items-center gap-2 sm:gap-3">
                  <Sparkles size={20} className="text-yellow-300" />
                  <span className="text-sm sm:text-base lg:text-lg font-medium text-white">Quick Response Guaranteed</span>
                </div>
              </div>

              {/* Ticket Type Toggle */}
              <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-1 space-y-2 sm:space-y-0 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-1 max-w-full sm:max-w-md lg:max-w-lg">
                <button
                  type="button"
                  onClick={() => handleTicketTypeChange("train")}
                  className={`flex-1 py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-lg sm:rounded-xl lg:rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base ${
                    ticketType === "train" 
                      ? "bg-white text-blue-600 shadow-lg" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Train size={18} />
                  Train Tickets
                </button>
                <button
                  type="button"
                  onClick={() => handleTicketTypeChange("flight")}
                  className={`flex-1 py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-lg sm:rounded-xl lg:rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base ${
                    ticketType === "flight" 
                      ? "bg-white text-blue-600 shadow-lg" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Plane size={18} />
                  Flight Tickets
                </button>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 lg:p-8 xl:p-10 space-y-5 sm:space-y-6 lg:space-y-8">
              {/* Journey Details Card */}
              <div className="bg-gradient-to-br from-blue-50/50 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-blue-100/50">
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
                          className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors.from ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
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
                          className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors.to ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
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
                    <button
                      type="button"
                      onClick={switchLocations}
                      className="p-2 sm:p-3 lg:p-4 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 transition-all"
                    >
                      <ArrowUpDown size={18} />
                    </button>
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
                          className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors.date ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
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
                            className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white"
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
                            className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white"
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
                    <div className="space-y-1 sm:space-y-2 lg:space-y-3">
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
                          className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors.returnDate ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                        />
                        <Calendar size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      {errors.returnDate && (
                        <p className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">{errors.returnDate}</p>
                      )}
                    </div>
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
                          className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white"
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
                          className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white"
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
                        <div key={index} className="space-y-1 sm:space-y-2">
                          <div className="relative">
                            <input
                              value={name}
                              onChange={(e) => handlePassengerNameChange(index, e.target.value)}
                              data-passenger-index={index}
                              className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors[`passenger_${index}`] ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                              placeholder={`Passenger ${index + 1} Full Name`}
                              required
                            />
                            <User size={16} className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                          {errors[`passenger_${index}`] && (
                            <p className="text-red-500 text-xs sm:text-sm lg:text-base mt-1">{errors[`passenger_${index}`]}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details Card */}
              <div className="bg-gradient-to-br from-indigo-50/50 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-indigo-100/50">
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
                          className={`w-full rounded-lg sm:rounded-xl lg:rounded-2xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
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
                          className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 pl-8 sm:pl-10 lg:pl-12 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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
                      className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
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
                      className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border border-gray-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                      placeholder="Any special requirements or preferences..."
                    />
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border border-blue-200">
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
              </div>

              {/* Status Display */}
              {status.message && (
                <div className={`rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border ${
                  status.type === "success" 
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-800" 
                    : status.type === "error"
                    ? "bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-800"
                    : "bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-800"
                }`}>
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
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
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
              </button>
            </form>
          </div>

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
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Works</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              Simple process from enquiry to confirmed tickets
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 w-full">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/50 shadow-sm hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl text-white font-bold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4">
                01
              </div>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3">
                <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <TicketIcon size={20} />
                </div>
                <h3 className="font-bold text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-900">Submit Enquiry</h3>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">Fill the form with your journey details</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/50 shadow-sm hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl text-white font-bold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4">
                02
              </div>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3">
                <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <Phone size={20} />
                </div>
                <h3 className="font-bold text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-900">Expert Contact</h3>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">Get call from travel specialist within 15 min</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/50 shadow-sm hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl text-white font-bold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4">
                03
              </div>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3">
                <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <CheckCircle size={20} />
                </div>
                <h3 className="font-bold text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-900">Get Options</h3>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">Receive best available tickets & prices</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 border border-gray-200/50 shadow-sm hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl text-white font-bold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4">
                04
              </div>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3">
                <div className="p-2 sm:p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-bold text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-900">Confirm Booking</h3>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">Book tickets with 24/7 support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919023884833"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg group-hover:blur-xl transition-all opacity-70"></div>
          <div className="relative bg-gradient-to-br from-blue-500 to-teal-500 text-white p-3 sm:p-4 lg:p-5 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110">
            <MessageCircle size={24} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default Tickets;