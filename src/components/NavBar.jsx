import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  LogOut, 
  Shield,
  ChevronDown,
  Settings,
  Home,
  Car,
  Ticket,
  Package,
  Phone,
  Info
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setIsLoggedIn(false);
    setIsAdminDropdownOpen(false);
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={20} /> },
    { to: "/cabs", label: "Rental Cars", icon: <Car size={20} /> },
    { to: "/tickets", label: "Tickets", icon: <Ticket size={20} /> },
    { to: "/packages", label: "Packages", icon: <Package size={20} /> },
    { to: "/contact", label: "Contact", icon: <Phone size={20} /> },
    { to: "/about", label: "About Us", icon: <Info size={20} /> },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <Shield size={18} /> },
    { to: "/admin/packages", label: "Manage Packages", icon: <Package size={18} /> },
    { to: "/admin/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' 
            : 'bg-white py-4'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ============================ */}
            {/* LEFT: LOGO - BILKUL LEFT SIDE */}
            {/* ============================ */}
            <div className="flex items-center -ml-2 sm:-ml-3 lg:-ml-4">
              <NavLink to="/" className="flex items-center group">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl blur-md opacity-70 group-hover:blur-lg transition-all"></div>
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img 
                      src="/logo.png"
                      alt="GoTravio Logo" 
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                </div>
                
                <div className="hidden sm:flex flex-col ml-3">
                  <p className="font-bold text-xl text-gray-900 leading-tight">
                    GoTravio
                  </p>
                  <p className="text-[10px] text-gray-600 leading-tight -mt-0.5 font-medium">
                    Travel Excellence
                  </p>
                </div>
                
                <div className="flex flex-col sm:hidden ml-2">
                  <p className="font-bold text-lg text-gray-900 leading-tight">
                    GoTravio
                  </p>
                  <p className="text-[9px] text-gray-600 leading-tight -mt-0.5 font-medium">
                    Travel Excellence
                  </p>
                </div>
              </NavLink>
            </div>

            {/* ============================ */}
            {/* CENTER: NAVIGATION LINKS - BADE AUR CENTER MEIN */}
            {/* ============================ */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-5 py-3 mx-0.5 rounded-xl text-base font-medium transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 border border-blue-100'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <span className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* ============================ */}
            {/* RIGHT: WHATSAPP + ADMIN - BILKUL RIGHT SIDE */}
            {/* ============================ */}
            <div className="hidden lg:flex items-center -mr-2 sm:-mr-3 lg:-mr-4">
              <a
                href="https://wa.me/919023884833"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all mr-3"
              >
                <span className="text-lg">💬</span>
                WhatsApp
              </a>

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100 text-blue-700 font-medium hover:shadow-md transition-all"
                  >
                    <Shield size={18} />
                    <span>Admin</span>
                    <ChevronDown size={16} className={`transition-transform ${isAdminDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isAdminDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slideDown">
                      <div className="p-4 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {localStorage.getItem("adminEmail") || "Admin"}
                        </p>
                        <p className="text-xs text-gray-500">Owner Dashboard</p>
                      </div>
                      <div className="p-2">
                        {adminLinks.map((link) => (
                          <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsAdminDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                          >
                            {link.icon}
                            {link.label}
                          </NavLink>
                        ))}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-all mt-2"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/admin/login"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-300 transition-all"
                >
                  <Shield size={18} />
                  <span>Owner Login</span>
                </NavLink>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - UNCHANGED */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-2xl animate-slideDown">
            <div className="px-4 py-6 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 border border-blue-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-200">
                {isLoggedIn ? (
                  <>
                    <p className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">Admin Panel</p>
                    {adminLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-gray-700 hover:bg-blue-50 transition-all"
                      >
                        {link.icon}
                        {link.label}
                      </NavLink>
                    ))}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-all"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/admin/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium border border-blue-200 text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <Shield size={18} />
                    Owner Login
                  </NavLink>
                )}
              </div>

              <a
                href="https://wa.me/919023884833"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium mt-4 hover:shadow-lg transition-all"
              >
                <span className="text-lg">💬</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-16 sm:h-20 lg:h-24"></div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </>
  );
};

export default Navbar;