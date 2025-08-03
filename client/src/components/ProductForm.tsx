import { useState } from "react";
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
    <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-lg text-white space-y-4">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required />
      <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="Price" required />
      <input name="badge" value={form.badge} onChange={handleChange} placeholder="Badge (e.g. NEW, ECO)" />
      <input name="printWidth" value={form.printWidth} onChange={handleChange} placeholder="Print Width" />
      <input name="printSpeed" value={form.printSpeed} onChange={handleChange} placeholder="Print Speed" />
      <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} placeholder="Rating (e.g. 4.5)" />
      <input name="reviewCount" type="number" value={form.reviewCount} onChange={handleChange} placeholder="Review Count" required />
      <button type="submit" className="btn-gradient px-4 py-2 rounded">Save</button>
      <button type="button" onClick={onCancel} className="bg-red-500 px-4 py-2 rounded">Cancel</button>
    </form>
  );
}
