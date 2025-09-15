"use client";

import { SignUpPage, Testimonial } from "@/components/ui/sign-up";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Emily Rodriguez",
    handle: "@emilylearns",
    text: "Skillery helped me transition from marketing to UX design. The courses are practical and engaging!"
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Alex Thompson",
    handle: "@alexcodes",
    text: "Amazing platform! I learned React and got my dream job in 6 months. Highly recommend!"
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "James Wilson",
    handle: "@jamesweb",
    text: "The instructors are world-class and the community is incredibly supportive. Best investment I made!"
  },
];

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuthStore();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const agreeToTerms = formData.get('agreeToTerms') === 'on';

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    try {
      await signup(email, password, firstName, lastName);
      // Redirect to dashboard or intended page
      const searchParams = new URLSearchParams(window.location.search);
      const next = searchParams.get('next') || '/dashboard';
      router.push(next);
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle error (show toast, etc.)
    }
  };

  const handleGoogleSignUp = () => {
    // Implement Google OAuth
    console.log("Google sign up clicked");
  };

  const handleSignIn = () => {
    router.push('/auth/login');
  };

  return (
    <SignUpPage
      title={<span className="font-light text-foreground tracking-tighter">Join <span className="font-bold text-blue-600">Skillery</span> Today</span>}
      description="Create your account and unlock access to thousands of courses"
      heroImageSrc="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&crop=center"
      testimonials={sampleTestimonials}
      onSignUp={handleSignUp}
      onGoogleSignUp={handleGoogleSignUp}
      onSignIn={handleSignIn}
    />
  );
}

