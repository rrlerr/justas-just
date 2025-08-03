// server/index.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './auth';
import userRoutes from './users';
import productRoutes from './products';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
