import { 
  DollarSign, 
  Users, 
  Star, 
  MessageSquare, 
  TrendingUp, 
  BookOpen,
  Eye,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIStatProps {
  title: string;
  value: string | number;
  icon: 'revenue' | 'students' | 'rating' | 'reviews' | 'conversion' | 'courses' | 'views' | 'published';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  className?: string;
}

const iconMap = {
  revenue: DollarSign,
  students: Users,
  rating: Star,
  reviews: MessageSquare,
  conversion: TrendingUp,
  courses: BookOpen,
  views: Eye,
  published: CheckCircle,
};

const iconColors = {
  revenue: "text-green-600 bg-green-100",
  students: "text-blue-600 bg-blue-100",
  rating: "text-yellow-600 bg-yellow-100",
  reviews: "text-purple-600 bg-purple-100",
  conversion: "text-orange-600 bg-orange-100",
  courses: "text-indigo-600 bg-indigo-100",
  views: "text-cyan-600 bg-cyan-100",
  published: "text-emerald-600 bg-emerald-100",
};

export function KPIStat({ 
  title, 
  value, 
  icon, 
  trend,
  subtitle,
  className 
}: KPIStatProps) {
  const Icon = iconMap[icon];
  const iconColorClass = iconColors[icon];

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `$${(val / 1000).toFixed(1)}K`;
      } else if (val < 1 && val > 0) {
        return `${(val * 100).toFixed(1)}%`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <div className={cn(
      "bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "p-3 rounded-lg",
          iconColorClass
        )}>
          <Icon className="h-6 w-6" />
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
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-1">
          {formatValue(value)}
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
