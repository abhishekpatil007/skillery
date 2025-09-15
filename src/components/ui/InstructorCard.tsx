import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/ui/RatingStars";
import { CourseDetail } from "@/types/course-detail";
import { 
  Users, 
  BookOpen, 
  ExternalLink,
  Linkedin,
  Twitter,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InstructorCardProps {
  instructor: CourseDetail['instructor'];
  className?: string;
}

export function InstructorCard({ instructor, className }: InstructorCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg p-6", className)}>
      {/* Instructor Header */}
      <div className="flex items-start gap-4 mb-6">
        <img
          src={instructor.image}
          alt={instructor.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {instructor.name}
          </h3>
          <p className="text-gray-600 mb-3">
            {instructor.title || "Expert Instructor"}
          </p>
          <RatingStars 
            rating={instructor.rating || 4.5} 
            count={instructor.studentsCount || 1000}
            size="sm"
          />
        </div>
      </div>

      {/* Instructor Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Users className="h-6 w-6 text-gray-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(instructor.studentsCount || 1000)}
          </div>
          <div className="text-sm text-gray-600">Students</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <BookOpen className="h-6 w-6 text-gray-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {instructor.coursesCount || 5}
          </div>
          <div className="text-sm text-gray-600">Courses</div>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">About the instructor</h4>
        <p className="text-gray-700 leading-relaxed">
          {instructor.bio || "Experienced instructor passionate about teaching and helping students achieve their goals."}
        </p>
      </div>

      {/* Social Links */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Connect with {instructor.name.split(' ')[0]}</h4>
        <div className="flex gap-3">
          {instructor.socialLinks?.website && (
            <Button
              size="sm"
              variant="outline"
              asChild
              className="flex items-center gap-2"
            >
              <a href={instructor.socialLinks.website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4" />
                Website
              </a>
            </Button>
          )}
          {instructor.socialLinks?.linkedin && (
            <Button
              size="sm"
              variant="outline"
              asChild
              className="flex items-center gap-2"
            >
              <a href={instructor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          )}
          {instructor.socialLinks?.twitter && (
            <Button
              size="sm"
              variant="outline"
              asChild
              className="flex items-center gap-2"
            >
              <a href={instructor.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* View Profile Button */}
      <Button 
        className="w-full"
        variant="outline"
      >
        View Full Profile
        <ExternalLink className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
