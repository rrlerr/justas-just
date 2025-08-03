import express from "express";
import db from "../utils/db";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const [products] = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Add a new product
router.post("/", async (req, res) => {
  const { name, description, image_url, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO products (name, description, image_url, price) VALUES (?, ?, ?, ?)",
      [name, description || "", image_url || "", price]
    );
    res.status(201).json({ id: (result as any).insertId });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Update an existing product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, image_url, price } = req.body;

  try {
    await db.query(
      "UPDATE products SET name = ?, description = ?, image_url = ?, price = ? WHERE id = ?",
      [name, description || "", image_url || "", price, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
