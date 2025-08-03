import { useState, useCallback } from "react";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  itemCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

let globalStore: CartStore | null = null;
const listeners = new Set<() => void>();

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (parseFloat(item.product.price) * item.quantity), 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

const createStore = (): CartStore => ({
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0,
  addToCart: (product: Product, quantity = 1) => {
    if (globalStore) {
      const existingItem = globalStore.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        globalStore.items.push({
          id: `${product.id}-${Date.now()}`,
          product,
          quantity
        });
      }
      
      globalStore.total = calculateTotal(globalStore.items);
      globalStore.itemCount = calculateItemCount(globalStore.items);
      
      // Store in localStorage
      localStorage.setItem('cart', JSON.stringify(globalStore.items));
      
      listeners.forEach(listener => listener());
    }
  },
  removeFromCart: (id: string) => {
    if (globalStore) {
      globalStore.items = globalStore.items.filter(item => item.id !== id);
      globalStore.total = calculateTotal(globalStore.items);
      globalStore.itemCount = calculateItemCount(globalStore.items);
      
      localStorage.setItem('cart', JSON.stringify(globalStore.items));
      listeners.forEach(listener => listener());
    }
  },
  updateQuantity: (id: string, quantity: number) => {
    if (globalStore) {
      const item = globalStore.items.find(item => item.id === id);
      if (item) {
        if (quantity <= 0) {
          globalStore.removeFromCart(id);
        } else {
          item.quantity = quantity;
          globalStore.total = calculateTotal(globalStore.items);
          globalStore.itemCount = calculateItemCount(globalStore.items);
          
          localStorage.setItem('cart', JSON.stringify(globalStore.items));
          listeners.forEach(listener => listener());
        }
      }
    }
  },
  clearCart: () => {
    if (globalStore) {
      globalStore.items = [];
      globalStore.total = 0;
      globalStore.itemCount = 0;
      
      localStorage.removeItem('cart');
      listeners.forEach(listener => listener());
    }
  },
  openCart: () => {
    if (globalStore) {
      globalStore.isOpen = true;
      document.body.style.overflow = 'hidden';
      listeners.forEach(listener => listener());
    }
  },
  closeCart: () => {
    if (globalStore) {
      globalStore.isOpen = false;
      document.body.style.overflow = 'auto';
      listeners.forEach(listener => listener());
    }
  },
});

export const useCart = () => {
  const { toast } = useToast();
  
  if (!globalStore) {
    globalStore = createStore();
    
    // Load from localStorage on initialization
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        globalStore.items = JSON.parse(savedCart);
        globalStore.total = calculateTotal(globalStore.items);
        globalStore.itemCount = calculateItemCount(globalStore.items);
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }

  const [, forceUpdate] = useState({});

  const listener = useCallback(() => {
    forceUpdate({});
  }, []);

  useState(() => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  });

  // Enhanced addToCart with toast notification
  const addToCart = useCallback((product: Product, quantity = 1) => {
    globalStore?.addToCart(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  }, [toast]);

  return {
    ...globalStore,
    addToCart,
  };
};