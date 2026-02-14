// client/src/pages/Cabs.jsx
import React, { useState, useEffect } from "react";
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
  Target,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Heart,
  HelpCircle,
  BookOpen,
  Compass,
  Sun,
  Cloud,
  Coffee,
  Camera,
  Mountain,
  Umbrella,
  Info
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

      <div className="relative w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-18 md:py-24"> {/* Reduced from py-16 sm:py-20 md:py-28 */}
        <div className="w-full">
          <div className="text-center max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-5 sm:mb-6"> {/* Reduced from gap-3 px-5 sm:px-6 py-2.5 sm:py-3 mb-6 sm:mb-8 */}
              <Sparkles size={16} className="sm:w-4 sm:h-4 text-yellow-300" /> {/* Reduced from size={18} */}
              <span className="text-xs sm:text-sm font-medium">Premium Cab Services</span> {/* Reduced from text-sm sm:text-base */}
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mb-5 sm:mb-6 leading-tight px-4"> {/* Reduced from text-6xl md:text-7xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 */}
              Travel in
              <span className="block text-blue-300 mt-2">Comfort & Style</span> {/* Reduced from mt-3 */}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto px-4"> {/* Reduced from text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 md:mb-12 */}
              Experience premium cab services with professional drivers, luxury vehicles, and seamless booking.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 md:mb-12 px-4"> {/* Reduced from gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16 */}
              <button 
                onClick={scrollToForm}
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" /* Reduced from px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg md:text-xl gap-3 sm:gap-4 */
              >
                <div className="absolute inset-0 bg-white/10 rounded-lg blur-sm group-hover:blur-md transition-all"></div>
                <Car className="relative z-10 group-hover:animate-pulse" size={20} /> {/* Reduced from size={22} */} 
                <span className="relative z-10">Book Your Ride Now</span>
              </button>
              <a 
                href="https://wa.me/916371106588"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white/10 rounded-lg blur-sm group-hover:blur-md transition-all"></div>
                <MessageCircle className="relative z-10" size={20} /> 
                <span className="relative z-10">Instant WhatsApp Quote</span>
              </a>
            </div>

            {/* Trust Indicators - Bigger */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-4"> {/* Reduced from gap-4 sm:gap-6 md:gap-8 */}
              {[
                { icon: <ShieldCheck size={18} className="sm:w-5 sm:h-5" />, text: "Verified & Safe", color: "text-green-400" }, /* Reduced from size={20} */
                { icon: <Clock size={18} className="sm:w-5 sm:h-5" />, text: "24/7 Availability", color: "text-blue-400" },
                { icon: <TrendingUp size={18} className="sm:w-5 sm:h-5" />, text: "Best Price", color: "text-yellow-400" },
                { icon: <Headphones size={18} className="sm:w-5 sm:h-5" />, text: "Premium Support", color: "text-purple-400" },
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10"> {/* Reduced from gap-3 sm:gap-4 rounded-xl sm:rounded-2xl p-4 sm:p-5 */}
                  <div className={`${badge.color} flex-shrink-0`}>{badge.icon}</div>
                  <span className="text-xs sm:text-sm md:text-base font-medium truncate">{badge.text}</span> {/* Reduced from text-sm sm:text-base md:text-lg */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Image Carousel Component - Updated to full width
const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const destinations = [
    {
      image: "/manali.png",
      name: "Manali",
      tag: "Summer Paradise"
    },
    {
      image: "/shimla.png",
      name: "Shimla",
      tag: "Queen of Hills"
    },
    {
      image: "/kashmir.png",
      name: "Kashmir",
      tag: "Paradise on Earth"
    },
    {
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      name: "Coorg",
      tag: "Scotland of India"
    },
    {
      image: "/darjelling.png",
      name: "Darjeeling",
      tag: "Queen of Hills"
    },
    {
      image: "/goa.png",
      name: "Goa",
      tag: "Beach Paradise"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [destinations.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12"> {/* Reduced from py-12 sm:py-16 md:py-20 */}
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10"> {/* Reduced from mb-8 sm:mb-12 */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-pink-50 to-rose-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-2 sm:mb-3"> {/* Reduced from gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 mb-3 sm:mb-4 */}
            <Heart size={14} className="sm:w-4 sm:h-4 text-rose-500" fill="currentColor" /> {/* Reduced from size={16} */}
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-rose-700">Popular Destinations</span> {/* Reduced from text-xs sm:text-sm md:text-base */}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 px-2"> {/* Reduced from text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 */}
            Beautiful Places to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
              Visit This Summer
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4"> {/* Reduced from text-sm sm:text-base md:text-lg */}
            Explore these stunning destinations with our premium cab services
          </p>
        </div>

        {/* Carousel Container - Full width */}
        <div className="relative group w-full mx-auto">
          {/* Main Carousel */}
          <div className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"> {/* Reduced from h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-xl sm:rounded-2xl md:rounded-3xl */}
            {/* Images */}
            {destinations.map((dest, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                {/* Background Image */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Gradient Overlay - Only at bottom for text */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div> {/* Reduced from h-32 */}
                
                {/* Place Name and Tag - At the bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 md:p-6 text-white"> {/* Reduced from p-4 sm:p-6 md:p-8 */}
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="inline-block bg-rose-500/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-1"> {/* Reduced from px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm mb-2 */}
                        {dest.tag}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{dest.name}</h3> {/* Reduced from text-2xl sm:text-3xl md:text-4xl */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Updated FAQ Section Component - Single Column with Larger Quick Tips
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Booking & Pricing",
      icon: <BookOpen className="text-blue-600" size={22} />, // Reduced from size={24}
      questions: [
        {
          q: "How do I book a cab?",
          a: "You can book a cab by filling out our enquiry form above, calling us directly, or sending a WhatsApp message. Our team will confirm your booking within 15 minutes."
        },
        {
          q: "How are the prices calculated?",
          a: "Prices are based on distance, vehicle type, and duration. We provide transparent pricing with no hidden charges. Get a custom quote by filling the form above."
        },
        {
          q: "Is there any cancellation fee?",
          a: "Free cancellation up to 2 hours before the trip. Cancellations within 2 hours may incur a nominal fee."
        }
      ]
    },
    {
      category: "Destinations & Travel",
      icon: <Compass className="text-green-600" size={22} />,
      questions: [
        {
          q: "Which destinations do you cover?",
          a: "We cover all major tourist destinations including Manali, Shimla, Kashmir, Coorg, Darjeeling, Goa, and many more. Contact us for specific destinations."
        },
        {
          q: "What is the best time to visit Manali?",
          a: "Summer (March-June) is perfect for pleasant weather and adventure activities. Winter (December-February) is ideal for snow lovers."
        }
      ]
    },
    {
      category: "Vehicles & Services",
      icon: <Car className="text-purple-600" size={22} />,
      questions: [
        {
          q: "What types of vehicles do you offer?",
          a: "We offer Hatchbacks, Sedans, SUVs, Luxury cars, and Travellers for groups. All vehicles are well-maintained and sanitized."
        },
        {
          q: "Are your drivers verified?",
          a: "Yes, all our drivers undergo thorough background checks, police verification, and professional training before joining us."
        },
      ]
    },
    {
      category: "Summer Specials",
      icon: <Sun className="text-orange-600" size={22} />,
      questions: [
        {
          q: "Which destinations are best for summer?",
          a: "Hill stations like Manali, Shimla, Kashmir, Coorg, and Darjeeling are perfect for summer escapes with pleasant weather around 15-25°C."
        },
        {
          q: "Do you offer summer special packages?",
          a: "Yes, we have special summer packages including accommodation + cab deals. Contact us for customized summer vacation plans."
        },
        {
          q: "What should I pack for a hill station trip?",
          a: "Pack light woolens, comfortable walking shoes, sunscreen, sunglasses, and a camera. Evenings can be cool, so carry a light jacket."
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12"> {/* Reduced from py-12 sm:py-16 md:py-20 */}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10"> {/* Reduced from mb-8 sm:mb-12 */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-2 sm:mb-3"> {/* Reduced from gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 mb-3 sm:mb-4 */}
            <HelpCircle size={14} className="sm:w-4 sm:h-4 text-blue-500" /> {/* Reduced from size={16} */}
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-blue-700">Got Questions?</span> {/* Reduced from text-xs sm:text-sm md:text-base */}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 px-2"> {/* Reduced from text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 */}
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Questions
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4"> {/* Reduced from text-sm sm:text-base md:text-lg */}
            Find answers to common questions about booking, destinations, and our services
          </p>
        </div>

        {/* FAQ Categories - Single Column */}
        <div className="space-y-5 sm:space-y-6"> {/* Reduced from space-y-6 sm:space-y-8 */}
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-200/50 overflow-hidden"> {/* Reduced from rounded-2xl sm:rounded-3xl */}
              {/* Category Header - Single Line */}
              <div className="bg-gradient-to-r from-gray-50 to-white px-4 sm:px-5 py-3 border-b border-gray-200/50"> {/* Reduced from px-5 sm:px-6 py-4 */}
                <div className="flex items-center gap-2"> {/* Reduced from gap-3 */}
                  <div className="p-1.5 bg-gradient-to-br from-white to-gray-50 rounded-md shadow-sm"> {/* Reduced from p-2 rounded-lg */}
                    {category.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">{category.category}</h3> {/* Reduced from text-lg sm:text-xl */}
                </div>
              </div>

              {/* Questions Accordion */}
              <div className="p-4 sm:p-5 space-y-2"> {/* Reduced from p-5 sm:p-6 space-y-3 */}
                {category.questions.map((faq, qIndex) => {
                  const uniqueIndex = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === uniqueIndex;
                  
                  return (
                    <div
                      key={qIndex}
                      className="bg-gray-50 rounded-lg border border-gray-200/50 hover:border-blue-200 transition-all overflow-hidden" /* Reduced from rounded-xl */
                    >
                      <button
                        onClick={() => toggleFAQ(uniqueIndex)}
                        className="w-full px-3 py-2 flex items-center justify-between text-left gap-2" /* Reduced from px-4 py-3 gap-3 */
                      >
                        <span className="text-xs sm:text-sm font-medium text-gray-900 flex-1"> {/* Reduced from text-sm sm:text-base */}
                          {faq.q}
                        </span>
                        <div className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}> {/* Reduced from w-5 h-5 sm:w-6 sm:h-6 */}
                          <ChevronDown size={10} className="sm:w-3 sm:h-3 text-blue-600" /> {/* Reduced from size={12} */}
                        </div>
                      </button>
                      
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <div className="px-3 pb-2 text-[10px] sm:text-xs text-gray-600 border-t border-gray-200 pt-2"> {/* Reduced from px-4 pb-3 text-xs sm:text-sm pt-3 */}
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-8 sm:mt-10 md:mt-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 text-white text-center"> {/* Reduced from mt-10 sm:mt-12 md:mt-16 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Still Have Questions?</h3> {/* Reduced from text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 */}
            <p className="text-xs sm:text-sm md:text-base text-blue-100 mb-3 sm:mb-4"> {/* Reduced from text-sm sm:text-base md:text-lg mb-4 sm:mb-6 */}
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center"> {/* Reduced from gap-3 sm:gap-4 */}
              <a
                href="https://wa.me/916371106588"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-white text-blue-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm hover:bg-blue-50 transition-all hover:scale-105" /* Reduced from gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base */
              >
                <MessageCircle size={16} className="sm:w-4 sm:h-4" /> {/* Reduced from size={18} */}
                WhatsApp Us
              </a>
              <button
                onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-1.5 bg-transparent border-2 border-white text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm hover:bg-white/10 transition-all hover:scale-105"
              >
                <Car size={16} className="sm:w-4 sm:h-4" />
                Book a Cab
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips Section - Larger Divs for PC */}
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6"> {/* Reduced from mt-10 sm:mt-12 md:mt-16 gap-4 sm:gap-6 md:gap-8 */}
          {[
            { icon: <Clock size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />, text: "24/7 Support" }, /* Reduced from size={24} */
            { icon: <ShieldCheck size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />, text: "Safe Travel" },
            { icon: <MapPin size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />, text: "All Destinations" },
            { icon: <CreditCard size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />, text: "Flexible Payment" }
          ].map((tip, idx) => (
            <div 
              key={idx} 
              className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center border border-gray-200/60 hover:border-blue-300 transition-all shadow-md hover:shadow-lg group cursor-pointer" /* Reduced from rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 */
            >
              <div className="text-blue-600 mb-2 sm:mb-3 md:mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300"> {/* Reduced from mb-3 sm:mb-4 md:mb-5 */}
                {tip.icon}
              </div>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800"> {/* Reduced from text-sm sm:text-base md:text-lg lg:text-xl */}
                {tip.text}
              </span>
            </div>
          ))}
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
      icon: <Users className="text-blue-500" size={22} />, // Reduced from size={24}
      desc: "Trusted by thousands"
    },
    { 
      value: "2+", 
      label: "Cities Network",
      icon: <Globe className="text-green-500" size={22} />,
      desc: "Pan-India coverage"
    },
    { 
      value: "99%", 
      label: "On-time Arrival",
      icon: <Target className="text-purple-500" size={22} />,
      desc: "Punctuality guaranteed"
    },
    { 
      value: "24/7", 
      label: "Expert Support",
      icon: <Headphones className="text-orange-500" size={22} />,
      desc: "Always here for you"
    },
  ];

  return (
    <div className="w-full bg-white py-10 sm:py-14 md:py-16"> {/* Reduced from py-12 sm:py-16 md:py-20 */}
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8"> {/* Reduced from gap-6 sm:gap-8 md:gap-10 */}
          {stats.map((stat, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl transform group-hover:scale-105 transition-all duration-300"></div> {/* Reduced from rounded-2xl sm:rounded-3xl */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200/50 group-hover:border-blue-300/50 transition-all"> {/* Reduced from rounded-2xl sm:rounded-3xl p-6 sm:p-8 */}
                <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3"> {/* Reduced from gap-4 sm:gap-5 mb-3 sm:mb-4 */}
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-xl"> {/* Reduced from p-2 sm:p-3 rounded-xl sm:rounded-2xl */}
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{stat.value}</div> {/* Reduced from text-2xl sm:text-3xl md:text-4xl lg:text-5xl */}
                    <div className="text-xs sm:text-sm md:text-base font-medium text-gray-700">{stat.label}</div> {/* Reduced from text-sm sm:text-base md:text-lg */}
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">{stat.desc}</p> {/* Reduced from text-xs sm:text-sm md:text-base */}
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
      icon: <Navigation className="text-blue-600" size={24} />, // Reduced from size={28}
      title: "City Rides", 
      desc: "Hourly & point-to-point within city",
      gradient: "from-blue-50 to-blue-100"
    },
    { 
      icon: <MapPin className="text-green-600" size={24} />,
      title: "Outstation", 
      desc: "Inter-city & long distance travel",
      gradient: "from-green-50 to-green-100"
    },
    { 
      icon: <Car className="text-purple-600" size={24} />,
      title: "Airport Taxi", 
      desc: "Pickup & drop from airports",
      gradient: "from-purple-50 to-purple-100"
    },
    { 
      icon: <Award className="text-orange-600" size={24} />,
      title: "Corporate", 
      desc: "Business & executive travel",
      gradient: "from-orange-50 to-orange-100"
    },
    { 
      icon: <Star className="text-yellow-600" size={24} />,
      title: "Luxury", 
      desc: "Premium vehicles & VIP service",
      gradient: "from-yellow-50 to-yellow-100"
    },
    { 
      icon: <Users className="text-indigo-600" size={24} />,
      title: "Tour Packages", 
      desc: "Sightseeing & multi-day tours",
      gradient: "from-indigo-50 to-indigo-100"
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-10 sm:py-14 md:py-16 px-6 sm:px-8 lg:px-12 xl:px-16"> {/* Reduced from py-12 sm:py-16 md:py-20 */}
      <div className="w-full">
        <div className="text-center mb-8 sm:mb-10 md:mb-12"> {/* Reduced from mb-10 sm:mb-12 md:mb-16 */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-3 sm:mb-4"> {/* Reduced from gap-3 px-5 sm:px-6 py-2.5 sm:py-3 mb-4 sm:mb-5 */}
            <Sparkles size={16} className="sm:w-4 sm:h-4 text-blue-500" /> {/* Reduced from size={18} */}
            <span className="text-xs sm:text-sm md:text-base font-medium text-blue-700">Explore Services</span> {/* Reduced from text-sm sm:text-base md:text-lg */}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 px-4"> {/* Reduced from text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 */}
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Travel Style</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4"> {/* Reduced from text-base sm:text-lg md:text-xl */}
            Select from our premium cab services tailored for every need
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"> {/* Reduced from gap-6 sm:gap-8 md:gap-10 */}
          {types.map((type, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectType(type.title);
                document.getElementById('enquiry-form')?.scrollIntoView({behavior: 'smooth'});
              }}
              className="group relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-sm group-hover:shadow-lg"></div> {/* Reduced from rounded-2xl sm:rounded-3xl */}
              <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200/50 group-hover:border-blue-300 transition-all"> {/* Reduced from rounded-2xl sm:rounded-3xl p-6 sm:p-8 */}
                <div className="flex items-start gap-3 sm:gap-4"> {/* Reduced from gap-4 sm:gap-5 */}
                  <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${type.gradient} flex-shrink-0`}> {/* Reduced from p-3 sm:p-4 rounded-xl sm:rounded-2xl */}
                    {type.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-900 mb-1 truncate">{type.title}</h3> {/* Reduced from text-xl sm:text-2xl md:text-3xl mb-2 */}
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 line-clamp-2">{type.desc}</p> {/* Reduced from text-sm sm:text-base md:text-lg mb-3 sm:mb-4 */}
                    <div className="flex items-center text-blue-600 font-medium text-xs sm:text-sm md:text-base"> {/* Reduced from text-sm sm:text-base md:text-lg */}
                      <span>Get Quote</span>
                      <ChevronRight size={16} className="ml-1.5 group-hover:translate-x-2 transition-transform" /> {/* Reduced from size={18} ml-2 */}
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
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-10 sm:py-14 md:py-16 px-6 sm:px-8 lg:px-12 xl:px-16"> {/* Reduced from py-12 sm:py-16 md:py-20 */}
      <div className="w-full">
        <div className="text-center mb-8 sm:mb-10 md:mb-12"> {/* Reduced from mb-10 sm:mb-12 md:mb-16 */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-3 sm:mb-4"> {/* Reduced from gap-3 px-5 sm:px-6 py-2.5 sm:py-3 mb-4 sm:mb-5 */}
            <Car size={16} className="sm:w-4 sm:h-4 text-blue-500" /> {/* Reduced from size={18} */}
            <span className="text-xs sm:text-sm md:text-base font-medium text-blue-700">Premium Fleet</span> {/* Reduced from text-sm sm:text-base md:text-lg */}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 px-4"> {/* Reduced from text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 */}
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Premium Fleet</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4"> {/* Reduced from text-base sm:text-lg md:text-xl */}
            Choose from our well-maintained, clean, and comfortable vehicles
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 md:gap-8"> {/* Reduced from gap-6 sm:gap-8 md:gap-10 */}
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
              }`}></div> {/* Reduced from rounded-2xl sm:rounded-3xl */}
              
              <div className={`relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 transition-all ${
                selected === idx 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200/50 group-hover:border-blue-300 shadow-sm'
              }`}> {/* Reduced from rounded-2xl sm:rounded-3xl p-6 sm:p-8 */}
                {/* Tag */}
                {vehicle.tag && (
                  <div className="absolute -top-2 left-3 sm:left-4"> {/* Reduced from -top-3 left-4 sm:left-5 */}
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] sm:text-xs font-bold rounded-full"> {/* Reduced from px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm */}
                      {vehicle.tag}
                    </span>
                  </div>
                )}
                
                {/* Vehicle Icon */}
                <div className="text-center mb-3 sm:mb-4"> {/* Reduced from mb-4 sm:mb-5 */}
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-1 sm:mb-2">{vehicle.icon}</div> {/* Reduced from text-5xl sm:text-6xl md:text-7xl mb-2 sm:mb-3 */}
                  <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-900">{vehicle.type}</h3> {/* Reduced from text-xl sm:text-2xl md:text-3xl */}
                </div>
                
                {/* Capacity */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4"> {/* Reduced from gap-2 sm:gap-3 mb-4 sm:mb-5 */}
                  <Users size={14} className="sm:w-4 sm:h-4 text-gray-500" /> {/* Reduced from size={16} */}
                  <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700">Up to {vehicle.capacity} passengers</span> {/* Reduced from text-sm sm:text-base md:text-lg */}
                </div>
                
                {/* Features */}
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4"> {/* Reduced from space-y-2 sm:space-y-3 mb-4 sm:mb-5 */}
                  {vehicle.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1.5 sm:gap-2"> {/* Reduced from gap-2 sm:gap-3 */}
                      <Check size={12} className="sm:w-3 sm:h-3 text-green-500 flex-shrink-0" /> {/* Reduced from size={14} */}
                      <span className="text-xs sm:text-sm text-gray-600 truncate">{feature}</span> {/* Reduced from text-sm sm:text-base */}
                    </div>
                  ))}
                </div>
                
                {/* Select Button */}
                <button className={`w-full py-1.5 sm:py-2 rounded-md font-medium text-xs sm:text-sm transition-all ${
                  selected === idx
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 group-hover:from-blue-100 group-hover:to-purple-100'
                }`}> {/* Reduced from py-2 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg */}
                  {selected === idx ? '✓ Selected' : 'Select Vehicle'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6 sm:mt-8 md:mt-10 px-4"> {/* Reduced from mt-8 sm:mt-10 md:mt-12 */}
          <p className="text-xs sm:text-sm md:text-base text-gray-500"> {/* Reduced from text-sm sm:text-base md:text-lg */}
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
      icon: <ShieldCheck className="text-green-600" size={24} />, // Reduced from size={28}
      title: "Verified Drivers",
      description: "All drivers undergo thorough background checks and are professionally trained",
      features: ["Police verification", "Experience certificates", "ID proof displayed"]
    },
    {
      icon: <Key className="text-blue-600" size={24} />,
      title: "Hassle-Free Booking",
      description: "Simple process with instant confirmation and flexible payment options",
      features: ["No advance payment", "Multiple payment methods", "Instant confirmation"]
    },
    {
      icon: <Clock className="text-purple-600" size={24} />,
      title: "24/7 Availability",
      description: "Round-the-clock service with real-time tracking and support",
      features: ["Live GPS tracking", "Emergency support", "Flight/train tracking"]
    },
    {
      icon: <TrendingUp className="text-orange-600" size={24} />,
      title: "Best Price Guarantee",
      description: "Competitive pricing with transparent charges and no hidden fees",
      features: ["Price match guarantee", "No surge pricing", "Transparent billing"]
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-10 sm:py-14 md:py-16 px-6 sm:px-8 lg:px-12 xl:px-16"> {/* Reduced from py-12 sm:py-16 md:py-20 */}
      <div className="w-full">
        <div className="text-center mb-8 sm:mb-10 md:mb-12"> {/* Reduced from mb-10 sm:mb-12 md:mb-16 */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-3 sm:mb-4"> {/* Reduced from gap-3 px-5 sm:px-6 py-2.5 sm:py-3 mb-4 sm:mb-5 */}
            <Star size={16} className="sm:w-4 sm:h-4 text-green-500" /> {/* Reduced from size={18} */}
            <span className="text-xs sm:text-sm md:text-base font-medium text-green-700">Why Choose Us</span> {/* Reduced from text-sm sm:text-base md:text-lg */}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 px-4"> {/* Reduced from text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 */}
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">GoTravio Advantage</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4"> {/* Reduced from text-base sm:text-lg md:text-xl */}
            Experience the difference with our premium cab services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-10"> {/* Reduced from gap-6 sm:gap-8 md:gap-10 lg:gap-12 */}
          {benefits.map((benefit, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl transform group-hover:scale-[1.02] transition-all duration-300 shadow-sm group-hover:shadow-lg"></div> {/* Reduced from rounded-2xl sm:rounded-3xl */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200/50 group-hover:border-green-300 transition-all"> {/* Reduced from rounded-2xl sm:rounded-3xl p-6 sm:p-8 */}
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4"> {/* Reduced from gap-4 sm:gap-5 */}
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-50 to-blue-50 flex-shrink-0"> {/* Reduced from p-3 sm:p-4 rounded-xl sm:rounded-2xl */}
                    {benefit.icon}
                  </div>
                  <div className="flex-1 w-full">
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-900 mb-1 sm:mb-2">{benefit.title}</h3> {/* Reduced from text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-2 sm:mb-3">{benefit.description}</p> {/* Reduced from text-base sm:text-lg md:text-xl mb-3 sm:mb-4 */}
                    <div className="space-y-1.5 sm:space-y-2"> {/* Reduced from space-y-2 sm:space-y-3 */}
                      {benefit.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 sm:gap-2"> {/* Reduced from gap-2 sm:gap-3 */}
                          <Check size={14} className="sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" /> {/* Reduced from size={16} */}
                          <span className="text-xs sm:text-sm md:text-base text-gray-700">{feature}</span> {/* Reduced from text-sm sm:text-base md:text-lg */}
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
    { number: 1, title: "Journey Details", icon: <MapPin size={14} /> }, // Reduced from size={16}
    { number: 2, title: "Vehicle Choice", icon: <Car size={14} /> },
    { number: 3, title: "Your Details", icon: <Users size={14} /> },
  ];

  return (
    <section id="enquiry-form" className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 py-10 sm:py-14 md:py-16 px-6 sm:px-8 lg:px-12 xl:px-16"> {/* Reduced from py-12 sm:py-16 md:py-20 */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12"> {/* Reduced from mb-10 sm:mb-12 md:mb-16 */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-3 sm:mb-4"> {/* Reduced from gap-3 px-5 sm:px-6 py-2.5 sm:py-3 mb-4 sm:mb-5 */}
            <Zap size={16} className="sm:w-4 sm:h-4 text-blue-500" /> {/* Reduced from size={18} */}
            <span className="text-xs sm:text-sm md:text-base font-medium text-blue-700">Quick & Easy</span> {/* Reduced from text-sm sm:text-base md:text-lg */}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 px-4"> {/* Reduced from text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 */}
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Custom Quote</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4"> {/* Reduced from text-base sm:text-lg md:text-xl */}
            Fill in your details and receive the best price from our travel experts
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50"> {/* Reduced from rounded-3xl sm:rounded-4xl */}
          {/* Form Header with Steps */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-5 sm:p-6"> {/* Reduced from p-6 sm:p-8 */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 sm:mb-6 gap-3 sm:gap-4"> {/* Reduced from mb-6 sm:mb-8 gap-4 sm:gap-5 */}
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Personalized Cab Quote</h3> {/* Reduced from text-xl sm:text-2xl md:text-3xl */}
                <p className="text-xs sm:text-sm md:text-base text-blue-100">Get the best price for your journey</p> {/* Reduced from text-sm sm:text-base md:text-lg */}
              </div>
              <div className="hidden md:flex items-center gap-2"> {/* Reduced from gap-3 */}
                <Sparkles size={20} className="text-yellow-300" /> {/* Reduced from size={22} */}
                <span className="text-xs font-medium text-white">Quick Response</span> {/* Reduced from text-sm */}
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between relative">
              {steps.map((stepItem, idx) => (
                <div key={idx} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step > stepItem.number ? 'bg-green-500 text-white shadow-lg' :
                    step === stepItem.number ? 'bg-white text-blue-700 shadow-lg' :
                    'bg-white/20 text-white'
                  }`}> {/* Reduced from w-10 h-10 sm:w-12 sm:h-12 */}
                    {step > stepItem.number ? '✓' : stepItem.icon}
                  </div>
                  <span className={`text-[10px] sm:text-xs mt-1.5 font-medium transition-colors ${
                    step >= stepItem.number ? 'text-white' : 'text-blue-200'
                  }`}> {/* Reduced from text-xs sm:text-sm mt-2 */}
                    {stepItem.title}
                  </span>
                </div>
              ))}
              <div className="absolute top-4 sm:top-5 left-0 right-0 h-0.5 sm:h-1 bg-white/20 -z-10"> {/* Reduced from top-5 sm:top-6 */}
                <div className={`h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300`}
                     style={{width: `${((step-1) * 50)}%`}}></div>
              </div>
            </div>
          </div>

          {/* Form Content - Smaller */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6"> {/* Reduced from p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"> {/* Reduced from gap-6 sm:gap-8 */}
                  <div className="space-y-1.5 sm:space-y-2"> {/* Reduced from space-y-2 sm:space-y-3 */}
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5"> {/* Reduced from text-sm sm:text-base md:text-lg gap-2 */}
                      <MapPin size={14} className="sm:w-4 sm:h-4 text-blue-500" /> {/* Reduced from size={16} */}
                      Pickup Location *
                    </label>
                    <input
                      name="pickupLocation"
                      value={form.pickupLocation}
                      onChange={handleChange}
                      placeholder="Where should we pick you up?"
                      className={`w-full rounded-lg sm:rounded-xl border ${errors.pickupLocation ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all`} /* Reduced from rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 */
                    />
                    {errors.pickupLocation && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-0.5">{errors.pickupLocation}</p> /* Reduced from text-xs sm:text-sm mt-1 */
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      <Navigation size={14} className="sm:w-4 sm:h-4 text-green-500" />
                      Destination *
                    </label>
                    <input
                      name="dropLocation"
                      value={form.dropLocation}
                      onChange={handleChange}
                      placeholder="Where are you heading?"
                      className={`w-full rounded-lg sm:rounded-xl border ${errors.dropLocation ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all`}
                    />
                    {errors.dropLocation && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-0.5">{errors.dropLocation}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={switchLocations}
                    className="p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 transition-all" /* Reduced from p-2 sm:p-3 */
                  >
                    <ArrowUpDown size={16} className="sm:w-4 sm:h-4" /> {/* Reduced from size={18} */}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      <Calendar size={14} className="sm:w-4 sm:h-4 text-purple-500" />
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className={`w-full rounded-lg sm:rounded-xl border ${errors.date ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none`}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-0.5">{errors.date}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      <Clock size={14} className="sm:w-4 sm:h-4 text-orange-500" />
                      Time *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className={`w-full rounded-lg sm:rounded-xl border ${errors.time ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none`}
                    />
                    {errors.time && (
                      <p className="text-red-500 text-[10px] sm:text-xs mt-0.5">{errors.time}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-3 sm:pt-4"> {/* Reduced from pt-4 sm:pt-5 */}
                  <div></div>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep()) setStep(2);
                    }}
                    className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105" /* Reduced from px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg gap-3 */
                  >
                    Next: Vehicle Selection
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" size={16} /> {/* Reduced from size={18} */}
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-5 sm:space-y-6"> {/* Reduced from space-y-6 sm:space-y-8 */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      <Users size={14} className="sm:w-4 sm:h-4 text-blue-500" />
                      Number of Passengers
                    </label>
                    <select
                      name="passengers"
                      value={form.passengers}
                      onChange={handleChange}
                      className="w-full rounded-lg sm:rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none appearance-none bg-white" /* Reduced from rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 */
                    >
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      <Car size={14} className="sm:w-4 sm:h-4 text-green-500" />
                      Preferred Vehicle Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3"> {/* Reduced from gap-3 sm:gap-4 */}
                      {['Hatchback', 'Sedan', 'SUV', 'Luxury', 'Traveller', 'Any'].map(type => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setForm({...form, carType: type})}
                          className={`p-2 sm:p-3 rounded-lg border-2 transition-all text-xs sm:text-sm ${
                            form.carType === type 
                              ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700' 
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`} /* Reduced from p-3 sm:p-4 rounded-xl sm:rounded-2xl text-sm sm:text-base */
                        >
                          <span className="font-medium truncate block">{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100"> {/* Reduced from rounded-xl sm:rounded-2xl p-4 sm:p-5 */}
                    <div className="flex items-start gap-2 sm:gap-3"> {/* Reduced from gap-3 sm:gap-4 */}
                      <Info size={18} className="text-blue-600 mt-0.5 flex-shrink-0" /> {/* Reduced from size={20} */}
                      <div>
                        <p className="text-xs sm:text-sm text-blue-800 font-medium">Custom Pricing</p> {/* Reduced from text-sm sm:text-base md:text-lg */}
                        <p className="text-[10px] sm:text-xs text-blue-600"> {/* Reduced from text-xs sm:text-sm md:text-base */}
                          Our travel expert will provide the best price based on your exact requirements
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-between pt-3 sm:pt-4"> {/* Reduced from gap-4 pt-4 sm:pt-5 */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all text-xs sm:text-sm" /* Reduced from px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base */
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-105" /* Reduced from px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg gap-3 */
                  >
                    Next: Your Details
                    <ChevronRight className="group-hover:translate-x-2 transition-transform" size={16} />
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">
                        Your Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full rounded-lg sm:rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[10px] sm:text-xs mt-0.5">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter 10-digit mobile number"
                        className={`w-full rounded-lg sm:rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-[10px] sm:text-xs mt-0.5">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {showEmail ? (
                    <div className="space-y-1.5 sm:space-y-2 animate-slideDown">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full rounded-lg sm:rounded-xl border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowEmail(true)}
                      className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center gap-1.5" /* Reduced from text-sm sm:text-base gap-2 */
                    >
                      <Plus size={14} /> {/* Reduced from size={16} */}
                      Add email for itinerary (optional)
                    </button>
                  )}

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-200"> {/* Reduced from rounded-xl sm:rounded-2xl p-4 sm:p-5 */}
                    <div className="flex items-start gap-2 sm:gap-3"> {/* Reduced from gap-3 sm:gap-4 */}
                      <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" /> {/* Reduced from size={20} */}
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">What happens next?</p> {/* Reduced from text-sm sm:text-base md:text-lg */}
                        <ul className="text-[10px] sm:text-xs text-gray-600 mt-1.5 sm:mt-2 space-y-0.5 sm:space-y-1"> {/* Reduced from text-xs sm:text-sm md:text-base mt-2 sm:mt-3 space-y-1 sm:space-y-2 */}
                          <li>✓ Our travel expert contacts you within 15 minutes</li>
                          <li>✓ Receive custom quote based on exact requirements</li>
                          <li>✓ Confirm booking with no advance payment required</li>
                          <li>✓ Professional driver arrives on time at pickup location</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-between pt-3 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all text-xs sm:text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-70" /* Reduced from px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg gap-3 */
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> {/* Reduced from h-5 w-5 */}
                        Processing...
                      </>
                    ) : (
                      <>
                        <MessageCircle size={16} /> {/* Reduced from size={20} */}
                        Get Custom Quote Now
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="text-center mt-6 sm:mt-8 md:mt-10 px-4"> {/* Reduced from mt-8 sm:mt-10 md:mt-12 */}
          <p className="text-xs sm:text-sm md:text-base text-gray-500"> {/* Reduced from text-sm sm:text-base md:text-lg */}
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

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/916371106588"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-50 group" /* Reduced from bottom-6 sm:bottom-8 right-6 sm:right-8 */
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg group-hover:blur-xl transition-all opacity-70"></div>
        <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-2.5 sm:p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110"> {/* Reduced from p-3 sm:p-4 */}
          <MessageCircle size={22} className="sm:w-6 sm:h-6" /> {/* Reduced from size={24} */}
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
      
      {/* Enquiry Form */}
      <EnquiryForm 
        initialData={formData}
        onSubmit={handleFormSubmit}
      />
      
      {/* Image Carousel */}
      <ImageCarousel />
      
      {/* FAQ Section - Single Column with Larger Quick Tips */}
      <FAQSection />

      {formMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown w-[90%] sm:w-auto">
          <div className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-2xl text-xs sm:text-sm ${
            formMessage.includes('🎉') 
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
              : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
          }`}> {/* Reduced from px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base */}
            {formMessage}
          </div>
        </div>
      )}

      <FloatingWhatsApp />
    </div>
  );
};

export default Cabs;