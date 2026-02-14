// client/src/components/AIAssistant.jsx
import React, { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Car,
  Train,
  Plane,
  Package,
  HelpCircle,
  ThumbsUp,
  Zap,
  CheckCircle,
  Loader2,
  ChevronRight,
  Star,
  Award,
  Shield,
  Globe,
  Coffee,
  Sunset,
  Compass
} from "lucide-react";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "👋 **Hi there!** I'm GoTravio's AI travel assistant.\n\nI can help you book:\n• 🚗 **Cabs** - Local & outstation\n• 🚂 **Train tickets** - Including Tatkal\n• ✈️ **Flights** - Domestic & international\n• 🏝️ **Tour packages** - Custom itineraries\n\nWhat would you like to book today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [bookingData, setBookingData] = useState({});
  const [currentStep, setCurrentStep] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Quick reply options with website color scheme
  const quickReplies = [
    { 
      id: "cab", 
      text: "🚗 Book Cab", 
      gradient: "from-blue-600 to-indigo-600",
      action: "startCabBooking" 
    },
    { 
      id: "train", 
      text: "🚂 Train Tickets", 
      gradient: "from-indigo-600 to-purple-600",
      action: "startTrainBooking" 
    },
    { 
      id: "flight", 
      text: "✈️ Flight Booking", 
      gradient: "from-purple-600 to-pink-600",
      action: "startFlightBooking" 
    },
    { 
      id: "package", 
      text: "🏝️ Tour Package", 
      gradient: "from-blue-600 to-teal-600",
      action: "startPackageBooking" 
    },
    { 
      id: "contact", 
      text: "📞 Talk to Expert", 
      gradient: "from-gray-700 to-gray-900",
      action: "contactExpert" 
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setBookingData({});
      setCurrentStep(null);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addMessage = (type, text) => {
    const newMessage = {
      id: messages.length + 1,
      type: type,
      text: text,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  };

  const startCabBooking = () => {
    setCurrentStep("cab_pickup");
    setBookingData({ type: "cab" });
    addMessage("bot", "📍 **Great! Let's book a cab.**\n\nPlease tell me your **pickup location**:");
  };

  const startTrainBooking = () => {
    setCurrentStep("train_from");
    setBookingData({ type: "train" });
    addMessage("bot", "🚂 **Train ticket booking**\n\nPlease tell me your **departure station**:");
  };

  const startFlightBooking = () => {
    setCurrentStep("flight_from");
    setBookingData({ type: "flight" });
    addMessage("bot", "✈️ **Flight booking**\n\nPlease tell me your **departure city**:");
  };

  const startPackageBooking = () => {
    setCurrentStep("package_destination");
    setBookingData({ type: "package" });
    addMessage("bot", "🏝️ **Tour package enquiry**\n\nWhich **destination** are you interested in? (e.g., Goa, Manali, Kerala)");
  };

  const contactExpert = () => {
    addMessage("bot", "📞 **Talk to an expert**\n\nPlease share your **phone number** and our team will call you within 15 minutes:");
    setCurrentStep("contact_phone");
  };

  const processBooking = async () => {
    setIsProcessing(true);
    addMessage("bot", "⏳ **Processing your booking...** Please wait.");
    
    try {
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      let endpoint = '';
      let payload = {};
      
      switch(bookingData.type) {
        case 'cab':
          endpoint = `${baseURL}/api/cabs`;
          payload = {
            pickupLocation: bookingData.pickup,
            dropLocation: bookingData.drop,
            date: bookingData.date,
            time: bookingData.time,
            passengers: bookingData.passengers,
            name: bookingData.name,
            phone: bookingData.phone,
            carType: 'Any',
            source: 'AI Assistant'
          };
          break;
          
        case 'train':
          endpoint = `${baseURL}/api/tickets`;
          payload = {
            from: bookingData.from,
            to: bookingData.to,
            date: bookingData.date,
            passengers: bookingData.passengers,
            passengerNames: [bookingData.name],
            name: bookingData.name,
            phone: bookingData.phone,
            ticketMode: 'train',
            serviceType: 'Normal',
            source: 'AI Assistant'
          };
          break;
          
        case 'flight':
          endpoint = `${baseURL}/api/tickets`;
          payload = {
            from: bookingData.from,
            to: bookingData.to,
            date: bookingData.date,
            passengers: bookingData.passengers,
            passengerNames: [bookingData.name],
            name: bookingData.name,
            phone: bookingData.phone,
            ticketMode: 'flight',
            tripType: 'One Way',
            flightClass: 'Economy',
            source: 'AI Assistant'
          };
          break;
          
        case 'package':
          endpoint = `${baseURL}/api/enquiry`;
          payload = {
            name: bookingData.name,
            service: `Tour Package - ${bookingData.destination}`,
            phone: bookingData.phone,
            email: bookingData.email || '',
            details: `Destination: ${bookingData.destination}\nDuration: ${bookingData.duration}\nTravelers: ${bookingData.travelers}\nBudget: ${bookingData.budget || 'Not specified'}\n\nBooked via AI Assistant`,
            source: 'AI Assistant'
          };
          break;
      }
      
      console.log('📤 Sending to:', endpoint);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const bookingRef = data.data?.id || data.id || data.bookingId || 'REF' + Date.now().toString().slice(-6);
        
        addMessage("bot", 
          `✅ **Booking Confirmed!**\n\n` +
          `👤 **Name:** ${bookingData.name}\n` +
          `📞 **Phone:** ${bookingData.phone}\n` +
          `📋 **Reference:** ${bookingRef}\n\n` +
          `🕒 **What's next?** Our team will contact you within 15 minutes.\n\n` +
          `📞 **Need immediate help?**\n` +
          `Call: +91 90238 84833\n` +
          `💬 WhatsApp: +91 90238 84833`
        );
        
        setBookingData({});
        setCurrentStep(null);
        setShowQuickReplies(true);
        
      } else {
        throw new Error(data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      addMessage("bot", 
        `❌ **Something went wrong**\n\n` +
        `Please contact us directly:\n` +
        `📞 +91 90238 84833\n` +
        `💬 WhatsApp: +91 90238 84833`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUserInput = (input) => {
    if (!input.trim() || isProcessing) return;

    addMessage("user", input);
    setInputValue("");
    setShowQuickReplies(false);
    setIsTyping(true);

    setTimeout(async () => {
      let response = "";
      
      if (currentStep) {
        switch(currentStep) {
          case "cab_pickup":
            setBookingData({ ...bookingData, pickup: input });
            setCurrentStep("cab_drop");
            response = "📍 **Where would you like to go?**";
            break;
            
          case "cab_drop":
            setBookingData({ ...bookingData, drop: input });
            setCurrentStep("cab_date");
            response = "📅 **Travel date?** (DD/MM/YYYY)";
            break;
            
          case "cab_date":
            setBookingData({ ...bookingData, date: input });
            setCurrentStep("cab_time");
            response = "⏰ **Pickup time?**";
            break;
            
          case "cab_time":
            setBookingData({ ...bookingData, time: input });
            setCurrentStep("cab_passengers");
            response = "👥 **Number of passengers?**";
            break;
            
          case "cab_passengers":
            setBookingData({ ...bookingData, passengers: input });
            setCurrentStep("cab_name");
            response = "📝 **Your full name:**";
            break;
            
          case "cab_name":
            setBookingData({ ...bookingData, name: input });
            setCurrentStep("cab_phone");
            response = "📞 **Your 10-digit phone number:**";
            break;
            
          case "cab_phone":
            if (!/^\d{10}$/.test(input.replace(/\D/g, ''))) {
              response = "❌ **Invalid number**\n\nPlease enter a valid 10-digit phone number:";
              setIsTyping(false);
              addMessage("bot", response);
              return;
            }
            setBookingData({ ...bookingData, phone: input.replace(/\D/g, '') });
            setIsTyping(false);
            await processBooking();
            return;
            
          case "train_from":
            setBookingData({ ...bookingData, from: input });
            setCurrentStep("train_to");
            response = "📍 **Destination station?**";
            break;
            
          case "train_to":
            setBookingData({ ...bookingData, to: input });
            setCurrentStep("train_date");
            response = "📅 **Travel date?** (DD/MM/YYYY)";
            break;
            
          case "train_date":
            setBookingData({ ...bookingData, date: input });
            setCurrentStep("train_passengers");
            response = "👥 **Number of passengers?**";
            break;
            
          case "train_passengers":
            setBookingData({ ...bookingData, passengers: input });
            setCurrentStep("train_name");
            response = "📝 **Primary passenger name:**";
            break;
            
          case "train_name":
            setBookingData({ ...bookingData, name: input });
            setCurrentStep("train_phone");
            response = "📞 **Your 10-digit phone number:**";
            break;
            
          case "train_phone":
            if (!/^\d{10}$/.test(input.replace(/\D/g, ''))) {
              response = "❌ **Invalid number**\n\nPlease enter a valid 10-digit phone number:";
              setIsTyping(false);
              addMessage("bot", response);
              return;
            }
            setBookingData({ ...bookingData, phone: input.replace(/\D/g, '') });
            setIsTyping(false);
            await processBooking();
            return;
            
          case "flight_from":
            setBookingData({ ...bookingData, from: input });
            setCurrentStep("flight_to");
            response = "📍 **Destination city?**";
            break;
            
          case "flight_to":
            setBookingData({ ...bookingData, to: input });
            setCurrentStep("flight_date");
            response = "📅 **Departure date?** (DD/MM/YYYY)";
            break;
            
          case "flight_date":
            setBookingData({ ...bookingData, date: input });
            setCurrentStep("flight_passengers");
            response = "👥 **Number of passengers?**";
            break;
            
          case "flight_passengers":
            setBookingData({ ...bookingData, passengers: input });
            setCurrentStep("flight_name");
            response = "📝 **Primary passenger name:**";
            break;
            
          case "flight_name":
            setBookingData({ ...bookingData, name: input });
            setCurrentStep("flight_phone");
            response = "📞 **Your 10-digit phone number:**";
            break;
            
          case "flight_phone":
            if (!/^\d{10}$/.test(input.replace(/\D/g, ''))) {
              response = "❌ **Invalid number**\n\nPlease enter a valid 10-digit phone number:";
              setIsTyping(false);
              addMessage("bot", response);
              return;
            }
            setBookingData({ ...bookingData, phone: input.replace(/\D/g, '') });
            setIsTyping(false);
            await processBooking();
            return;
            
          case "package_destination":
            setBookingData({ ...bookingData, destination: input });
            setCurrentStep("package_duration");
            response = "📅 **How many days?**";
            break;
            
          case "package_duration":
            setBookingData({ ...bookingData, duration: input });
            setCurrentStep("package_travelers");
            response = "👥 **Number of travelers?**";
            break;
            
          case "package_travelers":
            setBookingData({ ...bookingData, travelers: input });
            setCurrentStep("package_name");
            response = "📝 **Your name:**";
            break;
            
          case "package_name":
            setBookingData({ ...bookingData, name: input });
            setCurrentStep("package_phone");
            response = "📞 **Your 10-digit phone number:**";
            break;
            
          case "package_phone":
            if (!/^\d{10}$/.test(input.replace(/\D/g, ''))) {
              response = "❌ **Invalid number**\n\nPlease enter a valid 10-digit phone number:";
              setIsTyping(false);
              addMessage("bot", response);
              return;
            }
            setBookingData({ ...bookingData, phone: input.replace(/\D/g, '') });
            setCurrentStep("package_email");
            response = "📧 **Email address?** (optional, type 'skip')";
            break;
            
          case "package_email":
            if (input.toLowerCase() === 'skip' || input === '') {
              setBookingData({ ...bookingData, email: '' });
            } else {
              setBookingData({ ...bookingData, email: input });
            }
            setCurrentStep("package_budget");
            response = "💰 **Budget per person?** (optional, type 'skip')";
            break;
            
          case "package_budget":
            if (input.toLowerCase() !== 'skip' && input !== '') {
              setBookingData({ ...bookingData, budget: input });
            }
            setIsTyping(false);
            await processBooking();
            return;
            
          case "contact_phone":
            if (!/^\d{10}$/.test(input.replace(/\D/g, ''))) {
              response = "❌ **Invalid number**\n\nPlease enter a valid 10-digit phone number:";
              setIsTyping(false);
              addMessage("bot", response);
              return;
            }
            const cleanPhone = input.replace(/\D/g, '');
            
            await fetch(`${baseURL}/api/enquiry`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: 'Contact Request',
                service: 'Call Me Back',
                phone: cleanPhone,
                details: 'Customer requested callback via AI Assistant'
              })
            });
            
            setCurrentStep(null);
            setShowQuickReplies(true);
            response = `✅ **Thank you!**\n\nOur expert will call you at **${cleanPhone}** within 15 minutes.`;
            break;
            
          default:
            response = "I'm not sure how to proceed. Let's start over.";
            setCurrentStep(null);
            setShowQuickReplies(true);
        }
      } else {
        const intent = analyzeIntent(input);
        
        switch(intent) {
          case "cab":
            startCabBooking();
            setIsTyping(false);
            return;
          case "train":
            startTrainBooking();
            setIsTyping(false);
            return;
          case "flight":
            startFlightBooking();
            setIsTyping(false);
            return;
          case "package":
            startPackageBooking();
            setIsTyping(false);
            return;
          case "contact":
            contactExpert();
            setIsTyping(false);
            return;
          default:
            response = "I can help you with:\n\n• 🚗 **Cab bookings**\n• 🚂 **Train tickets**\n• ✈️ **Flight bookings**\n• 🏝️ **Tour packages**\n\nWhat would you like?";
        }
      }
      
      addMessage("bot", response);
      setIsTyping(false);
      
      if (!currentStep) {
        setShowQuickReplies(true);
      }
    }, 1000);
  };

  const analyzeIntent = (input) => {
    const text = input.toLowerCase();
    if (text.includes("cab") || text.includes("taxi") || text.includes("car")) return "cab";
    if (text.includes("train") || text.includes("railway") || text.includes("tatkal")) return "train";
    if (text.includes("flight") || text.includes("plane") || text.includes("air")) return "flight";
    if (text.includes("package") || text.includes("tour") || text.includes("vacation")) return "package";
    if (text.includes("contact") || text.includes("expert") || text.includes("call")) return "contact";
    return "unknown";
  };

  const handleQuickReply = (reply) => {
    switch(reply.action) {
      case "startCabBooking": startCabBooking(); break;
      case "startTrainBooking": startTrainBooking(); break;
      case "startFlightBooking": startFlightBooking(); break;
      case "startPackageBooking": startPackageBooking(); break;
      case "contactExpert": contactExpert(); break;
    }
    setShowQuickReplies(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserInput(inputValue);
    }
  };

  return (
    <>
      {/* Chat Button - Website color scheme */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 group transition-all duration-500 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative">
          {/* Animated rings with website colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md group-hover:blur-xl transition-all opacity-60"></div>
          
          {/* Main button - matches your website gradient */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110">
            <Bot size={28} className="animate-pulse" />
          </div>
          
          {/* Online indicator */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
          
          {/* Tooltip */}
          <span className="absolute right-16 top-3 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Travel Assistant
          </span>
        </div>
      </button>

      {/* Chat Window - Website color scheme */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] sm:w-[420px] bg-white rounded-2xl shadow-2xl transition-all duration-500 transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        } overflow-hidden border border-gray-200/50`}
      >
        {/* Header - Matches your website gradient */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-700"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar with glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-full blur-md"></div>
                <div className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
                  <Bot size={24} className="text-white" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              </div>
              
              <div>
                <h3 className="font-bold text-lg flex items-center gap-1">
                  GoTravio AI
                  <Sparkles size={16} className="text-yellow-300" />
                </h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online • 24/7 Support
                </p>
              </div>
            </div>
            
            <button
              onClick={toggleChat}
              className="p-2 hover:bg-white/20 rounded-xl transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages area - matches your website background */}
        <div className="h-[400px] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
                  <Bot size={16} />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-200/50'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-[10px] mt-1 ${
                  message.type === 'user' ? 'text-blue-200' : 'text-gray-400'
                }`}>
                  {message.timestamp}
                </p>
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center text-white ml-2 flex-shrink-0">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mr-2">
                <Bot size={16} />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-none p-4 shadow-md border border-gray-200/50">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {isProcessing && (
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 flex items-center gap-2 border border-blue-100">
                <Loader2 size={16} className="animate-spin text-blue-600" />
                <p className="text-xs text-blue-600 font-medium">Processing your booking...</p>
              </div>
            </div>
          )}
          
          {/* Quick Replies with website gradients */}
          {showQuickReplies && !currentStep && messages.length < 3 && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2 font-medium">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply)}
                    disabled={isProcessing}
                    className={`bg-gradient-to-r ${reply.gradient} text-white p-3 rounded-xl hover:shadow-lg transition-all hover:scale-105 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50`}
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Progress indicator */}
          {currentStep && (
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                <Zap size={12} className="animate-pulse" />
                Booking in progress • Step {getStepNumber(currentStep)} of {getTotalSteps(bookingData.type)}
              </p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={isProcessing ? "Processing..." : "Type your message..."}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm disabled:bg-gray-100 transition-all"
            />
            <button
              onClick={() => handleUserInput(inputValue)}
              disabled={!inputValue.trim() || isProcessing}
              className={`p-3 rounded-xl transition-all ${
                inputValue.trim() && !isProcessing
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
          
          {/* Trust badges - matches website style */}
          <div className="flex items-center justify-center gap-3 mt-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <Shield size={10} className="text-blue-600" />
              Secure
            </span>
            <span className="flex items-center gap-1">
              <Clock size={10} className="text-indigo-600" />
              24/7 Support
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle size={10} className="text-purple-600" />
              Free Service
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper functions for progress tracking
const getStepNumber = (step) => {
  const steps = {
    'cab_pickup': 1, 'cab_drop': 2, 'cab_date': 3, 'cab_time': 4, 'cab_passengers': 5, 'cab_name': 6, 'cab_phone': 7,
    'train_from': 1, 'train_to': 2, 'train_date': 3, 'train_passengers': 4, 'train_name': 5, 'train_phone': 6,
    'flight_from': 1, 'flight_to': 2, 'flight_date': 3, 'flight_passengers': 4, 'flight_name': 5, 'flight_phone': 6,
    'package_destination': 1, 'package_duration': 2, 'package_travelers': 3, 'package_name': 4, 'package_phone': 5, 'package_email': 6, 'package_budget': 7
  };
  return steps[step] || 1;
};

const getTotalSteps = (type) => {
  const totals = { 'cab': 7, 'train': 6, 'flight': 6, 'package': 7 };
  return totals[type] || 5;
};

export default AIAssistant;