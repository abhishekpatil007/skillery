"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlistStore";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    price: number;
    originalPrice?: number;
    thumbnail: string;
    rating: number;
    students: number;
    duration: string;
    level: string;
    category: string;
  };
  variant?: "default" | "icon" | "text";
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export function WishlistButton({ 
  course, 
  variant = "default", 
  size = "md",
  className,
  showText = true 
}: WishlistButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  
  const isWishlisted = isInWishlist(course.id);

  const handleToggle = () => {
    setIsAnimating(true);
    
    if (isWishlisted) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist(course);
    }
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getButtonContent = () => {
    if (variant === "icon") {
      return (
        <Heart 
          className={cn(
            "h-4 w-4 transition-all duration-200",
            isWishlisted && "fill-red-500 text-red-500",
            isAnimating && "scale-110"
          )} 
        />
      );
    }

    if (variant === "text") {
      return (
        <span className="flex items-center space-x-2">
          <Heart 
            className={cn(
              "h-4 w-4 transition-all duration-200",
              isWishlisted && "fill-red-500 text-red-500",
              isAnimating && "scale-110"
            )} 
          />
          {showText && (
            <span>
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </span>
          )}
        </span>
      );
    }

    return (
      <span className="flex items-center space-x-2">
        <Heart 
          className={cn(
            "h-4 w-4 transition-all duration-200",
            isWishlisted && "fill-red-500 text-red-500",
            isAnimating && "scale-110"
          )} 
        />
        {showText && (
          <span>
            {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
          </span>
        )}
      </span>
    );
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-8 px-2 text-xs";
      case "lg":
        return "h-12 px-4 text-base";
      default:
        return "h-10 px-3 text-sm";
    }
  };

  return (
    <Button
      onClick={handleToggle}
      variant={isWishlisted ? "default" : "outline"}
      className={cn(
        getSizeClasses(),
        "transition-all duration-200",
        isWishlisted 
          ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" 
          : "hover:bg-red-50 hover:text-red-600 hover:border-red-200",
        isAnimating && "scale-105",
        className
      )}
    >
      {getButtonContent()}
    </Button>
  );
}
