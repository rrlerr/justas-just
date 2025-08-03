import { Star, Eye, Pencil, Trash } from "lucide-react";
import { Product } from "@/types/product";
import { useProductModal } from "@/hooks/useProductModal";
import axios from "axios";

interface ProductCardProps {
  product: Product;
  isEditable?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

export default function ProductCard({ product, isEditable, onEdit, onDelete }: ProductCardProps) {
  const { openModal } = useProductModal();

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'NEW': return 'bg-[var(--electric)]/90 text-[var(--midnight)]';
      case 'ECO': return 'bg-green-500/90 text-white';
      case 'PREMIUM': return 'bg-purple-500/90 text-white';
      case 'HOT': return 'bg-red-500/90 text-white';
      case 'BESTSELLER': return 'bg-blue-500/90 text-white';
      case '3D READY': return 'bg-gradient-to-r from-[var(--electric)] to-blue-500 text-white';
      default: return 'bg-gray-500/90 text-white';
    }
  };

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
    <div
      className="card-3d glass-morphism rounded-2xl overflow-hidden magnetic-hover cursor-pointer group relative"
      onClick={() => !isEditable && openModal(product)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(product.badge)}`}>
              {product.badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold font-inter mb-2 text-white">
          {product.name}
        </h3>
        <p className="text-[var(--platinum)]/70 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[var(--electric)]">
            ${parseFloat(product.price).toLocaleString()}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[var(--platinum)]/60">
              {product.printWidth ? 'Width:' : 'Speed:'}
            </span>
            <span className="text-sm font-semibold text-white">
              {product.printWidth || product.printSpeed}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {renderStars(product.rating)}
            <span className="text-sm text-[var(--platinum)]/60 ml-2">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {isEditable ? (
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(product);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(product.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>View Details</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
