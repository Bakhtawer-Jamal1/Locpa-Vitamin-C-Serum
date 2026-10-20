import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { CheckCircle2 } from "lucide-react";

export function ProductSection() {
  const { addToCart } = useCart();
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const specifications = [
    "Anti-Aging Lines", "Facial Rejuvenation", "Anti Wrinkles & Antioxidant", "Cellular Regenerator", "Intensive Treatments"
  ];

  return (
    // Dark mode mein pure black nahi, ek deep cinematic dark color use kiya hai
    <section id="products" ref={ref} className="py-32 px-6 bg-[#FDFBF7] dark:bg-[#0A0A0A] transition-colors duration-500 relative overflow-hidden">
      
      {/* Cinematic Glowing Aura in Background */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 dark:bg-brand-orange/20 blur-[120px] rounded-full pointer-events-none transition-colors duration-500" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-gold/10 dark:bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none transition-colors duration-500" />

      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Floating Image with Glow */}
        <motion.div 
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="relative aspect-square group perspective-1000"
        >
          {/* Image ke peeche ka glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/30 to-brand-gold/30 blur-2xl rounded-full group-hover:scale-110 transition-transform duration-1000" />
          
          {/* Floating Animation added here */}
          <motion.img 
            animate={{ y: [0, -15, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            src="/5.jpeg" // Yahan image 5 laga di hai
            alt="Melavin-C Vitamin C Serum" 
            className="relative z-10 h-full w-full object-cover rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-brand-gold/20 dark:border-white/10 transition-all duration-500" 
          />
        </motion.div>

        <div>
          {/* Naya Heading Text */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white leading-tight transition-colors duration-500"
          >
            Melavin-C <br />
            <span className="text-brand-orange italic pr-2">Vitamin C Serum</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="mt-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-light transition-colors duration-500"
          >
            {products[0].description}
          </motion.p>
          
          <div className="mt-8 space-y-3">
            {specifications.map((spec, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + (i * 0.1) }}
                className="flex items-center gap-4 text-brand-dark dark:text-gray-200 border-b border-gray-200 dark:border-gray-800 pb-2 transition-colors duration-500"
              >
                <CheckCircle2 className="text-brand-orange shrink-0" size={18} />
                <span className="text-sm font-medium tracking-wide">{spec}</span>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-6"
          >
            <span className="text-4xl font-light text-brand-dark dark:text-white transition-colors duration-500">Rs. {products[0].price}</span>
            <button 
              onClick={() => addToCart(products[0])} 
              className="w-full sm:w-auto rounded-full bg-brand-dark dark:bg-white text-white dark:text-brand-dark px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-brand-orange dark:hover:bg-brand-orange dark:hover:text-white transition-all duration-300 shadow-xl hover:shadow-brand-orange/30"
            >
              Add to Cart
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}