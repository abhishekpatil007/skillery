import { Button } from "@/components/ui/button";
import { InstructorReview } from "@/types/instructor";
import { 
  Star, 
  ThumbsUp, 
  Reply, 
  MoreHorizontal,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewRowProps {
  review: InstructorReview;
  onReply?: (reviewId: string) => void;
  onMarkHelpful?: (reviewId: string) => void;
  onViewCourse?: (courseId: string) => void;
  className?: string;
}

export function ReviewRow({ 
  review, 
  onReply, 
  onMarkHelpful, 
  onViewCourse,
  className 
}: ReviewRowProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <div className={cn(
      "bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors",
      className
    )}>
      <div className="flex items-start gap-4">
        {/* Student Avatar */}
        <img
          src={review.studentAvatar}
          alt={review.studentName}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-gray-900">{review.studentName}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewCourse?.(review.courseId)}
                className="text-blue-600 hover:text-blue-700 p-0 h-auto"
              >
                {review.courseTitle}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {getRatingStars(review.rating)}
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(review.createdAt)}
              </span>
            </div>
          </div>

          {/* Review Comment */}
          <p className="text-gray-700 mb-3 leading-relaxed">
            {review.comment}
          </p>

          {/* Instructor Response */}
          {review.instructorResponse && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Your Response</span>
                <span className="text-xs text-blue-600">
                  {formatDate(review.instructorResponse.createdAt)}
                </span>
              </div>
              <p className="text-sm text-blue-800">
                {review.instructorResponse.content}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMarkHelpful?.(review.id)}
              className={cn(
                "flex items-center gap-1 text-sm",
                review.isHelpful 
                  ? "text-blue-600 hover:text-blue-700" 
                  : "text-gray-600 hover:text-gray-700"
              )}
            >
              <ThumbsUp className="h-4 w-4" />
              {review.helpfulCount} helpful
            </Button>
            
            {!review.instructorResponse && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReply?.(review.id)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-700"
              >
                <Reply className="h-4 w-4" />
                Reply
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-600"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
