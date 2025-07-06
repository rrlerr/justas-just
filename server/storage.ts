import { users, products, cartItems, type User, type InsertUser, type Product, type InsertProduct, type CartItem, type InsertCartItem } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart methods
  getCartItems(userId: number): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private currentUserId: number;
  private currentProductId: number;
  private currentCartId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCartId = 1;
    
    this.seedProducts();
  }

  private seedProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Mimaki JV300-160",
        description: "Premium wide-format printer with exceptional color accuracy and reliability. Perfect for professional signage and graphics production.",
        price: "45999.00",
        image: "https://i.ytimg.com/vi/TFrAlI1A-70/maxresdefault.jpg",
        category: "wide-format",
        printWidth: "160cm",
        printSpeed: "105m²/h",
        resolution: "1440 x 1440 dpi",
        badge: "NEW",
        features: ["Advanced color management system", "Eco-friendly UV-LED curing technology", "Automated media handling", "Remote monitoring capabilities", "Multiple ink options available"],
        inStock: true,
        rating: "5.0",
        reviewCount: 24
      },
      {
        name: "Mimaki UJF-7151",
        description: "UV-LED flatbed printer for versatile material printing. Ideal for promotional items, packaging, and industrial applications.",
        price: "89999.00",
        image: "https://mimaki.com/archives/002/201511/e785af4bf78b1c179562049fdd025285.jpg=format&fit=crop&w=800&h=600",
        category: "uv-flatbed",
        printWidth: "711mm",
        printSpeed: "35m²/h",
        resolution: "1200 x 1200 dpi",
        badge: "ECO",
        features: ["UV-LED curing technology", "White ink printing", "Versatile material compatibility", "High-resolution printing", "Eco-friendly operation"],
        inStock: true,
        rating: "5.0",
        reviewCount: 18
      },
      {
        name: "Mimaki CJV300-160",
        description: "Integrated print and cut solution for maximum efficiency. Combines high-quality printing with precision cutting capabilities.",
        price: "65999.00",
        image: "https://i.ytimg.com/vi/TFrAlI1A-70/maxresdefault.jpg=format&fit=crop&w=800&h=600",
        category: "print-cut",
        printWidth: "160cm",
        printSpeed: "105m²/h",
        resolution: "1440 x 1440 dpi",
        badge: "PREMIUM",
        features: ["Integrated print and cut", "High-speed operation", "Precise cutting capabilities", "Advanced media handling", "Professional color output"],
        inStock: true,
        rating: "5.0",
        reviewCount: 31
      },
      {
        name: "Mimaki TS300P-1800",
        description: "High-speed textile printer for industrial applications. Designed for high-volume textile production with superior quality.",
        price: "125999.00",
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "textile",
        printWidth: "180cm",
        printSpeed: "720m²/h",
        resolution: "1080 x 1080 dpi",
        badge: "HOT",
        features: ["High-speed textile printing", "Industrial-grade construction", "Superior color reproduction", "Automated operation", "Low maintenance design"],
        inStock: true,
        rating: "5.0",
        reviewCount: 12
      },
      {
        name: "Mimaki JV100-160",
        description: "Reliable entry-level printer with professional results. Perfect for small to medium businesses entering the printing market.",
        price: "25999.00",
        image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "entry-level",
        printWidth: "160cm",
        printSpeed: "45m²/h",
        resolution: "1440 x 1440 dpi",
        badge: "BESTSELLER",
        features: ["Entry-level friendly", "Professional quality output", "Reliable operation", "Cost-effective solution", "Easy maintenance"],
        inStock: true,
        rating: "4.5",
        reviewCount: 45
      },
      {
        name: "Mimaki 3DUJ-553",
        description: "Revolutionary 3D UV inkjet printer for full-color models. Create stunning prototypes and models with over 10 million colors.",
        price: "299999.00",
        image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "3d-printing",
        printWidth: "508mm",
        printSpeed: "N/A",
        resolution: "1200 x 1200 dpi",
        badge: "3D READY",
        features: ["Full-color 3D printing", "Over 10 million colors", "UV inkjet technology", "High-precision modeling", "Professional prototyping"],
        inStock: true,
        rating: "5.0",
        reviewCount: 8
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).slice(0, 6);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      id,
      name: insertProduct.name,
      description: insertProduct.description,
      price: insertProduct.price,
      image: insertProduct.image,
      category: insertProduct.category,
      printWidth: insertProduct.printWidth ?? null,
      printSpeed: insertProduct.printSpeed ?? null,
      resolution: insertProduct.resolution ?? null,
      badge: insertProduct.badge ?? null,
      features: insertProduct.features ?? null,
      inStock: insertProduct.inStock ?? true,
      rating: insertProduct.rating ?? "5.0",
      reviewCount: insertProduct.reviewCount ?? 0,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  // Cart methods
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.userId === userId
    );
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartId++;
    const cartItem: CartItem = { 
      id,
      userId: insertCartItem.userId ?? null,
      productId: insertCartItem.productId ?? null,
      quantity: insertCartItem.quantity ?? 1,
      createdAt: new Date()
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }
}

export const storage = new MemStorage();
