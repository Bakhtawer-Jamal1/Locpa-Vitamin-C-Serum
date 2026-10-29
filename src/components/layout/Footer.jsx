import { motion } from "framer-motion";

export function Footer() {
  return (
    // Footer hamesha white rahega (bg-white), koi dark mode background nahi
    <footer className="relative bg-white pt-20 pb-10 border-t border-gray-200">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-16 text-center md:text-left">
          
          {/* Logo & Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            {/* Logo apne original colors mein rahega, koi invert nahi hoga */}
            <img src="/derma-vision-logo.svg" alt="Derma Vision" className="h-14 object-contain mb-4" />
            <p className="text-brand-orange text-xs font-bold tracking-[0.2em] uppercase">
              A New Vision in Dermatology
            </p>
          </motion.div>
          
          {/* Explore Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-3 text-sm font-semibold text-brand-dark"
          >
            <span className="text-gray-400 uppercase tracking-wider text-xs mb-2">Explore</span>
            <a href="#home" className="hover:text-brand-orange transition-colors">Home</a>
            <a href="#products" className="hover:text-brand-orange transition-colors">Shop Serum</a>
            <a href="#about" className="hover:text-brand-orange transition-colors">About Us</a>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="flex flex-col items-center md:items-end gap-3"
          >
            <span className="text-gray-400 uppercase tracking-wider text-xs mb-2">Get in Touch</span>
            <p className="text-sm text-brand-dark font-medium">Need help with your order?</p>
            <a 
              href="https://wa.me/923260745271" 
              target="_blank" 
              rel="noopener noreferrer"
              className="rounded-full bg-brand-dark text-white px-6 py-2 text-sm font-bold hover:bg-brand-orange transition-all duration-300"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Derma Vision. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
}