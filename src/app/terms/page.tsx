import { Container } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Scale, AlertTriangle, CheckCircle, Users, CreditCard, Shield } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="h-8 w-8 text-brand-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600">
              Last updated: January 15, 2024
            </p>
          </div>

          {/* Quick Overview */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Clear Terms</h3>
                  <p className="text-sm text-gray-600">Easy to understand language</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Fair Use</h3>
                  <p className="text-sm text-gray-600">Balanced rights and responsibilities</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">User-Friendly</h3>
                  <p className="text-sm text-gray-600">Designed with users in mind</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Table of Contents */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <a href="#acceptance" className="block text-brand-600 hover:text-brand-700">1. Acceptance of Terms</a>
                  <a href="#description" className="block text-brand-600 hover:text-brand-700">2. Service Description</a>
                  <a href="#user-accounts" className="block text-brand-600 hover:text-brand-700">3. User Accounts</a>
                  <a href="#course-content" className="block text-brand-600 hover:text-brand-700">4. Course Content</a>
                  <a href="#payments" className="block text-brand-600 hover:text-brand-700">5. Payments and Refunds</a>
                </div>
                <div className="space-y-2">
                  <a href="#user-conduct" className="block text-brand-600 hover:text-brand-700">6. User Conduct</a>
                  <a href="#intellectual-property" className="block text-brand-600 hover:text-brand-700">7. Intellectual Property</a>
                  <a href="#privacy" className="block text-brand-600 hover:text-brand-700">8. Privacy</a>
                  <a href="#termination" className="block text-brand-600 hover:text-brand-700">9. Termination</a>
                  <a href="#disclaimers" className="block text-brand-600 hover:text-brand-700">10. Disclaimers</a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Welcome to Skillery! These Terms of Service ("Terms") govern your use of our online learning platform 
                  and services. By accessing or using our services, you agree to be bound by these Terms.
                </p>
                <p className="text-gray-700">
                  Please read these Terms carefully before using our services. If you do not agree to these Terms, 
                  please do not use our platform.
                </p>
              </CardContent>
            </Card>

            {/* Acceptance of Terms */}
            <Card id="acceptance">
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  By creating an account, accessing our platform, or using our services, you acknowledge that you have 
                  read, understood, and agree to be bound by these Terms and our Privacy Policy.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Important Notice</h4>
                      <p className="text-blue-800 text-sm">
                        These Terms constitute a legally binding agreement between you and Skillery. 
                        If you are under 18, you must have parental consent to use our services.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card id="description">
              <CardHeader>
                <CardTitle>2. Service Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Skillery is an online learning platform that provides access to educational courses, 
                  content, and related services. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Access to online courses and educational content</li>
                  <li>Progress tracking and learning analytics</li>
                  <li>Certificates of completion for eligible courses</li>
                  <li>Community features and discussion forums</li>
                  <li>Mobile applications and offline content access</li>
                  <li>Customer support and technical assistance</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card id="user-accounts">
              <CardHeader>
                <CardTitle>3. User Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Account Creation</h4>
                    <p className="text-gray-700 mb-3">
                      To access certain features of our platform, you must create an account. You agree to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Provide accurate, current, and complete information</li>
                      <li>Maintain and update your account information</li>
                      <li>Keep your password secure and confidential</li>
                      <li>Notify us immediately of any unauthorized use</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Account Responsibility</h4>
                    <p className="text-gray-700">
                      You are responsible for all activities that occur under your account. We are not liable 
                      for any loss or damage arising from your failure to maintain account security.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card id="course-content">
              <CardHeader>
                <CardTitle>4. Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Content Access</h4>
                    <p className="text-gray-700 mb-3">
                      Course content is provided by instructors and third-party content creators. We strive to ensure 
                      quality and accuracy, but we do not guarantee the completeness or accuracy of all content.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Content Usage</h4>
                    <p className="text-gray-700 mb-3">You may use course content for personal, non-commercial purposes only. You agree not to:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Download, copy, or distribute course materials without permission</li>
                      <li>Share your account credentials with others</li>
                      <li>Use content for commercial purposes without authorization</li>
                      <li>Reverse engineer or attempt to extract source code</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payments and Refunds */}
            <Card id="payments">
              <CardHeader>
                <CardTitle>5. Payments and Refunds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <CreditCard className="h-5 w-5 text-brand-600 mr-2" />
                      Payment Terms
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Course fees are charged at the time of enrollment</li>
                      <li>All prices are in USD unless otherwise specified</li>
                      <li>We accept major credit cards and other payment methods</li>
                      <li>Payment processing is handled by secure third-party providers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Refund Policy</h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-medium mb-2">30-Day Money-Back Guarantee</p>
                      <p className="text-green-700 text-sm">
                        If you're not satisfied with a course, you can request a full refund within 30 days of purchase. 
                        Contact our support team to initiate a refund.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Conduct */}
            <Card id="user-conduct">
              <CardHeader>
                <CardTitle>6. User Conduct</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Prohibited Activities</h4>
                    <p className="text-gray-700 mb-3">You agree not to engage in any of the following activities:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe on intellectual property rights</li>
                      <li>Harass, abuse, or harm other users</li>
                      <li>Upload malicious code or viruses</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                      <li>Use our services for any unlawful purpose</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-1">Consequences</h4>
                        <p className="text-yellow-800 text-sm">
                          Violation of these conduct rules may result in account suspension or termination 
                          at our sole discretion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card id="intellectual-property">
              <CardHeader>
                <CardTitle>7. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Our Content</h4>
                    <p className="text-gray-700">
                      The Skillery platform, including its design, functionality, and content, is owned by us and 
                      protected by intellectual property laws. You may not use our content without permission.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">User Content</h4>
                    <p className="text-gray-700">
                      You retain ownership of content you create and share on our platform. By posting content, 
                      you grant us a license to use, display, and distribute it in connection with our services.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Course Content</h4>
                    <p className="text-gray-700">
                      Course content is owned by instructors and content creators. We respect intellectual property 
                      rights and expect our users to do the same.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card id="privacy">
              <CardHeader>
                <CardTitle>8. Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by 
                  our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <p className="text-gray-700">
                  By using our services, you consent to the collection and use of information as described in our 
                  Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card id="termination">
              <CardHeader>
                <CardTitle>9. Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Termination by You</h4>
                    <p className="text-gray-700">
                      You may terminate your account at any time by contacting our support team or using the 
                      account deletion feature in your settings.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Termination by Us</h4>
                    <p className="text-gray-700">
                      We may suspend or terminate your account if you violate these Terms or engage in 
                      conduct that we determine is harmful to our platform or other users.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Effect of Termination</h4>
                    <p className="text-gray-700">
                      Upon termination, your right to use our services will cease immediately. We may delete 
                      your account and associated data, though some information may be retained as required by law.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card id="disclaimers">
              <CardHeader>
                <CardTitle>10. Disclaimers and Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Service Availability</h4>
                    <p className="text-gray-700">
                      We strive to provide reliable service, but we do not guarantee uninterrupted access. 
                      Our services are provided "as is" without warranties of any kind.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Content Accuracy</h4>
                    <p className="text-gray-700">
                      While we strive to ensure course content is accurate and up-to-date, we do not guarantee 
                      the accuracy, completeness, or reliability of all content.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h4>
                    <p className="text-gray-700">
                      To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, 
                      special, or consequential damages arising from your use of our services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle>11. Governing Law and Disputes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  These Terms are governed by the laws of the State of California, without regard to conflict of law principles.
                </p>
                <p className="text-gray-700">
                  Any disputes arising from these Terms or your use of our services will be resolved through binding 
                  arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <CardTitle>12. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We may update these Terms from time to time. We will notify you of any material changes by 
                  posting the new Terms on our platform and updating the "Last updated" date. Your continued use 
                  of our services after such changes constitutes acceptance of the new Terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> legal@skillery.com</p>
                  <p><strong>Address:</strong> 123 Learning Street, San Francisco, CA 94105</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

export const metadata = {
  title: "Terms of Service | Skillery",
  description: "Read Skillery's Terms of Service to understand your rights and responsibilities when using our platform.",
};
