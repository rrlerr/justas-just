import { motion } from "framer-motion";
import { Shield, Headphones, Truck, Wrench } from "lucide-react";

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Shield,
      title: "5-Year Warranty",
      description: "Comprehensive protection for your investment",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock technical assistance",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Complimentary delivery worldwide",
    },
    {
      icon: Wrench,
      title: "Installation",
      description: "Professional setup and training included",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[var(--midnight)]/50 to-[var(--deep-black)]/50" id="support">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {indicators.map((indicator, index) => (
            <motion.div
              key={indicator.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="glass-morphism w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--electric)]/20 transition-all duration-300">
                <indicator.icon className="h-8 w-8 text-[var(--electric)]" />
              </div>
              <h3 className="text-xl font-bold font-inter mb-2 text-white">
                {indicator.title}
              </h3>
              <p className="text-[var(--platinum)]/70">
                {indicator.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
