// server/routes/products.ts
import express from "express";
import supabase from "../utils/supabase";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST create a new product
router.post("/", async (req, res) => {
  const {
    name,
    description,
    price,
    image,
    badge,
    rating,
    reviewCount,
    printWidth,
    printSpeed,
    resolution,
    features, // expect an array or comma-separated string
  } = req.body;

  const { data, error } = await supabase.from("products").insert([
    {
      name,
      description,
      price,
      image,
      badge,
      rating,
      reviewCount,
      printWidth,
      printSpeed,
      resolution,
      features,
    },
  ]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// PUT update a product by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const {
    name,
    description,
    price,
    image,
    badge,
    rating,
    reviewCount,
    printWidth,
    printSpeed,
    resolution,
    features,
  } = req.body;

  const { data, error } = await supabase
    .from("products")
    .update({
      name,
      description,
      price,
      image,
      badge,
      rating,
      reviewCount,
      printWidth,
      printSpeed,
      resolution,
      features,
    })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send(); // No content
});

export default router;
