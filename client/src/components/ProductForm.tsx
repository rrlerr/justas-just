import { useState, useEffect } from "react";

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
}

interface Props {
  initialData?: Product;
  onSubmit: (data: Product) => void;
  onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: Props) {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 p-6 rounded-lg text-white">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        className="w-full p-2 rounded bg-white/5 border border-white/20"
        value={product.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full p-2 rounded bg-white/5 border border-white/20"
        value={product.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        className="w-full p-2 rounded bg-white/5 border border-white/20"
        value={product.price}
        onChange={handleChange}
        required
      />
      <div className="flex gap-2">
        <button type="submit" className="btn-gradient px-4 py-2 rounded">Save</button>
        <button type="button" onClick={onCancel} className="bg-red-500 px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
}
