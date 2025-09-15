"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <ShoppingCart className="h-12 w-12 text-gray-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Your cart is empty
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven&apos;t added any courses to your cart yet. 
        Start exploring our catalog to find amazing courses!
      </p>
      
      <Button asChild size="lg" className="bg-brand hover:bg-brand-600">
        <Link href="/catalog" className="flex items-center gap-2">
          Browse Courses
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
