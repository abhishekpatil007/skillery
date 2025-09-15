"use client";

import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/currency";
import { CartItem } from "@/components/cart/CartItem";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, BookOpen } from "lucide-react";
import Image from "next/image";

export function OrderSummary() {
  const { items, getTotals, appliedCoupon } = useCartStore();
  const totals = getTotals();
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h3>
      
      {/* Course Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-16 h-12 flex-shrink-0">
              {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="64px"
            className="object-cover rounded-md"
          />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center">
                  <div className="w-4 h-4 bg-white/80 rounded-full flex items-center justify-center">
                    <BookOpen className="h-3 w-3 text-gray-600" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                {item.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                by {item.instructor.name}
              </p>
              
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{item.studentsCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {item.level}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {item.language}
                </Badge>
              </div>
            </div>
            
            <div className="text-right">
              {item.originalPrice && item.originalPrice > item.price && (
                <div className="text-xs text-gray-500 line-through">
                  {formatCurrency(item.originalPrice)}
                </div>
              )}
              <div className="font-semibold text-gray-900">
                {formatCurrency(item.price)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Totals */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Subtotal ({items.length} {items.length === 1 ? 'course' : 'courses'})
          </span>
          <span className="font-medium">
            {formatCurrency(totals.subtotal)}
          </span>
        </div>
        
        {totals.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Course discounts</span>
            <span className="text-green-600 font-medium">
              -{formatCurrency(totals.discount)}
            </span>
          </div>
        )}
        
        {totals.couponDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Coupon discount</span>
            <span className="text-green-600 font-medium">
              -{formatCurrency(totals.couponDiscount)}
            </span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>
        
        {totals.savings > 0 && (
          <div className="text-center text-sm text-green-600 font-medium">
            You save {formatCurrency(totals.savings)}!
          </div>
        )}
      </div>
      
      {/* Applied Coupon */}
      {appliedCoupon && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-800">
              Coupon: {appliedCoupon.code}
            </span>
            <span className="text-sm text-green-600">
              -{formatCurrency(appliedCoupon.discountAmount)}
            </span>
          </div>
        </div>
      )}
      
      {/* Security badges */}
      <div className="mt-6 pt-4 border-t border-gray-200">
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
