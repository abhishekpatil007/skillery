import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Search, 
  Plus,
  TrendingUp,
  Award
} from "lucide-react";

interface EmptyStateProps {
  type: 'no-courses' | 'no-progress' | 'no-recommendations' | 'no-completed';
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const iconMap = {
  'no-courses': BookOpen,
  'no-progress': TrendingUp,
  'no-recommendations': Search,
  'no-completed': Award,
};

export function EmptyState({ 
  type, 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  const Icon = iconMap[type];

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      {action && (
        <Button onClick={action.onClick} className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}
