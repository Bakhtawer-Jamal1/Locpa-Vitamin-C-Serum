import { useState } from "react";
import { useCart } from "../context/CartContext";
import { CheckoutForm } from "../components/checkout/CheckoutForm";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formData) => {
    setIsSubmitting(true);
    const orderPayload = {
      ...formData,
      items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
      total: totalPrice,
      orderId: `DV-${Date.now()}`,
    };
    const whatsappUrl = buildWhatsAppLink(orderPayload);
    window.open(whatsappUrl, "_blank");
    setIsSubmitting(false);
  };

  if (items.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-serif pt-20 bg-[#FDFBF7] dark:bg-[#1A1A1A] text-brand-dark dark:text-white transition-colors duration-500">Your cart is empty.</div>;
  }

  return (
    <main className="mx-auto max-w-5xl px-6 pt-32 pb-20 min-h-screen bg-[#FDFBF7] dark:bg-[#1A1A1A] transition-colors duration-500">
      <h1 className="mb-10 text-center text-4xl font-serif font-bold text-brand-dark dark:text-white transition-colors duration-500">Secure Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-fit rounded-2xl bg-white dark:bg-[#242424] p-6 sm:p-8 border border-brand-gold/20 dark:border-white/10 shadow-xl sticky top-32 transition-colors duration-500">
          <h2 className="text-2xl font-serif font-bold text-brand-dark dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4 transition-colors duration-500">Order Summary</h2>
          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm font-medium text-brand-dark dark:text-gray-300 transition-colors duration-500">
                <span>{item.name} × {item.quantity}</span>
                <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between text-xl font-bold text-brand-dark dark:text-white transition-colors duration-500">
            <span>Total</span>
            <span className="text-brand-orange">Rs. {totalPrice.toFixed(2)}</span>
          </div>
          <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center bg-gray-50 dark:bg-[#1A1A1A] p-3 rounded-lg transition-colors duration-500">
            You will be redirected to WhatsApp to confirm your order. No payment is taken on this website.
          </p>
        </motion.div>
      </div>
    </main>
  );
}