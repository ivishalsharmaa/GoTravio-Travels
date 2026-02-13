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
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white overflow-hidden w-full">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-28">
        <div className="w-full">
          <div className="text-center max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 sm:px-6 py-2.5 sm:py-3 mb-6 sm:mb-8">
              <Sparkles size={18} className="sm:w-5 sm:h-5 text-yellow-300" />
              <span className="text-sm sm:text-base font-medium">Premium Cab Services</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight px-4">
              Travel in
              <span className="block text-blue-300 mt-3">Comfort & Style</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto px-4">
              Experience premium cab services with professional drivers, luxury vehicles, and seamless booking.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-10 sm:mb-12 md:mb-16 px-4">
              <button 
                onClick={scrollToForm}
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg md:text-xl flex items-center justify-center gap-3 sm:gap-4 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                <Car className="relative z-10 group-hover:animate-pulse" size={22} /> 
                <span className="relative z-10">Book Your Ride Now</span>
              </button>
              <a 
                href="https://wa.me/916371106588"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg md:text-xl flex items-center justify-center gap-3 sm:gap-4 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                <MessageCircle className="relative z-10" size={22} /> 
                <span className="relative z-10">Instant WhatsApp Quote</span>
              </a>
            </div>

            {/* Trust Indicators - Bigger */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto px-4">
              {[
                { icon: <ShieldCheck size={20} className="sm:w-6 sm:h-6" />, text: "Verified & Safe", color: "text-green-400" },
                { icon: <Clock size={20} className="sm:w-6 sm:h-6" />, text: "24/7 Availability", color: "text-blue-400" },
                { icon: <TrendingUp size={20} className="sm:w-6 sm:h-6" />, text: "Best Price", color: "text-yellow-400" },
                { icon: <Headphones size={20} className="sm:w-6 sm:h-6" />, text: "Premium Support", color: "text-purple-400" },
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-3 sm:gap-4 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/10">
                  <div className={`${badge.color} flex-shrink-0`}>{badge.icon}</div>
                  <span className="text-sm sm:text-base md:text-lg font-medium truncate">{badge.text}</span>
                </div>
              ))}
            </div>
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
      icon: <Users className="text-blue-500" size={24} />,
      desc: "Trusted by thousands"
    },
    { 
      value: "2+", 
      label: "Cities Network",
      icon: <Globe className="text-green-500" size={24} />,
      desc: "Pan-India coverage"
    },
    { 
      value: "99%", 
      label: "On-time Arrival",
      icon: <Target className="text-purple-500" size={24} />,
      desc: "Punctuality guaranteed"
    },
    { 
      value: "24/7", 
      label: "Expert Support",
      icon: <Headphones className="text-orange-500" size={24} />,
      desc: "Always here for you"
    },
  ];

  return (
    <div className="w-full bg-white py-12 sm:py-16 md:py-20">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl sm:rounded-3xl transform group-hover:scale-105 transition-all duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/50 group-hover:border-blue-300/50 transition-all">
                <div className="flex items-center gap-4 sm:gap-5 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm sm:text-base md:text-lg font-medium text-gray-700">{stat.label}</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-500">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CabTypeGrid = ({ onSelectType }) => {
  const types = [
    { 
      icon: <Navigation className="text-blue-600" size={28} />, 
      title: "City Rides", 
      desc: "Hourly & point-to-point within city",
      gradient: "from-blue-50 to-blue-100"
    },
    { 
      icon: <MapPin className="text-green-600" size={28} />, 
      title: "Outstation", 
      desc: "Inter-city & long distance travel",
      gradient: "from-green-50 to-green-100"
    },
    { 
      icon: <Car className="text-purple-600" size={28} />, 
      title: "Airport Taxi", 
      desc: "Pickup & drop from airports",
      gradient: "from-purple-50 to-purple-100"
    },
    { 
      icon: <Award className="text-orange-600" size={28} />, 
      title: "Corporate", 
      desc: "Business & executive travel",
      gradient: "from-orange-50 to-orange-100"
    },
    { 
      icon: <Star className="text-yellow-600" size={28} />, 
      title: "Luxury", 
      desc: "Premium vehicles & VIP service",
      gradient: "from-yellow-50 to-yellow-100"
    },
    { 
      icon: <Users className="text-indigo-600" size={28} />, 
      title: "Tour Packages", 
      desc: "Sightseeing & multi-day tours",
      gradient: "from-indigo-50 to-indigo-100"
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-20 px-6 sm:px-8 lg:px-12 xl:px-16">
      <div className="w-full">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 mb-4 sm:mb-5">
            <Sparkles size={18} className="sm:w-5 sm:h-5 text-blue-500" />
            <span className="text-sm sm:text-base md:text-lg font-medium text-blue-700">Explore Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Travel Style</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Select from our premium cab services tailored for every need
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {types.map((type, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectType(type.title);
                document.getElementById('enquiry-form')?.scrollIntoView({behavior: 'smooth'});
              }}
              className="group relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-sm group-hover:shadow-lg"></div>
              <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/50 group-hover:border-blue-300 transition-all">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${type.gradient} flex-shrink-0`}>
                    {type.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-900 mb-2 truncate">{type.title}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4 line-clamp-2">{type.desc}</p>
                    <div className="flex items-center text-blue-600 font-medium text-sm sm:text-base md:text-lg">
                      <span>Get Quote</span>
                      <ChevronRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
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
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20 px-6 sm:px-8 lg:px-12 xl:px-16">
      <div className="w-full">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 mb-4 sm:mb-5">
            <Car size={18} className="sm:w-5 sm:h-5 text-blue-500" />
            <span className="text-sm sm:text-base md:text-lg font-medium text-blue-700">Premium Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Premium Fleet</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Choose from our well-maintained, clean, and comfortable vehicles
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10">
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
              <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl ${
                selected === idx 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
                  : 'bg-gradient-to-r from-gray-100 to-white'
              }`}></div>
              
              <div className={`relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 transition-all ${
                selected === idx 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200/50 group-hover:border-blue-300 shadow-sm'
              }`}>
                {/* Tag */}
                {vehicle.tag && (
                  <div className="absolute -top-3 left-4 sm:left-5">
                    <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-bold rounded-full">
                      {vehicle.tag}
                    </span>
                  </div>
                )}
                
                {/* Vehicle Icon */}
                <div className="text-center mb-4 sm:mb-5">
                  <div className="text-5xl sm:text-6xl md:text-7xl mb-2 sm:mb-3">{vehicle.icon}</div>
                  <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-900">{vehicle.type}</h3>
                </div>
                
                {/* Capacity */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                  <Users size={16} className="sm:w-5 sm:h-5 text-gray-500" />
                  <span className="text-sm sm:text-base md:text-lg font-medium text-gray-700">Up to {vehicle.capacity} passengers</span>
                </div>
                
                {/* Features */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                  {vehicle.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 sm:gap-3">
                      <Check size={14} className="sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-600 truncate">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Select Button */}
                <button className={`w-full py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base md:text-lg transition-all ${
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
        
        <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4">
          <p className="text-sm sm:text-base md:text-lg text-gray-500">
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
      icon: <ShieldCheck className="text-green-600" size={28} />,
      title: "Verified Drivers",
      description: "All drivers undergo thorough background checks and are professionally trained",
      features: ["Police verification", "Experience certificates", "ID proof displayed"]
    },
    {
      icon: <Key className="text-blue-600" size={28} />,
      title: "Hassle-Free Booking",
      description: "Simple process with instant confirmation and flexible payment options",
      features: ["No advance payment", "Multiple payment methods", "Instant confirmation"]
    },
    {
      icon: <Clock className="text-purple-600" size={28} />,
      title: "24/7 Availability",
      description: "Round-the-clock service with real-time tracking and support",
      features: ["Live GPS tracking", "Emergency support", "Flight/train tracking"]
    },
    {
      icon: <TrendingUp className="text-orange-600" size={28} />,
      title: "Best Price Guarantee",
      description: "Competitive pricing with transparent charges and no hidden fees",
      features: ["Price match guarantee", "No surge pricing", "Transparent billing"]
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20 px-6 sm:px-8 lg:px-12 xl:px-16">
      <div className="w-full">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 mb-4 sm:mb-5">
            <Star size={18} className="sm:w-5 sm:h-5 text-green-500" />
            <span className="text-sm sm:text-base md:text-lg font-medium text-green-700">Why Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">GoTravio Advantage</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Experience the difference with our premium cab services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-sm group-hover:shadow-lg"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/50 group-hover:border-green-300 transition-all">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-900 mb-2 sm:mb-3">{benefit.title}</h3>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-3 sm:mb-4">{benefit.description}</p>
                    <div className="space-y-2 sm:space-y-3">
                      {benefit.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 sm:gap-3">
                          <Check size={16} className="sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base md:text-lg text-gray-700">{feature}</span>
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
    { number: 1, title: "Journey Details", icon: <MapPin size={16} /> },
    { number: 2, title: "Vehicle Choice", icon: <Car size={16} /> },
    { number: 3, title: "Your Details", icon: <Users size={16} /> },
  ];

  return (
    <section id="enquiry-form" className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 py-12 sm:py-16 md:py-20 px-6 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 mb-4 sm:mb-5">
            <Zap size={18} className="sm:w-5 sm:h-5 text-blue-500" />
            <span className="text-sm sm:text-base md:text-lg font-medium text-blue-700">Quick & Easy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Custom Quote</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Fill in your details and receive the best price from our travel experts
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl sm:rounded-4xl shadow-2xl overflow-hidden border border-gray-200/50">
          {/* Form Header with Steps */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-5">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Personalized Cab Quote</h3>
                <p className="text-sm sm:text-base md:text-lg text-blue-100">Get the best price for your journey</p>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <Sparkles size={22} className="text-yellow-300" />
                <span className="text-sm sm:text-base font-medium text-white">Quick Response</span>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between relative">
              {steps.map((stepItem, idx) => (
                <div key={idx} className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step > stepItem.number ? 'bg-green-500 text-white shadow-lg' :
                    step === stepItem.number ? 'bg-white text-blue-700 shadow-lg' :
                    'bg-white/20 text-white'
                  }`}>
                    {step > stepItem.number ? '✓' : stepItem.icon}
                  </div>
                  <span className={`text-xs sm:text-sm mt-2 font-medium transition-colors ${
                    step >= stepItem.number ? 'text-white' : 'text-blue-200'
                  }`}>
                    {stepItem.title}
                  </span>
                </div>
              ))}
              <div className="absolute top-5 sm:top-6 left-0 right-0 h-0.5 sm:h-1 bg-white/20 -z-10">
                <div className={`h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300`}
                     style={{width: `${((step-1) * 50)}%`}}></div>
              </div>
            </div>
          </div>

          {/* Form Content - Bigger */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 flex items-center gap-2">
                      <MapPin size={16} className="sm:w-5 sm:h-5 text-blue-500" />
                      Pickup Location *
                    </label>
                    <input
                      name="pickupLocation"
                      value={form.pickupLocation}
                      onChange={handleChange}
                      placeholder="Where should we pick you up?"
                      className={`w-full rounded-xl sm:rounded-2xl border ${errors.pickupLocation ? 'border-red-500' : 'border-gray-300'} px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                    />
                    {errors.pickupLocation && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.pickupLocation}</p>
                    )}
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 flex items-center gap-2">
                      <Navigation size={16} className="sm:w-5 sm:h-5 text-green-500" />
                      Destination *
                    </label>
                    <input
                      name="dropLocation"
                      value={form.dropLocation}
                      onChange={handleChange}
                      placeholder="Where are you heading?"
                      className={`w-full rounded-xl sm:rounded-2xl border ${errors.dropLocation ? 'border-red-500' : 'border-gray-300'} px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                    />
                    {errors.dropLocation && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.dropLocation}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={switchLocations}
                    className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 transition-all"
                  >
                    <ArrowUpDown size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 flex items-center gap-2">
                      <Calendar size={16} className="sm:w-5 sm:h-5 text-purple-500" />
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className={`w-full rounded-xl sm:rounded-2xl border ${errors.date ? 'border-red-500' : 'border-gray-300'} px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.date}</p>
                    )}
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 flex items-center gap-2">
                      <Clock size={16} className="sm:w-5 sm:h-5 text-orange-500" />
                      Time *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className={`w-full rounded-xl sm:rounded-2xl border ${errors.time ? 'border-red-500' : 'border-gray-300'} px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                    />
                    {errors.time && (
                      <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4 sm:pt-5">
                  <div></div>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep()) setStep(2);
                    }}
                    className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg flex items-center gap-3 transition-all hover:scale-105"
                  >
                    Next: Vehicle Selection
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" size={18} />
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 flex items-center gap-2">
                      <Users size={16} className="sm:w-5 sm:h-5 text-blue-500" />
                      Number of Passengers
                    </label>
                    <select
                      name="passengers"
                      value={form.passengers}
                      onChange={handleChange}
                      className="w-full rounded-xl sm:rounded-2xl border border-gray-300 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none appearance-none bg-white"
                    >
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 flex items-center gap-2">
                      <Car size={16} className="sm:w-5 sm:h-5 text-green-500" />
                      Preferred Vehicle Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {['Hatchback', 'Sedan', 'SUV', 'Luxury', 'Traveller', 'Any'].map(type => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setForm({...form, carType: type})}
                          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all text-sm sm:text-base ${
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

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-blue-100">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Info size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm sm:text-base md:text-lg text-blue-800 font-medium">Custom Pricing</p>
                        <p className="text-xs sm:text-sm md:text-base text-blue-600">
                          Our travel expert will provide the best price based on your exact requirements
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between pt-4 sm:pt-5">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all text-sm sm:text-base"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all hover:scale-105"
                  >
                    Next: Your Details
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" size={18} />
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2 sm:space-y-3">
                      <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700">
                        Your Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full rounded-xl sm:rounded-2xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                      <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit mobile number"
                        className={`w-full rounded-xl sm:rounded-2xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {showEmail ? (
                    <div className="space-y-2 sm:space-y-3 animate-slideDown">
                      <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full rounded-xl sm:rounded-2xl border border-gray-300 px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowEmail(true)}
                      className="text-blue-600 hover:text-blue-800 text-sm sm:text-base font-medium flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add email for itinerary (optional)
                    </button>
                  )}

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-green-200">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Check size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-900">What happens next?</p>
                        <ul className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                          <li>✓ Our travel expert contacts you within 15 minutes</li>
                          <li>✓ Receive custom quote based on exact requirements</li>
                          <li>✓ Confirm booking with no advance payment required</li>
                          <li>✓ Professional driver arrives on time at pickup location</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between pt-4 sm:pt-5">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all text-sm sm:text-base"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <MessageCircle size={20} />
                        Get Custom Quote Now
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4">
          <p className="text-sm sm:text-base md:text-lg text-gray-500">
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
      className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-50 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg group-hover:blur-xl transition-all opacity-70"></div>
        <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110">
          <MessageCircle size={24} className="sm:w-7 sm:h-7" />
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden w-full">
      <HeroSection scrollToForm={scrollToForm} />
      <QuickStats />
      <CabTypeGrid onSelectType={handleSelectType} />
      <BenefitsSection />
      <VehicleSelector onSelectVehicle={handleSelectVehicle} />

      {formMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown w-[90%] sm:w-auto">
          <div className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl text-sm sm:text-base ${
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