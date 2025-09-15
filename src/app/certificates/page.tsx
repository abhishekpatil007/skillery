"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  Share2, 
  Eye,
  Award,
  Calendar,
  Clock,
  CheckCircle,
  Star,
  Filter,
  Grid,
  List
} from "lucide-react";
import Link from "next/link";

// Mock certificate data
const certificates = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    completedDate: "2024-01-15",
    courseId: "web-dev-bootcamp",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center",
    grade: 95,
    hours: 120,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    certificateUrl: "/certificates/web-dev-bootcamp.pdf",
    isVerified: true,
    verificationCode: "SKL-2024-001234"
  },
  {
    id: 2,
    title: "Data Science and Machine Learning",
    instructor: "Michael Chen",
    completedDate: "2023-12-20",
    courseId: "data-science-ml",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
    grade: 98,
    hours: 150,
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow"],
    certificateUrl: "/certificates/data-science-ml.pdf",
    isVerified: true,
    verificationCode: "SKL-2023-009876"
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Emily Rodriguez",
    completedDate: "2023-11-10",
    courseId: "ui-ux-design",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center",
    grade: 92,
    hours: 80,
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    certificateUrl: "/certificates/ui-ux-design.pdf",
    isVerified: true,
    verificationCode: "SKL-2023-007654"
  },
  {
    id: 4,
    title: "JavaScript Fundamentals",
    instructor: "David Kim",
    completedDate: "2023-10-05",
    courseId: "javascript-fundamentals",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center",
    grade: 89,
    hours: 60,
    skills: ["JavaScript", "ES6+", "DOM Manipulation", "Async Programming"],
    certificateUrl: "/certificates/javascript-fundamentals.pdf",
    isVerified: true,
    verificationCode: "SKL-2023-005432"
  },
  {
    id: 5,
    title: "Cloud Computing with AWS",
    instructor: "Lisa Wang",
    completedDate: "2023-09-15",
    courseId: "aws-cloud-computing",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
    grade: 94,
    hours: 100,
    skills: ["AWS", "EC2", "S3", "Lambda", "CloudFormation"],
    certificateUrl: "/certificates/aws-cloud-computing.pdf",
    isVerified: true,
    verificationCode: "SKL-2023-003210"
  }
];

const skills = ["All", "Web Development", "Data Science", "Design", "Cloud Computing", "Programming"];

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSkill = selectedSkill === "All" || 
                        cert.skills.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase()));
    return matchesSearch && matchesSkill;
  });

  const totalCertificates = certificates.length;
  const totalHours = certificates.reduce((sum, cert) => sum + cert.hours, 0);
  const averageGrade = Math.round(certificates.reduce((sum, cert) => sum + cert.grade, 0) / certificates.length);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Certificates</h1>
            <p className="text-xl text-gray-600">
              View and manage your course completion certificates
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-brand-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{totalCertificates}</div>
                <div className="text-sm text-gray-600">Certificates Earned</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{totalHours}h</div>
                <div className="text-sm text-gray-600">Total Learning Hours</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{averageGrade}%</div>
                <div className="text-sm text-gray-600">Average Grade</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Verification Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search certificates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    {skills.map(skill => (
                      <option key={skill} value={skill}>{skill}</option>
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

          {/* Certificates Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map((cert) => (
                <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={cert.thumbnail}
                      alt={cert.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{cert.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">by {cert.instructor}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Grade</span>
                        <span className="font-semibold text-gray-900">{cert.grade}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Completed</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(cert.completedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-semibold text-gray-900">{cert.hours}h</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {cert.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{cert.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button asChild className="flex-1 bg-brand-500 hover:bg-brand-600">
                        <Link href={cert.certificateUrl} target="_blank">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCertificates.map((cert) => (
                <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <img
                        src={cert.thumbnail}
                        alt={cert.title}
                        className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-1">{cert.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">by {cert.instructor}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4" />
                                <span>{cert.grade}% grade</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{cert.hours}h</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(cert.completedDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {cert.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Verification Code: {cert.verificationCode}
                          </div>
                          <div className="flex space-x-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={cert.certificateUrl} target="_blank">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </Button>
                            <Button asChild size="sm" className="bg-brand-500 hover:bg-brand-600">
                              <Link href={cert.certificateUrl} target="_blank">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
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
          )}

          {filteredCertificates.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates found</h3>
                <p className="text-gray-600 mb-6">
                  Complete courses to earn certificates and showcase your achievements
                </p>
                <Button asChild>
                  <Link href="/catalog">Browse Courses</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Verification Info */}
          <Card className="mt-12">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Certificate Verification</h2>
                <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                  All certificates are digitally verified and can be verified by employers or educational institutions. 
                  Each certificate includes a unique verification code and QR code for instant verification.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Digitally Verified</h3>
                    <p className="text-sm text-gray-600">All certificates are cryptographically signed</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Industry Recognized</h3>
                    <p className="text-sm text-gray-600">Accepted by employers worldwide</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Share2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Easy Sharing</h3>
                    <p className="text-sm text-gray-600">Share on LinkedIn and other platforms</p>
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
