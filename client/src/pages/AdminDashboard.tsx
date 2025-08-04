// client/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { supabase } from "../utils/supabase";

const AdminDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fetch products safely
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error("❌ Failed to load products:", error.message);
      } else {
        setProducts(data || []);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Add or update product
  const handleSave = async (product: any) => {
    try {
      let response;
      if (product.id) {
        response = await supabase.from('products').update(product).eq('id', product.id);
      } else {
        response = await supabase.from('products').insert([product]);
      }

      if (response.error) throw response.error;

      const { data: updatedData } = await supabase.from('products').select('*');
      setProducts(updatedData || []);
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("❌ Failed to save product:", err);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(products.filter((p) => p.id !== id));
    } else {
      console.error("❌ Failed to delete:", error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => {
          setSelectedProduct(null);
          setIsModalOpen(true);
        }}
      >
        ➕ Add Product
      </button>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isEditable
              onEdit={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <ProductForm
          initialData={selectedProduct}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
