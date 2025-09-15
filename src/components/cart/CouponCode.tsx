"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/lib/currency";
import { CheckCircle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function CouponCode() {
  const { appliedCoupon, applyCoupon, removeCoupon, getTotals } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const totals = getTotals();
  
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      const result = await applyCoupon(couponCode.trim());
      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message,
      });
      
      if (result.success) {
        setCouponCode("");
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to apply coupon. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRemoveCoupon = () => {
    removeCoupon();
    setMessage(null);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyCoupon();
    }
  };

  return (
    <div className="space-y-4">
      {/* Coupon Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || !!appliedCoupon}
          className="flex-1"
        />
        <Button
          onClick={handleApplyCoupon}
          disabled={!couponCode.trim() || isLoading || !!appliedCoupon}
          size="sm"
        >
          {isLoading ? "Applying..." : "Apply"}
        </Button>
      </div>
      
      {/* Applied Coupon */}
      {appliedCoupon && (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {appliedCoupon.code} applied
            </span>
            <span className="text-sm text-green-600">
              -{formatCurrency(appliedCoupon.discountAmount)}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveCoupon}
            className="text-green-600 hover:text-green-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Message */}
      {message && (
        <div className={cn(
          "flex items-center gap-2 p-3 rounded-lg text-sm",
          message.type === 'success' 
            ? "bg-green-50 border border-green-200 text-green-800"
            : "bg-red-50 border border-red-200 text-red-800"
        )}>
          {message.type === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <span>{message.text}</span>
        </div>
      )}
      
      {/* Savings Banner */}
      {totals.savings > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              Total Savings
            </span>
            <span className="text-lg font-bold text-blue-900">
              {formatCurrency(totals.savings)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
