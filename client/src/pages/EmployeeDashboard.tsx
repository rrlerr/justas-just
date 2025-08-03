import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductForm from "@/components/ProductForm";
import axios from "axios";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
  printWidth?: string;
  printSpeed?: string;
  rating: string;
  reviewCount: number;
};

export default function EmployeeDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: Partial<Product>) => {
    if (editingProduct) {
      await axios.put(`/api/products/${editingProduct.id}`, data);
    } else {
      await axios.post("/api/products", data);
    }
    setShowForm(false);
    fetchProducts();
  };

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Employee Dashboard</h2>
        <button onClick={handleAdd} className="btn-gradient px-4 py-2 rounded">
          Add Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          initialData={editingProduct || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isEditable
            onEdit={() => handleEdit(product)}
            // No delete for employees by default — unless you want to allow it
          />
        ))}
      </div>
    </div>
  );
}
