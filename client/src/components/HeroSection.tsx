import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 mesh-gradient opacity-20"></div>
      
      {/* 3D Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--electric)]/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[var(--platinum)]/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-[var(--electric)] to-[var(--platinum)] rounded-lg animate-float" style={{animationDelay: '3s'}}></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="animate-float"
        >
          <h1 className="text-6xl md:text-8xl font-bold font-inter mb-6 text-gradient">
            Premium Industrial
            <br />
            <span className="text-5xl md:text-7xl">Printing Solutions</span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl text-[var(--platinum)]/80 mb-8 max-w-3xl mx-auto"
        >
          Experience the future of commercial printing with our cutting-edge Mimaki printers. 
          Precision engineering meets avant-garde design.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="btn-gradient px-8 py-4 rounded-lg text-lg font-semibold animate-glow">
            Explore Collection
          </button>
          <button className="glass-morphism px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Watch Demo</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
