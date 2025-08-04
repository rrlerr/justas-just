import { useState } from "react";
import axios from "axios";

interface ProductFormModalProps {
  initialData?: any;
  onClose: () => void;
  onSave: () => void;
}

export default function ProductFormModal({ initialData, onClose, onSave }: ProductFormModalProps) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    price: initialData?.price || "",
    badge: initialData?.badge || "",
    printWidth: initialData?.printWidth || "",
    printSpeed: initialData?.printSpeed || "",
    rating: initialData?.rating || "0",
    reviewCount: initialData?.reviewCount || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "reviewCount" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData) {
        await axios.put(`/api/products/${initialData.id}`, form);
      } else {
        await axios.post("/api/products", form);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-900 text-white w-full max-w-2xl p-6 rounded shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit" : "Add"} Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <div className="grid grid-cols-2 gap-4">
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="Price" required className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input name="badge" value={form.badge} onChange={handleChange} placeholder="Badge (e.g. NEW)" className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input name="printWidth" value={form.printWidth} onChange={handleChange} placeholder="Print Width" className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input name="printSpeed" value={form.printSpeed} onChange={handleChange} placeholder="Print Speed" className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} placeholder="Rating (0-5)" className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input name="reviewCount" type="number" value={form.reviewCount} onChange={handleChange} placeholder="Review Count" required className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Cancel</button>
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
