import { Container } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cookie, Settings, Shield, Eye, Database, CheckCircle, AlertTriangle } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cookie className="h-8 w-8 text-brand-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-xl text-gray-600">
              Last updated: January 15, 2024
            </p>
          </div>

          {/* Quick Overview */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Settings className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Control</h3>
                  <p className="text-sm text-gray-600">Manage your cookie preferences</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Transparency</h3>
                  <p className="text-sm text-gray-600">Clear information about our cookies</p>
                </div>
                <div className="text-center">
                  <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Privacy</h3>
                  <p className="text-sm text-gray-600">Your privacy is our priority</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Are Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our platform.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Database className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">How Cookies Work</h4>
                    <p className="text-blue-800 text-sm">
                      When you visit our website, we may place cookies on your device. These cookies contain 
                      information that helps us recognize you and remember your preferences for future visits.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Types of Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Types of Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
                      <Badge className="bg-red-100 text-red-800">Required</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">
                    These cookies are necessary for the website to function properly. They enable basic functions 
                    like page navigation, access to secure areas, and remembering your login status.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Authentication cookies (keep you logged in)</li>
                      <li>Security cookies (protect against fraud)</li>
                      <li>Load balancing cookies (ensure website stability)</li>
                      <li>User interface customization cookies</li>
                    </ul>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                      <Badge className="bg-blue-100 text-blue-800">Optional</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously. This helps us improve our platform.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Google Analytics cookies</li>
                      <li>Page view tracking</li>
                      <li>User behavior analysis</li>
                      <li>Performance monitoring</li>
                    </ul>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Settings className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                      <Badge className="bg-green-100 text-green-800">Optional</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">
                    These cookies enable enhanced functionality and personalization, such as remembering 
                    your preferences and settings.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Language preferences</li>
                      <li>Theme settings (light/dark mode)</li>
                      <li>Volume and video player settings</li>
                      <li>Course progress tracking</li>
                    </ul>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Eye className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Marketing Cookies</h3>
                      <Badge className="bg-purple-100 text-purple-800">Optional</Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">
                    These cookies are used to track visitors across websites to display relevant and 
                    engaging advertisements. They require your explicit consent.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Advertising network cookies</li>
                      <li>Social media tracking pixels</li>
                      <li>Retargeting cookies</li>
                      <li>Conversion tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Management */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Managing Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Settings</h3>
                  <p className="text-gray-700 mb-4">
                    You can control which cookies we use through our cookie management tool. 
                    You can also manage cookies through your browser settings.
                  </p>
                  <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Settings className="h-5 w-5 text-brand-600" />
                      <div>
                        <h4 className="font-semibold text-brand-900 mb-1">Cookie Preferences</h4>
                        <p className="text-brand-800 text-sm mb-3">
                          Use our cookie management tool to customize your preferences
                        </p>
                        <button className="bg-brand-600 text-white px-4 py-2 rounded-md text-sm hover:bg-brand-700">
                          Manage Cookie Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Browser Settings</h3>
                  <p className="text-gray-700 mb-4">
                    Most web browsers allow you to control cookies through their settings. Here's how to manage 
                    cookies in popular browsers:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Chrome</h4>
                      <p className="text-sm text-gray-600">
                        Settings → Privacy and security → Cookies and other site data
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Firefox</h4>
                      <p className="text-sm text-gray-600">
                        Settings → Privacy & Security → Cookies and Site Data
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Safari</h4>
                      <p className="text-sm text-gray-600">
                        Preferences → Privacy → Manage Website Data
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Edge</h4>
                      <p className="text-sm text-gray-600">
                        Settings → Cookies and site permissions → Cookies and site data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We may use third-party services that place cookies on your device. These services help us 
                provide better functionality and analyze our website performance.
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Google Analytics</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    We use Google Analytics to understand how visitors use our website. 
                    This helps us improve our platform and user experience.
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" className="text-brand-600 hover:text-brand-700">Google Privacy Policy</a>
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Processors</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    We use secure payment processors to handle transactions. 
                    These services may place cookies to ensure secure payments.
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Examples:</strong> Stripe, PayPal, Apple Pay, Google Pay
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Social Media</h4>
                  <p className="text-gray-700 text-sm mb-2">
                    We may integrate social media features that allow you to share content. 
                    These services may place cookies when you interact with their features.
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Examples:</strong> Facebook, Twitter, LinkedIn, YouTube
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact of Disabling Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Impact of Disabling Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Important Notice</h4>
                      <p className="text-yellow-800 text-sm">
                        Disabling certain cookies may affect the functionality of our website and your user experience.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Essential Cookies</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Impact:</strong> Website may not function properly
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Cannot stay logged in</li>
                      <li>Security features may not work</li>
                      <li>Some pages may not load correctly</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Optional Cookies</h4>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Impact:</strong> Reduced personalization and functionality
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Preferences won't be remembered</li>
                      <li>Less relevant content recommendations</li>
                      <li>Analytics data won't be collected</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates to Policy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Updates to This Cookie Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Stay Informed</h4>
                    <p className="text-blue-800 text-sm">
                      We will notify you of any material changes to this policy by posting the updated 
                      version on our website and updating the "Last updated" date.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@skillery.com</p>
                <p><strong>Address:</strong> 123 Learning Street, San Francisco, CA 94105</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export const metadata = {
  title: "Cookie Policy | Skillery",
  description: "Learn about how Skillery uses cookies to enhance your learning experience and how you can manage your preferences.",
};
