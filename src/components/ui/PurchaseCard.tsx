"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { useCartStore } from "@/store/cartStore";
import { CourseDetail } from "@/types/course-detail";
import { 
  ShoppingCart, 
  CreditCard, 
  Shield, 
  Tag,
  Clock,
  FileText,
  Download,
  Award,
  Infinity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PurchaseCardProps {
  course: CourseDetail;
  className?: string;
}

export function PurchaseCard({ course, className }: PurchaseCardProps) {
  const [couponCode, setCouponCode] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);
  const { addItem, items } = useCartStore();
  
  const isInCart = items.some(item => item.id === course.id);
  const discountPercentage = course.price.original 
    ? Math.round(((course.price.original - course.price.current) / course.price.original) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: course.id,
      courseId: course.id,
      title: course.title,
      instructor: {
        name: course.instructor.name,
        avatar: course.instructor.image
      },
      thumbnail: course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center',
      price: course.price.current,
      originalPrice: course.price.original,
      discountPercentage: course.price.original ? Math.round(((course.price.original - course.price.current) / course.price.original) * 100) : undefined,
      duration: `${course.includes.hours} hours`,
      rating: course.rating.average,
      studentsCount: course.studentsCount,
      language: course.language,
      level: course.level
    });
  };

  const handleBuyNow = () => {
    if (!isInCart) {
      handleAddToCart();
    }
    // Navigate to checkout
    console.log("Navigate to checkout");
  };

  return (
    <div className={cn(
      "bg-white border border-gray-200 rounded-lg p-6 shadow-sm",
      className
    )}>
      {/* Price Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl font-bold text-gray-900">
            ${course.price.current}
          </span>
          {course.price.original && (
            <>
              <span className="text-xl text-gray-500 line-through">
                ${course.price.original}
              </span>
              <Badge variant="destructive" className="text-xs">
                {discountPercentage}% off
              </Badge>
            </>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Price includes lifetime access
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-6">
        <Button 
          onClick={handleAddToCart}
          disabled={isInCart}
          className="w-full h-12 text-base font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 group relative overflow-hidden"
          variant={isInCart ? "outline" : "gradient"}
        >
          {!isInCart && (
            <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {isInCart ? "Added to Cart" : "Add to Cart"}
          </span>
        </Button>
        
        <Button 
          onClick={handleBuyNow}
          variant="premium"
          className="w-full h-12 text-base font-bold rounded-xl shadow-lg hover:shadow-purple-500/40 transition-all duration-200 hover:scale-105 active:scale-95 group relative overflow-hidden"
        >
          <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Buy Now
          </span>
        </Button>
      </div>

      {/* 30-Day Guarantee */}
      <div className="flex items-center gap-2 mb-6 p-3 bg-green-50 rounded-lg">
        <Shield className="h-5 w-5 text-green-600" />
        <span className="text-sm text-green-800 font-medium">
          30-Day Money-Back Guarantee
        </span>
      </div>

      {/* Coupon Code */}
      <div className="mb-6">
        <button
          onClick={() => setShowCouponInput(!showCouponInput)}
          className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 font-medium"
        >
          <Tag className="h-4 w-4" />
          Apply coupon
        </button>
        
        {showCouponInput && (
          <div className="mt-3 flex gap-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1"
            />
            <Button size="sm" variant="outline">
              Apply
            </Button>
          </div>
        )}
      </div>

      {/* Course Includes */}
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-gray-900">This course includes:</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{course.includes?.hours || course.hours || 0} hours on-demand video</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="h-4 w-4" />
            <span>{course.includes?.articles || 10} articles</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Download className="h-4 w-4" />
            <span>{course.includes?.resources || 15} downloadable resources</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Infinity className="h-4 w-4" />
            <span>Full {course.includes?.lifetimeAccess ? 'lifetime' : 'course'} access</span>
          </div>
          {(course.includes?.certificate || course.hasCertificate) && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award className="h-4 w-4" />
              <span>Certificate of completion</span>
            </div>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="border-t pt-4">
        <RatingStars 
          rating={course.rating.average} 
          count={course.rating.count}
          size="sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          {course.studentsCount.toLocaleString()} students
        </p>
      </div>
    </div>
  );
}
