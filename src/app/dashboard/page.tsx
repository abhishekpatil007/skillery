"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressCourseCard } from "@/components/dashboard/ProgressCourseCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { HorizontalScroll } from "@/components/dashboard/HorizontalScroll";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { useAuthStore } from "@/store/authStore";
import { Enrollment, LearningStats, Recommendation } from "@/types/enrollment";
import { 
  Play, 
  Heart, 
  ShoppingCart, 
  Star
} from "lucide-react";

// Mock data imports
import enrollmentsData from "@/data/me/enrollments.json";
import learningStatsData from "@/data/me/learning-stats.json";
import recommendationsData from "@/data/me/recommendations.json";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [learningStats] = useState<LearningStats>(learningStatsData);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEnrollments(enrollmentsData as Enrollment[]);
      setRecommendations(recommendationsData as Recommendation[]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login?next=/dashboard');
    }
  }, [isAuthenticated, router]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getFilteredEnrollments = () => {
    switch (activeTab) {
      case 'in_progress':
        return enrollments.filter(e => e.status === 'in_progress');
      case 'completed':
        return enrollments.filter(e => e.status === 'completed');
      default:
        return enrollments;
    }
  };

  const continueWatchingCourses = enrollments.filter(e => 
    e.status === 'in_progress' && e.currentLecture
  );

  const handleCourseClick = (enrollment: Enrollment) => {
    router.push(`/player/${enrollment.courseId}`);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'continue':
        if (continueWatchingCourses.length > 0) {
          handleCourseClick(continueWatchingCourses[0]);
        }
        break;
      case 'wishlist':
        router.push('/wishlist');
        break;
      case 'cart':
        router.push('/cart');
        break;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Container>
          <DashboardSkeleton />
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="space-y-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Welcome back, {user?.firstName}! 👋
                </h1>
                <p className="text-brand-100">
                  Ready to continue your learning journey?
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => handleQuickAction('continue')}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Continue Learning
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleQuickAction('wishlist')}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  My Wishlist
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleQuickAction('cart')}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  My Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Learning Streak"
              value={`${learningStats.learningStreak} days`}
              icon="flame"
              subtitle="Keep it up!"
              trend={{ value: 12, isPositive: true }}
            />
            <MetricCard
              title="Total Time"
              value={formatTime(learningStats.totalMinutes)}
              icon="clock"
              subtitle="This month"
              trend={{ value: 8, isPositive: true }}
            />
            <MetricCard
              title="Certificates"
              value={learningStats.certificatesEarned}
              icon="award"
              subtitle="Earned"
            />
            <MetricCard
              title="Quizzes Passed"
              value={learningStats.quizzesPassed}
              icon="check"
              subtitle="Completed"
              trend={{ value: 15, isPositive: true }}
            />
          </div>

          {/* Continue Watching */}
          {continueWatchingCourses.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Continue Watching
                </h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <HorizontalScroll>
                {continueWatchingCourses.map((enrollment) => (
                  <ProgressCourseCard
                    key={enrollment.id}
                    enrollment={enrollment}
                    variant="continue-watching"
                    onClick={() => handleCourseClick(enrollment)}
                  />
                ))}
              </HorizontalScroll>
            </section>
          )}

          {/* Your Learning */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Your Learning
              </h2>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All ({enrollments.length})
                </TabsTrigger>
                <TabsTrigger value="in_progress">
                  In Progress ({enrollments.filter(e => e.status === 'in_progress').length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({enrollments.filter(e => e.status === 'completed').length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-6">
                {getFilteredEnrollments().length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredEnrollments().map((enrollment) => (
                      <ProgressCourseCard
                        key={enrollment.id}
                        enrollment={enrollment}
                        onClick={() => handleCourseClick(enrollment)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    type={activeTab === 'completed' ? 'no-completed' : 'no-courses'}
                    title={
                      activeTab === 'completed' 
                        ? "No completed courses yet" 
                        : "No courses in progress"
                    }
                    description={
                      activeTab === 'completed'
                        ? "Complete some courses to see them here"
                        : "Start learning to see your progress here"
                    }
                    action={{
                      label: "Browse Courses",
                      onClick: () => router.push('/catalog')
                    }}
                  />
                )}
              </TabsContent>
            </Tabs>
          </section>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Recommended for You
                </h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.slice(0, 3).map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group"
                    onClick={() => router.push(`/course/${rec.courseId}`)}
                  >
                    <div className="relative">
                      <img
                        src={rec.thumbnail}
                        alt={rec.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 right-3">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
                          {rec.matchPercentage}% match
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {rec.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        by {rec.instructor}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{rec.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({rec.studentsCount.toLocaleString()})
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{rec.level}</span>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3">
                        {rec.reason}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          ${rec.price}
                        </span>
                        <Button size="sm" className="text-xs">
                          View Course
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>
    </div>
  );
}
