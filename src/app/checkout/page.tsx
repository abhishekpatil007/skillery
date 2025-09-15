"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Container } from "@/components/ui/Container";
import { BillingForm } from "@/components/checkout/BillingForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CheckoutFormData, Order } from "@/types/cart";
import { CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { getItemCount, createOrder } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  
  const itemCount = getItemCount();
  
  const handleSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order
      const newOrder = await createOrder(data.billingAddress, data.paymentMethod);
      setOrder(newOrder);
      
      // Redirect to success page
      router.push(`/checkout/success?order=${newOrder.orderNumber}`);
    } catch (error) {
      console.error('Checkout failed:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };
  
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
            <CreditCard className="h-8 w-8 text-brand-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Checkout
            </h1>
          </div>
          <p className="text-gray-600">
            Complete your purchase securely
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <BillingForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
        
        {/* Back to Cart */}
        <div className="mt-8">
          <Link 
            href="/cart" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
        </div>
      </Container>
    </div>
  );
}
