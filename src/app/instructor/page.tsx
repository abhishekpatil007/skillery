"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KPIStat } from "@/components/instructor/KPIStat";
import { CoursesTable } from "@/components/instructor/CoursesTable";
import { ReviewRow } from "@/components/instructor/ReviewRow";
import { PayoutBanner } from "@/components/instructor/PayoutBanner";
import { InstructorStats } from "@/types/instructor";
import { 
  Search, 
  Filter, 
  Plus,
  BarChart3,
  MessageSquare
} from "lucide-react";

// Mock data import
import instructorData from "@/data/instructor/dashboard.json";

export default function InstructorDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<InstructorStats | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'unreplied' | 'replied'>('all');
  const [reviewSearch, setReviewSearch] = useState("");
  
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats(instructorData as InstructorStats);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleEditCourse = (courseId: string) => {
    router.push(`/instructor/courses/${courseId}/edit`);
  };

  const handleViewCourse = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  const handleViewAnalytics = (courseId: string) => {
    router.push(`/instructor/courses/${courseId}/analytics`);
  };

  const handleReplyToReview = (reviewId: string) => {
    // In real app, this would open a reply modal
    console.log('Reply to review:', reviewId);
  };

  const handleMarkHelpful = (reviewId: string) => {
    // In real app, this would update the helpful status
    console.log('Mark helpful:', reviewId);
  };

  const handleViewCourseFromReview = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  const filteredReviews = stats?.recentReviews.filter(review => {
    const matchesSearch = review.studentName.toLowerCase().includes(reviewSearch.toLowerCase()) ||
                         review.courseTitle.toLowerCase().includes(reviewSearch.toLowerCase()) ||
                         review.comment.toLowerCase().includes(reviewSearch.toLowerCase());
    
    const matchesFilter = reviewFilter === 'all' || 
                         (reviewFilter === 'unreplied' && !review.instructorResponse) ||
                         (reviewFilter === 'replied' && review.instructorResponse);
    
    return matchesSearch && matchesFilter;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          <div className="animate-pulse space-y-8">
            {/* Header Skeleton */}
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            
            {/* KPI Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="h-6 w-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
            
            {/* Table Skeleton */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Dashboard</h1>
            <p className="text-gray-600 mb-6">Unable to load instructor data</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Monitor your courses, students, and earnings
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Button>
            </div>
          </div>

          {/* Payout Banner */}
          <PayoutBanner payoutInfo={stats.payoutInfo} />

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPIStat
              title="Total Revenue"
              value={stats.kpis.totalRevenue}
              icon="revenue"
              subtitle="All time"
              trend={{ value: 15, isPositive: true }}
            />
            <KPIStat
              title="Total Students"
              value={stats.kpis.totalStudents}
              icon="students"
              subtitle="Enrolled"
              trend={{ value: 8, isPositive: true }}
            />
            <KPIStat
              title="Average Rating"
              value={stats.kpis.averageRating}
              icon="rating"
              subtitle={`${stats.kpis.totalReviews} reviews`}
              trend={{ value: 2, isPositive: true }}
            />
            <KPIStat
              title="Conversion Rate"
              value={stats.kpis.conversionRate / 100}
              icon="conversion"
              subtitle="View to purchase"
              trend={{ value: 5, isPositive: true }}
            />
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Recent Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
              <CoursesTable
                courses={stats.courses}
                onEdit={handleEditCourse}
                onView={handleViewCourse}
                onAnalytics={handleViewAnalytics}
              />
            </TabsContent>

            <TabsContent value="reviews">
              <div className="bg-white rounded-lg border border-gray-200">
                {/* Reviews Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search reviews..."
                        value={reviewSearch}
                        onChange={(e) => setReviewSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Status:</span>
                      <select
                        value={reviewFilter}
                        onChange={(e) => setReviewFilter(e.target.value as 'all' | 'unreplied' | 'replied')}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="all">All Reviews</option>
                        <option value="unreplied">Unreplied</option>
                        <option value="replied">Replied</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="p-6 space-y-4">
                  {filteredReviews.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                      <p className="text-gray-500">
                        {reviewSearch || reviewFilter !== 'all' 
                          ? 'Try adjusting your search or filter criteria'
                          : 'Reviews will appear here as students rate your courses'
                        }
                      </p>
                    </div>
                  ) : (
                    filteredReviews.map((review) => (
                      <ReviewRow
                        key={review.id}
                        review={review}
                        onReply={handleReplyToReview}
                        onMarkHelpful={handleMarkHelpful}
                        onViewCourse={handleViewCourseFromReview}
                      />
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  );
}
