import React, { useState, useRef, useCallback, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import AboutCarousel from "../components/AboutCarousel";
import {
  Users,
  Shield,
  Heart,
  Award,
  Target,
  Globe,
  Clock,
  MessageCircle,
  Headphones,
  CheckCircle,
  Zap,
  Sparkles,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Star,
  ThumbsUp,
  Briefcase,
  Coffee,
  Truck,
  Ticket,
  Car,
  Package,
  TrendingUp,
  BookOpen,
  HelpCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Quote,
  ChevronDown,
  Compass,
  Sunrise,
  Coffee as CoffeeIcon,
  Smile,
  ThumbsUp as ThumbsUpIcon,
  Award as AwardIcon,
  TrendingUp as TrendingUpIcon,
  Calendar,
  DollarSign,
  Headphones as HeadphonesIcon,
  UserCheck,
  Clock as ClockIcon,
  Map,
  Navigation,
  Luggage,
  Wifi,
  Battery,
  Coffee as CoffeeCup
} from "lucide-react";

// Ultra-optimized CSS - sirf performance ke liye, UI pe koi asar nahi
const PerformanceStyles = () => (
  <style>{`
    /* Hardware acceleration - smooth as butter */
    .motion-div, .motion-section, [class*="motion-"], .group, button, a {
      transform: translateZ(0);
      backface-visibility: hidden;
      perspective: 1000px;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Super smooth scrolling */
    html {
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scroll-padding-top: 20px;
    }
    
    /* Optimize all animations */
    * {
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
    }
    
    /* Reduce paint operations */
    .bg-gradient-to-br, .bg-gradient-to-r {
      will-change: transform;
    }
    
    /* Optimize for mobile */
    @media (max-width: 768px) {
      .motion-div, .motion-section {
        transition-duration: 0.2s !important;
      }
      
      /* Faster animations on mobile */
      [data-animate] {
        transition: opacity 0.2s ease, transform 0.2s ease !important;
      }
    }
  `}</style>
);

// ================= SAME ANIMATION VARIANTS =================

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInDown = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring", stiffness: 50 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: "spring", stiffness: 50 } }
};

const slideInUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 50 } }
};

const slideInDown = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", stiffness: 50 } }
};

const rotateIn = {
  hidden: { opacity: 0, rotate: -10, scale: 0.8 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 100 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 200 } }
};

// ================= OPTIMIZED ANIMATED SECTION =================

const AnimatedSection = memo(({ children, delay = 0, className = "", direction = "left", once = true }) => {
  const ref = useRef(null);
  // Ultra-fast trigger
  const inView = useInView(ref, { 
    once: false, 
    amount: 0.05,
    margin: "-10px"
  });
  
  let initialX = 0;
  let initialY = 0;
  
  if (direction === "left") initialX = -100;
  else if (direction === "right") initialX = 100;
  else if (direction === "up") initialY = 100;
  else if (direction === "down") initialY = -100;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initialX, y: initialY }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 50 }}
      className={`${className} motion-div`}
    >
      {children}
    </motion.div>
  );
});

// ================= SAME COLOR FUNCTIONS =================

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

// ================= MAIN COMPONENT (EXACT SAME UI) =================

const AboutUs = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Pre-bind callbacks for better performance
  const toggleFaq = useCallback((index) => {
    setOpenFaqIndex(prev => prev === index ? null : index);
  }, []);

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Company milestones
  const milestones = [
    { year: "Nov 2025", event: "GoTravio founded with a vision to revolutionize travel assistance in India", icon: <Sunrise className="w-5 h-5" /> },
    { year: "Dec 2025", event: "Launched pan-India services - helping travelers from Kashmir to Kanyakumari", icon: <Globe className="w-5 h-5" /> },
    { year: "Jan 2026", event: "Assisted 100+ travelers with cab rentals, train tickets, and flight bookings", icon: <Users className="w-5 h-5" /> },
    { year: "Feb 2026", event: "Built network of 200+ verified service providers across India", icon: <Shield className="w-5 h-5" /> },
    { year: "2026", event: "Growing rapidly with 98% customer satisfaction rate", icon: <Award className="w-5 h-5" /> },
  ];

  // Core values
  const coreValues = [
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Personalized Service",
      desc: "Every traveler is unique. We take time to understand your specific needs and preferences before making any recommendations."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Complete Transparency",
      desc: "No hidden charges, no surprises. We clearly explain all options, costs, and processes so you can make informed decisions."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Response",
      desc: "Average response time under 30 minutes. We value your time and ensure you're never left waiting."
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "End-to-End Support",
      desc: "From first enquiry to journey completion, we're with you every step of the way. 24/7 assistance available."
    },
  ];

  // Stats
  const stats = [
    { value: "500+", label: "Happy Travelers", icon: <Users className="w-6 h-6" />, description: "And growing every day" },
    { value: "Pan India", label: "Service Coverage", icon: <Globe className="w-6 h-6" />, description: "All states, all cities" },
    { value: "98%", label: "Satisfaction Rate", icon: <ThumbsUp className="w-6 h-6" />, description: "Based on customer feedback" },
    { value: "24/7", label: "Dedicated Support", icon: <Headphones className="w-6 h-6" />, description: "Always here for you" },
    { value: "200+", label: "Verified Partners", icon: <Shield className="w-6 h-6" />, description: "Carefully vetted" },
    { value: "15 min", label: "Avg Response", icon: <Zap className="w-6 h-6" />, description: "Quick assistance" },
  ];

  // Advantages
  const advantages = [
    {
      title: "Save Time & Effort",
      points: [
        "No more browsing dozens of websites - we do the research for you",
        "Get customized options based on your preferences in one place",
        "Quick responses mean faster planning and booking"
      ],
      icon: <ClockIcon className="w-6 h-6" />
    },
    {
      title: "Expert Guidance",
      points: [
        "Our team understands travel inside out - from Tatkal timings to best flight deals",
        "Get insider tips and recommendations you won't find on booking sites",
        "Avoid common pitfalls with our experienced guidance"
      ],
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      title: "Better Prices",
      points: [
        "We compare multiple options to find you the best value",
        "Access to partner discounts and special offers",
        "Transparent pricing - you pay the actual service provider directly"
      ],
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: "Hassle-Free Experience",
      points: [
        "We handle the coordination so you don't have to",
        "Single point of contact for all your travel needs",
        "Quick resolution if any issues arise"
      ],
      icon: <Smile className="w-6 h-6" />
    },
    {
      title: "Verified Providers",
      points: [
        "All our partners undergo thorough background verification",
        "We only work with licensed and reliable service providers",
        "Regular quality checks ensure consistent service"
      ],
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Personalized Attention",
      points: [
        "No automated responses - real people handling your enquiry",
        "We remember your preferences for future bookings",
        "Flexible and adaptable to your changing needs"
      ],
      icon: <Heart className="w-6 h-6" />
    }
  ];

  // Service Features
  const serviceFeatures = [
    {
      category: "Cab Rentals",
      features: [
        "Local city rides in all major cities",
        "Outstation trips to tourist destinations",
        "Airport transfers with flight tracking",
        "Corporate travel solutions",
        "Wedding and event transportation",
        "Tempo traveller for group travel"
      ],
      coverage: "Available in all cities across India",
      icon: "🚗"
    },
    {
      category: "Train Tickets",
      features: [
        "Tatkal and Premium Tatkal booking assistance",
        "General quota booking up to 120 days in advance",
        "Senior citizen and ladies quota guidance",
        "Foreign tourist quota assistance",
        "Waitlist confirmation strategies",
        "PNR status tracking help"
      ],
      coverage: "All Indian Railway routes",
      icon: "🚂"
    },
    {
      category: "Flight Tickets",
      features: [
        "Domestic flight bookings at best prices",
        "International flight assistance",
        "Student fare and group discounts",
        "Last-minute booking help",
        "Multi-city trip planning",
        "Business class options"
      ],
      coverage: "All domestic and international routes",
      icon: "✈️"
    },
    {
      category: "Tour Packages",
      features: [
        "Customized itineraries for families",
        "Honeymoon packages",
        "Adventure tours",
        "Spiritual and pilgrimage tours",
        "Corporate retreat planning",
        "Group tour coordination"
      ],
      coverage: "Destinations across India and abroad",
      icon: "🏝️"
    }
  ];

  // Travel Tips
  const travelTips = [
    {
      title: "Tatkal Booking Success Tips",
      tip: "Keep passenger details and payment ready before 10 AM. Our team can guide you through the process for higher success rate.",
      category: "Train Travel"
    },
    {
      title: "Best Time to Book Flights",
      tip: "Book domestic flights 30-60 days in advance for best fares. International flights: 60-90 days ahead. Tuesdays often have lower prices.",
      category: "Flight Tips"
    },
    {
      title: "Essential Travel Documents",
      tip: "Always carry multiple ID proofs and keep digital copies. For train travel, original ID is mandatory. For flights, check airline requirements.",
      category: "Travel Prep"
    },
    {
      title: "Choosing the Right Cab",
      tip: "Sedans for airport transfers, SUVs for hill stations, Tempo Traveller for groups. Share your luggage details for accurate recommendations.",
      category: "Cab Guide"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Suresh Reddy",
      location: "Hyderabad",
      text: "GoTravio helped me book Tatkal tickets when I was struggling with the IRCTC website. Their team was patient and guided me through the entire process. Got confirmed tickets!",
      rating: 5,
      service: "Train Tickets"
    },
    {
      name: "Anjali Desai",
      location: "Mumbai",
      text: "The cab service arranged by GoTravio was excellent. Clean car, polite driver, and they even tracked my flight delay and adjusted pickup time. Highly recommended!",
      rating: 5,
      service: "Cab Rental"
    },
    {
      name: "Vikram Mehta",
      location: "Delhi",
      text: "Our family trip to Goa was beautifully planned. They suggested activities we hadn't thought of and coordinated everything. Will definitely use again.",
      rating: 5,
      service: "Tour Package"
    },
    {
      name: "Priya Sharma",
      location: "Bangalore",
      text: "I was skeptical about a new company but they exceeded expectations. Found me a great flight deal and were available on WhatsApp even at 11 PM!",
      rating: 5,
      service: "Flight Booking"
    },
  ];

  // FAQ Data
  const faqs = [
    {
      question: "Is GoTravio available in my city?",
      answer: "Yes! We serve customers across India - from metropolitan cities to smaller towns. Whether you're in Mumbai, Delhi, Bangalore, Chennai, Kolkata, or any other city, we can assist you with your travel needs."
    },
    {
      question: "How is GoTravio different from booking directly?",
      answer: "We save you time and effort by doing all the research and coordination. Instead of visiting multiple websites, you get personalized options in one place. Plus, our expert guidance helps you avoid common mistakes and get better deals."
    },
    {
      question: "Do you charge for your services?",
      answer: "Our consultation and assistance are completely free. When you book through our partners, you pay them directly. We don't add any markup or hidden fees - just honest, helpful service."
    },
    {
      question: "How quickly do you respond?",
      answer: "Our average response time is under 30 minutes. For urgent needs like Tatkal bookings or last-minute travel, we prioritize immediate assistance. You can reach us via call, WhatsApp, or email."
    },
    {
      question: "Can you guarantee Tatkal tickets?",
      answer: "While we can't guarantee Tatkal tickets due to IRCTC's system limitations, our success rate is significantly higher because we prepare in advance, have strategies for faster booking, and guide you through the process step by step."
    },
    {
      question: "What if I need to cancel or modify my booking?",
      answer: "We assist with cancellations and modifications based on the service provider's policies. Our team will guide you through the process and help with any issues that arise."
    },
    {
      question: "Do you have your own vehicles?",
      answer: "We partner with verified, licensed cab operators across India rather than owning vehicles. This allows us to offer you more options and better prices while ensuring quality through our vetting process."
    },
    {
      question: "Is GoTravio a new company? Should I trust you?",
      answer: "Yes, we're a new company founded in late 2025, and that's actually to your advantage! We're hungry to prove ourselves, so we go above and beyond for every customer. Our early reviews speak for themselves - 98% satisfaction rate from 500+ travelers. We're transparent, responsive, and genuinely care about building long-term relationships."
    }
  ];

  // Schema data
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About GoTravio Travels",
    "description": "Learn about GoTravio, India's premier travel assistance platform providing expert help for cab rentals, train tickets, flight bookings, and tour packages.",
    "url": "https://gotravio.com/about",
    "mainEntity": {
      "@type": "TravelAgency",
      "name": "GoTravio Travels",
      "description": "India's premier travel assistance platform providing expert help for cab rentals, train tickets, flight bookings, and tour packages.",
      "foundingDate": "2025-11",
      "numberOfEmployees": "10+",
      "areaServed": "India",
      "award": "98% Customer Satisfaction Rate",
      "knowsAbout": ["Travel Planning", "Cab Booking", "Train Tickets", "Flight Bookings", "Tour Packages", "Tatkal Booking"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "India",
        "addressCountry": "IN"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  };

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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GoTravio Travels",
    "url": "https://gotravio.com",
    "logo": "https://gotravio.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/gotravio",
      "https://www.instagram.com/go_travio_",
      "https://twitter.com/gotravio"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-90238-84833",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Gujarati"]
    }
  };

  return (
    <>
      <PerformanceStyles />
      <SEO 
        title="About GoTravio Travels | India's Premier Travel Assistance Platform"
        description="Learn about GoTravio, India's trusted travel assistance platform. We provide expert help for cab rentals, train tickets (including Tatkal), flight bookings, and custom tour packages across India with 98% customer satisfaction."
        keywords="about GoTravio, travel assistance company, travel agency India, about us, travel experts India, travel planning service, Indian travel agency, cab booking service, train ticket assistance, flight booking help, tour packages India"
        canonicalUrl="/about"
        ogImage="https://gotravio.com/about-og-image.jpg"
        schemaData={[aboutSchema, faqSchema, organizationSchema]}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        
        {/* ================= HERO SECTION (SAME UI) ================= */}
        <AnimatedSection direction="down">
          <section className="relative bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
                >
                  <Sparkles size={16} className="text-yellow-300" />
                  <span className="text-sm font-medium">India's Emerging Travel Assistance Platform</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                  Your Personal
                  <motion.span 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="block text-yellow-300 mt-2"
                  >
                    Travel Assistant
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.4 }}
                  className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
                >
                  GoTravio provides expert travel assistance across India - from cab rentals and train tickets 
                  to flight bookings and tour packages. We do the research, you enjoy the journey.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToContact}
                    className="group px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold hover:bg-slate-100 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Get Travel Help
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/contact"
                      className="px-8 py-4 border-2 border-white/60 text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                    >
                      <Phone size={18} />
                      Talk to an Expert
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* ================= STATS SECTION (SAME UI) ================= */}
        <AnimatedSection direction="up">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInScale}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className={`group relative ${getCardGradient(index)} rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <motion.div
                      animate={hoveredCard === index ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 mx-auto ${getIconColor(index)}`}
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-500 hidden sm:block">{stat.description}</div>
                    
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={hoveredCard === index ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-indigo-500 rounded-xl"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </AnimatedSection>

        <AboutCarousel />

        {/* ================= OUR STORY (SAME UI) ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection direction="left">
                <div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-6"
                  >
                    <BookOpen size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Our Story</span>
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">GoTravio</span> Story
                  </h2>
                  
                  <div className="space-y-4 text-gray-600 text-lg">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: false }}
                    >
                      GoTravio was founded in November 2025 with a clear vision: <span className="font-semibold text-blue-600">to make travel planning simple, personal, and stress-free for every Indian traveler.</span> Our founder, after years of struggling with impersonal booking platforms and automated customer service, decided it was time for a change.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: false }}
                    >
                      We started with a simple belief - that behind every travel plan is a person with unique needs, preferences, and dreams. Whether it's a family vacation, a business trip, or an emergency journey, travelers deserve personalized attention and expert guidance.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: false }}
                    >
                      Today, we serve customers <span className="font-bold text-blue-600">across India</span> - from the bustling streets of Mumbai to the serene hills of Manali, from the beaches of Goa to the temples of Tamil Nadu. Our network of 200+ verified partners ensures that wherever you want to go, we can help you get there.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: false }}
                      className="bg-blue-50 p-4 rounded-xl italic"
                    >
                      "We're not just another travel website. We're your personal travel assistant - available 24/7, always honest, and genuinely invested in making your journey memorable."
                    </motion.p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"
                  />
                  <div className={`relative ${getCardGradient(0)} rounded-3xl shadow-2xl p-8 border border-gray-200`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <AwardIcon className="text-blue-600" />
                      Our Journey
                    </h3>
                    <div className="space-y-6">
                      {milestones.map((milestone, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: false }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className={`flex gap-4 items-start p-2 rounded-lg transition-all ${getCardGradient(index)}`}
                        >
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(index)}`}
                          >
                            {milestone.icon}
                          </motion.div>
                          <div className="flex-grow">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className={`text-lg font-bold ${getIconColor(index)}`}>{milestone.year}</span>
                            </div>
                            <p className="text-gray-700">{milestone.event}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-center text-gray-700">
                        <span className="font-bold text-blue-600">98%</span> of our customers say they'd recommend us to friends and family
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ================= WHY BOOK WITH GOTRAVIO (SAME UI) ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection direction="down">
              <div className="text-center mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4"
                >
                  <AwardIcon size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Why Choose Us</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">GoTravio</span> Advantage
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Here's why hundreds of travelers choose us over booking directly
                </p>
              </div>
            </AnimatedSection>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  variants={fadeInScale}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onHoverStart={() => setHoveredCard(index + 10)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className={`group relative ${getCardGradient(index)} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200`}
                >
                  <motion.div
                    animate={hoveredCard === index + 10 ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getIconColor(index)}`}
                  >
                    {advantage.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                  <ul className="space-y-2">
                    {advantage.points.map((point, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: false }}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <CheckCircle size={16} className={`${getIconColor(idx)} flex-shrink-0 mt-1`} />
                        <span className="text-sm">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={hoveredCard === index + 10 ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-indigo-500 rounded-xl"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= CORE VALUES (SAME UI) ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection direction="down">
              <div className="text-center mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4"
                >
                  <Target size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Our Principles</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Stand For</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  The values that guide every interaction with our customers
                </p>
              </div>
            </AnimatedSection>

            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="grid sm:grid-cols-2 gap-6 w-full lg:w-3/5"
              >
                {coreValues.map((value, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInScale}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onHoverStart={() => setHoveredCard(index + 20)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className={`group relative ${getCardGradient(index)} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100`}
                  >
                    <motion.div
                      animate={hoveredCard === index + 20 ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex p-3 rounded-xl mb-4 ${getIconColor(index)}`}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.desc}</p>
                    
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={hoveredCard === index + 20 ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-indigo-500 rounded-2xl"
                    />
                  </motion.div>
                ))}
              </motion.div>

              <AnimatedSection direction="right" className="w-full lg:w-2/5">
                <div className="relative">
                  <motion.div
                    animate={{ y: [-15, 15, -15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-square md:aspect-[4/3] lg:aspect-square z-10"
                  >
                    <img 
                      src="https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Travel Principles"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-purple-900/30 mix-blend-overlay"></div>
                  </motion.div>

                  {/* Floating Image 1 */}
                  <motion.div
                    animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-8 -left-8 w-32 h-32 sm:w-48 sm:h-48 rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white z-20 hidden md:block"
                  >
                    <img src="https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover" alt="Travel vibe"/>
                  </motion.div>

                  {/* Floating Image 2 */}
                  <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -top-8 -right-6 w-24 h-24 sm:w-40 sm:h-40 rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white z-20 hidden md:block"
                  >
                    <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Explore"/>
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ================= OUR SERVICES (SAME UI) ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection direction="down">
              <div className="text-center mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4"
                >
                  <Briefcase size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Our Services</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Travel Assistance</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  From cab rentals to flight bookings - we've got you covered across India
                </p>
              </div>
            </AnimatedSection>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {serviceFeatures.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onHoverStart={() => setHoveredCard(index + 30)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className={`group relative ${getCardGradient(index)} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={hoveredCard === index + 30 ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl
                        ${index === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                          index === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                          index === 2 ? 'bg-gradient-to-br from-green-500 to-green-600' :
                          'bg-gradient-to-br from-orange-500 to-orange-600'}`}
                    >
                      {service.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.category}</h3>
                      <p className="text-sm text-blue-600 font-medium">{service.coverage}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-4">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: false }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle size={18} className={`${getIconColor(idx)} flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.div whileHover={{ x: 5 }}>
                    <Link 
                      to={`/${service.category.toLowerCase().replace(' ', '')}`}
                      className={`inline-flex items-center font-semibold hover:gap-2 transition-all group mt-2 ${getIconColor(index)}`}
                    >
                      Learn more about {service.category}
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={hoveredCard === index + 30 ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-indigo-500 rounded-2xl"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= PAN INDIA COVERAGE (SAME UI) ================= */}
        <AnimatedSection direction="up">
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Globe size={48} className="mx-auto mb-4 text-white/80" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Serving Customers Across India</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                From metro cities to remote towns - wherever you are, we're here to help with your travel needs
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="flex flex-wrap justify-center gap-3 text-sm"
              >
                {["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Goa", "Chandigarh", "Kochi", "Indore", "Nagpur", "And 500+ more locations"].map((city, idx) => (
                  <motion.span
                    key={idx}
                    variants={fadeInScale}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all cursor-default"
                  >
                    {city}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </section>
        </AnimatedSection>

        {/* ================= TRAVEL TIPS (SAME UI) ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection direction="down">
              <div className="text-center mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4"
                >
                  <BookOpen size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Expert Advice</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Travel Tips From <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Our Experts</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Insider knowledge to make your journey smoother and more affordable
                </p>
              </div>
            </AnimatedSection>

            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="grid sm:grid-cols-2 gap-6 w-full lg:w-3/5"
              >
                {travelTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInScale}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onHoverStart={() => setHoveredCard(index + 40)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className={`group relative ${getCardGradient(index)} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-200`}
                  >
                    <div className={`h-2 bg-gradient-to-r ${getIconColor(index)}`}></div>
                    <div className="p-6">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getCardGradient(index)} ${getIconColor(index)}`}
                      >
                        {tip.category}
                      </motion.span>
                      <h3 className={`text-lg font-bold text-gray-900 mb-2 group-hover:${getIconColor(index)} transition-colors`}>
                        {tip.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{tip.tip}</p>
                    </div>
                    
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={hoveredCard === index + 40 ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-indigo-500 pointer-events-none"
                    />
                  </motion.div>
                ))}
              </motion.div>

              <AnimatedSection direction="right" className="w-full lg:w-2/5">
                <div className="relative">
                  <motion.div
                    animate={{ y: [-15, 15, -15], rotate: [0, 1, -1, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-square md:aspect-[4/3] lg:aspect-square z-10"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
                      alt="Travel Guide"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-teal-900/30 mix-blend-overlay"></div>
                  </motion.div>

                  {/* Floating Image 1 */}
                  <motion.div
                    animate={{ y: [12, -12, 12], rotate: [-8, 8, -8] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 -left-8 w-32 h-32 sm:w-48 sm:h-48 rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white z-20 hidden md:block"
                  >
                    <img src="http://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover" alt="Travel Bag"/>
                  </motion.div>

                  {/* Floating Image 2 */}
                  <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [6, -6, 6] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-10 -right-8 w-24 h-24 sm:w-36 sm:h-36 rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white z-20 hidden md:block"
                  >
                    <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Map"/>
                  </motion.div>
                  
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl -z-10"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS (SAME UI) ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection direction="down">
              <div className="text-center mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full px-4 py-2 mb-4"
                >
                  <Star size={16} className="text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-700">Customer Stories</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">Travelers</span> Say
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Real experiences from people who've traveled with us
                </p>
              </div>
            </AnimatedSection>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <AnimatedSection direction="left" className="w-full lg:w-1/3">
                <div className="relative max-w-sm mx-auto lg:max-w-none">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] object-cover z-10"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
                      alt="Happy Travelers"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                      <div className="flex justify-center mb-2">
                        {[1,2,3,4,5].map((_, i) => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <p className="font-bold text-lg md:text-xl">Trusted by 500+ Travelers</p>
                    </div>
                  </motion.div>

                  {/* Floating Image 1 */}
                  <motion.div
                    animate={{ y: [15, -15, 15], rotate: [-6, 6, -6] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-10 -left-12 w-28 h-28 sm:w-40 sm:h-40 rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white z-20 hidden lg:block"
                  >
                    <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Travel friends"/>
                  </motion.div>

                  {/* Floating Image 2 */}
                  <motion.div
                    animate={{ y: [-15, 15, -15], rotate: [6, -6, 6] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-20 -right-8 w-32 h-32 sm:w-44 sm:h-44 rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white z-20 hidden lg:block"
                  >
                    <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Happy trip"/>
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -z-10"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -z-10"
                  />
                </div>
              </AnimatedSection>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="grid sm:grid-cols-2 gap-4 sm:gap-6 w-full lg:w-2/3"
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInScale}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onHoverStart={() => setHoveredCard(index + 50)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className={`group relative ${getCardGradient(index)} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200`}
                  >
                    <motion.div
                      animate={hoveredCard === index + 50 ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Quote className={`absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 ${getIconColor(index)} opacity-30`} />
                    </motion.div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={hoveredCard === index + 50 ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <Star key={i} size={14} className="sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 italic line-clamp-4">"{testimonial.text}"</p>
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 mt-auto">
                      <div>
                        <p className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-medium text-center whitespace-nowrap ${getCardGradient(index)} ${getIconColor(index)}`}
                      >
                        {testimonial.service}
                      </motion.span>
                    </div>
                    
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={hoveredCard === index + 50 ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-indigo-500 rounded-2xl pointer-events-none"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION (SAME UI) ================= */}
        <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection direction="down">
              <div className="text-center mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4"
                >
                  <HelpCircle size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">FAQ</span>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Everything you need to know about GoTravio
                </p>
              </div>
            </AnimatedSection>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: false }}
                  whileHover={{ scale: 1.02 }}
                  className={`${getCardGradient(index)} rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 overflow-hidden`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none hover:bg-gray-50/50 transition-colors"
                  >
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 pr-4">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className={`w-5 h-5 ${getIconColor(index)} flex-shrink-0`} />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-3 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION (SAME UI) ================= */}
        <AnimatedSection direction="up">
          <section id="contact-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Ready to Plan Your Journey?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
                className="text-xl text-blue-100 mb-8"
              >
                Our travel experts are available 24/7 to help you with personalized assistance
              </motion.p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="grid sm:grid-cols-3 gap-6 mb-8"
              >
                <motion.a
                  variants={fadeInScale}
                  whileHover={{ scale: 1.05, y: -5 }}
                  href="tel:+919023884833"
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Phone className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                  </motion.div>
                  <p className="font-semibold mb-1">Call Us</p>
                  <p className="text-sm text-blue-200">+91 90238 84833</p>
                  <p className="text-xs text-blue-300 mt-2">24/7 Available</p>
                </motion.a>
                
                <motion.a
                  variants={fadeInScale}
                  whileHover={{ scale: 1.05, y: -5 }}
                  href="https://wa.me/919023884833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MessageCircle className="w-8 h-8 mx-auto mb-3 text-green-300" />
                  </motion.div>
                  <p className="font-semibold mb-1">WhatsApp</p>
                  <p className="text-sm text-blue-200">Quick Chat</p>
                  <p className="text-xs text-blue-300 mt-2">Avg response: 15 min</p>
                </motion.a>
                
                <motion.a
                  variants={fadeInScale}
                  whileHover={{ scale: 1.05, y: -5 }}
                  href="mailto:gotravio.travel@gmail.com"
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Mail className="w-8 h-8 mx-auto mb-3 text-purple-300" />
                  </motion.div>
                  <p className="font-semibold mb-1">Email Us</p>
                  <p className="text-sm text-blue-200">gotravio.travel@gmail.com</p>
                  <p className="text-xs text-blue-300 mt-2">Reply within 2 hrs</p>
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: false }}
                className="flex justify-center gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <Facebook size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <Twitter size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <Instagram size={18} />
                </motion.a>
              </motion.div>
            </div>
          </section>
        </AnimatedSection>

        {/* ================= FLOATING WHATSAPP (SAME UI) ================= */}
        <motion.a
          href="https://wa.me/919023884833"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-green-500 rounded-full blur-lg group-hover:blur-xl transition-all opacity-70"
            />
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all">
              <MessageCircle size={24} />
            </div>
          </div>
        </motion.a>
      </div>
    </>
  );
};

export default AboutUs;