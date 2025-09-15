import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  count?: number;
  className?: string;
}

export function FilterCheckbox({ 
  id, 
  label, 
  checked, 
  onChange, 
  count,
  className 
}: FilterCheckboxProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="h-4 w-4"
        aria-describedby={count ? `${id}-count` : undefined}
      />
      <label
        htmlFor={id}
        className="flex-1 text-sm text-gray-700 cursor-pointer hover:text-brand-600 transition-colors"
      >
        {label}
        {count !== undefined && (
          <span 
            id={`${id}-count`}
            className="ml-2 text-gray-500"
            aria-label={`${count} courses`}
          >
            ({count})
          </span>
        )}
      </label>
    </div>
  );
}
