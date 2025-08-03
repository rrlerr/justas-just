import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import TrustIndicators from "@/components/TrustIndicators";
import Footer from "@/components/Footer";
import ProductDetailsModal from "@/components/ProductDetailsModal";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <ProductShowcase />
      <TrustIndicators />
      <Footer />
      <ProductDetailsModal />

      {/* 👇 This is the "About" anchor point that the nav will scroll to */}
      <div id="about" className="h-1" />
    </div>
  );
}
