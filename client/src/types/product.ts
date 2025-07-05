export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  printWidth?: string;
  printSpeed?: string;
  resolution?: string;
  badge?: string;
  features?: string[];
  inStock: boolean;
  rating: string;
  reviewCount: number;
  createdAt: Date;
}
