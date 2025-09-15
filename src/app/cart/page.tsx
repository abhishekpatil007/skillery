"use client";

import { useCartStore } from "@/store/cartStore";
import { Container } from "@/components/ui/Container";
import { CartItem } from "@/components/cart/CartItem";
import { CouponCode } from "@/components/cart/CouponCode";
import { TotalsCard } from "@/components/cart/TotalsCard";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { items, getItemCount } = useCartStore();
  const itemCount = getItemCount();
  
  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          <EmptyCart />
        </Container>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="h-8 w-8 text-brand-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
          </div>
          <p className="text-gray-600">
            {itemCount} {itemCount === 1 ? 'course' : 'courses'} in your cart
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            {/* Coupon Code Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Have a coupon code?
              </h3>
              <CouponCode />
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <TotalsCard />
          </div>
        </div>
      </Container>
    </div>
  );
}
