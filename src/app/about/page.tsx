import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Award, 
  Globe, 
  Heart, 
  Target, 
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Star,
  BookOpen,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-700 py-20">
        <Container>
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              Empowering Learners Worldwide
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              We believe that education should be accessible, engaging, and transformative. 
              Our mission is to democratize learning and help people achieve their dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
                Join Our Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Watch Our Story
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-600 mb-2">500K+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-600 mb-2">10K+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-600 mb-2">150+</div>
              <div className="text-gray-600">Countries Reached</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, Skillery began as a simple idea: make quality education 
                accessible to everyone, everywhere. What started as a small team of passionate 
                educators has grown into a global platform that's transforming lives.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We've seen students land their dream jobs, entrepreneurs build successful 
                businesses, and professionals advance their careers - all through the power 
                of learning on our platform.
              </p>
              <div className="flex items-center space-x-4">
                <Button className="bg-brand-500 hover:bg-brand-600">
                  Learn More
                </Button>
                <Button variant="outline">
                  Our Team
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-50 to-accent-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-brand-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Heart className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Values
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-500" />
                    <span>Accessibility for all</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-500" />
                    <span>Quality education</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-500" />
                    <span>Innovation in learning</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-brand-500" />
                    <span>Community support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize education by providing high-quality, accessible learning 
                experiences that empower individuals to achieve their personal and 
                professional goals, regardless of their background or location.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                A world where everyone has access to the education they need to succeed, 
                where learning is engaging and personalized, and where knowledge knows 
                no boundaries.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a diverse group of educators, technologists, and innovators 
              united by our passion for learning and teaching.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sarah Johnson</h3>
              <p className="text-brand-600 mb-2">CEO & Co-Founder</p>
              <p className="text-gray-600 text-sm">
                Former education director with 15+ years experience in online learning.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Michael Chen</h3>
              <p className="text-brand-600 mb-2">CTO & Co-Founder</p>
              <p className="text-gray-600 text-sm">
                Tech visionary focused on creating innovative learning experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Emily Rodriguez</h3>
              <p className="text-brand-600 mb-2">Head of Education</p>
              <p className="text-gray-600 text-sm">
                Learning science expert with PhD in Educational Psychology.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-r from-brand-600 to-brand-700">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              Every day, we see the incredible impact of learning. Here are just a few 
              stories from our community.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <p className="text-white/90 mb-4">
                  "Skillery helped me transition from marketing to data science. 
                  I landed my dream job at a tech company!"
                </p>
                <p className="text-white/70 text-sm">- Maria, Data Scientist</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <p className="text-white/90 mb-4">
                  "The courses are so well-structured. I learned web development 
                  and started my own freelance business."
                </p>
                <p className="text-white/70 text-sm">- James, Freelancer</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <p className="text-white/90 mb-4">
                  "As a working mom, the flexible learning schedule was perfect. 
                  I could learn at my own pace."
                </p>
                <p className="text-white/70 text-sm">- Lisa, Project Manager</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already transforming their lives 
              with our courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-500 hover:bg-brand-600">
                <Link href="/catalog" className="flex items-center gap-2">
                  Browse Courses
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/auth/signup" className="flex items-center gap-2">
                  Sign Up Free
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export const metadata = {
  title: "About Us | Skillery",
  description: "Learn about Skillery's mission to democratize education and empower learners worldwide.",
};
