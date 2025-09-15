import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Brain
} from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Courses", href: "/catalog" },
    { label: "Categories", href: "/catalog" },
    { label: "Instructors", href: "/instructor" },
    { label: "Free Courses", href: "/catalog?price=free" },
    { label: "New & Noteworthy", href: "/catalog?sort=newest" },
    { label: "Popular", href: "/catalog?sort=popular" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
    { label: "Investors", href: "/investors" },
    { label: "Affiliates", href: "/affiliates" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "System Requirements", href: "/system-requirements" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Report a Bug", href: "/report-bug" },
    { label: "Feature Request", href: "/feature-request" },
  ],
  educators: [
    { label: "Teach on Skillery", href: "/instructor" },
    { label: "Instructor Resources", href: "/instructor" },
    { label: "Community Guidelines", href: "/community-guidelines" },
    { label: "Instructor Support", href: "/instructor" },
    { label: "Partnership Program", href: "/partnership" },
    { label: "Become an Affiliate", href: "/become-affiliate" },
  ],
};

const socialLinks = [
  { 
    name: "Facebook", 
    href: "https://facebook.com/skillery", 
    icon: Facebook 
  },
  { 
    name: "Twitter", 
    href: "https://twitter.com/skillery", 
    icon: Twitter 
  },
  { 
    name: "Instagram", 
    href: "https://instagram.com/skillery", 
    icon: Instagram 
  },
  { 
    name: "LinkedIn", 
    href: "https://linkedin.com/company/skillery", 
    icon: Linkedin 
  },
  { 
    name: "YouTube", 
    href: "https://youtube.com/skillery", 
    icon: Youtube 
  },
];

export function Footer() {
  return (
    <footer className="bg-ink-900 text-white">
      {/* Main Footer Content */}
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-600">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Skillery</span>
            </Link>
            <p className="text-ink-300 text-sm leading-relaxed mb-6">
              Master in-demand skills from industry experts. Learn at your pace, 
              track your growth, and stay ahead with our comprehensive online courses.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ink-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ink-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ink-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Educators Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">For Educators</h3>
            <ul className="space-y-3">
              {footerLinks.educators.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ink-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-ink-800">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4 text-sm text-ink-400">
              <p>&copy; 2024 Skillery, Inc. All rights reserved.</p>
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Language & Region */}
            <div className="flex items-center space-x-6 text-sm text-ink-400">
              <div className="flex items-center space-x-2">
                <span>Language:</span>
                <select className="bg-transparent text-ink-300 hover:text-white transition-colors border-none outline-none">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span>Region:</span>
                <select className="bg-transparent text-ink-300 hover:text-white transition-colors border-none outline-none">
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Privacy Links */}
          <div className="md:hidden mt-4 pt-4 border-t border-ink-800">
            <div className="flex flex-wrap gap-4 text-sm text-ink-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
