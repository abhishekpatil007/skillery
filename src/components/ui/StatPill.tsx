import { cn } from "@/lib/utils";

interface StatPillProps {
  value: string;
  label: string;
  className?: string;
  variant?: "default" | "brand" | "accent";
}

export function StatPill({ 
  value, 
  label, 
  className, 
  variant = "default" 
}: StatPillProps) {
  const variants = {
    default: "bg-white/10 backdrop-blur-sm border border-white/20 text-white",
    brand: "bg-brand-500 text-white border-brand-500",
    accent: "bg-accent-500 text-white border-accent-500"
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center px-4 py-3 rounded-xl border backdrop-blur-sm",
        variants[variant],
        className
      )}
    >
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm opacity-90">{label}</span>
    </div>
  );
}
