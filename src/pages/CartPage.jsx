import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "../components/ui/Button";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 bg-[#FDFBF7] dark:bg-[#1A1A1A] transition-colors duration-500">
        <h1 className="text-3xl font-bold font-serif text-brand-dark dark:text-white">Your cart is empty</h1>
        <Link to="/#products" className="mt-6">
          <Button>Shop LOCPA</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-20 min-h-screen bg-[#FDFBF7] dark:bg-[#1A1A1A] transition-colors duration-500">
      <h1 className="text-4xl font-bold font-serif text-brand-dark dark:text-white mb-8 transition-colors duration-500">Your Cart</h1>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl bg-white dark:bg-[#242424] p-4 shadow-sm border border-brand-gold/20 dark:border-white/10 transition-colors duration-500">
            <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-lg text-brand-dark dark:text-white transition-colors duration-500">{item.name}</h3>
              <p className="text-brand-orange font-semibold">Rs. {item.price}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-600 text-brand-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">−</button>
              <span className="font-medium w-4 text-center text-brand-dark dark:text-white transition-colors">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded-full border border-gray-300 dark:border-gray-600 text-brand-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 hover:underline">Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-between border-t border-gray-300 dark:border-gray-700 pt-6 transition-colors duration-500">
        <span className="text-xl font-bold text-brand-dark dark:text-white">Total</span>
        <span className="text-2xl font-bold text-brand-orange">Rs. {totalPrice.toFixed(2)}</span>
      </div>
      <Link to="/checkout">
        <Button className="mt-6 w-full py-4 text-lg">Proceed to Checkout</Button>
      </Link>
    </div>
  );
}