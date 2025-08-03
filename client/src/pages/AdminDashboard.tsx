import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import ProductCard from "@/components/ProductCard";
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

type Purchase = {
  id: string;
  email: string;
  productName: string;
  timestamp: string;
};

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [, navigate] = useLocation();
navigate("/somewhere");


  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    const [prodRes, purRes, msgRes] = await Promise.all([
      axios.get("/api/products"),
      axios.get("/api/purchases"),
      axios.get("/api/messages"),
    ]);
    setProducts(prodRes.data);
    setPurchases(purRes.data);
    setMessages(msgRes.data);
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await axios.delete(`/api/products/${id}`);
    fetchAll();
  };

  const handleEdit = (product: Product) => {
    navigate(`/edit-product/${product.id}`);
  };

  return (
    <div className="p-6 space-y-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card><CardContent className="p-4"><p className="text-xl font-semibold">Products</p><p className="text-2xl">{products.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xl font-semibold">Purchases</p><p className="text-2xl">{purchases.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xl font-semibold">Messages</p><p className="text-2xl">{messages.length}</p></CardContent></Card>
      </div>

      {/* Product Management */}
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Button onClick={() => navigate("/add-product")}>Add New Product</Button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
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

      {/* Purchase Records */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-2">Purchase Records</h2>
        <Button variant="outline" className="mb-4">Export to Excel</Button>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-white">
            <thead><tr className="bg-gray-800"><th className="px-4 py-2">Email</th><th className="px-4 py-2">Product</th><th className="px-4 py-2">Date</th></tr></thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={p.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{p.email}</td>
                  <td className="px-4 py-2">{p.productName}</td>
                  <td className="px-4 py-2">{new Date(p.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Messages */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-2">Contact Messages</h2>
        <Button variant="outline" className="mb-4">Export to Excel</Button>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-white">
            <thead><tr className="bg-gray-800"><th className="px-4 py-2">Name</th><th className="px-4 py-2">Email</th><th className="px-4 py-2">Message</th><th className="px-4 py-2">Date</th></tr></thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{m.name}</td>
                  <td className="px-4 py-2">{m.email}</td>
                  <td className="px-4 py-2">{m.message}</td>
                  <td className="px-4 py-2">{new Date(m.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
