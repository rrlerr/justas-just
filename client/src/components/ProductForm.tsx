// client/components/ProductForm.tsx
import React, { useState } from "react";
import axios from "axios";

interface ProductFormProps {
  initialData?: any;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
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
    if (initialData) {
      await axios.put(`/api/products/${initialData.id}`, form);
    } else {
      await axios.post("/api/products", form);
    }
    onSubmit();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg text-black w-full max-w-lg space-y-4 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-2">{initialData ? "Edit Product" : "Add Product"}</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="input" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="input" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required className="input" />
        <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="Price" required className="input" />
        <input name="badge" value={form.badge} onChange={handleChange} placeholder="Badge (e.g. NEW, ECO)" className="input" />
        <input name="printWidth" value={form.printWidth} onChange={handleChange} placeholder="Print Width" className="input" />
        <input name="printSpeed" value={form.printSpeed} onChange={handleChange} placeholder="Print Speed" className="input" />
        <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} placeholder="Rating (e.g. 4.5)" className="input" />
        <input name="reviewCount" type="number" value={form.reviewCount} onChange={handleChange} placeholder="Review Count" className="input" />
        <div className="flex justify-end gap-4 mt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
          <button type="button" onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cancel</button>
        </div>
      </form>
    </div>
  );
}
