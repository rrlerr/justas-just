import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [discounts, setDiscounts] = useState<{ [key: string]: number }>({});

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const applyDiscount = async (id: string, discount: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const newPrice = (
      parseFloat(product.price) *
      ((100 - discount) / 100)
    ).toFixed(2);

    await axios.put(`/api/products/${id}`, {
      ...product,
      price: newPrice,
    });

    setDiscounts((prev) => ({ ...prev, [id]: 0 }));
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-[#0c0e1b] text-white px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          + Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="space-y-2">
            <ProductCard
              product={product}
              isEditable
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product.id)}
            />

            {/* 💰 Discount Field Below Each Card */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-20 px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white"
                placeholder="% Off"
                value={discounts[product.id] || ""}
                onChange={(e) =>
                  setDiscounts((prev) => ({
                    ...prev,
                    [product.id]: parseInt(e.target.value),
                  }))
                }
              />
              <button
                onClick={() => applyDiscount(product.id, discounts[product.id] || 0)}
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Apply Discount
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg w-full max-w-2xl shadow-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleFormClose}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}
