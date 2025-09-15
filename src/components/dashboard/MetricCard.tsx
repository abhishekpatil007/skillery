import { 
  Flame, 
  Clock, 
  Award, 
  CheckCircle,
  TrendingUp,
  Calendar,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: 'flame' | 'clock' | 'award' | 'check' | 'trending' | 'calendar' | 'star';
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const iconMap = {
  flame: Flame,
  clock: Clock,
  award: Award,
  check: CheckCircle,
  trending: TrendingUp,
  calendar: Calendar,
  star: Star,
};

export function MetricCard({ 
  title, 
  value, 
  icon, 
  subtitle, 
  trend,
  className 
}: MetricCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className={cn(
      "bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="h-5 w-5 text-gray-600" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            <TrendingUp className={cn(
              "h-4 w-4",
              trend.isPositive ? "rotate-0" : "rotate-180"
            )} />
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {value}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
