"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Users, 
  TrendingUp,
  Clock,
  ThumbsUp,
  Reply,
  Share2,
  Plus,
  Star,
  Award,
  BookOpen,
  Calendar
} from "lucide-react";
import Link from "next/link";

// Mock community data
const categories = [
  { id: "all", name: "All Topics", count: 1247, color: "bg-gray-100 text-gray-800" },
  { id: "general", name: "General Discussion", count: 456, color: "bg-blue-100 text-blue-800" },
  { id: "courses", name: "Course Help", count: 234, color: "bg-green-100 text-green-800" },
  { id: "projects", name: "Projects & Portfolio", count: 189, color: "bg-purple-100 text-purple-800" },
  { id: "career", name: "Career Advice", count: 156, color: "bg-orange-100 text-orange-800" },
  { id: "feedback", name: "Feedback", count: 89, color: "bg-pink-100 text-pink-800" },
  { id: "announcements", name: "Announcements", count: 23, color: "bg-yellow-100 text-yellow-800" }
];

const posts = [
  {
    id: 1,
    title: "Just completed my first React project! Here's what I learned",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    category: "projects",
    categoryName: "Projects & Portfolio",
    content: "After 3 months of learning React, I finally built my first real project - a todo app with authentication. The biggest challenge was understanding state management...",
    replies: 23,
    likes: 45,
    views: 234,
    timeAgo: "2 hours ago",
    isPinned: false,
    isSolved: false,
    tags: ["React", "JavaScript", "Beginner"]
  },
  {
    id: 2,
    title: "Best practices for responsive web design in 2024",
    author: "Mike Chen",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    category: "courses",
    categoryName: "Course Help",
    content: "I'm working through the Web Development course and struggling with responsive design. What are the current best practices for making websites work well on all devices?",
    replies: 18,
    likes: 32,
    views: 189,
    timeAgo: "4 hours ago",
    isPinned: false,
    isSolved: true,
    tags: ["CSS", "Responsive Design", "Web Development"]
  },
  {
    id: 3,
    title: "New course announcement: Advanced Python for Data Science",
    author: "Skillery Team",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
    category: "announcements",
    categoryName: "Announcements",
    content: "We're excited to announce our new Advanced Python for Data Science course! This comprehensive course covers machine learning, data visualization, and more...",
    replies: 12,
    likes: 67,
    views: 456,
    timeAgo: "1 day ago",
    isPinned: true,
    isSolved: false,
    tags: ["Python", "Data Science", "New Course"]
  },
  {
    id: 4,
    title: "Career transition from marketing to tech - my journey",
    author: "Lisa Wang",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    category: "career",
    categoryName: "Career Advice",
    content: "After 5 years in marketing, I decided to make the switch to tech. It's been 2 years since I started learning to code, and I just landed my first developer job...",
    replies: 34,
    likes: 89,
    views: 567,
    timeAgo: "2 days ago",
    isPinned: false,
    isSolved: false,
    tags: ["Career Change", "Success Story", "Motivation"]
  },
  {
    id: 5,
    title: "Help needed: Understanding async/await in JavaScript",
    author: "David Kim",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    category: "courses",
    categoryName: "Course Help",
    content: "I'm stuck on the async/await section of the JavaScript course. Can someone explain how promises work and when to use async/await vs .then()?",
    replies: 15,
    likes: 8,
    views: 123,
    timeAgo: "3 days ago",
    isPinned: false,
    isSolved: false,
    tags: ["JavaScript", "Async/Await", "Promises"]
  }
];

const topContributors = [
  { name: "Sarah Johnson", posts: 45, likes: 234, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" },
  { name: "Mike Chen", posts: 38, likes: 189, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
  { name: "Lisa Wang", posts: 32, likes: 156, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
  { name: "David Kim", posts: 28, likes: 134, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
  { name: "Emily Rodriguez", posts: 25, likes: 98, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" }
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime();
      case "popular":
        return b.likes - a.likes;
      case "replies":
        return b.replies - a.replies;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Community</h1>
            <p className="text-xl text-gray-600">
              Connect with fellow learners, share your projects, and get help from the community
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Create Post */}
              <Card>
                <CardContent className="p-6">
                  <Button className="w-full bg-brand-500 hover:bg-brand-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-brand-100 text-brand-800'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{category.name}</span>
                          <Badge className={category.color}>{category.count}</Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topContributors.map((contributor, index) => (
                      <div key={contributor.name} className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                          <img
                            src={contributor.avatar}
                            alt={contributor.name}
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{contributor.name}</p>
                          <p className="text-xs text-gray-500">{contributor.posts} posts • {contributor.likes} likes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search discussions, projects, or topics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="replies">Most Replies</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Posts */}
              <div className="space-y-4">
                {sortedPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={post.authorAvatar}
                          alt={post.author}
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-gray-900 line-clamp-1">{post.title}</h3>
                                {post.isPinned && (
                                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pinned</Badge>
                                )}
                                {post.isSolved && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">Solved</Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                                <span>by {post.author}</span>
                                <span>•</span>
                                <span>{post.timeAgo}</span>
                                <span>•</span>
                                <Badge className={categories.find(c => c.id === post.category)?.color || "bg-gray-100 text-gray-800"}>
                                  {post.categoryName}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Reply className="h-4 w-4" />
                                <span>{post.replies}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{post.views} views</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Posts
                </Button>
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <Card className="mt-12">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Guidelines</h2>
                <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                  Help us maintain a positive and supportive learning environment for everyone
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ThumbsUp className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Be Respectful</h3>
                    <p className="text-sm text-gray-600">Treat everyone with kindness and respect</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Stay On Topic</h3>
                    <p className="text-sm text-gray-600">Keep discussions relevant to learning</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Help Others</h3>
                    <p className="text-sm text-gray-600">Share knowledge and support fellow learners</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
