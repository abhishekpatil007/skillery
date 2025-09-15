import { Container } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, Database, User, Mail, Calendar } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-brand-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600">
              Last updated: January 15, 2024
            </p>
          </div>

          {/* Quick Overview */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Transparency</h3>
                  <p className="text-sm text-gray-600">We're clear about what data we collect</p>
                </div>
                <div className="text-center">
                  <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Security</h3>
                  <p className="text-sm text-gray-600">Your data is protected with industry standards</p>
                </div>
                <div className="text-center">
                  <User className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Control</h3>
                  <p className="text-sm text-gray-600">You control your data and privacy settings</p>
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
                  <a href="#information-we-collect" className="block text-brand-600 hover:text-brand-700">1. Information We Collect</a>
                  <a href="#how-we-use-information" className="block text-brand-600 hover:text-brand-700">2. How We Use Your Information</a>
                  <a href="#information-sharing" className="block text-brand-600 hover:text-brand-700">3. Information Sharing</a>
                  <a href="#data-security" className="block text-brand-600 hover:text-brand-700">4. Data Security</a>
                </div>
                <div className="space-y-2">
                  <a href="#your-rights" className="block text-brand-600 hover:text-brand-700">5. Your Rights</a>
                  <a href="#cookies" className="block text-brand-600 hover:text-brand-700">6. Cookies and Tracking</a>
                  <a href="#children-privacy" className="block text-brand-600 hover:text-brand-700">7. Children's Privacy</a>
                  <a href="#changes" className="block text-brand-600 hover:text-brand-700">8. Changes to This Policy</a>
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
                  At Skillery, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                  online learning platform.
                </p>
                <p className="text-gray-700">
                  By using our services, you agree to the collection and use of information in accordance with this policy. 
                  If you do not agree with our policies and practices, please do not use our services.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card id="information-we-collect">
              <CardHeader>
                <CardTitle>1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <User className="h-5 w-5 text-brand-600 mr-2" />
                      Personal Information
                    </h4>
                    <p className="text-gray-700 mb-3">We collect information you provide directly to us, such as:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Name, email address, and password when you create an account</li>
                      <li>Profile information, including bio, location, and profile picture</li>
                      <li>Payment information when you purchase courses (processed securely through third-party providers)</li>
                      <li>Communications with us, including support requests and feedback</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Database className="h-5 w-5 text-brand-600 mr-2" />
                      Usage Information
                    </h4>
                    <p className="text-gray-700 mb-3">We automatically collect certain information about your use of our services:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      <li>Course progress, completion status, and learning analytics</li>
                      <li>Device information, including IP address, browser type, and operating system</li>
                      <li>Usage patterns, including pages visited, time spent, and features used</li>
                      <li>Location information (if you choose to share it)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card id="how-we-use-information">
              <CardHeader>
                <CardTitle>2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Service Delivery</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Provide and maintain our learning platform</li>
                      <li>Process course enrollments and payments</li>
                      <li>Track your learning progress and achievements</li>
                      <li>Deliver course content and materials</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Communication</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Send course updates and notifications</li>
                      <li>Provide customer support</li>
                      <li>Send marketing communications (with your consent)</li>
                      <li>Respond to your inquiries and requests</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card id="information-sharing">
              <CardHeader>
                <CardTitle>3. Information Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our platform</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> When you have given us explicit consent to share your information</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card id="data-security">
              <CardHeader>
                <CardTitle>4. Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We implement appropriate technical and organizational measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Technical Measures</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>SSL/TLS encryption for data transmission</li>
                        <li>Encrypted storage of sensitive data</li>
                        <li>Regular security audits and updates</li>
                        <li>Access controls and authentication</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Organizational Measures</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Employee training on data protection</li>
                        <li>Limited access to personal information</li>
                        <li>Regular security assessments</li>
                        <li>Incident response procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card id="your-rights">
              <CardHeader>
                <CardTitle>5. Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Access and Control</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Access your personal information</li>
                      <li>Update or correct your information</li>
                      <li>Delete your account and data</li>
                      <li>Export your data</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Communication Preferences</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Opt-out of marketing communications</li>
                      <li>Control notification settings</li>
                      <li>Manage privacy preferences</li>
                      <li>Request data portability</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card id="cookies">
              <CardHeader>
                <CardTitle>6. Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience and analyze usage patterns.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                      <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                      <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with consent)</li>
                    </ul>
                  </div>
                  <p className="text-gray-700">
                    You can control cookie settings through your browser preferences or our cookie management tool.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card id="children-privacy">
              <CardHeader>
                <CardTitle>7. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal 
                  information from children under 13. If we become aware that we have collected personal information from 
                  a child under 13, we will take steps to delete such information.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card id="changes">
              <CardHeader>
                <CardTitle>8. Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                  new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this 
                  Privacy Policy periodically for any changes.
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
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> privacy@skillery.com</p>
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
  title: "Privacy Policy | Skillery",
  description: "Learn about how Skillery collects, uses, and protects your personal information.",
};
