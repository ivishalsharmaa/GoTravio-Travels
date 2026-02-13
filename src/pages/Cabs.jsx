import React, { useState } from "react";
import { API } from "../api.js";
import { 
  ArrowUpDown, 
  Check, 
  Shield, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle,
  Car,
  Users,
  Luggage,
  Star,
  ChevronRight,
  Navigation,
  Wifi,
  Droplets,
  Award,
  Headphones,
  CreditCard,
  X,
  Menu,
  Plus,
  Minus,
  ChevronDown,
  AlertCircle,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Globe,
  Key,
  Calendar,
  Target
} from "lucide-react";

// ================= COMPONENTS =================

const HeroSection = ({ scrollToForm }) => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
            <Sparkles size={14} className="sm:w-4 sm:h-4 text-yellow-300" />
            <span className="text-xs sm:text-sm font-medium">Premium Cab Services</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4">
            Travel in
            <span className="block text-blue-300 mt-2">Comfort & Style</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4">
            Experience premium cab services with professional drivers, luxury vehicles, and seamless booking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 md:mb-12 px-4">
            <button 
              onClick={scrollToForm}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
              <Car className="relative z-10 group-hover:animate-pulse" size={18} /> 
              <span className="relative z-10">Book Your Ride Now</span>
            </button>
            <a 
              href="https://wa.me/916371106588"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
              <MessageCircle className="relative z-10" size={18} /> 
              <span className="relative z-10">Instant WhatsApp Quote</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto px-4">
            {[
              { icon: <ShieldCheck size={16} className="sm:w-5 sm:h-5" />, text: "Verified & Safe", color: "text-green-400" },
              { icon: <Clock size={16} className="sm:w-5 sm:h-5" />, text: "24/7 Availability", color: "text-blue-400" },
              { icon: <TrendingUp size={16} className="sm:w-5 sm:h-5" />, text: "Best Price", color: "text-yellow-400" },
              { icon: <Headphones size={16} className="sm:w-5 sm:h-5" />, text: "Premium Support", color: "text-purple-400" },
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-white/10">
                <div className={`${badge.color} flex-shrink-0`}>{badge.icon}</div>
                <span className="text-[10px] sm:text-xs md:text-sm font-medium truncate">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const QuickStats = () => {
  const stats = [
    { 
      value: "100+", 
      label: "Satisfied Travelers",
      icon: <Users className="text-blue-500" size={16} />,
      desc: "Trusted by thousands"
    },
    { 
      value: "2+", 
      label: "Cities Network",
      icon: <Globe className="text-green-500" size={16} />,
      desc: "Pan-India coverage"
    },
    { 
      value: "99%", 
      label: "On-time Arrival",
      icon: <Target className="text-purple-500" size={16} />,
      desc: "Punctuality guaranteed"
    },
    { 
      value: "24/7", 
      label: "Expert Support",
      icon: <Headphones className="text-orange-500" size={16} />,
      desc: "Always here for you"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl transform group-hover:scale-105 transition-all duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 border border-gray-200/50 group-hover:border-blue-300/50 transition-all">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-1 sm:mb-2 md:mb-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">{stat.label}</div>
                </div>
              </div>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 hidden xs:block">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CabTypeGrid = ({ onSelectType }) => {
  const types = [
    { 
      icon: <Navigation className="text-blue-600" size={20} />, 
      title: "City Rides", 
      desc: "Hourly & point-to-point within city",
      gradient: "from-blue-50 to-blue-100"
    },
    { 
      icon: <MapPin className="text-green-600" size={20} />, 
      title: "Outstation", 
      desc: "Inter-city & long distance travel",
      gradient: "from-green-50 to-green-100"
    },
    { 
      icon: <Car className="text-purple-600" size={20} />, 
      title: "Airport Taxi", 
      desc: "Pickup & drop from airports",
      gradient: "from-purple-50 to-purple-100"
    },
    { 
      icon: <Award className="text-orange-600" size={20} />, 
      title: "Corporate", 
      desc: "Business & executive travel",
      gradient: "from-orange-50 to-orange-100"
    },
    { 
      icon: <Star className="text-yellow-600" size={20} />, 
      title: "Luxury", 
      desc: "Premium vehicles & VIP service",
      gradient: "from-yellow-50 to-yellow-100"
    },
    { 
      icon: <Users className="text-indigo-600" size={20} />, 
      title: "Tour Packages", 
      desc: "Sightseeing & multi-day tours",
      gradient: "from-indigo-50 to-indigo-100"
    },
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
            <Sparkles size={14} className="sm:w-4 sm:h-4 text-blue-500" />
            <span className="text-xs sm:text-sm font-medium text-blue-700">Explore Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 px-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Travel Style</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Select from our premium cab services tailored for every need
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {types.map((type, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectType(type.title);
                document.getElementById('enquiry-form')?.scrollIntoView({behavior: 'smooth'});
              }}
              className="group relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-sm group-hover:shadow-lg"></div>
              <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200/50 group-hover:border-blue-300 transition-all">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${type.gradient} flex-shrink-0`}>
                    {type.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 mb-1 truncate">{type.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">{type.desc}</p>
                    <div className="flex items-center text-blue-600 font-medium text-xs sm:text-sm">
                      <span>Get Quote</span>
                      <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VehicleSelector = ({ onSelectVehicle }) => {
  const vehicles = [
    { 
      type: "Hatchback", 
      capacity: 4, 
      features: ["AC", "GPS", "Economical", "City Rides"],
      icon: "🚗",
      tag: "Popular"
    },
    { 
      type: "Sedan", 
      capacity: 4, 
      features: ["Premium AC", "Extra Comfort", "Business", "Airport"],
      icon: "🚘",
      tag: "Comfort"
    },
    { 
      type: "SUV", 
      capacity: 6, 
      features: ["Family", "Luggage Space", "Long Distance", "Groups"],
      icon: "🚙",
      tag: "Spacious"
    },
    { 
      type: "Luxury", 
      capacity: 4, 
      features: ["VIP Service", "Premium", "Executive", "Events"],
      icon: "🏎️",
      tag: "Premium"
    },
    { 
      type: "Traveller", 
      capacity: 12, 
      features: ["Large Groups", "Tours", "Family Trips", "Corporate"],
      icon: "🚌",
      tag: "Group"
    },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
            <Car size={14} className="sm:w-4 sm:h-4 text-blue-500" />
            <span className="text-xs sm:text-sm font-medium text-blue-700">Premium Fleet</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 px-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Premium Fleet</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Choose from our well-maintained, clean, and comfortable vehicles
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {vehicles.map((vehicle, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelected(idx);
                onSelectVehicle(vehicle.type);
              }}
              className={`group relative cursor-pointer transform transition-all duration-300 ${
                selected === idx ? 'scale-[1.02]' : 'hover:scale-[1.02]'
              }`}
            >
              <div className={`absolute inset-0 rounded-xl sm:rounded-2xl ${
                selected === idx 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
                  : 'bg-gradient-to-r from-gray-100 to-white'
              }`}></div>
              
              <div className={`relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 transition-all ${
                selected === idx 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200/50 group-hover:border-blue-300 shadow-sm'
              }`}>
                {/* Tag */}
                {vehicle.tag && (
                  <div className="absolute -top-2 left-3 sm:left-4">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] sm:text-xs font-bold rounded-full">
                      {vehicle.tag}
                    </span>
                  </div>
                )}
                
                {/* Vehicle Icon */}
                <div className="text-center mb-3 sm:mb-4">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-2">{vehicle.icon}</div>
                  <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900">{vehicle.type}</h3>
                </div>
                
                {/* Capacity */}
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                  <Users size={12} className="sm:w-4 sm:h-4 text-gray-500" />
                  <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">Up to {vehicle.capacity} passengers</span>
                </div>
                
                {/* Features */}
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  {vehicle.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 sm:gap-2">
                      <Check size={10} className="sm:w-3 sm:h-3 text-green-500 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs text-gray-600 truncate">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Select Button */}
                <button className={`w-full py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                  selected === idx
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 group-hover:from-blue-100 group-hover:to-purple-100'
                }`}>
                  {selected === idx ? '✓ Selected' : 'Select Vehicle'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6 sm:mt-8 px-4">
          <p className="text-[11px] sm:text-xs text-gray-500">
            💡 <span className="font-medium">Don't see what you need?</span> Contact us for custom requirements
          </p>
        </div>
      </div>
    </section>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="text-green-600" size={20} />,
      title: "Verified Drivers",
      description: "All drivers undergo thorough background checks and are professionally trained",
      features: ["Police verification", "Experience certificates", "ID proof displayed"]
    },
    {
      icon: <Key className="text-blue-600" size={20} />,
      title: "Hassle-Free Booking",
      description: "Simple process with instant confirmation and flexible payment options",
      features: ["No advance payment", "Multiple payment methods", "Instant confirmation"]
    },
    {
      icon: <Clock className="text-purple-600" size={20} />,
      title: "24/7 Availability",
      description: "Round-the-clock service with real-time tracking and support",
      features: ["Live GPS tracking", "Emergency support", "Flight/train tracking"]
    },
    {
      icon: <TrendingUp className="text-orange-600" size={20} />,
      title: "Best Price Guarantee",
      description: "Competitive pricing with transparent charges and no hidden fees",
      features: ["Price match guarantee", "No surge pricing", "Transparent billing"]
    }
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
            <Star size={14} className="sm:w-4 sm:h-4 text-green-500" />
            <span className="text-xs sm:text-sm font-medium text-green-700">Why Choose Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 px-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">GoTravio Advantage</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Experience the difference with our premium cab services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-sm group-hover:shadow-lg"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200/50 group-hover:border-green-300 transition-all">
                <div className="flex flex-col xs:flex-row items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-50 to-blue-50 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div className="flex-1 w-full xs:w-auto">
                    <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 mb-1 sm:mb-2">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 md:mb-4">{benefit.description}</p>
                    <div className="space-y-1 sm:space-y-2">
                      {benefit.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 sm:gap-2">
                          <Check size={12} className="sm:w-3 sm:h-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] sm:text-xs text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EnquiryForm = ({ initialData, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    pickupLocation: "",
    dropLocation: "",
    date: "",
    time: "",
    carType: "",
    name: "",
    phone: "",
    email: "",
    passengers: 1,
    purpose: "leisure",
    ...initialData
  });

  const [showEmail, setShowEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!form.pickupLocation.trim()) newErrors.pickupLocation = "Pickup location is required";
      if (!form.dropLocation.trim()) newErrors.dropLocation = "Destination is required";
      if (!form.date) newErrors.date = "Travel date is required";
      if (!form.time) newErrors.time = "Time is required";
    }
    
    if (step === 3) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
      if (form.phone && !/^[0-9]{10}$/.test(form.phone.replace(/\D/g, ''))) {
        newErrors.phone = "Valid 10-digit phone number required";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    try {
      const response = await API.post("/cabs", {
        pickupLocation: form.pickupLocation,
        dropLocation: form.dropLocation,
        date: form.date,
        time: form.time,
        carType: form.carType || "Sedan",
        name: form.name,
        phone: form.phone,
        email: form.email || "",
      });
      
      console.log("✅ Form submitted successfully:", response.data);
      
      const message = `🚕 New Cab Enquiry!\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📍 From: ${form.pickupLocation}\n🎯 To: ${form.dropLocation}\n📅 Date: ${form.date}\n⏰ Time: ${form.time}\n🚗 Vehicle: ${form.carType || "Sedan"}\n👥 Passengers: ${form.passengers}`;
      const whatsappUrl = `https://wa.me/919023884833?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      onSubmit("🎉 Thank you! Our travel expert will contact you within 15 minutes with the best price.");
      
      setForm({
        pickupLocation: "",
        dropLocation: "",
        date: "",
        time: "",
        carType: "",
        name: "",
        phone: "",
        email: "",
        passengers: 1,
        purpose: "leisure",
      });
      setStep(1);
      setShowEmail(false);
      setErrors({});
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      if (error.response) {
        onSubmit(`❌ Error: ${error.response.data.message || "Failed to submit form"}`);
      } else if (error.request) {
        onSubmit("❌ Cannot connect to server. Please check if backend is running.");
      } else {
        onSubmit("❌ Something went wrong. Please WhatsApp us directly at +91 63711 06588");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const switchLocations = () => {
    setForm({
      ...form,
      pickupLocation: form.dropLocation,
      dropLocation: form.pickupLocation,
    });
  };

  const steps = [
    { number: 1, title: "Journey Details", icon: <MapPin size={14} /> },
    { number: 2, title: "Vehicle Choice", icon: <Car size={14} /> },
    { number: 3, title: "Your Details", icon: <Users size={14} /> },
  ];

  return (
    <section id="enquiry-form" className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
            <Zap size={14} className="sm:w-4 sm:h-4 text-blue-500" />
            <span className="text-xs sm:text-sm font-medium text-blue-700">Quick & Easy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 px-4">
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Custom Quote</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Fill in your details and receive the best price from our travel experts
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
          {/* Form Header with Steps */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-4 sm:p-5 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 sm:mb-5 md:mb-6 gap-3 sm:gap-4">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Personalized Cab Quote</h3>
                <p className="text-xs sm:text-sm text-blue-100">Get the best price for your journey</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-300" />
                <span className="text-xs sm:text-sm font-medium text-white">Quick Response</span>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between relative">
              {steps.map((stepItem, idx) => (
                <div key={idx} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step > stepItem.number ? 'bg-green-500 text-white shadow-lg' :
                    step === stepItem.number ? 'bg-white text-blue-700 shadow-lg' :
                    'bg-white/20 text-white'
                  }`}>
                    {step > stepItem.number ? '✓' : stepItem.icon}
                  </div>
                  <span className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-medium transition-colors ${
                    step >= stepItem.number ? 'text-white' : 'text-blue-200'
                  }`}>
                    {stepItem.title}
                  </span>
                </div>
              ))}
              <div className="absolute top-4 sm:top-4.5 left-0 right-0 h-0.5 sm:h-1 bg-white/20 -z-10">
                <div className={`h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300`}
                     style={{width: `${((step-1) * 50)}%`}}></div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                      <MapPin size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-500" />
                      Pickup Location *
                    </label>
                    <input
                      name="pickupLocation"
                      value={form.pickupLocation}
                      onChange={handleChange}
                      placeholder="Where should we pick you up?"
                      className={`w-full rounded-lg sm:rounded-xl border ${errors.pickupLocation ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                    />
                    {errors.pickupLocation && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.pickupLocation}</p>
                    )}
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                      <Navigation size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-green-500" />
                      Destination *
                    </label>
                    <input
                      name="dropLocation"
                      value={form.dropLocation}
                      onChange={handleChange}
                      placeholder="Where are you heading?"
                      className={`w-full rounded-lg sm:rounded-xl border ${errors.dropLocation ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                    />
                    {errors.dropLocation && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.dropLocation}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={switchLocations}
                    className="p-1.5 sm:p-2 md:p-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 transition-all"
                  >
                    <ArrowUpDown size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                      <Calendar size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-purple-500" />
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className={`w-full rounded-lg sm:rounded-xl border ${errors.date ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.date}</p>
                    )}
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                      <Clock size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-orange-500" />
                      Time *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className={`w-full rounded-lg sm:rounded-xl border ${errors.time ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                    />
                    {errors.time && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-3 sm:pt-4">
                  <div></div>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep()) setStep(2);
                    }}
                    className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 sm:gap-3 transition-all hover:scale-105"
                  >
                    Next: Vehicle Selection
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" size={14} />
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                      <Users size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-500" />
                      Number of Passengers
                    </label>
                    <select
                      name="passengers"
                      value={form.passengers}
                      onChange={handleChange}
                      className="w-full rounded-lg sm:rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white"
                    >
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2">
                      <Car size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-green-500" />
                      Preferred Vehicle Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3">
                      {['Hatchback', 'Sedan', 'SUV', 'Luxury', 'Traveller', 'Any'].map(type => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setForm({...form, carType: type})}
                          className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm ${
                            form.carType === type 
                              ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700' 
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <span className="font-medium truncate block">{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm text-blue-800 font-medium">Custom Pricing</p>
                        <p className="text-[10px] sm:text-xs text-blue-600">
                          Our travel expert will provide the best price based on your exact requirements
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row gap-3 justify-between pt-3 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all text-xs sm:text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full xs:w-auto group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    Next: Your Details
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" size={14} />
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                      <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                        Your Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full rounded-lg sm:rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit mobile number"
                        className={`w-full rounded-lg sm:rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-[10px] sm:text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {showEmail ? (
                    <div className="space-y-1 sm:space-y-2 animate-slideDown">
                      <label className="block text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full rounded-lg sm:rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowEmail(true)}
                      className="text-blue-600 hover:text-blue-800 text-[11px] sm:text-xs font-medium flex items-center gap-1 sm:gap-2"
                    >
                      <Plus size={12} />
                      Add email for itinerary (optional)
                    </button>
                  )}

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-200">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Check size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">What happens next?</p>
                        <ul className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
                          <li>✓ Our travel expert contacts you within 15 minutes</li>
                          <li>✓ Receive custom quote based on exact requirements</li>
                          <li>✓ Confirm booking with no advance payment required</li>
                          <li>✓ Professional driver arrives on time at pickup location</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row gap-3 justify-between pt-3 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all text-xs sm:text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full xs:w-auto group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <MessageCircle size={14} className="sm:w-4 sm:h-4" />
                        Get Custom Quote Now
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="text-center mt-6 sm:mt-8 px-4">
          <p className="text-[11px] sm:text-xs md:text-sm text-gray-500">
            💬 Prefer to talk? WhatsApp us at{" "}
            <a href="https://wa.me/916371106588" className="text-blue-600 font-medium hover:text-blue-800">
              +91 63711 06588
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

const Info = ({ size, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <line x1="12" y1="16" x2="12" y2="12" strokeWidth="2" />
    <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2" />
  </svg>
);

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/916371106588"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg group-hover:blur-xl transition-all opacity-70"></div>
        <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-2.5 sm:p-3 md:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110">
          <MessageCircle size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </div>
      </div>
    </a>
  );
};

// ================= MAIN COMPONENT =================

const Cabs = () => {
  const [formData, setFormData] = useState({});
  const [formMessage, setFormMessage] = useState("");

  const scrollToForm = () => {
    document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (message) => {
    setFormMessage(message);
    setTimeout(() => setFormMessage(""), 5000);
  };

  const handleSelectType = (type) => {
    setFormData({...formData, tripType: type});
    scrollToForm();
  };

  const handleSelectVehicle = (vehicle) => {
    setFormData({...formData, carType: vehicle});
    scrollToForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      <HeroSection scrollToForm={scrollToForm} />
      <QuickStats />
      <CabTypeGrid onSelectType={handleSelectType} />
      <BenefitsSection />
      <VehicleSelector onSelectVehicle={handleSelectVehicle} />

      {formMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown w-[90%] sm:w-auto">
          <div className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-2xl text-xs sm:text-sm ${
            formMessage.includes('🎉') 
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
              : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
          }`}>
            {formMessage}
          </div>
        </div>
      )}

      <EnquiryForm 
        initialData={formData}
        onSubmit={handleFormSubmit}
      />
      <FloatingWhatsApp />
    </div>
  );
};

export default Cabs;