import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign Up | Skillery",
  description: "Create your Skillery account and start learning today.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
