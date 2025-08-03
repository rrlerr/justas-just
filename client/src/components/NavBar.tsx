// client/src/components/NavBar.tsx
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    { label: "About", href: "#bottom" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-morphism' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-white">MitsuMegami</h1>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-white hover:text-blue-400">{item.label}</a>
            ))}
            <Link to="/admin-login" className="text-white hover:text-blue-400">Admin Login</Link>
            <Link to="/employee-login" className="text-white hover:text-blue-400">Employee Login</Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black px-4 py-2">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="block text-white py-1">{item.label}</a>
          ))}
          <Link to="/admin-login" className="block text-white py-1">Admin Login</Link>
          <Link to="/employee-login" className="block text-white py-1">Employee Login</Link>
        </div>
      )}
    </nav>
  );
}
