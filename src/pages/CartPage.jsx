import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { CheckoutForm } from "../components/checkout/CheckoutForm";
import { Button } from "../components/ui/Button";
import { buildWhatsAppLink } from "../lib/orderNotification";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState(() => sessionStorage.getItem("pendingOrderId"));
  const [completedOrderId, setCompletedOrderId] = useState(() => sessionStorage.getItem("completedOrderId"));

  const handleSubmit = (formData, whatsappTab) => {
    setIsSubmitting(true);
    const orderPayload = {
      ...formData,
      items: items.map(({ name, quantity, price }) => ({ name, quantity, price })),
      total: totalPrice,
      orderId: `DV-${Date.now()}`,
    };
    const whatsappUrl = buildWhatsAppLink(orderPayload);

    if (whatsappTab && !whatsappTab.closed) {
      whatsappTab.location.href = whatsappUrl;
    }
    sessionStorage.setItem("pendingOrderId", orderPayload.orderId);
    setPendingOrderId(orderPayload.orderId);
    clearCart();
    setIsSubmitting(false);
  };

  const confirmWhatsAppSent = () => {
    sessionStorage.removeItem("pendingOrderId");
    sessionStorage.setItem("completedOrderId", pendingOrderId);
    setCompletedOrderId(pendingOrderId);
    setPendingOrderId(null);
  };

  if (completedOrderId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDFBF7] px-6 pb-20 pt-32 text-center dark:bg-[#1A1A1A]">
        <section className="w-full max-w-xl rounded-2xl border border-green-200 bg-white p-8 shadow-xl dark:border-green-900 dark:bg-[#242424] sm:p-10">
          <CheckCircle2 className="mx-auto text-green-600 dark:text-green-400" size={56} />
          <h1 className="mt-5 text-3xl font-bold text-brand-dark dark:text-white">Order placed successfully!</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Your order <span className="font-semibold">{completedOrderId}</span> has been submitted to us on WhatsApp.
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            We’ll contact you to confirm the order details.
          </p>
          <Link to="/#products" onClick={() => sessionStorage.removeItem("completedOrderId")} className="mt-6 inline-block">
            <Button>Continue Shopping</Button>
          </Link>
        </section>
      </main>
    );
  }

  if (pendingOrderId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDFBF7] px-6 pb-20 pt-32 text-center dark:bg-[#1A1A1A]">
        <section className="w-full max-w-xl rounded-2xl border border-brand-gold/20 bg-white p-8 shadow-xl dark:bg-[#242424] sm:p-10">
          <h1 className="text-3xl font-bold text-brand-dark dark:text-white">Finish your order</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            WhatsApp opened with your order <span className="font-semibold">{pendingOrderId}</span>. Send the prepared message there, then come back here.
          </p>
          <Button onClick={confirmWhatsAppSent} className="mt-6">
            I sent the WhatsApp message
          </Button>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            We can’t verify WhatsApp delivery automatically. This confirmation records that you sent the message.
          </p>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7] px-6 pt-20 transition-colors duration-500 dark:bg-[#1A1A1A]">
        <h1 className="font-serif text-3xl font-bold text-brand-dark dark:text-white">Your cart is empty</h1>
        <Link to="/#products" className="mt-6">
          <Button>Shop LOCPA</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl bg-[#FDFBF7] px-6 pb-20 pt-32 transition-colors duration-500 dark:bg-[#1A1A1A]">
      <h1 className="mb-8 text-4xl font-bold text-brand-dark dark:text-white">Your Cart</h1>
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <section className="space-y-5">
          {items.map((item) => (
            <article key={item.id} className="flex flex-col items-center gap-5 rounded-2xl border border-brand-gold/20 bg-white p-4 shadow-sm transition-colors duration-500 dark:border-white/10 dark:bg-[#242424] sm:flex-row">
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg font-bold text-brand-dark dark:text-white">{item.name}</h2>
                <p className="font-semibold text-brand-orange">Rs. {item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`} className="h-8 w-8 rounded-full border border-gray-300 text-brand-dark transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800">−</button>
                <span className="w-4 text-center font-medium text-brand-dark dark:text-white">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`} className="h-8 w-8 rounded-full border border-gray-300 text-brand-dark transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800">+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 hover:underline">Remove</button>
            </article>
          ))}
          <div className="flex justify-between border-t border-gray-300 pt-5 dark:border-gray-700">
            <span className="text-xl font-bold text-brand-dark dark:text-white">Total</span>
            <span className="text-2xl font-bold text-brand-orange">Rs. {totalPrice.toFixed(2)}</span>
          </div>
        </section>

        <CheckoutForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Your WhatsApp message will be prepared with your order details. No payment is taken on this website.
      </p>
    </main>
  );
}
