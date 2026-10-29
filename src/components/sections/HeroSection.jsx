import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = ["/5.png", "/4.png", "/3.png"];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  // Scroll effects
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative flex h-screen min-h-[36rem] w-full items-center justify-center overflow-hidden bg-black px-4 sm:px-6">
      
      {/* Background Image Slider */}
      <motion.div 
        style={{ scale: backgroundScale, willChange: "transform" }} 
        className="absolute inset-0 h-full w-full"
      >
        <motion.img
          key={slides[activeSlide]}
          src={slides[activeSlide]}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="h-full w-full object-cover object-[center_35%] sm:object-[center_30%]"
        />
      </motion.div>
      
      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/25 md:from-black/45 md:via-black/20 md:to-[#FDFBF7]/70 md:dark:to-[#1A1A1A]/70 transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent md:hidden" />

      {/* Hero Content */}
      <motion.div 
        style={{ y: textY, opacity, willChange: "transform, opacity" }}
        className="absolute bottom-[4.25rem] left-5 z-10 flex w-[calc(100%-2.5rem)] max-w-7xl flex-col items-start text-left sm:relative sm:bottom-auto sm:left-auto sm:mx-auto sm:mt-16 sm:w-full sm:px-6 md:mt-20 md:px-12"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-3 text-[0.65rem] font-extrabold uppercase leading-relaxed tracking-[0.18em] text-brand-orange drop-shadow-md sm:text-sm sm:tracking-[0.3em] md:text-base"
        >
          A New Vision in Dermatology
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-full text-[clamp(2rem,9vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] sm:text-5xl md:max-w-4xl md:text-6xl lg:text-7xl"
        >
          Reveal Your <br /> 
          <span className="pr-0 font-semibold italic text-brand-orange drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] sm:pr-4">Natural Glow</span>
        </motion.h1>

      </motion.div>

      <motion.a
        href="#products"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-5 left-5 z-20 rounded-full bg-brand-orange px-5 py-3 text-[0.65rem] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(242,111,33,0.4)] sm:bottom-6 sm:left-6 sm:px-6 sm:text-xs md:bottom-10 md:left-10 md:px-8 md:py-4 md:text-sm"
      >
        Shop Collection
      </motion.a>
    </section>
  );
}