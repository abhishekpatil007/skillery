"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Play, 
  Clock, 
  CheckCircle, 
  Star,
  BookOpen,
  Award,
  Download,
  Share2,
  MoreVertical,
  Calendar,
  User,
  BarChart3
} from "lucide-react";
import Link from "next/link";

// Mock course data
const enrolledCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center",
    progress: 75,
    status: "in_progress",
    lastAccessed: "2024-01-15",
    totalLectures: 45,
    completedLectures: 34,
    totalHours: 32,
    completedHours: 24,
    rating: 4.8,
    currentLecture: "React Hooks Deep Dive",
    nextLecture: "State Management with Redux",
    certificate: false,
    category: "Web Development"
  },
  {
    id: 2,
    title: "Data Science and Machine Learning",
    instructor: "Michael Chen",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    progress: 100,
    status: "completed",
    lastAccessed: "2024-01-10",
    totalLectures: 60,
    completedLectures: 60,
    totalHours: 45,
    completedHours: 45,
    rating: 4.9,
    currentLecture: null,
    nextLecture: null,
    certificate: true,
    category: "Data Science"
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Emily Rodriguez",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center",
    progress: 30,
    status: "in_progress",
    lastAccessed: "2024-01-12",
    totalLectures: 25,
    completedLectures: 8,
    totalHours: 20,
    completedHours: 6,
    rating: 4.7,
    currentLecture: "Color Theory Fundamentals",
    nextLecture: "Typography Best Practices",
    certificate: false,
    category: "Design"
  },
  {
    id: 4,
    title: "JavaScript Fundamentals",
    instructor: "David Kim",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center",
    progress: 100,
    status: "completed",
    lastAccessed: "2023-12-20",
    totalLectures: 30,
    completedLectures: 30,
    totalHours: 15,
    completedHours: 15,
    rating: 4.6,
    currentLecture: null,
    nextLecture: null,
    certificate: true,
    category: "Programming"
  },
  {
    id: 5,
    title: "Cloud Computing with AWS",
    instructor: "Lisa Wang",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
    progress: 0,
    status: "not_started",
    lastAccessed: null,
    totalLectures: 40,
    completedLectures: 0,
    totalHours: 25,
    completedHours: 0,
    rating: 4.8,
    currentLecture: null,
    nextLecture: "Introduction to AWS",
    certificate: false,
    category: "Cloud Computing"
  }
];

const categories = ["All", "Web Development", "Data Science", "Design", "Programming", "Cloud Computing"];
const statuses = ["All", "In Progress", "Completed", "Not Started"];

export default function MyCoursesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("all");

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/auth/login?next=/my-courses');
    return null;
  }

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || 
                         (selectedStatus === "In Progress" && course.status === "in_progress") ||
                         (selectedStatus === "Completed" && course.status === "completed") ||
                         (selectedStatus === "Not Started" && course.status === "not_started");
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const inProgressCourses = enrolledCourses.filter(course => course.status === "in_progress");
  const completedCourses = enrolledCourses.filter(course => course.status === "completed");
  const notStartedCourses = enrolledCourses.filter(course => course.status === "not_started");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "not_started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "not_started":
        return "Not Started";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
            <p className="text-gray-600">Manage and continue your learning journey</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-brand-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</div>
                <div className="text-sm text-gray-600">Total Courses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Play className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{inProgressCourses.length}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{completedCourses.length}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{completedCourses.filter(c => c.certificate).length}</div>
                <div className="text-sm text-gray-600">Certificates</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="not_started">Not Started</TabsTrigger>
            </TabsList>

            {/* All Courses Tab */}
            <TabsContent value="all" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search courses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex border border-gray-300 rounded-md">
                        <Button
                          variant={viewMode === "grid" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("grid")}
                          className="rounded-r-none"
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setViewMode("list")}
                          className="rounded-l-none"
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Courses Grid/List */}
              {viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={getStatusColor(course.status)}>
                            {getStatusText(course.status)}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                        
                        {course.status === "in_progress" && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-brand-500 h-2 rounded-full" 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {course.completedLectures}/{course.totalLectures} lectures completed
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.completedHours}h / {course.totalHours}h</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button asChild className="flex-1 bg-brand-500 hover:bg-brand-600">
                            <Link href={`/player/${course.id}`}>
                              <Play className="h-4 w-4 mr-2" />
                              {course.status === "not_started" ? "Start Course" : "Continue"}
                            </Link>
                          </Button>
                          {course.certificate && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex space-x-4">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{course.completedHours}h / {course.totalHours}h</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{course.rating}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>Last accessed: {course.lastAccessed ? new Date(course.lastAccessed).toLocaleDateString() : 'Never'}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(course.status)}>
                                  {getStatusText(course.status)}
                                </Badge>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {course.status === "in_progress" && (
                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress: {course.progress}%</span>
                                  <span>{course.completedLectures}/{course.totalLectures} lectures</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-brand-500 h-2 rounded-full" 
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Current: {course.currentLecture}
                                </p>
                              </div>
                            )}

                            <div className="flex space-x-2">
                              <Button asChild className="bg-brand-500 hover:bg-brand-600">
                                <Link href={`/player/${course.id}`}>
                                  <Play className="h-4 w-4 mr-2" />
                                  {course.status === "not_started" ? "Start Course" : "Continue"}
                                </Link>
                              </Button>
                              {course.certificate && (
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Certificate
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {filteredCourses.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button asChild>
                      <Link href="/catalog">Browse Courses</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Other tabs would show filtered results */}
            <TabsContent value="in_progress">
              <div className="text-center py-8">
                <p className="text-gray-600">In Progress courses: {inProgressCourses.length}</p>
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="text-center py-8">
                <p className="text-gray-600">Completed courses: {completedCourses.length}</p>
              </div>
            </TabsContent>
            <TabsContent value="not_started">
              <div className="text-center py-8">
                <p className="text-gray-600">Not started courses: {notStartedCourses.length}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </div>
  );
}
