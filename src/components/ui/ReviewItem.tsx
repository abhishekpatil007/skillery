import { RatingStars } from "@/components/ui/RatingStars";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseDetail } from "@/types/course-detail";
import { 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle,
  Flag
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewItemProps {
  review: CourseDetail['reviews'][0];
  onHelpful?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
  className?: string;
}

export function ReviewItem({ review, onHelpful, onReport, className }: ReviewItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={cn("border-b border-gray-200 py-6 last:border-b-0", className)}>
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={review.author?.image || review.userAvatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
            alt={review.author?.name || review.userName || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900">
                {review.author?.name || review.userName || "Anonymous User"}
              </h4>
              {(review.author?.verified || review.verified) && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <RatingStars 
                rating={review.rating} 
                size="sm" 
                showCount={false}
              />
              <span className="text-sm text-gray-500">
                {formatDate(review.date || review.createdAt || new Date().toISOString())}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {review.verified && (
            <Badge variant="secondary" className="text-xs">
              Verified Purchase
            </Badge>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onReport?.(review.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        {review.title && (
          <h5 className="font-semibold text-gray-900 mb-2">
            {review.title}
          </h5>
        )}
        <p className="text-gray-700 leading-relaxed">
          {review.content || "Great course! Highly recommended."}
        </p>
      </div>

      {/* Review Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onHelpful?.(review.id)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            Helpful ({review.helpful})
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            Not helpful
          </Button>
        </div>
      </div>
    </div>
  );
}
