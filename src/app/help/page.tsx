"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock,
  BookOpen,
  Video,
  FileText,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import Link from "next/link";

// Mock FAQ data
const faqCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "courses",
    name: "Courses & Learning",
    icon: Video,
    color: "bg-green-100 text-green-800"
  },
  {
    id: "account",
    name: "Account & Billing",
    icon: FileText,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: "technical",
    name: "Technical Support",
    icon: HelpCircle,
    color: "bg-orange-100 text-orange-800"
  }
];

const faqs = [
  {
    id: 1,
    category: "getting-started",
    question: "How do I create an account?",
    answer: "Creating an account is easy! Click the 'Sign Up' button in the top right corner, enter your email and password, and you'll be ready to start learning in minutes.",
    helpful: 95
  },
  {
    id: 2,
    category: "getting-started",
    question: "Is Skillery free to use?",
    answer: "Yes! We offer many free courses and features. You can also upgrade to our premium plans for access to exclusive content, certificates, and advanced features.",
    helpful: 88
  },
  {
    id: 3,
    category: "courses",
    question: "How do I enroll in a course?",
    answer: "Browse our course catalog, find a course you're interested in, and click 'Enroll Now'. For free courses, you'll be enrolled immediately. For paid courses, you'll need to complete the checkout process.",
    helpful: 92
  },
  {
    id: 4,
    category: "courses",
    question: "Can I access courses on mobile devices?",
    answer: "Absolutely! Our platform is fully responsive and works great on smartphones and tablets. You can also download our mobile app for the best experience.",
    helpful: 87
  },
  {
    id: 5,
    category: "courses",
    question: "Do I get a certificate when I complete a course?",
    answer: "Yes! Most of our courses offer completion certificates. You can download your certificate from your profile page once you've completed all course requirements.",
    helpful: 90
  },
  {
    id: 6,
    category: "account",
    question: "How do I update my payment information?",
    answer: "Go to your account settings, then click on 'Billing & Payments'. From there, you can add, edit, or remove payment methods.",
    helpful: 85
  },
  {
    id: 7,
    category: "account",
    question: "Can I get a refund for a course?",
    answer: "We offer a 30-day money-back guarantee for all paid courses. If you're not satisfied, contact our support team within 30 days of purchase.",
    helpful: 82
  },
  {
    id: 8,
    category: "technical",
    question: "The video player isn't working. What should I do?",
    answer: "Try refreshing the page, clearing your browser cache, or switching to a different browser. If the problem persists, contact our technical support team.",
    helpful: 78
  },
  {
    id: 9,
    category: "technical",
    question: "I'm having trouble with audio. How can I fix it?",
    answer: "Check your device's volume settings, ensure your speakers or headphones are working, and try refreshing the page. Also, make sure your browser allows autoplay for our site.",
    helpful: 80
  },
  {
    id: 10,
    category: "technical",
    question: "The course content isn't loading. What's wrong?",
    answer: "This could be due to a slow internet connection or browser issues. Try refreshing the page, checking your internet connection, or clearing your browser cache.",
    helpful: 75
  }
];

const popularArticles = [
  {
    id: 1,
    title: "Complete Guide to Getting Started",
    description: "Everything you need to know to begin your learning journey",
    category: "Getting Started",
    readTime: "5 min read",
    helpful: 98
  },
  {
    id: 2,
    title: "How to Download Course Certificates",
    description: "Step-by-step instructions for accessing your certificates",
    category: "Certificates",
    readTime: "3 min read",
    helpful: 95
  },
  {
    id: 3,
    title: "Troubleshooting Video Playback Issues",
    description: "Common solutions for video player problems",
    category: "Technical",
    readTime: "7 min read",
    helpful: 92
  },
  {
    id: 4,
    title: "Understanding Course Progress Tracking",
    description: "Learn how your progress is tracked and saved",
    category: "Learning",
    readTime: "4 min read",
    helpful: 89
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions or get in touch with our support team
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-brand-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Get instant help from our support team</p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-accent-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Send us a detailed message</p>
                <Button variant="outline" className="w-full">Send Email</Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">Call us for urgent issues</p>
                <Button variant="outline" className="w-full">Call Now</Button>
              </CardContent>
            </Card>
          </div>

          {/* Popular Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-brand-100 text-brand-800">{article.category}</Badge>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <CheckCircle className="h-4 w-4" />
                        <span>{article.helpful}% helpful</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{article.readTime}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {faqCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <Icon className="h-8 w-8" />
                    <span>{category.name}</span>
                  </Button>
                );
              })}
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <HelpCircle className="h-8 w-8" />
                <span>All Topics</span>
              </Button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <Card key={faq.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left flex items-center justify-between"
                    >
                      <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4" />
                          <span>{faq.helpful}% helpful</span>
                        </div>
                        <ChevronRight 
                          className={`h-5 w-5 text-gray-400 transition-transform ${
                            expandedFaq === faq.id ? 'rotate-90' : ''
                          }`} 
                        />
                      </div>
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-600">{faq.answer}</p>
                        <div className="flex items-center space-x-4 mt-4">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Helpful
                          </Button>
                          <Button size="sm" variant="outline">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Not Helpful
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <Card className="bg-gradient-to-r from-brand-600 to-brand-700 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Our support team is here to help you succeed. Get in touch with us and we'll respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-brand-600 hover:bg-gray-100">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Live Chat
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Support Hours */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Support available 24/7 via chat and email</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
