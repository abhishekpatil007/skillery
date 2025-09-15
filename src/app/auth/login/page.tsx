"use client";

import { SignInPage, Testimonial } from "@/components/ui/sign-in";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Chen",
    handle: "@sarahlearns",
    text: "Skillery transformed my career! The courses are top-notch and the instructors are amazing."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "Best learning platform I've used. The interactive lessons and community support are incredible."
  },
  {
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "David Martinez",
    handle: "@davidcodes",
    text: "From beginner to expert in months. Skillery's structured approach made all the difference."
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const rememberMe = formData.get('rememberMe') === 'on';

    try {
      await login(email, password, rememberMe);
      // Redirect to dashboard or intended page
      const searchParams = new URLSearchParams(window.location.search);
      const next = searchParams.get('next') || '/dashboard';
      router.push(next);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (show toast, etc.)
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google OAuth
    console.log("Google sign in clicked");
  };
  
  const handleResetPassword = () => {
    router.push('/auth/forgot-password');
  };

  const handleCreateAccount = () => {
    router.push('/auth/signup');
  };

  return (
    <SignInPage
      title={<span className="font-light text-foreground tracking-tighter">Welcome back to <span className="font-bold text-blue-600">Skillery</span></span>}
      description="Sign in to continue your learning journey and access your courses"
      heroImageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&crop=center"
      testimonials={sampleTestimonials}
      onSignIn={handleSignIn}
      onGoogleSignIn={handleGoogleSignIn}
      onResetPassword={handleResetPassword}
      onCreateAccount={handleCreateAccount}
    />
  );
}

