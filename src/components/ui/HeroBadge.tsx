import { cn } from "@/lib/utils";

interface HeroBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "brand" | "accent";
}

export function HeroBadge({ 
  children, 
  className, 
  variant = "default" 
}: HeroBadgeProps) {
  const variants = {
    default: "bg-white/10 backdrop-blur-sm border border-white/20 text-white",
    brand: "bg-brand-500 text-white border-brand-500",
    accent: "bg-accent-500 text-white border-accent-500"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
