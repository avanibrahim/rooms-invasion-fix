
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderFormData {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

interface OrderStore {
  orderData: OrderFormData | null;
  isOrderFormOpen: boolean;
  setOrderData: (data: OrderFormData) => void;
  clearOrderData: () => void;
  openOrderForm: () => void;
  closeOrderForm: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orderData: null,
      isOrderFormOpen: false,
      
      setOrderData: (data) => set({ orderData: data }),
      clearOrderData: () => set({ orderData: null }),
      openOrderForm: () => set({ isOrderFormOpen: true }),
      closeOrderForm: () => set({ isOrderFormOpen: false }),
    }),
    {
      name: 'order-storage',
    }
  )
);
