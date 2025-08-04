// components/ProductFormModal.tsx
import { useState } from "react";
import axios from "axios";

interface ProductFormProps {
  initialData?: any;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ProductFormModal({ initialData, onSubmit, onCancel }: ProductFormProps) {
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "reviewCount" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (initialData?.id) {
      await axios.put(`/api/products/${initialData.id}`, form);
    } else {
      await axios.post("/api/products", form);
    }
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 w-full max-w-2xl p-8 rounded-lg shadow-lg space-y-4 text-white"
      >
        <h2 className="text-xl font-semibold">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="input" />
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required className="input" />
          <input name="badge" value={form.badge} onChange={handleChange} placeholder="Badge" className="input" />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required className="input" />
          <input name="printWidth" value={form.printWidth} onChange={handleChange} placeholder="Print Width" className="input" />
          <input name="printSpeed" value={form.printSpeed} onChange={handleChange} placeholder="Print Speed" className="input" />
          <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} placeholder="Rating" className="input" />
          <input name="reviewCount" type="number" value={form.reviewCount} onChange={handleChange} placeholder="Review Count" className="input" />
        </div>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="w-full h-24 p-2 rounded bg-gray-800" />
        <div className="flex justify-end space-x-3">
          <button type="submit" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Save</button>
          <button type="button" onClick={onCancel} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Cancel</button>
        </div>
      </form>
    </div>
  );
}
