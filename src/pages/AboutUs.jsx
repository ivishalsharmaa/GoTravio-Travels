import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
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

const AboutUs = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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

  // Advantages of booking with GoTravio
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

  // Schema.org structured data for About page
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

  // Organization Schema
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

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO 
        title="About GoTravio Travels | India's Premier Travel Assistance Platform"
        description="Learn about GoTravio, India's trusted travel assistance platform. We provide expert help for cab rentals, train tickets (including Tatkal), flight bookings, and custom tour packages across India with 98% customer satisfaction."
        keywords="about GoTravio, travel assistance company, travel agency India, about us, travel experts India, travel planning service, Indian travel agency, cab booking service, train ticket assistance, flight booking help, tour packages India"
        canonicalUrl="/about"
        ogImage="https://gotravio.com/about-og-image.jpg"
        schemaData={[aboutSchema, faqSchema, organizationSchema]}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles size={16} className="text-yellow-300" />
                <span className="text-sm font-medium">India's Emerging Travel Assistance Platform</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your Personal
                <span className="block text-yellow-300 mt-2">Travel Assistant</span>
              </h1>
              
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                GoTravio provides expert travel assistance across India - from cab rentals and train tickets 
                to flight bookings and tour packages. We do the research, you enjoy the journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={scrollToContact}
                  className="group px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold hover:bg-slate-100 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Get Travel Help
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-white/60 text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <Phone size={18} />
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-3 mx-auto group-hover:shadow-md transition-all">
                    <div className="text-blue-600">{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500 hidden sm:block">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= OUR STORY ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-6">
                  <BookOpen size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Our Story</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">GoTravio</span> Story
                </h2>
                
                <div className="space-y-4 text-gray-600 text-lg">
                  <p>
                    GoTravio was founded in November 2025 with a clear vision: <span className="font-semibold text-blue-600">to make travel planning simple, personal, and stress-free for every Indian traveler.</span> Our founder, after years of struggling with impersonal booking platforms and automated customer service, decided it was time for a change.
                  </p>
                  <p>
                    We started with a simple belief - that behind every travel plan is a person with unique needs, preferences, and dreams. Whether it's a family vacation, a business trip, or an emergency journey, travelers deserve personalized attention and expert guidance.
                  </p>
                  <p>
                    Today, we serve customers <span className="font-bold text-blue-600">across India</span> - from the bustling streets of Mumbai to the serene hills of Manali, from the beaches of Goa to the temples of Tamil Nadu. Our network of 200+ verified partners ensures that wherever you want to go, we can help you get there.
                  </p>
                  <p className="bg-blue-50 p-4 rounded-xl italic">
                    "We're not just another travel website. We're your personal travel assistant - available 24/7, always honest, and genuinely invested in making your journey memorable."
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <AwardIcon className="text-blue-600" />
                    Our Journey
                  </h3>
                  <div className="space-y-6">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex gap-4 items-start group hover:bg-gray-50 p-2 rounded-lg transition-all">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                          {milestone.icon}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-lg font-bold text-blue-600">{milestone.year}</span>
                          </div>
                          <p className="text-gray-700">{milestone.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-center text-gray-700">
                      <span className="font-bold text-blue-600">98%</span> of our customers say they'd recommend us to friends and family
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY BOOK WITH GOTRAVIO ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4">
                <AwardIcon size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Why Choose Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">GoTravio</span> Advantage
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Here's why hundreds of travelers choose us over booking directly
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                  <ul className="space-y-2">
                    {advantage.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CORE VALUES ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4">
                <Target size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Our Principles</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Stand For</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The values that guide every interaction with our customers
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
                  <div className="inline-flex p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= OUR SERVICES ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4">
                <Briefcase size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Our Services</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Travel Assistance</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From cab rentals to flight bookings - we've got you covered across India
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {serviceFeatures.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl
                      ${index === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                        index === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                        index === 2 ? 'bg-gradient-to-br from-green-500 to-green-600' :
                        'bg-gradient-to-br from-orange-500 to-orange-600'}`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.category}</h3>
                      <p className="text-sm text-blue-600 font-medium">{service.coverage}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={`/${service.category.toLowerCase().replace(' ', '')}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:gap-2 transition-all group mt-2"
                  >
                    Learn more about {service.category}
                    <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PAN INDIA COVERAGE ================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <Globe size={48} className="mx-auto mb-4 text-white/80" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Serving Customers Across India</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              From metro cities to remote towns - wherever you are, we're here to help with your travel needs
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Goa", "Chandigarh", "Kochi", "Indore", "Nagpur", "And 500+ more locations"].map((city, idx) => (
                <span key={idx} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TRAVEL TIPS ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4">
                <BookOpen size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Expert Advice</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Travel Tips From <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Our Experts</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Insider knowledge to make your journey smoother and more affordable
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {travelTips.map((tip, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-200 group">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-3">
                      {tip.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{tip.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full px-4 py-2 mb-4">
                <Star size={16} className="text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">Customer Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">Travelers</span> Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real experiences from people who've traveled with us
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 relative group">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-100 group-hover:text-blue-200 transition-colors" />
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                    <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                      {testimonial.service}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="w-full bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4">
                <HelpCircle size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-700">FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about GoTravio
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-blue-600 transform transition-transform duration-300 flex-shrink-0 ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-3 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section id="contact-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Plan Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our travel experts are available 24/7 to help you with personalized assistance
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <a href="tel:+919023884833" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20">
                <Phone className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                <p className="font-semibold mb-1">Call Us</p>
                <p className="text-sm text-blue-200">+91 90238 84833</p>
                <p className="text-xs text-blue-300 mt-2">24/7 Available</p>
              </a>
              
              <a href="https://wa.me/919023884833" target="_blank" rel="noopener noreferrer" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20">
                <MessageCircle className="w-8 h-8 mx-auto mb-3 text-green-300" />
                <p className="font-semibold mb-1">WhatsApp</p>
                <p className="text-sm text-blue-200">Quick Chat</p>
                <p className="text-xs text-blue-300 mt-2">Avg response: 15 min</p>
              </a>
              
              <a href="mailto:gotravio.travel@gmail.com" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20">
                <Mail className="w-8 h-8 mx-auto mb-3 text-purple-300" />
                <p className="font-semibold mb-1">Email Us</p>
                <p className="text-sm text-blue-200">gotravio.travel@gmail.com</p>
                <p className="text-xs text-blue-300 mt-2">Reply within 2 hrs</p>
              </a>
            </div>

            <div className="flex justify-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ================= FLOATING WHATSAPP ================= */}
        <a
          href="https://wa.me/919023884833"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-lg group-hover:blur-xl transition-all opacity-70"></div>
            <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110">
              <MessageCircle size={24} />
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default AboutUs;