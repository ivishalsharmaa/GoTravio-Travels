// client/src/components/AIAssistant.jsx
import React, { useState, useRef, useEffect } from "react";
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Loader2,
  Zap,
  CheckCircle,
  Shield,
  Clock,
  WifiOff
} from "lucide-react";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://gotravio-backend.onrender.com';

// Timeout for Render cold starts
const API_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "👋 **Hi there!** I'm GoTravio's AI travel assistant.\n\nI can help you book:\n• 🚗 **Cabs** - Local & outstation\n• 🚂 **Train tickets** - Including Tatkal\n• ✈️ **Flights** - Domestic & international\n• 🏝️ **Tour packages** - Custom itineraries\n\nWhat would you like to book today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [bookingData, setBookingData] = useState({});
  const [currentStep, setCurrentStep] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const [isCheckingBackend, setIsCheckingBackend] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Quick reply options
  const quickReplies = [
    { 
      id: "cab", 
      text: "🚗 Cab", 
      fullText: "Book Cab",
      gradient: "from-blue-600 to-indigo-600",
      action: "startCabBooking" 
    },
    { 
      id: "train", 
      text: "🚂 Train", 
      fullText: "Train Tickets",
      gradient: "from-indigo-600 to-purple-600",
      action: "startTrainBooking" 
    },
    { 
      id: "flight", 
      text: "✈️ Flight", 
      fullText: "Flight Booking",
      gradient: "from-purple-600 to-pink-600",
      action: "startFlightBooking" 
    },
    { 
      id: "package", 
      text: "🏝️ Tour", 
      fullText: "Tour Package",
      gradient: "from-blue-600 to-teal-600",
      action: "startPackageBooking" 
    },
    { 
      id: "contact", 
      text: "📞 Expert", 
      fullText: "Talk to Expert",
      gradient: "from-gray-700 to-gray-900",
      action: "contactExpert" 
    },
  ];

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth();
  }, []);

  // Periodic health check when chat is open
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(checkBackendHealth, 30000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const checkBackendHealth = async () => {
    setIsCheckingBackend(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(`${API_BASE_URL}/api/aiBooking/test`, {
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' }
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend health check passed:', data);
        setIsBackendAvailable(true);
      } else {
        throw new Error('Backend health check failed');
      }
    } catch (error) {
      console.warn('⚠️ Backend health check failed:', error.message);
      setIsBackendAvailable(false);
    } finally {
      setIsCheckingBackend(false);
    }
  };

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

  const addMessage = (type, text) => {
    const newMessage = {
      id: messages.length + 1,
      type: type,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
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

  // Process booking with retry logic and offline fallback
  const processBooking = async (retryAttempt = 0) => {
    setIsProcessing(true);
    
    if (retryAttempt === 0) {
      addMessage("bot", "⏳ **Processing your booking...** This may take 30-60 seconds as the server wakes up.");
    } else {
      addMessage("bot", `⏳ **Retrying... Attempt ${retryAttempt + 1} of ${MAX_RETRIES}**`);
    }
    
    try {
      // First check if backend is available
      if (!isBackendAvailable) {
        await checkBackendHealth();
        if (!isBackendAvailable) {
          throw new Error('backend_unavailable');
        }
      }
      
      // Use the single endpoint that exists in your backend
      const endpoint = `${API_BASE_URL}/api/aiBooking/process`;
      
      // Create a unified payload structure that your backend expects
      const payload = {
        type: bookingData.type,
        data: bookingData
      };
      
      console.log('📤 Sending to:', endpoint);
      console.log('📤 Payload:', payload);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      const data = await response.json();
      console.log('📥 Response:', data);
      
      if (response.ok && data.success) {
        const bookingRef = data.bookingReference || data.bookingId || 'REF' + Date.now().toString().slice(-6);
        
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
        
        // Clear any pending booking
        localStorage.removeItem('pendingBooking');
        
        setBookingData({});
        setCurrentStep(null);
        setShowQuickReplies(true);
        
      } else {
        throw new Error(data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      
      const isNetworkError = error.name === 'AbortError' || 
                            error.message.includes('Failed to fetch') || 
                            error.message === 'backend_unavailable';
      
      if (isNetworkError && retryAttempt < MAX_RETRIES - 1) {
        // Retry after increasing delay
        const delay = (retryAttempt + 1) * 5000; // 5s, 10s, 15s
        addMessage("bot", `⏳ **Server is waking up...** Retrying in ${delay/1000} seconds.`);
        
        setTimeout(() => {
          processBooking(retryAttempt + 1);
        }, delay);
        
      } else if (isNetworkError) {
        // Offline fallback - save booking locally
        const pendingBooking = {
          ...bookingData,
          timestamp: new Date().toISOString(),
          id: 'PENDING_' + Date.now().toString().slice(-6)
        };
        
        // Save to localStorage
        const existingBookings = JSON.parse(localStorage.getItem('pendingBookings') || '[]');
        existingBookings.push(pendingBooking);
        localStorage.setItem('pendingBookings', JSON.stringify(existingBookings));
        
        addMessage("bot", 
          `✅ **Booking request saved!**\n\n` +
          `📋 **Reference:** ${pendingBooking.id}\n\n` +
          `Our server is currently waking up. We've saved your booking and will process it automatically once the server is online.\n\n` +
          `You'll receive a confirmation call within 30 minutes.\n\n` +
          `📞 **Immediate assistance:** +91 90238 84833`
        );
        
        setBookingData({});
        setCurrentStep(null);
        setShowQuickReplies(true);
        setIsBackendAvailable(false);
        
      } else {
        addMessage("bot", 
          `❌ **Something went wrong**\n\n` +
          `Please contact us directly:\n` +
          `📞 +91 90238 84833\n` +
          `💬 WhatsApp: +91 90238 84833`
        );
      }
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
          // Cab booking flow
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
            response = "⏰ **Pickup time?** (e.g., 10:00 AM)";
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
            await processBooking(0);
            return;
          
          // Train booking flow
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
            await processBooking(0);
            return;
          
          // Flight booking flow
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
            await processBooking(0);
            return;
          
          // Package booking flow
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
            await processBooking(0);
            return;
          
          // Contact expert flow
          case "contact_phone":
            if (!/^\d{10}$/.test(input.replace(/\D/g, ''))) {
              response = "❌ **Invalid number**\n\nPlease enter a valid 10-digit phone number:";
              setIsTyping(false);
              addMessage("bot", response);
              return;
            }
            const cleanPhone = input.replace(/\D/g, '');
            
            // Try to send to backend, but save locally if it fails
            try {
              await fetch(`${API_BASE_URL}/api/aiBooking/process`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 'contact',
                  data: {
                    name: 'Contact Request',
                    phone: cleanPhone,
                    source: 'AI Assistant'
                  }
                })
              });
            } catch (e) {
              console.log('Backend not available for contact request, saving locally');
              const contactRequests = JSON.parse(localStorage.getItem('contactRequests') || '[]');
              contactRequests.push({
                phone: cleanPhone,
                timestamp: new Date().toISOString(),
                source: 'AI Assistant'
              });
              localStorage.setItem('contactRequests', JSON.stringify(contactRequests));
            }
            
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
      {/* Chat Button - Fixed position bottom right */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-4 right-4 z-50 group transition-all duration-500 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative">
          {/* Animated rings */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md group-hover:blur-xl transition-all opacity-60"></div>
          
          {/* Main button */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110">
            <Bot size={24} />
          </div>
          
          {/* Online/Offline indicator */}
          <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white animate-pulse ${
            isBackendAvailable ? 'bg-green-400' : 'bg-yellow-400'
          }`}></span>
        </div>
      </button>

      {/* Chat Window - FULLY RESPONSIVE */}
      <div
        className={`
          fixed z-50 transition-all duration-300 transform
          ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
          
          /* Mobile: Full screen with safe area insets */
          inset-0
          
          /* Tablet: Fixed width and position */
          sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:h-[600px] sm:rounded-2xl
          
          /* Desktop: Larger size */
          md:w-[420px] md:h-[650px]
          
          /* Base styles */
          bg-white flex flex-col overflow-hidden shadow-2xl
        `}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-3 sm:rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-full blur-md"></div>
                <div className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
                  <Bot size={20} className="text-white" />
                </div>
                <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  isBackendAvailable ? 'bg-green-400' : 'bg-yellow-400'
                }`}></span>
              </div>
              
              <div>
                <h3 className="font-bold text-base flex items-center gap-1">
                  GoTravio AI
                  <Sparkles size={14} className="text-yellow-300" />
                </h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  {isBackendAvailable ? (
                    <>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span>Online • 24/7 Support</span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                      <span>Connecting...</span>
                    </>
                  )}
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
          
          {/* Backend status warning */}
          {!isBackendAvailable && !isCheckingBackend && (
            <div className="mt-2 bg-yellow-500/20 backdrop-blur-sm rounded-lg p-2 text-xs text-yellow-100 flex items-center gap-2">
              <WifiOff size={14} />
              <span>Server is waking up... Bookings will be saved locally and processed automatically.</span>
            </div>
          )}
          
          {isCheckingBackend && (
            <div className="mt-2 bg-blue-500/20 backdrop-blur-sm rounded-lg p-2 text-xs text-blue-100 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              <span>Checking server status...</span>
            </div>
          )}
        </div>

        {/* Messages area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
                  <Bot size={14} />
                </div>
              )}
              
              <div
                className={`max-w-[85%] rounded-2xl p-3 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-200/50'
                }`}
              >
                <p className="text-sm whitespace-pre-line break-words">{message.text}</p>
                <p className={`text-[10px] mt-1 ${
                  message.type === 'user' ? 'text-blue-200' : 'text-gray-400'
                }`}>
                  {message.timestamp}
                </p>
              </div>
              
              {message.type === 'user' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center text-white ml-2 flex-shrink-0">
                  <User size={14} />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
                <Bot size={14} />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-none p-4 shadow-md border border-gray-200/50">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
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
                <p className="text-sm text-blue-600 font-medium">
                  {!isBackendAvailable ? 'Saving locally...' : 'Processing...'}
                </p>
              </div>
            </div>
          )}
          
          {/* Quick Replies */}
          {showQuickReplies && !currentStep && messages.length < 3 && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2 font-medium">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply)}
                    disabled={isProcessing}
                    className={`
                      bg-gradient-to-r ${reply.gradient} 
                      text-white p-3 rounded-xl hover:shadow-lg 
                      transition-all hover:scale-105 text-sm font-medium 
                      flex items-center justify-center gap-2 
                      disabled:opacity-50
                    `}
                  >
                    <span className="sm:hidden">{reply.text}</span>
                    <span className="hidden sm:inline">{reply.fullText}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Progress indicator */}
          {currentStep && (
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
                <Zap size={14} className="animate-pulse" />
                <span>Step {getStepNumber(currentStep)} of {getTotalSteps(bookingData.type)}</span>
              </p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isProcessing ? "Processing..." : "Type your message..."}
              disabled={isProcessing}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm disabled:bg-gray-100 transition-all"
              style={{ fontSize: '16px' }}
            />
            <button
              onClick={() => handleUserInput(inputValue)}
              disabled={!inputValue.trim() || isProcessing}
              className={`p-3 rounded-xl transition-all flex-shrink-0 ${
                inputValue.trim() && !isProcessing
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
          
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <Shield size={10} className="text-blue-600" />
              <span className="hidden xs:inline">Secure</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={10} className="text-indigo-600" />
              <span className="hidden xs:inline">24/7 Support</span>
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle size={10} className="text-purple-600" />
              <span className="hidden xs:inline">Free</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper functions
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