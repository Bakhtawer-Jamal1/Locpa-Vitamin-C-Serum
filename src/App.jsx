import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { WhatsAppButton } from "./components/ui/WhatsAppButton"; // YEH IMPORT KAREIN
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col transition-colors duration-500 bg-brand-cream dark:bg-brand-dark text-brand-dark dark:text-brand-cream">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </div>
            <Footer />
            
            {/* YAHAN ADD KAREIN */}
            <WhatsAppButton /> 
            
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;