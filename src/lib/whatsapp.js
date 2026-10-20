import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  mobile: z.string().regex(/^03\d{9}$/, "Enter a valid mobile number (03XXXXXXXXX)"),
  address: z.string().min(10, "Full address is required"),
  city: z.string().min(2, "City is required"),
  paymentMethod: z.enum(["cod", "jazzcash", "easypaisa"]),
});

export function buildWhatsAppLink(payload) {
  const { fullName, email, mobile, address, city, paymentMethod, items, total, orderId } = payload;
  
  const paymentLabel = 
    paymentMethod === "cod" ? "Cash on Delivery" : 
    paymentMethod === "jazzcash" ? "JazzCash (Payment Sent)" : 
    "Easypaisa (Payment Sent)";

  const itemLines = items.map((item) => `• ${item.name} × ${item.quantity} — Rs. ${(item.price * item.quantity).toFixed(2)}`).join("\n");

  const message = `
🛒 *New Order: Derma Vision*
Order ID: ${orderId}

👤 *Customer Details*
Name: ${fullName}
Email: ${email}
Mobile: ${mobile}
Address: ${address}, ${city}

💳 *Payment Method*
${paymentLabel}
${paymentMethod !== "cod" ? "\n*(Please find my payment screenshot attached below)*" : ""}

📦 *Items*
${itemLines}

💰 *Total: Rs. ${total.toFixed(2)}*

Please confirm my order. Thank you!
  `.trim();

  const YOUR_WHATSAPP_NUMBER = "923260745271"; 

  return `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}