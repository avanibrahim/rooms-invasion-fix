import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find(
          item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
        );

        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
                ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
                : item
            )
          });
        } else {
          set({
            items: [...items, { ...newItem, quantity: 1 }]
          });
        }
      },

      removeItem: (id, size, color) => {
        set({
          items: get().items.filter(
            item => !(item.id === id && item.size === size && item.color === color)
          )
        });
      },

      updateQuantity: (id, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size, color);
          return;
        }

        set({
          items: get().items.map(item =>
            item.id === id && item.size === size && item.color === color
              ? { ...item, quantity: Math.min(quantity, item.stock) }
              : item
          )
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);
