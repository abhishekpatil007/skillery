import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

export function RatingStars({ 
  rating, 
  count, 
  size = "md", 
  showCount = true, 
  className 
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  // Validate and clamp rating between 0 and 5
  const validRating = Math.max(0, Math.min(5, isNaN(rating) ? 0 : rating));
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              "fill-yellow-400 text-yellow-400"
            )}
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star
              className={cn(
                sizeClasses[size],
                "text-gray-300"
              )}
            />
            <Star
              className={cn(
                sizeClasses[size],
                "fill-yellow-400 text-yellow-400 absolute inset-0 overflow-hidden"
              )}
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={i + fullStars + (hasHalfStar ? 1 : 0)}
            className={cn(
              sizeClasses[size],
              "text-gray-300"
            )}
          />
        ))}
      </div>
      {showCount && count && (
        <span className={cn(
          "text-gray-600 font-medium",
          textSizeClasses[size]
        )}>
          {rating.toFixed(1)} ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
