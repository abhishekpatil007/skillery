"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/currency";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

export function TotalsCard() {
  const { getTotals, getItemCount } = useCartStore();
  const totals = getTotals();
  const itemCount = getItemCount();
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h3>
      
      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Subtotal ({itemCount} {itemCount === 1 ? 'course' : 'courses'})
          </span>
          <span className="font-medium">
            {formatCurrency(totals.subtotal)}
          </span>
        </div>
        
        {/* Course Discounts */}
        {totals.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Course discounts</span>
            <span className="text-green-600 font-medium">
              -{formatCurrency(totals.discount)}
            </span>
          </div>
        )}
        
        {/* Coupon Discount */}
        {totals.couponDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Coupon discount</span>
            <span className="text-green-600 font-medium">
              -{formatCurrency(totals.couponDiscount)}
            </span>
          </div>
        )}
        
        {/* Divider */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>
        
        {/* Total Savings */}
        {totals.savings > 0 && (
          <div className="text-center text-sm text-green-600 font-medium">
            You save {formatCurrency(totals.savings)}!
          </div>
        )}
      </div>
      
      {/* CTA Button */}
      <Button 
        asChild 
        variant="premium"
        size="lg"
        className="w-full mt-6 font-bold rounded-xl shadow-lg hover:shadow-purple-500/40 transition-all duration-200 hover:scale-105 active:scale-95 group relative overflow-hidden"
      >
        <Link href="/checkout" className="flex items-center justify-center gap-2">
          <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </Button>
      
      {/* Security badges */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>30-day guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
