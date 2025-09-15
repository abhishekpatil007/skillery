"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/currency";
import { CartItem as CartItemType } from "@/types/cart";
import { X, Heart, Clock, Users, Star, BookOpen } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem } = useCartStore();
  
  const priceInfo = formatPrice(item.price, item.originalPrice);
  
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  const handleMoveToWishlist = () => {
    // TODO: Implement move to wishlist functionality
    console.log('Move to wishlist:', item.id);
  };

  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white">
      {/* Thumbnail */}
      <div className="relative w-32 h-20 flex-shrink-0">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="128px"
            className="object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center">
            <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              by {item.instructor?.name || 'Unknown Instructor'}
            </p>
            
            {/* Course details */}
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{item.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{(item.studentsCount || 0).toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{(item.rating || 0).toFixed(1)}</span>
              </div>
            </div>
            
            {/* Level and Language */}
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {item.level || 'All Levels'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {item.language || 'English'}
              </Badge>
            </div>
          </div>
          
          {/* Price and Actions */}
          <div className="flex flex-col items-end gap-2 ml-4">
            <div className="text-right">
              {priceInfo.original && (
                <div className="text-sm text-gray-500 line-through">
                  {priceInfo.original}
                </div>
              )}
              <div className="text-lg font-bold text-gray-900">
                {priceInfo.current}
              </div>
              {priceInfo.discount && (
                <div className="text-sm text-green-600 font-medium">
                  {priceInfo.discount}
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMoveToWishlist}
                className="text-gray-600 hover:text-red-600"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-gray-600 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
