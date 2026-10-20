import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // Scroll effects
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      
      {/* Background Video */}
      <motion.div 
        style={{ scale: videoScale, willChange: "transform" }} 
        className="absolute inset-0 h-full w-full"
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          // object-[center_30%] se video thori neeche shift hoti hai taake model ka chehra nazar aaye
          className="h-full w-full object-cover object-[center_30%]" 
        >
          <source src="/MelavinC_TikTok_Ad.mp4" type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#FDFBF7] dark:to-[#1A1A1A] transition-colors duration-500" />

      {/* Hero Content */}
      <motion.div 
        style={{ y: textY, opacity, willChange: "transform, opacity" }}
        className="relative z-10 flex flex-col items-center px-6 text-center mt-20"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-brand-orange uppercase tracking-[0.3em] text-xs md:text-sm font-bold"
        >
          A New Vision in Dermatology
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight"
        >
          Reveal Your <br /> 
          <span className="text-brand-orange italic font-light pr-4">Natural Glow</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 max-w-lg text-sm md:text-lg text-gray-300 font-light tracking-wide"
        >
          Experience the power of Vitamin C and Orange Stem Cell. Clinically proven to brighten and hydrate.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10"
        >
          <a 
            href="#products" 
            className="rounded-full bg-brand-orange text-white px-10 py-4 text-sm uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(242,111,33,0.4)] inline-block"
          >
            Shop Collection
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}