import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import ProductForm from "@/components/ProductForm";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  badge: string;
  printWidth?: string;
  printSpeed?: string;
  rating: string;
  reviewCount: number;
  discount?: number;
  slotAvailable?: boolean;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/products/${id}`);
    fetchProducts();
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <button
        className="mb-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      >
        Add New Product
      </button>

      {showForm && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isEditable
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
