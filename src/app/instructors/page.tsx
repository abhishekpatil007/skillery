"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Star, 
  Users, 
  BookOpen,
  Award,
  Filter,
  Grid,
  List,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Globe,
  Clock
} from "lucide-react";
import Link from "next/link";

// Mock instructor data
const instructors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Software Engineer at Google",
    bio: "10+ years experience in full-stack development. Former tech lead at multiple startups.",
    rating: 4.9,
    students: 125000,
    courses: 15,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    specialties: ["Web Development", "JavaScript", "React", "Node.js"],
    featured: true,
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Data Science Director at Microsoft",
    bio: "PhD in Machine Learning. Published researcher and industry expert in AI/ML.",
    rating: 4.8,
    students: 98000,
    courses: 12,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    specialties: ["Data Science", "Machine Learning", "Python", "TensorFlow"],
    featured: true,
    verified: true
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "UX Design Lead at Airbnb",
    bio: "Award-winning designer with expertise in user experience and product design.",
    rating: 4.9,
    students: 87000,
    courses: 8,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    specialties: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
    featured: false,
    verified: true
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Professor of Computer Science at MIT",
    bio: "Distinguished professor and author of multiple computer science textbooks.",
    rating: 4.7,
    students: 156000,
    courses: 20,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    specialties: ["Algorithms", "Data Structures", "C++", "Computer Science"],
    featured: false,
    verified: true
  },
  {
    id: 5,
    name: "Maria Garcia",
    title: "Digital Marketing Manager at HubSpot",
    bio: "Expert in digital marketing strategies and growth hacking techniques.",
    rating: 4.8,
    students: 67000,
    courses: 10,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    specialties: ["Digital Marketing", "SEO", "Social Media", "Analytics"],
    featured: false,
    verified: true
  },
  {
    id: 6,
    name: "David Kim",
    title: "Cloud Solutions Architect at AWS",
    bio: "Certified cloud architect with expertise in AWS, Azure, and Google Cloud.",
    rating: 4.9,
    students: 92000,
    courses: 14,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    specialties: ["Cloud Computing", "AWS", "DevOps", "Docker"],
    featured: false,
    verified: true
  },
  {
    id: 7,
    name: "Lisa Wang",
    title: "Product Manager at Stripe",
    bio: "Experienced product manager with a focus on fintech and payment systems.",
    rating: 4.6,
    students: 45000,
    courses: 7,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    specialties: ["Product Management", "Agile", "User Stories", "Roadmapping"],
    featured: false,
    verified: true
  },
  {
    id: 8,
    name: "Alex Thompson",
    title: "Cybersecurity Consultant",
    bio: "Former NSA analyst turned cybersecurity consultant and ethical hacker.",
    rating: 4.8,
    students: 78000,
    courses: 11,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    specialties: ["Cybersecurity", "Ethical Hacking", "Network Security", "Penetration Testing"],
    featured: false,
    verified: true
  }
];

const specialties = [
  "All", "Web Development", "Data Science", "UI/UX Design", "Machine Learning",
  "Cloud Computing", "Digital Marketing", "Product Management", "Cybersecurity"
];

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("rating");

  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instructor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instructor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === "All" || 
                            instructor.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "students":
        return b.students - a.students;
      case "courses":
        return b.courses - a.courses;
      default:
        return 0;
    }
  });

  const featuredInstructors = sortedInstructors.filter(instructor => instructor.featured);
  const regularInstructors = sortedInstructors.filter(instructor => !instructor.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-700 py-20">
        <Container>
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              Meet Our Expert Instructors
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Learn from industry professionals, university professors, and top experts 
              who are passionate about sharing their knowledge.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">500+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">2M+</div>
              <div className="text-gray-600">Students Taught</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-600 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Instructors */}
      {featuredInstructors.length > 0 && (
        <section className="py-16">
          <Container>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-8 w-8 text-yellow-500 mr-3" />
                Featured Instructors
              </h2>
              <p className="text-gray-600">Top-rated instructors with exceptional teaching records</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredInstructors.map((instructor) => (
                <div key={instructor.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {instructor.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{instructor.name}</h3>
                      <p className="text-sm text-gray-600">{instructor.title}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{instructor.rating}</span>
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs ml-2">Featured</Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{instructor.bio}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{instructor.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{instructor.courses} courses</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {instructor.specialties.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-brand-500 hover:bg-brand-600">
                    View Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={selectedSpecialty === specialty ? "default" : "outline"}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={selectedSpecialty === specialty ? "bg-brand-500 hover:bg-brand-600" : ""}
                >
                  {specialty}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="rating">Sort by Rating</option>
                <option value="students">Sort by Students</option>
                <option value="courses">Sort by Courses</option>
              </select>
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
        </Container>
      </section>

      {/* All Instructors */}
      <section className="py-16">
        <Container>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Instructors
            </h2>
            <p className="text-gray-600">
              {filteredInstructors.length} instructor{filteredInstructors.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regularInstructors.map((instructor) => (
                <div key={instructor.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="text-center mb-4">
                    <div className="relative inline-block">
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto"
                      />
                      {instructor.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mt-3">{instructor.name}</h3>
                    <p className="text-sm text-gray-600">{instructor.title}</p>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{instructor.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 text-center">{instructor.bio}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{instructor.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{instructor.courses}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4 justify-center">
                    {instructor.specialties.slice(0, 2).map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-brand-500 hover:bg-brand-600">
                    View Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {regularInstructors.map((instructor) => (
                <div key={instructor.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-center">
                    <div className="relative">
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {instructor.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="ml-6 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{instructor.name}</h3>
                          <p className="text-gray-600">{instructor.title}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{instructor.rating}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{instructor.students.toLocaleString()} students</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{instructor.courses} courses</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{instructor.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {instructor.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="ml-6">
                      <Button className="bg-brand-500 hover:bg-brand-600">
                        View Profile
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredInstructors.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No instructors found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or specialty filter
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("All");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Become an Instructor CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-600 to-brand-700">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Become an Instructor
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Share your expertise with millions of learners worldwide and earn money 
              while making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
                <Link href="/instructor" className="flex items-center gap-2">
                  Start Teaching
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
