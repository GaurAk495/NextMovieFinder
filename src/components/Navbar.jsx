import { Film, Search, Bell, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-sm shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo + Brand */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white group"
            >
              <Film className="h-7 w-7 text-red-500 group-hover:rotate-12 transition-transform duration-200" />
              <span className="text-lg font-semibold tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                NextMovieWatch
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition-all duration-200 relative py-2 ${
                    isActive
                      ? "text-white font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Movies
              </NavLink>
              <NavLink
                to="/tv"
                className={({ isActive }) =>
                  `transition-all duration-200 relative py-2 ${
                    isActive
                      ? "text-white font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                TV Shows
              </NavLink>
            </div>
          </div>

          {/* Right section - Search and Menu */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              <Bell className="h-5 w-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-48 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="py-3 space-y-3">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-red-500/10 text-red-500 font-semibold"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              Movies
            </NavLink>
            <NavLink
              to="/tv"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-red-500/10 text-red-500 font-semibold"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              TV Shows
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
