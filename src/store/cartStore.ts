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
  addItem: (item: CartItem, navigate?: (path: string) => void) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  toggleCart: () => void;
  getOutOfStockItems: () => CartItem[];
  hasOutOfStockItems: () => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem, navigate) => {
        set((state) => {
          // Check if item is out of stock
          if (newItem.stock === 0) {
            return state; // Don't add out of stock items
          }

          const existingItem = state.items.find(
            (item) => 
              item.id === newItem.id && 
              item.size === newItem.size && 
              item.color === newItem.color
          );

          let updatedItems;
          if (existingItem) {
            // Update existing item quantity, but don't exceed stock
            updatedItems = state.items.map((item) =>
              item.id === newItem.id && 
              item.size === newItem.size && 
              item.color === newItem.color
                ? { 
                    ...item, 
                    quantity: Math.min(item.quantity + newItem.quantity, newItem.stock),
                    stock: newItem.stock // Update stock info
                  }
                : item
            );
          } else {
            // Add new item with stock validation
            updatedItems = [...state.items, {
              ...newItem,
              quantity: Math.min(newItem.quantity, newItem.stock)
            }];
          }

          // Auto redirect to checkout only if navigate function is provided
          if (navigate) {
            setTimeout(() => {
              navigate('/checkout');
            }, 500);
          }

          return { items: updatedItems };
        });
      },
      
      removeItem: (id, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.size === size && item.color === color)
          ),
        })),
      
      updateQuantity: (id, size, color, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.size === size && item.color === color
              ? { 
                  ...item, 
                  quantity: Math.min(Math.max(0, quantity), item.stock) 
                }
              : item
          ).filter(item => item.quantity > 0), // Remove items with 0 quantity
        })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getOutOfStockItems: () => {
        const { items } = get();
        return items.filter(item => item.stock === 0);
      },

      hasOutOfStockItems: () => {
        const { items } = get();
        return items.some(item => item.stock === 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
