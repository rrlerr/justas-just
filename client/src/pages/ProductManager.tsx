// client/src/pages/ProductManager.tsx
import React, { useEffect, useState } from 'react';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:3001/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = async () => {
    await fetch('http://localhost:3001/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) }),
    });
    setNewProduct({ name: '', price: '', image: '' });
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/products/delete/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>
      <div className="mb-4">
        <input
          placeholder="Name"
          value={newProduct.name}
          onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))}
          className="border p-1 mr-2"
        />
        <input
          placeholder="Price"
          value={newProduct.price}
          onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))}
          className="border p-1 mr-2"
        />
        <input
          placeholder="Image URL"
          value={newProduct.image}
          onChange={e => setNewProduct(p => ({ ...p, image: e.target.value }))}
          className="border p-1 mr-2"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p: any) => (
          <div key={p.id} className="border p-2">
            <img src={p.image} alt={p.name} className="w-full h-32 object-cover mb-2" />
            <h4 className="font-bold">{p.name}</h4>
            <p>₹{p.price}</p>
            <button
              onClick={() => handleDelete(p.id)}
              className="mt-2 text-sm bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
