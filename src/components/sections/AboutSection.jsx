import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 bg-white dark:bg-[#1A1A1A] transition-colors duration-500 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-brand-orange uppercase tracking-[0.3em] text-xs font-bold mb-8"
        >
          Our Philosophy
        </motion.h2>
        
        <motion.h3 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif font-light text-brand-dark dark:text-white leading-tight transition-colors duration-500"
        >
          "A New Vision <br/>in <span className="italic text-brand-orange">Dermatology</span>"
        </motion.h3>
        
        <motion.div 
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-8 h-[2px] w-24 bg-brand-orange mx-auto" 
        />
        
        <motion.p 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-10 text-xl md:text-2xl leading-relaxed text-gray-500 dark:text-gray-400 font-light transition-colors duration-500"
        >
          At Derma Vision, we believe skincare is science. Our Melavin-C serum is crafted with premium, clinically-tested ingredients like Vitamin C, Orange Stem Cell, and Hyaluronic Acid. Safe for all skin types, cruelty-free, and free from harmful chemicals.
        </motion.p>
      </div>
    </section>
  );
}