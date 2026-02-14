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
    { to: "/", label: "Home", icon: <Home size={18} /> }, // Reduced from 20 to 18
    { to: "/cabs", label: "Rental Cars", icon: <Car size={18} /> },
    { to: "/tickets", label: "Tickets", icon: <Ticket size={18} /> },
    { to: "/packages", label: "Packages", icon: <Package size={18} /> },
    { to: "/contact", label: "Contact", icon: <Phone size={18} /> },
    { to: "/about", label: "About Us", icon: <Info size={18} /> },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <Shield size={16} /> }, // Reduced from 18 to 16
    { to: "/admin/packages", label: "Manage Packages", icon: <Package size={16} /> },
    { to: "/admin/settings", label: "Settings", icon: <Settings size={16} /> },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-lg py-1.5' // Reduced from py-2 to py-1.5
            : 'bg-white py-3' // Reduced from py-4 to py-3
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ============================ */}
            {/* LEFT: LOGO - SMALLER */}
            {/* ============================ */}
            <div className="flex items-center -ml-2 sm:-ml-3 lg:-ml-4">
              <NavLink to="/" className="flex items-center group">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl blur-md opacity-70 group-hover:blur-lg transition-all"></div>
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img 
                      src="/logo.png"
                      alt="GoTravio Logo" 
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                </div>
                
                <div className="hidden sm:flex flex-col ml-2">
                  <p className="font-bold text-lg text-gray-900 leading-tight">
                    GoTravio
                  </p>
                  <p className="text-[9px] text-gray-600 leading-tight -mt-0.5 font-medium">
                    Travel Excellence
                  </p>
                </div>
                
                <div className="flex flex-col sm:hidden ml-1.5">
                  <p className="font-bold text-base text-gray-900 leading-tight">
                    GoTravio
                  </p>
                  <p className="text-[8px] text-gray-600 leading-tight -mt-0.5 font-medium">
                    Travel Excellence
                  </p>
                </div>
              </NavLink>
            </div>

            {/* ============================ */}
            {/* CENTER: NAVIGATION LINKS - SMALLER */}
            {/* ============================ */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-4 py-2 mx-0.5 rounded-lg text-sm font-medium transition-all group ${
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
            {/* RIGHT: WHATSAPP + ADMIN - SMALLER */}
            {/* ============================ */}
            <div className="hidden lg:flex items-center -mr-2 sm:-mr-3 lg:-mr-4">
              <a
                href="https://wa.me/919023884833"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:shadow-lg hover:scale-105 transition-all mr-2"
              >
                <span className="text-base">💬</span>
                WhatsApp
              </a>

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100 text-blue-700 font-medium hover:shadow-md transition-all text-sm"
                  >
                    <Shield size={16} />
                    <span>Admin</span>
                    <ChevronDown size={14} className={`transition-transform ${isAdminDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isAdminDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slideDown">
                      <div className="p-3 border-b border-gray-100">
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
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                          >
                            {link.icon}
                            {link.label}
                          </NavLink>
                        ))}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-600 hover:bg-red-50 transition-all mt-2"
                        >
                          <LogOut size={14} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/admin/login"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-blue-200 text-blue-600 font-medium hover:bg-blue-50 hover:border-blue-300 transition-all text-sm"
                >
                  <Shield size={16} />
                  <span>Owner Login</span>
                </NavLink>
              )}
            </div>

            {/* Mobile menu button - slightly smaller */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - slightly smaller */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-2xl animate-slideDown">
            <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
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

              <div className="pt-3 mt-3 border-t border-gray-200">
                {isLoggedIn ? (
                  <>
                    <p className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin Panel</p>
                    {adminLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 transition-all"
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
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/admin/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium border border-blue-200 text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <Shield size={16} />
                    Owner Login
                  </NavLink>
                )}
              </div>

              <a
                href="https://wa.me/919023884833"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium text-sm mt-3 hover:shadow-lg transition-all"
              >
                <span className="text-base">💬</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed navbar - adjusted height */}
      <div className="h-14 sm:h-16 lg:h-20"></div>

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