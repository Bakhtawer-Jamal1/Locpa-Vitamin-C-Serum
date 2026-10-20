import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Droplets, RefreshCcw, Sun } from "lucide-react";

export function BenefitsSection() {
  const features = [
    { title: "Anti-Aging Lines", img: "/4.jpeg", icon: <Sparkles size={18} />, desc: "Visibly reduces fine lines and expression marks." },
    { title: "Facial Rejuvenation", img: "/2.jpeg", icon: <RefreshCcw size={18} />, desc: "Revives dull skin for a youthful, radiant complexion." },
    { title: "Anti Wrinkles", img: "/1.jpeg", icon: <ShieldCheck size={18} />, desc: "Fights free radicals and protects against premature aging." },
    { title: "Cellular Regenerator", img: "/5.jpeg", icon: <Droplets size={18} />, desc: "Deeply repairs and regenerates skin cells overnight." },
    { title: "Intensive Treatments", img: "/3.jpeg", icon: <Sun size={18} />, desc: "Targeted intensive care for stubborn pigmentation." },
  ];

  return (
    <section className="py-32 px-6 bg-[#F4F1EA] dark:bg-[#121212] transition-colors duration-500">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-brand-orange tracking-[0.3em] uppercase text-xs font-bold mb-4">Advanced Formulation</p>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white transition-colors duration-500">
            Advanced <span className="italic font-light text-brand-gold">Dermatological</span> Benefits
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative rounded-2xl overflow-hidden bg-white dark:bg-[#1A1A1A] border border-brand-gold/20 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(242,111,33,0.1)] transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#1A1A1A] via-white/20 dark:via-[#1A1A1A]/20 to-transparent transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 h-10 w-10 rounded-full bg-brand-orange flex items-center justify-center text-white shadow-lg z-10">
                  {item.icon}
                </div>
              </div>
              <div className="p-6 pt-2">
                <h3 className="text-xl font-serif font-bold text-brand-dark dark:text-white group-hover:text-brand-orange transition-colors">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}