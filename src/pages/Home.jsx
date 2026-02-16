import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import {
  Phone,
  Shield,
  Users,
  ChevronRight,
  Car,
  Ticket,
  Package,
  Clock,
  MessageCircle,
  Headphones,
  CheckCircle,
  Zap,
  Heart,
  Search,
  FileText,
  User,
  Calendar,
  Mail,
  Send,
  AlertCircle,
  X,
  Star,
  ThumbsUp,
  Award,
  HelpCircle,
  MapPin,
  QrCode
} from "lucide-react";
import { API } from "../api.js";

const Home = () => {
  const [enquiryData, setEnquiryData] = useState({
    name: "",
    service: "",
    phone: "",
    details: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: ""
  });

  // Carousel images data
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1600",
      alt: "Travel consultant helping customer with travel planning in India",
      title: "Expert Travel Consultation"
    },
    {
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600",
      alt: "Beautiful travel destination in India - Himalayan mountains",
      title: "Himalayan Adventure"
    },
    {
      url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1600",
      alt: "Travel planning with map and compass for India tour",
      title: "Plan Your India Trip"
    },
    {
      url: "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1600",
      alt: "Adventure travel in India - Trekking in mountains",
      title: "Adventure Tours India"
    },
    {
      url: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=1600",
      alt: "Luxury travel in India - Premium travel experience",
      title: "Luxury Travel India"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Schema.org structured data for LocalBusiness
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "GoTravio Travels",
    "description": "India's premier travel assistance platform for cab rentals, train tickets, flight bookings, and custom tour packages.",
    "url": "https://gotravio.com",
    "logo": "https://gotravio.com/logo.png",
    "image": "https://gotravio.com/og-image.jpg",
    "telephone": "+91 90238 84833",
    "email": "gotravio.travel@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "India",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/gotravio",
      "https://www.instagram.com/gotravio",
      "https://twitter.com/gotravio"
    ],
    "openingHours": "Mo-Su 00:00-24:00",
    "priceRange": "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const services = [
    {
      icon: <Car className="w-7 h-7" />,
      title: "Cab & Vehicle Rentals",
      desc: "Assistance with local, outstation, and airport transfers across vehicle types.",
      features: ["Verified drivers", "Multiple vehicle options", "GPS tracking available"],
      link: "/cabs",
      color: "from-blue-600 to-cyan-500"
    },
    {
      icon: <Ticket className="w-7 h-7" />,
      title: "Ticket Assistance",
      desc: "Help with train, bus, and flight tickets including special quota requirements.",
      features: ["Normal & Tatkal", "All major airlines", "Seat selection help"],
      link: "/tickets",
      color: "from-purple-600 to-pink-500"
    },
    {
      icon: <Package className="w-7 h-7" />,
      title: "Tour Planning",
      desc: "Custom domestic and international tour packages with itinerary planning.",
      features: ["Tailored itineraries", "Accommodation help", "Activity planning"],
      link: "/packages",
      color: "from-orange-600 to-yellow-500"
    },
  ];

  // Google Reviews Data
  const googleReviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      date: "2 weeks ago",
      text: "GoTravio helped me book a last-minute cab to the airport when I was in a rush. Their response was super quick and the driver was professional. Highly recommended!",
      initial: "RS"
    },
    {
      name: "Priya Patel",
      rating: 5,
      date: "1 month ago",
      text: "Amazing service for train ticket booking! They got me confirmed Tatkal tickets when I couldn't book myself. Very helpful team.",
      initial: "PP"
    },
    {
      name: "Amit Kumar",
      rating: 5,
      date: "3 weeks ago",
      text: "Booked a Manali tour package through them. Everything was perfectly arranged - cabs, hotels, sightseeing. Great experience!",
      initial: "AK"
    },
    {
      name: "Neha Singh",
      rating: 5,
      date: "2 months ago",
      text: "Very responsive and professional. They helped me with flight tickets and even suggested better options than I found online. Will use again!",
      initial: "NS"
    }
  ];

  // Google Reviews URL
  const googleReviewsUrl = "https://g.page/r/CWzur7SdZeacEBM/review";

  const contactOptions = [
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: "WhatsApp Chat",
      desc: "Quick responses for enquiries and document sharing",
      action: () => window.open('https://wa.me/919023884833?text=Hi%20GOTravio,%20I%20need%20travel%20assistance', '_blank'),
      features: ["Instant messaging", "File sharing", "Quick queries"],
      color: "border-green-200 bg-green-50 hover:bg-green-100"
    },
    {
      icon: <Phone className="w-7 h-7" />,
      title: "Phone Consultation",
      desc: "Detailed discussion for complex travel requirements",
      action: () => window.location.href = 'tel:+919023884833',
      features: ["Personal attention", "Detailed planning", "Clarification"],
      color: "border-blue-200 bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: "Email Support",
      desc: "Comprehensive planning with detailed itineraries",
      action: () => window.location.href = 'mailto:gotravio.travel@gmail.com?subject=Travel%20Assistance%20Enquiry&body=Hi%20GOTravio%20Team,%0A%0AI%20need%20assistance%20with%20my%20travel%20plans.%0A%0ARegards,%0A[Your%20Name]',
      features: ["Documented process", "Detailed responses", "Record keeping"],
      color: "border-purple-200 bg-purple-50 hover:bg-purple-100"
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Share Your Requirements",
      desc: "Tell us about your travel plans, dates, and preferences. The more details, the better we can assist you."
    },
    {
      step: "02",
      title: "Agent Review & Verification",
      desc: "Our experts check availability, compare options, and verify all details to ensure accuracy."
    },
    {
      step: "03",
      title: "Receive Options & Details",
      desc: "Get comprehensive information, including pricing, itineraries, and recommendations to make an informed decision."
    },
    {
      step: "04",
      title: "Proceed with Confidence",
      desc: "Once you're satisfied, we help you book with no hidden charges. We remain available for support throughout your journey."
    },
  ];

  const whyBookReasons = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Personalized Assistance",
      desc: "Every enquiry is handled by a real travel expert who understands your needs and provides tailored solutions."
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Trust & Transparency",
      desc: "We believe in clear communication with no hidden fees. You'll know exactly what you're getting before you commit."
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Time-Saving",
      desc: "Let us do the research and legwork. We present you with the best options so you can focus on enjoying your trip."
    },
    {
      icon: <ThumbsUp className="w-7 h-7" />,
      title: "Verified Options",
      desc: "We only work with trusted partners and verified service providers to ensure quality and reliability."
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Experienced Team",
      desc: "Our team has years of experience in the travel industry, helping countless travelers with their plans."
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: "End-to-End Support",
      desc: "From the first enquiry to after your journey, we're here to assist you every step of the way."
    },
  ];

  const benefitsList = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Detailed Documentation",
      desc: "We provide clear records of all communications, options, and confirmations for your reference."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Risk Minimization",
      desc: "Our verification process helps avoid common travel pitfalls and ensures you deal with reliable providers."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Time Saving",
      desc: "We handle the research and coordination, saving you hours of browsing and calling."
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Quality Assurance",
      desc: "We personally vet services to ensure they meet our standards of comfort and reliability."
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Customer Satisfaction",
      desc: "Our focus is on making your travel experience smooth and enjoyable, with prompt issue resolution."
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Personal Touch",
      desc: "We treat every traveler as an individual, not just a booking number."
    },
  ];

  const faqs = [
    {
      question: "How do I start my enquiry?",
      answer: "Simply fill out the quick enquiry form on this page, or reach out via WhatsApp, phone, or email. Provide your travel details, and one of our experts will get back to you within 1-2 hours."
    },
    {
      question: "Is there any charge for the enquiry?",
      answer: "No, our enquiry service is completely free. We only facilitate bookings; you pay the actual service provider directly. There are no hidden fees or markups."
    },
    {
      question: "What services do you assist with?",
      answer: "We help with cab rentals (local, outstation, airport transfers), train and flight tickets (including Tatkal), and custom tour packages for domestic and international destinations."
    },
    {
      question: "How do you ensure the best price?",
      answer: "Our experts compare multiple options from trusted partners and use their industry knowledge to find competitive rates. We also help you understand any applicable discounts or offers."
    },
    {
      question: "What if I need to make changes to my booking?",
      answer: "Contact us immediately. We'll guide you through the modification or cancellation process as per the service provider's policy and help minimize any inconvenience."
    },
    {
      question: "Do you handle last-minute bookings?",
      answer: "Yes, we specialize in quick assistance for urgent travel needs, including Tatkal train tickets and last-minute flight or cab bookings."
    },
  ];

  // FAQ Schema for rich results
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      if (!enquiryData.name || !enquiryData.service || !enquiryData.phone || !enquiryData.email) {
        throw new Error('Please fill in all required fields');
      }

      const phoneRegex = /^[+]?[0-9\s-]{10,}$/;
      if (!phoneRegex.test(enquiryData.phone)) {
        throw new Error('Please enter a valid phone number');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(enquiryData.email)) {
        throw new Error('Please enter a valid email address');
      }

      console.log('Submitting enquiry:', enquiryData);

      const response = await API.post("/enquiry", enquiryData);
      
      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: response.data.message || 'Enquiry submitted successfully! Our team will contact you within 1-2 hours.'
        });

        setEnquiryData({
          name: "",
          service: "",
          phone: "",
          details: "",
          email: ""
        });

        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 5000);
      } else {
        throw new Error(response.data.message || 'Failed to submit enquiry');
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || error.message || 'Failed to submit enquiry. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeNotification = () => {
    setSubmitStatus({ type: null, message: "" });
  };

  const scrollToEnquiry = () => {
    const enquirySection = document.getElementById('enquiry-form');
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClick = (serviceType, e) => {
    e.preventDefault();
    setEnquiryData(prev => ({
      ...prev,
      service: serviceType
    }));
    scrollToEnquiry();
  };

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <>
      <SEO 
        title="GoTravio Travels - India's Premier Travel Assistance Platform | Cab, Train, Flight & Tour Packages"
        description="GoTravio provides expert travel assistance for cab rentals, train tickets (including Tatkal), flight bookings, and custom tour packages across India. Get personalized help from real travel experts with quick response."
        keywords="travel assistance India, cab booking, train ticket booking, Tatkal ticket help, flight booking, tour packages India, travel agency, holiday packages, trip planning, GoTravio"
        canonicalUrl="/"
        ogImage="https://gotravio.com/home-og-image.jpg"
        schemaData={[homeSchema, faqSchema]}
        publishedTime="2024-01-01T08:00:00+05:30"
        modifiedTime={new Date().toISOString()}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-x-hidden">
        {/* Notification Banner */}
        {submitStatus.type && (
          <div className={`fixed top-4 right-4 z-50 max-w-md w-[calc(100%-2rem)] sm:w-full ${submitStatus.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-xl shadow-lg p-4 transition-all duration-300`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`font-semibold ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                    {submitStatus.type === 'success' ? 'Success!' : 'Error!'}
                  </p>
                  <p className={`text-sm mt-1 ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {submitStatus.message}
                  </p>
                </div>
              </div>
              <button
                onClick={closeNotification}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ================= HERO WITH AUTO CAROUSEL ================= */}
        <section className="relative bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 overflow-hidden w-full">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-24">
            <div className="w-full">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left Content - Text Section */}
                <div className="text-white space-y-6 md:space-y-8 text-center lg:text-left">
                  <div className="inline-flex items-center justify-center lg:justify-start gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mx-auto lg:mx-0">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                    Expert-Assisted Travel Platform
                  </div>

                  <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    Travel Assistance
                    <span className="block text-yellow-300 mt-2 md:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                      Made Personal
                    </span>
                  </h1>

                  <p className="text-blue-100 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                    GoTravio provides human-powered assistance for cab rentals, train & flight tickets, 
                    and custom tour packages. Real experts handle your travel enquiries.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
                    <button
                      onClick={scrollToEnquiry}
                      className="group px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-4 bg-white text-indigo-900 rounded-xl font-bold flex items-center justify-center gap-2 sm:gap-3 hover:bg-slate-100 transition-all duration-300 shadow-xl hover:shadow-2xl text-xs sm:text-sm md:text-base"
                    >
                      <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      Start Your Enquiry
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                    </button>

                    <Link
                      to="/contact"
                      className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-4 border-2 border-white/60 text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-sm text-xs sm:text-sm md:text-base"
                    >
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      Speak with Expert
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-6 sm:pt-8 border-t border-white/20">
                    {[
                      ["Real Experts", "No automation"],
                      ["Transparent Process", "Clear updates"],
                      ["Multiple Channels", "Call/WhatsApp/Email"],
                    ].map(([label, sub]) => (
                      <div key={label} className="text-center">
                        <p className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">{label}</p>
                        <p className="text-[10px] sm:text-xs md:text-sm text-blue-300 mt-1">{sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Content - Auto Carousel */}
                <div className="relative mt-6 lg:mt-0">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
                      {carouselImages.map((image, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            title={image.title}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 sm:-translate-x-0 sm:left-0 lg:-left-6 bg-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-2xl max-w-[160px] sm:max-w-xs animate-float">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm md:text-base text-slate-900">Personal Service</p>
                        <p className="text-[10px] sm:text-xs text-slate-500">Dedicated agent handling</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= OUR APPROACH ================= */}
        <section className="px-4 sm:px-6 lg:px-12 xl:px-16 -mt-4 relative z-10">
          <div className="w-full bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
                  title: "Agent-Assisted",
                  desc: "Real people handle your enquiries"
                },
                {
                  icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
                  title: "Transparent",
                  desc: "Clear process with regular updates"
                },
                {
                  icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
                  title: "Verified Options",
                  desc: "Manually checked by our team"
                },
                {
                  icon: <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />,
                  title: "Full Support",
                  desc: "Available through your journey"
                },
              ].map((item, index) => (
                <div key={index} className="text-center p-2 sm:p-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-indigo-50 rounded-xl mb-2 sm:mb-4">
                    <div className="text-indigo-600">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className="w-full bg-gray-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
                How We Can Assist You
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive travel assistance across multiple services
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={(e) => handleServiceClick(service.title.toLowerCase().includes('cab') ? 'cab' : 
                    service.title.toLowerCase().includes('ticket') ? 'train' : 'tour', e)}
                  className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 hover:border-indigo-300 cursor-pointer"
                >
                  <div className="p-5 sm:p-6 lg:p-8">
                    <div className={`inline-flex p-3 sm:p-4 lg:p-5 rounded-xl bg-gradient-to-r ${service.color} text-white mb-4 sm:mb-6`}>
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3">{service.title}</h3>
                    <p className="text-slate-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">{service.desc}</p>
                    <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base text-slate-700">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-indigo-700 font-semibold text-sm sm:text-base lg:text-lg group-hover:underline">
                      <span>Submit Enquiry</span>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHY BOOK WITH US? ================= */}
        <section className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
                Why Book With Us?
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto">
                We're not just a booking platform – we're your travel partner
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {whyBookReasons.map((reason, idx) => (
                <div key={idx} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all border border-slate-100">
                  <div className="inline-flex p-3 sm:p-4 bg-indigo-100 rounded-xl text-indigo-600 mb-4">
                    {reason.icon}
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2">{reason.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base lg:text-lg">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= OUR PROCESS (HOW IT WORKS) ================= */}
        <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
                How Our Process Works
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto">
                Simple, transparent steps to get you travel-ready
              </p>
            </div>
            <div className="grid lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {processSteps.map((item, index) => (
                <div key={index} className="relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-3/4 w-full h-0.5 bg-gradient-to-r from-indigo-200 to-blue-200"></div>
                  )}
                  <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-indigo-600 text-white rounded-xl font-bold text-lg sm:text-xl lg:text-2xl mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm sm:text-base lg:text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ENQUIRY PROCESS & FORM ================= */}
        <section id="enquiry-form" className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8">
                  Ready to Start? Fill the Form
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {processSteps.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-indigo-600 text-white flex items-center justify-center rounded-lg font-bold text-sm sm:text-base">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{item.title}</h3>
                          <p className="text-slate-600 text-xs sm:text-sm">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ================= ENQUIRY FORM ================= */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 md:p-8 border border-slate-200">
                <h3 className="font-bold text-xl sm:text-2xl mb-2">Quick Travel Enquiry</h3>
                <p className="text-slate-600 text-sm sm:text-base mb-6 sm:mb-8">Get assistance from our travel experts</p>
                
                <form onSubmit={handleSubmitEnquiry} className="space-y-4 sm:space-y-6">
                  {submitStatus.type && (
                    <div className={`p-3 sm:p-4 ${submitStatus.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-xl`}>
                      <div className="flex items-center gap-2 sm:gap-3">
                        {submitStatus.type === 'success' ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                        )}
                        <p className={`text-xs sm:text-sm font-medium ${submitStatus.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                          {submitStatus.message}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={enquiryData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-slate-400 transition-colors text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                      Service Required *
                    </label>
                    <div className="relative">
                      <Ticket className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                      <select 
                        name="service"
                        value={enquiryData.service}
                        onChange={handleInputChange}
                        className="w-full pl-10 sm:pl-12 pr-8 sm:pr-10 py-3 sm:py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-slate-400 transition-colors appearance-none cursor-pointer text-sm sm:text-base"
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="Cab Rental">Cab Rental</option>
                        <option value="Train Ticket">Train Ticket Assistance</option>
                        <option value="Bus Ticket">Bus Ticket Assistance</option>
                        <option value="Flight Ticket">Flight Ticket Assistance</option>
                        <option value="Tour Package">Tour Package Enquiry</option>
                        <option value="Multiple">Multiple Services</option>
                      </select>
                      <ChevronRight className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 rotate-90" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={enquiryData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-slate-400 transition-colors text-sm sm:text-base"
                        required
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-2">Include country code. We'll contact you on WhatsApp</p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={enquiryData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-slate-400 transition-colors text-sm sm:text-base"
                        required
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-2">We'll send confirmation and updates to your email</p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 sm:mb-2">
                      Additional Information
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                      <textarea
                        name="details"
                        value={enquiryData.details}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Travel date, pickup/drop location, number of people, budget (if any)"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-slate-400 transition-colors resize-none text-sm sm:text-base"
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-1 sm:mt-2">More details help us provide better assistance</p>
                  </div>

                  <div className="text-center p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-xs sm:text-sm text-slate-700">
                      <Shield className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-600" />
                      Handled by real travel experts • No automated pricing • No spam
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 sm:py-4 rounded-xl font-bold hover:opacity-95 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        Submit Enquiry
                      </>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-xs text-slate-500 text-center">
                    <Clock className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-indigo-600" />
                    Our team typically responds within 1–2 hours during business hours
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BENEFITS (expanded) ================= */}
        <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
                Key Benefits of Using GoTravio
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto">
                Why travelers choose us for their journey planning
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {benefitsList.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-indigo-300 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm mb-4">
                    <div className="text-indigo-600">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2">{benefit.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base lg:text-lg">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT OPTIONS ================= */}
        <section className="w-full bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
                Connect with Our Experts
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto">
                Choose your preferred way to get travel assistance
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {contactOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className={`group rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border-2 ${option.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left`}
                >
                  <div className="inline-flex p-3 sm:p-4 bg-white rounded-xl shadow-sm mb-4 sm:mb-6">
                    <div className="text-indigo-600">
                      {option.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3">{option.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">{option.desc}</p>
                  <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base text-slate-700">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-indigo-700 font-semibold text-sm sm:text-base lg:text-lg">
                    Connect Now
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= GOOGLE REVIEWS SECTION WITH SCANNER ================= */}
        <section className="w-full bg-gradient-to-br from-yellow-50 to-orange-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-5">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 fill-yellow-600" />
                <span className="text-xs sm:text-sm font-medium text-orange-700">Trusted by Travelers</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
                Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">100+ Happy Travelers</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                See what our customers are saying about us on Google
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Scanner and Google Info */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-yellow-100">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="inline-flex items-center justify-center gap-2 mb-4">
                    <img 
                      src="https://www.google.com/favicon.ico" 
                      alt="Google" 
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Google</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Check us out on</h3>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-4">
                    GoTravio Travels
                  </div>
                  
                  {/* Scanner/QR Code - Links to Google Reviews */}
                  <a 
                    href={googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto my-6 sm:my-8 block cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl rotate-6 opacity-20"></div>
                    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-yellow-200 overflow-hidden hover:border-yellow-400 transition-colors">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://g.page/r/CWzur7SdZeacEBM/review" 
                        alt="Scan to write a Google Review for GoTravio"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </a>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Scan to write a review on Google
                  </p>
                  
                  <a 
                    href={googleReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
                  >
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                    Write a Google Review
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>

                {/* Rating Summary */}
                <div className="border-t border-yellow-100 pt-6 sm:pt-8">
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900">4.9</div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">Based on 100+ reviews</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Reviews Grid */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {googleReviews.map((review, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-yellow-100 hover:border-yellow-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-[10px] sm:text-xs font-bold text-indigo-700">{review.initial}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-xs sm:text-sm text-gray-900">{review.name}</h3>
                          <p className="text-[8px] sm:text-[10px] text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2 italic">
                      "{review.text}"
                    </p>
                    <div className="mt-2 sm:mt-3 flex items-center gap-1 text-yellow-600 text-[8px] sm:text-[10px]">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>Google Review</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= FREQUENTLY ASKED QUESTIONS ================= */}
        <section className="w-full bg-gray-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="w-full">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto">
                Got questions? We've got answers.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, idx) => (
                <div key={idx} className="mb-4">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200 focus:outline-none"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-base sm:text-lg lg:text-xl pr-4">{faq.question}</h3>
                      <ChevronRight
                        className={`w-5 h-5 text-indigo-600 transform transition-transform ${
                          openFaqIndex === idx ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                    {openFaqIndex === idx && (
                      <p className="mt-3 text-slate-600 text-sm sm:text-base lg:text-lg">{faq.answer}</p>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="w-full bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-900 relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready for Personalized Travel Assistance?
              </h2>
              
              <p className="text-blue-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
                Experience travel planning with real experts, transparent processes, 
                and dedicated support throughout your journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center">
                <button
                  onClick={scrollToEnquiry}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-900 rounded-xl font-bold hover:bg-slate-100 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  Start Your Enquiry
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <Link
                  to="/contact"
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Speak with Expert
                </Link>
              </div>

              <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-white/20">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-white/80">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Transparent Process</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Expert Handling</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Quick Response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;