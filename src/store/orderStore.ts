import { create } from 'zustand';
import { CartItem } from './cartStore';

export interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderStore {
  orders: Order[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchOrders: () => (() => void) | undefined;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => Promise<void>;
  addTrackingNumber: (orderId: string, trackingNumber: string) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByCustomer: (customerEmail: string) => Order[];
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 'order-001',
    customerEmail: 'john@example.com',
    customerName: 'John Doe',
    customerPhone: '+62812345678',
    shippingAddress: {
      street: 'Jl. Sudirman No. 123',
      city: 'Jakarta',
      state: 'DKI Jakarta',
      zipCode: '10110',
      country: 'Indonesia'
    },
    items: [
      {
        id: 'product-1',
        name: 'Classic White T-Shirt',
        price: 150000,
        image: '/api/placeholder/300/300',
        size: 'M',
        color: 'White',
        quantity: 2,
        stock: 10
      }
    ],
    subtotal: 300000,
    shipping: 0,
    tax: 30000,
    total: 330000,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'bank_transfer',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'order-002',
    customerEmail: 'jane@example.com',
    customerName: 'Jane Smith',
    customerPhone: '+62812345679',
    shippingAddress: {
      street: 'Jl. Thamrin No. 456',
      city: 'Jakarta',
      state: 'DKI Jakarta',
      zipCode: '10230',
      country: 'Indonesia'
    },
    items: [
      {
        id: 'product-2',
        name: 'Denim Jacket',
        price: 350000,
        image: '/api/placeholder/300/300',
        size: 'L',
        color: 'Blue',
        quantity: 1,
        stock: 5
      }
    ],
    subtotal: 350000,
    shipping: 0,
    tax: 35000,
    total: 385000,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    trackingNumber: 'TRK123456789',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: () => {
    set({ loading: true, error: null });
    
    // Simulate API call
    setTimeout(() => {
      set({ 
        orders: mockOrders,
        loading: false 
      });
    }, 1000);

    // Return cleanup function (in real implementation, this would unsubscribe from real-time updates)
    return () => {
      console.log('Unsubscribed from orders');
    };
  },

  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newOrder: Order = {
        ...orderData,
        id: `order-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      set(state => ({
        orders: [newOrder, ...state.orders],
        loading: false
      }));

      return newOrder.id;
    } catch (error) {
      set({ 
        error: 'Failed to create order',
        loading: false 
      });
      throw error;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        orders: state.orders.map(order =>
          order.id === orderId
            ? { ...order, status, updatedAt: new Date().toISOString() }
            : order
        ),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: 'Failed to update order status',
        loading: false 
      });
      throw error;
    }
  },

  updatePaymentStatus: async (orderId, paymentStatus) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        orders: state.orders.map(order =>
          order.id === orderId
            ? { ...order, paymentStatus, updatedAt: new Date().toISOString() }
            : order
        ),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: 'Failed to update payment status',
        loading: false 
      });
      throw error;
    }
  },

  addTrackingNumber: async (orderId, trackingNumber) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        orders: state.orders.map(order =>
          order.id === orderId
            ? { 
                ...order, 
                trackingNumber, 
                status: 'shipped',
                updatedAt: new Date().toISOString() 
              }
            : order
        ),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: 'Failed to add tracking number',
        loading: false 
      });
      throw error;
    }
  },

  getOrderById: (orderId) => {
    return get().orders.find(order => order.id === orderId);
  },

  getOrdersByCustomer: (customerEmail) => {
    return get().orders.filter(order => order.customerEmail === customerEmail);
  }
}));

