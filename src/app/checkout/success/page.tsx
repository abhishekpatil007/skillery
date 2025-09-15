"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { CheckCircle, Download, Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          
          {orderNumber && (
            <p className="text-sm text-gray-500 mb-8">
              Order Number: <span className="font-mono font-semibold">{orderNumber}</span>
            </p>
          )}
          
          {/* Order Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What&apos;s Next?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Check your email</h4>
                  <p className="text-sm text-gray-600">
                    We&apos;ve sent you a confirmation email with your order details and course access instructions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Access your courses</h4>
                  <p className="text-sm text-gray-600">
                    Your courses are now available in your dashboard. Start learning immediately!
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-semibold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Download your receipt</h4>
                  <p className="text-sm text-gray-600">
                    Keep a copy of your receipt for your records and tax purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-brand hover:bg-brand-600">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Receipt
              </Link>
            </Button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              Need Help?
            </h4>
            <p className="text-sm text-blue-800">
              If you have any questions about your order or need technical support, 
              please contact our{" "}
              <Link href="/support" className="underline hover:no-underline">
                support team
              </Link>{" "}
              or visit our{" "}
              <Link href="/help" className="underline hover:no-underline">
                help center
              </Link>.
            </p>
          </div>
          
          {/* Back to Home */}
          <div className="mt-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="mx-auto w-20 h-20 bg-gray-200 rounded-full mb-6"></div>
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-8"></div>
            </div>
          </div>
        </Container>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
