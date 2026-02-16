import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./NavBar.jsx";
// Remove AIAssistant import from here

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50">
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Main content with animation */}
      <main className="relative z-10 animate-fade-in">
        {children}
      </main>

      {/* AI Assistant has been moved to App.jsx - Remove from here */}

      {/* Modern Footer */}
      <footer className="relative z-10 border-t border-gray-200 bg-white/80 backdrop-blur-sm mt-20">
        {/* ... rest of your footer code remains exactly the same ... */}
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative w-14 h-14 rounded-xl bg-white overflow-hidden flex items-center justify-center border-2 border-transparent group-hover:border-blue-600 transition-all">
                    <img 
                      src="/logo.svg"
                      alt="GoTravio Travels - India's Premier Travel Assistance"
                      className="w-full h-full object-contain p-1"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-lg leading-none group-hover:text-blue-600 transition-colors">GoTravio</p>
                  <p className="text-xs text-gray-500">Travel Assistance India</p>
                </div>
              </Link>
              <p className="text-sm text-gray-600">
                India's trusted travel assistance platform for cab bookings, train tickets (including Tatkal), flight bookings, and custom tour packages.
              </p>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Our Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/cabs" className="text-gray-600 hover:text-blue-600 transition text-sm">
                    Cab Booking India
                  </Link>
                </li>
                <li>
                  <Link to="/tickets" className="text-gray-600 hover:text-blue-600 transition text-sm">
                    Train & Flight Tickets
                  </Link>
                </li>
                <li>
                  <Link to="/tickets" className="text-gray-600 hover:text-blue-600 transition text-sm">
                    Tatkal Ticket Booking
                  </Link>
                </li>
                <li>
                  <Link to="/packages" className="text-gray-600 hover:text-blue-600 transition text-sm">
                    Tour Packages India
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-blue-600 transition text-sm">
                    About GoTravio
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition text-sm">
                    Contact Travel Experts
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition text-sm">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="text-gray-600 hover:text-blue-600 transition text-sm">
                    Travel FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">📞</span>
                  <div>
                    <a href="tel:+919023884833" className="text-sm text-gray-600 hover:text-blue-600 block">
                      +91 90238 84833
                    </a>
                    <a href="tel:+916371106588" className="text-sm text-gray-600 hover:text-blue-600 block">
                      +91 63711 06588
                    </a>
                    <p className="text-xs text-gray-500 mt-1">24/7 Travel Support</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1">✉️</span>
                  <a href="mailto:gotravio.travel@gmail.com" className="text-sm text-gray-600 hover:text-blue-600">
                    gotravio.travel@gmail.com
                  </a>
                </div>
                
                {/* Social Media Links */}
                <div className="pt-2">
                  <p className="text-xs text-gray-500 mb-2">Connect with us</p>
                  <div className="flex gap-3">
                    {/* WhatsApp */}
                    <a 
                      href="https://wa.me/919023884833?text=Hi%20GoTravio,%20I%20need%20travel%20assistance"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-all hover:scale-110 hover:shadow-lg"
                      title="Chat on WhatsApp for travel assistance"
                      aria-label="Contact us on WhatsApp"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                      </svg>
                    </a>
                    
                    {/* Instagram */}
                    <a 
                      href="https://www.instagram.com/go_travio_?igsh=MXg4dDc5cmV6cHg0aA==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:opacity-90 transition-all hover:scale-110 hover:shadow-lg"
                      title="Follow us on Instagram for travel inspiration"
                      aria-label="Follow us on Instagram"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    
                    {/* Facebook */}
                    <a 
                      href="https://facebook.com/gotravio"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all hover:scale-110 hover:shadow-lg"
                      title="Follow us on Facebook"
                      aria-label="Follow us on Facebook"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    
                    {/* Twitter/X */}
                    <a 
                      href="https://twitter.com/gotravio"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-900 transition-all hover:scale-110 hover:shadow-lg"
                      title="Follow us on X (Twitter)"
                      aria-label="Follow us on Twitter"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright and Legal */}
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © {currentYear} GoTravio Travels. All rights reserved. | 
              <Link to="/terms" className="text-gray-500 hover:text-blue-600 mx-2">Terms</Link> | 
              <Link to="/privacy" className="text-gray-500 hover:text-blue-600 mx-2">Privacy</Link> | 
              <Link to="/sitemap" className="text-gray-500 hover:text-blue-600 mx-2">Sitemap</Link>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              India's Premier Travel Assistance Platform - Cab Booking, Train Tickets (Tatkal), Flight Bookings & Tour Packages
            </p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Layout;