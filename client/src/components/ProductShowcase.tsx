import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

export default function ProductShowcase() {
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });

  if (isLoading) {
    return (
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-white/10 rounded-lg animate-pulse mb-4"></div>
            <div className="h-6 bg-white/5 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-morphism rounded-2xl p-6 animate-pulse">
                <div className="h-64 bg-white/10 rounded-lg mb-4"></div>
                <div className="h-6 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/5 rounded mb-4"></div>
                <div className="h-8 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-red-400 mb-4">Failed to Load Products</h2>
          <p className="text-white/70">Please try again later or contact support.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-inter mb-6 text-gradient">
            Featured Products
          </h2>
          <p className="text-xl text-[var(--platinum)]/70 max-w-2xl mx-auto">
            Discover our premium collection of industrial printing solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
