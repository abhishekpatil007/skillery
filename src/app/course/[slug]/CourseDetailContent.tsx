"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { PurchaseCard } from "@/components/ui/PurchaseCard";
import { CurriculumAccordion } from "@/components/ui/CurriculumAccordion";
import { ReviewItem } from "@/components/ui/ReviewItem";
import { InstructorCard } from "@/components/ui/InstructorCard";
import { PreviewModal } from "@/components/ui/PreviewModal";
import { CourseDetail } from "@/types/course-detail";
import { 
  Share2, 
  Flag, 
  Users, 
  Clock, 
  Globe, 
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface CourseDetailContentProps {
  course: CourseDetail;
}

export function CourseDetailContent({ course }: CourseDetailContentProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedReviewFilter, setSelectedReviewFilter] = useState("all");
  const [reviewSearchQuery, setReviewSearchQuery] = useState("");
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    lectureId: string;
    title: string;
    description?: string;
  }>({
    isOpen: false,
    lectureId: "",
    title: "",
    description: ""
  });

  const handlePreview = (lectureId: string) => {
    // Find the lecture in the curriculum
    let foundLecture = null;
    for (const section of course.curriculum) {
      const lecture = section.lectures.find(l => l.id === lectureId);
      if (lecture) {
        foundLecture = lecture;
        break;
      }
    }

    if (foundLecture) {
      setPreviewModal({
        isOpen: true,
        lectureId: foundLecture.id,
        title: foundLecture.title,
        description: foundLecture.description
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleReport = () => {
    console.log("Report course");
  };

  const filteredReviews = course.reviews.filter(review => {
    const matchesFilter = selectedReviewFilter === "all" || 
      (selectedReviewFilter === "5" && review.rating === 5) ||
      (selectedReviewFilter === "4" && review.rating === 4) ||
      (selectedReviewFilter === "3" && review.rating === 3) ||
      (selectedReviewFilter === "2" && review.rating === 2) ||
      (selectedReviewFilter === "1" && review.rating === 1);
    
    const matchesSearch = reviewSearchQuery === "" || 
      review.title.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(reviewSearchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <Container>
          <div className="py-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-4">
              <span>Development</span>
              <span className="mx-2">›</span>
              <span>Web Development</span>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{course.category}</span>
            </nav>

            {/* Course Header */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.bestSeller && (
                    <Badge 
                      variant="default"
                      className="bg-orange-100 text-orange-800 border-orange-200"
                    >
                      Bestseller
                    </Badge>
                  )}
                  {course.rating >= 4.8 && (
                    <Badge 
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 border-purple-200"
                    >
                      Highest Rated
                    </Badge>
                  )}
                  {course.isFree && (
                    <Badge 
                      variant="secondary"
                      className="bg-green-100 text-green-800 border-green-200"
                    >
                      Free Course
                    </Badge>
                  )}
                  {course.hasCertificate && (
                    <Badge 
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 border-blue-200"
                    >
                      Certificate Included
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>

                <p className="text-xl text-gray-700 mb-6">
                  {course.subtitle}
                </p>

                {/* Course Stats */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <RatingStars 
                    rating={course.rating.average} 
                    count={course.rating.count}
                    size="lg"
                  />
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-5 w-5" />
                    <span>{course.studentsCount.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>Last updated {course.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="h-5 w-5" />
                    <span>{course.language}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button
                    onClick={handleReport}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Flag className="h-4 w-4" />
                    Report
                  </Button>
                </div>
              </div>

              {/* Purchase Card - Desktop */}
              <div className="hidden lg:block">
                <div className="sticky top-6">
                  <PurchaseCard course={course} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container>
        <div className="grid lg:grid-cols-3 gap-8 py-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What you&apos;ll learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {(course.whatYoullLearn || course.whatYouWillLearn || [
                  "Master the fundamentals of this subject",
                  "Build real-world projects and applications", 
                  "Understand industry best practices",
                  "Gain practical hands-on experience",
                  "Learn from expert instructors",
                  "Earn a certificate of completion",
                  "Access lifetime course updates",
                  "Join a community of learners"
                ]).map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Includes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">This course includes:</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">{course.includes?.hours || course.hours || 0} hours on-demand video</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">{course.includes?.articles || 10} articles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">{course.includes?.resources || 15} downloadable resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Full {course.includes?.lifetimeAccess ? 'lifetime' : 'course'} access</span>
                </div>
                {(course.includes?.certificate || course.hasCertificate) && (
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">Certificate of completion</span>
                  </div>
                )}
                {(course.includes?.mobileAccess !== false) && (
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">Access on mobile and desktop</span>
                  </div>
                )}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <CurriculumAccordion 
                curriculum={course.curriculum}
                onPreview={handlePreview}
              />
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {showFullDescription ? course.description : course.description.substring(0, 500) + "..."}
                </p>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium mt-4"
                >
                  {showFullDescription ? (
                    <>
                      Show less
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Show more
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Instructor */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>
              <InstructorCard instructor={course.instructor} />
            </section>

            {/* Reviews */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Student feedback
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={selectedReviewFilter}
                    onChange={(e) => setSelectedReviewFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All ratings</option>
                    <option value="5">5 stars</option>
                    <option value="4">4 stars</option>
                    <option value="3">3 stars</option>
                    <option value="2">2 stars</option>
                    <option value="1">1 star</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={reviewSearchQuery}
                    onChange={(e) => setReviewSearchQuery(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              <div className="space-y-0">
                {filteredReviews.map((review) => (
                  <ReviewItem
                    key={review.id}
                    review={review}
                    onHelpful={(reviewId) => console.log("Helpful:", reviewId)}
                    onReport={(reviewId) => console.log("Report:", reviewId)}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Mobile Purchase Card */}
          <div className="lg:hidden">
            <PurchaseCard course={course} />
          </div>
        </div>
      </Container>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900">
              ${course.price.current}
            </div>
            {course.price.original && (
              <div className="text-sm text-gray-500 line-through">
                ${course.price.original}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg">
              Add to Cart
            </Button>
            <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
              Buy Now
            </Button>
          </div>
        </div>
      </div>


      {/* Preview Modal */}
      <PreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal(prev => ({ ...prev, isOpen: false }))}
        videoUrl={course.previewVideo}
        posterUrl={course.previewVideoPoster}
        title={previewModal.title}
        description={previewModal.description}
      />
    </div>
  );
}
