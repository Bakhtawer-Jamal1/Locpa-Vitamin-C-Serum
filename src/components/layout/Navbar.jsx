import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { ShoppingBag, Moon, Sun, Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function Navbar() {
  const { totalItems } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsMobileMenuOpen(false); // Scroll karte waqt menu band ho jaye
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header 
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      // Navbar hamesha white rahega, chahe light mode ho ya dark
      className={`fixed top-0 z-50 w-full bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md py-2" : "py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-50">
          <img 
            src="/derma-vision-logo.webp" 
            alt="Derma Vision" 
            // Logo hamesha dark/black rahega kyunke background white hai
            className={`h-auto w-28 object-contain transition-all duration-300 sm:w-32 ${isScrolled ? "max-h-12" : "max-h-14"}`} 
            decoding="async"
          />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-dark">
          <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <a href="#products" className="hover:text-brand-orange transition-colors">Shop</a>
          <a href="#about" className="hover:text-brand-orange transition-colors">About</a>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-gray-100 hover:bg-brand-orange text-brand-dark hover:text-white transition-all duration-300"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center gap-2 rounded-full bg-brand-orange text-white px-5 py-2.5 hover:bg-orange-600 transition-all duration-300 shadow-md">
            <ShoppingBag size={18} />
            <span>Cart</span>
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-dark text-white text-xs font-bold shadow-lg"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
        </div>

        {/* Mobile Right Side Icons (Theme + Cart + Hamburger) */}
        <div className="flex md:hidden items-center gap-3 z-50">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-gray-100 text-brand-dark"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <Link to="/cart" className="relative p-2 rounded-full bg-brand-orange text-white">
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-dark text-white text-[10px] font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-brand-dark"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col items-center py-6 space-y-6 text-brand-dark font-semibold">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Home</Link>
              <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">Shop</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-orange transition-colors">About</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}