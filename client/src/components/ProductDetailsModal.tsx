import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ShoppingCart, Heart, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useProductModal } from "@/hooks/useProductModal";
import { motion } from "framer-motion";

export default function ProductDetailsModal() {
  const { isOpen, product, closeModal } = useProductModal();

  if (!product) return null;

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />}
        {[...Array(5 - Math.ceil(numRating))].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-gray-400" />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-morphism border-white/20 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="text-2xl font-bold font-inter text-white">
              {product.name}
            </DialogTitle>
            <button
              onClick={closeModal}
              className="glass-morphism w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>

            <div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[var(--electric)]">
                  ${parseFloat(product.price).toLocaleString()}
                </span>
                <div className="flex items-center mt-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-[var(--platinum)]/60 ml-2">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-[var(--platinum)]/70 mb-6">
                {product.description}
              </p>

              <div className="space-y-4 mb-6">
                {product.printWidth && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--platinum)]/60">Print Width:</span>
                    <span className="font-semibold text-white">{product.printWidth}</span>
                  </div>
                )}
                {product.printSpeed && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--platinum)]/60">Print Speed:</span>
                    <span className="font-semibold text-white">{product.printSpeed}</span>
                  </div>
                )}
                {product.resolution && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--platinum)]/60">Resolution:</span>
                    <span className="font-semibold text-white">{product.resolution}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[var(--platinum)]/60">Warranty:</span>
                  <span className="font-semibold text-white">5 Years</span>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <button className="btn-gradient px-6 py-3 rounded-lg font-semibold flex-1 flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="glass-morphism px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </button>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="pt-6 border-t border-[var(--platinum)]/20">
                  <h4 className="font-semibold mb-2 text-white">Features:</h4>
                  <ul className="space-y-1 text-sm text-[var(--platinum)]/70">
                    {product.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
