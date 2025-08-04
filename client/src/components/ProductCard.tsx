// client/components/ProductCard.tsx
import React from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    badge?: string;
    printWidth?: string;
    printSpeed?: string;
    rating?: number;
    reviewCount?: number;
  };
  isEditable?: boolean;
  onEdit?: (product: any) => void;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isEditable, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded shadow p-4 relative max-w-sm">
      {product.badge && (
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          {product.badge}
        </span>
      )}
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="mt-2 text-sm text-gray-700">
        <div>Price: ₹{product.price}</div>
        <div>Print Width: {product.printWidth}</div>
        <div>Print Speed: {product.printSpeed}</div>
        <div>
          Rating: {product.rating ?? 0} ⭐ ({product.reviewCount ?? 0} reviews)
        </div>
      </div>

      {isEditable && (
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={() => onEdit?.(product)} className="text-blue-600 hover:underline">
            ✏️ Edit
          </button>
          <button onClick={() => onDelete?.(product.id)} className="text-red-600 hover:underline">
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
