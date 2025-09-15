export interface CartItem {
  id: string;
  courseId: string;
  title: string;
  instructor: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  duration: string;
  rating: number;
  studentsCount: number;
  language: string;
  level: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  expiresAt?: string;
  isActive: boolean;
}

export interface AppliedCoupon {
  code: string;
  discountAmount: number;
  discountType: 'percentage' | 'fixed';
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  couponDiscount: number;
  total: number;
  savings: number;
}

export interface BillingAddress {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state?: string;
  city: string;
  postalCode: string;
  address: string;
  phone?: string;
}

export interface PaymentMethod {
  type: 'card' | 'upi' | 'paypal';
  last4?: string;
  brand?: string;
  upiId?: string;
  paypalEmail?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  billingAddress: BillingAddress;
  paymentMethod: PaymentMethod;
  totals: CartTotals;
  appliedCoupon?: AppliedCoupon;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
}

export interface CheckoutFormData {
  billingAddress: BillingAddress;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  agreeToTerms: boolean;
  subscribeToNewsletter?: boolean;
}
