// server/routes/products.ts
import express from "express";
import supabase from "../utils/supabase";

const router = express.Router();

// GET all products
router.get("/", async (_req, res) => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// CREATE a new product
router.post("/", async (req, res) => {
  const newProduct = req.body;
  const { data, error } = await supabase.from("products").insert([newProduct]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// UPDATE a product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { data, error } = await supabase
    .from("products")
    .update(updatedData)
    .eq("id", id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: "Product deleted" });
});

export default router;
