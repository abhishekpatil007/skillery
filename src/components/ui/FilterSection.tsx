import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export function FilterSection({ 
  title, 
  children, 
  className, 
  defaultOpen = true 
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-b border-gray-200 pb-4", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-left font-medium text-gray-900 hover:text-brand-600 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`filter-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      
      {isOpen && (
        <div 
          id={`filter-${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="mt-3 space-y-2"
        >
          {children}
        </div>
      )}
    </div>
  );
}
