import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { checkoutSchema } from "../../lib/whatsapp";
import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function CheckoutForm({ onSubmit, isSubmitting }) {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  const selectedPayment = useWatch({ control, name: "paymentMethod" });
  const [copied, setCopied] = useState(false);

  // Aapka JazzCash / Easypaisa Account Number
  const accountNumber = "03494683949";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white dark:bg-[#242424] p-6 sm:p-8 rounded-2xl shadow-xl border border-brand-gold/20 dark:border-white/10 transition-colors duration-500">
      <h2 className="text-2xl font-serif font-bold text-brand-dark dark:text-white transition-colors duration-500">Shipping Details</h2>
      
      <div>
        <input {...register("fullName")} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 text-brand-dark dark:text-white focus:border-brand-orange focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-500" placeholder="Full Name" />
        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <input type="email" {...register("email")} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 text-brand-dark dark:text-white focus:border-brand-orange focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-500" placeholder="Email Address" />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <input type="tel" {...register("mobile")} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 text-brand-dark dark:text-white focus:border-brand-orange focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-500" placeholder="Mobile (03001234567)" />
          {errors.mobile && <p className="mt-1 text-sm text-red-500">{errors.mobile.message}</p>}
        </div>
      </div>

      <div>
        <textarea rows={2} {...register("address")} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 text-brand-dark dark:text-white focus:border-brand-orange focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-500" placeholder="Full Address" />
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
      </div>

      <div>
        <input {...register("city")} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 text-brand-dark dark:text-white focus:border-brand-orange focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-500" placeholder="City (e.g. Karachi)" />
        {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
      </div>

      <div className="pt-4">
        <label className="mb-3 block text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors duration-500">Payment Method</label>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { id: "cod", label: "Cash on Delivery", icon: "💵" },
            { id: "jazzcash", label: "JazzCash", icon: "📱" },
            { id: "easypaisa", label: "Easypaisa", icon: "💚" },
          ].map((method) => (
            <button
              key={method.id} type="button" onClick={() => setValue("paymentMethod", method.id)}
              className={`rounded-xl border-2 p-3 text-left transition-colors duration-300 ${selectedPayment === method.id ? "border-brand-orange bg-brand-orange/5 dark:bg-brand-orange/10" : "border-gray-200 dark:border-gray-600 hover:border-brand-orange/50"}`}
            >
              <span className="text-xl">{method.icon}</span>
              <p className="mt-1 font-semibold text-sm text-brand-dark dark:text-white">{method.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Instructions Box - Shows only if JazzCash or Easypaisa is selected */}
      {(selectedPayment === "jazzcash" || selectedPayment === "easypaisa") && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="bg-brand-orange/10 border border-brand-orange/30 p-5 rounded-xl mt-4"
        >
          <h3 className="text-brand-orange font-bold mb-2 flex items-center gap-2">
            <CheckCircle2 size={18} /> Payment Instructions
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Please transfer the total amount to the following {selectedPayment === "jazzcash" ? "JazzCash" : "Easypaisa"} account:
          </p>
          <div className="flex items-center justify-between bg-white dark:bg-[#1A1A1A] p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <span className="font-mono text-lg font-bold text-brand-dark dark:text-white">{accountNumber}</span>
            <button 
              type="button" 
              onClick={copyToClipboard}
              className="text-brand-orange hover:text-brand-dark dark:hover:text-white transition-colors flex items-center gap-1 text-sm font-semibold"
            >
              {copied ? <><CheckCircle2 size={16}/> Copied</> : <><Copy size={16}/> Copy</>}
            </button>
          </div>
          <p className="text-xs text-brand-orange font-bold mt-3">
            ⚠️ IMPORTANT: After sending the payment, click the button below. You must attach the payment screenshot in WhatsApp to confirm your order.
          </p>
        </motion.div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full py-4 text-lg mt-6 shadow-lg shadow-brand-orange/30">
        {isSubmitting ? "Processing..." : "Place Order via WhatsApp"}
      </Button>
    </motion.form>
  );
}