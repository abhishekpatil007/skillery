import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In | Skillery",
  description: "Sign in to your Skillery account to continue learning.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
