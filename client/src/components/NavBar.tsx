import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import CartDrawer from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";
import ContactModal from "./ContactModal";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Products", href: "#products" },
    { label: "Solutions", href: "#solutions" },
    { label: "Support", href: "#support" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-morphism' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold font-inter text-gradient">
                MitsuMegami
              </h1>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-[var(--electric)] transition-colors duration-300 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={openCart}
              className="glass-morphism px-4 py-2 rounded-lg hover:bg-[var(--electric)]/20 transition-all duration-300 flex items-center space-x-2 relative"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--electric)] text-[var(--midnight)] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="btn-gradient px-6 py-2 rounded-lg flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass-morphism p-2 rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-morphism border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-white hover:text-[var(--electric)] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col space-y-2 px-3 pt-2">
              <button 
                onClick={() => {
                  openCart();
                  setIsMenuOpen(false);
                }}
                className="glass-morphism px-4 py-2 rounded-lg hover:bg-[var(--electric)]/20 transition-all duration-300 flex items-center space-x-2 relative"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--electric)] text-[var(--midnight)] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => {
                  setIsContactOpen(true);
                  setIsMenuOpen(false);
                }}
                className="btn-gradient px-6 py-2 rounded-lg flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Contact</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <CartDrawer />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </nav>
  );
}
