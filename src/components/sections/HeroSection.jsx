import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  { src: "/5.webp", alt: "LOCPA Vitamin C Serum skincare" },
  { src: "/4.webp", alt: "LOCPA Vitamin C Serum with oranges" },
  { src: "/6.webp?v=20261029-2", alt: "LOCPA Vitamin C Serum product banner" },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const showPreviousSlide = () => {
    setActiveSlide((currentSlide) => (currentSlide - 1 + slides.length) % slides.length);
  };

  const showNextSlide = () => {
    setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
  };

  return (
    <section
      id="home"
      className="bg-[#FDFBF7] px-4 pb-6 pt-24 transition-colors duration-500 dark:bg-[#0A0A0A] sm:px-6 sm:pb-10 sm:pt-28"
    >
      <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[1.75rem] border border-brand-gold/25 bg-[#F4F1EA] shadow-[0_16px_50px_rgba(55,40,20,0.08)] transition-colors duration-500 dark:border-white/10 dark:bg-[#1A1A1A] dark:shadow-black/25 md:grid md:min-h-[30rem] md:grid-cols-[1fr_0.92fr] md:items-center md:gap-8 md:rounded-[2rem] md:p-8 lg:gap-12 lg:p-12">
        <div className="order-2 flex flex-col px-5 pb-6 pt-7 sm:px-8 sm:pb-8 md:order-1 md:px-0 md:py-4">
          <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-brand-gold/40 bg-[#FDFBF7]/70 px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-brand-dark dark:border-white/15 dark:bg-[#242424]/70 dark:text-gray-200 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
            Daily essential · LOCPA Vitamin C
          </p>

          <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-brand-orange sm:text-xs">
            A New Vision in Dermatology
          </p>
          <h1 className="max-w-xl font-serif text-[clamp(2rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-brand-dark dark:text-white">
            Reveal your{" "}
            <span className="font-normal italic text-brand-orange">natural glow.</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
            Brighten and hydrate your skin with LOCPA Vitamin C Serum, made for your everyday skincare ritual.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#products"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-dark px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:bg-white dark:text-brand-dark dark:hover:bg-brand-orange dark:hover:text-white sm:text-sm"
            >
              Shop Vitamin C Serum
            </a>
            <a
              href="#products"
              className="px-2 py-2 text-xs font-semibold text-brand-dark transition-colors hover:text-brand-orange dark:text-gray-200 sm:text-sm"
            >
              Explore the benefits
            </a>
          </div>

          <div className="mt-7 flex items-center gap-3" aria-label="Slider controls">
            <button
              type="button"
              onClick={showPreviousSlide}
              aria-label="Show previous slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-dark/20 text-brand-dark transition-colors hover:border-brand-orange hover:bg-brand-orange hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:border-white/20 dark:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all ${
                    activeSlide === index
                      ? "w-7 bg-brand-orange"
                      : "w-2.5 bg-brand-dark/20 hover:bg-brand-orange/60 dark:bg-white/25"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={showNextSlide}
              aria-label="Show next slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-dark/20 text-brand-dark transition-colors hover:border-brand-orange hover:bg-brand-orange hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:border-white/20 dark:text-white"
            >
              <ChevronRight size={18} />
            </button>
            <span className="ml-1 text-xs font-semibold tabular-nums text-gray-500 dark:text-gray-400">
              0{activeSlide + 1} / 0{slides.length}
            </span>
          </div>
        </div>

        <div className="relative order-1 mx-4 mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-brand-gold/20 bg-[#EAE3D4] dark:border-white/10 dark:bg-[#242424] sm:mx-8 sm:mt-8 md:order-2 md:mx-0 md:my-0 md:w-full md:rounded-[1.5rem]">
          <AnimatePresence mode="wait">
            <motion.img
              key={slides[activeSlide].src}
              src={slides[activeSlide].src}
              alt={slides[activeSlide].alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 h-full w-full object-contain"
              loading={activeSlide === 0 ? "eager" : "lazy"}
              fetchPriority={activeSlide === 0 ? "high" : "auto"}
              decoding="async"
            />
          </AnimatePresence>
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/60 bg-[#FDFBF7]/90 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-wider text-brand-dark shadow-sm dark:border-white/10 dark:bg-[#1A1A1A]/90 dark:text-white sm:bottom-4 sm:right-4">
            LOCPA · 30 ml
          </span>
        </div>
      </div>
    </section>
  );
}
