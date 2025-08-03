// server/products.ts
import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json());

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

let products: Product[] = [
  { id: 1, name: "Sample Product", price: 100, image: "https://via.placeholder.com/150" }
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Add product
router.post('/add', (req, res) => {
  const { name, price, image } = req.body;
  const newProduct = {
    id: Date.now(),
    name,
    price,
    image
  };
  products.push(newProduct);
  res.json(newProduct);
});

// Edit product
router.put('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Delete product
router.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.sendStatus(200);
});

export default router;
