// client/src/pages/AboutUs.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  ChevronDown
} from "lucide-react";

const AboutUs = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Company milestones
  const milestones = [
    { year: "2021", event: "GoTravio Founded with a vision to transform travel assistance" },
    { year: "2022", event: "Expanded to 5+ cities across India" },
    { year: "2023", event: "Launched specialized Tatkal ticket booking service" },
    { year: "2024", event: "Crossed 1000+ happy travelers" },
    { year: "2025", event: "Trusted by travelers for reliable and seamless travel support" },
  ];

  // Core values
  const coreValues = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      desc: "Every decision we make is centered around our customers' needs and satisfaction."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Transparency",
      desc: "We believe in clear communication with no hidden charges or surprises."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Excellence",
      desc: "We strive for perfection in every service we provide, from first enquiry to journey end."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Reliability",
      desc: "Our customers trust us to deliver on our promises, every single time."
    },
  ];

  // Team members
  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      experience: "15+ years in travel industry",
      image: "/team/rajesh.jpg",
      bio: "Former travel tech executive with a passion for making travel accessible to all."
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      experience: "10+ years in operations",
      image: "/team/priya.jpg",
      bio: "Ensures smooth execution of all travel services with meticulous attention to detail."
    },
    {
      name: "Amit Patel",
      role: "Customer Experience Lead",
      experience: "8+ years in customer service",
      image: "/team/amit.jpg",
      bio: "Dedicated to ensuring every customer interaction exceeds expectations."
    },
    {
      name: "Neha Singh",
      role: "Travel Expert",
      experience: "7+ years in travel planning",
      image: "/team/neha.jpg",
      bio: "Specializes in complex itineraries and group travel arrangements."
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Suresh Reddy",
      location: "Hyderabad",
      text: "GoTravio helped me book Tatkal tickets when I couldn't find any. Their team is incredibly responsive and professional.",
      rating: 5,
      service: "Train Tickets"
    },
    {
      name: "Anjali Desai",
      location: "Mumbai",
      text: "The cab service arranged by GoTravio was perfect. Clean car, polite driver, and on-time pickup. Highly recommended!",
      rating: 5,
      service: "Cab Rental"
    },
    {
      name: "Vikram Mehta",
      location: "Delhi",
      text: "Our family trip to Manali was beautifully planned by GoTravio. Every detail was taken care of. Will definitely use again.",
      rating: 5,
      service: "Tour Package"
    },
  ];

  // Stats
  const stats = [
    { value: "25K+", label: "Happy Travelers", icon: <Users className="w-6 h-6" /> },
    { value: "100+", label: "Cities Covered", icon: <Globe className="w-6 h-6" /> },
    { value: "99%", label: "Satisfaction Rate", icon: <ThumbsUp className="w-6 h-6" /> },
    { value: "24/7", label: "Customer Support", icon: <Headphones className="w-6 h-6" /> },
  ];

  // FAQ Data - Updated with 7 questions
  const faqs = [
    {
      question: "Is GoTravio a travel agency?",
      answer: "We're a travel assistance platform that connects you with verified service providers. We don't book directly but facilitate the entire process, ensuring you get the best options and support throughout."
    },
    {
      question: "Do you charge for your services?",
      answer: "Our enquiry and consultation services are completely free. If you book through our partners, you pay the actual service provider directly. There are no hidden fees or markups."
    },
    {
      question: "How quickly do you respond?",
      answer: "Our team typically responds within 15 minutes to 2 hours, depending on the complexity of your enquiry. For urgent needs like Tatkal bookings, we prioritize immediate assistance."
    },
    {
      question: "Which cities do you serve?",
      answer: "We serve all major cities across India including Mumbai, Delhi, Bengaluru, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad, and many more. For specific locations, please enquire with our team."
    },
    {
      question: "Can you help with last-minute bookings?",
      answer: "Yes, absolutely! We specialize in last-minute travel assistance including Tatkal train tickets, emergency cab bookings, and urgent flight bookings. Our team is available 24/7 for such requirements."
    },
    {
      question: "Do you offer corporate travel services?",
      answer: "Yes, we provide comprehensive corporate travel solutions including employee travel management, corporate cab services, group tour arrangements, and business class flight bookings with preferential rates."
    },
    {
      question: "How do you ensure the quality of your service providers?",
      answer: "We carefully vet all our partners through background checks, license verification, and customer feedback monitoring. Only providers meeting our strict quality standards are recommended to our customers."
    }
  ];

  const scrollToEnquiry = () => {
    const enquirySection = document.getElementById('contact-section');
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
              <span className="text-sm font-medium">About GoTravio</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Trusted
              <span className="block text-yellow-300 mt-2">Travel Partner</span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              We're on a mission to make travel planning simple, stress-free, and personal — with real experts guiding you every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToEnquiry}
                className="group px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold hover:bg-slate-100 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Talk to Our Team
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-white/60 text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Phone size={18} />
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-4">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
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
                <span className="text-sm font-medium text-blue-700">Our Journey</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">GoTravio</span> Story
              </h2>
              
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  GoTravio was born from a simple observation: travel planning had become too automated and impersonal. 
                  While chatbots and algorithms can handle simple queries, complex travel needs require human expertise, 
                  empathy, and understanding.
                </p>
                <p>
                  Founded in 2020 by a team of travel enthusiasts and industry veterans, GoTravio set out to create 
                  a platform that combines the convenience of technology with the warmth of human assistance. We believe 
                  that behind every travel plan is a person with unique needs, preferences, and dreams.
                </p>
                <p>
                  Today, we've helped over 25,000 travelers across India with cab rentals, train and flight tickets, 
                  and custom tour packages. Our team of expert travel consultants works tirelessly to ensure every 
                  journey is smooth, memorable, and hassle-free.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white"></div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900">25+</span> travel experts ready to help
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Milestones</h3>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-16 text-lg font-bold text-blue-600">{milestone.year}</div>
                      <div className="flex-grow pb-4 border-b border-gray-200 last:border-0">
                        <p className="text-gray-700">{milestone.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4">
              <Heart size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-700">What Drives Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Core Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at GoTravio
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4">
              <Briefcase size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-700">What We Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive travel assistance across multiple domains
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-200 hover:border-blue-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Cab Rentals</h3>
              <p className="text-gray-600 mb-4">
                Local city rides, outstation trips, airport transfers, and corporate travel with verified drivers.
              </p>
              <Link to="/cabs" className="inline-flex items-center text-blue-600 font-semibold hover:gap-2 transition-all">
                Learn more <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-200 hover:border-purple-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Ticket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Ticket Assistance</h3>
              <p className="text-gray-600 mb-4">
                Train, bus, and flight tickets including Tatkal, Premium Tatkal, and all special quotas.
              </p>
              <Link to="/tickets" className="inline-flex items-center text-purple-600 font-semibold hover:gap-2 transition-all">
                Learn more <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-200 hover:border-green-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Tour Packages</h3>
              <p className="text-gray-600 mb-4">
                Custom domestic and international tour packages with personalized itineraries and accommodation.
              </p>
              <Link to="/packages" className="inline-flex items-center text-green-600 font-semibold hover:gap-2 transition-all">
                Learn more <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEAM SECTION ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4">
              <Users size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Meet the Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">People</span> Behind GoTravio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced travel professionals dedicated to making your journey memorable
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-200 group">
                <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-500 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users size={48} className="text-white/30" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500 mb-3">{member.experience}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full px-4 py-2 mb-4">
              <Star size={16} className="text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">Travelers</span> Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from people who've traveled with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-100" />
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
                  <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION - UPDATED UI ================= */}
      <section className="w-full bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-700">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                >
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-600 transform transition-transform duration-300 flex-shrink-0 ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-6 py-3">
              <MessageCircle size={18} className="text-blue-600" />
              <span className="text-sm text-gray-700">
                Still have questions?{" "}
                <a
                  href="https://wa.me/919023884833"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:text-blue-700 underline"
                >
                  WhatsApp us
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our team is here to help you plan the perfect trip. Reach out to us today.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <a href="tel:+919023884833" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20">
              <Phone className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <p className="font-semibold mb-1">Call Us</p>
              <p className="text-sm text-blue-200">+91 90238 84833</p>
            </a>
            
            <a href="https://wa.me/919023884833" target="_blank" rel="noopener noreferrer" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20">
              <MessageCircle className="w-8 h-8 mx-auto mb-3 text-green-300" />
              <p className="font-semibold mb-1">WhatsApp</p>
              <p className="text-sm text-blue-200">Instant Chat</p>
            </a>
            
            <a href="mailto:gotravio.travel@gmail.com" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all border border-white/20">
              <Mail className="w-8 h-8 mx-auto mb-3 text-purple-300" />
              <p className="font-semibold mb-1">Email Us</p>
              <p className="text-sm text-blue-200">gotravio.travel@gmail.com</p>
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
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
              <Linkedin size={18} />
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
  );
};

export default AboutUs;