import express from "express";
import db from "../utils/db";

const router = express.Router();

// Edit product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;

  try {
    const { data, error } = await db
      .from("products")
      .update({ name, price, description, image })
      .eq("id", id);

    if (error) throw error;

    res.json({ message: "Product updated", data });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await db.from("products").delete().eq("id", id);

    if (error) throw error;

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

export default router;
