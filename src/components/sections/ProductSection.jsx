import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { CheckCircle2, Sparkles } from "lucide-react";

export function ProductSection() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const specifications = [
    "Anti-Aging Lines", "Facial Rejuvenation", "Anti Wrinkles & Antioxidant", "Cellular Regenerator", "Intensive Treatments"
  ];

  return (
    // Dark mode mein pure black nahi, ek deep cinematic dark color use kiya hai
    <section id="products" ref={ref} className="relative overflow-hidden bg-[#FDFBF7] px-4 pb-12 pt-24 transition-colors duration-500 dark:bg-[#0A0A0A] sm:px-6 sm:py-20">
      
      {/* Cinematic Glowing Aura in Background */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 dark:bg-brand-orange/20 blur-[120px] rounded-full pointer-events-none transition-colors duration-500" />
      <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-gold/10 dark:bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none transition-colors duration-500" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-5 mt-2 max-w-2xl text-center sm:mb-10 sm:mt-5"
        >
          <p className="mb-2 inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-orange sm:text-xs">
            <Sparkles size={14} aria-hidden="true" />
            Your daily glow essential
          </p>
          <h2 className="text-2xl font-bold leading-tight text-brand-dark dark:text-white sm:text-4xl">
            Discover the LOCPA <span className="text-brand-orange">Vitamin C Serum</span>
          </h2>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-3xl border border-brand-gold/20 bg-white shadow-[0_16px_50px_rgba(55,40,20,0.08)] dark:border-white/10 dark:bg-[#1A1A1A] dark:shadow-black/30 md:grid md:grid-cols-2"
        >
          <motion.div
            style={{ y: yImage }}
            className="relative aspect-[1.65/1] overflow-hidden bg-[#F5F0E7] dark:bg-[#242424] sm:aspect-[1.4/1] md:aspect-auto md:min-h-[28rem]"
          >
            <img
              src={products[0].image}
              alt={products[0].name}
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wide text-brand-dark shadow-sm sm:left-5 sm:top-5 sm:text-xs">
              Vitamin C Serum
            </span>
            <span className="absolute bottom-3 right-3 rounded-full bg-brand-orange px-3 py-1.5 text-xs font-bold text-white shadow-sm sm:bottom-5 sm:right-5">
              Save Rs. {products[0].originalPrice - products[0].price}
            </span>
          </motion.div>

          <div className="flex flex-col p-5 sm:p-8 md:justify-center md:p-10">
            <div className="hidden items-center gap-2 text-xs font-semibold text-brand-orange sm:flex">
              <Sparkles size={15} aria-hidden="true" />
              <span>LOCPA by Derma Vision</span>
            </div>
            <h3 className="mt-2 text-2xl font-bold leading-tight text-brand-dark dark:text-white sm:text-3xl">
              {products[0].name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:mt-3 sm:text-base">
              {products[0].description}
            </p>

            <ul className="mt-5 hidden grid-cols-1 gap-2 sm:grid sm:grid-cols-2">
              {specifications.map((spec) => (
                <li key={spec} className="flex items-center gap-2 text-xs font-medium text-brand-dark dark:text-gray-200 sm:text-sm">
                  <CheckCircle2 className="shrink-0 text-brand-orange" size={16} aria-hidden="true" />
                  {spec}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:mt-6">
              <span className="text-3xl font-bold text-brand-dark dark:text-white">Rs. {products[0].price.toLocaleString("en-PK")}</span>
              <span className="text-base text-gray-500 line-through decoration-2">Rs. {products[0].originalPrice.toLocaleString("en-PK")}</span>
              <span className="rounded-full bg-brand-orange/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-orange">
                Save {Math.round((1 - products[0].price / products[0].originalPrice) * 100)}%
              </span>
            </div>

            <button
              onClick={() => {
                addToCart(products[0]);
                navigate("/cart");
              }}
              className="mt-4 flex min-h-12 w-full items-center justify-center rounded-full bg-brand-orange px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-brand-orange/20 transition hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:mt-5 md:max-w-sm"
            >
              Add to Cart
            </button>
            <p className="mt-3 hidden text-center text-xs text-gray-500 dark:text-gray-400 sm:block md:max-w-sm">
              Convenient ordering • Pay securely on delivery
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}