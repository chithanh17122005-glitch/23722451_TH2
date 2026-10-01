import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT } from '@constants/student';
import { Product } from '@services/productApi';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  changeQty: (productId: string, delta: number) => void;
  clear: () => void;
  totalQuantity: () => number;
  totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product: Product) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((i) => i.product.id === product.id);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          set({ items: updated });
        } else {
          set({ items: [...currentItems, { product, quantity: 1 }] });
        }
      },

      remove: (productId: string) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },

      changeQty: (productId: string, delta: number) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((i) => i.product.id === productId);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          const newQty = updated[existingIndex].quantity + delta;
          if (newQty <= 0) {
            set({ items: currentItems.filter((i) => i.product.id !== productId) });
          } else {
            updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
            set({ items: updated });
          }
        }
      },

      clear: () => {
        set({ items: [] });
      },

      totalQuantity: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalAmount: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },
    }),
    {
      name: `ktxgo-cart-${STUDENT.mssv}`,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
