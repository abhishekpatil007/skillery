import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  color?: "brand" | "accent" | "purple" | "blue" | "green" | "orange";
}

export function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  className,
  color = "brand"
}: FeatureCardProps) {
  const colorClasses = {
    brand: "bg-brand-50 border-brand-200 text-brand-700",
    accent: "bg-accent-50 border-accent-200 text-accent-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700"
  };

  const iconColorClasses = {
    brand: "bg-brand-100 text-brand-600",
    accent: "bg-accent-100 text-accent-600",
    purple: "bg-purple-100 text-purple-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600"
  };

  return (
    <div
      className={cn(
        "p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
        colorClasses[color],
        className
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
        iconColorClasses[color]
      )}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
