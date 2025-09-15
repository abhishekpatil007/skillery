"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  Clock, 
  User,
  Star,
  ArrowRight,
  Filter,
  Grid,
  List,
  TrendingUp,
  Award,
  Target,
  Lightbulb
} from "lucide-react";
import Link from "next/link";

// Mock guide data
const guides = [
  {
    id: 1,
    title: "Complete Beginner's Guide to Web Development",
    description: "Everything you need to know to start your journey as a web developer, from HTML basics to deploying your first website.",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    category: "Web Development",
    difficulty: "Beginner",
    readTime: "45 min read",
    rating: 4.9,
    views: 12500,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center",
    tags: ["HTML", "CSS", "JavaScript", "Beginner"],
    isFeatured: true,
    lastUpdated: "2024-01-10"
  },
  {
    id: 2,
    title: "Data Science Career Path: From Zero to Data Scientist",
    description: "A comprehensive roadmap to becoming a data scientist, including skills to learn, tools to master, and career opportunities.",
    author: "Michael Chen",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    category: "Data Science",
    difficulty: "Intermediate",
    readTime: "60 min read",
    rating: 4.8,
    views: 8900,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    tags: ["Python", "Machine Learning", "Career", "Roadmap"],
    isFeatured: true,
    lastUpdated: "2024-01-08"
  },
  {
    id: 3,
    title: "UI/UX Design Principles Every Developer Should Know",
    description: "Essential design principles and best practices for creating user-friendly interfaces and experiences.",
    author: "Emily Rodriguez",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    category: "Design",
    difficulty: "Beginner",
    readTime: "30 min read",
    rating: 4.7,
    views: 6700,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center",
    tags: ["UI/UX", "Design", "Principles", "Best Practices"],
    isFeatured: false,
    lastUpdated: "2024-01-05"
  },
  {
    id: 4,
    title: "JavaScript ES6+ Features You Need to Know",
    description: "Modern JavaScript features including arrow functions, destructuring, async/await, and more advanced concepts.",
    author: "David Kim",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    category: "Programming",
    difficulty: "Intermediate",
    readTime: "40 min read",
    rating: 4.6,
    views: 5400,
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center",
    tags: ["JavaScript", "ES6", "Modern JS", "Programming"],
    isFeatured: false,
    lastUpdated: "2024-01-03"
  },
  {
    id: 5,
    title: "Cloud Computing Fundamentals: AWS vs Azure vs GCP",
    description: "Compare the three major cloud platforms and learn which one to choose for your projects and career.",
    author: "Lisa Wang",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
    category: "Cloud Computing",
    difficulty: "Intermediate",
    readTime: "50 min read",
    rating: 4.8,
    views: 4200,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
    tags: ["AWS", "Azure", "GCP", "Cloud", "Comparison"],
    isFeatured: false,
    lastUpdated: "2023-12-28"
  },
  {
    id: 6,
    title: "How to Build a Portfolio Website That Gets You Hired",
    description: "Step-by-step guide to creating a professional portfolio website that showcases your skills and attracts employers.",
    author: "Alex Thompson",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    category: "Career",
    difficulty: "Beginner",
    readTime: "35 min read",
    rating: 4.9,
    views: 7800,
    thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop&crop=center",
    tags: ["Portfolio", "Career", "Web Development", "Job Search"],
    isFeatured: true,
    lastUpdated: "2023-12-25"
  }
];

const categories = ["All", "Web Development", "Data Science", "Design", "Programming", "Cloud Computing", "Career"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || guide.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const sortedGuides = [...filteredGuides].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.views - a.views;
      case "rating":
        return b.rating - a.rating;
      case "recent":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  const featuredGuides = sortedGuides.filter(guide => guide.isFeatured);
  const regularGuides = sortedGuides.filter(guide => !guide.isFeatured);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Guides</h1>
            <p className="text-xl text-gray-600">
              Comprehensive guides to help you master new skills and advance your career
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search guides..."
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
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="recent">Most Recent</option>
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

          {/* Featured Guides */}
          {featuredGuides.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-6 w-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900">Featured Guides</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGuides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={guide.thumbnail}
                        alt={guide.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-brand-100 text-brand-800">{guide.difficulty}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{guide.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guide.description}</p>
                      
                      <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{guide.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{guide.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{guide.rating}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {guide.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full bg-brand-500 hover:bg-brand-600">
                        Read Guide
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Guides */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Guides</h2>
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularGuides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={guide.thumbnail}
                        alt={guide.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-brand-100 text-brand-800">{guide.difficulty}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{guide.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guide.description}</p>
                      
                      <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{guide.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{guide.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{guide.rating}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {guide.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full bg-brand-500 hover:bg-brand-600">
                        Read Guide
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {regularGuides.map((guide) => (
                  <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <img
                          src={guide.thumbnail}
                          alt={guide.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 mb-1">{guide.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{guide.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <User className="h-4 w-4" />
                                  <span>{guide.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{guide.readTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span>{guide.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <BookOpen className="h-4 w-4" />
                                  <span>{guide.views.toLocaleString()} views</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-brand-100 text-brand-800">{guide.difficulty}</Badge>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {guide.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              Updated {new Date(guide.lastUpdated).toLocaleDateString()}
                            </div>
                            <Button className="bg-brand-500 hover:bg-brand-600">
                              Read Guide
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {filteredGuides.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No guides found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-brand-600 to-brand-700 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Request a guide on a specific topic and our team will create a comprehensive guide for you and the community.
              </p>
              <Button className="bg-white text-brand-600 hover:bg-gray-100">
                <Lightbulb className="h-4 w-4 mr-2" />
                Request a Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
