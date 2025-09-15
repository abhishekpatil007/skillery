import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartTotals, AppliedCoupon, Coupon, Order, BillingAddress, PaymentMethod } from '@/types/cart';
import { apiService, handleApiError } from '@/lib/api';

interface CartStore {
  items: CartItem[];
  appliedCoupon?: AppliedCoupon;
  
  // Cart actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  
  // Coupon actions
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  
  // Totals and calculations
  getTotals: () => CartTotals;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getSavings: () => number;
  
  // Checkout actions
  createOrder: (billingAddress: BillingAddress, paymentMethod: PaymentMethod) => Promise<Order>;
}

// Mock coupons data
const MOCK_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minAmount: 50,
    maxDiscount: 100,
    isActive: true,
  },
  {
    code: 'SAVE20',
    discountType: 'percentage',
    value: 20,
    minAmount: 100,
    maxDiscount: 200,
    isActive: true,
  },
  {
    code: 'FLAT50',
    discountType: 'fixed',
    value: 50,
    minAmount: 200,
    isActive: true,
  },
];

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: undefined,
      
      addItem: (item: CartItem) => {
        const { items } = get();
        const existingItem = items.find(cartItem => cartItem.id === item.id);
        
        if (!existingItem) {
          set({ items: [...items, item] });
        }
      },
      
      removeItem: (id: string) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== id) });
      },
      
      clearCart: () => {
        set({ items: [], appliedCoupon: undefined });
      },
      
      getItemCount: () => {
        const { items } = get();
        return items.length;
      },
      
      applyCoupon: async (code: string) => {
        try {
          const { items } = get();
          const appliedCoupon = await apiService.applyCoupon({ code, cartItems: items });
          set({ appliedCoupon });
          
          return { 
            success: true, 
            message: `Coupon applied! You saved $${appliedCoupon.discountAmount.toFixed(2)}` 
          };
        } catch (error: unknown) {
          return { 
            success: false, 
            message: handleApiError(error as { code: string; message: string; statusCode: number }) 
          };
        }
      },
      
      removeCoupon: () => {
        set({ appliedCoupon: undefined });
      },
      
      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price, 0);
      },
      
      getDiscount: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const itemDiscount = item.originalPrice ? item.originalPrice - item.price : 0;
          return total + itemDiscount;
        }, 0);
      },
      
      getTotals: () => {
        const { getSubtotal, getDiscount, appliedCoupon } = get();
        const subtotal = getSubtotal();
        const discount = getDiscount();
        const couponDiscount = appliedCoupon?.discountAmount || 0;
        const total = subtotal - couponDiscount;
        const savings = discount + couponDiscount;
        
        return {
          subtotal,
          discount,
          couponDiscount,
          total,
          savings,
        };
      },
      
      getTotal: () => {
        const { getTotals } = get();
        return getTotals().total;
      },
      
      getSavings: () => {
        const { getTotals } = get();
        return getTotals().savings;
      },
      
      createOrder: async (billingAddress: BillingAddress, paymentMethod: PaymentMethod) => {
        try {
          const { items, appliedCoupon } = get();
          const order = await apiService.createOrder({
            items,
            billingAddress,
            paymentMethod,
            couponCode: appliedCoupon?.code,
          });
          
          // Clear cart after successful order
          set({ items: [], appliedCoupon: undefined });
          
          return order;
        } catch (error: unknown) {
          console.error('Failed to create order:', handleApiError(error as { code: string; message: string; statusCode: number }));
          throw error;
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);