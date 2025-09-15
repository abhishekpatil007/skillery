"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Star,
  Clock,
  Tag
} from "lucide-react";
import Link from "next/link";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Online Learning: Trends to Watch in 2024",
    excerpt: "Discover the latest trends shaping the future of online education and how they're transforming the way we learn.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Education",
    tags: ["Online Learning", "Future Trends", "Technology"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center",
    featured: true
  },
  {
    id: 2,
    title: "How to Build a Successful Career in Data Science",
    excerpt: "A comprehensive guide to starting and advancing your career in data science, from skills to job opportunities.",
    author: "Michael Chen",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Career",
    tags: ["Data Science", "Career", "Skills"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
    featured: false
  },
  {
    id: 3,
    title: "10 Essential Web Development Tools for 2024",
    excerpt: "Stay ahead with the latest web development tools and technologies that every developer should know.",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Technology",
    tags: ["Web Development", "Tools", "Programming"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center",
    featured: false
  },
  {
    id: 4,
    title: "The Psychology of Learning: How to Study More Effectively",
    excerpt: "Learn about the science behind effective learning and discover techniques to improve your study habits.",
    author: "Dr. Lisa Wang",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Learning",
    tags: ["Psychology", "Study Tips", "Learning"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center",
    featured: false
  },
  {
    id: 5,
    title: "Building a Personal Brand as a Freelancer",
    excerpt: "Essential strategies for creating a strong personal brand that attracts clients and builds your reputation.",
    author: "James Wilson",
    date: "2024-01-05",
    readTime: "9 min read",
    category: "Business",
    tags: ["Freelancing", "Personal Brand", "Marketing"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center",
    featured: false
  },
  {
    id: 6,
    title: "The Complete Guide to UI/UX Design Principles",
    excerpt: "Master the fundamental principles of UI/UX design and create user-friendly digital experiences.",
    author: "Maria Garcia",
    date: "2024-01-03",
    readTime: "10 min read",
    category: "Design",
    tags: ["UI/UX", "Design", "User Experience"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&crop=center",
    featured: false
  }
];

const categories = ["All", "Education", "Career", "Technology", "Learning", "Business", "Design"];
const featuredPosts = blogPosts.filter(post => post.featured);
const regularPosts = blogPosts.filter(post => !post.featured);

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = regularPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-700 py-20">
        <Container>
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              Skillery Blog
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Insights, tips, and stories from the world of online learning. 
              Stay updated with the latest trends and best practices.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              Featured Articles
            </h2>
            <p className="text-gray-600">Handpicked articles that our team thinks you'll love</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 text-white">Featured</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" className="text-brand-600 hover:text-brand-700">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <Container>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-brand-500 hover:bg-brand-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </Container>
      </section>

      {/* Regular Posts */}
      <section className="py-16">
        <Container>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-500 text-white">{post.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" className="text-brand-600 hover:text-brand-700">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or category filter
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-600 to-brand-700">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Get the latest articles, course updates, and learning tips delivered 
              straight to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-white text-brand-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
