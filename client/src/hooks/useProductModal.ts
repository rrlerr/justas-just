import { useState, useCallback } from "react";
import { Product } from "@/types/product";

interface ProductModalStore {
  isOpen: boolean;
  product: Product | null;
  openModal: (product: Product) => void;
  closeModal: () => void;
}

let globalStore: ProductModalStore | null = null;
const listeners = new Set<() => void>();

const createStore = (): ProductModalStore => ({
  isOpen: false,
  product: null,
  openModal: (product: Product) => {
    if (globalStore) {
      globalStore.isOpen = true;
      globalStore.product = product;
      document.body.style.overflow = 'hidden';
      listeners.forEach(listener => listener());
    }
  },
  closeModal: () => {
    if (globalStore) {
      globalStore.isOpen = false;
      globalStore.product = null;
      document.body.style.overflow = 'auto';
      listeners.forEach(listener => listener());
    }
  },
});

export const useProductModal = () => {
  if (!globalStore) {
    globalStore = createStore();
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

  return globalStore;
};
