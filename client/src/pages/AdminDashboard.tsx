import { useState } from "react";
import ProductForm from "@/components/ProductForm";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleFormSubmit = (data: Product) => {
    if (editingProduct) {
      // Edit mode
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...data } : p))
      );
    } else {
      // Add mode
      const newProduct = { ...data, id: Date.now() };
      setProducts((prev) => [...prev, newProduct]);
    }
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <button onClick={handleAdd} className="btn-gradient px-4 py-2 rounded">Add Product</button>
      </div>

      {showForm && (
        <ProductForm
          initialData={editingProduct || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="p-4 rounded bg-white/10">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-300">{product.description}</p>
            <p className="mt-1 font-bold">${product.price.toFixed(2)}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
