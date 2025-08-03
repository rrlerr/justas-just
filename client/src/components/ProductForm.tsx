import { useState } from "react";
import axios from "axios";

interface ProductFormProps {
  initialData?: any;
  onSubmit: () => void;
  onCancel: () => void;
}

const badgeOptions = ["", "NEW", "ECO", "PREMIUM", "HOT", "BESTSELLER", "3D READY"];

export default function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    imageFile: null as File | null,
    imagePreview: initialData?.image || "",
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setForm((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: preview,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrl = form.imagePreview;

    // Simulate image upload (replace with your logic)
    if (form.imageFile) {
      const uploadData = new FormData();
      uploadData.append("file", form.imageFile);
      // Example: upload to Supabase or Cloudinary, etc.
      // const { data } = await axios.post("/upload", uploadData);
      // imageUrl = data.url;
    }

    const payload = {
      name: form.name,
      description: form.description,
      image: imageUrl,
      price: form.price,
      badge: form.badge,
      printWidth: form.printWidth,
      printSpeed: form.printSpeed,
      rating: form.rating,
      reviewCount: form.reviewCount,
    };

    if (initialData) {
      await axios.put(`/api/products/${initialData.id}`, payload);
    } else {
      await axios.post("/api/products", payload);
    }

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-lg text-white space-y-4">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />

      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {form.imagePreview && (
        <img src={form.imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
      )}

      <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="Price" required />

      {/* Badge Dropdown */}
      <select name="badge" value={form.badge} onChange={handleChange}>
        {badgeOptions.map((option) => (
          <option key={option} value={option}>{option || "Select Badge"}</option>
        ))}
      </select>

      <input name="printWidth" value={form.printWidth} onChange={handleChange} placeholder="Print Width" />
      <input name="printSpeed" value={form.printSpeed} onChange={handleChange} placeholder="Print Speed" />
      <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} placeholder="Rating" />
      <input name="reviewCount" type="number" value={form.reviewCount} onChange={handleChange} placeholder="Review Count" required />

      <button type="submit" className="btn-gradient px-4 py-2 rounded">Save</button>
      <button type="button" onClick={onCancel} className="bg-red-500 px-4 py-2 rounded">Cancel</button>
    </form>
  );
}
